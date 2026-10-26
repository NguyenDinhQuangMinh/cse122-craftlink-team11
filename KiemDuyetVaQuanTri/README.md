# KiemDuyetVaQuanTri — Phân hệ Quản trị và Kiểm duyệt (SV3)

> Phạm vi: sáu màn hình HTML của vai trò quản trị viên và kiểm duyệt viên, cộng thêm trang gộp để demo.
> Kiểm kê chi tiết của phân hệ: [`docs/screen-inventory.md`](docs/screen-inventory.md)
> Bảng kiểm kê 18 màn của cả nhóm: [`../docs/screen-inventory.md`](../docs/screen-inventory.md)
> Phân công chính thức: [`../docs/sv3-assignment.md`](../docs/sv3-assignment.md)

## 1. Cách chạy

Không có bước build, không có backend bắt buộc. Mở bằng static server tại thư mục gốc repo:

```bash
python -m http.server 8123
# http://localhost:8123/KiemDuyetVaQuanTri/GopTrang.html
```

Không mở bằng `file://` vì `fetch` tệp JSON sẽ bị chặn. Trang gộp `GopTrang.html` có sidebar đổi vai trò và nhúng sáu màn hình; mỗi màn cũng mở trực tiếp được bằng `0X-.../index.html`.

## 2. Cấu trúc thư mục

```text
KiemDuyetVaQuanTri/
├── GopTrang.html              # Vỏ demo: sidebar + iframe sáu màn
├── 01-dashboard/              # Mỗi thư mục: index.html, css/style.css, css/page.css, js/main.js
├── 02-category-management/
├── 03-user-management/
├── 04-moderation-queue/
├── 05-report-center/
├── 06-content-guidelines/
├── css/
│   ├── gop-trang.css
│   └── shared/                # reset, theme admin/mod, layout, components, responsive,
│                              # shell-refinements, states, ai, mobile-nav
├── js/
│   ├── api.js                 # CraftLinkAPI: load/save/reset/emit/showState/encodeImage/debounce
│   ├── navigation.js          # Sidebar, drawer, đổi màn trong GopTrang
│   ├── ai-client.js           # Hộp thoại AI 6 bước
│   └── ai-fallback.js         # Bộ quy tắc cục bộ khi chưa có khóa máy chủ
├── assets/
│   ├── data/                  # Năm tệp JSON
│   └── *.png|*.jpg            # Ảnh minh họa
└── docs/                      # Kiểm kê, báo cáo AI, kịch bản quay
```

Không có tệp layout dùng chung: header và footer được viết trong từng `index.html`, còn CSS/JS dùng chung nằm ở `css/shared/` và `js/`.

## 3. Sáu màn hình

| STT | Thư mục | Màn hình | Vai trò | Thao tác chính | AI |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 13 | `01-dashboard` | Bảng điều khiển | Admin | Bốn thẻ KPI, biểu đồ ngành hàng, nhật ký hoạt động; ô tìm trên header lọc nhật ký | – |
| 14 | `04-moderation-queue` | Hàng đợi kiểm duyệt | Moderator | Lọc trạng thái, sắp xếp, mở chi tiết, duyệt / yêu cầu chỉnh sửa / từ chối; ghi chú bắt buộc từ 5 ký tự | `moderation-risk` |
| 15 | `05-report-center` | Trung tâm báo cáo | Moderator | Lọc trạng thái – lý do – thời gian, sắp xếp theo cột, phân trang 5/10/20, xử lý hoặc bỏ qua | `report-triage` |
| 16 | `02-category-management` | Quản lý danh mục | Admin | Tìm, lọc hiển thị/ẩn, sắp xếp, thêm – sửa – xóa, nén ảnh nền trước khi lưu | – |
| 17 | `03-user-management` | Quản lý tài khoản | Admin | Tìm theo tên/email, lọc theo vai trò, thêm – sửa, khóa / mở khóa | – |
| 18 | `06-content-guidelines` | Quy định nội dung | Admin / Mod | Tìm theo tên và nội dung, lọc nhóm, sắp xếp, thêm – sửa – xóa có xác nhận | `policy-copilot` |

Mọi ô tìm kiếm dùng `CraftLinkAPI.debounce` với mức chờ mặc định 260 ms; bộ lọc và sắp xếp phản ứng ngay khi đổi.

## 4. Dữ liệu và lưu trữ

