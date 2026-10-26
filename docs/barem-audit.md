# Kiểm toán repo theo barem CSE122 V2 — lần đầu 26-10-2026, đối chiếu lại sau khi gộp nhánh và deploy ngày 27-10-2026

Tệp này ghi lại **kết quả đối chiếu trực tiếp** giữa barem (`Tài liệu hỗ trợ học tập — Barem Chấm Điểm & Quy Chế Vấn Đáp BTL`, 45 trang) và trạng thái thật của repository `NguyenDinhQuangMinh/cse122-craftlink-team11`. Mọi con số dưới đây lấy từ `git` và GitHub REST API (`api.github.com/repos/...`), không phải ước lượng. Đường dẫn tệp kèm số dòng để người chấm mở đúng chỗ.

## 1. Kết luận nhanh

1. **ĐK3 (triển khai công khai) đã đạt, ngày 27-10-2026.** GitHub Pages đang phục vụ nhánh `main`, thư mục gốc: <https://nguyendinhquangminh.github.io/cse122-craftlink-team11/>. API `GET /repos/.../pages` trả `status = "built"`, `custom_404 = true` (đường dẫn sai hiển thị `404.html` của dự án), `homepage` của repo đã trỏ về URL này. Tệp `.nojekyll` ở gốc repo (commit `3e14704`) tắt bước xử lý Jekyll để Pages phục vụ nguyên văn HTML/CSS/JS.
2. **Nhánh `main` và `dev` giờ chứa toàn bộ sản phẩm: 29 tệp HTML** — 19 tệp ứng 18 dòng kiểm kê, 5 tệp `DangNhapVaDangKy/`, `KhachHang/forgot password.html`, `KiemDuyetVaQuanTri/GopTrang.html`, `404.html`, `403.html` và trang landing `index.html` ở gốc (đếm chi tiết ở mục 6.4). Cây làm việc của `dev` và `origin/main` **trùng khít** (`git diff --stat dev origin/main` = rỗng).
3. **Ba PR phân hệ đã gộp hết vào `dev`, rồi `dev` → `main` qua PR #5**: `#3` = `ec74e6b`, `#2` = `a5a51e6`, `#1` = `8eb9f51`, `#5` = `da3131b`. Còn **PR #4 mở** (`docs/sv1-sync` → `feature/sv3-admin-screens`, sai base, nội dung đã nằm trong nhánh SV3) — nên đóng. **Không có commit mã nguồn nào được đẩy thẳng lên `main`**: trên đường first-parent của `main` có 48 commit không phải merge, thì 47 chỉ sửa tệp `.md` (thao tác qua giao diện web GitHub) và 1 là `6274151 Initial commit` (`.gitignore`, `LICENSE`, `README.md`). Gạch "đẩy code trực tiếp lên main không qua nhánh/PR" (−0.25đ) **không áp dụng cho mã sản phẩm** — xem mục 3.2.
4. Bốn điều kiện còn lại (ĐK1, ĐK2, ĐK4, ĐK5) **có đủ bằng chứng trong repo**; ĐK4 đã đủ 9/9 link video (3 người × 3 video) nhưng ba video của SV2 quay phân hệ đăng nhập — ba trang này **đứng ngoài 18 dòng kiểm kê** — nên vế "khớp 1:1 với `screen-inventory.md`" vẫn lệch với riêng phần Maker. ĐK4 phụ thuộc thỏa thuận 3 video/người đã báo giảng viên.
5. **Không có vi phạm mức VP-01 và VP-02** (quét bằng đúng mẫu lệnh mà barem nêu ở mục IV.2 — xem mục 5). Quét lại trên cây `main` ngày 27-10: 0 khớp mẫu dò khoá, 0 tệp `.mp4` được theo dõi.
6. **Việc còn lại duy nhất của SV3 trên GitHub: không còn.** Việc còn lại của cả nhóm dồn vào ba nhóm: (a) 7 liên kết chết + 4 đường dẫn `url()` hỏng thuộc SV1/SV2 (mục 6.1), (b) khai AI và video của SV1/SV2 (mục 8), (c) 5 link Canva đổi sang quyền xem công khai.

## 2. Năm điều kiện tiên quyết (ĐK1–ĐK5)

| ĐK | Barem yêu cầu (nguyên văn, tóm tắt) | Bằng chứng thật | Trạng thái | Việc còn lại |
|---|---|---|---|---|
| ĐK1 | Bảng kiểm kê màn hình + Sơ đồ User Flow + Thiết kế Figma/Canva | `docs/screen-inventory.md` dòng 3 có đủ **12 cột** (STT, Thành viên, Vai trò, Mục tiêu, Nhiệm vụ, Màn hình, Tệp HTML, CRUD/Trạng thái, AI, Phụ trách, Công việc/Nhánh, OBS Video) và 18 dòng; `docs/user-flow.md`, `docs/component-guide.md`, `docs/project-proposal.md`; link Canva ở README mục 10 | **Đạt** về tài liệu | 5 link Canva: 2 link dài đang ở dạng `/design/…/edit`, 3 link `canva.link/…` không lộ quyền xem qua URL → mở thử bằng cửa sổ ẩn danh rồi đổi sang "bất kỳ ai có liên kết xem được" |
| ĐK2 | Repo công khai, có `main`, `dev`, `feature/*`, commit và PR từ cả 3 thành viên | Repo `private = false`. Nhánh thật: `main` (`da3131b`), `dev` (`3e14704`), `feature/sv1-buyer`, `feature/sv2-maker-screens`, `feature/sv3-admin-screens`, `docs/sv1-sync`. Commit không-merge trên `main`: SV3 **100**, SV2 **44**, SV1 **23** (gộp theo email tác giả, vì mỗi bạn có hai tên git khác nhau). PR #1/#2/#3 có base `dev`, **đã merged**, mỗi PR có ý kiến của người khác | **Đạt** | Chỉ còn thiếu nhánh `fix/*` (không bắt buộc bởi ĐK2); đóng PR #4 |
| ĐK3 | Đã triển khai lên GitHub Pages/Vercel/Netlify, mở được qua đường dẫn công khai, kèm hướng dẫn chạy cục bộ trong README | <https://nguyendinhquangminh.github.io/cse122-craftlink-team11/> — Pages deploy từ `main`/gốc, `status = built`, `custom_404 = true`, `.nojekyll` ở gốc repo. Hướng dẫn chạy cục bộ: `README.md` mục 12 và `index.html` (khối "Chạy thử") | **Đạt** | Không còn. Nếu muốn ba tác vụ AI gọi mô hình thật thì deploy thêm ở Vercel (README mục 12 đã ghi biến môi trường cần đặt) |
| ĐK4 | Danh sách Video OBS tương ứng 1:1 với toàn bộ màn hình độc lập, có webcam + giọng thật | `videos/README.md`: **đủ 9 link** — SV3 3 (`LAlWYQg43LY`, `imsnvGvIofQ`, `3dCK3uHpIcY`), SV1 3 (`PaCFXYhuo9U`, `AW-wuwhA3zc`, `T6ejhOOqfgk`), SV2 3 (`BY0AAIjTSm8`, `2zrLFxVEpiU`, `d4kmFKU6ivg`, playlist `PLDaEqceEwiuk`) | **Đạt về số lượng, lệch về ánh xạ** | Ba video của SV2 quay `khach-hang.html` / `nghe-nhan.html` / `quan-tri.html` — ba trang này **đứng ngoài 18 dòng kiểm kê**; sáu dòng 7–12 (Maker) không có video. Chính báo cáo AI của SV2 vẫn ghi "video của bốn màn hình người bán sẽ quay và bổ sung sau". Phải giữ thỏa thuận 3 video/người bằng văn bản của giảng viên |
| ĐK5 | `docs/ai-usage-report.md` khai trung thực công cụ, prompt, phần AI sinh, phần tự kiểm chứng | SV3 mục 1–2; **SV1 mục 3.1 đủ 5 hạng mục**; **SV2 khai đầy đủ ở báo cáo cấp phân hệ** `KhongGianNguoiBan/docs/ai-usage-report.md` (nhánh `feature/sv2-maker-screens`) — công cụ Qoder, 6 prompt nguyên văn, bảng "AI sinh / cách kiểm chứng", hạn chế. Bản cấp nhóm mục 3.2 đã được chuyển nội dung của SV2 sang và ghi rõ **SV2 cần xác nhận** | **Đạt** — còn thiếu số phiên bản công cụ của cả ba người | SV2 đọc lại và xác nhận mục 3.2; cả nhóm bổ sung phiên bản công cụ |

