(() => {
  const labels = {
    "moderation-risk": "AI phân tích rủi ro bài đăng",
    "report-triage": "AI phân loại và ưu tiên báo cáo",
    "policy-copilot": "AI copilot soạn quy định",
    "product-discovery": "AI gợi ý sản phẩm phù hợp"
  };

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function createDialog(config) {
    const dialog = el("dialog", "ai-dialog");
    dialog.setAttribute("aria-labelledby", "aiDialogTitle");
    const card = el("div", "ai-card");
    const header = el("header", "ai-header");
    const title = el("h2", "", config.title || labels[config.feature] || "Trợ lý AI");
    title.id = "aiDialogTitle";
    const close = el("button", "ai-close", "×");
    close.type = "button";
    close.setAttribute("aria-label", "Đóng cửa sổ AI");
    close.addEventListener("click", () => dialog.close());
    header.append(title, close);

    const inputLabel = el("label", "ai-label", config.inputLabel || "Bổ sung mục tiêu hoặc bối cảnh");
    inputLabel.htmlFor = "aiContextInput";
    const input = el("textarea", "ai-input");
    input.id = "aiContextInput";
    input.rows = 3;
    input.maxLength = 1200;
    input.placeholder = config.placeholder || "Nhập ít nhất 10 ký tự để AI phân tích.";
    input.setAttribute("aria-describedby", "aiStatus");
    const run = el("button", "primary ai-run", "Phân tích bằng AI");
    run.type = "button";
    const status = el("p", "ai-status");
    status.id = "aiStatus";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");

    const result = el("section", "ai-result");
    result.hidden = true;
    const resultHeading = el("h3", "ai-result-title");
    const confidence = el("span", "ai-confidence");
    const summary = el("p", "ai-summary");
    const recommendation = el("p", "ai-recommendation");
    const factorsTitle = el("h4", "", "Các yếu tố được cân nhắc");
    const factors = el("ul", "ai-factors");
    const actionLabel = el("label", "ai-label", "Hướng xử lý đề xuất");
    actionLabel.htmlFor = "aiAction";
    const action = el("select", "ai-action");
    action.id = "aiAction";
    const draftLabel = el("label", "ai-label", config.draftLabel || "Nội dung gợi ý");
    draftLabel.htmlFor = "aiDraft";
    const draft = el("textarea", "ai-draft");
    draft.id = "aiDraft";
    draft.rows = 5;
    draft.maxLength = 3000;
    draft.disabled = true;
    const controls = el("div", "ai-controls");
    const accept = el("button", "primary", "Chấp nhận và lưu");
    accept.type = "button";
    const edit = el("button", "secondary", "Chỉnh sửa");
    edit.type = "button";
    const regenerate = el("button", "secondary", "Tạo lại");
    regenerate.type = "button";
    const reject = el("button", "ai-reject", "Từ chối");
    reject.type = "button";
    controls.append(accept, edit, regenerate, reject);
    result.append(resultHeading, confidence, summary, recommendation, factorsTitle, factors, actionLabel, action, draftLabel, draft, controls);

    const examples = el("div", "ai-examples");
    examples.setAttribute("aria-label", "Gợi ý dữ liệu đầu vào");
    for (const sample of (config.examples || ["Mô tả rõ nội dung cần kiểm tra", "Nêu thêm tiêu chí muốn AI cân nhắc"])) {
      const chip = el("button", "ai-chip", sample);
      chip.type = "button";
      chip.addEventListener("click", () => {
        input.value = sample;
        input.focus();
      });
      examples.append(chip);
    }

    card.append(header, inputLabel, input, run, status, result, examples);
    dialog.append(card);
    document.body.append(dialog);
    dialog.addEventListener("click", event => {
      if (event.target === dialog) dialog.close();
    });
    return { dialog, input, run, status, result, resultHeading, confidence, summary, recommendation, factors, actionLabel, action, draft, accept, edit, regenerate, reject, examples };
  }

  function bind(config) {
    const ui = createDialog(config);
    let context = {};
    let result = null;
    let runCount = 0;

    async function execute(regenerate = false) {
      const note = ui.input.value.trim();
      if ((note + " " + JSON.stringify(context || {})).trim().length < 10) {
        ui.result.hidden = true;
        ui.status.textContent = "AI chưa đủ dữ liệu để phân tích chính xác. Hãy bổ sung thông tin hoặc chuyển sang nhập thủ công.";
        ui.examples.hidden = false;
        return;
      }

      ui.run.disabled = true;
      ui.accept.disabled = true;
      ui.regenerate.disabled = true;
      ui.status.textContent = "AI đang phân tích dữ liệu…";
      ui.result.hidden = true;
      ui.examples.hidden = true;
      ui.dialog.setAttribute("aria-busy", "true");

      try {
        const configuredEndpoint = document.querySelector('meta[name="craftlink-ai-endpoint"]')?.content.trim() || window.CRAFTLINK_AI_ENDPOINT;
        const endpoint = configuredEndpoint || new URL("/api/ai", window.location.origin).href;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ feature: config.feature, context, input: note, regenerate: regenerate || runCount > 0 })
        });
        const payload = await response.json().catch(() => ({}));
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Không tìm thấy API AI. GitHub Pages chỉ chạy giao diện tĩnh; hãy triển khai dự án cùng /api/ai.js trên Vercel.");
          }
          throw new Error(payload.error || "AI chưa phản hồi. Hãy thử lại hoặc xử lý thủ công.");
        }
        result = payload.result;
        if (!result || typeof result !== "object") throw new Error("AI trả về dữ liệu không hợp lệ.");

        ui.resultHeading.textContent = result.title || labels[config.feature] || "Kết quả phân tích";
        ui.confidence.textContent = "Độ tin cậy: " + Math.round(Number(result.confidence || 0) * 100) + "%";
        ui.summary.textContent = result.summary || "";
        ui.recommendation.textContent = result.recommendation || "";
        ui.factors.replaceChildren(...(Array.isArray(result.factors) ? result.factors : []).slice(0, 5).map(factor => el("li", "", String(factor))));
        ui.draft.value = result.draft || "";
        ui.draft.disabled = true;
        ui.edit.textContent = "Chỉnh sửa";
        ui.action.replaceChildren();
        for (const item of (config.actions || [])) {
          const option = el("option", "", item.label);
          option.value = item.value;
          ui.action.append(option);
        }
        ui.actionLabel.hidden = !config.actions?.length;
        ui.action.hidden = !config.actions?.length;
        if (config.actions?.length) {
          ui.action.value = config.actions.some(item => item.value === result.action)
            ? result.action
            : config.actions[0].value;
        }
        ui.status.textContent = Number(result.confidence || 0) < 0.55
          ? "AI chưa chắc chắn. Hãy kiểm tra các yếu tố và xác nhận thủ công trước khi áp dụng."
          : "AI đã phân tích. Hãy kiểm tra kết quả rồi tự quyết định có áp dụng hay không.";
        ui.result.hidden = false;
        ui.examples.hidden = Number(result.confidence || 0) >= 0.55;
        runCount++;
      } catch (error) {
        ui.status.textContent = error instanceof TypeError
          ? "Không kết nối được máy chủ AI. GitHub Pages chỉ chạy giao diện tĩnh; hãy triển khai API trên Vercel rồi cấu hình AI_API_URL, AI_API_KEY và AI_MODEL."
          : error.message || "Không thể kết nối AI. Hãy thử lại hoặc chuyển sang xử lý thủ công.";
        ui.examples.hidden = false;
      } finally {
        ui.run.disabled = false;
        ui.regenerate.disabled = false;
        ui.dialog.removeAttribute("aria-busy");
      }
    }

    document.addEventListener("click", event => {
      const trigger = event.target.closest("[data-ai-trigger]");
      if (!trigger || trigger.dataset.aiTrigger !== config.feature) return;
      context = typeof config.getContext === "function" ? config.getContext(trigger) : {};
      ui.input.value = "";
      ui.status.textContent = "Nhập thêm thông tin nếu cần, sau đó chọn Phân tích bằng AI.";
      ui.result.hidden = true;
      ui.examples.hidden = false;
      runCount = 0;
      ui.dialog.showModal();
      if (config.prefill) ui.input.value = config.prefill(context);
      ui.input.focus();
    });

    ui.run.addEventListener("click", () => execute(false));
    ui.regenerate.addEventListener("click", () => execute(true));
    ui.edit.addEventListener("click", () => {
      ui.draft.disabled = !ui.draft.disabled;
      ui.edit.textContent = ui.draft.disabled ? "Chỉnh sửa" : "Khóa chỉnh sửa";
      if (!ui.draft.disabled) ui.draft.focus();
    });
    ui.accept.addEventListener("click", async () => {
      if (!result || !config.apply) return;
      ui.accept.disabled = true;
      try {
        const saved = await config.apply(result, ui.draft.value.trim(), ui.action.value, context);
        if (saved !== false) ui.dialog.close();
      } catch (error) {
        ui.status.textContent = error.message || "Không thể lưu kết quả AI vào dữ liệu.";
      } finally {
        ui.accept.disabled = false;
      }
    });
    ui.reject.addEventListener("click", () => {
      ui.dialog.close();
      if (config.onReject) config.onReject(result, context);
    });
  }

  window.CraftLinkAI = { bind };
})();