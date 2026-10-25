# Quản trị viên & Kiểm duyệt viên (Admin / Moderator) — SV3

Thư mục dành cho 6 màn hình STT 13–18 trong `docs/screen-inventory.md`: dashboard, hàng đợi kiểm duyệt, trung tâm báo cáo, quản lý danh mục, quản lý tài khoản, quy định nội dung.

**Mã nguồn chưa nằm ở đây.** Phần này SV3 viết trong thư mục `KiemDuyetVaQuanTri/` ở nhánh `feature/sv3-admin-screens` và đang chờ xử lý nhận xét của PR #1, chưa merge vào `dev`. Thư mục này mở ra để khi hai nhánh gộp lại, code vai quản trị nằm riêng một chỗ, không lẫn với `ThoThuCong/` và `KhachHang/`.

Cấu trúc SV3 đang dùng ở nhánh kia: mỗi màn hình có `css/style.css` + `css/page.css` + `js/main.js` riêng, phần dùng chung giữa các màn quản trị đặt ở `css/shared/admin/` và `css/shared/moderator/`, dữ liệu mẫu ở `assets/data/*.json`. Giữ nguyên cách đó, chỉ đổi thư mục gốc sang tên này.
