# PHÂN CÔNG NHIỆM VỤ CHI TIẾT — SV1 (BUYER)

> **Dự án:** CraftLink — Sàn thương mại điện tử sản phẩm thủ công tùy biến
> **Học phần:** Phát triển ứng dụng Web cơ bản (CSE122) — Nhóm 11
> **Sinh viên phụ trách:** Nguyễn Xuân Hưng — 2551060622
> **Phạm vi:** **10 tệp HTML** trong `KhachHang/` — 9 tệp ứng **6 dòng kiểm kê** (STT 1–6) + `KhachHang/forgot password.html` nằm ngoài bảng 18 dòng
> **Nhánh thực tế:** `feature/sv1-buyer` · **PR #3** đã gộp vào `dev` (`ec74e6b`)
> **Cập nhật:** 2026-10-27

> **Ghi chú sửa đổi 27-10-2026.** Bản 26-10 của tệp này có một số số liệu không khớp cây `main`: ghi 9 tệp HTML, ghi đã dựng `pages/common/` + `pages/buyer/` + `navbar.css` + `footer.css` + `login.html` + `profile.html`, khai "AI gợi ý cá nhân hóa" và giao SV1 viết "AI Copywriter". Các mục đó đã sửa theo mã nguồn thật; phép đo chi tiết ở [`barem-audit.md`](barem-audit.md) mục 6.4, 6.6b và 8. Lịch sử Git không bị viết lại.

---

## 🎨 BẢN THIẾT KẾ GIAO DIỆN CANVA

