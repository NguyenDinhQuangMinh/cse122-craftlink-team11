/* ==========================================================================
   main.js — JavaScript dùng chung cho các trang người mua CraftLink
   --------------------------------------------------------------------------
   Giai đoạn 1 (hạ tầng nền):
     1. Hằng số: khóa localStorage, dữ liệu mẫu ban đầu
     2. Hàm tiện ích: tìm sản phẩm, định dạng giá tiền
     3. Đọc/ghi localStorage có kiểm tra dữ liệu hỏng
     4. Cập nhật badge số lượng trên icon giỏ hàng
     5. Hộp thông báo (toast)

   Giai đoạn 2 (trang danh sách sản phẩm):
     6. Tìm kiếm không dấu + lọc theo danh mục/giá/phong cách + sắp xếp

   Giai đoạn 3 (giỏ hàng):
     7. Trang chi tiết sản phẩm: chọn số lượng và thêm vào giỏ
     8. Trang giỏ hàng: vẽ danh sách, tăng/giảm số lượng, xóa, tổng tiền

   Giai đoạn 4 (yêu thích):
     9. Nút trái tim ở trang chi tiết + trang danh sách yêu thích

   Giai đoạn 5 (các tương tác còn lại):
    10. Trang chi tiết: bấm ảnh nhỏ để đổi ảnh lớn trong thư viện
    11. Trang tạo brief: đếm ký tự + mô phỏng AI phân tích + lưu nháp
    12. Trang đơn hàng: tab trạng thái, tìm kiếm, lọc thời gian, hủy đơn
    13. Trang chi tiết đơn: lưu nháp yêu cầu chỉnh sửa
    14. Trang gợi ý nghệ nhân: bỏ qua / tạo lại gợi ý
    15. Phản hồi trung thực cho các nút chưa có trong bản demo

   File này được nhúng ở cuối <body> của cả 8 trang (sau data.js).
   Mọi thao tác với phần tử đều KIỂM TRA PHẦN TỬ CÓ TỒN TẠI trước,
   vì mỗi trang chỉ chứa một phần các thành phần giao diện.
   ========================================================================== */

/* ---------- 1. Hằng số ---------- */

// Khóa lưu dữ liệu trong localStorage (đặt tiền tố "craftlink_" để tránh trùng)
const CART_KEY = "craftlink_cart";
const FAVORITES_KEY = "craftlink_favorites";

// Khóa lưu BẢN NHÁP do người dùng tạo (brief ở trang tùy biến,
// yêu cầu chỉnh sửa ở trang chi tiết đơn). Đây là dữ liệu của RIÊNG
// trình duyệt này — dự án chưa có máy chủ để gửi đi cho nghệ nhân.
// Bản nháp chỉnh sửa đơn dùng localStorage; riêng luồng mua hàng dùng
// sessionStorage để thông tin nhận hàng tự mất khi đóng tab.
const REVISION_DRAFT_KEY = "craftlink_revision_draft";
const CHECKOUT_DRAFT_KEY = "craftlink_checkout_draft";
const CART_CHECKOUT_DRAFT_KEY = "craftlink_cart_checkout_draft";

// Số lượng tối đa cho một sản phẩm trong giỏ
const MAX_QTY = 99;

// Dữ liệu mẫu cho lần truy cập đầu tiên.
// Giống như trang Đơn hàng đang hiển thị 4 đơn mẫu — đây là dữ liệu demo
// vì dự án chưa có máy chủ (backend).
const SAMPLE_CART = [
  { id: "coc-gom-la-nau", qty: 2 },
  { id: "bo-am-tra", qty: 1 },
  { id: "chau-cay-mini", qty: 1 }
];
const SAMPLE_FAVORITES = ["binh-gom-van-la", "dia-men-lam", "chuong-gio-gom", "bo-am-tra"];

/* ---------- 2. Hàm tiện ích ---------- */

// Tìm sản phẩm theo id trong mảng dữ liệu chung (data.js).
// Trả về undefined nếu không tìm thấy.
function findProduct(id) {
  return CRAFTLINK_PRODUCTS.find(function (product) {
    return product.id === id;
  });
}

// Định dạng giá tiền kiểu Việt Nam: 240000 -> "240.000₫"
const priceFormatter = new Intl.NumberFormat("vi-VN");

function formatPrice(number) {
  return priceFormatter.format(number) + "₫";
}

// Nhãn hiển thị tương ứng với mã đang lưu trong data.js.
// Chỉ dùng để dịch mã kỹ thuật sang tiếng Việt, không tạo thêm dữ liệu.
const STYLE_LABELS = {
  "toi-gian": "Tối giản",
  "moc-mac": "Mộc mạc",
  "hien-dai": "Hiện đại",
  "truyen-thong": "Truyền thống"
};

const CATEGORY_LABELS = {
  "do-gom": "Đồ gốm",
  "do-trang-tri": "Đồ trang trí",
  "do-dung-nha-bep": "Đồ dùng nhà bếp",
  "phu-kien": "Phụ kiện",
  "qua-tang": "Quà tặng"
};

const LEAD_TIME_LABELS = {
  "1-3": "1 – 3 ngày",
  "4-7": "4 – 7 ngày",
  "8-14": "8 – 14 ngày",
  "tren-14": "Trên 14 ngày"
};

const PAYMENT_LABELS = {
  "cod": "Thanh toán khi nhận hàng (COD)",
  "bank-transfer": "Chuyển khoản ngân hàng"
};

const SHIPPING_LABELS = {
  "standard": "Giao hàng tiêu chuẩn",
  "express": "Giao hàng nhanh"
};

/* ---------- 2b. Địa chỉ trang và bản nháp luồng mua hàng ---------- */

// Đọc một tham số trên URL, ví dụ ?id=coc-gom-la-nau&qty=2
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function buildProductDetailUrl(productId) {
  return "product-detail.html?id=" + encodeURIComponent(productId);
}

function buildCustomizeUrl(productId, qty) {
  return "customize.html?id=" + encodeURIComponent(productId) + "&qty=" + encodeURIComponent(qty);
}

function findArtisanById(artisanId) {
  return CRAFTLINK_ARTISANS.find(function (artisan) {
    return artisan.id === artisanId;
  });
}

// Tên nghệ nhân trong CRAFTLINK_PRODUCTS và tên trong CRAFTLINK_ARTISANS
// được nối với nhau bằng tên hiển thị (kèm alias nếu có).
function findArtisanByName(name) {
  const normalized = normalizeText(name || "");
  return CRAFTLINK_ARTISANS.find(function (artisan) {
    const names = [artisan.name].concat(artisan.aliases || []);
    return names.some(function (item) {
      return normalizeText(item) === normalized;
    });
  });
}

// Sản phẩm đang xem ở product-detail.html. Nếu URL thiếu ?id thì giữ
// đúng sản phẩm mẫu cũ (Cốc gốm lá nâu) để không làm hỏng trang hiện tại.
let cachedDetailProduct;
function getDetailProduct() {
  if (cachedDetailProduct !== undefined) {
    return cachedDetailProduct;
  }

  const id = getQueryParam("id");
  if (id) {
    const product = findProduct(id);
    if (product) {
      cachedDetailProduct = product;
      return product;
    }
    showToast("Không tìm thấy sản phẩm trong dữ liệu mẫu; đang hiển thị Cốc gốm lá nâu.");
  }

  cachedDetailProduct = findProduct(DETAIL_PRODUCT_ID);
  return cachedDetailProduct;
}

// Làm sạch bản nháp mua hàng trước khi dùng. Chỉ nhận sản phẩm có thật
// trong data.js và số lượng là số nguyên từ 1 đến MAX_QTY.
function normalizeCheckoutDraft(draft) {
  if (!draft || typeof draft !== "object") {
    return null;
  }

  const product = findProduct(draft.productId);
  if (!product) {
    return null;
  }

  const qtyNumber = Number(draft.qty);
  const qty = Number.isInteger(qtyNumber) && qtyNumber >= 1
    ? Math.min(qtyNumber, MAX_QTY)
    : 1;

  const stepNumber = Number(draft.checkoutStep);
  const checkoutStep = Number.isInteger(stepNumber) && stepNumber >= 1 && stepNumber <= 4
    ? stepNumber
    : 1;

  const delivery = draft.delivery && typeof draft.delivery === "object"
    ? draft.delivery
    : {};

  const artisan = findArtisanById(draft.artisanId);

  return {
    productId: product.id,
    qty: qty,
    brief: typeof draft.brief === "string" ? draft.brief : "",
    acceptedBrief: typeof draft.acceptedBrief === "string" ? draft.acceptedBrief : "",
    artisanId: artisan ? artisan.id : null,
    delivery: {
      phone: typeof delivery.phone === "string" ? delivery.phone : "",
      address: typeof delivery.address === "string" ? delivery.address : ""
    },
    payment: typeof draft.payment === "string" ? draft.payment : "",
    shipping: typeof draft.shipping === "string" ? draft.shipping : "",
    checkoutStep: checkoutStep,
    status: draft.status === "completed" ? "completed" : "editing",
    demoCode: typeof draft.demoCode === "string" ? draft.demoCode : "",
    confirmedAt: typeof draft.confirmedAt === "string" ? draft.confirmedAt : "",
    updatedAt: Date.now()
  };
}

function readCheckoutDraft() {
  const raw = sessionStorage.getItem(CHECKOUT_DRAFT_KEY);
  if (raw === null) {
    return null;
  }

  try {
    const draft = normalizeCheckoutDraft(JSON.parse(raw));
    if (!draft) {
      sessionStorage.removeItem(CHECKOUT_DRAFT_KEY);
    }
    return draft;
  } catch (error) {
    sessionStorage.removeItem(CHECKOUT_DRAFT_KEY);
    return null;
  }
}

