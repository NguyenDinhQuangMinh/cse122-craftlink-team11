/* GIAO DIEN DANG NHAP RIENG CUA VAI QUẢN TRỊ VIÊN & KIỂM DUYỆT.
   File nay tu chua, khong <script src> nao khac:
   - phan dau: sprite icon, toast, modal, kiem tra bieu mau, localStorage tai khoan, tro ly AI
     (copy tu assets/js/common.js, cat bo ham rieng trang dang ky/quen mat khau);
   - phan cuoi: dang nhap cua dung vai nay, khong con chuyen tab vi moi vai mot trang. */

(() => {
  const ICONS = {
    vase: '<path d="M9 3h6"/><path d="M10 3v3.2c0 1-3.5 2.6-3.5 7.3a5.5 5.5 0 0 0 11 0c0-4.7-3.5-6.3-3.5-7.3V3"/><path d="M7.2 13h9.6"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    "eye-off": '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><path d="M2 2l20 20"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    store: '<path d="M3 9l1.5-5h15L21 9"/><path d="M3 9h18v1.5a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z"/><path d="M5 13v8h14v-8"/><path d="M10 21v-5h4v5"/>',
    home: '<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    box: '<path d="M21 8 12 3 3 8v8l9 5 9-5z"/><path d="m3 8 9 5 9-5"/><path d="M12 13v8"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h5"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    star: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    pie: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    "shield-check": '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    "clipboard-check": '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    "clipboard-list": '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>',
    sparkles: '<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M19 3v4M17 5h4M5 17v4M3 19h4"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    headset: '<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
    "arrow-left": '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    "check-circle": '<circle cx="12" cy="12" r="10"/><path d="m8 12 3 3 5-6"/>',
    "chevron-down": '<path d="m6 9 6 6 6-6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
    tag: '<path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5"/>',
    bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18M16 10a4 4 0 0 1-8 0"/>',
    palette: '<circle cx="13.5" cy="6.5" r="1"/><circle cx="17.5" cy="10.5" r="1"/><circle cx="8.5" cy="7.5" r="1"/><circle cx="6.5" cy="12.5" r="1"/><path d="M12 2a10 10 0 0 0 0 20c.93 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99a1.5 1.5 0 0 1 1.5-1.5H16a6 6 0 0 0 6-6c0-4.96-4.48-9-10-9z"/>',
    grid: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22v-7"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
    key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3L22 7l-3-3"/>',
  };

  const sprite = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  sprite.setAttribute("aria-hidden", "true");
  sprite.style.display = "none";
  sprite.innerHTML = Object.entries(ICONS)
    .map(
      ([id, body]) =>
        `<symbol id="i-${id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${body}</symbol>`
    )
    .join("");
  document.body.prepend(sprite);

  const icon = (name, cls = "ic") => `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;

  const escapeHtml = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  // ---------- Toast ----------
  let stack;
  function toast(message, type = "success", duration = 3800) {
    if (!stack) {
      stack = document.createElement("div");
      stack.className = "toast-stack";
      stack.setAttribute("role", "status");
      stack.setAttribute("aria-live", "polite");
      document.body.append(stack);
    }
    const el = document.createElement("div");
    el.className = `toast ${type}`;
    const ic = type === "error" ? "alert" : type === "info" ? "info" : "check-circle";
    el.innerHTML = `${icon(ic)}<p>${escapeHtml(message)}</p><button class="icon-btn" type="button" aria-label="Đóng thông báo">${icon("x")}</button>`;
    const close = () => {
      el.classList.add("leaving");
      setTimeout(() => el.remove(), 250);
    };
    el.querySelector("button").addEventListener("click", close);
    stack.append(el);
    setTimeout(close, duration);
  }

  // ---------- Validation ----------
  const validators = {
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  };

  function setFieldError(field, message) {
    const wrap = field.closest(".field");
    if (!wrap) return;
    const err = wrap.querySelector(".error-text");
    wrap.classList.toggle("invalid", Boolean(message));
    if (err) err.textContent = message || "";
    field.setAttribute("aria-invalid", message ? "true" : "false");
  }

  // ---------- Storage / Auth ----------
  const USERS_KEY = "cl_users";
  const SESSION_KEY = "cl_session";
  const ATTEMPT_KEY = "cl_login_attempts";

  const ROLE_LABELS = {
    customer: "Khách hàng",
    artisan: "Thợ thủ công / Nghệ nhân",
    admin: "Quản trị viên & Kiểm duyệt",
  };

  const SEED_USERS = [
    { name: "Nguyễn Minh Anh", username: "khachhang", email: "khachhang@craftlink.vn", phone: "0901234567", role: "customer", password: "Khach@123" },
    { name: "Trần Văn Gốm", username: "nghenhan", email: "nghenhan@craftlink.vn", phone: "0912345678", role: "artisan", password: "Nghenhan@123", shop: "Xưởng Gốm Bát Tràng", specialty: "Gốm sứ" },
    { name: "Quản Trị CraftLink", username: "admin", email: "admin@craftlink.vn", phone: "0987654321", role: "admin", password: "Admin@123" },
  ];

  async function hash(text) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`craftlink:${text}`));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  const readJSON = (store, key, fallback) => {
    try {
      return JSON.parse(store.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  };

  async function getUsers() {
    let users = readJSON(localStorage, USERS_KEY, null);
    if (!Array.isArray(users)) {
      users = await Promise.all(
        SEED_USERS.map(async ({ password, ...u }) => ({ ...u, passwordHash: await hash(password), createdAt: new Date().toISOString() }))
      );
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    return users;
  }

  const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

  async function findUser(identifier) {
    const id = identifier.trim().toLowerCase();
    return (await getUsers()).find((u) => u.email.toLowerCase() === id || u.username.toLowerCase() === id) || null;
  }

  async function verifyPassword(user, password) {
    return user.passwordHash === (await hash(password));
  }

  function getAttempts(key) {
    const all = readJSON(localStorage, ATTEMPT_KEY, {});
    return all[key] || { count: 0, until: 0 };
  }

  function setAttempts(key, value) {
    const all = readJSON(localStorage, ATTEMPT_KEY, {});
    if (value) all[key] = value;
    else delete all[key];
    localStorage.setItem(ATTEMPT_KEY, JSON.stringify(all));
  }

  function getSession() {
    return readJSON(localStorage, SESSION_KEY, null) || readJSON(sessionStorage, SESSION_KEY, null);
  }

  function setSession(user, remember) {
    const session = { name: user.name, email: user.email, role: user.role, at: new Date().toISOString() };
    (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, JSON.stringify(session));
    (remember ? sessionStorage : localStorage).removeItem(SESSION_KEY);
    renderUserChip();
    return session;
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    renderUserChip();
  }

  const initials = (name) =>
    name
      .trim()
      .split(/\s+/)
      .slice(-2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

  function renderUserChip() {
    const slot = document.querySelector(".header-actions");
    if (!slot) return;
    const s = getSession();
    if (!s) {
      slot.innerHTML = "";
      return;
    }
    slot.innerHTML = `<div class="user-chip" title="${escapeHtml(ROLE_LABELS[s.role])}">
        <span class="avatar">${escapeHtml(initials(s.name))}</span>
        <span>${escapeHtml(s.name)}</span>
        <button class="icon-btn" type="button" data-logout aria-label="Đăng xuất">${icon("logout")}</button>
      </div>`;
    slot.querySelector("[data-logout]").addEventListener("click", () => {
      clearSession();
      toast("Bạn đã đăng xuất khỏi CraftLink.", "info");
    });
  }

  // ---------- Modal ----------
  function modal({ iconName = "check-circle", title, body, actions }) {
    const wrap = document.createElement("div");
    wrap.className = "modal";
    wrap.innerHTML = `<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <span class="badge">${icon(iconName)}</span>
        <h2 id="modal-title">${escapeHtml(title)}</h2>
        <p>${escapeHtml(body)}</p>
        <div class="modal-actions"></div>
      </div>`;
    const prevFocus = document.activeElement;
    const close = () => {
      wrap.remove();
      document.removeEventListener("keydown", onKey);
      prevFocus?.focus?.();
    };
    const onKey = (e) => e.key === "Escape" && close();
    const bar = wrap.querySelector(".modal-actions");
    actions.forEach(({ label, cls = "btn-ghost", onClick }) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = `btn ${cls}`;
      b.textContent = label;
      b.addEventListener("click", () => {
        close();
        onClick?.();
      });
      bar.append(b);
    });
    wrap.addEventListener("click", (e) => e.target === wrap && close());
    document.addEventListener("keydown", onKey);
    document.body.append(wrap);
    bar.lastElementChild?.focus();
  }

  // ---------- UI helpers ----------
  function setLoading(btn, loading, label) {
    if (loading) {
      btn.dataset.label = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner" aria-hidden="true"></span>${escapeHtml(label || "Đang xử lý...")}`;
    } else {
      btn.disabled = false;
      if (btn.dataset.label) btn.innerHTML = btn.dataset.label;
    }
  }

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  function initPasswordToggles(root = document) {
    root.querySelectorAll(".pw-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const input = btn.parentElement.querySelector("input");
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        btn.setAttribute("aria-pressed", String(show));
        btn.setAttribute("aria-label", show ? "Ẩn mật khẩu" : "Hiện mật khẩu");
        btn.querySelector("use").setAttribute("href", show ? "#i-eye-off" : "#i-eye");
      });
    });
  }

  function initSoonLinks() {
    document.querySelectorAll("[data-soon]").forEach((a) =>
      a.addEventListener("click", (e) => {
        e.preventDefault();
        toast(`Trang “${a.textContent.trim()}” đang được phát triển.`, "info");
      })
    );
  }

  // ---------- AI assistant ----------
  const BOT_RULES = [
    { k: ["đăng ký", "dang ky", "tạo tài khoản", "tao tai khoan"], a: "Bạn có thể tạo tài khoản tại trang Đăng ký. Chọn “Tôi muốn Mua hàng” nếu là khách hàng hoặc “Tôi là Thợ thủ công” để mở gian hàng." },
    { k: ["quên", "mật khẩu", "mat khau", "otp"], a: "Chọn “Quên mật khẩu?” trên form đăng nhập, nhập email đã đăng ký, sau đó nhập mã OTP 6 số và tạo mật khẩu mới." },
    { k: ["nghệ nhân", "gian hàng", "bán", "thợ"], a: "Nghệ nhân có thể đăng sản phẩm, nhận brief tùy biến từ khách hàng và gửi proposal báo giá ngay trên CraftLink." },
    { k: ["đặt làm", "brief", "tùy biến", "theo yêu cầu"], a: "Để đặt làm riêng, hãy gửi brief mô tả mong muốn, ngân sách và thời gian. Nghệ nhân phù hợp sẽ gửi proposal cho bạn." },
    { k: ["admin", "quản trị", "kiểm duyệt"], a: "Tài khoản Quản trị viên & Kiểm duyệt do CraftLink cấp, không hỗ trợ đăng ký công khai." },
    { k: ["xin chào", "hello", "hi", "chào"], a: "Xin chào! Mình là Trợ lý AI CraftLink. Mình có thể giúp gì cho bạn?" },
  ];

  function botReply(text) {
    const t = text.toLowerCase();
    const rule = BOT_RULES.find((r) => r.k.some((k) => t.includes(k)));
    return rule ? rule.a : "Mình chưa hiểu rõ câu hỏi. Bạn có thể hỏi về đăng ký, đăng nhập, quên mật khẩu, đặt làm riêng hoặc mở gian hàng nhé.";
  }

  function initAssistant() {
    const triggers = document.querySelectorAll("[data-open-assistant]");
    if (!triggers.length) return;
    let panel;
    const open = () => {
      if (panel) {
        panel.querySelector("input").focus();
        return;
      }
      panel = document.createElement("section");
      panel.className = "assistant";
      panel.setAttribute("aria-label", "Trợ lý AI CraftLink");
      panel.innerHTML = `
        <header class="assistant-head">${icon("sparkles")}<b>Trợ lý AI CraftLink</b>
          <button class="icon-btn" type="button" aria-label="Đóng trợ lý">${icon("x")}</button></header>
        <div class="assistant-log" aria-live="polite"></div>
        <div class="quick-replies">
          <button type="button">Cách đăng ký?</button>
          <button type="button">Quên mật khẩu</button>
          <button type="button">Đặt làm theo yêu cầu</button>
        </div>
        <form class="assistant-form"><input class="input" name="q" placeholder="Nhập câu hỏi..." autocomplete="off" aria-label="Câu hỏi"/>
          <button class="btn btn-sage" type="submit" aria-label="Gửi">${icon("send")}</button></form>`;
      const log = panel.querySelector(".assistant-log");
      const add = (text, who) => {
        const m = document.createElement("div");
        m.className = `msg ${who}`;
        m.textContent = text;
        log.append(m);
        log.scrollTop = log.scrollHeight;
      };
      const ask = async (q) => {
        if (!q.trim()) return;
        add(q, "user");
        await wait(450);
        add(botReply(q), "bot");
      };
      add("Xin chào! Mình là Trợ lý AI CraftLink. Bạn cần hỗ trợ gì về tài khoản hoặc sản phẩm thủ công?", "bot");
      panel.querySelector(".assistant-head button").addEventListener("click", () => {
        panel.remove();
        panel = null;
      });
      panel.querySelectorAll(".quick-replies button").forEach((b) => b.addEventListener("click", () => ask(b.textContent)));
      panel.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const input = e.target.q;
        ask(input.value);
        input.value = "";
      });
      document.body.append(panel);
      panel.querySelector("input").focus();
    };
    triggers.forEach((t) => t.addEventListener("click", open));
  }

  const params = new URLSearchParams(location.search);

  window.CL = {
    icon,
    toast,
    modal,
    validators,
    setFieldError,
    getUsers,
    findUser,
    verifyPassword,
    getAttempts,
    setAttempts,
    getSession,
    setSession,
    clearSession,
    setLoading,
    wait,
    initPasswordToggles,
    ROLE_LABELS,
    params,
  };

  getUsers();
  renderUserChip();
  initPasswordToggles();
  initSoonLinks();
  initAssistant();
})();

