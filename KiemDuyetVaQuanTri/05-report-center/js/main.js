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

  $("#globalSearch").addEventListener("input", e => {
    if (searchHandler) searchHandler(e.target.value);
  });
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

const KEY = "craftlink-slide05-reports-v2";
const DATA_URL = "../assets/data/reports.json";
let loading = false;
let loadError = "";
const reports = [
  {
    id: "RPT20261003",
    sender: "Nguyễn Văn Hòa",
    target: "Bình gốm hoa sen",
    type: "Sản phẩm",
    reason: "Nội dung vi phạm",
    date: "03/10/2026 14:32",
    status: "pending"
  },
  {
    id: "RPT20261002",
    sender: "Tần Thị Mai",
    target: "Đỗ Văn Quang",
    type: "Người dùng",
    reason: "Gian lận",
    date: "03/10/2026 11:18",
    status: "verifying"
  },
  {
    id: "RPT20261001",
    sender: "Lê Minh Tuấn",
    target: "Trang trí tường macrame",
    type: "Bài đăng",
    reason: "SP không đúng mô tả",
    date: "03/10/2026 09:45",
    status: "handled"
  },
  {
    id: "RPT20260930",
    sender: "Phạm Thu Trang",
    target: "Đèn mây tre đan",
    type: "Sản phẩm",
    reason: "Nội dung vi phạm",
    date: "02/10/2026 16:20",
    status: "pending"
  },
  {
    id: "RPT20260929",
    sender: "Vũ Thị Hạnh",
    target: "Túi cói quai tròn",
    type: "Sản phẩm",
    reason: "Gian lận",
    date: "01/10/2026 13:07",
    status: "verifying"
  },
  {
    id: "RPT20260928",
    sender: "Hoàng Anh Dũng",
    target: "Bộ ấm chén men lam",
    type: "Sản phẩm",
    reason: "Nội dung vi phạm",
    date: "01/10/2026 10:22",
    status: "handled"
  },
  {
    id: "RPT20260927",
    sender: "Nguyễn Thị Lan",
    target: "Hộp gỗ khắc tay",
    type: "Sản phẩm",
    reason: "SP không đúng mô tả",
    date: "30/09/2026 08:55",
    status: "pending"
  },
  {
    id: "RPT20260926",
    sender: "Phạm Quang Minh",
    target: "Rổ mây đựng trái cây",
    type: "Sản phẩm",
    reason: "Nội dung vi phạm",
    date: "29/09/2026 15:40",
    status: "verifying"
  }
];

try {
  const saved = JSON.parse(localStorage.getItem(KEY));
  if (Array.isArray(saved)) {
    reports.splice(0, reports.length, ...saved);
  }
} catch {}

function save() {
  return CraftLinkAPI.save("reports", reports, KEY);
}

async function loadData() {
  loading = true;
  loadError = "";
  CraftLinkAPI.showState($("#rows"), "loading", "Đang tải báo cáo…", { colSpan: 7 });
  try {
    const records = await CraftLinkAPI.load("reports", DATA_URL, KEY);
    reports.splice(0, reports.length, ...records);
  } catch (error) {
    loadError = error.message || "Không thể tải báo cáo.";
  } finally {
    loading = false;
    render();
  }
}

const labels = {
  pending: "Đang chờ",
  verifying: "Đang xác minh",
  handled: "Đã xử lý",
  dismissed: "Đã bỏ qua"
};

let query = "";
let selected = "";
let page = 1;
let sortKey = "date";
let sortDirection = "desc";

let pageSize = 10;
const dialog = $("#detailDialog");