function writeCheckoutDraft(draft) {
  const normalized = normalizeCheckoutDraft(draft);
  if (!normalized) {
    sessionStorage.removeItem(CHECKOUT_DRAFT_KEY);
    return null;
  }

  sessionStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(normalized));
  return normalized;
}

// Cập nhật một phần bản nháp, giữ nguyên các trường còn lại.
function updateCheckoutDraft(patch) {
  const current = readCheckoutDraft();
  if (!current || !patch) {
    return null;
  }

  const next = Object.assign({}, current, patch);
  if (patch.delivery) {
    next.delivery = Object.assign({}, current.delivery, patch.delivery);
  }
  return writeCheckoutDraft(next);
}

function clearCheckoutDraft() {
  sessionStorage.removeItem(CHECKOUT_DRAFT_KEY);
}

// Bắt đầu tùy biến một sản phẩm. Nếu đang dở cùng sản phẩm thì giữ lại
// brief và thông tin nhận hàng; đổi sản phẩm thì làm mới để tránh lẫn dữ liệu.
function startCheckoutDraft(productId, qty) {
  const product = findProduct(productId);
  if (!product) {
    return null;
  }

  const existing = readCheckoutDraft();
  const canReuse = existing &&
    existing.productId === product.id &&
    existing.status !== "completed";

  const qtyNumber = Number(qty);
  const safeQty = Number.isInteger(qtyNumber) && qtyNumber >= 1
    ? Math.min(qtyNumber, MAX_QTY)
    : 1;
  const qtyChanged = canReuse && existing.qty !== safeQty;

  return writeCheckoutDraft({
    productId: product.id,
    qty: safeQty,
    brief: canReuse ? existing.brief : "",
    acceptedBrief: canReuse && !qtyChanged ? existing.acceptedBrief : "",
    artisanId: canReuse && !qtyChanged ? existing.artisanId : null,
    delivery: canReuse ? existing.delivery : { phone: "", address: "" },
    payment: canReuse ? existing.payment : "",
    shipping: canReuse ? existing.shipping : "",
    checkoutStep: 1,
    status: "editing",
    demoCode: "",
    confirmedAt: ""
  });
}

/* ---------- 3. Đọc / ghi localStorage có kiểm tra dữ liệu ---------- */

// Đọc một giá trị JSON từ localStorage.
// Nếu dữ liệu hỏng (không chuyển được thành JSON) thì trả về giá trị
// dự phòng thay vì làm vỡ trang.
function readJson(key, fallback) {
  const raw = localStorage.getItem(key);
  if (raw === null) {
    return fallback;
  }
  try {
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Đọc giỏ hàng từ localStorage. Quy tắc:
// - Lần đầu truy cập (chưa có dữ liệu) -> nạp SAMPLE_CART.
// - Dữ liệu hỏng / sai định dạng -> bỏ qua mục sai, giữ mục hợp lệ.
// - Số lượng luôn được giới hạn trong khoảng 1..MAX_QTY.
// - Sau khi đọc xong, ghi lại bản đã làm sạch để dữ liệu luôn đúng.
function readCart() {
  if (localStorage.getItem(CART_KEY) === null) {
    const sample = SAMPLE_CART.map(function (item) {
      return { id: item.id, qty: item.qty };
    });
    writeJson(CART_KEY, sample);
    return sample;
  }

  const parsed = readJson(CART_KEY, []);
  const cart = [];
  if (Array.isArray(parsed)) {
    for (const item of parsed) {
      const product = item && findProduct(item.id);
      const qty = item && item.qty;
      if (!product || !Number.isInteger(qty) || qty < 1) {
        continue; // bỏ qua mục không hợp lệ
      }
      // Nếu dữ liệu bị lặp cùng id thì cộng dồn số lượng vào mục đã có
      const existing = cart.find(function (entry) {
        return entry.id === item.id;
      });
      if (existing) {
        existing.qty = Math.min(existing.qty + qty, MAX_QTY);
      } else {
        cart.push({ id: item.id, qty: Math.min(qty, MAX_QTY) });
      }
    }
  }
  writeJson(CART_KEY, cart);
  return cart;
}

function writeCart(cart) {
  writeJson(CART_KEY, cart);
}

/* ---------- 3b. Bản nháp thanh toán nhiều sản phẩm (từ giỏ hàng) ---------- */

// Bản nháp này là "ảnh chụp" giỏ hàng tại lúc bấm nút đặt hàng. Nhờ vậy
// người dùng có thể chuyển qua lại các bước mà không sợ giỏ hàng bị đổi
// ở tab khác. Cũng giống luồng một sản phẩm, dữ liệu chỉ nằm trong
// sessionStorage và mất khi đóng tab.
function normalizeCartItems(items) {
  const result = [];
  if (!Array.isArray(items)) {
    return result; // dữ liệu hỏng -> coi như giỏ trống
  }

  for (const item of items) {
    const product = item && findProduct(item.id);
    const qty = item && item.qty;
    if (!product || !Number.isInteger(qty) || qty < 1) {
      continue; // bỏ qua dòng không hợp lệ
    }

    const existing = result.find(function (entry) {
      return entry.id === item.id;
    });
    if (existing) {
      existing.qty = Math.min(existing.qty + qty, MAX_QTY);
    } else {
      result.push({ id: item.id, qty: Math.min(qty, MAX_QTY) });
    }
  }

  return result;
}

function normalizeCartCheckoutDraft(draft) {
  if (!draft || typeof draft !== "object") {
    return null;
  }

  const items = normalizeCartItems(draft.items);
  if (items.length === 0) {
    return null; // không có sản phẩm nào thì không thể thanh toán
  }

  const stepNumber = Number(draft.checkoutStep);
  const checkoutStep = Number.isInteger(stepNumber) && stepNumber >= 1 && stepNumber <= 4
    ? stepNumber
    : 1;

  const delivery = draft.delivery && typeof draft.delivery === "object"
    ? draft.delivery
    : {};

  return {
    items: items,
    delivery: {
      phone: typeof delivery.phone === "string" ? delivery.phone : "",
      address: typeof delivery.address === "string" ? delivery.address : ""
    },
    payment: typeof draft.payment === "string" ? draft.payment : "",
    shipping: typeof draft.shipping === "string" ? draft.shipping : "",
    checkoutStep: checkoutStep,
    status: draft.status === "completed" ? "completed" : "editing",
    demoCode: typeof draft.demoCode === "string" ? draft.demoCode : "",
    confirmedAt: typeof draft.confirmedAt === "string" ? draft.confirmedAt : "",
    updatedAt: Date.now()
  };
}

function readCartCheckoutDraft() {
  const raw = sessionStorage.getItem(CART_CHECKOUT_DRAFT_KEY);
  if (raw === null) {
    return null;
  }

  try {
    const draft = normalizeCartCheckoutDraft(JSON.parse(raw));
    if (!draft) {
      sessionStorage.removeItem(CART_CHECKOUT_DRAFT_KEY);
    }
    return draft;
  } catch (error) {
    sessionStorage.removeItem(CART_CHECKOUT_DRAFT_KEY);
    return null;
  }
}

function writeCartCheckoutDraft(draft) {
  const normalized = normalizeCartCheckoutDraft(draft);
  if (!normalized) {
    sessionStorage.removeItem(CART_CHECKOUT_DRAFT_KEY);
    return null;
  }

  sessionStorage.setItem(CART_CHECKOUT_DRAFT_KEY, JSON.stringify(normalized));
  return normalized;
}

function updateCartCheckoutDraft(patch) {
  const current = readCartCheckoutDraft();
  if (!current || !patch) {
    return null;
  }

  const next = Object.assign({}, current, patch);
  if (patch.delivery) {
    next.delivery = Object.assign({}, current.delivery, patch.delivery);
  }
  return writeCartCheckoutDraft(next);
}

function clearCartCheckoutDraft() {
  sessionStorage.removeItem(CART_CHECKOUT_DRAFT_KEY);
}

// Chụp lại giỏ hàng hiện tại để bắt đầu luồng thanh toán nhiều sản phẩm.
function startCartCheckoutDraft() {
  const items = readCart().map(function (item) {
    return { id: item.id, qty: item.qty };
  });

  if (items.length === 0) {
    return null;
  }

  return writeCartCheckoutDraft({
    items: items,
    delivery: { phone: "", address: "" },
    payment: "",
    shipping: "",
    checkoutStep: 1,
    status: "editing",
    demoCode: "",
    confirmedAt: ""
  });
}

// Đọc danh sách yêu thích (mảng id sản phẩm).
// Bỏ qua id không tồn tại trong data.js và id bị lặp.
function readFavorites() {
  if (localStorage.getItem(FAVORITES_KEY) === null) {
    const sample = SAMPLE_FAVORITES.slice();
    writeJson(FAVORITES_KEY, sample);
    return sample;
  }

  const parsed = readJson(FAVORITES_KEY, []);
  const favorites = [];
  if (Array.isArray(parsed)) {
    for (const id of parsed) {
      if (typeof id === "string" && findProduct(id) && !favorites.includes(id)) {
        favorites.push(id);
      }
    }
  }
  writeJson(FAVORITES_KEY, favorites);
  return favorites;
}

function writeFavorites(favorites) {
  writeJson(FAVORITES_KEY, favorites);
}

/* ---------- 4. Badge số lượng trên icon giỏ hàng ---------- */

// Cộng tổng số lượng trong giỏ rồi hiển thị lên icon giỏ hàng ở header.
// Tất cả 8 trang đều gọi hàm này nên badge luôn đồng bộ giữa các trang.
function updateCartBadge() {
  const badge = document.getElementById("cart-count");
  if (!badge) {
    return; // trang này không có icon giỏ hàng
  }

  const cart = readCart();
  let total = 0;
  for (const item of cart) {
    total += item.qty;
  }

  badge.textContent = total; // textContent an toàn, không dùng innerHTML
  badge.hidden = total === 0;
}

/* ---------- 5. Hộp thông báo (toast) ---------- */

let toastTimer = null;

// Hiện một thông báo ngắn ở đáy màn hình rồi tự ẩn sau 2,5 giây.
// Phần tử toast được tạo bằng JS nên không cần sửa HTML của 8 trang.
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status"); // trình đọc màn hình sẽ đọc thông báo
    document.body.appendChild(toast);
  }

  toast.textContent = message; // textContent an toàn với mọi nội dung
  toast.classList.add("toast-show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("toast-show");
  }, 2500);
}

