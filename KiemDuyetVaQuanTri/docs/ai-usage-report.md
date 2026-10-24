# Báo cáo sử dụng AI – Phân hệ quản trị và kiểm duyệt

## Phạm vi

Phân hệ dùng một API server-side tại api/ai.js và một nhà cung cấp/mô hình cấu hình bằng môi trường. API nhận trường feature để áp dụng hướng dẫn cho từng nghiệp vụ; đây không phải ba dịch vụ hoặc ba khóa AI riêng. Khi máy chủ chưa cấu hình khóa, js/ai-fallback.js chạy một bộ quy tắc phân tích cục bộ trên đúng dữ liệu của bản ghi đang mở, để luồng 6 bước AI vẫn trình diễn được. Kết quả cục bộ luôn được gắn nhãn nguồn rõ ràng trên giao diện.

Các feature hiện có:

- moderation-risk: hỗ trợ kiểm tra sản phẩm trong hàng đợi.
- report-triage: tóm tắt và ưu tiên báo cáo.
- policy-copilot: tạo bản nháp quy định nội dung.
- product-discovery: loại tác vụ dự phòng để nhóm nối vào màn hình người mua; chưa có UI trong sáu trang quản trị.

## Luồng 6 bước

1. Input: trang gửi bản ghi đang chọn, phần hướng dẫn liên quan nếu có và ghi chú người dùng. Người dùng có thể bổ sung nội dung trước khi chạy.
2. Processing: trình duyệt gửi JSON đến /api/ai. Server kiểm tra phương thức, loại tác vụ, độ dài đầu vào và cấu hình; gọi AI với thời gian chờ giới hạn.
3. Output: AI trả về tóm tắt, đề xuất, độ tin cậy, các yếu tố cân nhắc và trường hành động/bản nháp phù hợp với tác vụ.
4. Explainability: giao diện hiện độ tin cậy và các yếu tố AI dùng. Khi độ tin cậy thấp hoặc dữ liệu chưa đủ, giao diện yêu cầu kiểm tra thủ công; AI không tự quyết.
5. User control: người dùng có thể tạo lại, sửa bản nháp, chọn hành động, chấp nhận hoặc từ chối. Không áp dụng quyết định AI một cách âm thầm.
6. Save/Apply: chỉ sau khi xác nhận, thay đổi mới được ghi vào dữ liệu cục bộ. Bản ghi sản phẩm/báo cáo/quy định giữ lại kết quả AI cần thiết để người dùng xem lại.

## Điểm gắn theo màn hình

- Trang 4 – moderation-risk: ngữ cảnh gồm sản phẩm, mô tả và danh sách quy định; người kiểm duyệt chọn duyệt, yêu cầu bổ sung hoặc từ chối. Kết quả và yếu tố được lưu cùng sản phẩm.
- Trang 5 – report-triage: ngữ cảnh gồm mã, đối tượng, loại, lý do và trạng thái; người xử lý kiểm tra tóm tắt, độ ưu tiên và đề xuất trước khi chuyển trạng thái.
- Trang 6 – policy-copilot: người quản trị nhập vấn đề; AI tạo tiêu đề, nhóm và nội dung nháp. Người quản trị phải xem/sửa rồi xác nhận trước khi thêm quy định.
- Màn hình người mua: product-discovery được khai báo ở server nhưng chưa được nối vào UI. Đây là phần cần phối hợp với thành viên phụ trách trang người mua để hoàn tất tiêu chí AI-1.

## Chế độ dự phòng (fallback) khi chưa có API AI

Trình tự gọi trong js/ai-client.js:

1. POST tới /api/ai như bình thường.
2. Nếu máy chủ trả 404 (trang tĩnh không có serverless function), 503 (thiếu AI_API_URL, AI_API_KEY, AI_MODEL) hoặc lỗi mạng, giao diện chuyển sang window.CraftLinkAIFallback.analyze(feature, context, note).
3. Khối kết quả hiện dòng "Nguồn:" cho biết đang dùng mô hình AI qua proxy hay bộ quy tắc cục bộ. Không có trường hợp nào hiển thị kết quả mà không ghi nguồn.

Bộ quy tắc cục bộ không gọi mô hình nào cả. Nó tính điểm từ dữ liệu thật của bản ghi đang mở:

