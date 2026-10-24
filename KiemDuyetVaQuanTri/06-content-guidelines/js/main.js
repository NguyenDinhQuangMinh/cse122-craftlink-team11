const $ = selector => document.querySelector(selector);
const KEY = "craftlink-content-guidelines-v4";
const DATA_URL = "../assets/data/guidelines.json";
const form = $("#ruleForm");
const dialog = $("#editor");
let rules = [];
let loading = false;
let loadError = "";

function notify(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[character]));
}

function save() {
  return CraftLinkAPI.save("guidelines", rules, KEY);
}

async function loadData() {
  loading = true;
  loadError = "";
  render();
  try {
    rules = await CraftLinkAPI.load("guidelines", DATA_URL, KEY);
  } catch (error) {
    loadError = error.message || "Không thể tải quy định.";
  } finally {
    loading = false;
    render();
  }
}

function render() {
  const list = $("#rules");
  if (loading) return CraftLinkAPI.showState(list, "loading", "Đang tải quy định…");
  if (loadError) return CraftLinkAPI.showState(list, "error", loadError, {
    actionLabel: "Thử lại", onAction: loadData
  });

  const query = $("#search").value.trim().toLocaleLowerCase("vi");
  const group = $("#groupFilter").value;
  const sort = $("#ruleSort").value;
  const found = rules.filter(item =>
    (group === "all" || item.group === group) &&
    (item.title + " " + item.group + " " + item.text).toLocaleLowerCase("vi").includes(query)
  );
  found.sort((a, b) => {
    const order = a.title.localeCompare(b.title, "vi");
    return sort === "name-desc" ? -order : order;
  });
  $("#resultCount").textContent = found.length + " / " + rules.length + " quy định";
  list.innerHTML = found.map(item =>
    '<article class="rule-card"><header class="rule-head">' +
      '<span class="rule-badge">' + esc(item.group) + '</span>' +
      '<div class="rule-actions">' +
        '<button class="action-btn" type="button" data-action="edit" data-id="' + esc(item.id) + '" aria-label="Sửa ' + esc(item.title) + '">✎</button>' +
        '<button class="action-btn danger" type="button" data-action="delete" data-id="' + esc(item.id) + '" aria-label="Xóa ' + esc(item.title) + '">×</button>' +
      '</div></header><h2>' + esc(item.title) + '</h2><p>' + esc(item.text) + '</p>' +
      (item.aiGenerated ? '<p class="ai-origin">AI gợi ý · ' + Math.round(Number(item.aiGenerated.confidence || 0) * 100) + '% · ' + (Array.isArray(item.aiGenerated.factors) ? item.aiGenerated.factors.map(esc).join("; ") : "") + '</p>' : '') +
      '</article>'
  ).join("") ||
    '<div class="empty-state"><p>Chưa có quy định phù hợp.</p><button class="state-action" type="button" data-action="clear-search">Xóa bộ lọc</button></div>';
}

function clearFieldError(input, error) {
  input.removeAttribute("aria-invalid");
  error.textContent = "";
}
function setFieldError(input, error, message) {
  input.setAttribute("aria-invalid", "true");
  error.textContent = message;
}
function clearFormErrors() {
  clearFieldError(form.elements.title, $("#titleError"));
  clearFieldError(form.elements.text, $("#textError"));
}

function edit(item) {
  form.reset();
  clearFormErrors();
  form.elements.id.value = item?.id || "";
  form.elements.group.value = item?.group || "Thông tin sản phẩm";
  form.elements.title.value = item?.title || "";
  form.elements.text.value = item?.text || "";
  $("#dialogTitle").textContent = item ? "Sửa quy định" : "Thêm quy định";
  dialog.showModal();
}

$("#addRule").addEventListener("click", () => edit());
$("#close").addEventListener("click", () => dialog.close());
$("#cancel").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
$("#search").addEventListener("input", CraftLinkAPI.debounce(render));
$("#groupFilter").addEventListener("change", render);
$("#ruleSort").addEventListener("change", render);
form.elements.title.addEventListener("input", () => clearFieldError(form.elements.title, $("#titleError")));
form.elements.text.addEventListener("input", () => clearFieldError(form.elements.text, $("#textError")));
$("#globalSearch").addEventListener("input", event => {
  $("#search").value = event.target.value;
  render();
});

