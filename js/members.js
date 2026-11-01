(function () {
  const data = window.CP_DATA;
  const members = data.members;
  const listBabu = data.listBabu;
  let currentFilter = 'ALL';
  let currentSearch = '';
  let babuSearch = '';

  function svgIcon(name, className) {
    return `<svg${className ? ` class="${className}"` : ''} aria-hidden="true"><use href="#i-${name}"></use></svg>`;
  }
  function initials(name) {
    const fixed = { kzya: 'KZ', ramzyy: 'RZ', kin: 'KI', bilzz: 'BL', vicky: 'VC', ramzy: 'RA', samoen: 'SM', jsten: 'JS' };
    if (fixed[name]) return fixed[name];
    const parts = String(name).trim().split(/\s+/);
    return parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();
  }
  function deviceBadges(devices) {
    return `<div class="device-badges">${devices.map(device => `<span class="device-badge ${device.toLowerCase()}">${device}</span>`).join('')}</div>`;
  }
  function emptyState(title, description, icon = 'users') {
    return `<div class="empty-state"><span class="empty-state-icon">${svgIcon(icon)}</span><strong>${title}</strong><p>${description}</p></div>`;
  }
  function getCounts() {
    return {
      all: members.length,
      MOBI: members.filter(member => member.devices.includes('MOBI')).length,
      HP: members.filter(member => member.devices.includes('HP')).length,
      PC: members.filter(member => member.devices.includes('PC')).length
    };
  }
  function renderStats() {
    const counts = getCounts();
    document.getElementById('statMembers').textContent = counts.all;
    document.getElementById('statMobi').textContent = counts.MOBI;
    document.getElementById('statHp').textContent = counts.HP;
    document.getElementById('statPc').textContent = counts.PC;
    document.getElementById('filterAllCount').textContent = counts.all;
    document.getElementById('memberStatStrip').innerHTML = [
      ['Anggota unik', counts.all], ['MOBI', counts.MOBI], ['HP', counts.HP], ['PC', counts.PC]
    ].map(([label, value]) => `<div class="member-stat"><span>${label}</span><strong>${value}</strong></div>`).join('');
  }
  function renderPreview() {
    const preview = members.slice(0, 8);
    document.getElementById('memberPreviewGrid').innerHTML = preview.map(member => `
      <div class="member-mini" title="${member.name}">
        <span class="member-avatar">${initials(member.name)}</span>
        <span class="member-mini-name">${member.name}</span>
        ${deviceBadges(member.devices)}
      </div>`).join('');
    const remaining = Math.max(0, members.length - preview.length);
    document.getElementById('moreMembers').textContent = remaining ? `+${remaining} anggota lainnya` : 'Lihat daftar anggota';
  }
  function renderDirectory() {
    const visible = members.filter(member => {
      const matchesFilter = currentFilter === 'ALL' || member.devices.includes(currentFilter);
      const matchesSearch = member.name.toLowerCase().includes(currentSearch.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    const grid = document.getElementById('membersGrid');
    grid.innerHTML = visible.length ? visible.map(member => `
      <article class="member-card">
        <span class="member-avatar">${initials(member.name)}</span>
        <div class="member-card-info"><strong>${member.name}</strong>${deviceBadges(member.devices)}</div>
      </article>`).join('') : emptyState('Anggota tidak ditemukan', 'Coba kata kunci lain atau pilih filter perangkat yang berbeda.');
    document.getElementById('memberResultCount').textContent = `Menampilkan ${visible.length} dari ${members.length} anggota unik`;
  }
  function renderOrganization() {
    const iconNames = { crown: 'crown', users: 'users', star: 'star' };
    const small = data.organization.map((item, index) => `
      <div class="org-node">
        <span class="org-node-icon">${svgIcon(iconNames[item.icon])}</span>
        <span class="org-node-copy"><span>${item.role}</span><strong>${item.name}</strong></span>
      </div>${index < data.organization.length - 1 ? '<span class="org-connector"></span>' : ''}`).join('');
    document.getElementById('orgMiniFlow').innerHTML = small;
    document.getElementById('orgFullFlow').innerHTML = data.organization.map((item, index) => `
      <div class="org-full-node">
        <span class="org-node-icon">${svgIcon(iconNames[item.icon])}</span>
        <span class="org-node-copy"><span>${item.role}</span><strong>${item.name}</strong></span>
      </div>${index < data.organization.length - 1 ? '<span class="org-full-connector"></span>' : ''}`).join('');
  }
  function renderBabu() {
    document.getElementById('babuPreviewList').innerHTML = listBabu.slice(0, 6).map(item => `
      <div class="babu-row"><span class="babu-number">${item.id}.</span>${svgIcon('trophy', 'babu-trophy')}<span class="babu-name">${item.name} ${item.score}${item.note ? ` (${item.note})` : ''}</span></div>`).join('');
    const visible = listBabu.filter(item => item.name.toLowerCase().includes(babuSearch.toLowerCase()));
    document.getElementById('babuFullList').innerHTML = visible.length ? visible.map(item => `
      <div class="babu-full-row"><span class="babu-full-number">${String(item.id).padStart(2, '0')}</span>${svgIcon('trophy', 'babu-full-icon')}<strong class="babu-full-name">${item.name}</strong><span class="babu-full-meta"><span class="score-badge">${item.score}</span>${item.note ? `<span class="dis-badge">(${item.note})</span>` : ''}</span></div>`).join('') : emptyState('Data tidak ditemukan', 'Tidak ada nama List Babu yang cocok dengan pencarian.', 'search');
  }
  function bindControls() {
    document.querySelectorAll('.filter-button').forEach(button => {
      button.addEventListener('click', () => {
        currentFilter = button.dataset.filter;
        document.querySelectorAll('.filter-button').forEach(candidate => candidate.classList.toggle('active', candidate === button));
        renderDirectory();
      });
    });
    document.getElementById('memberSearch').addEventListener('input', event => {
      currentSearch = event.target.value.trim();
      renderDirectory();
    });
    document.getElementById('babuSearch').addEventListener('input', event => {
      babuSearch = event.target.value.trim();
      renderBabu();
    });
  }
  renderStats(); renderPreview(); renderDirectory(); renderOrganization(); renderBabu(); bindControls();
  window.CP_MEMBERS = { members, listBabu, getCounts, renderDirectory, emptyState, initials, deviceBadges };
})();
