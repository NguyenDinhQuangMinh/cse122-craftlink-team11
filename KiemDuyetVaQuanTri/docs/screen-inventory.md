# Kiểm kê màn hình – Phân hệ Quản trị viên và Kiểm duyệt viên

Phạm vi tài liệu: sáu màn hình do SV3 phụ trách trong CraftLink. Đây là kiểm kê của phân hệ, chưa phải bảng kiểm kê hợp nhất của cả nhóm.

## Phân bổ mã nguồn

| Phần | Vị trí | Trách nhiệm |
|---|---|---|
| Màn hình tích hợp | KiemDuyetVaQuanTri/GopTrang.html | Vỏ giao diện chung, đổi trang, trạng thái vai trò và avatar |
| Trang chủ repo | index.html | Bốn lối vào (Khách hàng, Người bán, Quản trị, Đăng nhập); lối Quản trị mở GopTrang.html |
| Mã dùng chung | KiemDuyetVaQuanTri/js/ | Đọc/lưu dữ liệu, điều hướng, gọi AI |
| CSS dùng chung | KiemDuyetVaQuanTri/css/shared/ | Theme, bố cục, thành phần, responsive, focus và trạng thái |
| CSS từng trang | KiemDuyetVaQuanTri/0x-.../css/ | Quy tắc riêng của trang; style.css nhập CSS dùng chung và page.css |
| JS từng trang | KiemDuyetVaQuanTri/0x-.../js/main.js | Hành vi và nghiệp vụ của trang |
| Dữ liệu mẫu | KiemDuyetVaQuanTri/assets/data/ | JSON khởi tạo; thao tác sau đó lưu trong localStorage |
| AI phía máy chủ | api/ai.js | Một điểm gọi AI với prompt theo từng loại tác vụ |

Giữ GopTrang.html làm điểm trình diễn/tích hợp cho sáu trang. Không gộp mã từng trang vào tệp này. Các trang con vẫn độc lập để có thể mở, thuyết trình và kiểm tra riêng.

## Kiểm kê sáu màn hình

| # | Vai trò / màn hình | Mục tiêu và tác vụ chính | Dữ liệu và liên kết | Trạng thái giao diện | AI |
|---|---|---|---|---|---|
| 1 | Quản trị viên – Bảng điều khiển | Xem doanh thu mẫu, số thợ hoạt động, cảnh báo và nhật ký; tìm trong nhật ký | Đọc users, products, reports; KPI hoạt động cập nhật từ các bộ sưu tập dùng chung | KPI đang tải/lỗi; nhật ký có nội dung hoặc trạng thái không tìm thấy | Không gọi AI |
| 2 | Quản trị viên – Quản lý danh mục | Tìm, lọc theo trạng thái hiển thị, sắp xếp theo tên hoặc số sản phẩm, thêm, sửa, xóa, bật/tắt; chặn tên trùng; chặn giá trị ngoài khoảng; tải ảnh nền khi tạo | categories.json: 15 mục mẫu; ảnh được nén và lưu cùng bản ghi qua CraftLinkAPI | Đang tải, lỗi có nút thử lại, rỗng có nút xóa lọc, lỗi trường ngay dưới ô nhập, toast thành công/lỗi | Không gọi AI |
| 3 | Quản trị viên – Quản lý tài khoản | Tìm, lọc buyer/maker/moderator; thêm, sửa, xóa, khóa/mở khóa; tải ảnh đại diện khi tạo | users.json: 20 mục mẫu; ảnh và trạng thái dùng chung với dashboard | Đang tải, lỗi có thử lại, rỗng có xóa lọc, xác nhận xóa và toast | Không gọi AI |
| 4 | Kiểm duyệt viên – Hàng đợi kiểm duyệt | Lọc trạng thái, tìm sản phẩm, sắp xếp theo thời gian gửi hoặc tên, xem chi tiết, duyệt, yêu cầu sửa, từ chối, khôi phục dữ liệu mẫu | products.json: 20 mục mẫu; gửi kèm thông tin sản phẩm và toàn bộ hướng dẫn hiện hành cho AI | Đang tải, lỗi có thử lại, danh sách rỗng, xác nhận và toast; quyết định được lưu | AI-2: phân tích rủi ro, trả độ tin cậy/yếu tố/đề xuất; kiểm duyệt viên xác nhận |
| 5 | Kiểm duyệt viên – Trung tâm báo cáo | Tìm; lọc trạng thái, lý do, thời gian; sắp xếp cột; phân trang; xem, xác minh, bỏ qua, xử lý | reports.json: 20 mục mẫu; KPI dashboard đọc trạng thái báo cáo | Đang tải/lỗi/rỗng; số dòng mỗi trang 5/10/20; quyết định có hoàn tác nếu lưu thất bại | Hỗ trợ phân loại và ưu tiên báo cáo; lưu kết quả cùng quyết định người dùng |
| 6 | Kiểm duyệt viên – Hướng dẫn nội dung | Tìm, lọc theo nhóm quy định, sắp xếp theo tên, thêm, sửa, xóa; kiểm tra trùng tên; xem và áp dụng bản nháp AI | guidelines.json: 15 mục mẫu; quy định cung cấp bối cảnh cho trang 4 và cho chính copilot | Đang tải/lỗi/rỗng; form có validation từng trường; xác nhận xóa; toast | AI-3: copilot soạn nháp; người dùng sửa, chấp nhận hoặc từ chối |

