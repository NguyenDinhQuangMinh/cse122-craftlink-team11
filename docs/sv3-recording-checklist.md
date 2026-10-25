# Kịch bản quay OBS của SV3 — 3 video, 8 bước bắt buộc

Mở tệp này song song với OBS. Mỗi video quay **liền mạch 1 lần**, không cắt ghép. Mục tiêu thời lượng: **4 – 6 phút/video** (dưới 4 phút thường không đủ-cover cả 8 bước).

Barem liên quan: tiêu chí **8.1 Bộ video OBS (0.50đ)** — tên tệp theo chuẩn và **đủ 8 bước trong mỗi video**; thiếu bước 1 → video đó **0.00đ**; chỉ quay sản phẩm chạy được mà không giải thích code và không sửa trực tiếp → **−0.25đ**.

## Trước khi bấm nút ghi (làm một lần, 5 phút)

- [ ] **Webcam** vào Settings → Video: chọn đúng camera, thấy rõ mặt bạn trong khung. Audio Input Control → chọn mic bạn thật sự nói (không phải "Default").
- [ ] **Scene** chỉ có 2 nguồn: `Window Capture: VS Code` (hoặc Display Capture) và `Video Capture Device: webcam`. Bỏ mọi tab nhạy cảm (mail, GitHub token, `.env`).
- [ ] **Trình duyệt**: bật DevTools (F12) sẵn ở tab sẽ demo, tab Network mở sẵn để bước "Error state" khỏi mất thời gian tìm.
- [ ] **Canva**: mở 3 trang mockup tương ứng ở tab riêng, chế độ **present/link "Anyone with the link can view"** — bước 2 phải show được ngay.
- [ ] **VS Code**: mở sẵn 3 folder `KiemDuyetVaQuanTri/04-moderation-queue`, `02-category-management`, `06-content-guidelines`. Tắt extension gợi ý pop-up.
- [ ] **git** sạch: `git status` không còn thay đổi lặt vặt ngoài đúng tệp bạn định sửa cho live edit.
- [ ] Log nói nhỏ đầu video: ngày, họ tên, MSSV, STT màn hình — sau này cắt làm caption cũng tiện.

## Map nhanh

| Video | Tên tệp bắt buộc | Màn hình (STT) | Mockup Canva | Live edit sẽ quay |
|---|---|---|---|---|
| 1 | `SV3-02-admin-moderation-queue.mp4` | Hàng đợi kiểm duyệt — STT 14 | trang STT 14 + trang AI dialog | `04-moderation-queue/js/main.js` |
| 2 | `SV3-04-admin-category-management.mp4` | Quản lý danh mục — STT 16 | trang STT 16 (mobile 375px) | `02-category-management/index.html` + `js/main.js` |
| 3 | `SV3-06-admin-content-policy.mp4` | Quy định nội dung — STT 18 | trang STT 18 (mobile 375px) | `06-content-guidelines/index.html` + `css/page.css` |

Task ID đọc ở bước 8: dùng **`SV3-STT14` / `SV3-STT16` / `SV3-STT18`** (theo số dòng trong `../docs/screen-inventory.md`). Nhóm **chưa mở GitHub Issue** nào, nên không được đọc số issue giả — nếu giảng viên hỏi thì nói rõ Task ID ánh xạ theo STT của bảng kiểm kê và theo PR #1.

Branch cho cả 3 video: `feature/sv3-admin-screens`.

---

## VIDEO 1 — STT 14 · Hàng đợi kiểm duyệt sản phẩm

