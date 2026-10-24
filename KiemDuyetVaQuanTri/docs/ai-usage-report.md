# Báo cáo sử dụng AI – Phân hệ quản trị và kiểm duyệt

## Phạm vi

Phân hệ dùng một API server-side tại api/ai.js và một nhà cung cấp/mô hình cấu hình bằng môi trường. API nhận trường feature để áp dụng hướng dẫn cho từng nghiệp vụ; đây không phải ba dịch vụ hoặc ba khóa AI riêng.

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

## Dữ liệu và cấu hình

Nội dung bản ghi được gửi đến nhà cung cấp AI đã cấu hình. Không đưa khóa, mật khẩu, dữ liệu nhạy cảm hoặc thông tin cá nhân thật vào demo. Mẫu đang lưu bằng localStorage nên chỉ tồn tại trong trình duyệt hiện tại, không phải cơ sở dữ liệu dùng chung.

Cấu hình server:

- AI_API_URL: URL endpoint chat-completions tương thích.
- AI_API_KEY: khóa bí mật, chỉ đặt trong môi trường máy chủ/Vercel.
- AI_MODEL: tên mô hình được nhà cung cấp cấp quyền dùng.

.env.example chỉ chứa cấu hình mẫu. Không commit tệp .env có khóa thật. GitHub Pages chỉ phục vụ static files; muốn chạy api/ai.js cần nền tảng hỗ trợ serverless function, ví dụ Vercel.

## Hạn chế cần ghi rõ khi thuyết trình

- Chưa cấu hình khóa AI thật trong repo, vì vậy nút AI sẽ báo dịch vụ chưa cấu hình cho đến khi có biến môi trường máy chủ.
- Dữ liệu thao tác chưa được gửi tới backend cơ sở dữ liệu; localStorage chỉ mô phỏng trạng thái demo.
- Độ tin cậy do mô hình tự ước lượng, không phải xác suất đã được kiểm định.
- AI hỗ trợ người phụ trách. Quyết định kiểm duyệt, xử lý báo cáo và xuất bản quy định vẫn do con người xác nhận.
