# css/ — StyleSheet dùng chung cho cả ba vai trò

Barem yêu cầu ở đâu: Tiêu chí 4 (Kỹ thuật HTML5/CSS3) minh chứng là `css/`; mục 5.2 cho điểm tối đa khi "tổ chức tệp CSS rõ ràng (`css/style.css`, `css/…`)"; Checklist mục 8 đòi **cả ba thành viên dùng chung bảng màu, phông chữ, kích thước nút trong `css/style.css` (`:root`)** để giao diện nhìn như một sản phẩm thống nhất.

Quy tắc của thư mục này:

- `style.css` khai báo biến trong `:root` (màu, phông, khoảng cách, cỡ nút) và chỉ chứa biến + quy tắc nền.
- Các tệp còn lại tách theo vai trò: bố cục, thành phần, responsive, focus/trạng thái.
- Trang cá nhân chỉ `@import` hoặc `<link>` tới tệp ở đây, không định nghĩa lại màu.

Trạng thái hiện tại: **đã có `style.css`**. Tệp này khai báo toàn bộ token trong `:root` (màu, phông, khoảng cách, bo góc, cỡ chữ, breakpoint) và dựng giao diện cho trang gốc `index.html` — trang landing bốn lối vào vai trò. Hệ thống thiết kế của sáu trang quản trị vẫn nằm ở `../KiemDuyetVaQuanTri/css/shared/` (theme, layout, components, responsive, focus, states) và được nạp qua `style.css` của từng trang.

**Đo ngày 27-10-2026 (không nói chung chung):** repo có **sáu bảng `:root` riêng** — `css/style.css` 39 biến, `KhachHang/css/style.css` 18, `KhongGianNguoiBan/css/style.css` 10, `KiemDuyetVaQuanTri/css/shared/admin/theme.css` và `…/moderator/theme.css` mỗi tệp 6, `DangNhapVaDangKy/01-dang-nhap/css/khach-hang.css` 19. Số màu hex **dùng chung cho cả sáu tệp: 0**. Font cũng khác nhau: `Be Vietnam Pro` (5 tệp), `Inter` (3), `DM Sans`/`Fraunces` (2), `Georgia`, `Segoe UI`. Vì trang nào cũng `@import`/`<link>` tới tệp trong thư mục của chính phân hệ, **không trang nào của ba bạn nạp `css/style.css` ở gốc** — chỉ `index.html`, `403.html`, `404.html` dùng tệp này.

Đây là điểm yếu thật của tiêu chí "ba thành viên dùng chung bảng màu, phông chữ" (mục 5.2 và checklist). Nhóm **không** gộp token vào đúng ngày nộp: sáu màn quản trị đã được rà responsive và rà XSS theo bảng màu hiện tại, và `KhachHang/`, `KhongGianNguoiBan/`, `DangNhapVaDangKy/` là mã của thành viên khác — đổi biến màu hàng loạt mà không đo lại sẽ làm hỏng hình ảnh đã kiểm chứng. Hướng xử lý đúng thứ tự (làm sau khi nộp): hợp nhất token màu + font vào `:root` của tệp này, đổi dần các trang sang biến chung, chạy lại phép thử 320 / 375 / 768 / 1280 px cho 29 trang trước khi xoá bảng `:root` cũ.
