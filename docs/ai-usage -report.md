# Báo cáo minh bạch sử dụng AI — CraftLink

> **Học phần:** CSE122 — Nhóm 11 · **Cập nhật:** 26-10-2026
> **Barem:** ĐK5 — khai trung thực công cụ AI, câu lệnh prompt, phần AI sinh và phần sinh viên tự kiểm chứng. VP-07 trừ **1.00đ** nếu tệp thiếu hoặc khai không trung thực.

Đây là báo cáo cấp nhóm. Bản chi tiết của phân hệ quản trị nằm ở [`../KiemDuyetVaQuanTri/docs/ai-usage-report.md`](../KiemDuyetVaQuanTri/docs/ai-usage-report.md).

**Trạng thái khai báo:** SV1 xong (mục 3.1) · SV2 **còn trống** (mục 3.2) · SV3 đã khai phần AI trong sản phẩm nhưng **chưa khai công cụ dùng lúc làm bài** (mục 3.3).

---

## 0. Đọc nhanh

| Câu hỏi của người chấm | Trả lời ngắn | Xem mục |
|---|---|---|
| Sản phẩm có gọi mô hình AI thật không? | Có, ở 3 màn của SV3 (STT 14, 15, 18), đi qua một điểm cầu duy nhất `api/ai.js`. | 1.1 |
| SV1 và SV2 có gọi mô hình không? | **Không.** Các nút mang nhãn "AI" ở hai phân hệ này chạy bằng bộ quy tắc JavaScript; giao diện tự ghi rõ. | 1.2 |
| Khóa API nằm ở đâu? | Chỉ trong biến môi trường máy chủ `AI_API_URL`, `AI_API_KEY`, `AI_MODEL`. Không có khóa trong mã nguồn hay trong trình duyệt. | 1.1 |
| Chưa cấu hình khóa thì sao? | SV3 tự chuyển sang bộ quy tắc dự phòng và hiện dòng "Nguồn:" nói kết quả đến từ đâu. | 1.1, 1.5 |
| AI có tự quyết định thay người không? | Không. Bản ghi chỉ đổi sau khi người dùng bấm "Chấp nhận và lưu", và quyết định được đánh dấu "AI hỗ trợ". | 1.4 |
| Sinh viên dùng AI gì khi làm bài? | Qoder; SV1 khai thêm ChatGPT/Claude ở mục 3.1. SV2, SV3 chưa khai. | 2, 3 |
| Tệp này còn thiếu gì? | Mục 3.2 của SV2, công cụ lúc làm bài của SV3, phiên bản công cụ, và xác nhận ChatGPT/Claude của SV1. | 3, 6 |

---

## 1. Ba mức "AI" trong sản phẩm

Báo cáo tách rõ ba mức để không ai đọc nhầm tính năng nào gọi mô hình, tính năng nào chỉ là bộ luật.

### 1.1 Mức A — gọi mô hình thật (SV3)

Mọi lời gọi mô hình đi qua **một** điểm cầu: hàm serverless `api/ai.js` (chuẩn OpenAI-compatible chat completions, buộc trả về JSON).

| Loại tác vụ | Màn hình dùng | Dữ liệu gửi lên | Kết quả trả về |
|---|---|---|---|
| `moderation-risk` | STT 14 — Hàng đợi kiểm duyệt | Sản phẩm đang mở + các quy định đang hiệu lực | độ tin cậy, yếu tố rủi ro, hướng xử lý đề xuất |
| `report-triage` | STT 15 — Trung tâm báo cáo | Bản ghi báo cáo, lý do, trạng thái | phân loại và mức ưu tiên |
| `policy-copilot` | STT 18 — Quy định nội dung | Nhóm quy định + danh sách quy định hiện có | tiêu đề và bản nháp quy định |
| `product-discovery` | **Không màn nào** | Nhu cầu người mua mô tả bằng lời | danh sách sản phẩm gợi ý kèm lý do |