## 3. Tiêu chí 7 — Quản lý công việc, Git/GitHub, triển khai (1.00đ)

### 3.1 Mục 7.1 (0.25đ) — Bảng công việc

Barem đòi: *tối thiểu 5 cột; mỗi thẻ gắn rõ thành viên phụ trách, hạn hoàn thành, tệp màn hình, tên nhánh Git, link Pull Request và link Video OBS.*

Board công khai: **<https://trello.com/b/N2HBpswf>** — `prefs.permissionLevel = "public"`, mở được bằng cửa sổ ẩn danh (HTTP 200).

| Cột board | Số thẻ | Ghi chú (đo lại từ `trello.com/b/N2HBpswf.json` ngày 27-10-2026) |
|---|---|---|
| Backlog | 7 | REVIEW (peer review, xem 3.2) · 2 thẻ FIX của SV1/SV2 cho mục 6.1 · 2 thẻ DOCS (khai AI, link Canva) · 1 thẻ VIDEO (SV1 đối chiếu 4/7/9) · 1 thẻ SWITCHER mới thêm sáng 27-10 (checklist mục 4, xem mục 9 dòng 4) |
| Đang làm | 0 | Trống vì toàn bộ phần SV3 đã gộp xong |
| Chờ review | 0 | Ba PR phân hệ đã merge nên không còn thẻ chờ |
| Đã gộp | 19 | 15 thẻ TASK + SCREENS (404/403) + MERGE + DEPLOY + VIDEO của SV2; MERGE và DEPLOY đã tick hoàn thành, mô tả ghi đúng merge hash |
| Video & bảo vệ | 3 | TASK-14, 16, 18 (SV3 — đã có link video, chờ quay vòng bảo vệ) |

**29/29 thẻ** đều có **hạn hoàn thành** và **mô tả** gắn `Nhánh · PR · Video · Màn hình` (+ `AI:` với màn có tính năng AI). 22/29 thẻ đang tick "Đánh dấu hoàn thành" (18 thẻ TASK + MERGE + DEPLOY + SCREENS + VIDEO của SV2). Hạn của 18 thẻ TASK lấy theo **ngày commit thật đưa tệp HTML lần đầu vào nhánh**: SV3 = 13-10-2026, SV1 và SV2 = 25-10-2026 (kiểm chứng bằng `git log --diff-filter=A`). Thẻ MERGE/DEPLOY/SCREENS mang merge hash thật (`ec74e6b`, `a5a51e6`, `8eb9f51`, `da3131b`, `2ce1f23`) nên mở ngược được trên GitHub.

### 3.2 Mục 7.2 (0.45đ) — Quy trình Git

Barem đòi 4 ý; kết quả từng ý:

* **Chiến lược nhánh (`main`, `dev`, `feature/*`, `fix/*`, `docs/*`)** — có `main`, `dev`, 3 nhánh `feature/*` (cả ba đã gộp vào `dev`), 1 nhánh `docs/sv1-sync`. **Không có `fix/*`.** Đánh giá: *gần đạt*.
* **Conventional Commits** — đo trên `origin/main` (`git log --no-merges`): **167 commit không-merge, 59 commit đúng chuẩn = 35%**, cộng 9 merge commit ⇒ tổng lịch sử `main` = **176 commit**. Chia theo người (gộp theo email vì mỗi bạn có hai tên git): SV3 **49/100 = 49%**, SV2 **10/44 = 23%**, SV1 **0/23 = 0%**. Phần lớn commit sai chuẩn là thông điệp tự sinh của trình soạn thảo web GitHub (`Update README.md`, `Update team-assignment.md`, `Create video.md`, `Delete video`) và các commit tài liệu của SV1/SV2. Từ 25-10 trở đi các commit mã nguồn đã theo chuẩn (`docs(admin): …`, `fix(queue): …`, `style(pages): …`, `feat(error-pages): …`). Không sửa lại lịch sử đã push — thay vào đó khai thật ở mục này và trình bày trong Vấn đáp Câu 4.
* **Đóng góp đều đặn qua các tuần** — số commit theo ngày trên `origin/main` (đã khử trùng lặp vì mọi nhánh đều đã được gộp về `main`): 3/10: 16 · 4/10: 11 · 6/10: 2 · 10/10: 1 · 11/10: 2 · 12/10: 3 · 13/10: 8 · 24/10: 4 · 25/10: 37 · 26/10: 84 · 27/10: 8. **Khoảng trống 14→23/10 không có commit nào.** Nhận định: có hoạt động ở ba tuần khác nhau nên không rơi vào gạch −0.45đ ("toàn bộ code trong 1–2 commit đêm cuối"), nhưng đồ thị Insights sẽ dốc đứng ở ba ngày cuối — nên nói trước điều này khi bị hỏi thay vì chờ người chấm phát hiện.
* **Mỗi nhánh tính năng gộp vào `dev` qua PR có Peer Review** — **cả ba PR đã merged vào `dev` ngày 27-10-2026 (01:14 giờ VN)**, `dev` → `main` qua PR #5 (`da3131b`). Số review thật, đọc bằng `GET /pulls/N/reviews`:
  * PR #1 (mã SV3): `minhd2577-droi` — **DISMISSED** (25-10, 2 inline comment), `hungxuan0411-cloud` — 1 issue comment (26-10). `NguyenDinhQuangMinh` — COMMENTED nhưng là người tạo PR nên **không tính peer review**.
  * PR #2 (mã SV2): `NguyenDinhQuangMinh` — COMMENTED (25-10, nêu điểm phải sửa, 2 inline), `hungxuan0411-cloud` + `minhd2577-droi` — issue comment (26-10).
  * PR #3 (mã SV1): `NguyenDinhQuangMinh` — COMMENTED (25-10, đã đọc 45 tệp, 2 inline), `hungxuan0411-cloud` — COMMENTED (26-10, là người tạo PR nên không tính peer).
  * PR #5 (`dev` → `main`): **không có review**. Đã thử gắn `requested_reviewers` qua API nhưng nhận `404` nên không mời được người duyệt — không bịa bằng chứng review cho PR này.
  * PR #4 (`docs/sv1-sync` → `feature/sv3-admin-screens`): vẫn **mở**, 0 review, **đích sai**; nội dung cần giữ đã vào nhánh SV3 nên chỉ việc đóng.
  * Đánh giá trung thực: *mọi PR đều có ý kiến của người khác trước khi gộp, nhưng repo **không có review trạng thái APPROVED** nào.* Khi Vấn đáp phải mở đúng trang review từng PR và nói rõ điều đó; tuyệt đối không nói "đã được approve".
