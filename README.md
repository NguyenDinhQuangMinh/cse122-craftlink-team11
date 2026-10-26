# CRAFTLINK — Sàn thương mại điện tử sản phẩm thủ công tùy biến

> **Bài tập lớn học phần:** Phát triển Ứng dụng Web Cơ bản (CSE122) — Nhóm 11
> **Giảng viên:** ThS. Kiều Tuấn Dũng — ThS. Tạ Chí Hiếu

---

## 1. Tổng quan dự án

**CraftLink** là sàn thương mại điện tử cho sản phẩm thủ công đặt làm riêng, nối ba nhóm người dùng trong một quy trình có trạng thái: khách hàng gửi brief, nghệ nhân báo giá và đăng bán, kiểm duyệt viên duyệt nội dung, quản trị viên giữ danh mục — tài khoản — quy định.

Khác biệt so với một sàn thông thường: **yêu cầu đặt làm là dữ liệu có trường bắt buộc, bài đăng phải qua hàng đợi duyệt, và mỗi quyết định kiểm duyệt dựa trên bản quy định đang có hiệu lực.**

Phân tích bài toán đầy đủ (P1–P4, O1–O7, thực thể dữ liệu, ma trận vòng đời trạng thái): [`docs/project-proposal.md`](./docs/project-proposal.md).
Bối cảnh thị trường dài hơn: [`docs/project-introduction.md`](./docs/project-introduction.md).
**Báo cáo tổng hợp của cả nhóm nằm trong một tệp duy nhất: [`docs/final-report.md`](./docs/final-report.md)** — mở khi nộp và khi Vấn đáp; mọi số liệu trong đó đo từ `git`, GitHub API và URL công khai, chi tiết phép đo ở [`docs/barem-audit.md`](./docs/barem-audit.md).

**Bảng màu chủ đạo:** Warm Terracotta `#C85A32`, Sage Green `#6A8D73`, Cream `#FDFAF6`, Charcoal `#241F1B`.

---

## 2. Thành viên và phân công

| STT | Thành viên | MSSV | Vai trò phụ trách | Màn (dòng kiểm kê) | Tệp HTML | Tính năng AI | Nhánh thật trên GitHub |
| :---: | :--- | :---: | :--- | :---: | :--- | :--- | :--- |
| 1 | **SV1** — Nguyễn Xuân Hưng | 2551060622 | Khách hàng (Buyer) | 6 (STT 1–6) | 10 tệp trong `KhachHang/` | AI tư vấn sản phẩm; AI Brief Assistant | `feature/sv1-buyer` |
| 2 | **SV2** — Dương Vũ Quân Minh | 2551060650 | Thợ thủ công (Maker) | 6 (STT 7–12) | 4 thư mục, 4 tệp `index.html` | AI Copywriter & SEO; AI Cost & Timeline Advisor (bộ quy tắc cục bộ) | `feature/sv2-maker-screens` |
| 3 | **SV3** — Nguyễn Đình Quang Minh | 2551060651 | Kiểm duyệt viên + Quản trị viên | 6 (STT 13–18) | 6 tệp trong `KiemDuyetVaQuanTri/` + 2 màn lỗi `404.html`, `403.html` ở gốc repo | AI Content Moderation; AI Report Triage; AI Policy Copilot | `feature/sv3-admin-screens` |
| — | **SV1 + SV2** | — | Đăng nhập / Đăng ký | 2 (ngoài bảng kiểm kê) | 5 tệp trong `DangNhapVaDangKy/` | — | `feature/sv2-maker-screens` (nơi đang chứa mã) |

Cách đếm "Màn" là số dòng trong bảng kiểm kê, không phải số tệp HTML: 6 + 6 + 6 = 18 dòng. SV1 có 10 tệp: chín tệp ứng với sáu dòng (ba dòng gộp hai tệp — `index` + `favorites`, `cart` + `checkout`, `orders` + `order-details`) và một trang khôi phục mật khẩu nằm ngoài bảng kiểm kê. SV2 có bốn tệp vì hai dòng dùng chung một trang (STT 8 nằm trong trang STT 7, STT 11 là khung xem trước của trang STT 10). Hai trang đăng nhập/đăng ký đứng ngoài bảng kiểm kê, có 5 tệp HTML gồm ba biến thể vai trò.

