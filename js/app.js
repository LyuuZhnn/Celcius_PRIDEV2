(function () {
  const year = new Date().getFullYear();
  document.getElementById('copyrightYear').textContent = year;
  document.getElementById('mainCopyrightYear').textContent = year;

  function emptyState(title, description, icon = 'activity') {
    return window.CP_MEMBERS.emptyState(title, description, icon);
  }
  const activities = window.CP_DATA.activities;
  const announcements = window.CP_DATA.announcements;
  document.getElementById('activityPreview').innerHTML = activities.length
    ? activities.slice(0, 3).map(item => `<article class="activity-item"><strong>${item.title}</strong><small>${item.category || 'Aktivitas'}</small></article>`).join('')
    : emptyState('Belum ada aktivitas', 'Catatan mabar, OP Test, sparing, scrim, atau event akan tampil di sini saat datanya ditambahkan.', 'activity');
  document.getElementById('announcementPreview').innerHTML = announcements.length
    ? announcements.slice(0, 3).map(item => `<article class="announcement-item"><strong>${item.title}</strong><small>${item.date || ''}</small></article>`).join('')
    : emptyState('Belum ada pengumuman', 'Informasi resmi yang dipublikasikan akan ditampilkan di bagian ini.', 'message');
  document.getElementById('activityPageContent').innerHTML = activities.length
    ? activities.map(item => `<article class="activity-item"><strong>${item.title}</strong><small>${item.category || ''} · ${item.date || ''}</small><p>${item.description || ''}</p></article>`).join('')
    : emptyState('Belum ada aktivitas yang dipublikasikan', 'Belum ada catatan kegiatan yang diberikan untuk ditampilkan. Bagian ini akan terisi ketika data aktivitas nyata ditambahkan.', 'activity');
  document.getElementById('announcementPageContent').innerHTML = announcements.length
    ? announcements.map(item => `<article class="announcement-item"><strong>${item.title}</strong><small>${item.date || ''}</small><p>${item.body || ''}</p></article>`).join('')
    : emptyState('Belum ada pengumuman', 'Belum ada pengumuman resmi yang diberikan. Informasi tidak dibuat-buat dan akan muncul setelah data ditambahkan.', 'message');

  document.getElementById('rulesGrid').innerHTML = window.CP_DATA.rules.map((rule, index) => `
    <article class="rule-placeholder"><span class="rule-number">${String(index + 1).padStart(2, '0')}</span><div><strong>${rule}</strong><small>Ketentuan belum dipublikasikan.</small></div></article>`).join('');

  // Basic integrity checks: surface data mistakes early during development.
  const counts = window.CP_MEMBERS.getCounts();
  const checks = [
    counts.all === 16,
    counts.MOBI === 2,
    counts.HP === 15,
    counts.PC === 0,
    window.CP_DATA.organization[0].name === '??',
    window.CP_DATA.listBabu.length === 6,
    window.CP_DATA.members.some(member => member.id === 'kzya' && member.devices.length === 2)
  ];
  if (checks.some(check => !check)) console.error('CELCIUS PRIDE: pemeriksaan integritas data gagal.', { counts, checks });
})();
