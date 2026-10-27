# Bảng công việc nhóm — bản nguồn của board Trello

Barem yêu cầu ở đâu: Tiêu chí 7.1 (0.25đ) đòi **board Trello/Jira công khai, tối thiểu 5 cột**, mỗi thẻ gắn được bốn thứ: công việc (Task ID) ↔ nhánh (branch) ↔ pull request ↔ video OBS. Board thật đang chạy ở <https://trello.com/b/N2HBpswf>; tệp này là bản nguồn để đối chiếu và dựng lại, **không thay thế board** vì giảng viên cần mở được đường dẫn thật.

## 1. Năm cột của board

| Cột | Nghĩa | Thẻ được nằm ở đây khi |
|---|---|---|
| 1. Backlog | Đã đặc tả, chưa ai nhận | Chỉ có Task ID và tên màn hình |
| 2. Đang làm | Có người đang viết mã | Đã tạo nhánh |
| 3. Chờ review | Đã mở pull request | Có số PR, chờ người khác bấm review |
| 4. Đã gộp | PR đã merge vào nhánh chính | Có commit hash trên nhánh chính |
| 5. Video & bảo vệ | Đã quay và dán link | Có link YouTube và tên tệp `.mp4` |

## 2. Mười tám thẻ

Cột "PR" ghi số pull request thật — **cả ba PR #1/#2/#3 đã gộp vào `dev` ngày 27-10-2026**; cột "Video" chỉ ghi link khi video đó **có thật** trong `videos/README.md`, những màn không quay riêng được ghi rõ là không quay (không giữ lại tên tệp chưa tồn tại). Cột cuối là trạng thái board đo từ `trello.com/b/N2HBpswf.json` ngày 27-10-2026.

| Task ID | Tên thẻ | Người | Nhánh | PR | Video | Cột (27-10) |
|---|---|---|---|---|---|---|
| TASK-01 | Danh sách sản phẩm & sản phẩm yêu thích (STT 1) | SV1 | `feature/sv1-buyer` | #3 | — không quay riêng (trong phạm vi 3 video của SV1) | Đã gộp |
| TASK-02 | Chi tiết sản phẩm (STT 2) | SV1 | `feature/sv1-buyer` | #3 | <https://www.youtube.com/watch?v=PaCFXYhuo9U> | Đã gộp |
| TASK-03 | Tạo brief tùy biến (STT 3) | SV1 | `feature/sv1-buyer` | #3 | — không quay riêng | Đã gộp |
| TASK-04 | Chọn nghệ nhân (STT 4) | SV1 | `feature/sv1-buyer` | #3 | <https://www.youtube.com/watch?v=AW-wuwhA3zc> | Đã gộp |
| TASK-05 | Giỏ hàng & xác nhận đơn (STT 5) | SV1 | `feature/sv1-buyer` | #3 | <https://www.youtube.com/watch?v=T6ejhOOqfgk> | Đã gộp |
| TASK-06 | Đơn hàng & chi tiết đơn (STT 6) | SV1 | `feature/sv1-buyer` | #3 | — không quay riêng | Đã gộp |
| TASK-07 | Quản lý listing (STT 7) | SV2 | `feature/sv2-maker-screens` | #2 | — không quay riêng; ba video của SV2 quay trang đăng nhập (ngoài 18 dòng) | Đã gộp |
| TASK-08 | Tạo & cập nhật listing (STT 8) | SV2 | `feature/sv2-maker-screens` | #2 | — không quay riêng | Đã gộp |
| TASK-09 | Hòm thư brief (STT 9) | SV2 | `feature/sv2-maker-screens` | #2 | — không quay riêng | Đã gộp |
| TASK-10 | Soạn proposal (STT 10) | SV2 | `feature/sv2-maker-screens` | #2 | — không quay riêng | Đã gộp |
| TASK-11 | Xem trước proposal (STT 11) | SV2 | `feature/sv2-maker-screens` | #2 | — không quay riêng | Đã gộp |
| TASK-12 | Hồ sơ gian hàng (STT 12) | SV2 | `feature/sv2-maker-screens` | #2 | — không quay riêng | Đã gộp |
| TASK-13 | Bảng điều khiển (STT 13) | SV3 | `feature/sv3-admin-screens` | #1 | — không quay riêng (trong phạm vi 3 video của SV3) | Đã gộp |
| TASK-14 | Hàng đợi kiểm duyệt (STT 14) | SV3 | `feature/sv3-admin-screens` | #1 | <https://youtu.be/LAlWYQg43LY> | Video & bảo vệ |
| TASK-15 | Trung tâm báo cáo (STT 15) | SV3 | `feature/sv3-admin-screens` | #1 | — không quay riêng | Đã gộp |
| TASK-16 | Quản lý danh mục (STT 16) | SV3 | `feature/sv3-admin-screens` | #1 | <https://youtu.be/imsnvGvIofQ> | Video & bảo vệ |
| TASK-17 | Quản lý tài khoản (STT 17) | SV3 | `feature/sv3-admin-screens` | #1 | — không quay riêng | Đã gộp |
| TASK-18 | Quy định nội dung (STT 18) | SV3 | `feature/sv3-admin-screens` | #1 | <https://youtu.be/3dCK3uHpIcY> | Video & bảo vệ |