Hai màn tiện ích nằm ngoài 18 dòng kiểm kê, dựng theo trang 31 và 32 trong mockup Canva của nhóm: [`404.html`](./404.html) và [`403.html`](./403.html). `404.html` là quy ước của GitHub Pages — máy chủ tự phục vụ tệp này cho mọi đường dẫn thiếu — còn `403.html` được `KiemDuyetVaQuanTri/js/navigation.js` mở khi `cl_session` mang vai trò không đủ quyền. Dùng chung `css/error-pages.css` và `js/error-pages.js`, năm chức năng thật: chẩn đoán đường dẫn/tài khoản (lấy từ `location.pathname`, `document.referrer` và phiên đăng nhập), chỉ ra **đích thật gần nhất** cho bốn kiểu liên kết sai đã đo ở `docs/barem-audit.md` mục 6.1 (`forgot-password.html`, `video.md`, `docs/ai-usage -report.md`, thư mục `assest/`), ô tìm màn hình đánh không dấu trên danh mục 27 đường dẫn thật của ba phân hệ, nhật ký lỗi 20 bản ghi gần nhất trong Local Storage, và ma trận quyền ba vai trò đọc lại ngay khi phiên đổi ở tab khác. Mọi dữ liệu lấy từ URL chỉ được ghi bằng `textContent`, nên liên kết chứa thẻ HTML không chèn được mã. Trang lỗi **không** sửa hộ liên kết hỏng của phân hệ khác — đích vẫn thiếu trong mã nguồn của họ, chỉ khác là người dùng không bị dồn vào đường cụt. Chi tiết ở ghi chú "Cập nhật 27-10-2026 (hai màn lỗi)" trong `docs/screen-inventory.md`.

Bảng kiểm kê 18 màn hình, đủ 12 cột: [`docs/screen-inventory.md`](./docs/screen-inventory.md).
Phân công chi tiết: [`docs/sv1-assignment.md`](./docs/sv1-assignment.md), [`docs/sv2-assignment.md`](./docs/sv2-assignment.md), [`docs/sv3-assignment.md`](./docs/sv3-assignment.md).

---

## 3. Chức năng chính theo vai trò

**Khách hàng (SV1) — `KhachHang/`**
Danh sách sản phẩm có tìm kiếm, lọc theo danh mục và khoảng giá, sắp xếp; sản phẩm yêu thích; chi tiết sản phẩm; chọn nghệ nhân; tạo brief tùy biến; giỏ hàng; xác nhận đơn; danh sách đơn và chi tiết đơn kèm yêu cầu chỉnh sửa; khôi phục mật khẩu.

**Thợ thủ công (SV2) — `KhongGianNguoiBan/`**
Quản lý listing kèm biểu mẫu tạo mới và lưu trữ; hòm thư brief có lọc trạng thái; soạn proposal có khung xem trước đúng nội dung khách nhận; thiết lập hồ sơ gian hàng.

**Kiểm duyệt viên + Quản trị viên (SV3) — `KiemDuyetVaQuanTri/`**
Bảng điều khiển KPI và nhật ký hoạt động; hàng đợi kiểm duyệt với điểm rủi ro do AI đề xuất; trung tâm báo cáo vi phạm; quản lý danh mục ngành hàng; quản lý tài khoản và khóa/mở khóa; ban hành quy định nội dung.

**Dùng chung — `DangNhapVaDangKy/`**
Ba trang đăng nhập theo vai trò (khách hàng, nghệ nhân, quản trị), khóa tạm 60 giây sau 5 lần sai liên tiếp; trang đăng ký tài khoản nghệ nhân.

---

## 4. Công nghệ sử dụng

