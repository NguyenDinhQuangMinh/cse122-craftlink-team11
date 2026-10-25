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
  - **Xây dựng khung giao diện dùng chung (Common Layout):** Thiết kế và phát triển các thành phần dùng chung cho toàn hệ thống bao gồm Header (Thanh điều hướng, ô tìm kiếm, giỏ hàng, thông báo, menu tài khoản), Footer (Chính sách, liên hệ, mạng xã hội).
  - **Hệ thống xác thực người dùng (Auth Flow):** Xây dựng giao diện quên mật khẩu hỗ trợ phân loại vai trò người dùng (Buyer / Maker).
  - **Trải nghiệm mua sắm & Tùy biến (Buyer Journey):** Phát triển luồng mua hàng toàn diện từ Tìm kiếm, lọc, sắp xếp sản phẩm , Xem chi tiết một sản phẩm , Thêm sản phẩm vào giỏ hàng hoặc danh sách yêu thích , Tạo yêu cầu tùy biến (brief) và chọn nghệ nhân , Xác nhận đơn qua 4 bước , Theo dõi đơn hàng và gửi yêu cầu chỉnh sửa thiết kế.

  - **Tích hợp giải pháp AI:** Ứng dụng mô hình AI gợi ý cá nhân hóa để phân tích sở thích nghệ thuật và lịch sử tương tác, từ đó đề xuất các tác phẩm thủ công phù hợp nhất cho Khách hàng.
 

---

## 🖥️ CẤU TRÚC & PHÂN TÍCH CHI TIẾT CÁC TRANG GIAO DIỆN CỦA BUYER

### 1. Danh sách sản phẩm(INDEX.HTML)
-Mục đích :Trang chính: khám phá, tìm kiếm, lọc, sắp xếp, trợ lý tìm kiếm cục bộ
-Thành phần chính :
      1. Header: logo CraftLink, 5 liên kết điều hướng, icon tìm kiếm, tin nhắn, giỏ hàng có badge, tài khoản.
      2. Breadcrumb: Trang chủ → Danh sách sản phẩm.
      3. Tiêu đề trang và ô tìm kiếm.
      4. Khối **CraftLink AI — Tìm kiếm cục bộ**.
      5. Bộ lọc bên trái:
      6. Thanh công cụ kết quả:
      7. Lưới các thẻ sản phẩm.
      8. Footer.
    

### 2. Chi tiết sản phẩm (product-detail.html)
- **Mục đích : Xem ảnh, mô tả, đánh giá, chọn số lượng, thêm giỏ, yêu thích
- Thành phần chính :
      + Breadcrumb có tên sản phẩm.
      + Thư viện ảnh: ảnh lớn + dãy ảnh nhỏ.
      + Thông tin: tên, mô tả ngắn, giá, thông số tùy biến, mô tả.
      + Bộ chọn số lượng 1–99.
      + Nút **Thêm vào giỏ hàng**.
      + Nút trái tim yêu thích.
      + Panel nghệ nhân: ảnh, tên, địa điểm, điểm sản phẩm, số sản phẩm mẫu.
      + Nút **Tạo brief tùy biến**.
      + Nút **Báo cáo listing**.
      + Danh sách đánh giá.

### 3. Tạo brief tùy biến(customize.html)
- **Mục đích: Nhập yêu cầu, tạo bản tóm tắt cục bộ, chấp nhận brief
- Thành phần chính :
      + Link **Đổi sản phẩm**.
      + Bộ chọn số lượng.
      + Textarea mô tả, tối đa 1000 ký tự.
      + Bộ đếm ký tự.
      + Ô chọn ảnh tham khảo.
      + Nút **Tạo bản tóm tắt**.
      + Panel kết quả với các nút: Chấp nhận, Sửa, Từ chối, Tạo lại, Lưu.
      + Ghi chú giải thích cách hoạt động.

### 4. Gợi ý nghệ nhân(artisan-suggestions.html)
- **Mục đích:** Lọc hồ sơ nghệ nhân theo sản phẩm và brief, chọn nghệ nhân
- **Thành phần giao diện:
      + Có bản nháp checkout.
      + Có brief đã nhập.
      + acceptedBrief === brief
- **Thao tác CRUD:** `Read` (Xem danh sách sản phẩm trong giỏ), `Update` (Sửa số lượng hoặc tùy chọn sản phẩm), `Delete` (Xóa sản phẩm/yêu cầu khỏi giỏ).

### 5. `Giỏ hàng(cart.html)
- **Mục đích:Xem, tăng/giảm, xóa sản phẩm, tính tạm tính
- **Thành phần giao diện:
      Danh sách sản phẩm trong giỏ.
      + Ảnh, tên, nghệ nhân, đơn giá.
      + Bộ tăng/giảm số lượng.
      + Thành tiền từng dòng.
      + Nút Xóa.
      + Cột tóm tắt: tạm tính, phí giao hàng, tổng cộng.
      + Nút **Tiến hành đặt hàng**.
      + Trạng thái giỏ trống.

### 6. Xác nhận đơn	(checkout.html)
- **Mục đích:** Checkout 4 bước cho một sản phẩm tùy biến hoặc nhiều sản phẩm trong giỏ
- **Thành phần giao diện:** Form cập nhật thông tin cá nhân (Avatar, Họ tên, SĐT, Email), Bảng quản lý danh sách địa chỉ nhận hàng, Tùy chọn đổi mật khẩu và thiết lập thông báo.
- **Thao tác CRUD:** `Read` (Hiển thị thông tin cá nhân), `Update` (Cập nhật thông tin hồ sơ/thay đổi mật khẩu).

### 7.Sản phẩm yêu thích	(favorites.html)
-  **Mục đích: Danh sách sản phẩm đã lưu, bỏ yêu thích

### 8.Đơn hàng	(orders.html)
- **Mục đích : Tab trạng thái, tìm kiếm, lọc thời gian, hủy đơn mô phỏng

### 9.Chi tiết đơn và revision	(order-details.html)
- **Mục đích : Xem tiến độ, so sánh phương án, lưu nháp yêu cầu chỉnh sửa
- **Thành phần giao diện :
      + Thông tin đơn: sản phẩm, mã đơn, nghệ nhân, ngày đặt, trạng thái, tổng tiền.
      + Timeline lịch sử đề xuất và chỉnh sửa.
      + So sánh phương án trước và hiện tại.
      + Textarea yêu cầu chỉnh sửa mới.
      + Các bước tiếp theo.
      + Nút **Chọn phương án hiện tại** (quay về `orders.html`).
      + Nút **Gửi yêu cầu chỉnh sửa**.
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

