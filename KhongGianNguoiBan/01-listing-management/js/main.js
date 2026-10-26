// ==================== PHAN 1: QUAN LY LISTING ====================
// File nay xu ly tim kiem, loc, them, sua va luu tru san pham.
(function () {
  let demoEmpty=false, loading=false, archiveTarget=null, editing=null;
  let formImage='';
  const maxImageBytes=5*1024*1024;
  // Hien anh du dinh dang khi listing chua co anh.
  function thumbFor(src, alt) {
    if (src) {
      const img=document.createElement('img'); img.src=src; img.alt=alt; img.loading='lazy'; return img
    }
    const ph=document.createElement('span'); ph.className='thumb-ph'; ph.textContent='CL'; ph.setAttribute('aria-hidden', 'true'); return ph
  }
  // Anh cua mot dong: uu tien gia tri da luu trong du lieu, den anh dang hien thi.
  function rowImageSrc(row) {
    if(row.dataset.image!==undefined)return row.dataset.image;
    return row.querySelector('.product img')?.src||''
  }
  // Cap nhat anh dang chon trong bieu mau.
  function applyFormImage(src, feedback, kiemTra) {
    formImage=src||'';
    const img=$('#new-image-preview'), placeholder=$('#new-image-placeholder');
    img.classList.toggle('hidden-state', !formImage); placeholder.classList.toggle('hidden-state', !!formImage);
    img.onerror=null; img.onload=null;
    if(!formImage) {
      img.removeAttribute('src'); $('#image-feedback').textContent=feedback||'Chưa có ảnh. Chọn tệp hoặc dán URL để ảnh hiện trong danh sách.'; return
    }
    img.src=formImage;
    if(kiemTra) {
      img.onload=()=> {
        img.onload=null; $('#image-feedback').textContent='Liên kết mở được ảnh. Ảnh sẽ hiện trong danh sách sau khi lưu.'
      };
      img.onerror=()=>applyFormImage('', 'URL này không mở được tệp ảnh. Hãy kiểm tra lại liên kết.')
    }
    $('#image-feedback').textContent=feedback||(formImage?'Đã gắn ảnh cho listing.':'Chưa có ảnh. Chọn tệp hoặc dán URL để ảnh hiện trong danh sách.')
  }
  function isUsableImageLink(raw) {
    if(/\s/.test(raw))return false;
    try {
      const url=new URL(raw, window.location.href); return ['http:', 'https:', 'data:', 'blob:'].includes(url.protocol)
    }
    catch (err) {
      return false
    }
  }
  $('#new-image-file').addEventListener('change', ()=> {
    const file=$('#new-image-file').files[0]; if(!file)return;
    if(!file.type.startsWith('image/')) {
      $('#new-image-file').value=''; applyFormImage('', 'Tệp phải là ảnh JPG, PNG hoặc WEBP.'); notify('Tệp không hợp lệ, hãy chọn tệp ảnh.'); return
    }
    if(file.size>maxImageBytes) {
      $('#new-image-file').value=''; applyFormImage('', 'Ảnh cần nhỏ hơn 5 MB. Hãy chọn tệp khác.'); notify('Ảnh quá lớn, tối đa 5 MB.'); return
    }
    $('#new-image-url').value=''; applyFormImage(URL.createObjectURL(file), 'Đã chọn “'+file.name+'”. Ảnh chỉ hiển thị trong phiên dùng thử này.')
  });
  $('#new-image-url').addEventListener('input', ()=> {
    const raw=$('#new-image-url').value.trim(); if(!raw) {
      applyFormImage(''); return
    }
    if(!isUsableImageLink(raw)) {
      applyFormImage('', 'URL chưa dùng được. Hãy dùng liên kết http, https hoặc ảnh dữ liệu.'); return
    }
    $('#new-image-file').value=''; applyFormImage(raw, 'Đang kiểm tra liên kết ảnh…', true)
  });
  $('#clear-image').addEventListener('click', ()=> {
    $('#new-image-file').value=''; $('#new-image-url').value=''; applyFormImage('', 'Đã gỡ ảnh. Listing mới sẽ hiện ô ảnh mẫu.')
  });
  // Lọc sản phẩm theo từ khóa và trạng thái, đồng thời cập nhật số liệu.
  function refreshListings() {
    const rows=[...document.querySelectorAll('.listing-row')]; let visible=0; for(const row of rows) {
      const show=!row.dataset.archived&&!demoEmpty&&($('#listing-filter').value==='all'||row.dataset.status===$('#listing-filter').value)&&row.dataset.name.toLocaleLowerCase('vi').includes($('#listing-search').value.trim().toLocaleLowerCase('vi')); row.classList.toggle('hidden-state', !show); if(show)visible++
    }
    $('#listing-collection').classList.toggle('hidden-state', loading||!visible); $('#listing-empty').classList.toggle('hidden-state', loading||!!visible); $('#listing-loading').classList.toggle('hidden-state', !loading); for(const status of ['live', 'pending', 'draft'])$('#metric-'+status).textContent=rows.filter(row=>!row.dataset.archived&&row.dataset.status===status).length
  }
  $('#listing-search').addEventListener('input', ()=> {
    demoEmpty=false; refreshListings()
  }); $('#listing-filter').addEventListener('change', ()=> {
    demoEmpty=false; refreshListings()
  }); $('#clear-filters').addEventListener('click', ()=> {
    $('#listing-search').value=''; $('#listing-filter').value='all'; demoEmpty=false; refreshListings()
  }); $('#demo-empty').addEventListener('click', ()=> {
    demoEmpty=true; loading=false; refreshListings()
  }); $('#demo-loading').addEventListener('click', ()=> {
    loading=true; refreshListings(); setTimeout(()=> {
      loading=false; refreshListings()
    }, 1300)
  });
  for(const mode of ['table', 'grid'])$('#'+mode+'-view').addEventListener('click', ()=> {
    $('#listing-collection').classList.toggle('listing-grid', mode==='grid'); for(const choice of ['table', 'grid']) {
      const button=$('#'+choice+'-view'); button.classList.toggle('active-toggle', choice===mode); button.setAttribute('aria-pressed', String(choice===mode))
    }
  });
  // Đóng tất cả cửa sổ bật lên.
  function closeModals() {
    document.querySelectorAll('.modal-backdrop').forEach(el=>el.classList.add('hidden-state'))
  }
  document.querySelectorAll('.close-modal').forEach(el=>el.addEventListener('click', closeModals)); document.querySelectorAll('.modal-backdrop').forEach(el=>el.addEventListener('click', e=> {
    if(e.target===el)closeModals()
  })); document.addEventListener('keydown', e=> {
    if(e.key==='Escape')closeModals()
  });
  $('#create-listing').addEventListener('click', ()=> {
    editing=null; $('#listing-modal-title').textContent='Tạo listing mới'; $('#listing-form').reset(); applyFormImage(''); resetWriter(false); $('#listing-modal').classList.remove('hidden-state'); $('#new-name').focus()
  });
  const statusNames= {
    live: 'Đang hoạt động', pending: 'Chờ duyệt', draft: 'Bản nháp'
  };
  $('#listing-collection').addEventListener('click', e=> {
    const btn=e.target.closest('button'), row=btn?.closest('.listing-row'); if(!row)return; if(btn.classList.contains('archive-product')) {
      archiveTarget=row; $('#archive-modal').classList.remove('hidden-state'); $('#confirm-archive').focus()
    }
    else if(btn.classList.contains('edit-product')) {
      editing=row; $('#listing-modal-title').textContent='Chỉnh sửa listing'; $('#new-name').value=row.dataset.name; $('#new-price').value=row.dataset.price; $('#new-stock').value=row.dataset.stock; $('#new-category').value=row.dataset.category; $('#new-description').value=row.dataset.description||''; $('#new-keywords').value=row.dataset.keywords||''; resetWriter(false); $('#ai-keywords').value=row.dataset.keywords||''; $('#new-image-file').value=''; $('#new-image-url').value=''; const currentImage=rowImageSrc(row); $('#new-image-url').value=currentImage; applyFormImage(currentImage, currentImage?'Listing này đã có ảnh. Chọn tệp khác để thay thế.':'Chưa có ảnh. Chọn tệp hoặc dán URL để gắn ảnh.'); $('#listing-modal').classList.remove('hidden-state'); $('#new-name').focus()
    }
    else if(btn.classList.contains('stats-product')) {
      const moTa=row.dataset.description, ngan=moTa&&moTa.length>110?moTa.slice(0, 110)+'…':moTa; notify(row.dataset.name+' · '+statusNames[row.dataset.status]+' · Tồn kho '+row.dataset.stock+' sản phẩm'+(ngan?' · Mô tả đã lưu: “'+ngan+'”':' · Chưa có mô tả.')+' Đây là thống kê mẫu.')
    }
  });
  $('#confirm-archive').addEventListener('click', ()=> {
    if(archiveTarget) {
      archiveTarget.dataset.archived='true'; archiveTarget=null; refreshListings(); notify('Đã lưu trữ listing trong phiên này.')
    }
    closeModals()
  });
  $('#listing-form').addEventListener('submit', e=> {
    e.preventDefault(); const name=$('#new-name').value.trim(), price=Number($('#new-price').value), stock=Number($('#new-stock').value), category=$('#new-category').value, moTaTuKhoa=readWriterFields(); if(!name||!Number.isFinite(price)||price<0||!Number.isInteger(stock)||stock<0)return; if(editing) {
      Object.assign(editing.dataset, {
        name, price, stock, category, image: formImage, description: moTaTuKhoa.description, keywords: moTaTuKhoa.keywords
      }); editing.querySelector('.product strong').textContent=name; editing.querySelector('.row-price').textContent=money(price); editing.querySelector('.row-category').textContent=category; editing.querySelector('.row-stock').textContent=stock; const oldThumb=editing.querySelector('.product img, .product .thumb-ph'), nextThumb=thumbFor(formImage, name); oldThumb?oldThumb.replaceWith(nextThumb):editing.querySelector('.product').prepend(nextThumb); notify(formImage?'Đã cập nhật listing kèm ảnh trong phiên này.':'Đã cập nhật listing trong phiên này.')
    }
    else {
      const row=document.createElement('article'); row.className='listing-row'; Object.assign(row.dataset, {
        productId: 'new-'+Date.now(), name, price, stock, category, image: formImage, status: 'draft', description: moTaTuKhoa.description, keywords: moTaTuKhoa.keywords
      }); const product=document.createElement('div'); product.className='product'; const inner=document.createElement('div'); const title=document.createElement('strong'); title.textContent=name; const code=document.createElement('small'); code.textContent='Bản nháp mới'; inner.append(title, code); product.append(thumbFor(formImage, name), inner); row.append(product); for(const [value, cls] of [[money(price), 'row-price'], [category, 'row-category'], [String(stock), 'row-stock']]) {
        const cell=document.createElement('span'); cell.className=cls; cell.textContent=value; row.append(cell)
      }
      const status=document.createElement('span'); const badge=document.createElement('span'); badge.className='chip draft'; badge.textContent='Bản nháp'; status.append(badge); row.append(status); const date=document.createElement('span'); date.textContent=new Intl.DateTimeFormat('vi-VN').format(new Date()); row.append(date); const actions=document.createElement('div'); actions.className='actions'; for(const [label, cls] of [['Chỉnh sửa', 'edit-product'], ['Lưu trữ', 'archive-product'], ['Xem thống kê', 'stats-product']]) {
        const button=document.createElement('button'); button.type='button'; button.className='small-btn '+cls; button.textContent=label; actions.append(button)
      }
      row.append(actions); $('#listing-collection').append(row); notify('Đã tạo bản nháp listing trong phiên này.')
    }
    demoEmpty=false; $('#listing-search').value=''; $('#listing-filter').value='all'; refreshListings(); closeModals()
  });
  // ==================== PHAN 2: BO GOI Y MO TA SAN PHAM (AI COPYWRITER & SEO) ====================
  // Nhap -> Dang xu ly -> Ket qua -> Giai thich -> chap nhan / sua / tao lai / bo -> Luu.
  let kieuMoTa=0, ketQuaAI=null, dangSoan=false;
  const NHAN_MUC={ ok:'Đã làm', tip:'Nên thêm', warn:'Cẩn trọng' };
  const MO_TA_DAU='Nhập vài từ khoá ngắn về chất liệu và kỹ thuật, bộ quy tắc sẽ ghép thành mô tả kèm danh sách từ khoá gợi ý. Máy không gọi mô hình nào, mọi câu chữ đều tra được trong mã nguồn.';
  // Doi nhan trang thai o goc hop goi y.
  function writerStatus(text, cls) {
    $('#writer-status').textContent=text; $('#writer-status').className='chip '+cls
  }
  // Ve ket qua + danh sach giai thich ra hop goi y.
  function showWriterResult(ketQua, daUngDien) {
    ketQuaAI=ketQua; $('#writer-result').classList.remove('hidden-state');
    $('#writer-output').textContent=ketQua.moTa; $('#writer-keywords').textContent=ketQua.tuKhoa.join(' · ');
    $('#writer-notes').replaceChildren(...ketQua.giaiThich.map(g=> {
      const li=document.createElement('li'); li.className='advisor-'+g.level;
      const chu=document.createElement('span'); chu.className='advisor-tag'; chu.textContent=NHAN_MUC[g.level];
      const noiDung=document.createElement('span'); noiDung.className='advisor-text'; noiDung.textContent=g.text;
      li.append(chu, noiDung); return li
    }));
    $('#use-writer').disabled=daUngDien; writerStatus(daUngDien?'Đã điền vào mẫu, bạn sửa tiếp được':'Kết quả đang chờ bạn quyết', daUngDien?'live':'draft')
  }
  // Dong hop ket qua va tra loi mo dau ve nguon cua bo goi y.
  function resetWriter(keepKeywords) {
    ketQuaAI=null; $('#writer-result').classList.add('hidden-state'); $('#writer-description').textContent=MO_TA_DAU;
    if(!keepKeywords)$('#ai-keywords').value=''
  }
  // Goi bo quy tac, co mot khoang choi de trang thai "dang soan" nhin duoc thay.
  function askWriter() {
    if(dangSoan)return;
    const tho=$('#ai-keywords').value; dangSoan=true; const nut=$('#ask-writer'); nut.disabled=true; nut.textContent='Đang soạn mô tả…';
    setTimeout(()=> {
      dangSoan=false; nut.disabled=false; nut.textContent='✦ Nhờ AI sáng tạo mô tả';
      const ketQua=AIThuCong.viet(tho, $('#new-name').value, $('#new-category').value, kieuMoTa);
      if(ketQua.loi) {
        $('#writer-result').classList.add('hidden-state'); ketQuaAI=null; $('#writer-description').textContent=ketQua.loi; notify('Chưa có từ khoá nào để bộ gợi ý dùng.'); return
      }
      $('#writer-description').textContent='Bộ quy tắc đã dùng '+AIThuCong.tachTuKhoa(tho).length+' từ khoá bạn nhập để ghép '+ketQua.soTu+' từ. Đọc phần giải thích bên dưới trước khi quyết định.';
      showWriterResult(ketQua, false); notify('Đã soạn mô tả và '+ketQua.tuKhoa.length+' từ khoá gợi ý.')
    }, 700)
  }
  $('#ask-writer').addEventListener('click', ()=> {
    kieuMoTa=0; askWriter()
  });
  $('#redo-writer').addEventListener('click', ()=> {
    kieuMoTa++; askWriter()
  });
  $('#use-writer').addEventListener('click', ()=> {
    if(!ketQuaAI)return; $('#new-description').value=ketQuaAI.moTa; $('#new-keywords').value=ketQuaAI.tuKhoa.join(', ');
    showWriterResult(ketQuaAI, true); notify('Đã điền mô tả và từ khoá vào mẫu. Kiểm tra lại độ dài trước khi lưu.')
  });
  $('#reject-writer').addEventListener('click', ()=> {
    resetWriter(true); notify('Đã bỏ kết quả. Mô tả trong mẫu giữ nguyên.')
  });
  //Nguoi dung sua tay thi nhan ngay de trang thai khong con bao "cho quyet dinh".
  $('#new-description').addEventListener('input', ()=> {
    if(ketQuaAI&&$('#new-description').value!==ketQuaAI.moTa)writerStatus('Bạn đã sửa bằng tay', 'pending')
  });
  // ==================== PHAN 3: LUU LISTING ====================
  // Luu mo ta va tu khoa cua AI vao dataset cua dong san pham.
  function readWriterFields() {
    return {
      description: $('#new-description').value.trim(), keywords: $('#new-keywords').value.trim()
    }
  }
  // ==================== PHÀN 2: HÒM THƯ BRIEF ====================
  // Dữ liệu brief mẫu của các khách hàng.
})();