| Thành phần | Lựa chọn | Ghi chú |
| :--- | :--- | :--- |
| Ngôn ngữ | HTML5, CSS3, JavaScript ES6 (không framework) | Đa trang, mỗi màn một tệp HTML |
| Dữ liệu | JSON tĩnh + `localStorage` | Bộ mồi 15–20 bản ghi mỗi thực thể |
| Gọi dữ liệu | `fetch` qua lớp `CraftLinkAPI` | Có trạng thái Normal / Loading / Empty / Error / Success |
| AI | Serverless function `api/ai.js` (Vercel) + bộ quy tắc dự phòng | Khóa API chỉ đọc từ biến môi trường máy chủ |
| Biểu đồ | SVG/CSS dựng tay | Không phụ thuộc thư viện ngoài |
| Triển khai | Máy chủ tĩnh hoặc Vercel | Xem mục 12 |

Không có bước build: mở bằng máy chủ tĩnh là chạy. Toàn bộ phụ thuộc ngoài chỉ có font hệ thống.

---

## 5. Cấu trúc thư mục

```
.
├── index.html                  # Landing bốn lối vào vai trò
├── css/style.css               # Token dùng chung trong :root
├── KhachHang/                  # SV1 — 10 tệp HTML (9 màn Buyer + khôi phục mật khẩu)
├── KhongGianNguoiBan/          # SV2 — 4 thư mục màn (01…04), 6 dòng kiểm kê
├── DangNhapVaDangKy/           # Đăng nhập, đăng ký (dùng chung)
├── KiemDuyetVaQuanTri/         # SV3 — 6 màn + GopTrang.html + assets/data/
├── api/ai.js                   # Serverless AI endpoint
├── assets/data/                # Vị trí quy ước cho dữ liệu dùng chung
├── docs/                       # Đề xuất, kiểm kê, user flow, khai báo AI, Canva
├── videos/README.md            # Bảng liên kết video OBS (không chứa .mp4)
└── pages/                      # Vị trí quy ước trong barem; mã thật nằm ở ba thư mục vai trò
```

`pages/`, `assets/data/` là đường dẫn barem gọi tên đích danh; mã nguồn thật của ba phân hệ nằm trong thư mục vai trò để mỗi sinh viên giữ trọn phân hệ của mình. Mỗi thư mục quy ước có `README.md` ghi rõ tình trạng.

---

## 6. Hướng dẫn chạy cục bộ

1. Mở thư mục gốc bằng VS Code, bật **Live Server**, hoặc chạy:
   ```bash
   python -m http.server 8000
   ```
2. Mở `http://localhost:8000` — trang landing hiện bốn lối vào.
3. **Không** mở tệp bằng `file://`: trình duyệt sẽ chặn `fetch` tệp JSON khiến các màn hình rơi vào trạng thái lỗi.

Đường dẫn trực tiếp nếu cần vào nhanh một phân hệ:

| Vai trò | Đường dẫn |
| :--- | :--- |
| Quản trị / Kiểm duyệt | `KiemDuyetVaQuanTri/GopTrang.html` |
| Khách hàng | `KhachHang/index.html` |
| Người bán | `KhongGianNguoiBan/01-listing-management/index.html` |
| Đăng nhập | `DangNhapVaDangKy/01-dang-nhap/index.html` |

---

## 7. Tài khoản demo

Tài khoản mồi nằm trong `DangNhapVaDangKy/01-dang-nhap/js/khach-hang.js` (mảng `SEED_USERS`). Mảng này chứa mật khẩu demo dạng thô; lúc khởi tạo, hàm `hash()` băm SHA-256 kèm tiền tố `craftlink:` rồi mới ghi `passwordHash` vào `localStorage`. Mật khẩu dùng để đăng nhập không được lưu dạng thô. Sai 5 lần liên tiếp thì khóa đăng nhập 60 giây (`MAX_ATTEMPTS = 5`, `LOCK_MS = 60000`).

| Vai trò | Email | Mật khẩu |
| :--- | :--- | :--- |
| Khách hàng | `khachhang@craftlink.vn` | `Khach@123` |
| Nghệ nhân | `nghenhan@craftlink.vn` | `Nghenhan@123` |
| Quản trị viên | `admin@craftlink.vn` | `Admin@123` |

Đây là tài khoản demo của bài tập, không dùng cho môi trường thật.

---

## 8. Dữ liệu mẫu

