# Báo cáo minh bạch sử dụng AI — CraftLink

Barem yêu cầu ở đâu: ĐK5 — "Có tệp báo cáo `docs/ai-usage-report.md` khai báo trung thực các công cụ AI, câu lệnh prompt, phần AI sinh và phần sinh viên tự kiểm chứng/chỉnh sửa"; VP-07 trừ **1.00đ** nếu tệp thiếu hoặc khai không trung thực.

Tệp này là báo cáo cấp nhóm. Phần chi tiết của phân hệ quản trị ở `../KiemDuyetVaQuanTri/docs/ai-usage-report.md`. SV1 và SV2 phải tự bổ sung phần của mình trước khi nộp — mục 3 đã dựng sẵn bảng điền và phần dữ kiện kiểm chứng được từ mã nguồn.

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
| Gợi ý nội dung brief | SV1 | `KhachHang/customize.html`, `js/` cùng thư mục | Không |
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
| Viết message commit, mô tả Pull Request | Đọc trước khi push; commit chỉ mang tên sinh viên |

Prompt tiêu biểu đã dùng (nguyên văn, rút gọn):

- "Dựa vào phần code của tôi, bạn hãy xem trong barem còn thiếu sót những gì không, trong file này có phần nào bị thừa đi thì bạn có thể xóa cho gọn."
- "Tôi định chọn các trang số 2-4-6 để có thể quay video theo tiêu chí số 8 trong barem, bạn hãy xem tôi có thể dùng được những tác vụ cũng như đáp ứng yêu cầu barem hay không."
- "Những gì bạn push trong commit có ghi là tài khoản của tôi hay ghi là Bạn đã commit?"
- "Mockup là gì đấy, tôi chưa làm mockup."
- "Bạn có thể vào git tạo các thư mục và tên tương ứng với yêu cầu/tiêu chí trong barem không."

Giới hạn của phần AI hỗ trợ: AI **không** tự quyết định phạm vi nghiệp vụ, không tự chọn cấu trúc dữ liệu, và không được push code lên GitHub khi sinh viên chưa duyệt kế hoạch. Mọi thay đổi đều được xem diff trước khi commit.

## 3. Phần chưa khai của SV1 và SV2

Hai mục dưới đây **vẫn đang trống** và chỉ SV1, SV2 tự điền được. Bảng ghi sẵn phần dữ kiện đã kiểm chứng được từ mã nguồn để hai bạn không phải viết lại từ đầu; cột "Trạng thái" phải đổi thành "đã khai" trước khi nộp.

### 3.1 SV1 — Khách hàng

| Hạng mục | Nội dung cần điền | Dữ kiện đã kiểm chứng trong repo | Trạng thái |
|---|---|---|---|
| Công cụ AI đã dùng khi làm bài | Tên công cụ + phiên bản, ví dụ Qoder / ChatGPT / Gemini / Copilot | Chưa có khai báo nào của SV1 | **chưa khai** |
| Prompt tiêu biểu | 3–5 câu nguyên văn đã dán vào công cụ | Chưa có | **chưa khai** |
| Phần AI sinh trong mã | Tệp và chức năng cụ thể | `KhachHang/js/ai-advisor.js` (trợ lý gợi ý) và `KhachHang/customize.html` (nút gợi ý brief) — ai viết hai phần này, tự viết hay AI sinh rồi sửa | **chưa khai** |
| AI sai ở đâu, sửa thế nào | Ít nhất một lỗi cụ thể AI đề xuất mà SV1 phải sửa | Chưa có | **chưa khai** |
| Chế độ AI trong sản phẩm | Ghi rõ là bộ quy tắc cục bộ | `ai-advisor.js` ghi ngay đầu tệp: "KHÔNG phải AI tạo sinh và KHÔNG gọi API bên ngoài" | đã có bằng chứng, cần SV1 xác nhận |

### 3.2 SV2 — Thợ thủ công

| Hạng mục | Nội dung cần điền | Dữ kiện đã kiểm chứng trong repo | Trạng thái |
|---|---|---|---|
| Công cụ AI đã dùng khi làm bài | Tên công cụ + phiên bản | Chưa có khai báo nào của SV2 | **chưa khai** |
| Prompt tiêu biểu | 3–5 câu nguyên văn | Chưa có | **chưa khai** |
| Phần AI sinh trong mã | Tệp và chức năng cụ thể | `KhongGianNguoiBan/js/ai/copywriter.js` (soạn mô tả + từ khóa SEO), phần tóm tắt brief trong `02-brief-inbox`, phần gợi ý chi phí trong `03-proposal-editor` | **chưa khai** |
| AI sai ở đâu, sửa thế nào | Ít nhất một lỗi cụ thể | Chưa có | **chưa khai** |
| Chế độ AI trong sản phẩm | Ghi rõ là bộ quy tắc cục bộ | `copywriter.js` dòng 2 ghi: "Máy không gọi model nào: mọi câu dưới đây được ghép trong file này" | đã có bằng chứng, cần SV2 xác nhận |

### 3.3 Nếu dùng thêm công cụ khác

Cả nhóm phải ghi tên cụ thể mọi công cụ đã dùng (ChatGPT, Gemini, Copilot, Claude…). Khai thiếu hoặc khai nhẹ hơn thực tế bị tính là không trung thực theo VP-07: **−1.00đ** và ảnh hưởng điểm cá nhân.

## 4. Hệ quả cần nói thẳng khi bảo vệ

- Chưa có triển khai công khai nên trên máy chấm, ba tính năng AI chạy ở **chế độ dự phòng rule-based**, và giao diện đã tự khai điều đó bằng dòng "Nguồn:".
- Tính năng 6.1 (gợi ý sản phẩm cho người mua) mới có **bộ quy tắc cục bộ** trong `KhachHang/js/ai-advisor.js`; loại tác vụ `product-discovery` ở `api/ai.js` **chưa được nối** vào giao diện nào, nên chưa thể demo đủ 6 bước ở vế này.
