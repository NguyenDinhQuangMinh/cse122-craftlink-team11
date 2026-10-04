# PHÂN CÔNG NHIỆM VỤ CHI TIẾT - SV1 (Buyer & General UI)

> **Dự án:** CraftLink - Sàn thương mại điện tử sản phẩm thủ công nghệ thuật tùy biến  
> **Học phần:** Phát triển Ứng dụng Web Cơ bản (CSE122) - Nhóm 11  
> **Sinh viên phụ trách:** SV1 (khách hàng/giao diện chung)

---

## 🎨 BẢN THIẾT KẾ GIAO DIỆN CANVA (UI/UX PROTOTYPE)

👉 **Link thiết kế Canva của SV1:** [Link Canva SV1](https://www.canva.com/design/DAHWyBVvS6U/eyYrsvv49jN-26FeiXk-Aw/edit)

---

## 📋 VAI TRÒ & TRÁCH NHIỆM CHÍNH

- **Vai trò nghiệp vụ:** khách hàng/giao diện chung(Buyer/General UI).
- **Trách nhiệm hệ thống:**
  - Xây dựng toàn bộ phân hệ quản lý giao diện cho khách hàng.
  - xây dựng giao diện chung như trang đăng nhập,trang 404 khi tải trang bị lỗi,...
  - Quản lý danh sách bài đăng sản phẩm thủ công, Trình tạo/chỉnh sửa sản phẩm nâng cao.
  - Xử lý các yêu cầu đặt hàng tùy biến (Custom Order Requests) gửi từ khách hàng và Báo cáo quản lý doanh thu.
  - Tích hợp công cụ AI hỗ trợ sáng tạo nội dung mô tả sản phẩm và tự động tối ưu hóa từ khóa SEO.

---

## 🖥️ DANH SÁCH 6 MÀN HÌNH HTML PHỤ TRÁCH

### 1. `pages/maker/brief-inbox.html` (Bảng điều khiển Maker / Thống kê doanh số)
- **Chức năng:** Trang tổng quan dành cho Thợ thủ công: biểu đồ doanh số bán hàng, số đơn hàng mới, thông báo yêu cầu tùy biến chưa xử lý.
- **Thao tác CRUD:** `Read` (Xem chỉ số thống kê & danh sách đơn hàng mới).

### 2. `pages/maker/proposal-editor.html` (Thiết lập & Thiết kế gian hàng)
- **Chức năng:** Cho phép nghệ nhân tuỳ chỉnh tên shop, câu chuyện thương hiệu (Artisan Story), ảnh cover, avatar và địa chỉ xưởng sản xuất.
- **Thao tác CRUD:** `Create` / `Update` (Cập nhật thông tin gian hàng).

### 3. `pages/maker/listing-management.html` (Quản lý danh sách bài đăng sản phẩm)
- **Chức năng:** Bảng quản lý toàn bộ các sản phẩm đã đăng bán, lọc theo trạng thái (Đang bán, Hết hàng, Ẩn, Chờ duyệt).
- **Thao tác CRUD:** `Read` (Xem danh sách sản phẩm), `Delete` (Xóa hoặc ẩn bài đăng sản phẩm).

### 4. `pages/maker/proposal-editor.html` (Trình tạo/Sửa sản phẩm & Tích hợp AI Copywriter)
- **Chức năng:** Trình đăng tải sản phẩm mới: upload hình ảnh, đặt giá, thuộc tính tùy biến và tích hợp công cụ AI viết mô tả tự động.
- **Thao tác CRUD:** `Create` (Tạo bài đăng sản phẩm mới), `Update` (Sửa thông tin sản phẩm).

### 5. `pages/maker/brief-inbox.html` (Quản lý yêu cầu đặt hàng tùy biến từ Khách)
- **Chức năng:** Tiếp nhận các bản yêu cầu (Custom Brief) từ Khách hàng, phản hồi báo giá, ước tính thời gian hoàn thành tác phẩm.
- **Thao tác CRUD:** `Read` (Xem chi tiết yêu cầu khách gửi), `Update` (Chấp nhận/Tùy chỉnh/Từ chối báo giá).

### 6. `pages/maker/brief-inbox.html` (Báo cáo doanh thu & Rút tiền)
- **Chức năng:** Quản lý số dư ví Maker, chi tiết các khoản thu nhập theo đơn hàng, lịch sử rút tiền về tài khoản ngân hàng.
- **Thao tác CRUD:** `Read` (Xem báo cáo tài chính), `Create` (Gửi yêu cầu rút tiền).

---

## 🤖 TÍNH NĂNG AI TÍCH HỢP (AI ARTISAN STORYTELLER & COPYWRITER)

- **Mô tả tính năng:** Công cụ AI hỗ trợ Thợ thủ công biến các thông tin chất liệu thô sơ thành bài viết mô tả sản phẩm truyền cảm hứng, mang tính nghệ thuật cao và tự động tối ưu hóa từ khóa SEO.
- **Kịch bản trải nghiệm (User Scenario):**
  - Tại trang đăng sản phẩm, Maker chỉ cần nhập vài từ khóa ngắn (ví dụ: *"Bình gốm, vuốt tay, men hỏa biến, màu xanh ngọc"*).
  - Bấm nút **"Nhờ AI sáng tạo mô tả"**, AI sẽ tự động sinh ra đoạn văn mô tả đầy cảm xúc về giá trị thủ công độc bản kèm danh sách từ khóa SEO gợi ý.

---

## 📑 NHẬT KÝ TIẾN ĐỘ THỰC HIỆN (CHECKLIST)

- [x] Thiết kế Prototype  màn hình trên Canva
- [x] Dán liên kết Canva vào tài liệu `docs/sv2-assignment.md` và `docs/team-assignment.md`
- [ ] Tạo khung HTML/CSS cho phân hệ Maker (`maker.css`)
- [ ] Hoàn thiện HTML/CSS cho 6 màn hình phụ trách
- [ ] Viết mã mô phỏng tính năng AI Copywriter (`js/ai/`)
- [ ] Kiểm tra hiển thị Responsive trên các thiết bị

