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
    editing=null; $('#listing-modal-title').textContent='Tạo listing mới'; $('#listing-form').reset(); applyFormImage(''); $('#listing-modal').classList.remove('hidden-state'); $('#new-name').focus()
  });
  const statusNames= {
    live: 'Đang hoạt động', pending: 'Chờ duyệt', draft: 'Bản nháp'
  };
  $('#listing-collection').addEventListener('click', e=> {
    const btn=e.target.closest('button'), row=btn?.closest('.listing-row'); if(!row)return; if(btn.classList.contains('archive-product')) {
      archiveTarget=row; $('#archive-modal').classList.remove('hidden-state'); $('#confirm-archive').focus()
    }
    else if(btn.classList.contains('edit-product')) {
      editing=row; $('#listing-modal-title').textContent='Chỉnh sửa listing'; $('#new-name').value=row.dataset.name; $('#new-price').value=row.dataset.price; $('#new-stock').value=row.dataset.stock; $('#new-category').value=row.dataset.category; $('#new-image-file').value=''; $('#new-image-url').value=''; const currentImage=rowImageSrc(row); $('#new-image-url').value=currentImage; applyFormImage(currentImage, currentImage?'Listing này đã có ảnh. Chọn tệp khác để thay thế.':'Chưa có ảnh. Chọn tệp hoặc dán URL để gắn ảnh.'); $('#listing-modal').classList.remove('hidden-state'); $('#new-name').focus()
    }
    else if(btn.classList.contains('stats-product'))notify(row.dataset.name+' · '+statusNames[row.dataset.status]+' · Tồn kho '+row.dataset.stock+' sản phẩm. Đây là thống kê mẫu.')
  });
  $('#confirm-archive').addEventListener('click', ()=> {
    if(archiveTarget) {
      archiveTarget.dataset.archived='true'; archiveTarget=null; refreshListings(); notify('Đã lưu trữ listing trong phiên này.')
    }
    closeModals()
  });
  $('#listing-form').addEventListener('submit', e=> {
    e.preventDefault(); const name=$('#new-name').value.trim(), price=Number($('#new-price').value), stock=Number($('#new-stock').value), category=$('#new-category').value; if(!name||!Number.isFinite(price)||price<0||!Number.isInteger(stock)||stock<0)return; if(editing) {
      Object.assign(editing.dataset, {
        name, price, stock, category, image: formImage
      }); editing.querySelector('.product strong').textContent=name; editing.querySelector('.row-price').textContent=money(price); editing.querySelector('.row-category').textContent=category; editing.querySelector('.row-stock').textContent=stock; const oldThumb=editing.querySelector('.product img, .product .thumb-ph'), nextThumb=thumbFor(formImage, name); oldThumb?oldThumb.replaceWith(nextThumb):editing.querySelector('.product').prepend(nextThumb); notify(formImage?'Đã cập nhật listing kèm ảnh trong phiên này.':'Đã cập nhật listing trong phiên này.')
    }
    else {
      const row=document.createElement('article'); row.className='listing-row'; Object.assign(row.dataset, {
        productId: 'new-'+Date.now(), name, price, stock, category, image: formImage, status: 'draft'
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
  // ==================== PHẦN 2: HÒM THƯ BRIEF ====================
  // Dữ liệu brief mẫu của các khách hàng.
})();
