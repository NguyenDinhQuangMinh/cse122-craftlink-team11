# PHÂN CÔNG NHIỆM VỤ CHI TIẾT - SV2 (MAKER / ARTISAN)

> **Dự án:** CraftLink - Sàn thương mại điện tử sản phẩm thủ công nghệ thuật tùy biến  
> **Học phần:** Phát triển Ứng dụng Web Cơ bản (CSE122) - Nhóm 11  
> **Sinh viên phụ trách:** SV2 (Người sáng tạo / Thợ thủ công)

---

## 🎨 BẢN THIẾT KẾ GIAO DIỆN CANVA (UI/UX PROTOTYPE)

👉 **Link thiết kế Canva của SV2:** [Link Canva SV2](https://canva.link/rvxflfz5kgg0rg1)

---

## 📋 VAI TRÒ & TRÁCH NHIỆM CHÍNH

- **Vai trò nghiệp vụ:** Người sáng tạo / Thợ thủ công (Maker / Artisan / Seller).
- **Trách nhiệm hệ thống:**
  - Xây dựng toàn bộ phân hệ quản lý gian hàng dành cho Nghệ nhân / Thợ thủ công.
  - Quản lý danh sách bài đăng sản phẩm thủ công, trình tạo/chỉnh sửa sản phẩm.
  - Tiếp nhận yêu cầu đặt hàng tùy biến (Custom Brief) từ khách hàng và lập Proposal báo giá phản hồi lại.
  - Tích hợp công cụ hỗ trợ Maker kiểm tra giá và tiến độ trước khi gửi báo giá.
  - Bàn giao phân hệ đăng nhập / đăng ký ba vai trò dùng chung cho cả nhóm.

Phần kế hoạch chưa làm được đánh dấu rõ ở checklist cuối tệp: báo cáo doanh thu & rút tiền, thiết lập gian hàng, và AI viết mô tả SEO.

---

## 🖥️ MÀN HÌNH PHỤ TRÁCH — KẾ HOẠCH VÀ THỰC TẾ

Bảng dưới đối chiếu 6 dòng được giao trong `docs/screen-inventory.md` (STT 7–12) với mã nguồn đã bàn giao ở nhánh `feature/sv2-maker-screens`.

| STT | Màn hình theo kế hoạch | Mã nguồn thực tế | CRUD đạt được | Ghi chú |
| :---: | :--- | :--- | :---: | :--- |
| 7 | Quản lý danh sách bài đăng | `KhongGianNguoiBan/01-listing-management/index.html` | **C / R / U / D** | Tìm kiếm, lọc 4 trạng thái, chỉ số đếm theo trạng thái, chuyển Bảng/Lưới, nút demo trạng thái Rỗng và Đang tải |
| 8 | Trình tạo/sửa sản phẩm | form modal trong cùng trang STT 7 | **C / U** | Có chọn ảnh từ tệp hoặc dán URL, kiểm tra dữ liệu trước khi lưu. Không tách trang riêng |
| 9 | Hòm thư Brief từ khách | `KhongGianNguoiBan/02-brief-inbox/index.html` | **R / U** | Đọc brief, tìm kiếm, lọc theo trạng thái, đánh dấu đã đọc, ghi chú nội bộ, mở sang proposal theo `?brief=` |
| 10 | Trình tạo Proposal | `KhongGianNguoiBan/03-proposal-editor/index.html` | **C / U** | Wizard 4 bước, bảng hạng mục thêm/xoá dòng, tự tính tổng, ba trạng thái nháp → xác nhận mẫu → đã gửi, lưu qua `sessionStorage` nên hòm thư cập nhật nhãn theo |
| 11 | Xem trước Proposal | bước 4 của trang STT 10 | **R** | Không tách trang riêng |
| 12 | Thiết lập gian hàng & hồ sơ nghệ nhân | **chưa làm** | – | Tên xưởng và chuyên môn hiện chỉ nhập được một lần ở bước đăng ký nghệ nhân |

Dòng 12 chưa có mã nguồn. Hai dòng 8 và 11 gộp vào màn hình bên cạnh nên tổng số **tệp HTML** của phân hệ Maker là ba, khớp cột "Số màn hình = 3" trong `README.md`.

### Phân hệ bổ sung: đăng nhập / đăng ký

Nằm ở dòng "Giao diện đăng nhập, đăng ký (SV1+SV2+SV3)" của `docs/team-assignment.md`, SV2 viết và bàn giao:

| Màn hình | Tệp | Nội dung |
| :--- | :--- | :--- |
| Cổng đăng nhập ba vai trò | `DangNhapVaDangKy/01-dang-nhap/index.html` | Tab Khách hàng / Nghệ nhân / Quản trị, kiểm tra biểu mẫu, khoá tài khoản sau 5 lần sai, ghi nhớ đăng nhập, trợ lý AI dạng từ khoá |
| Đăng ký | `DangNhapVaDangKy/02-dang-ky/index.html` | Kiểm tra từng luật bằng tiếng Việt, đếm độ mạnh mật khẩu, trường riêng cho nghệ nhân, chặn đăng ký tài khoản quản trị |

Mật khẩu được băm SHA-256 trước khi ghi `localStorage`, không lưu mật khẩu gốc. Đăng ký xong đăng nhập được ngay bằng chính tài khoản đó, kể cả tài khoản quản trị do nhóm cấp.

---

## 🤖 TÍNH NĂNG AI TÍCH HỢP

### Đã làm — AI Cost & Timeline Advisor (STT 10)

- **Mô tả:** Khi Maker nhập giá, ngày giao và bảng hạng mục, advisor đối chiếu với chính dữ liệu brief (khung ngân sách, deadline, danh sách tiêu chí) rồi liệt kê điểm cần sửa, điểm nên thêm và điểm ổn, mỗi dòng kèm nút **Áp dụng** để sửa trực tiếp vào form.
- **Kịch bản trải nghiệm:** vào proposal của brief "Bộ quà tặng gốm", nhập giá thấp hơn tổng hạng mục → advisor báo "Bán dưới chi phí" và nêu con số cụ thể; chọn ngày giao sau deadline brief → báo chậm bao nhiêu ngày kèm nút "Đẩy giao về 30/10"; bỏ sót tiêu chí "Có hộp quà giấy và thiệp cảm ơn" → báo tiêu chí đó chưa xuất hiện ở hạng mục nào.
- **Cách cài đặt:** bộ quy tắc thuần JavaScript trong `KhongGianNguoiBan/03-proposal-editor/js/main.js` (`phanTich()`), chạy hoàn toàn ở trình duyệt, **không gọi mô hình ngôn ngữ nào**. Giao diện nói rõ đây là "suy luận từ những gì bạn nhập, chưa phải báo giá cuối".

### Chưa làm — AI Artisan Storyteller & Copywriter

Kế hoạch cũ ghi công cụ sinh mô tả sản phẩm và tối ưu SEO. **Mã nguồn không có tính năng này**, nên `docs/screen-inventory.md` đã hạ cột AI của STT 8 về "–". Đây là phần hụt so với kế hoạch, khai để không bị tính là khai không trung thực (VP-07).

### Trợ lý AI ở cổng đăng nhập

`DangNhapVaDangKy/assets/js/common.js` có bảng `BOT_RULES` khớp từ khoá tiếng Việt để trả lời câu hỏi về đăng ký, quên mật khẩu, vai trò tài khoản. Cũng là đối chiếu từ khoá, không phải mô hình ngôn ngữ.

---

## 📑 NHẬT KÝ TIẾN ĐỘ THỰC HIỆN (CHECKLIST)

- [x] Thiết kế Prototype màn hình trên Canva
- [x] Dán liên kết Canva vào tài liệu `docs/sv2-assignment.md` và `docs/team-assignment.md`
- [x] Tạo khung HTML/CSS cho phân hệ Maker (`KhongGianNguoiBan/css/style.css`)
- [x] Hoàn thiện HTML/CSS/JS cho ba màn hình listing, hòm thư brief và proposal
- [x] Phân hệ đăng nhập / đăng ký ba vai trò dùng chung cho cả nhóm
- [x] Viết mã tính năng AI thật đã cam kết (advisor giá & tiến độ, STT 10)
- [ ] Viết mã mô phỏng AI Copywriter / SEO — **không làm**, đã xoá khỏi cột AI của bảng kiểm kê
- [x] Kiểm tra hiển thị Responsive trên các thiết bị (`@media` 1100px và 760px trong cả hai stylesheet)
- [ ] Màn hình STT 12 (thiết lập gian hàng) — **chưa làm**
- [ ] Quay ba video OBS: `SV2-01-maker-listings.mp4`, `SV2-03-maker-brief-inbox.mp4`, `SV2-04-maker-proposal-editor.mp4`
