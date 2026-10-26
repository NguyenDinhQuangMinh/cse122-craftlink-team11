# Báo cáo minh bạch sử dụng AI — CraftLink

Barem yêu cầu ở đâu: ĐK5 — "Có tệp báo cáo `docs/ai-usage-report.md` khai báo trung thực các công cụ AI, câu lệnh prompt, phần AI sinh và phần sinh viên tự kiểm chứng/chỉnh sửa"; VP-07 trừ **1.00đ** nếu tệp thiếu hoặc khai không trung thực.

Tệp này là báo cáo cấp nhóm. Phần chi tiết của phân hệ quản trị ở `../KiemDuyetVaQuanTri/docs/ai-usage-report.md`. SV1 đã khai ở mục 3.1; SV2 phải tự bổ sung mục 3.2 trước khi nộp.

---

## 1. AI nằm trong sản phẩm

Toàn bộ lời gọi mô hình đi qua **một** điểm cầu `api/ai.js` (hàm serverless trên Vercel, chuẩn OpenAI-compatible chat completions, buộc trả về JSON). Khóa API nằm ở biến môi trường máy chủ `AI_API_URL`, `AI_API_KEY`, `AI_MODEL`; **không có khóa nào trong mã nguồn hoặc trong trình duyệt**.

| Loại tác vụ | Màn hình dùng | Minh chứng cho | Dữ liệu gửi lên mô hình | Kết quả trả về |
|---|---|---|---|---|
| `moderation-risk` | STT 14 Hàng đợi kiểm duyệt | 6.1 | Thông tin sản phẩm đang mở + toàn bộ quy định đang hiệu lực | độ tin cậy, danh sách yếu tố, hướng xử lý đề xuất |
| `report-triage` | STT 15 Trung tâm báo cáo | 6.1 | Bản ghi báo cáo + lý do + trạng thái | phân loại và mức ưu tiên |
| `policy-copilot` | STT 18 Quy định nội dung | 6.1 | Danh sách nhóm quy định + các quy định hiện có | tiêu đề và bản nháp quy định |
| `product-discovery` | STT 1–6 (chưa nối giao diện) | 6.1 | Nhu cầu người mua mô tả bằng lời | danh sách sản phẩm gợi ý kèm lý do |

Ngoài bốn loại tác vụ chạy qua `api/ai.js`, ba phân hệ còn có các tính năng "AI" **chạy hoàn toàn bằng bộ quy tắc cục bộ, không gọi mô hình nào**. Bảng dưới đây ghi đúng trạng thái đó để không ai hiểu nhầm là đã gọi mô hình:

| Tính năng | Phân hệ | Tệp | Có gọi mô hình? |
|---|---|---|---|
| Trợ lý gợi ý sản phẩm & nghệ nhân | SV1 | `KhachHang/js/ai-advisor.js` | Không — tệp ghi rõ "KHÔNG phải AI tạo sinh và KHÔNG gọi API bên ngoài" |
| Gợi ý nội dung brief | SV1 | `KhachHang/customize.html`, `KhachHang/js/main.js` (`buildSummary`, `runSummary`) | Không |
| Copywriter & SEO mô tả sản phẩm | SV2 | `KhongGianNguoiBan/js/ai/copywriter.js` | Không — dòng 2: "Máy không gọi model nào" |
| Tóm tắt brief | SV2 | `KhongGianNguoiBan/02-brief-inbox/` | Không |
| Gợi ý chi phí & thời gian | SV2 | `KhongGianNguoiBan/03-proposal-editor/` | Không |
| Kiểm duyệt, triage, policy copilot | SV3 | `KiemDuyetVaQuanTri/js/ai-client.js` + `ai-fallback.js` | Có, nếu máy chủ có khóa; ngược lại dùng bộ quy tắc |

Văn bản prompt thật nằm trong `api/ai.js`, đọc trực tiếp được, không ẩn sau thư viện.

