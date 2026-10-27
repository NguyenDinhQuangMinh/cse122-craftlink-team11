# Project Proposal — CraftLink

Barem yêu cầu ở đâu: Tiêu chí 1 (Tư duy sản phẩm, Phân tích bài toán & Thiết kế UI/UX, 1.00đ) liệt kê minh chứng là `README.md`, **`docs/project-proposal.md`**, `docs/screen-inventory.md`, link Figma/Canva. Mục 1.1 chấm bốn thứ: chuyện thực tế của lĩnh vực, phát biểu vấn đề P1–P4, danh sách thực thể dữ liệu, và ma trận vòng đời trạng thái. Bốn mục đó nằm ngay dưới đây; bối cảnh dài hơn ở `project-introduction.md`.

## 1. Câu chuyện thực tế

Một xưởng gốm ba người ở Bát Tràng nhận đơn qua Zalo. Khách gửi ảnh chụp màn hình một chiếc cốc trên Pinterest, kèm câu "làm giống vầy, cao hơn chút". Xưởng trả lời bằng tin nhắn thoại. Bốn tuần sau khách nhận hàng và nói "không giống ảnh". Không ai sai, nhưng cũng không ai giữ được bản mô tả nào để đối chiếu: yêu cầu nằm rải trong 60 tin nhắn, giá chốt bằng lời, tiến độ hỏi miệng.

Ba hệ quả lặp lại ở mọi xưởng nhỏ:

- **Yêu cầu không có hình dạng cố định.** Brief nằm trong tin nhắn nên không lọc, không đếm, không chuyển giao được khi người phụ trách đổi ca.
- **Bài đăng không có cửa kiểm soát.** Sản phẩm lên sàn ngay khi bấm đăng; ảnh mượn của xưởng khác và mô tả sai chất liệu chỉ bị phát hiện sau khi khách đã trả tiền.
- **Tranh chấp không có hồ sơ.** Khiếu nại đến dưới dạng tin nhắn riêng, người xử lý không thấy lịch sử bài đăng, không thấy quy định nào đang có hiệu lực.

CraftLink dựng lại ba điểm đứt đó thành dữ liệu có trạng thái: brief là bản ghi, bài đăng phải qua hàng đợi duyệt, và mọi quyết định kiểm duyệt dựa trên bản quy định đã ban hành.

## 2. Phát biểu vấn đề P1–P4

| Mã | Nhóm người dùng | Vấn đề cụ thể | Hậu quả đo được | Hệ thống trả lời bằng |
|---|---|---|---|---|
| **P1** | Khách hàng đặt làm | Không có chỗ mô tả ý tưởng theo cấu trúc (chất liệu, kích thước, ngân sách, hạn) nên mỗi lần đặt lại phải kể lại từ đầu bằng tin nhắn | Tỉ lệ phải làm lại sản phẩm cao; khách không so sánh được báo giá vì mỗi xưởng hỏi một kiểu | Brief có trường bắt buộc + gợi ý ngân sách; chọn nghệ nhân theo tiêu chí đã nhập |
| **P2** | Thợ thủ công | Brief đến rải rác nhiều kênh, không có trạng thái "đã đọc / đã phản hồi", nên brief cũ bị bỏ quên | Mất đơn vì phản hồi chậm; không biết brief nào còn treo | Hòm thư brief có lọc theo trạng thái; proposal soạn một lần, xem trước đúng nội dung khách nhận |
| **P3** | Kiểm duyệt viên | Duyệt bài bằng mắt trên từng bài, không có căn cứ ghi lại; bài vi phạm giống nhau bị xử lý khác nhau giữa các ca | Quyết định không nhất quán, không giải thích được khi người bán khiếu nại | Hàng đợi có điểm rủi ro + lý do, ghi rõ nguồn kết luận; từ chối buộc ghi chú |
| **P4** | Quản trị viên | Quy định nội dung nằm trong tệp rời, không biết bản nào đang có hiệu lực; danh mục và tài khoản không có nơi khóa tập trung | Sửa quy định xong nhưng người kiểm duyệt vẫn áp bản cũ; tài khoản vi phạm vẫn đăng nhập được | Quy định có trạng thái và người xác nhận; khóa danh mục và khóa tài khoản có hiệu lực ngay trên dữ liệu dùng chung |

## 3. Mục tiêu O1–O7

