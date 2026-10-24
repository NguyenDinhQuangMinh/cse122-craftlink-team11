(() => {
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
    if (event.key === "Escape") setMenu(false);
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



