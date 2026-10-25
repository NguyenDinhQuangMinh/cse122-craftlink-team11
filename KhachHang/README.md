# KhachHang — Phân hệ Người mua (SV1)

> Phạm vi: 9 trang HTML phía người mua của CraftLink.
> Luồng sử dụng chi tiết: [`DOC.md`](DOC.md)
> Phân công chính thức của nhóm: [`../docs/sv1-assignment.md`](../docs/sv1-assignment.md)

## 1. Cách chạy

- Không có bước build, không có backend, không gọi API bên ngoài.
- Mở trực tiếp `index.html` bằng trình duyệt, hoặc chạy static server tại thư mục này:

```bash
python -m http.server 8000
# Sau đó mở http://localhost:8000/index.html
```

- Các trang nhận tham số qua URL:
  - `product-detail.html?id=<product-id>` — mã sản phẩm hợp lệ nằm trong `js/data.js`.
  - `customize.html?id=<product-id>` — mở brief tùy biến cho sản phẩm.
  - `checkout.html` — checkout đơn tùy biến.
  - `checkout.html?mode=cart` — checkout từ giỏ hàng.

## 2. Cấu trúc thư mục

```text
KhachHang/
├── index.html                 # Danh sách sản phẩm + trợ lý CraftLink AI
├── product-detail.html        # Chi tiết sản phẩm
├── customize.html             # Tạo brief tùy biến
├── artisan-suggestions.html   # Gợi ý nghệ nhân
├── cart.html                  # Giỏ hàng
├── favorites.html             # Sản phẩm yêu thích
├── checkout.html              # Xác nhận đơn 4 bước (2 chế độ)
├── orders.html                # Danh sách đơn hàng
├── order-details.html         # Chi tiết đơn + yêu cầu chỉnh sửa
├── css/
│   ├── style.css              # CSS dùng chung
│   └── ...                    # CSS riêng từng trang
├── js/
│   ├── data.js                # 8 sản phẩm, 7 nghệ nhân mẫu
│   ├── main.js                # Logic trang chính, chi tiết, giỏ, yêu thích, brief, đơn hàng
│   ├── ai-advisor.js          # Trợ lý tìm kiếm cục bộ
│   └── checkout.js            # Logic checkout 4 bước
└── assets/
    └── images/                # 18 ảnh minh họa
```

## 3. Danh sách màn hình

| # | Trang | Mục đích | JavaScript |
|---|---|---|---|
| 1 | `index.html` | Tìm kiếm, lọc, sắp xếp 8 sản phẩm; hỏi trợ lý CraftLink AI | `data.js`, `main.js`, `ai-advisor.js` |
| 2 | `product-detail.html` | Xem gallery, chọn số lượng, thêm giỏ, bật yêu thích | `data.js`, `main.js` |
| 3 | `customize.html` | Nhập brief, tạo bản tóm tắt bằng luật cục bộ | `data.js`, `main.js` |
| 4 | `artisan-suggestions.html` | Chấm điểm và gợi ý 7 nghệ nhân mẫu kèm lý do | `data.js`, `main.js` |
| 5 | `cart.html` | Đổi số lượng, xóa món, xem tạm tính | `data.js`, `main.js` |
| 6 | `favorites.html` | Xem và bỏ yêu thích | `data.js`, `main.js` |
| 7 | `checkout.html` | Xác nhận đơn 4 bước, 2 chế độ: đơn tùy biến và đơn từ giỏ hàng | `data.js`, `main.js`, `checkout.js` |
| 8 | `orders.html` | Lọc, tìm kiếm, hủy đơn mẫu (chỉ đổi giao diện) | `data.js`, `main.js` |
| 9 | `order-details.html` | Xem chi tiết đơn mẫu, lưu nháp yêu cầu chỉnh sửa | `data.js`, `main.js` |

Header và footer được viết trực tiếp trong từng trang HTML; không có tệp layout dùng chung.

## 4. Dữ liệu và lưu trữ