(() => {
  const { toast, modal, validators, setFieldError, findUser, verifyPassword, getAttempts, setAttempts, setSession, clearSession, setLoading, wait, ROLE_LABELS, params } = window.CL;

  const ROLE = "admin";
  const TRANG_THEO_VAI = { customer: "khach-hang.html", artisan: "nghe-nhan.html", admin: "quan-tri.html" };
  const MAX_ATTEMPTS = 5;
  const LOCK_MS = 60000;
  const LAST_ID_KEY = "cl_last_identifier_admin";

  const form = document.getElementById("loginForm");
  const idInput = form.identifier;
  const pwInput = form.password;
  const remember = form.remember;
  const btn = document.getElementById("loginBtn");
  const alertBox = document.getElementById("loginAlert");

  let lockTimer;

  function showAlert(html, type = "") {
    alertBox.className = "form-alert " + type;
    alertBox.innerHTML = html;
    alertBox.hidden = false;
  }

  function hideAlert() {
    alertBox.hidden = true;
    alertBox.innerHTML = "";
  }

  const attemptKey = () => idInput.value.trim().toLowerCase() || "_";

  function refreshLock() {
    clearInterval(lockTimer);
    const { until } = getAttempts(attemptKey());
    const tick = () => {
      const left = Math.ceil((until - Date.now()) / 1000);
      if (left > 0) {
        btn.disabled = true;
        btn.textContent = "Thử lại sau " + left + "s";
      } else {
        clearInterval(lockTimer);
        btn.disabled = false;
        btn.textContent = "Đăng Nhập";
      }
    };
    if (until > Date.now()) {
      tick();
      lockTimer = setInterval(tick, 1000);
    } else {
      btn.disabled = false;
      btn.textContent = "Đăng Nhập";
    }
  }

  function validate() {
    let ok = true;
    const id = idInput.value.trim();
    if (!id) {
      setFieldError(idInput, "Vui lòng nhập email hoặc tên đăng nhập.");
      ok = false;
    } else if (!validators.email(id)) {
      setFieldError(idInput, "Tài khoản quản trị phải đăng nhập bằng email được cấp.");
      ok = false;
    } else setFieldError(idInput, "");

    if (!pwInput.value) {
      setFieldError(pwInput, "Vui lòng nhập mật khẩu.");
      ok = false;
    } else if (pwInput.value.length < 6) {
      setFieldError(pwInput, "Mật khẩu phải có ít nhất 6 ký tự.");
      ok = false;
    } else setFieldError(pwInput, "");
    return ok;
  }

  [idInput, pwInput].forEach((f) =>
    f.addEventListener("input", () => {
      if (f.closest(".field").classList.contains("invalid")) validate();
      if (f === idInput) refreshLock();
    })
  );
  idInput.addEventListener("blur", () => idInput.value && validate());

  function registerFailure(key) {
    const rec = getAttempts(key);
    const count = rec.count + 1;
    if (count >= MAX_ATTEMPTS) {
      setAttempts(key, { count: 0, until: Date.now() + LOCK_MS });
      showAlert("Bạn đã nhập sai " + MAX_ATTEMPTS + " lần. Tài khoản tạm khóa đăng nhập trong " + LOCK_MS / 1000 + " giây.");
      refreshLock();
      return;
    }
    setAttempts(key, { count, until: 0 });
    const left = MAX_ATTEMPTS - count;
    showAlert("Email/tên đăng nhập hoặc mật khẩu không đúng." + (left <= 2 ? " Bạn còn " + left + " lần thử." : ""));
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideAlert();
    if (!validate()) {
      form.querySelector(".field.invalid input")?.focus();
      return;
    }
    const key = attemptKey();
    if (getAttempts(key).until > Date.now()) return refreshLock();

    setLoading(btn, true, "Đang đăng nhập...");
    await wait(600);
    const user = await findUser(idInput.value);
    const ok = user && (await verifyPassword(user, pwInput.value));
    setLoading(btn, false);

    if (!ok) {
      registerFailure(key);
      pwInput.select();
      return;
    }

    if (user.role !== ROLE) {
      showAlert(
        "Tài khoản này thuộc vai trò <b>" + ROLE_LABELS[user.role] + "</b>. <a class=\"link\" href=\"" + TRANG_THEO_VAI[user.role] + "\">Mở trang đăng nhập của vai đó</a>",
        "info"
      );
      return;
    }

    setAttempts(key, null);
    setSession(user, remember.checked);
    if (remember.checked) localStorage.setItem(LAST_ID_KEY, JSON.stringify({ role: ROLE, id: idInput.value.trim() }));
    else localStorage.removeItem(LAST_ID_KEY);
    pwInput.value = "";

    toast("Đăng nhập thành công. Xin chào " + user.name + "!");
    modal({
      title: "Đăng nhập thành công",
      body: "Xin chào " + user.name + "! Bạn đang đăng nhập với vai trò " + ROLE_LABELS[user.role] + ".",
      actions: [
        {
          label: "Đăng xuất",
          onClick: () => {
            clearSession();
            toast("Bạn đã đăng xuất khỏi CraftLink.", "info");
          },
        },
        { label: "Tiếp tục", cls: "btn-primary" },
      ],
    });
  });

  const last = JSON.parse(localStorage.getItem(LAST_ID_KEY) || "null");
  if (params.get("email")) {
    idInput.value = params.get("email");
    pwInput.focus();
  } else if (last) {
    idInput.value = last.id;
    remember.checked = true;
  }
  refreshLock();
  if (params.get("registered")) toast("Tạo tài khoản thành công! Vui lòng đăng nhập để tiếp tục.");
  if (params.get("reset")) toast("Đặt lại mật khẩu thành công! Hãy đăng nhập bằng mật khẩu mới.");
})();
