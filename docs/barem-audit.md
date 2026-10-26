# Kiểm toán repo theo barem CSE122 V2 — thực hiện ngày 26-10-2026

Tệp này ghi lại **kết quả đối chiếu trực tiếp** giữa barem (`Tài liệu hỗ trợ học tập — Barem Chấm Điểm & Quy Chế Vấn Đáp BTL`, 45 trang) và trạng thái thật của repository `NguyenDinhQuangMinh/cse122-craftlink-team11` vào lúc 26-10-2026. Mọi con số dưới đây lấy từ `git` và GitHub REST API (`api.github.com/repos/...`), không phải ước lượng. Đường dẫn tệp kèm số dòng để người chấm mở đúng chỗ.

## 1. Kết luận nhanh

1. **ĐK3 (triển khai công khai) chưa đạt** — GitHub Pages chưa bật: `GET /repos/.../pages` trả về `404`, `has_pages = false`. Đây là điều kiện loại trực tiếp duy nhất còn thiếu mà **một người bấm được trong 5 phút**.
2. **Không nhánh nào chứa toàn bộ sản phẩm.** `main` và `dev` có **0 tệp HTML** (9 tệp, toàn bộ là `docs/` + README + LICENSE + .gitignore). 27 tệp HTML nằm rải trên ba nhánh `feature/*` chưa gộp. Muốn chạy đủ luồng 3 vai trò và triển khai, phải gộp PR #3 → #2 → #1 vào `dev`.
3. **0/4 Pull Request được gộp.** Cả bốn PR đang `open`. Lịch sử `main` có **11 commit đẩy trực tiếp không qua nhánh/PR** → đúng gạch trừ điểm 7.2 (−0.25đ).
4. Bốn điều kiện còn lại (ĐK1, ĐK2, ĐK4, ĐK5) **có đủ bằng chứng trong repo**; ĐK4 đã đủ 9/9 link video (3 người × 3 video) nhưng ba video của SV2 quay phân hệ đăng nhập — ba trang này **đứng ngoài 18 dòng kiểm kê** — nên vế "khớp 1:1 với `screen-inventory.md`" vẫn lệch với riêng phần Maker. ĐK4 phụ thuộc thỏa thuận 3 video/người đã báo giảng viên.
5. **Không có vi phạm mức VP-01 và VP-02** (quét bằng đúng mẫu lệnh mà barem nêu ở mục IV.2 — xem mục 5).

## 2. Năm điều kiện tiên quyết (ĐK1–ĐK5)

