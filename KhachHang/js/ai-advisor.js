/* ==========================================================================
   ai-advisor.js — Trợ lý thủ công thông minh (demo tìm kiếm cục bộ)
   --------------------------------------------------------------------------
   LƯU Ý QUAN TRỌNG:
   - Đây KHÔNG phải AI tạo sinh và KHÔNG gọi API bên ngoài.
   - Mọi phân tích dựa trên từ khóa + luật đơn giản viết bằng JavaScript.
   - Dữ liệu chỉ lấy từ CRAFTLINK_PRODUCTS và CRAFTLINK_ARTISANS (data.js).
   - Không gửi dữ liệu người dùng đi đâu và không lưu lịch sử tìm kiếm.
   - Điểm "độ khớp" là điểm minh bạch theo tiêu chí, không phải xác suất
     của một mô hình AI.
   ========================================================================== */

/* ==========================================================================
   1. Nhãn và từ khóa của bộ phân tích
   ========================================================================== */

const AI_CATEGORY_LABELS = {
  "do-gom": "Đồ gốm",
  "do-trang-tri": "Đồ trang trí",
  "do-dung-nha-bep": "Đồ dùng nhà bếp",
  "phu-kien": "Phụ kiện",
  "qua-tang": "Quà tặng"
};

const AI_STYLE_LABELS = {
  "toi-gian": "Tối giản",
  "moc-mac": "Mộc mạc",
  "hien-dai": "Hiện đại",
  "truyen-thong": "Truyền thống"
};

const AI_LEAD_LABELS = {
  "1-3": "1 – 3 ngày",
  "4-7": "4 – 7 ngày",
  "8-14": "8 – 14 ngày",
  "tren-14": "trên 14 ngày"
};

// Quy đổi thời gian hoàn thành sang số ngày để so sánh với câu người dùng.
// "tren-14" dùng 99 như một mốc rất lớn (luôn vượt các mốc 3/7/14 ngày).
const AI_LEAD_MAX_DAYS = {
  "1-3": 3,
  "4-7": 7,
  "8-14": 14,
  "tren-14": 99
};

const AI_LOCATION_OPTIONS = [
  { value: "ha-noi", label: "Hà Nội", patterns: ["ha noi", "hn"] },
  { value: "ho-chi-minh", label: "TP. Hồ Chí Minh", patterns: ["ho chi minh", "tp hcm", "hcm", "sai gon", "saigon"] },
  { value: "da-nang", label: "Đà Nẵng", patterns: ["da nang"] }
];

// Mỗi loại sản phẩm có:
// - patterns: cách người dùng có thể gọi;
// - productWords: từ phải có trong tên sản phẩm để được xem là đúng loại.
const AI_TYPE_OPTIONS = [
  { label: "Cốc / ly", patterns: ["coc", "ly", "chen uong"], productWords: ["coc"] },
  { label: "Bát / chén", patterns: ["bat", "chen", "to"], productWords: ["bat"] },
  { label: "Bình / lọ", patterns: ["binh", "lo", "hu"], productWords: ["binh"] },
  { label: "Đĩa", patterns: ["dia"], productWords: ["dia"] },
  { label: "Chậu cây", patterns: ["chau cay", "chau"], productWords: ["chau"] },
  { label: "Bộ ấm trà", patterns: ["bo am tra", "am tra", "bo am"], productWords: ["am"] },
  { label: "Chuông gió", patterns: ["chuong gio", "chuong"], productWords: ["chuong"] },
  { label: "Trang sức", patterns: ["trang suc", "vong tay", "day chuyen"], productWords: ["trang suc", "vong tay", "day chuyen"] }
];

const AI_MATERIAL_OPTIONS = [
  { label: "Gốm", patterns: ["gom", "su", "ceramic"] },
  { label: "Gỗ", patterns: ["go", "wood"] },
  { label: "Thêu", patterns: ["theu", "theu tay"] }
];

const AI_STYLE_OPTIONS = [
  { id: "toi-gian", patterns: ["toi gian", "minimal", "don gian"] },
  { id: "moc-mac", patterns: ["moc mac", "tu nhien", "rustic"] },
  { id: "hien-dai", patterns: ["hien dai", "modern"] },
  { id: "truyen-thong", patterns: ["truyen thong", "co dien", "classic"] }
];

// Thứ tự kiểm tra cũng là thứ tự ưu tiên khi một câu chứa nhiều danh mục.
const AI_CATEGORY_PATTERNS = {
  "do-trang-tri": ["do trang tri", "trang tri", "de ban", "trang hoa"],
  "do-dung-nha-bep": ["do dung nha bep", "nha bep", "do bep"],
  "phu-kien": ["phu kien"],
  "qua-tang": ["qua tang"]
};

// Dịp tặng chưa có trường dữ liệu riêng trong dự án, nên chỉ hiển thị để
// tham khảo và không dùng để chấm điểm.
const AI_OCCASION_OPTIONS = [
  { label: "Sinh nhật", patterns: ["sinh nhat", "birthday"] },
  { label: "Kỷ niệm", patterns: ["ky niem", "anniversary"] },
  { label: "Đám cưới", patterns: ["dam cuoi", "cuoi hoi", "wedding"] },
  { label: "Khai trương", patterns: ["khai truong"] }
];

const AI_CUSTOM_PATTERNS = [
  "dat lam",
  "lam theo yeu cau",
  "theo yeu cau",
  "tuy bien",
  "custom",
  "nhan don",
  "gia cong"
];

const AI_ARTISAN_INTENT_WORDS = ["tho", "nghe nhan", "xuong", "cua hang", "ho so", "nguoi lam", "shop", "artisan"];
const AI_PRODUCT_INTENT_WORDS = ["mua", "san pham", "mon", "do vat", "dat hang", "con hang", "gia", "ngan sach"];

// Từ nối / từ quá chung: loại khỏi danh sách từ khóa để tránh chấm điểm nhiễu.
// Không đưa "la" (lá), "nau" (nâu), "men", "van" (vân)... vào đây vì đây là
// những từ mô tả có ích cho việc tìm sản phẩm.
const AI_STOP_WORDS = new Set([
  "toi", "minh", "ban", "chung", "can", "muon", "tim", "mua", "mot", "vai",
  "nhung", "cac", "loai", "san", "pham", "mon", "do", "vat", "giup", "tu",
  "van", "goi", "y", "phu", "hop", "cho", "cua", "va", "voi", "co", "khong",
  "duoc", "trong", "duoi", "tren", "khoang", "tam", "gia", "ngan", "sach",
  "hay", "rat", "kha", "nhieu", "it", "lon", "nho", "cao", "thap", "moi",
  "cu", "dep", "xinh", "nao", "gi", "the", "nay", "vay", "nhi", "bao",
  "xin", "chao", "vui", "long", "tho", "nghe", "nhan", "xuong", "ho", "so",
  "nguoi", "lam", "dat", "theo", "yeu", "cau", "tuy", "bien", "don", "shop",
  "artisan", "cai", "chiec", "nhe", "a", "phong", "cach", "kieu", "dang",
  "mau", "sac", "kich", "thuoc", "size", "thu", "cong", "chat", "lieu",
  "ngay", "tuan", "vong", "gap", "nhanh", "som", "truoc", "trieu", "nghin",
  "ngan", "dong", "d", "tr", "k", "tp", "hcm", "sai", "gon", "ha", "noi",
  "da", "nang", "sinh", "nhat", "ky", "niem", "dam", "cuoi", "khai",
  "truong", "qua", "tang", "me", "bo", "ba", "ong", "anh", "chi", "em",
  "be", "nguoi", "yeu", "quan", "ao", "giay", "dep", "that", "khoang",
  "bang", "hoac", "nhu", "de", "boi", "vi", "thich", "xem", "dip",
  "cung", "gap", "giao", "ship"
]);

/* ==========================================================================
   2. Trạng thái và các phần tử giao diện
   ========================================================================== */

let aiState = {
  text: "",
  overrides: aiDefaultOverrides(),
  searching: false,
  timerId: null
};

let aiDom = {};

function aiDefaultOverrides() {
  return { budgetSet: false, budgetMax: null, locationSet: false, location: null };
}

/* ==========================================================================
   3. Hàm chuẩn hóa và tiện ích
   ========================================================================== */

