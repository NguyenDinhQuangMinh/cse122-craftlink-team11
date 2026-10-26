/* ==========================================================================
   data.js — Dữ liệu sản phẩm mẫu dùng chung của CraftLink
   --------------------------------------------------------------------------
   Đây là "nguồn dữ liệu chung" cho các trang người mua:
   - Trang giỏ hàng và trang yêu thích đọc mảng này để hiển thị thẻ sản phẩm.
   - Trang chi tiết sản phẩm tra cứu thông tin khi thêm vào giỏ / yêu thích.
   - Trang danh sách sản phẩm (index.html) dùng mã id trùng với data-* trên
     từng thẻ sản phẩm để liên kết hai nơi với nhau.

   Lưu ý: dự án chưa có máy chủ (backend) nên đây là DỮ LIỆU MẪU.
   ========================================================================== */

const CRAFTLINK_PRODUCTS = [
  {
    id: "coc-gom-la-nau",
    name: "Cốc gốm lá nâu thủ công",
    artisan: "Linh Gốm",
    price: 240000, // đơn vị: đồng
    image: "assets/images/coc-gom-la-nau.png",
    category: "do-dung-nha-bep",
    styles: ["moc-mac", "toi-gian"],
    leadTime: "4-7",
    rating: 4.9,
    reviewCount: 128,
    note: "",
    // Các trường dưới đây lấy đúng nội dung đang có ở product-detail.html.
    // Sản phẩm khác chưa có dữ liệu này nên giao diện sẽ ghi "Chưa có thông tin".
    subtitle: "Mộc mạc, tinh tế và an toàn cho đồ uống nóng.",
    description: "Làm thủ công từ gốm sứ cao cấp. Phù hợp cho cà phê, trà và quà tặng ý nghĩa.",
    specs: [
      { label: "Màu men", value: "Be – Nâu" },
      { label: "Khắc tên", value: "Có" },
      { label: "Đóng gói quà", value: "Có" }
    ],
    gallery: [
      "assets/images/coc-gom-la-nau.png",
      "assets/images/coc-gom-la-nau-2.png",
      "assets/images/coc-gom-la-nau-3.png",
      "assets/images/coc-gom-la-nau-4.png",
      "assets/images/coc-gom-la-nau-5.png"
    ],
    reviews: [
      { name: "Minh Anh", rating: 4, text: "Cốc đẹp, cầm chắc tay, men rất mịn." },
      { name: "Quang Huy", rating: 4, text: "Đóng gói cẩn thận, giao hàng nhanh." },
      { name: "Thảo Vy", rating: 5, text: "Màu sắc tự nhiên, đúng như mô tả." }
    ]
  },
  {
    id: "bat-gom-men-lam",
    name: "Bát gốm men lam",
    artisan: "Gốm An Nhiên",
    price: 180000,
    image: "assets/images/bat-gom-men-lam.png",
    category: "do-dung-nha-bep",
    styles: ["truyen-thong"],
    leadTime: "4-7",
    rating: 4.8,
    reviewCount: 98,
    note: ""
  },
  {
    id: "binh-gom-dang-tron",
    name: "Bình gốm dáng tròn",
    artisan: "Gốm Mộc",
    price: 260000,
    image: "assets/images/binh-gom-dang-tron.png",
    category: "do-trang-tri",
    styles: ["toi-gian", "hien-dai"],
    leadTime: "8-14",
    rating: 4.8,
    reviewCount: 74,
    note: ""
  },
  {
    id: "chuong-gio-gom",
    name: "Chuông gió gốm",
    artisan: "Gốm Mộc",
    price: 200000,
    image: "assets/images/chuong-gio-gom.png",
    category: "phu-kien",
    styles: ["moc-mac"],
    leadTime: "1-3",
    rating: 4.8,
    reviewCount: 100,
    note: ""
  },
  {
    id: "binh-gom-van-la",
    name: "Bình gốm vân lá",
    artisan: "Linh Gốm",
    price: 320000,
    image: "assets/images/binh-gom-van-la.png",
    category: "do-trang-tri",
    styles: ["moc-mac"],
    leadTime: "4-7",
    rating: 4.9,
    reviewCount: 46,
    note: "Giao dự kiến 3–5 ngày"
  },
  {
    id: "dia-men-lam",
    name: "Đĩa men lam thủ công",
    artisan: "Gốm An Nhiên",
    price: 210000,
    image: "assets/images/dia-men-lam.png",
    category: "do-gom",
    styles: ["truyen-thong", "toi-gian"],
    leadTime: "tren-14",
    rating: 4.8,
    reviewCount: 63,
    note: "Nhận đặt làm theo yêu cầu"
  },
  {
    id: "chau-cay-mini",
    name: "Chậu cây mini mộc",
    artisan: "Gốm Nhà Quê",
    price: 150000,
    image: "assets/images/chau-cay-mini.png",
    category: "do-gom",
    styles: ["moc-mac"],
    leadTime: "1-3",
    rating: 4.7,
    reviewCount: 38,
    note: "Giao dự kiến 2–4 ngày"
  },
  {
    id: "bo-am-tra",
    name: "Bộ ấm trà gia đình",
    artisan: "Gốm Mộc",
    price: 680000,
    image: "assets/images/bo-am-tra.png",
    category: "qua-tang",
    styles: ["truyen-thong"],
    leadTime: "1-3",
    rating: 5.0,
    reviewCount: 21,
    note: "Có sẵn • Đổi trả 7 ngày"
  }
];

