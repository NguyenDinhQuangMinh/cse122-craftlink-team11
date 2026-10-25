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
