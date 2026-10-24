const $ = s => document.querySelector(s);
const toast = $("#toast");
let toastTimer;

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
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

const KEY = "craftlink-slide02-categories-slide-v2";
let items = [
  { id: "c1", name: "Gốm sứ thủ công", children: 3, products: 128, active: true, image: 1 },
  { id: "c2", name: "Đồ da cao cấp", children: 5, products: 96, active: true, image: 2 },
  { id: "c3", name: "Trang sức & Phụ kiện", children: 4, products: 156, active: true, image: 3 },
  { id: "c4", name: "Đồ gỗ nghệ thuật", children: 6, products: 203, active: true, image: 4 },
  { id: "c5", name: "Thêu dệt may mặc", children: 3, products: 74, active: false, image: 5 }
];
let query = "";
let loading = false;
let loadError = "";

try {
  const saved = JSON.parse(localStorage.getItem(KEY));
  if (Array.isArray(saved)) items = saved;
} catch {}

const form = $("#form");
const dialog = $("#editor");

function save() {
  return CraftLinkAPI.save("categories", items);
}

async function loadData() {
  loading = true;
  loadError = "";
  CraftLinkAPI.showState($("#rows"), "loading", "Đang tải danh mục…", { colSpan: 5 });
  try {
    items = await CraftLinkAPI.load("categories", "../assets/data/categories.json", KEY);
  } catch (error) {
    loadError = error.message || "Không thể tải danh mục.";
  } finally {
    loading = false;
    render();
  }
}

function render() {
  if (loading) return CraftLinkAPI.showState($("#rows"), "loading", "Đang tải danh mục…", { colSpan: 5 });
  if (loadError) return CraftLinkAPI.showState($("#rows"), "error", loadError, {
    colSpan: 5, actionLabel: "Thử lại", onAction: loadData
  });
  const q = ($("#search").value || query).toLocaleLowerCase("vi");

  $("#rows").innerHTML = items
    .filter(item => item.name.toLocaleLowerCase("vi").includes(q))
    .map(item =>
      '<tr class="category-row">' +
        '<td><div class="category-name">' +
          '<img class="category-thumb" src="' + esc(item.coverData || ("../assets/category-" +
          (Math.min(5, Math.max(1, Number(item.image) || 1))) + ".png")) +
          '" alt=""><span>' + esc(item.name) + '</span>' +
        '</div></td>' +
        '<td>' + Number(item.children || 0) + '</td>' +
        '<td>' + Number(item.products || 0) + '</td>' +
        '<td><span class="status ' + (item.active ? "" : "off") + '">' +
          (item.active ? "Hiển thị" : "Ẩn") +
        '</span></td>' +
        '<td><div class="category-actions">' +
          '<button class="switch ' + (item.active ? "on" : "") +
            '" type="button" data-act="toggle" data-id="' + esc(item.id) +
            '" aria-label="' + (item.active ? "Ẩn" : "Hiển thị") + " " +
            esc(item.name) + '"></button>' +
          '<button class="action-btn icon-action" type="button" data-act="edit" data-id="' +
            esc(item.id) + '" aria-label="Sửa">✎ Sửa</button>' +
          '<button class="action-btn icon-action" type="button" data-act="delete" data-id="' +
            esc(item.id) + '" aria-label="Xóa">▤ Xóa</button>' +
        '</div></td>' +
      '</tr>'
    )
    .join("") ||
    '<tr><td colspan="5" class="empty">Không tìm thấy danh mục. <button type="button" data-reset-filter>Xóa bộ lọc</button></td></tr>';
}

function edit(item) {
  form.reset();
  form.elements.id.value = item?.id || "";
  form.elements.name.value = item?.name || "";
  form.elements.children.value = item?.children || 0;
  form.elements.products.value = item?.products || 0;
  form.elements.cover.required = !item;
  const preview = $("#coverPreview");
  preview.src = item?.coverData || ("../assets/category-" + (Math.min(5, Math.max(1, Number(item?.image) || 1))) + ".png");
  preview.hidden = !item?.coverData && !item;
  $("#dialogTitle").textContent = item
    ? "Cập nhật danh mục"
    : "Thêm danh mục mới";
  dialog.showModal();
}

form.elements.cover.addEventListener("change", async () => {
  const file = form.elements.cover.files[0];
  if (!file) return;
  try {
    $("#coverPreview").src = await CraftLinkAPI.encodeImage(file, 1000);
    $("#coverPreview").hidden = false;
  } catch (error) {
    form.elements.cover.value = "";
    notify(error.message);
  }
});

$("#add").addEventListener("click", () => edit());
$("#close").addEventListener("click", () => dialog.close());
$("#cancel").addEventListener("click", () => dialog.close());

dialog.addEventListener("click", e => {
  if (e.target === dialog) dialog.close();
});

$("#search").addEventListener("input", () => render());

wireHeader(value => {
  query = value;
  $("#search").value = value;
  render();
});

$("#rows").addEventListener("click", e => {
  if (e.target.closest("[data-reset-filter]")) {
    $("#search").value = "";
    query = "";
    return render();
  }
  const button = e.target.closest("[data-act]");
  if (!button) return;

  const item = items.find(x => x.id === button.dataset.id);
  if (!item) return;

  if (button.dataset.act === "edit") return edit(item);

  if (button.dataset.act === "toggle") {
    const previous = item.active;
    item.active = !item.active;
    if (!save()) {
      item.active = previous;
      return notify("Không thể lưu trạng thái danh mục.");
    }
    render();
    notify(item.active ? "Đã bật hiển thị danh mục." : "Đã ẩn danh mục.");
    return;
  }

  if (confirm("Xóa danh mục “" + item.name + "”?")) {
    const index = items.indexOf(item);
    items.splice(index, 1);
    if (!save()) {
      items.splice(index, 0, item);
      return notify("Không thể xóa danh mục do lỗi lưu dữ liệu.");
    }
    render();
    notify("Đã xóa danh mục.");
  }
});

form.addEventListener("submit", async e => {
  e.preventDefault();
  if (!form.reportValidity()) return;

  const id = form.elements.id.value;
  const old = items.find(x => x.id === id);
  const name = form.elements.name.value.trim();
  if (items.some(item => item.id !== id && item.name.toLocaleLowerCase("vi") === name.toLocaleLowerCase("vi"))) {
    return notify("Tên danh mục này đã tồn tại.");
  }
  const previous = items;
  const submit = form.querySelector('[type="submit"]');
  submit.disabled = true;
  let coverData = old?.coverData || "";
  try {
    if (form.elements.cover.files[0]) coverData = await CraftLinkAPI.encodeImage(form.elements.cover.files[0], 1000);
  } catch (error) {
    submit.disabled = false;
    return notify(error.message);
  }
  const item = {
    id: id || "c" + Date.now(),
    name,
    children: Number(form.elements.children.value) || 0,
    products: Number(form.elements.products.value) || 0,
    active: old?.active ?? true,
    image: old?.image || 1,
    coverData
  };

  items = old
    ? items.map(x => x.id === id ? item : x)
    : [...items, item];

  if (!save()) {
    items = previous;
    submit.disabled = false;
    return notify("Không thể lưu danh mục vào bộ nhớ trình duyệt.");
  }
  submit.disabled = false;
  dialog.close();
  render();
  notify(old ? "Đã cập nhật danh mục." : "Bạn đã thêm danh mục thành công.");
});

loadData();




