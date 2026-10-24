# Kiểm kê màn hình – Phân hệ Quản trị viên và Kiểm duyệt viên

Phạm vi tài liệu: sáu màn hình do SV3 phụ trách trong CraftLink. Đây là kiểm kê của phân hệ, chưa phải bảng kiểm kê hợp nhất của cả nhóm.

## Phân bổ mã nguồn

| Phần | Vị trí | Trách nhiệm |
|---|---|---|
| Màn hình tích hợp | KiemDuyetVaQuanTri/GopTrang.html | Vỏ giao diện chung, đổi trang, trạng thái vai trò và avatar |
| Điểm vào GitHub Pages | index.html | Mở màn hình tích hợp |
| Mã dùng chung | KiemDuyetVaQuanTri/js/ | Đọc/lưu dữ liệu, điều hướng, gọi AI |
| CSS dùng chung | KiemDuyetVaQuanTri/css/shared/ | Theme, bố cục, thành phần, responsive, focus và trạng thái |
| CSS từng trang | KiemDuyetVaQuanTri/0x-.../css/ | Quy tắc riêng của trang; style.css nhập CSS dùng chung và page.css |
| JS từng trang | KiemDuyetVaQuanTri/0x-.../js/main.js | Hành vi và nghiệp vụ của trang |
| Dữ liệu mẫu | KiemDuyetVaQuanTri/assets/data/ | JSON khởi tạo; thao tác sau đó lưu trong localStorage |
| AI phía máy chủ | api/ai.js | Một điểm gọi AI với prompt theo từng loại tác vụ |

Giữ GopTrang.html làm điểm trình diễn/tích hợp cho sáu trang. Không gộp mã từng trang vào tệp này. Các trang con vẫn độc lập để có thể mở, thuyết trình và kiểm tra riêng.

## Kiểm kê sáu màn hình

| # | Vai trò / màn hình | Mục tiêu và tác vụ chính | Dữ liệu và liên kết | Trạng thái giao diện | AI |
|---|---|---|---|---|---|
| 1 | Quản trị viên – Bảng điều khiển | Xem doanh thu mẫu, số thợ hoạt động, cảnh báo và nhật ký; tìm trong nhật ký | Đọc users, products, reports; KPI hoạt động cập nhật từ các bộ sưu tập dùng chung | KPI đang tải/lỗi; nhật ký có nội dung hoặc trạng thái không tìm thấy | Không gọi AI |
| 2 | Quản trị viên – Quản lý danh mục | Tìm, thêm, sửa, xóa, bật/tắt hiển thị; chặn tên trùng; tải ảnh nền khi tạo | categories.json: 15 mục mẫu; ảnh được nén và lưu cùng bản ghi qua CraftLinkAPI | Đang tải, lỗi có nút thử lại, rỗng có nút xóa lọc, toast thành công/lỗi | Không gọi AI |
| 3 | Quản trị viên – Quản lý tài khoản | Tìm, lọc buyer/maker/moderator; thêm, sửa, xóa, khóa/mở khóa; tải ảnh đại diện khi tạo | users.json: 20 mục mẫu; ảnh và trạng thái dùng chung với dashboard | Đang tải, lỗi có thử lại, rỗng có xóa lọc, xác nhận xóa và toast | Không gọi AI |
| 4 | Kiểm duyệt viên – Hàng đợi kiểm duyệt | Lọc trạng thái, tìm sản phẩm, xem chi tiết, duyệt, yêu cầu sửa, từ chối, khôi phục dữ liệu mẫu | products.json: 20 mục mẫu; gửi kèm thông tin sản phẩm và hướng dẫn hiện hành cho AI | Đang tải, lỗi có thử lại, danh sách rỗng, xác nhận và toast; quyết định được lưu | AI-2: phân tích rủi ro, trả độ tin cậy/yếu tố/đề xuất; kiểm duyệt viên xác nhận |
| 5 | Kiểm duyệt viên – Trung tâm báo cáo | Tìm; lọc trạng thái, lý do, thời gian; sắp xếp cột; phân trang; xem, xác minh, bỏ qua, xử lý | reports.json: 20 mục mẫu; KPI dashboard đọc trạng thái báo cáo | Đang tải/lỗi/rỗng; số dòng mỗi trang 5/10/20; quyết định có hoàn tác nếu lưu thất bại | Hỗ trợ phân loại và ưu tiên báo cáo; lưu kết quả cùng quyết định người dùng |
| 6 | Kiểm duyệt viên – Hướng dẫn nội dung | Tìm, thêm, sửa, xóa; kiểm tra trùng tên; xem và áp dụng bản nháp AI | guidelines.json: 15 mục mẫu; quy định cung cấp bối cảnh cho trang 4 | Đang tải/lỗi/rỗng; form có validation; xác nhận xóa; toast | AI-3: copilot soạn nháp; người dùng sửa, chấp nhận hoặc từ chối |

### Responsive và lưu trữ ảnh

- Sáu trang dùng menu dạng drawer ở màn hình hẹp; ô tìm kiếm trên thanh đầu trang co lại theo chiều rộng còn lại.
- Bảng có nhiều cột cuộn bên trong vùng bảng thay vì làm rộng toàn bộ trang.
- Khi thêm danh mục/tài khoản, ảnh là trường bắt buộc; khi sửa, có thể giữ ảnh cũ hoặc chọn ảnh mới. Ảnh JPG/PNG/WebP tối đa 5 MB được thu nhỏ/nén phía trình duyệt và lưu trong localStorage.
- Nên mở DevTools ở chiều rộng 320 px, 375 px và 768 px để xác nhận lại trước khi nộp; mã CSS không thay cho kiểm tra trên thiết bị/trình duyệt thực tế.

### AI theo barem 6.1–6.3

- 6.1 – Gợi ý sản phẩm cho người mua: API có loại tác vụ product-discovery, nhưng màn hình người mua không nằm trong sáu trang này. Cần người phụ trách giao diện người mua tích hợp nút nhập nhu cầu, kết quả gợi ý, giải thích và lưu/áp dụng.
- 6.2 – Phân loại rủi ro: trang 4 phân tích nội dung sản phẩm theo các quy định từ trang 6. Trang 5 có thêm ưu tiên báo cáo nhưng không thay cho phần tích hợp 6.1.
- 6.3 – Copilot nghiệp vụ: trang 6 soạn quy định CraftLink; bản nháp chưa được xuất bản cho đến khi người quản trị xác nhận.
- Cả ba loại tác vụ dùng cùng API server và cấu hình mô hình. Khóa nằm ở biến môi trường máy chủ, không trong trình duyệt.

### Tiêu chí phía repo cần hoàn thành ngoài mã nguồn

Các trường sau chưa thể được xác nhận chỉ bằng mã hiện có; nhóm cần cập nhật thông tin thật trước khi nộp:

- Mã task/Trello, người thực hiện từng task và trạng thái hoàn thành.
- Tên nhánh, pull request và người review cho từng phần.
- Link triển khai đang hoạt động và ảnh/clip kiểm tra trên desktop, tablet, mobile.
- Link video/OBS.
- Giao diện 6.1 dành cho người mua và kết nối AI thật trên môi trường triển khai.
- Bảng kiểm kê hợp nhất của nhóm sau khi nhận dữ liệu của SV1, SV2 và SV3.

Không điền giá trị giả cho những trường này.