**B1 (webcam + giọng):** giới thiệu tên, MSSV, màn hình số 14.
**B2 (mockup):** mở trang Canva STT 14 → nói "đây là thiết kế, đây là bản chạy thật" → chuyển trình duyệt. Kèm trang mockup mobile 375px nếu nhóm đã dán vào Canva.
**B3 (mở tệp):** `KiemDuyetVaQuanTri/04-moderation-queue/index.html`, `css/page.css`, `js/main.js`.
**B4 (giải thích bố cục + thuật toán) — nói theo 4 ý này:**
- `index.html`: `<header> <nav> <main>` + `<dialog>` cho panel chi tiết; danh sách sản phẩm là `<section id="queue">`, filter là các `<button data-filter>`.
- CSS: biến trong `:root`, grid 2 cột (sidebar + nội dung), media query `@media (max-width: 900px)` dồn về 1 cột.
- JS `js/main.js:183-225` `render()`: đọc `CraftLinkAPI.load("products")` → **lọc** theo `data-filter` + từ khóa → **sắp xếp** bằng `ageMinutes()` (`js/main.js:177-181`, parse "2 giờ trước" ra số phút) → **`esc()`** từng chuỗi trước khi nối HTML (chống XSS — nhấn mạnh điểm này).
- Lưu: `CraftLinkAPI.save("products", ...)` ghi `localStorage` key `craftlink:data:v1:products`.
- AI: `js/ai-client.js` hộp thoại 6 bước (Input → Processing → Output → Explain → Control → Save), task `moderation-risk`.
**B5 — LIVE EDIT (đã kiểm chứng, chắc chắn chạy được):** `js/main.js:254-258`, hàm `showDetail()`:
```js
"Trạng thái: " +
(item.status === "pending" ? "Đang chờ kiểm duyệt" : item.status);
```
Nói: *"Với sản phẩm đã duyệt, chỗ này in tiếng Anh `approved` ra màn hình — lỗi giao diện tiếng Việt."* → sửa thành dùng bảng nhãn tiếng Việt đã có ở `render()` (`js/main.js:200-205`), ví dụ:
```js
"Trạng thái: " +
({ pending: "Đang chờ kiểm duyệt", approved: "Đã duyệt",
   revision: "Cần chỉnh sửa", rejected: "Đã từ chối" }[item.status] || item.status);
```
**B6 (chạy thử):** duyệt 1 sản phẩm (nút Duyệt, có rollback nếu đổi ý) → mở lại "Xem quyết định" → chỉ ra `Đã duyệt` thay vì `approved`. Rồi kéo cửa sổ trình duyệt xuống **375px và 320px** → sidebar ẩn, thẻ xếp 1 cột. Kiểm tra 3 trạng thái rỗng/lỗi/loading:
- Empty: gõ từ khóa không tồn tại vào ô tìm (ví dụ `zzzz`) → "Không có sản phẩm nào".
- Loading / Error: DevTools → Network → **Offline** → F5 → trạng thái lỗi hiện; tắt Offline → F5 → dữ liệu lại.
- AI: mở hộp thoại 6 bước trên 1 sản phẩm đang chờ → cho chạy → **đọc dòng "Nguồn:"** để nói rõ kết quả đến từ mô hình hay từ bộ quy tắc cục bộ (khóa AI đặt ở server, máy quay không có key thì fallback tất định — nói thẳng, đừng nói là GPT).
**B7 (git):**
```
git add KiemDuyetVaQuanTri/04-moderation-queue/js/main.js
git commit -m "fix(moderation): reuse Vietnamese status labels in decision detail"
git push
```
**B8 (đọc):** `Task ID SV3-STT14 · nhánh feature/sv3-admin-screens · commit` + kết quả `git log --oneline -1`.

---

## VIDEO 2 — STT 16 · Quản lý danh mục ngành hàng

**B2 (mockup):** trang Canva STT 16, **nhấn mạnh bản mobile 375px** — đây là bằng chứng ĐK1 "mockup có cả desktop và mobile".
**B3:** `KiemDuyetVaQuanTri/02-category-management/index.html`, `js/main.js`.
**B4:**
- Bảng danh mục: `<table>` với cột Tên / Danh mục cha / Số sản phẩm / Trạng thái / Thao tác; `<select>` cha, `<input type="number">`, `<input type="file">` cho ảnh.
- JS: `readCount()` ở `js/main.js:158-166` (chặn số âm, khoảng 0–50 cho thứ tự, 0–9999 cho số sản phẩm); chặn **trùng tên** ở `js/main.js:284`; `render()` + comparator sắp xếp `js/main.js:107-111`.
- Ảnh: `encodeImage` trong `js/api.js` — resize ≤1000px, JPEG chất lượng 0.76, chặn >5MB, chỉ nhận JPG/PNG/WebP → **localStorage không phình**. Đây là điểm nói về "xử lý dữ liệu".
- Xóa có **rollback** (`js/main.js:247-256`) — nhấn mạnh nghiệp vụ: xóa nhầm hoàn tác được.
**B5 — LIVE EDIT (đã kiểm chứng):** thêm kiểu sắp xếp mới "Nhiều danh mục con nhất".
- `index.html:163-167` `<select id="categorySort">` → thêm 1 dòng `<option value="children-desc">Nhiều danh mục con nhất</option>` sau option `products-desc`.
- `js/main.js:107-111` comparator → thêm nhánh `else if (sort === "children-desc") return (b.childrenCount ?? 0) - (a.childrenCount ?? 0);` (đọc tên biến đếm con thực tế trong `render()` ngay lúc quay).
**B6:** chọn option mới → bảng đổi thứ tự ngay. Thêm danh mục thử → sửa → ẩn/hiện → xóa → bấm hoàn tác. Upload 1 ảnh thật (≤5MB) rồi upload 1 tệp >5MB → chặn. Kéo 375px. Trạng thái Empty (tìm `zzzz`) / Error (Offline + F5) / Loading.
**B7:**
```
git add KiemDuyetVaQuanTri/02-category-management
git commit -m "feat(categories): sort by number of subcategories"
git push
```
**B8:** `Task ID SV3-STT16 · nhánh feature/sv3-admin-screens · commit` + `git log --oneline -1`.

