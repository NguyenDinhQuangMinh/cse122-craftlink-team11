const $ = s => document.querySelector(s);
const toast = $("#toast");
let toastTimer;

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

function wireHeader(searchHandler) {
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

  document.addEventListener("click", e => {
    if (!e.target.closest(".popover-wrap")) {
      notice.hidden = true;
      profile.hidden = true;
    }
  });

  document.querySelectorAll('[data-action="logout"]').forEach(button => {
    button.addEventListener("click", () => {
      notify("Đăng xuất chỉ là thao tác minh họa.");
    });
  });

  $("#globalSearch").addEventListener("input", CraftLinkAPI.debounce(e => {
    if (searchHandler) searchHandler(e.target.value);
  }));
}

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[character]));
}

const KEY = "craftlink-slide04-products-v2";
const DATA_URL = "../assets/data/products.json";
let loading = false;
let loadError = "";
let guidelines = [];
const products = [
  [
    "Bình gốm hoa sen",
    "Nguyễn Văn Hòa",
    "850.000 đ",
    "2 giờ trước",
    "product-1.png",
    "Tạo hình hoa sen, men nâu thủ công; sản xuất tại xưởng gia đình ở Bát Tràng."
  ],
  [
    "Đèn mây tre đan",
    "Trần Thị Mai",
    "620.000 đ",
    "3 giờ trước",
    "product-2.png",
    "Đèn trang trí đan tay từ tre tự nhiên, hoàn thiện bằng dầu thực vật."
  ],
  [
    "Khay gỗ khắc lá",
    "Lê Minh Tuấn",
    "410.000 đ",
    "4 giờ trước",
    "product-3.png",
    "Khay gỗ khắc tay họa tiết lá, mô tả rõ chất liệu và cách bảo quản."
  ],
  [
    "Trang trí tường macrame",
    "Phạm Thị Trang",
    "360.000 đ",
    "5 giờ trước",
    "product-4.png",
    "Trang trí tường dệt tay bằng sợi cotton tự nhiên."
  ],
  [
    "Bộ ấm chén men lam",
    "Đỗ Văn Quang",
    "750.000 đ",
    "6 giờ trước",
    "product-5.png",
    "Bộ ấm chén vẽ men lam thủ công, dùng được với nước nóng."
  ],
  [
    "Túi cói quai tròn",
    "Vũ Thị Hạnh",
    "320.000 đ",
    "7 giờ trước",
    "product-6.png",
    "Túi cói đan tay, quai tròn, phù hợp sử dụng hằng ngày."
  ],
  [
    "Hộp gỗ khắc tay",
    "Hoàng Anh Dũng",
    "550.000 đ",
    "8 giờ trước",
    "product-7.png",
    "Hộp gỗ chạm khắc hoa văn thủ công."
  ],
  [
    "Rổ mây đựng trái cây",
    "Nguyễn Thị Lan",
    "280.000 đ",
    "9 giờ trước",
    "product-8.png",
    "Rổ mây tre đan tự nhiên, dùng để đựng trái cây."
  ]
].map((item, index) => ({
  id: index + 1,
  name: item[0],
  maker: item[1],
  price: item[2],
  age: item[3],
  image: item[4],
  description: item[5],
  status: "pending",
  note: ""
}));

try {
  const saved = JSON.parse(localStorage.getItem(KEY));
  if (Array.isArray(saved)) {
    products.splice(0, products.length, ...saved);
  }
} catch {}

function save() {
  return CraftLinkAPI.save("products", products, KEY);
}

async function loadData() {
  loading = true;
  loadError = "";
  CraftLinkAPI.showState($("#products"), "loading", "Đang tải hàng chờ kiểm duyệt…");
  try {
    const records = await CraftLinkAPI.load("products", DATA_URL, KEY);
    products.splice(0, products.length, ...records);
    try {
      guidelines = await CraftLinkAPI.load("guidelines", "../assets/data/guidelines.json");
    } catch {
      guidelines = [];
    }
  } catch (error) {
    loadError = error.message || "Không thể tải hàng chờ kiểm duyệt.";
  } finally {
    loading = false;
    render();
  }
}

const dialog = $("#editor");
const form = $("#decisionForm");
let selected = 0;
let query = "";
let statusFilter = "pending";
let queueSort = "newest";

const ageMinutes = value => {
  const units = { "giây": 1 / 60, "phút": 1, "giờ": 60, "ngày": 1440, "tuần": 10080, "tháng": 43200, "năm": 525600 };
  const match = String(value || "").toLocaleLowerCase("vi").match(/(\d+)\s*(giây|phút|giờ|ngày|tuần|tháng|năm)/);
  return match ? Number(match[1]) * units[match[2]] : 0;
};

