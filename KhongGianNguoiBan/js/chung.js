// ==================== CÁC HÀM DÙNG CHUNG ====================
// Tìm một phần tử HTML bằng id hoặc bộ chọn CSS.
function $(boChon) {
  return document.querySelector(boChon);
}
// Đổi một số thành tiền Việt Nam, ví dụ 9600000 -> 9.600.000 đ.
function money(soTien) {
  return new Intl.NumberFormat('vi-VN').format(Number(soTien) || 0) + ' đ';
}
// Hiện thông báo nhỏ ở góc màn hình.
function notify(noiDung) {
  const hopThongBao = $('#toast');
  if (!hopThongBao) return;
  hopThongBao.textContent = noiDung;
  hopThongBao.classList.remove('hidden-state');
  clearTimeout(notify.thoiGian);
  notify.thoiGian = setTimeout(function () {
    hopThongBao.classList.add('hidden-state');
  }, 3800);
}
// ==================== TRẠNG THÁI CHUNG GIỮA CÁC TRANG ====================
// Proposal và hòm thư brief là hai trang riêng nên phải trao đổi qua sessionStorage:
// dữ liệu vẫn sống khi chuyển trang trong cùng tab và tự mất khi đóng tab.
const KHO_TRAO_DOI = 'craftlink:proposal';
// Đọc trạng thái của mọi brief đang lưu.
function docTrangThai() {
  try {
    return JSON.parse(sessionStorage.getItem(KHO_TRAO_DOI)) || {};
  }
  catch (loi) {
    return {};
  }
}
// Trạng thái đã gửi của một brief, hoặc null nếu chưa gửi.
function trangThaiCua(maBrief) {
  return docTrangThai()[maBrief] || null;
}
// Ghi thêm thông tin trạng thái của một brief và trả về kết quả mới.
function luuTrangThai(maBrief, duLieuMoi) {
  const tatCa = docTrangThai();
  tatCa[maBrief] = Object.assign({}, tatCa[maBrief], duLieuMoi);
  try {
    sessionStorage.setItem(KHO_TRAO_DOI, JSON.stringify(tatCa));
  }
  catch (loi) {
    notify('Trình duyệt không cho lưu trạng thái giữa các trang.');
  }
  return tatCa[maBrief];
}
// ==================== HỒ SƠ GIAN HÀNG ====================
// Hồ sơ dùng chung cho cả bốn màn hình người bán nên lưu ở localStorage,
// khác với trạng thái proposal chỉ sống trong một phiên tab.
const KHO_GIAN_HANG = 'craftlink:gian-hang';
const GIAN_HANG_MAC_DINH = {
  ten: 'Nhà Gốm An Nhiên', chuyenMon: 'Gốm sứ',
  cauChuyen: 'Xưởng của chúng tôi làm việc với đất nung và men phủ tự nhiên. Mỗi sản phẩm qua tay khoảng ba ngày, từ công đoạn vuốt bàn xoay đến lần nung cuối, nên màu men có thể chênh nhẹ giữa các lô.',
  diaChi: 'Thôn Giang Cao, Bát Tràng, Gia Lâm, Hà Nội', dienThoai: '0912345678', email: 'xuong@craftlink.vn',
  avatar: '', anhBia: ''
};
// Đọc hồ sơ đã lưu, hợp nhất với giá trị mặc định cho các mục cũ chưa có.
function docGianHang() {
  try {
    return Object.assign({}, GIAN_HANG_MAC_DINH, JSON.parse(localStorage.getItem(KHO_GIAN_HANG)) || {});
  }
  catch (loi) {
    return Object.assign({}, GIAN_HANG_MAC_DINH);
  }
}
// Ghi hồ sơ mới và trả về bản đã lưu.
function luuGianHang(duLieuMoi) {
  const moi = Object.assign({}, docGianHang(), duLieuMoi);
  try {
    localStorage.setItem(KHO_GIAN_HANG, JSON.stringify(moi));
  }
  catch (loi) {
    notify('Trình duyệt không cho lưu hồ sơ gian hàng.');
  }
  hienThiTenGianHang();
  return moi;
}
// Mọi trang đều có một nhãn .account trên thanh tiêu đề, cập nhật theo tên xưởng.
function hienThiTenGianHang() {
  const ten = docGianHang().ten;
  document.querySelectorAll('.account').forEach(function (nhan) {
    nhan.textContent = ten;
  });
}
hienThiTenGianHang();
