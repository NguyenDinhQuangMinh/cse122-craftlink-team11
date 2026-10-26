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

### SV1 — Nguyễn Xuân Hưng (3/3 video, đã khớp dòng kiểm kê)

| STT kiểm kê | Màn hình | Tên tệp bắt buộc | Link |
|---|---|---|---|
| 2 | Chi tiết sản phẩm — `product-detail.html` | `SV1-02-product-detail.mp4` | <https://www.youtube.com/watch?v=PaCFXYhuo9U> |
| 4 | Gợi ý nghệ nhân — `artisan-suggestions.html` | `SV1-04-artisan-suggestions.mp4` | <https://www.youtube.com/watch?v=AW-wuwhA3zc> |
| 5 | Giỏ hàng & xác nhận đơn — `cart.html`, `checkout.html` | `SV1-05-checkout-confirmation.mp4` | <https://www.youtube.com/watch?v=T6ejhOOqfgk> |

> **Cách khớp:** tiêu đề công khai của ba video (đọc qua YouTube oEmbed ngày 26-10-2026) lần lượt là `artisan suggetion.html`, `cart html`, `product detail html`. Số 4/7/9 trong tệp `video` của SV1 là số thứ tự nội bộ trong 9 tệp Buyer, không phải STT kiểm kê. Ba dòng còn lại của SV1 (STT 1, 3, 6) không quay riêng theo thỏa thuận 3 video/người.
>
> SV1 cần đổi tên tệp lưu trữ của video STT 4 thành `SV1-04-artisan-suggestions.mp4` cho khớp màn hình thật; tên cũ `SV1-04-proposal-comparison.mp4` là tên của màn "so sánh proposal" đã bỏ.

### SV2 — Dương Vũ Quân Minh (chưa có link)

Kênh YouTube: <https://www.youtube.com/@minhduong3801> — chưa có link theo từng màn.

| STT kiểm kê | Tên tệp bắt buộc | Link | Trạng thái |
|---|---|---|---|
| 7 | `SV2-01-maker-listings.mp4` | — | **chưa quay / chưa dán link** |
| 8 | `SV2-02-maker-edit-listing.mp4` | — | **chưa quay / chưa dán link** |
| 9 | `SV2-03-maker-brief-inbox.mp4` | — | **chưa quay / chưa dán link** |
| 10 | `SV2-04-maker-proposal-editor.mp4` | — | **chưa quay / chưa dán link** |
| 11 | `SV2-05-maker-proposal-preview.mp4` | — | **chưa quay / chưa dán link** |
| 12 | `SV2-06-maker-shop-profile.mp4` | — | **chưa quay / chưa dán link** |

> **Đã chốt: 3 video/người.** Theo xác nhận của nhóm, 3 video cho 6 màn của mỗi người là đủ yêu cầu của giảng viên; các màn không quay riêng được chứng minh ngay trong ba video đó. Vì vậy SV1 và SV2 mỗi bạn **chọn 3 màn chính** trong 6 dòng của mình, quay đủ 8 bước rồi dán link vào đúng 3 dòng tương ứng; 3 dòng còn lại ghi "Không quay riêng — nằm trong phạm vi demo".
>
> Vẫn nên lưu lại tin nhắn hoặc email xác nhận của giảng viên vào thư mục nộp bài: ĐK4 là điều kiện loại trực tiếp và người chấm có thể hỏi lại.

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
