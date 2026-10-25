# Báo cáo minh bạch sử dụng AI — CraftLink

Barem yêu cầu ở đâu: ĐK5 — "Có tệp báo cáo `docs/ai-usage-report.md` khai báo trung thực các công cụ AI, câu lệnh prompt, phần AI sinh và phần sinh viên tự kiểm chứng/chỉnh sửa"; VP-07 trừ **1.00đ** nếu tệp thiếu hoặc khai không trung thực.

Tệp này là báo cáo cấp nhóm. Phần chi tiết của phân hệ quản trị ở `../KiemDuyetVaQuanTri/docs/ai-usage-report.md`. SV1 và SV2 phải tự bổ sung phần của mình trước khi nộp — mục để trống hiện đánh dấu "chưa khai".

---

## 1. AI nằm trong sản phẩm

Toàn bộ lời gọi mô hình đi qua **một** điểm cầu `api/ai.js` (hàm serverless trên Vercel, chuẩn OpenAI-compatible chat completions, buộc trả về JSON). Khóa API nằm ở biến môi trường máy chủ `AI_API_URL`, `AI_API_KEY`, `AI_MODEL`; **không có khóa nào trong mã nguồn hoặc trong trình duyệt**.

| Loại tác vụ | Màn hình dùng | Barem | Dữ liệu gửi lên mô hình | Kết quả trả về |
|---|---|---|---|---|
| `moderation-risk` | STT 14 Hàng đợi kiểm duyệt | 6.2 | Thông tin sản phẩm đang mở + toàn bộ quy định đang hiệu lực | độ tin cậy, danh sách yếu tố, hướng xử lý đề xuất |
| `report-triage` | STT 15 Trung tâm báo cáo | 6.2 | Bản ghi báo cáo + lý do + trạng thái | phân loại và mức ưu tiên |
| `policy-copilot` | STT 18 Quy định nội dung | 6.3 | Danh sách nhóm quy định + các quy định hiện có | tiêu đề và bản nháp quy định |
| `product-discovery` | STT 1–6 (chưa nối giao diện) | 6.1 | Nhu cầu người mua mô tả bằng lời | danh sách sản phẩm gợi ý kèm lý do |

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
| Viết message commit, mô tả Pull Request | Đọc trước khi push; commit chỉ mang tên sinh viên |

Prompt tiêu biểu đã dùng (nguyên văn, rút gọn):

- "Dựa vào phần code của tôi, bạn hãy xem trong barem còn thiếu sót những gì không, trong file này có phần nào bị thừa đi thì bạn có thể xóa cho gọn."
- "Tôi định chọn các trang số 2-4-6 để có thể quay video theo tiêu chí số 8 trong barem, bạn hãy xem tôi có thể dùng được những tác vụ cũng như đáp ứng yêu cầu barem hay không."
- "Những gì bạn push trong commit có ghi là tài khoản của tôi hay ghi là Bạn đã commit?"
- "Mockup là gì đấy, tôi chưa làm mockup."
- "Bạn có thể vào git tạo các thư mục và tên tương ứng với yêu cầu/tiêu chí trong barem không."

Giới hạn của phần AI hỗ trợ: AI **không** tự quyết định phạm vi nghiệp vụ, không tự chọn cấu trúc dữ liệu, và không được push code lên GitHub khi sinh viên chưa duyệt kế hoạch. Mọi thay đổi đều được xem diff trước khi commit.

## 3. Phần chưa khai

- **SV1**: chưa khai công cụ AI đã dùng cho sáu màn hình khách hàng, prompt, và tỷ lệ mã do AI sinh.
- **SV2**: chưa khai tương tự cho sáu màn hình nghệ nhân, gồm cả phần AI Copywriter / SEO / Brief Summarizer.
- **Cả nhóm**: nếu dùng thêm ChatGPT, Gemini, Copilot hay công cụ nào khác thì phải ghi tên cụ thể. Khai thiếu hoặc khai nhẹ hơn thực tế bị tính là không trung thực theo VP-07, mức −1.00đ và có thể ảnh hưởng điểm cá nhân.

## 4. Hệ quả cần nói thẳng khi bảo vệ

- Chưa có triển khai công khai nên trên máy chấm, ba tính năng AI chạy ở **chế độ dự phòng rule-based**, và giao diện đã tự khai điều đó bằng dòng "Nguồn:".
- Tính năng 6.1 (gợi ý sản phẩm cho người mua) có API nhưng **chưa có màn hình người mua nào nối vào**, nên chưa thể demo đủ 6 bước ở vế này.