**Trải nghiệm AI bắt buộc theo barem 6.1–6.3** được cài một lần trong `KiemDuyetVaQuanTri/js/ai-client.js` cho cả ba màn hình: Nhập → Đang xử lý → Kết quả → Giải thích lý do → Chấp nhận / Chỉnh sửa / Tạo lại / Từ chối → Lưu vào ứng dụng. Thời gian chờ tối đa 25 giây.

**AI không tự quyết định.** Kết quả chỉ là đề xuất; hành động lưu chỉ xảy ra sau khi người dùng bấm xác nhận, và quyết định cuối cùng được ghi kèm dấu vết "AI hỗ trợ" để phân biệt với quyết định thủ công.

**Chế độ dự phòng khi chưa có AI thật.** Nếu máy chủ chưa cấu hình khóa hoặc trang chạy tĩnh, `KiemDuyetVaQuanTri/js/ai-fallback.js` phân tích bằng bộ quy tắc trên đúng dữ liệu của bản ghi đang mở, và **giao diện hiển thị rõ dòng "Nguồn:"** nói kết quả đến từ đâu. Đây là giới hạn đã biết, không phải lỗi ẩn.

## 2. AI hỗ trợ quá trình làm bài

Công cụ: **Qoder** (trợ lý lập trình dạng agent, có quyền đọc/ghi tệp và chạy lệnh trong thư mục dự án).

Việc đã giao cho AI và người thực hiện phải tự kiểm chứng:

| AI sinh / đề xuất | Sinh viên kiểm chứng bằng cách nào |
|---|---|
| Đối chiếu mã nguồn với từng mục barem, liệt kê tiêu chí còn thiếu | Mở lại tệp barem và đối chiếu từng dòng được nêu tên |
| Rà lỗi HTML ngữ nghĩa, accessibility (`alt`, `label`, `aria-*`, Esc đóng modal) | Bấm phím Tab và Esc trên trình duyệt, mở DevTools Accessibility |
| Đo responsive ở 320 / 375 / 768 / 1280 px và phát hiện cuộn ngang ngoài ý muốn | Tự kéo cửa sổ và xem `scrollWidth` trong Console |
| Soạn và chỉnh `README.md`, `docs/screen-inventory.md`, `docs/user-flow.md`, các tệp `README.md` mô tả thư mục | Đọc lại từng câu, sửa chỗ mô tả sai so với mã |
| Dựng sơ đồ User Flow và chụp ảnh mockup từ chính trang đã chạy | Mở sơ đồ cạnh màn hình thật, đối chiếu nhãn trạng thái với mã |
| Đề xuất điểm sửa mã trực tiếp để quay video OBS | Chạy thử đề xuất trên máy trước khi tin |
| Rà trạng thái tải của Trung tâm báo cáo và đề xuất lỗi vòng lặp sắp xếp | Mở trang, xác nhận 20 bản ghi hiển thị, thử sắp xếp, lọc, mở chi tiết và chạy AI trước khi nhận kết quả |
| Dựng hai màn lỗi `404.html`, `403.html` cùng `css/error-pages.css`, `js/error-pages.js` và guard vai trò đầu `KiemDuyetVaQuanTri/js/navigation.js` (27-10-2026) | Mở trang lỗi bằng máy chủ tĩnh trên máy theo đúng quy ước của GitHub Pages; đối chiếu từng dòng chữ với trang 31–32 của mockup Canva; đăng nhập ba vai trò có và không có `cl_session` để xem verdict đổi; đọc Console sau khi chuyển stylesheet/JS sang đường dẫn tuyệt đối để chắc chỉ còn một request 404 thật; đo `scrollWidth − clientWidth` bằng iframe ở 320/375/768/1280 px (lần đo đầu ở 320 px trang lỗi rộng 406 px, lệch 101 px, phải thêm `overflow-wrap` cho ô bảng); chèn thử `<img src=x onerror=alert(1)>` vào đường dẫn và `?need=` để xác nhận không có thẻ nào được tạo |
| Viết message commit, mô tả Pull Request | Đọc trước khi push; commit chỉ mang tên sinh viên |

