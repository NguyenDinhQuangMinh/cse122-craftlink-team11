# KhongGianNguoiBan — Phân hệ Thợ thủ công / Nghệ nhân (SV2)

> Phạm vi: bốn màn hình HTML của vai trò người bán (listing, hòm thư brief, trình soạn proposal, hồ sơ gian hàng), cộng thêm phân hệ đăng nhập / đăng ký ở `../DangNhapVaDangKy/`.
> Bảng kiểm kê 18 màn của cả nhóm: [`../docs/screen-inventory.md`](../docs/screen-inventory.md)
> Phân công chính thức: [`../docs/sv2-assignment.md`](../docs/sv2-assignment.md)
> Báo cáo sử dụng AI của phân hệ: [`docs/ai-usage-report.md`](docs/ai-usage-report.md)

## 1. Cách chạy

Không có bước build, không có backend, không gọi API nào. Mở bằng static server tại thư mục gốc repo:

```bash
python -m http.server 8123
# http://localhost:8123/KhongGianNguoiBan/01-listing-management/index.html
```

Mở bằng `file://` vẫn chạy được vì dữ liệu nằm trong HTML/JS chứ không `fetch` tệp JSON, nhưng nên dùng static server cho giống lúc demo. Muốn vào từ luồng đăng nhập thì mở `../DangNhapVaDangKy/01-dang-nhap/nghe-nhan.html`, đăng nhập bằng tài khoản mẫu `nghenhan@craftlink.vn` / `Nghenhan@123`.

## 2. Cấu trúc thư mục

```text
KhongGianNguoiBan/
├── 01-listing-management/     # index.html + js/main.js (danh sách sản phẩm + form modal tạo/sửa + bộ soạn mô tả)
├── 02-brief-inbox/            # index.html + js/main.js (hòm thư yêu cầu đặt làm)
├── 03-proposal-editor/        # index.html + js/main.js (wizard 4 bước báo giá + bước xem trước + advisor)
├── 04-shop-profile/           # index.html + js/main.js (thiết lập gian hàng, form + khung xem trước)
├── css/
│   └── style.css              # Toàn bộ giao diện của bốn màn: biến màu, layout, component, responsive
└── js/
    ├── chung.js               # Header/footer, điều hướng, khay trao đổi proposal (sessionStorage), hồ sơ gian hàng
    └── ai/
        └── copywriter.js      # Bộ quy tắc ghép mô tả + từ khoá SEO, không gọi mô hình nào
```

Không có tệp layout dùng chung: header và footer được viết trong từng `index.html`, còn CSS/JS dùng chung nằm ở `css/style.css` và `js/chung.js`.

Phân hệ đăng nhập / đăng ký do SV2 bàn giao nằm riêng ở `../DangNhapVaDangKy/`: `01-dang-nhap` có ba trang `khach-hang.html`, `nghe-nhan.html`, `quan-tri.html` — mỗi trang một tệp CSS và một tệp JS riêng, không dùng chung — cùng `index.html` điều hướng theo `?role=`; `02-dang-ky` dùng chung `assets/css/style.css` và `assets/js/common.js`.

## 3. Bốn màn hình

| STT | Thư mục | Màn hình | Thao tác chính | AI |
| :---: | :--- | :--- | :--- | :--- |
| 7 | `01-listing-management` | Quản lý listing | Tìm theo tên, lọc trạng thái (Đang hoạt động / Chờ duyệt / Bản nháp), chuyển bảng–lưới, thêm/sửa bằng form modal, lưu trữ sản phẩm | – |
| 8 | `01-listing-management` | Tạo & cập nhật listing | Cùng màn hình STT 7: nhập thông tin, ảnh, danh mục, tồn kho, giá; mô tả có thể tự soạn hoặc nhờ bộ gợi ý | `copywriter` |
| 9 | `02-brief-inbox` | Hòm thư Brief | Chọn brief, tìm kiếm, lọc Brief mới / Đang xem xét / Đã phản hồi, đánh dấu đã đọc, xem tiêu chí và tài liệu tham khảo | – |
| 10 | `03-proposal-editor` | Soạn Proposal | Wizard 4 bước: hạng mục chi phí, thời gian, điều khoản, lưu bản nháp / xác nhận mẫu / gửi | `cost-timeline-advisor` |
| 11 | `03-proposal-editor` | Xem trước Proposal | Bước 4 của wizard STT 10: soát tổng chi phí, thời gian, rồi mới gửi | – |
| 12 | `04-shop-profile` | Thiết lập gian hàng | Sửa tên xưởng, giới thiệu, liên hệ, ảnh đại diện và ảnh bìa; khung xem trước cập nhật ngay; có cảnh báo thay đổi chưa lưu | – |

Bốn màn dùng chung một thanh điều hướng, nên từ màn nào cũng sang được ba màn còn lại. Tên xưởng lưu ở màn 12 tự cập nhật lên nhãn tài khoản ở thanh tiêu đề của cả bốn màn và được bộ soạn mô tả (STT 8) lấy làm tên xưởng trong câu văn.

## 4. Dữ liệu và lưu trữ

| Dữ liệu | Nằm ở đâu | Giữ sau F5 |
| :--- | :--- | :---: |
| Danh sách sản phẩm (STT 7–8) | Viết sẵn trong các hàng của `index.html`, chỉnh sửa ghi vào `dataset` của hàng đó | Không |
| Ba brief mẫu (STT 9) | Đối tượng `briefs` trong `02-brief-inbox/js/main.js` | Không |
| Trạng thái proposal đã lưu / đã gửi | `sessionStorage` mốc `craftlink:proposal` (màn 9 và màn 10 trao đổi với nhau qua đây) | Trong phiên |
| Hồ sơ gian hàng (STT 12) | `localStorage` mốc `craftlink:gian-hang` | Có |
| Tài khoản, phiên đăng nhập, số lần nhập sai | `localStorage` mốc `cl_users`, `cl_session`, `cl_login_attempts`, `cl_last_identifier_<vai>` | Có |

- Sản phẩm và brief là dữ liệu mẫu phục vụ demo, không phải kho dùng chung với phân hệ người mua (SV1) hay quản trị (SV3).
- Mật khẩu ở phân hệ đăng nhập được băm SHA-256 với tiền tố `craftlink:` trước khi ghi `localStorage`; không lưu mật khẩu thô. Nhập sai 5 lần thì khoá 60 giây.
- Đăng nhập sai vai trò sẽ hiện thông báo kèm nút dẫn sang trang đăng nhập đúng vai.

## 5. Giao diện

Một tệp `css/style.css` cho cả bốn màn. Biến màu và font khai báo trong `:root` (nền kem `#f7f3ed`, chữ `#39291f`, nhấn đất nung `#bf623c`, xanh `#54845b`, font `DM Sans`). Bàn phím điều hướng được: mọi phần tử tương tác có viền `:focus-visible` 3px màu `#cf8659`. Responsive có ba mốc `@media`: 1200px, 760px và 520px.

Ba trạng thái Normal / Loading / Empty được cài ở màn listing (đang tải, không có kết quả khớp từ khoá hoặc lọc) và ở màn hòm thư brief.
