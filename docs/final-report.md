# BÁO CÁO TỔNG HỢP DỰ ÁN CRAFTLINK

**Học phần:** Phát triển Ứng dụng Web Cơ bản (CSE122) — Nhóm 11 · **Giảng viên:** ThS. Kiều Tuấn Dũng — ThS. Tạ Chí Hiếu
**Ngày lập báo cáo:** 27-10-2026 · **Bản chạy công khai:** <https://nguyendinhquangminh.github.io/cse122-craftlink-team11/>

Tệp này gộp toàn bộ nội dung báo cáo của nhóm vào một chỗ, theo đúng thứ tự chấm của *Barem Chấm Điểm & Quy Chế Vấn Đáp BTL* (45 trang). Mỗi con số dưới đây **đo từ `git`, GitHub REST API, HTTP thật trên URL công khai hoặc từ trình duyệt**, không phải ước lượng; lệnh để tái lập ở Phụ lục A. Chi tiết từng phép đo và đường dẫn tệp: `docs/barem-audit.md`.

> **Cập nhật 27-10-2026 sau hotfix `960a548`.** PR #6 đã được `hungxuan0411-cloud` **APPROVED** lúc 02:37 UTC (09:37 VN) và gộp vào `main` lúc 03:01 UTC (10:01 VN) với merge commit `3eb8e53`. Ngay sau đó nhóm sửa một loạt lỗi trong commit **`960a548`** (12 tệp, +62/−20): chuyển hướng sau đăng nhập cho cả ba vai, sửa trang quên mật khẩu thành bản demo chạy được, sửa toàn bộ đường dẫn ảnh/CSS hỏng, thêm guard vai trò cho `GopTrang.html` và cập nhật câu chữ trang 403. Commit này được **push thẳng lên `main`, không qua PR** — khác quy trình các PR trước; đây là ngoại lệ có chủ đích của nhóm trong phiên sửa lỗi, ghi lại để không khai sai khi Vấn đáp. Các mục 3.3, 5.2, 7.3 và 8 dưới đây đã cập nhật theo trạng thái mới; số đo 176 commit là mốc trước PR #6, còn mốc `960a548` có **185 commit** (GitHub REST API, 27-10-2026). Sau đó PR #7 (tài liệu) gộp thành `c4516eb` và PR #8 gộp thành `f4ffac8`; sau mỗi lần gộp nhóm fast-forward `dev` lên đúng `main` nên hai nhánh trùng nhau; PR #4 được đóng cùng ngày. `main` có **189 commit** tại mốc `c4516eb` (178 không-merge + 11 merge); mỗi PR tài liệu sau đó cộng thêm số commit của nó và 1 merge. Mốc chốt lúc đóng gói: `7c17fa3` (sau PR #11), **197 commit** = 182 không-merge + 15 merge; con số hiện hành luôn kiểm bằng `git rev-list --count origin/main`.

---

## 0. Thông tin định danh

