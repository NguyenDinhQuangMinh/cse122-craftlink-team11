# PHẦN 1: TỔNG QUAN DỰ ÁN & PHẠM VI HỆ THỐNG

## 1.1 Giới thiệu dự án CraftLink

### 1. Tên dự án
* **Tên nền tảng:** CraftLink – Mạng xã hội & Sàn thương mại điện tử Sản phẩm Thủ công Mỹ nghệ Custom.
* **Mã môn học:** BTL CSE122 – Phát triển Ứng dụng Web.

---

### 2. Bối cảnh & Lý do hình thành dự án

Trong những năm gần đây, xu hướng tiêu dùng hướng đến các sản phẩm thủ công (handmade/craft) mang tính cá nhân hóa cao ngày càng tăng mạnh. Khách hàng không chỉ tìm kiếm các vật dụng sinh hoạt hay trang trí thông thường, mà còn mong muốn sở hữu những sản phẩm độc bản, thể hiện gu thẩm mỹ riêng hoặc đặt làm theo yêu cầu đặc thù (Custom Orders/Briefs).

Tuy nhiên, thực tế phát triển của ngành hàng thủ công mỹ nghệ tại Việt Nam hiện nay vẫn gặp phải nhiều rào cản lớn:

* **Đối với Thợ thủ công & Làng nghề (Makers):**
  * Hạn chế trong việc tiếp cận kênh phân phối hiện đại và quảng bá thương hiệu cá nhân đến tệp khách hàng rộng lớn.
  * Thiếu công cụ quản lý chuyên nghiệp để tiếp nhận, theo dõi các yêu cầu đặt làm riêng (Briefs) và lập báo giá/kế hoạch sản xuất chi tiết.
  * Quy trình trao đổi, chốt phương án và thanh toán với khách hàng thường phân tán qua nhiều nền tảng tin nhắn cá nhân, dễ dẫn đến hủy đơn hoặc tranh chấp.

* **Đối với Khách hàng (Customers):**
  * Khó tìm kiếm được nghệ nhân hoặc xưởng sản xuất uy tín, đúng với phong cách thiết kế mong muốn.
  * Quy trình truyền tải ý tưởng (Brief) phức tạp, thiếu mẫu chuẩn hóa dẫn đến việc hiểu sai nhu cầu.
  * Thiếu công cụ so sánh báo giá (Proposals) và tiến độ thi công minh bạch từ nhiều phía.

* **Đối với Nền tảng quản lý (Platform Management):**
  * Bài đăng sản phẩm handmade dễ bị vi phạm bản quyền hình ảnh hoặc không đảm bảo tiêu chuẩn chất lượng.
  * Cần hệ thống theo dõi, kiểm duyệt nội dung và giải quyết tranh chấp công bằng giữa người mua và thợ thủ công.

**Nền tảng CraftLink** được nghiên cứu và xây dựng nhằm giải quyết triệt để các rào cản trên. Nền tảng đóng vai trò là cầu nối thương mại điện tử kết hợp mạng xã hội chuyên biệt, giúp minh bạch hóa toàn bộ quy trình từ khâu **Đăng tải sản phẩm ➔ Gửi yêu cầu Brief ➔ Báo giá Proposal ➔ Đặt hàng & Thanh toán ➔ Kiểm duyệt & Xử lý khiếu nại**.

### 3. Mục tiêu của hệ thống

Nền tảng **CraftLink** hướng tới việc xây dựng một hệ sinh thái thương mại điện tử kết hợp mạng xã hội bền vững cho ngành hàng thủ công mỹ nghệ, đạt được các mục tiêu cụ thể sau:

* **Tối ưu hóa quy trình đặt làm theo yêu cầu (Custom Order):** Chuẩn hóa việc truyền tải ý tưởng giữa Khách hàng và Thợ thủ công thông qua hệ thống Brief và Proposal minh bạch, giảm thiểu rủi ro sai sót trong quá trình chế tác.
* **Nâng cao năng lực thương mại cho Nghệ nhân & Làng nghề:** Cung cấp bộ công cụ quản lý gian hàng chuyên nghiệp, hỗ trợ tối ưu bài đăng và xây dựng thương hiệu cá nhân uy tín.
* **Đảm bảo an toàn giao dịch & Chất lượng nội dung:** Xây dựng cơ chế kiểm duyệt bài đăng, xử lý báo cáo vi phạm và giải quyết tranh chấp nhanh chóng, minh bạch.
* **Tích hợp các tính năng AI hỗ trợ người dùng:** Tự động hóa gợi ý sản phẩm, hỗ trợ viết mô tả, kiểm duyệt nội dung tự động và phát hiện các biến động bất thường trên hệ thống.

---