/* ---------- 6. Trang danh sách sản phẩm (index.html) ---------- */

// Chuẩn hóa chuỗi để tìm kiếm: chữ thường, bỏ dấu, gộp khoảng trắng.
// "Cốc Gốm" -> "coc gom" — giúp gõ không dấu vẫn tìm được.
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // bỏ các dấu thanh
    .replace(/đ/g, "d") // chữ đ không tách dấu được bằng NFD
    .replace(/\s+/g, " ")
    .trim();
}

// Toàn bộ logic tìm kiếm / lọc / sắp xếp của trang danh sách sản phẩm.
// Chỉ chạy khi trang có lưới sản phẩm (#product-grid).
function initProductList() {
  const grid = document.getElementById("product-grid");
  if (!grid) {
    return; // trang này không phải danh sách sản phẩm
  }

  const cards = Array.from(grid.querySelectorAll(".product-card"));
  if (cards.length === 0) {
    return;
  }

  const searchInput = document.getElementById("search-input");
  const filterForm = document.getElementById("filter-form");
  const priceRange = document.getElementById("price-range");
  const priceOutput = document.getElementById("price-output");
  const sortSelect = document.getElementById("sort-select");
  const countEl = document.getElementById("product-count");
  const filterSummary = document.getElementById("filter-summary");
  const sortSummary = document.getElementById("sort-summary");
  const emptyState = document.getElementById("empty-state");
  const pagination = document.getElementById("pagination");
  const resetBtn = document.getElementById("reset-filters-btn");

  // Lưu thứ tự ban đầu của từng thẻ để sắp xếp "Phổ biến" trả về đúng thứ tự này
  cards.forEach(function (card, index) {
    card.dataset.order = index;
  });

  // Phân trang chỉ có ý nghĩa khi danh sách trải nhiều trang; dữ liệu mẫu chỉ
  // có 8 sản phẩm (1 trang) nên ẩn đi để tránh nút bấm không có tác dụng.
  if (pagination) {
    pagination.hidden = true;
  }

  // Một sản phẩm có khớp với TẤT CẢ điều kiện đang chọn hay không
  function cardMatches(card) {
    // 1. Từ khóa: so với tên sản phẩm và tên nghệ nhân
    const keyword = normalizeText(searchInput.value);
    if (keyword !== "") {
      const name = card.querySelector(".product-name").textContent;
      const artisan = card.querySelector(".product-artisan").textContent;
      if (!normalizeText(name + " " + artisan).includes(keyword)) {
        return false;
      }
    }

    // 2. Danh mục (radio chỉ chọn được 1)
    const categoryInput = filterForm.querySelector('input[name="category"]:checked');
    if (categoryInput && categoryInput.value !== "all" && card.dataset.category !== categoryInput.value) {
      return false;
    }

    // 3. Khoảng giá: giá sản phẩm không vượt quá mức đang kéo
    if (Number(card.dataset.price) > Number(priceRange.value)) {
      return false;
    }

    // 4. Phong cách: nếu chọn nhiều thì khớp BẤT KỲ phong cách nào
    const checkedStyles = filterForm.querySelectorAll('input[name="style"]:checked');
    if (checkedStyles.length > 0) {
      const cardStyles = card.dataset.style.split(" ");
      const hasAnyStyle = Array.from(checkedStyles).some(function (input) {
        return cardStyles.includes(input.value);
      });
      if (!hasAnyStyle) {
        return false;
      }
    }

    // 5. Thời gian hoàn thành: quy tắc giống phong cách
    const checkedLeads = filterForm.querySelectorAll('input[name="lead-time"]:checked');
    if (checkedLeads.length > 0) {
      const hasAnyLead = Array.from(checkedLeads).some(function (input) {
        return card.dataset.leadTime === input.value;
      });
      if (!hasAnyLead) {
        return false;
      }
    }

    return true;
  }

  // Sắp xếp thứ tự hiển thị theo lựa chọn trong #sort-select
  function sortCards() {
    const mode = sortSelect.value;
    const sorted = cards.slice(); // bản sao để sắp xếp, không đổi mảng gốc

    if (mode === "price-asc") {
      sorted.sort(function (a, b) {
        return Number(a.dataset.price) - Number(b.dataset.price);
      });
    } else if (mode === "price-desc") {
      sorted.sort(function (a, b) {
        return Number(b.dataset.price) - Number(a.dataset.price);
      });
    } else if (mode === "rating") {
      sorted.sort(function (a, b) {
        return Number(b.dataset.rating) - Number(a.dataset.rating);
      });
    } else {
      // "popular" = thứ tự ban đầu của cửa hàng
      sorted.sort(function (a, b) {
        return Number(a.dataset.order) - Number(b.dataset.order);
      });
    }

    // Chỉ gắn lại thẻ khi thứ tự thực sự khác (tránh thay đổi DOM thừa)
    let needReorder = false;
    for (let i = 0; i < sorted.length; i++) {
      if (grid.children[i] !== sorted[i]) {
        needReorder = true;
        break;
      }
    }
    if (needReorder) {
      sorted.forEach(function (card) {
        grid.appendChild(card); // appendChild tự chuyển thẻ sang vị trí mới
      });
    }
  }

  // Viết tóm tắt các điều kiện đang áp dụng, ví dụ:
  // "Đồ gốm • Phong cách: Tối giản • Giá đến 500.000₫"
  function buildFilterSummary() {
    const parts = [];

    const categoryInput = filterForm.querySelector('input[name="category"]:checked');
    if (categoryInput) {
      parts.push(categoryInput.parentElement.querySelector("label").textContent.trim());
    }

    const checkedStyles = Array.from(filterForm.querySelectorAll('input[name="style"]:checked'));
    if (checkedStyles.length > 0) {
      const labels = checkedStyles.map(function (input) {
        return input.parentElement.querySelector("label").textContent.trim();
      });
      parts.push("Phong cách: " + labels.join(", "));
    }

    const checkedLeads = Array.from(filterForm.querySelectorAll('input[name="lead-time"]:checked'));
    if (checkedLeads.length > 0) {
      const labels = checkedLeads.map(function (input) {
        return input.parentElement.querySelector("label").textContent.trim();
      });
      parts.push("Thời gian: " + labels.join(", "));
    }

    const maxPrice = Number(priceRange.value);
    if (maxPrice < Number(priceRange.max)) {
      parts.push("Giá đến " + formatPrice(maxPrice));
    }

    return parts.join(" • ");
  }

  // Hàm trung tâm: lọc + sắp xếp + cập nhật mọi thứ hiển thị trên trang
  function applyCatalog() {
    priceOutput.textContent = formatPrice(Number(priceRange.value));

    let visibleCount = 0;
    cards.forEach(function (card) {
      const show = cardMatches(card);
      card.hidden = !show;
      if (show) {
        visibleCount += 1;
      }
    });

    sortCards();

    countEl.textContent = visibleCount;
    filterSummary.textContent = buildFilterSummary();
    sortSummary.textContent = sortSelect.options[sortSelect.selectedIndex].textContent;
    emptyState.hidden = visibleCount > 0; // hiện thông báo khi không có kết quả
  }

  // Đưa trang về trạng thái ban đầu khi bấm "Xóa bộ lọc"
  function resetFilters() {
    const allCategory = filterForm.querySelector('input[name="category"][value="all"]');
    if (allCategory) {
      allCategory.checked = true;
    }
    filterForm.querySelectorAll('input[type="checkbox"]').forEach(function (box) {
      box.checked = false;
    });
    priceRange.value = priceRange.max;
    searchInput.value = "";
    sortSelect.value = "popular";
    applyCatalog();
  }

  // Gắn sự kiện — mỗi sự kiện chỉ gắn đúng 1 lần
  searchInput.addEventListener("input", applyCatalog);
  searchInput.form.addEventListener("submit", function (event) {
    event.preventDefault(); // chặn Enter làm tải lại trang
    applyCatalog();
  });
  filterForm.addEventListener("input", applyCatalog); // phủ cả radio, checkbox và thanh giá
  sortSelect.addEventListener("change", applyCatalog);
  if (resetBtn) {
    resetBtn.addEventListener("click", resetFilters);
  }

  applyCatalog(); // đồng bộ giao diện ngay khi mở trang
}

/* ---------- 6b. Nối liên kết sản phẩm ở trang danh sách ---------- */

// Các thẻ sản phẩm tĩnh trong index.html đang trỏ chung tới
// product-detail.html. Hàm này gắn đúng ?id và ?qty cho từng thẻ để
// trang chi tiết và trang tạo brief biết người dùng chọn sản phẩm nào.
function initProductLinks() {
  const cards = document.querySelectorAll(".product-card[data-id]");

  cards.forEach(function (card) {
    const product = findProduct(card.dataset.id);
    if (!product) {
      return;
    }

    const detailUrl = buildProductDetailUrl(product.id);
    const mediaLink = card.querySelector(".product-media");
    const nameLink = card.querySelector(".product-name a");
    const customizeLink = card.querySelector(".btn-customize");

    if (mediaLink) {
      mediaLink.href = detailUrl;
    }
    if (nameLink) {
      nameLink.href = detailUrl;
    }
    if (customizeLink) {
      customizeLink.href = buildCustomizeUrl(product.id, 1);
      customizeLink.addEventListener("click", function () {
        startCheckoutDraft(product.id, 1);
      });
    }
  });
}

