(() => {
  const PREFIX = "craftlink:data:v1:";

  function emit(collection, records) {
    window.dispatchEvent(new CustomEvent("craftlink:datachange", { detail: { collection, records } }));
  }

  function read(key) {
    try {
      const value = localStorage.getItem(key);
      if (!value) return null;
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  async function load(collection, url, legacyKeys = []) {
    const key = PREFIX + collection;
    const current = read(key);
    if (current) return current;

    const oldKeys = Array.isArray(legacyKeys) ? legacyKeys : [legacyKeys];
    for (const oldKey of oldKeys) {
      const legacy = oldKey && read(oldKey);
      if (legacy) {
        try { localStorage.setItem(key, JSON.stringify(legacy)); } catch {}
        return legacy;
      }
    }

    const response = await fetch(url, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("Không tải được dữ liệu (" + response.status + ").");
    const records = await response.json();
    if (!Array.isArray(records)) throw new Error("Tệp dữ liệu không đúng định dạng danh sách.");
    try { localStorage.setItem(key, JSON.stringify(records)); } catch {}
    emit(collection, records);
    return records;
  }

  async function reset(collection, url, legacyKey) {
    try { localStorage.removeItem(PREFIX + collection); } catch {}
    if (legacyKey) { try { localStorage.removeItem(legacyKey); } catch {} }
    return load(collection, url);
  }

  function save(collection, records, legacyKey) {
    try {
      localStorage.setItem(PREFIX + collection, JSON.stringify(records));
      if (legacyKey) localStorage.setItem(legacyKey, JSON.stringify(records));
      emit(collection, records);
      return true;
    } catch {
      return false;
    }
  }

  async function encodeImage(file, maxDimension = 900) {
    if (!file) return "";
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      throw new Error("Chỉ hỗ trợ ảnh JPG, PNG hoặc WebP.");
    }
    if (file.size > 5 * 1024 * 1024) throw new Error("Ảnh gốc phải nhỏ hơn 5 MB.");
    if (!window.createImageBitmap) {
      throw new Error("Trình duyệt chưa hỗ trợ xử lý ảnh. Hãy dùng Chrome hoặc Edge mới.");
    }

    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext("2d");
    context.fillStyle = "#fff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const data = canvas.toDataURL("image/jpeg", 0.76);
    if (data.length > 700_000) throw new Error("Ảnh vẫn quá lớn sau khi nén. Hãy chọn ảnh khác.");
    return data;
  }

  function showState(target, kind, message, options = {}) {
    const isTable = target instanceof HTMLTableSectionElement;
    const box = document.createElement(isTable ? "tr" : "div");
    box.className = "state-message state-" + kind;
    const body = isTable ? document.createElement("td") : box;
    if (isTable) {
      body.colSpan = options.colSpan || 1;
      box.append(body);
    }
    const copy = document.createElement("p");
    copy.textContent = message;
    body.append(copy);

    if (kind === "loading") {
      const spinner = document.createElement("span");
      spinner.className = "state-spinner";
      spinner.setAttribute("aria-hidden", "true");
      body.prepend(spinner);
    }
    if (options.actionLabel && typeof options.onAction === "function") {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "state-action";
      button.textContent = options.actionLabel;
      button.addEventListener("click", options.onAction);
      body.append(button);
    }
    target.replaceChildren(box);
  }

  function subscribe(callback) {
    window.addEventListener("craftlink:datachange", event => callback(event.detail));
    window.addEventListener("storage", event => {
      if (event.key && event.key.startsWith(PREFIX)) {
        callback({ collection: event.key.slice(PREFIX.length), records: read(event.key) || [] });
      }
    });
  }

  function debounce(handler, wait = 260) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => handler(...args), wait);
    };
  }

  window.CraftLinkAPI = { load, reset, save, showState, subscribe, encodeImage, debounce, key: name => PREFIX + name };
})();