`product-discovery` có trong server và trong bộ dự phòng nhưng **chưa được nối vào giao diện nào**, nên không tính là đã hoàn thành tiêu chí gợi ý sản phẩm cho người mua.

Cơ chế an toàn, đọc trực tiếp trong `api/ai.js`:

- Khóa đọc từ `process.env`; thiếu một trong ba biến thì trả `503` kèm hướng dẫn, không gọi mô hình.
- Prompt hệ thống buộc trả JSON, cấm markdown, cấm khẳng định nội dung không có trong dữ liệu được gửi.
- Dữ liệu ngữ cảnh cắt còn 10.000 ký tự trước khi gửi.
- Hủy request sau **25 giây** bằng `AbortController`; lỗi mạng hoặc JSON hỏng đều trả thông báo tiếng Việt thay vì treo giao diện.

### 1.2 Mức B — bộ quy tắc cục bộ nhưng có nhãn "AI" trên giao diện

| Tính năng | Phân hệ | Tệp | Có gọi mô hình? |
|---|---|---|---|
| Trợ lý gợi ý sản phẩm & nghệ nhân | SV1 | `KhachHang/js/ai-advisor.js` | Không — đầu tệp ghi "KHÔNG phải AI tạo sinh và KHÔNG gọi API bên ngoài" |
| Tóm tắt brief | SV1 | `KhachHang/js/main.js` (`buildSummary`, `runSummary`) | Không |
| Copywriter & SEO mô tả sản phẩm | SV2 | `KhongGianNguoiBan/js/ai/copywriter.js` | Không — đầu tệp ghi "Máy không gọi model nào…" |
| Tóm tắt brief | SV2 | `KhongGianNguoiBan/02-brief-inbox/js/main.js` | Không |
| Gợi ý chi phí & thời gian | SV2 | `KhongGianNguoiBan/03-proposal-editor/js/main.js` | Không |
| Dự phòng khi máy chủ thiếu khóa | SV3 | `KiemDuyetVaQuanTri/js/ai-fallback.js` | Không — tính điểm trên dữ liệu của bản ghi đang mở |

Hai phân hệ SV1 và SV2 **không có lời gọi mạng nào** trong mã: `git grep "fetch(" KhachHang KhongGianNguoiBan` không trả kết quả.

### 1.3 Mức C — không phải AI

`KhachHang/artisan-suggestions.html` là bộ lọc tiêu chí thường; trang tự ghi "Đây là bộ lọc tiêu chí cục bộ, **chưa kết nối mô hình AI tạo sinh**". Không tính vào phần AI của bài.

### 1.4 Trải nghiệm 6 bước theo barem 6.1–6.3

Cài một lần trong `KiemDuyetVaQuanTri/js/ai-client.js`, dùng chung cho cả ba màn hình:

1. **Nhập** — ô mô tả bối cảnh (tối đa 1.200 ký tự) và các chip gợi ý.
2. **Đang xử lý** — dòng trạng thái `aria-live`, nút chạy bị khóa trong lúc chờ.
3. **Kết quả** — độ tin cậy, tóm tắt, đề xuất.
4. **Giải thích lý do** — mục "Các yếu tố được cân nhắc".
5. **Kiểm soát** — bốn nút: Chấp nhận và lưu / Chỉnh sửa / Tạo lại / Từ chối.
6. **Lưu** — chỉ ghi vào dữ liệu sau khi người dùng xác nhận.

Ghi chú trung thực: bước "Đang xử lý" là **dòng trạng thái**, không phải spinner riêng; thời gian chờ 25 giây nằm ở phía máy chủ (`api/ai.js`), không có timeout riêng ở trình duyệt.

### 1.5 AI không tự quyết định

Kết quả AI chỉ là đề xuất. Ở hàng đợi kiểm duyệt, bản ghi được lưu kèm dòng "AI hỗ trợ: …%" và thông báo "kiểm duyệt viên vẫn là người quyết định". Người dùng có thể sửa hoặc từ chối trước khi lưu.