> **Tên nhánh trong bảng là nhánh thật trên GitHub**, không phải nhánh con dự kiến: mỗi thành viên làm một nhánh (`feature/sv1-buyer`, `feature/sv2-maker-screens`, `feature/sv3-admin-screens`). Mã `TASK-xx` vẫn là mã công việc để đối chiếu với bảng kiểm kê.

> **Cột Video của SV1.** Ba dòng 2, 4, 5 đã có link YouTube (`../videos/README.md`); ba dòng 1, 3, 6 không quay riêng theo thỏa thuận ba video mỗi người. PR #3 **đã gộp vào `dev` ngày 27-10-2026** (`ec74e6b`) nên các thẻ TASK của SV1 đã nằm ở cột "Đã gộp".

## 3. Board đã dựng — link và cách đọc

**Board công khai:** <https://trello.com/b/N2HBpswf> — tên `CSE122 — CraftLink — Nhóm 11`, tạo ngày 26-10-2026 bằng tài khoản của SV3 vì Hưng chưa kịp dựng. Đã có đủ năm cột theo mục 1 và **31 thẻ**: 18 thẻ TASK theo mục 2 cộng **13 thẻ công việc**. **Đo lại lần cuối ngày 27-10-2026 (sau khi gộp PR #13 và PR #12) từ `trello.com/b/N2HBpswf.json`: Backlog 5 · Đang làm 0 · Chờ review 0 · Đã gộp 23 · Video & bảo vệ 3.** Năm thẻ công việc đã sang "Đã gộp" kèm merge hash trong mô tả: `MERGE`, `DEPLOY`, `SCREENS`, `VIDEO · SV2`, `REVIEW` (mô tả ghi `3eb8e53`); 15 thẻ TASK đi theo ba PR phân hệ. Thẻ `SWITCHER` thêm vào sáng 27-10 khi rà checklist mục 4 của barem, **đã dựng xong rồi sang "Đã gộp"** cùng ngày (mô tả ghi `c18ab0a` và `cca8b32`, 28/29 trang). **Hai thẻ `NAV` và `REVIEW` thêm chiều 27-10** khi mở PR #13 và PR #12; cả hai cũng đã sang "Đã gộp" và tick, mô tả ghi `cca8b32`/`de818f6`.

