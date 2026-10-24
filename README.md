# CraftLink – Sàn sản phẩm sáng tạo tùy biến

Phân hệ **Quản trị viên và Kiểm duyệt viên** gồm sáu màn hình chạy chung trong **KiemDuyetVaQuanTri/GopTrang.html**.

## Các màn hình

1. Bảng điều khiển
2. Quản lý danh mục
3. Quản lý tài khoản
4. Hàng đợi kiểm duyệt
5. Trung tâm báo cáo
6. Hướng dẫn nội dung

Bảng kiểm kê màn hình, dữ liệu và trạng thái: [KiemDuyetVaQuanTri/docs/screen-inventory.md](KiemDuyetVaQuanTri/docs/screen-inventory.md).

## Chức năng

- Dashboard lấy số thợ đang hoạt động và cảnh báo từ dữ liệu tài khoản, sản phẩm và báo cáo.
- Danh mục: tìm kiếm, thêm, sửa, xóa, bật/tắt hiển thị, kiểm tra trùng tên và tải ảnh nền lên.
- Tài khoản: tìm kiếm, lọc vai trò, thêm, sửa, xóa, khóa/mở khóa và tải ảnh đại diện lên.
- Kiểm duyệt: lọc theo trạng thái, xem hồ sơ, duyệt, yêu cầu sửa, từ chối và xem lại quyết định.
- Báo cáo: kết hợp tìm kiếm, lọc trạng thái/lý do/thời gian, sắp xếp và phân trang; xác minh, bỏ qua hoặc xử lý báo cáo.
- Quy định: tìm, thêm, sửa, xóa và soạn nháp có AI hỗ trợ.
- Trạng thái tải, lỗi, danh sách rỗng và thông báo thành công/lỗi được hiển thị trong giao diện.
- Bố cục co giãn trên điện thoại; bảng rộng cuộn trong vùng riêng để tránh kéo tràn cả trang.
- Ảnh tải lên được kiểm tra định dạng/kích thước, nén trong trình duyệt và lưu trong localStorage.
- Dữ liệu mẫu nằm trong KiemDuyetVaQuanTri/assets/data/; thao tác được lưu trong localStorage để giữ lại khi tải lại cùng trình duyệt.

## Chạy giao diện

Mở thư mục gốc dự án bằng VS Code và chạy một máy chủ tĩnh, ví dụ tiện ích **Live Server**. Sau đó mở địa chỉ localhost do Live Server cung cấp. Từ trang gốc, index.html chuyển đến giao diện gộp. Không mở tệp trực tiếp bằng file:// vì trình duyệt có thể chặn việc tải JSON.

## AI

Một API server-side tại api/ai.js dùng chung một nhà cung cấp/mô hình cho từng loại tác vụ; khóa API chỉ được đọc từ biến môi trường máy chủ.

- Trang 4: phân tích rủi ro nội dung sản phẩm; gửi kèm thông tin sản phẩm và quy định hiện hành.
- Trang 5: tóm tắt, ưu tiên và đề xuất xử lý báo cáo.
- Trang 6: soạn nháp quy định để người quản trị sửa và xác nhận.
- API đã chừa loại tác vụ product-discovery để nhóm nối vào màn hình dành cho người mua. Loại này chưa có giao diện trong phân hệ quản trị.

Để gọi AI thật, triển khai dự án trên Vercel hoặc nền tảng chạy được serverless function, rồi cấu hình AI_API_URL, AI_API_KEY, AI_MODEL trong biến môi trường của máy chủ. Có thể tham khảo .env.example; không đưa khóa thật vào Git. GitHub Pages chỉ phục vụ tệp tĩnh, nên endpoint AI sẽ không chạy nếu chỉ triển khai trên GitHub Pages. Hướng dẫn chi tiết và giới hạn dữ liệu gửi đến AI ở [KiemDuyetVaQuanTri/docs/ai-usage-report.md](KiemDuyetVaQuanTri/docs/ai-usage-report.md).

> Đây là demo phía trình duyệt, chưa có cơ sở dữ liệu hoặc đăng nhập/phân quyền thật. Dữ liệu chỉ lưu trong trình duyệt hiện tại; không đồng bộ giữa máy hoặc người dùng.

## Công nghệ

HTML, CSS, JavaScript, JSON, Web Storage API, Fetch API và serverless function Node.js.

## Liên kết

- **Video giới thiệu:** Chưa cập nhật.
- **GitHub:** [CSE122-GK-CraftLink-NguyenDinhQuangMinh](https://github.com/NguyenDinhQuangMinh/CSE122-GK-CraftLink-NguyenDinhQuangMinh)
- **Thiết kế Canva:** [CraftLink trên Canva](https://www.canva.com/design/DAHXD2jg9HU/7Q4trg1HDT246iMdGVyUXw/edit)