/* ---------- 7. Trang chi tiết sản phẩm (product-detail.html) ---------- */

// Trang chi tiết trong thiết kế (P8) hiển thị một sản phẩm mẫu là Cốc gốm lá nâu.
const DETAIL_PRODUCT_ID = "coc-gom-la-nau";

// Vẽ toàn bộ nội dung trang chi tiết từ đúng sản phẩm trên URL.
// Các trường chưa có trong data.js luôn hiển thị "Chưa có thông tin".
function renderProductDetail(product) {
  document.title = product.name + " | CraftLink";

  const breadcrumb = document.getElementById("product-breadcrumb-name");
  if (breadcrumb) {
    breadcrumb.textContent = product.name;
  }

  const mainImg = document.getElementById("gallery-main-img");
  if (mainImg) {
    mainImg.src = product.image;
    mainImg.alt = product.name;
  }

  // Bộ ảnh: sản phẩm chỉ có 1 ảnh thì ẩn dãy ảnh nhỏ.
  const thumbs = document.getElementById("gallery-thumbs");
  if (thumbs) {
    const images = Array.isArray(product.gallery) && product.gallery.length > 0
      ? product.gallery
      : [product.image];

    thumbs.textContent = "";
    images.forEach(function (src, index) {
      const item = document.createElement("li");
      const button = document.createElement("button");
      const image = document.createElement("img");

      button.type = "button";
      button.className = "thumb-btn" + (index === 0 ? " active" : "");
      button.setAttribute("aria-label", "Xem ảnh " + (index + 1));
      image.src = src;
      image.alt = "";
      button.appendChild(image);
      item.appendChild(button);
      thumbs.appendChild(item);
    });

    thumbs.hidden = images.length <= 1;
  }

  const title = document.getElementById("product-title");
  if (title) {
    title.textContent = product.name;
  }

  const subtitle = document.getElementById("product-subtitle");
  if (subtitle) {
    subtitle.textContent = product.subtitle || "Chưa có thông tin mô tả ngắn.";
  }

  const price = document.getElementById("product-price");
  if (price) {
    price.textContent = formatPrice(product.price);
  }

  const specs = document.getElementById("product-specs-list");
  if (specs) {
    specs.textContent = "";
    const rows = Array.isArray(product.specs) && product.specs.length > 0
      ? product.specs
      : [{ label: "Tùy biến", value: "Chưa có thông tin" }];

    rows.forEach(function (row) {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = row.label;
      dd.textContent = row.value;
      specs.appendChild(dt);
      specs.appendChild(dd);
    });
  }

  const description = document.getElementById("product-description-text");
  if (description) {
    description.textContent = product.description || "Chưa có thông tin mô tả cho sản phẩm này.";
  }

  const artisan = findArtisanByName(product.artisan);
  const avatar = document.getElementById("detail-artisan-avatar");
  const initial = document.getElementById("detail-artisan-initial");
  if (avatar && initial) {
    if (artisan && artisan.image) {
      avatar.src = artisan.image;
      avatar.alt = "Nghệ nhân " + product.artisan;
      avatar.hidden = false;
      initial.hidden = true;
    } else {
      avatar.removeAttribute("src");
      avatar.hidden = true;
      initial.textContent = product.artisan.charAt(0).toUpperCase();
      initial.hidden = false;
    }
  }

  const artisanName = document.getElementById("detail-artisan-name");
  if (artisanName) {
    artisanName.textContent = product.artisan;
  }

  const location = document.getElementById("detail-artisan-location");
  if (location) {
    location.textContent = artisan && artisan.location ? artisan.location : "Chưa có thông tin";
  }

  const rating = document.getElementById("detail-product-rating");
  if (rating) {
    rating.textContent = product.rating.toFixed(1);
  }

  const reviewCount = document.getElementById("detail-product-review-count");
  if (reviewCount) {
    reviewCount.textContent = "(" + product.reviewCount + " đánh giá)";
  }

  const productCount = document.getElementById("detail-artisan-product-count");
  if (productCount) {
    const count = CRAFTLINK_PRODUCTS.filter(function (item) {
      return item.artisan === product.artisan;
    }).length;
    productCount.textContent = count + " sản phẩm mẫu trong dữ liệu";
  }

  // Đánh giá chi tiết hiện chỉ có cho sản phẩm Cốc gốm lá nâu.
  const reviewList = document.getElementById("product-review-list");
  const reviewsNote = document.getElementById("product-reviews-note");
  if (reviewList && reviewsNote) {
    reviewList.textContent = "";

    if (Array.isArray(product.reviews) && product.reviews.length > 0) {
      product.reviews.forEach(function (review) {
        const item = document.createElement("li");
        const head = document.createElement("p");
        const name = document.createElement("strong");
        const stars = document.createElement("span");
        const starsEmpty = document.createElement("span");
        const hidden = document.createElement("span");
        const text = document.createElement("p");

        item.className = "review-item";
        head.className = "review-head";
        name.textContent = review.name;
        stars.className = "stars";
        stars.setAttribute("aria-hidden", "true");
        stars.textContent = "★".repeat(review.rating);
        starsEmpty.className = "stars-empty";
        starsEmpty.setAttribute("aria-hidden", "true");
        starsEmpty.textContent = "★".repeat(Math.max(0, 5 - review.rating));
        hidden.className = "visually-hidden";
        hidden.textContent = review.rating + " trên 5 sao";
        text.className = "review-text";
        text.textContent = review.text;

        head.appendChild(name);
        head.appendChild(stars);
        if (starsEmpty.textContent !== "") {
          head.appendChild(starsEmpty);
        }
        head.appendChild(hidden);
        item.appendChild(head);
        item.appendChild(text);
        reviewList.appendChild(item);
      });

      reviewList.hidden = false;
      reviewsNote.hidden = true;
    } else {
      reviewList.hidden = true;
      reviewsNote.hidden = false;
      reviewsNote.textContent = "Chưa có nội dung đánh giá chi tiết cho sản phẩm này. " +
        "Điểm trung bình hiện có: " + product.rating.toFixed(1) +
        " (" + product.reviewCount + " đánh giá) theo dữ liệu mẫu.";
    }
  }
}

// Nút tăng/giảm số lượng, thêm vào giỏ và mở bước tạo brief.
// Chỉ chạy khi trang hiện tại có nút thêm vào giỏ.
function initProductDetail() {
  const addBtn = document.getElementById("add-to-cart-btn");
  if (!addBtn) {
    return; // trang này không phải chi tiết sản phẩm
  }

  const product = getDetailProduct();
  renderProductDetail(product);

  const qtyValue = document.getElementById("qty-value");
  const decreaseBtn = document.getElementById("qty-decrease");
  const increaseBtn = document.getElementById("qty-increase");
  const briefLink = document.getElementById("detail-brief-link");

  if (briefLink) {
    briefLink.href = buildCustomizeUrl(product.id, 1);
    // Ghi số lượng đang chọn vào bản nháp trước khi chuyển sang tạo brief.
    briefLink.addEventListener("click", function () {
      startCheckoutDraft(product.id, Number(qtyValue.textContent) || 1);
    });
  }

  // Số lượng hiển thị luôn nằm trong khoảng 1..MAX_QTY
  decreaseBtn.addEventListener("click", function () {
    const qty = Number(qtyValue.textContent);
    if (qty > 1) {
      qtyValue.textContent = qty - 1;
    }
  });

  increaseBtn.addEventListener("click", function () {
    const qty = Number(qtyValue.textContent);
    if (qty < MAX_QTY) {
      qtyValue.textContent = qty + 1;
    }
  });

  addBtn.addEventListener("click", function () {
    const qty = Number(qtyValue.textContent);
    const cart = readCart();
    const existing = cart.find(function (item) {
      return item.id === product.id;
    });

    if (existing) {
      // Sản phẩm đã có trong giỏ -> cộng dồn số lượng, không vượt MAX_QTY
      existing.qty = Math.min(existing.qty + qty, MAX_QTY);
    } else {
      cart.push({ id: product.id, qty: qty });
    }

    writeCart(cart);
    updateCartBadge(); // badge trên icon giỏ hàng cập nhật ngay
    qtyValue.textContent = 1; // đưa bộ chọn về 1 sau khi thêm
    showToast("Đã thêm " + qty + " sản phẩm vào giỏ hàng.");
  });
}

/* ---------- 8. Trang giỏ hàng (cart.html) ---------- */

