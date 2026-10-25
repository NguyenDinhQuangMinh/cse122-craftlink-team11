# Component Guide — phân hệ Kiểm duyệt & Quản trị (SV3)

Barem gọi tên ở mục "Thiết kế Figma/Canva": *Mobile Mockup cho các màn hình chính, bảng màu/chữ (Component Guide)*, và dòng chốt ở phiếu tự rà soát: *"có đủ Sitemap, User Flow, Desktop + Mobile Mockup, Component Guide và AI…"*.

Tệp này liệt kê **đúng token và lớp CSS đang chạy trong mã nguồn**, mỗi dòng kèm đường dẫn để giảng viên đối chiếu được. Đây là bảng tra, không phải mô tả ý tưởng.

## 1. Bảng màu (design tokens)

Khai báo một lần trong `:root`, không trang nào hard-code mã màu riêng.

| Token | Giá trị | Dùng cho | Nơi khai báo |
|---|---|---|---|
| `--navy` | `#182532` (moderator) / `#1c2936` (admin) | nền sidebar, tiêu đề mạnh | `css/shared/moderator/theme.css:7`, `css/shared/admin/theme.css:7` |
| `--orange` | `#d95832` / `#cf542d` | hành động chính, điểm nhấn thương hiệu | `…/theme.css:8` |
| `--green` | `#4c9370` / `#4e916b` | trạng thái tích cực (Đã duyệt, Hiển thị) | `…/theme.css:9` |
| `--muted` | `#5a6472` | chữ phụ, nhãn metadata | `…/theme.css:10` |
| `--line` | `#ecebe8` | viền bảng, kẻ phân vùng | `…/theme.css:11` |
| `--paper` | `#fff` | nền thẻ | `…/theme.css:12` |
| nền trang | `#faf8f5` | `body` | `…/theme.css:6` |
| chữ thân | `#252d37` (mod) / `#28313b` (admin) | `body` | `…/theme.css:5` |

**Tương phản:** `--muted` `#5a6472` trên nền `#faf8f5` = **6.0:1**, vượt ngưỡng 4.5:1 của WCAG AA cho chữ thường (đo ngày 25-10-2026).

## 2. Chữ

- Họ phông: `Inter, "Segoe UI", Arial, sans-serif` — khai trong `:root` của `theme.css`, không tệp nào nạp webfont (nên chạy được offline).
- Cỡ chữ trong phân hệ dao động 10 → 20px. Nhãn trang trí nhỏ nhất `.eyebrow` = **10px, letter-spacing 1px, uppercase** (`06-content-guidelines/css/page.css:10-17`); cỡ này chỉ dùng cho nhãn, không dùng cho nội dung đọc.
- `.subtext` cho dòng phụ dưới tên; `.field-error` = 12px, `#b42318` (`css/shared/states.css:31`).

## 3. Điểm ngắt responsive

| Ngắt | Tệp | Hiệu ứng chính |
|---|---|---|
| `max-width: 1100px` | `css/shared/moderator/responsive.css:3` | sidebar chuyển sang drawer, lưới giảm cột |
| `max-width: 900px` | `02-category-management/css/page.css:81` | toolbar danh mục xuống dòng |
| `max-width: 850px` | `06-content-guidelines/css/page.css:95,100` | lưới quy định 1 cột |
| `max-width: 680px` | `css/shared/moderator/responsive.css:24`, `06/…/page.css:106` | bảng đổi sang thẻ dọc, nút thao tác full-width |

Đã đo thật ở **320 / 375 / 768 / 1280px** cho trang 02, 04, 06 (ngày 25-10-2026); ảnh chụp 375px nằm trong `docs/diagrams/mockups/`.

## 4. Thành phần giao diện dùng chung

| Thành phần | Lớp CSS | Xuất hiện ở |
|---|---|---|
| Thẻ số liệu | `.card`, `.table-card` | 01-dashboard, 02, 05 |
| Lưới sản phẩm | `.product-grid`, `.product-card`, `.product-image`, `.product-maker`, `.product-price` | 04-moderation-queue |
| Bảng dữ liệu | `.data-table`, `.category-row`, `.report-id` | 02, 03, 05 |
| Thanh công cụ | `.toolbar`, `.search-box`, `.page-size`, `.pagination`, `.result-count` | 02, 03, 05, 06 |
| Nhãn trạng thái | `.status` + biến thể `.verifying`, `.handled`/`.approved`, `.dismissed`/`.rejected` (`css/shared/moderator/components.css:104-121`); `.status.off` cho bản ghi đang ẩn (`css/shared/admin/components.css:140`) | mọi màn có vòng đời bản ghi |
| Nút | `.primary`, `.secondary`, `.approve`, `.action-btn` | toàn phân hệ |
| Hộp thoại | `.dialog`, `.dialog-head`, `.dialog-actions`, `.close` (dùng `<dialog>` native + `showModal()`, đóng bằng Esc) | 02, 04, 05, 06 |
| Chuyển trang | `.switch` (bật/tắt hiển thị, bật vai trò) | 02, 03 |
| Nhãn lỗi field | `.field-error` | form của 02, 06 |

## 5. Ba trạng thái dữ liệu bắt buộc

Cả ba đều do một hàm `CraftLinkAPI.showState(container, kind, message, options)` vẽ (`KiemDuyetVaQuanTri/js/api.js:132`), nên sáu màn hiển thị giống hệt nhau.

| Trạng thái | Lớp | Màu/behaviour |
|---|---|---|
| Loading | `.state-message` + `.state-spinner` | vòng quay CSS, chưa có nội dung |
| Empty | `.state-message.state-empty` | chữ `--muted`; trang 04 gắn thêm nút `.state-action` "Khôi phục dữ liệu mẫu" (`04-moderation-queue/js/main.js:224`) |
| Error | `.state-message.state-error` | chữ `#9f2d2d` trên nền `#fff5f4`, kèm nút "Thử lại" gọi lại `loadData()` |

## 6. Thành phần AI (6 bước)

Hộp thoại dùng chung `KiemDuyetVaQuanTri/js/ai-client.js`, mỗi màn khai báo một *task type* bằng `CraftLinkAI.bind(...)`:

```
Input → Processing → Output → Explain → Control → Save
```

- `Output` hiện **độ tin cậy** dạng `%`, `Explain` liệt kê các yếu tố dẫn tới kết luận.
- Dòng **"Nguồn:"** luôn hiển thị: hoặc tên mô hình từ server, hoặc *"bộ quy tắc phân tích cục bộ"* khi chưa có key — xem `js/ai-fallback.js` (`report-triage` ở dòng 182-215 trả về *phân loại + ưu tiên + trạng thái đề xuất*, **không** đề xuất mức phạt).
- Ảnh bìa/thư mục: `encodeImage()` trong `js/api.js` resize ≤1000px, xuất JPEG chất lượng 0.76, chặn >5MB, chỉ nhận JPG/PNG/WebP.

## 7. Trang này chưa có gì

Đây là bản **tài liệu** của Component Guide. Barem nói "bảng màu/chữ" trong **thiết kế Figma/Canva**, nên nội dung trên cần dựng thành 1 trang Canva (màu + cỡ chữ + các trạng thái nút/nhãn) — ảnh `docs/diagrams/mockups/` đã chụp sẵn phần tử thật để đưa lên đó.