/* ==========================================================================
   CRAFTLINK_ARTISANS — Hồ sơ nghệ nhân dùng cho trợ lý AI ở index.html
   --------------------------------------------------------------------------
   Dữ liệu được tổng hợp từ các trang đã có của dự án:
   - Tên, ảnh, mô tả, tag: trang Gợi ý nghệ nhân và trang chi tiết sản phẩm.
   - Sản phẩm: nối với CRAFTLINK_PRODUCTS bằng productIds (không tạo sản phẩm mới).
   - Địa điểm: chỉ ghi khi giao diện hiện có đã nêu (Linh Gốm — Hà Nội).
   - Nhận đơn tùy biến: chỉ ghi khi sản phẩm có ghi chú tương ứng.

   Quy ước: trường null nghĩa là "Chưa có thông tin". Giao diện AI sẽ hiển thị
   đúng cụm "Chưa có thông tin" thay vì tự suy đoán.

   Riêng Mộc An Nhiên: chuyên môn và địa chỉ là dữ liệu minh họa do nhóm bổ
   sung theo yêu cầu của bài demo, nên có trường demoNote để giao diện ghi rõ.
   ========================================================================== */

const CRAFTLINK_ARTISANS = [
  {
    id: "linh-gom",
    name: "Linh Gốm",
    shopName: null,
    image: "assets/images/linh-gom.png",
    specialties: ["Gốm sứ"],
    tags: ["Gốm sứ", "Mộc mạc", "Tối giản"],
    description: "Phong cách mộc mạc, tông màu ấm, đường nét tinh tế và an toàn cho đồ uống nóng.",
    location: "Hà Nội", // lấy từ khối "Về nghệ nhân" của product-detail.html
    customOrderNote: null,
    productIds: ["coc-gom-la-nau", "binh-gom-van-la"],
    aliases: [],
    demoNote: null
  },
  {
    id: "gom-an-nhien",
    name: "Gốm An Nhiên",
    shopName: null,
    image: null, // dự án chưa có ảnh đại diện cho nghệ nhân này
    specialties: ["Gốm"],
    tags: ["Gốm"],
    description: null,
    location: null,
    customOrderNote: "Nhận đặt làm theo yêu cầu (theo ghi chú sản phẩm Đĩa men lam thủ công).",
    productIds: ["bat-gom-men-lam", "dia-men-lam"],
    aliases: [],
    demoNote: null
  },
  {
    id: "gom-moc",
    name: "Gốm Mộc",
    shopName: null,
    image: null,
    specialties: ["Gốm"],
    tags: ["Gốm"],
    description: null,
    location: null,
    customOrderNote: null,
    productIds: ["binh-gom-dang-tron", "chuong-gio-gom", "bo-am-tra"],
    aliases: [],
    demoNote: null
  },
  {
    id: "gom-nha-que",
    name: "Gốm Nhà Quê",
    shopName: null,
    image: "assets/images/gom-nha-que.png",
    specialties: ["Gốm"],
    tags: ["Gốm"],
    description: null,
    location: null,
    customOrderNote: null,
    productIds: ["chau-cay-mini"],
    aliases: [],
    demoNote: null
  },
  {
    id: "minh-moc",
    name: "Minh Mộc",
    shopName: null,
    image: "assets/images/minh-moc.png",
    specialties: ["Đồ gỗ"],
    tags: ["Gỗ tự nhiên", "Thủ công", "Tối giản"],
    description: null,
    location: null,
    customOrderNote: null,
    productIds: [], // trang Gợi ý nghệ nhân có hồ sơ nhưng chưa có sản phẩm mẫu
    aliases: [],
    demoNote: null
  },
  {
    id: "thao-vy",
    name: "Thảo Vy",
    shopName: "Thêu Tay Thảo Vy",
    image: "assets/images/thao-vy.png",
    specialties: ["Gốm sứ", "Thêu tay"],
    tags: ["Gốm sứ", "Thêu tay", "Thủ công", "Tự nhiên"],
    description: "Màu sắc tự nhiên, men mịn, phong cách nhẹ nhàng và tinh tế.",
    location: null,
    customOrderNote: null,
    productIds: [],
    aliases: ["Thêu Tay Thảo Vy"], // hai tên trong dự án là cùng một nghệ nhân
    demoNote: null
  },
  {
    id: "moc-an-nhien",
    name: "Mộc An Nhiên",
    shopName: null,
    image: "assets/images/moc-an-nhien.png",
    specialties: ["Đồ gỗ mỹ nghệ"], // dữ liệu minh họa — xem demoNote
    tags: ["Đồ gỗ", "Thủ công"],
    description: null,
    location: "Hà Nội", // dữ liệu minh họa — xem demoNote
    customOrderNote: null,
    productIds: [],
    aliases: [],
    demoNote: "Chuyên môn và địa chỉ của Mộc An Nhiên là dữ liệu minh họa do nhóm bổ sung cho bản demo."
  }
];
