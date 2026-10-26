# Báo cáo sử dụng AI – Phân hệ Thợ thủ công / Nghệ nhân (SV2)

> Khai theo ĐK5 của barem: nói rõ công cụ AI đã dùng, phần AI sinh ra, phần sinh viên tự kiểm chứng.
> Bản cấp nhóm: [`../../docs/ai-usage -report.md`](../../docs/ai-usage%20-report.md) (nhánh của SV1) · Mô tả phân hệ: [`../README.md`](../README.md)

## Phạm vi

Phân hệ người bán **không gọi mô hình AI nào**. Trong toàn bộ thư mục `KhongGianNguoiBan/` và `DangNhapVaDangKy/` không có một lời gọi mạng nào (`git grep "fetch(" KhongGianNguoiBan DangNhapVaDangKy` không trả kết quả), cũng không có khóa API hay biến môi trường. Ba chỗ mang nhãn "AI" trên giao diện đều là bộ quy tắc JavaScript chạy trong trình duyệt, và chính giao diện ghi rõ điều đó:

| Tính năng | Màn hình | Tệp | Bản chất |
| :--- | :--- | :--- | :--- |
| AI Artisan Copywriter & SEO | STT 8 – tạo/sửa listing | `js/ai/copywriter.js` | Ghép câu từ từ khoá người bán nhập, tra từ điển chất liệu / kỹ thuật / màu sắc / công dụng viết sẵn trong tệp |
| AI Cost & Timeline Advisor | STT 10 – soạn proposal | `03-proposal-editor/js/main.js` | Đối chiếu giá với tổng hạng mục, khung ngân sách và deadline của brief rồi nêu điểm cần sửa, chia mức "cần sửa" / "nên cân nhắc" |
| Trợ lý AI trên trang đăng nhập | `DangNhapVaDangKy/01-dang-nhap/*.js` | `BOT_RULES` | Khớp từ khoá tiếng Việt trong câu hỏi để trả lời mẫu; không khớp thì báo chưa hiểu và gợi ý câu khác |

Bản tóm tắt brief ở màn STT 9 **không phải AI**: đó là chuỗi soạn sẵn trong dữ liệu mẫu, nên cột AI của dòng 9 trong `screen-inventory.md` đã được hạ về "–".

## Luồng 6 bước của hai tính năng AI

Cả hai đều đi đủ sáu bước theo barem, và đều kết thúc bằng quyết định của người dùng:

1. **Input** — người bán nhập từ khoá (copywriter) hoặc đang ở bước hạng mục–chi phí–thời gian của wizard (advisor).
2. **Processing** — copywriter đổi nút thành "Đang soạn mô tả…" và khoá nút trong lúc chờ; thông báo kết quả hiện qua toast `role="status"` `aria-live="polite"`.
3. **Output** — copywriter trả về đoạn mô tả, danh sách từ khoá và số từ; advisor trả về danh sách điểm cần sửa kèm nhãn mức độ.
4. **Explainability** — copywriter ghi rõ "Bộ quy tắc đã dùng N từ khoá bạn nhập để ghép M từ" và nhắc đọc phần giải thích trước khi quyết định; advisor ghi "Đã đối chiếu giá, khung ngân sách brief, deadline và các tiêu chí với bảng hạng mục hiện tại: X điểm cần sửa… Kết quả chỉ là suy luận từ những gì bạn nhập, chưa phải báo giá cuối."
5. **User control** — copywriter có ba nút *Dùng mô tả này* / *Tạo lại* / *Bỏ kết quả* (ba kiểu câu khác nhau nên "Tạo lại" ra kết quả thật sự khác); người bán sửa tay vào ô mô tả thì trạng thái "chờ quyết định" tự biến mất. Advisor có nút *Áp dụng* trên từng đề xuất và *Áp dụng tất cả*.
6. **Save** — chỉ sau khi bấm áp dụng, mô tả và từ khoá mới ghi vào `dataset` của dòng sản phẩm, hoặc con số mới ghi vào ô hạng mục của wizard. Không có trường hợp nào máy tự ghi thay người dùng.

## Chế độ dự phòng / khi thiếu dữ liệu

- Copywriter không có từ khoá nào dùng được thì trả về trạng thái lỗi, hiện thông báo "Chưa có từ khoá nào để bộ gợi ý dùng." và ẩn khung kết quả — đây là kịch bản AI Failure dùng để demo.
- Advisor không trả về danh sách rỗng: khi các con số đã khớp, nó đưa ra ghi chú mức "Ổn" (giá nằm trong khung ngân sách, tiến độ còn ngày dự phòng) để người bán biết bộ quy tắc đã đối chiếu chứ không bỏ sót. Nút *Áp dụng tất cả* bị vô hiệu khi không còn đề xuất nào có hành động.
- Trợ lý đăng nhập không khớp từ khoá thì nói rõ chưa hiểu và gợi ý chủ đề khác, không trả lời bừa.

## Dữ liệu và cấu hình