| Thực thể | Tệp | Số bản ghi | Trạng thái có trong dữ liệu |
| :--- | :--- | :---: | :--- |
| Product | `KiemDuyetVaQuanTri/assets/data/products.json` | 20 | `pending`, `approved`, `revision` |
| Report | `KiemDuyetVaQuanTri/assets/data/reports.json` | 20 | `pending`, `verifying`, `handled`, `dismissed` |
| User | `KiemDuyetVaQuanTri/assets/data/users.json` | 20 | `active` đúng/sai, vai trò `buyer` / `maker` / `moderator` |
| Category | `KiemDuyetVaQuanTri/assets/data/categories.json` | 15 | `active` đúng/sai |
| Guideline | `KiemDuyetVaQuanTri/assets/data/guidelines.json` | 15 | Bốn trường `id`, `title`, `group`, `text`; chưa có trạng thái hay lịch sử phiên bản |

Lần tải đầu, `CraftLinkAPI` đọc JSON rồi ghi vào `localStorage` với tiền tố `craftlink:data:v1:`. Các lần sau đọc từ `localStorage`; muốn về dữ liệu gốc thì xóa khóa đó trong DevTools → Application → Local Storage.

---

## 9. Các tính năng AI trong sản phẩm

Sản phẩm có tám tính năng AI, phủ đủ ba nhóm barem yêu cầu (AI-1 gợi ý cho người dùng chính, AI-2 cảnh báo rủi ro/phân loại, AI-3 trợ lý cho vai trò vận hành). Chỉ ba tác vụ của phân hệ quản trị đi qua endpoint `api/ai.js`; năm tính năng còn lại là bộ quy tắc cục bộ chạy trên dữ liệu của chính trang và giao diện ghi rõ điều đó.

| Nhóm | Tính năng | Màn hình | Cơ chế | Người quyết định cuối |
| :--- | :--- | :--- | :--- | :--- |
| AI-1 | AI tư vấn sản phẩm | Danh sách sản phẩm (STT 1) | Bộ quy tắc cục bộ, `KhachHang/js/ai-advisor.js` | Khách hàng |
| AI-1 | AI Brief Assistant | Tạo brief tùy biến (STT 3) | Bộ quy tắc cục bộ trong `KhachHang/customize.html`; trang ghi rõ "chưa kết nối mô hình AI tạo sinh" | Khách hàng |
| AI-1 | Trợ lý AI trên trang đăng nhập | `DangNhapVaDangKy/01-dang-nhap/` (ngoài 18 dòng kiểm kê) | Bộ quy tắc khớp từ khoá `BOT_RULES` trong `js/khach-hang.js`, `js/nghe-nhan.js`, `js/quan-tri.js` | Người dùng đăng nhập |
| AI-2 | AI Content Moderation (`moderation-risk`) | Hàng đợi kiểm duyệt (STT 14) | `api/ai.js`, có bộ quy tắc dự phòng cục bộ | Kiểm duyệt viên |
| AI-2 | AI Report Triage (`report-triage`) | Trung tâm báo cáo (STT 15) | `api/ai.js`, có bộ quy tắc dự phòng cục bộ | Kiểm duyệt viên |
| AI-3 | AI Copywriter & SEO | Quản lý listing (STT 7–8) | Bộ quy tắc cục bộ, `KhongGianNguoiBan/js/ai/copywriter.js` | Nghệ nhân |
| AI-3 | AI Cost & Timeline Advisor | Soạn proposal (STT 10–11) | Bộ quy tắc cục bộ | Nghệ nhân |
| AI-3 | AI Policy Copilot (`policy-copilot`) | Quy định nội dung (STT 18) | `api/ai.js`, có bộ quy tắc dự phòng cục bộ | Quản trị viên |

Nguyên tắc chung: AI **không** tự duyệt, tự xóa hay tự khóa tài khoản. Kết quả AI chỉ điền vào bản nháp để người có quyền bấm xác nhận. Ba tác vụ của phân hệ quản trị hiện dòng **"Nguồn:"** để nói kết quả đến từ mô hình hay từ bộ quy tắc cục bộ; các trang của SV1 và SV2 ghi rõ trên giao diện rằng chúng chạy bằng bộ quy tắc cục bộ.

