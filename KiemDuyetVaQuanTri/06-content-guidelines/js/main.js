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
  const found = rules.filter(item =>
    (item.title + " " + item.group + " " + item.text).toLocaleLowerCase("vi").includes(query)
  );
  $("#resultCount").textContent = found.length + " quy định";
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

function edit(item) {
  form.reset();
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
$("#search").addEventListener("input", render);
$("#globalSearch").addEventListener("input", event => {
  $("#search").value = event.target.value;
  render();
});

$("#rules").addEventListener("click", event => {
  if (event.target.closest('[data-action="clear-search"]')) {
    $("#search").value = "";
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
  if (!form.reportValidity()) return;
  const id = form.elements.id.value;
  const old = rules.find(rule => String(rule.id) === id);
  const item = {
    id: id || "rule-" + Date.now(),
    title: form.elements.title.value.trim(),
    group: form.elements.group.value,
    text: form.elements.text.value.trim(),
    aiGenerated: old?.aiGenerated
  };
  if (rules.some(rule => rule.id !== id && rule.title.toLocaleLowerCase("vi") === item.title.toLocaleLowerCase("vi"))) {
    return notify("Tên quy định này đã tồn tại.");
  }
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






