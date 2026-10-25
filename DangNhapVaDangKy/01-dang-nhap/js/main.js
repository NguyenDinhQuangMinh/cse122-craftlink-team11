(() => {
  const { toast, modal, validators, setFieldError, findUser, verifyPassword, getAttempts, setAttempts, setSession, clearSession, setLoading, wait, ROLE_LABELS, params } = window.CL;

  const MAX_ATTEMPTS = 5;
  const LOCK_MS = 60_000;
  const LAST_ID_KEY = "cl_last_identifier";

  const ROLE_COPY = {
    customer: {
      eyebrow: "Chào mừng bạn trở lại",
      tone: "",
      subtitle: "Khám phá sản phẩm thủ công và theo dõi các yêu cầu đặt làm của bạn",
      placeholder: "nhap@email.com",
    },
    artisan: {
      eyebrow: "Chào mừng bạn trở lại",
      tone: "",
      subtitle: "Truy cập gian hàng và quản lý các yêu cầu đặt làm của bạn",
      placeholder: "nhap@email.com",
    },
    admin: {
      eyebrow: "Cổng truy cập bảo mật",
      tone: "terra",
      subtitle: "Dành cho tài khoản quản trị viên và kiểm duyệt được cấp quyền",
      placeholder: "admin@craftlink.vn",
    },
  };

  const form = document.getElementById("loginForm");
  const idInput = form.identifier;
  const pwInput = form.password;
  const remember = form.remember;
  const btn = document.getElementById("loginBtn");
  const alertBox = document.getElementById("loginAlert");
  const tabs = [...document.querySelectorAll(".role-tab")];
  const eyebrow = document.getElementById("eyebrow");
  const subtitle = document.getElementById("subtitle");
  const forgotLink = document.getElementById("forgotLink");

  let role = "customer";
  let lockTimer;

  function setRole(next, { focus = false, keepAlert = false } = {}) {
    if (!ROLE_COPY[next]) next = "customer";
    role = next;
    document.body.dataset.role = next;
    tabs.forEach((t) => {
      const on = t.dataset.role === next;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    const copy = ROLE_COPY[next];
    eyebrow.textContent = copy.eyebrow;
    eyebrow.className = `eyebrow ${copy.tone}`;
    subtitle.textContent = copy.subtitle;
    idInput.placeholder = copy.placeholder;
    forgotLink.href = `forgot-password.html?role=${next}`;
    const url = new URL(location.href);
    url.searchParams.set("role", next);
    history.replaceState(null, "", url);
    if (!keepAlert) hideAlert();
    [idInput, pwInput].forEach((f) => setFieldError(f, ""));
    refreshLock();
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => setRole(tab.dataset.role));
    tab.addEventListener("keydown", (e) => {
      const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!dir) return;
      e.preventDefault();
      setRole(tabs[(i + dir + tabs.length) % tabs.length].dataset.role, { focus: true });
    });
  });

  function showAlert(html, type = "") {
    alertBox.className = `form-alert ${type}`;
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
        btn.textContent = `Thử lại sau ${left}s`;
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
    } else if ((id.includes("@") || role === "admin") && !validators.email(id)) {
      setFieldError(idInput, role === "admin" ? "Tài khoản quản trị phải đăng nhập bằng email được cấp." : "Email không hợp lệ.");
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
      showAlert(`Bạn đã nhập sai ${MAX_ATTEMPTS} lần. Tài khoản tạm khóa đăng nhập trong ${LOCK_MS / 1000} giây.`);
      refreshLock();
      return;
    }
    setAttempts(key, { count, until: 0 });
    const left = MAX_ATTEMPTS - count;
    showAlert(`Email/tên đăng nhập hoặc mật khẩu không đúng.${left <= 2 ? ` Bạn còn ${left} lần thử.` : ""}`);
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

    if (user.role !== role) {
      showAlert(
        `Tài khoản này thuộc vai trò <b>${ROLE_LABELS[user.role]}</b>. <button type="button" data-switch="${user.role}">Chuyển sang tab này</button>`,
        "info"
      );
      alertBox.querySelector("[data-switch]").addEventListener("click", () => {
        setRole(user.role, { keepAlert: false });
        btn.focus();
      });
      return;
    }

    setAttempts(key, null);
    setSession(user, remember.checked);
    if (remember.checked) localStorage.setItem(LAST_ID_KEY, JSON.stringify({ role, id: idInput.value.trim() }));
    else localStorage.removeItem(LAST_ID_KEY);
    pwInput.value = "";

    toast(`Đăng nhập thành công. Xin chào ${user.name}!`);
    modal({
      title: "Đăng nhập thành công",
      body: `Xin chào ${user.name}! Bạn đang đăng nhập với vai trò ${ROLE_LABELS[user.role]}.`,
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

  // Initial state: role from URL, prefill email, remembered identifier
  const last = JSON.parse(localStorage.getItem(LAST_ID_KEY) || "null");
  const initialRole = params.get("role") || last?.role || "customer";
  setRole(initialRole);
  if (params.get("email")) {
    idInput.value = params.get("email");
    pwInput.focus();
  } else if (last && last.role === role) {
    idInput.value = last.id;
    remember.checked = true;
  }
  refreshLock();
  if (params.get("registered")) toast("Tạo tài khoản thành công! Vui lòng đăng nhập để tiếp tục.");
  if (params.get("reset")) toast("Đặt lại mật khẩu thành công! Hãy đăng nhập bằng mật khẩu mới.");
})();