* **Bằng chứng về commit trực tiếp trên `main`** — trên đường first-parent của `origin/main` có **48 commit không phải merge**, trong đó **47 commit chỉ sửa tệp `.md`** (thao tác qua giao diện web GitHub: `Update team-assignment.md`, `Update sv1-assignment.md`…) và 1 commit là `6274151 Initial commit` (`.gitignore` + `LICENSE` + `README.md`). **Không có commit nào đưa mã nguồn (HTML/CSS/JS/JSON) thẳng lên `main`** — mã nguồn đi theo đúng chuỗi nhánh tính năng → PR → `dev` → PR #5 → `main`. Cách xử lý phần tài liệu sửa trên `main`: khai thật, giải thích là ghi chú phân công nên bấm nhanh qua web, và từ 27-10 mọi thay đổi (kể cả tài liệu) đi qua PR.

### 3.3 Mục 7.3 (0.30đ) — Triển khai, README, ai-usage-report

| Hạng mục | Trạng thái | Bằng chứng |
|---|---|---|
| Link triển khai chạy thật, không 404 tài nguyên | **Đạt** | <https://nguyendinhquangminh.github.io/cse122-craftlink-team11/> — đo ngày 27-10: 11/11 liên kết trên trang landing trả 200; `css/style.css`, `css/error-pages.css`, `js/error-pages.js` trả 200; bốn lối vào (Khách hàng / Không gian người bán / Bảng điều khiển / Hàng đợi kiểm duyệt) trả 200; `/duong-dan-sai` trả HTTP 404 kèm `404.html` của dự án. **Vẫn còn 7 liên kết hỏng liệt kê ở mục 6.1** — chúng là trang người dùng phải bấm, không phải tài nguyên của trang đã chạy |
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
| VP-01 | −1.50 | `grep -rniE "api[_-]?key\|secret\|sk-" js/` | **Sạch.** Quét 5 regex (`sk-`, `AIza`, `ghp_`, `AKIA`, `Bearer …`) trên **toàn bộ cây làm việc ngày 27-10** (202 tệp, gồm cả 6 nhánh đã gộp về `main`): **0 khớp**. `.env.example` chỉ khai tên biến, giá trị rỗng; key thật để ở biến môi trường máy chủ |
| VP-02 | −1.00 | Nhập `<img src=x onerror=alert(1)>` | **Không có lỗi.** 7 chỗ `innerHTML` trong `KiemDuyetVaQuanTri/*/js/main.js` đều đi qua `esc()` (định nghĩa tại dòng 18–47 của từng tệp); SV1 dùng `escapeHtml` trong `KhachHang/js/common.js`, SV2 dùng `escapeHtml` trong `DangNhapVaDangKy/01-dang-nhap/js/*.js` |
| VP-03 | −1.00 | So sánh ngày commit đầu của mã với ngày có `screen-inventory.md` | **Không vi phạm.** `docs/screen-inventory.md` vào repo ngày **4-10** (`bc325c2 Add screen-inventory.md documentation file`); commit HTML đầu tiên ngày **6-10** (`6091f84 Initialize project structure with HTML CSS JS assets`) chỉ tạo ba tệp rỗng trong `Trang 1/` và **không còn ở bất kỳ nhánh nào hiện nay**; các màn thật bắt đầu từ **13-10** |
| VP-04 | −1.00 | Đối chiếu các tệp trong `pages/` | **Không vi phạm.** Ba phân hệ có cấu trúc, CSS và JS riêng (`KhachHang/`, `KhongGianNguoiBan/`, `KiemDuyetVaQuanTri/`), không phải đổi tên trang |
| VP-05 | −1.00 | `git log --graph --oneline --all` | **Không vi phạm.** `origin/main` có **176 commit / 9 merge commit**, hoạt động trải đều ở ba tuần (mục 3.2). 84 commit ngày 26/10 và 8 commit ngày 27/10 là commit nhỏ theo từng màn + chuỗi gộp nhánh, **không phải "1–3 commit lớn dồn đêm cuối"** |
| VP-06 | −0.50 | Quan sát trực tiếp trang chữ giả, dữ liệu "test 1 / test 2" | **Sạch trên sản phẩm.** Quét cùng lúc bốn mẫu chữ giả thường dùng trên `*.html`, `*.js`, `*.json`: **0 khớp**; dữ liệu JSON là sản phẩm gốm thủ công có tên tiếng Việt. Cụm từ mô tả chữ giả chỉ xuất hiện trong **hai tệp tài liệu** khi trích lại chính quy định của barem (`assets/data/README.md` dòng 3, `docs/barem-audit.md` dòng 83) — không nằm trong màn hình nào |
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

### 6.3 Hai màn lỗi 404/403 — đã bổ sung ngày 27-10-2026 (SV3)

Bản trước của tài liệu này ghi "trang 404 và 403 chưa tồn tại trong repo". Hiện đã có `404.html` và `403.html` ở gốc repo, `css/error-pages.css`, `js/error-pages.js`, kèm guard đầu `KiemDuyetVaQuanTri/js/navigation.js` (dòng 1–33). Hai trang dựng lại trang 31–32 của bản thiết kế Canva tổng hợp, nằm **ngoài** 18 dòng kiểm kê và không đánh số thêm dòng (bảng 18 dòng là đơn vị đối chiếu của mục 8.1).

Điều này **không** sửa giúp bảy chỗ liên kết chết ở mục 6.1: liên kết "Quên mật khẩu" vẫn trả về HTTP 404, chỉ khác là người xem thấy một trang có chẩn đoán và gợi ý màn hình thay vì trang trắng của máy chủ. Gạch điểm "liên kết chết" vẫn thuộc SV1/SV2.

