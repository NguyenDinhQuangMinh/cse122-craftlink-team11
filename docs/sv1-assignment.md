# PHÂN CÔNG NHIỆM VỤ CHI TIẾT — SV1 (BUYER)

> **Dự án:** CraftLink — Sàn thương mại điện tử sản phẩm thủ công tùy biến
> **Học phần:** Phát triển ứng dụng Web cơ bản (CSE122) — Nhóm 11
> **Sinh viên phụ trách:** Nguyễn Xuân Hưng — 2551060622
> **Phạm vi:** 9 tệp HTML trong `KhachHang/` (6 dòng kiểm kê)
> **Nhánh thực tế:** `feature/sv1-buyer` · **PR:** #3
> **Cập nhật:** 2026-10-26

---

## 🎨 BẢN THIẾT KẾ GIAO DIỆN CANVA

👉 **Link thiết kế Canva của SV1:** [Bấm vào đây để xem Prototype Canva SV1](https://www.canva.com/design/DAHZAR9VxmU/dQQiBQ9-OPRH6Q5x8DdAkw/edit)

---

## 📋 VAI TRÒ & PHẠM VI

- **Vai trò nghiệp vụ:** Khách hàng (Buyer) và Khung giao diện chung Toàn hệ thống (General Layout).
- **Phân tích trách nhiệm hệ thống:**
  - **Xây dựng khung giao diện dùng chung (Common Layout):** Thiết kế và phát triển các thành phần dùng chung cho toàn hệ thống bao gồm Header (Thanh điều hướng, ô tìm kiếm, giỏ hàng, thông báo, menu tài khoản), Footer (Chính sách, liên hệ, mạng xã hội).
  - **Hệ thống xác thực người dùng (Auth Flow):** Xây dựng giao diện quên mật khẩu hỗ trợ phân loại vai trò người dùng (Buyer / Maker).
  - **Trải nghiệm mua sắm & Tùy biến (Buyer Journey):** Phát triển luồng mua hàng toàn diện từ Tìm kiếm, lọc, sắp xếp sản phẩm , Xem chi tiết một sản phẩm , Thêm sản phẩm vào giỏ hàng hoặc danh sách yêu thích , Tạo yêu cầu tùy biến (brief) và chọn nghệ nhân , Xác nhận đơn qua 4 bước , Theo dõi đơn hàng và gửi yêu cầu chỉnh sửa thiết kế.

  - **Tích hợp giải pháp AI:** Ứng dụng mô hình AI gợi ý cá nhân hóa để phân tích sở thích nghệ thuật và lịch sử tương tác, từ đó đề xuất các tác phẩm thủ công phù hợp nhất cho Khách hàng.
 

---

## 🖥️ CẤU TRÚC & PHÂN TÍCH CHI TIẾT CÁC TRANG GIAO DIỆN CỦA BUYER

### 1. Danh sách sản phẩm(INDEX.HTML)
-Mục đích :Trang chính: khám phá, tìm kiếm, lọc, sắp xếp, trợ lý tìm kiếm cục bộ
-Thành phần chính :
      1. Header: logo CraftLink, 5 liên kết điều hướng, icon tìm kiếm, tin nhắn, giỏ hàng có badge, tài khoản.
      2. Breadcrumb: Trang chủ → Danh sách sản phẩm.
      3. Tiêu đề trang và ô tìm kiếm.
      4. Khối **CraftLink AI — Tìm kiếm cục bộ**.
      5. Bộ lọc bên trái:
      6. Thanh công cụ kết quả:
      7. Lưới các thẻ sản phẩm.
      8. Footer.
    

### 2. Chi tiết sản phẩm (product-detail.html)
- **Mục đích : Xem ảnh, mô tả, đánh giá, chọn số lượng, thêm giỏ, yêu thích
- Thành phần chính :
      + Breadcrumb có tên sản phẩm.
      + Thư viện ảnh: ảnh lớn + dãy ảnh nhỏ.
      + Thông tin: tên, mô tả ngắn, giá, thông số tùy biến, mô tả.
      + Bộ chọn số lượng 1–99.
      + Nút **Thêm vào giỏ hàng**.
      + Nút trái tim yêu thích.
      + Panel nghệ nhân: ảnh, tên, địa điểm, điểm sản phẩm, số sản phẩm mẫu.
      + Nút **Tạo brief tùy biến**.
      + Nút **Báo cáo listing**.
      + Danh sách đánh giá.

### 3. Tạo brief tùy biến(customize.html)
- **Mục đích: Nhập yêu cầu, tạo bản tóm tắt cục bộ, chấp nhận brief
- Thành phần chính :
      + Link **Đổi sản phẩm**.
      + Bộ chọn số lượng.
      + Textarea mô tả, tối đa 1000 ký tự.
      + Bộ đếm ký tự.
      + Ô chọn ảnh tham khảo.
      + Nút **Tạo bản tóm tắt**.
      + Panel kết quả với các nút: Chấp nhận, Sửa, Từ chối, Tạo lại, Lưu.
      + Ghi chú giải thích cách hoạt động.

### 4. Gợi ý nghệ nhân(artisan-suggestions.html)
- **Mục đích:** Lọc hồ sơ nghệ nhân theo sản phẩm và brief, chọn nghệ nhân
- **Thành phần giao diện:
      + Có bản nháp checkout.
      + Có brief đã nhập.
      + acceptedBrief === brief
- **Thao tác CRUD:** `Read` (Xem danh sách sản phẩm trong giỏ), `Update` (Sửa số lượng hoặc tùy chọn sản phẩm), `Delete` (Xóa sản phẩm/yêu cầu khỏi giỏ).

### 5. `Giỏ hàng(cart.html)
- **Mục đích:Xem, tăng/giảm, xóa sản phẩm, tính tạm tính
- **Thành phần giao diện:
      Danh sách sản phẩm trong giỏ.
      + Ảnh, tên, nghệ nhân, đơn giá.
      + Bộ tăng/giảm số lượng.
      + Thành tiền từng dòng.
      + Nút Xóa.
      + Cột tóm tắt: tạm tính, phí giao hàng, tổng cộng.
      + Nút **Tiến hành đặt hàng**.
      + Trạng thái giỏ trống.

### 6. Xác nhận đơn	(checkout.html)
- **Mục đích:** Checkout 4 bước cho một sản phẩm tùy biến hoặc nhiều sản phẩm trong giỏ
- **Thành phần giao diện:** Form cập nhật thông tin cá nhân (Avatar, Họ tên, SĐT, Email), Bảng quản lý danh sách địa chỉ nhận hàng, Tùy chọn đổi mật khẩu và thiết lập thông báo.
- **Thao tác CRUD:** `Read` (Hiển thị thông tin cá nhân), `Update` (Cập nhật thông tin hồ sơ/thay đổi mật khẩu).

### 7.Sản phẩm yêu thích	(favorites.html)
-  **Mục đích: Danh sách sản phẩm đã lưu, bỏ yêu thích

### 8.Đơn hàng	(orders.html)
- **Mục đích : Tab trạng thái, tìm kiếm, lọc thời gian, hủy đơn mô phỏng

### 9.Chi tiết đơn và revision	(order-details.html)
- **Mục đích : Xem tiến độ, so sánh phương án, lưu nháp yêu cầu chỉnh sửa
- **Thành phần giao diện :
      + Thông tin đơn: sản phẩm, mã đơn, nghệ nhân, ngày đặt, trạng thái, tổng tiền.
      + Timeline lịch sử đề xuất và chỉnh sửa.
      + So sánh phương án trước và hiện tại.
      + Textarea yêu cầu chỉnh sửa mới.
      + Các bước tiếp theo.
      + Nút **Chọn phương án hiện tại** (quay về `orders.html`).
      + Nút **Gửi yêu cầu chỉnh sửa**.
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

- [x] Hoàn thành thiết kế Prototype 6 màn hình trên Canva
- [x] Tích hợp liên kết Canva `https://www.canva.com/design/DAHWyBVvS6U/eyYrsvv49jN-26FeiXk-Aw/edit` vào hồ sơ dự án
- [X] Khởi tạo cấu trúc thư mục `pages/common/` và `pages/buyer/`
- [X] Dựng khung HTML/CSS dùng chung toàn hệ thống (`navbar.css`, `footer.css`, `style.css`)
- [X] Cắt file HTML cho 3 màn hình chung (`index.html`, `login.html`, `profile.html`)
- [X] Cắt file HTML cho 3 màn hình Khách hàng 
- [ ] Viết mã mô phỏng tính năng AI gợi ý sản phẩm trong `js/ai/`
- [X] Kiểm tra hiển thị Responsive trên Desktop và Mobile
- [x] Thiết kế Prototype  màn hình trên Canva
- [x] Dán liên kết Canva vào tài liệu `docs/sv2-assignment.md` và `docs/team-assignment.md`
- [X] Tạo khung HTML/CSS cho phân hệ người mua.
- [X] Hoàn thiện HTML/CSS cho 9 màn hình phụ trách
- [ ] Viết mã mô phỏng tính năng AI Copywriter (`js/ai/`)
- [X] Kiểm tra hiển thị Responsive trên các thiết bị

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