### Responsive và lưu trữ ảnh

- Sáu trang dùng menu dạng drawer ở màn hình hẹp; ô tìm kiếm trên thanh đầu trang co lại theo chiều rộng còn lại.
- Bảng có nhiều cột cuộn bên trong vùng bảng thay vì làm rộng toàn bộ trang.
- Khi thêm danh mục/tài khoản, ảnh là trường bắt buộc; khi sửa, có thể giữ ảnh cũ hoặc chọn ảnh mới. Ảnh JPG/PNG/WebP tối đa 5 MB được thu nhỏ/nén phía trình duyệt và lưu trong localStorage.
- Ngày 25-10-2026 đã đo lại trên Chromium ở 320, 375, 768 và 1280 px cho trang 2, 4, 6: scrollWidth của tài liệu đúng bằng chiều rộng cửa sổ, không có cuộn ngang ngoài ý muốn; hộp thoại AI cũng không tràn ở 320 px. Vẫn nên kiểm tra lại trên thiết bị thật trước khi nộp.
- Toàn bộ chữ màu phụ dùng chung biến --muted (#5a6472, tương phản 6.0:1 trên nền trắng) thay vì các mã xám lẻ trước đó; viền focus là màu đặc, không còn trong suốt.

### AI theo barem 6.1–6.3

- 6.1 – Gợi ý sản phẩm cho người mua: API có loại tác vụ product-discovery, nhưng màn hình người mua không nằm trong sáu trang này. Cần người phụ trách giao diện người mua tích hợp nút nhập nhu cầu, kết quả gợi ý, giải thích và lưu/áp dụng.
- 6.2 – Phân loại rủi ro: trang 4 phân tích nội dung sản phẩm theo các quy định từ trang 6. Trang 5 có thêm ưu tiên báo cáo nhưng không thay cho phần tích hợp 6.1.
- 6.3 – Copilot nghiệp vụ: trang 6 soạn quy định CraftLink; bản nháp chỉ được ghi vào dữ liệu khi người quản trị bấm **Chấp nhận và lưu**. Trang không có bước "xuất bản" riêng — lưu là có hiệu lực ngay.
- Cả ba loại tác vụ dùng cùng API server và cấu hình mô hình. Khóa nằm ở biến môi trường máy chủ, không trong trình duyệt.
- Khi máy chủ chưa có khóa hoặc trang chạy ở chế độ tĩnh, js/ai-fallback.js phân tích bằng bộ quy tắc trên đúng dữ liệu bản ghi đang mở; giao diện ghi rõ nguồn kết quả. Chi tiết ở docs/ai-usage-report.md.

### Tiêu chí phía repo cần hoàn thành ngoài mã nguồn

Các trường sau chưa thể được xác nhận chỉ bằng mã hiện có; nhóm cần cập nhật thông tin thật trước khi nộp:

- Mã task và nhánh: đã có — sáu dòng `TASK-13`…`TASK-18`, nhánh `feature/sv3-admin-screens` (đã gộp vào `dev` bằng merge commit `8eb9f51`, lên `main` qua PR #5 `da3131b`), ghi trong `docs/screen-inventory.md` của nhóm.
- Danh sách video OBS: **đã đủ ba link của SV3** trong `videos/README.md` (`LAlWYQg43LY`, `imsnvGvIofQ`, `3dCK3uHpIcY`) tương ứng dòng 14/16/18.
- Bảng kiểm kê hợp nhất: đã có `docs/screen-inventory.md` đủ 18 dòng với đường dẫn tệp thật.
- Link triển khai đang hoạt động: **có từ 27-10-2026** — <https://nguyendinhquangminh.github.io/cse122-craftlink-team11/> (GitHub Pages, nhánh `main`, `.nojekyll` ở gốc repo).
- Ảnh/clip kiểm tra trên desktop, tablet, mobile: **chưa lưu vào repo**; kết quả đo responsive 320/375/768/1280 px chỉ được ghi bằng số trong `docs/barem-audit.md` mục 6.3 và `README.md` mục 12.
- Người review cho từng pull request: **đã có ý kiến của người khác trước khi gộp** — PR #1 có review `DISMISSED` của `minhd2577-droi` (2 inline) và 1 issue comment của `hungxuan0411-cloud`; **không có review APPROVED nào**, chi tiết ở `docs/barem-audit.md` mục 3.2.
- Giao diện 6.1 phía người mua: thuộc SV1, chưa nối vào nút nhập nhu cầu (`grep` trong `KiemDuyetVaQuanTri/` không có liên kết nào trỏ sang `KhachHang/`).

Không điền giá trị giả cho những trường này.
