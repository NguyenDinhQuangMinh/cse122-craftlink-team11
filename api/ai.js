const FEATURES = {
  "product-discovery": "Đề xuất danh mục hoặc sản phẩm phù hợp cho người mua hoặc người làm thủ công dựa trên tiêu chí đã nhập. Không bịa dữ liệu tồn kho hay giá.",
  "moderation-risk": "Đánh giá nội dung sản phẩm theo quy định được cung cấp. Chỉ đề xuất một trạng thái approved, revision hoặc rejected; nêu căn cứ, yếu tố và độ tin cậy. Không tự quyết định thay kiểm duyệt viên.",
  "report-triage": "Tóm tắt báo cáo, phân loại ưu tiên thấp, vừa hoặc cao và đề xuất một hành động verifying, dismissed hoặc handled. Không khẳng định vi phạm nếu dữ liệu không đủ.",
  "policy-copilot": "Soạn nháp một quy định nội dung rõ ràng, có thể áp dụng cho sàn sản phẩm thủ công. Phải điền ruleTitle, ruleGroup, draft và không tự xuất bản."
};

function send(res, status, body) {
  return res.status(status).json(body);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return send(res, 405, { error: "Chỉ hỗ trợ yêu cầu POST." });
  const { feature, context = {}, input = "", regenerate = false } = req.body || {};
  if (!Object.prototype.hasOwnProperty.call(FEATURES, feature)) {
    return send(res, 400, { error: "Loại tác vụ AI không được hỗ trợ." });
  }

  const safeInput = typeof input === "string" ? input.trim().slice(0, 1200) : "";
  const contextText = JSON.stringify(context).slice(0, 10000);
  if ((safeInput + contextText).trim().length < 10) {
    return send(res, 422, { error: "AI chưa đủ dữ liệu để phân tích. Hãy bổ sung thông tin." });
  }

  const { AI_API_URL, AI_API_KEY, AI_MODEL } = process.env;
  if (!AI_API_URL || !AI_API_KEY || !AI_MODEL) {
    return send(res, 503, { error: "Dịch vụ AI chưa được cấu hình. Hãy thêm AI_API_URL, AI_API_KEY và AI_MODEL trong biến môi trường máy chủ." });
  }

  const system = [
    "Bạn là trợ lý AI của CraftLink, một sàn sản phẩm sáng tạo tùy biến.",
    FEATURES[feature],
    "Chỉ trả về một JSON object hợp lệ, không markdown.",
    "Schema: {title:string, summary:string, recommendation:string, confidence:number 0..1, factors:string[3], draft:string, action?:string, priority?:string, ruleTitle?:string, ruleGroup?:string}.",
    "Nếu dữ liệu thiếu hoặc mâu thuẫn, confidence phải thấp và draft phải nói rõ điều chưa biết.",
    "Không tự khẳng định nội dung không có trong dữ liệu. product-discovery chỉ gợi ý sản phẩm có trong dữ liệu context được gửi."
  ].join(" ");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(AI_API_URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + AI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: AI_MODEL,
        temperature: regenerate ? 0.7 : 0.2,
        max_tokens: 1200,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: JSON.stringify({ context, input: safeInput, regenerate }) }
        ]
      }),
      signal: controller.signal
    });
    const provider = await response.json().catch(() => ({}));
    if (!response.ok) {
      return send(res, 502, { error: provider.error?.message || "Nhà cung cấp AI hiện không khả dụng." });
    }

    const raw = provider.choices?.[0]?.message?.content || provider.output_text;
    if (!raw) return send(res, 502, { error: "AI không trả về nội dung có thể sử dụng." });
    const result = JSON.parse(String(raw).trim());
    const confidence = Number(result.confidence);
    result.confidence = Number.isFinite(confidence) ? Math.max(0, Math.min(1, confidence)) : 0;
    result.factors = Array.isArray(result.factors) ? result.factors.slice(0, 5).map(String) : [];
    return send(res, 200, { result });
  } catch (error) {
    const message = error.name === "AbortError" ? "AI phản hồi quá lâu. Hãy thử lại." : "Không thể đọc phản hồi từ dịch vụ AI.";
    return send(res, 502, { error: message });
  } finally {
    clearTimeout(timeout);
  }
};