function render() {
  if (loading) return CraftLinkAPI.showState($("#rows"), "loading", "Đang tải báo cáo…", { colSpan: 7 });
  if (loadError) return CraftLinkAPI.showState($("#rows"), "error", loadError, {
    colSpan: 7, actionLabel: "Thử lại", onAction: loadData
  });
  const q = ($("#search").value || query).toLocaleLowerCase("vi");
  const status = $("#status").value;
  const reason = $("#reason").value;
  const period = $("#period").value;

  const found = reports.filter(report => {
    const dateParts = report.date.slice(0, 10).split("/").map(Number);
    const age = (
      Date.now() -
      new Date(dateParts[2], dateParts[1] - 1, dateParts[0]).getTime()
    ) / 86400000;

    return (
      (status === "all" || report.status === status) &&
      (reason === "all" || report.reason === reason) &&
      (!period || period === "all" || age <= Number(period)) &&
      [report.id, report.sender, report.target, report.reason]
        .join(" ")
        .toLocaleLowerCase("vi")
        .includes(q)
    );
  });

  const valueFor = report => {
    if (sortKey !== "date") return String(report[sortKey] || "");
    const [date, time = "00:00"] = report.date.split(" ");
    const [day, month, year] = date.split("/").map(Number);
    const [hour, minute] = time.split(":").map(Number);
    return new Date(year, month - 1, day, hour || 0, minute || 0).getTime();
  };
  found.sort((a, b) => {
    const left = valueFor(a);
    const right = valueFor(b);
    const order = typeof left === "number"
      ? left - right
      : left.localeCompare(right, "vi", { numeric: true });
    return order * (sortDirection === "asc" ? 1 : -1);
  });
  document.querySelectorAll("thead button[data-sort]").forEach(button => {
    const active = button.dataset.sort === sortKey;
    button.closest("th").setAttribute("aria-sort", active
      ? (sortDirection === "asc" ? "ascending" : "descending")
      : "none");
    button.textContent = button.textContent.replace(/\s*[↑↓]$/, "") +
      (active ? (sortDirection === "asc" ? " ↑" : " ↓") : "");
  });
  const pages = Math.max(1, Math.ceil(found.length / pageSize));
  page = Math.min(page, pages);

  $("#rows").innerHTML = found
    .slice((page - 1) * pageSize, page * pageSize)
    .map(report =>
      '<tr>' +
        '<td class="report-id">#' + esc(report.id) + '</td>' +
        '<td>' + esc(report.sender) + '</td>' +
        '<td><b>' + esc(report.target) + '</b><span class="subtext">' +
          esc(report.type) + '</span></td>' +
        '<td>' + esc(report.reason) +
          (report.aiPriority ? '<span class="subtext">Ưu tiên AI: ' + esc(report.aiPriority) + (report.aiAssessment ? ' · ' + Math.round(Number(report.aiAssessment.confidence || 0) * 100) + '%' : '') + '</span>' : '') +
        '</td>' +
        '<td>' + esc(report.date) + '</td>' +
        '<td><span class="status ' + report.status + '">' +
          labels[report.status] +
        '</span></td>' +
        '<td><div class="actions">' +
          '<button class="action-btn primary small" data-act="detail" data-id="' +
            esc(report.id) + '">Xem chi tiết</button>' +
          '<button class="action-btn small" data-act="ignore" data-id="' +
            esc(report.id) + '">Bỏ qua</button>' +
          '<button class="action-btn danger small" type="button" data-act="process" data-id="' +
            esc(report.id) + '">Xử lý vi phạm</button>' +
          '<button class="action-btn small" type="button" data-ai-trigger="report-triage" data-id="' +
            esc(report.id) + '">AI phân loại</button>' +
        '</div></td>' +
      '</tr>'
    )
    .join("") ||
    '<tr><td colspan="7" class="empty">Không tìm thấy báo cáo phù hợp. <button type="button" data-reset-filter>Xóa bộ lọc</button></td></tr>';

  $("#pagination").innerHTML =
    '<button data-page="' + Math.max(1, page - 1) + '" ' +
      (page === 1 ? "disabled" : "") +
      ' aria-label="Trang trước">‹</button>' +
    Array.from({ length: pages }, (_, i) =>
      '<button class="' + (page === i + 1 ? "active" : "") +
      '" data-page="' + (i + 1) + '">' + (i + 1) + '</button>'
    ).join("") +
    '<button data-page="' + (page + 1) +
      '" aria-label="Trang sau" ' + (page >= pages ? "disabled" : "") + '>›</button>' +
    '<select class="page-size" aria-label="Số dòng mỗi trang">' +
      '<option value="5" ' + (pageSize === 5 ? "selected" : "") + '>5 / trang</option>' +
      '<option value="10" ' + (pageSize === 10 ? "selected" : "") + '>10 / trang</option>' +
      '<option value="20" ' + (pageSize === 20 ? "selected" : "") + '>20 / trang</option>' +
    '</select>';
}

function openDetail(report) {
  selected = report.id;
  $("#detailTitle").textContent = "Báo cáo #" + report.id;
  $("#detailText").textContent =
    "Người gửi: " + report.sender +
    "\nĐối tượng: " + report.target + " (" + report.type + ")" +
    "\nLý do: " + report.reason +
    "\nNgày gửi: " + report.date +
    "\nTrạng thái: " + labels[report.status];
  $("#detailEffect").textContent =
    (report.effect || "Chưa có quyết định xử lý.") +
    (report.aiSummary ? "\nTóm tắt AI: " + report.aiSummary : "") +
    (report.aiAssessment ? "\nYếu tố AI: " + (report.aiAssessment.factors || []).join("; ") : "");
  $("#verify").hidden = report.status !== "pending";
  $("#ignore").hidden =
    report.status === "handled" || report.status === "dismissed";
  $("#process").hidden =
    report.status === "handled" || report.status === "dismissed";
  dialog.showModal();
}