---

## VIDEO 3 — STT 18 · Quản lý quy định và tiêu chuẩn nội dung

**B2 (mockup):** trang Canva STT 18 (mobile 375px).
**B3:** `KiemDuyetVaQuanTri/06-content-guidelines/index.html`, `js/main.js`, `css/page.css`.
**B4:**
- Bố cục: `index.html` có `<header> <nav> <main>` và phần thân là **danh sách quy định** + **form soạn thảo** (soạn nháp → quản trị viên sửa → xác nhận xuất bản, đúng mô tả kiểm kê).
- JS validate: `js/main.js:137-175` — tiêu đề ≥2 ký tự, nội dung ≥8 ký tự, chặn trùng tên quy định (`:160`).
- AI `policy-copilot`: `js/main.js:208-235` `apply()` — kiểm tra trùng tiêu đề, chặn bản nháp rỗng, và **rollback bằng `rules.shift()`** nếu áp dụng nhầm. Nói rõ: AI chỉ **soạn nháp**, quyết định xuất bản vẫn là con người (đúng yêu cầu 6.2 "AI hỗ trợ, không thay quyết định").
**B5 — LIVE EDIT (đã kiểm chứng):** thiếu thẻ `<footer>` ngữ nghĩa. `grep -c "<footer"` trả về **0 trên cả 7 tệp HTML** của phân hệ, trong khi checklist yêu cầu `<header> <nav> <main> <footer>`. Sửa:
- `06-content-guidelines/index.html`: chèn ngay sau `</main>` (dòng 189):
```html
<footer class="page-footer">
  <p>Phân hệ Kiểm duyệt và Quản trị — CSE122 CraftLink · SV3 Nguyễn Đình Quang Minh</p>
</footer>
```
- `css/page.css`: thêm `.page-footer { padding: 16px 24px; border-top: 1px solid var(--line); color: var(--muted); font-size: .85rem; }`
Nói lý do trước khi sửa: "thẻ ngữ nghĩa đủ bộ để trình đọc màn hình điều hướng được, và barem yêu cầu đủ 4 thẻ".
**B6:** chạy thử: soạn quy định mới → để tiêu đề 1 ký tự → báo lỗi validate → điền đủ → lưu → sửa → xuất bản → xem lịch sử phiên bản. Bấm AI Soạn nháp, đọc **"Nguồn:"** và "Độ tin cậy", rồi bấm rollback để xóa nháp AI vừa chèn. Kéo 375px/320px: footer vẫn readable, nav thành menu. Empty/Error/Loading như hướng dẫn video 1.
**B7:**
```
git add KiemDuyetVaQuanTri/06-content-guidelines
git commit -m "feat(policy): add page footer for semantic completeness"
git push
```
**B8:** `Task ID SV3-STT18 · nhánh feature/sv3-admin-screens · commit` + `git log --oneline -1`.

---

## Sau khi quay

- [ ] Settings → Output → Recording Format: **mp4**, Encoder **Hardware (NVENC/AMF)** nếu có; nếu file >100 MB thì **đừng push lên GitHub** — upload YouTube ở chế độ **Không công khai (Unlisted)** rồi dán link vào `../videos/README.md` ở cột "Link".
- [ ] Đổi tên đúng chuẩn `SV3-02-admin-moderation-queue.mp4`, `SV3-04-admin-category-management.mp4`, `SV3-06-admin-content-policy.mp4`.
- [ ] Xem lại từng video theo checklist 8 bước; video nào thiếu bước thì quay bổ sung **trước khi PR được merge**.
- [ ] PR #1 cần 2 teammate review; sau khi push 3 commit live-edit, vào tab **Files changed** của PR để họ thấy thay đổi mới.

## Ba rủi ro mất điểm lớn nhất

1. **Quên webcam** (bước 1) → cả video 0.00đ. Kiểm tra 10 giây record thử trước.
2. **Không sửa trực tiếp mã nguồn** (bước 5) → −0.25đ. Ba live edit ở trên đều đã kiểm chứng là còn tồn tại trong code ở commit `0e5a9ac`.
3. **Nói quá về AI** → VP-07 trừ 1.00đ. Khi fallback cục bộ chạy, **đọc to dòng "Nguồn:"**; không gọi kết quả là "GPT phân tích".
