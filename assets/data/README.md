# assets/data/ — Dữ liệu mẫu của toàn dự án

Barem yêu cầu ở đâu: Tiêu chí 5 minh chứng là `assets/data/`; mục 5.1 đòi dữ liệu "có lý do theo ngữ cảnh đề tài, tách riêng vào `assets/data/*.json` hoặc MockAPI"; Checklist mục 9 đòi **mỗi bộ sưu tập 15–25 bản ghi thật sự đúng chuyên ngành, không dùng Lorem ipsum hay `test 1`, `test 2`** (VP-06 trừ 0.50đ nếu dữ liệu giả).

Quy tắc của thư mục này:

- Một tệp `.json` cho một bộ sưu tập nghiệp vụ (`products.json`, `users.json`, `orders.json`, …).
- Mỗi bản ghi có `id` ổn định để các màn hình khác nhau tham chiếu được với nhau.
- Không nhúng ảnh nhị phân; ảnh để ở `assets/` và lưu theo đường dẫn, ảnh người dùng tải lên thì nén và giữ trong `localStorage`.

Trạng thái hiện tại: **chưa có tệp nào ở cấp dự án**. Năm bộ sưu tập của phân hệ quản trị đang nằm ở `../KiemDuyetVaQuanTri/assets/data/`: `categories.json` (15), `guidelines.json` (15), `products.json` (20), `reports.json` (20), `users.json` (20). Một điểm cần sửa trước khi nộp: địa chỉ email trong `users.json` đang dùng miền `example.com`, nên thay bằng miền hư cấu nhưng có bối cảnh (ví dụ `@craftlink.vn`) để không bị quy là dữ liệu placeholder.
