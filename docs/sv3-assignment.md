# Phân công nhiệm vụ SV3 — Kiểm duyệt viên và Quản trị viên

> **Dự án:** CraftLink — Sàn thương mại điện tử sản phẩm thủ công tùy biến  
> **Học phần:** Phát triển Ứng dụng Web Cơ bản (CSE122) — Nhóm 11  
> **Thành viên phụ trách:** SV3 — Nguyễn Đình Quang Minh  
> **Phạm vi:** 6 màn hình thuộc phân hệ Quản trị viên và Kiểm duyệt viên.

## Thiết kế Canva

[Thiết kế Canva của SV3](https://canva.link/zqtyq0qivogb17s) — bài trình bày 6 trang cho khu quản trị.

[Bản thiết kế tổng hợp của nhóm](https://canva.link/10ir1xtkau6li7b) — Multi-design 32 trang; **trang 31 là mockup 404, trang 32 là mockup 403** mà SV3 đã dựng thành mã ngày 27-10-2026 (xem mục "Hai màn lỗi dùng chung" bên dưới).

## Vai trò và trách nhiệm

- **Quản trị viên (Admin):** theo dõi hoạt động nền tảng; quản lý danh mục, tài khoản và quy định nội dung.
- **Kiểm duyệt viên (Moderator):** xử lý hàng đợi sản phẩm, báo cáo vi phạm và khiếu nại.
- SV3 phụ trách giao diện, trạng thái và thao tác cho sáu màn hình dưới đây. Bảng kiểm kê sẽ được nhóm tổng hợp thành **một bảng chung** sau khi nhận danh sách của SV1, SV2 và SV3; tài liệu này không tạo bảng kiểm kê riêng cho từng thành viên.

## Phạm vi sáu màn hình

1. **Bảng điều khiển tổng quan** — `KiemDuyetVaQuanTri/01-dashboard/index.html`: xem doanh thu, đơn hàng, nghệ nhân đang hoạt động, bài đăng chờ duyệt, biểu đồ và nhật ký hệ thống.
2. **Hàng đợi kiểm duyệt sản phẩm** — `KiemDuyetVaQuanTri/04-moderation-queue/index.html`: xem nội dung/ảnh; duyệt, từ chối hoặc yêu cầu chỉnh sửa.
3. **Trung tâm báo cáo và khiếu nại** — `KiemDuyetVaQuanTri/05-report-center/index.html`: lọc báo cáo, xem bằng chứng, cập nhật tiến trình và xử lý vi phạm.
4. **Quản lý danh mục ngành hàng** — `KiemDuyetVaQuanTri/02-category-management/index.html`: tìm kiếm, thêm, sửa, ẩn/hiện hoặc xóa danh mục.
5. **Quản lý tài khoản người dùng** — `KiemDuyetVaQuanTri/03-user-management/index.html`: tìm tài khoản, xem thông tin và khóa/mở khóa theo quyết định của Admin.
6. **Quản lý quy định và tiêu chuẩn nội dung** — `KiemDuyetVaQuanTri/06-content-guidelines/index.html`: soạn, sửa, xem lịch sử phiên bản và xuất bản quy định.

> **Đường dẫn (cập nhật 26-10-2026).** Bản trước ghi `pages/admin-*.html` — sáu tệp này không tồn tại trong repo. Mã nguồn thật nằm trong sáu thư mục con của `KiemDuyetVaQuanTri/`, mỗi thư mục một `index.html`, mở chung được qua trang gộp `KiemDuyetVaQuanTri/GopTrang.html`.

## Hai màn lỗi dùng chung (bổ sung 27-10-2026)

Hai trang dựng lại **trang 31 và 32 của bản thiết kế tổng hợp**, đứng ngoài 18 dòng kiểm kê vì phục vụ toàn bộ site:

| Tệp | Vai trò | Nguồn vào |
| :--- | :--- | :--- |
| `404.html` | "Không tìm thấy trang" | GitHub Pages tự phục vụ tệp này cho mọi đường dẫn thiếu; khi chạy cục bộ thì Live Server/máy chủ tĩnh dùng cùng quy ước |
| `403.html` | "Bạn không có quyền truy cập" | `KiemDuyetVaQuanTri/js/navigation.js` đọc `cl_session` trước khi dựng menu; thiếu quyền thì `location.replace` lên trang này kèm `?need=…&screen=…` |

Năm chức năng thật, dùng chung `css/error-pages.css` và `js/error-pages.js`:

1. **Chẩn đoán** — đường dẫn thiếu lấy từ `location.pathname` (bỏ tiền tố gốc site), trang gửi tới từ `document.referrer`, tài khoản và vai trò từ `cl_session`; mọi giá trị chỉ ghi bằng `textContent`.
2. **Đích thật gần nhất** — bảng `MISLINKS` trong `js/error-pages.js` nối bốn kiểu liên kết sai đã đo ở `docs/barem-audit.md` mục 6.1 (`forgot-password.html` → `KhachHang/forgot password.html`, `video.md` → `videos/README.md`, `docs/ai-usage -report.md` → `docs/ai-usage-report.md`, thư mục `assest/` → `assets/`) với tệp đúng đang có trong repo. Trang lỗi không sửa mã hộ phân hệ khác, chỉ để người dùng không bị dồn vào đường cụt.
3. **Gợi ý màn hình** — chấm điểm từ khóa trên danh mục 27 đường dẫn thật của ba phân hệ, có ô tìm kiếm đánh không dấu (`tri → try`, debounce 120 ms).
4. **Nhật ký lỗi** — tối đa 20 bản ghi trong Local Storage (`craftlink:error-log`), gộp bản trùng trong 30 giây, hiển thị 5 bản gần nhất, có nút xóa.
5. **Ma trận quyền** — bảng 3×3 vai trò × phân hệ, tô đậm hàng của vai trò đang đăng nhập, và `storage` listener tải lại trang ngay khi phiên đổi ở tab khác.

Quyền kiểm duyệt khớp nhau giữa hai nơi: guard trong `navigation.js` và `NEEDED_ROLES` trong `error-pages.js` cùng chấp nhận `admin` cho màn quản trị, `admin` hoặc `moderator` cho màn kiểm duyệt. **Chưa đăng nhập = chế độ demo**, sáu màn quản trị vẫn mở để quay video; đây là lựa chọn có chủ đích vì bài là bản dựng giao diện, không có xác thực thật.

## Phân bổ AI theo barem CSE122, tiêu chí 6.1–6.3

### 6.1 — Một AI dùng chung, có nhiều năng lực nghiệp vụ

CraftLink dùng **một Trợ lý AI dùng chung**, không tạo sáu AI riêng và không biến mỗi màn hình thành một hộp chat hỏi đáp chung chung. Trợ lý nhận ngữ cảnh của trang đang mở rồi thực hiện đúng tác vụ nghiệp vụ tại trang đó. Barem yêu cầu nhóm có tối thiểu ba loại tính năng AI; các loại tính năng là năng lực khác nhau của cùng một Trợ lý AI, không đồng nghĩa phải có ba chatbot hay ba dịch vụ riêng.

- **AI-1 — Gợi ý/phân tích phục vụ người dùng chính:** nhóm thể hiện trên luồng Buyer/Maker do SV1/SV2 phụ trách, ví dụ gợi ý sản phẩm hoặc lập kế hoạch. Đây là tính năng cấp nhóm; không ép màn hình Admin/Moderator phải giả làm Buyer.
- **AI-2 — Cảnh báo rủi ro/phân loại:** đóng góp chính của SV3 trên Dashboard, Hàng đợi kiểm duyệt, Trung tâm báo cáo, Quản lý danh mục và Quản lý tài khoản.
- **AI-3 — Trợ lý chuyên môn/Copilot:** hỗ trợ tóm tắt, giải thích quy định và đề xuất bước xử lý trên Dashboard, Trung tâm báo cáo và Quản lý quy định.

### Năng lực của Trợ lý AI trên sáu màn hình SV3

> **Trạng thái triển khai (cập nhật 27-10-2026).** Mới có **ba** tác vụ AI nối vào giao diện và chạy được: `moderation-risk` (Hàng đợi kiểm duyệt), `report-triage` (Trung tâm báo cáo), `policy-copilot` (Quy định nội dung). Ba màn **Dashboard, Quản lý danh mục và Quản lý tài khoản** trong bảng dưới là **định hướng chưa cài đặt** — không trình bày là đã có. Mã nguồn ba tác vụ đã chạy nằm ở `KiemDuyetVaQuanTri/js/ai-client.js`, `js/ai-fallback.js` và `api/ai.js`. Trên bản công khai GitHub Pages (<https://nguyendinhquangminh.github.io/cse122-craftlink-team11/>), `api/ai.js` chỉ được phục vụ như tệp tĩnh nên cả ba tác vụ tự lùi về `ai-fallback.js` và giao diện in dòng "Nguồn:" đúng thực tế — muốn trình diễn mô hình thật phải chạy `python -m http.server` kèm Node cho endpoint, hoặc deploy ở nền tảng có runtime.

| Màn hình | Ngữ cảnh đầu vào | Kết quả AI và giải thích | Kiểm soát và lưu kết quả | Trường hợp không chắc chắn |
|---|---|---|---|---|
| **Dashboard** | Chọn khoảng thời gian; số liệu doanh thu, đơn hàng, tồn kho và hoạt động. | Cảnh báo bất thường hoặc tóm tắt vận hành; chỉ rõ chỉ số và khoảng thời gian làm căn cứ. | Admin có thể lưu cảnh báo vào nhật ký, đánh dấu đã xem hoặc bỏ qua. Lưu phải cập nhật trạng thái bản ghi. | Nếu thiếu dữ liệu, hiển thị “Chưa đủ dữ liệu để xác định bất thường”, kèm nút chọn khoảng thời gian khác hoặc thử lại. |
| **Hàng đợi kiểm duyệt** | Bài đăng đang chọn: tiêu đề, mô tả, ảnh và thông tin người đăng. | Phân loại nội dung, nêu nhóm quy định có thể liên quan, mức rủi ro và lý do. | Kiểm duyệt viên có thể chấp nhận gợi ý, sửa phân loại, tạo lại hoặc từ chối. Lưu gợi ý vào hồ sơ duyệt; quyết định duyệt/từ chối cuối cùng vẫn do người phụ trách xác nhận. | Nếu thiếu ảnh/mô tả hoặc độ tin cậy thấp, hiển thị cảnh báo “AI chưa chắc chắn — cần chuyên viên xác nhận”; có nút bổ sung thông tin hoặc chuyển sang xử lý thủ công. |
| **Trung tâm báo cáo** | Loại báo cáo, nội dung khiếu nại, bằng chứng và lịch sử xử lý liên quan. | Tóm tắt vụ việc, đề xuất mức ưu tiên/rủi ro và giải thích bằng chứng nào dẫn đến đề xuất. | Kiểm duyệt viên có thể chấp nhận, chỉnh sửa, tạo lại hoặc từ chối gợi ý. Lưu sẽ cập nhật mức ưu tiên/tóm tắt vào bản ghi báo cáo. | Nếu thiếu hoặc mâu thuẫn bằng chứng, nêu “Chưa đủ căn cứ”, kèm nút yêu cầu bổ sung bằng chứng hoặc chuyển xác minh thủ công. |
| **Quản lý danh mục** | Tên, mô tả, danh mục cha/con và các danh mục hiện có. | Đề xuất danh mục phù hợp, phát hiện tên trùng/gần trùng và giải thích tiêu chí phân loại. | Admin có thể áp dụng, sửa, tạo lại hoặc bỏ qua đề xuất. Áp dụng sẽ điền vào biểu mẫu; chỉ nút Lưu của Admin mới cập nhật danh mục. | Nếu mô tả quá ngắn hoặc có nhiều danh mục phù hợp, báo chưa đủ thông tin và cho phép nhập/chọn thủ công. |
| **Quản lý tài khoản** | Tài khoản đang chọn, vai trò, trạng thái và lịch sử hoạt động được phép hiển thị. | Tóm tắt dấu hiệu bất thường và đề xuất mức cần xem xét; nêu dữ liệu liên quan. | Admin có thể lưu ghi chú/cờ cần rà soát, sửa hoặc bỏ qua. AI không tự khóa/mở khóa tài khoản; thao tác đó cần Admin xác nhận riêng. | Nếu lịch sử không đủ, hiển thị “Không đủ dữ liệu để đánh giá”, không tự gán nhãn vi phạm; có nút mở hồ sơ để rà soát thủ công. |
| **Quy định nội dung** | Chủ đề, bản nháp, nội dung quy định hiện tại và phiên bản đang xem. | Copilot tóm tắt quy định, giải thích điều khoản liên quan hoặc đề xuất bản nháp có cấu trúc. | Admin có thể chấp nhận, chỉnh sửa, tạo lại hoặc từ chối. Chấp nhận cập nhật trình soạn thảo; Lưu tạo/cập nhật bản nháp, còn Xuất bản phải do Admin xác nhận. | Nếu chưa nhập chủ đề/nội dung hoặc yêu cầu mơ hồ, yêu cầu bổ sung thông tin hoặc chuyển sang soạn thủ công; không tự xuất bản. |

### 6.2 — Thể hiện đủ sáu bước AI UX

Mỗi thao tác AI phải thể hiện rõ chuỗi sau, dù giao diện dùng một panel chung hay nút theo ngữ cảnh:

1. **Input:** người dùng chọn bản ghi/thời gian hoặc nhập thông tin cần phân tích.
2. **Processing:** hiện trạng thái đang phân tích/loading; khóa nút gửi để tránh gửi lặp.
3. **Output:** trình bày gợi ý có thể đọc, sửa và áp dụng.
4. **Explain:** có mục “Vì sao AI đề xuất?”, căn cứ/dữ liệu liên quan và độ tin cậy khi phù hợp.
5. **Control:** có các lựa chọn **Chấp nhận**, **Chỉnh sửa**, **Từ chối/Bỏ qua**, **Tạo lại**.
6. **Save:** Chấp nhận/Lưu phải cập nhật thật vào bản ghi, biểu mẫu, nhật ký hoặc bản nháp theo ngữ cảnh; tải lại trang vẫn giữ thay đổi theo cơ chế dữ liệu của dự án.

Không dùng một kết quả tĩnh chỉ để minh họa nút. Khi người dùng chấp nhận, giao diện phải cho thấy trường dữ liệu hoặc trạng thái đã đổi.

### 6.3 — Kịch bản lỗi và độ không chắc chắn

Cần có kịch bản kiểm thử được trực tiếp trên giao diện. Ít nhất một tác vụ AI phải nhận đầu vào thiếu/mâu thuẫn hoặc tạo kết quả độ tin cậy thấp; nên chuẩn bị các ví dụ ở cả Hàng đợi kiểm duyệt và Trung tâm báo cáo. Giao diện cần:

- Nêu rõ vì sao chưa thể đưa ra đề xuất chắc chắn.
- Không tự thực hiện hành động rủi ro như khóa tài khoản, xóa nội dung, duyệt bài hoặc xuất bản quy định.
- Có hành động tiếp theo như **Bổ sung thông tin**, **Thử lại**, **Chuyển sang xử lý thủ công**.
- Giữ nguyên dữ liệu trước đó nếu AI lỗi; hiển thị thông báo lỗi riêng thay vì giả như không có kết quả.

## Luồng kiểm duyệt sản phẩm

1. Maker gửi bài đăng sản phẩm.
2. Bài đăng vào hàng đợi với trạng thái chờ duyệt.
3. Trợ lý AI dùng ngữ cảnh bài đăng để phân tích, hiển thị gợi ý, giải thích và mức độ chắc chắn.
4. Kiểm duyệt viên chấp nhận/chỉnh sửa/bỏ qua gợi ý rồi quyết định duyệt, từ chối hoặc yêu cầu chỉnh sửa.
5. Hệ thống lưu quyết định và cập nhật trạng thái để người đăng theo dõi.
6. Nếu AI thiếu dữ liệu hoặc không chắc chắn, kiểm duyệt viên xác minh thủ công.

## Yêu cầu giao diện và tương tác

- Dùng HTML có cấu trúc ngữ nghĩa; biểu mẫu có nhãn và kiểm tra dữ liệu đầu vào.
- Giao diện thích ứng với điện thoại, máy tính bảng và máy tính.
- Hỗ trợ bàn phím, có trạng thái focus dễ nhận biết và mô tả thay thế cho ảnh có ý nghĩa.
- Thể hiện trạng thái đang tải, rỗng, lỗi, thành công và xác nhận thao tác khi phù hợp.
- Sau thao tác thêm, sửa, khóa, duyệt hoặc từ chối, giao diện phải phản hồi rõ ràng và cập nhật dữ liệu đang hiển thị.

## Tiến độ

- [x] Ghi nhận liên kết Canva SV3.
- [x] Đưa mã nguồn sáu màn hình vào repo theo cấu trúc thư mục chung đã thống nhất.
- [x] Hoàn thiện thao tác, kiểm tra dữ liệu, trạng thái và thông báo kết quả.
- [x] Tích hợp một Trợ lý AI dùng chung cho ba tác vụ nghiệp vụ (kiểm duyệt, báo cáo, quy định).
- [x] Hoàn thiện đủ sáu bước AI UX trên các tác vụ AI được trình diễn.
- [x] Tạo và chạy thử ít nhất một kịch bản thiếu dữ liệu hoặc độ tin cậy thấp trên giao diện.
- [x] Kiểm tra responsive và khả năng truy cập.
- [x] Dựng hai màn lỗi 404/403 từ mockup Canva (trang 31–32), nối `navigation.js` và làm bốn chức năng đọc được trên trình duyệt.
- [x] Quay và gắn video OBS theo bảng kiểm kê chung sau khi nhóm tổng hợp đủ ba phần (ba link của SV3 ở `videos/README.md` dòng 14/16/18; hai màn lỗi không có video riêng).
- [x] Chạy chuỗi gộp nhánh Trục chéo 3 ngày 27-10-2026: PR #3 → `ec74e6b`, PR #2 → `a5a51e6`, PR #1 → `8eb9f51` vào `dev`, rồi PR #5 → `da3131b` về `main`. Sáu lượt xung đột đều ở tệp `.md`, **0 xung đột mã**; cách dệt lại từng ô ghi ở `barem-audit.md` mục 7.
- [x] Bật GitHub Pages cho nhánh `main` (thư mục gốc) kèm `.nojekyll` (`3e14704`), đặt `homepage` của repo, và đo bản công khai: 11/11 liên kết landing = 200, bốn lối vào = 200, `/duong-dan-sai` = HTTP 404 đúng trang `404.html` của nhóm (`custom_404: true`).
- [x] Giữ board Trello khớp repo: **23/31 thẻ ở cột "Đã gộp"** (**28/31** thẻ được tick, cột "Chờ review" trống), mô tả của `MERGE`/`DEPLOY`/`SCREENS`/`REVIEW`/`NAV`/`SWITCHER` ghi merge hash thật.
- [ ] Đưa bảng token về một nguồn chung (`css/style.css`) — hiện có sáu bảng `:root`, 0 màu hex chung; đo và lý do để sau khi nộp ghi ở `css/README.md`.
- [x] **PR #6 (`dev` → `main`) được duyệt và gộp sáng 27-10-2026**: mở 02:42, `hungxuan0411-cloud` bấm **Approve lúc 09:37** rồi **Merge lúc 10:01** → `origin/main` = `3eb8e53`; `docs/final-report.md` lên `main` và bản Pages. Đây là lượt APPROVED đầu tiên của repo, đủ bằng chứng peer review cho mục 7.2 (xem `barem-audit.md` mục 3.2).
- [x] **PR #13 và PR #12 được duyệt và gộp trưa 27-10-2026** (bộ chuyển vai trò + link về trang chủ): `hungxuan0411-cloud` **APPROVED** lúc 06:01:44Z / 06:02:20Z, merge `cca8b32` (vào `dev`) rồi `de818f6` (vào `main`); Pages build lại từ `de818f6` và `js/role-switcher.js` trả 200 trên bản công khai.