- **Dữ liệu mẫu:** 8 sản phẩm và 7 nghệ nhân trong `js/data.js`. Không phải dữ liệu thật.
- **localStorage:**
  - `craftlink_cart` — giỏ hàng.
  - `craftlink_favorites` — sản phẩm yêu thích.
  - `craftlink_revision_draft` — nháp yêu cầu chỉnh sửa đơn.
- **sessionStorage:**
  - `craftlink_checkout_draft` — nháp đơn tùy biến.
  - `craftlink_cart_checkout_draft` — nháp đơn từ giỏ hàng.
- Checkout lưu tạm họ tên, số điện thoại và địa chỉ trong sessionStorage để đi qua 4 bước; dữ liệu bị xóa khi đóng tab và **không được gửi đến bất kỳ máy chủ nào**.
- Trợ lý AI không lưu lịch sử tìm kiếm hay hồ sơ sở thích.

## 5. Giới hạn của bản demo

- **Không có backend/API:** không có đăng nhập, không có cơ sở dữ liệu, không gửi brief hay đơn hàng đi đâu.
- **Không có thanh toán thật:** checkout chỉ chọn phương thức và hiển thị mã xác nhận demo.
- **Không tạo đơn hàng mới:** `orders.html` dùng 4 dòng dữ liệu mẫu tĩnh; xác nhận đơn không thêm vào danh sách này.
- **"AI" là mô phỏng cục bộ:** `js/ai-advisor.js` và phần tóm tắt brief trong `js/main.js` dùng luật từ khóa/tiêu chí, không gọi mô hình AI, không có API key.
- **Ảnh minh họa:** lấy từ Canva, không phải ảnh sản phẩm thật; giấy phép sử dụng chưa được xác minh.
- **Chưa được kiểm thử lại sau khi chuyển vào thư mục `KhachHang/`:** cần mở thử 9 trang và đi qua luồng mua trước khi merge.

## 6. Đối chiếu với tài liệu nhóm

Tài liệu nhóm đang ghi SV1 phụ trách **6 màn hình** (`../README.md`, `../docs/team-assignment.md`, `../docs/sv1-assignment.md`, `../docs/screen-inventory.md`), trong khi thư mục này có **9 trang**.

Ngoài chênh lệch số lượng, tên tệp cũng khác: `../docs/screen-inventory.md` ghi 6 màn hình SV1 là `index.html`, `product-detail.html`, `custom-order-brief.html`, `proposal-comparison.html`, `checkout-confirmation.html`, `customer-dashboard.html` với các nhánh `feature/home-explore`…`feature/customer-dashboard` (TASK-01…TASK-06). Thư mục này không có `custom-order-brief.html`, `proposal-comparison.html`, `checkout-confirmation.html` hay `customer-dashboard.html`; thay vào đó là 9 trang khác tên. Bảng dưới đây ghi rõ phần đã có và phần chưa có, không thay đổi tài liệu nhóm.

| Hạng mục theo `docs/sv1-assignment.md` | Trạng thái trong `KhachHang/` |
|---|---|
| Khung giao diện chung (Header, Footer) | Có header/footer trên cả 9 trang, nhưng viết trực tiếp trong từng tệp; chưa có `navbar.css`/`footer.css` dùng chung |
| Trang hệ thống `403.html`, `404.html` | Chưa có |
| Luồng đăng nhập, đăng ký, quên mật khẩu | Chưa có |
| Trang hồ sơ cá nhân (`profile.html`) | Chưa có |
| Trang chủ, chi tiết sản phẩm, tùy biến, giỏ hàng, thanh toán | Có (9 trang trong thư mục này) |
| Quản lý đơn hàng | Có trang mẫu `orders.html` + `order-details.html`, dữ liệu tĩnh |
| AI cá nhân hóa theo lịch sử tương tác | Chưa có; hiện là trợ lý tìm kiếm theo từ khóa, không lưu lịch sử |
| AI gợi ý nghệ nhân | Có chấm điểm theo tiêu chí cục bộ, không phải mô hình AI |

Phần chênh lệch này cần nhóm quyết định: giữ mô tả 6 màn hình trong tài liệu nhóm, hay cập nhật tài liệu nhóm thành 9 màn hình trong một PR riêng. PR này không sửa tài liệu nhóm.
