# PHÂN CÔNG NHIỆM VỤ CHI TIẾT — SV1 (BUYER)

> **Dự án:** CraftLink — Sàn thương mại điện tử sản phẩm thủ công tùy biến
> **Học phần:** Phát triển ứng dụng Web cơ bản (CSE122) — Nhóm 11
> **Sinh viên phụ trách:** Nguyễn Xuân Hưng — 2551060622
> **Phạm vi:** 9 tệp HTML trong `KhachHang/` (6 dòng kiểm kê)
> **Nhánh thực tế:** `feature/sv1-buyer` · **PR:** #3
> **Cập nhật:** 2026-10-26

---

## 🎨 BẢN THIẾT KẾ GIAO DIỆN CANVA

- **Link đang dùng trên nhánh `feature/sv1-buyer`:** <https://www.canva.com/design/DAHZAR9VxmU/dQQiBQ9-OPRH6Q5x8DdAkw/edit>
- **Chưa chốt:** bản tài liệu trên nhánh `dev` từng ghi link `DAHWyBVvS6U`. Cần nhóm xác nhận đâu là bản đúng — **[CẦN XÁC MINH]**.

---

## 📋 VAI TRÒ & PHẠM VI

- **Vai trò nghiệp vụ:** Khách hàng (Buyer).
- **Phạm vi trong repo nhóm:** 9 tệp HTML trong `KhachHang/`, gồm khám phá sản phẩm, tùy biến, giỏ hàng, xác nhận đơn và theo dõi đơn.
- **Tệp thứ mười (ngoài 18 dòng kiểm kê):** `KhachHang/forgot password.html` — trang khôi phục mật khẩu thêm ngày 26-10-2026. Chưa chạy được: nạp ba script `common.js`, `auth-config.js`, `auth-service.js` không có trong nhánh và href CSS ghi `forgot passwork.css`; chưa nối vào liên kết nào từ trang đăng nhập.
- **Khung giao diện dùng chung:** header/footer và `KhachHang/css/style.css` được dùng lại trên 9 trang; không tách thành bộ component riêng.
- **Đăng nhập/đăng ký:** nằm ở `DangNhapVaDangKy/`, do SV1 và SV2 cùng làm; không tính vào 9 màn hình Buyer.
- **Không backend, không API:** dữ liệu mẫu trong `KhachHang/js/data.js`; giỏ hàng, yêu thích, brief và nháp chỉnh sửa lưu bằng Web Storage.

---

## 🖥️ CHÍN MÀN HÌNH VÀ ÁNH XẠ 6 DÒNG KIỂM KÊ

Bảng kiểm kê của nhóm có **6 dòng SV1**. Ba tệp `favorites.html`, `cart.html`, `order-details.html` được gộp vào dòng tương ứng, không tạo dòng mới.