$("#rules").addEventListener("click", event => {
  if (event.target.closest('[data-action="clear-search"]')) {
    $("#search").value = "";
    $("#groupFilter").value = "all";
    $("#ruleSort").value = "name-asc";
    return render();
  }
  const button = event.target.closest('[data-action="edit"], [data-action="delete"]');
  if (!button) return;
  const item = rules.find(rule => String(rule.id) === button.dataset.id);
  if (!item) return;
  if (button.dataset.action === "edit") return edit(item);
  if (!confirm("Xóa quy định “" + item.title + "”?")) return;
  const previous = rules;
  rules = rules.filter(rule => rule !== item);
  if (!save()) {
    rules = previous;
    return notify("Không thể lưu thay đổi vào bộ nhớ trình duyệt.");
  }
  render();
  notify("Đã xóa quy định.");
});

form.addEventListener("submit", event => {
  event.preventDefault();
  const id = form.elements.id.value;
  const old = rules.find(rule => String(rule.id) === id);
  const title = form.elements.title.value.trim();
  const text = form.elements.text.value.trim();
  if (title.length < 2) {
    setFieldError(form.elements.title, $("#titleError"), "Tên quy định cần có ít nhất 2 ký tự không tính khoảng trắng.");
    form.elements.title.focus();
    return;
  }
  if (text.length < 8) {
    setFieldError(form.elements.text, $("#textError"), "Nội dung cần có ít nhất 8 ký tự không tính khoảng trắng.");
    form.elements.text.focus();
    return;
  }
  const item = {
    id: id || "rule-" + Date.now(),
    title,
    group: form.elements.group.value,
    text,
    aiGenerated: old?.aiGenerated
  };
  if (rules.some(rule => String(rule.id) !== id && rule.title.trim().toLocaleLowerCase("vi") === item.title.toLocaleLowerCase("vi"))) {
    setFieldError(form.elements.title, $("#titleError"), "Tên quy định này đã tồn tại.");
    form.elements.title.focus();
    return;
  }
  clearFormErrors();
  const previous = rules;
  rules = old ? rules.map(rule => rule === old ? item : rule) : [item, ...rules];
  if (!save()) {
    rules = previous;
    return notify("Không thể lưu thay đổi vào bộ nhớ trình duyệt.");
  }
  dialog.close();
  render();
  notify(old ? "Đã cập nhật quy định." : "Bạn đã thêm quy định thành công.");
});

const notice = $("#noticeMenu");
const profile = $("#profileMenu");
$("#noticeButton").addEventListener("click", () => {
  notice.hidden = !notice.hidden;
  profile.hidden = true;
});
$("#profileButton").addEventListener("click", () => {
  profile.hidden = !profile.hidden;
  notice.hidden = true;
});
document.addEventListener("click", event => {
  if (!event.target.closest(".popover-wrap")) {
    notice.hidden = true;
    profile.hidden = true;
  }
});
document.querySelectorAll('[data-action="logout"]').forEach(button => {
  button.addEventListener("click", () => notify("Đăng xuất chỉ là thao tác minh họa."));
});

CraftLinkAI.bind({
  feature: "policy-copilot",
  title: "AI copilot soạn quy định",
  inputLabel: "Mô tả vấn đề hoặc quy định cần soạn",
  placeholder: "Ví dụ: Quy định về ảnh và mô tả sản phẩm làm theo yêu cầu.",
  draftLabel: "Nội dung quy định (có thể chỉnh sửa)",
  examples: ["Quy định về ảnh sản phẩm do người bán tự chụp", "Chính sách công khai thời gian hoàn thiện đơn tùy biến"],
  getContext: () => ({
    groups: [...form.elements.group.options].map(option => option.value).filter(Boolean),
    rules: rules.map(rule => ({ title: rule.title, group: rule.group, text: rule.text }))
  }),
  apply: (result, draft) => {
    const title = String(result.ruleTitle || result.title || "Quy định mới").trim();
    if (rules.some(rule => rule.title.toLocaleLowerCase("vi") === title.toLocaleLowerCase("vi"))) {
      notify("Quy định trùng tên đã tồn tại. Hãy sửa tên trước khi lưu.");
      return false;
    }
    const groups = [...form.elements.group.options].map(option => option.value);
    const item = {
      id: "rule-" + Date.now(),
      title,
      group: groups.includes(result.ruleGroup) ? result.ruleGroup : groups[0],
      text: draft || result.draft || result.summary || "",
      aiGenerated: { assessedAt: new Date().toISOString(), confidence: result.confidence, factors: result.factors }
    };
    if (!item.text.trim()) {
      notify("Bản nháp AI đang trống. Hãy tạo lại hoặc thêm nội dung thủ công.");
      return false;
    }
    rules = [item, ...rules];
    if (!save()) {
      rules.shift();
      notify("Không thể lưu bản nháp AI vào bộ nhớ trình duyệt.");
      return false;
    }
    render();
    notify("Đã thêm quy định từ bản nháp AI sau khi bạn xác nhận.");
    return true;
  }
});

loadData();






