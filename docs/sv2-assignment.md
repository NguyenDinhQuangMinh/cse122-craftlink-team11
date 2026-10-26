# PHÂN CÔNG NHIỆM VỤ CHI TIẾT - SV2 (MAKER / ARTISAN)

> **Dự án:** CraftLink - Sàn thương mại điện tử sản phẩm thủ công nghệ thuật tùy biến  
> **Học phần:** Phát triển Ứng dụng Web Cơ bản (CSE122) - Nhóm 11  
> **Sinh viên phụ trách:** SV2 (Người sáng tạo / Thợ thủ công)

---

## 🎨 BẢN THIẾT KẾ GIAO DIỆN CANVA (UI/UX PROTOTYPE)

👉 **Link thiết kế Canva của SV2:** [Link Canva SV2](https://canva.link/rvxflfz5kgg0rg1)

👉 **Link video OBS của SV2:** [Kênh YouTube](https://www.youtube.com/@minhduong3801) · [Playlist 3 video](https://www.youtube.com/playlist?list=PLDaEqceEwiuk)

- `SV2-01-dangnhap-khachhang.mp4` — Đăng nhập Khách hàng: <https://www.youtube.com/watch?v=BY0AAIjTSm8>
- `SV2-02-dangnhap-nghenhan.mp4` — Đăng nhập Nghệ nhân: <https://www.youtube.com/watch?v=2zrLFxVEpiU>
- `SV2-03-dangnhap-admin.mp4` — Đăng nhập Quản trị / Kiểm duyệt: <https://www.youtube.com/watch?v=d4kmFKU6ivg>

👉 **Tài liệu phân hệ người bán:** [README](../KhongGianNguoiBan/README.md) · [Kiểm kê màn hình](../KhongGianNguoiBan/docs/screen-inventory.md) · [Báo cáo sử dụng AI](../KhongGianNguoiBan/docs/ai-usage-report.md)

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
| 8 | Trình tạo/sửa sản phẩm | form modal trong cùng trang STT 7 | **C / U** | Có chọn ảnh từ tệp hoặc dán URL, ô mô tả + từ khoá SEO, khung "Nhờ AI sáng tạo mô tả" ghép văn bản từ từ khoá người dùng nhập. Không tách trang riêng |
| 9 | Hòm thư Brief từ khách | `KhongGianNguoiBan/02-brief-inbox/index.html` | **R / U** | Đọc brief, tìm kiếm, lọc theo trạng thái, đánh dấu đã đọc, ghi chú nội bộ, mở sang proposal theo `?brief=` |
| 10 | Trình tạo Proposal | `KhongGianNguoiBan/03-proposal-editor/index.html` | **C / U** | Wizard 4 bước, bảng hạng mục thêm/xoá dòng, tự tính tổng, ba trạng thái nháp → xác nhận mẫu → đã gửi, lưu qua `sessionStorage` nên hòm thư cập nhật nhãn theo |
| 11 | Xem trước Proposal | bước 4 của trang STT 10 | **R** | Không tách trang riêng |
| 12 | Thiết lập gian hàng & hồ sơ nghệ nhân | `KhongGianNguoiBan/04-shop-profile/index.html` | **R / U** | Tên xưởng, chuyên môn, câu chuyện thương hiệu, địa chỉ, SĐT, email, ảnh đại diện và ảnh bìa; khung xem trước chạy theo từng phím gõ, kiểm tra dữ liệu từng trường, lưu vào `localStorage` nên nhãn gian hàng ở thanh trên của cả bốn màn hình đổi theo |

Hai dòng 8 và 11 gộp vào màn hình bên cạnh nên tổng số **tệp HTML** của phân hệ Maker là bốn, khớp cột "Số màn hình = 4" trong `README.md`.

### Phân hệ bổ sung: đăng nhập / đăng ký

Nằm ở dòng "Giao diện đăng nhập, đăng ký (SV1+SV2+SV3)" của `docs/team-assignment.md`, SV2 viết và bàn giao:

| Màn hình | Tệp | Nội dung |
| :--- | :--- | :--- |
| Đăng nhập – Khách hàng | `DangNhapVaDangKy/01-dang-nhap/khach-hang.html` | Kiểm tra biểu mẫu, khoá tài khoản sau 5 lần sai, ghi nhớ đăng nhập, trợ lý AI dạng từ khoá |
| Đăng nhập – Nghệ nhân | `DangNhapVaDangKy/01-dang-nhap/nghe-nhan.html` | Như trên, khung minh hoạ gian hàng người bán (sản phẩm, brief, proposal) |
| Đăng nhập – Quản trị | `DangNhapVaDangKy/01-dang-nhap/quan-tri.html` | Bắt buộc đăng nhập bằng email, không có linked đăng ký, khung minh hoạ bảng điều khiển kiểm duyệt |
| Điều hướng | `DangNhapVaDangKy/01-dang-nhap/index.html` | Trang trung gian, đọc `?role=` rồi chuyển sang đúng trang đăng nhập của vai đó (link từ trang đăng ký đi qua đây) |
| Đăng ký | `DangNhapVaDangKy/02-dang-ky/index.html` | Kiểm tra từng luật bằng tiếng Việt, đếm độ mạnh mật khẩu, trường riêng cho nghệ nhân, chặn đăng ký tài khoản quản trị |

Ba trang đăng nhập tách hẳn nhau: mỗi trang có `css/<vai>.css` và `js/<vai>.js` riêng, không dùng chung tệp nào với nhau hay với `02-dang-ky` (chung thư mục `assets/img/` để chứa ảnh). Ba tab chuyển vai ngày trước giờ là ba link thẳng sang ba trang.

Mật khẩu được băm SHA-256 trước khi ghi `localStorage`, không lưu mật khẩu gốc. Đăng ký xong đăng nhập được ngay bằng chính tài khoản đó, kể cả tài khoản quản trị do nhóm cấp.

---

## 🤖 TÍNH NĂNG AI TÍCH HỢP

### Đã làm — AI Artisan Copywriter & SEO (STT 8)

- **Mô tả:** Trong form tạo/sửa listing, Maker nhập vài từ khoá ngắn (ví dụ "bình gốm, vuốt tay, men hỏa biến, xanh ngọc") rồi bấm **Nhờ AI sáng tạo mô tả**. Bộ gợi ý trả về một đoạn mô tả, danh sách từ khoá SEO và phần giải thích vì sao viết như vậy, kèm nút **Dùng mô tả này / Tạo lại / Bỏ kết quả**; sau khi điền vào ô mô tả thì người dùng vẫn sửa tay bình thường.
- **Kịch bản trải nghiệm:** từ khoá nhận diện được chất liệu và kỹ thuật → câu mở đầu dẫn đúng tên xưởng lấy từ hồ sơ gian hàng (STT 12); thiếu từ khoá màu hoặc kỹ thuật → dòng "Nên thêm" nói rõ đang thiếu gì; đổi wording một chút rồi bấm **Tạo lại** → ra văn phong khác vì có ba khuôn câu.
- **Cách cài đặt:** `KhongGianNguoiBan/js/ai/copywriter.js`, khoảng 100 dòng JavaScript thuần chạy ở trình duyệt. Từ khoá được phân loại theo từ điển có sẵn (chất liệu / kỹ thuật / màu / công dụng) rồi ghép vào một trong ba khuôn câu. **Không gọi mô hình ngôn ngữ nào**, và bản thân giao diện in dòng "Đây là bộ quy tắc có sẵn trong js/ai/copywriter.js, không gọi mô hình nào" để người dùng không hiểu nhầm.
- **Lưu kết quả:** mô tả và từ khoá lưu vào `dataset` của dòng listing trong phiên dùng thử, nút "Xem thống kê" đọc lại để chứng minh dữ liệu đã vào sản phẩm chứ không chỉ hiện khung.

### Đã làm — AI Cost & Timeline Advisor (STT 10)

- **Mô tả:** Khi Maker nhập giá, ngày giao và bảng hạng mục, advisor đối chiếu với chính dữ liệu brief (khung ngân sách, deadline, danh sách tiêu chí) rồi liệt kê điểm cần sửa, điểm nên thêm và điểm ổn, mỗi dòng kèm nút **Áp dụng** để sửa trực tiếp vào form.
- **Kịch bản trải nghiệm:** vào proposal của brief "Bộ quà tặng gốm", nhập giá thấp hơn tổng hạng mục → advisor báo "Bán dưới chi phí" và nêu con số cụ thể; chọn ngày giao sau deadline brief → báo chậm bao nhiêu ngày kèm nút "Đẩy giao về 30/10"; bỏ sót tiêu chí "Có hộp quà giấy và thiệp cảm ơn" → báo tiêu chí đó chưa xuất hiện ở hạng mục nào.
- **Cách cài đặt:** bộ quy tắc thuần JavaScript trong `KhongGianNguoiBan/03-proposal-editor/js/main.js` (`phanTich()`), chạy hoàn toàn ở trình duyệt, **không gọi mô hình ngôn ngữ nào**. Giao diện nói rõ đây là "suy luận từ những gì bạn nhập, chưa phải báo giá cuối".

### Trợ lý AI ở cổng đăng nhập

Bảng `BOT_RULES` khớp từ khoá tiếng Việt để trả lời câu hỏi về đăng ký, quên mật khẩu, vai trò tài khoản nằm trong `assets/js/common.js` (trang đăng ký) và được sao vào từng tệp `01-dang-nhap/js/<vai>.js` vì ba trang đăng nhập không dùng chung tệp nào. Cũng là đối chiếu từ khoá, không phải mô hình ngôn ngữ.

---

## 📑 NHẬT KÝ TIẾN ĐỘ THỰC HIỆN (CHECKLIST)

- [x] Thiết kế Prototype màn hình trên Canva
- [x] Dán liên kết Canva vào tài liệu `docs/sv2-assignment.md` và `docs/team-assignment.md`
- [x] Tạo khung HTML/CSS cho phân hệ Maker (`KhongGianNguoiBan/css/style.css`)
- [x] Hoàn thiện HTML/CSS/JS cho bốn màn hình listing, hòm thư brief, proposal và hồ sơ gian hàng
- [x] Phân hệ đăng nhập / đăng ký ba vai trò dùng chung cho cả nhóm
- [x] Viết mã tính năng AI thật đã cam kết (advisor giá & tiến độ, STT 10)
- [x] Viết mã mô phỏng AI Copywriter / SEO (`KhongGianNguoiBan/js/ai/copywriter.js`, bộ quy tắc ghép câu, không gọi mô hình)
- [x] Kiểm tra hiển thị Responsive trên các thiết bị (`@media` 1100px và 760px trong cả hai stylesheet)
- [x] Màn hình STT 12 — thiết lập gian hàng (`KhongGianNguoiBan/04-shop-profile/index.html`)
- [x] Quay ba video OBS: `SV2-01-dangnhap-khachhang.mp4`, `SV2-02-dangnhap-nghenhan.mp4`, `SV2-03-dangnhap-admin.mp4`
