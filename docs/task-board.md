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

Cột "PR" ghi số pull request đang mở thật; cột "Video" ghi tên tệp bắt buộc. Cột cuối là trạng thái thật tại thời điểm viết tệp này, không phải trạng thái mong muốn.

| Task ID | Tên thẻ | Người | Nhánh | PR | Video | Cột hiện tại |
|---|---|---|---|---|---|---|
| TASK-01 | Danh sách sản phẩm & sản phẩm yêu thích (STT 1) | SV1 | `feature/sv1-buyer` | #3 | — (trong phạm vi demo) | Chờ review |
| TASK-02 | Chi tiết sản phẩm (STT 2) | SV1 | `feature/sv1-buyer` | #3 | `SV1-02-product-detail.mp4` | Chờ review |
| TASK-03 | Tạo brief tùy biến (STT 3) | SV1 | `feature/sv1-buyer` | #3 | — (trong phạm vi demo) | Chờ review |
| TASK-04 | Chọn nghệ nhân (STT 4) | SV1 | `feature/sv1-buyer` | #3 | `SV1-04-artisan-suggestions.mp4` | Chờ review |
| TASK-05 | Giỏ hàng & xác nhận đơn (STT 5) | SV1 | `feature/sv1-buyer` | #3 | `SV1-05-checkout-confirmation.mp4` | Chờ review |
| TASK-06 | Đơn hàng & chi tiết đơn (STT 6) | SV1 | `feature/sv1-buyer` | #3 | — (trong phạm vi demo) | Chờ review |
| TASK-07 | Quản lý listing (STT 7) | SV2 | `feature/sv2-maker-screens` | #2 | `SV2-01-maker-listings.mp4` | Chờ review |
| TASK-08 | Tạo & cập nhật listing (STT 8) | SV2 | `feature/sv2-maker-screens` | #2 | `SV2-02-maker-edit-listing.mp4` | Chờ review |
| TASK-09 | Hòm thư brief (STT 9) | SV2 | `feature/sv2-maker-screens` | #2 | `SV2-03-maker-brief-inbox.mp4` | Chờ review |
| TASK-10 | Soạn proposal (STT 10) | SV2 | `feature/sv2-maker-screens` | #2 | `SV2-04-maker-proposal-editor.mp4` | Chờ review |
| TASK-11 | Xem trước proposal (STT 11) | SV2 | `feature/sv2-maker-screens` | #2 | `SV2-05-maker-proposal-preview.mp4` | Chờ review |
| TASK-12 | Hồ sơ gian hàng (STT 12) | SV2 | `feature/sv2-maker-screens` | #2 | `SV2-06-maker-shop-profile.mp4` | Chờ review |
| TASK-13 | Bảng điều khiển (STT 13) | SV3 | `feature/sv3-admin-screens` | #1 | — (trong phạm vi demo) | Chờ review |
| TASK-14 | Hàng đợi kiểm duyệt (STT 14) | SV3 | `feature/sv3-admin-screens` | #1 | `SV3-02-admin-moderation-queue.mp4` | Video & bảo vệ |
| TASK-15 | Trung tâm báo cáo (STT 15) | SV3 | `feature/sv3-admin-screens` | #1 | — (trong phạm vi demo) | Chờ review |
| TASK-16 | Quản lý danh mục (STT 16) | SV3 | `feature/sv3-admin-screens` | #1 | `SV3-04-admin-category-management.mp4` | Video & bảo vệ |
| TASK-17 | Quản lý tài khoản (STT 17) | SV3 | `feature/sv3-admin-screens` | #1 | — (trong phạm vi demo) | Chờ review |
| TASK-18 | Quy định nội dung (STT 18) | SV3 | `feature/sv3-admin-screens` | #1 | `SV3-06-admin-content-policy.mp4` | Video & bảo vệ |

> **Tên nhánh trong bảng là nhánh thật trên GitHub**, không phải nhánh con dự kiến: mỗi thành viên làm một nhánh (`feature/sv1-buyer`, `feature/sv2-maker-screens`, `feature/sv3-admin-screens`). Mã `TASK-xx` vẫn là mã công việc để đối chiếu với bảng kiểm kê.

> **Cột Video của SV1.** Ba dòng 2, 4, 5 đã có link YouTube (`../videos/README.md`); ba dòng 1, 3, 6 không quay riêng theo thỏa thuận ba video mỗi người. Cột "Cột hiện tại" vẫn là *Chờ review* vì PR #3 chưa gộp.

## 3. Board đã dựng — link và cách đọc