Cấu hình: `AI_API_URL`, `AI_API_KEY`, `AI_MODEL` — chỉ khai ở biến môi trường máy chủ, không có trong mã nguồn và không có trong repo.

---

## 10. Thiết kế và tài liệu

| Tài liệu | Đường dẫn |
| :--- | :--- |
| **Báo cáo tổng hợp một tệp** — gộp toàn bộ tài liệu của nhóm theo đúng thứ tự chấm của barem, kèm số đo và lệnh tái lập | [`docs/final-report.md`](./docs/final-report.md) |
| Bảng kiểm kê 18 màn hình (12 cột) | [`docs/screen-inventory.md`](./docs/screen-inventory.md) |
| Sitemap & User Flow toàn bộ vai trò | [`docs/user-flow.md`](./docs/user-flow.md) |
| **Bản chạy công khai** (GitHub Pages, nhánh `main`) | <https://nguyendinhquangminh.github.io/cse122-craftlink-team11/> |
| Board Trello công khai — 5 cột, 29 thẻ (18 thẻ TASK + 11 thẻ công việc), mọi thẻ có hạn hoàn thành và mô tả gắn nhánh · PR · video · màn hình. Trạng thái 27-10-2026: **19 thẻ "Đã gộp"**, 6 thẻ Backlog là việc của SV1/SV2 và cả nhóm, 1 thẻ "Chờ review" theo **PR #6**, 3 thẻ "Video & bảo vệ" | <https://trello.com/b/N2HBpswf> |
| Bảng công việc 18 thẻ (bản nguồn và cách đọc board) | [`docs/task-board.md`](./docs/task-board.md) |
| Kiểm toán repo theo từng dòng barem: ĐK1–ĐK5, mục 7.1/7.2/7.3, 8.1, VP-01…VP-07, liên kết chết | [`docs/barem-audit.md`](./docs/barem-audit.md) |
| Component Guide (màu, chữ, thành phần) | [`docs/component-guide.md`](./docs/component-guide.md) |
| Đề xuất dự án (P1–P4, O1–O7, thực thể, ma trận trạng thái) | [`docs/project-proposal.md`](./docs/project-proposal.md) |
| Canva SV1 — Khách hàng | <https://www.canva.com/design/DAHZAR9VxmU/dQQiBQ9-OPRH6Q5x8DdAkw/edit> · bản cũ ghi `DAHWyBVvS6U` — SV1 cần chốt một link |
| Canva SV2 — Thợ thủ công | <https://canva.link/rvxflfz5kgg0rg1> |
| Canva SV3 — sáu màn quản trị | <https://canva.link/zqtyq0qivogb17s> |
| Canva tổng hợp bài của nhóm | <https://canva.link/10ir1xtkau6li7b> |
| Bản thiết kế tổng hợp (nhóm) | <https://www.canva.com/design/DAHXD2jg9HU/7Q4trg1HDT246iMdGVyUXw/edit> |
| Bản render sơ đồ trong slide | `docs/diagrams/user-flow-sv3.svg` và `user-flow-sv3-forest.png` |

> Trong năm liên kết Canva ở trên, hai liên kết dài đang ở dạng `/design/…/edit` (quyền sửa), ba liên kết `canva.link/…` là liên kết rút gọn nên không nhìn URL mà biết được quyền xem. Trước khi nộp phải mở cả năm bằng **cửa sổ ẩn danh** và đổi sang quyền "Bất kỳ ai có liên kết đều xem được"; checklist mục 2 của barem đòi quyền xem công khai, không phải quyền sửa.

---

## 11. Responsive và khả năng tiếp cận

