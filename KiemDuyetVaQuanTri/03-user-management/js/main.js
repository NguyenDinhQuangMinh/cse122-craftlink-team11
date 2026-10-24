const $ = selector => document.querySelector(selector);
const KEY = "craftlink-slide03-users-v2";
const DATA_URL = "../assets/data/users.json";
const roleText = {
  buyer: "Khách hàng",
  maker: "Thợ thủ công (Maker)",
  moderator: "Kiểm duyệt viên (Moderator)"
};
let users = [];
let role = "all";
let query = "";
let loading = false;
let loadError = "";
const form = $("#userForm");
const dialog = $("#userEditor");

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
  return CraftLinkAPI.save("users", users);
}

async function loadData() {
  loading = true;
  loadError = "";
  render();
  try {
    users = await CraftLinkAPI.load("users", DATA_URL, KEY);
  } catch (error) {
    loadError = error.message || "Không thể tải tài khoản.";
  } finally {
    loading = false;
    render();
  }
}

function render() {
  const rows = $("#rows");
  if (loading) return CraftLinkAPI.showState(rows, "loading", "Đang tải tài khoản…", { colSpan: 6 });
  if (loadError) return CraftLinkAPI.showState(rows, "error", loadError, {
    colSpan: 6, actionLabel: "Thử lại", onAction: loadData
  });
  const found = users.filter(user =>
    (role === "all" || user.role === role) &&
    (user.name + " " + user.email).toLocaleLowerCase("vi").includes(query.toLocaleLowerCase("vi"))
  );
  rows.innerHTML = found.map(user => {
    const roleName = roleText[user.role] || "Chưa phân loại";
    const image = Math.min(5, Math.max(1, Number(user.image) || 1));
    const avatar = user.avatarData || "../assets/user-" + image + ".jpg";
    return '<tr><td><div class="user-cell">' +
      '<img src="' + esc(avatar) + '" alt=""><b>' + esc(user.name) + '</b></div></td>' +
      '<td>' + esc(user.email) + '</td>' +
      '<td><span class="role-pill ' + (["buyer", "maker", "moderator"].includes(user.role) ? user.role : "") + '">' + esc(roleName) + '</span></td>' +
      '<td>' + esc(user.date) + '</td>' +
      '<td><span class="user-state ' + (user.active ? "" : "locked") + '">' + (user.active ? "Hoạt động" : "Tạm dừng") + '</span></td>' +
      '<td><div class="user-actions">' +
        '<button class="action-btn" type="button" data-user-action="edit" data-email="' + esc(user.email) + '" aria-label="Sửa ' + esc(user.name) + '">Sửa</button>' +
        '<button class="switch ' + (user.active ? "on" : "") + '" type="button" data-user-action="toggle" data-email="' + esc(user.email) + '" aria-label="' + (user.active ? "Khóa " : "Mở khóa ") + esc(user.name) + '"></button>' +
        '<button class="action-btn danger" type="button" data-user-action="delete" data-email="' + esc(user.email) + '" aria-label="Xóa ' + esc(user.name) + '">Xóa</button>' +
      '</div></td></tr>';
  }).join("") || '<tr><td colspan="6" class="empty">Không tìm thấy tài khoản. <button type="button" data-reset-filter>Xóa bộ lọc</button></td></tr>';
}

function edit(user) {
  form.reset();
  form.elements.originalEmail.value = user?.email || "";
  form.elements.name.value = user?.name || "";
  form.elements.email.value = user?.email || "";
  form.elements.role.value = user?.role || "buyer";
  form.elements.avatar.required = !user;
  const preview = $("#avatarPreview");
  preview.src = user?.avatarData || ("../assets/user-" + (Math.min(5, Math.max(1, Number(user?.image) || 1))) + ".jpg");
  preview.hidden = !user?.avatarData && !user;
  $("#userDialogTitle").textContent = user ? "Cập nhật tài khoản" : "Thêm tài khoản";
  dialog.showModal();
}

form.elements.avatar.addEventListener("change", async () => {
  const file = form.elements.avatar.files[0];
  if (!file) return;
  try {
    $("#avatarPreview").src = await CraftLinkAPI.encodeImage(file, 420);
    $("#avatarPreview").hidden = false;
  } catch (error) {
    form.elements.avatar.value = "";
    notify(error.message);
  }
});

$("#addUser").addEventListener("click", () => edit());
$("#userClose").addEventListener("click", () => dialog.close());
$("#userCancel").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});
form.addEventListener("submit", async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const originalEmail = form.elements.originalEmail.value;
  const email = form.elements.email.value.trim().toLocaleLowerCase("vi");
  const old = users.find(user => user.email === originalEmail);
  if (users.some(user => user.email.toLocaleLowerCase("vi") === email && user !== old)) {
    return notify("Email này đã được sử dụng.");
  }

  const submit = form.querySelector('[type="submit"]');
  submit.disabled = true;
  let avatarData = old?.avatarData || "";
  try {
    if (form.elements.avatar.files[0]) avatarData = await CraftLinkAPI.encodeImage(form.elements.avatar.files[0], 420);
  } catch (error) {
    submit.disabled = false;
    return notify(error.message);
  }
  const updated = {
    name: form.elements.name.value.trim(),
    email,
    role: form.elements.role.value,
    date: old?.date || new Intl.DateTimeFormat("vi-VN").format(new Date()),
    active: old?.active ?? true,
    image: old?.image || ((users.length % 5) + 1),
    avatarData
  };
  const previous = users;
  users = old ? users.map(user => user === old ? updated : user) : [updated, ...users];
  if (!save()) {
    users = previous;
    submit.disabled = false;
    return notify("Không thể lưu tài khoản vào bộ nhớ trình duyệt.");
  }
  submit.disabled = false;
  dialog.close();
  render();
  notify(old ? "Đã cập nhật tài khoản." : "Bạn đã thêm tài khoản thành công.");
});

$("#search").addEventListener("input", event => {
  query = event.target.value;
  render();
});
document.querySelectorAll("[data-role]").forEach(button => {
  button.addEventListener("click", () => {
    role = button.dataset.role;
    document.querySelectorAll("[data-role]").forEach(tab => {
      tab.classList.toggle("selected", tab === button);
      tab.setAttribute("aria-pressed", String(tab === button));
    });
    render();
  });
});
$("#globalSearch").addEventListener("input", event => {
  query = event.target.value;
  $("#search").value = query;
  render();
});
$("#rows").addEventListener("click", event => {
  if (event.target.closest("[data-reset-filter]")) {
    $("#search").value = "";
    query = "";
    $('[data-role="all"]').click();
    return;
  }
  const button = event.target.closest("[data-user-action]");
  if (!button) return;
  const user = users.find(item => item.email === button.dataset.email);
  if (!user) return;

  if (button.dataset.userAction === "edit") return edit(user);
  if (button.dataset.userAction === "delete") {
    if (!confirm("Xóa tài khoản " + user.name + "?")) return;
    const index = users.indexOf(user);
    users.splice(index, 1);
    if (!save()) {
      users.splice(index, 0, user);
      return notify("Không thể xóa tài khoản do lỗi lưu dữ liệu.");
    }
    render();
    return notify("Đã xóa tài khoản.");
  }
  const wasActive = user.active;
  user.active = !user.active;
  if (!save()) {
    user.active = wasActive;
    return notify("Không thể lưu trạng thái tài khoản.");
  }
  render();
  notify(user.name + (user.active ? " đã được mở khóa." : " đã bị khóa."));
});

function wireHeader() {
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
}
wireHeader();
loadData();