function render() {
  const container = $("#products");
  if (loading) return CraftLinkAPI.showState(container, "loading", "Đang tải hàng chờ kiểm duyệt…");
  if (loadError) return CraftLinkAPI.showState(container, "error", loadError, {
    actionLabel: "Thử lại", onAction: loadData
  });
  const shown = products.filter(item =>
    (statusFilter === "all" || item.status === statusFilter) &&
    (item.name + " " + item.maker).toLocaleLowerCase("vi").includes(query.trim().toLocaleLowerCase("vi"))
  );
  shown.sort((a, b) => {
    if (queueSort === "name") return a.name.localeCompare(b.name, "vi");
    const order = ageMinutes(a.age) - ageMinutes(b.age);
    if (order) return queueSort === "oldest" ? -order : order;
    return queueSort === "oldest" ? Number(a.id) - Number(b.id) : Number(b.id) - Number(a.id);
  });
  $("#queueCount").textContent = shown.length + " sản phẩm";
  const statusNames = {
    pending: "Đang chờ",
    approved: "Đã duyệt",
    revision: "Cần chỉnh sửa",
    rejected: "Đã từ chối"
  };
  container.innerHTML = shown.map(item => {
    const image = /^product-\d+\.png$/.test(item.image) ? item.image : "product-1.png";
    const actions = item.status === "pending"
      ? '<button class="secondary" type="button" data-act="detail">Xem chi tiết</button>' +
        '<button class="approve" type="button" data-act="approve">Duyệt bài</button>' +
        '<button class="decision" type="button" data-act="decision">Từ chối / Yêu cầu sửa</button>' +
        '<button class="ai-action" type="button" data-ai-trigger="moderation-risk">Phân tích AI</button>'
      : '<button class="secondary" type="button" data-act="detail">Xem quyết định</button>';
    return '<article class="product-card" data-id="' + esc(item.id) + '">' +
      '<img class="product-image" src="../assets/' + image + '" alt="' + esc(item.name) + '">' +
      '<div class="product-info"><span class="status product-state">' + esc(statusNames[item.status] || "Chưa xác định") + '</span>' +
      '<h2>' + esc(item.name) + '</h2><p class="product-maker">' + esc(item.maker) + '</p>' +
      '<p class="product-price">' + esc(item.price) + '</p><p class="product-age">' + esc(item.age) + '</p>' +
      '<p class="product-description">' + esc(item.description) + '</p>' +
      (item.aiAssessment ? '<p class="product-ai-note">AI hỗ trợ: ' + Math.round(Number(item.aiAssessment.confidence || 0) * 100) + '% · ' + esc(item.aiAssessment.recommendation || "") + ' · ' + (Array.isArray(item.aiAssessment.factors) ? item.aiAssessment.factors.map(esc).join("; ") : "") + '</p>' : '') +
      '<div class="product-actions">' + actions + '</div></div></article>';
  }).join("") || '<div class="empty-state"><p>Không có sản phẩm phù hợp với bộ lọc.</p>' +
    '<button class="state-action" type="button" data-reset-filter>Đặt lại bộ lọc</button>' +
    '<button class="state-action" type="button" data-reset-data>Khôi phục dữ liệu mẫu</button></div>';
}
function approve(item) {
  const previous = item.status;
  item.status = "approved";
  if (!save()) {
    item.status = previous;
    return notify("Không thể lưu thay đổi. Hãy kiểm tra bộ nhớ trình duyệt.");
  }
  dialog.close();
  render();
  notify("Đã duyệt bài đăng “" + item.name + "”.");
}

function showDecision(item) {
  selected = item.id;
  $("#dialogTitle").textContent = "Từ chối / Yêu cầu sửa";
  $("#detailPanel").hidden = true;
  $("#decisionPanel").hidden = false;
  form.elements.id.value = item.id;
  form.elements.note.value = item.note;
  clearNoteError();
  dialog.showModal();
}

function showDetail(item) {
  selected = item.id;
  $("#dialogTitle").textContent = item.name;
  $("#detailPanel").hidden = false;
  $("#decisionPanel").hidden = true;
  $("#detailText").textContent =
    item.maker + " · " + item.price + "\n" +
    item.description + "\n" +
    "Trạng thái: " +
    (item.status === "pending" ? "Đang chờ kiểm duyệt" : item.status);
  $("#detailApprove").hidden = item.status !== "pending";
  $("#detailDecision").hidden = item.status !== "pending";
  dialog.showModal();
}


