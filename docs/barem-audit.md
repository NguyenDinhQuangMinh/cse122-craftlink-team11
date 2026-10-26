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
| Backlog | 6 | REVIEW (peer review, xem 3.2) · 2 thẻ FIX của SV1/SV2 cho mục 6.1 · 2 thẻ DOCS (khai AI, link Canva) · 1 thẻ VIDEO (SV1 đối chiếu 4/7/9) |
| Đang làm | 0 | Trống vì toàn bộ phần SV3 đã gộp xong |
| Chờ review | 0 | Ba PR phân hệ đã merge nên không còn thẻ chờ |
| Đã gộp | 19 | 15 thẻ TASK + SCREENS (404/403) + MERGE + DEPLOY + VIDEO của SV2; MERGE và DEPLOY đã tick hoàn thành, mô tả ghi đúng merge hash |
| Video & bảo vệ | 3 | TASK-14, 16, 18 (SV3 — đã có link video, chờ quay vòng bảo vệ) |

**28/28 thẻ** đều có **hạn hoàn thành** và **mô tả** gắn `Nhánh · PR · Video · Màn hình` (+ `AI:` với màn có tính năng AI). Hạn của 18 thẻ TASK lấy theo **ngày commit thật đưa tệp HTML lần đầu vào nhánh**: SV3 = 13-10-2026, SV1 và SV2 = 25-10-2026 (kiểm chứng bằng `git log --diff-filter=A`). Thẻ MERGE/DEPLOY/SCREENS mang merge hash thật (`ec74e6b`, `a5a51e6`, `8eb9f51`, `da3131b`, `2ce1f23`) nên mở ngược được trên GitHub.

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

**Không còn việc tồn đọng cho SV3 trên Git/GitHub:** ba PR phân hệ đã gộp vào `dev` (`ec74e6b`, `a5a51e6`, `8eb9f51`), `dev` → `main` qua PR #5 (`da3131b`), GitHub Pages đã build và đo, `homepage` của repo đã trỏ về URL công khai, 19/28 thẻ Trello nằm ở cột "Đã gộp" với mô tả chứa merge hash thật. Phần còn lại của SV3 chỉ là **kỹ thuật trình bày khi Vấn đáp**: mở sẵn 6 tab (mục 9).

**Cần cả nhóm đồng ý (một người bấm):** đóng PR #4 (`docs/sv1-sync` → `feature/sv3-admin-screens`, sai base, nội dung đã vào nhánh SV3). Nếu nhóm còn mở PR nào nữa (kể cả PR tài liệu), **người khác phải bấm Approve trước khi Merge** — đây là cách duy nhất để mục 7.2 có thêm bằng chứng, vì ba PR phân hệ đã gộp nên không còn cửa bổ sung Approve.

**Cần SV1:** sửa 3 tham chiếu hỏng ở mục 6.1 dòng 5–7 và đổi tên `KhachHang/forgot password.html` + `css/forgot passwork.css` theo chuẩn `role-function-action`; quyết định xử lý `docs/ai-usage -report.md` (9 952 byte, tên có dấu cách, **nội dung khác** bản `docs/ai-usage-report.md` 17 074 byte — phải gộp chữ rồi mới xoá, không xoá một bên bừa bãi); xử lý `video.md` ở gốc repo (1 048 byte, bảng "STT 4/7/9") — trùng `videos/README.md`; xác nhận ánh xạ 3 video "4/7/9" và bổ sung phiên bản công cụ AI vào khai báo 3.1; tự sửa `docs/sv1-assignment.md` dòng 23 (đang ghi `common.js` không tồn tại — tệp **có tồn tại** ở `KhachHang/js/common.js`). Lưu ý riêng: **23 commit của SV1 trên `main` có 0 commit theo chuẩn Conventional Commits** (mục 3.2) — nếu bị hỏi Câu 4 thì giải thích là thao tác qua web GitHub, không phải không biết chuẩn.

**Cần SV2:** đọc lại và xác nhận mục 3.2 của `docs/ai-usage-report.md` (nội dung đã chuyển từ báo cáo phân hệ sang, SV2 vẫn phải đứng tên); sửa **4** liên kết `forgot-password.html` (3 trong `DangNhapVaDangKy/01-dang-nhap/*.html` và 1 chuỗi trong `DangNhapVaDangKy/02-dang-ky/js/main.js:199`); chốt hướng xử lý cho sáu dòng 7–12 không có video (quay thêm, hoặc giữ cách ghi hiện tại trong `screen-inventory.md`: "Không quay riêng — nằm trong phạm vi demo SV2").

**Đã xong trong ngày 26 và 27-10 (không còn là việc của ai):** 3 link video OBS của SV2 vào `videos/README.md` + `docs/screen-inventory.md` + `docs/sv2-assignment.md` (`90d5fe1`, `677849b`, `98000c6`); hai màn `404.html`/`403.html` + `css/error-pages.css` + `js/error-pages.js` + guard `KiemDuyetVaQuanTri/js/navigation.js` (`2ce1f23`); chuỗi gộp nhánh và bật Pages.

**Cả nhóm:** đổi 5 link Canva sang quyền "Bất kỳ ai có liên kết đều xem được" và mở thử bằng cửa sổ ẩn danh. Đo ngày 27-10: hai link dài vẫn ở dạng `/design/…/edit` (`README.md` dòng 171 và 175), ba link còn lại là kiểu rút gọn `canva.link/…` (dòng 172–174) nên **không nhìn URL mà biết được quyền xem** — phải mở thử bằng cửa sổ ẩn danh. `README.md` dòng 178 hiện tự ghi cả năm liên kết đang là link chỉnh sửa.

## 9. Checklist 24 giờ trước khi nộp (mục X.2 của barem, rút phần liên quan tới Git/board)

- [x] Repo công khai, có `main` + `dev` + `feature/*`
- [x] Board Trello công khai, 5 cột, mọi thẻ có hạn/nhánh/PR/tệp — 28 thẻ, 19 thẻ "Đã gộp"
- [x] **PR #3, #2, #1 đã gộp vào `dev` (commit `ec74e6b`, `a5a51e6`, `8eb9f51`), `dev` → `main` qua PR #5 (`da3131b`)** — *chưa* có đủ điều: không có review APPROVED nào, chỉ có COMMENTED/DISMISSED + issue comment (mục 3.2)
- [x] **Link triển khai công khai mở được, không 404 tài nguyên** — <https://nguyendinhquangminh.github.io/cse122-craftlink-team11/>, đo ngày 27-10 (mục 3.3)
- [ ] `docs/ai-usage-report.md`: SV2 xác nhận mục 3.2; cả ba bổ sung **phiên bản công cụ**; SV1 quyết định gộp `docs/ai-usage -report.md` (tệp trùng tên gần giống, sai chuẩn ĐK5)
- [x] Đủ video theo thỏa thuận 3/người, 9 link đã dán vào `videos/README.md` và cột OBS — [ ] ánh xạ dòng 7–12 và "4/7/9" vẫn cần SV1/SV2 chốt (mục 4, 8)
- [ ] Link Canva ở chế độ xem công khai
- [ ] 6 tab trình duyệt đã mở sẵn khi vào bảo vệ: deploy URL, localhost, Canva, Trello, GitHub (PR + Insights/Network), thư mục video — kèm VS Code ở nhánh `main` mới nhất