Prompt tiêu biểu đã dùng (nguyên văn, rút gọn):

- "Dựa vào phần code của tôi, bạn hãy xem trong barem còn thiếu sót những gì không, trong file này có phần nào bị thừa đi thì bạn có thể xóa cho gọn."
- "Tôi định chọn các trang số 2-4-6 để có thể quay video theo tiêu chí số 8 trong barem, bạn hãy xem tôi có thể dùng được những tác vụ cũng như đáp ứng yêu cầu barem hay không."
- "Những gì bạn push trong commit có ghi là tài khoản của tôi hay ghi là Bạn đã commit?"
- "Mockup là gì đấy, tôi chưa làm mockup."
- "Bạn có thể vào git tạo các thư mục và tên tương ứng với yêu cầu/tiêu chí trong barem không."
- "Bạn có thể check link canva của nhóm tôi, tôi đã thêm vào 2 trang khi không thể tìm thấy cũng như bị lỗi là 403 và 404. Bạn có thể code rồi thêm vào với phần giao diện cũng như các chức năng tương tự vào trong phần code của tôi."

Giới hạn của phần AI hỗ trợ: AI **không** tự quyết định phạm vi nghiệp vụ, không tự chọn cấu trúc dữ liệu, và không được push code lên GitHub khi sinh viên chưa duyệt kế hoạch. Mọi thay đổi đều được xem diff trước khi commit.

## 3. Phần khai báo của SV1 và SV2

Mục 3.1 và 3.2 dưới đây lấy theo khai báo của chính SV1 và SV2; cột "Dữ kiện đã kiểm chứng" ghi đường dẫn mở lại được trong repo. Riêng bản của SV2 nằm ở cấp phân hệ (`KhongGianNguoiBan/docs/ai-usage-report.md`, nhánh `feature/sv2-maker-screens`) và được chuyển sang đây nguyên nội dung — **SV2 cần đọc lại và xác nhận** phần chuyển này.

### 3.1 SV1 — Khách hàng

| Hạng mục | Nội dung SV1 khai | Dữ kiện đã kiểm chứng trong repo | Trạng thái |
|---|---|---|---|
| Công cụ AI đã dùng khi làm bài | **Qoder** — viết/sửa mã, soạn tài liệu, thao tác Git theo yêu cầu. **ChatGPT** và **Claude** — sinh viên tự khai có dùng thêm; phạm vi chi tiết chưa có nhật ký. Phiên bản công cụ: **[CẦN XÁC MINH]**. | Commit/PR trong repo cá nhân và repo nhóm; không có nhật ký prompt đầy đủ trong repo | **đã khai một phần** — còn phiên bản và phạm vi ChatGPT/Claude |
| Prompt tiêu biểu | (1) 2026-10-11: “Nhiệm vụ của tôi là xây dựng giao diện trang dành cho NGƯỜI MUA bằng HTML, CSS và JavaScript thuần. … Không yêu cầu backend, database, framework hoặc API phức tạp.” (2) 2026-10-15: “bạn hãy tạo lại link favorites cho tôi tại link cũ khi tôi bấm hủy hết phần yêu thích thì nó mất hết ản phẩm” [sic]. (3) 2026-10-24: “Tôi muốn bổ sung một tính năng AI giúp người dùng mô tả nhu cầu của mình, sau đó nhận được tư vấn và gợi ý sản phẩm hoặc thợ thủ công phù hợp. **Yêu cầu quan trọng nhất:** Chỉ bổ sung tính năng AI vào giao diện hiện có. Không thiết kế lại website, không thay đổi bố cục hiện tại và không tự ý sửa các chức năng đang hoạt động.” | Nhật ký phiên làm việc Qoder trên máy sinh viên; **không nằm trong repository** | **đã khai** — người chấm không mở lại được toàn bộ log |
| Phần AI sinh trong mã | `KhachHang/js/ai-advisor.js` (toàn bộ trợ lý tìm kiếm cục bộ); phần `buildSummary` / `runSummary` trong `KhachHang/js/main.js` (bản tóm tắt brief); phần lớn JavaScript còn lại và các tài liệu `docs/` do AI soạn, SV1 đọc lại và sửa. HTML/CSS do SV1 viết, có tham khảo AI. | `KhachHang/js/ai-advisor.js`; `KhachHang/js/main.js` (`buildSummary`, `runSummary`); `docs/` | **đã khai** — tỷ lệ phần trăm chính xác **[CẦN XÁC MINH]** |
| AI sai ở đâu, sửa thế nào | **Lỗi trạng thái rỗng trang yêu thích:** bỏ hết sản phẩm yêu thích thì lưới bị ẩn nhưng khối “Chưa có sản phẩm yêu thích” không hiện. Sửa bằng `#favorites-empty` trong `KhachHang/favorites.html` và tính `isEmpty` trong `KhachHang/js/main.js` để ẩn lưới, hiện khối rỗng. | Prompt báo lỗi 2026-10-15; mã sửa đã đọc trực tiếp | **đã khai** — việc lỗi do AI sinh là suy luận từ phạm vi, không có log từng dòng |
| Chế độ AI trong sản phẩm | **Bộ quy tắc cục bộ, không gọi mô hình.** CraftLink AI và bản tóm tắt brief đều chạy bằng luật JavaScript. `artisan-suggestions.html` không phải AI. Không có API key, không có `fetch` ra ngoài. | `KhachHang/js/ai-advisor.js` ghi ngay đầu tệp: “KHÔNG phải AI tạo sinh và KHÔNG gọi API bên ngoài”; `KhachHang/artisan-suggestions.html` ghi “chưa kết nối mô hình AI tạo sinh” | **đã khai** |