| ĐK | Barem yêu cầu (nguyên văn, tóm tắt) | Bằng chứng thật | Trạng thái | Việc còn lại |
|---|---|---|---|---|
| ĐK1 | Bảng kiểm kê màn hình + Sơ đồ User Flow + Thiết kế Figma/Canva | `docs/screen-inventory.md` dòng 3 có đủ **12 cột** (STT, Thành viên, Vai trò, Mục tiêu, Nhiệm vụ, Màn hình, Tệp HTML, CRUD/Trạng thái, AI, Phụ trách, Công việc/Nhánh, OBS Video) và 18 dòng; `docs/user-flow.md`, `docs/component-guide.md`, `docs/project-proposal.md`; link Canva ở README mục 10 | **Đạt** về tài liệu | 5 link Canva đang là **link chỉnh sửa** → phải đổi sang quyền xem công khai |
| ĐK2 | Repo công khai, có `main`, `dev`, `feature/*`, commit và PR từ cả 3 thành viên | Repo `private = false`. Nhánh thật: `main`, `dev`, `feature/sv1-buyer`, `feature/sv2-maker-screens`, `feature/sv3-admin-screens`, `docs/sv1-sync`. Commit trên `main`: SV3 28, SV2 13, SV1 7 | **Đạt có điều kiện** | Thiếu `fix/*`; PR chưa được **gộp**; chưa có thẻ nào ở cột "Đã gộp" |
| ĐK3 | Đã triển khai lên GitHub Pages/Vercel/Netlify, mở được qua đường dẫn công khai, kèm hướng dẫn chạy cục bộ trong README | `GET /repos/.../pages` → **404**. `has_pages = false`. Không có `homepage` trong API | **CHƯA ĐẠT** | Bật Pages sau khi gộp ba PR; README mục 12 đã có hướng dẫn chạy cục bộ |
| ĐK4 | Danh sách Video OBS tương ứng 1:1 với toàn bộ màn hình độc lập, có webcam + giọng thật | `videos/README.md`: **đủ 9 link** — SV3 3 (`LAlWYQg43LY`, `imsnvGvIofQ`, `3dCK3uHpIcY`), SV1 3 (`PaCFXYhuo9U`, `AW-wuwhA3zc`, `T6ejhOOqfgk`), SV2 3 (`BY0AAIjTSm8`, `2zrLFxVEpiU`, `d4kmFKU6ivg`, playlist `PLDaEqceEwiuk`) | **Đạt về số lượng, lệch về ánh xạ** | Ba video của SV2 quay `khach-hang.html` / `nghe-nhan.html` / `quan-tri.html` — ba trang này **đứng ngoài 18 dòng kiểm kê**; sáu dòng 7–12 (Maker) không có video. Chính báo cáo AI của SV2 vẫn ghi "video của bốn màn hình người bán sẽ quay và bổ sung sau". Phải giữ thỏa thuận 3 video/người bằng văn bản của giảng viên |
| ĐK5 | `docs/ai-usage-report.md` khai trung thực công cụ, prompt, phần AI sinh, phần tự kiểm chứng | SV3 mục 1–2; **SV1 mục 3.1 đủ 5 hạng mục**; **SV2 khai đầy đủ ở báo cáo cấp phân hệ** `KhongGianNguoiBan/docs/ai-usage-report.md` (nhánh `feature/sv2-maker-screens`) — công cụ Qoder, 6 prompt nguyên văn, bảng "AI sinh / cách kiểm chứng", hạn chế. Bản cấp nhóm mục 3.2 đã được chuyển nội dung của SV2 sang và ghi rõ **SV2 cần xác nhận** | **Đạt** — còn thiếu số phiên bản công cụ của cả ba người | SV2 đọc lại và xác nhận mục 3.2; cả nhóm bổ sung phiên bản công cụ |

## 3. Tiêu chí 7 — Quản lý công việc, Git/GitHub, triển khai (1.00đ)

### 3.1 Mục 7.1 (0.25đ) — Bảng công việc

Barem đòi: *tối thiểu 5 cột; mỗi thẻ gắn rõ thành viên phụ trách, hạn hoàn thành, tệp màn hình, tên nhánh Git, link Pull Request và link Video OBS.*

Board công khai: **<https://trello.com/b/N2HBpswf>** — `prefs.permissionLevel = "public"`, mở được bằng cửa sổ ẩn danh (HTTP 200).

| Cột board | Số thẻ | Ghi chú |
|---|---|---|
| Backlog | 8 | 8 thẻ công việc còn mở, hạn 27-10-2026 |
| Đang làm | 1 | `DEPLOY · Bật GitHub Pages…` — SV3 |
| Chờ review | 15 | TASK-01…13, 15, 17 |
| Đã gộp | 0 | **Thật**: chưa PR nào được gộp |
| Video & bảo vệ | 3 | TASK-14, 16, 18 (SV3 đã có link) |

27/27 thẻ đều có **hạn hoàn thành** và **mô tả** gắn `Nhánh · PR · Video · Màn hình` (+ `AI:` với màn có tính năng AI). Hạn của 18 thẻ TASK lấy theo **ngày commit thật đưa tệp HTML lần đầu vào nhánh**: SV3 = 13-10-2026, SV1 và SV2 = 25-10-2026 (kiểm chứng bằng `git log --diff-filter=A`). Cột "Đã gộp" để trống có chủ đích — gộp xong mới kéo thẻ sang, kèm commit hash.

### 3.2 Mục 7.2 (0.45đ) — Quy trình Git

Barem đòi 4 ý; kết quả từng ý:

* **Chiến lược nhánh (`main`, `dev`, `feature/*`, `fix/*`, `docs/*`)** — có `main`, `dev`, 3 nhánh `feature/*`, 1 nhánh `docs/sv1-sync`. **Không có `fix/*`.** Đánh giá: *gần đạt*.
* **Conventional Commits** — trên **lịch sử đã push** (6 nhánh từ `origin`, khử trùng lặp theo hash): **49/152 commit đúng chuẩn = 32%**. Chia theo người: SV3 **40/91 = 44%**, SV2 **8/37 = 22%**, SV1 **1/24 = 4%**. 103 commit còn lại đa số là thông điệp tự sinh của trình soạn thảo web GitHub (`Update README.md`, `Update team-assignment.md`, `Create video.md`, `Delete video`). Gạch "thông điệp commit vô nghĩa" là −0.15đ; từ 25-10 trở đi các commit đã theo chuẩn (`docs(admin): …`, `fix(queue): …`, `style(pages): …`). Không sửa lại lịch sử đã push — thay vào đó khai thật ở mục này và trình bày trong Vấn đáp Câu 4.
* **Đóng góp đều đặn qua các tuần** — theo ngày (mọi nhánh đã push, đã khử trùng lặp): 3/10: 16 · 4/10: 11 · 6/10: 2 · 10/10: 1 · 11/10: 2 · 12/10: 3 · 13/10: 8 · 24/10: 4 · 25/10: 36 · 26/10: 69. **Khoảng trống 14→23/10 không có commit nào.** Theo người (152 commit, đếm theo email tác giả): SV3 91 · SV2 37 · SV1 24. Nhận định: có hoạt động ở ba tuần khác nhau nên không rơi vào gạch −0.45đ ("toàn bộ code trong 1–2 commit đêm cuối"), nhưng đồ thị Insights sẽ dốc đứng ở ba ngày cuối.
* **Mỗi nhánh tính năng gộp vào `dev` qua PR có Peer Review** — PR #1, #2, #3 đều có **base = `dev`** và đều **chưa gộp**. Số review thật:
  * PR #1 (SV3): `minhd2577-droi` — **DISMISSED** (25-10), `NguyenDinhQuangMinh` — COMMENTED (26-10), còn **requested reviewer** `hungxuan0411-cloud`.
  * PR #2 (SV2): `NguyenDinhQuangMinh` — COMMENTED (25-10, nêu điểm phải sửa), `minhd2577-droi` — COMMENTED (26-10).
  * PR #3 (SV1): `NguyenDinhQuangMinh` — COMMENTED (25-10, đã đọc 45 tệp), `hungxuan0411-cloud` — COMMENTED (26-10).
  * PR #4 (`docs/sv1-sync` → `feature/sv3-admin-screens`): 0 review, **đích sai** (về nhánh cá nhân chứ không phải `dev`); nội dung cần giữ đã được đưa vào nhánh SV3 nên PR này có thể đóng.
  * Đánh giá: *có peer review thật nhưng chưa có APPROVE nào* → cần mỗi bạn bấm Approve cho PR của người khác trước khi gộp.
* **Bằng chứng trừ điểm đã xảy ra**: `main` nhận **11 commit trực tiếp** (`git rev-list --count origin/dev..origin/main` = 11, `main..dev` = 0, trên `main` không có merge commit nào). Đúng gạch "đẩy code trực tiếp lên main không qua nhánh/PR" (−0.25đ). Lịch sử đã push nên **không viết lại**; cách xử lý là khai thật + từ nay mọi thay đổi đi qua PR vào `dev`.

### 3.3 Mục 7.3 (0.30đ) — Triển khai, README, ai-usage-report

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| Link triển khai chạy thật, không 404 tài nguyên | **CHƯA** | Pages 404; chưa có `homepage` |
| README đủ 15 mục chuẩn | **Đạt** | `README.md` có `## 1.` → `## 15.` (cộng mục "Giấy phép" = 16 khối `## `) |
| `docs/ai-usage-report.md` chi tiết | Đạt | Cả ba người đều có khai; thiếu số phiên bản công cụ. Mục 3.2 là bản chuyển từ `KhongGianNguoiBan/docs/ai-usage-report.md`, cần SV2 xác nhận |

