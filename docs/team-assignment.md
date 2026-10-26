# PHÂN CÔNG NHIỆM VỤ DỰ ÁN CRAFTLINK (CSE122 - NHÓM 11)

## 🎨 BẢN THIẾT KẾ GIAO DIỆN UI/UX (CANVA PROTOTYPE)

* 🛒 **SV1 (Khách hàng & Giao diện chung):** [Link Canva SV1](https://www.canva.com/design/DAHZAR9VxmU/dQQiBQ9-OPRH6Q5x8DdAkw/edit) — bản cũ ghi `DAHWyBVvS6U`, SV1 cần chốt một link
* 🎨 **SV2 (Người sáng tạo / Thợ thủ công):** [Link Canva SV2](https://canva.link/rvxflfz5kgg0rg1)
* 🛡️ **SV3 (Kiểm duyệt viên & Quản trị viên):** [Link Canva SV3](https://canva.link/zqtyq0qivogb17s)
*  Tổng Hợp bài của nhóm: [Link Canva ](https://canva.link/10ir1xtkau6li7b)

---

## 👥 BẢNG TỔNG HỢP VAI TRÒ & TÍNH NĂNG AI

| Thành viên | Vai trò phụ trách | Số màn (kiểm kê) | Tệp HTML | Tính năng AI tích hợp | Nhánh thật | Tài liệu chi tiết |
| :--- | :--- | :---: | :---: | :--- | :--- | :--- |
| **SV1+SV2** | Giao diện đăng nhập, đăng ký | 2 | 5 | Trợ lý AI giải đáp thắc mắc về đăng nhập, đăng ký (`BOT_RULES` khớp từ khoá, không gọi mô hình) | `feature/sv2-maker-screens` (nơi đang chứa mã) | [Link Canva](https://canva.link/srjjivazsqxjy9h) |
| **SV1** | Khách hàng (Buyer) & Giao diện chung | 6 | 10 (9 màn Buyer + khôi phục mật khẩu) | AI tư vấn sản phẩm; AI Brief Assistant — bộ quy tắc cục bộ | `feature/sv1-buyer` | [sv1-assignment.md](./sv1-assignment.md) |
| **SV2** | Thợ thủ công / Seller (Maker) | 6 | 4 | AI Copywriter & SEO; AI Cost & Timeline Advisor — bộ quy tắc cục bộ | `feature/sv2-maker-screens` | [sv2-assignment.md](./sv2-assignment.md) |
| **SV3** | Kiểm duyệt viên (Mod) & Quản trị viên (Admin) | 6 | 6 | AI Content Moderation; AI Report Triage; AI Policy Copilot — gọi `api/ai.js`, có dự phòng cục bộ | `feature/sv3-admin-screens` | [sv3-assignment.md](./sv3-assignment.md) |

Cách đếm "Số màn hình" ở đây là số dòng trong `screen-inventory.md`: 6 + 6 + 6 = 18. Hai dòng gộp vào màn bên cạnh (STT 8 nằm trong trang STT 7, STT 11 nằm trong bước 4 của trang STT 10) nên phân hệ Maker có 4 tệp HTML; tương tự hai trang đăng nhập có nhiều biến thể vai trò nhưng vẫn tính là 2 màn.

> Năm liên kết Canva ở trên là **link chỉnh sửa**. Cần đổi sang quyền "Bất kỳ ai có liên kết đều xem được" trước khi nộp, vì checklist mục 2 của barem đòi quyền xem công khai.