// Chuẩn hóa để so khớp: bỏ dấu, bỏ dấu câu, gộp khoảng trắng.
// "Bình gốm, vân lá" -> "binh gom van la"
function aiNormalize(text) {
  return normalizeText(String(text || ""))
    .replace(/[.,!?;:'"()[\]{}\/\\\-–—+*%₫]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Giữ dấu chấm/phẩy để đọc số tiền (300.000đ, 1,5 triệu...).
function aiPlain(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/\s+/g, " ")
    .trim();
}

// So khớp theo "từ trọn vẹn" để "am" không khớp nhầm vào "lam".
function aiContainsPhrase(text, phrase) {
  if (!phrase) {
    return false;
  }
  return (" " + text + " ").indexOf(" " + phrase + " ") !== -1;
}

function aiContainsAny(text, phrases) {
  return phrases.some(function (phrase) {
    return aiContainsPhrase(text, phrase);
  });
}

// Xóa một cụm từ đã được dùng làm tiêu chí khỏi phần còn lại,
// để không biến nó thành "từ khóa tự do" lần nữa.
function aiRemovePhrase(text, phrase) {
  if (!phrase) {
    return text;
  }
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text
    .replace(new RegExp("(^|\\s)" + escaped + "(?=\\s|$)", "g"), " ")
    .replace(/\s+/g, " ")
    .trim();
}

function aiParseNumber(raw) {
  const value = String(raw || "").trim();
  if (!value) {
    return 0;
  }

  // 300.000 / 300,000 -> số có dấu phân cách hàng nghìn
  if (/^\d{1,3}([.,]\d{3})+$/.test(value)) {
    return Number(value.replace(/[.,]/g, ""));
  }

  const normalized = value.replace(",", ".");
  const number = Number(normalized);
  return isFinite(number) ? number : 0;
}

function aiMoneyValue(raw, unit) {
  const value = aiParseNumber(raw);
  if (!value) {
    return 0;
  }

  const normalizedUnit = String(unit || "").toLowerCase();
  if (normalizedUnit === "trieu" || normalizedUnit === "tr") {
    return Math.round(value * 1000000);
  }
  if (normalizedUnit === "k" || normalizedUnit === "nghin" || normalizedUnit === "ngan") {
    return Math.round(value * 1000);
  }
  if (normalizedUnit === "dong" || normalizedUnit === "d") {
    return Math.round(value);
  }

  // Không ghi đơn vị: con số nhỏ như "300" thường là 300 nghìn.
  return value < 1000 ? Math.round(value * 1000) : Math.round(value);
}

/* ==========================================================================
   4. Phân tích câu người dùng
   ========================================================================== */

function aiExtractBudget(rawText) {
  const text = aiPlain(rawText);

  // Khoảng giá: "200k - 300k", "từ 200 nghìn đến 300 nghìn"...
  const range = text.match(/(\d[\d.,]*)\s*(trieu|tr|k|nghin|ngan)?\s*(?:-|–|—|den|toi)\s*(\d[\d.,]*)\s*(trieu|tr|k|nghin|ngan|dong|d)\b/i);
  if (range) {
    const unit = range[4] || range[2] || "";
    const first = aiMoneyValue(range[1], range[2] || unit);
    const second = aiMoneyValue(range[3], unit);
    return Math.max(first, second);
  }

  // Số tiền có đơn vị: "300k", "1 triệu", "300.000đ"...
  const withUnit = text.match(/(\d[\d.,]*)\s*(trieu|tr|k|nghin|ngan|dong|d)\b/i);
  if (withUnit) {
    return aiMoneyValue(withUnit[1], withUnit[2]);
  }

  // Số tiền đứng sau từ chỉ ngân sách: "dưới 300", "ngân sách 300"...
  const withKeyword = text.match(/(?:ngan sach|gia|duoi|toi da|khong qua|nho hon|khoang|tam)\s*(?:la|khoang|tam|tu)?\s*(\d[\d.,]*)/i);
  if (withKeyword) {
    return aiMoneyValue(withKeyword[1], "");
  }

  return null;
}

function aiExtractLeadDays(rawText) {
  const text = aiPlain(rawText);

  const withNumber = text.match(/(\d+)\s*(ngay|tuan)/i);
  if (withNumber) {
    const amount = Number(withNumber[1]);
    if (!amount) {
      return null;
    }
    return withNumber[2].toLowerCase() === "tuan" ? amount * 7 : amount;
  }

  // "cần gấp", "giao nhanh" — hiểu là ưu tiên nhóm hoàn thành 1–3 ngày.
  // Kiểm tra "gấp" trên chữ có dấu để không nhầm với "gặp" (gặp nghệ nhân).
  const raw = String(rawText || "").toLowerCase();
  const hasAccentedGap = /\bgấp\b/.test(raw);
  const hasUrgentPhrase = /\b(can|giao|lam|dat)\s+gap\b/.test(text) ||
    /\b(giao|lam|can)\s+nhanh\b/.test(text) ||
    /\bsom nhat\b/.test(text);

  if ((hasAccentedGap || hasUrgentPhrase) && !/\d/.test(text)) {
    return 3;
  }

  return null;
}

function aiFindMentionedArtisanIds(text, consumedPhrases) {
  const ids = [];

  CRAFTLINK_ARTISANS.forEach(function (artisan) {
    const names = [artisan.name, artisan.shopName]
      .concat(artisan.aliases || [])
      .filter(Boolean);

    const hitName = names.find(function (name) {
      const phrase = aiNormalize(name);
      if (!aiContainsPhrase(text, phrase)) {
        return false;
      }
      // "gốm mộc mạc" chứa "gốm mộc" nhưng không phải tên nghệ nhân Gốm Mộc.
      if (phrase === "gom moc" && aiContainsPhrase(text, "moc mac")) {
        return false;
      }
      return true;
    });

    if (hitName) {
      ids.push(artisan.id);
      consumedPhrases.push(aiNormalize(hitName));
    }
  });

  return ids;
}

function aiExtractKeywords(text, consumedPhrases) {
  let remaining = text;

  consumedPhrases.forEach(function (phrase) {
    remaining = aiRemovePhrase(remaining, phrase);
  });

  // Bỏ các con số (đã dùng cho ngân sách/thời gian) khỏi phần từ khóa.
  remaining = remaining.replace(/\d[\d.,]*/g, " ");
  remaining = remaining.replace(/\s+/g, " ").trim();

  if (!remaining) {
    return [];
  }

  const seen = {};
  return remaining.split(" ").filter(function (token) {
    if (token.length < 2) {
      return false;
    }
    if (AI_STOP_WORDS.has(token)) {
      return false;
    }
    if (seen[token]) {
      return false;
    }
    seen[token] = true;
    return true;
  });
}

function aiAnalyzeRequest(rawText) {
  const text = aiNormalize(rawText);
  const consumed = [];

  const criteria = {
    intent: "product",
    types: [],
    materials: [],
    styles: [],
    category: null,
    categorySoft: false,
    budgetMax: null,
    leadMaxDays: null,
    location: null,
    occasion: null,
    customOrder: false,
    artisanIds: [],
    keywords: [],
    hasCriteria: false
  };

  // 1. Tên nghệ nhân được nêu đích danh
  criteria.artisanIds = aiFindMentionedArtisanIds(text, consumed);

  // 2. Loại sản phẩm
  AI_TYPE_OPTIONS.forEach(function (type) {
    const hit = type.patterns.find(function (pattern) {
      return aiContainsPhrase(text, pattern);
    });
    if (hit) {
      criteria.types.push(type);
      consumed.push(hit);
    }
  });

  // 3. Chất liệu
  AI_MATERIAL_OPTIONS.forEach(function (material) {
    const hit = material.patterns.find(function (pattern) {
      return aiContainsPhrase(text, pattern);
    });
    if (hit) {
      criteria.materials.push(material);
      consumed.push(hit);
    }
  });

  // 4. Phong cách
  AI_STYLE_OPTIONS.forEach(function (style) {
    const hit = style.patterns.find(function (pattern) {
      return aiContainsPhrase(text, pattern);
    });
    if (hit) {
      criteria.styles.push(style.id);
      consumed.push(hit);
    }
  });

  // 5. Danh mục (mỗi câu chỉ nhận một danh mục, theo thứ tự ưu tiên)
  const categoryIds = Object.keys(AI_CATEGORY_PATTERNS);
  for (let i = 0; i < categoryIds.length; i++) {
    const categoryId = categoryIds[i];
    const hit = AI_CATEGORY_PATTERNS[categoryId].find(function (pattern) {
      return aiContainsPhrase(text, pattern);
    });
    if (hit) {
      criteria.category = categoryId;
      // "Quà tặng" chỉ là ưu tiên mềm vì dữ liệu mẫu chỉ có một sản phẩm
      // thuộc nhóm này và mức giá của nó khá cao.
      criteria.categorySoft = categoryId === "qua-tang";
      consumed.push(hit);
      break;
    }
  }

  // 6. Ngân sách và thời gian hoàn thành
  criteria.budgetMax = aiExtractBudget(rawText);
  criteria.leadMaxDays = aiExtractLeadDays(rawText);

  // 7. Địa điểm
  criteria.location = AI_LOCATION_OPTIONS.find(function (location) {
    return location.patterns.some(function (pattern) {
      return aiContainsPhrase(text, pattern);
    });
  }) || null;

  if (criteria.location) {
    const hit = criteria.location.patterns.find(function (pattern) {
      return aiContainsPhrase(text, pattern);
    });
    if (hit) {
      consumed.push(hit);
    }
  }

  // 8. Dịp tặng
  const occasion = AI_OCCASION_OPTIONS.find(function (item) {
    return item.patterns.some(function (pattern) {
      return aiContainsPhrase(text, pattern);
    });
  });
  if (occasion) {
    criteria.occasion = occasion.label;
    const hit = occasion.patterns.find(function (pattern) {
      return aiContainsPhrase(text, pattern);
    });
    if (hit) {
      consumed.push(hit);
    }
  }

  // 9. Đặt làm / tùy biến
  const customHit = AI_CUSTOM_PATTERNS.find(function (pattern) {
    return aiContainsPhrase(text, pattern);
  });
  if (customHit) {
    criteria.customOrder = true;
    consumed.push(customHit);
  }

  // 10. Từ khóa còn lại (ví dụ "men", "lá", "nâu", "linh")
  criteria.keywords = aiExtractKeywords(text, consumed);

  // 11. Ý định và cờ tổng hợp
  criteria.intent = aiDetectIntent(criteria, text);
  criteria.hasCriteria = aiCountCriteria(criteria) > 0;

  return criteria;
}

function aiDetectIntent(criteria, text) {
  const hasArtisanWord = aiContainsAny(text, AI_ARTISAN_INTENT_WORDS);
  const hasProductWord = aiContainsAny(text, AI_PRODUCT_INTENT_WORDS);
  const hasArtisanSignal = hasArtisanWord || criteria.artisanIds.length > 0;
  const hasProductSignal = hasProductWord || criteria.types.length > 0;

  if (hasArtisanSignal && hasProductSignal) {
    return "both";
  }
  if (hasArtisanSignal) {
    return "artisan";
  }
  if (criteria.customOrder && hasProductSignal) {
    return "both";
  }
  if (criteria.customOrder) {
    return "artisan";
  }

  // Câu chỉ có địa điểm (ví dụ "Hà Nội") thường là muốn tìm nghệ nhân.
  const onlyLocation = criteria.location &&
    !hasProductSignal &&
    criteria.materials.length === 0 &&
    criteria.styles.length === 0 &&
    !criteria.category &&
    criteria.budgetMax === null &&
    criteria.leadMaxDays === null &&
    criteria.keywords.length === 0 &&
    !criteria.occasion;

  if (onlyLocation) {
    return "artisan";
  }

  return "product";
}

function aiApplyOverrides(criteria) {
  if (aiState.overrides.budgetSet) {
    criteria.budgetMax = aiState.overrides.budgetMax;
  }
  if (aiState.overrides.locationSet) {
    criteria.location = aiState.overrides.location;
  }
  criteria.hasCriteria = aiCountCriteria(criteria) > 0;
}

function aiCountCriteria(criteria) {
  let count = 0;
  if (criteria.types.length > 0) count++;
  if (criteria.materials.length > 0) count++;
  if (criteria.styles.length > 0) count++;
  if (criteria.category) count++;
  if (criteria.budgetMax !== null) count++;
  if (criteria.leadMaxDays !== null) count++;
  if (criteria.location) count++;
  if (criteria.occasion) count++;
  if (criteria.customOrder) count++;
  if (criteria.artisanIds.length > 0) count++;
  if (criteria.keywords.length > 0) count++;
  return count;
}

// Tiêu chí có thể đối chiếu với dữ liệu sản phẩm (không tính dịp tặng,
// địa điểm hay yêu cầu đặt làm vì đây không phải thuộc tính sản phẩm).
function aiHasProductContentCriteria(criteria) {
  return criteria.types.length > 0 ||
    criteria.materials.length > 0 ||
    criteria.styles.length > 0 ||
    Boolean(criteria.category) ||
    criteria.budgetMax !== null ||
    criteria.leadMaxDays !== null ||
    criteria.keywords.length > 0;
}

function aiHasProductCriteria(criteria) {
  return aiHasProductContentCriteria(criteria) || criteria.artisanIds.length > 0;
}

/* ==========================================================================
   5. Đối chiếu sản phẩm
   ========================================================================== */

function aiFindArtisanByName(name) {
  return CRAFTLINK_ARTISANS.find(function (artisan) {
    return artisan.name === name;
  }) || null;
}

function aiProductHasType(product, type) {
  const name = aiNormalize(product.name);
  return type.productWords.some(function (word) {
    return aiContainsPhrase(name, word);
  });
}

function aiProductHasMaterial(product, material) {
  const text = aiNormalize(product.name + " " + product.artisan);

  if (material.label === "Gốm") {
    return aiContainsPhrase(text, "gom") || aiContainsPhrase(text, "ceramic");
  }
  if (material.label === "Gỗ") {
    return aiContainsPhrase(text, "go") || aiContainsPhrase(text, "wood");
  }
  if (material.label === "Thêu") {
    return aiContainsPhrase(text, "theu");
  }
  return false;
}

function aiProductKeywordHits(product, criteria) {
  // Giống tìm kiếm hiện có của trang: so với cả tên sản phẩm và nghệ nhân.
  const text = aiNormalize(product.name + " " + product.artisan);
  return criteria.keywords.filter(function (keyword) {
    return aiContainsPhrase(text, keyword);
  });
}

function aiProductPasses(product, criteria) {
  if (criteria.artisanIds.length > 0) {
    const artisan = aiFindArtisanByName(product.artisan);
    if (!artisan || criteria.artisanIds.indexOf(artisan.id) === -1) {
      return false;
    }
  }

  if (criteria.budgetMax !== null && product.price > criteria.budgetMax) {
    return false;
  }

  if (criteria.leadMaxDays !== null &&
      AI_LEAD_MAX_DAYS[product.leadTime] > criteria.leadMaxDays) {
    return false;
  }

  // Danh mục "Quà tặng" chỉ là ưu tiên mềm, không loại sản phẩm khác.
  if (criteria.category && !criteria.categorySoft && product.category !== criteria.category) {
    return false;
  }

  if (criteria.types.length > 0 &&
      !criteria.types.some(function (type) { return aiProductHasType(product, type); })) {
    return false;
  }

  if (criteria.materials.length > 0 &&
      !criteria.materials.some(function (material) { return aiProductHasMaterial(product, material); })) {
    return false;
  }

  if (criteria.styles.length > 0 &&
      !product.styles.some(function (style) { return criteria.styles.indexOf(style) !== -1; })) {
    return false;
  }

  const hasStructured = criteria.types.length > 0 ||
    criteria.materials.length > 0 ||
    criteria.styles.length > 0 ||
    Boolean(criteria.category) ||
    criteria.budgetMax !== null ||
    criteria.leadMaxDays !== null ||
    criteria.artisanIds.length > 0;

  // Chỉ có từ khóa tự do: bắt buộc phải khớp ít nhất một từ.
  if (!hasStructured && criteria.keywords.length > 0) {
    return aiProductKeywordHits(product, criteria).length > 0;
  }

  return true;
}

function aiScoreProduct(product, criteria) {
  let points = 0;
  let max = 0;
  const reasons = [];

  if (criteria.artisanIds.length > 0) {
    max += 20;
    const artisan = aiFindArtisanByName(product.artisan);
    if (artisan && criteria.artisanIds.indexOf(artisan.id) !== -1) {
      points += 20;
      reasons.push("Của nghệ nhân " + artisan.name);
    }
  }

  if (criteria.types.length > 0) {
    max += 30;
    const hit = criteria.types.find(function (type) {
      return aiProductHasType(product, type);
    });
    if (hit) {
      points += 30;
      reasons.push("Đúng loại " + hit.label.toLowerCase());
    }
  }

  if (criteria.materials.length > 0) {
    max += 15;
    const hit = criteria.materials.find(function (material) {
      return aiProductHasMaterial(product, material);
    });
    if (hit) {
      points += 15;
      reasons.push("Chất liệu " + hit.label.toLowerCase());
    }
  }

  if (criteria.styles.length > 0) {
    max += 20;
    const hits = criteria.styles.filter(function (style) {
      return product.styles.indexOf(style) !== -1;
    });
    if (hits.length > 0) {
      points += 20;
      reasons.push("Phong cách " + hits.map(function (style) {
        return AI_STYLE_LABELS[style];
      }).join(", "));
    }
  }

  if (criteria.category) {
    max += 25;
    if (product.category === criteria.category) {
      points += 25;
      reasons.push("Thuộc nhóm " + AI_CATEGORY_LABELS[criteria.category]);
    }
  }

  if (criteria.budgetMax !== null) {
    max += 15;
    points += 15; // đã qua bộ lọc ngân sách
    reasons.push("Trong ngân sách " + formatPrice(criteria.budgetMax));
  }

  if (criteria.leadMaxDays !== null) {
    max += 10;
    points += 10; // đã qua bộ lọc thời gian
    reasons.push("Thời gian hoàn thành " + AI_LEAD_LABELS[product.leadTime]);
  }

  if (criteria.keywords.length > 0) {
    max += 25;
    const hits = aiProductKeywordHits(product, criteria);
    if (hits.length > 0) {
      points += 25;
      reasons.push("Khớp từ khóa “" + hits.slice(0, 3).join(", ") + "”");
    }
  }

  if (max === 0) {
    reasons.push("Đánh giá " + product.rating.toFixed(1) + "★ trong dữ liệu mẫu");
  }

  return {
    points: points,
    max: max,
    reasons: reasons,
    percent: max > 0 ? Math.round((points / max) * 100) : null
  };
}

function aiCompareProductEntries(first, second) {
  const firstPercent = first.score.percent === null ? -1 : first.score.percent;
  const secondPercent = second.score.percent === null ? -1 : second.score.percent;

  if (firstPercent !== secondPercent) {
    return secondPercent - firstPercent;
  }
  if (first.score.points !== second.score.points) {
    return second.score.points - first.score.points;
  }
  if (first.product.rating !== second.product.rating) {
    return second.product.rating - first.product.rating;
  }
  if (first.product.reviewCount !== second.product.reviewCount) {
    return second.product.reviewCount - first.product.reviewCount;
  }
  return first.product.price - second.product.price;
}

function aiSearchProducts(criteria) {
  const entries = [];

  CRAFTLINK_PRODUCTS.forEach(function (product) {
    if (!aiProductPasses(product, criteria)) {
      return;
    }

    const score = aiScoreProduct(product, criteria);

    // Có tiêu chí chấm điểm nhưng sản phẩm không đạt tiêu chí nào
    // (ví dụ chỉ chọn "Quà tặng" nhưng sản phẩm thuộc nhóm khác).
    if (score.max > 0 && score.points === 0) {
      return;
    }

    entries.push({ product: product, score: score });
  });

  entries.sort(aiCompareProductEntries);
  return entries;
}

/* ==========================================================================
   6. Đối chiếu nghệ nhân
   ========================================================================== */

function aiArtisanProducts(artisan) {
  return CRAFTLINK_PRODUCTS.filter(function (product) {
    return artisan.productIds.indexOf(product.id) !== -1;
  });
}

function aiArtisanHaystack(artisan) {
  const productNames = aiArtisanProducts(artisan).map(function (product) {
    return product.name;
  });

  return aiNormalize([
    artisan.name,
    artisan.shopName,
    (artisan.aliases || []).join(" "),
    artisan.specialties.join(" "),
    artisan.tags.join(" "),
    artisan.description,
    productNames.join(" ")
  ].filter(Boolean).join(" "));
}

function aiArtisanHasMaterial(artisan, material) {
  const text = aiArtisanHaystack(artisan);

  if (material.label === "Gốm") {
    return aiContainsPhrase(text, "gom") || aiContainsPhrase(text, "ceramic");
  }
  if (material.label === "Gỗ") {
    return aiContainsPhrase(text, "go") || aiContainsPhrase(text, "wood");
  }
  if (material.label === "Thêu") {
    return aiContainsPhrase(text, "theu");
  }
  return false;
}

function aiArtisanKeywordHits(artisan, criteria) {
  const text = aiArtisanHaystack(artisan);
  return criteria.keywords.filter(function (keyword) {
    return aiContainsPhrase(text, keyword);
  });
}

function aiLocationKey(value) {
  return aiNormalize(value)
    .replace(/\b(tp|thanh pho|city)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function aiArtisanLocationMatches(artisan, location) {
  if (!artisan.location) {
    return false;
  }
  return aiLocationKey(artisan.location) === aiLocationKey(location.label);
}

function aiArtisanPasses(artisan, criteria) {
  if (criteria.artisanIds.length > 0 && criteria.artisanIds.indexOf(artisan.id) === -1) {
    return false;
  }

  const products = aiArtisanProducts(artisan);

  if (criteria.materials.length > 0 &&
      !criteria.materials.some(function (material) { return aiArtisanHasMaterial(artisan, material); })) {
    return false;
  }

  if (criteria.types.length > 0 &&
      !criteria.types.some(function (type) {
        return products.some(function (product) { return aiProductHasType(product, type); });
      })) {
    return false;
  }

  if (criteria.styles.length > 0) {
    const tagHit = artisan.tags.some(function (tag) {
      return criteria.styles.some(function (style) {
        return AI_STYLE_LABELS[style] === tag;
      });
    });
    const productHit = products.some(function (product) {
      return product.styles.some(function (style) {
        return criteria.styles.indexOf(style) !== -1;
      });
    });
    if (!tagHit && !productHit) {
      return false;
    }
  }

  if (criteria.category && !criteria.categorySoft) {
    if (!products.some(function (product) { return product.category === criteria.category; })) {
      return false;
    }
  }

  // Chỉ hiện nghệ nhân có ghi nhận nhận đặt làm khi người dùng yêu cầu rõ.
  // Không suy đoán nghệ nhân "có thể" nhận đơn khi dữ liệu đang để trống.
  if (criteria.customOrder && !artisan.customOrderNote) {
    return false;
  }

  if (criteria.budgetMax !== null &&
      !products.some(function (product) { return product.price <= criteria.budgetMax; })) {
    return false;
  }

  if (criteria.leadMaxDays !== null &&
      !products.some(function (product) {
        return AI_LEAD_MAX_DAYS[product.leadTime] <= criteria.leadMaxDays;
      })) {
    return false;
  }

  const hasStructured = criteria.materials.length > 0 ||
    criteria.types.length > 0 ||
    criteria.styles.length > 0 ||
    Boolean(criteria.category) ||
    criteria.budgetMax !== null ||
    criteria.leadMaxDays !== null ||
    criteria.artisanIds.length > 0 ||
    criteria.location !== null ||
    criteria.customOrder;

  // Chỉ có từ khóa tự do: bắt buộc phải khớp ít nhất một từ.
  if (!hasStructured && criteria.keywords.length > 0) {
    return aiArtisanKeywordHits(artisan, criteria).length > 0;
  }

  return true;
}

function aiScoreArtisan(artisan, criteria, matchedProductIds) {
  const products = aiArtisanProducts(artisan);
  let points = 0;
  let max = 0;
  const reasons = [];

  if (criteria.artisanIds.length > 0) {
    max += 40;
    if (criteria.artisanIds.indexOf(artisan.id) !== -1) {
      points += 40;
      reasons.push("Đúng nghệ nhân bạn nêu");
    }
  }

  if (criteria.materials.length > 0) {
    max += 35;
    const hit = criteria.materials.find(function (material) {
      return aiArtisanHasMaterial(artisan, material);
    });
    if (hit) {
      points += 35;
      reasons.push("Chuyên môn " + hit.label.toLowerCase());
    }
  }

  if (criteria.styles.length > 0) {
    max += 15;
    const tagHit = artisan.tags.some(function (tag) {
      return criteria.styles.some(function (style) {
        return AI_STYLE_LABELS[style] === tag;
      });
    });
    const productHit = products.some(function (product) {
      return product.styles.some(function (style) {
        return criteria.styles.indexOf(style) !== -1;
      });
    });
    if (tagHit || productHit) {
      points += 15;
      reasons.push("Phong cách " + criteria.styles.map(function (style) {
        return AI_STYLE_LABELS[style];
      }).join(", "));
    }
  }

  // Chỉ chấm điểm "có sản phẩm khớp" khi thật sự có tiêu chí sản phẩm.
  // Nghệ nhân chưa có sản phẩm mẫu không bị trừ điểm oan vì thiếu dữ liệu.
  if (products.length > 0 && aiHasProductContentCriteria(criteria)) {
    max += 25;
    const hasMatchedProduct = products.some(function (product) {
      return matchedProductIds.indexOf(product.id) !== -1;
    });
    if (hasMatchedProduct) {
      points += 25;
      reasons.push("Có sản phẩm mẫu khớp yêu cầu");
    }
  }

  if (criteria.location) {
    max += 20;
    if (aiArtisanLocationMatches(artisan, criteria.location)) {
      points += 20;
      reasons.push("Địa điểm " + criteria.location.label);
    }
  }

  if (criteria.customOrder) {
    max += 10;
    if (artisan.customOrderNote) {
      points += 10;
      reasons.push("Có ghi nhận nhận đặt làm");
    }
  }

  if (criteria.keywords.length > 0) {
    max += 25;
    const hits = aiArtisanKeywordHits(artisan, criteria);
    if (hits.length > 0) {
      points += 25;
      reasons.push("Khớp từ khóa “" + hits.slice(0, 3).join(", ") + "”");
    }
  }

  if (max === 0) {
    reasons.push(products.length > 0
      ? "Có " + products.length + " sản phẩm mẫu trong dữ liệu"
      : "Chưa có sản phẩm mẫu trong dữ liệu");
    if (artisan.location) {
      reasons.push("Địa điểm " + artisan.location);
    }
  }

  return {
    points: points,
    max: max,
    reasons: reasons,
    percent: max > 0 ? Math.round((points / max) * 100) : null
  };
}

function aiCompareArtisanEntries(first, second) {
  const firstPercent = first.score.percent === null ? -1 : first.score.percent;
  const secondPercent = second.score.percent === null ? -1 : second.score.percent;

  if (firstPercent !== secondPercent) {
    return secondPercent - firstPercent;
  }
  if (first.score.points !== second.score.points) {
    return second.score.points - first.score.points;
  }

  const firstProducts = aiArtisanProducts(first.artisan).length;
  const secondProducts = aiArtisanProducts(second.artisan).length;
  if (firstProducts !== secondProducts) {
    return secondProducts - firstProducts;
  }

  const firstHasLocation = first.artisan.location ? 1 : 0;
  const secondHasLocation = second.artisan.location ? 1 : 0;
  if (firstHasLocation !== secondHasLocation) {
    return secondHasLocation - firstHasLocation;
  }

  return first.artisan.name.localeCompare(second.artisan.name, "vi");
}

function aiSearchArtisans(criteria, matchedProducts) {
  const matchedProductIds = matchedProducts.map(function (entry) {
    return entry.product.id;
  });

  const verified = [];
  const unverified = [];

  CRAFTLINK_ARTISANS.forEach(function (artisan) {
    if (!aiArtisanPasses(artisan, criteria)) {
      return;
    }

    const score = aiScoreArtisan(artisan, criteria, matchedProductIds);

    // Có tiêu chí nhưng không đạt tiêu chí nào → không đưa vào gợi ý.
    if (criteria.hasCriteria && score.points === 0) {
      return;
    }

    const entry = { artisan: artisan, score: score };

    if (criteria.location) {
      if (aiArtisanLocationMatches(artisan, criteria.location)) {
        verified.push(entry);
      } else if (!artisan.location) {
        // Chưa có dữ liệu địa điểm: không khẳng định là ở địa điểm đã chọn.
        unverified.push(entry);
      }
      // Có địa điểm khác với yêu cầu → loại khỏi kết quả.
    } else {
      verified.push(entry);
    }
  });

  verified.sort(aiCompareArtisanEntries);
  unverified.sort(aiCompareArtisanEntries);

  return { verified: verified, unverified: unverified };
}

function aiSearchAll(rawText) {
  const criteria = aiAnalyzeRequest(rawText);
  aiApplyOverrides(criteria);

  const products = aiSearchProducts(criteria);
  const artisans = aiSearchArtisans(criteria, products);

  return {
    criteria: criteria,
    products: products,
    artisans: artisans.verified,
    unverified: artisans.unverified
  };
}

/* ==========================================================================
   7. Tạo nội dung câu trả lời
   ========================================================================== */

function aiBuildCriteriaLabels(criteria) {
  const labels = [];

  if (criteria.intent === "artisan") {
    labels.push("Bạn đang tìm nghệ nhân");
  } else if (criteria.intent === "both") {
    labels.push("Bạn cần cả sản phẩm và nghệ nhân");
  } else {
    labels.push("Bạn đang tìm sản phẩm");
  }

  if (criteria.artisanIds.length > 0) {
    const names = criteria.artisanIds.map(function (id) {
      const artisan = CRAFTLINK_ARTISANS.find(function (item) { return item.id === id; });
      return artisan ? artisan.name : id;
    });
    labels.push("Nghệ nhân: " + names.join(", "));
  }

  if (criteria.types.length > 0) {
    labels.push("Loại: " + criteria.types.map(function (type) { return type.label; }).join(", "));
  }

  if (criteria.materials.length > 0) {
    labels.push("Chất liệu: " + criteria.materials.map(function (material) { return material.label; }).join(", "));
  }

  if (criteria.styles.length > 0) {
    labels.push("Phong cách: " + criteria.styles.map(function (style) {
      return AI_STYLE_LABELS[style];
    }).join(", "));
  }

  if (criteria.category) {
    labels.push("Nhóm: " + AI_CATEGORY_LABELS[criteria.category] + (criteria.categorySoft ? " (chỉ ưu tiên)" : ""));
  }

  if (criteria.budgetMax !== null) {
    labels.push("Ngân sách: tối đa " + formatPrice(criteria.budgetMax));
  }

  if (criteria.leadMaxDays !== null) {
    labels.push("Hoàn thành: tối đa " + criteria.leadMaxDays + " ngày");
  }

  if (criteria.location) {
    labels.push("Địa điểm: " + criteria.location.label);
  }

  if (criteria.occasion) {
    labels.push("Dịp: " + criteria.occasion + " (tham khảo)");
  }

  if (criteria.customOrder) {
    labels.push("Cần tư vấn đặt làm");
  }

  if (criteria.keywords.length > 0) {
    labels.push("Từ khóa: " + criteria.keywords.join(", "));
  }

  if (aiCountCriteria(criteria) === 0) {
    labels.push("Chưa có tiêu chí cụ thể");
  }

  return labels;
}

function aiBuildAnswer(result) {
  const criteria = result.criteria;
  const sentences = [];
  const criteriaCount = aiCountCriteria(criteria);
  const totalArtisans = result.artisans.length;
  const totalResults = result.products.length + totalArtisans + result.unverified.length;

  if (criteria.intent === "artisan") {
    sentences.push("Tôi hiểu bạn đang tìm nghệ nhân phù hợp.");
  } else if (criteria.intent === "both") {
    sentences.push("Tôi hiểu bạn cần cả sản phẩm và nghệ nhân.");
  } else {
    sentences.push("Tôi hiểu bạn đang tìm sản phẩm thủ công.");
  }

  if (criteriaCount === 0) {
    sentences.push("Bạn chưa nêu tiêu chí cụ thể, nên tôi gợi ý những lựa chọn nổi bật trong dữ liệu mẫu.");
  } else {
    sentences.push("Tôi đã đối chiếu " + criteriaCount + " tiêu chí với " +
      CRAFTLINK_PRODUCTS.length + " sản phẩm và " + CRAFTLINK_ARTISANS.length + " nghệ nhân mẫu.");
  }

  // Với ý định tìm nghệ nhân, chỉ nhắc sản phẩm khi người dùng thật sự nêu
  // tiêu chí về sản phẩm; tránh báo "8 sản phẩm phù hợp" không liên quan.
  const mentionProducts = criteria.intent !== "artisan" ||
    aiHasProductContentCriteria(criteria);

  if (mentionProducts) {
    if (result.products.length > 0) {
      sentences.push("Có " + result.products.length + " sản phẩm phù hợp.");
    } else {
      sentences.push("Chưa có sản phẩm nào khớp hoàn toàn.");
    }
  }

  const mentionArtisans = criteria.intent !== "product" ||
    totalArtisans + result.unverified.length > 0;

  if (mentionArtisans) {
    if (totalArtisans > 0) {
      sentences.push("Có " + totalArtisans + " nghệ nhân phù hợp.");
    } else if (result.unverified.length === 0) {
      sentences.push("Chưa có nghệ nhân phù hợp.");
    }
  }

  if (result.unverified.length > 0) {
    sentences.push(result.unverified.length + " nghệ nhân có chuyên môn phù hợp nhưng chưa có dữ liệu địa điểm, được liệt kê riêng.");
  }

  if (criteria.occasion) {
    sentences.push("Dữ liệu mẫu chưa có thông tin về dịp “" + criteria.occasion + "”, nên tiêu chí này chỉ để tham khảo.");
  }

  if (criteria.customOrder) {
    const confirmed = CRAFTLINK_ARTISANS.filter(function (artisan) {
      return Boolean(artisan.customOrderNote);
    }).map(function (artisan) {
      return artisan.name;
    });

    if (confirmed.length > 0) {
      sentences.push("Dữ liệu mẫu chỉ ghi nhận " + confirmed.join(", ") + " có thông tin nhận đặt làm theo yêu cầu.");
    }
  }

  if (criteria.location && totalArtisans === 0) {
    sentences.push("Chưa có nghệ nhân nào có dữ liệu xác nhận địa điểm tại " + criteria.location.label + ".");
  }

  if (criteria.budgetMax !== null && result.products.length === 0) {
    sentences.push("Không có sản phẩm mẫu nào trong ngân sách tối đa " + formatPrice(criteria.budgetMax) + ".");
  }

  if (criteria.category === "qua-tang" && criteria.budgetMax !== null && result.products.length === 0) {
    const giftProducts = CRAFTLINK_PRODUCTS.filter(function (product) {
      return product.category === "qua-tang";
    });
    if (giftProducts.length > 0) {
      sentences.push("Nhóm Quà tặng trong dữ liệu mẫu chỉ có " + giftProducts.map(function (product) {
        return product.name + " (" + formatPrice(product.price) + ")";
      }).join(", ") + ".");
    }
  }

  if (criteria.materials.some(function (material) { return material.label === "Gỗ"; }) &&
      result.products.length === 0) {
    sentences.push("Bộ dữ liệu mẫu hiện chỉ có sản phẩm gốm, chưa có sản phẩm gỗ.");
  }

  if (criteria.keywords.length > 0 && totalResults === 0) {
    sentences.push("Tôi chưa tìm thấy từ khóa “" + criteria.keywords.join(", ") + "” trong dữ liệu mẫu.");
  }

  if (totalResults === 0 && criteriaCount > 0) {
    sentences.push("Bạn thử bỏ bớt một tiêu chí hoặc chọn ngân sách/địa điểm khác nhé.");
  }

  return sentences.join(" ");
}

function aiProductEmptyText(criteria) {
  const hasTypeData = criteria.types.length > 0 && CRAFTLINK_PRODUCTS.some(function (product) {
    return criteria.types.some(function (type) { return aiProductHasType(product, type); });
  });

  if (criteria.types.length > 0 && !hasTypeData) {
    return {
      title: "Chưa có sản phẩm thuộc loại này",
      text: "Dữ liệu mẫu hiện có 8 sản phẩm gốm, chưa có " + criteria.types.map(function (type) {
        return type.label.toLowerCase();
      }).join(", ") + "."
    };
  }

  const hasMaterialData = criteria.materials.length > 0 && CRAFTLINK_PRODUCTS.some(function (product) {
    return criteria.materials.some(function (material) { return aiProductHasMaterial(product, material); });
  });

  if (criteria.materials.length > 0 && !hasMaterialData) {
    return {
      title: "Chưa có sản phẩm bằng chất liệu này",
      text: "Bộ dữ liệu mẫu hiện chỉ có sản phẩm gốm."
    };
  }

  if (criteria.budgetMax !== null) {
    return {
      title: "Không có sản phẩm trong ngân sách",
      text: "Dữ liệu mẫu chưa có sản phẩm nào có giá tối đa " + formatPrice(criteria.budgetMax) + ". Hãy thử nâng ngân sách hoặc bỏ bớt tiêu chí."
    };
  }

  return {
    title: "Chưa có sản phẩm phù hợp",
    text: "Hãy thử bỏ bớt một tiêu chí hoặc chọn ngân sách khác."
  };
}

function aiArtisanEmptyText(criteria) {
  if (criteria.location) {
    return {
      title: "Chưa có nghệ nhân xác nhận địa điểm",
      text: "Dữ liệu mẫu chưa có nghệ nhân nào có địa điểm tại " + criteria.location.label + ". Các nghệ nhân thiếu dữ liệu địa điểm sẽ được liệt kê riêng bên dưới (nếu có)."
    };
  }

  return {
    title: "Chưa có nghệ nhân phù hợp",
    text: "Hãy thử bỏ bớt tiêu chí hoặc mô tả rộng hơn."
  };
}

function aiGlobalEmptyText(criteria) {
  if (criteria.budgetMax !== null) {
    return {
      title: "Không có kết quả trong ngân sách",
      text: "Không có sản phẩm hoặc nghệ nhân phù hợp với ngân sách tối đa " + formatPrice(criteria.budgetMax) + ". Hãy thử nâng ngân sách hoặc bỏ bớt tiêu chí."
    };
  }

  if (criteria.location) {
    return {
      title: "Không có nghệ nhân tại địa điểm này",
      text: "Dữ liệu mẫu chưa có nghệ nhân có địa điểm tại " + criteria.location.label + ". Bạn thử chọn địa điểm khác hoặc xem tất cả."
    };
  }

  if (criteria.keywords.length > 0) {
    return {
      title: "Chưa tìm thấy kết quả phù hợp",
      text: "Tôi chưa tìm thấy từ khóa “" + criteria.keywords.join(", ") + "” trong " +
        CRAFTLINK_PRODUCTS.length + " sản phẩm và " + CRAFTLINK_ARTISANS.length +
        " nghệ nhân mẫu. Hãy thử mô tả theo loại sản phẩm, chất liệu, phong cách hoặc ngân sách."
    };
  }

  return {
    title: "Chưa nhận ra tiêu chí cụ thể",
    text: "Hãy thử mô tả loại sản phẩm, ngân sách, phong cách, chất liệu hoặc địa điểm. Ví dụ: “Bình gốm trang trí dưới 300.000đ”."
  };
}

/* ==========================================================================
   8. Hiển thị kết quả
   ========================================================================== */

function aiSetFact(element, value) {
  const text = value && String(value).trim() ? String(value).trim() : "Chưa có thông tin";
  element.textContent = text;

  if (text === "Chưa có thông tin") {
    element.classList.add("ai-unknown");
  } else {
    element.classList.remove("ai-unknown");
  }
}

function aiSetEmpty(container, title, text) {
  container.querySelector(".empty-state-title").textContent = title;
  container.querySelector(".empty-state-text").textContent = text;
  container.hidden = false;
}

function aiFormatArtisanPrice(products) {
  if (products.length === 0) {
    return "Chưa có thông tin";
  }

  const prices = products.map(function (product) { return product.price; });
  const min = Math.min.apply(null, prices);
  const max = Math.max.apply(null, prices);

  if (min === max) {
    return formatPrice(min);
  }
  return formatPrice(min) + " – " + formatPrice(max);
}

function aiApplyMatchLine(card, score) {
  const badge = card.querySelector(".ai-match-badge");
  const matchText = card.querySelector(".ai-match-text");

  if (score.percent !== null) {
    badge.textContent = score.percent + "%";
    badge.classList.remove("ai-match-badge-neutral");
    matchText.textContent = "độ khớp theo tiêu chí";
    badge.title = "Điểm minh bạch: " + score.points + "/" + score.max +
      " điểm theo các tiêu chí có dữ liệu để đối chiếu, không phải xác suất của mô hình AI.";
  } else {
    badge.textContent = "Đề xuất";
    badge.classList.add("ai-match-badge-neutral");
    matchText.textContent = "nổi bật trong dữ liệu mẫu";
    badge.title = "Chưa có tiêu chí cụ thể để tính độ khớp.";
  }
}

function aiCreateProductCard(entry) {
  const fragment = aiDom.productTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".ai-product-card");
  const product = entry.product;

  const mediaLink = card.querySelector(".ai-product-media");
  const image = card.querySelector(".ai-product-image");
  const nameLink = card.querySelector(".ai-product-name");
  const detailLink = card.querySelector(".ai-detail-btn");

  const detailUrl = "product-detail.html?id=" + encodeURIComponent(product.id);
  mediaLink.href = detailUrl;
  mediaLink.setAttribute("aria-label", "Xem chi tiết " + product.name);
  nameLink.href = detailUrl;
  detailLink.href = detailUrl;
  image.src = product.image;
  image.alt = product.name;

  nameLink.textContent = product.name;
  detailLink.setAttribute("aria-label", "Xem chi tiết " + product.name);

  card.querySelector(".ai-product-artisan").textContent = product.artisan;
  card.querySelector(".product-price").textContent = formatPrice(product.price);
  card.querySelector(".ai-product-rating").textContent =
    product.rating.toFixed(1) + " (" + product.reviewCount + ")";

  const note = card.querySelector(".ai-product-note");
  if (product.note) {
    note.textContent = "Ghi chú: " + product.note;
    note.hidden = false;
  }

  aiApplyMatchLine(card, entry.score);

  card.querySelector(".ai-reason").textContent = entry.score.reasons.length > 0
    ? "Vì sao: " + entry.score.reasons.join(" • ")
    : "Vì sao: Được đánh giá cao trong dữ liệu mẫu.";

  return card;
}

function aiApplyAvatar(image, initial, name, src) {
  if (src) {
    image.src = src;
    image.alt = "Ảnh nghệ nhân " + name;
    image.hidden = false;
    initial.hidden = true;
    return;
  }

  image.removeAttribute("src");
  image.hidden = true;
  initial.textContent = name.charAt(0).toUpperCase();
  initial.hidden = false;
}

function aiCreateArtisanCard(entry) {
  const fragment = aiDom.artisanTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".ai-artisan-card");
  const artisan = entry.artisan;
  const products = aiArtisanProducts(artisan);

  aiApplyAvatar(
    card.querySelector(".ai-artisan-avatar"),
    card.querySelector(".ai-artisan-initial"),
    artisan.name,
    artisan.image
  );

  card.querySelector(".ai-artisan-name").textContent = artisan.name;

  const shop = card.querySelector(".ai-artisan-shop");
  if (artisan.shopName) {
    shop.textContent = "Cửa hàng: " + artisan.shopName;
    shop.hidden = false;
  }

  aiApplyMatchLine(card, entry.score);

  const tagList = card.querySelector(".ai-artisan-tags");
  const tags = artisan.tags.length > 0 ? artisan.tags : artisan.specialties;
  if (tags.length > 0) {
    tags.forEach(function (tag) {
      const item = document.createElement("li");
      item.className = "tag";
      item.textContent = tag;
      tagList.appendChild(item);
    });
  } else {
    tagList.hidden = true;
  }

  aiSetFact(card.querySelector(".ai-fact-specialty"), artisan.specialties.join(", "));
  aiSetFact(card.querySelector(".ai-fact-location"), artisan.location);
  aiSetFact(card.querySelector(".ai-fact-price"), aiFormatArtisanPrice(products));
  aiSetFact(card.querySelector(".ai-fact-custom"), artisan.customOrderNote);

  card.querySelector(".ai-artisan-reason").textContent = entry.score.reasons.length > 0
    ? "Vì sao phù hợp: " + entry.score.reasons.join(" • ")
    : "Vì sao phù hợp: Đề xuất nổi bật trong dữ liệu mẫu.";

  const demoNote = card.querySelector(".ai-demo-note");
  if (artisan.demoNote) {
    demoNote.textContent = "Lưu ý dữ liệu: " + artisan.demoNote;
    demoNote.hidden = false;
  }

  const button = card.querySelector(".ai-artisan-products-btn");
  button.setAttribute("data-artisan-id", artisan.id);

  if (products.length > 0) {
    button.disabled = false;
    button.textContent = "Xem sản phẩm của thợ";
    button.title = "Lọc " + products.length + " sản phẩm mẫu của " + artisan.name + " trong danh mục bên dưới";
  } else {
    button.disabled = true;
    button.textContent = "Chưa có sản phẩm mẫu";
    button.title = "Dữ liệu mẫu chưa có sản phẩm của nghệ nhân này.";
  }

  return card;
}

function aiCreateUnverifiedItem(entry) {
  const fragment = aiDom.unverifiedTemplate.content.cloneNode(true);
  const item = fragment.querySelector(".ai-unverified-item");
  const artisan = entry.artisan;
  const products = aiArtisanProducts(artisan);

  aiApplyAvatar(
    item.querySelector(".ai-unverified-avatar"),
    item.querySelector(".ai-unverified-initial"),
    artisan.name,
    artisan.image
  );

  item.querySelector(".ai-unverified-name").textContent = artisan.name;
  item.querySelector(".ai-unverified-meta").textContent =
    (artisan.specialties.length > 0 ? artisan.specialties.join(", ") : "Chưa có thông tin chuyên môn") +
    " • Địa điểm: Chưa có thông tin";

  item.querySelector(".ai-unverified-reason").textContent = entry.score.reasons.length > 0
    ? "Khớp: " + entry.score.reasons.join(" • ")
    : "Chưa đủ dữ liệu để đối chiếu thêm.";

  return item;
}

function aiRender(result) {
  const criteria = result.criteria;
  const products = result.products;
  const artisans = result.artisans;
  const unverified = result.unverified;
  const hasResults = products.length + artisans.length + unverified.length > 0;

  // ----- Câu trả lời tóm tắt -----
  aiDom.answer.hidden = false;
  aiDom.answerText.textContent = aiBuildAnswer(result);

  aiDom.criteriaList.textContent = "";
  aiBuildCriteriaLabels(criteria).forEach(function (label) {
    const item = document.createElement("li");
    item.className = "ai-criterion";
    item.textContent = label;
    aiDom.criteriaList.appendChild(item);
  });

  // ----- Gợi ý bổ sung ngân sách / địa điểm -----
  const askBudget = (criteria.intent === "product" || criteria.intent === "both") &&
    products.length > 0 &&
    criteria.budgetMax === null &&
    !aiState.overrides.budgetSet;

  const askLocation = (criteria.intent === "artisan" || criteria.intent === "both") &&
    artisans.length + unverified.length > 0 &&
    criteria.location === null &&
    !aiState.overrides.locationSet &&
    criteria.artisanIds.length === 0;

  aiDom.budgetFollowup.hidden = !askBudget;
  aiDom.locationFollowup.hidden = !askLocation;
  aiDom.followup.hidden = !(askBudget || askLocation);

  // ----- Quyết định hiển thị từng khối kết quả -----
  const showProductBlock = hasResults &&
    (products.length > 0 || criteria.intent !== "artisan") &&
    (criteria.intent !== "artisan" || aiHasProductCriteria(criteria));

  const showArtisanBlock = hasResults &&
    (artisans.length + unverified.length > 0 || criteria.intent !== "product");

  aiDom.results.hidden = false;
  aiDom.productBlock.hidden = !showProductBlock;
  aiDom.artisanBlock.hidden = !showArtisanBlock;

  // ----- Sản phẩm -----
  aiDom.productResults.textContent = "";
  aiDom.productEmpty.hidden = true;
  aiDom.productCount.hidden = true;

  if (showProductBlock) {
    if (products.length > 0) {
      products.slice(0, 3).forEach(function (entry) {
        aiDom.productResults.appendChild(aiCreateProductCard(entry));
      });
      aiDom.productCount.textContent = products.length + " sản phẩm" +
        (products.length > 3 ? " • hiển thị 3" : "");
      aiDom.productCount.hidden = false;
    } else {
      const content = aiProductEmptyText(criteria);
      aiSetEmpty(aiDom.productEmpty, content.title, content.text);
    }
  }

  // ----- Nghệ nhân -----
  aiDom.artisanResults.textContent = "";
  aiDom.unverifiedResults.textContent = "";
  aiDom.artisanEmpty.hidden = true;
  aiDom.artisanCount.hidden = true;
  aiDom.unverifiedBlock.hidden = true;

  if (showArtisanBlock) {
    if (artisans.length > 0) {
      artisans.slice(0, 3).forEach(function (entry) {
        aiDom.artisanResults.appendChild(aiCreateArtisanCard(entry));
      });
      aiDom.artisanCount.textContent = artisans.length + " nghệ nhân" +
        (artisans.length > 3 ? " • hiển thị 3" : "");
      aiDom.artisanCount.hidden = false;
    } else {
      const content = aiArtisanEmptyText(criteria);
      aiSetEmpty(aiDom.artisanEmpty, content.title, content.text);
    }

    if (unverified.length > 0) {
      unverified.slice(0, 3).forEach(function (entry) {
        aiDom.unverifiedResults.appendChild(aiCreateUnverifiedItem(entry));
      });
      aiDom.unverifiedBlock.hidden = false;
    }
  }

  // ----- Thông báo không có kết quả nào -----
  if (hasResults) {
    aiDom.empty.hidden = true;
  } else {
    const content = aiGlobalEmptyText(criteria);
    aiSetEmpty(aiDom.empty, content.title, content.text);
  }
}

/* ==========================================================================
   9. Trạng thái tải, lỗi và điều khiển tìm kiếm
   ========================================================================== */

function aiSetLoading(isLoading) {
  aiState.searching = isLoading;
  aiDom.status.hidden = !isLoading;
  aiDom.submitBtn.disabled = isLoading;

  if (aiDom.form) {
    aiDom.form.setAttribute("aria-busy", isLoading ? "true" : "false");
  }

  aiDom.chips.forEach(function (chip) {
    chip.disabled = isLoading;
  });
}

function aiShowError(message) {
  aiDom.error.textContent = message;
  aiDom.error.hidden = false;
}

function aiHideError() {
  aiDom.error.textContent = "";
  aiDom.error.hidden = true;
}

function aiClearOutput() {
  aiDom.answer.hidden = true;
  aiDom.followup.hidden = true;
  aiDom.results.hidden = true;
  aiDom.productBlock.hidden = true;
  aiDom.artisanBlock.hidden = true;
  aiDom.empty.hidden = true;

  aiDom.criteriaList.textContent = "";
  aiDom.productResults.textContent = "";
  aiDom.artisanResults.textContent = "";
  aiDom.unverifiedResults.textContent = "";
}

function aiRunSearch(rawText) {
  if (aiState.searching) {
    return;
  }

  const text = String(rawText || "").trim();

  if (text.length < 3) {
    aiShowError("Bạn hãy mô tả điều đang tìm (ít nhất 3 ký tự) trước khi bấm “Tư vấn ngay”.");
    aiDom.input.focus();
    return;
  }

  aiHideError();
  aiClearOutput();

  aiState.text = text;
  aiState.overrides = aiDefaultOverrides();
  aiSetLoading(true);

  // Độ trễ 350ms chỉ để trạng thái "đang phân tích" dễ nhìn.
  // Đây là xử lý cục bộ, KHÔNG phải lời gọi mạng hay mô hình AI thật.
  aiState.timerId = window.setTimeout(function () {
    aiState.timerId = null;

    try {
      const result = aiSearchAll(aiState.text);
      aiRender(result);
      aiSetLoading(false);
    } catch (error) {
      aiSetLoading(false);
      aiShowError("Đã xảy ra lỗi khi phân tích cục bộ. Vui lòng thử lại với câu mô tả khác.");
      console.error("CraftLink AI:", error);
    }
  }, 350);
}

function aiRerunSearch() {
  if (!aiState.text || aiState.searching) {
    return;
  }

  aiHideError();

  try {
    aiRender(aiSearchAll(aiState.text));
  } catch (error) {
    aiShowError("Đã xảy ra lỗi khi lọc lại kết quả. Vui lòng thử lại.");
    console.error("CraftLink AI:", error);
  }
}

function aiReset() {
  if (aiState.timerId) {
    window.clearTimeout(aiState.timerId);
    aiState.timerId = null;
  }

  aiSetLoading(false);
  aiHideError();
  aiClearOutput();

  aiState.text = "";
  aiState.overrides = aiDefaultOverrides();
  aiDom.input.value = "";
  aiDom.input.focus();
}

// Nút "Xem sản phẩm của thợ": dùng lại đúng cơ chế xóa bộ lọc + tìm kiếm
// sẵn có ở trang danh sách, không sửa logic của main.js.
function aiShowArtisanProducts(artisanId) {
  const artisan = CRAFTLINK_ARTISANS.find(function (item) {
    return item.id === artisanId;
  });

  if (!artisan) {
    return;
  }

  const products = aiArtisanProducts(artisan);
  if (products.length === 0) {
    return;
  }

  const resetButton = document.getElementById("reset-filters-btn");
  const searchInput = document.getElementById("search-input");
  const catalog = document.querySelector(".catalog");

  if (resetButton) {
    resetButton.click();
  }

  if (searchInput) {
    searchInput.value = artisan.name;
    searchInput.dispatchEvent(new Event("input", { bubbles: true }));
  }

  if (catalog && catalog.scrollIntoView) {
    catalog.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (typeof showToast === "function") {
    showToast("Đang lọc " + products.length + " sản phẩm mẫu của " + artisan.name + " ở danh mục bên dưới.");
  }
}

/* ==========================================================================
   10. Khởi động
   ========================================================================== */

function aiInit() {
  const section = document.getElementById("ai-advisor");

  if (!section) {
    return; // trang này không có khối AI
  }

  if (typeof CRAFTLINK_PRODUCTS === "undefined" || typeof CRAFTLINK_ARTISANS === "undefined") {
    return; // data.js chưa tải hoặc thiếu dữ liệu
  }

  aiDom = {
    section: section,
    form: document.getElementById("ai-form"),
    input: document.getElementById("ai-input"),
    suggestions: document.getElementById("ai-suggestions"),
    submitBtn: document.getElementById("ai-submit-btn"),
    resetBtn: document.getElementById("ai-reset-btn"),
    status: document.getElementById("ai-status"),
    error: document.getElementById("ai-error"),
    answer: document.getElementById("ai-answer"),
    answerText: document.getElementById("ai-answer-text"),
    criteriaList: document.getElementById("ai-criteria"),
    followup: document.getElementById("ai-followup"),
    budgetFollowup: document.getElementById("ai-budget-followup"),
    locationFollowup: document.getElementById("ai-location-followup"),
    results: document.getElementById("ai-results"),
    productBlock: document.getElementById("ai-product-block"),
    productCount: document.getElementById("ai-product-count"),
    productResults: document.getElementById("ai-product-results"),
    productEmpty: document.getElementById("ai-product-empty"),
    artisanBlock: document.getElementById("ai-artisan-block"),
    artisanCount: document.getElementById("ai-artisan-count"),
    artisanResults: document.getElementById("ai-artisan-results"),
    artisanEmpty: document.getElementById("ai-artisan-empty"),
    unverifiedBlock: document.getElementById("ai-unverified-block"),
    unverifiedResults: document.getElementById("ai-unverified-results"),
    empty: document.getElementById("ai-empty"),
    emptyReset: document.getElementById("ai-empty-reset"),
    productTemplate: document.getElementById("ai-product-template"),
    artisanTemplate: document.getElementById("ai-artisan-template"),
    unverifiedTemplate: document.getElementById("ai-unverified-template"),
    chips: Array.prototype.slice.call(section.querySelectorAll(".ai-chip"))
  };

  // Nếu HTML thiếu một phần tử quan trọng thì dừng lại an toàn,
  // không làm ảnh hưởng các chức năng khác của trang.
  const required = [
    aiDom.form, aiDom.input, aiDom.suggestions, aiDom.submitBtn, aiDom.resetBtn,
    aiDom.status, aiDom.error, aiDom.answer, aiDom.answerText, aiDom.criteriaList,
    aiDom.followup, aiDom.budgetFollowup, aiDom.locationFollowup, aiDom.results,
    aiDom.productBlock, aiDom.productCount, aiDom.productResults, aiDom.productEmpty,
    aiDom.artisanBlock, aiDom.artisanCount, aiDom.artisanResults, aiDom.artisanEmpty,
    aiDom.unverifiedBlock, aiDom.unverifiedResults, aiDom.empty, aiDom.emptyReset,
    aiDom.productTemplate, aiDom.artisanTemplate, aiDom.unverifiedTemplate
  ];

  if (required.some(function (element) { return !element; })) {
    return;
  }

  aiDom.form.addEventListener("submit", function (event) {
    event.preventDefault();
    aiRunSearch(aiDom.input.value);
  });

  aiDom.resetBtn.addEventListener("click", aiReset);

  aiDom.suggestions.addEventListener("click", function (event) {
    const chip = event.target.closest(".ai-chip");
    if (!chip || chip.disabled || aiState.searching) {
      return;
    }

    const prompt = chip.getAttribute("data-prompt");
    if (!prompt) {
      return;
    }

    aiDom.input.value = prompt;
    aiRunSearch(prompt);
  });

  aiDom.budgetFollowup.addEventListener("click", function (event) {
    const chip = event.target.closest("[data-budget]");
    if (!chip) {
      return;
    }

    const rawValue = chip.getAttribute("data-budget");
    aiState.overrides.budgetSet = true;
    aiState.overrides.budgetMax = rawValue === "all" ? null : Number(rawValue);
    aiRerunSearch();
  });

  aiDom.locationFollowup.addEventListener("click", function (event) {
    const chip = event.target.closest("[data-location]");
    if (!chip) {
      return;
    }

    const value = chip.getAttribute("data-location");
    aiState.overrides.locationSet = true;
    aiState.overrides.location = value === "all"
      ? null
      : AI_LOCATION_OPTIONS.find(function (location) { return location.value === value; }) || null;

    aiRerunSearch();
  });

  aiDom.artisanResults.addEventListener("click", function (event) {
    const button = event.target.closest(".ai-artisan-products-btn");
    if (!button || button.disabled) {
      return;
    }

    aiShowArtisanProducts(button.getAttribute("data-artisan-id"));
  });

  aiDom.emptyReset.addEventListener("click", aiReset);

  // Ctrl + Enter (hoặc Cmd + Enter trên macOS) để gửi nhanh.
  aiDom.input.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      aiRunSearch(aiDom.input.value);
    }
  });

  aiDom.input.addEventListener("input", function () {
    if (!aiDom.error.hidden) {
      aiHideError();
    }
  });
}

aiInit();
