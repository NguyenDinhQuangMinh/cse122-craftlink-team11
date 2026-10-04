# PHẦN 1: TỔNG QUAN DỰ ÁN & PHẠM VI HỆ THỐNG

## 1.1 Giới thiệu dự án CraftLink

### 1. Tên dự án
* **Tên nền tảng:** CraftLink – Mạng xã hội & Sàn thương mại điện tử Sản phẩm Thủ công Mỹ nghệ Custom.
* **Mã môn học:** BTL CSE122 – Phát triển Ứng dụng Web.

---

### 2. Bối cảnh & Lý do hình thành
Trong những năm gần đây, xu hướng sử dụng sản phẩm thủ công (handmade/craft) mang tính cá nhân hóa cao ngày càng tăng mạnh. Tuy nhiên, các làng nghề và thợ thủ công (Makers/Craftsmen) thường gặp khó khăn trong việc:
* Tiếp cận khách hàng mục tiêu và quảng bá thương hiệu cá nhân.
* Quản lý các đơn đặt hàng làm theo yêu cầu (Custom Orders/Briefs) một cách hệ thống.
* Min bạch hóa quy trình báo giá, tiến độ sản xuất và thanh toán.

**CraftLink** được xây dựng nhằm giải quyết các rào cản này bằng cách tạo ra một cầu nối trực tiếp giữa **Khách hàng (Customers)** có nhu cầu đặt đồ thủ công độc bản và **Thợ thủ công (Makers)**, dưới sự quản lý và kiểm duyệt chặt chẽ từ **Đội ngũ Quản trị & Kiểm duyệt (Admin & Moderation)**.

---

### 3. Mục tiêu của hệ thống
* **Đối với Khách hàng:** Dễ dàng tìm kiếm sản phẩm thủ công, tạo yêu cầu đặt làm theo ý tưởng riêng (Brief), nhận và so sánh các đề xuất báo giá (Proposals) từ nhiều nghệ nhân.
* **Đối với Thợ thủ công:** Cung cấp công cụ quản lý gian hàng chuyên nghiệp, hòm thư tiếp nhận brief, bộ công cụ lập báo giá/kế hoạch sản xuất và theo dõi doanh thu.
* **Đối với Quản trị viên & Kiểm duyệt viên:** Đảm bảo an toàn nội dung, duy trì chất lượng bài đăng, xử lý kịp thời các báo cáo vi phạm/tranh chấp và theo dõi chỉ số tăng trưởng toàn sàn.

---

### 4. Phạm vi phân hệ chức năng theo vai trò

Hệ thống **CraftLink** được chia thành 3 phân hệ chính tương ứng với 3 thành viên thực hiện:

#### 🔹 Phân hệ 1: Khách hàng (Customer) – Phụ trách bởi SV1
* Khám phá sản phẩm, tìm kiếm và lọc theo ngành hàng (Gốm sứ, Đồ gỗ, Đồ da, Trang sức...).
* Xem thông tin chi tiết sản phẩm và hồ sơ xưởng thủ công.
* Soạn thảo và gửi Yêu cầu đặt làm tùy biến (Custom Order Brief).
* Xem, so sánh các Đề xuất báo giá (Proposals) từ nghệ nhân và chọn đề xuất phù hợp.
* Thực hiện thanh toán, xác nhận đơn hàng và quản lý tiến độ thực hiện trong Dashboard cá nhân.

#### 🔹 Phân hệ 2: Thợ thủ công (Maker) – Phụ trách bởi SV2
* Quản lý danh sách sản phẩm đăng bán (Listing Management) và bộ chỉnh sửa bài đăng.
* Quản lý Hòm thư Yêu cầu tùy biến (Brief Inbox) từ khách hàng gửi đến.
* Xây dựng và gửi Đề xuất báo giá (Proposal Editor) kèm xem trước giao diện gửi khách (Proposal Preview).
* Quản lý và tùy chỉnh Trang hồ sơ gian hàng/thương hiệu cá nhân (Shop Profile).

#### 🔹 Phân hệ 3: Quản trị & Kiểm duyệt (Admin & Moderator) – Phụ trách bởi SV3
* Bảng điều khiển tổng quan (Dashboard) theo dõi doanh thu nền tảng, số lượng nghệ nhân, đơn hàng và nhật ký hệ thống[cite: 12, 14].
* Hàng đợi kiểm duyệt bài đăng sản phẩm mới (Moderation Queue)[cite: 15].
* Trung tâm tiếp nhận và xử lý báo cáo vi phạm, khiếu nại người dùng (Reports Center)[cite: 16].
* Quản lý danh mục ngành hàng thủ công (Category Management)[cite: 13, 17].
* Quản lý phân quyền, khóa/mở khóa tài khoản người dùng (User Management)[cite: 13, 18].
* Soạn thảo và xuất bản Quy định nội dung & Tiêu chuẩn cộng đồng (Content Policy)[cite: 19].