Hai hệ quả tích cực đã kiểm chứng bằng trình duyệt trên máy (máy chủ tĩnh nội bộ cổng 8123, mô phỏng đúng quy ước phục vụ `404.html` của GitHub Pages, cả hai cách phục vụ `/` và `/cse122-craftlink-team11/`):
* Một đoạn script nhỏ ở phần đầu trang tính gốc site rồi chèn `<base>` và tạo stylesheet/JS bằng **đường dẫn tuyệt đối**. Không viết sẵn `<link>`/`<script>` tương đối trong HTML vì trình duyệt dò trước (preload scanner) tải ngay từ byte gốc, trước khi script chạy, nên sẽ sinh ra các request 404 **không có thật** như `/DangNhapVaDangKy/css/style.css`. Đã đo lại sau khi sửa: Network + Console chỉ còn đúng **một** yêu cầu 404, tức đường dẫn thiếu mà người dùng bấm (`/cse122-craftlink-team11/DangNhapVaDangKy/forgot-password.html`). Liên kết `index.html` ở header/footer trỏ đúng gốc repo, neo `#loi-noi-dung` vẫn ở lại trang đang hiển thị.
* `js/error-pages.js` tự chờ `DOMContentLoaded` vì nó được nạp bằng script tạo động (script động bỏ qua `defer`), nên mở bằng `file://` hay máy chủ đều chạy.
* Responsive đo bằng iframe cùng nguồn ở 320 / 375 / 768 / 1280 px: hai trang lỗi **không cuộn ngang** ở cả bốn cỡ. Số đo ban đầu ở 320 px là 406 px do ô nhãn của ma trận quyền chứa đường dẫn dài (`/KiemDuyetVaQuanTri/`) đẩy bản tối thiểu của thẻ; đã sửa bằng `overflow-wrap: anywhere` trên ô bảng và `min-width: 0` cho con của `.error-shell`.
* Chèn `<img src=x onerror=alert(1)>` vào đường dẫn và vào `?need=`/`?screen=`/`?from=` → **không phần tử nào được chèn**, không hộp thoại. Bằng chứng cho VP-02 mở rộng sang hai trang mới.
* Chuỗi nghiệp vụ đã chạy thật: vai `customer` mở `/KiemDuyetVaQuanTri/04-moderation-queue/` bị `navigation.js` chuyển sang `403.html?need=moderator&screen=…` với verdict "Thiếu quyền"; cùng URL đó với vai `admin` thì mở bình thường; ô tìm kiếm gõ "yeu thich" (không dấu) trả ra `KhachHang/favorites.html`; nút xoá nhật ký làm rỗng `craftlink:error-log`.
* **Ngày 27-10 hai trang này chạy trên bản công khai** (PR #5 = `da3131b` → Pages): `/cse122-craftlink-team11/duong-dan-sai` trả HTTP 404 kèm `404.html` của dự án, `custom_404 = true`. Các số đo ở mục 3.3 lấy trực tiếp trên URL công khai, không còn lấy từ máy chủ tĩnh cổng 8123 như bản trước.
* Một cải tiến nhỏ sau khi lên môi trường thật: `js/error-pages.js` không còn nối `?from=` vào link đăng nhập (các trang đăng nhập của SV2 không đọc tham số đó), thay bằng dòng "Cách quay lại" trong khối thông tin — người dùng biết phải mở lại màn bị chặn sau khi đăng nhập đúng vai.

### 6.4 Hai nội dung dễ bị hỏi ở Vấn đáp

* Bảng phân công trong README bản hiện tại ghi **số màn theo dòng kiểm kê (6/6/6)**, không phải số tệp HTML (**10/4/7** — đo `git ls-files '*.html'`). Đã ghi rõ cách đếm ngay dưới bảng để không bị đọc nhầm là khai sai. Cụ thể: SV1 có 10 tệp vì `KhachHang/forgot password.html` là màn ngoài kiểm kê; SV2 có 4 tệp cho 6 dòng vì dòng 10 và 11 (soạn và xem trước proposal) nằm trong cùng `KhongGianNguoiBan/03-proposal-editor/index.html`; SV3 có 7 tệp vì `KiemDuyetVaQuanTri/GopTrang.html` là trang tổng hợp. Cụ thể: **19 tệp ứng 18 dòng kiểm kê** (9 tệp `KhachHang/` cho sáu dòng 1–6, 4 tệp `KhongGianNguoiBan/` cho sáu dòng 7–12, 6 tệp `KiemDuyetVaQuanTri/0*-*/` cho sáu dòng 13–18) **+ 5 tệp `DangNhapVaDangKy/` + `KhachHang/forgot password.html` + `KiemDuyetVaQuanTri/GopTrang.html` + `404.html` + `403.html` + landing `index.html` ở gốc = 29.** Những màn đứng ngoài bảng 18 dòng nếu đưa vào demo phải nói rõ là màn phụ.
* **README trên nhánh `main` đã là bản đủ 15 mục** (từ PR #5, `da3131b`). Bản cũ trên `main` từng ghi SV1 **9** màn, SV2 **3** màn, đăng nhập/đăng ký **6** (không khớp 6/6/6 theo dòng kiểm kê) và ghi tên tính năng AI là "AI Personalization & Visual Matcher" cho SV1 — trái với `docs/ai-usage-report.md` mục 3.1 vốn nói rõ **hai tính năng đó chưa được triển khai**. Sau khi gộp, `main` lấy bảng 6/6/6 kèm ghi chú cách đếm, và chuỗi "AI Personalization"/"Visual Matcher" **chỉ còn xuất hiện ở dạng câu phủ định** trong `docs/ai-usage-report.md` dòng 82 ("Không khai AI Personalization, AI Visual Matcher…"), `docs/sv1-assignment.md` (cảnh báo cho SV1) và `KhachHang/DOC.md`. Kiểm tra lại bằng `grep -rn "Personalization\|Visual Matcher" --include=*.md`: 5 khớp, cả 5 đều là chỗ *nói rằng chưa làm*, không phải chỗ *khai là đã làm*.
* Còn một điểm phải nói trước nếu bị hỏi về ĐK5: cây `main` hiện có **hai tệp khai báo AI** — `docs/ai-usage-report.md` (17 074 byte) và `docs/ai-usage -report.md` (9 952 byte, tên có dấu cách, vào repo theo nhánh `feature/sv1-buyer`). **Chúng không trùng nhau** (88 dòng thêm / 69 dòng bớt), nên không thể xoá bừa một bên; SV1 phải quyết định gộp nội dung rồi đổi tên theo chuẩn. Gốc repo cũng còn `video.md` (1 048 byte, bảng "STT 4/7/9") song song với `videos/README.md` — việc của SV1, xem mục 6.2.

### 6.5 Bảng token chưa dùng chung — điểm yếu đo được của tiêu chí 4 (mục 5.2)

Barem (và checklist) đòi *cả ba thành viên dùng chung bảng màu, phông chữ, kích thước nút trong `css/style.css` (`:root`)* để giao diện nhìn như một sản phẩm thống nhất. Đo trên cây `main` ngày 27-10:

| Tệp khai `:root` | Số biến | Ghi chú |
|---|---|---|
| `css/style.css` (gốc) | 39 | **Chỉ `index.html`, `403.html`, `404.html` nạp tệp này** |
| `KhachHang/css/style.css` | 18 | SV1 |
| `DangNhapVaDangKy/01-dang-nhap/css/khach-hang.css` | 19 | SV2 (còn `nghe-nhan.css`, `quan-tri.css`, `assets/css/style.css` cũng khai `:root`) |
| `KhongGianNguoiBan/css/style.css` | 10 | SV2 |
| `KiemDuyetVaQuanTri/css/shared/admin/theme.css` · `…/moderator/theme.css` | 6 + 6 | SV3 |

* **Số màu hex chung cho cả sáu tệp: 0.** Font stack quan sát được: `Be Vietnam Pro` (5 tệp) · `Inter` (3) · `DM Sans` + `Fraunces` (2) · `Georgia` · `Segoe UI`.
* Hệ quả: nếu người chấm mở song song một màn Khách hàng và một màn Quản trị, hai trang **không** dùng cùng một bảng màu. Đây là chỗ bị gạch ở mục 5.2/Checklist chứ chưa phải lỗi hình thức.
* **Vì sao chưa sửa vội:** sáu màn quản trị đã được rà responsive + rà XSS theo bảng màu hiện tại; `KhachHang/`, `KhongGianNguoiBan/`, `DangNhapVaDangKy/` là mã của thành viên khác (nguyên tắc của nhóm: không sửa hộ màn của bạn). Gộp token hàng loạt sát giờ nộp sẽ làm hỏng toàn bộ kết quả đã kiểm chứng.
* Cách trả lời khi bị hỏi: thừa nhận repo còn sáu bảng `:root`, chỉ ra hướng đã ghi ở `css/README.md` (hợp nhất token vào `css/style.css`, đổi dần sang biến chung, đo lại 320/375/768/1280 px cho 29 trang), và nêu rằng **trang landing + hai trang lỗi đã dùng chung một bảng token** làm bằng chứng cho khả năng hợp nhất.

### 6.6 Đo trên CHÍNH BẢN CÔNG KHAI (checklist mục 5, 6, 19) — 27-10-2026

Bổ sung quan trọng: các số đo trước đây lấy từ máy chủ tĩnh trên máy. Mục này đo trực tiếp trên `https://nguyendinhquangminh.github.io/cse122-craftlink-team11/`.

**a) Mọi tham chiếu cục bộ được gọi bằng HTTP thật.** Duyệt cây `dev` + 46 tệp `.css`: **112 đích duy nhất** (từ `href`/`src`/`data-src` trong 29 tệp HTML và mọi `url()` trong CSS). Kết quả: **105 trả HTTP 200, 7 trả 404**. Bảy 404 trùng với bảng mục 6.1 + 4 đường dẫn `url()` đã ghi, và **không cái nào thuộc màn của SV3**:

| Đích 404 trên Pages | Ai nạp nó |
|---|---|
| `DangNhapVaDangKy/01-dang-nhap/forgot-password.html` | 3 trang cổng đăng nhập của SV2 |
| `KhachHang/css/forgot passwork.css` | `KhachHang/forgot password.html` (SV1) |
| `KhachHang/js/auth-config.js`, `KhachHang/js/auth-service.js` | cùng trang trên (SV1) |
| `DangNhapVaDangKy/assets/img/forgot-hero.png` | `DangNhapVaDangKy/assets/css/style.css` (SV2) |
| `KhachHang/assest/img/img of forgot password.png` | `KhachHang/css/forgot password.css` (SV1) |
| `KhachHang/img/hero-login.png` | `KhachHang/css/forgot password.css` (SV1) |

Bốn dòng sau là **tài nguyên thật bị 404** (CSS/ảnh), đúng câu chữ chế tài của 7.3 ("link deploy bị lỗi 404 tài nguyên, −0.15đ") và đúng điều checklist mục 19 cấm. Người ngoài không sửa được thay: ba thư mục liên quan đều là mã của SV1/SV2.

**b) Responsive 29 trang × 5 cỡ = 145 phép đo.** Cách đo: mở `index.html` của site thật, nạp từng trang trong iframe **cùng nguồn** đặt ở chiều rộng 320 / 375 / 640 / 768 / 1280 px, rồi lấy `documentElement.scrollWidth` so với `clientWidth`. Cỡ 640 px là đại diện trung thực cho "phóng to 200% trên màn 1280 px" mà checklist mục 6 yêu cầu (1280 ÷ 2 = 640). *Lưu ý phương pháp:* phép đo đầu tiên lấy cả `body.scrollWidth` nên báo nhầm hai trang quản trị tràn ngang; thực tế các trang đó đặt `html { overflow-x: clip }` và bản thân bảng rộng đã nằm trong hộp `overflow-x: auto`, nên **không có thanh cuộn ngang nào**. Số liệu dưới đây dùng `documentElement` — đơn vị đúng bằng thứ người xem nhìn thấy.