| # | Màn hình | Tệp | Mục đích | Thành phần chính | CRUD | Trạng thái | AI | Task ID |
|---|---|---|---|---|---|---|---|---|
| 1 | Trang chính — danh sách sản phẩm | `KhachHang/index.html`<br>`KhachHang/js/main.js` (`initProductList`)<br>`KhachHang/js/ai-advisor.js` | Tìm, lọc, sắp xếp và mở chi tiết sản phẩm; hỏi trợ lý CraftLink AI | Ô tìm kiếm `#search-input`; bộ lọc danh mục/phong cách/thời gian/giá; 4 kiểu sắp xếp; 8 thẻ `.product-card`; panel CraftLink AI | R: đọc 8 sản phẩm mẫu; AI đọc thêm 7 hồ sơ nghệ nhân | Normal; Empty khi bộ lọc không có kết quả; Loading AI 350 ms (mô phỏng); Error khi input < 3 ký tự | Có nhãn AI — **luật từ khóa cục bộ**, không gọi mô hình | TASK-01 |
| 2 | Chi tiết sản phẩm | `KhachHang/product-detail.html`<br>`KhachHang/js/main.js` (`initProductDetail`, `renderProductDetail`, `initFavoriteButton`, `initProductGallery`) | Xem kỹ sản phẩm trước khi mua hoặc tùy biến | Gallery 1 ảnh lớn + 5 thumb; stepper 1–99; `#add-to-cart-btn`; `#favorite-btn`; panel nghệ nhân; nút báo cáo listing (demo); 3 đánh giá mẫu | R: sản phẩm theo `?id`; C: thêm giỏ; C: bật yêu thích | Normal; fallback + toast khi `?id` không hợp lệ | Không | TASK-02 |
| 3 | Tạo brief tùy biến | `KhachHang/customize.html`<br>`KhachHang/js/main.js` (`initCustomizePage`, `buildSummary`, `runSummary`) | Gửi yêu cầu tùy biến rõ ràng cho nghệ nhân | Form mô tả, đếm ký tự, ảnh tham khảo; panel kết quả; nút Chấp nhận / Sửa / Từ chối / Tạo lại / Lưu | R: sản phẩm; C/U: brief nháp trong `sessionStorage`; D: bỏ bản tóm tắt | Normal; Loading 600 ms (mô phỏng); Error khi brief rỗng; panel kết quả | Có nhãn AI — **tóm tắt bằng luật cục bộ**, không gọi mô hình | TASK-03 |
| 4 | Gợi ý nghệ nhân | `KhachHang/artisan-suggestions.html`<br>`KhachHang/js/main.js` (`initArtisanSuggestionsPage`) | Chọn nghệ nhân phù hợp với sản phẩm và brief | Danh sách nghệ nhân kèm lý do khớp; chọn / bỏ qua / tạo lại / quay lại sửa brief | R: 7 hồ sơ nghệ nhân; U: chọn nghệ nhân vào draft | Normal; Empty khi không có hồ sơ khớp; Guidance khi thiếu brief | **Không phải AI** — số tiêu chí khớp, không phải xác suất | TASK-04 |
| 5 | Giỏ hàng | `KhachHang/cart.html`<br>`KhachHang/js/main.js` (`initCartPage`) | Kiểm tra và chỉnh sản phẩm trước khi mua | Danh sách dòng hàng; tăng/giảm số lượng; xóa; tạm tính; nút sang xác nhận đơn | C: thêm từ trang chi tiết; R: đọc giỏ; U: đổi số lượng; D: xóa | Normal; Empty khi giỏ trống | Không | TASK-05 |
| 6 | Sản phẩm yêu thích | `KhachHang/favorites.html`<br>`KhachHang/js/main.js` (`initFavoritesPage`) | Lưu và xem lại sản phẩm yêu thích | Lưới sản phẩm; bỏ yêu thích; mở chi tiết hoặc tạo brief; khối `#favorites-empty` | R: danh sách; D: bỏ yêu thích | Normal; Empty khi chưa có sản phẩm | Không | TASK-01 |
| 7 | Xác nhận đơn | `KhachHang/checkout.html`<br>`KhachHang/js/checkout.js` | Xác nhận đơn tùy biến hoặc đơn từ giỏ hàng | 4 bước: Xem lại → Nhận hàng → Thanh toán & giao hàng → Xác nhận; kiểm tra SĐT/địa chỉ; mã đơn demo | R: draft hoặc giỏ; U: thông tin nhận hàng/thanh toán/giao hàng; C: mã demo; D: xóa draft | Normal; 4 bước; Error thiếu/sai SĐT, địa chỉ, phương thức; Empty thiếu draft/giỏ; Complete | Không | TASK-05 |
| 8 | Đơn hàng của bạn | `KhachHang/orders.html`<br>`KhachHang/js/main.js` (`initOrdersPage`) | Theo dõi trạng thái đơn | Tab trạng thái; tìm kiếm; lọc thời gian; hủy đơn (chỉ đổi DOM); mở chi tiết | R: 4 đơn mẫu tĩnh; U: hủy đơn trên giao diện; không C/D | Normal; Empty khi không khớp; Confirm trước khi hủy | Không | TASK-06 |
| 9 | Chi tiết đơn và chỉnh sửa | `KhachHang/order-details.html`<br>`KhachHang/js/main.js` (`initOrderDetailsPage`) | Xem chi tiết đơn và gửi yêu cầu chỉnh sửa | Thông tin đơn mẫu; ô nội dung chỉnh sửa; gửi/lưu nháp; khôi phục nháp | R: đơn tĩnh; C/U: nháp trong `localStorage`; không D | Normal; Error khi nội dung rỗng; khôi phục nháp khi mở lại | Không | TASK-06 |

> **Giới hạn của bản demo:** `orders.html` dùng 4 dòng dữ liệu mẫu tĩnh; checkout không tạo đơn mới và không tự chuyển sang `orders.html`; `order-details.html` không đọc `?id`. Không được mô tả các luồng này là đã nối backend.

---

## 🤖 AI TÍCH HỢP — KHAI BÁO TRUNG THỰC

| Tính năng | Tệp | Có gọi mô hình? | Kết luận |
|---|---|---|---|
| CraftLink AI — tư vấn sản phẩm/nghệ nhân | `KhachHang/index.html` + `KhachHang/js/ai-advisor.js` | **Không** | Luật từ khóa cục bộ. Đầu tệp ghi: “Đây KHÔNG phải AI tạo sinh và KHÔNG gọi API bên ngoài.” Điểm khớp là điểm tiêu chí, không phải xác suất. |
| Bản tóm tắt brief | `KhachHang/customize.html` + `KhachHang/js/main.js` (`buildSummary`, `runSummary`) | **Không** | Luật cục bộ; có đủ UI 6 bước nhưng không phải AI tạo sinh. |
| Gợi ý nghệ nhân | `KhachHang/artisan-suggestions.html` | **Không** | Trang ghi rõ “bộ lọc tiêu chí cục bộ, chưa kết nối mô hình AI tạo sinh”. Không khai là AI. |

**Ba tuyên bố AI trong bảng kiểm kê cũ chưa có mã tương ứng:** AI Personalization, AI Visual Matcher, AI Proposal Evaluator. Không được khai là đã triển khai; sửa thành “định hướng, chưa triển khai” hoặc bỏ.

