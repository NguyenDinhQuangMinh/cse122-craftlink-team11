/* ==========================================================================
   checkout.js — Trang xác nhận đơn (checkout.html)
   --------------------------------------------------------------------------
   Trang có HAI chế độ nhưng dùng chung 4 bước:
     - Mặc định: một sản phẩm đang tùy biến (đọc bản nháp
       craftlink_checkout_draft trong sessionStorage).
     - ?mode=cart: nhiều sản phẩm lấy từ giỏ hàng (đọc bản nháp
       craftlink_cart_checkout_draft trong sessionStorage).

   Cả hai chế độ đều:
     - Không gửi dữ liệu ra máy chủ và không thực hiện thanh toán thật.
     - Mất bản nháp khi đóng tab.
     - Chỉ hiện trạng thái hoàn tất của bản demo sau khi bấm xác nhận.

   Bốn bước:
     1. Xem lại sản phẩm / danh sách sản phẩm trong giỏ
     2. Nhập số điện thoại + địa chỉ nhận hàng (kiểm tra ngay trên trang)
     3. Chọn phương thức thanh toán + giao hàng (bắt buộc)
     4. Xác nhận lại toàn bộ thông tin
   ========================================================================== */

(function () {
  const layout = document.getElementById("checkout-layout");
  if (!layout) {
    return; // không phải trang checkout
  }

  const isCartMode = getQueryParam("mode") === "cart";

  const stepsEl = document.getElementById("checkout-steps");
  const stepPanels = Array.from(document.querySelectorAll(".checkout-step-panel"));
  const stepItems = Array.from(document.querySelectorAll(".checkout-step"));
  const emptyState = document.getElementById("checkout-empty");
  const emptyTitle = document.getElementById("checkout-empty-title");
  const emptyText = document.getElementById("checkout-empty-text");
  const emptyCustomize = document.getElementById("checkout-empty-customize");
  const emptyArtisan = document.getElementById("checkout-empty-artisan");
  const emptyCart = document.getElementById("checkout-empty-cart");
  const summaryEl = document.getElementById("checkout-summary");
  const completePanel = document.getElementById("checkout-complete");

  const reviewSingle = document.getElementById("review-single");
  const reviewCart = document.getElementById("review-cart");
  const summarySingle = document.getElementById("summary-single");
  const summaryCart = document.getElementById("summary-cart");
  const confirmSingleList = document.getElementById("confirm-single-list");
  const confirmCart = document.getElementById("confirm-cart");
  const completeSingleList = document.getElementById("complete-single-list");
  const completeCart = document.getElementById("complete-cart");
  const completeCartNote = document.getElementById("complete-cart-note");
  const reviewBackCart = document.getElementById("review-back-cart");
  const step1Title = document.getElementById("step1-title");
  const cartItemTemplate = document.getElementById("checkout-cart-item-template");
  const summaryItemTemplate = document.getElementById("checkout-summary-item-template");

  const deliveryForm = document.getElementById("delivery-form");
  const phoneInput = document.getElementById("delivery-phone");
  const addressInput = document.getElementById("delivery-address");
  const phoneError = document.getElementById("phone-error");
  const addressError = document.getElementById("address-error");

  const optionsForm = document.getElementById("options-form");
  const paymentError = document.getElementById("payment-error");
  const shippingError = document.getElementById("shipping-error");

  // Đọc đúng loại bản nháp theo chế độ đang mở.
  let draft = isCartMode ? readCartCheckoutDraft() : readCheckoutDraft();

  // Giỏ hàng có thể đã thay đổi sau khi bản nháp được tạo. Nếu khác với
  // "ảnh chụp" cũ thì bỏ bản nháp để bắt đầu lại từ giỏ hiện tại.
  if (isCartMode && draft && draft.status !== "completed" && !cartDraftMatchesCurrentCart(draft)) {
    draft = null;
  }
  if (isCartMode && !draft) {
    draft = startCartCheckoutDraft();
  }

  let product = !isCartMode && draft ? findProduct(draft.productId) : null;
  let artisan = !isCartMode && draft ? findArtisanById(draft.artisanId) : null;

  // Mỗi dòng trong giỏ được ghép với dữ liệu sản phẩm để lấy tên, ảnh, giá.
  const cartLines = isCartMode && draft
    ? draft.items.map(function (item) {
        return { product: findProduct(item.id), qty: item.qty };
      }).filter(function (line) {
        return Boolean(line.product);
      })
    : [];

  function cartDraftMatchesCurrentCart(cartDraft) {
    const cart = readCart();
    if (cartDraft.items.length !== cart.length) {
      return false;
    }
    return cartDraft.items.every(function (item) {
      const current = cart.find(function (entry) {
        return entry.id === item.id;
      });
      return current && current.qty === item.qty;
    });
  }

  // Chọn đúng khóa sessionStorage tương ứng với chế độ hiện tại.
  function saveDraft(patch) {
    draft = (isCartMode ? updateCartCheckoutDraft(patch) : updateCheckoutDraft(patch)) || draft;
    return draft;
  }

  function replaceDraft(next) {
    return isCartMode ? writeCartCheckoutDraft(next) : writeCheckoutDraft(next);
  }

  function clearDraft() {
    if (isCartMode) {
      clearCartCheckoutDraft();
    } else {
      clearCheckoutDraft();
    }
  }

  function setError(errorEl, input, message) {
    errorEl.textContent = message;
    errorEl.hidden = message === "";
    input.setAttribute("aria-invalid", message === "" ? "false" : "true");
  }

  function showEmpty(title, text, showCustomize, showArtisan, showCart) {
    layout.hidden = true;
    stepsEl.hidden = true;
    emptyState.hidden = false;
    emptyTitle.textContent = title;
    emptyText.textContent = text;
    emptyCustomize.hidden = !showCustomize;
    emptyArtisan.hidden = !showArtisan;
    emptyCart.hidden = !showCart;
  }

  function getCartTotalQty() {
    return cartLines.reduce(function (total, line) {
      return total + line.qty;
    }, 0);
  }

  function getCartCountText() {
    return cartLines.length + " sản phẩm (tổng " + getCartTotalQty() + " món)";
  }

  function getTotal() {
    if (isCartMode) {
      return cartLines.reduce(function (total, line) {
        return total + line.product.price * line.qty;
      }, 0);
    }
    return product.price * draft.qty;
  }

  // Vẽ danh sách sản phẩm trong giỏ vào một khung bất kỳ
  // (bước 1, bước 4 hoặc trang hoàn tất).
  function renderCartItems(containerId) {
    const container = document.getElementById(containerId);
    container.textContent = ""; // xóa các dòng cũ trước khi vẽ lại

    cartLines.forEach(function (line) {
      const row = cartItemTemplate.content.firstElementChild.cloneNode(true);
      const img = row.querySelector("img");
      img.src = line.product.image;
      img.alt = line.product.name;

      row.querySelector(".checkout-item-name").textContent = line.product.name;
      row.querySelector(".checkout-item-meta").textContent = "Nghệ nhân " + line.product.artisan;
      row.querySelector(".checkout-item-price").textContent =
        line.qty + " × " + formatPrice(line.product.price);
      row.querySelector(".checkout-item-subtotal").textContent =
        formatPrice(line.product.price * line.qty);

      container.appendChild(row);
    });
  }

  function renderSummaryCart() {
    const list = document.getElementById("summary-cart-list");
    list.textContent = "";

    cartLines.forEach(function (line) {
      const row = summaryItemTemplate.content.firstElementChild.cloneNode(true);
      row.querySelector(".summary-cart-item-name").textContent = line.product.name;
      row.querySelector(".summary-cart-item-meta").textContent =
        line.qty + " × " + formatPrice(line.product.price);
      list.appendChild(row);
    });

    document.getElementById("summary-cart-count").textContent =
      "Tổng số lượng: " + getCartTotalQty() + " món";
  }

  function renderSummary() {
    if (isCartMode) {
      summarySingle.hidden = true;
      summaryCart.hidden = false;
      renderSummaryCart();
    } else {
      summarySingle.hidden = false;
      summaryCart.hidden = true;
      document.getElementById("summary-product").textContent = product.name;
      document.getElementById("summary-artisan").textContent = artisan.name;
      document.getElementById("summary-qty").textContent = draft.qty;
      document.getElementById("summary-unit-price").textContent = formatPrice(product.price);
    }

    document.getElementById("summary-payment").textContent =
      PAYMENT_LABELS[draft.payment] || "Chưa chọn";
    document.getElementById("summary-shipping-method").textContent =
      SHIPPING_LABELS[draft.shipping] || "Chưa chọn";
    document.getElementById("summary-total").textContent = formatPrice(getTotal());
  }

  // Đưa các bước đã qua sang trạng thái hoàn tất, bước hiện tại nổi bật.
  function updateStepIndicator(step) {
    stepItems.forEach(function (item) {
      const itemStep = Number(item.dataset.step);
      item.classList.toggle("is-active", itemStep === step);
      item.classList.toggle("is-done", itemStep < step);
      if (itemStep === step) {
        item.setAttribute("aria-current", "step");
      } else {
        item.removeAttribute("aria-current");
      }
    });
  }

  function fillReviewStep() {
    if (isCartMode) {
      renderCartItems("review-cart-list");
      document.getElementById("review-cart-count").textContent = getCartCountText();
      document.getElementById("review-cart-total").textContent = formatPrice(getTotal());
      return;
    }

    const reviewImage = document.getElementById("review-product-image");
    reviewImage.src = product.image;
    reviewImage.alt = product.name;

    document.getElementById("review-product-name").textContent = product.name;
    document.getElementById("review-product-meta").textContent =
      (CATEGORY_LABELS[product.category] || "Chưa có thông tin danh mục") +
      " • " + product.artisan;
    document.getElementById("review-product-price").textContent =
      formatPrice(product.price) + " / sản phẩm";
    document.getElementById("review-artisan").textContent = artisan.name;
    document.getElementById("review-qty").textContent = draft.qty;
    document.getElementById("review-brief").textContent = draft.brief;
    document.getElementById("review-lead-time").textContent =
      LEAD_TIME_LABELS[product.leadTime] || "Chưa có thông tin";
    document.getElementById("review-total").textContent =
      formatPrice(getTotal()) + " (chưa gồm phí tùy biến hoặc giao hàng)";
  }

  function fillDeliveryStep() {
    phoneInput.value = draft.delivery.phone;
    addressInput.value = draft.delivery.address;
    setError(phoneError, phoneInput, "");
    setError(addressError, addressInput, "");
  }

  function fillOptionsStep() {
    const payment = optionsForm.querySelector('input[name="payment"][value="' + draft.payment + '"]');
    const shipping = optionsForm.querySelector('input[name="shipping"][value="' + draft.shipping + '"]');
    if (payment) {
      payment.checked = true;
    }
    if (shipping) {
      shipping.checked = true;
    }
    paymentError.hidden = true;
    shippingError.hidden = true;
  }

  function fillConfirmStep() {
    if (isCartMode) {
      renderCartItems("confirm-cart-list");
      document.getElementById("confirm-cart-count").textContent = getCartCountText();
    } else {
      document.getElementById("confirm-product").textContent =
        product.name + " • " + formatPrice(product.price) + " / sản phẩm";
      document.getElementById("confirm-qty").textContent = draft.qty;
      document.getElementById("confirm-artisan").textContent = artisan.name;
      document.getElementById("confirm-brief").textContent = draft.brief;
    }

    document.getElementById("confirm-delivery").textContent =
      draft.delivery.phone + " — " + draft.delivery.address;
    document.getElementById("confirm-payment").textContent =
      PAYMENT_LABELS[draft.payment] || "Chưa chọn";
    document.getElementById("confirm-shipping").textContent =
      SHIPPING_LABELS[draft.shipping] || "Chưa chọn";
    document.getElementById("confirm-total").textContent =
      formatPrice(getTotal()) + " (chưa gồm phí giao hàng)";

    const paymentNote = document.getElementById("confirm-payment-note");
    if (draft.payment === "bank-transfer") {
      paymentNote.textContent = "Bạn chọn chuyển khoản ngân hàng. Bản demo chưa kết nối cổng thanh toán " +
        "và chưa có thông tin tài khoản nhận tiền, nên chưa có giao dịch nào được thực hiện.";
    } else {
      paymentNote.textContent = "Bạn chọn thanh toán khi nhận hàng. Bản demo chưa kết nối đơn vị vận chuyển " +
        "nên chưa có bước thu tiền thực tế.";
    }
  }

  function renderComplete() {
    layout.hidden = false;
    stepsEl.hidden = false;
    summaryEl.hidden = true;
    layout.classList.add("checkout-layout-complete");
    stepPanels.forEach(function (panel) {
      panel.hidden = true;
    });
    completePanel.hidden = false;

    stepItems.forEach(function (item) {
      item.classList.remove("is-active");
      item.classList.add("is-done");
      item.removeAttribute("aria-current");
    });

    if (isCartMode) {
      renderCartItems("complete-cart-list");
      document.getElementById("complete-cart-count").textContent = getCartCountText();
    } else {
      document.getElementById("complete-product").textContent =
        product.name + " • " + formatPrice(product.price) + " / sản phẩm";
      document.getElementById("complete-artisan").textContent = artisan.name;
      document.getElementById("complete-qty").textContent = draft.qty;
    }

    document.getElementById("demo-code").textContent = draft.demoCode || "Chưa có mã";
    document.getElementById("complete-delivery").textContent =
      draft.delivery.phone + " — " + draft.delivery.address;
    document.getElementById("complete-payment").textContent =
      PAYMENT_LABELS[draft.payment] || "Chưa chọn";
    document.getElementById("complete-shipping").textContent =
      SHIPPING_LABELS[draft.shipping] || "Chưa chọn";
    document.getElementById("complete-total").textContent =
      formatPrice(getTotal()) + " (chưa gồm phí giao hàng)";
  }

  // Đổi tiêu đề, breadcrumb và các khối hiển thị khi mở bằng ?mode=cart.
  function applyModeChrome() {
    if (!isCartMode) {
      return;
    }

    document.title = "Xác nhận đơn hàng | CraftLink";
    document.getElementById("page-title").textContent = "Xác nhận đơn hàng";
    document.getElementById("checkout-page-subtitle").textContent =
      "Xem lại sản phẩm trong giỏ, nhập thông tin nhận hàng và chọn phương thức thanh toán, giao hàng.";

    const breadcrumbMode = document.getElementById("checkout-breadcrumb-mode");
    breadcrumbMode.textContent = "Giỏ hàng";
    breadcrumbMode.href = "cart.html";
    document.getElementById("checkout-breadcrumb-current").textContent = "Xác nhận đơn";

    step1Title.textContent = "1. Xem lại sản phẩm trong giỏ";
    summaryEl.setAttribute("aria-label", "Tóm tắt đơn hàng");

    reviewSingle.hidden = true;
    reviewCart.hidden = false;
    summarySingle.hidden = true;
    summaryCart.hidden = false;
    confirmSingleList.hidden = true;
    confirmCart.hidden = false;
    completeSingleList.hidden = true;
    completeCart.hidden = false;
    completeCartNote.hidden = false;

    document.getElementById("review-edit-brief").hidden = true;
    document.getElementById("review-change-artisan").hidden = true;
    reviewBackCart.hidden = false;

    document.getElementById("restart-btn").textContent = "Quay lại giỏ hàng";
  }

  // Nếu người dùng tải lại ở bước 3/4 nhưng thiếu dữ liệu, đưa về bước
  // cần bổ sung đầu tiên thay vì hiện một trang không thể hoàn tất.
  function getSafeStep(requestedStep) {
    if (requestedStep >= 3 && (!draft.delivery.phone || !draft.delivery.address)) {
      return 2;
    }
    if (requestedStep >= 4 && (!draft.payment || !draft.shipping)) {
      return 3;
    }
    return requestedStep;
  }

  function renderStep(requestedStep, shouldFocus) {
    const step = getSafeStep(requestedStep);
    saveDraft({ checkoutStep: step });

    stepPanels.forEach(function (panel) {
      panel.hidden = Number(panel.dataset.step) !== step;
    });
    completePanel.hidden = true;
    summaryEl.hidden = false;
    layout.classList.remove("checkout-layout-complete");
    updateStepIndicator(step);
    renderSummary();

    if (step === 1) {
      fillReviewStep();
    } else if (step === 2) {
      fillDeliveryStep();
    } else if (step === 3) {
      fillOptionsStep();
    } else if (step === 4) {
      fillConfirmStep();
    }

    if (shouldFocus) {
      const heading = document.querySelector('.checkout-step-panel[data-step="' + step + '"] .panel-title');
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus();
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // Kiểm tra số điện thoại Việt Nam: 10 số bắt đầu bằng 0, hoặc +84 + 9 số.
  function normalizePhone(value) {
    return value.replace(/[\s.\-()]/g, "");
  }

  function isValidPhone(value) {
    return /^(0\d{9}|\+84\d{9})$/.test(normalizePhone(value));
  }

  function handleDeliverySubmit(event) {
    event.preventDefault();

    const phone = phoneInput.value.trim();
    const address = addressInput.value.trim();
    let valid = true;

    if (phone === "") {
      setError(phoneError, phoneInput, "Vui lòng nhập số điện thoại.");
      valid = false;
    } else if (!isValidPhone(phone)) {
      setError(phoneError, phoneInput, "Số điện thoại chưa hợp lệ. Dùng 10 số bắt đầu bằng 0 hoặc +84 và 9 số.");
      valid = false;
    } else {
      setError(phoneError, phoneInput, "");
    }

    if (address === "") {
      setError(addressError, addressInput, "Vui lòng nhập địa chỉ nhận hàng.");
      valid = false;
    } else if (address.length < 10) {
      setError(addressError, addressInput, "Địa chỉ quá ngắn. Vui lòng nhập đầy đủ số nhà, đường, phường/xã, quận/huyện, tỉnh/thành.");
      valid = false;
    } else {
      setError(addressError, addressInput, "");
    }

    if (!valid) {
      if (phoneError.hidden === false) {
        phoneInput.focus();
      } else {
        addressInput.focus();
      }
      return;
    }

    saveDraft({ delivery: { phone: phone, address: address } });
    renderStep(3, true);
  }

  function handleOptionsSubmit(event) {
    event.preventDefault();

    const payment = optionsForm.querySelector('input[name="payment"]:checked');
    const shipping = optionsForm.querySelector('input[name="shipping"]:checked');
    let valid = true;

    if (!payment) {
      paymentError.textContent = "Vui lòng chọn phương thức thanh toán.";
      paymentError.hidden = false;
      valid = false;
    } else {
      paymentError.hidden = true;
    }

    if (!shipping) {
      shippingError.textContent = "Vui lòng chọn phương thức giao hàng.";
      shippingError.hidden = false;
      valid = false;
    } else {
      shippingError.hidden = true;
    }

    if (!valid) {
      return;
    }

    saveDraft({
      payment: payment.value,
      shipping: shipping.value
    });
    renderStep(4, true);
  }

  function handleConfirm() {
    // Kiểm tra lần cuối trước khi hiện trạng thái hoàn tất của bản demo.
    if (isCartMode) {
      if (!draft || cartLines.length === 0) {
        showEmpty(
          "Giỏ hàng đang trống",
          "Hãy thêm sản phẩm vào giỏ trước khi xác nhận đơn hàng.",
          false,
          false,
          true
        );
        return;
      }
    } else if (!draft.brief || draft.acceptedBrief !== draft.brief) {
      window.location.href = "customize.html";
      return;
    }

    if (!draft.delivery.phone || !draft.delivery.address) {
      renderStep(2, true);
      return;
    }
    if (!draft.payment || !draft.shipping) {
      renderStep(3, true);
      return;
    }

    const now = new Date();
    draft = replaceDraft(Object.assign({}, draft, {
      status: "completed",
      demoCode: "CL-DEMO-" + now.getTime().toString(36).toUpperCase(),
      confirmedAt: now.toISOString()
    }));
    if (!draft) {
      return;
    }

    renderComplete();
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("Đã ghi nhận xác nhận trên trình duyệt (bản demo, chưa gửi đơn).");
  }

  // Áp dụng giao diện của chế độ trước khi kiểm tra dữ liệu, để cả trang
  // thông báo giỏ trống cũng có tiêu đề/breadcrumb đúng.
  applyModeChrome();

  if (isCartMode) {
    if (!draft || cartLines.length === 0) {
      showEmpty(
        "Giỏ hàng đang trống",
        "Hãy thêm sản phẩm vào giỏ trước khi xác nhận đơn hàng.",
        false,
        false,
        true
      );
      return;
    }
  } else {
    // Chưa có bản nháp hoặc sản phẩm không còn trong dữ liệu mẫu.
    if (!draft || !product) {
      showEmpty(
        "Chưa có yêu cầu tùy biến",
        "Hãy chọn một sản phẩm và tạo brief trước khi xác nhận đơn.",
        true,
        false
      );
      return;
    }

    // Bắt buộc phải chấp nhận brief trước khi sang checkout.
    if (!draft.brief || draft.acceptedBrief !== draft.brief) {
      showEmpty(
        "Brief chưa được chấp nhận",
        "Hãy quay lại trang tạo brief, tạo bản tóm tắt mới nhất và bấm “Chấp nhận”.",
        true,
        false
      );
      return;
    }

    // Bắt buộc phải chọn nghệ nhân.
    if (!artisan) {
      showEmpty(
        "Chưa chọn nghệ nhân",
        "Hãy quay lại trang gợi ý và chọn một nghệ nhân trước khi xác nhận đơn.",
        false,
        true
      );
      return;
    }
  }

  stepsEl.hidden = false;
  emptyState.hidden = true;

  if (!isCartMode) {
    document.getElementById("review-edit-brief").href = "customize.html";
    document.getElementById("review-change-artisan").href = "artisan-suggestions.html";
  }

  document.getElementById("step1-next").addEventListener("click", function () {
    renderStep(2, true);
  });
  document.getElementById("step2-back").addEventListener("click", function () {
    renderStep(1, true);
  });
  document.getElementById("step3-back").addEventListener("click", function () {
    renderStep(2, true);
  });
  document.getElementById("step4-back").addEventListener("click", function () {
    renderStep(3, true);
  });

  deliveryForm.addEventListener("submit", handleDeliverySubmit);
  optionsForm.addEventListener("submit", handleOptionsSubmit);

  // Lưu ngay khi gõ để quay lại bước trước hoặc tải lại vẫn còn dữ liệu.
  phoneInput.addEventListener("input", function () {
    saveDraft({ delivery: { phone: phoneInput.value } });
    if (!phoneError.hidden) {
      setError(phoneError, phoneInput, "");
    }
  });

  addressInput.addEventListener("input", function () {
    saveDraft({ delivery: { address: addressInput.value } });
    if (!addressError.hidden) {
      setError(addressError, addressInput, "");
    }
  });

  optionsForm.addEventListener("change", function (event) {
    const input = event.target;
    if (input.name === "payment") {
      saveDraft({ payment: input.value });
      paymentError.hidden = true;
    } else if (input.name === "shipping") {
      saveDraft({ shipping: input.value });
      shippingError.hidden = true;
    }
    renderSummary();
  });

  document.getElementById("confirm-order-btn").addEventListener("click", handleConfirm);

  document.getElementById("restart-btn").addEventListener("click", function () {
    clearDraft();
    window.location.href = isCartMode ? "cart.html" : "index.html";
  });

  if (draft.status === "completed") {
    renderComplete();
  } else {
    layout.hidden = false;
    renderStep(draft.checkoutStep || 1, false);
  }
})();
