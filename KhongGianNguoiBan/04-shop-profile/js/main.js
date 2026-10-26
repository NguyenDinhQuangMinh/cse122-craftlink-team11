// ==================== PHAN 1: DOC/GHI HO SO GIAN HANG ====================
// Bieu mau ben trai, khung xem truoc ben phai, du lieu nam trong localStorage qua
// docGianHang() va luuGianHang() cua js/chung.js.
(function () {
  const maxImageBytes=5*1024*1024;
  let anhDaiDien='', anhBia='';
  const $o={
    ten: $('#pf-name'), chuyenMon: $('#pf-craft'), cauChuyen: $('#pf-story'), diaChi: $('#pf-address'),
    dienThoai: $('#pf-phone'), email: $('#pf-email')
  };
  // An/au anh: chi gan src khi co anh moi, anh cu van con trong the nen khong phai tai lai.
  function setImage(kind, src, feedback) {
    const coAnh=!!src;
    if(kind==='avatar') {
      anhDaiDien=src; $('#pf-avatar-ph').classList.toggle('hidden-state', coAnh); $('#pf-avatar-preview').classList.toggle('hidden-state', !coAnh); $('#pv-avatar').classList.toggle('hidden-state', coAnh); $('#pv-avatar-img').classList.toggle('hidden-state', !coAnh)
    }
    else {
      anhBia=src; $('#pf-cover-ph').classList.toggle('hidden-state', coAnh); $('#pf-cover-preview').classList.toggle('hidden-state', !coAnh); $('#pv-cover').classList.toggle('hidden-state', coAnh)
    }
    if(coAnh)for(const id of ['#pf-'+kind+'-preview', kind==='avatar'?'#pv-avatar-img':'#pv-cover']) {
      const anh=$(id); anh.onload=null; anh.onerror=null; anh.src=src
    }
    $('#pf-'+kind+'-feedback').textContent=feedback||(coAnh?'Đã gắn ảnh.':'Chưa có ảnh. Chọn tệp hoặc dán URL.');
    capNhatXemTruoc()
  }
  // URL anh phai mo duoc thi moi giu, tranh luu mot lien ket loi.
  function isUsableImageLink(raw) {
    if(/\s/.test(raw))return false;
    try {
      const url=new URL(raw, window.location.href); return ['http:', 'https:', 'data:', 'blob:'].includes(url.protocol)
    }
    catch (err) {
      return false
    }
  }
  // Noi dung bieu mau hien tai, khong cat khoang trang dau.
  function docForm() {
    return {
      ten: $o.ten.value.trim(), chuyenMon: $o.chuyenMon.value.trim(), cauChuyen: $o.cauChuyen.value.trim(),
      diaChi: $o.diaChi.value.trim(), dienThoai: $o.dienThoai.value.trim(), email: $o.email.value.trim(), avatar: anhDaiDien, anhBia: anhBia
    }
  }
  // Day mot ho so (doc tu localStorage) nguoc lai vao bieu mau.
  function napForm(hoSo) {
    $o.ten.value=hoSo.ten; $o.chuyenMon.value=hoSo.chuyenMon; $o.cauChuyen.value=hoSo.cauChuyen;
    $o.diaChi.value=hoSo.diaChi; $o.dienThoai.value=hoSo.dienThoai; $o.email.value=hoSo.email;
    $('#pf-avatar-file').value=''; $('#pf-avatar-url').value=''; $('#pf-cover-file').value=''; $('#pf-cover-url').value='';
    setImage('avatar', hoSo.avatar||''); setImage('cover', hoSo.anhBia||'')
  }
  // ==================== PHAN 2: KHUNG XEM TRUOC ====================
  // Khung nay chay theo tung go phim nen nguoi ban biet khach thay gi truoc khi luu.
  function capNhatXemTruoc() {
    const hoSo=docForm();
    $('#pv-name').textContent=hoSo.ten||'(Chưa đặt tên xưởng)'; $('#pv-craft').textContent=hoSo.chuyenMon||'Chưa chọn chuyên môn';
    $('#pv-story').textContent=hoSo.cauChuyen||'Chưa có câu chuyện thương hiệu.';
    $('#pv-address').textContent=hoSo.diaChi||'—'; $('#pv-phone').textContent=hoSo.dienThoai||'—'; $('#pv-email').textContent=hoSo.email||'—';
    $('#pv-avatar').textContent=(hoSo.ten||'CL').split(/\s+/).filter(Boolean).slice(-2).map(tu=>tu[0]).join('').toLocaleUpperCase('vi')||'CL';
    $('#pf-story-count').textContent=$o.cauChuyen.value.length;
    $('#pv-cover-note').classList.toggle('hidden-state', !!hoSo.anhBia)
  }
  function doiNhanTrangThai(text, cls) {
    $('#profile-status').textContent=text; $('#profile-status').className='chip '+cls
  }
  function hienThiGioLuu(luc) {
    $('#pv-updated').textContent=luc?new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit'
    }).format(new Date(luc)):'Chưa lưu trong trình duyệt này'
  }
  // ==================== PHAN 3: KIEM TRA DU LIEU ====================
  // Moi loi tra ve them id cua o can sua de tim phan tu dau tien bi sai.
  function kiemTra(hoSo) {
    const loi=[];
    if(hoSo.ten.length<3)loi.push({ id: 'pf-name', text: 'Tên xưởng cần ít nhất 3 ký tự vì khách đọc tên này ở mọi màn hình.' });
    if(hoSo.chuyenMon.length<2)loi.push({ id: 'pf-craft', text: 'Chuyên môn giúp khách lọc đúng gian hàng, ví dụ “Gốm sứ”.' });
    if(hoSo.cauChuyen.length<40)loi.push({ id: 'pf-story', text: 'Câu chuyện đang có '+hoSo.cauChuyen.length+' ký tự, dưới 40 ký tự thì chưa kể được công đoạn làm tay. Viết thêm về chất liệu và thời gian hoàn thiện một sản phẩm.' });
    if(hoSo.diaChi.length<8)loi.push({ id: 'pf-address', text: 'Địa chỉ xưởng quá ngắn để khách tìm đến, nên có thôn/phường và quận/huyện.' });
    const so=hoSo.dienThoai.replace(/[^0-9]/g, '');
    if(so.length<8||so.length>15)loi.push({ id: 'pf-phone', text: 'Số điện thoại cần 8–15 chữ số, không kèm chữ.' });
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(hoSo.email))loi.push({ id: 'pf-email', text: 'Email gian hàng chưa đúng định dạng, khách sẽ không gửi yêu cầu được.' });
    return loi
  }
  function veLoi(loi) {
    $('#pf-errors').replaceChildren(...loi.map(g=> {
      const li=document.createElement('li'); li.className='advisor-warn';
      const chu=document.createElement('span'); chu.className='advisor-tag'; chu.textContent='Chưa được';
      const noiDung=document.createElement('span'); noiDung.className='advisor-text'; noiDung.textContent=g.text;
      li.append(chu, noiDung); return li
    }))
  }
  // ==================== PHAN 4: SU KIEN ====================
  for(const o of Object.values($o))o.addEventListener('input', ()=> {
    doiNhanTrangThai('Có thay đổi chưa lưu', 'pending'); veLoi([]); capNhatXemTruoc()
  });
  // An/mot anh: kiem tra ding dang va dung luong nhu trang listing.
  function taiAnhTuFile(kind) {
    const input=$('#pf-'+kind+'-file'), file=input.files[0]; if(!file)return;
    if(!file.type.startsWith('image/')) {
      input.value=''; notify('Tệp không hợp lệ, hãy chọn tệp ảnh.'); return
    }
    if(file.size>maxImageBytes) {
      input.value=''; notify('Ảnh quá lớn, tối đa 5 MB.'); return
    }
    $('#pf-'+kind+'-url').value=''; setImage(kind, URL.createObjectURL(file), 'Đã chọn “'+file.name+'”.')
  }
  for(const kind of ['avatar', 'cover']) {
    $('#pf-'+kind+'-file').addEventListener('change', ()=>taiAnhTuFile(kind));
    $('#pf-'+kind+'-url').addEventListener('input', ()=> {
      const raw=$('#pf-'+kind+'-url').value.trim();
      if(!raw) {
        setImage(kind, ''); return
      }
      if(!isUsableImageLink(raw)) {
        setImage(kind, '', 'URL chưa dùng được. Hãy dùng liên kết http, https hoặc ảnh dữ liệu.'); return
      }
      $('#pf-'+kind+'-file').value=''; setImage(kind, raw, 'Đang kiểm tra liên kết ảnh…');
      const img=$('#pf-'+kind+'-preview'); img.onload=()=> {
        img.onload=null; $('#pf-'+kind+'-feedback').textContent='Liên kết mở được ảnh, đã gắn vào hồ sơ.'
      };
      img.onerror=()=>setImage(kind, '', 'URL này không mở được tệp ảnh. Hãy kiểm tra lại liên kết.')
    });
    $('#pf-'+kind+'-clear').addEventListener('click', ()=> {
      $('#pf-'+kind+'-file').value=''; $('#pf-'+kind+'-url').value=''; setImage(kind, '', 'Đã gỡ ảnh khỏi hồ sơ.')
    })
  }
  $('#profile-form').addEventListener('submit', e=> {
    e.preventDefault(); const hoSo=docForm(), loi=kiemTra(hoSo); veLoi(loi);
    if(loi.length) {
      doiNhanTrangThai('Chưa lưu được', 'draft'); $('#'+loi[0].id).focus(); notify('Còn '+loi.length+' điểm cần sửa trước khi lưu hồ sơ.'); return
    }
    const hoSoDaLuu=luuGianHang(Object.assign(hoSo, {
      luLuc: Date.now()
    }));
    hienThiGioLuu(hoSoDaLuu.luLuc); doiNhanTrangThai('Đã lưu lúc '+new Intl.DateTimeFormat('vi-VN', {
      hour: '2-digit', minute: '2-digit'
    }).format(new Date(hoSoDaLuu.luLuc)), 'live'); notify('Đã lưu hồ sơ vào trình duyệt. Tên xưởng vừa cập nhật trên cả bốn màn hình.')
  });
  $('#reset-profile').addEventListener('click', ()=> {
    napForm(luuGianHang(Object.assign({}, GIAN_HANG_MAC_DINH, {
      luLuc: undefined
    }))); veLoi([]); hienThiGioLuu(undefined); doiNhanTrangThai('Đã khôi phục mặc định', 'draft'); notify('Hồ sơ đã quay về giá trị mặc định của bản dùng thử.')
  });
  // Lan dau vao trang: lay ho so da luu, neu chua co thi dung ban mac dinh.
  const hoSoHienTai=docGianHang();
  napForm(hoSoHienTai); hienThiGioLuu(hoSoHienTai.luLuc);
  doiNhanTrangThai(localStorage.getItem(KHO_GIAN_HANG)?'Đang dùng hồ sơ đã lưu':'Chưa lưu trong trình duyệt này', 'draft');
  $('#pv-storage').textContent='Hồ sơ chỉ nằm trong localStorage của trình duyệt này (mốc craftlink:gian-hang), không gửi đi đâu và không cần tải lại trang để thấy thay đổi.';
  capNhatXemTruoc()
})();