| Thực thể | Tệp | Số bản ghi |
| :--- | :--- | :---: |
| Danh mục | `assets/data/categories.json` | 15 |
| Quy định | `assets/data/guidelines.json` | 15 |
| Sản phẩm | `assets/data/products.json` | 20 |
| Báo cáo | `assets/data/reports.json` | 20 |
| Người dùng | `assets/data/users.json` | 20 |

- Lần đầu mở, `CraftLinkAPI.load` đọc JSON bằng `fetch` rồi ghi vào localStorage dưới tiền tố `craftlink:data:v1:` (`categories`, `guidelines`, `products`, `reports`, `users`).
- Các lần sau đọc localStorage trước để mở nhanh và giữ thay đổi sau F5. Nếu chưa có khóa mới, hàm đọc thêm khóa cũ (`craftlink-slide02-categories-slide-v2`, `craftlink-slide03-users-v2`, `craftlink-slide04-products-v2`, `craftlink-slide05-reports-v2`, `craftlink-content-guidelines-v4`) để không mất dữ liệu của bản trước.
- `save` ghi lại và phát sự kiện `craftlink:datachange`; `reset` xóa khóa rồi nạp lại tệp gốc (nút “Khôi phục dữ liệu mẫu” ở hàng đợi kiểm duyệt).
- Sản phẩm và báo cáo ở đây là bản dữ liệu mẫu phục vụ màn kiểm duyệt, không phải kho dùng chung với phân hệ người bán/người mua.

## 5. AI và chế độ dự phòng

Ba tác vụ có giao diện: `moderation-risk` (màn 14), `report-triage` (màn 15), `policy-copilot` (màn 18). Tác vụ `product-discovery` có trong `api/ai.js` nhưng chưa nối vào màn nào.

Luồng chung nằm ở `js/ai-client.js`: nhập bối cảnh → đang xử lý (`aria-busy`) → kết quả kèm độ tin cậy → danh sách yếu tố và dòng “Nguồn:” → chấp nhận / chỉnh sửa / tạo lại / từ chối → lưu. AI không tự quyết định; chỉ khi bấm “Chấp nhận và lưu” mới ghi dữ liệu.

Khi máy chủ chưa cấu hình `AI_API_URL`, `AI_API_KEY`, `AI_MODEL`, `js/ai-fallback.js` chạy bộ quy tắc trên đúng bản ghi đang mở và giao diện ghi rõ nguồn cục bộ. Khóa chỉ nằm ở biến môi trường máy chủ, không có trong mã nguồn.

## 6. Giới hạn của bản demo

- **Không có backend mặc định:** dữ liệu nằm trong JSON + localStorage; không có đăng nhập thật, không phân quyền phía máy chủ.
- **Dashboard chỉ minh họa một phần:** doanh thu, đơn hàng, biểu đồ và nhật ký viết sẵn; hai thẻ *Nghệ nhân đang hoạt động* và *Cảnh báo hệ thống* tính thật từ kho dữ liệu chung (`refreshMetrics`, `01-dashboard/js/main.js:67`).
- **AI có thể chạy ở chế độ dự phòng:** nếu chưa deploy kèm biến môi trường, kết quả đến từ bộ quy tắc cục bộ và được ghi rõ.
- **Xóa danh mục/quy định chỉ đổi dữ liệu trình duyệt**, không ảnh hưởng tệp JSON trong repo.

## 7. Tài liệu và minh chứng

| Nội dung | Đường dẫn |
| :--- | :--- |
| Kiểm kê sáu màn của phân hệ | [`docs/screen-inventory.md`](docs/screen-inventory.md) |
| Báo cáo sử dụng AI của phân hệ | [`docs/ai-usage-report.md`](docs/ai-usage-report.md) |
| Báo cáo AI cấp nhóm | [`../docs/ai-usage-report.md`](../docs/ai-usage-report.md) |
| Component Guide | [`../docs/component-guide.md`](../docs/component-guide.md) |
| Link ba video OBS | [`../videos/README.md`](../videos/README.md) |

## 8. Kiểm thử nhanh

```js
// Về dữ liệu gốc trước khi demo
localStorage.clear();
location.reload();
```

Các luồng nên thử lại sau mỗi lần sửa: lọc và sắp xếp ở màn 14/15/16/18; submit form thiếu dữ liệu ở màn 16/17/18; khóa rồi mở khóa một tài khoản ở màn 17; F5 sau mỗi thao tác ghi để chắc dữ liệu còn; mở hộp thoại AI và kiểm tra dòng “Nguồn:”.
