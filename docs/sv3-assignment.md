# PHÂN CÔNG NHIỆM VỤ CHI TIẾT - SV3 (MODERATOR & ADMIN)

> **Dự án:** CraftLink - Sàn thương mại điện tử sản phẩm thủ công nghệ thuật tùy biến  
> **Học phần:** Phát triển Ứng dụng Web Cơ bản (CSE122) - Nhóm 11  
> **Sinh viên phụ trách:** SV3 (Kiểm duyệt viên & Quản trị viên hệ thống)

---

## 🎨 BẢN THIẾT KẾ GIAO DIỆN CANVA

👉 **Link thiết kế Canva của SV3:** [Bấm vào đây để xem Canva SV3](https://canva.link/zqtyq0qivogb17s)

---

## 📋 VAI TRÒ & PHÂN TÍCH TRÁCH NHIỆM NGHỆ PHỤ TRÁCH

- **Vai trò nghiệp vụ:** Kiểm duyệt viên (Moderator) và Quản trị viên hệ thống (Admin).
- **Phân tích trách nhiệm hệ thống:**
  - **Khung giao diện Dashboard dùng chung:** Thiết kế cấu trúc giao diện chuẩn cho trang quản trị bao gồm Thanh điều hướng bên (Sidebar Navigation) cố định và Thanh công cụ phía trên (Header) chứa tìm kiếm, thông báo, tài khoản Admin.
  - **Quản trị cấu trúc & Tài khoản (Admin):** Thiết lập và quản lý hệ thống phân loại danh mục sản phẩm (Taxonomy), hỗ trợ tra cứu, khóa/mở khóa tài khoản, phân quyền và nâng cấp người dùng lên vai trò Maker (Thợ thủ công).
  - **Xử lý kiểm duyệt & Khiếu nại (Moderator):** Tiếp nhận bài đăng sản phẩm mới từ thợ thủ công, thực hiện quy trình duyệt/từ chối, đồng thời giải quyết các báo cáo vi phạm, tranh chấp và khiếu nại từ khách hàng.
  - **Tích hợp giải pháp AI:** Ứng dụng mô hình AI quét nội dung tự động để phát hiện bài đăng vi phạm bản quyền/hình ảnh độc hại và tự động dán nhãn gợi ý danh mục ngành hàng.

---

## 🖥️ CẤU TRÚC & PHÂN TÍCH CHI TIẾT 6 MÀN HÌNH HTML

### 1. `pages/admin/platform-dashboard.html` (Bảng điều khiển tổng quan)
- **Mục đích:** Trung tâm theo dõi sức khỏe và chỉ số vận hành toàn sàn CraftLink.
- **Thành phần giao diện:** 
  - Bảng chỉ số nhanh (Cards): Tổng doanh thu, Tổng đơn hàng tùy biến, Số lượng Maker active, Bài đăng chờ duyệt.
  - Biểu đồ dòng tiền và biểu đồ tăng trưởng người dùng.
  - Bảng danh sách nhật ký hệ thống (System Logs) gần đây.
- **Thao tác CRUD:** `Read` (Truy xuất và hiển thị dữ liệu thống kê).

### 2. `pages/admin/category-management.html` (Quản lý danh mục ngành hàng)
- **Mục đích:** Xây dựng cấu trúc danh mục cho sàn (Đồ gốm, Thêu thùa, Đồ gỗ, Tranh nghệ thuật, Đồ da thủ công...).
- **Thành phần giao diện:** Form thêm danh mục mới, Bảng phân cấp danh mục chính/phụ, bộ lọc trạng thái (Hiển thị/Ẩn).
- **Thao tác CRUD:** `Create` (Thêm danh mục), `Read` (Xem danh sách), `Update` (Sửa tên/mô tả/icon), `Delete` (Ẩn hoặc xóa danh mục).

### 3. `pages/admin/user-management.html` (Quản lý tài khoản & Phân quyền)
- **Mục đích:** Quản lý toàn bộ danh sách Khách hàng (Buyer), Thợ thủ công (Maker) và Kiểm duyệt viên (Moderator).
- **Thành phần giao diện:** Ô tìm kiếm tài khoản theo Email/SĐT, Bộ lọc theo vai trò, Modal xem chi tiết thông tin user, Nút thao tác Khóa/Mở khóa.
- **Thao tác CRUD:** `Read` (Tra cứu danh sách user), `Update` (Cập nhật quyền hạn/Trạng thái hoạt động), `Delete` (Vô hiệu hóa tài khoản vi phạm).

### 4. `pages/moderator/moderation-queue.html` (Hàng đợi kiểm duyệt bài đăng)
- **Mục đích:** Giao diện cho Moderator đánh giá bài đăng sản phẩm mới trước khi hiển thị công khai trên sàn.
- **Thành phần giao diện:** Danh sách dạng thẻ (Card grid) bài đăng chờ duyệt, Bộ so sánh ảnh gốc vs ảnh sản phẩm, Khung điểm số đánh giá độ an toàn từ AI, Modal nhập lý do từ chối.
- **Thao tác CRUD:** `Read` (Xem nội dung bài đăng chờ duyệt), `Update` (Bấm Duyệt / Từ chối bài đăng).

### 5. `pages/moderator/report-center.html` (Trung tâm xử lý báo cáo & Khiếu nại)
- **Mục đích:** Giải quyết các khiếu nại về sản phẩm giả, vi phạm bản quyền tác giả hoặc tranh chấp đơn hàng tùy biến.
- **Thành phần giao diện:** Danh sách báo cáo theo mức độ ưu tiên (Cao/Trung bình/Thấp), Khung xem bằng chứng từ khách hàng, Khung phản hồi của Maker, Nút đưa ra phán quyết (Duyệt hoàn tiền / Bác bỏ / Cảnh cáo Maker).
- **Thao tác CRUD:** `Read` (Xem chi tiết đơn khiếu nại), `Update` (Cập nhật tiến trình xử lý), `Delete` (Xóa bài đăng/Bình luận vi phạm).

### 6. `pages/moderator/content-guidelines.html` (Trình quản lý quy định cộng đồng)
- **Mục đích:** Thiết lập bộ quy tắc nội dung và tiêu chuẩn mỹ thuật cho các sản phẩm thủ công bán trên CraftLink.
- **Thành phần giao diện:** Trình soạn thảo văn bản quy định, Danh sách các điều khoản pháp lý & tiêu chuẩn cộng đồng, Lịch sử cập nhật quy định.
- **Thao tác CRUD:** `Read` (Hiển thị quy định), `Update` (Cập nhật và xuất bản điều khoản mới).

---

## 🤖 TÍNH NĂNG AI TÍCH HỢP (AI AUTO-MODERATION & CATEGORY TAGGING)

- **Nguyên lý hoạt động:**
  1. **AI Auto-Tagging (Gắn nhãn tự động):** Khi Maker tải ảnh sản phẩm lên, AI tự động phân tích hình ảnh và văn bản mô tả để đề xuất chính xác Danh mục ngành hàng (Ví dụ: Nhận diện ảnh bình hoa gốm $\rightarrow$ Đề xuất nhãn *"Gốm sứ nghệ thuật"*).
  2. **AI Auto-Moderation (Quét vi phạm tự động):** AI quét hình ảnh và nội dung mô tả để tính toán **Chỉ số Rủi ro (Risk Score)**.
     - **Risk Score < 15%:** Tự động xếp vào luồng "An toàn - Gợi ý Duyệt nhanh".
     - **Risk Score > 70%:** Cảnh báo "Nghi vấn vi phạm bản quyền / Hình ảnh không đạt chuẩn" và đẩy lên đầu Hàng đợi kiểm duyệt.

- **Kịch bản trải nghiệm trên giao diện (User Scenario):**
  - Moderator mở màn hình `moderation-queue.html`. Dưới mỗi sản phẩm chờ duyệt sẽ xuất hiện một Badge thông minh do AI sinh ra:
    - 🟢 *AI Analysis: 98% Hợp lệ - Gợi ý: Phê duyệt*
    - 🔴 *AI Warning: Phát hiện 82% trùng lặp hình ảnh bản quyền - Gợi ý: Kiểm tra thủ công*
  - Moderator chỉ cần 1 cú nhấp chuột vào nút **"Duyệt nhanh theo gợi ý AI"** để hoàn thành kiểm duyệt trong vài giây.

---

## 📑 NHẬT KÝ TIẾN ĐỘ THỰC HIỆN (CHECKLIST WORKFLOW)

- [x] Hoàn thành thiết kế Prototype 6 màn hình trên Canva
- [x] Tích hợp liên kết Canva `https://canva.link/zqtyq0qivogb17s` vào hồ sơ dự án
- [ ] Khởi tạo cấu trúc thư mục `pages/admin/` và `pages/moderator/`
- [ ] Dựng khung HTML/CSS Bảng điều khiển dùng chung (`sidebar.css`, `admin.css`)
- [ ] Cắt file HTML cho 3 màn hình Quản trị viên (Admin)
- [ ] Cắt file HTML cho 3 màn hình Kiểm duyệt viên (Moderator)
- [ ] Viết mã mô phỏng tính năng AI kiểm duyệt trong `js/ai/`
- [ ] Kiểm tra hiển thị Responsive trên các kích thước màn hình