| Hạng mục | Giá trị thật |
|---|---|
| Repository (công khai) | <https://github.com/NguyenDinhQuangMinh/cse122-craftlink-team11> |
| Nhánh mặc định | `main` = `dev` — nhóm fast-forward `dev` lên đúng `main` sau **mỗi** lần gộp tài liệu, nên hash của hai nhánh luôn trùng và tăng dần; mốc đo chính: `c4516eb` (sau PR #7), `f4ffac8` (sau PR #8); trước đó `main` = `960a548`, hotfix sau merge PR #6 `3eb8e53`. Hash hiện hành: `git ls-remote origin refs/heads/main refs/heads/dev` |
| Nhánh làm việc | `dev`, `feature/sv1-buyer`, `feature/sv2-maker-screens`, `feature/sv3-admin-screens`, `docs/sv1-sync` |
| Bản deploy | GitHub Pages, *Deploy from a branch* → `main` / thư mục gốc, `status = built`, `custom_404 = true`, kèm `.nojekyll` (`3e14704`) |
| Bảng công việc | <https://trello.com/b/N2HBpswf> — `permissionLevel = "public"`, 5 cột, 29 thẻ |
| Lịch sử | **197 commit** tại mốc `7c17fa3` (182 không-merge + 15 merge); mốc trước: 189 tại `c4516eb`, 185 tại `960a548`, 176 trước PR #6. Hoạt động ở **11 ngày thuộc 3 tuần**; mỗi PR tài liệu cộng thêm commit + 1 merge, nên con số hiện hành luôn kiểm bằng `git rev-list --count origin/main` |
| Sản phẩm | **29 tệp HTML**, **8 tính năng AI**, **5 bộ dữ liệu JSON** (15–20 bản ghi) |
| Video | **9 link YouTube** (3 sinh viên × 3 video), tệp gốc `.mp4` nằm trên máy từng người |

| Thành viên | MSSV | GitHub | Vai trò phụ trách | Phân hệ | Nhánh |
|---|---|---|---|---|---|
| Nguyễn Xuân Hưng (SV1) | 2551060622 | `hungxuan0411-cloud` | Khách hàng | `KhachHang/` | `feature/sv1-buyer` |
| Dương Vũ Quân Minh (SV2) | 2551060650 | `minhd2577-droi` | Thợ thủ công + đăng nhập/đăng ký | `KhongGianNguoiBan/`, `DangNhapVaDangKy/` | `feature/sv2-maker-screens` |
| Nguyễn Đình Quang Minh (SV3) | 2551060651 | `NguyenDinhQuangMinh` | Kiểm duyệt viên + Quản trị viên, QA/hợp nhất/deploy | `KiemDuyetVaQuanTri/`, `404.html`, `403.html` | `feature/sv3-admin-screens` |

---

## 1. Tư duy sản phẩm (Tiêu chí 1 — 1.00đ)

### 1.1 Câu chuyện thực tế

Một xưởng gốm ba người ở Bát Tràng nhận đơn qua Zalo. Khách gửi ảnh một chiếc cốc trên Pinterest kèm câu "làm giống vầy, cao hơn chút"; xưởng trả lời bằng tin nhắn thoại; bốn tuần sau khách nói "không giống ảnh". Không ai sai, nhưng **không ai giữ được bản mô tả nào để đối chiếu**: yêu cầu nằm rải trong 60 tin nhắn, giá chốt bằng lời, tiến độ hỏi miệng. Ba hệ quả lặp lại ở mọi xưởng nhỏ — yêu cầu không có hình dạng cố định, bài đăng không có cửa kiểm soát, tranh chấp không có hồ sơ — là lý do CraftLink tồn tại: biến ba điểm đứt đó thành **dữ liệu có trạng thái**.

### 1.2 Phát biểu vấn đề P1–P4

| Mã | Nhóm người dùng | Vấn đề | Hệ thống trả lời bằng |
|---|---|---|---|
| **P1** | Khách hàng đặt làm | Ý tưởng không có cấu trúc (chất liệu, kích thước, ngân sách, hạn) nên mỗi lần đặt phải kể lại từ đầu | Brief có trường bắt buộc + gợi ý ngân sách; chọn nghệ nhân theo tiêu chí đã nhập |
| **P2** | Thợ thủ công | Brief đến rải rác, không có trạng thái "đã đọc / đã phản hồi" nên brief cũ bị bỏ quên | Hòm thư brief lọc theo trạng thái; proposal soạn và xem trước trong một màn |
| **P3** | Kiểm duyệt viên | Duyệt bằng mắt từng bài, không có căn cứ ghi lại; bài vi phạm giống nhau bị xử lý khác nhau giữa các ca | Hàng đợi có điểm rủi ro + lý do + nguồn kết luận; từ chối buộc ghi chú |
| **P4** | Quản trị viên | Quy định nội dung nằm trong tệp rời, không biết bản nào đang hiệu lực; không có nơi khóa tập trung | Quy định có trạng thái và người xác nhận; khóa danh mục/tài khoản có hiệu lực trên dữ liệu chung |

### 1.3 Mục tiêu O1–O7 và cách đo

| Mã | Mục tiêu | Bằng chứng đo được |
|---|---|---|
| O1 | Chuẩn hóa yêu cầu đặt làm thành dữ liệu có trường bắt buộc | Brief thiếu trường bị chặn tại chỗ, lỗi hiển thị cạnh trường |
| O2 | Rút ngắn đường brief → báo giá | Brief xuất hiện trong hòm thư người bán; proposal + xem trước cùng một màn (STT 10–11) |
| O3 | Mọi bài đăng qua kiểm duyệt trước khi hiển thị | `products.json`: **14/20** bản ghi `pending`; chỉ `approved` mới là đã duyệt |
| O4 | Quyết định kiểm duyệt có căn cứ, truy vết được | Mỗi kết quả AI ghi rõ "Nguồn: mô hình" hay "bộ quy tắc cục bộ"; từ chối lưu `note` |
| O5 | Quy định nội dung có một bản đang hiệu lực | Quy định lưu kèm người xác nhận; hàng đợi đọc `guidelines` làm căn cứ |
| O6 | Quản trị tập trung danh mục và tài khoản | Khóa đổi cờ `active` trong dữ liệu, có hiệu lực ở lần tải kế tiếp |
| O7 | Giao diện dùng được trên điện thoại và bàn phím | **27/29 trang** không cuộn ngang ở 5 cỡ; Tab tới mọi thao tác chính, có `:focus-visible` |

### 1.4 Thực thể dữ liệu (5 thực thể đang chạy thật)

| Thực thể | Tệp mồi | Bản ghi | Trường | Khóa `localStorage` |
|---|---|---:|---|---|
| Product | `KiemDuyetVaQuanTri/assets/data/products.json` | 20 | `id, name, maker, price, age, image, description, status, note, category` | `craftlink:data:v1:products` |
| Report | `…/reports.json` | 20 | `id, sender, target, type, reason, date, status` | `…:reports` |
| User | `…/users.json` | 20 | `name, email, role, date, active, image` | `…:users` |
| Category | `…/categories.json` | 15 | `id, name, children, products, active, image` | `…:categories` |
| Guideline | `…/guidelines.json` | 15 | `id, title, group, text` | `…:guidelines` |

Tất cả nằm trong dải **15–25 bản ghi** barem đòi, là sản phẩm gốm thủ công có tên tiếng Việt, **0 chuỗi chữ giả** (Lorem ipsum / `test 1`). Quan hệ: `Product.category → Category.id`; `Product.maker → User.name (role=maker)`; `Report.target → Product.name` hoặc `User.name` theo `Report.type`. SV1 và SV2 lưu dữ liệu phân hệ mình trực tiếp trong `localStorage` (`CART_KEY`, `FAVORITES_KEY`, `KHO_GIAN_HANG`, `USERS_KEY`…) — barem cho phép "JSON / localStorage / MockAPI".

### 1.5 Ma trận vòng đời trạng thái (giá trị thật trong mã)

| Thực thể | Trạng thái | Ai đổi · ở đâu | Đường đi tiếp |
|---|---|---|---|
| Product | `pending` → `approved` / `revision` / `rejected` | Kiểm duyệt viên · Hàng đợi kiểm duyệt (STT 14) | `revision` quay về `pending` sau khi người bán sửa; `rejected` buộc ghi `note` |
| Report | `pending` → `verifying` → `handled` / `dismissed` | Kiểm duyệt viên · Trung tâm báo cáo (STT 15) | `handled`, `dismissed` là trạng thái kết thúc |
| User | `active = true/false` | Quản trị viên · Quản lý tài khoản (STT 17) | Khóa làm mất quyền đăng nhập ở hai vai trò kia |
| Category | `active = true/false` | Quản trị viên · Quản lý danh mục (STT 16) | Danh mục khóa không chọn được khi đăng bài |
| Guideline | Nháp AI → Đã lưu → Đã xóa | Quản trị viên · Quy định nội dung (STT 18) | **Chưa có** lịch sử phiên bản và nút *Xuất bản*; lưu là hiệu lực ngay (khai ở mục 8) |

Mã nguồn tham chiếu: `KiemDuyetVaQuanTri/04-moderation-queue/js/main.js:200` (`statusNames`), `05-report-center/js/main.js:162-167` (`labels`).

### 1.6 Bốn cạnh nối chứng minh các màn không rời rạc

| Cạnh nghiệp vụ | Màn hai đầu | Bằng chứng trong mã |
|---|---|---|
| Khách tạo Brief → Nghệ nhân nhận brief, gửi proposal | STT 3 → STT 9–10 | `KhachHang/customize.html` → `KhongGianNguoiBan/02-brief-inbox`, `03-proposal-editor` |
| Nghệ nhân nộp bài → bài vào hàng đợi `pending` | STT 7–8 → STT 14 | `products.json` 14/20 `pending`; `04-moderation-queue/js/main.js:200` |
| Quản trị viên ban hành quy định → hàng đợi dùng làm căn cứ | STT 18 → STT 14 | `04-moderation-queue/js/main.js:158` nạp `guidelines`, `:349` đưa vào ngữ cảnh AI; `js/ai-fallback.js:60` |
| Quản trị viên khóa tài khoản → khách/nghệ nhân mất quyền | STT 17 → STT 1, 7 | `users.json` trường `active`; `03-user-management` đổi cờ này |

Sơ đồ đầy đủ (sitemap 18 màn + luồng xuyên vai, mã nguồn Mermaid): `docs/user-flow.md`; bản render cho slide: `docs/diagrams/user-flow-sv3-forest.png` / `.svg`.

### 1.7 Thiết kế

| Thành phần | Trạng thái |
|---|---|
| Bảng kiểm kê 18 màn, **đủ 12 cột** | `docs/screen-inventory.md` |
| Sitemap + User Flow toàn bộ role | `docs/user-flow.md` |
| Component Guide (token màu, chữ, 8 nhóm thành phần, 3 trạng thái dữ liệu, hộp thoại AI 6 bước) | `docs/component-guide.md` |
| Mockup desktop + mobile trên Canva | 5 liên kết ở Phụ lục B; **trang Component Guide chưa vẽ trong Canva** |
| Bảng màu chủ đạo | Warm Terracotta `#C85A32` · Sage Green `#6A8D73` · Cream `#FDFAF6` · Charcoal `#241F1B` |
| Tương phản | `--muted #5a6472` trên nền `#faf8f5` = **6.0:1**, vượt ngưỡng WCAG AA 4.5:1 |

---

## 2. Sản phẩm giao diện (Tiêu chí 2, 3 — phạm vi và chức năng)

### 2.1 18 màn hình độc lập + 10 màn ngoài bảng kiểm kê

| Nhóm | Số lượng | Liệt kê |
|---|---:|---|
| Ứng 18 dòng kiểm kê | **19 tệp** | `KhachHang/` 9 tệp cho STT 1–6 · `KhongGianNguoiBan/` 4 tệp cho STT 7–12 · `KiemDuyetVaQuanTri/0*-*/` 6 tệp cho STT 13–18 |
| Đăng nhập / đăng ký (dùng chung) | 5 tệp | `DangNhapVaDangKy/01-dang-nhap/` (`index` + 3 biến thể vai trò), `02-dang-ky/` |
| Màn ngoài kiểm kê | 5 tệp | `KhachHang/forgot password.html` · `KiemDuyetVaQuanTri/GopTrang.html` · `404.html` · `403.html` · landing `index.html` |
| **Tổng** | **29 tệp HTML** | Đếm bằng `git ls-files '*.html'` |

Hai dòng kiểm kê không có tệp riêng: STT 8 là biểu mẫu *+ Tạo listing mới* trong trang STT 7; STT 11 là khung xem trước ở bước 4 của wizard STT 10. Hai trang lỗi `404.html` / `403.html` **không** đánh số thành dòng 19–20 vì bảng 18 dòng là đơn vị đối chiếu của tiêu chí 8.1.

### 2.2 Phân công theo người

| Người | Vai trò | Màn (dòng kiểm kê) | Tệp HTML | Tính năng AI |
|---|---|---:|---:|---|
| SV1 | Khách hàng | 6 (STT 1–6) | 10 | AI tư vấn sản phẩm · AI Brief Assistant (bộ quy tắc cục bộ) |
| SV2 | Thợ thủ công (+ đăng nhập/đăng ký) | 6 (STT 7–12) | 4 | AI Copywriter & SEO · AI Cost & Timeline Advisor (bộ quy tắc cục bộ) |
| SV3 | Kiểm duyệt viên + Quản trị viên | 6 (STT 13–18) | 6 (+2 màn lỗi) | AI Content Moderation · AI Report Triage · AI Policy Copilot (gọi `api/ai.js`) |

Cách đếm cột "Màn" là **số dòng kiểm kê** (6+6+6=18), không phải số tệp HTML (10/4/7) — điểm này hay bị hỏi, ghi rõ để không đọc nhầm thành khai sai.

### 2.3 Công nghệ và cấu trúc

| Thành phần | Lựa chọn |
|---|---|
| Ngôn ngữ | HTML5, CSS3, JavaScript ES6 — **không framework, không bước build** |
| Dữ liệu | JSON tĩnh + `localStorage`; **97 lời gọi `localStorage`** trên 14 tệp JS |
| Lớp truy cập dữ | `CraftLinkAPI` (`fetch`) với 4 trạng thái Normal / Loading / Empty / Error / Success |
| AI | Serverless `api/ai.js` (chuẩn OpenAI-compatible, buộc trả JSON) + bộ quy tắc dự phòng cục bộ |
| Biểu đồ | SVG/CSS dựng tay, không thư viện ngoài |
| Triển khai | GitHub Pages (đang chạy) · Vercel/Netlify nếu cần runtime cho `api/ai.js` |

```
├── index.html          # Landing bốn lối vào vai trò
├── css/style.css       # Token chung cho landing + 404 + 403
├── KhachHang/          # SV1        ├── KhongGianNguoiBan/   # SV2
├── DangNhapVaDangKy/   # dùng chung ├── KiemDuyetVaQuanTri/  # SV3 (+ assets/data/)
├── api/ai.js           # Serverless AI endpoint
├── docs/  videos/README.md  pages/  assets/data/
```

### 2.4 Chức năng chính theo vai trò

**Khách hàng (SV1):** danh sách sản phẩm có tìm kiếm / lọc danh mục + khoảng giá / sắp xếp; yêu thích; chi tiết sản phẩm; tạo brief tùy biến; chọn nghệ nhân; giỏ hàng và xác nhận đơn; danh sách đơn + chi tiết đơn kèm yêu cầu chỉnh sửa.
**Thợ thủ công (SV2):** quản lý listing kèm biểu mẫu tạo mới và lưu trữ; hòm thư brief lọc theo trạng thái; soạn proposal có khung xem trước đúng nội dung khách nhận; thiết lập hồ sơ gian hàng.
**Kiểm duyệt + Quản trị (SV3):** bảng điều khiển KPI và nhật ký; hàng đợi kiểm duyệt với điểm rủi ro AI; trung tâm báo cáo; quản lý danh mục; quản lý tài khoản và khóa/mở khóa; ban hành quy định nội dung.
**Dùng chung:** ba trang đăng nhập theo vai trò, băm SHA-256 trước khi ghi `localStorage`, **khóa 60 giây sau 5 lần sai** (`MAX_ATTEMPTS = 5`, `LOCK_MS = 60000`); trang đăng ký nghệ nhân.

Tài khoản demo: `khachhang@craftlink.vn / Khach@123` · `nghenhan@craftlink.vn / Nghenhan@123` · `admin@craftlink.vn / Admin@123`.

---

## 3. Chất lượng kỹ thuật — số đo trên bản công khai (Tiêu chí 4, 5)

### 3.1 Responsive: **145 phép đo**, 27/29 trang sạch

Đo trên `https://nguyendinhquangminh.github.io/...` bằng iframe cùng nguồn ở **320 / 375 / 640 / 768 / 1280 px**, lấy `documentElement.scrollWidth` so `clientWidth`. Cỡ 640 px là đại diện trung thực cho "phóng to 200% trên màn 1280 px" mà checklist mục 6 yêu cầu.

| Trang hỏng | 320 px | Nguyên nhân (đã định vị) | Cách sửa đề xuất |
|---|---:|---|---|
| `KhachHang/customize.html` | **338** | `section.panel.customize-input-panel` | `min-width: 0` / `overflow-wrap: anywhere` |
| `KhachHang/forgot password.html` | **323** | `button.pw-toggle` | `min-width: 0` |

Hai trang còn lỗi đều thuộc SV1 và chỉ hỏng ở một cỡ. *Ghi chú phương pháp:* phép đo đầu có lấy `body.scrollWidth` nên báo nhầm hai trang quản trị; thực tế các trang đó đặt `html { overflow-x: clip }` và bảng rộng nằm trong hộp `overflow-x: auto`, **không có thanh cuộn ngang nào** — số liệu trên dùng `documentElement`, đúng bằng thứ người xem nhìn thấy.

### 3.2 Ngữ nghĩa và khả năng tiếp cận (quét 29 tệp HTML)

| Chỉ số | Kết quả |
|---|---|
| `<img>` thiếu `alt` | **0 / 65** |
| `<input>` (bỏ hidden/submit/button) | 85 — **75** có `<label for>` khít `id`, **10** có `aria-label`, **0 nhãn mồ côi** |
| Trang thiếu thẻ ngữ nghĩa (`header`/`nav`/`main`/`footer`, hoặc ≠1 `<h1>`) | **6 / 29**, tất cả thuộc SV2: `01-dang-nhap/index.html` (thiếu cả 4 thẻ), `02-dang-ky/index.html` (2 `<h1>`), 4 trang `KhongGianNguoiBan/` (thiếu `<footer>`) |
| Bàn phím / Esc | Đạt trên 6 màn SV3 + hai trang lỗi: skip-link, `:focus-visible` viền 3px, `<dialog>` native đóng bằng Esc |
| Thông báo | `role="status"` + `aria-live="polite"`; tôn trọng `prefers-reduced-motion` |

### 3.3 Bảo mật

| Kiểm tra | Kết quả |
|---|---|
| Quét mẫu dò khóa (`sk-`, `AIza`, `ghp_`, `AKIA`, `Bearer …`) trên **200 tệp được Git theo dõi** | **0 khớp**. `.env.example` chỉ khai tên biến, giá trị rỗng; khóa thật ở biến môi trường máy chủ |
| XSS: nhập `<img src=x onerror=alert(1)>` | **Không có lỗi.** 7 chỗ `innerHTML` của SV3 đi qua `esc()`; SV1/SV2 dùng `escapeHtml`; hai trang lỗi ghi mọi dữ liệu lấy từ URL bằng `textContent` |
| Tệp nặng / rác repo | 0 tệp `.mp4` được theo dõi; 0 chuỗi chữ giả trong `*.html`, `*.js`, `*.json` |

### 3.4 Điểm yếu đo được của tiêu chí 4: bảng token chưa dùng chung

| Tệp khai `:root` | Số biến | Chủ quản |
|---|---:|---|
| `css/style.css` (gốc) | 39 | SV3 — chỉ landing + `404` + `403` nạp |
| `KhachHang/css/style.css` · `KhachHang/css/forgot password.css` | 18 · 19 | SV1 |
| `DangNhapVaDangKy/01-dang-nhap/css/{khach-hang,nghe-nhan,quan-tri}.css` · `DangNhapVaDangKy/assets/css/style.css` | 19 mỗi tệp | SV2 |
| `KhongGianNguoiBan/css/style.css` | 10 | SV2 |
| `KiemDuyetVaQuanTri/css/shared/{admin,moderator}/theme.css` | 6 + 6 | SV3 |
| `KiemDuyetVaQuanTri/css/gop-trang.css` | 0 biến, 2 màu hex | SV3 |

Đo theo tệp: **12 tệp CSS có khối `:root`**, trong đó **11 tệp tự khai màu hex trong `:root`**, và **0 màu hex chung cho cả 11 tệp** — gom lại thành **6 bảng token theo phân hệ**. Font stack 5 loại (`Be Vietnam Pro`, `Inter`, `DM Sans`, `Fraunces`, `Georgia`/`Segoe UI`). Hướng xử lý đã ghi ở `css/README.md` (hợp nhất token về `css/style.css`, đổi dần sang biến chung, đo lại 5 cỡ cho 29 trang). Không làm sát giờ nộp vì sẽ phá toàn bộ kết quả đã kiểm chứng ở 3.1–3.2.

---

## 4. AI trong sản phẩm (Tiêu chí 6 — 6.1→6.3)

### 4.1 Tám tính năng, phủ đủ ba nhóm barem

| Nhóm | Tính năng | Màn | Cơ chế | Người quyết cuối |
|---|---|---|---|---|
| AI-1 gợi ý | AI tư vấn sản phẩm | STT 1 | Bộ quy tắc cục bộ `KhachHang/js/ai-advisor.js` | Khách hàng |
| AI-1 gợi ý | AI Brief Assistant | STT 3 | Bộ quy tắc cục bộ trong `customize.html` | Khách hàng |
| AI-1 gợi ý | Trợ lý trên trang đăng nhập | ngoài kiểm kê | `BOT_RULES` khớp từ khoá | Người đăng nhập |
| AI-2 rủi ro | **AI Content Moderation** (`moderation-risk`) | STT 14 | `api/ai.js` + dự phòng cục bộ | Kiểm duyệt viên |
| AI-2 rủi ro | **AI Report Triage** (`report-triage`) | STT 15 | `api/ai.js` + dự phòng cục bộ | Kiểm duyệt viên |
| AI-3 vận hành | AI Copywriter & SEO | STT 7–8 | Bộ quy tắc `KhongGianNguoiBan/js/ai/copywriter.js` | Nghệ nhân |
| AI-3 vận hành | AI Cost & Timeline Advisor | STT 10–11 | Bộ quy tắc cục bộ | Nghệ nhân |
| AI-3 vận hành | **AI Policy Copilot** (`policy-copilot`) | STT 18 | `api/ai.js` + dự phòng cục bộ | Quản trị viên |

Barem 6.1 đòi tối thiểu ba tính năng; nhóm có **tám**, trong đó **ba** đi qua mô hình (in đậm). Năm tính năng còn lại là bộ quy tắc cục bộ và **giao diện tự ghi rõ điều đó** — không tính năng nào được khai là "đã gọi mô hình" khi chưa gọi.

### 4.2 Chuỗi trải nghiệm 6 bước bắt buộc

`Input → Processing → Output → Explainability → User control → Save/Apply`, cài một lần trong `KiemDuyetVaQuanTri/js/ai-client.js` cho cả ba màn (timeout 25 giây). Bằng chứng mã: `04-moderation-queue/js/main.js:220` in `%` độ tin cậy + danh sách yếu tố + khuyến nghị; `:337` tiêu đề "AI phân loại rủi ro sản phẩm"; `:365` ghi quyết định kèm dấu vết "AI hỗ trợ".

**AI không tự duyệt, không tự xóa, không tự khóa tài khoản** — kết quả chỉ điền vào bản nháp, người có quyền mới bấm xác nhận. Khi máy chủ chưa có khóa hoặc trang chạy tĩnh, `js/ai-fallback.js` phân tích bằng bộ quy tắc trên đúng bản ghi đang mở và giao diện in dòng **"Nguồn:"** nói rõ kết quả đến từ mô hình hay từ bộ quy tắc. Đây là giới hạn công khai, không phải lỗi ẩn.

### 4.3 Kịch bản AI Failure / Uncertainty

Đã chạy thật: không có khóa API → fallback trả kết quả kèm nhãn "bộ quy tắc phân tích cục bộ"; độ tin cậy thấp → hiển thị yếu tố dẫn tới kết luận và để ngỏ ba lựa chọn *Dùng / Tạo lại / Bỏ*; `report-triage` **không đề xuất mức phạt** (`js/ai-fallback.js:182-215`) vì mức phạt là thẩm quyền của kiểm duyệt viên.

### 4.4 Khai báo sử dụng AI (ĐK5)

`docs/ai-usage-report.md` (cấp nhóm) + `KiemDuyetVaQuanTri/docs/ai-usage-report.md` và `KhongGianNguoiBan/docs/ai-usage-report.md` (cấp phân hệ). Nội dung: công cụ (**Qoder** cho cả ba; SV1 khai thêm ChatGPT và Claude), prompt nguyên văn, bảng "AI sinh / cách kiểm chứng", chỗ AI làm sai và sinh viên tự sửa. Nguyên tắc: **chỉ ghi việc đã làm**, phần chưa có ghi "chưa có". Hai khoảng trống tự khai: **chưa ghi số phiên bản công cụ**, và **nhật ký prompt không nằm trong repo** — khi Vấn đáp nói thẳng, không tô vẽ thành "có log đầy đủ".

---

## 5. Quy trình làm việc (Tiêu chí 7 — 1.00đ)

### 5.1 Bảng công việc (7.1 — 0.25đ)

Board **<https://trello.com/b/N2HBpswf>** dựng ngày 26-10-2026, `permissionLevel = "public"` (gọi ẩn danh HTTP 200). **29 thẻ / 5 cột**, trạng thái đo lại từ `trello.com/b/N2HBpswf.json` ngày 27-10-2026 sau khi PR #6 được Approve rồi gộp:

| Cột | Thẻ | Nội dung |
|---|---:|---|
| Backlog | 6 | 2× FIX (liên kết chết — phần của SV1 đã xong trong `960a548`, thẻ chưa chuyển) · 2× DOCS (khai AI, quyền Canva) · VIDEO của SV1 · SWITCHER |
| Đang làm | 0 | Toàn bộ phần SV3 đã gộp xong |
| Chờ review | 0 | Trống — thẻ **REVIEW** đã sang "Đã gộp" sau lượt Approve 09:37 rồi Merge 10:01 (`3eb8e53`) |
| Đã gộp | 20 | 15 thẻ TASK + SCREENS + MERGE + DEPLOY + VIDEO·SV2 + **REVIEW** (mô tả thẻ ghi `3eb8e53`) |
| Video & bảo vệ | 3 | TASK-14, 16, 18 (SV3 — đã có link video, chờ vòng bảo vệ) |

**29/29 thẻ có hạn hoàn thành và mô tả** gắn `Nhánh · PR · Video · Màn hình` (+ `AI:` với màn có tính năng AI); **23/29** tick "Đánh dấu hoàn thành". Hạn của 18 thẻ TASK lấy theo **ngày commit thật đưa tệp HTML lần đầu vào nhánh** (SV3: 13-10; SV1/SV2: 25-10, kiểm chứng bằng `git log --diff-filter=A`); thẻ quy trình hạn 27-10. Thẻ MERGE/DEPLOY/SCREENS/REVIEW mang merge hash thật nên mở ngược được trên GitHub.

### 5.2 Nhánh, commit, PR (7.2 — 0.45đ)

**Chuỗi gộp đã thực hiện và push ngày 27-10-2026** (giữ merge commit, không squash):

| Bước | Merge commit | Xung đột |
|---|---|---|
| `feature/sv1-buyer` → `dev` (PR #3) | `ec74e6b` | 0 |
| `feature/sv2-maker-screens` → `dev` (PR #2) | `a5a51e6` | 2 tệp `.md` |
| `feature/sv3-admin-screens` → `dev` (PR #1) | `8eb9f51` | 4 tệp `.md` |
| `dev` → `main` (PR #5) | `da3131b` | 0 |
| `.nojekyll` cho Pages | `3e14704` | — |
| `dev` → `main` (PR #6) | `3eb8e53` | 0 |
| Hotfix sau gộp — sửa redirect, trang quên mật khẩu, ảnh/CSS, guard `GopTrang` | `960a548` (push thẳng `main`, không qua PR) | — |

Toàn bộ 6 lượt xung đột đều ở tệp `.md`, **0 xung đột mã nguồn** — gộp nhánh là quyết định quản trị chứ không phải rủi ro kỹ thuật. Cách xử lý: `README.md`/`team-assignment.md` lấy bản đủ 15 mục rồi nối lại ô của từng người và **sửa hai ô sai sự thật** (rút "AI Brief Summarizer" khỏi ô SV2 vì mã không có; thêm dòng AI-1 cho trợ lý trang đăng nhập); `screen-inventory.md` dệt theo ô, **tên tệp video chưa tồn tại bị bỏ ra** thay vì giữ làm minh chứng ảo; `sv1-assignment.md`/`sv2-assignment.md` giữ nguyên bản của chính người phụ trách.

**Commit:** đo trên `origin/main` tại mốc `7c17fa3` (27-10-2026): **197 commit** (182 không-merge + 15 merge). **73/182 = 40%** đúng Conventional Commits — theo người: SV3 **56/107**, SV2 **10/44**, SV1 **7/31**. Các mốc trước để đối chiếu: 185 tại `960a548` (175 + 10), 189 tại `c4516eb` (178 + 11). Phần lớn commit lệch chuẩn là thông điệp tự sinh của trình soạn thảo web GitHub (`Update README.md`…) và các commit tài liệu cũ của SV1/SV2; từ 27-10 SV1 đã chuyển sang `docs(sv1):`. Từ 25-10 các commit mã nguồn đã theo chuẩn (`docs(admin):`, `fix(queue):`, `feat(error-pages):`, `style(pages):`); riêng hotfix `960a548` viết theo câu lệnh thường, **không** theo Conventional Commits — khai đúng như vậy thay vì sửa lịch sử đã push.

**Phân bố theo ngày** (ngày tác giả, gồm cả merge commit — đo bằng `git log --format=%ad --date=short origin/main` tại mốc `7c17fa3`): 3/10: 16 · 4/10: 11 · 6/10: 2 · 10/10: 1 · 11/10: 2 · 12/10: 3 · 13/10: 8 · 24/10: 4 · 25/10: 37 · 26/10: 84 · 27/10: **29** (tổng 197) → hoạt động ở **ba tuần khác nhau**, không rơi vào gạch −0.45đ ("toàn bộ code trong 1–2 commit đêm cuối"); khoảng trống 14→23/10 không có commit nào, và đồ thị sẽ dốc ở ba ngày cuối — nhóm nói trước điều này thay vì chờ người chấm phát hiện.

**Peer review — trạng thái thật, đọc bằng `GET /pulls/N/reviews`:**

| PR | Nội dung | Review của người khác |
|---|---|---|
| #1 | mã SV3 → `dev` | `minhd2577-droi` **DISMISSED** (2 inline) · `hungxuan0411-cloud` 1 issue comment |
| #2 | mã SV2 → `dev` | `NguyenDinhQuangMinh` **COMMENTED** (2 inline) · issue comment của SV1 và SV2 |
| #3 | mã SV1 → `dev` | `NguyenDinhQuangMinh` **COMMENTED** (đã đọc 45 tệp, 2 inline) · `hungxuan0411-cloud` COMMENTED (tự review mình) |
| #5 | `dev` → `main` | **không có review** (gắn `requested_reviewers` lúc PR đã merge thì API trả 404, không mời được) |
| #6 | `dev` → `main`, mở 02:42 ngày 27-10 | **APPROVED** bởi `hungxuan0411-cloud` lúc 02:37 UTC (09:37 VN); gộp lúc 03:01 UTC (10:01 VN), merge commit `3eb8e53` |
| #7 trở đi | mỗi lần cập nhật tài liệu một PR `docs/*` → `main` | **không có review**; gộp bằng merge commit (PR #7 = `c4516eb`, PR #8 = `f4ffac8`, hash mới nhất: `git log -1 --merges origin/main`) |
| #4 | `docs/sv1-sync` → `feature/sv3-admin-screens` | **đã đóng** lúc 03:34 UTC ngày 27-10 (`closed_at` `2026-10-27T03:34:32Z`), 0 review, **sai base**; nhánh `docs/sv1-sync` vẫn giữ |

**Repo đã có lượt review APPROVED đầu tiên.** PR #6 được `hungxuan0411-cloud` **APPROVED** lúc 02:37 UTC (09:37 VN) và gộp lúc 03:01 UTC (10:01 VN), merge commit `3eb8e53`. Ba PR phân hệ trước đó chỉ có nhận xét COMMENTED (PR #1 có một review DISMISSED), nên khi Vấn đáp vẫn phải mở đúng trang review từng PR và nói đúng: #1/#2/#3 không có APPROVED, #5 và các PR tài liệu từ #7 trở đi không có review, **#6 mới có APPROVED**. PR #4 đã đóng (sai base, 0 review) — không được nói là "đã gộp". Diff của PR #6 nằm trong **13 tệp** (`GET /pulls/6/files`): 10 tệp `.md` và 3 tệp thuộc SV3 (`GopTrang.html`, `index.html`, `js/error-pages.js`); không luồng nghiệp vụ nào bị đổi.

**Hotfix sau gộp.** Ngay sau PR #6, nhóm push thẳng lên `main` commit **`960a548`** (12 tệp, +62/−20, **không qua PR**): chuyển hướng sau đăng nhập cho cả ba vai; 3 trang đăng nhập trỏ về trang quên mật khẩu chạy được; trang quên mật khẩu bỏ 3 script chết, sửa href CSS, dùng ảnh `hero-login.png` và ghi rõ là demo không gửi email; sửa 3 đường dẫn ảnh hero trong CSS; thêm guard vai trò cho `GopTrang.html`; cập nhật câu "Cách quay lại" trên trang 403. Đã kiểm trên localhost và bản Pages ngày 27-10: ba vai chuyển đúng trang, phiên `customer` mở `GopTrang` bị đẩy sang 403, AI dự phòng vẫn chạy, **29/29 trang HTML trả 200**. Việc push thẳng là ngoại lệ quy trình, đã ghi ở đầu báo cáo. Hệ quả đã xử lý cùng ngày: `dev` từng chậm hơn `main` 3 commit; nhóm đã **fast-forward `dev` lên đúng `main`** (mốc `c4516eb`, `GET /compare/dev...main` → `ahead_by: 0, behind_by: 0`) và tiếp tục đồng bộ như vậy sau mỗi lần gộp tài liệu, nên hai nhánh luôn trùng nhau.

**Commit trực tiếp trên `main`:** mốc trước 27-10, đường first-parent có 48 commit không-merge, trong đó **47 chỉ sửa tệp `.md`** và 1 là `6274151 Initial commit`; **không có mã nguồn nào push thẳng**. Ngày 27-10, sau khi PR #6 gộp, nhóm push thẳng hotfix **`960a548`** (12 tệp) — đây là **commit mã nguồn đầu tiên đi thẳng lên `main`**, một ngoại lệ có chủ đích; không giấu. Về nguyên tắc, gạch −0.25đ "đẩy code trực tiếp lên main không qua nhánh/PR" **có thể áp dụng cho lần này**; các thay đổi tiếp theo nên đi PR để không lặp lại.

### 5.3 Triển khai và README (7.3 — 0.30đ)

Đã kiểm tra **trên URL công khai** ngày 27-10-2026:

- Landing tải đúng bảng màu chủ đạo, **11/11 liên kết trên trang trả 200**; `css/style.css`, `css/error-pages.css`, `js/error-pages.js` đều 200.
- Bốn lối vào chạy được: `KhachHang/index.html`, `KhongGianNguoiBan/01-listing-management/index.html`, `KiemDuyetVaQuanTri/01-dashboard/index.html`, `KiemDuyetVaQuanTri/04-moderation-queue/index.html`, `DangNhapVaDangKy/01-dang-nhap/khach-hang.html`.
- Đường dẫn sai (`/duong-dan-sai`) trả **HTTP 404 kèm đúng `404.html` của nhóm**, không phải trang mặc định của GitHub (`custom_404: true`).
- Lưu `cl_session` vai `customer` rồi mở hàng đợi kiểm duyệt → chuyển hướng `403.html?need=moderator&screen=…`; ma trận quyền hiển thị, không tràn ngang ở 320 px.
- Quét lại **sau hotfix `960a548`** trên bản Pages ngày 27-10-2026: **29/29 trang HTML trả 200**, **0 tham chiếu HTML/CSS trỏ tệp không tồn tại**. Trong 7 đích 404 đo trước hotfix, **6 đã sửa, 1 còn**.

| Đích 404 đo trước hotfix | Ai nạp | Loại | Trạng thái sau `960a548` |
|---|---|---|---|
| `DangNhapVaDangKy/01-dang-nhap/forgot-password.html` | 3 trang cổng đăng nhập (SV2) | liên kết chết | **Đã sửa** — trỏ `../../KhachHang/forgot%20password.html` (3 tệp HTML) |
| cùng đích trên, từ `DangNhapVaDangKy/02-dang-ky/js/main.js:199` | trang đăng ký (SV2) | liên kết chết | **Còn** — mã của SV2, chưa sửa |
| `KhachHang/css/forgot passwork.css` | `KhachHang/forgot password.html` (SV1) | CSS 404 | **Đã sửa** — href đúng `css/forgot password.css`, tệp có thật |
| `KhachHang/js/auth-config.js`, `…/auth-service.js` | cùng trang (SV1) | JS 404 | **Đã sửa** — bỏ 3 thẻ script trỏ tệp không tồn tại, thay bằng script demo nội tuyến |
| `DangNhapVaDangKy/assets/img/forgot-hero.png` | `DangNhapVaDangKy/assets/css/style.css` (SV2) | ảnh 404 | **Đã sửa** — `--hero` trỏ `../img/hero-login.png`, ảnh có thật |
| `KhachHang/assest/img/img of forgot password.png`, `KhachHang/img/hero-login.png` | `KhachHang/css/forgot password.css` (SV1) | ảnh 404 | **Đã sửa** — cả 3 `url()` trỏ `../assets/images/hero-login.png`; ảnh 3,5 MB đã thêm vào repo |

**Còn đúng một liên kết chết** — `DangNhapVaDangKy/02-dang-ky/js/main.js:199` vẫn trỏ `forgot-password.html`; đây là mã của SV2 nên người ngoài không sửa thay. Sáu lỗi tài nguyên thật (CSS/JS/ảnh) đã hết: đó đúng là câu chế tài "link deploy bị lỗi 404 tài nguyên, −0.15đ" của 7.3 và điều checklist mục 19 cấm, nên việc sửa là bắt buộc chứ không phải làm đẹp. `README.md` đủ **15 mục** chuẩn.

`api/ai.js` nằm trong repo dưới dạng mô-đun Node; GitHub Pages chỉ phục vụ tệp tĩnh nên yêu cầu `/api/ai.js` trả về chính mã nguồn chứ không chạy hàm — trên bản công khai, ba tác vụ AI lùi về bộ quy tắc dự phòng và giao diện vẫn in đúng dòng "Nguồn:". Muốn gọi mô hình thật phải deploy ở nền tảng có runtime và đặt `AI_API_URL`, `AI_API_KEY`, `AI_MODEL` trong biến môi trường.

---

## 6. Video OBS và chuẩn bị Vấn đáp (Tiêu chí 8 — 1.00đ)

### 6.1 Chín video, ánh xạ thật

| Người | Dòng kiểm kê được video chứng minh | Link |
|---|---|---|
| SV3 | 14 Hàng đợi kiểm duyệt | <https://youtu.be/LAlWYQg43LY> (13:42) |
| SV3 | 16 Quản lý danh mục | <https://youtu.be/imsnvGvIofQ> (14:24) |
| SV3 | 18 Quy định nội dung | <https://youtu.be/3dCK3uHpIcY> (17:21) |
| SV1 | 2 Chi tiết sản phẩm | <https://www.youtube.com/watch?v=PaCFXYhuo9U> |
| SV1 | 4 Gợi ý nghệ nhân | <https://www.youtube.com/watch?v=AW-wuwhA3zc> |
| SV1 | 5 Giỏ hàng & xác nhận đơn | <https://www.youtube.com/watch?v=T6ejhOOqfgk> |
| SV2 | 3 trang đăng nhập (khách / nghệ nhân / quản trị) — **đứng ngoài 18 dòng** | <https://www.youtube.com/watch?v=BY0AAIjTSm8> · `2zrLFxVEpiU` · `d4kmFKU6ivg` |

Thỏa thuận của nhóm là **3 video/người = 9 video**, trong khi 18 dòng kiểm kê theo nghĩa chặt của 8.1 là 18 video. **Khoảng trống thật nằm ở ánh xạ, không phải số lượng:** sáu dòng 7–12 (Maker) không có video riêng vì ba video của SV2 quay phân hệ đăng nhập. Khi bị hỏi, nhóm phải trả lời được *vì sao chọn 3 video/người, ai duyệt, mỗi video phủ những dòng nào* — im lặng dễ bị đọc là khai thiếu hơn thực tế. Tệp gốc `.mp4` của SV3 nằm trên máy (`Videos/BTCK/`, 634 / 666 / 803 MB, quay 25-10); repo không chứa `.mp4` vì GitHub chặn tệp >100 MB.

### 6.2 Tám bước bắt buộc trong mỗi video

Webcam rõ mặt + giọng thật → hiển thị mockup Canva của màn đó → mở đúng tệp HTML/CSS/JS trong VS Code → giải thích bố cục và thuật toán sự kiện → **≥1 chỉnh sửa trực tiếp trên mã nguồn** → chạy thử tương tác + responsive → `git commit` và `git push` → đọc rõ Task ID, Branch, Commit hash. **Thiếu bước 1 → video đó 0.00đ**; chỉ quay sản phẩm chạy được mà không giải thích code và không sửa trực tiếp → −0.25đ.

### 6.3 Kịch bản Vấn đáp (8.2 — 0.50đ)

Demo chung 6 phút theo vòng đời nghiệp vụ: khách tạo brief (STT 3) → nghệ nhân nhận brief và gửi proposal (STT 9–11) → bài đăng vào hàng đợi, AI chấm rủi ro, kiểm duyệt viên duyệt/từ chối (STT 14) → báo cáo vi phạm được phân loại và xử lý (STT 15) → quản trị viên ban hành quy định, khóa danh mục/tài khoản (STT 16–18) → hai màn lỗi 404/403 chứng minh phân quyền. Mỗi sinh viên giải thích **từng dòng mã trong lát cắt dọc của mình** và chịu một **Live Modification 5–10 phút** lấy từ ngân hàng 24 đề. SV3 đã chuẩn bị cho màn 14/16/18; **cả ba chưa tập together** — checklist mục 20 là việc bắt buộc của người, không đo hộ được.

**Sáu tab phải mở sẵn khi vào bàn chấm:** ① bản deploy, ② `index.html` chạy local bằng máy chủ tĩnh (`python -m http.server 8000` → `http://localhost:8000`; **không mở bằng `file://`** vì `fetch()` bị chặn), ③ Canva ở quyền xem công khai, ④ board Trello, ⑤ GitHub (PR #1/#2/#3/#5/**#6 đã Approve và gộp `3eb8e53`** + Insights → Networks chứng minh ba người cùng commit), ⑥ `videos/README.md` với 9 link đã mở sẵn — kèm VS Code và Terminal để gõ `git diff` khi được yêu cầu.

---

## 7. Tự đối chiếu với barem

### 7.1 Năm điều kiện tiên quyết

| ĐK | Yêu cầu | Bằng chứng | Trạng thái |
|---|---|---|---|
| ĐK1 | Kiểm kê màn hình + User Flow + Figma/Canva | `screen-inventory.md` 18 dòng × 12 cột, `user-flow.md`, `component-guide.md`, 5 link Canva | **Đạt về tài liệu**; 5 link Canva **chưa mở quyền xem công khai** |
| ĐK2 | Repo công khai, `main`/`dev`/`feature/*`, commit và PR từ 3 người | `private = false`; commit không-merge SV3 107 · SV2 44 · SV1 31; PR #1/#2/#3/#5/#6 và các PR tài liệu #7–#11 đã gộp, **PR #6 có APPROVED thật** | **Đạt**; chỉ thiếu nhánh `fix/*` (không bắt buộc); PR #4 đã đóng |
| ĐK3 | Triển khai công khai + hướng dẫn chạy cục bộ | URL Pages `status = built`, `custom_404 = true`, `.nojekyll`; README mục 6 và 12 | **Đạt** |
| ĐK4 | Video OBS 1:1 với màn hình độc lập, có webcam + giọng | 9/9 link đã dán, tên tệp đúng chuẩn `SVx-XX-screen-name.mp4` | **Đạt về số lượng, lệch về ánh xạ** (6 dòng Maker) |
| ĐK5 | `docs/ai-usage-report.md` khai trung thực | SV3 mục 1–2, SV1 mục 3.1, SV2 mục 3.2 (chuyển từ báo cáo phân hệ) | **Đạt**, còn thiếu số phiên bản công cụ |

### 7.2 Bảy vi phạm có thể bị trừ điểm trực tiếp

| Mã | Mức | Kết quả quét |
|---|---|---|
| VP-01 Lộ API key | −1.50 | **Sạch** — 0 khớp trên 200 tệp được theo dõi |
| VP-02 XSS | −1.00 | **Không có lỗi** — mọi `innerHTML` đi qua `esc()`/`escapeHtml` |
| VP-06 Dữ liệu chữ giả | −0.50 | **Sạch trên sản phẩm** — 0 khớp; chuỗi chữ giả chỉ còn trong 2 tệp tài liệu khi trích lại chính barem |
| VP-07 Khai AI không trung thực | −1.00 | **Rủi ro thấp** — cả ba đều có khai; hai khoảng trống đã tự nêu ở mục 4.4 |
| VP-03 Kiểm kê trước code | −1.00 | **Không vi phạm** — `screen-inventory.md` vào repo 4/10, màn thật bắt đầu 13/10 |
| VP-04 Sao chép trang | −1.00 | **Không vi phạm** — ba phân hệ có cấu trúc/CSS/JS riêng |
| VP-05 Commit dồn một đêm | −1.00 | **Không vi phạm** — 197 commit (182 không-merge + 15 merge) tại mốc `7c17fa3`, trải ở ba tuần |

### 7.3 Checklist 20 mục (mục X.2) — rút gọn

**Đã đo và đạt:** 1 (kiểm kê 18 dòng), 5 (alt/nhãn — còn 6 trang thiếu thẻ bao), 6 (responsive 145 phép đo), 7 (Tab/Esc trên màn SV3), 9 (15–25 bản ghi), 10 (tìm + lọc + sắp), 11 (CRUD sống sau F5), 12 (4 trạng thái), 13 (AI 6 bước), 14 (AI failure), 15 (board công khai), **16** (một lượt APPROVED thật — PR #6 được `hungxuan0411-cloud` Approve rồi gộp), 18 (README 15 mục + khai AI).
**Một phần / chưa đạt, cần người quyết:** **2** quyền xem Canva · **3** tên tệp theo chuẩn (`forgot password.html`, `docs/ai-usage -report.md`) · **4** **Role Switcher giữa ba phân hệ — 0/29 trang có** · **8** bảng token chung — **11 tệp tự khai hex trong `:root`, 0 màu chung** · **17** ánh xạ video dòng 7–12 · **19** còn **1** liên kết chết (`02-dang-ky/js/main.js:199`); 6/7 đích 404 tài nguyên đã sửa · **20** tập demo chung.
Bảng đầy đủ từng dòng kèm số đo: `docs/barem-audit.md` mục 9.

---

## 8. Hạn chế trung thực và việc còn lại của từng người

**Hạn chế của sản phẩm (tự khai, không che):**
1. Không có **bộ chuyển vai trò** giữa ba phân hệ: vào `KhachHang/*` rồi thì không có liên kết trực tiếp sang `KhongGianNguoiBan/*` hay `KiemDuyetVaQuanTri/*` — muốn đổi vai phải qua trang chủ. Từ 27-10-2026 mỗi phân hệ đã có link "← Trang chủ CraftLink" ngay trong khung điều hướng (commit `ca1909c` cho 7 trang quản trị, `59438c6` cho 20 tệp của Khách hàng, Người bán và Đăng nhập/Đăng ký; vào `main` qua PR #12), trừ `KhachHang/forgot password.html`.
2. **11 tệp CSS tự khai màu hex trong `:root`** (6 bảng token theo phân hệ), **0 màu hex chung** — mở song song một màn Khách hàng và một màn Quản trị thì hai trang không cùng bảng màu.
3. `api/ai.js` **không chạy trên GitHub Pages**, nên ba tác vụ AI trên bản công khai dùng bộ quy tắc dự phòng.
4. Dữ liệu ở `localStorage` từng trình duyệt: hai người hai máy không thấy dữ liệu của nhau, luồng brief → proposal chỉ minh hoạ được trên cùng một máy.
5. Quy định nội dung **chưa có lịch sử phiên bản** và chưa có bước *Xuất bản*; chuỗi "`-v4`" trong mã chỉ là hậu tố khóa Local Storage.
6. Bảng điều khiển mới nối một phần kho dữ liệu: hai thẻ *Nghệ nhân đang hoạt động* và *Cảnh báo hệ thống* tính thật, doanh thu/đơn hàng/biểu đồ/nhật ký là số liệu minh họa viết sẵn.
7. `KhachHang/forgot password.html` **đã chạy được từ hotfix `960a548`** nhưng **chỉ là bản demo**: ba thẻ script trỏ `js/auth-config.js` và `js/auth-service.js` (hai tệp không tồn tại ở bất kỳ nhánh nào) đã bị bỏ, thay bằng script nội tuyến chỉ kiểm tra định dạng email và hiển thị ghi chú "không gửi email"; href CSS đã đúng (`css/forgot password.css`) và ba `url()` ảnh đã trỏ ảnh có thật. Trang **không** gửi mail, **không** đặt lại mật khẩu — nói thẳng khi bảo vệ.
8. Cây `main` còn **hai tệp khai báo AI song song**: `docs/ai-usage-report.md` (17 074 B) và `docs/ai-usage -report.md` (9 952 B, tên có dấu cách) — **nội dung khác nhau**, phải gộp chữ rồi mới xoá; `video.md` ở gốc (1 048 B, bảng "STT 4/7/9") trùng `videos/README.md`.

**Việc còn lại — không ai làm thay được:**

| Ai | Việc |
|---|---|
| **Cả nhóm** | Mở 5 link Canva bằng cửa sổ ẩn danh và đổi sang "Bất kỳ ai có liên kết đều xem được"; vẽ trang Component Guide vào Canva; **tập demo 6 phút + ≥3 đề Live Modification**; từ nay mọi thay đổi (kể cả tài liệu) đi qua PR. (Thẻ **REVIEW** đã sang "Đã gộp" sau PR #6; PR #4 đã đóng; `dev` được fast-forward lên đúng `main` sau mỗi lần gộp, hai nhánh trùng nhau.) |
| **SV1** | Đổi tên `forgot password.html` + `css/forgot password.css` theo `role-function-action`; thêm `min-width:0` cho hai trang tràn 320 px; quyết định gộp/xoá `docs/ai-usage -report.md` và `video.md`; xác nhận ánh xạ 3 video "4/7/9"; bổ sung phiên bản công cụ AI. (`docs/sv1-assignment.md` đã được sửa lại ngày 27-10: bỏ các mục không có thật như `pages/common/`, `navbar.css`, `login.html`, `profile.html`, "AI Personalization"; số tệp nay ghi đúng 10) |
| **SV2** | Sửa nốt **1 liên kết chết** `DangNhapVaDangKy/02-dang-ky/js/main.js:199` (trỏ `forgot-password.html`); xác nhận mục 3.2 `docs/ai-usage-report.md`; thêm `<header>/<nav>/<main>/<footer>` cho 6 trang và bỏ `<h1>` thứ hai ở `02-dang-ky/index.html`; chốt hướng xử lý video cho dòng 7–12 |
| **SV3** | Hotfix `960a548` đã xong (redirect 3 vai, trang quên mật khẩu, ảnh/CSS, guard `GopTrang`); còn giữ phần kỹ thuật trình bày (mục 6.3) và làm tệp `js/role-switcher.js` dùng chung nếu còn giờ |

---

## Phụ lục A — Lệnh tái lập số liệu

```bash
# Lịch sử và chuẩn commit (mốc cuối: 7c17fa3 ngày 27-10-2026)
git log --oneline origin/main | wc -l                    # 197
git log --no-merges --format=%s origin/main | wc -l      # 182 commit không-merge
git log --no-merges --format=%s origin/main \
  | grep -cE '^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\(.+\))?!?: '   # 73 = 40% (trên 182)

# Commit trực tiếp trên main TRƯỚC 27-10: liệt kê tệp KHÔNG phải .md trên đường first-parent
git log --first-parent --no-merges --format=%H origin/main | while read h; do
  git show --name-only --format= "$h" | grep -v '\.md$' | sed "s|^|$h  |"
done   # chỉ 2 dòng, cả 2 thuộc `6274151 Initial commit` (.gitignore, LICENSE) ⇒ trước 27-10 không có mã nguồn nào push thẳng.
       # Ngoại lệ 27-10: `960a548` (hotfix 12 tệp) push thẳng main — đã khai ở mục 5.2.

# Đường dẫn vào kiểm kê
git log --diff-filter=A --format=%ad --date=short <nhánh> -- <tệp HTML>

# Cấu trúc và tài nguyên
git ls-files '*.html' | wc -l                            # 29
git ls-files | wc -l                                     # 200
git grep -nIE "sk-|AIza|ghp_|AKIA|Bearer [A-Za-z0-9]"    # 0 khớp

# Repo / Pages / Trello (không cần token)
curl -s https://api.github.com/repos/NguyenDinhQuangMinh/cse122-craftlink-team11
curl -s https://api.github.com/repos/NguyenDinhQuangMinh/cse122-craftlink-team11/pages
curl -s "https://api.github.com/repos/.../pulls/1/reviews"
curl -s https://trello.com/b/N2HBpswf.json               # lists + cards[].desc + prefs
```

Responsive và quét ngữ nghĩa đo bằng iframe cùng nguồn trên chính URL công khai: mỗi trang nạp ở 5 chiều rộng, lấy `documentElement.scrollWidth` so với `clientWidth`; số thẻ `<img>` thiếu `alt`, `<input>` có `label[for]`/`aria-label` và thẻ ngữ nghĩa đếm bằng DOM, bỏ phần chú thích.

## Phụ lục B — Danh sách liên kết

| Loại | Liên kết |
|---|---|
| Bản deploy | <https://nguyendinhquangminh.github.io/cse122-craftlink-team11/> |
| Repository | <https://github.com/NguyenDinhQuangMinh/cse122-craftlink-team11> |
| Pull requests | Các PR tài liệu **từ #7 trở đi đã gộp** (mỗi lần cập nhật một PR `docs/*` → `main`; ví dụ #8 `f4ffac8`: <https://github.com/NguyenDinhQuangMinh/cse122-craftlink-team11/pull/8>) · #6 **đã gộp** `3eb8e53` (`dev` → `main`) · đã gộp: #1 `8eb9f51`, #2 `a5a51e6`, #3 `ec74e6b`, #5 `da3131b` · **#4 đã đóng** (sai base, nhánh `docs/sv1-sync` vẫn giữ) |
| Board công việc | <https://trello.com/b/N2HBpswf> |
| Canva — Khách hàng (SV1) | <https://www.canva.com/design/DAHZAR9VxmU/dQQiBQ9-OPRH6Q5x8DdAkw/edit> (bản cũ `DAHWyBVvS6U` — SV1 cần chốt một link) |
| Canva — Người bán (SV2) | <https://canva.link/rvxflfz5kgg0rg1> |
| Canva — Quản trị (SV3) | <https://canva.link/zqtyq0qivogb17s> |
| Canva — Tổng hợp bài nhóm | <https://canva.link/10ir1xtkau6li7b> · <https://www.canva.com/design/DAHXD2jg9HU/7Q4trg1HDT246iMdGVyUXw/edit> |
| Video SV2 (kênh + playlist) | <https://www.youtube.com/@minhduong3801> · <https://www.youtube.com/playlist?list=PLDaEqceEwiuk> |

*Tài liệu nguồn mà báo cáo này gộp lại:* `README.md`, `docs/project-proposal.md`, `docs/project-introduction.md`, `docs/screen-inventory.md`, `docs/user-flow.md`, `docs/component-guide.md`, `docs/team-assignment.md`, `docs/sv1-assignment.md`, `docs/sv2-assignment.md`, `docs/sv3-assignment.md`, `docs/ai-usage-report.md`, `docs/task-board.md`, `docs/barem-audit.md`, `videos/README.md`.