## 4. Tiêu chí 8 — Video OBS và Vấn đáp

* **8.1 (0.50đ)**: barem đòi *số video = 100% số giao diện độc lập trong Screen Inventory đã duyệt*. Với 18 dòng kiểm kê, con số tuyệt đối là 18 video; nhóm đang có **9 video có link (3 × 3 người)** theo thỏa thuận 3 video/người đã báo giảng viên. Gạch điểm ghi "*thiếu video so với số màn hình đã duyệt (trừ theo tỷ lệ)*" → **chỉ an toàn nếu có xác nhận của giảng viên bằng văn bản**; nên lưu tin nhắn/email đó vào thư mục nộp bài.
* Tên tệp đã đúng chuẩn `SVx-XX-screen-name.mp4` trong `videos/README.md` và cột OBS của `docs/screen-inventory.md`.
* **Điểm yếu còn lại của 8.1 không phải số lượng mà là ánh xạ.** Ba video của SV2 chứng minh ba trang đăng nhập, không chứng minh dòng nào trong sáu dòng 7–12 (Maker) — phần mà bảng phân công giao cho SV2. Ghi chú trung thực về việc này từng có trong `videos/README.md` và `docs/sv2-assignment.md`, đã bị xóa bằng hai commit `e123199` và `13c4416` (26-10), nhưng báo cáo AI cấp phân hệ của SV2 vẫn còn câu "video của bốn màn hình người bán sẽ quay và bổ sung sau". **Khi bị hỏi, nhóm phải trả lời được: vì sao chọn 3 video/người, ai duyệt, và mỗi video phủ những dòng nào** — im lặng về khoảng trống này dễ bị đọc là khai thiếu hơn thực tế.
* **SV1 cần chốt ánh xạ**: `video.md` (gốc nhánh `feature/sv1-buyer`) ghi "STT 4/7/9", nhưng dòng 7 và 9 của bảng kiểm kê thuộc **SV2**. `videos/README.md` hiện ghi lời giải thích "4/7/9 là số thứ tự nội bộ trong 9 tệp Buyer"; cách giải thích này vẫn phải được SV1 xác nhận trước khi nộp.
* **8.2 (0.50đ)**: mỗi sinh viên giải thích từng dòng mã trong lát cắt dọc của mình. Kịch bản 6 phút + Live Modification 5–10 phút lấy từ "ngân hàng 24 đề bài" — SV3 đã chuẩn bị cho màn 14/16/18.

## 5. Quét 7 vi phạm VP-01…VP-07

