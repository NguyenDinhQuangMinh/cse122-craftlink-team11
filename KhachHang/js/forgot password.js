(() => {
  if (!window.CL || !window.CLAuth) {
    const alertBox = document.getElementById("emailAlert");
    if (alertBox) {
      alertBox.className = "form-alert";
      alertBox.textContent = "Không tải được thành phần xác thực. Vui lòng tải lại trang.";
      alertBox.hidden = false;
    }
    return;
  }

  const { toast, validators, setFieldError, setLoading, initStrengthMeter } = window.CL;
  const auth = window.CLAuth;
  const config = window.CRAFTLINK_AUTH || {};

  const LINK_TTL_MS = Math.max(60, Number(config.magicLinkExpirySeconds) || 300) * 1000;
  const RESEND_AFTER = Math.max(0, Number(config.resendAfterSeconds) || 60);

  const $ = (id) => document.getElementById(id);
  const emailForm = $("emailForm");
  const emailInput = $("email");
  const sendBtn = $("sendBtn");
  const emailAlert = $("emailAlert");
  const changeEmail = $("changeEmail");
  const sendHint = $("sendHint");
  const stepper = [...$("stepper").children];
  const pill = $("panelPill");
  const emailCheck = $("emailCheck");
  const sentEmail = $("sentEmail");
  const linkTimer = $("linkTimer");
  const resendBtn = $("resendBtn");
  const resetForm = $("resetForm");
  const newPw = $("newPassword");
  const confirmPw = $("confirmPassword");
  const resetBtn = $("resetBtn");
  const flow = $("flow");
  const successBox = $("successBox");
  const successLink = $("successLink");

  const PILL = ["Xem trước các bước tiếp theo", "Bước 2/3 · Mở link trong email", "Bước 3/3 · Tạo mật khẩu mới"];

  let email = "";
  let sentAt = 0;
  let timerId = null;
  let verified = false;
  let busy = false;

  function setStep(n) {
    stepper.forEach((li, i) => {
      const step = i + 1;
      li.classList.toggle("done", step < n);
      li.classList.toggle("current", step === n);
      li.querySelector(".num").textContent = step < n ? "✓" : step;
      if (step === n) li.setAttribute("aria-current", "step");
      else li.removeAttribute("aria-current");
    });
    pill.textContent = PILL[n - 1] || PILL[2];

    emailCheck.classList.toggle("locked", n !== 2);
    resetForm.classList.toggle("locked", n !== 3);
    resetForm.querySelectorAll("input, button").forEach((el) => (el.disabled = n !== 3));

    emailInput.readOnly = n > 1;
    changeEmail.hidden = n === 1;
    sendBtn.disabled = n > 1;
    sendBtn.textContent = n > 1 ? "Đã gửi link" : "Gửi link đặt lại mật khẩu";
    if (n !== 1) emailAlert.hidden = true;

    if (n === 1) {
      linkTimer.textContent = "Link có hiệu lực trong 5 phút";
      resendBtn.disabled = true;
      if (resendBtn.lastChild?.nodeType === Node.TEXT_NODE) resendBtn.lastChild.textContent = " Gửi lại link";
    }
    if (n === 3) {
      linkTimer.textContent = "Đã xác thực link";
      resendBtn.disabled = true;
    }
  }

  const clearTimer = () => {
    if (timerId) clearInterval(timerId);
    timerId = null;
  };

  function updateResendLabel() {
    const resendIn = Math.max(0, Math.ceil((sentAt + RESEND_AFTER * 1000 - Date.now()) / 1000));
    resendBtn.disabled = resendIn > 0 || busy || !email;
    if (resendBtn.lastChild?.nodeType === Node.TEXT_NODE) {
      resendBtn.lastChild.textContent = resendIn > 0 ? ` Gửi lại sau ${resendIn}s` : " Gửi lại link";
    }
  }

  function startTimer() {
    clearTimer();
    const tick = () => {
      const left = Math.max(0, sentAt + LINK_TTL_MS - Date.now());
      const m = String(Math.floor(left / 60000)).padStart(2, "0");
      const s = String(Math.floor((left % 60000) / 1000)).padStart(2, "0");
      linkTimer.textContent = left > 0 ? `Link hết hạn sau ${m}:${s}` : "Link có thể đã hết hạn, hãy gửi lại";
      updateResendLabel();
    };
    tick();
    timerId = setInterval(tick, 1000);
  }

  function showAlert(message) {
    emailAlert.className = "form-alert";
    emailAlert.textContent = message;
    emailAlert.hidden = false;
  }

  function friendlyError(error) {
    return auth.messages[error?.code] || auth.messages.UNKNOWN;
  }

  async function requestLink(address) {
    try {
      await auth.requestMagicLink(address);
      return true;
    } catch (error) {
      // Không tiết lộ email nào đã đăng ký: vẫn chuyển sang bước kiểm tra hộp thư.
      if (error?.code === "USER_NOT_FOUND") return true;
      throw error;
    }
  }

  function restartFlow() {
    auth.signOut();
    clearTimer();
    email = "";
    sentAt = 0;
    verified = false;
    busy = false;
    [newPw, confirmPw].forEach((input) => {
      input.value = "";
      input.type = "password";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      const toggle = input.closest(".control")?.querySelector(".pw-toggle");
      if (toggle) {
        toggle.setAttribute("aria-pressed", "false");
        toggle.setAttribute("aria-label", "Hiện mật khẩu");
        toggle.querySelector("use")?.setAttribute("href", "#i-eye");
      }
    });
    setFieldError(newPw, "");
    setFieldError(confirmPw, "");
    setFieldError(emailInput, "");
    sentEmail.textContent = "email của bạn";
    emailAlert.hidden = true;
    sendHint.lastElementChild.textContent = "Link đặt lại mật khẩu sẽ được gửi tới email của bạn.";
    flow.hidden = false;
    successBox.hidden = true;
    setStep(1);
    emailInput.focus();
    emailInput.select();
  }

  // ---------- Bước 1: gửi link ----------
  emailForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (busy || sendBtn.disabled) return;

    emailAlert.hidden = true;
    const value = emailInput.value.trim();
    if (!value) {
      setFieldError(emailInput, "Vui lòng nhập email đã đăng ký.");
      emailInput.focus();
      return;
    }
    if (!validators.email(value)) {
      setFieldError(emailInput, "Email không hợp lệ.");
      emailInput.focus();
      return;
    }
    setFieldError(emailInput, "");

    if (!auth.isConfigured()) {
      showAlert(auth.messages.CONFIG_MISSING);
      return;
    }

    const normalized = value.toLowerCase();
    busy = true;
    setLoading(sendBtn, true, "Đang gửi link...");
    try {
      await requestLink(normalized);
    } catch (error) {
      showAlert(friendlyError(error));
      return;
    } finally {
      busy = false;
      setLoading(sendBtn, false);
    }

    email = normalized;
    sentAt = Date.now();
    sentEmail.textContent = normalized;
    sendHint.lastElementChild.textContent = "Link đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra cả thư mục Spam.";
    setStep(2);
    startTimer();
    toast("Nếu email đã được đăng ký, link đặt lại mật khẩu sẽ đến trong ít phút.", "info");
  });

  emailInput.addEventListener("input", () => {
    if (emailInput.closest(".field").classList.contains("invalid")) setFieldError(emailInput, "");
    emailAlert.hidden = true;
  });

  changeEmail.addEventListener("click", () => {
    if (busy) return;
    restartFlow();
  });

  // ---------- Bước 2: chờ mở link ----------
  resendBtn.addEventListener("click", async () => {
    if (busy || !email || resendBtn.disabled) return;

    busy = true;
    updateResendLabel();
    if (resendBtn.lastChild?.nodeType === Node.TEXT_NODE) resendBtn.lastChild.textContent = " Đang gửi...";

    let accepted = false;
    try {
      accepted = await requestLink(email);
    } catch (error) {
      toast(friendlyError(error), "error");
    } finally {
      busy = false;
      if (accepted) {
        sentAt = Date.now();
        setStep(2);
        startTimer();
        toast("Đã gửi lại link. Hãy kiểm tra email của bạn.", "info");
      } else {
        updateResendLabel();
      }
    }
  });

  // ---------- Bước 3: mật khẩu mới ----------
  initStrengthMeter(newPw, $("strength"));

  const pwRules = {
    newPassword: () =>
      !newPw.value
        ? "Vui lòng nhập mật khẩu mới."
        : !validators.password(newPw.value)
          ? "Mật khẩu cần ít nhất 8 ký tự, gồm cả chữ và số."
          : "",
    confirmPassword: () =>
      !confirmPw.value
        ? "Vui lòng xác nhận mật khẩu mới."
        : confirmPw.value !== newPw.value
          ? "Mật khẩu xác nhận không khớp."
          : "",
  };

  const checkPw = (el) => {
    const message = pwRules[el.id]();
    setFieldError(el, message);
    return !message;
  };

  [newPw, confirmPw].forEach((el) => {
    el.addEventListener("blur", () => el.value && checkPw(el));
    el.addEventListener("input", () => {
      if (el.closest(".field").classList.contains("invalid")) checkPw(el);
      if (el === newPw && confirmPw.value) checkPw(confirmPw);
    });
  });

  resetForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (busy) return;

    const ok = [checkPw(newPw), checkPw(confirmPw)].every(Boolean);
    if (!ok) return resetForm.querySelector(".field.invalid input")?.focus();

    if (!verified || !auth.hasSession()) {
      toast(auth.messages.SESSION_EXPIRED, "error");
      restartFlow();
      return;
    }

    busy = true;
    setLoading(resetBtn, true, "Đang cập nhật...");
    let success = false;
    let restart = false;
    try {
      await auth.updatePassword(newPw.value);
      success = true;
    } catch (error) {
      if (error?.code === "WEAK_PASSWORD") {
        setFieldError(newPw, "Mật khẩu chưa đáp ứng yêu cầu bảo mật của hệ thống.");
        newPw.focus();
      } else if (error?.code === "SESSION_EXPIRED") {
        toast(auth.messages.SESSION_EXPIRED, "error");
        restart = true;
      } else {
        toast(friendlyError(error), "error");
      }
    } finally {
      busy = false;
      setLoading(resetBtn, false);
      if (restart) restartFlow();
    }

    if (!success) return;

    auth.signOut();
    newPw.value = "";
    confirmPw.value = "";
    setFieldError(newPw, "");
    setFieldError(confirmPw, "");
    stepper.forEach((li) => {
      li.classList.remove("current");
      li.classList.add("done");
      li.querySelector(".num").textContent = "✓";
      li.removeAttribute("aria-current");
    });
    flow.hidden = true;
    successBox.hidden = false;
    successLink.href = "index.html";
    successLink.focus();
  });

  // ---------- Khởi động: kiểm tra link Supabase trả về ----------
  const incoming = auth.readSessionFromUrl();
  if (incoming.error) {
    setStep(1);
    showAlert(auth.messages[incoming.error] || auth.messages.LINK_INVALID);
  } else if (incoming.session) {
    verified = true;
    setStep(3);
    toast("Link hợp lệ. Hãy tạo mật khẩu mới.", "success");
    newPw.focus();
  } else {
    setStep(1);
  }
})();
