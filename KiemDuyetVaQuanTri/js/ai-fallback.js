(() => {
  const norm = value => String(value ?? "").normalize("NFC").toLocaleLowerCase("vi");
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const RISK_TERMS = [
    { term: "chữa bệnh", group: "An toàn cộng đồng" },
    { term: "trị liệu", group: "An toàn cộng đồng" },
    { term: "tuyệt đối", group: "An toàn cộng đồng" },
    { term: "100%", group: "Thông tin sản phẩm" },
    { term: "hàng hiệu", group: "Quyền tác giả" },
    { term: "nhái", group: "Quyền tác giả" },
    { term: "logo thương mại", group: "Quyền tác giả" },
    { term: "chuyển khoản trước", group: "Giao dịch" },
    { term: "thanh toán ngoài", group: "Giao dịch" },
    { term: "giao ngay", group: "Giao dịch" },
    { term: "cccd", group: "Quyền riêng tư" },
    { term: "địa chỉ nhà", group: "Quyền riêng tư" }
  ];

  const URGENT_TERMS = ["nguy hiểm", "mất an toàn", "cháy nổ", "trẻ em", "hàng giả", "lừa đảo", "chiếm đoạt"];

  const GROUP_KEYWORDS = [
    { group: "An toàn cộng đồng", words: ["an toàn", "nguy hiểm", "cháy", "trẻ em", "vật sắc"] },
    { group: "Quyền tác giả", words: ["ảnh", "hình ảnh", "bản vẽ", "sáng tác", "logo", "mẫu của"] },
    { group: "Giao dịch", words: ["đơn", "thanh toán", "hoàn tiền", "giao hàng", "cam kết", "thời gian hoàn thiện", "tùy biến", "đặt làm"] },
    { group: "Đánh giá", words: ["đánh giá", "review", "bình luận", "sao"] },
    { group: "Quyền riêng tư", words: ["số điện thoại", "địa chỉ", "email", "cccd", "thông tin cá nhân"] },
    { group: "Kiểm duyệt", words: ["kiểm duyệt", "duyệt", "từ chối", "quyết định", "khiếu nại"] },
    { group: "Cộng đồng", words: ["cộng đồng", "ứng xử", "tin nhắn", "trao đổi"] },
    { group: "Thông tin sản phẩm", words: ["chất liệu", "kích thước", "mô tả", "xuất xứ", "giá", "công năng"] }
  ];

  const money = value => {
    const digits = String(value ?? "").replace(/[^\d]/g, "");
    return digits.length >= 4 ? Number(digits) : 0;
  };

  const matchedRisk = text => {
    const haystack = norm(text);
    return RISK_TERMS.filter(entry => haystack.includes(norm(entry.term)));
  };

  const groupFor = text => {
    const haystack = norm(text);
    let best = { group: "Thông tin sản phẩm", score: 0 };
    for (const entry of GROUP_KEYWORDS) {
      const score = entry.words.filter(word => haystack.includes(norm(word))).length;
      if (score > best.score) best = { group: entry.group, score };
    }
    return best.group;
  };

  const sentence = value => String(value || "").replace(/\s+/g, " ").trim();
  const capitalize = value => value ? value.charAt(0).toLocaleUpperCase("vi") + value.slice(1) : value;

  function analyzeListing(context, note) {
    const name = sentence(context.name) || "sản phẩm này";
    const description = sentence(context.description);
    const extra = sentence(note);
    const guidelines = Array.isArray(context.guidelines) ? context.guidelines : [];
    const combined = [name, description, extra].join(" ");
    const risks = matchedRisk(combined);

    let score = 0.3;
    const signals = [];
    if (risks.length) {
      score -= 0.16 * risks.length;
      signals.push("Phát hiện " + risks.length + " cụm từ cần xác minh: " + risks.map(r => r.term).join(", ") + ".");
    } else {
      signals.push("Không phát hiện cụm từ quảng cáo quá mức hoặc dẫn ra giao dịch ngoài nền tảng.");
    }
    if (description.length >= 80) {
      score += 0.13;
      signals.push("Mô tả dài " + description.length + " ký tự, đủ chỗ nêu chất liệu và quy trình làm.");
    } else {
      signals.push("Mô tả chỉ có " + description.length + " ký tự, dễ thiếu chất liệu, kích thước hoặc xuất xứ.");
      score -= 0.05;
    }
    if (money(context.price) > 0) {
      score += 0.11;
      signals.push("Giá niêm yết " + context.price + " được hiển thị minh bạch.");
    } else {
      score -= 0.12;
      signals.push("Chưa ghi nhận giá bán, người mua khó so sánh và dễ phát sinh giao dịch ngoài nền tảng.");
    }
    if (sentence(context.category)) {
      score += 0.08;
      signals.push("Bài đăng đã gắn danh mục “" + context.category + "” nên có thể đối chiếu đúng bộ quy định.");
    } else {
      score -= 0.08;
      signals.push("Bài đăng chưa gắn danh mục, việc áp quy định đang phải suy đoán.");
    }
    if (guidelines.length >= 5) {
      score += 0.08;
      signals.push(guidelines.length + " quy định đang có hiệu lực được nạp làm căn cứ đánh giá.");
    } else {
      score -= 0.06;
      signals.push("Chỉ có " + guidelines.length + " quy định trong thư viện, căn cứ xét duyệt còn mỏng.");
    }
    if (extra.length >= 30) {
      score += 0.06;
      signals.push("Kiểm duyệt viên bổ sung ngữ cảnh riêng cho bài đăng này.");
    }

    const confidence = Math.round(clamp(score, 0.05, 0.9) * 100) / 100;
    let action;
    if (risks.length >= 2) action = "rejected";
    else if (risks.length === 1 || confidence < 0.58) action = "revision";
    else action = "approved";

    const recommendation = {
      approved: "Đủ căn cứ để duyệt; kiểm duyệt viên nên đối chiếu nhanh ảnh và chất liệu.",
      revision: "Nên yêu cầu người bán bổ sung chất liệu, kích thước hoặc bỏ cụm từ gây hiểu nhầm trước khi duyệt.",
      rejected: "Nhiều dấu hiệu vi phạm cùng lúc; nên từ chối và dẫn chiếu đúng nhóm quy định bị chạm."
    }[action];

    const draft = {
      approved: "Bài đăng “" + name + "” đáp ứng các tiêu chí công khai thông tin hiện hành. Ghi chú của kiểm duyệt viên: ",
      revision: "Bài đăng “" + name + "” cần chỉnh sửa trước khi hiển thị. Người bán phải bổ sung hoặc cắt bỏ: ",
      rejected: "Bài đăng “" + name + "” không đạt quy định đang áp dụng. Căn cứ từ chối và hướng xử lý cho người bán: "
    }[action];

    return {
      title: "Đánh giá rủi ro: " + name,
      summary: risks.length
        ? "Nội dung chạm " + [...new Set(risks.map(r => r.group))].join(", ") + " trong thư viện quy định."
        : "Nội dung không chạm nhóm quy định nào trong thư viện " + guidelines.length + " quy định.",
      recommendation,
      confidence,
      action,
      factors: signals.slice(0, 5),
      draft
    };
  }

  function draftPolicy(context, note) {
    const topic = sentence(note || context.topic);
    const existing = Array.isArray(context.rules) ? context.rules.length : 0;
    const group = groupFor(topic);
    const clause = sentence(topic.split(/\s+và\s+/i)[0]);
    const short = clause.length >= 12 ? clause : sentence(topic);
    const body = short.length > 62 ? short.slice(0, 62).replace(/\s+\S*$/, "") : short;
    const needsPrefix = !(norm(body).startsWith("quy định") || norm(body).startsWith("chính sách") || norm(body).startsWith("nhu cầu"));
    const ruleTitle = capitalize(
      needsPrefix ? "Quy định về " + (body || "cộng đồng CraftLink") : body
    ).slice(0, 90);

    let confidence = 0.34;
    if (topic.length >= 60) confidence += 0.22;
    else if (topic.length >= 25) confidence += 0.14;
    if (GROUP_KEYWORDS.some(entry => entry.words.some(word => norm(topic).includes(norm(word))))) confidence += 0.12;
    if (/\d/.test(topic)) confidence += 0.06;
    confidence = Math.round(clamp(confidence, 0.05, 0.86) * 100) / 100;

    const factors = [
      "Nhóm quy định được suy ra từ chính cụm bạn nhập: " + group + ".",
      "Thư viện hiện có " + existing + " quy định; bản nháp này chưa trùng căn cứ với quy định nào đang có.",
      topic.length < 25
        ? "Đầu vào còn ngắn nên phạm vi áp dụng chưa rõ; quản trị viên cần bổ sung tình huống cụ thể."
        : "Đầu vào nêu được tình huống nên bản nháp có thể chuyển thành điều khoản áp dụng ngay."
    ];

    const draft = "Phạm vi áp dụng: " + (topic || "các bài đăng do người bán tự soạn trên CraftLink") + ". "
      + "Yêu cầu: người bán phải trình bày thông tin kiểm chứng được và không cam kết vượt quá khả năng xác nhận của nền tảng. "
      + "Căn cứ kiểm duyệt: kiểm duyệt viên đối chiếu bản mô tả với ảnh và danh mục đã chọn trước khi duyệt. "
      + "Xử lý vi phạm: bài đăng chuyển trạng thái Cần chỉnh sửa kèm ghi chú nêu rõ điểm thiếu; tái phạm thì từ chối và thông báo lý do.";

    return {
      title: ruleTitle,
      summary: "Bản nháp thuộc nhóm " + group + ", soạn từ đúng dữ liệu bạn nhập, chưa được xuất bản.",
      recommendation: confidence < 0.55
        ? "Độ tin cậy còn thấp; quản trị viên nên sửa phạm vi áp dụng trước khi lưu."
        : "Bản nháp đã đủ khung để quản trị viên chỉnh câu chữ rồi lưu thành quy định.",
      confidence,
      ruleTitle,
      ruleGroup: group,
      factors,
      draft
    };
  }

  function triageReport(context, note) {
    const target = sentence(context.target) || "bài đăng bị báo cáo";
    const text = [context.type, context.reason, note].join(" ");
    const risks = matchedRisk(text);
    const urgent = URGENT_TERMS.filter(term => norm(text).includes(norm(term)));

    let confidence = 0.42;
    if (context.reason) confidence += 0.12;
    if (urgent.length) confidence += 0.14;
    if (note && note.length >= 40) confidence += 0.08;
    if (context.status && context.status !== "pending") confidence -= 0.1;
    confidence = Math.round(clamp(confidence, 0.05, 0.88) * 100) / 100;

    const priority = urgent.length || risks.length ? "high" : confidence < 0.5 ? "medium" : "low";
    const action = urgent.length || risks.length ? "handled" : confidence < 0.5 ? "verifying" : "dismissed";

    const evidence = risks.length
      ? "Cụm từ rủi ro tìm thấy: " + risks.map(r => r.term).join(", ") + "."
      : urgent.length
        ? "Từ khóa mất an toàn tìm thấy: " + urgent.join(", ") + "."
        : "Không tìm thấy cụm từ rủi ro trong nội dung báo cáo.";

    return {
      title: "Ưu tiên báo cáo " + (context.id || "") + ": " + target,
      summary: urgent.length
        ? "Nội dung báo cáo chạm từ khóa mất an toàn nên cần xử lý trước hàng đợi thông thường."
        : action === "verifying"
          ? "Dữ liệu hiện có chưa đủ để kết luận; cần xác minh lại với người bị báo cáo."
          : "Không có dấu hiệu mất an toàn tức thời trong nội dung báo cáo.",
      recommendation: {
        handled: "Ghi nhận xử lý và phản hồi người báo cáo kèm căn cứ.",
        verifying: "Chuyển sang trạng thái Đang xác minh vì dữ liệu hiện có chưa đủ kết luận.",
        dismissed: "Có thể bỏ qua nếu người báo cáo không bổ sung được bằng chứng."
      }[action],
      confidence,
      priority,
      action,
      factors: [
        context.reason ? "Lý do báo cáo: " + context.reason : "Người báo cáo chưa nêu lý do cụ thể.",
        evidence,
        "Trạng thái hiện tại: " + (context.status || "pending") + "; báo cáo ngày " + (context.date || "không rõ") + "."
      ],
      draft: "Biên bản xác minh báo cáo " + (context.id || "") + " đối với “" + target + "”: "
    };
  }

  function discoverProducts(context, note) {
    const products = Array.isArray(context.products) ? context.products : [];
    const wanted = norm(note).split(/[\s,;]+/).filter(word => word.length > 2);
    const ranked = products
      .map(item => {
        const haystack = norm([item.name, item.category, item.description, item.maker].join(" "));
        const hits = wanted.filter(word => haystack.includes(word));
        return { item, hits: hits.length, score: hits.length * 2 + (money(item.price) > 0 ? 1 : 0) };
      })
      .filter(entry => entry.hits > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const confidence = Math.round(clamp(ranked.length ? 0.4 + ranked.length * 0.12 : 0.15, 0.05, 0.85) * 100) / 100;

    if (!ranked.length) {
      return {
        title: "Chưa đủ dữ liệu để gợi ý",
        summary: "Không có sản phẩm nào trong " + products.length + " bản ghi khớp với mô tả bạn nhập.",
        recommendation: "Thử thêm chất liệu, danh mục hoặc khoảng giá để hệ thống có căn cứ gợi ý.",
        confidence: 0.2,
        factors: ["Từ khóa nhập: " + (wanted.join(", ") || "trống"), "Nguồn tra cứu: " + products.length + " sản phẩm.", "Không có khớp nào đạt điểm."],
        draft: ""
      };
    }

    return {
      title: ranked.length + " gợi ý cho nhu cầu của bạn",
      summary: "Xếp hạng theo mức khớp từ khóa trên tên, danh mục và mô tả của " + products.length + " sản phẩm đang chờ/đã duyệt.",
      recommendation: "Ưu tiên “" + ranked[0].item.name + "” vì khớp nhiều tiêu chí nhất; người mua nên kiểm tra giá và chất liệu ghi trên bài đăng.",
      confidence,
      factors: ranked.map(entry =>
        entry.item.name + " (" + (entry.item.category || "chưa phân loại") + "): khớp " + entry.hits + " từ khóa trong " + wanted.length + " từ bạn nhập."),
      draft: "Danh sách gợi ý: " + ranked.map(entry => entry.item.name).join(" · ") + ". "
    };
  }

  const ANALYZERS = {
    "moderation-risk": analyzeListing,
    "policy-copilot": draftPolicy,
    "report-triage": triageReport,
    "product-discovery": discoverProducts
  };

  window.CraftLinkAIFallback = {
    available(feature) {
      return Object.prototype.hasOwnProperty.call(ANALYZERS, feature);
    },
    analyze(feature, context, note) {
      const analyze = ANALYZERS[feature];
      if (!analyze) return null;
      const result = analyze(context || {}, note || "");
      result.fallback = true;
      return result;
    }
  };
})();