// Vẽ danh sách sản phẩm trong giỏ từ localStorage và xử lý
// tăng / giảm số lượng, xóa sản phẩm, tính tổng tiền.
function initCartPage() {
  const cartList = document.getElementById("cart-list");
  if (!cartList) {
    return; // trang này không phải giỏ hàng
  }

  const template = document.getElementById("cart-item-template");
  const emptyState = document.getElementById("cart-empty");
  const summary = document.querySelector(".cart-summary");
  const layout = document.querySelector(".cart-layout");
  const subtotalEl = document.getElementById("cart-subtotal");
  const totalEl = document.getElementById("cart-total");

  // Vẽ lại toàn bộ danh sách từ dữ liệu. Mỗi thao tác (tăng/giảm/xóa)
  // đều sửa dữ liệu rồi gọi lại hàm này nên giao diện luôn khớp dữ liệu.
  function renderCart() {
    const cart = readCart();

    cartList.textContent = ""; // xóa các dòng cũ trước khi vẽ lại

    let subtotal = 0;
    cart.forEach(function (item) {
      const product = findProduct(item.id);
      const row = template.content.firstElementChild.cloneNode(true);

      row.dataset.id = product.id; // dùng để biết đang thao tác với sản phẩm nào

      const mediaLink = row.querySelector(".cart-item-media");
      if (mediaLink) {
        mediaLink.href = buildProductDetailUrl(product.id);
      }

      const nameLink = row.querySelector(".cart-item-name a");
      nameLink.textContent = product.name; // textContent an toàn
      nameLink.href = buildProductDetailUrl(product.id);

      const img = row.querySelector("img");
      img.src = product.image;
      img.alt = product.name;

      row.querySelector(".cart-item-artisan").textContent = "Nghệ nhân " + product.artisan;
      row.querySelector(".cart-item-price").textContent = formatPrice(product.price);
      row.querySelector(".qty-value").textContent = item.qty;
      row.querySelector(".cart-item-subtotal").textContent = formatPrice(product.price * item.qty);

      subtotal += product.price * item.qty;
      cartList.appendChild(row);
    });

    subtotalEl.textContent = formatPrice(subtotal);
    totalEl.textContent = formatPrice(subtotal);

    // Giỏ trống: ẩn danh sách và phần tóm tắt, hiện lời nhắn thay thế
    const isEmpty = cart.length === 0;
    cartList.hidden = isEmpty;
    summary.hidden = isEmpty;
    emptyState.hidden = !isEmpty;
    layout.classList.toggle("cart-layout-empty", isEmpty);
  }

  // Một listener duy nhất cho cả danh sách (ủy quyền sự kiện):
  // nút nào được bấm thì đọc data-action của nút đó.
  cartList.addEventListener("click", function (event) {
    const button = event.target.closest("[data-action]");
    if (!button) {
      return;
    }

    const row = button.closest(".cart-item");
    const id = row.dataset.id;
    const cart = readCart();
    const item = cart.find(function (entry) {
      return entry.id === id;
    });
    if (!item) {
      return;
    }

    const action = button.dataset.action;
    if (action === "increase") {
      if (item.qty >= MAX_QTY) {
        return; // đã đạt số lượng tối đa
      }
      item.qty += 1;
    } else if (action === "decrease") {
      if (item.qty <= 1) {
        return; // giảm đến 1 là dừng; muốn bỏ hẳn thì bấm nút "Xóa"
      }
      item.qty -= 1;
    } else if (action === "remove") {
      const index = cart.indexOf(item);
      cart.splice(index, 1);
      showToast("Đã xóa " + findProduct(id).name + " khỏi giỏ hàng.");
    }

    writeCart(cart);
    updateCartBadge();
    renderCart();
  });

  // Sau khi đã xem trang hoàn tất của một lần đặt hàng demo, lần bấm
  // "Tiến hành đặt hàng" tiếp theo sẽ bắt đầu một lượt mới thay vì mở
  // lại trang hoàn tất cũ.
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      const oldDraft = readCartCheckoutDraft();
      if (oldDraft && oldDraft.status === "completed") {
        clearCartCheckoutDraft();
      }
    });
  }

  renderCart(); // vẽ danh sách ngay khi mở trang
}

/* ---------- 9. Yêu thích ---------- */

// Nút trái tim ở trang chi tiết sản phẩm: bấm để thêm/bỏ yêu thích.
// Trạng thái nút được đọc lại từ localStorage nên mở lại trang vẫn đúng.
function initFavoriteButton() {
  const button = document.getElementById("favorite-btn");
  if (!button) {
    return; // trang này không phải chi tiết sản phẩm
  }

  const product = getDetailProduct();

  // Đồng bộ trạng thái nút với dữ liệu đang lưu. Thuộc tính aria-pressed
  // vừa giúp trình đọc màn hình biết trạng thái, vừa được CSS dùng để
  // tô trái tim đặc khi sản phẩm đã nằm trong yêu thích.
  function syncButton() {
    const isFavorite = readFavorites().includes(product.id);
    button.setAttribute("aria-pressed", String(isFavorite));
  }

  button.addEventListener("click", function () {
    const favorites = readFavorites();
    const index = favorites.indexOf(product.id);

    if (index === -1) {
      favorites.push(product.id);
      showToast("Đã thêm " + product.name + " vào yêu thích.");
    } else {
      favorites.splice(index, 1);
      showToast("Đã bỏ " + product.name + " khỏi yêu thích.");
    }

    writeFavorites(favorites);
    syncButton();
  });

  syncButton(); // cập nhật ngay khi mở trang
}

// Trang danh sách yêu thích: vẽ lưới sản phẩm từ các id trong localStorage.
function initFavoritesPage() {
  const grid = document.getElementById("favorites-grid");
  if (!grid) {
    return; // trang này không phải danh sách yêu thích
  }

  const template = document.getElementById("favorite-card-template");
  const emptyState = document.getElementById("favorites-empty");

  function renderFavorites() {
    const favorites = readFavorites();

    grid.textContent = ""; // xóa các thẻ cũ trước khi vẽ lại

    favorites.forEach(function (id) {
      const product = findProduct(id);
      const card = template.content.firstElementChild.cloneNode(true);

      card.dataset.id = product.id; // dùng khi bấm "Bỏ yêu thích"

      const mediaLink = card.querySelector(".product-media");
      mediaLink.href = buildProductDetailUrl(product.id);

      const img = card.querySelector("img");
      img.src = product.image;
      img.alt = product.name;

      const nameLink = card.querySelector(".product-name a");
      nameLink.textContent = product.name; // textContent an toàn
      nameLink.href = buildProductDetailUrl(product.id);

      const customizeLink = card.querySelector(".btn-customize");
      if (customizeLink) {
        customizeLink.href = buildCustomizeUrl(product.id, 1);
        customizeLink.addEventListener("click", function () {
          startCheckoutDraft(product.id, 1);
        });
      }

      card.querySelector(".product-artisan").textContent = product.artisan;
      card.querySelector(".product-price").textContent = formatPrice(product.price);
      // toFixed(1) để điểm 5 hiển thị "5.0" đúng như thiết kế
      card.querySelector(".rating-value").textContent = product.rating.toFixed(1);
      card.querySelector(".rating-count").textContent = "(" + product.reviewCount + ")";

      const noteEl = card.querySelector(".product-note");
      if (product.note) {
        noteEl.textContent = product.note;
      } else {
        noteEl.remove(); // sản phẩm không có ghi chú thì bỏ hẳn dòng này
      }

      grid.appendChild(card);
    });

    // Không còn sản phẩm nào: ẩn lưới, hiện lời nhắn thay thế
    const isEmpty = favorites.length === 0;
    grid.hidden = isEmpty;
    emptyState.hidden = !isEmpty;
  }

  // Ủy quyền sự kiện: một listener cho cả lưới, nút nào bấm thì xử lý nút đó
  grid.addEventListener("click", function (event) {
    const button = event.target.closest(".btn-remove-favorite");
    if (!button) {
      return;
    }

    const card = button.closest(".product-card");
    const id = card.dataset.id;
    const favorites = readFavorites().filter(function (entry) {
      return entry !== id;
    });

    writeFavorites(favorites);
    showToast("Đã bỏ " + findProduct(id).name + " khỏi yêu thích.");
    renderFavorites();
  });

  renderFavorites(); // vẽ danh sách ngay khi mở trang
}

/* ---------- 10. Thư viện ảnh ở trang chi tiết sản phẩm ---------- */

// Bấm vào ảnh nhỏ trong #gallery-thumbs thì ảnh lớn #gallery-main-img
// đổi theo ảnh nhỏ đó. Ảnh lấy từ chính thẻ <img> bên trong nút,
// không cần thêm dữ liệu gì trong HTML.
function initProductGallery() {
  const mainImg = document.getElementById("gallery-main-img");
  const thumbs = document.getElementById("gallery-thumbs");
  if (!mainImg || !thumbs) {
    return; // trang này không phải chi tiết sản phẩm
  }

  // Ủy quyền sự kiện: một listener cho cả dãy ảnh nhỏ. Danh sách nút
  // được đọc lại mỗi lần bấm vì trang chi tiết vẽ ảnh động theo sản phẩm.
  thumbs.addEventListener("click", function (event) {
    const button = event.target.closest(".thumb-btn");
    if (!button) {
      return;
    }

    const buttons = Array.from(thumbs.querySelectorAll(".thumb-btn"));
    const thumbImg = button.querySelector("img");
    mainImg.src = thumbImg.src;
    mainImg.alt = "Ảnh sản phẩm " + (buttons.indexOf(button) + 1);

    // Đánh dấu ảnh nhỏ đang được chọn (CSS tô viền)
    buttons.forEach(function (item) {
      item.classList.toggle("active", item === button);
    });
  });
}

/* ---------- 11. Trang tạo brief (customize.html) ---------- */

