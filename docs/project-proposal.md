# Project Proposal — CraftLink

Barem yêu cầu ở đâu: Tiêu chí 1 (Tư duy sản phẩm, Phân tích bài toán & Thiết kế UI/UX, 1.00đ) liệt kê minh chứng là `README.md`, **`docs/project-proposal.md`**, `docs/screen-inventory.md`, link Figma/Canva.

Nội dung đề tài đầy đủ đã có trong `project-introduction.md` (TỔNG QUAN DỰ ÁN & PHẠM VI HỆ THỐNG). Tệp này tồn tại để đúng tên minh chứng barem và để tóm tắt phần đã chốt. Nếu nhóm muốn chỉ giữ một tệp, đổi tên `project-introduction.md` thành `project-proposal.md` rồi xóa tệp này — quyết định thuộc về cả nhóm, không thuộc về một thành viên.

## Bài toán

CraftLink là nền tảng thương mại điện tử cho sản phẩm thủ công mỹ nghệ đặt làm theo yêu cầu, nối ba nhóm người dùng: khách hàng tìm và đặt làm sản phẩm độc bản, nghệ nhân bán sản phẩm và nhận brief tùy biến, cùng kiểm duyệt viên/quản trị viên giữ chất lượng nội dung và an toàn giao dịch.

## Phạm vi và số màn hình

| Phân hệ | Vai trò | Số màn hình | STT trong kiểm kê | Mã nguồn |
|---|---|---|---|---|
| SV1 | Khách hàng | 6 | 1–6 | chờ đưa vào repo |
| SV2 | Thợ thủ công / Nghệ nhân | 6 | 7–12 | chờ đưa vào repo |
| SV3 | Kiểm duyệt viên + Quản trị viên | 6 | 13–18 | `KiemDuyetVaQuanTri/` |

Tổng 18 màn hình, liệt kê 1:1 tại `screen-inventory.md`.

## Ba tính năng AI theo barem 6.1–6.3

1. **6.1 Gợi ý sản phẩm cho người mua** — loại tác vụ `product-discovery` đã có ở `api/ai.js`; màn hình người mua chưa nối giao diện.
2. **6.2 Phân loại rủi ro nội dung** — `moderation-risk` trên màn hình Hàng đợi kiểm duyệt (STT 14) và `report-triage` trên Trung tâm báo cáo (STT 15).
3. **6.3 Copilot nghiệp vụ** — `policy-copilot` trên màn hình Quy định nội dung (STT 18); bản nháp chỉ có hiệu lực sau khi quản trị viên xác nhận.

Chi tiết khai báo và giới hạn: `ai-usage-report.md`.

## Việc còn mở của đề tài

- proposal của SV1 và SV2 chưa có trong repo nên phần phân tích nghiệp vụ phía khách hàng và nghệ nhân chưa kiểm chứng được bằng mã nguồn.
- Triển khai công khai (ĐK3) chưa thực hiện; xem mục CHẠY GIAO DIỆN của `../README.md` để chạy cục bộ.
- Bảng công việc Trello/Jira công khai chưa có, nên mã `TASK-01…18` trong `screen-inventory.md` là mã dự kiến do nhóm tự đặt, chưa phải mã card thật.