| Mã | Mức | Cách giảng viên kiểm tra | Kết quả quét trên repo |
|---|---|---|---|
| VP-01 | −1.50 | `grep -rniE "api[_-]?key\|secret\|sk-" js/` | **Sạch.** Quét 5 regex (`sk-`, `AIza`, `ghp_`, `AKIA`, `Bearer …`) trên **cả 5 nhánh**: 0 khớp. `.env.example` chỉ khai tên biến, giá trị rỗng; key thật để ở biến môi trường máy chủ |
| VP-02 | −1.00 | Nhập `<img src=x onerror=alert(1)>` | **Không có lỗi.** 7 chỗ `innerHTML` trong `KiemDuyetVaQuanTri/*/js/main.js` đều đi qua `esc()` (định nghĩa tại dòng 18–47 của từng tệp); SV1 dùng `escapeHtml` trong `KhachHang/js/common.js`, SV2 dùng `escapeHtml` trong `DangNhapVaDangKy/01-dang-nhap/js/*.js` |
| VP-03 | −1.00 | So sánh ngày commit đầu của mã với ngày có `screen-inventory.md` | **Không vi phạm.** `docs/screen-inventory.md` vào repo ngày **4-10** (`bc325c2 Add screen-inventory.md documentation file`); commit HTML đầu tiên ngày **6-10** (`6091f84 Initialize project structure with HTML CSS JS assets`) chỉ tạo ba tệp rỗng trong `Trang 1/` và **không còn ở bất kỳ nhánh nào hiện nay**; các màn thật bắt đầu từ **13-10** |
| VP-04 | −1.00 | Đối chiếu các tệp trong `pages/` | **Không vi phạm.** Ba phân hệ có cấu trúc, CSS và JS riêng (`KhachHang/`, `KhongGianNguoiBan/`, `KiemDuyetVaQuanTri/`), không phải đổi tên trang |
| VP-05 | −1.00 | `git log --graph --oneline --all` | **Không vi phạm.** 152 commit đã push trên 6 nhánh, 69 commit trong 24h cuối nhưng là commit nhỏ theo từng màn, không phải "1–3 commit lớn dồn đêm cuối" |
| VP-06 | −0.50 | Quan sát trực tiếp "Lorem ipsum", "test1,test2,abc" | **Sạch.** Quét `lorem ipsum\|asdf\|test123\|dummy` trên `*.html`, `*.js`, `*.json`: 0 khớp; dữ liệu JSON là sản phẩm gốm thủ công có tên tiếng Việt |
| VP-07 | −1.00 | Đối chiếu `ai-usage-report.md` trong Vấn đáp | **Rủi ro thấp.** Cả ba người đều có khai chi tiết: SV3 mục 1–2, SV1 mục 3.1, SV2 trong `KhongGianNguoiBan/docs/ai-usage-report.md` và bản nhóm mục 3.2. Khai thiếu mới bị gạch −1.00đ; phần còn thiếu ở đây chỉ là **số phiên bản công cụ** và **nhật ký prompt không nằm trong repo** — hai điều này phải nói thẳng khi bảo vệ, không tô vẽ thành "có log đầy đủ" |

## 6. Lỗi cụ thể tìm thấy khi đối chiếu (kèm đường dẫn)

### 6.1 Liên kết chết (4 liên kết + 3 tham chiếu trong một trang)

| # | Tệp và chỗ tham chiếu | Trỏ tới | Hệ quả |
|---|---|---|---|
| 1 | `DangNhapVaDangKy/01-dang-nhap/khach-hang.html` | `forgot-password.html?role=customer` | 404 khi bấm "Quên mật khẩu" |
| 2 | `DangNhapVaDangKy/01-dang-nhap/nghe-nhan.html` | `forgot-password.html?role=artisan` | 404 |
| 3 | `DangNhapVaDangKy/01-dang-nhap/quan-tri.html` | `forgot-password.html?role=admin` | 404 |
| 4 | `DangNhapVaDangKy/02-dang-ky/js/main.js` | `forgot-password.html` | 404 |
| 5 | `KhachHang/forgot password.html` | `css/forgot passwork.css` | trang **không có định dạng** (thiếu dấu cách, sai chính tả "passwork") |
| 6 | `KhachHang/forgot password.html` | `js/auth-config.js` | tệp không tồn tại trong repo |
| 7 | `KhachHang/forgot password.html` | `js/auth-service.js` | tệp không tồn tại trong repo |

Bốn tham chiếu CSS lỗi (`url()`): `DangNhapVaDangKy/assets/css/style.css → ../img/forgot-hero.png`; `KhachHang/css/forgot password.css → ../img/hero-login.png` (ảnh thật nằm ở `DangNhapVaDangKy/assets/img/hero-login.png`) và `→ ../assest/img/img of forgot password.png` (sai tên thư mục: `assest`, và ảnh không có ở bất kỳ đâu).

**Đính chính một mô tả đang sai trong tài liệu:** `js/common.js` **có tồn tại** ở `KhachHang/js/common.js`; hai tệp thiếu thật là `js/auth-config.js` và `js/auth-service.js`. Vì `js/forgot password.js` dòng 2 chặn ngay ở `if (!window.CL || !window.CLAuth)`, hệ quả là form hiện dòng "Không tải được thành phần xác thực" chứ không phải trang trống hoàn toàn. `README.md` mục 15 và `docs/project-introduction.md` đã sửa theo; **`docs/sv1-assignment.md` dòng 23 vẫn còn câu "nạp ba script common.js, auth-config.js, auth-service.js không có trong nhánh"** — đây là tệp phân công của SV1 nên để SV1 tự sửa, không sửa hộ.