### 4. Phạm vi phân hệ chức năng theo vai trò

Hệ thống **CraftLink** được phân chia rõ ràng thành 3 phân hệ chức năng tương ứng với nhiệm vụ của 3 thành viên trong nhóm:

#### 🔹 Phân hệ 1: Khách hàng (Customer) – SV1
* **Khám phá & Tìm kiếm (`index.html`):** Xem banner, danh mục sản phẩm, tìm kiếm/lọc sản phẩm thủ công và nhận gợi ý cá nhân hóa từ AI.
* **Xem chi tiết sản phẩm (`product-detail.html`):** Xem thông tin, chất liệu, kích thước, hình ảnh sắc nét và gợi ý sản phẩm tương tự.
* **Tạo Brief yêu cầu tùy biến (`custom-order-brief.html`):** Soạn thảo ý tưởng đặt làm riêng, chọn ngân sách, tải ảnh tham khảo và gửi yêu cầu cho thợ thủ công.
* **So sánh & Chọn Proposal (`proposal-comparison.html`):** Tiếp nhận, phân tích, so sánh các báo giá/kế hoạch gửi về từ nhiều nghệ nhân và bấm chấp nhận/từ chối.
* **Thanh toán & Xác nhận (`checkout-confirmation.html`):** Kiểm tra giỏ hàng/đơn hàng tùy biến, chọn phương thức thanh toán và hoàn tất đặt hàng.
* **Quản lý Đơn hàng & Hồ sơ (`customer-dashboard.html`):** Theo dõi tiến độ chế tác sản phẩm theo thời gian thực và quản lý thông tin cá nhân.

#### 🔹 Phân hệ 2: Thợ thủ công / Nghệ nhân (Maker) – SV2
* **Quản lý Listing sản phẩm (`maker-listing-management.html`):** Xem danh sách sản phẩm đăng bán, lọc trạng thái (Đang bán, Chờ duyệt, Bản nháp) và chuyển đổi giao diện bảng/lưới[cite: 8].
* **Tạo & Cập nhật Listing (`maker-listing-editor.html`):** Nhập thông tin sản phẩm, thiết lập giá, tồn kho và sử dụng công cụ AI hỗ trợ viết mô tả SEO[cite: 8].
* **Hòm thư Brief / Yêu cầu tùy biến (`maker-brief-inbox.html`):** Lọc và tiếp nhận các yêu cầu đặt làm riêng từ khách hàng, xem bản tóm tắt Brief do AI hỗ trợ[cite: 9].
* **Chỉnh sửa Proposal báo giá (`maker-proposal-editor.html`):** Xây dựng báo giá chi tiết, mốc thời gian hoàn thành, các khoản chi phí và điều khoản giao dịch[cite: 10].
* **Xem trước Proposal (`maker-proposal-preview.html`):** Kiểm tra lại toàn bộ giao diện đề xuất báo giá trước khi gửi chính thức tới khách hàng[cite: 10].
* **Quản lý Gian hàng & Hồ sơ (`maker-shop-profile.html`):** Cập nhật thông tin xưởng sản xuất, câu chuyện thương hiệu và địa chỉ liên hệ[cite: 8, 9, 10].

#### 🔹 Phân hệ 3: Quản trị viên & Kiểm duyệt viên (Admin & Moderator) – SV3
* **Bảng điều khiển tổng quan (`admin-dashboard-overview.html`):** Giám sát các chỉ số doanh thu sàn, biểu đồ ngành hàng, hoạt động nghệ nhân và nhận cảnh báo bất thường từ AI[cite: 12, 14].
* **Hàng đợi kiểm duyệt sản phẩm (`admin-moderation-queue.html`):** Duyệt hoặc từ chối các bài đăng sản phẩm mới, tích hợp AI tự động quét nội dung/hình ảnh vi phạm[cite: 15].
* **Trung tâm xử lý báo cáo & khiếu nại (`admin-reports-center.html`):** Tiếp nhận, phân loại và xử lý các báo cáo vi phạm/khiếu nại tranh chấp từ người dùng[cite: 16].
* **Quản lý danh mục ngành hàng (`admin-category-management.html`):** Thêm mới, chỉnh sửa, ẩn/hiển thị các danh mục và ngành hàng thủ công[cite: 13, 17].
* **Quản lý tài khoản người dùng (`admin-user-management.html`):** Lọc danh sách người dùng theo vai trò, theo dõi trạng thái và thực hiện Khóa/Mở khóa tài khoản[cite: 13, 18].
* **Quản lý quy định & Tiêu chuẩn (`admin-content-policy.html`):** Soạn thảo, quản lý lịch sử phiên bản và xuất bản các chính sách, quy định của nền tảng[cite: 19].