Không có cấu hình máy chủ. Dữ liệu mẫu nằm trong HTML/JS, không `fetch` tệp JSON. Hồ sơ gian hàng lưu `localStorage` mốc `craftlink:gian-hang`, trạng thái proposal lưu `sessionStorage` mốc `craftlink:proposal`, tài khoản và phiên đăng nhập lưu `cl_users` / `cl_session` / `cl_login_attempts`. Mật khẩu được băm SHA-256 với tiền tố `craftlink:` trước khi ghi, không lưu mật khẩu thô; ba tài khoản mẫu (`khachhang@`, `nghenhan@`, `admin@craftlink.vn`) là dữ liệu demo cho trang tĩnh, không phải thông tin người dùng thật.

## Công cụ AI dùng trong lúc làm bài

| Công cụ | Phạm vi dùng |
| :--- | :--- |
| **Qoder** (trợ lý lập trình dạng agent, đọc/ghi tệp và chạy lệnh trong thư mục dự án) | Tách CSS/JS theo từng vai trò ở phân hệ đăng nhập, dựng màn STT 12, viết bộ `copywriter.js` và `BOT_RULES`, rà đối chiếu barem, viết `README.md` / `docs/sv2-assignment.md` / các dòng 7–12 trong `docs/screen-inventory.md`, soạn message commit và nội dung trả lời review trên PR |

Prompt tiêu biểu, nguyên văn:

- "tách tôi phần code css, html, js của quản trị viên, khách hàng, thợ thủ công riêng ra"
- "cho 1 tệp chứa riêng html, js, css của khách hàng và tương tự với nghệ nhân và quản trị được không" → sau khi xem kết quả: "sai rồi hoàn tác về như cũ cho tao" (đã hoàn tác bằng hai commit revert, không force-push)
- "dựa vào barem giờ hãy chỉ tôi quay 3 video với 3 trang này"
- "vào kiểm tra xem có phần comment nào dành cho tôi không rồi rep cmt theo hướng k cần sửa code"
- "bạn có thể tự check github của nhóm và xem những chỗ nào còn thiếu và đồng bộ hóa, tự động thêm vào phần còn thiếu của tôi không… không tự ý chỉnh sửa những gì k liên quan đến SV2"
- "làm những gì tôi yêu cầu thôi đừng thêm hay bớt cj cả"

Phần AI sinh ra và cách kiểm chứng:

| AI sinh / đề xuất | Tôi kiểm chứng bằng cách nào |
| :--- | :--- |
| Mã nguồn bốn màn hình người bán và ba trang đăng nhập sau khi tách riêng CSS/JS | Mở từng trang trên trình duyệt, bấm thử tìm–lọc–thêm–sửa–lưu trữ, F5 xem dữ liệu hồ sơ còn không, bấm Tab/Esc kiểm tra điều hướng bàn phím và đóng modal |
| Bộ quy tắc `copywriter.js`, `BOT_RULES`, advisor giá/tiến độ | Nhập từ khoá thật và từ khoá vô nghĩa để xem cả nhánh lỗi; đối chiếu từng câu mô tả sinh ra với từ điển trong tệp — câu nào cũng tra lại được trong mã nguồn |
| Các dòng 7–12 trong `docs/screen-inventory.md`, `docs/sv2-assignment.md`, `README.md` này | Đọc lại từng câu và mở tệp tương ứng để xác nhận đường dẫn, tên mốc lưu trữ, số liệu; chỗ nào mô tả sai so với mã thì sửa lại (đã sửa cột AI dòng 9 từ "AI Brief Summarizer" về "–") |
| Nội dung trả lời comment trên PR #2 và message commit | Tự đọc lại trước khi gửi; commit và push đứng tên tài khoản GitHub của tôi |

## Hạn chế cần ghi rõ khi thuyết trình

- Hai tính năng "AI" của phân hệ này là bộ quy tắc cố định, không phải mô hình ngôn ngữ. Kết quả có thể không hợp lý với sản phẩm ngoài nhóm gốm/sợi/macrame trong từ điển, và người bán vẫn phải đọc lại trước khi lưu.
- Danh sách sản phẩm và brief là dữ liệu mẫu viết sẵn; chỉnh sửa listing chỉ tồn tại trong phiên làm việc, không có cơ sở dữ liệu.
- Ba trang đăng nhập có mã kiểm tra biểu mẫu và băm mật khẩu ở phía client, chỉ đủ cho demo tĩnh, không phải cơ chế xác thực thật.
- Phần responsive được kiểm bằng cách kéo cửa sổ trình duyệt ở các mốc 1200 / 760 / 520 px, chưa kiểm trên thiết bị di động vật lý và chưa đo `scrollWidth` bằng script cho cả bốn màn.
- Nhật ký phiên làm việc với Qoder không nằm trong repository, nên người chấm chỉ đối chiếu được bằng mã nguồn, lịch sử commit và phần trích prompt ở trên.
- Ba video OBS của phần đăng nhập đã đăng lên kênh YouTube của tôi (liên kết trong `../../docs/sv2-assignment.md`); video của bốn màn hình người bán sẽ quay và bổ sung sau.