Cách sửa gọn cho SV1/SV2 (không cần viết logic mới): hoặc tạo `DangNhapVaDangKy/01-dang-nhap/forgot-password.html` rồi trỏ bốn liên kết về đó, hoặc đổi bốn liên kết đó thành `../../KhachHang/forgot%20password.html?role=…` và nhân tiện đổi tên tệp + thư mục theo quy chuẩn `role-function-action` ở mục 6.2.

### 6.2 Vi phạm quy chuẩn tên tệp (mục 2.4, −0.20đ gạch "đặt tên tệp sai quy chuẩn")

* `KhachHang/forgot password.html` — **có dấu cách**, không theo `role-function-action.html`.
* `KhachHang/css/forgot passwork.css` — dấu cách + sai chính tả.
* `docs/ai-usage -report.md` ở **nhánh `feature/sv1-buyer`** — dấu cách, và trùng nội dung với `docs/ai-usage-report.md` của nhánh SV3 → **sau khi gộp sẽ thành hai tệp**, một tệp sai tên ĐK5.
* `video.md` nằm ở **thư mục gốc** nhánh SV1 (bảng video thật đã ở `videos/README.md`).
* `KiemDuyetVaQuanTri/GopTrang.html` — PascalCase có dấu, không kebab-case.
* SV2/SV3 dùng `NN-ten-man/index.html`, SV1 dùng `ten-man.html`: hai quy ước song song trong cùng một sản phẩm.

### 6.3 Hai nội dung dễ bị hỏi ở Vấn đáp

* Bảng phân công trong README bản hiện tại ghi **số màn theo dòng kiểm kê (6/6/6)**, không phải số tệp HTML (10/4/8). Đã ghi rõ cách đếm ngay dưới bảng để không bị đọc nhầm là khai sai; `KhachHang/forgot password.html` và 5 tệp `DangNhapVaDangKy/` **đứng ngoài bảng kiểm kê 18 dòng**, nên nếu đưa vào demo thì phải bổ sung vào `screen-inventory.md` hoặc nói rõ là màn phụ.
* **README trên nhánh `main` là bản cũ và là thứ giảng viên thấy đầu tiên** (mặc định của repo là `main`). Bản `main` chỉ có **31 dòng, 3 mục `##`**, còn bản ở nhánh SV3 có **251 dòng, đủ 15 mục**. Bảng phân công trên `main` ghi SV1 **9** màn, SV2 **3** màn, đăng nhập/đăng ký **6** — không khớp 6/6/6 theo dòng kiểm kê — và ghi tên tính năng AI là "AI Personalization & Visual Matcher" cho SV1, trong khi `docs/ai-usage-report.md` mục 3.1 nói rõ **hai tính năng đó chưa được triển khai** (`screen-inventory.md` cũng phải ghi "định hướng, chưa triển khai"). Khai tên AI không có trong mã là nguy cơ trực tiếp cho VP-07 và cho Câu 3 vấn đáp. **Bản đã đối chiếu lại nằm ở `feature/sv3-admin-screens`; nó chỉ lên `main` sau khi trình tự gộp `dev → main` hoàn tất.**

## 7. Kiểm tra gộp nhánh (đã chạy thật lần hai ngày 26-10 sau khi hai nhánh bạn vừa push thêm commit)

Đã tạo lại nhánh tạm `integration/test` từ `origin/dev` (mới nhất) và lần lượt merge ba nhánh tính năng để đo xung đột:

* `feature/sv1-buyer` → `dev`: **merge sạch**, 0 xung đột.
* `feature/sv2-maker-screens` → `dev`: xung đột **2 tệp tài liệu** (`README.md`, `docs/team-assignment.md`), **không xung đột mã**.
* `feature/sv3-admin-screens` → `dev`: xung đột **4 tệp tài liệu** (`README.md`, `docs/screen-inventory.md`, `docs/sv2-assignment.md`, `docs/team-assignment.md`), **không xung đột mã**.
* Kết quả gộp đủ ba: **27 tệp HTML** trong cùng một cây làm việc — toàn bộ sản phẩm chỉ tồn tại ở trạng thái này. Quét liên kết trên chính cây đó: **384 tham chiếu `href`/`src` cục bộ, còn 6 đích hỏng**; cộng **4 đường dẫn `url()` trong CSS hỏng** (liệt kê ở mục 6.1). Không có tệp `.mp4` nào được theo dõi (`git ls-files | grep -c '\.mp4$'` = 0).

