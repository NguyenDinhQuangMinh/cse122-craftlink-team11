# PHÂN CÔNG NHIỆM VỤ CHI TIẾT - SV1 (BUYER & GENERAL UI)

> **Dự án:** CraftLink - Sàn thương mại điện tử sản phẩm thủ công nghệ thuật tùy biến  
> **Học phần:** Phát triển Ứng dụng Web Cơ bản (CSE122) - Nhóm 11  
> **Sinh viên phụ trách:** SV1 (Khách hàng & Khung giao diện chung)

---

## 🎨 BẢN THIẾT KẾ GIAO DIỆN CANVA (UI/UX PROTOTYPE)

👉 **Link thiết kế Canva của SV1:** [Bấm vào đây để xem Prototype Canva SV1](https://www.canva.com/design/DAHWyBVvS6U/eyYrsvv49jN-26FeiXk-Aw/edit)

---

## 📋 VAI TRÒ & PHÂN TÍCH TRÁCH NHIỆM PHỤ TRÁCH

- **Vai trò nghiệp vụ:** Khách hàng (Buyer) và Khung giao diện chung Toàn hệ thống (General Layout).
- **Phân tích trách nhiệm hệ thống:**
  - **Xây dựng khung giao diện dùng chung (Common Layout):** Thiết kế và phát triển các thành phần dùng chung cho toàn hệ thống bao gồm Header (Thanh điều hướng, ô tìm kiếm, giỏ hàng, thông báo, menu tài khoản), Footer (Chính sách, liên hệ, mạng xã hội) và các trang hệ thống/báo lỗi (`403.html`, `404.html`).
  - **Hệ thống xác thực người dùng (Auth Flow):** Xây dựng luồng đăng nhập, đăng ký và quên mật khẩu hỗ trợ phân loại vai trò người dùng (Buyer / Maker).
  - **Trải nghiệm mua sắm & Tùy biến (Buyer Journey):** Phát triển luồng mua hàng toàn diện từ Trang chủ (Landing Page), Trang xem/tìm kiếm sản phẩm (Marketplace), Chi tiết sản phẩm kèm khung tùy biến tác phẩm theo yêu cầu, Giỏ hàng, Thanh toán đến Quản lý tài khoản cá nhân.
  - **Tích hợp giải pháp AI:** Ứng dụng mô hình AI gợi ý cá nhân hóa để phân tích sở thích nghệ thuật và lịch sử tương tác, từ đó đề xuất các tác phẩm thủ công phù hợp nhất cho Khách hàng.

---

## 🖥️ CẤU TRÚC & PHÂN TÍCH CHI TIẾT 6 MÀN HÌNH HTML

### 1. `pages/common/index.html` (Trang chủ Landing Page)
- **Mục đích:** Giới thiệu thương hiệu CraftLink, thu hút người dùng và định hướng luồng khám phá các sản phẩm thủ công độc bản.
- **Thành phần giao diện:** 
  - Banner Hero chính kèm câu khẩu hiệu (Slogan) và nút kêu gọi hành động (CTA "Khám phá ngay").
  - Khối sản phẩm xu hướng, danh mục nổi bật (Gốm sứ, Đồ gỗ, Thêu dệt, Trang sức...).
  - Khối bài viết giới thiệu câu chuyện nghệ nhân (Artisan Stories).
  - Khối gợi ý sản phẩm thông minh tích hợp AI.
- **Thao tác CRUD:** `Read` (Truy xuất và hiển thị dữ liệu danh mục, sản phẩm nổi bật và thông tin trang).

### 2. `pages/common/login.html` (Trang Đăng nhập / Đăng ký)
- **Mục đích:** Cho phép người dùng xác thực tài khoản để truy cập các tính năng cá nhân hóa và đặt hàng trên sàn.
- **Thành phần giao diện:** Form đăng nhập (Email/Mật khẩu), Form đăng ký tài khoản mới (Họ tên, Email, SĐT, Chọn vai trò Khách hàng/Maker), nút đăng nhập nhanh qua Google/Facebook.
- **Thao tác CRUD:** `Create` (Đăng ký tài khoản người dùng mới), `Read` (Xác thực thông tin tài khoản khi đăng nhập).

### 3. `pages/buyer/marketplace.html` (Trang Danh sách sản phẩm & Chi tiết tùy biến)
- **Mục đích:** Hiển thị chi tiết tác phẩm thủ công và cung cấp bộ công cụ cho phép khách hàng đưa ra yêu cầu tùy biến riêng với nghệ nhân.
- **Thành phần giao diện:** 
  - Gallery hình ảnh/video sản phẩm đa góc nhìn.
  - Thông tin tác giả (Nghệ nhân/Xưởng sản xuất) và giá bán niêm yết.
  - Bảng chọn tùy biến: Khắc tên/thông điệp, chọn màu men, kích thước, chất liệu.
  - Nút "Thêm vào giỏ hàng" và "Đặt làm theo yêu cầu".
- **Thao tác CRUD:** `Read` (Xem chi tiết thông tin và thuộc tính sản phẩm), `Create` (Gửi bản yêu cầu tùy biến riêng).

### 4. `pages/buyer/custom-brief.html` (Trang Giỏ hàng & Yêu cầu riêng)
- **Mục đích:** Quản lý danh sách sản phẩm chuẩn bị thanh toán và tổng hợp các bản yêu cầu đặt đồ thủ công riêng (Custom Briefs).
- **Thành phần giao diện:** Bảng danh sách sản phẩm kèm ảnh thu nhỏ, khung hiển thị chi tiết các yêu cầu tùy biến đã chọn, ô chỉnh sửa số lượng, ô nhập mã giảm giá (Voucher) và bảng tính toán tổng chi phí.
- **Thao tác CRUD:** `Read` (Xem danh sách sản phẩm trong giỏ), `Update` (Sửa số lượng hoặc tùy chọn sản phẩm), `Delete` (Xóa sản phẩm/yêu cầu khỏi giỏ).

### 5. `pages/buyer/orders.html` (Trang Thanh toán & Quản lý đơn hàng)
- **Mục đích:** Hoàn tất quy trình đặt mua sản phẩm và theo dõi tiến độ xử lý đơn hàng/đơn tùy biến.
- **Thành phần giao diện:** Form nhập địa chỉ giao hàng, danh sách phương thức thanh toán (COD, Chuyển khoản ngân hàng, Ví điện tử), Bảng tóm tắt đơn hàng và Danh sách lịch sử đơn hàng phân theo trạng thái (Chờ xác nhận, Đang gia công, Đang giao, Hoàn thành).
- **Thao tác CRUD:** `Create` (Khởi tạo đơn hàng mới), `Read` (Theo dõi danh sách và trạng thái đơn hàng).

### 6. `pages/common/profile.html` (Trang Hồ sơ cá nhân & Cài đặt)
- **Mục đích:** Quản lý thông tin tài khoản người dùng, địa chỉ mặc định và các thiết lập ưu tiên cá nhân.
- **Thành phần giao diện:** Form cập nhật thông tin cá nhân (Avatar, Họ tên, SĐT, Email), Bảng quản lý danh sách địa chỉ nhận hàng, Tùy chọn đổi mật khẩu và thiết lập thông báo.
- **Thao tác CRUD:** `Read` (Hiển thị thông tin cá nhân), `Update` (Cập nhật thông tin hồ sơ/thay đổi mật khẩu).

---

## 🤖 TÍNH NĂNG AI TÍCH HỢP (PERSONALIZED AI PRODUCT RECOMMENDER & STYLE MATCHER)

- **Nguyên lý hoạt động:**
  1. **Thu thập hành vi:** AI phân tích các lượt xem sản phẩm, từ khóa tìm kiếm và các lựa chọn phong cách nghệ thuật của Khách hàng.
  2. **Gợi ý cá nhân hóa:** Mô hình AI lọc các sản phẩm thủ công theo độ tương đồng về chất liệu, tông màu và phong cách thiết kế để tạo ra danh sách gợi ý độc bản cho từng tài khoản.

- **Kịch bản trải nghiệm trên giao diện (User Scenario):**
  - Tại trang chủ (`index.html`) hoặc trang chi tiết (`marketplace.html`), giao diện hiển thị một thẻ thông minh: *"Trợ lý AI đề xuất riêng cho bạn"*.
  - Khi khách hàng nhấn chọn phong cách yêu thích (ví dụ: *"Gốm vuốt tay phong cách Wabi-Sabi"*), AI lập tức lọc ra 4 tác phẩm thủ công tương thích nhất từ các thợ thủ công khác nhau kèm nhãn đánh giá 🟢 *Độ phù hợp AI: 96%*.

---

## 📑 NHẬT KÝ TIẾN ĐỘ THỰC HIỆN (CHECKLIST WORKFLOW)

- [x] Hoàn thành thiết kế Prototype 6 màn hình trên Canva
- [x] Tích hợp liên kết Canva `https://www.canva.com/design/DAHWyBVvS6U/eyYrsvv49jN-26FeiXk-Aw/edit` vào hồ sơ dự án
- [ ] Khởi tạo cấu trúc thư mục `pages/common/` và `pages/buyer/`
- [ ] Dựng khung HTML/CSS dùng chung toàn hệ thống (`navbar.css`, `footer.css`, `style.css`)
- [ ] Cắt file HTML cho 3 màn hình chung (`index.html`, `login.html`, `profile.html`)
- [ ] Cắt file HTML cho 3 màn hình Khách hàng (`marketplace.html`, `custom-brief.html`, `orders.html`)
- [ ] Viết mã mô phỏng tính năng AI gợi ý sản phẩm trong `js/ai/`
- [ ] Kiểm tra hiển thị Responsive trên Desktop và Mobile
- [x] Thiết kế Prototype  màn hình trên Canva
- [x] Dán liên kết Canva vào tài liệu `docs/sv2-assignment.md` và `docs/team-assignment.md`
- [ ] Tạo khung HTML/CSS cho phân hệ Maker (`maker.css`)
- [ ] Hoàn thiện HTML/CSS cho 6 màn hình phụ trách
- [ ] Viết mã mô phỏng tính năng AI Copywriter (`js/ai/`)
- [ ] Kiểm tra hiển thị Responsive trên các thiết bị