- moderation-risk: độ dài mô tả, giá niêm yết, danh mục đã gắn, số quy định đang có hiệu lực, và danh sách cụm từ rủi ro (quảng cáo quá mức, dẫn ra giao dịch ngoài nền tảng, tiết lộ thông tin cá nhân).
- report-triage: lý do báo cáo, từ khóa mất an toàn, trạng thái hiện tại.
- policy-copilot: suy ra nhóm quy định từ chính cụm người dùng nhập, đối chiếu số quy định đã có trong thư viện.
- product-discovery: chấm điểm mức khớp từ khóa trên tên, danh mục, mô tả và người bán của tập sản phẩm được gửi lên.

Vì là suy luận theo quy tắc cố định, kết quả cục bộ có thể sai và chỉ mang tính hỗ trợ; người kiểm duyệt vẫn phải xác nhận. Khi có khóa AI thật, toàn bộ luồng này được thay bằng phản hồi của mô hình mà không đổi giao diện.

## Dữ liệu và cấu hình

Nội dung bản ghi được gửi đến nhà cung cấp AI đã cấu hình. Không đưa khóa, mật khẩu, dữ liệu nhạy cảm hoặc thông tin cá nhân thật vào demo. Mẫu đang lưu bằng localStorage nên chỉ tồn tại trong trình duyệt hiện tại, không phải cơ sở dữ liệu dùng chung.

Cấu hình server:

- AI_API_URL: URL endpoint chat-completions tương thích.
- AI_API_KEY: khóa bí mật, chỉ đặt trong môi trường máy chủ/Vercel.
- AI_MODEL: tên mô hình được nhà cung cấp cấp quyền dùng.

.env.example chỉ chứa cấu hình mẫu. Không commit tệp .env có khóa thật. GitHub Pages chỉ phục vụ static files; muốn chạy api/ai.js cần nền tảng hỗ trợ serverless function, ví dụ Vercel.

## Hạn chế cần ghi rõ khi thuyết trình

- Chưa cấu hình khóa AI thật trong repo, vì vậy khi mở trên Vercel mà thiếu biến môi trường thì nút AI chạy bằng bộ quy tắc cục bộ, không phải mô hình ngôn ngữ.
- Dữ liệu thao tác chưa được gửi tới backend cơ sở dữ liệu; localStorage chỉ mô phỏng trạng thái demo.
- Độ tin cậy do mô hình tự ước lượng hoặc do bộ quy tắc cục bộ tính theo số tín hiệu, không phải xác suất đã được kiểm định.
- AI hỗ trợ người phụ trách. Quyết định kiểm duyệt, xử lý báo cáo và xuất bản quy định vẫn do con người xác nhận.

## Kiểm chứng đã thực hiện ngày 25-10-2026

Chạy cục bộ bằng máy chủ tĩnh trên 127.0.0.1, trình duyệt Chromium:

- Trang 2: bộ lọc trạng thái + sắp xếp + tìm kiếm hoạt động đồng thời; bốn lỗi biểu mẫu (tên chỉ khoảng trắng, số danh mục con ngoài khoảng 0–50, tổng sản phẩm ngoài khoảng 0–9999, thiếu ảnh nền) hiện đúng dưới trường nhập và không tạo bản ghi; dữ liệu vẫn còn sau F5.
- Trang 4: tìm kiếm + lọc trạng thái + sắp xếp theo thời gian gửi; luồng AI đủ 6 bước, bấm Chấp nhận và lưu chuyển sản phẩm sang Cần chỉnh sửa, ghi note và aiAssessment vào localStorage; Esc đóng dialog.
- Trang 6: lọc nhóm + sắp xếp + tìm kiếm; AI soạn nháp, người dùng sửa bản nháp rồi lưu thành quy định có nhãn "AI gợi ý" và độ tin cậy.
- Responsive: scrollWidth của tài liệu bằng đúng chiều rộng cửa sổ ở 320, 375, 768 và 1280 px trên cả ba trang; bảng rộng cuộn trong .table-card; hộp thoại AI không tràn ở 320 px.
- Không có lỗi console và không có yêu cầu tài nguyên 404.

Chưa kiểm chứng: phản hồi của mô hình AI thật (cần biến môi trường trên Vercel), thiết bị di động vật lý và trình duyệt khác ngoài Chromium.