Toàn bộ xung đột đều ở tệp tài liệu, **mã nguồn không xung đột chỗ nào** — nên việc gộp là quyết định quản trị (ai bấm nút Merge), không phải rủi ro kỹ thuật.

Nhánh tạm `integration/test` **chưa push và chỉ dùng để kiểm chứng**; việc gộp thật vẫn phải làm bằng nút *Merge pull request* trên GitHub để giữ bằng chứng Peer Review cho mục 7.2.

## 8. Phân việc còn lại

**Cần một người bấm, làm được ngay (SV3):** bật GitHub Pages cho nhánh `dev` sau khi gộp, kiểm tra lại 404 tài nguyên bằng cửa sổ ẩn danh.

**Cần cả nhóm đồng ý:** gộp theo thứ tự PR #3 → #2 → #1 vào `dev`, rồi một PR `dev` → `main`; đóng PR #4 (đích sai, nội dung đã nằm trong nhánh SV3).

**Cần SV1:** sửa 7 tham chiếu hỏng ở mục 6.1 dòng 5–7 và đổi tên `forgot password.html` + `css/forgot passwork.css`; xóa `docs/ai-usage -report.md` và `video.md` ở gốc nhánh (dùng `videos/README.md`); xác nhận ánh xạ 3 video "4/7/9" và bổ sung phiên bản công cụ AI vào khai báo 3.1; bấm Approve PR #1 và #2. Lưu ý riêng cho SV1: **24 commit của SV1 chỉ có 1 commit theo chuẩn Conventional Commits** (bảng mục 3.2) — nếu bị hỏi Câu 4 thì giải thích là thao tác qua web GitHub, không phải không biết chuẩn.

**Cần SV2:** đọc lại và xác nhận mục 3.2 của `docs/ai-usage-report.md` (nội dung đã chuyển từ báo cáo phân hệ sang, SV2 vẫn phải đứng tên); sửa 4 liên kết `forgot-password.html`; chốt hướng xử lý cho sáu dòng 7–12 không có video (quay thêm, hoặc ghi rõ "nằm trong phạm vi demo 3 video/người" ngay trong `screen-inventory.md`); bấm Approve PR #1 và #3.

**Đã xong trong ngày 26-10 (không còn là việc của ai):** 3 link video OBS của SV2 đã vào `videos/README.md`, `docs/screen-inventory.md` và `docs/sv2-assignment.md` (commit `90d5fe1`, `677849b`, `98000c6`).

**Cả nhóm:** đổi 5 link Canva sang quyền "Bất kỳ ai có liên kết đều xem được" và mở thử bằng cửa sổ ẩn danh.

## 9. Checklist 24 giờ trước khi nộp (mục X.2 của barem, rút phần liên quan tới Git/board)

- [x] Repo công khai, có `main` + `dev` + `feature/*`
- [x] Board Trello công khai, 5 cột, mọi thẻ có hạn/nhánh/PR/tệp
- [ ] **PR #3, #2, #1 được gộp vào `dev` qua nút Merge, có Approve của người khác**
- [ ] **Link triển khai công khai mở được, không 404 tài nguyên**
- [ ] `docs/ai-usage-report.md` đủ khai báo cả 3 người
- [ ] Đủ video theo thỏa thuận, link dán vào `videos/README.md` và đúng cột OBS
- [ ] Link Canva ở chế độ xem công khai
- [ ] 6 tab trình duyệt đã mở sẵn khi vào bảo vệ: deploy URL, localhost, Canva, Trello, GitHub (PR + Insights/Network), thư mục video — kèm VS Code ở nhánh mới nhất