Chi tiết prompt, lỗi đã sửa và mức bằng chứng: xem [`ai-usage-report.md`](ai-usage-report.md) mục 3.1.

---

## 📑 NHẬT KÝ TIẾN ĐỘ (CHECKLIST)

- [x] 9 tệp HTML trong `KhachHang/`
- [x] 9 tệp CSS và 4 tệp JS
- [x] `docs/screen-inventory.md`, `docs/user-flow.md`, `docs/ai-usage-report.md`, `videos/README.md`
- [x] Chạy thủ công 9 trang trên desktop — **tự khai**, chưa có biên bản kiểm thử
- [x] Cross-review PR #1 và PR #2 ngày 2026-10-26
- [ ] Quay đủ 6 video OBS `SV1-01`…`SV1-06` — hiện **0/6**
- [ ] Tách lịch sử PR #3 theo từng màn hình, dùng Conventional Commits
- [x] Dựng board Trello/Jira công khai và dán link vào `README.md` mục 10 — board <https://trello.com/b/N2HBpswf> tạo ngày 26-10-2026 (SV3 dựng thay), 5 cột + 18 thẻ
- [ ] Sửa cột nhánh/tên AI trong `screen-inventory.md` và `task-board.md` (đang chờ PR #1 gộp)
- [ ] Chốt chuẩn tên `role-function-action.html` ở phạm vi cả nhóm
- [ ] Bổ sung minh chứng responsive (ảnh hoặc biên bản) nếu giảng viên yêu cầu

---

## 🎥 VIDEO OBS — ÁNH XẠ BẮT BUỘC

| STT | Tệp bắt buộc | Màn hình | Trạng thái | Link |
|---|---|---|---|---|
| 1 | `SV1-01-home-explore.mp4` | `index.html` (kèm `favorites.html`) | Chưa quay | — |
| 2 | `SV1-02-product-detail.mp4` | `product-detail.html` | Chưa quay | — |
| 3 | `SV1-03-custom-order-brief.mp4` | `customize.html` | Chưa quay | — |
| 4 | `SV1-04-proposal-comparison.mp4` | `artisan-suggestions.html` | Chưa quay | — |
| 5 | `SV1-05-checkout-confirmation.mp4` | `cart.html` + `checkout.html` | Chưa quay | — |
| 6 | `SV1-06-customer-dashboard.mp4` | `orders.html` + `order-details.html` | Chưa quay | — |

Ba link SV1 đã cung cấp trong tệp `video` của nhánh `feature/sv1-buyer` (STT 4, 7, 9) **chưa được điền vào bảng chính thức** vì chưa khớp được với 6 dòng kiểm kê. Xem [`../videos/README.md`](../videos/README.md).

---

## 🔎 MINH CHỨNG TRONG MÃ

| Nội dung | Tệp và hàm |
|---|---|
| Danh sách, tìm kiếm, lọc, sắp xếp | `KhachHang/js/main.js` — `initProductList` |
| Trợ lý CraftLink AI | `KhachHang/js/ai-advisor.js` — `aiRunSearch`, `aiSearchAll` |
| Chi tiết sản phẩm | `KhachHang/js/main.js` — `initProductDetail`, `renderProductDetail` |
| Giỏ hàng | `KhachHang/js/main.js` — `initCartPage` |
| Yêu thích | `KhachHang/js/main.js` — `initFavoritesPage`; `KhachHang/favorites.html` `#favorites-empty` |
| Tạo brief | `KhachHang/js/main.js` — `initCustomizePage`, `buildSummary`, `runSummary` |
| Gợi ý nghệ nhân | `KhachHang/js/main.js` — `initArtisanSuggestionsPage` |
| Xác nhận đơn | `KhachHang/js/checkout.js` — `renderStep`, `handleConfirm` |
| Đơn hàng | `KhachHang/js/main.js` — `initOrdersPage` |
| Chi tiết đơn | `KhachHang/js/main.js` — `initOrderDetailsPage` |

---

## ⚠️ VIỆC CẦN NHÓM XÁC NHẬN

1. **6 hay 9 video:** barem 8.1 yêu cầu mỗi màn hình độc lập một video; phản hồi 2026-10-26 yêu cầu SV1 đủ 6 video. Repo có 9 tệp HTML. Cần chốt cách gộp 3 tệp phụ vào 6 video.
2. **Nhánh thực tế:** cả 6 task SV1 nằm trên `feature/sv1-buyer`, không phải 6 nhánh `feature/home-explore`, `feature/product-detail`… như bảng cũ.
3. **Tên AI trong inventory:** bỏ hoặc đánh dấu “chưa triển khai” cho AI Personalization, AI Visual Matcher, AI Proposal Evaluator.
4. **Chuẩn tên tệp:** chuyển sang `role-function-action.html` phải làm đồng bộ cả nhóm trước khi quay video.
5. **Canva:** chốt giữa `DAHZAR9VxmU` và `DAHWyBVvS6U`.
6. **Board:** SV1 được giao dựng board nhưng chưa có link; cần tạo và dán vào `README.md` mục 10.
