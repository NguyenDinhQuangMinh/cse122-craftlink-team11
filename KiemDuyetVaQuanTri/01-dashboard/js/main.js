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

const logs = [
  ["16/05/2024 10:24", "Thêm mới danh mục Gốm sứ thủ công", "Quản trị viên Admin", "success"],
  ["16/05/2024 08:15", "Cập nhật thông tin tài khoản thợ thủ công", "Quản trị viên Admin", "success"],
  ["15/05/2024 16:42", "Xóa danh mục Đồ da cao cấp", "Quản trị viên Admin", "success"],
  ["15/05/2024 14:08", "Đăng nhập hệ thống", "Quản trị viên Admin", "success"],
  ["15/05/2024 11:33", "Cảnh báo tồn kho thấp - Đồ gỗ nghệ thuật", "Hệ thống", "warn"]
];

let metricsRefreshing = false;

async function refreshMetrics() {
  if (metricsRefreshing) return;
  metricsRefreshing = true;
  const makersNode = $("#activeMakers");
  const alertsNode = $("#systemAlerts");
  if (!makersNode || !alertsNode) {
    metricsRefreshing = false;
    return;
  }
  makersNode.textContent = "…";
  alertsNode.textContent = "…";
  try {
    const [users, products, reports] = await Promise.all([
      CraftLinkAPI.load("users", "../assets/data/users.json", "craftlink-slide03-users-v2"),
      CraftLinkAPI.load("products", "../assets/data/products.json", "craftlink-slide04-products-v2"),
      CraftLinkAPI.load("reports", "../assets/data/reports.json", "craftlink-slide05-reports-v2")
    ]);
    makersNode.textContent = users.filter(user => user.role === "maker" && user.active).length;
    alertsNode.textContent = products.filter(item => item.status === "pending").length +
      reports.filter(report => report.status === "pending").length;
  } catch {
    makersNode.textContent = "—";
    alertsNode.textContent = "—";
  } finally {
    metricsRefreshing = false;
  }
}

CraftLinkAPI.subscribe(event => {
  if (["users", "products", "reports"].includes(event.collection)) refreshMetrics();
});

let query = "";

function renderLogs() {
  const rows = logs.filter(row =>
    row.join(" ").toLocaleLowerCase("vi").includes(query.toLocaleLowerCase("vi"))
  );

  $("#logs").innerHTML = rows.map(row =>
    '<tr><td>' + esc(row[0]) + '</td>' +
    '<td>' + esc(row[1]) + '</td>' +
    '<td>' + esc(row[2]) + '</td>' +
    '<td><span class="status ' + (row[3] === "warn" ? "warn" : "") + '">' +
    (row[3] === "warn" ? "Cảnh báo" : "Thành công") +
    '</span></td></tr>'
  ).join("") ||
    '<tr><td colspan="4" class="empty">Không tìm thấy hoạt động.</td></tr>';
}

wireHeader(value => {
  query = value;
  renderLogs();
});

renderLogs();

refreshMetrics();