// Trang tạo brief: gắn sản phẩm và số lượng đang chọn, tạo một bản
// tóm tắt cục bộ từ chính nội dung người dùng nhập. Không gọi mô hình AI
// và không tự thêm chất liệu, kích thước hay phụ phí khi chưa có dữ liệu.
function initCustomizePage() {
  const form = document.getElementById("brief-form");
  const resultPanel = document.querySelector(".customize-result-panel");
  if (!form || !resultPanel) {
    return; // trang này không phải trang tạo brief
  }

  const description = document.getElementById("brief-description");
  const charCount = document.getElementById("char-count");
  const note = document.getElementById("brief-note");
  const status = document.getElementById("ai-status");
  const submitBtn = document.getElementById("ai-brief-btn");
  const editBtn = document.getElementById("edit-brief-btn");
  const rejectBtn = document.getElementById("reject-brief-btn");
  const regenerateBtn = document.getElementById("regenerate-brief-btn");
  const saveBtn = document.getElementById("save-brief-btn");
  const acceptBtn = document.getElementById("accept-brief-btn");
  const referenceInput = document.getElementById("reference-image");
  const qtyValue = document.getElementById("customize-qty-value");
  const productName = document.getElementById("customize-product-name");
  const productMeta = document.getElementById("customize-product-meta");
  const productImage = document.getElementById("customize-product-image");
  const backLink = document.getElementById("customize-back-link");
  const briefResult = document.getElementById("brief-result");
  const explain = document.querySelector(".ai-explain");

  const urlId = getQueryParam("id");
  const urlProduct = urlId ? findProduct(urlId) : null;
  const urlQty = Number(getQueryParam("qty"));
  let draft = readCheckoutDraft();

  // Không có bản nháp, đổi sản phẩm hoặc vừa hoàn tất đơn trước đó:
  // bắt đầu một bản nháp mới. Nếu URL thiếu ?id thì dùng sản phẩm mẫu Cốc.
  if (!draft || draft.status === "completed" || (urlProduct && draft.productId !== urlProduct.id)) {
    const targetProduct = urlProduct || (draft ? findProduct(draft.productId) : findProduct(DETAIL_PRODUCT_ID));
    if (!targetProduct) {
      return;
    }
    const targetQty = urlProduct && Number.isInteger(urlQty) && urlQty >= 1
      ? urlQty
      : (draft ? draft.qty : 1);
    draft = startCheckoutDraft(targetProduct.id, targetQty);
    if (urlId && !urlProduct) {
      showToast("Không tìm thấy sản phẩm trong dữ liệu mẫu; đang dùng sản phẩm mẫu Cốc gốm lá nâu.");
    }
  }

  if (!draft) {
    return;
  }

  const product = findProduct(draft.productId);
  let qty = draft.qty;
  let generated = false;
  let analyzing = false; // chặn bấm chồng khi đang tạo tóm tắt

  // Gắn thông tin sản phẩm vào cột nhập liệu để người dùng luôn biết
  // mình đang tùy biến món nào và với mức giá nào.
  if (productImage) {
    productImage.src = product.image;
    productImage.alt = product.name;
  }
  if (productName) {
    productName.textContent = product.name;
  }
  if (productMeta) {
    productMeta.textContent = product.artisan + " • " + formatPrice(product.price) + " / sản phẩm";
  }
  if (backLink) {
    backLink.href = buildProductDetailUrl(product.id);
  }

  qtyValue.textContent = qty;
  description.value = draft.brief;
  charCount.textContent = description.value.length;

  // Các khối nội dung của bản tóm tắt — ẩn/hiện cùng nhau.
  const resultParts = [
    briefResult,
    document.querySelector(".brief-section-title"),
    explain,
    document.querySelector(".brief-actions")
  ].filter(function (part) {
    return part !== null; // chỉ giữ phần tử thực sự có trên trang
  });

  function setResultVisible(visible) {
    resultParts.forEach(function (part) {
      part.hidden = !visible;
    });
  }

  status.hidden = true;
  note.hidden = true;
  resultPanel.hidden = true;

  function clearAcceptance() {
    if (draft.acceptedBrief || draft.artisanId) {
      draft = updateCheckoutDraft({ acceptedBrief: "", artisanId: null }) || draft;
    }
  }

  function hideStaleResult() {
    if (!resultPanel.hidden) {
      resultPanel.hidden = true;
      generated = false;
    }
    clearAcceptance();
  }

  // Đếm ký tự và lưu tạm nội dung vào sessionStorage để quay lại
  // hoặc tải lại trang vẫn còn nội dung đang viết.
  description.addEventListener("input", function () {
    charCount.textContent = description.value.length;
    draft = updateCheckoutDraft({ brief: description.value }) || draft;
    hideStaleResult();
  });

  if (referenceInput) {
    referenceInput.addEventListener("change", function () {
      hideStaleResult();
      if (referenceInput.files.length > 0) {
        showToast("Đã chọn ảnh tham khảo trên thiết bị; bản demo không tải ảnh lên máy chủ.");
      }
    });
  }

  function changeQty(nextQty) {
    const safeQty = Math.min(Math.max(1, nextQty), MAX_QTY);
    if (safeQty === qty) {
      return;
    }

    qty = safeQty;
    qtyValue.textContent = qty;
    draft = updateCheckoutDraft({ qty: qty }) || draft;
    hideStaleResult();
    showToast("Đã đổi số lượng. Hãy tạo lại bản tóm tắt trước khi chấp nhận.");
  }

  document.getElementById("customize-qty-decrease").addEventListener("click", function () {
    changeQty(qty - 1);
  });

  document.getElementById("customize-qty-increase").addEventListener("click", function () {
    changeQty(qty + 1);
  });

  // Bản tóm tắt chỉ ghép những gì có thật: nội dung người dùng nhập
  // và các trường đã có trong data.js. Không suy đoán thêm.
  function buildSummary() {
    const styleLabels = (product.styles || []).map(function (style) {
      return STYLE_LABELS[style] || style;
    });
    const referenceText = referenceInput && referenceInput.files.length > 0
      ? "Đã chọn 1 ảnh trên thiết bị (bản demo chưa tải hoặc lưu ảnh)."
      : "Không có";

    const rows = [
      ["Sản phẩm", product.name],
      ["Số lượng", String(qty)],
      ["Mô tả của bạn", description.value.trim()],
      ["Phong cách trong dữ liệu mẫu", styleLabels.length > 0 ? styleLabels.join(", ") : "Chưa có thông tin"],
      ["Thời gian hoàn thành dự kiến", LEAD_TIME_LABELS[product.leadTime] || "Chưa có thông tin"],
      ["Đơn giá tham khảo", formatPrice(product.price)],
      ["Tạm tính", formatPrice(product.price * qty) + " (chưa gồm phí tùy biến hoặc giao hàng)"],
      ["Ảnh tham khảo", referenceText]
    ];

    briefResult.textContent = "";
    rows.forEach(function (row) {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");
      dt.textContent = row[0];
      dd.textContent = row[1];
      briefResult.appendChild(dt);
      briefResult.appendChild(dd);
    });

    if (explain) {
      explain.textContent = "Bản tóm tắt này được tạo cục bộ bằng JavaScript từ nội dung bạn nhập " +
        "và các trường có sẵn trong dữ liệu mẫu. Hệ thống không dùng mô hình AI tạo sinh, " +
        "không tự thêm chất liệu, kích thước hoặc phụ phí khi dữ liệu chưa có.";
    }
  }

  function runSummary(doneMessage) {
    if (description.value.trim() === "") {
      note.textContent = "Vui lòng nhập mô tả yêu cầu trước khi tạo bản tóm tắt.";
      note.hidden = false;
      description.focus();
      return;
    }
    if (analyzing) {
      return;
    }

    analyzing = true;
    resultPanel.hidden = false;
    setResultVisible(false);
    note.hidden = true;
    status.hidden = false;
    submitBtn.disabled = true;

    // Giữ nguyên độ trễ ngắn để người dùng thấy phản hồi, nhưng đây chỉ
    // là xử lý cục bộ trong trình duyệt — không phải mô hình AI.
    draft = updateCheckoutDraft({
      brief: description.value,
      qty: qty,
      acceptedBrief: "",
      artisanId: null
    }) || draft;

    setTimeout(function () {
      analyzing = false;
      submitBtn.disabled = false;
      status.hidden = true;
      buildSummary();
      setResultVisible(true);
      generated = true;
      showToast(doneMessage);
    }, 600);
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // chặn tải lại trang
    runSummary("Đã tạo bản tóm tắt từ nội dung bạn nhập.");
  });

  if (editBtn) {
    editBtn.addEventListener("click", function () {
      description.focus();
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", function () {
      resultPanel.hidden = true;
      generated = false;
      clearAcceptance();
      showToast("Đã bỏ bản tóm tắt. Nội dung mô tả của bạn vẫn được giữ lại.");
    });
  }

  if (regenerateBtn) {
    regenerateBtn.addEventListener("click", function () {
      runSummary("Đã tạo lại bản tóm tắt từ nội dung hiện tại.");
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", function () {
      draft = updateCheckoutDraft({ brief: description.value }) || draft;
      showToast("Đã lưu tạm trong tab này. Dữ liệu sẽ mất khi đóng tab.");
    });
  }

  // Chấp nhận brief là điều kiện bắt buộc trước khi sang bước chọn nghệ nhân.
  // Không tự chọn nghệ nhân và không gửi dữ liệu đi đâu.
  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      if (description.value.trim() === "") {
        note.textContent = "Vui lòng nhập mô tả yêu cầu trước khi chấp nhận.";
        note.hidden = false;
        description.focus();
        return;
      }
      if (!generated) {
        note.textContent = "Hãy tạo bản tóm tắt mới nhất trước khi chấp nhận brief.";
        note.hidden = false;
        return;
      }

      const accepted = updateCheckoutDraft({
        brief: description.value.trim(),
        qty: qty,
        acceptedBrief: description.value.trim(),
        artisanId: null,
        checkoutStep: 1,
        status: "editing"
      });
      if (!accepted) {
        return;
      }

      window.location.href = "artisan-suggestions.html";
    });
  }
}

/* ---------- 12. Trang đơn hàng (orders.html) ---------- */

