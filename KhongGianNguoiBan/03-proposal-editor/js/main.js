// ==================== PHAN 3: PROPOSAL ====================
// File nay xu ly bao gia, cac hang muc, tinh tong va tu van chi phi/tien do.
(function () {
  const briefs= {
    gifts:  {
      title: 'Bộ quà tặng gốm cho doanh nghiệp', customer: 'Mai Linh', initials: 'ML', budget: '8.000.000 – 12.000.000 đ', deadline: '30/10/2026', date: '2026-10-30', description: 'Cần 30 bộ quà gốm thủ công cho đối tác dịp cuối năm. Mỗi bộ gồm một cốc và đĩa nhỏ, phối men màu kem ấm, đóng hộp giấy tối giản.', criteria: ['30 bộ đồng đều về kích thước và màu men', 'Có hộp quà giấy và thiệp cảm ơn', 'Giao trước ngày 30/10/2026'], summary: '30 bộ cốc và đĩa gốm men kem; ưu tiên tính đồng bộ, đóng gói chỉn chu và giao trước 30/10.', status: 'Brief mới', cls: 'new', price: 9600000, days: 21, hangMuc: [['Tạo hình và tráng men bộ gốm', 30, 260000, 'Men kem ấm'], ['Đóng gói hộp quà', 30, 60000, 'Kèm thiệp']], loiNhan: 'Chào bạn, CraftLink rất vui được đồng hành cùng dự án này. Mình đề xuất bộ quà gốm thủ công với tông men ấm và đóng gói phù hợp làm quà tặng.'
    },
    macrame:  {
      title: 'Tranh tường macrame phòng khách', customer: 'Thu Hà', initials: 'TH', budget: '3.000.000 – 4.000.000 đ', deadline: '18/11/2026', date: '2026-11-18', description: 'Muốn một tranh macrame khổ lớn treo phía trên sofa. Tông màu be tự nhiên, họa tiết nút thắt mềm mại và có thanh gỗ sáng màu.', criteria: ['Khổ khoảng 120 × 90 cm', 'Sợi cotton màu be tự nhiên', 'Có thanh treo và hướng dẫn bảo quản'], summary: 'Một tranh macrame khổ lớn cho phòng khách; cần xác nhận kích thước thực tế trước khi đan.', status: 'Đang xem xét', cls: 'review', price: 3500000, days: 16, hangMuc: [['Đan tranh khổ 120 × 90 cm', 1, 2600000, 'Sợi cotton be tự nhiên'], ['Thanh gỗ và dây treo', 1, 500000, 'Mài nhẵn, đã luồn dây'], ['Bản hướng dẫn bảo quản', 1, 100000, 'Kèm khi giao']], loiNhan: 'Chào Thu Hà, mình có thể đan hoàn thiện tranh macrame khổ lớn cho phòng khách. Sau khi bạn xác nhận kích thước thực tế của tường, mình sẽ chốt mẫu nút thắt và màu sợi trước khi bắt đầu.'
    },
    wedding:  {
      title: 'Set ly cưới thủ công', customer: 'Bảo Ngọc', initials: 'BN', budget: '2.000.000 – 3.000.000 đ', deadline: '25/11/2026', date: '2026-11-25', description: 'Đặt hai ly gốm uống rượu dùng trong lễ cưới, khắc tên cô dâu chú rể và ngày kỷ niệm. Ưu tiên men trắng ngà với điểm nhấn nâu đất.', criteria: ['Hai ly có kích thước tương đồng', 'Khắc tên và ngày kỷ niệm', 'Hộp bảo vệ khi vận chuyển'], summary: 'Hai ly cưới gốm cá nhân hóa, tông trắng ngà và nâu đất; cần duyệt nội dung khắc trước khi nung.', status: 'Đã phản hồi', cls: 'replied', price: 2400000, days: 14, hangMuc: [['Tạo hình và tráng men hai ly', 2, 900000, 'Men trắng ngà, điểm nhấn nâu đất'], ['Khắc tên và ngày kỷ niệm', 2, 150000, 'Duyệt nội dung trước khi nung'], ['Hộp bảo vệ khi vận chuyển', 1, 200000, 'Lót chống sốc']], loiNhan: 'Chào Bảo Ngọc, hai ly cưới của mình sẽ được tạo hình cùng một khuôn để kích thước tương đồng. Mình sẽ gửi bản nét nội dung khắc để bạn duyệt trước khi đưa vào lò nung.'
    }
  };
  // Lay ma brief tren dia chi trang; neu khong co thi dung brief dau tien.
  const thamSoTrang = new URLSearchParams(window.location.search);
  let selectedBrief = thamSoTrang.get('brief') || 'gifts';
  if (!briefs[selectedBrief]) selectedBrief = 'gifts';
  let nextScopeId=1;
  // Thêm một dòng hạng mục vào bảng chi phí.
  function addScope(name='', qty=1, unit=0, note='') {
    const tr=document.createElement('tr'); tr.dataset.scopeId=String(nextScopeId++); for(const [type, label, value] of [['text', 'Hạng mục', name], ['number', 'Số lượng', qty], ['number', 'Đơn giá', unit], ['text', 'Ghi chú', note]]) {
      const td=document.createElement('td'); const input=document.createElement('input'); input.className='field'; input.type=type; input.setAttribute('aria-label', label); input.value=value; if(type==='number') {
        input.min=label==='Số lượng'?'1': '0'; input.step='1'
      }
      td.append(input); tr.append(td)
    }
    const td=document.createElement('td'); const remove=document.createElement('button'); remove.type='button'; remove.className='small-btn'; remove.setAttribute('aria-label', 'Xóa hạng mục'); remove.textContent='×'; td.append(remove); tr.append(td); $('#scope-body').append(tr); updatePreview()
  }
  // Cập nhật bản xem trước và tự tính tổng tiền các hạng mục.
  function updatePreview() {
    const b=briefs[selectedBrief]; $('#preview-project').textContent=$('#proposal-project').value.trim()||'Dự án chưa đặt tên'; $('#preview-greeting').textContent='Kính gửi '+b.customer+','; $('#preview-price').textContent=money($('#proposal-price').value); $('#preview-timeline').textContent='Thời gian hoàn thành: '+($('#proposal-days').value||'—')+' ngày'; const date=$('#proposal-date').value; $('#preview-date').textContent='Giao dự kiến: '+(date?new Intl.DateTimeFormat('vi-VN').format(new Date(date+'T12:00:00')): 'Chưa chọn'); $('#preview-message').textContent=$('#proposal-message').value||'Chưa có lời nhắn.'; let total=0; const tbody=$('#preview-scope'), rows=[...document.querySelectorAll('#scope-body tr')]; while(tbody.children.length>rows.length)tbody.lastChild.remove(); rows.forEach((row, i)=> {
      const inputs=row.querySelectorAll('input'); const amount=(Number(inputs[1].value)||0)*(Number(inputs[2].value)||0); total+=amount; let out=tbody.children[i]; if(!out) {
        out=document.createElement('tr'); out.append(document.createElement('td'), document.createElement('td')); tbody.append(out)
      }
      out.children[0].textContent=(inputs[0].value||'Hạng mục mới')+' · '+(inputs[1].value||0)+(inputs[3].value?' · '+inputs[3].value: ''); out.children[1].textContent=money(amount)
    }); $('#scope-total').textContent=money(total); $('#step3-scope-total').textContent=money(total); renderAdvice()
  }
  // ==================== TU VAN CHI PHI & TIEN DO ====================
  const bienLoiNhuan=0.1; // 10% bien loi nhuyen khuyen nghi tren tong hang muc
  const tuNgungChung= ['va', 'hoac', 'cac', 'can', 'khi', 'de', 'cho', 'cua', 'duoc', 'mot', 'nay', 'co'];
  // Bo dau ngon ngu Viet de so sanh chuoi khong phu thuoc dau.
  function khongDau(text) {
    return String(text).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')
  }
  // Lay gia tri thap nhat va cao nhat trong chuoi ngan sach kieu "8.000.000 – 12.000.000 đ".
  function docNganSach(text) {
    const cacSo=(String(text).match(/\d[\d.,]*/g)||[]).map(so=>Number(so.replace(/\D/g, ''))).filter(so=>so>0);
    return {
      min:cacSo.length?Math.min(...cacSo):0, max:cacSo.length?Math.max(...cacSo):0
    }
  }
  function lamTronGia(so) {
    return Math.ceil(so/1000)*1000
  }
  function datGia(moi) {
    $('#proposal-price').value=Math.round(moi); updatePreview()
  }
  function datSotNgay(moi) {
    $('#proposal-days').value=Math.max(1, Math.round(moi)); updatePreview()
  }
  function datNgayGiao(moi) {
    $('#proposal-date').value=moi; updatePreview()
  }
  // Doc toan bo hang muc dang nhap trong bang chi phi.
  function docHangMuc() {
    return [...document.querySelectorAll('#scope-body tr')].map(row=> {
      const o=row.querySelectorAll('input'); return {
        name:o[0].value.trim(), qty:Number(o[1].value)||0, unit:Number(o[2].value)||0, note:o[3].value.trim(), amount:(Number(o[1].value)||0)*(Number(o[2].value)||0)
      }
    })
  }
  // Tim nhung tu dai dan den yeu cau cua brief, bo tu ngung va tu ngan.
  function tuKhoa(text) {
    return khongDau(text).split(/[^a-z0-9]+/).filter(tu=>tu.length>3&&!tuNgungChung.includes(tu))
  }
  // Phan tich gia, ngan sach brief, tien do do va muc do phu tieu chi.
  function phanTich() {
    const b=briefs[selectedBrief], hangMuc=docHangMuc(), tamTinh=hangMuc.reduce((tong,h)=>tong+h.amount, 0);
    const gia=Number($('#proposal-price').value)||0, soNgay=Number($('#proposal-days').value)||0;
    const ngayGiao=$('#proposal-date').value?new Date($('#proposal-date').value+'T12:00:00'):null;
    const hanChot=new Date(b.date+'T12:00:00'), nganSach=docNganSach(b.budget);
    const homNay=new Date(); homNay.setHours(0, 0, 0, 0);
    const conLai=ngayGiao?Math.round((ngayGiao-homNay)/864e5):null;
    const giaKhuyenNghi=lamTronGia(tamTinh*(1+bienLoiNhuan));
    const goiY=[];
    const ghiChu=(capDo, vanDe, hanhDong)=>goiY.push({
      level:capDo, text:vanDe, action:hanhDong
    });
    if(!tamTinh) {
      ghiChu('warn', 'Chưa hạng mục nào có số tiền. Cần nhập cả số lượng và đơn giá thì tổng chi phí mới tính được, và giá proposal hiện không có cơ sở.', {
        label:'Thêm hạng mục gộp theo brief', run:()=>addScope('Thực hiện: '+b.title, 1, giaKhuyenNghi||b.price, 'Báo giá gộp')
      })
    }
    else if(gia<=0)ghiChu('warn', 'Chưa nhập giá proposal trong khi tổng hạng mục đã là '+money(tamTinh)+'.', {
      label:'Đặt giá '+money(giaKhuyenNghi), run:()=>datGia(giaKhuyenNghi)
    })
    else if(gia<tamTinh) {
      if(nganSach.max&&giaKhuyenNghi>nganSach.max) {
        ghiChu('warn', 'Bán dưới chi phí: tổng hạng mục '+money(tamTinh)+' đã cao hơn giá proposal '+money(gia)+'. Nếu cộng '+Math.round(bienLoiNhuan*100)+'% biên lợi nhuận thì cần '+money(giaKhuyenNghi)+', vượt khung ngân sách khách nêu ('+b.budget+'). Nên giảm số lượng hoặc thương lượng lại ngân sách thay vì tự chịu lỗ.')
      }
      else ghiChu('warn', 'Giá proposal đang thấp hơn tổng hạng mục '+money(tamTinh-gia)+' ('+Math.round((tamTinh-gia)/tamTinh*100)+'%). Với mức này bạn chưa có biên lợi nhuận.', {
        label:'Đặt giá '+money(giaKhuyenNghi), run:()=>datGia(giaKhuyenNghi)
      })
    }
    else {
      const chenhLech=gia-tamTinh, tyLe=Math.round(chenhLech/tamTinh*100);
      if(!chenhLech)ghiChu('warn', 'Giá proposal đúng bằng tổng hạng mục '+money(tamTinh)+', tức chưa có biên lợi nhuận cho công thiết kế và rủi ro hỏng hóc.', {
        label:'Đặt giá '+money(giaKhuyenNghi), run:()=>datGia(giaKhuyenNghi)
      })
      else if(tyLe<8)ghiChu('tip', 'Giá chỉ cao hơn tổng hạng mục '+tyLe+'% ('+money(chenhLech)+'). Biên lợi nhuận mỏng; mức an toàn cho hàng thủ công thường là 10–30%.', {
        label:'Đặt giá '+money(giaKhuyenNghi), run:()=>datGia(giaKhuyenNghi)
      })
      else if(tyLe>30)ghiChu('warn', 'Giá cao hơn tổng hạng mục '+tyLe+'% ('+money(chenhLech)+') nhưng bảng chi phí không có hạng mục nào giải thích khoản chênh. Khách dễ hỏi và dễ cho rằng bạn báo giá tuỳ tiện.', {
        label:'Thêm hạng mục chênh lệch', run:()=>addScope('Thiết kế, rủi ro hỏng và biên lợi nhuận', 1, chenhLech, 'Phần chênh giữa giá và chi phí')
      })
      else ghiChu('ok', 'Giá hợp lý: tổng hạng mục '+money(tamTinh)+' cộng '+tyLe+'% biên lợi nhuận, nằm trong vùng khuyến nghị 8–30%.')
    }
    if(gia>0&&nganSach.max) {
      if(gia>nganSach.max) {
        const vuot=gia-nganSach.max;
        ghiChu('warn', 'Giá '+money(gia)+' vượt khung ngân sách '+b.budget+' của khách '+money(vuot)+' ('+Math.round(vuot/nganSach.max*100)+'%).', {
          label:'Đặt giá sát trần '+money(nganSach.max), run:()=>datGia(nganSach.max)
        })
      }
      else if(gia<nganSach.min)ghiChu('tip', 'Giá '+money(gia)+' thấp hơn khung ngân sách '+b.budget+'. Khách vẫn chi được cao hơn, bạn có thể báo đủ giá trị công sức mà chưa chắc mất đơn.')
      else ghiChu('ok', 'Giá nằm trong khung ngân sách '+b.budget+' mà khách đã nêu trong brief.')
    }
    if(!ngayGiao) {
      ghiChu('warn', 'Chưa chọn ngày giao dự kiến nên khách không có mốc để quyết định.')
    }
    else if(ngayGiao>hanChot) {
      ghiChu('warn', 'Ngày giao '+new Intl.DateTimeFormat('vi-VN').format(ngayGiao)+' chậm hơn deadline brief ('+b.deadline+') '+Math.round((ngayGiao-hanChot)/864e5)+' ngày. Khả năng cao khách sẽ loại proposal.', {
        label:'Đẩy giao về '+b.deadline, run:()=>datNgayGiao(b.date)
      })
    }
    else if(soNgay&&conLai!==null&&soNgay>conLai) {
      ghiChu('warn', 'Bạn báo cần '+soNgay+' ngày nhưng chỉ còn '+conLai+' ngày tới ngày giao đã chọn.', conLai>=1?{
        label:'Rút tiến độ còn '+conLai+' ngày', run:()=>datSotNgay(conLai)
      }: {
        label:'Đẩy ngày giao sát deadline', run:()=>datNgayGiao(b.date)
      })
    }
    else if(soNgay&&conLai!==null&&conLai-soNgay<3)ghiChu('tip', 'Tiến độ '+soNgay+' ngày vẫn kịp nhưng chỉ còn '+(conLai-soNgay)+' ngày dự phòng. Hàng thủ công dễ phát sinh nung hỏng hoặc giao chậm.')
    else if(soNgay&&conLai!==null)ghiChu('ok', 'Tiến độ '+soNgay+' ngày vừa với ngày giao, còn '+conLai+' ngày dự phòng và không vượt deadline '+b.deadline+'.')
    const chuoiHangMuc=khongDau(hangMuc.map(h=>h.name+' '+h.note).join(' '));
    for(const yeuCau of b.criteria) {
      const duocLiep=tuKhoa(yeuCau).some(tu=>chuoiHangMuc.includes(tu));
      if(!duocLiep)ghiChu('warn', 'Tiêu chí “'+yeuCau+'” trong brief chưa xuất hiện ở bất kỳ hạng mục nào. Khách sẽ không thấy bạn đã xử lý yêu cầu này.', {
        label:'Thêm hạng mục cho tiêu chí', run:()=>addScope(yeuCau, 1, 0, 'Chưa tính giá')
      })
    }
    const loiNhan=khongDau($('#proposal-message').value);
    if(!b.criteria.some(yeuCau=>tuKhoa(yeuCau).some(tu=>loiNhan.includes(tu))))ghiChu('tip', 'Lời nhắn cho khách chưa nhắc yêu cầu cụ thể nào của brief. Nêu thẳng cách bạn đáp ứng 1–2 tiêu chí sẽ tăng tỷ lệ được duyệt.')
    return goiY
  }
  // Hien ket qua phan tich va nut ap dung tung de xuat.
  const nhanMucDo= {
    warn: 'Cần sửa', tip: 'Nên thêm', ok: 'Ổn'
  };
  let deXuatHienTai=[];
  function renderAdvice() {
    deXuatHienTai=phanTich();
    const canSua=deXuatHienTai.filter(g=>g.level==='warn').length, nenThem=deXuatHienTai.filter(g=>g.level==='tip').length;
    $('#advisor-description').textContent='Đã đối chiếu giá, khung ngân sách brief, deadline và các tiêu chí với bảng hạng mục hiện tại: '+canSua+' điểm cần sửa'+(nenThem?', '+nenThem+' điểm nên cân nhắc': '')+'. Kết quả chỉ là suy luận từ những gì bạn nhập, chưa phải báo giá cuối.';
    const danhSach=$('#advisor-list');
    danhSach.replaceChildren(...deXuatHienTai.map((g, i)=> {
      const li=document.createElement('li'); li.className='advisor-'+g.level;
      const chu=document.createElement('span'); chu.className='advisor-tag'; chu.textContent=nhanMucDo[g.level];
      const noiDung=document.createElement('span'); noiDung.className='advisor-text'; noiDung.textContent=g.text;
      li.append(chu, noiDung);
      if(g.action) {
        const nut=document.createElement('button'); nut.type='button'; nut.className='advisor-apply'; nut.dataset.index=String(i); nut.textContent=g.action.label; li.append(nut)
      }
      return li
    }));
    $('#apply-advice').disabled=!deXuatHienTai.some(g=>g.action)
  }
  $('#advisor-list').addEventListener('click', e=> {
    const nut=e.target.closest('.advisor-apply'); if(!nut)return; const deXuat=deXuatHienTai[Number(nut.dataset.index)]; if(!deXuat||!deXuat.action)return; deXuat.action.run(); notify('Đã áp dụng: '+deXuat.action.label+'.')
  });
  $('#apply-advice').addEventListener('click', ()=> {
    const cacNut=deXuatHienTai.filter(g=>g.action); if(!cacNut.length)return; for(const deXuat of cacNut)deXuat.action.run();
    notify('Đã áp dụng '+cacNut.length+' đề xuất và phân tích lại proposal.')
  });
  $('#ask-ai').addEventListener('click', ()=> {
    updatePreview(); const coCanSua=deXuatHienTai.filter(g=>g.level==='warn').length;
    $('#proposal-feedback').textContent=coCanSua?'Còn '+coCanSua+' điểm cần sửa trong khung gợi ý bên trên. Hãy xử lý trước khi gửi cho khách.':'Gợi ý đã cập nhật: không còn điểm nào bị coi là rủi ro. Kiểm tra lại chi phí nguyên liệu thực tế trước khi xác nhận.';
    $('.ai-box').scrollIntoView({
      behavior: 'smooth', block: 'center'
    })
  });
  // ==================== BUOC 4: XEM TRUOC & GUI ====================
  const cacBuoc=[...document.querySelectorAll('.step')];
  const tenBuoc=['Thông tin cơ bản', 'Phạm vi công việc', 'Chi phí & thời gian', 'Xem trước & gửi', 'Đã gửi'];
  const nutTiepTuc=['', 'Tiếp tục: Phạm vi công việc →', 'Tiếp tục: Chi phí & thời gian →'];
  let trangThaiHienTai='draft', guiLuc=null, buocNhap=1;
  // Ba trang thai: draft (dang nhap o buoc 1-3), confirmed (buoc 4, chua gui), sent (da gui).
  function soBuocHienTai(trangThai) {
    return trangThai==='sent'?5: (trangThai==='confirmed'?4: buocNhap)
  }
  // Ve lai thanh tien trinh, khoi noi dung va nut hanh dong theo buoc hien tai.
  function capNhatBuoc(cuon=true) {
    const n=soBuocHienTai(trangThaiHienTai);
    cacBuoc.forEach((buoc, i)=> {
      const so=i+1; buoc.classList.remove('done', 'current'); buoc.removeAttribute('aria-current'); buoc.querySelector('b').textContent=so<n?'✓':String(so);
      if(so<n)buoc.classList.add('done');
      else if(so===n) {
        buoc.classList.add('current'); buoc.setAttribute('aria-current', 'step')
      }
      buoc.disabled=!(so<n&&trangThaiHienTai!=='sent');
      buoc.title=buoc.disabled?'': 'Quay lại bước '+so
    });
    document.querySelectorAll('.step-panel').forEach(p=>p.classList.toggle('hidden-state', Number(p.dataset.buoc)!==n));
    $('#breadcrumb').textContent='Bảng điều khiển / Proposal / '+tenBuoc[n-1];
    $('#editor-card').classList.toggle('hidden-state', n>=4);
    $('#send-panel').classList.toggle('hidden-state', n<4);
    $('#proposal-actions').classList.toggle('hidden-state', n>=4);
    $('#step-back').classList.toggle('hidden-state', n<=1||n>=4);
    $('#ask-ai').classList.toggle('hidden-state', n!==3);
    $('#step-next').classList.toggle('hidden-state', n>=3);
    $('#send-proposal').classList.toggle('hidden-state', n!==3);
    if(n<3)$('#step-next').textContent=nutTiepTuc[n];
    if(cuon)$('.steps').scrollIntoView({
      behavior: 'smooth', block: 'start'
    })
  }
  // Kiem tra du lieu cua mot buoc; baoLoi=true thi hien thong bao ngay tai o sai.
  function kiemTraBuoc(n, baoLoi) {
    const panel=document.querySelector('.step-panel[data-buoc="'+n+'"]');
    for(const el of panel.querySelectorAll('input:not([type=file]), textarea, select')) {
      const toiThieu=el.required?Math.max(1, Number(el.getAttribute('minlength'))||0):0, doDai=el.value.trim().length;
      el.setCustomValidity(doDai>=toiThieu?'':(doDai?'Cần ít nhất '+toiThieu+' ký tự (hiện có '+doDai+').':'Vui lòng điền mục này.'));
      if(!el.checkValidity()) {
        if(baoLoi)el.reportValidity(); return false
      }
    }
    if(n===2) {
      const rows=[...document.querySelectorAll('#scope-body tr')];
      if(!rows.length) {
        if(baoLoi) {
          $('#proposal-feedback').textContent='Cần ít nhất một hạng mục để khách biết họ sẽ nhận được gì.'; notify('Thêm ít nhất một hạng mục trước khi tiếp tục.')
        }
        return false
      }
      const thieuTen=rows.find(r=>!r.querySelector('input').value.trim());
      if(thieuTen) {
        if(baoLoi) {
          thieuTen.querySelector('input').focus(); $('#proposal-feedback').textContent='Hạng mục số '+(rows.indexOf(thieuTen)+1)+' chưa có tên. Điền tên hoặc xóa dòng đó.'; notify('Còn hạng mục chưa có tên.')
        }
        return false
      }
      const tongHangMuc=rows.reduce((t, r)=> {
        const o=r.querySelectorAll('input'); return t+(Number(o[1].value)||0)*(Number(o[2].value)||0)
      }, 0);
      if(tongHangMuc<=0) {
        if(baoLoi) {
          rows[0].querySelectorAll('input')[2].focus(); $('#proposal-feedback').textContent='Tổng hạng mục đang là 0 đ. Nhập đơn giá để bước 3 có căn cứ đặt giá.'; notify('Các hạng mục chưa có đơn giá.')
        }
        return false
      }
    }
    return true
  }
  // Kiem tra lan luot tu buoc 1 den buoc k; dung o buoc dau tien con thieu.
  function kiemTraDenBuoc(k) {
    for(let s=1; s<=k; s++) {
      if(!kiemTraBuoc(s, false)) {
        buocNhap=s; capNhatBuoc(); kiemTraBuoc(s, true); return false
      }
    }
    return true
  }
  const loiBuoc= {
    1: 'Bước 1 xong. Liệt kê các hạng mục công việc để khách thấy rõ phạm vi.', 2: 'Bước 2 xong. Đặt giá, thời gian và kiểm tra gợi ý AI trước khi xác nhận.'
  };
  $('#step-next').addEventListener('click', ()=> {
    if(!kiemTraBuoc(buocNhap, true))return;
    $('#proposal-feedback').textContent=loiBuoc[buocNhap]; buocNhap++; capNhatBuoc()
  });
  $('#step-back').addEventListener('click', ()=> {
    if(buocNhap>1) {
      buocNhap--; capNhatBuoc()
    }
  });
  cacBuoc.forEach((buoc, i)=>buoc.addEventListener('click', ()=> {
    if(buoc.disabled)return;
    if(trangThaiHienTai==='confirmed') {
      trangThaiHienTai='draft'; luuTrangThai(selectedBrief, {
        status: 'draft'
      }); setProposalStatus()
    }
    buocNhap=i+1; capNhatBuoc(); $('#proposal-feedback').textContent='Đang sửa bước '+(i+1)+' · '+tenBuoc[i]+'.'
  }));
  // Cap nhat nhan trang thai o dau trang va trong ban xem truoc.
  function setProposalStatus() {
    const nhan= {
      draft: 'Bản nháp', confirmed: 'Đã xác nhận', sent: 'Đã gửi'
    }, lop= {
      draft: 'chip draft', confirmed: 'chip pending', sent: 'chip sent'
    };
    for(const id of ['proposal-status', 'preview-status']) {
      const el=$('#'+id); el.textContent=nhan[trangThaiHienTai]; el.className=lop[trangThaiHienTai]+(id==='preview-status'?' mt-3': '')
    }
    $('#send-status').textContent=trangThaiHienTai==='sent'?'Đã gửi khách hàng': 'Chờ bạn gửi';
    $('#send-status').className='chip '+(trangThaiHienTai==='sent'?'sent': 'pending');
    $('#publish-proposal').disabled=trangThaiHienTai==='sent';
    $('#publish-proposal').textContent=trangThaiHienTai==='sent'?'Đã gửi proposal': 'Gửi proposal cho '+briefs[selectedBrief].customer
  }
  // Dung ban gui khi nguoi dung quay lai chinh sua.
  function hienBanGui() {
    const b=briefs[selectedBrief], ngayGiao=$('#proposal-date').value;
    $('#send-summary').textContent='Proposal “'+($('#proposal-project').value.trim()||b.title)+'” gửi '+b.customer+' · '+money($('#proposal-price').value)+' · giao '+ (ngayGiao?new Intl.DateTimeFormat('vi-VN').format(new Date(ngayGiao+'T12:00:00')): 'chưa chọn')+' · '+($('#proposal-days').value||'—')+' ngày thực hiện.';
    $('#send-result').textContent=trangThaiHienTai==='sent'?'Đã gửi lúc '+new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(new Date(guiLuc||Date.now()))+'. Trạng thái đơn trong hòm thư brief đã chuyển sang “Đã gửi proposal”. Prototype không thực sự gửi email.': 'Kiểm tra lại bản xem trước bên phải, sau đó gửi cho khách.'
  }
  $('#back-to-edit').addEventListener('click', ()=> {
    trangThaiHienTai='draft'; buocNhap=3; luuTrangThai(selectedBrief, {
      status: 'draft'
    }); setProposalStatus(); capNhatBuoc(); $('#proposal-feedback').textContent='Đang ở bước 3. Xác nhận proposal mẫu để sang bước xem trước & gửi.'; notify('Đã quay lại bước chỉnh sửa.')
  });
  $('#publish-proposal').addEventListener('click', ()=> {
    if(trangThaiHienTai==='sent')return;
    guiLuc=new Date().toISOString();
    trangThaiHienTai='sent';
    luuTrangThai(selectedBrief, {
      status: 'sent', guiLuc, ten: $('#proposal-project').value.trim(), gia: Number($('#proposal-price').value)||0, soNgay: Number($('#proposal-days').value)||0, ngayGiao: $('#proposal-date').value
    });
    setProposalStatus(); hienBanGui(); capNhatBuoc();
    $('#proposal-feedback').textContent='Đã gửi proposal cho '+briefs[selectedBrief].customer+'. Brief tương ứng trong hòm thư đã chuyển trạng thái.';
    notify('Gửi proposal thành công. Trạng thái đơn trong hòm thư brief đã được cập nhật.')
  });
  $('#add-scope').addEventListener('click', ()=>addScope()); $('#scope-body').addEventListener('input', updatePreview); $('#scope-body').addEventListener('click', e=> {
    if(e.target.closest('button')) {
      e.target.closest('tr').remove(); updatePreview()
    }
  }); for(const id of ['proposal-project', 'proposal-price', 'proposal-days', 'proposal-date', 'proposal-message'])$('#'+id).addEventListener('input', ()=> {
    updatePreview(); if(trangThaiHienTai!=='draft')hienBanGui()
  });
  $('#proposal-files').addEventListener('change', ()=> {
    const names=[...$('#proposal-files').files].map(file=>file.name); $('#file-feedback').textContent=names.length?'Đã chọn: '+names.join(', ')+'. Tệp không được tải lên hoặc gửi đi.': 'Tệp không được tải lên hoặc gửi đi trong prototype.'; $('#preview-files').textContent=names.length?'Tệp tham khảo chưa gửi: '+names.join(', '): ''
  });
  $('#save-draft').addEventListener('click', ()=> {
    $('#proposal-feedback').textContent='Đã ghi nhận bản nháp trong phiên đang mở. Nội dung không được lưu sau khi đóng tab.'; notify('Đã ghi nhận bản nháp trong phiên dùng thử.')
  });
  // Xac nhan mau: chuyen sang buoc 4 va luu trang thai de hom thu brief biet.
  $('#proposal-form').addEventListener('submit', e=> {
    e.preventDefault();
    if(trangThaiHienTai==='sent') {
      $('#proposal-feedback').textContent='Proposal đã gửi nên không xác nhận lại được. Bấm “Quay lại chỉnh sửa” nếu bạn muốn sửa tiếp.'; notify('Proposal đã gửi rồi.'); return
    }
    // Enter o buoc 1-2 chi chuyen sang buoc ke tiep, khong nhay coc len xac nhan.
    if(trangThaiHienTai==='draft'&&buocNhap<3) {
      $('#step-next').click(); return
    }
    if(!kiemTraDenBuoc(3))return;
    trangThaiHienTai='confirmed';
    luuTrangThai(selectedBrief, {
      status: 'confirmed', ten: $('#proposal-project').value.trim(), gia: Number($('#proposal-price').value)||0
    });
    setProposalStatus(); hienBanGui(); capNhatBuoc();
    $('#proposal-feedback').textContent='Đã xác nhận proposal mẫu. Bạn đang ở bước 4 — kiểm tra bản xem trước rồi bấm Gửi proposal.';
    notify('Đã xác nhận. Sang bước xem trước & gửi.')
  });
  // Khoi tao: nap dung du lieu cua brief va trang thai da luu trong phien.
  const briefDangChon = briefs[selectedBrief];
  $('#proposal-project').value = briefDangChon.title;
  $('#proposal-price').value = briefDangChon.price;
  $('#proposal-days').value = briefDangChon.days;
  $('#proposal-date').value = briefDangChon.date;
  $('#proposal-message').value = briefDangChon.loiNhan;
  $('#back-to-brief').href = '../02-brief-inbox/index.html?brief=' + selectedBrief;
  $('#back-to-brief').textContent = '← Xem lại brief của ' + briefDangChon.customer;
  $('#recap-customer').textContent = briefDangChon.customer;
  $('#recap-budget').textContent = briefDangChon.budget;
  $('#recap-deadline').textContent = briefDangChon.deadline;
  $('#recap-criteria-count').textContent = briefDangChon.criteria.length + ' tiêu chí';
  $('#recap-criteria').replaceChildren(...briefDangChon.criteria.map(t=> {
    const li=document.createElement('li'); li.textContent=t; return li
  }));
  for(const hangMuc of briefDangChon.hangMuc) addScope(...hangMuc);
  const daLuu = trangThaiCua(selectedBrief);
  if(daLuu && (daLuu.status==='confirmed'||daLuu.status==='sent')) {
    trangThaiHienTai = daLuu.status;
    if(daLuu.guiLuc) guiLuc = daLuu.guiLuc;
    if(daLuu.ten) $('#proposal-project').value = daLuu.ten;
    if(daLuu.gia) $('#proposal-price').value = daLuu.gia;
    if(daLuu.soNgay) $('#proposal-days').value = daLuu.soNgay;
    if(daLuu.ngayGiao) $('#proposal-date').value = daLuu.ngayGiao;
  }
  updatePreview(); setProposalStatus(); hienBanGui();
  capNhatBuoc(false);
})();
