/* Bộ chuyển vai trò dùng chung cho 4 phân hệ (checklist mục 4 của barem).
   Mỗi trang chỉ cần một thẻ script; khung điều hướng được dựng bằng JS để
   không phải sửa HTML/CSS riêng của từng phân hệ. Bên trong GopTrang.html
   các màn quản trị chạy trong iframe nên tự bỏ qua, tránh hai bộ điều khiển. */
(function () {
  "use strict";

  if (window.top !== window.self) return;
  if (document.getElementById("cl-role-switcher")) return;

  var script = document.currentScript;
  var root = "";
  if (script && script.src) root = script.src.replace(/js\/role-switcher\.js(?:\?.*)?$/, "");
  if (!root) {
    var depth = location.pathname.split("/").filter(Boolean);
    var repo = depth.indexOf("cse122-craftlink-team11");
    var rest = repo >= 0 ? depth.length - repo - 1 : depth.length - 1;
    root = new URL("../".repeat(Math.max(rest, 0)), location.href).href;
  }

  var path = location.pathname;
  var roles = [
    {
      key: "customer",
      label: "Khách hàng",
      note: "Mua sắm, giỏ hàng, đơn hàng",
      href: root + "KhachHang/index.html",
      match: /\/KhachHang\//
    },
    {
      key: "seller",
      label: "Người bán",
      note: "Listing, brief, proposal, hồ sơ shop",
      href: root + "KhongGianNguoiBan/01-listing-management/index.html",
      match: /\/KhongGianNguoiBan\//
    },
    {
      key: "admin",
      label: "Quản trị và kiểm duyệt",
      note: "Sáu màn quản trị trong một khung",
      href: root + "KiemDuyetVaQuanTri/GopTrang.html",
      match: /\/KiemDuyetVaQuanTri\//
    }
  ];

  var css = [
    ".cl-rs{position:fixed;right:14px;bottom:14px;z-index:50;font-family:inherit;text-align:left}",
    ".cl-rs__btn{display:inline-flex;align-items:center;gap:8px;margin:0;padding:10px 14px;border:1px solid #d6cbbf;border-radius:999px;background:#fff;color:#3b322a;font:inherit;font-size:12px;font-weight:600;line-height:1;box-shadow:0 6px 18px #2319122e;cursor:pointer}",
    ".cl-rs__btn:hover{background:#fff8f2}",
    ".cl-rs__btn:focus-visible{outline:2px solid #c85a32;outline-offset:2px}",
    ".cl-rs__btn svg{width:16px;height:16px;flex:none}",
    ".cl-rs__menu{position:absolute;right:0;bottom:calc(100% + 8px);width:min(274px,calc(100vw - 24px));padding:8px;border:1px solid #e3d9cf;border-radius:14px;background:#fff;box-shadow:0 18px 44px #23191238}",
    ".cl-rs__menu[hidden]{display:none}",
    ".cl-rs__title{margin:6px 8px 8px;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#8b7c6d}",
    ".cl-rs__item{display:block;padding:9px 10px;border-radius:9px;color:#3b322a;text-decoration:none;font-size:13px;font-weight:600}",
    ".cl-rs__item span{display:block;margin-top:2px;font-size:11px;font-weight:500;color:#8b7c6d}",
    ".cl-rs__item:hover{background:#f6efe8}",
    ".cl-rs__item:focus-visible{outline:2px solid #c85a32;outline-offset:-2px}",
    ".cl-rs__item[aria-current=page]{background:#fdece1;box-shadow:inset 0 0 0 1px #f0c7ab}",
    ".cl-rs__item[aria-current=page] span{color:#9c5a37}",
    ".cl-rs__home{display:block;margin-top:6px;padding:10px;border-top:1px solid #efe6dd;color:#a05a3a;font-size:12px;font-weight:600;text-decoration:none}",
    ".cl-rs__home:hover{color:#7d4326;text-decoration:underline;text-underline-offset:3px}",
    "@media (max-width:400px){.cl-rs__btn{padding:11px}.cl-rs__btn b{display:none}}"
  ].join("");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var wrap = document.createElement("div");
  wrap.className = "cl-rs";
  wrap.id = "cl-role-switcher";

  var button = document.createElement("button");
  button.type = "button";
  button.className = "cl-rs__btn";
  button.setAttribute("aria-label", "Đổi vai trò — chuyển sang phân hệ khác");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-haspopup", "true");
  button.setAttribute("aria-controls", "cl-rs-menu");
  button.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M16 3h5v5"/><path d="M8 21H3v-5"/><path d="M21 3l-7.5 7.5"/><path d="M3 21l7.5-7.5"/></svg>' +
    "<b>Đổi vai trò</b>";

  var menu = document.createElement("div");
  menu.className = "cl-rs__menu";
  menu.id = "cl-rs-menu";
  menu.setAttribute("role", "menu");
  menu.setAttribute("aria-label", "Chuyển sang phân hệ khác");
  menu.hidden = true;

  var title = document.createElement("p");
  title.className = "cl-rs__title";
  title.textContent = "Xem giao diện theo vai";
  menu.appendChild(title);

  roles.forEach(function (role) {
    var link = document.createElement("a");
    link.className = "cl-rs__item";
    link.href = role.href;
    link.setAttribute("role", "menuitem");
    link.textContent = role.label;
    var note = document.createElement("span");
    note.textContent = role.note;
    link.appendChild(note);
    if (role.match.test(path)) link.setAttribute("aria-current", "page");
    menu.appendChild(link);
  });

  var home = document.createElement("a");
  home.className = "cl-rs__home";
  home.href = root + "index.html";
  home.setAttribute("role", "menuitem");
  home.textContent = "← Về trang chủ CraftLink";
  menu.appendChild(home);

  wrap.appendChild(button);
  wrap.appendChild(menu);
  document.body.appendChild(wrap);

  function setOpen(open) {
    menu.hidden = !open;
    button.setAttribute("aria-expanded", String(open));
    if (open) {
      var first = menu.querySelector(".cl-rs__item");
      if (first) first.focus();
    }
  }

  button.addEventListener("click", function (event) {
    event.stopPropagation();
    setOpen(menu.hidden);
  });

  document.addEventListener("click", function (event) {
    if (!menu.hidden && !wrap.contains(event.target)) setOpen(false);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !menu.hidden) {
      setOpen(false);
      button.focus();
    }
  });
})();
