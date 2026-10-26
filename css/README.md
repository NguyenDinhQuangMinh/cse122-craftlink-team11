# css/ — StyleSheet dùng chung cho cả ba vai trò

Barem yêu cầu ở đâu: Tiêu chí 4 (Kỹ thuật HTML5/CSS3) minh chứng là `css/`; mục 5.2 cho điểm tối đa khi "tổ chức tệp CSS rõ ràng (`css/style.css`, `css/…`)"; Checklist mục 8 đòi **cả ba thành viên dùng chung bảng màu, phông chữ, kích thước nút trong `css/style.css` (`:root`)** để giao diện nhìn như một sản phẩm thống nhất.

Quy tắc của thư mục này:

- `style.css` khai báo biến trong `:root` (màu, phông, khoảng cách, cỡ nút) và chỉ chứa biến + quy tắc nền.
- Các tệp còn lại tách theo vai trò: bố cục, thành phần, responsive, focus/trạng thái.
- Trang cá nhân chỉ `@import` hoặc `<link>` tới tệp ở đây, không định nghĩa lại màu.

Trạng thái hiện tại: **đã có `style.css`**. Tệp này khai báo toàn bộ token trong `:root` (màu, phông, khoảng cách, bo góc, cỡ chữ, breakpoint) và dựng giao diện cho trang gốc `index.html` — trang landing bốn lối vào vai trò. Hệ thống thiết kế của sáu trang quản trị vẫn nằm ở `../KiemDuyetVaQuanTri/css/shared/` (theme, layout, components, responsive, focus, states) và được nạp qua `style.css` của từng trang.

Hai bảng token này chưa gộp làm một. Hướng xử lý khi gộp nhánh: chuyển `KiemDuyetVaQuanTri/css/shared/theme.css` lên đây thành nguồn duy nhất, sáu trang quản trị `@import` lại, không để hai bộ màu song song. Việc gộp phải làm sau khi PR #2 và PR #3 đã vào nhánh chính, nếu không sẽ xung đột với hai phân hệ kia.
