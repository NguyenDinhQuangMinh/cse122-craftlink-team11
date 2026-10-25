# css/ — StyleSheet dùng chung cho cả ba vai trò

Barem yêu cầu ở đâu: Tiêu chí 4 (Kỹ thuật HTML5/CSS3) minh chứng là `css/`; mục 5.2 cho điểm tối đa khi "tổ chức tệp CSS rõ ràng (`css/style.css`, `css/…`)"; Checklist mục 8 đòi **cả ba thành viên dùng chung bảng màu, phông chữ, kích thước nút trong `css/style.css` (`:root`)** để giao diện nhìn như một sản phẩm thống nhất.

Quy tắc của thư mục này:

- `style.css` khai báo biến trong `:root` (màu, phông, khoảng cách, cỡ nút) và chỉ chứa biến + quy tắc nền.
- Các tệp còn lại tách theo vai trò: bố cục, thành phần, responsive, focus/trạng thái.
- Trang cá nhân chỉ `@import` hoặc `<link>` tới tệp ở đây, không định nghĩa lại màu.

Trạng thái hiện tại: **chưa có tệp nào**. Hệ thống thiết kế đang nằm ở `../KiemDuyetVaQuanTri/css/shared/` (theme, layout, components, responsive, focus, states) và được sáu trang quản trị nạp qua `style.css` của từng trang. Khi SV1 và SV2 đưa mã nguồn vào repo, nhóm cần quyết định một trong hai hướng: chuyển `css/shared/` lên đây làm nguồn duy nhất, hoặc để SV1/SV2 khai báo `:root` của họ và gộp lại — không để hai bảng màu song song.
