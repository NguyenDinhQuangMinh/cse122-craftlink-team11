# Kiểm kê màn hình – Phân hệ Thợ thủ công / Nghệ nhân (SV2)

Phạm vi tài liệu: sáu dòng kiểm kê do SV2 phụ trách trong CraftLink (STT 7–12), cộng với phân hệ đăng nhập / đăng ký. Đây là kiểm kê của phân hệ; bảng hợp nhất 18 màn của cả nhóm nằm ở [`../../docs/screen-inventory.md`](../../docs/screen-inventory.md).

## Phân bổ mã nguồn

| Phần | Vị trí | Trách nhiệm |
| :--- | :--- | :--- |
| Bốn màn hình người bán | `KhongGianNguoiBan/01…04-*/index.html` | Mỗi màn một thư mục, mở độc lập được |
| CSS dùng chung | `KhongGianNguoiBan/css/style.css` | Biến màu, bố cục, component, responsive (một tệp cho cả bốn màn) |
| JS dùng chung | `KhongGianNguoiBan/js/chung.js` | Thanh tiêu đề, điều hướng, khay proposal (`sessionStorage`), hồ sơ gian hàng (`localStorage`) |
| JS từng màn | `KhongGianNguoiBan/0x-*/js/main.js` | Nghiệp vụ riêng của màn đó |
| Bộ quy tắc AI | `KhongGianNguoiBan/js/ai/copywriter.js` | Soạn mô tả và từ khoá SEO, không gọi mô hình |
| Phân hệ đăng nhập | `DangNhapVaDangKy/01-dang-nhap/` | Ba trang theo vai, mỗi trang CSS/JS riêng; `index.html` điều hướng theo `?role=` |
| Phân hệ đăng ký | `DangNhapVaDangKy/02-dang-ky/` | Dùng chung `assets/css/style.css` và `assets/js/common.js` |

Không có trang gộp kiểu `GopTrang.html`: bốn màn người bán liên kết với nhau qua thanh điều hướng viết trong từng `index.html`.

## Kiểm kê sáu dòng

| # | Vai trò / màn hình | Mục tiêu và tác vụ chính | Dữ liệu và liên kết | Trạng thái giao diện | AI |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 7 | Nghệ nhân – Quản lý listing | Tìm theo tên, lọc Đang hoạt động / Chờ duyệt / Bản nháp, chuyển bảng–lưới, mở form tạo/sửa, lưu trữ sản phẩm, xem số liệu theo trạng thái | Sản phẩm viết sẵn trong các hàng của `index.html`; chỉnh sửa ghi vào `dataset` của hàng | Bình thường, Đang tải, Rỗng (không khớp từ khoá/lọc), sản phẩm đã lưu trữ bị ẩn khỏi danh sách và khỏi số liệu | Không gọi AI |
| 8 | Nghệ nhân – Tạo & cập nhật listing | Form modal trên màn 7: tên, mô tả, ảnh, danh mục, tồn kho, giá; mô tả có thể tự viết hoặc nhờ bộ gợi ý | Kết quả gợi ý lưu vào `dataset` của dòng sản phẩm cùng mô tả và từ khoá | Modal đóng bằng Esc/nút huỷ; chip trạng thái "Chưa áp dụng" → đã điền; thông báo lỗi khi không có từ khoá dùng được | Copywriter & SEO: nhập từ khoá → "Đang soạn mô tả…" → mô tả + từ khoá + giải thích → Dùng / Tạo lại / Bỏ → lưu |
| 9 | Nghệ nhân – Hòm thư brief | Chọn brief, tìm kiếm, lọc Brief mới / Đang xem xét / Đã phản hồi, đánh dấu đã đọc, xem tiêu chí và tóm tắt, lần theo proposal đã gửi | Ba brief mẫu trong `02-brief-inbox/js/main.js`; trạng thái proposal đọc từ `sessionStorage` mốc `craftlink:proposal` để ghi đè nhãn brief | Danh sách rỗng "Không tìm thấy brief phù hợp."; chấm "Chưa đọc"; dòng vết proposal `role="status"` | Không — tóm tắt brief là chuỗi soạn sẵn trong dữ liệu mẫu |
| 10 | Nghệ nhân – Soạn proposal | Wizard 4 bước: thông tin cơ bản → phạm vi công việc → chi phí & thời gian → xem trước & gửi; lưu bản nháp, xác nhận mẫu, gửi | Hạng mục thêm/sửa trong phiên; kết quả ghi vào `sessionStorage` để màn 9 đọc; brief đang chọn quyết định khung ngân sách và deadline dùng để đối chiếu | Bước chưa đủ điều kiện bị `disabled`; lỗi từng trường hiện dưới ô nhập; toast xác nhận | Cost & Timeline Advisor: đối chiếu giá, tổng hạng mục, ngân sách, deadline, tiêu chí; chia mức Cần sửa / Nên thêm / Ổn; áp dụng từng đề xuất hoặc tất cả |
| 11 | Nghệ nhân – Xem trước proposal | Bước 4 của wizard màn 10: soát tổng chi phí, thời gian, lời nhắn rồi mới gửi | Đọc lại chính dữ liệu đã nhập ở ba bước trước | Xem trước, Gửi; gửi xong màn 9 đổi nhãn brief thành "Đã gửi proposal" | Không |
| 12 | Nghệ nhân – Thiết lập gian hàng | Sửa tên xưởng, giới thiệu, liên hệ, ảnh đại diện và ảnh bìa; khung xem trước bên phải cập nhật ngay | `localStorage` mốc `craftlink:gian-hang`; tên xưởng hiện lên nhãn tài khoản ở cả bốn màn và được bộ soạn mô tả dùng làm tên xưởng | Hồ sơ mặc định / Đã lưu trong trình duyệt / Có thay đổi chưa lưu; nhãn trạng thái cho biết đang dùng bản lưu hay chưa lưu | Không — màn này chỉ có form |

