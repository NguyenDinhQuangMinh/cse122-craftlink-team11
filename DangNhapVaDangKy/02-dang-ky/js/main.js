(() => {
  const { toast, validators, setFieldError, createUser, setLoading, wait, initStrengthMeter, params } = window.CL;

  const form = document.getElementById("registerForm");
  const btn = document.getElementById("registerBtn");
  const alertBox = document.getElementById("registerAlert");
  const loginLink = document.getElementById("loginLink");
  const tabs = [...document.querySelectorAll(".role-tab")];
  const segs = [...document.querySelectorAll(".seg-btn")];
  const f = form.elements;

  let role = "customer";

  function setRole(next, { focusTab = false } = {}) {
    if (next === "admin") {
      toast("Tài khoản Quản trị viên & Kiểm duyệt do CraftLink cấp, không hỗ trợ đăng ký công khai.", "info", 5000);
      alertBox.className = "form-alert info";
      alertBox.innerHTML = 'Tài khoản quản trị không hỗ trợ đăng ký công khai. <a class="link" href="../01-dang-nhap/index.html?role=admin">Đến cổng đăng nhập quản trị</a>';
      alertBox.hidden = false;
      return;
    }
    if (next !== "artisan") next = "customer";
    role = next;
    document.body.dataset.role = next;
    tabs.forEach((t) => {
      const on = t.dataset.role === next;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      if (on && focusTab) t.focus();
    });
    segs.forEach((s) => s.setAttribute("aria-checked", String(s.dataset.role === next)));
    document.title = next === "artisan" ? "Tạo tài khoản Nghệ nhân – CraftLink" : "Tạo tài khoản – CraftLink";
    loginLink.href = `../01-dang-nhap/index.html?role=${next}`;
    alertBox.hidden = true;
    const url = new URL(location.href);
    url.searchParams.set("role", next);
    history.replaceState(null, "", url);
    ["shop"].forEach((n) => setFieldError(f[n], ""));
    setSelectError("");
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => setRole(tab.dataset.role));
    tab.addEventListener("keydown", (e) => {
      const dir = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!dir) return;
      e.preventDefault();
      const nextTab = tabs[(i + dir + tabs.length) % tabs.length];
      if (nextTab.dataset.role === "admin") nextTab.focus();
      else setRole(nextTab.dataset.role, { focusTab: true });
    });
  });
  segs.forEach((s) => s.addEventListener("click", () => setRole(s.dataset.role)));

  // ---------- Custom select ----------
  const select = document.getElementById("specialty");
  const selBtn = select.querySelector(".select-btn");
  const selList = select.querySelector(".select-list");
  const selValue = document.getElementById("specialty-value");
  const selInput = select.querySelector("input[type=hidden]");
  const options = [...selList.querySelectorAll("li")];
  let activeIdx = -1;

  options.forEach((o, i) => (o.id = `specialty-opt-${i}`));

  function setActive(i) {
    activeIdx = (i + options.length) % options.length;
    options.forEach((o, j) => o.classList.toggle("active", j === activeIdx));
    selList.setAttribute("aria-activedescendant", options[activeIdx].id);
    options[activeIdx].scrollIntoView({ block: "nearest" });
  }

  function openList() {
    selList.hidden = false;
    selBtn.setAttribute("aria-expanded", "true");
    const cur = options.findIndex((o) => o.getAttribute("aria-selected") === "true");
    setActive(cur >= 0 ? cur : 0);
    selList.focus();
  }

  function closeList(focusBtn = true) {
    selList.hidden = true;
    selBtn.setAttribute("aria-expanded", "false");
    if (focusBtn) selBtn.focus();
  }

  function choose(i) {
    const o = options[i];
    options.forEach((x) => x.setAttribute("aria-selected", String(x === o)));
    selInput.value = o.textContent.trim();
    selValue.textContent = selInput.value;
    selBtn.classList.add("has-value");
    setSelectError("");
    closeList();
  }

  function setSelectError(msg) {
    const wrap = select.closest(".field");
    wrap.classList.toggle("invalid", Boolean(msg));
    wrap.querySelector(".error-text").textContent = msg;
  }

  selBtn.addEventListener("click", () => (selList.hidden ? openList() : closeList()));
  selBtn.addEventListener("keydown", (e) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      openList();
    }
  });
  selList.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") setActive(activeIdx + 1);
    else if (e.key === "ArrowUp") setActive(activeIdx - 1);
    else if (e.key === "Home") setActive(0);
    else if (e.key === "End") setActive(options.length - 1);
    else if (e.key === "Enter" || e.key === " ") choose(activeIdx);
    else if (e.key === "Escape") closeList();
    else if (e.key === "Tab") closeList(false);
    else return;
    e.preventDefault();
  });
  options.forEach((o, i) => {
    o.addEventListener("mousemove", () => activeIdx !== i && setActive(i));
    o.addEventListener("click", () => choose(i));
  });
  document.addEventListener("click", (e) => {
    if (!select.contains(e.target) && !selList.hidden) closeList(false);
  });

  // ---------- Validation ----------
  const rules = {
    fullName: (v) => (!v.trim() ? "Vui lòng nhập họ và tên." : !validators.name(v) ? "Họ và tên cần ít nhất 2 từ, chỉ gồm chữ cái." : ""),
    email: (v) => (!v.trim() ? "Vui lòng nhập email." : !validators.email(v) ? "Email không hợp lệ (ví dụ: ten@email.com)." : ""),
    phone: (v) => (!v.trim() ? "Vui lòng nhập số điện thoại." : !validators.phone(v) ? "Số điện thoại Việt Nam không hợp lệ (10 số, ví dụ 0901234567)." : ""),
    password: (v) => (!v ? "Vui lòng nhập mật khẩu." : !validators.password(v) ? "Mật khẩu cần ít nhất 8 ký tự, gồm cả chữ và số." : ""),
    confirm: (v) => (!v ? "Vui lòng xác nhận mật khẩu." : v !== f.password.value ? "Mật khẩu xác nhận không khớp." : ""),
    shop: (v) => (role !== "artisan" ? "" : !v.trim() ? "Vui lòng nhập tên xưởng hoặc gian hàng." : v.trim().length < 3 ? "Tên gian hàng cần ít nhất 3 ký tự." : ""),
  };

  const check = (name) => {
    const msg = rules[name](f[name].value);
    setFieldError(f[name], msg);
    return !msg;
  };

  Object.keys(rules).forEach((name) => {
    const input = f[name];
    input.addEventListener("blur", () => input.value && check(name));
    input.addEventListener("input", () => {
      if (input.closest(".field").classList.contains("invalid")) check(name);
      if (name === "password" && f.confirm.value) check("confirm");
    });
  });

  f.terms.addEventListener("change", () => f.terms.checked && setFieldError(f.terms, ""));
  initStrengthMeter(f.password, document.getElementById("strength"));

  function validateAll() {
    let ok = Object.keys(rules).map(check).every(Boolean);
    if (role === "artisan" && !selInput.value) {
      setSelectError("Vui lòng chọn chuyên môn thủ công.");
      ok = false;
    }
    if (!f.terms.checked) {
      setFieldError(f.terms, "Bạn cần đồng ý với Điều khoản dịch vụ & Chính sách nội dung.");
      ok = false;
    }
    return ok;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    alertBox.hidden = true;
    if (!validateAll()) {
      const first = form.querySelector(".field.invalid input:not([type=hidden]), .field.invalid .select-btn");
      first?.focus();
      return;
    }
    setLoading(btn, true, "Đang tạo tài khoản...");
    await wait(700);
    try {
      const data = {
        name: f.fullName.value.trim().replace(/\s+/g, " "),
        email: f.email.value,
        phone: f.phone.value,
        password: f.password.value,
        role,
      };
      if (role === "artisan") Object.assign(data, { shop: f.shop.value.trim(), specialty: selInput.value });
      const user = await createUser(data);
      toast(role === "artisan" ? `Đã tạo gian hàng “${user.shop}”! Đang chuyển tới trang đăng nhập...` : "Tạo tài khoản thành công! Đang chuyển tới trang đăng nhập...");
      btn.textContent = "Thành công ✓";
      await wait(1400);
      location.href = `../01-dang-nhap/index.html?role=${role}&registered=1&email=${encodeURIComponent(user.email)}`;
    } catch (err) {
      setLoading(btn, false);
      if (err.message === "EMAIL_EXISTS") {
        setFieldError(f.email, "Email này đã được đăng ký.");
        alertBox.className = "form-alert";
        alertBox.innerHTML = `Email đã tồn tại. <a class="link" href="../01-dang-nhap/index.html?role=${role}&email=${encodeURIComponent(f.email.value.trim())}">Đăng nhập</a> hoặc <a class="link" href="forgot-password.html">khôi phục mật khẩu</a>.`;
        alertBox.hidden = false;
        f.email.focus();
      } else if (err.message === "PHONE_EXISTS") {
        setFieldError(f.phone, "Số điện thoại này đã được sử dụng.");
        f.phone.focus();
      } else {
        toast("Đã có lỗi xảy ra, vui lòng thử lại.", "error");
      }
    }
  });

  setRole(params.get("role") === "artisan" ? "artisan" : "customer");
})();