Khi máy chủ chưa có khóa, `ai-fallback.js` phân tích bằng bộ luật và giao diện hiện dòng **"Nguồn:"** phân biệt rõ "mô hình AI qua proxy" với "bộ quy tắc cục bộ". Đây là giới hạn đã biết, không phải lỗi ẩn.

---

## 2. AI hỗ trợ quá trình làm bài

### 2.1 Công cụ

| Thành viên | Công cụ | Phạm vi | Phiên bản |
|---|---|---|---|
| Nhóm (tài liệu và rà soát mã) | **Qoder** — trợ lý lập trình dạng agent, đọc/ghi tệp và chạy lệnh trong thư mục dự án | Đối chiếu barem, rà accessibility, đo responsive, soạn `README.md` và `docs/`, viết message commit/PR | **[CẦN XÁC MINH]** |
| SV1 | Qoder; ChatGPT và Claude (khai ở 3.1) | 

### 2.2 Việc đã giao cho AI và cách sinh viên kiểm chứng
| AI sinh / đề xuất | Sinh viên kiểm chứng bằng cách nào |
|---|---|
| Đối chiếu mã nguồn với từng mục barem, liệt kê tiêu chí còn thiếu | Mở lại barem và đối chiếu từng dòng được nêu tên |
| Rà lỗi HTML ngữ nghĩa, accessibility (`alt`, `label`, `aria-*`, Esc đóng modal) | Bấm Tab và Esc trên trình duyệt, mở DevTools Accessibility |
| Đo responsive ở 320 / 375 / 768 / 1280 px, phát hiện cuộn ngang ngoài ý muốn | Tự kéo cửa sổ và đọc `scrollWidth` trong Console |
| Soạn và chỉnh `README.md`, `docs/screen-inventory.md`, `docs/user-flow.md`, các `README.md` mô tả thư mục | Đọc lại từng câu, sửa chỗ mô tả sai so với mã |
| Dựng sơ đồ User Flow, chụp mockup từ chính trang đã chạy | Mở sơ đồ cạnh màn hình thật, đối chiếu nhãn trạng thái với mã |
| Đề xuất điểm sửa mã trực tiếp để quay video OBS | Chạy thử trên máy trước khi tin |
| Rà trạng thái tải của Trung tâm báo cáo, đề xuất lỗi vòng lặp sắp xếp | Mở trang, xác nhận 20 bản ghi, thử sắp xếp, lọc, mở chi tiết và chạy AI |
| Viết message commit, mô tả Pull Request | Đọc trước khi push; commit chỉ mang tên sinh viên |

### 2.3 Prompt tiêu biểu trong quá trình làm bài

Dùng chung cho phần việc trong repo này (nguyên văn, rút gọn):

- "Dựa vào phần code của tôi, bạn hãy xem trong barem còn thiếu sót những gì không, trong file này có phần nào bị thừa đi thì bạn có thể xóa cho gọn."
- "Tôi định chọn các trang số 2-4-6 để có thể quay video theo tiêu chí số 8 trong barem, bạn hãy xem tôi có thể dùng được những tác vụ cũng như đáp ứng yêu cầu barem hay không."
- "Những gì bạn push trong commit có ghi là tài khoản của tôi hay ghi là Bạn đã commit?"
- "Mockup là gì đấy, tôi chưa làm mockup."
- "Bạn có thể vào git tạo các thư mục và tên tương ứng với yêu cầu/tiêu chí trong barem không."



### 2.4 Giới hạn của phần AI hỗ trợ

AI không tự quyết định phạm vi nghiệp vụ, không tự chọn cấu trúc dữ liệu, và không được push code khi sinh viên chưa duyệt. Mọi thay đổi đều được xem diff trước khi commit. Nhật ký phiên làm việc **không nằm trong repository**, nên người chấm chỉ đối chiếu được bằng mã nguồn và lịch sử commit, không xem lại được toàn bộ prompt.