| Mã | Mục tiêu | Cách đo trong bài |
|---|---|---|
| **O1** | Chuẩn hóa yêu cầu đặt làm thành dữ liệu có trường bắt buộc | Brief thiếu trường bắt buộc bị chặn tại chỗ, có thông báo lỗi cạnh trường |
| **O2** | Rút ngắn đường từ brief đến báo giá | Brief xuất hiện trong hòm thư người bán; proposal soạn và xem trước trong cùng một màn |
| **O3** | Mọi bài đăng đi qua kiểm duyệt trước khi hiển thị | `products.json` có 14/20 bản ghi ở trạng thái `pending`; chỉ bản ghi `approved` được coi là đã duyệt |
| **O4** | Quyết định kiểm duyệt có căn cứ và truy vết được | Mỗi lần phân tích AI ghi rõ "nguồn: mô hình" hay "nguồn: bộ quy tắc cục bộ"; từ chối lưu `note` |
| **O5** | Quy định nội dung có một bản đang hiệu lực | Quy định lưu cùng người xác nhận; kiểm duyệt viên đọc đúng bản đã ban hành |
| **O6** | Quản trị tập trung danh mục và tài khoản | Khóa danh mục / khóa tài khoản đổi cờ `active` trong dữ liệu, có hiệu lực ở lần tải kế tiếp |
| **O7** | Giao diện dùng được trên điện thoại và bàn phím | Có `@media` cho 320–1280px ở cả ba phân hệ; mọi thao tác chính chạm được bằng Tab, có `:focus-visible` |

## 4. Thực thể dữ liệu

Năm thực thể dưới đây là dữ liệu thật đang chạy, không phải danh sách dự kiến. Bản ghi mồi nằm trong `KiemDuyetVaQuanTri/assets/data/`, mỗi bộ 15–20 bản ghi theo đúng yêu cầu 15–25 bản ghi của tiêu chí 5.3.

| Thực thể | Tệp mồi | Số bản ghi | Trường | Khóa lưu |
|---|---|---|---|---|
| **Product** (bài đăng sản phẩm) | `products.json` | 20 | `id, name, maker, price, age, image, description, status, note, category` | `craftlink:data:v1:products` |
| **Report** (báo cáo vi phạm) | `reports.json` | 20 | `id, sender, target, type, reason, date, status` | `craftlink:data:v1:reports` |
| **User** (tài khoản) | `users.json` | 20 | `name, email, role, date, active, image` | `craftlink:data:v1:users` |
| **Category** (danh mục ngành hàng) | `categories.json` | 15 | `id, name, children, products, active, image` | `craftlink:data:v1:categories` |
| **Guideline** (quy định nội dung) | `guidelines.json` | 15 | `id, title, group, text` | `craftlink:data:v1:guidelines` |

Quan hệ: `Product.category` trỏ tới `Category.id`; `Product.maker` trỏ tới `User.name` với `role = maker`; `Report.target` trỏ tới `Product.name` hoặc `User.name` tùy `Report.type` (`Sản phẩm` / `Người dùng`). `User.role` nhận ba giá trị `buyer`, `maker`, `moderator` — quản trị viên là vai trò đăng nhập, không phải một bản ghi trong danh sách người dùng.

## 5. Ma trận vòng đời trạng thái

Cột "Ai đổi" là vai trò được phép bấm; cột "Màn hình" là nơi thao tác xảy ra. Giá trị trạng thái là chuỗi thật trong mã, không phải nhãn tự đặt.

### 5.1 Product — hàng đợi kiểm duyệt

| Trạng thái | Nghĩa | Ai đổi sang | Màn hình | Được đi tiếp tới |
|---|---|---|---|---|
| `pending` | Chờ duyệt, chưa hiển thị | Người bán nộp bài / nộp lại sau khi sửa | Quản lý listing (STT 8) | `approved`, `revision`, `rejected` |
| `approved` | Đã duyệt, hiển thị công khai | Kiểm duyệt viên | Hàng đợi kiểm duyệt (STT 14) | — (kết thúc) |
| `revision` | Cần chỉnh sửa, trả về người bán | Kiểm duyệt viên | Hàng đợi kiểm duyệt (STT 14) | `pending` (sau khi người bán sửa) |
| `rejected` | Từ chối, buộc ghi lý do trong `note` | Kiểm duyệt viên | Hàng đợi kiểm duyệt (STT 14) | — (kết thúc) |

### 5.2 Report — trung tâm báo cáo

| Trạng thái | Nghĩa | Ai đổi sang | Màn hình | Được đi tiếp tới |
|---|---|---|---|---|
| `pending` | Vừa tiếp nhận, chưa ai xem | Người dùng gửi báo cáo | Trung tâm báo cáo (STT 15) | `verifying`, `dismissed`, `handled` |
| `verifying` | Đang xác minh | Kiểm duyệt viên bấm *Xác minh* | Trung tâm báo cáo (STT 15) | `handled`, `dismissed` |
| `handled` | Đã xử lý vi phạm | Kiểm duyệt viên bấm *Xử lý vi phạm* | Trung tâm báo cáo (STT 15) | — (kết thúc) |
| `dismissed` | Bỏ qua, không đủ căn cứ | Kiểm duyệt viên bấm *Bỏ qua* | Trung tâm báo cáo (STT 15) | — (kết thúc) |

### 5.3 User và Category — cờ `active`