**Hạn hoàn thành (cột mà tiêu chí 7.1 gọi là "hạn hoàn thành") đã gắn cho 31/31 thẻ.** Với 18 thẻ TASK, hạn lấy theo **ngày commit thật đưa tệp HTML lần đầu vào nhánh** — SV3: 13-10-2026, SV1 và SV2: 25-10-2026 — kiểm chứng bằng `git log --diff-filter=A --format=%ad --date=short <nhánh> -- <tệp>`; cả 18 thẻ đều được tick "Đánh dấu hoàn thành" vì mã đã viết xong và đã vào `main`, phần còn lại nằm ở video và khai báo AI. Mười ba thẻ công việc có hạn 27-10-2026 (ngày nộp và bảo vệ); **tám thẻ đã tick** là `VIDEO · SV2` (26-10), `SCREENS`, `MERGE`, `DEPLOY`, `REVIEW` (PR #6), `SWITCHER`, `NAV`, `REVIEW` (PR #13/#12) — tất cả trong ngày 27-10. **Năm thẻ Backlog còn mở và không tick**: 2 thẻ FIX, 2 thẻ DOCS và `VIDEO · SV1` — đúng là việc của SV1/SV2 và của cả nhóm ở `barem-audit.md` mục 8. Tổng thẻ được tick: **28/31**.

Mười ba thẻ công việc, đọc từ mục "Việc còn lại" của `barem-audit.md`:

| Thẻ | Cột (27-10) | Ai làm |
|---|---|---|
| `SCREENS · Dựng màn 404 và 403 từ mockup Canva (trang 31–32) — SV3` | Đã gộp (tick 27-10; mô tả ghi `2ce1f23` → `8eb9f51` → `da3131b`) | SV3 |
| `DEPLOY · Bật GitHub Pages cho bản gộp và quét 404 asset — SV3` | Đã gộp (tick 27-10; mô tả ghi URL công khai + số đo) | SV3 |
| `MERGE · Gộp PR #3 → #2 → #1 vào dev, rồi dev → main — Cả nhóm` | Đã gộp (tick 27-10; mô tả ghi `ec74e6b`, `a5a51e6`, `8eb9f51`, `da3131b`) | Cả ba |
| `REVIEW · Thành viên khác bấm Approve PR #2 và PR #1 — SV1/SV3` | Đã gộp (tick 27-10; mô tả ghi **PR #6 APPROVED 09:37 → Merge 10:01 → `3eb8e53`**) — bằng chứng peer review thật của nhóm; `#1`/`#2` là PR đã merge từ trước nên chỉ còn bình luận, không có cửa Approve nữa | SV1, SV2, SV3 |
| `VIDEO · SV2 đã dán 3 link video OBS (ba trang đăng nhập) — SV2` | Đã gộp (tick 26-10) | SV2 |
| `VIDEO · SV1 đối chiếu STT 4/7/9 với bảng kiểm kê 18 dòng — SV1` | Backlog | SV1 |
| `FIX · Sửa 4 liên kết forgot-password.html hỏng ở DangNhapVaDangKy — SV2` | Backlog (mô tả cập nhật 27-10: **3/4 đã sửa trong `960a548`**, còn `02-dang-ky/js/main.js:199`) | SV2 |
| `FIX · Đổi tên forgot password.html và sửa 3 tham chiếu CSS/JS sai — SV1` | Backlog (mô tả cập nhật 27-10: phần CSS/JS **đã sửa trong `960a548`**, chỉ còn việc đổi tên tệp) | SV1 |
| `DOCS · SV1 + SV2 điền khai báo AI vào docs/ai-usage-report.md — SV1/SV2` | Backlog (còn mở: SV2 xác nhận mục 3.2, cả ba chưa ghi phiên bản công cụ, SV1 xử lý tệp trùng `docs/ai-usage -report.md`) | SV1, SV2 |
| `DOCS · Chuyển 5 link Canva sang quyền xem công khai — Cả nhóm` | Backlog | Cả ba |
| `SWITCHER · Dựng bộ chuyển vai trò giữa ba phân hệ (checklist mục 4) — SV3/Cả nhóm` | Đã gộp (tick 27-10; `js/role-switcher.js`, gắn vào 28/29 trang, commit `c18ab0a` rồi gộp `cca8b32`; mô tả thẻ ghi phép đo CDP 1280/320 px — 0 trang cuộn ngang) | SV3 (còn SV1 thêm 1 dòng vào `forgot password.html`) |
| `NAV · Thêm link "← Trang chủ CraftLink" ở 4 phân hệ (PR #13 → dev, PR #12 → main)` | Đã gộp (tick 27-10; mô tả ghi `ca1909c`/`59438c6` và hash gộp `cca8b32` → `de818f6`) | SV3 |
| `REVIEW · Approve PR #13 và PR #12 — SV1/SV2` | Đã gộp (tick 27-10; `hungxuan0411-cloud` APPROVED lúc 06:01:44Z và 06:02:20Z, merge `cca8b32` / `de818f6`; tên thẻ đã bỏ vế "cả hai đang 0 review" vì hết đúng) | SV1, SV2 |

Mỗi thẻ mang mô tả một dòng, đủ bốn liên kết mà tiêu chí 7.1 đòi:

```
Nhánh: feature/sv3-admin-screens · PR: #1 · Video: SV3-02-admin-moderation-queue.mp4 (https://youtu.be/LAlWYQg43LY) · Màn hình: KiemDuyetVaQuanTri/04-moderation-queue/index.html · AI: moderation-risk qua api/ai.js
```

Ba việc còn lại trên board:

1. ~~Khi một PR được gộp, kéo các thẻ tương ứng sang cột "Đã gộp" rồi ghi thêm commit hash vào mô tả.~~ **Đã làm ngày 27-10-2026** cho 23 thẻ; mô tả của `MERGE`/`DEPLOY`/`SCREENS`/`REVIEW`/`NAV`/`SWITCHER` mang merge hash thật (thẻ `REVIEW` ghi `3eb8e53` của PR #6, thẻ `REVIEW` thứ hai ghi `cca8b32`/`de818f6`).
2. Khi SV1 hoặc SV2 có thêm link video, sửa phần "Video:" trong mô tả thẻ và kéo thẻ sang "Video & bảo vệ".
3. Nhãn theo người (`SV1`, `SV2`, `SV3`) chưa gắn; tên thẻ đã có hậu tố `— SVx` nên vẫn lọc được bằng ô tìm kiếm của board, dán `is:label` sau khi gắn nhãn thì mới có danh sách theo màu.

## 4. Trạng thái cột "Đã gộp" và "Video & bảo vệ" (27-10-2026)

Board khớp với repo: **PR #3, #2, #1 đã gộp vào `dev`** (`ec74e6b`, `a5a51e6`, `8eb9f51`) và **`dev` đã về `main` qua PR #5** (`da3131b`), rồi **PR #6 (`dev` → `main`) được `hungxuan0411-cloud` Approve lúc 09:37 và Merge lúc 10:01 ngày 27-10 → `origin/main` = `3eb8e53`**; sau đó **PR #13 (`dev` ← `feature/site-home-link`) được APPROVED lúc 06:01:44Z và gộp thành `cca8b32`**, rồi **PR #12 (`main` ← `dev`) được APPROVED lúc 06:02:20Z và gộp thành `de818f6`**. GitHub Pages đang phục vụ đúng `de818f6` (bản build xong lúc 06:03:31Z, `js/role-switcher.js` trả 200). **23 thẻ nằm ở cột "Đã gộp"**, 3 thẻ TASK của SV3 (14/16/18) nằm ở "Video & bảo vệ" vì phần việc còn lại của chúng là quay vòng bảo vệ, không phải code. **Cột "Chờ review" trống** — ba thẻ SWITCHER, NAV, REVIEW đã được kéo sang "Đã gộp" và tick sau khi cả hai PR thật sự được approve và merge.

PR #4 (`docs/sv1-sync` → `feature/sv3-admin-screens`) **không nằm trong trình tự này**: đích của nó là nhánh của SV3 chứ không phải `dev`, nên nếu gộp sẽ đẩy toàn bộ mã SV3 đi vòng. Nội dung cần giữ của PR #4 (khai báo AI mục 3.1 và `sv1-assignment.md`) đã được đưa thẳng vào nhánh `feature/sv3-admin-screens`; phần còn lại trùng với bản đã sửa ở đây. **PR #4 đã được đóng lúc 03:34:32Z ngày 27-10 và không merge** (đo bằng API: `state: closed`, `merged: false`).