## Phân hệ đăng nhập / đăng ký (ngoài 18 dòng)

| Trang | Tệp | Ghi chú |
| :--- | :--- | :--- |
| Đăng nhập Khách hàng | `DangNhapVaDangKy/01-dang-nhap/khach-hang.html` | CSS/JS riêng: `css/khach-hang.css`, `js/khach-hang.js` |
| Đăng nhập Nghệ nhân | `DangNhapVaDangKy/01-dang-nhap/nghe-nhan.html` | CSS/JS riêng |
| Đăng nhập Quản trị / Kiểm duyệt | `DangNhapVaDangKy/01-dang-nhap/quan-tri.html` | CSS/JS riêng |
| Điều hướng theo vai | `DangNhapVaDangKy/01-dang-nhap/index.html` | Đọc `?role=` rồi chuyển sang trang đúng vai |
| Đăng ký | `DangNhapVaDangKy/02-dang-ky/` | Dùng chung `assets/css/style.css` và `assets/js/common.js` |

Cả ba trang đăng nhập có: kiểm tra biểu mẫu phía client, băm mật khẩu SHA-256 (tiền tố `craftlink:`) trước khi ghi `localStorage`, khoá 60 giây sau 5 lần nhập sai, cảnh báo kèm nút dẫn sang trang đúng vai khi đăng nhập nhầm vai, nút hiện/ẩn mật khẩu, hộp "Trợ lý AI" trả lời theo bảng `BOT_RULES` (khớp từ khoá, không gọi mô hình).

## Responsive và trạng thái

- `KhongGianNguoiBan/css/style.css` có ba mốc `@media`: 1200px, 760px, 520px. Ở 760px sidebar đổi thành thanh ngang trên cùng với nav cuộn ngang, bố cục hòm thư brief còn một cột, thanh tiến trình wizard còn hai cột; bảng hạng mục của proposal cuộn ngang trong `.scope-wrap`.
- Bảng listing ở màn 7 chưa có vùng cuộn ngang riêng, nên ở màn rất hẹp cần kiểm tra lại xem có tràn trang không — đây là điểm còn phải xử lý trước buổi bảo vệ.
- Mọi phần tử tương tác có viền `:focus-visible` 3px màu `#cf8659`; modal đóng bằng Esc.
- Đã mở thử bốn màn trên trình duyệt để kiểm tra tìm–lọc–thêm–sửa–lưu trữ, F5 xem hồ sơ gian hàng còn giữ, và kéo cửa sổ qua ba mốc responsive. Chưa đo `scrollWidth` bằng script và chưa kiểm trên thiết bị di động thật — cần làm trước buổi bảo vệ.
- Ba trạng thái Normal / Loading / Empty theo barem hiện rõ nhất ở màn 7 (có cả khung "Đang tải" và khối rỗng) và màn 9 (dòng rỗng khi lọc không khớp).
