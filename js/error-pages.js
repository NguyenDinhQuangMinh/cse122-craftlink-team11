/* Trang lỗi 404 / 403 dùng chung cho toàn site.
   Chỉ dùng textContent và createElement khi hiển thị dữ liệu lấy từ URL,
   nên một liên kết độc hại không thể biến thành thẻ HTML.
   Không gọi mạng, không khóa API, không phụ thuộc thư viện. */
(() => {
  "use strict";

  // Tệp được nạp bằng script tạo động nên có thể chạy trước khi duyệt xong body.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    main();
  }

  function main() {
  const body = document.body;
  const code = body.dataset.errorCode === "403" ? "403" : "404";
  const LOG_KEY = "craftlink:error-log";
  const SESSION_KEY = "cl_session";
  const MAX_LOG = 20;

  const ROLE_LABELS = {
    guest: "Khách vãng lai (chưa đăng nhập)",
    customer: "Khách hàng",
    artisan: "Nghệ nhân / Thợ thủ công",
    moderator: "Kiểm duyệt viên",
    admin: "Quản trị viên"
  };

  // Danh mục màn hình thật, mirrors docs/screen-inventory.md và cây hợp nhất ba nhánh.
  const SCREENS = [
    { path: "index.html", name: "Trang giới thiệu bốn lối vào", group: "all" },
    { path: "403.html", name: "Trang 403 — không có quyền", group: "all" },

    { path: "KhachHang/index.html", name: "Khám phá sản phẩm", group: "customer" },
    { path: "KhachHang/product-detail.html", name: "Chi tiết sản phẩm", group: "customer" },
    { path: "KhachHang/favorites.html", name: "Sản phẩm yêu thích", group: "customer" },
    { path: "KhachHang/customize.html", name: "Brief tùy biến", group: "customer" },
    { path: "KhachHang/artisan-suggestions.html", name: "Gợi ý nghệ nhân", group: "customer" },
    { path: "KhachHang/cart.html", name: "Giỏ hàng", group: "customer" },
    { path: "KhachHang/checkout.html", name: "Xác nhận đơn", group: "customer" },
    { path: "KhachHang/orders.html", name: "Đơn hàng của tôi", group: "customer" },
    { path: "KhachHang/order-details.html", name: "Chi tiết đơn hàng", group: "customer" },

    { path: "KhongGianNguoiBan/01-listing-management/index.html", name: "Quản lý listing", group: "artisan" },
    { path: "KhongGianNguoiBan/02-brief-inbox/index.html", name: "Hòm thư brief", group: "artisan" },
    { path: "KhongGianNguoiBan/03-proposal-editor/index.html", name: "Soạn proposal", group: "artisan" },
    { path: "KhongGianNguoiBan/04-shop-profile/index.html", name: "Hồ sơ gian hàng", group: "artisan" },

    { path: "KiemDuyetVaQuanTri/01-dashboard/index.html", name: "Bảng điều khiển", group: "admin" },
    { path: "KiemDuyetVaQuanTri/02-category-management/index.html", name: "Quản lý danh mục", group: "admin" },
    { path: "KiemDuyetVaQuanTri/03-user-management/index.html", name: "Quản lý tài khoản", group: "admin" },
    { path: "KiemDuyetVaQuanTri/04-moderation-queue/index.html", name: "Hàng đợi kiểm duyệt", group: "admin" },
    { path: "KiemDuyetVaQuanTri/05-report-center/index.html", name: "Trung tâm báo cáo", group: "admin" },
    { path: "KiemDuyetVaQuanTri/06-content-guidelines/index.html", name: "Quy định nội dung", group: "admin" },
    { path: "KiemDuyetVaQuanTri/GopTrang.html", name: "Tổng hợp sáu màn quản trị", group: "admin" },

    { path: "DangNhapVaDangKy/01-dang-nhap/index.html", name: "Lựa chọn vai trò đăng nhập", group: "all" },
    { path: "DangNhapVaDangKy/01-dang-nhap/khach-hang.html", name: "Đăng nhập khách hàng", group: "customer" },
    { path: "DangNhapVaDangKy/01-dang-nhap/nghe-nhan.html", name: "Đăng nhập nghệ nhân", group: "artisan" },
    { path: "DangNhapVaDangKy/01-dang-nhap/quan-tri.html", name: "Đăng nhập quản trị", group: "admin" },
    { path: "DangNhapVaDangKy/02-dang-ky/index.html", name: "Đăng ký tài khoản nghệ nhân", group: "all" }
  ];

  const LOGIN_BY_ROLE = {
    customer: "DangNhapVaDangKy/01-dang-nhap/khach-hang.html",
    artisan: "DangNhapVaDangKy/01-dang-nhap/nghe-nhan.html",
    admin: "DangNhapVaDangKy/01-dang-nhap/quan-tri.html",
    moderator: "DangNhapVaDangKy/01-dang-nhap/quan-tri.html"
  };

  const GROUP_LABELS = {
    customer: "Khách hàng · SV1",
    artisan: "Người bán · SV2",
    admin: "Quản trị & Kiểm duyệt · SV3",
    all: "Dùng chung"
  };

  // Thư mục thật của từng phân hệ, dùng làm nhãn kiểm chứng được trong bảng quyền
  // thay vì đếm số màn (số đó phụ thuộc cách gộp trang con, dễ lệch với 18 dòng kiểm kê).
  const SUBPATHS = {
    customer: "/KhachHang/",
    artisan: "/KhongGianNguoiBan/",
    admin: "/KiemDuyetVaQuanTri/"
  };

  // Bảy đích hỏng đã đo ở docs/barem-audit.md mục 6.1. Trang 404 không sửa mã
  // phân hệ khác, chỉ nêu đích thật gần nhất để người dùng không bị dồn vào đường cụt.
  const MISLINKS = [
    { match: /forgot[-_]?password\.html$/i, to: "KhachHang/forgot password.html",
      why: "bản thật nằm ở phân hệ Khách hàng, tên tệp có dấu cách (`KhachHang/forgot password.html`)" },
    { match: /(^|\/)video\.md$/i, to: "videos/README.md",
      why: "bảng video của nhóm nằm ở `videos/README.md`, không có tệp `video.md` ở gốc" },
    { match: /ai-usage -report\.md$/i, to: "docs/ai-usage-report.md",
      why: "tệp khai báo AI đúng tên là `docs/ai-usage-report.md`" },
    { match: /(^|\/)assest\//i, to: path => path.replace("assest/", "assets/"),
      why: "sai chính tả tên thư mục: `assest` → `assets`" }
  ];

  const slot = name => document.querySelector('[data-slot="' + name + '"]');
  const params = new URLSearchParams(location.search);

  // Gốc site do <base> trong phần đầu trang tính ra: "/" khi chạy ở thư mục repo,
  // "/cse122-craftlink-team11/" khi deploy làm project page. Bỏ tiền tố này khỏi
  // đường dẫn hiển thị để nó khớp đúng với đường dẫn trong docs/screen-inventory.md.
  const sitePath = new URL(document.baseURI).pathname;
  const toRepoPath = value => {
    const path = String(value || "");
    return path.startsWith(sitePath) ? "/" + path.slice(sitePath.length) : path;
  };

  const stripDiacritics = value =>
    value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");

  const tokens = value =>
    stripDiacritics(String(value).toLowerCase())
      .split(/[^a-z0-9]+/g)
      .filter(token => token.length > 2);

  // Trang thiếu: GitHub Pages phục vụ chính tệp này tại URL bị thiếu,
  // còn khi mở trực tiếp thì người dùng có thể gửi kèm ?from=.
  const missingPath = (() => {
    const raw = params.get("from") || params.get("screen") || "";
    if (raw) {
      try {
        return toRepoPath(decodeURIComponent(new URL(raw, location.origin).pathname));
      } catch {
        return toRepoPath(raw);
      }
    }
    const here = decodeURIComponent(location.pathname);
    return /\/(403|404)(\.html)?$/i.test(here) ? "" : toRepoPath(here);
  })();

  const readSession = () => {
    for (const store of [window.localStorage, window.sessionStorage]) {
      try {
        const value = store.getItem(SESSION_KEY);
        if (!value) continue;
        const parsed = JSON.parse(value);
        if (parsed && typeof parsed === "object" && "role" in parsed) return parsed;
      } catch {
        // mốc hỏng thì coi như chưa đăng nhập
      }
    }
    return null;
  };

  const formatTime = date =>
    new Intl.DateTimeFormat("vi-VN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "2-digit" }).format(date);

  const readLog = () => {
    try {
      const parsed = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const writeLog = entries => {
    try {
      localStorage.setItem(LOG_KEY, JSON.stringify(entries.slice(0, MAX_LOG)));
    } catch {
      // trình duyệt chặn bộ nhớ thì trang vẫn chạy bình thường
    }
  };

  const recordEntry = () => {
    const entries = readLog();
    const latest = entries[0];
    const now = Date.now();
    // gộp hai lần mở cùng một trang lỗi trong 30 giây
    if (latest && latest.code === code && latest.path === missingPath && now - latest.at < 30000) return entries;
    const list = [{ code, path: missingPath, at: now, role: (readSession() || {}).role || "guest" }, ...entries];
    writeLog(list);
    return list;
  };

  const renderLog = entries => {
    const list = slot("log");
    if (!list) return;
    list.textContent = "";
    const recent = entries.slice(0, 5);
    if (!recent.length) {
      const empty = document.createElement("li");
      empty.className = "empty";
      empty.textContent = "Chưa có bản ghi nào trên máy này.";
      list.append(empty);
      return;
    }
    for (const entry of recent) {
      const item = document.createElement("li");
      const codeEl = document.createElement("span");
      codeEl.className = "log-code";
      codeEl.textContent = entry.code;
      const when = document.createElement("span");
      when.className = "log-when";
      when.textContent = formatTime(new Date(entry.at || Date.now()));
      const path = document.createElement("span");
      path.className = "log-path";
      path.textContent = entry.path || "(mở trực tiếp)";
      item.append(codeEl, when, path);
      list.append(item);
    }
  };

  const renderFacts = rows => {
    const list = slot("facts");
    if (!list) return;
    list.textContent = "";
    for (const [label, value] of rows) {
      const dt = document.createElement("dt");
      dt.textContent = label;
      const dd = document.createElement("dd");
      dd.textContent = value;
      list.append(dt, dd);
    }
  };

  const scoreScreen = (screen, queryTokens) => {
    if (!queryTokens.length) return 0;
    const hay = tokens(screen.name + " " + screen.path);
    let hits = 0;
    for (const token of queryTokens) {
      if (hay.some(word => word === token)) hits += 3;
      else if (hay.some(word => word.startsWith(token) || token.startsWith(word))) hits += 1;
    }
    return hits;
  };

  const renderSuggestions = query => {
    const list = slot("suggest");
    if (!list) return;
    const queryTokens = tokens(query || "");
    const ranked = SCREENS
      .map(screen => ({ screen, score: scoreScreen(screen, queryTokens) }))
      .filter(row => row.score > 0)
      .sort((a, b) => b.score - a.score || a.screen.name.length - b.screen.name.length)
      .slice(0, 4)
      .map(row => row.screen);
    const shown = ranked.length ? ranked : SCREENS.filter(screen => screen.group === "all");

    list.textContent = "";
    for (const screen of shown) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = encodeURI(screen.path);
      link.textContent = screen.name;
      const meta = document.createElement("span");
      meta.className = "suggest-path";
      meta.textContent = GROUP_LABELS[screen.group] + " · /" + screen.path;
      item.append(link, meta);
      list.append(item);
    }
  };

  const renderMislink = () => {
    const box = slot("mislink");
    if (!box || !missingPath) return;
    const rule = MISLINKS.find(item => item.match.test(missingPath));
    if (!rule) return;
    const target = toRepoPath(typeof rule.to === "function" ? rule.to(missingPath) : rule.to)
      .replace(/^\/+/, "");
    box.textContent = "";
    const lead = document.createElement("span");
    lead.textContent = "Đường dẫn này hay bị ghi sai. Đích thật gần nhất: ";
    const link = document.createElement("a");
    link.className = "mislink-target";
    link.href = encodeURI(target);
    link.textContent = "/" + target;
    const why = document.createElement("span");
    why.className = "mislink-why";
    why.textContent = " — " + rule.why;
    box.append(lead, link, why);
    box.hidden = false;
  };

  const session = readSession();
  // Cùng bảng quyền với guard đầu tệp KiemDuyetVaQuanTri/js/navigation.js:
  // màn admin cần vai admin, màn moderator chấp nhận admin hoặc moderator.
  const NEEDED_ROLES = {
    customer: ["customer"],
    artisan: ["artisan"],
    moderator: ["admin", "moderator"],
    admin: ["admin"]
  };
  const needed = NEEDED_ROLES[params.get("need")] ? params.get("need") : "admin";

  if (code === "403") {
    const allowed = !session || NEEDED_ROLES[needed].includes(session.role);
    const verdict = slot("verdict");
    if (verdict) {
      verdict.textContent = session
        ? allowed
          ? "Vai trò của bạn đã đủ quyền"
          : "Thiếu quyền: trang này cần vai " + ROLE_LABELS[needed]
        : "Chưa có phiên — khu demo mở tự do";
      verdict.dataset.state = allowed ? "ok" : "denied";
    }
    const loginLink = slot("login-link");
    if (loginLink) {
      loginLink.href = LOGIN_BY_ROLE[needed];
      loginLink.textContent = needed === "moderator"
        ? "Đăng nhập vai Quản trị (bản demo chưa có trang đăng nhập riêng cho kiểm duyệt viên)"
        : "Đăng nhập bằng vai " + ROLE_LABELS[needed];
    }

    renderFacts([
      ["Trang bị chặn", toRepoPath(params.get("screen")) || "(không gửi kèm đường dẫn)"],
      ["Vai trò yêu cầu", ROLE_LABELS[needed]],
      ["Vai trò hiện tại", session ? ROLE_LABELS[session.role] || session.role : ROLE_LABELS.guest],
      ["Cách quay lại", "Trang đăng nhập chưa tự chuyển hướng về màn bị chặn — sau khi đăng nhập đúng vai, mở lại màn đó từ danh sách gợi ý."],
      ["Tài khoản", session ? session.email || session.name || "(ẩn danh)" : "—"],
      ["Đăng nhập lúc", session && session.at ? formatTime(new Date(session.at)) : "—"],
      ["Kiểm tra lúc", formatTime(new Date())],
      ["Máy chủ", location.hostname || "localhost"]
    ]);

    const tbody = document.querySelector('[data-slot="matrix"] tbody');
    if (tbody) {
      tbody.textContent = "";
      const groups = ["customer", "artisan", "admin"];
      for (const group of groups) {
        const screens = SCREENS.filter(screen => screen.group === group);
        const row = document.createElement("tr");
        if (session && session.role === group) row.dataset.current = "yes";
        const label = document.createElement("th");
        label.scope = "row";
        label.textContent = GROUP_LABELS[group] + " — " + SUBPATHS[group];
        row.append(label);
        for (const role of groups) {
          const cell = document.createElement("td");
          const open = role === group || role === "admin";
          cell.dataset.cell = open ? "on" : "off";
          if (open) {
            const link = document.createElement("a");
            link.href = encodeURI(screens[0].path);
            link.textContent = "Mở";
            cell.append(link);
          } else {
            cell.textContent = "403";
          }
          row.append(cell);
        }
        tbody.append(row);
      }
    }

    // Đổi vai trò ở tab khác (đăng nhập/đăng xuất) thì trang đọc lại phiên ngay.
    window.addEventListener("storage", event => {
      if (event.key === SESSION_KEY) location.reload();
    });
  } else {
    const referrer = document.referrer ? new URL(document.referrer) : null;
    renderFacts([
      ["Đường dẫn thiếu", missingPath || "(mở trực tiếp, không có ?from=)"],
      ["Đích tìm kiếm", params.get("q") || "(không có)"],
      ["Trang gửi tới", referrer ? referrer.host + referrer.pathname : "(không rõ — mở trực tiếp hoặc trình duyệt chặn referrer)"],
      ["Liên kết sai phổ biến", "forgot-password.html (gạch ngang) — bản thật là KhachHang/forgot password.html"],
      ["Thời điểm", formatTime(new Date())],
      ["Máy chủ", location.hostname || "localhost"]
    ]);
    renderMislink();
  }

  const input = document.getElementById("tim-kiem");
  let timer = null;
  const entries = recordEntry();
  renderLog(entries);
  renderSuggestions(missingPath || (input ? input.value : ""));

  input?.addEventListener("input", () => {
    window.clearTimeout(timer);
    const value = input.value;
    timer = window.setTimeout(() => renderSuggestions(value || missingPath), 120);
  });

  document.querySelector('[data-action="back"]')?.addEventListener("click", () => {
    if (history.length > 1) history.back();
    else location.assign("index.html");
  });

  document.querySelector('[data-action="clear-log"]')?.addEventListener("click", () => {
    writeLog([]);
    renderLog([]);
  });

  // <base> làm liên kết chỉ có neo ("#loi-noi-dung") trỏ sang trang gốc.
  // Ghi lại thành neo trên chính trang đang hiển thị.
  for (const anchor of document.querySelectorAll('a[href^="#"]')) {
    anchor.setAttribute("href", location.pathname + location.search + anchor.getAttribute("href"));
  }
  }
})();
