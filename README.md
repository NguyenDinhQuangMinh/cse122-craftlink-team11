# CRAFTLINK - SÀN THƯƠNG MẠI ĐIỆN TỬ SẢN PHẨM THỦ CÔNG TÙY BIẾN
> **Bài tập lớn học phần:** Phát triển Ứng dụng Web Cơ bản (CSE122) - Nhóm 11

---

## 1. 📌 TỔNG QUAN DỰ ÁN
**CraftLink** là nền tảng thương mại điện tử chuyên biệt dành cho các sản phẩm thủ công nghệ thuật độc bản. Nền tảng kết nối trực tiếp Khách hàng (Buyer) với các Thợ thủ công / Nghệ nhân (Maker), cho phép gửi các yêu cầu đặt làm sản phẩm riêng (Custom Orders) và tích hợp các công cụ AI thông minh hỗ trợ trải nghiệm người dùng.

* **Bảng màu chủ đạo (Design System):** Warm Terracotta (`#C85A32`), Sage Green (`#6A8D73`), Cream, Charcoal.

---

## 2. 📂 HỒ SƠ & TÀI LIỆU NỘP BÀI (DOCUMENTATION)
Tất cả tài liệu chi tiết của dự án được quản lý tập trung trong thư mục [`docs/`](./docs/):

* 📑 **1.1 Giới thiệu dự án & Phạm vi hệ thống:** [`docs/project-introduction.md`](./docs/project-introduction.md)
* 🎨 **Phân công nhiệm vụ & Link Canva UI:** [`docs/team-assignment.md`](./docs/team-assignment.md)
* 📊 **Bảng kiểm kê 21 Màn hình HTML:** [`docs/screen-list.md`](./docs/screen-inventory.md)
* 📑 **Nhiệm vụ SV1 (Buyer & General UI):** [`docs/sv1-assignment.md`](./docs/sv1-assignment.md)
* 📑 **Nhiệm vụ SV2 (Maker / Artisan):** [`docs/sv2-assignment.md`](./docs/sv2-assignment.md)
* 🛡️ **Nhiệm vụ SV3 (Moderator & Admin):** [`docs/sv3-assignment.md`](./docs/sv3-assignment.md)

---

## 3. 👥 THÀNH VIÊN VÀ PHÂN CÔNG VAI TRÒ
| STT | Thành viên | Họ và tên | Mã sinh viên | Vai trò phụ trách | Số màn hình | Tích hợp tính năng AI |
| :---: | :---: | :--- | :---: | :--- | :---: | :--- |
| Bonus | **SV1+SV2+SV3** | | | Giao diện đăng nhập, đăng ký | **6** | |
| 1 | **SV1** | Nguyễn Xuân Hưng | 2551060622 | Khách hàng (Buyer) & Giao diện chung | **6** | AI Personalization & Visual Matcher |
| 2 | **SV2** | Dương Vũ Quân Minh | 2551060650 | Thợ thủ công / Nghệ nhân (Maker) | **3** | AI Copywriter, SEO & Brief Summarizer |
| 3 | **SV3** | Nguyễn Đình Quang Minh | 2551060651 | Kiểm duyệt viên (Mod) & Quản trị viên (Admin) | **6** | AI Content Moderation, Risk Triage & Policy Copilot |

---

## 4. 🗂️ MÃ NGUỒN ĐÃ NỘP

| Phân hệ | Vị trí | Trạng thái |
| :--- | :--- | :--- |
| Quản trị viên & Kiểm duyệt viên (SV3) | [`KiemDuyetVaQuanTri/`](./KiemDuyetVaQuanTri/) | Đã có đủ 6 màn hình, chạy được |
| Khách hàng (SV1) | chờ mã nguồn | — |
| Thợ thủ công (SV2) | chờ mã nguồn | — |

Điểm vào của phân hệ SV3: `index.html` chuyển tới `KiemDuyetVaQuanTri/GopTrang.html`, màn hình tích hợp sáu trang con.

## 5. ▶️ CHẠY GIAO DIỆN

Mở thư mục gốc dự án bằng VS Code và chạy một máy chủ tĩnh, ví dụ tiện ích **Live Server**, rồi mở địa chỉ localhost do Live Server cung cấp. Không mở tệp trực tiếp bằng `file://` vì trình duyệt chặn việc tải JSON.

## 6. 🤖 TÍCH HỢP AI

Một API server-side tại [`api/ai.js`](./api/ai.js) dùng chung một nhà cung cấp/mô hình cho từng loại tác vụ; khóa API chỉ đọc từ biến môi trường máy chủ (`AI_API_URL`, `AI_API_KEY`, `AI_MODEL`), không có trong mã nguồn.

- Hàng đợi kiểm duyệt: phân tích rủi ro nội dung sản phẩm, gửi kèm thông tin sản phẩm và quy định hiện hành.
- Trung tâm báo cáo: tóm tắt, ưu tiên và đề xuất xử lý báo cáo.
- Hướng dẫn nội dung: soạn nháp quy định để quản trị viên sửa và xác nhận.
- `product-discovery` đã khai báo ở server để nối vào màn hình người mua; chưa có UI trong phân hệ quản trị.

GitHub Pages chỉ phục vụ tệp tĩnh nên endpoint AI không chạy trên Pages; cần Vercel hoặc nền tảng có serverless function. Khi máy chủ chưa có khóa, `KiemDuyetVaQuanTri/js/ai-fallback.js` phân tích bằng bộ quy tắc trên đúng dữ liệu của bản ghi đang mở, và giao diện luôn hiển thị dòng "Nguồn:" ghi rõ kết quả đến từ mô hình AI hay từ bộ quy tắc cục bộ.

Khai báo chi tiết, prompt và giới hạn dữ liệu: [`KiemDuyetVaQuanTri/docs/ai-usage-report.md`](./KiemDuyetVaQuanTri/docs/ai-usage-report.md).

## 7. 🔗 LIÊN KẾT

- **Thiết kế Canva SV3:** [canva.link/zqtyq0qivogb17s](https://canva.link/zqtyq0qivogb17s)
- **Video OBS SV3:** chưa cập nhật.