$("#products").addEventListener("click", async e => {
  if (e.target.closest("[data-reset-filter]")) {
    $("#globalSearch").value = "";
    query = "";
    $("#statusFilter").value = "pending";
    statusFilter = "pending";
    $("#queueSort").value = "newest";
    queueSort = "newest";
    return render();
  }
  if (e.target.closest("[data-reset-data]")) {
    try {
      const records = await CraftLinkAPI.reset("products", DATA_URL, KEY);
      products.splice(0, products.length, ...records);
      loadError = "";
      render();
      notify("Đã khôi phục dữ liệu mẫu.");
    } catch (error) {
      loadError = error.message || "Không thể khôi phục dữ liệu.";
      render();
    }
    return;
  }
  const button = e.target.closest("[data-act]");
  if (!button) return;

  const item = products.find(
    x => x.id === Number(button.closest(".product-card").dataset.id)
  );
  if (!item) return;

  if (button.dataset.act === "approve") {
    approve(item);
  } else if (button.dataset.act === "decision") {
    showDecision(item);
  } else {
    showDetail(item);
  }
});

$("#statusFilter").addEventListener("change", event => {
  statusFilter = event.target.value;
  render();
});
$("#queueSort").addEventListener("change", event => {
  queueSort = event.target.value;
  render();
});

const noteInput = form.elements.note;
const noteError = $("#noteError");
function clearNoteError() {
  noteInput.removeAttribute("aria-invalid");
  noteError.textContent = "";
}
function showNoteError(message) {
  noteInput.setAttribute("aria-invalid", "true");
  noteError.textContent = message;
  noteInput.focus();
}
noteInput.addEventListener("input", clearNoteError);

$("#detailApprove").addEventListener("click", () => {
  approve(products.find(x => x.id === selected));
});

$("#detailDecision").addEventListener("click", () => {
  showDecision(products.find(x => x.id === selected));
});

CraftLinkAI.bind({
  feature: "moderation-risk",
  title: "AI phân loại rủi ro sản phẩm",
  inputLabel: "Bối cảnh bổ sung (không bắt buộc)",
  placeholder: "Nêu quy định hoặc chi tiết cần ưu tiên kiểm tra.",
  examples: ["Kiểm tra độ rõ của chất liệu và nguồn gốc", "Đối chiếu với quy định về ảnh sản phẩm"],
  actions: [
    { value: "approved", label: "Đề xuất duyệt" },
    { value: "revision", label: "Yêu cầu bổ sung" },
    { value: "rejected", label: "Đề xuất từ chối" }
  ],
  getContext: trigger => {
    const card = trigger.closest(".product-card");
    const item = products.find(product => product.id === Number(card?.dataset.id));
    return item ? { id: item.id, name: item.name, category: item.category, price: item.price, maker: item.maker, age: item.age, description: item.description, status: item.status, guidelines: guidelines.map(rule => ({ title: rule.title, group: rule.group, text: rule.text })) } : {};
  },
  prefill: context => context.description || "",
  apply: (result, draft, action, context) => {
    const item = products.find(product => product.id === context.id);
    if (!item) return false;
    const previous = { status: item.status, note: item.note, aiAssessment: item.aiAssessment };
    item.status = action;
    item.note = draft || result.recommendation || "";
    item.aiAssessment = { assessedAt: new Date().toISOString(), action, confidence: result.confidence, factors: result.factors, recommendation: result.recommendation };
    if (!save()) {
      Object.assign(item, previous);
      notify("Không thể lưu kết quả AI. Hãy thử lại.");
      return false;
    }
    render();
    notify("Đã lưu quyết định có AI hỗ trợ; kiểm duyệt viên vẫn là người quyết định.");
    return true;
  }
});

$("#close").addEventListener("click", () => dialog.close());
$("#cancel").addEventListener("click", () => dialog.close());

dialog.addEventListener("click", e => {
  if (e.target === dialog) dialog.close();
});

form.addEventListener("submit", e => {
  e.preventDefault();

  const item = products.find(x => x.id === Number(form.elements.id.value));
  const note = form.elements.note.value.trim();

  if (!item) return notify("Không tìm thấy sản phẩm cần xử lý.");
  if (note.replace(/\s/g, "").length < 5) {
    showNoteError("Phản hồi cần có ít nhất 5 ký tự không tính khoảng trắng.");
    return;
  }
  clearNoteError();

  const previous = { note: item.note, status: item.status };
  item.note = note;
  item.status = form.elements.status.value;
  if (!save()) {
    Object.assign(item, previous);
    return notify("Không thể lưu thay đổi. Hãy kiểm tra bộ nhớ trình duyệt.");
  }
  dialog.close();
  render();
  notify(item.status === "revision"
    ? "Đã gửi yêu cầu chỉnh sửa cho người bán."
    : "Đã từ chối bài đăng.");
});

wireHeader(value => {
  query = value;
  render();
});

loadData();