| Thực thể | `active = true` | `active = false` | Ai đổi | Màn hình |
|---|---|---|---|---|
| User | Đăng nhập được, xuất hiện trong bộ lọc vai trò | Bị khóa, không đăng nhập được | Quản trị viên bấm *Khóa / Mở khóa* | Quản lý tài khoản (STT 17) |
| Category | Danh mục hiện trong bộ lọc phía người mua | Danh mục bị khóa, không chọn được khi đăng bài | Quản trị viên chuyển *Hiển thị / Khóa* | Quản lý danh mục (STT 16) |

### 5.4 Guideline — quy định nội dung

| Trạng thái | Nghĩa | Ai đổi | Màn hình |
|---|---|---|---|
| Bản nháp do AI soạn | Nội dung do `policy-copilot` sinh ra, chưa có hiệu lực | Quản trị viên sửa và bấm lưu | Quy định nội dung (STT 18) |
| Đã lưu | Có trong `guidelines`, dùng làm căn cứ kiểm duyệt | Quản trị viên | Quy định nội dung (STT 18) |
| Đã xóa | Xóa sau hộp thoại xác nhận, không khôi phục được | Quản trị viên | Quy định nội dung (STT 18) |

Ghi chú trung thực: bản mã hiện tại **chưa** có lịch sử phiên bản quy định (v1.0–v4.0) và **chưa** có nút *Xuất bản* riêng; quy định lưu là có hiệu lực ngay. Chuỗi `-v4` xuất hiện trong mã chỉ là hậu tố khóa Local Storage.

## 6. Phạm vi và số màn hình

| Phân hệ | Vai trò | Số màn hình | STT trong kiểm kê | Mã nguồn |
|---|---|---|---|---|
| SV1 | Khách hàng | 6 màn / 10 tệp | 1–6 | `KhachHang/` |
| SV2 | Thợ thủ công / Nghệ nhân | 6 màn / 4 tệp | 7–12 | `KhongGianNguoiBan/` |
| SV3 | Kiểm duyệt viên + Quản trị viên | 6 | 13–18 | `KiemDuyetVaQuanTri/` |
| Cả nhóm | Đăng nhập / Đăng ký | 2 | ngoài bảng | `DangNhapVaDangKy/` |

Tổng 18 màn hình, liệt kê 1:1 tại `screen-inventory.md`, mỗi dòng trỏ đúng một tệp đang có trong repo.

## 7. Ba tác vụ AI chạy qua máy chủ

Barem 6.1 cần tối thiểu ba tính năng AI. Nhóm có **8 tính năng AI** trải trên cả ba phân hệ (bảng đầy đủ ở mục 9 của `../README.md`), trong đó ba tác vụ dưới đây là phần gọi mô hình qua `api/ai.js`, chạy được cả ở chế độ có mô hình và chế độ bộ quy tắc cục bộ.

| Mã | Tính năng | Loại tác vụ ở `api/ai.js` | Màn hình | Người quyết định cuối |
|---|---|---|---|---|
| **AI-1** | Chấm điểm rủi ro nội dung bài đăng | `moderation-risk` | Hàng đợi kiểm duyệt (STT 14) | Kiểm duyệt viên |
| **AI-2** | Phân loại và xếp ưu tiên báo cáo | `report-triage` | Trung tâm báo cáo (STT 15) | Kiểm duyệt viên |
| **AI-3** | Soạn nháp quy định nội dung | `policy-copilot` | Quy định nội dung (STT 18) | Quản trị viên |

AI không tự duyệt, tự xóa hay tự khóa tài khoản: mọi kết quả AI chỉ điền vào bản nháp để người có quyền bấm xác nhận. Cách nhóm đo và giới hạn: `ai-usage-report.md`.

## 8. Việc còn mở

- **Đã triển khai công khai ngày 27-10-2026**: <https://nguyendinhquangminh.github.io/cse122-craftlink-team11/> (GitHub Pages, nhánh `main`, thư mục gốc, kèm `.nojekyll`). Chi tiết và số đo kiểm tra: mục "Triển khai" của `../README.md`.
- Board công việc đã dựng và để chế độ công khai: <https://trello.com/b/N2HBpswf> — năm cột, **31 thẻ** (18 thẻ mang đúng mã `TASK-01…18` + 13 thẻ công việc), mỗi thẻ ghi nhánh · PR · video · màn hình trong mô tả (bản nguồn và cách đọc: `task-board.md`). Sau khi gộp nhánh và gộp PR #6, **20 thẻ ở cột "Đã gộp"** (25/31 thẻ được tick), 5 thẻ còn ở Backlog đều là việc của SV1/SV2 hoặc của cả nhóm.
- `api/ai.js` đã có endpoint nhưng chưa gắn biến môi trường trên nền tảng triển khai, nên bản demo công khai chạy bằng bộ quy tắc cục bộ (GitHub Pages chỉ phục vụ tệp tĩnh).
- Bảng token thiết kế **chưa dùng chung cho cả ba phân hệ** — 12 tệp CSS có khối `:root`, trong đó **11 tệp tự khai màu hex** (gom thành 6 bảng token theo phân hệ), **0 màu hex chung**. Hướng xử lý và lý do chưa sửa: `css/README.md`.
