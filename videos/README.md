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

### SV1 — Nguyễn Xuân Hưng (0/6 xác nhận; 3 link chưa khớp màn hình)

Nhánh thực tế: `feature/sv1-buyer` · PR #3. Sáu tệp dưới đây tương ứng 6 dòng kiểm kê SV1; `favorites.html` gộp vào video 1, `cart.html` vào video 5, `order-details.html` vào video 6.

| STT kiểm kê | Tên tệp bắt buộc | Link | Trạng thái |
|---|---|---|---|
| 1 | `SV1-01-home-explore.mp4` | — | **chưa quay / chưa dán link** |
| 2 | `SV1-02-product-detail.mp4` | — | **chưa quay / chưa dán link** |
| 3 | `SV1-03-custom-order-brief.mp4` | — | **chưa quay / chưa dán link** |
| 4 | `SV1-04-proposal-comparison.mp4` | — | **chưa quay / chưa dán link** |
| 5 | `SV1-05-checkout-confirmation.mp4` | — | **chưa quay / chưa dán link** |
| 6 | `SV1-06-customer-dashboard.mp4` | — | **chưa quay / chưa dán link** |

> **Vì sao bảng này vẫn để trống:** commit `38d3c9d` (SV3) đã xóa bảng vì chưa có video. ĐK4 lại đòi "danh sách Video OBS tương ứng 1:1 với toàn bộ màn hình độc lập", nên SV1 giữ lại đúng 6 dòng và ghi thật trạng thái "chưa quay" — không dòng nào bị đánh dấu đã quay.

**Ba link SV1 đã dẫn** (nguồn: tệp `video` trên nhánh `feature/sv1-buyer`, ngày 26-10):

| STT SV1 ghi | Link | Khả năng ánh xạ |
|---|---|---|
| 4 | <https://www.youtube.com/watch?v=AW-wuwhA3zc&t=4s> | Có thể là màn 4 — `artisan-suggestions.html` |
| 7 | <https://www.youtube.com/watch?v=T6ejhOOqfgk> | STT 7 trong bảng 18 dòng là **SV2**; nếu là STT nội bộ 9 trang Buyer thì có thể là `checkout.html` |
| 9 | <https://www.youtube.com/watch?v=PaCFXYhuo9U> | STT 9 trong bảng 18 dòng là **SV2**; nếu là STT nội bộ 9 trang Buyer thì có thể là `order-details.html` |

> **Rủi ro:** số 7 và 9 trong bảng kiểm kê đang thuộc SV2. Nếu hai link này thực chất là video của SV2, dùng cho SV1 sẽ sai minh chứng. Chỉ điền vào bảng chính thức sau khi mở video, xác nhận đúng người quay, đúng màn hình và đúng tên tệp. Nếu 7 và 9 là số thứ tự nội bộ trong 9 trang Buyer thì phải ghi rõ "STT nội bộ" và vẫn cần quay đúng trang của mình để ĐK4 khớp 1:1.

### SV2 — Dương Vũ Quân Minh (đã quay 3 video đăng nhập; 6 dòng Maker chưa có video)

Kênh YouTube: <https://www.youtube.com/@minhduong3801> · Playlist: <https://www.youtube.com/playlist?list=PLDaEqceEwiuk>

Ba video đã quay là ba trang đăng nhập theo vai trong `DangNhapVaDangKy/01-dang-nhap/` — phần SV2 bàn giao thêm, nằm ngoài 6 dòng kiểm kê 7–12. Tiêu đề trên YouTube đã theo khuôn đặt tên ở cuối tệp.

| Tên tệp | Màn hình | Tệp mã nguồn | Link |
|---|---|---|---|
| `SV2-01-dangnhap-khachhang.mp4` | Đăng nhập Khách hàng | `khach-hang.html` + `css/khach-hang.css` + `js/khach-hang.js` | <https://www.youtube.com/watch?v=BY0AAIjTSm8> |
| `SV2-02-dangnhap-nghenhan.mp4` | Đăng nhập Thợ thủ công / Nghệ nhân | `nghe-nhan.html` + `css/nghe-nhan.css` + `js/nghe-nhan.js` | <https://www.youtube.com/watch?v=2zrLFxVEpiU> |
| `SV2-03-dangnhap-admin.mp4` | Đăng nhập Quản trị viên & Kiểm duyệt | `quan-tri.html` + `css/quan-tri.css` + `js/quan-tri.js` | <https://www.youtube.com/watch?v=d4kmFKU6ivg> |

Sáu dòng kiểm kê 7–12 (`KhongGianNguoiBan/`) chưa có video riêng:

| STT kiểm kê | Tên tệp bắt buộc | Link | Trạng thái |
|---|---|---|---|
| 7 | `SV2-01-maker-listings.mp4` | — | **chưa quay riêng** |
| 8 | `SV2-02-maker-edit-listing.mp4` | — | **chưa quay riêng** |
| 9 | `SV2-03-maker-brief-inbox.mp4` | — | **chưa quay riêng** |
| 10 | `SV2-04-maker-proposal-editor.mp4` | — | **chưa quay riêng** |
| 11 | `SV2-05-maker-proposal-preview.mp4` | — | **chưa quay riêng** |
| 12 | `SV2-06-maker-shop-profile.mp4` | — | **chưa quay riêng** |

> Nếu giảng viên yêu cầu đủ 6 video/người như phản hồi ngày 2026-10-26, SV2 còn thiếu video cho 6 dòng trên; ba video đăng nhập là phần minh chứng cho phân hệ `DangNhapVaDangKy/`.

> **Chưa chốt: 3 hay 6 video cho SV1.** Tệp này từng ghi "Đã chốt: 3 video/người", nhưng phản hồi chấm ngày 2026-10-26 yêu cầu SV1 đủ **6 video**. Trạng thái đúng tại 2026-10-26:
>
> - **SV3:** 3 video đã quay, có link và thời lượng.
> - **SV1:** 0/6 video được xác nhận; 3 link đã dẫn nhưng chưa khớp màn hình.
> - **SV2:** 3 video đã quay cho ba trang đăng nhập (có link ở trên); 6 dòng kiểm kê 7–12 chưa có video riêng.
>
> Không dùng câu "3 video/người" để biện minh cho SV1 khi chưa có xác nhận bằng văn bản của giảng viên. ĐK4 là điều kiện loại trực tiếp; nếu giảng viên xác nhận lại 3 video là đủ, phải lưu tin nhắn/email đó vào thư mục nộp bài và ghi rõ màn nào không quay riêng.

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
