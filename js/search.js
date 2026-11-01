(function () {
  const input = document.getElementById('globalSearch');
  const resultsBox = document.getElementById('globalSearchResults');
  const routes = [
    { route: 'beranda', label: 'Beranda', detail: 'Dashboard utama' },
    { route: 'tentang', label: 'Tentang Circle', detail: 'Identitas dan nilai komunitas' },
    { route: 'struktur', label: 'Struktur Organisasi', detail: 'Founder, pengurus, dan Kang OP Test' },
    { route: 'anggota', label: 'Anggota', detail: 'Daftar anggota dan perangkat' },
    { route: 'list-babu', label: 'List Babu', detail: 'Daftar catatan hasil' },
    { route: 'aktivitas', label: 'Aktivitas', detail: 'Catatan kegiatan komunitas' },
    { route: 'pengumuman', label: 'Pengumuman', detail: 'Informasi komunitas' },
    { route: 'peraturan', label: 'Peraturan', detail: 'Informasi ketentuan' },
    { route: 'gabung', label: 'Gabung Circle', detail: 'Informasi bergabung' }
  ];
  function getIndex() {
    const members = window.CP_MEMBERS.members.map(member => ({ label: member.name, detail: `Anggota · ${member.devices.join(' / ')}`, route: 'anggota', query: member.name }));
    const babu = window.CP_MEMBERS.listBabu.map(item => ({ label: item.name, detail: `List Babu · ${item.score}`, route: 'list-babu', query: item.name }));
    const org = window.CP_DATA.organization.map(item => ({ label: item.name, detail: `Struktur · ${item.role}`, route: 'struktur' }));
    const deviceCategories = ['MOBI', 'HP', 'PC'].map(device => ({ label: `Kategori ${device}`, detail: `Filter anggota · ${device}`, route: 'anggota', filter: device }));
    return [...routes, ...deviceCategories, ...members, ...babu, ...org];
  }
  function render(query) {
    const q = query.toLowerCase().trim();
    if (!q) { resultsBox.hidden = true; resultsBox.innerHTML = ''; return; }
    const matches = getIndex().filter(item => `${item.label} ${item.detail}`.toLowerCase().includes(q)).slice(0, 8);
    resultsBox.hidden = false;
    resultsBox.innerHTML = matches.length ? matches.map((item, index) => `
      <button class="search-result" type="button" data-index="${index}">
        <span><strong>${item.label}</strong><small>${item.detail}</small></span><em>Buka →</em>
      </button>`).join('') : '<div class="search-empty">Informasi tidak ditemukan.</div>';
    resultsBox.querySelectorAll('.search-result').forEach((button, index) => button.addEventListener('click', () => {
      const selected = matches[index];
      window.CP_NAV.go(selected.route);
      if (selected.route === 'anggota' && selected.filter) {
        const filterButton = document.querySelector(`.filter-button[data-filter=\"${selected.filter}\"]`);
        if (filterButton) filterButton.click();
        document.getElementById('memberSearch').value = '';
        document.getElementById('memberSearch').dispatchEvent(new Event('input', { bubbles: true }));
      } else if (selected.route === 'anggota' && selected.query) {
        const memberSearch = document.getElementById('memberSearch');
        memberSearch.value = selected.query;
        memberSearch.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (selected.route === 'list-babu' && selected.query) {
        const babuSearch = document.getElementById('babuSearch');
        babuSearch.value = selected.query;
        babuSearch.dispatchEvent(new Event('input', { bubbles: true }));
      }
      input.value = '';
      resultsBox.hidden = true;
    }));
  }
  input.addEventListener('input', () => render(input.value));
  input.addEventListener('focus', () => { if (input.value.trim()) render(input.value); });
  document.addEventListener('click', event => {
    if (!event.target.closest('.global-search-wrap')) resultsBox.hidden = true;
  });
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
      const first = resultsBox.querySelector('.search-result');
      if (first) first.click();
      else resultsBox.hidden = true;
    }
  });
})();
