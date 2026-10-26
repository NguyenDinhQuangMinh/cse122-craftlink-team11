# Assets — phân hệ Quản trị & Kiểm duyệt

Thư mục này chứa **dữ liệu mẫu** và **ảnh minh họa** của sáu màn trong `KiemDuyetVaQuanTri/`.

## Dữ liệu mẫu — `data/`

| Tệp | Số bản ghi | Dùng ở màn |
|---|---|---|
| `categories.json` | 15 | 02 — Quản lý danh mục; 01 — Bảng điều khiển |
| `guidelines.json` | 15 | 06 — Quy định nội dung; 04 — Hàng đợi kiểm duyệt (ngữ cảnh cho AI) |
| `products.json` | 20 | 04 — Hàng đợi kiểm duyệt; 01 — Bảng điều khiển |
| `reports.json` | 20 | 05 — Trung tâm báo cáo; 01 — Bảng điều khiển |
| `users.json` | 20 | 03 — Quản lý tài khoản; 01 — Bảng điều khiển |

Cách đọc: `CraftLinkAPI.load(collection, url)` trong `js/api.js` đọc `localStorage` trước, chưa có thì mới `fetch` tệp JSON ở đây rồi ghi lại vào khóa `craftlink:data:v1:<collection>`. Vì vậy **sửa trực tiếp tệp JSON chỉ có tác dụng khi trình duyệt chưa có bản trong `localStorage`** — muốn nạp lại bản gốc thì xóa khóa rồi tải lại trang.

Đây là dữ liệu mồi để chạy demo, không phải dữ liệu thật của người dùng nào.

## Ảnh — thư mục gốc `assets/`

- `category-1.png` … `category-5.png` — ảnh nền cho danh mục.
- `product-1.png` … `product-8.png` — ảnh sản phẩm trong hàng đợi kiểm duyệt và báo cáo.
- `user-1.jpg` … `user-5.jpg` — ảnh đại diện tài khoản.
- `admin-avatar.png`, `admin-sidebar-avatar.png`, `moderator-avatar.jpg` — ảnh đại diện của hai vai trò trên thanh bên và thanh trên.

Mọi thẻ `<img>` trong bảy tệp HTML của phân hệ đều có `alt` mô tả.

Ảnh người dùng chọn trong biểu mẫu được nén bằng `CraftLinkAPI.encodeImage` trước khi lưu `localStorage` — ảnh nền danh mục giới hạn cạnh dài **1000 px**, ảnh đại diện tài khoản **420 px** — nên không tệp ảnh mới nào được ghi vào thư mục này.
