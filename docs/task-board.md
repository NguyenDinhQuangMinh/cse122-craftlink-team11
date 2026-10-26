# Bảng công việc nhóm — nguồn để dựng board Trello/Jira

Barem yêu cầu ở đâu: Tiêu chí 7.1 (0.25đ) đòi **board Trello/Jira công khai, tối thiểu 5 cột**, mỗi thẻ gắn được bốn thứ: công việc (Task ID) ↔ nhánh (branch) ↔ pull request ↔ video OBS. Tệp này là bản nguồn để dán lên board; bản thân nó **không thay thế** board, vì giảng viên cần mở được đường dẫn thật.

## 1. Năm cột của board

| Cột | Nghĩa | Thẻ được nằm ở đây khi |
|---|---|---|
| 1. Backlog | Đã đặc tả, chưa ai nhận | Chỉ có Task ID và tên màn hình |
| 2. Đang làm | Có người đang viết mã | Đã tạo nhánh |
| 3. Chờ review | Đã mở pull request | Có số PR, chờ người khác bấm review |
| 4. Đã gộp | PR đã merge vào nhánh chính | Có commit hash trên nhánh chính |
| 5. Video & bảo vệ | Đã quay và dán link | Có link YouTube và tên tệp `.mp4` |

## 2. Mười tám thẻ

Cột "PR" ghi số pull request đang mở thật; cột "Video" ghi tên tệp bắt buộc. Cột cuối là trạng thái thật tại thời điểm viết tệp này, không phải trạng thái mong muốn.

| Task ID | Tên thẻ | Người | Nhánh | PR | Video | Cột hiện tại |
|---|---|---|---|---|---|---|
| TASK-01 | Danh sách sản phẩm & sản phẩm yêu thích (STT 1) | SV1 | `feature/home-explore` | #3 | `SV1-01-home-explore.mp4` | Chờ review |
| TASK-02 | Chi tiết sản phẩm (STT 2) | SV1 | `feature/product-detail` | #3 | `SV1-02-product-detail.mp4` | Chờ review |
| TASK-03 | Tạo brief tùy biến (STT 3) | SV1 | `feature/custom-order-brief` | #3 | `SV1-03-custom-order-brief.mp4` | Chờ review |
| TASK-04 | Chọn nghệ nhân (STT 4) | SV1 | `feature/proposal-comparison` | #3 | `SV1-04-proposal-comparison.mp4` | Chờ review |
| TASK-05 | Giỏ hàng & xác nhận đơn (STT 5) | SV1 | `feature/checkout-confirmation` | #3 | `SV1-05-checkout-confirmation.mp4` | Chờ review |
| TASK-06 | Đơn hàng & chi tiết đơn (STT 6) | SV1 | `feature/customer-dashboard` | #3 | `SV1-06-customer-dashboard.mp4` | Chờ review |
| TASK-07 | Quản lý listing (STT 7) | SV2 | `feature/maker-listings` | #2 | `SV2-01-maker-listings.mp4` | Chờ review |
| TASK-08 | Tạo & cập nhật listing (STT 8) | SV2 | `feature/maker-edit-listing` | #2 | `SV2-02-maker-edit-listing.mp4` | Chờ review |
| TASK-09 | Hòm thư brief (STT 9) | SV2 | `feature/maker-brief-inbox` | #2 | `SV2-03-maker-brief-inbox.mp4` | Chờ review |
| TASK-10 | Soạn proposal (STT 10) | SV2 | `feature/maker-proposal-editor` | #2 | `SV2-04-maker-proposal-editor.mp4` | Chờ review |
| TASK-11 | Xem trước proposal (STT 11) | SV2 | `feature/maker-proposal-preview` | #2 | `SV2-05-maker-proposal-preview.mp4` | Chờ review |
| TASK-12 | Hồ sơ gian hàng (STT 12) | SV2 | `feature/maker-shop-profile` | #2 | `SV2-06-maker-shop-profile.mp4` | Chờ review |
| TASK-13 | Bảng điều khiển (STT 13) | SV3 | `feature/sv3-admin-screens` | #1 | — (trong phạm vi demo) | Chờ review |
| TASK-14 | Hàng đợi kiểm duyệt (STT 14) | SV3 | `feature/sv3-admin-screens` | #1 | `SV3-02-admin-moderation-queue.mp4` | Video & bảo vệ |
| TASK-15 | Trung tâm báo cáo (STT 15) | SV3 | `feature/sv3-admin-screens` | #1 | — (trong phạm vi demo) | Chờ review |
| TASK-16 | Quản lý danh mục (STT 16) | SV3 | `feature/sv3-admin-screens` | #1 | `SV3-04-admin-category-management.mp4` | Video & bảo vệ |
| TASK-17 | Quản lý tài khoản (STT 17) | SV3 | `feature/sv3-admin-screens` | #1 | — (trong phạm vi demo) | Chờ review |
| TASK-18 | Quy định nội dung (STT 18) | SV3 | `feature/sv3-admin-screens` | #1 | `SV3-06-admin-content-policy.mp4` | Video & bảo vệ |

## 3. Dựng board trong 15 phút

1. Tạo board **công khai** trên Trello, đặt tên `CSE122 — CraftLink — Nhóm 11`.
2. Tạo đúng năm danh sách theo bảng ở mục 1.
3. Dán mỗi dòng ở mục 2 thành một thẻ, tiêu đề thẻ theo mẫu `TASK-14 · Hàng đợi kiểm duyệt (STT 14) — SV3`.
4. Dán phần mô tả thẻ theo mẫu sau, thay bằng giá trị thật:

   ```
   Nhánh: feature/sv3-admin-screens
   Pull request: #1
   Video: SV3-02-admin-moderation-queue.mp4 — https://youtu.be/LAlWYQg43LY
   Màn hình: KiemDuyetVaQuanTri/04-moderation-queue/index.html
   ```
5. Gắn nhãn theo người (`SV1`, `SV2`, `SV3`) để lọc được theo thành viên.
6. Dán link board vào `README.md` mục 10 và vào báo cáo, để giảng viên mở được từ repo.

## 4. Điều kiện để cột 4 và 5 có thật

Board chỉ được tính khi trạng thái trên board khớp với repo. Hiện tại cả ba pull request đều **đang mở và chưa có review nào**, nên chưa thẻ nào được chuyển sang cột "Đã gộp". Trình tự gộp đề xuất: **#3 (Khách hàng) → #2 (Người bán) → #1 (Quản trị)**, vì `#1` chứa `index.html` và `README.md` cuối cùng nhắc tới hai phân hệ kia.
