// ==================== PHAN 2: HOM THU BRIEF ====================
// File nay xu ly chon brief, tim kiem, loc va danh dau da doc.
(function () {
  const briefs= {
    gifts:  {
      title: 'Bộ quà tặng gốm cho doanh nghiệp', customer: 'Mai Linh', initials: 'ML', budget: '8.000.000 – 12.000.000 đ', deadline: '30/10/2026', date: '2026-10-30', description: 'Cần 30 bộ quà gốm thủ công cho đối tác dịp cuối năm. Mỗi bộ gồm một cốc và đĩa nhỏ, phối men màu kem ấm, đóng hộp giấy tối giản.', criteria: ['30 bộ đồng đều về kích thước và màu men', 'Có hộp quà giấy và thiệp cảm ơn', 'Giao trước ngày 30/10/2026'], summary: '30 bộ cốc và đĩa gốm men kem; ưu tiên tính đồng bộ, đóng gói chỉn chu và giao trước 30/10.', status: 'Brief mới', cls: 'new', price: 9600000, days: 21
    },
    macrame:  {
      title: 'Tranh tường macrame phòng khách', customer: 'Thu Hà', initials: 'TH', budget: '3.000.000 – 4.000.000 đ', deadline: '18/11/2026', date: '2026-11-18', description: 'Muốn một tranh macrame khổ lớn treo phía trên sofa. Tông màu be tự nhiên, họa tiết nút thắt mềm mại và có thanh gỗ sáng màu.', criteria: ['Khổ khoảng 120 × 90 cm', 'Sợi cotton màu be tự nhiên', 'Có thanh treo và hướng dẫn bảo quản'], summary: 'Một tranh macrame khổ lớn cho phòng khách; cần xác nhận kích thước thực tế trước khi đan.', status: 'Đang xem xét', cls: 'review', price: 3500000, days: 16
    },
    wedding:  {
      title: 'Set ly cưới thủ công', customer: 'Bảo Ngọc', initials: 'BN', budget: '2.000.000 – 3.000.000 đ', deadline: '25/11/2026', date: '2026-11-25', description: 'Đặt hai ly gốm uống rượu dùng trong lễ cưới, khắc tên cô dâu chú rể và ngày kỷ niệm. Ưu tiên men trắng ngà với điểm nhấn nâu đất.', criteria: ['Hai ly có kích thước tương đồng', 'Khắc tên và ngày kỷ niệm', 'Hộp bảo vệ khi vận chuyển'], summary: 'Hai ly cưới gốm cá nhân hóa, tông trắng ngà và nâu đất; cần duyệt nội dung khắc trước khi nung.', status: 'Đã phản hồi', cls: 'replied', price: 2400000, days: 14
    }
  };
  let selectedBrief='gifts'; const notes= {
  };
  // Nhan trang thai proposal duoc luu trong phien, ghi de len trang thai brief.
  const nhanDeXuat= {
    confirmed:  {
      text: 'Đã xác nhận proposal mẫu', cls: 'pending'
    },
    sent:  {
      text: 'Đã gửi proposal', cls: 'sent'
    }
  };
  function deXuatCua(maBrief) {
    const luu=trangThaiCua(maBrief); return luu&&nhanDeXuat[luu.status]? {
      ...luu, ...nhanDeXuat[luu.status]
    }: null
  }
  // Dong bo nhan + bo loc cua mot dong brief voi trang thai proposal hien tai.
  function capNhatNhan(row) {
    const deXuat=deXuatCua(row.dataset.brief), chip=row.querySelector('.chip');
    row.dataset.status=deXuat?deXuat.status:row.dataset.baseStatus;
    if(chip) {
      chip.textContent=deXuat?deXuat.text:row.dataset.baseLabel; chip.className='chip '+(deXuat?deXuat.cls:row.dataset.baseCls)+' mt-2'
    }
  }
  for(const row of document.querySelectorAll('.brief-item')) {
    row.dataset.baseStatus=row.dataset.status;
    const chip=row.querySelector('.chip'); if(chip) {
      row.dataset.baseLabel=chip.textContent; row.dataset.baseCls=chip.className.replace(' mt-2', '')
    }
    capNhatNhan(row)
  }
  // Hiển thị nội dung brief mà người dùng chọn.
  function selectBrief(id) {
    if(!briefs[id])return; notes[selectedBrief]=$('#internal-note').value; selectedBrief=id; const b=briefs[id]; document.querySelectorAll('.brief-item').forEach(el=> {
      const active=el.dataset.brief===id; el.classList.toggle('selected', active); el.setAttribute('aria-pressed', String(active))
    }); $('#detail-title').textContent=b.title; $('#detail-avatar').textContent=b.initials; $('#detail-customer').textContent=b.customer+' · nhận ngày 03/10/2026'; $('#detail-budget').textContent=b.budget; $('#detail-deadline').textContent=b.deadline; $('#detail-description').textContent=b.description; $('#detail-summary').textContent=b.summary; const deXuat=deXuatCua(id); $('#detail-status').textContent=deXuat?deXuat.text:b.status; $('#detail-status').className='chip '+(deXuat?deXuat.cls:b.cls); $('#proposal-trace').textContent=deXuat?(deXuat.status==='sent'?'Proposal đã gửi cho '+b.customer+' lúc '+new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(new Date(deXuat.guiLuc||Date.now())):'Đã xác nhận proposal mẫu lúc '+new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(new Date(deXuat.guiLuc||Date.now()))+'.'): ''; $('#proposal-trace').classList.toggle('hidden-state', !deXuat); $('#create-proposal').textContent=deXuat&&deXuat.status==='sent'?'Xem lại proposal đã gửi →': 'Tạo proposal →'; $('#detail-criteria').replaceChildren(...b.criteria.map(t=> {
      const li=document.createElement('li'); li.textContent=t; return li
    })); $('#internal-note').value=notes[id]||''; const unread=!!document.querySelector('.brief-item[data-brief="'+id+'"] .unread'); $('#mark-read').disabled=!unread; $('#mark-read-action').classList.toggle('hidden-state', !unread); $('#mark-read-done').classList.toggle('hidden-state', unread)
  }
  // Lọc danh sách brief theo từ khóa và trạng thái.
  function filterBriefs() {
    const query=$('#brief-search').value.trim().toLocaleLowerCase('vi'); let first=null, selectedVisible=false; document.querySelectorAll('.brief-item').forEach(el=> {
      const show=($('#brief-filter').value==='all'||el.dataset.status===$('#brief-filter').value)&&el.dataset.search.includes(query); el.classList.toggle('hidden-state', !show); if(show) {
        first ||= el; if(el.dataset.brief===selectedBrief)selectedVisible=true
      }
    }); $('#brief-empty').classList.toggle('hidden-state', !!first); $('#brief-detail').classList.toggle('hidden-state', !first); if(first&&!selectedVisible)selectBrief(first.dataset.brief)
  }
  document.querySelectorAll('.brief-item').forEach(el=>el.addEventListener('click', ()=>selectBrief(el.dataset.brief))); $('#brief-filter').addEventListener('change', filterBriefs); $('#brief-search').addEventListener('input', filterBriefs);
  $('#mark-read').addEventListener('click', ()=> {
    document.querySelector('.brief-item[data-brief="'+selectedBrief+'"] .unread')?.remove(); selectBrief(selectedBrief); notify('Đã đánh dấu brief là đã đọc.')
  });
  $('#create-proposal').addEventListener('click', function () {
    window.location.href = '../03-proposal-editor/index.html?brief=' + selectedBrief;
  });
  // Mo dung brief duoc lien ket tu trang proposal; neu khong co thi mo brief dau tien.
  const tuUrl = new URLSearchParams(window.location.search).get('brief');
  selectBrief(briefs[tuUrl] ? tuUrl : 'gifts');
})();
