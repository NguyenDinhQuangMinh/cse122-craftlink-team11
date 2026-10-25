# CRAFTLINK - SÀN THƯƠNG MẠI ĐIỆN TỬ SẢN PHẨM THỦ CÔNG TÙY BIẾN
> **Bài tập lớn học phần:** Phát triển Ứng dụng Web Cơ bản (CSE122) - Nhóm 11

---

## 1. 📌 TỔNG QUAN DỰ ÁN
**CraftLink** là nền tảng thương mại điện tử chuyên biệt dành cho các sản phẩm thủ công nghệ thuật độc bản. Nền tảng kết nối trực tiếp Khách hàng (Buyer) với các Thợ thủ công / Nghệ nhân (Maker), cho phép gửi các yêu cầu đặt làm sản phẩm riêng (Custom Orders) và tích hợp các công cụ AI thông minh hỗ trợ trải nghiệm người dùng.

* **Bảng màu chủ đạo (Design System):** Warm Terracotta (`#C85A32`), Sage Green (`#6A8D73`), Cream, Charcoal.

---

## 2. 🗂️ CẤU TRÚC THƯ MỤC THEO VAI TRÒ
Mỗi vai trò một thư mục, HTML/CSS/JS để riêng, không dùng chéo giữa các vai.

| Vai trò | Thư mục | Trạng thái mã nguồn |
| :--- | :--- | :--- |
| Thợ thủ công / Nghệ nhân | `ThoThuCong/` | 4 màn hình đã có mã (`01-listing-management`, `02-brief-inbox`, `03-proposal-editor`, `04-shop-profile`), CSS riêng ở `css/style.css`, JS riêng ở `js/chung.js` |
| Khách hàng | `KhachHang/` | Chưa có mã nguồn, xem `KhachHang/README.md` |
| Quản trị viên / Kiểm duyệt viên | `QuanTriVaKiemDuyet/` | Mã đang ở nhánh `feature/sv3-admin-screens` (thư mục `KiemDuyetVaQuanTri/`), chờ merge PR #1 |
| Cổng vào chung cho cả ba vai | `DangNhapVaDangKy/` | 2 màn đăng nhập / đăng ký, CSS-JS ở `assets/`, là bộ duy nhất dùng chung nên giữ ở gốc repo |

---

## 3. 📂 HỒ SƠ & TÀI LIỆU NỘP BÀI (DOCUMENTATION)
Tất cả tài liệu chi tiết của dự án được quản lý tập trung trong thư mục [`docs/`](./docs/):

* 📑 **1.1 Giới thiệu dự án & Phạm vi hệ thống:** [`docs/project-introduction.md`](./docs/project-introduction.md)
* 🎨 **Phân công nhiệm vụ & Link Canva UI:** [`docs/team-assignment.md`](./docs/team-assignment.md)
* 📊 **Bảng kiểm kê 18 Màn hình HTML:** [`docs/screen-inventory.md`](./docs/screen-inventory.md)
* 📑 **Nhiệm vụ SV1 (Buyer & General UI):** [`docs/sv1-assignment.md`](./docs/sv1-assignment.md)
* 📑 **Nhiệm vụ SV2 (Maker / Artisan):** [`docs/sv2-assignment.md`](./docs/sv2-assignment.md)
* 🛡️ **Nhiệm vụ SV3 (Moderator & Admin):** [`docs/sv3-assignment.md`](./docs/sv3-assignment.md)

---

## 4. 👥 THÀNH VIÊN VÀ PHÂN CÔNG VAI TRÒ
| STT | Thành viên | Họ và tên | Mã sinh viên | Vai trò phụ trách | Số màn hình | Tích hợp tính năng AI |
| :---: | :---: | :--- | :---: | :--- | :---: | :--- |
| Bonus | **SV1+SV2+SV3** | | | Giao diện đăng nhập, đăng ký | **6** | |
| 1 | **SV1** | Nguyễn Xuân Hưng | 2551060622 | Khách hàng (Buyer) & Giao diện chung | **6** | AI Personalization & Visual Matcher |
| 2 | **SV2** | Dương Vũ Quân Minh | 2551060650 | Thợ thủ công / Nghệ nhân (Maker) | **4** | AI Cost & Timeline Advisor + AI Copywriter/SEO cho listing (bộ quy tắc cục bộ) |
| 3 | **SV3** | Nguyễn Đình Quang Minh | 2551060651 | Kiểm duyệt viên (Mod) & Quản trị viên (Admin) | **6** | AI Content Moderation & Anomaly Detection |