> Không khai AI Personalization, AI Visual Matcher hoặc AI Proposal Evaluator: repo không có mã tương ứng. Nếu giữ các tên này trong `screen-inventory.md`, phải ghi rõ “định hướng, chưa triển khai”.

### 3.2 SV2 — Thợ thủ công

SV2 đã khai đầy đủ trong báo cáo cấp phân hệ [`KhongGianNguoiBan/docs/ai-usage-report.md`](../KhongGianNguoiBan/docs/ai-usage-report.md) (nhánh `feature/sv2-maker-screens`). Bảng dưới đây **chuyển nội dung đó sang bản cấp nhóm**, giữ nguyên chữ của SV2; đường dẫn kiểm chứng là tệp thật trong nhánh, đối chiếu được bằng `git show origin/feature/sv2-maker-screens:KhongGianNguoiBan/docs/ai-usage-report.md`.

| Hạng mục | Nội dung SV2 khai | Dữ kiện đã kiểm chứng trong repo | Trạng thái |
|---|---|---|---|
| Công cụ AI đã dùng khi làm bài | **Qoder** — trợ lý lập trình dạng agent (đọc/ghi tệp, chạy lệnh trong thư mục dự án). Phạm vi khai báo: tách CSS/JS theo từng vai trò ở phân hệ đăng nhập, dựng màn STT 12, viết `copywriter.js` và `BOT_RULES`, rà đối chiếu barem, viết `README.md` / `docs/sv2-assignment.md` / các dòng 7–12 của `docs/screen-inventory.md`, soạn message commit và nội dung trả lời review trên PR. Phiên bản công cụ: chưa ghi. | `docs/sv2-assignment.md` dòng 19 nối sang báo cáo phân hệ; commit `4be759f`…`13c4416` trên `feature/sv2-maker-screens` | **đã khai** — còn thiếu phiên bản công cụ |
| Prompt tiêu biểu | 6 câu nguyên văn, gồm "tách tôi phần code css, html, js của quản trị viên, khách hàng, thợ thủ công riêng ra"; "sai rồi hoàn tác về như cũ cho tao" (kèm ghi chú: đã hoàn tác bằng hai commit revert, không force-push); "dựa vào barem giờ hãy chỉ tôi quay 3 video với 3 trang này"; "không tự ý chỉnh sửa những gì k liên quan đến SV2". | Nhật ký phiên Qoder **không nằm trong repo**; người chấm đối chiếu bằng mã nguồn + lịch sử commit + phần trích prompt | **đã khai** — không mở lại được toàn bộ log |
| Phần AI sinh trong mã | Mã bốn màn hình người bán và ba trang đăng nhập sau khi tách CSS/JS; bộ quy tắc `copywriter.js`, `BOT_RULES`, advisor giá/tiến độ; các dòng 7–12 của `screen-inventory.md`, `sv2-assignment.md`, README phân hệ; message commit và câu trả lời review PR. | `KhongGianNguoiBan/js/ai/copywriter.js`; logic advisor trong `KhongGianNguoiBan/03-proposal-editor/js/main.js`; `DangNhapVaDangKy/01-dang-nhap/*.js` | **đã khai** — tỷ lệ phần trăm không nêu |
| AI sai ở đâu, sửa thế nào | Hai chỗ tự nêu: (1) yêu cầu tách mã theo vai trò ban đầu làm sai nên phải hoàn tác bằng commit revert, **không force-push** (lịch sử nhánh có 3 commit revert: `85428bf`, `8606ee5`, `d161e77`); (2) cột AI dòng 9 (`02-brief-inbox`) từng ghi "AI Brief Summarizer" trong khi bản chất chỉ là chuỗi soạn sẵn trong dữ liệu mẫu → SV2 đã hạ cột đó về "–". | `git log --grep=Revert origin/feature/sv2-maker-screens`; diff cột AI của `docs/screen-inventory.md`; `copywriter.js` dòng 2 "Máy không gọi model nào: mọi câu dưới đây được ghép trong file này" | **đã khai** — có bằng chứng đọc lại được |
| Chế độ AI trong sản phẩm | **Bộ quy tắc cục bộ, không gọi mô hình.** khai rõ: "Phân hệ người bán **không gọi mô hình AI nào**… không có lời gọi mạng nào, cũng không có khóa API hay biến môi trường"; ba chỗ nhãn "AI" (Copywriter & SEO STT 8, Cost & Timeline Advisor STT 10, trợ lý đăng nhập `BOT_RULES`) đều là JavaScript trong trình duyệt và giao diện tự ghi điều đó. Kèm sáu bước Input → Processing → Output → Explainability → User control → Save và kịch bản lỗi khi không có từ khoá. | `git grep "fetch(" KhongGianNguoiBan DangNhapVaDangKy` trên nhánh SV2; bảng "Tính năng AI" trong báo cáo phân hệ | **đã khai** |