**Board công khai:** <https://trello.com/b/N2HBpswf> — tên `CSE122 — CraftLink — Nhóm 11`, tạo ngày 26-10-2026 bằng tài khoản của SV3 vì Hưng chưa kịp dựng. Đã có đủ năm cột theo mục 1 và **27 thẻ**: 18 thẻ TASK theo mục 2 (15 ở "Chờ review", 3 ở "Video & bảo vệ") cộng **9 thẻ công việc** (8 ở "Backlog", 1 ở "Đang làm") — trong đó thẻ `VIDEO · SV2` đã được tick hoàn thành ngày 26-10 sau khi SV2 dán ba link, nên thực tế còn **8 việc mở**. Cột "Đã gộp" để trống **có chủ đích**: chưa PR nào được gộp nên chưa thẻ nào được chuyển sang, và bảng dưới đây ghi đúng trạng thái thật. Link cũng nằm ở `README.md` mục 10.

**Hạn hoàn thành (cột mà tiêu chí 7.1 gọi là "hạn hoàn thành") đã gắn cho 27/27 thẻ.** Với 18 thẻ TASK, hạn lấy theo **ngày commit thật đưa tệp HTML lần đầu vào nhánh** — SV3: 13-10-2026, SV1 và SV2: 25-10-2026 — kiểm chứng bằng `git log --diff-filter=A --format=%ad --date=short <nhánh> -- <tệp>`; cả 18 thẻ đều được tick "Đánh dấu hoàn thành" vì mã đã viết xong, phần còn lại nằm ở chỗ khác thẻ đang đứng (chờ gộp, chờ video). 9 thẻ công việc mở có hạn 27-10-2026, tức ngày nộp và bảo vệ, và **không** tick hoàn thành.

Chín thẻ mới, đọc từ mục "Việc còn lại" của `barem-audit.md`:

| Thẻ | Cột | Ai làm |
|---|---|---|
| `DEPLOY · Bật GitHub Pages cho bản gộp và quét 404 asset — SV3` | Đang làm | SV3 |
| `MERGE · Gộp PR #3 → #2 → #1 vào dev, rồi dev → main — Cả nhóm` | Backlog | Cả ba |
| `REVIEW · Thành viên khác bấm Approve PR #2 và PR #1 — SV1/SV3` | Backlog | SV1, SV3 |
| `VIDEO · SV2 đã dán 3 link video OBS (ba trang đăng nhập) — SV2` | Backlog (đã tick hoàn thành 26-10) | SV2 |
| `VIDEO · SV1 đối chiếu STT 4/7/9 với bảng kiểm kê 18 dòng — SV1` | Backlog | SV1 |
| `FIX · Sửa 4 liên kết forgot-password.html hỏng ở DangNhapVaDangKy — SV2` | Backlog | SV2 |
| `FIX · Đổi tên forgot password.html và sửa 3 tham chiếu CSS/JS sai — SV1` | Backlog | SV1 |
| `DOCS · SV1 + SV2 điền khai báo AI vào docs/ai-usage-report.md — SV1/SV2` | Backlog (còn mở: SV2 xác nhận mục 3.2, cả ba chưa ghi phiên bản công cụ) | SV1, SV2 |
| `DOCS · Chuyển 5 link Canva sang quyền xem công khai — Cả nhóm` | Backlog | Cả ba |

Mỗi thẻ mang mô tả một dòng, đủ bốn liên kết mà tiêu chí 7.1 đòi:

```
Nhánh: feature/sv3-admin-screens · PR: #1 · Video: SV3-02-admin-moderation-queue.mp4 (https://youtu.be/LAlWYQg43LY) · Màn hình: KiemDuyetVaQuanTri/04-moderation-queue/index.html · AI: moderation-risk qua api/ai.js
```

Ba việc còn lại trên board, ai cũng làm được:

1. Khi một PR được gộp, kéo các thẻ tương ứng sang cột "Đã gộp" rồi ghi thêm commit hash vào mô tả.
2. Khi SV1 hoặc SV2 có thêm link video, sửa phần "Video:" trong mô tả thẻ và kéo thẻ sang "Video & bảo vệ".
3. Nhãn theo người (`SV1`, `SV2`, `SV3`) chưa gắn; tên thẻ đã có hậu tố `— SVx` nên vẫn lọc được bằng ô tìm kiếm của board, dán `is:label` sau khi gắn nhãn thì mới có danh sách theo màu.

## 4. Điều kiện để cột 4 và 5 có thật

Board chỉ được tính khi trạng thái trên board khớp với repo. Hiện tại bốn pull request đều **đang mở**, chưa PR nào được gộp, nên chưa thẻ nào được chuyển sang cột "Đã gộp". Trình tự gộp: **PR #3 (Khách hàng) → PR #2 (Người bán) → PR #1 (Quản trị)**, cả ba vào `dev`, rồi một PR `dev` → `main` để triển khai.

PR #4 (`docs/sv1-sync` → `feature/sv3-admin-screens`) **không nằm trong trình tự này**: đích của nó là nhánh của SV3 chứ không phải `dev`, nên nếu gộp sẽ đẩy toàn bộ mã SV3 đi vòng. Nội dung cần giữ của PR #4 (khai báo AI mục 3.1 và `sv1-assignment.md`) đã được đưa thẳng vào nhánh `feature/sv3-admin-screens`; phần còn lại trùng với bản đã sửa ở đây.