- **Điểm gãy:** điện thoại (≤ 680px), tablet (681–1000px), desktop (> 1000px). Cả ba phân hệ đều có `@media` riêng; thanh điều hướng quản trị chuyển thành nút mở drawer dưới 680px.
- **Bàn phím:** mọi thao tác chính chạm được bằng Tab; `:focus-visible` dùng viền 3px tương phản cao, không ẩn outline.
- **Ảnh:** ảnh nội dung đều có `alt` mô tả; ảnh trang trí đặt `alt=""` kèm `aria-hidden`.
- **Biểu mẫu:** mỗi ô nhập có `label` liên kết qua `for`/`id`; lỗi hiển thị ngay cạnh ô và gắn `aria-invalid`; hộp thoại dùng thẻ `<dialog>` gốc của HTML5 nên có sẵn ngữ nghĩa dialog, đóng được bằng Esc.
- **Thông báo:** vùng trạng thái dùng `role="status"` + `aria-live="polite"` để trình đọc màn hình đọc được thay đổi.
- **Chuyển động:** tôn trọng `prefers-reduced-motion`.

---

## 12. Triển khai

**Trạng thái: đã triển khai công khai trên GitHub Pages, ngày 27-10-2026.**

| Môi trường | URL |
| :--- | :--- |
| Công khai | <https://nguyendinhquangminh.github.io/cse122-craftlink-team11/> |
| Cục bộ | `http://localhost:8000` (hoặc mở trực tiếp từng tệp HTML) |