// Lọc bảng đơn hàng theo tab trạng thái, từ khóa và khoảng thời gian.
// Mỗi dòng <tr> mang sẵn data-status và data-date để việc lọc chỉ là
// so sánh thuộc tính — không cần đọc nội dung ô.
function initOrdersPage() {
  const tbody = document.getElementById("orders-table-body");
  if (!tbody) {
    return; // trang này không phải danh sách đơn hàng
  }

  const tabs = document.getElementById("order-tabs");
  const searchInput = document.getElementById("order-search");
  const timeFilter = document.getElementById("order-time-filter");
  const tableScroll = document.querySelector(".table-scroll");
  const emptyState = document.getElementById("orders-empty");

  const rows = Array.from(tbody.querySelectorAll("tr"));
  let currentStatus = "all"; // tab đang chọn

  // Một đơn có khớp với TẤT CẢ điều kiện đang lọc hay không
  function orderMatches(row) {
    // 1. Trạng thái: tab "all" thì bỏ qua điều kiện này
    if (currentStatus !== "all" && row.dataset.status !== currentStatus) {
      return false;
    }

    // 2. Từ khóa: tìm theo mã đơn và tên nghệ nhân (gõ không dấu vẫn được)
    const keyword = normalizeText(searchInput.value);
    if (keyword !== "") {
      const code = row.querySelector(".order-code").textContent;
      const artisan = row.querySelector(".order-artisan span").textContent;
      if (!normalizeText(code + " " + artisan).includes(keyword)) {
        return false;
      }
    }

    // 3. Thời gian: so ngày đặt đơn với mốc hiện tại.
    // Lưu ý: dữ liệu mẫu là đơn của năm 2025 nên khi lọc 7/30 ngày
    // gần đây sẽ không có kết quả — đây là hành vi đúng của bộ lọc.
    const range = timeFilter.value;
    if (range !== "all") {
      const days = range === "last-7-days" ? 7 : 30;
      const limit = Date.now() - days * 24 * 60 * 60 * 1000;
      if (new Date(row.dataset.date).getTime() < limit) {
        return false;
      }
    }

    return true;
  }

  // Hàm trung tâm: áp mọi điều kiện rồi cập nhật hiển thị
  function applyOrderFilters() {
    let visibleCount = 0;
    rows.forEach(function (row) {
      const show = orderMatches(row);
      row.hidden = !show;
      if (show) {
        visibleCount += 1;
      }
    });

    // Không còn đơn nào khớp: ẩn bảng, hiện lời nhắn thay thế
    tableScroll.hidden = visibleCount === 0;
    emptyState.hidden = visibleCount > 0;
  }

  // Bấm tab: đổi tab đang chọn rồi lọc lại
  if (tabs) {
    tabs.addEventListener("click", function (event) {
      const button = event.target.closest(".tab-btn");
      if (!button) {
        return;
      }

      currentStatus = button.dataset.status;
      tabs.querySelectorAll(".tab-btn").forEach(function (item) {
        item.classList.toggle("active", item === button);
      });
      applyOrderFilters();
    });
  }

  // Ô tìm kiếm: lọc ngay khi gõ; chặn Enter làm tải lại trang
  searchInput.addEventListener("input", applyOrderFilters);
  searchInput.form.addEventListener("submit", function (event) {
    event.preventDefault();
  });

  if (timeFilter) {
    timeFilter.addEventListener("change", applyOrderFilters);
  }

  // Hủy đơn: xác nhận trước, sau đó chỉ đổi giao diện trên bản demo
  // (dự án chưa có máy chủ nên không thao tác lên đơn hàng thật).
  tbody.addEventListener("click", function (event) {
    const button = event.target.closest(".btn-cancel-order");
    if (!button) {
      return;
    }

    const row = button.closest("tr");
    const code = row.querySelector(".order-code").textContent;
    const confirmed = confirm("Hủy đơn hàng " + code + "? Thao tác này chỉ thay đổi trên bản demo.");

    if (!confirmed) {
      return;
    }

    row.dataset.status = "cancelled"; // để bộ lọc tab biết trạng thái mới
    const badge = row.querySelector(".badge");
    badge.className = "badge badge-cancelled";
    badge.textContent = "Đã hủy";
    button.hidden = true; // đơn đã hủy thì không còn nút hủy

    applyOrderFilters();
    showToast("Đã hủy đơn hàng " + code + " (mô phỏng trên bản demo).");
  });

  applyOrderFilters(); // đồng bộ giao diện ngay khi mở trang
}

/* ---------- 13. Trang chi tiết đơn (order-details.html) ---------- */

// Nút "Gửi yêu cầu chỉnh sửa": kiểm tra nội dung rồi lưu NHÁP vào
// trình duyệt. Dự án chưa có máy chủ nên thông báo nói rõ là chưa gửi đi.
function initOrderDetailsPage() {
  const sendBtn = document.getElementById("send-revision-btn");
  if (!sendBtn) {
    return; // trang này không phải chi tiết đơn
  }

  const noteInput = document.getElementById("revision-note");

  // Mở lại trang thì khôi phục nháp đã lưu lần trước (nếu có)
  const draft = readJson(REVISION_DRAFT_KEY, null);
  if (draft && typeof draft.content === "string") {
    noteInput.value = draft.content;
  }

  sendBtn.addEventListener("click", function () {
    const content = noteInput.value.trim();

    if (content === "") {
      showToast("Vui lòng nhập nội dung chỉnh sửa trước khi gửi.");
      noteInput.focus();
      return;
    }

    writeJson(REVISION_DRAFT_KEY, { content: content });
    showToast("Đã lưu nháp trên trình duyệt — bản demo chưa gửi đến nghệ nhân.");
  });
}

/* ---------- 14. Trang gợi ý nghệ nhân (artisan-suggestions.html) ---------- */

