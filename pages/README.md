# pages/ — Thư mục màn hình của toàn dự án

Barem yêu cầu ở đâu: Tiêu chí 2 minh chứng là `pages/*.html`; Checklist tự rà soát mục 1 đòi `docs/screen-inventory.md` "khớp 1:1 với các tệp trong thư mục `pages/`"; mục 3 đòi mọi tệp HTML đặt tên theo chuẩn `role-function-action.html` (kebab-case, tiếng Anh, không dấu).

Quy tắc của thư mục này:

- Mỗi màn hình độc lập trong bảng kiểm kê là một tệp `.html` nằm trực tiếp tại đây, không lồng thư mục con.
- Tên tệp trùng đúng giá trị ở cột "Tệp HTML" của `docs/screen-inventory.md`.
- Mọi tệp phải có `<header>`, `<nav>`, `<main>`, `<footer>`, đúng một `<h1>`, mọi `<img>` có `alt`, mọi ô biểu mẫu có `<label>` (checklist mục 5).

Trạng thái hiện tại: **chưa có tệp nào**. Mã nguồn sáu màn hình quản trị đang nằm ở `../KiemDuyetVaQuanTri/01-dashboard/…06-content-guidelines/` và sẽ được chuyển vào đây sau khi PR #1 được hai thành viên còn lại duyệt, vì việc chuyển phải viết lại toàn bộ đường dẫn tương đối và đo lại responsive.