Kết quả: **27/29 trang không cuộn ngang ở cả năm cỡ.** Hai trang còn lại đều của SV1 và chỉ hỏng ở cỡ 320 px:

| Trang | 320 px | 375 px | 640 px | 768 px | 1280 px | Phần tử gây tràn |
|---|---|---|---|---|---|---|
| `KhachHang/customize.html` | **338** | 360 | ổn | ổn | ổn | `section.panel.customize-input-panel` |
| `KhachHang/forgot password.html` | **323** | 360 | ổn | ổn | ổn | `button.pw-toggle` |

Sửa đề xuất (một dòng CSS, không đụng logic): thêm `min-width: 0` cho `.customize-input-panel` (hoặc `overflow-wrap: anywhere` cho khối chứa) và `flex-shrink: 0`→`min-width:0` cho `.pw-toggle`. SV1 giữ tệp này, nên tôi không tự sửa.

**c) Cấu trúc HTML + alt + nhãn (checklist mục 5) — quét 29 tệp HTML, bỏ phần chú thích.**
* **Ảnh: 65 thẻ `<img>`, 0 thẻ thiếu `alt`.**
* **Ô nhập: 85 thẻ `<input>` (không tính hidden/submit/button), 75 cái có `<label for>` trỏ đúng `id`, 10 cái còn lại có `aria-label`; 0 nhãn mồ côi** (tức không `<label for>` nào trỏ vào id không tồn tại).
* Thiếu thẻ ngữ nghĩa còn **6/29** sau khi sửa `GopTrang.html` hôm nay (thêm `<header>` bao khối sidebar, thay `<aside class="sidebar">` bằng `<header class="sidebar">`; CSS chỉ định vị bằng lớp `.sidebar` nên không đổi hình dạng):

| Tệp | Còn thiếu |
|---|---|
| `DangNhapVaDangKy/01-dang-nhap/index.html` | không `<header>`, `<nav>`, `<main>`, `<footer>` (SV2) |
| `DangNhapVaDangKy/02-dang-ky/index.html` | **2 thẻ `<h1>`** (SV2) |
| `KhongGianNguoiBan/01-listing-management/index.html` | không `<footer>` (SV2) |
| `KhongGianNguoiBan/02-brief-inbox/index.html` | không `<footer>` (SV2) |
| `KhongGianNguoiBan/03-proposal-editor/index.html` | không `<footer>` (SV2) |
| `KhongGianNguoiBan/04-shop-profile/index.html` | không `<footer>` (SV2) |

Sáu màn của SV3, hai trang lỗi `404/403` và landing `index.html` **đủ cả bốn thẻ ngữ nghĩa, đúng một `<h1>`**.

**d) Bộ dữ liệu JSON thật (checklist mục 9).** Repo có **5 tệp `assets/data/*.json`**, tất cả trong `KiemDuyetVaQuanTri/`: `categories.json` **15** bản ghi, `guidelines.json` **15**, `products.json` **20**, `reports.json` **20**, `users.json` **20** — nằm trọn trong dải 15–25 mà barem đòi, không có `test 1`/Lorem ipsum. Hai phân hệ còn lại không dùng `.json`: SV1 lưu trên `localStorage` (`CART_KEY`, `FAVORITES_KEY`, `LAST_ID_KEY`, `LOG_KEY`), SV2 dùng `KHO_GIAN_HANG`, `USERS_KEY`, `SESSION_KEY`, `ATTEMPT_KEY`; barem cho phép "JSON / localStorage / MockAPI" nên cách này hợp lệ, chỉ khác đường dẫn ví dụ trong barem. Tổng cộng 97 lần gọi `localStorage` trên 14 tệp JS — đủ bằng chứng cho mục 11 (dữ liệu sống lại sau F5).

## 7. Gộp nhánh — ĐÃ thực hiện và push ngày 27-10-2026

Chuỗi merge giữ nguyên lịch sử (merge commit, không squash):

