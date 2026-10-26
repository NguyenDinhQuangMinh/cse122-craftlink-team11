# videos/ — Minh chứng Video OBS

Barem yêu cầu ở đâu: ĐK4 — "Có danh sách Video OBS tương ứng 1:1 với toàn bộ màn hình độc lập trong `screen-inventory.md`, mỗi video có webcam rõ khuôn mặt sinh viên và giọng giải thích trực tiếp"; Tiêu chí 8.1 (0.50đ) đòi tên tệp theo chuẩn `SVx-XX-screen-name.mp4` và **8 bước bắt buộc trong mỗi video**; mục 2 của phần chuẩn bị bảo vệ liệt kê "Tab 6: Thư mục chứa toàn bộ Video OBS của nhóm".

## Vì sao thư mục này không chứa tệp .mp4

GitHub chặn tệp lớn hơn 100 MB và lịch sử repo sẽ phình vĩnh viễn, còn GitHub Pages thì không cần video. Vì vậy thư mục này chỉ chứa **bảng liên kết** để giảng viên mở được ngay khi chấm; tệp video nằm trên YouTube (chế độ Không công khai) hoặc Google Drive.

## Danh sách video

Tên tệp lấy đúng theo cột "OBS Video" của `../docs/screen-inventory.md`. Cột trạng thái ghi thật: chỉ dòng nào có link mới đánh dấu đã quay.

### SV3 — Nguyễn Đình Quang Minh (đã quay đủ)

| STT kiểm kê | Tên tệp bắt buộc | Link | Thời lượng |
|---|---|---|---|
| 14 | `SV3-02-admin-moderation-queue.mp4` | <https://youtu.be/LAlWYQg43LY> | 13:42 |
| 16 | `SV3-04-admin-category-management.mp4` | <https://youtu.be/imsnvGvIofQ> | 14:24 |
| 18 | `SV3-06-admin-content-policy.mp4` | <https://youtu.be/3dCK3uHpIcY> | 17:21 |

### SV1 — Nguyễn Xuân Hưng (chưa có link)

| STT kiểm kê | Tên tệp bắt buộc | Link | Trạng thái |
|---|---|---|---|
| 1 | `SV1-01-home-explore.mp4` | — | **chưa quay / chưa dán link** |
| 2 | `SV1-02-product-detail.mp4` | — | **chưa quay / chưa dán link** |
| 3 | `SV1-03-custom-order-brief.mp4` | — | **chưa quay / chưa dán link** |
| 4 | `SV1-04-proposal-comparison.mp4` | — | **chưa quay / chưa dán link** |
| 5 | `SV1-05-checkout-confirmation.mp4` | — | **chưa quay / chưa dán link** |
| 6 | `SV1-06-customer-dashboard.mp4` | — | **chưa quay / chưa dán link** |

### SV2 — Dương Vũ Quân Minh (chưa có link)

| STT kiểm kê | Tên tệp bắt buộc | Link | Trạng thái |
|---|---|---|---|
| 7 | `SV2-01-maker-listings.mp4` | — | **chưa quay / chưa dán link** |
| 8 | `SV2-02-maker-edit-listing.mp4` | — | **chưa quay / chưa dán link** |
| 9 | `SV2-03-maker-brief-inbox.mp4` | — | **chưa quay / chưa dán link** |
| 10 | `SV2-04-maker-proposal-editor.mp4` | — | **chưa quay / chưa dán link** |
| 11 | `SV2-05-maker-proposal-preview.mp4` | — | **chưa quay / chưa dán link** |
| 12 | `SV2-06-maker-shop-profile.mp4` | — | **chưa quay / chưa dán link** |

> **Việc nhóm phải chốt bằng văn bản:** bảng trên liệt kê 6 video cho SV1 và 6 cho SV2 theo cột OBS của bảng kiểm kê, trong khi SV3 chỉ quay 3 video và ba màn còn lại được chứng minh trong chính ba video đó. Hai phương án đang tồn tại song song:
>
> - **Phương án A — 1:1 đúng ĐK4:** mỗi người quay đủ số dòng có trong bảng (SV3 phải quay thêm 3 video).
> - **Phương án B — 3 video/người:** giữ nguyên SV3, SV1 và SV2 mỗi người chọn 3 trang chính; các dòng còn lại ghi "Không quay riêng – nằm trong phạm vi demo" như SV3 đang làm.
>
> Nhóm cần hỏi giảng viên và lưu lại câu trả lời (email hoặc tin nhắn) trước khi nộp, vì ĐK4 là điều kiện loại trực tiếp.

## Tám bước phải có trong từng video

1. Webcam nhìn rõ khuôn mặt sinh viên thực hiện và giọng thuyết trình thật.
2. Hiển thị bản thiết kế Mockup trên Figma/Canva của màn hình đó.
3. Mở đúng tệp HTML / CSS / JS trong VS Code.
4. Giải thích rõ cấu trúc bố cục HTML/CSS và thuật toán sự kiện JavaScript.
5. Thực hiện ít nhất 01 chỉnh sửa trực tiếp trên mã nguồn.
6. Chạy thử tương tác và kiểm tra Responsive trên trình duyệt.
7. Thực hiện `git commit` và `git push` lên GitHub.
8. Đọc rõ mã công việc (Task ID), tên nhánh (Branch) và mã Commit.

Thiếu bước 1 → video đó 0.00đ. Chỉ quay sản phẩm chạy được mà không giải thích code và không sửa trực tiếp → trừ 0.25đ.

## Cách đặt tên khi đăng YouTube

Tiêu đề nên theo đúng một khuôn để giảng viên đối chiếu nhanh với bảng trên:

```
CSE122 CraftLink — SV3-02 admin-moderation-queue (TASK-14)
CSE122 CraftLink — SV1-01 home-explore (TASK-01)
CSE122 CraftLink — SV2-03 maker-brief-inbox (TASK-09)
```

Ba video SV3 hiện có hai tiêu đề chưa theo khuôn này; sửa tiêu đề trên YouTube rồi đối chiếu lại bảng ở trên.