> Bản của SV2 vẫn tự ghi một giới hạn quan trọng: "video của bốn màn hình người bán sẽ quay và bổ sung sau" — ba video đã đăng của SV2 quay ba trang đăng nhập, không quay màn STT 7–12. Xem thêm mục 4 và 6 của [`docs/barem-audit.md`](./barem-audit.md).

### 3.3 Nếu dùng thêm công cụ khác

Cả nhóm phải ghi tên cụ thể mọi công cụ đã dùng (ChatGPT, Gemini, Copilot, Claude…). Khai thiếu hoặc khai nhẹ hơn thực tế bị tính là không trung thực theo VP-07: **−1.00đ** và ảnh hưởng điểm cá nhân.

## 4. Hệ quả cần nói thẳng khi bảo vệ

- Chưa có triển khai công khai nên trên máy chấm, ba tác vụ AI gọi qua máy chủ chạy ở **chế độ dự phòng rule-based**, và giao diện đã tự khai điều đó bằng dòng "Nguồn:".
- Tính năng 6.1 (gợi ý sản phẩm cho người mua) mới có **bộ quy tắc cục bộ** trong `KhachHang/js/ai-advisor.js`; loại tác vụ `product-discovery` ở `api/ai.js` **chưa được nối** vào giao diện nào, nên chưa thể demo đủ 6 bước ở vế này.