| Bước | Merge commit | Xung đột |
|---|---|---|
| `feature/sv1-buyer` → `dev` (PR #3) | `ec74e6b` | 0 |
| `feature/sv2-maker-screens` → `dev` (PR #2) | `a5a51e6` | 2 tệp `.md` (`README.md`, `docs/team-assignment.md`) |
| `feature/sv3-admin-screens` → `dev` (PR #1) | `8eb9f51` | 4 tệp `.md` (`README.md`, `docs/screen-inventory.md`, `docs/sv2-assignment.md`, `docs/team-assignment.md`) |
| `dev` → `main` (PR #5) | `da3131b` | 0 |
| Tệp `.nojekyll` để Pages phục vụ tệp tĩnh nguyên văn | `3e14704` | — |

**Cách xử lý xung đột** (đây là chỗ người chấm hay hỏi "ai quyết định, dựa trên gì"):

* **0 xung đột mã nguồn** — 6 lượt xung đột đều ở tệp `.md`, nên gộp nhánh là quyết định quản trị, không phải rủi ro kỹ thuật.
* `README.md` và `docs/team-assignment.md`: lấy bản SV3 (đủ 15 mục, bảng 6/6/6) rồi **nối lại các ô của đồng đội**. Hai ô sai sự thật đã sửa: rút "AI Brief Summarizer" khỏi ô của SV2 (trong mã không có) và thay bằng *AI Copywriter & SEO; AI Cost & Timeline Advisor — bộ quy tắc cục bộ*; thêm dòng **AI-1** cho trợ lý ở trang đăng nhập (khớp từ khoá `BOT_RULES`, không gọi mô hình) để câu "tám tính năng AI, năm tính năng còn lại là bộ quy tắc cục bộ" đúng với mã.
* `docs/screen-inventory.md`: **dệt theo ô** — dòng 1–6 lấy từ nhánh SV1 (đường dẫn `KhachHang/*.html` thật), dòng 7–12 giữ nguyên văn chữ của SV2, dòng 13–18 lấy từ nhánh SV3. Cột OBS của những dòng không có video ghi rõ "Không quay riêng — nằm trong phạm vi demo …"; **tên tệp video chưa tồn tại bị bỏ ra** thay vì giữ lại làm minh chứng ảo. Bảng vẫn đúng **18 dòng**.
* `docs/sv1-assignment.md`, `docs/sv2-assignment.md`: **lấy bản của chính người phụ trách**, không sửa hộ (mục 8 liệt kê chỗ cần các bạn tự sửa).
* `videos/README.md`: lấy bản đã có đủ 9 link sau hai commit khôi phục của SV2.

Đo lại trên cây gộp (`dev` và `origin/main` có cây làm việc trùng khít): **29 tệp HTML**, **403 tham chiếu `href`/`src` cục bộ**, còn **6 đích hỏng trong HTML** + 1 trong JS (`DangNhapVaDangKy/02-dang-ky/js/main.js:199`) — đúng 7 dòng ở bảng mục 6.1; **4 đường dẫn `url()` trong CSS hỏng**; 0 tệp `.mp4` được theo dõi; 0 khớp mẫu dò khoá bí.

Nhánh tạm `integration/test` từng tạo ngày 26-10 chỉ để đo xung đột và **chưa bao giờ push**. Ba PR phân hệ được GitHub đánh dấu *merged* ở cùng thời điểm push `dev` (01:14 ngày 27-10 giờ VN) vì head commit của mỗi nhánh tính năng đã tới được từ `dev`.

## 8. Phân việc còn lại (cập nhật sau gộp + deploy, 27-10-2026)

**Không còn việc tồn đọng cho SV3 trên Git/GitHub:** ba PR phân hệ đã gộp vào `dev` (`ec74e6b`, `a5a51e6`, `8eb9f51`), `dev` → `main` qua PR #5 (`da3131b`), GitHub Pages đã build và đo, `homepage` của repo đã trỏ về URL công khai, 19/29 thẻ Trello nằm ở cột "Đã gộp" với mô tả chứa merge hash thật. Phần còn lại của SV3 là **kỹ thuật trình bày khi Vấn đáp** (mở sẵn 6 tab, mục 9) và **thẻ SWITCHER vừa mở** (mục 9 dòng 4) — nếu còn giờ thì làm một phần.

**Cần cả nhóm đồng ý (một người bấm):** đóng PR #4 (`docs/sv1-sync` → `feature/sv3-admin-screens`, sai base, nội dung đã vào nhánh SV3). Nếu nhóm còn mở PR nào nữa (kể cả PR tài liệu), **người khác phải bấm Approve trước khi Merge** — đây là cách duy nhất để mục 7.2 có thêm bằng chứng, vì ba PR phân hệ đã gộp nên không còn cửa bổ sung Approve.

**Cần cả nhóm quyết (phát hiện ngày 27-10 khi rà checklist mục 4):** sản phẩm **không có bộ chuyển đổi giữa ba vai trò**. Landing `index.html` và `GopTrang.html` lo được hai đầu, nhưng từ một trang của SV1 không có liên kết nào sang phân hệ SV2/SV3 — demo liên vai đành phải quay về trang chủ hoặc gõ URL. Cách nhẹ nhất: một tệp `js/role-switcher.js` dùng chung (nút nổi ghi ba tên vai, đọc `cl_session` để biết vai hiện tại, điều hướng tới trang gốc của từng phân hệ) rồi **mỗi người thêm một dòng `<script>` vào trang của mình**. Tôi viết phần dùng chung và gắn vào các trang do SV3 giữ; 19 trang của SV1/SV2 phải chính các bạn cắm dòng đó (nguyên tắc không sửa màn của nhau).

**Cần SV1:** sửa 3 tham chiếu hỏng ở mục 6.1 dòng 5–7 và đổi tên `KhachHang/forgot password.html` + `css/forgot passwork.css` theo chuẩn `role-function-action`; **hai trang của SV1 là hai trang duy nhất trong 29 trang bị cuộn ngang ở cỡ 320 px** (đo trên bản công khai, mục 6.6b): `customize.html` tràn tới 338 px do `section.panel.customize-input-panel`, `forgot password.html` 323 px do `button.pw-toggle` — chỉ cần `min-width: 0` / `overflow-wrap: anywhere`; quyết định xử lý `docs/ai-usage -report.md` (9 952 byte, tên có dấu cách, **nội dung khác** bản `docs/ai-usage-report.md` 17 074 byte — phải gộp chữ rồi mới xoá, không xoá một bên bừa bãi); xử lý `video.md` ở gốc repo (1 048 byte, bảng "STT 4/7/9") — trùng `videos/README.md`; xác nhận ánh xạ 3 video "4/7/9" và bổ sung phiên bản công cụ AI vào khai báo 3.1; tự sửa `docs/sv1-assignment.md` dòng 23 (đang ghi `common.js` không tồn tại — tệp **có tồn tại** ở `KhachHang/js/common.js`). Lưu ý riêng: **23 commit của SV1 trên `main` có 0 commit theo chuẩn Conventional Commits** (mục 3.2) — nếu bị hỏi Câu 4 thì giải thích là thao tác qua web GitHub, không phải không biết chuẩn.

**Cần SV2:** đọc lại và xác nhận mục 3.2 của `docs/ai-usage-report.md` (nội dung đã chuyển từ báo cáo phân hệ sang, SV2 vẫn phải đứng tên); sửa **4** liên kết `forgot-password.html` (3 trong `DangNhapVaDangKy/01-dang-nhap/*.html` và 1 chuỗi trong `DangNhapVaDangKy/02-dang-ky/js/main.js:199`) **cộng ảnh nền `DangNhapVaDangKy/assets/img/forgot-hero.png` đang 404 trên bản deploy**; **6 trang của SV2 thiếu thẻ ngữ nghĩa** theo bảng mục 6.6c (`01-dang-nhap/index.html` thiếu cả `<header> <nav> <main> <footer>`, `02-dang-ky/index.html` có **hai** `<h1>`, bốn trang `KhongGianNguoiBan/` thiếu `<footer>`) — toàn bộ là thẻ bao ngoài, không đụng logic; chốt hướng xử lý cho sáu dòng 7–12 không có video (quay thêm, hoặc giữ cách ghi hiện tại trong `screen-inventory.md`: "Không quay riêng — nằm trong phạm vi demo SV2").

**Đã xong trong ngày 26 và 27-10 (không còn là việc của ai):** 3 link video OBS của SV2 vào `videos/README.md` + `docs/screen-inventory.md` + `docs/sv2-assignment.md` (`90d5fe1`, `677849b`, `98000c6`); hai màn `404.html`/`403.html` + `css/error-pages.css` + `js/error-pages.js` + guard `KiemDuyetVaQuanTri/js/navigation.js` (`2ce1f23`); chuỗi gộp nhánh và bật Pages; **`KiemDuyetVaQuanTri/GopTrang.html` đã có `<header>`** (thẻ bao khối sidebar, đo checklist mục 5 — commit cục bộ trên `dev`, chưa push).

**Cả nhóm:** đổi 5 link Canva sang quyền "Bất kỳ ai có liên kết đều xem được" và mở thử bằng cửa sổ ẩn danh. Đo ngày 27-10: hai link dài vẫn ở dạng `/design/…/edit` (`README.md` dòng 172 và 176), ba link còn lại là kiểu rút gọn `canva.link/…` (dòng 173–175) nên **không nhìn URL mà biết được quyền xem** — phải mở thử bằng cửa sổ ẩn danh. Ghi chú `README.md` dòng 179 hiện đã tự nêu đúng thực trạng đó.

## 9. Checklist 20 mục của barem (mục X.2) — đối chiếu từng dòng, có số đo

Barem bắt **cả ba ngồi cùng nhau tick đủ 20 mục trong 24 giờ trước khi nộp**. Bảng dưới là phần tôi rà thay được bằng phép đo thật, ngày 27-10-2026, trên bản công khai. Cột "Ai quyết" là chỗ không thể làm hộ.

| # | Khối | Mục kiểm tra | Trạng thái đo được | Ai quyết / việc còn lại |
|---|---|---|---|---|
| 1 | 1 | `screen-inventory.md` đủ 100% màn hình, khớp 1:1 với tệp trong `pages/` | **Đạt phần kiểm kê, lệch phần đường dẫn**: bảng đúng **18 dòng**, 29 tệp HTML trong repo = 19 tệp ứng 18 dòng + 10 màn phụ (mục 6.4). Repo **không có thư mục `pages/`** — barem lấy `pages/*.html` làm ví dụ cấu trúc, nhóm dùng `-role/NN-man/index.html` và đã ghi lý do trong README | Cả nhóm: chọn giữ cấu trúc hiện tại và giải trình, hay dọn về `pages/` (không nên làm sát giờ nộp) |
| 2 | 1 | Link Figma/Canva mở quyền xem công khai; đủ Sitemap, User Flow, Desktop+Mobile Mockup, Component Guide, AI Mockup | **Chưa đạt**: 5 link đều là link **chỉnh sửa** (đo: 2 link `/design/…/edit`, 3 link rút gọn không đọc được quyền từ URL). Trong tệp: Sitemap + User Flow (`docs/user-flow.md`), mockup desktop, **trang Component Guide chưa có trong Canva** | Cả nhóm bấm "Anyone with the link can view" + mở thử ẩn danh; vẽ thêm trang Component Guide vào Canva |
| 3 | 1 | Mọi tệp HTML tên kiểu `role-function-action.html`, kebab-case, tiếng Anh, không dấu | **Một phần**: `KhachHang/` dùng tiếng Anh kebab nhưng có `forgot password.html` (dấu cách) và `css/forgot passwork.css`; `DangNhapVaDangKy/`, `KhongGianNguoiBan/`, `KiemDuyetVaQuanTri/` dùng thư mục tiếng Việt + `index.html` | SV1 đổi tên `forgot password.html`; đổi tên hàng loạt là việc cả nhóm, để sau buổi nộp (mục 6.2) |
| 4 | 1 | Có thanh điều hướng / bộ chuyển đổi nhanh giữa các **Role** để demo liền mạch, không phải gõ URL | **Chưa đạt — khoảng trống thật lớn nhất còn lại.** Quét 29 tệp HTML: **0** trang có role-switcher. Landing `index.html` có 4 thẻ vai trò (đi từ trang chủ được), `KiemDuyetVaQuanTri/GopTrang.html` chuyển được giữa 6 màn quản trị, nhưng **mỗi phân hệ là một silo kín**: vào `KhachHang/*` rồi thì không có liên kết nào ra `KhongGianNguoiBan/*` hay `KiemDuyetVaQuanTri/*` | Cần một người thêm **một dòng** gọi script dùng chung vào các trang của mình. Tôi làm được cho phần SV3 + landing; phần SV1/SV2 phải chính các bạn bấm vì nguyên tắc không sửa màn của nhau |
| 5 | 2 | Mọi trang có `<header> <nav> <main> <footer>`, đúng 1 `<h1>`, mọi `<img>` có `alt`, mọi ô nhập có `<label>` | **Đạt gần tuyệt đối về alt/nhãn**: 65 ảnh **0 thiếu alt**; 85 ô nhập có 75 `<label for>` khít id + 10 `aria-label`, **0 nhãn mồ côi**. Thiếu thẻ ngữ nghĩa còn **6/29**, **tất cả thuộc SV2** (`01-dang-nhap/index.html` thiếu cả 4 thẻ; `02-dang-ky/index.html` có 2 `<h1>`; 4 trang `KhongGianNguoiBan/` thiếu `<footer>`). `GopTrang.html` của SV3 đã sửa hôm nay | SV2 thêm `<header>/<nav>/<main>/<footer>` và bỏ `<h1>` thứ hai — mỗi chỗ là vài thẻ bao ngoài, không đổi logic |
| 6 | 2 | DevTools ở 320 / 375 / 768 / 1280 px và phóng to 200%: không vỡ khung, không cuộn ngang ngoài ý muốn | **Đã đo thật, 145 phép đo**: 27/29 trang sạch ở cả năm cỡ (320/375/640/768/1280; 640 = 200% của 1280). Hai trang hỏng đều của SV1 và chỉ ở 320 px: `customize.html` (338 px, do `section.panel.customize-input-panel`) và `forgot password.html` (323 px, do `button.pw-toggle`) | SV1 thêm `min-width:0`/`overflow-wrap:anywhere` theo gợi ý ở mục 6.6b |
| 7 | 2 | Tab thấy `:focus-visible`, Esc đóng Modal | **Đạt trên màn SV3 + hai trang lỗi** (đã kiểm bằng trình duyệt: skip-link, viền focus, Esc đóng modal/drawer). Chưa đo tự động cho 19 trang SV1/SV2 | SV1/SV2 bấm Tab + Esc trên trang của mình, 10 phút |
| 8 | 2 | Ba thành viên dùng chung bảng màu/chữ/nút trong `css/style.css` (`:root`) | **Chưa đạt, đo được**: **6 bảng `:root`**, **0 màu hex chung** (mục 6.5). Landing + `404` + `403` dùng chung một bảng gốc — bằng chứng cho hướng hợp nhất | Sau buổi nộp. Khi bị hỏi: trả lời theo mẫu ở mục 6.5 |
| 9 | 3 | `assets/data/*.json` hoặc localStorage có 15–25 bản ghi thật, đúng ngữ cảnh | **Đạt**: 5 tệp JSON ở `KiemDuyetVaQuanTri/assets/data/` với **15/15/20/20/20** bản ghi; dữ liệu chuyên ngành gốm thủ công, không Lorem ipsum. SV1/SV2 dùng `localStorage` (97 lời gọi, khoá `CART_KEY`, `FAVORITES_KEY`, `KHO_GIAN_HANG`, `USERS_KEY`…) — barem cho phép | Không còn việc |
| 10 | 3 | Tìm từ khóa + lọc đa tiêu chí + sắp xếp/phân trang **kết hợp được nhau** | **Đạt trên 4 màn SV3** (`02`, `04`, `05`, `06` có `sort(`/phân trang) và `KhachHang/js/main.js`, `copywriter.js` của bạn | Kiểm Demo: mỗi người chạy liên hoàn tìm → lọc → sắp trên trang của mình |
| 11 | 3 | Create / Update / Cancel-Archive lưu vào localStorage/API và **giữ nguyên sau F5** | **Đạt**: các màn SV3 ghi qua `PREFIX + collection` nên F5 còn; SV1 có `LAST_ID_KEY`/`LOG_KEY`; SV2 có thao tác archive trong `01-listing-management/js/main.js` | Chụp/ghi lại thao tác F5 lúc demo cho chắc |
| 12 | 3 | Chuẩn bị cách kích hoạt nhanh 4 trạng thái: Normal / Loading / Empty / Error | **Đạt trên 6 màn SV3** (tìm từ khóa không tồn tại ra Empty, `js/ai-fallback.js` ra Loading + Error khi không có khoá AI). Chưa ghi sẵn kịch bản cho màn SV1/SV2 | Mỗi người viết 1 dòng "gõ gì để thấy lỗi" vào `videos/README.md` hoặc ghi miệng trước buổi demo |
| 13 | 3 | Cả 3 tính năng AI đủ 6 bước Input → Processing → Output → Explainability → User control → Save/Apply | **Đạt trên 3 tác vụ AI của SV3** (bằng chứng mã: `04-moderation-queue/js/main.js:220` in `%` độ tin cậy + khuyến nghị + các yếu tố; `:337` tiêu đề "AI phân loại rủi ro sản phẩm"; `:365` ghi quyết định kèm dòng "kiểm duyệt viên vẫn là người quyết định"). SV1 có AI advisor + AI sản phẩm (`KhachHang/js/ai-advisor.js`); SV2 có copywriter | SV1/SV2 đọc lại 6 bước trên trang mình trước khi quay/demo |
| 14 | 3 | Có ít nhất 1 kịch bản AI Failure / Uncertainty UX | **Đạt** (rò AI không có khoá + độ tin cậy thấp, đã chạy thử — xem `docs/sv3-assignment.md` mục Tiến độ) | SV1/SV2 nên có 1 kịch bản của mình để đủ vai |
| 15 | 4 | Board công khai, mỗi Task ghi Task ID, Screen, Assignee, Branch, PR Link, OBS Link | **Đạt**: `trello.com/b/N2HBpswf` public, 5 cột, **29 thẻ**, 29/29 có hạn + mô tả, 22/29 đã tick, 19 thẻ "Đã gộp" | Không còn việc; chỉ cập nhật khi có link video mới hoặc khi làm thẻ SWITCHER |
| 16 | 4 | Đủ `main`, `dev`, `feature/*`; commit theo Conventional Commits; **mọi PR có nhận xét của thành viên khác TRƯỚC khi merge** | **Một phần**: nhánh đủ; **176 commit không-merge, 35% đúng chuẩn** (SV3 49/100, SV2 10/44, SV1 0/23); có nhận xét trên cả 3 PR phân hệ nhưng **không có lượt APPROVED nào**, PR #5 gộp `dev→main` không có review | **Cửa duy nhất còn lại**: mở PR tài liệu (`b195741`) và để người khác Approve trước khi merge. Cần bạn quyết + cần một thành viên bấm |
| 17 | 4 | Số video OBS = đúng số màn độc lập; mọi video mở được, có mặt + giọng + sửa trực tiếp + commit | **Rủi ro đã ghi**: thoả thuận miệng với thầy **3 video/người = 9**, trong khi kiểm kê 18 dòng (mục 4). 9 link YouTube đã dán; **SV2 chưa link cho dòng 7–12, SV1 mới dán 3 link cho dòng 2/4/5** | SV1/SV2 dán link còn thiếu + xác nhận ánh xạ "4/7/9"; nếu thầy đòi 1:1 thì phải quay thêm — chỉ các bạn làm được |
| 18 | 4 | `docs/ai-usage-report.md` + `README.md` trung thực, đủ mục bắt buộc | **Đạt cho phần đã đo**: README **15 mục**, ai-usage-report khai 3 tác vụ AI đã nối + phần AI sinh + lỗi AI + phần SV tự sửa; chuỗi "AI Personalization/Visual Matcher" chỉ còn ở dạng câu phủ định (mục 6.4). Còn **hai tệp khai báo song song** trên `main` (17 074 B và 9 952 B tên có dấu cách) và `video.md` ở gốc | SV1 quyết gộp/xoá; cả ba bổ sung **phiên bản công cụ AI** |
| 19 | 4 | Kiểm tra link deploy trên ẩn danh + trên điện thoại: **không ảnh/CSS/JS nào 404** | **Đo HTTP thật**: 105/112 đích trả 200, **7 đích 404** — 4 là tài nguyên (2 CSS/JS của trang quên mật khẩu SV1 + 3 ảnh nền qua `url()`), 3 liên kết trỏ tới `forgot-password.html` không tồn tại. **0 lỗi thuộc màn SV3** | SV1/SV2 sửa theo bảng 6.6a; đây là chỗ 7.3 bị trừ −0.15 nếu để nguyên |
| 20 | 4 | Cả 3 tập duyệt demo 6 phút + tự làm thử ≥3 đề trong ngân hàng 24 đề Live Modification | **Chưa làm** — việc của người, không đo hộ được | Ba bạn lịch hẹn 1 buổi; xem `docs/barem-audit.md` mục 8 và đề cương ôn cá nhân |

**Bốn mục chưa đạt cần quyết định ngay hôm nay:** 2 (quyền xem Canva — một người bấm), 4 (Role Switcher), 16 (một lượt Approve thật qua PR tài liệu), 19 (404 tài nguyên của SV1/SV2). Mục 17 và 20 là việc bắt buộc của thành viên, không ai làm thay.

**Sáu tab phải mở sẵn khi vào bàn chấm** (quy chế yêu cầu mở nhanh, không kịp giải thích): ① bản deploy <https://nguyendinhquangminh.github.io/cse122-craftlink-team11/>, ② `index.html` chạy local (máy chủ tĩnh, **không mở bằng `file://`** vì `fetch()` bị chặn), ③ Canva quyền xem công khai, ④ board Trello, ⑤ GitHub (PR #1/#2/#3 đã merged + Insights → Networks để chứng minh ba người cùng commit), ⑥ thư mục `video/` với 9 link đã mở sẵn, kèm VS Code ở `main` mới nhất và Terminal để gõ `git diff` khi được yêu cầu.
