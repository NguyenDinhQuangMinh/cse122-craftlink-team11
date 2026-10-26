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
* **Tích hợp các tính năng AI hỗ trợ người dùng:** Gợi ý sản phẩm và soạn brief cho khách hàng, hỗ trợ viết mô tả/ước tính chi phí cho nghệ nhân, chấm rủi ro bài đăng và phân loại báo cáo cho kiểm duyệt viên.

---

### 4. Phạm vi phân hệ chức năng theo vai trò

Hệ thống **CraftLink** chia thành ba phân hệ, mỗi thành viên một nhánh, tổng **18 màn hình nghiệp vụ** (bảng kiểm kê: [`screen-inventory.md`](./screen-inventory.md)). Hai trang đăng nhập/đăng ký dùng chung nằm ngoài bảng kiểm kê.

#### 🔹 Phân hệ 1: Khách hàng (Customer) – SV1, nhánh `feature/sv1-buyer`, 10 tệp HTML / 6 dòng kiểm kê
* **Khám phá & tìm kiếm (STT 1) — `KhachHang/index.html`, `KhachHang/favorites.html`:** Xem danh mục sản phẩm, tìm kiếm/lọc/sắp xếp, lưu sản phẩm yêu thích; trợ lý tìm kiếm cục bộ.
* **Xem chi tiết sản phẩm (STT 2) — `KhachHang/product-detail.html`:** Xem thông tin, chất liệu, kích thước, hình ảnh; thêm vào giỏ hoặc chuyển sang đặt làm tùy biến.
* **Tạo brief tùy biến (STT 3) — `KhachHang/customize.html`:** Soạn ý tưởng, chọn ngân sách, đính kèm ảnh tham khảo và tạo bản tóm tắt cục bộ trước khi chọn nghệ nhân.
* **Gợi ý nghệ nhân (STT 4) — `KhachHang/artisan-suggestions.html`:** Lọc hồ sơ nghệ nhân theo sản phẩm và brief, chọn nghệ nhân để gửi yêu cầu.
* **Giỏ hàng & xác nhận đơn (STT 5) — `KhachHang/cart.html`, `KhachHang/checkout.html`:** Sửa/xóa dòng hàng, nhập địa chỉ, chọn thanh toán và xác nhận đơn.
* **Đơn hàng & chi tiết đơn (STT 6) — `KhachHang/orders.html`, `KhachHang/order-details.html`:** Lọc đơn theo trạng thái, xem tiến độ và gửi yêu cầu chỉnh sửa thiết kế.
* **Khôi phục mật khẩu — `KhachHang/forgot password.html` (ngoài 18 dòng kiểm kê):** Dựng sẵn luồng ba bước — nhập email đã đăng ký, gửi link đặt lại, đặt mật khẩu mới kèm thước đo độ mạnh. Chưa chạy được: tệp nạp ba script `common.js`, `auth-config.js`, `auth-service.js` không có trong nhánh, và href CSS ghi sai tên tệp; chưa có liên kết trỏ tới từ trang đăng nhập dùng chung.

#### 🔹 Phân hệ 2: Thợ thủ công / Nghệ nhân (Maker) – SV2, nhánh `feature/sv2-maker-screens`, 4 thư mục / 6 dòng kiểm kê
* **Quản lý listing (STT 7) — `KhongGianNguoiBan/01-listing-management/index.html`:** Xem, tìm kiếm, lọc trạng thái, lưu trữ hoặc chỉnh sửa sản phẩm.
* **Tạo & cập nhật listing (STT 8) — biểu mẫu *+ Tạo listing mới* trong cùng trang:** Nhập thông tin, tải ảnh, chọn danh mục, đặt giá và tồn kho; có AI copywriter cục bộ.
* **Hòm thư brief (STT 9) — `KhongGianNguoiBan/02-brief-inbox/index.html`:** Lọc và tiếp nhận yêu cầu đặt làm, xem bản tóm tắt brief.
* **Soạn proposal (STT 10) — `KhongGianNguoiBan/03-proposal-editor/index.html`:** Nhập chi phí, thời gian, hạng mục công việc và điều khoản; có gợi ý chi phí/thời gian cục bộ.
* **Xem trước proposal (STT 11) — khung xem trước trong cùng trang:** Kiểm tra nội dung khách sẽ nhận trước khi gửi.
* **Hồ sơ gian hàng (STT 12) — `KhongGianNguoiBan/04-shop-profile/index.html`:** Cập nhật tên xưởng, giới thiệu thương hiệu, ảnh bìa và thông tin liên hệ.

#### 🔹 Phân hệ 3: Quản trị viên & Kiểm duyệt viên (Admin & Moderator) – SV3, nhánh `feature/sv3-admin-screens`, 6 tệp
* **Bảng điều khiển (STT 13) — `KiemDuyetVaQuanTri/01-dashboard/index.html`:** Bốn thẻ số liệu, biểu đồ và nhật ký hoạt động; chỉ đọc, hai thẻ tính từ kho dữ liệu chung.
* **Hàng đợi kiểm duyệt (STT 14) — `04-moderation-queue/index.html`:** Duyệt, yêu cầu chỉnh sửa hoặc từ chối bài đăng; AI chấm rủi ro kèm lý do.
* **Trung tâm báo cáo (STT 15) — `05-report-center/index.html`:** Lọc theo trạng thái/lý do/thời gian, xử lý hoặc bỏ qua báo cáo; AI phân loại và xếp ưu tiên.
* **Quản lý danh mục (STT 16) — `02-category-management/index.html`:** Thêm, sửa, xóa, ẩn/hiện danh mục và đếm danh mục con/sản phẩm.
* **Quản lý tài khoản (STT 17) — `03-user-management/index.html`:** Lọc theo vai trò, thêm/sửa, khóa hoặc mở khóa tài khoản.
* **Quy định nội dung (STT 18) — `06-content-guidelines/index.html`:** Thêm, sửa, xóa quy định; tìm kiếm, lọc nhóm, sắp xếp; AI soạn bản nháp để quản trị viên duyệt.

> **Phạm vi thật so với mô tả ban đầu:** không có màn "so sánh proposal" phía khách — SV1 thay bằng màn **chọn nghệ nhân**. Bảng điều khiển chỉ đọc và chỉ hai trong bốn thẻ số liệu tính từ dữ liệu chung. Quy định nội dung chưa có lịch sử phiên bản và chưa có bước xuất bản riêng. Ba tính năng AI của phân hệ quản trị gọi `api/ai.js` (có dự phòng cục bộ); năm tính năng của SV1/SV2 là bộ quy tắc cục bộ.
