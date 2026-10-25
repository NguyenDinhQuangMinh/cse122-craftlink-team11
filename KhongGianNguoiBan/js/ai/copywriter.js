// ==================== BO QUY TAC SOAN MO TA SAN PHAM (AI COPYWRITER & SEO) ====================
// May khong goi model nao: moi cau duoi day duoc ghep trong file nay tu chinh tu khoa
// ma nguoi ban nhap, nen ket qua luon bao den duoc va co the giai thich duoc.
(function () {
  // Tu dien phan loai tu khoa: lieu = chat lieu, nghe = ky thuat, mau = mau sac, dung = cong dung.
  const TU_DIEN = {
    lieu: ['gốm', 'gom', 'sứ', 'sơ', 'đất nung', 'men', 'chất men', 'lụa', 'vải', 'cói', 'tre', 'mây', 'giấy', 'gỗ', 'đồng', 'sợi bông', 'hasi'],
    nghe: ['vuốt tay', 'bàn xoay', 'đan tay', 'đan', 'thủ công', 'handmade', 'hỏa biến', 'nung', 'nhúng men', 'khâu tay', 'chạm', 'tiện', 'vẽ tay', 'thắt nút', 'macrame', 'dập', 'mạ'],
    mau: ['xanh ngọc', 'xanh lam', 'xanh rêu', 'xanh', 'nâu đất', 'nâu', 'trắng ngà', 'trắng', 'kem', 'be', 'chàm', 'tro', 'vàng đồng', 'vàng', 'đỏ son', 'đỏ', 'nude'],
    dung: ['cốc', 'ly', 'ấm trà', 'ấm', 'bình', 'lọ', 'bát', 'tô', 'đĩa', 'khay', 'túi', 'ví', 'rổ', 'giỏ', 'đèn', 'tranh', 'treo tường', 'lọ hoa', 'hộp', 'khay đựng']
  };
  // Mo ta demo sinh ra 3 kieu khac nhau de nut "Tao lai" co ket qua thay that.
  const CAC_KIEU = [
    function (t) {
      return [
        t.ten + ' do ' + t.xuong + ' làm hoàn toàn bằng tay, ' + (t.nghe ? 'theo đúng cách ' + t.nghe : 'không qua dây chuyền đúc sẵn') + '.',
        t.lieu ? 'Chất liệu gốc là ' + t.lieu + ', ' + (t.mau ? 'giữ sắc ' + t.mau + ' sau công đoạn hoàn thiện cuối' : 'giữ màu và vân tự nhiên của vật liệu') + '.' : 'Bề mặt giữ nguyên ' + (t.mau ? 'sắc ' + t.mau : 'màu vốn có của vật liệu') + ', không phủ sơn công nghiệp.',
        t.dung ? 'Kích thước vừa tay để dùng hằng ngày: ' + t.dung + ', ' + (t.lieu ? 'càng dùng càng quen' : 'đủ nhẹ để mang theo') + '.' : 'Sản phẩm phù hợp làm quà tặng thủ công cho người thích đồ độc bản.',
        'Mỗi chiếc chênh nhau vài đường nét và độ đậm nhạt của màu — đó là dấu vết của việc làm tay, không phải lỗi.'
      ]
    },
    function (t) {
      return [
        t.ten + ' bắt đầu từ một ' + (t.lieu ? 'khối ' + t.lieu : 'ý tưởng nhỏ') + ' trên bàn làm việc của ' + t.xuong + '.',
        (t.nghe ? 'Qua ' + t.nghe : 'Qua nhiều công đoạn thủ công') + ', người thợ phải giữ tay thật đều để ' + (t.dung ? t.dung : 'tạo hình') + ' cân đối ở mọi góc nhìn.',
        t.mau ? 'Màu ' + t.mau + ' ' + (t.lieu && /men/.test(t.lieu) ? 'là kết quả của lớp men phản ứng với lửa, không pha sẵn theo bảng màu' : 'được lấy từ chính vật liệu, không tô vẽ thêm') + '.' : 'Màu của sản phẩm là màu tự thân của vật liệu, không tô vẽ thêm.',
        'Đặt một chiếc về bàn, bạn đang giữ cả thời gian làm việc và câu chuyện của người làm ra nó.'
      ]
    },
    function (t) {
      return [
        'Một chiếc ' + (t.dung ? t.dung.split(',')[0] : 'sản phẩm') + ' ' + (t.nghe ? 'làm theo kiểu ' + t.nghe : 'chưa qua công nghiệp') + ', mang tên ' + t.ten + ' trong bộ sưu tập của ' + t.xuong + '.',
        t.lieu ? 'Nhờ ' + t.lieu + ', sản phẩm nhẹ và bền theo cách của đồ thủ công: chịu được dùng hằng ngày nhưng vẫn giữ vân tay người thợ.' : 'Sản phẩm gọn, dùng được hằng ngày và dễ phối với bàn gỗ hoặc kệ vải.',
        'Bạn có thể đặt khắc tên, chọn ' + (t.mau ? 'sắc ' + t.mau + ' đậm nhạt hơn' : 'màu theo mẫu riêng') + ' hoặc số lượng cho quà tặng sự kiện.',
        t.xuong + ' mô tả đúng những gì có thể làm tại xưởng; chi tiết vượt khả năng sẽ được báo lại trước khi nhận đơn.'
      ]
    }
  ];
  // Bo tu khoa tho (tach dau phay va xuong dong) thanh tung cum tu that.
  function tachTuKhoa(tho) {
    return String(tho || '').split(/[,;\n]+/).map(function (cum) {
      return cum.trim().replace(/\s+/g, ' ')
    }).filter(Boolean).slice(0, 10)
  }
  // Tim trong tu dien xem cum tu nay thuoc nhom nao (so khop dai nhat truoc).
  function phanLoai(tuKhoa) {
    const ketQua = {};
    const daDat = new Set();
    for (const [nhom, cacTu] of Object.entries(TU_DIEN)) ketQua[nhom] = [];
    for (const cum of tuKhoa) {
      const chuan = cum.toLocaleLowerCase('vi');
      for (const [nhom, cacTu] of Object.entries(TU_DIEN)) {
        const khop = cacTu.filter(tu => chuan.includes(tu)).sort((a, b) => b.length - a.length)[0];
        if (khop && !daDat.has(nhom + ':' + khop)) {
          daDat.add(nhom + ':' + khop);
          ketQua[nhom].push(cum)
        }
      }
    }
    return ketQua
  }
  // Gom cac cum tu da phan loai thanh chuoi dung trong doan van.
  // Co the can loai bo ten goi san pham ("binh gom" -> "gom") de cau van thuan.
  function lamSach(cum, canTru) {
    let ra=cum.toLocaleLowerCase('vi');
    for(const tu of canTru)ra=ra.split(tu).join(' ');
    return ra.replace(/\s+/g, ' ').trim()
  }
  function lietKe(danhSach, toiDa, canTru) {
    const cat=[];
    for(const cum of danhSach) {
      const x = cum.toLocaleLowerCase('vi');
      const sach=canTru?lamSach(cum, canTru):x;
      if(sach && !cat.includes(sach))cat.push(sach);
      if(cat.length>=(toiDa||3))break
    }
    if (!cat.length) return '';
    if (cat.length === 1) return cat[0];
    return cat.slice(0, -1).join(', ') + ' và ' + cat[cat.length - 1]
  }
  // Sinh bo tu khoa SEO tu ten, danh muc va nhung gi nguoi dung nhap.
  function tuKhoaSEO(ten, danhMuc, nhom, goc) {
    const deNghi = [ten.toLocaleLowerCase('vi'), (danhMuc + ' ' + ten).toLocaleLowerCase('vi')];
    for (const cum of goc) deNghi.push((danhMuc + ' ' + cum).toLocaleLowerCase('vi'), cum.toLocaleLowerCase('vi'));
    for (const nhomTen of ['nghe', 'mau', 'dung']) for (const cum of nhom[nhomTen]) deNghi.push(cum.toLocaleLowerCase('vi'));
    deNghi.push('quà tặng thủ công', 'đồ handmade ' + danhMuc.toLocaleLowerCase('vi'), 'đặt làm theo yêu cầu');
    const duyNhat = [];
    for (const tu of deNghi) {
      const clean = tu.replace(/[^\p{L}\p{N} ]/gu, '').trim();
      if (clean && !duyNhat.includes(clean) && clean.length <= 40) duyNhat.push(clean)
    }
    return duyNhat.slice(0, 8)
  }
  // ==================== HAM CHINH: SINH MO TA + GIAI THICH ====================
  // kieu: 0..2, vat bat truc tiep tu window.docGianHang() khi co (khong loi neu chua luu ho so).
  function viet(tuKhoaTho, tenSanPham, danhMuc, kieu) {
    const goc = tachTuKhoa(tuKhoaTho);
    if (!goc.length) return { loi: 'Cần ít nhất một từ khoá để bộ quy tắc có dữ liệu ghép câu.' };
    const nhom = phanLoai(goc);
    const xuong = (typeof docGianHang === 'function' ? docGianHang().ten : '') || 'nhà CraftLink';
    const t = {
      ten: (tenSanPham || '').trim() || goc[0], danhMuc: danhMuc || 'Thủ công', xuong: xuong,
      lieu: lietKe(nhom.lieu, 3, TU_DIEN.dung), nghe: lietKe(nhom.nghe, 2), mau: lietKe(nhom.mau, 1), dung: lietKe(nhom.dung, 3)
    };
    const moTa = CAC_KIEU[Math.abs(Number(kieu) || 0) % CAC_KIEU.length](t).join(' ');
    const soTu = moTa.split(/\s+/).filter(Boolean).length;
    const giaiThich = [
      {
        level: 'ok', text: 'Đoạn văn ghép từ ' + goc.length + ' từ khoá bạn nhập, nhận diện được ' + (nhom.lieu.length + nhom.nghe.length + nhom.mau.length + nhom.dung.length) + ' cụm thuộc nhóm chất liệu / kỹ thuật / màu / công dụng.'
      }, {
        level: 'warn', text: 'Đây là bộ quy tắc có sẵn trong js/ai/copywriter.js, không gọi mô hình nào. Câu chữ do máy ghép, chưa chắc đúng với sản phẩm thật của bạn.'
      }
    ];
    if (!nhom.lieu.length) giaiThich.push({ level: 'tip', text: 'Chưa nhận ra chất liệu (gốm, cói, mây, vải…). Thêm một từ về chất liệu để câu mở đầu có dữ liệu thật.' });
    if (!nhom.nghe.length) giaiThich.push({ level: 'tip', text: 'Chưa có từ khoá kỹ thuật (vuốt tay, đan tay, men hỏa biến…). Đây là phần khách tìm nhiều nhất khi lọc đồ thủ công.' });
    if (soTu < 60) giaiThich.push({ level: 'tip', text: 'Mô tả mới có ' + soTu + ' từ. Nên bổ sung kích thước và hướng bảo quản bằng tay trước khi lưu.' });
    else giaiThich.push({ level: 'ok', text: 'Độ dài ' + soTu + ' từ, nằm trong khoảng vừa hiển thị trên thẻ sản phẩm.' });
    return {
      moTa: moTa, tuKhoa: tuKhoaSEO(t.ten, t.danhMuc, nhom, goc), giaiThich: giaiThich, soTu: soTu
    }
  }
  window.AIThuCong = {
    viet: viet, tachTuKhoa: tachTuKhoa
  }
})();