function act(report, action) {
  if (!report) return;
  const previous = { status: report.status, effect: report.effect };
  let message = "";
  if (action === "verify") {
    report.status = "verifying";
    message = "Đã chuyển báo cáo sang xác minh.";
  } else if (action === "ignore") {
    if (!confirm("Bỏ qua báo cáo " + report.id + "?")) return;
    report.status = "dismissed";
    report.effect = "Báo cáo được đánh dấu đã bỏ qua.";
    message = "Đã bỏ qua báo cáo.";
  } else if (action === "process") {
    if (!confirm("Xử lý vi phạm của “" + report.target + "”?")) return;
    report.status = "handled";
    report.effect = report.type === "Người dùng"
      ? "Tài khoản bị tạm ngưng trong demo."
      : "Sản phẩm bị ẩn trong demo.";
    message = "Đã xử lý báo cáo vi phạm.";
  } else {
    return;
  }
  if (!save()) {
    Object.assign(report, previous);
    return notify("Không thể lưu quyết định. Hãy kiểm tra bộ nhớ trình duyệt.");
  }
  dialog.close();
  render();
  notify(message);
}
document.querySelector(".data-table thead").addEventListener("click", event => {
  const button = event.target.closest("[data-sort]");
  if (!button) return;
  if (sortKey === button.dataset.sort) {
    sortDirection = sortDirection === "asc" ? "desc" : "asc";
  } else {
    sortKey = button.dataset.sort;
    sortDirection = sortKey === "date" ? "desc" : "asc";
  }
  page = 1;
  render();
});
["#search", "#status", "#reason", "#period"].forEach(selector => {
  $(selector).addEventListener(
    selector === "#search" ? "input" : "change",
    () => {
      page = 1;
      render();
    }
  );
});

wireHeader(value => {
  query = value;
  $("#search").value = value;
  render();
});

$("#rows").addEventListener("click", e => {
  if (e.target.closest("[data-reset-filter]")) {
    $("#search").value = "";
    $("#status").value = "all";
    $("#reason").value = "all";
    $("#period").value = "all";
    query = "";
    page = 1;
    return render();
  }
  const button = e.target.closest("[data-act]");
  if (!button) return;

  const report = reports.find(x => x.id === button.dataset.id);
  if (button.dataset.act === "detail") {
    openDetail(report);
  } else {
    act(report, button.dataset.act);
  }
});

$("#pagination").addEventListener("click", e => {
  if (e.target.dataset.page) {
    page = Number(e.target.dataset.page);
    render();
  }
});

$("#pagination").addEventListener("change", e => {
  if (e.target.matches(".page-size")) {
    pageSize = Number(e.target.value) || 10;
    page = 1;
    render();
  }
});

$("#close").addEventListener("click", () => dialog.close());
$("#cancel").addEventListener("click", () => dialog.close());

dialog.addEventListener("click", e => {
  if (e.target === dialog) dialog.close();
});

CraftLinkAI.bind({
  feature: "report-triage",
  title: "AI phân loại và ưu tiên báo cáo",
  inputLabel: "Bối cảnh bổ sung (không bắt buộc)",
  placeholder: "Nêu tiêu chí ưu tiên hoặc thông tin cần kiểm tra.",
  examples: ["Ưu tiên rủi ro an toàn cho người mua", "Kiểm tra dấu hiệu nội dung sai lệch"],
  actions: [
    { value: "verifying", label: "Chuyển xác minh" },
    { value: "dismissed", label: "Đề xuất bỏ qua" },
    { value: "handled", label: "Đề xuất xử lý" }
  ],
  getContext: trigger => {
    const report = reports.find(item => item.id === trigger.dataset.id);
    return report ? { id: report.id, target: report.target, type: report.type, reason: report.reason, date: report.date, status: report.status } : {};
  },
  prefill: context => [context.target, context.type, context.reason].filter(Boolean).join(" — "),
  apply: (result, draft, action, context) => {
    const report = reports.find(item => item.id === context.id);
    if (!report) return false;
    const previous = { status: report.status, effect: report.effect, aiPriority: report.aiPriority, aiSummary: report.aiSummary, aiAssessment: report.aiAssessment };
    report.status = action;
    report.aiPriority = result.priority || "medium";
    report.aiSummary = draft || result.summary || "";
    report.aiAssessment = { assessedAt: new Date().toISOString(), action, confidence: result.confidence, factors: result.factors, recommendation: result.recommendation };
    report.effect = "AI đề xuất: " + (result.recommendation || "") + " Kiểm duyệt viên đã xác nhận.";
    if (!save()) {
      Object.assign(report, previous);
      notify("Không thể lưu kết quả AI. Hãy thử lại.");
      return false;
    }
    render();
    notify("Đã lưu phân loại báo cáo theo quyết định của kiểm duyệt viên.");
    return true;
  }
});

["verify", "ignore", "process"].forEach(id => {
  $("#" + id).addEventListener("click", () => {
    act(reports.find(report => report.id === selected), id);
  });
});

loadData();