👉 **Link thiết kế Canva của SV1:** [Bấm vào đây để xem Prototype Canva SV1](https://www.canva.com/design/DAHZAR9VxmU/dQQiBQ9-OPRH6Q5x8DdAkw/edit)

⚠️ Trong tài liệu nhóm còn một link cũ `DAHWyBVvS6U` (`https://www.canva.com/design/DAHWyBVvS6U/eyYrsvv49jN-26FeiXk-Aw/edit`). **SV1 phải chốt một link** và xoá link còn lại ở mọi tệp, đồng thời mở bằng cửa sổ ẩn danh để chắc chắn quyền xem là "Bất kỳ ai có liên kết".

---

## 📋 VAI TRÒ & PHẠM VI

- **Vai trò nghiệp vụ:** Khách hàng (Buyer) trong phân hệ `KhachHang/`, kiêm màn quên mật khẩu dùng chung.
- **Phân tích trách nhiệm hệ thống:**
  - **Khung giao diện của phân hệ:** header (5 liên kết điều hướng, ô tìm kiếm, tin nhắn, giỏ hàng có badge, tài khoản), breadcrumb và footer được khai trong từng trang `KhachHang/*.html` với `KhachHang/css/style.css`. **Chưa có layout dùng chung toàn hệ thống** — mỗi phân hệ SV2/SV3 có bộ CSS riêng, đây là điểm yếu đã ghi ở `barem-audit.md` mục 6.5, không khai là đã thống nhất.
  - **Màn quên mật khẩu:** `KhachHang/forgot password.html` là đích của ba trang đăng nhập theo vai do SV2 phụ trách. Trang là **bản demo**: kiểm tra định dạng email, hiển thị hai bước "Xác nhận email" và "Mở link trong email", **không gửi email và không đổi mật khẩu nào** (câu ghi rõ trong trang).
  - **Trải nghiệm mua sắm & Tùy biến (Buyer Journey):** tìm kiếm — lọc — sắp xếp sản phẩm; xem chi tiết sản phẩm; thêm vào giỏ hoặc danh sách yêu thích; tạo yêu cầu tùy biến (brief) và chọn nghệ nhân; xác nhận đơn 4 bước; theo dõi đơn hàng và gửi yêu cầu chỉnh sửa thiết kế.
  - **Tích hợp giải pháp AI:** ba tính năng của SV1 đều là **luật từ khoá / bộ tiêu chí chạy cục bộ**, **không gọi mô hình** — xem bảng ở mục "AI TÍCH HỢP". Trang không dùng "AI Personalization" hay "AI Visual Matcher"; hai tên này chưa được triển khai ở bất kỳ phân hệ nào.

---

## 🖥️ CẤU TRÚC & PHÂN TÍCH CHI TIẾT CÁC TRANG GIAO DIỆN CỦA BUYER

### 1. Danh sách sản phẩm (index.html) — STT kiểm kê 1
- **Mục đích:** Trang chính: khám phá, tìm kiếm, lọc, sắp xếp, trợ lý tìm kiếm cục bộ.
- **Thành phần chính:**
  1. Header: logo CraftLink, 5 liên kết điều hướng, icon tìm kiếm, tin nhắn, giỏ hàng có badge, tài khoản.
  2. Breadcrumb: Trang chủ → Danh sách sản phẩm.
  3. Tiêu đề trang và khối **CraftLink AI — Tìm kiếm cục bộ** (`#ai-advisor`) kèm gợi ý câu hỏi.
  4. Hai khối kết quả `#ai-product-block` (sản phẩm phù hợp) và `#ai-artisan-block` (nghệ nhân phù hợp).
  5. Bộ lọc bên trái và thanh công cụ kết quả (đếm kết quả, sắp xếp).
  6. Lưới các thẻ sản phẩm + trạng thái rỗng.
  7. Footer.

### 2. Chi tiết sản phẩm (product-detail.html) — STT 2
- **Mục đích:** Xem ảnh, mô tả, đánh giá; chọn số lượng, thêm giỏ, yêu thích.
- **Thành phần chính:**
  - Breadcrumb có tên sản phẩm.
  - Thư viện ảnh: ảnh lớn + dãy ảnh nhỏ.
  - Thông tin: tên, mô tả ngắn, giá, thông số tùy biến, mô tả.
  - Bộ chọn số lượng 1–99.
  - Nút **Thêm vào giỏ hàng** và nút trái tim yêu thích.
  - Panel nghệ nhân: ảnh, tên, địa điểm, số sản phẩm mẫu.
  - Nút **Tạo brief tùy biến** và **Báo cáo listing**.
  - Danh sách đánh giá.

### 3. Tạo brief tùy biến (customize.html) — STT 3
- **Mục đích:** Nhập yêu cầu, tạo bản tóm tắt cục bộ, chấp nhận brief.
- **Thành phần chính:**
  - Link **Đổi sản phẩm**.
  - Bộ chọn số lượng.
  - Textarea mô tả tối đa 1000 ký tự + bộ đếm ký tự.
  - Ô chọn ảnh tham khảo (tùy chọn).
  - Nút **Tạo bản tóm tắt**.
  - Panel kết quả: Chấp nhận, Sửa, Từ chối, Tạo lại, Lưu.
  - Khối "Căn cứ tạo bản tóm tắt" (giải thích luật cục bộ, không phải mô hình).

### 4. Gợi ý nghệ nhân (artisan-suggestions.html) — STT 4
- **Mục đích:** Lọc hồ sơ nghệ nhân theo sản phẩm và brief đã nhập, chọn nghệ nhân.
- **Điều kiện dữ liệu:** cần bản nháp brief (và bản nháp checkout nếu có) trong `localStorage`; thiếu thì hiện trạng thái rỗng (`#suggestions-empty`).
- **Thành phần chính:**
  - Danh sách thẻ nghệ nhân: ảnh/ảnh chữ cái đầu, tên, mô tả, danh sách **lý do gợi ý**, địa điểm, số sản phẩm mẫu.
  - Cột phải thẻ: nút **Chọn nghệ nhân**, **Bỏ qua**, **Tạo lại**.
  - Trạng thái rỗng có tiêu đề và mô tả riêng.
- **Thao tác CRUD:** `Read` (xem danh sách gợi ý), `Update` (chọn nghệ nhân và lưu vào brief).

### 5. Giỏ hàng (cart.html) — STT 5
- **Mục đích:** Xem, tăng/giảm, xóa sản phẩm, tính tạm tính.
- **Thành phần chính:**
  - Danh sách sản phẩm trong giỏ: ảnh, tên, nghệ nhân, đơn giá.
  - Bộ tăng/giảm số lượng, thành tiền từng dòng, nút Xóa.
  - Cột tóm tắt: tạm tính, phí giao hàng, tổng cộng.
  - Nút **Tiến hành đặt hàng** và trạng thái giỏ trống.
- **Thao tác CRUD:** `Read`, `Update` (số lượng), `Delete` (xóa dòng).

### 6. Xác nhận đơn (checkout.html) — STT 5
- **Mục đích:** Checkout 4 bước, nhận hai lối vào: từ brief tùy biến và từ giỏ hàng (`?mode=cart` — nhiều sản phẩm trong giỏ).
- **Thành phần chính:**
  1. **Xem lại yêu cầu tùy biến** (brief đã chấp nhận).
  2. **Thông tin nhận hàng:** số điện thoại, địa chỉ, lỗi hiển thị cạnh trường.
  3. **Thanh toán & giao hàng:** COD hoặc chuyển khoản; giao tiêu chuẩn hoặc nhanh.
  4. **Xác nhận thông tin** → trạng thái "Đã ghi nhận xác nhận trên trình duyệt".
  - Cột **Tóm tắt đơn** luôn hiển thị.
- **Thao tác CRUD:** `Create` (tạo bản ghi xác nhận trong trình duyệt), `Read` (xem lại brief và tóm tắt).

### 7. Sản phẩm yêu thích (favorites.html) — STT 1
- **Mục đích:** Danh sách sản phẩm đã lưu, bỏ yêu thích.
- **Thành phần chính:** lưới thẻ sản phẩm (`#favorites-grid`), nút bỏ yêu thích trên từng thẻ, trạng thái rỗng (`#favorites-empty`).
- **Thao tác CRUD:** `Read`, `Delete` (bỏ yêu thích).

### 8. Đơn hàng (orders.html) — STT 6
- **Mục đích:** Tab trạng thái, tìm kiếm, lọc thời gian, hủy đơn mô phỏng.
- **Thành phần chính:**
  - 6 tab: Tất cả · Chờ proposal · Đang làm · Chỉnh sửa · Hoàn thành · Đã hủy.
  - Ô tìm kiếm và bộ lọc thời gian.
  - Danh sách đơn + trạng thái rỗng.
- **Thao tác CRUD:** `Read`, `Update` (hủy đơn mô phỏng).

### 9. Chi tiết đơn và revision (order-details.html) — STT 6
- **Mục đích:** Xem tiến độ, so sánh phương án, lưu nháp yêu cầu chỉnh sửa.
- **Thành phần chính:**
  - Thông tin đơn: sản phẩm, mã đơn, nghệ nhân, ngày đặt, trạng thái, tổng tiền.
  - Timeline lịch sử đề xuất và chỉnh sửa.
  - So sánh phương án trước và hiện tại.
  - Textarea yêu cầu chỉnh sửa mới.
  - Các bước tiếp theo.
  - Nút **Chọn phương án hiện tại** (quay về `orders.html`) và **Gửi yêu cầu chỉnh sửa**.
- **Thao tác CRUD:** `Read`, `Update` (lưu nháp/chọn phương án).

### 10. Khôi phục mật khẩu (forgot password.html) — ngoài kiểm kê
- **Mục đích:** Đích đến của liên kết "Quên mật khẩu" ở ba trang đăng nhập (`DangNhapVaDangKy/01-dang-nhap/khach-hang.html`, `nghe-nhan.html`, `quan-tri.html`).
- **Thành phần chính:**
  - Form email đã đăng ký, kiểm tra định dạng, lỗi hiển thị trong `#emailAlert`.
  - Khối `role="note"` ghi rõ **bản demo, không có dịch vụ email, không đổi mật khẩu**.
  - Hai bước: "Xác nhận email" và "Mở link trong email" (bước 2 khoá, chỉ minh hoạ).
- **Trạng thái:** chạy được từ hotfix `960a548`; chưa có chức năng đặt lại mật khẩu thật.
- **Việc còn lại:** đổi tên tệp + CSS sang chuẩn `role-function-action` (tên đang có dấu cách, phải mã hoá `%20` trong liên kết).

---

## 🤖 AI TÍCH HỢP — KHAI BÁO TRUNG THỰC

| Tính năng | Tệp | Có gọi mô hình? | Kết luận |
|---|---|---|---|
| CraftLink AI — tư vấn sản phẩm/nghệ nhân | `KhachHang/index.html` + `KhachHang/js/ai-advisor.js` | **Không** | Luật từ khóa cục bộ. Đầu tệp ghi: "Đây KHÔNG phải AI tạo sinh và KHÔNG gọi API bên ngoài." Điểm khớp là điểm tiêu chí, không phải xác suất. |
| Bản tóm tắt brief | `KhachHang/customize.html` + `KhachHang/js/main.js` (`buildSummary`, `runSummary`) | **Không** | Luật cục bộ; có đủ UI 6 bước nhưng không phải AI tạo sinh. |
| Gợi ý nghệ nhân | `KhachHang/artisan-suggestions.html` | **Không** | Trang ghi rõ "bộ lọc tiêu chí cục bộ, chưa kết nối mô hình AI tạo sinh". Không khai là AI. |

**Ba tuyên bố AI trong bảng kiểm kê cũ chưa có mã tương ứng:** AI Personalization, AI Visual Matcher, AI Proposal Evaluator. Không được khai là đã triển khai; sửa thành "định hướng, chưa triển khai" hoặc bỏ.

Chi tiết prompt, lỗi đã sửa và mức bằng chứng: xem [`ai-usage-report.md`](ai-usage-report.md) mục 3.1.

---

## 📑 NHẬT KÝ TIẾN ĐỘ (CHECKLIST)

- [x] Hoàn thành thiết kế Prototype 6 màn hình trên Canva
- [x] Dựng 10 tệp HTML của phân hệ: 9 tệp cho 6 dòng kiểm kê + trang quên mật khẩu
- [x] CSS riêng cho từng màn (`KhachHang/css/*.css`) và `KhachHang/css/style.css` cho header/footer
- [x] JavaScript dùng chung `KhachHang/js/main.js`, `common.js`, `data.js`
- [x] Trợ lý tìm kiếm cục bộ `KhachHang/js/ai-advisor.js` (không gọi mô hình)
- [x] Bản tóm tắt brief cục bộ (`buildSummary`, `runSummary`)
- [x] Checkout 4 bước (`KhachHang/js/checkout.js`)
- [x] Trang quên mật khẩu chạy được ở dạng demo (hotfix `960a548`, không gửi email)
- [x] Dán 3 link video OBS và khớp vào STT 2 / 4 / 5 (xem mục Video bên dưới)
- [ ] **Đổi tên** `KhachHang/forgot password.html` + `KhachHang/css/forgot password.css` sang chuẩn `role-function-action` (ví dụ `buyer-password-recovery.html`) rồi cập nhật 3 liên kết ở trang đăng nhập
- [ ] **Sửa tràn ngang ở 320 px** trên hai trang của mình: `customize.html` (338 px, do `section.panel.customize-input-panel`) và `forgot password.html` (323 px, do `button.pw-toggle`) — thêm `min-width: 0` / `overflow-wrap: anywhere`
- [ ] **Chốt một link Canva** giữa `DAHZAR9VxmU` và `DAHWyBVvS6U`
- [ ] **Xử lý hai tệp trùng:** `docs/ai-usage -report.md` (9 952 byte, tên có dấu cách, nội dung **khác** `docs/ai-usage-report.md`) phải gộp chữ rồi mới xoá; `video.md` ở gốc repo trùng nội dung với `videos/README.md`
- [ ] **Xác nhận ánh xạ 3 video** "4/7/9" (số thứ tự nội bộ trong 9 tệp Buyer, không phải STT kiểm kê)
- [ ] **Bổ sung số phiên bản công cụ AI** vào mục 3.1 của `docs/ai-usage-report.md`
- [ ] **Từ nay commit theo Conventional Commits**: đo tại mốc `960a548`, 24 commit không-merge gắn tài khoản `hungxuan0411-cloud` có **0** commit đúng chuẩn (mục 3.2 của `barem-audit.md`); từ 27-10 các commit tài liệu đã theo `docs:`. Không viết lại lịch sử — chỉ cần giải thích khi Vấn đáp

> Các mục đã bỏ khỏi checklist vì không có thật trong repo: `pages/common/`, `pages/buyer/`, `navbar.css`, `footer.css`, `login.html`, `profile.html`, thư mục `js/ai/`, và việc "viết AI Copywriter" (thuộc SV2) hay "dán link Canva vào `docs/sv2-assignment.md`" (thuộc SV2).

---

## 🎥 VIDEO OBS — ÁNH XẠ BẮT BUỘC

| STT | Tệp bắt buộc | Màn hình | Trạng thái | Link |
|---|---|---|---|---|
| 1 | `SV1-01-home-explore.mp4` | `index.html` (kèm `favorites.html`) | Không quay riêng — nằm trong phạm vi demo | — |
| 2 | `SV1-02-product-detail.mp4` | `product-detail.html` | **Đã có link** | <https://www.youtube.com/watch?v=PaCFXYhuo9U> |
| 3 | `SV1-03-custom-order-brief.mp4` | `customize.html` | Không quay riêng — nằm trong phạm vi demo | — |
| 4 | `SV1-04-artisan-suggestions.mp4` | `artisan-suggestions.html` | **Đã có link** | <https://www.youtube.com/watch?v=AW-wuwhA3zc> |
| 5 | `SV1-05-checkout-confirmation.mp4` | `cart.html` + `checkout.html` | **Đã có link** | <https://www.youtube.com/watch?v=T6ejhOOqfgk> |
| 6 | `SV1-06-customer-dashboard.mp4` | `orders.html` + `order-details.html` | Không quay riêng — nằm trong phạm vi demo | — |

**Cách khớp số:** ba số "4 / 7 / 9" trong tệp `video.md` là **số thứ tự nội bộ trong 9 tệp Buyer**, không phải STT kiểm kê. Tiêu đề công khai của ba video (đọc qua YouTube oEmbed ngày 26-10-2026) là `artisan suggetion.html`, `cart html`, `product detail html`; sau khi đối chiếu tiêu đề, ba link được xếp vào **STT 2 / 4 / 5** như bảng trên. Tệp lưu trữ của video STT 4 cần đổi tên từ `SV1-04-proposal-comparison.mp4` thành `SV1-04-artisan-suggestions.mp4` (tên cũ là của màn so sánh proposal đã bỏ). Danh sách chính thức: [`../videos/README.md`](../videos/README.md).

---

## 🔎 MINH CHỨNG TRONG MÃ

| Nội dung | Tệp và hàm |
|---|---|
| Danh sách, tìm kiếm, lọc, sắp xếp | `KhachHang/js/main.js` — `initProductList` |
| Trợ lý CraftLink AI | `KhachHang/js/ai-advisor.js` — `aiRunSearch`, `aiSearchAll` |
| Chi tiết sản phẩm | `KhachHang/js/main.js` — `initProductDetail`, `renderProductDetail` |
| Giỏ hàng | `KhachHang/js/main.js` — `initCartPage` |
| Yêu thích | `KhachHang/js/main.js` — `initFavoritesPage`, `initFavoriteButton`; `KhachHang/favorites.html` `#favorites-empty` |
| Tạo brief | `KhachHang/js/main.js` — `initCustomizePage`, `buildSummary`, `runSummary` |
| Gợi ý nghệ nhân | `KhachHang/js/main.js` — `initArtisanSuggestionsPage` |
| Xác nhận đơn | `KhachHang/js/checkout.js` — `renderStep`, `handleConfirm` |
| Đơn hàng | `KhachHang/js/main.js` — `initOrdersPage` |
| Chi tiết đơn | `KhachHang/js/main.js` — `initOrderDetailsPage` |
| Quên mật khẩu | `KhachHang/forgot password.html` — script nội tuyến kiểm tra email + thông báo demo |
| Hàm dùng chung (escape HTML, toast, báo lỗi trường, phiên đăng nhập) | `KhachHang/js/common.js` (tệp **có tồn tại**; dữ liệu giỏ/yêu thích nằm trong `main.js`) |

---

## ⚠️ VIỆC CẦN NHÓM XÁC NHẬN

1. **6 hay 9 video:** barem 8.1 yêu cầu mỗi màn hình độc lập một video; thoả thuận với giảng viên là **3 video/người**. SV1 có **10 tệp HTML** (9 tệp cho 6 dòng kiểm kê + trang quên mật khẩu), đã quay 3 video cho STT 2/4/5; ba dòng còn lại ghi "Không quay riêng — nằm trong phạm vi demo". Cần giữ văn bản xác nhận của giảng viên.
2. **Nhánh thực tế:** cả 6 task SV1 nằm trên `feature/sv1-buyer`, không phải 6 nhánh `feature/home-explore`, `feature/product-detail`… như bảng cũ.
3. **Tên AI trong inventory:** bảng kiểm kê hiện tại đã đổi sang tên đúng với mã (`AI tư vấn sản phẩm`, `AI Brief Assistant` — đều là bộ quy tắc cục bộ); ba tên cũ AI Personalization, AI Visual Matcher, AI Proposal Evaluator phải giữ ở dạng "chưa triển khai" hoặc bỏ hẳn.
4. **Chuẩn tên tệp:** chuyển sang `role-function-action.html` phải làm đồng bộ cả nhóm trước khi quay video lại.
5. **Canva:** chốt giữa `DAHZAR9VxmU` và `DAHWyBVvS6U`; mở bằng cửa sổ ẩn danh để kiểm quyền xem.
6. **Board:** board đã có và công khai — <https://trello.com/b/N2HBpswf> (5 cột, 29 thẻ). SV1 chỉ cần chuyển thẻ khi có link video mới, không phải dựng board từ đầu.
