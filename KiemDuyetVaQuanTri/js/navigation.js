(() => {
  const ROLE_ACCESS = {
    admin: ["admin"],
    moderator: ["admin", "moderator"]
  };

  // Khối 403: nếu trình duyệt đang có phiên của một vai khác (do phân hệ đăng nhập
  // của SV2 ghi vào mốc cl_session) thì đưa người dùng sang trang 403 của site.
  // Không có phiên = chế độ demo, sáu màn vẫn mở để người chấm xem tự do.
  function guardRole() {
    let session = null;
    for (const store of [window.localStorage, window.sessionStorage]) {
      try {
        const value = store.getItem("cl_session");
        if (value) session = JSON.parse(value);
        if (session) break;
      } catch {
        session = null;
      }
    }
    if (!session || !session.role) return;
    const required = document.body.classList.contains("moderator") ? "moderator" : "admin";
    const allowed = ROLE_ACCESS[required] || ["admin"];
    if (allowed.includes(session.role)) return;
    const marker = location.href.indexOf("/KiemDuyetVaQuanTri/");
    const root = marker > -1 ? location.href.slice(0, marker + 1) : new URL("../../", location.href).href;
    const target = new URL("403.html", root);
    target.searchParams.set("need", required);
    target.searchParams.set("screen", location.pathname);
    location.replace(target.href);
  }

  guardRole();

  const pages = {
    dashboard: "../01-dashboard/index.html",
    categories: "../02-category-management/index.html",
    users: "../03-user-management/index.html",
    queue: "../04-moderation-queue/index.html",
    reports: "../05-report-center/index.html",
    rules: "../06-content-guidelines/index.html"
  };
  const toggle = document.querySelector("#menuToggle");

  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    toggle?.setAttribute("aria-expanded", String(open));
    toggle?.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
  }

  toggle?.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    setMenu(false);
    document.querySelectorAll(".popover:not([hidden])").forEach(popover => { popover.hidden = true; });
  });
  document.addEventListener("click", event => {
    if (document.body.classList.contains("menu-open") &&
        !event.target.closest("#sidebar, #menuToggle")) setMenu(false);
  });

  document.addEventListener("click", event => {
    const button = event.target.closest(".side-nav [data-page], .brand[data-page]");
    if (!button) return;
    event.preventDefault();
    const destination = pages[button.dataset.page];
    if (!destination) return;
    setMenu(false);
    if (window.parent !== window) {
      window.parent.postMessage({ type: "craftlink:navigate", page: button.dataset.page }, window.location.origin);
    } else {
      window.location.assign(destination);
    }
  });
})();