// Trang gợi ý nghệ nhân: lọc hồ sơ có thật trong CRAFTLINK_ARTISANS theo
// sản phẩm đang tùy biến và nội dung brief đã được chấp nhận. Đây là bộ lọc
// tiêu chí cục bộ, không phải mô hình AI và không dùng phần trăm giả.
function initArtisanSuggestionsPage() {
  const list = document.getElementById("artisan-list");
  const template = document.getElementById("artisan-card-template");
  const emptyState = document.getElementById("suggestions-empty");
  if (!list || !template || !emptyState) {
    return; // trang này không phải trang gợi ý nghệ nhân
  }

  const context = document.getElementById("suggestion-context");
  const productName = document.getElementById("suggestion-product-name");
  const productMeta = document.getElementById("suggestion-product-meta");
  const briefText = document.getElementById("suggestion-brief");
  const backLink = document.getElementById("suggestion-back-link");
  const summary = document.getElementById("suggestion-summary");
  const resetBtn = document.getElementById("suggestion-reset-btn");
  const emptyTitle = document.getElementById("suggestions-empty-title");
  const emptyText = document.getElementById("suggestions-empty-text");
  const emptyLink = document.getElementById("suggestions-empty-link");

  const draft = readCheckoutDraft();
  const product = draft ? findProduct(draft.productId) : null;
  const hasAcceptedBrief = Boolean(draft && draft.brief.trim() !== "" &&
    draft.acceptedBrief === draft.brief);

  function showGuidance(title, text, linkLabel, linkHref) {
    list.hidden = true;
    if (context) {
      context.hidden = true;
    }
    if (summary) {
      summary.hidden = true;
    }
    if (resetBtn) {
      resetBtn.hidden = true;
    }
    emptyState.hidden = false;
    emptyTitle.textContent = title;
    emptyText.textContent = text;
    emptyLink.textContent = linkLabel;
    emptyLink.href = linkHref;
    emptyLink.hidden = false;
  }

  if (!draft || !product) {
    showGuidance(
      "Chưa có yêu cầu tùy biến",
      "Hãy chọn một sản phẩm và tạo brief trước. Trang gợi ý chỉ hoạt động dựa trên brief đã chấp nhận.",
      "Tạo brief tùy biến",
      "customize.html"
    );
    return;
  }

  if (!hasAcceptedBrief) {
    showGuidance(
      "Brief chưa được chấp nhận",
      "Hãy quay lại trang tạo brief, tạo bản tóm tắt mới nhất và bấm “Chấp nhận” trước khi chọn nghệ nhân.",
      "Quay lại tạo brief",
      "customize.html"
    );
    return;
  }

  // Hiển thị lại ngữ cảnh để người dùng không quên mình đang tùy biến gì.
  if (context) {
    context.hidden = false;
    productName.textContent = product.name;
    productMeta.textContent = (CATEGORY_LABELS[product.category] || "Chưa có thông tin danh mục") +
      " • Số lượng " + draft.qty + " • Tạm tính " + formatPrice(product.price * draft.qty);
    briefText.textContent = "Brief: " + draft.brief;
    backLink.href = "customize.html";
  }

  // Tập từ nối/từ quá chung không dùng để so khớp, tránh gợi ý nhiễu.
  const ignoredTokens = ["va", "cua", "cho", "voi", "cac", "nhung", "mot", "nhu", "the", "la", "co", "khong"];
  const ignoredTags = ["thu cong", "tu nhien"];

  function collectMatches() {
    const productText = normalizeText([
      product.name,
      CATEGORY_LABELS[product.category] || "",
      (product.styles || []).map(function (style) {
        return STYLE_LABELS[style] || style;
      }).join(" "),
      product.note || ""
    ].join(" "));
    const briefHaystack = normalizeText(draft.brief);

    const matches = [];

    CRAFTLINK_ARTISANS.forEach(function (artisan) {
      const reasons = [];
      let score = 0;

      if ((artisan.productIds || []).includes(product.id)) {
        score += 50;
        reasons.push("Có sản phẩm mẫu bạn đang tùy biến trong hồ sơ.");
      }

      const labels = [];
      (artisan.specialties || []).concat(artisan.tags || []).forEach(function (label) {
        const normalized = normalizeText(label);
        if (!normalized || labels.includes(normalized) || ignoredTags.includes(normalized)) {
          return;
        }
        labels.push(normalized);

        if (briefHaystack.includes(normalized)) {
          score += 8;
          reasons.push("Brief của bạn có nhắc đến “" + label + "”.");
          return;
        }

        if (productText.includes(normalized)) {
          score += 5;
          reasons.push("Sản phẩm có thông tin “" + label + "” trùng với thẻ/chuyên môn.");
          return;
        }

        const matchingToken = normalized.split(" ").find(function (token) {
          return token.length >= 3 && !ignoredTokens.includes(token) &&
            briefHaystack.includes(token);
        });
        if (matchingToken) {
          score += 3;
          reasons.push("Từ khóa “" + matchingToken + "” trong brief trùng với thẻ/chuyên môn “" + label + "”.");
        }
      });

      if (artisan.customOrderNote) {
        score += 1;
        reasons.push("Hồ sơ ghi nhận nhận đặt làm theo yêu cầu.");
      }

      if (reasons.length > 0) {
        matches.push({ artisan: artisan, reasons: reasons, score: score });
      }
    });

    matches.sort(function (a, b) {
      return b.score - a.score || a.artisan.name.localeCompare(b.artisan.name, "vi");
    });

    return matches;
  }

  const matches = collectMatches();
  if (matches.length === 0) {
    showGuidance(
      "Chưa tìm thấy nghệ nhân phù hợp",
      "Dữ liệu mẫu chưa có hồ sơ trùng với sản phẩm hoặc nội dung brief hiện tại. Hãy quay lại chỉnh brief.",
      "Quay lại tạo brief",
      "customize.html"
    );
    return;
  }

  // Giao diện giữ tối đa 3 thẻ giống thiết kế cũ; nếu dữ liệu có nhiều hơn,
  // phần tóm tắt ghi rõ số hồ sơ còn lại.
  const displayedMatches = matches.slice(0, 3);
  let skippedIds = [];

  function fillCard(card, match) {
    const artisan = match.artisan;

    card.dataset.artisanId = artisan.id;

    const photo = card.querySelector(".artisan-photo-img");
    const initial = card.querySelector(".artisan-photo-initial");
    if (artisan.image) {
      photo.src = artisan.image;
      photo.alt = "Nghệ nhân " + artisan.name;
      photo.hidden = false;
      initial.hidden = true;
    } else {
      photo.removeAttribute("src");
      photo.hidden = true;
      initial.textContent = artisan.name.charAt(0).toUpperCase();
      initial.hidden = false;
    }

    card.querySelector(".artisan-name-lg").textContent = artisan.name;

    const tagList = card.querySelector(".tag-list");
    tagList.textContent = "";
    const tags = [];
    (artisan.tags || []).concat(artisan.specialties || []).forEach(function (tag) {
      if (tag && !tags.includes(tag)) {
        tags.push(tag);
      }
    });
    if (tags.length === 0) {
      tags.push("Chưa có thông tin");
    }
    tags.forEach(function (tag) {
      const item = document.createElement("li");
      item.className = "tag";
      item.textContent = tag;
      tagList.appendChild(item);
    });

    card.querySelector(".artisan-desc").textContent = artisan.description ||
      "Chưa có thông tin mô tả nghệ nhân.";

    const reasonList = card.querySelector(".artisan-reasons");
    reasonList.textContent = "";
    match.reasons.forEach(function (reason) {
      const item = document.createElement("li");
      item.textContent = reason;
      reasonList.appendChild(item);
    });

    card.querySelector(".artisan-location-line").textContent =
      "Địa điểm: " + (artisan.location || "Chưa có thông tin");
    card.querySelector(".artisan-product-count-line").textContent =
      "Sản phẩm mẫu trong dữ liệu: " + (artisan.productIds || []).length;
    card.querySelector(".artisan-custom-line").textContent = artisan.customOrderNote
      ? "Nhận đặt làm: " + artisan.customOrderNote
      : "Nhận đặt làm: Chưa có thông tin";

    const demoNote = card.querySelector(".artisan-demo-note");
    if (artisan.demoNote) {
      demoNote.textContent = "Lưu ý dữ liệu: " + artisan.demoNote;
      demoNote.hidden = false;
    } else {
      demoNote.hidden = true;
    }

    const matchScore = card.querySelector(".match-score");
    matchScore.title = "Số tiêu chí dữ liệu trùng khớp, không phải phần trăm hay xác suất của mô hình AI.";
    card.querySelector(".match-tag").textContent = match.reasons.length;
  }

  function renderCards() {
    list.textContent = "";

    const visibleMatches = displayedMatches.filter(function (match) {
      return !skippedIds.includes(match.artisan.id);
    });

    visibleMatches.forEach(function (match) {
      const fragment = template.content.cloneNode(true);
      const card = fragment.querySelector(".artisan-suggestion-card");
      fillCard(card, match);
      list.appendChild(fragment);
    });

    list.hidden = visibleMatches.length === 0;

    if (visibleMatches.length === 0) {
      emptyState.hidden = false;
      emptyTitle.textContent = "Bạn đã bỏ qua tất cả gợi ý";
      emptyText.textContent = "Bấm “Tạo lại gợi ý” để xem lại danh sách hồ sơ từ dữ liệu mẫu.";
      emptyLink.hidden = true;
    } else {
      emptyState.hidden = true;
    }

    if (summary) {
      summary.hidden = false;
      summary.textContent = "Có " + matches.length + " hồ sơ có ít nhất một tiêu chí trùng khớp; " +
        "đang hiển thị " + visibleMatches.length + " hồ sơ. Đây là bộ lọc dữ liệu mẫu, không phải xác suất AI.";
    }
  }

  function resetSuggestions() {
    skippedIds = [];
    renderCards();
    showToast("Đã hiện lại gợi ý từ dữ liệu mẫu; không có mô hình AI để tạo hồ sơ mới.");
  }

  if (resetBtn) {
    resetBtn.hidden = false;
    resetBtn.addEventListener("click", resetSuggestions);
  }

  // Một listener cho cả danh sách thay vì gắn riêng cho từng thẻ.
  list.addEventListener("click", function (event) {
    const button = event.target.closest("button");
    if (!button) {
      return;
    }

    const card = button.closest(".artisan-suggestion-card");
    const artisan = findArtisanById(card.dataset.artisanId);
    if (!artisan) {
      return;
    }

    if (button.classList.contains("artisan-select-btn")) {
      const updated = updateCheckoutDraft({
        artisanId: artisan.id,
        checkoutStep: 1,
        status: "editing"
      });
      if (updated) {
        window.location.href = "checkout.html";
      }
    } else if (button.classList.contains("artisan-skip-btn")) {
      skippedIds.push(artisan.id);
      renderCards();
      showToast("Đã bỏ qua gợi ý từ " + artisan.name + ".");
    } else if (button.classList.contains("artisan-regenerate-btn")) {
      resetSuggestions();
    }
  });

  renderCards();
}

/* ---------- 15. Phản hồi trung thực cho các nút chưa có trong bản demo ---------- */

// Một số liên kết/nút thuộc phạm vi khác của đồ án (đăng nhập, tin nhắn,
// trợ giúp...) chưa có trang tương ứng. Thay vì để bấm vào không có gì
// xảy ra, các nút này hiện toast nói rõ đây là bản demo.
function initInactiveFeatures() {
  document.addEventListener("click", function (event) {
    // 1. Liên kết chân trang chưa có trang đích (href="#")
    const deadLink = event.target.closest('a[href="#"]');
    if (deadLink) {
      event.preventDefault();
      showToast("Bản demo chưa hỗ trợ chức năng này.");
      return;
    }

    // 2. Nút icon trên header: Tin nhắn, Tài khoản
    const iconButton = event.target.closest(".header-actions button.icon-btn");
    if (iconButton) {
      const label = iconButton.getAttribute("aria-label") || "này";
      showToast("Chức năng " + label + " chưa có trong bản demo.");
      return;
    }

    // 3. Nút "Báo cáo listing" ở trang chi tiết sản phẩm
    const reportBtn = event.target.closest("#report-listing-btn");
    if (reportBtn) {
      showToast("Bản demo chưa hỗ trợ gửi báo cáo listing.");
    }
  });
}

/* ---------- 16. Khởi động ---------- */
// Script nằm ở cuối <body> nên toàn bộ HTML đã được tải xong khi chạy.
// Mỗi hàm init tự kiểm tra trang hiện tại có thành phần tương ứng không,
// nên có thể gọi an toàn trên cả 8 trang.

updateCartBadge();             // badge giỏ hàng trên header — chạy ở mọi trang
initProductList();             // chỉ có tác dụng ở trang danh sách sản phẩm
initProductLinks();            // gắn ?id cho các thẻ sản phẩm tĩnh ở index
initProductDetail();           // chỉ có tác dụng ở trang chi tiết sản phẩm
initCartPage();                // chỉ có tác dụng ở trang giỏ hàng
initFavoriteButton();          // chỉ có tác dụng ở trang chi tiết sản phẩm
initFavoritesPage();           // chỉ có tác dụng ở trang yêu thích
initProductGallery();          // chỉ có tác dụng ở trang chi tiết sản phẩm
initCustomizePage();           // chỉ có tác dụng ở trang tạo brief
initOrdersPage();              // chỉ có tác dụng ở trang đơn hàng
initOrderDetailsPage();        // chỉ có tác dụng ở trang chi tiết đơn
initArtisanSuggestionsPage();  // chỉ có tác dụng ở trang gợi ý nghệ nhân
initInactiveFeatures();        // chạy ở mọi trang (các nút chưa có chức năng)