Cách đã làm, theo đúng thứ tự: gộp ba pull request của ba phân hệ (`#3` SV1 → `#2` SV2 → `#1` SV3) vào `dev`, mở pull request `dev` → `main` (PR #5) và gộp để **nhánh mặc định có đủ mã nguồn**, rồi Settings → Pages → *Deploy from a branch* → nhánh `main`, thư mục gốc. Tệp `.nojekyll` ở gốc repo tắt bước xử lý Jekyll để Pages phục vụ nguyên văn HTML/CSS/JS; nếu không có tệp đó, Jekyll bỏ qua mọi tệp bắt đầu bằng dấu gạch dưới và có thể biên dịch lại nội dung tĩnh. Thay đổi từ ngày 27-10 đi qua **PR #6** (`dev` → `main`) và phải có thành viên khác bấm Approve trước khi gộp.

Kiểm tra đã chạy trên URL công khai ngày 27-10-2026:

- Trang landing tải đúng bảng màu chủ đạo, **11/11 liên kết trên trang trả về 200**.
- Bốn lối vào hoạt động: `KhachHang/index.html`, `KhongGianNguoiBan/01-listing-management/index.html`, `KiemDuyetVaQuanTri/01-dashboard/index.html`, `KiemDuyetVaQuanTri/04-moderation-queue/index.html`, `DangNhapVaDangKy/01-dang-nhap/khach-hang.html`.
- `css/style.css`, `css/error-pages.css`, `js/error-pages.js` đều 200; không có tài nguyên 404 trong trang.
- Đường dẫn sai (`/duong-dan-sai`) trả **HTTP 404 kèm đúng trang `404.html` của nhóm**, không phải trang 404 mặc định của GitHub (`custom_404: true`).
- Lưu `cl_session` vai `customer` rồi mở hàng đợi kiểm duyệt → chuyển hướng `403.html?need=moderator&screen=…`; ma trận vai trò hiển thị, không tràn ngang ở 320 px.

Endpoint `api/ai.js` nằm trong repo dưới dạng mô-đun Node. GitHub Pages chỉ phục vụ tệp tĩnh nên yêu cầu `/api/ai.js` trả về chính mã nguồn chứ không chạy hàm; trên bản công khai, ba tác vụ AI của phân hệ quản trị vì thế lùi về bộ quy tắc dự phòng cục bộ và giao diện vẫn in dòng "Nguồn:" đúng thực tế. Muốn gọi mô hình thật phải deploy ở nền tảng có runtime (Vercel/Netlify) và đặt `AI_API_URL`, `AI_API_KEY`, `AI_MODEL` trong biến môi trường — không đưa khóa vào repo.

---

## 13. Video OBS

Mỗi sinh viên quay ba video, tương ứng ba trang chính của phân hệ mình phụ trách. Mỗi video có webcam, giọng thuyết trình, mở mã nguồn, chỉnh sửa trực tiếp, chạy thử responsive, rồi commit–push và đọc Task ID, Branch, Commit hash.

Danh sách và liên kết: [`videos/README.md`](./videos/README.md). Tệp `.mp4` không nằm trong repo (GitHub chặn tệp lớn và lịch sử repo sẽ phình); video để ở YouTube chế độ Không công khai.

---

## 14. Báo cáo sử dụng AI

[`docs/ai-usage-report.md`](./docs/ai-usage-report.md) khai báo: công cụ AI đã dùng, prompt thật, phần nào do AI sinh, AI sai ở đâu và sinh viên tự sửa gì. Báo cáo cấp phân hệ của SV3: [`KiemDuyetVaQuanTri/docs/ai-usage-report.md`](./KiemDuyetVaQuanTri/docs/ai-usage-report.md).

Nguyên tắc khai báo: chỉ ghi việc đã làm. Phần nào chưa có thì ghi "chưa có", không ghi "đã làm" cho đủ mục.

---

## 15. Hạn chế và hướng phát triển

**Hạn chế đang biết**

- Bản công khai chạy trên GitHub Pages (tệp tĩnh), nên `api/ai.js` không thực thi ở đó; ba tác vụ AI gọi qua máy chủ hiển thị kết quả của bộ quy tắc dự phòng cục bộ.
- `docs/sv1-assignment.md` và `docs/sv2-assignment.md` là mô tả của từng thành viên, nhóm chưa rà lần cuối sau khi ba nhánh gộp vào nhau.
- Bảng điều khiển mới nối một phần kho dữ liệu: hai thẻ *Nghệ nhân đang hoạt động* và *Cảnh báo hệ thống* tính thật từ dữ liệu chung; doanh thu, đơn hàng, biểu đồ và nhật ký vẫn là số liệu minh họa viết sẵn.
- Dữ liệu lưu trong `localStorage` của từng trình duyệt: hai người dùng hai máy không thấy dữ liệu của nhau, nên luồng brief → proposal chỉ minh hoạ được trên cùng một máy.
- Quy định nội dung chưa có lịch sử phiên bản và chưa có bước "xuất bản" riêng; lưu là có hiệu lực ngay.
- Endpoint `api/ai.js` chưa gắn khóa trên môi trường triển khai, nên bản demo chạy bằng bộ quy tắc cục bộ.
- Trang `KhachHang/forgot password.html` (SV1 thêm ngày 26-10) **chưa chạy được**: trang nạp `js/auth-config.js` và `js/auth-service.js` — hai tệp này **không tồn tại ở bất kỳ nhánh nào** — nên `window.CLAuth` không bao giờ được định nghĩa và `js/forgot password.js` dừng ngay ở dòng 2 với dòng chữ "Không tải được thành phần xác thực" (`js/common.js` và `js/forgot password.js` thì có thật). Tệp CSS mà trang trỏ tới cũng ghi sai tên (`css/forgot passwork.css`, thiếu dấu cách và sai chính tả), nên trang không có định dạng. Tên tệp HTML còn chứa dấu cách. Trang nằm ngoài 18 dòng kiểm kê và chưa được liên kết từ trang đăng nhập.
- Nút "Quên mật khẩu?" trên cả ba trang đăng nhập (`khach-hang.html`, `nghe-nhan.html`, `quan-tri.html`) và liên kết "khôi phục mật khẩu" trong `02-dang-ky/js/main.js` trỏ tới `forgot-password.html` (dấu gạch ngang) — tệp này **không tồn tại** ở bất kỳ nhánh nào; bản thật tên là `KhachHang/forgot password.html` (dấu cách, khác thư mục). Cả bốn chỗ bấm đều rơi vào trang 404, đúng loại lỗi mà mục 7.3 cấm trên bản triển khai công khai. Chi tiết và cách sửa: [`docs/barem-audit.md`](./docs/barem-audit.md) mục 6.1.

**Hướng phát triển**

- Thay `localStorage` bằng backend thật để dữ liệu dùng chung giữa các vai trò và nhiều thiết bị.
- Thêm lịch sử phiên bản cho quy định nội dung, kèm người ban hành và thời điểm hiệu lực.
- Đồng bộ thời gian thực giữa các tab bằng `storage` event / `BroadcastChannel` cho hàng đợi kiểm duyệt.
- Xuất báo cáo kiểm duyệt ra CSV và bản in.

---

## Giấy phép

Xem [`LICENSE`](./LICENSE).
