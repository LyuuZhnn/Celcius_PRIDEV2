(function () {
  const shell = document.getElementById('appShell');
  const menuButton = document.getElementById('menuButton');
  const scrim = document.getElementById('drawerScrim');
  const sidebar = document.getElementById('sidebar');
  const routes = ['beranda', 'tentang', 'struktur', 'anggota', 'list-babu', 'aktivitas', 'pengumuman', 'peraturan', 'gabung'];

  function isMobile() { return window.matchMedia('(max-width: 760px)').matches; }
  function closeDrawer() {
    shell.classList.remove('drawer-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Buka menu');
    menuButton.innerHTML = '<svg><use href="#i-menu"/></svg>';
  }
  function setRoute(route, updateHash) {
    if (!routes.includes(route)) route = 'beranda';
    if (updateHash && location.hash !== '#' + route) history.pushState(null, '', '#' + route);
    document.querySelectorAll('.page-section').forEach(section => {
      section.classList.toggle('active', section.dataset.page === route);
    });
    document.querySelectorAll('.nav-link[data-route]').forEach(link => {
      const active = link.dataset.route === route;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.title = (route === 'beranda' ? 'CELCIUS PRIDE' : document.querySelector(`[data-route="${route}"]`)?.textContent.trim() || 'CELCIUS PRIDE') + ' — One Circle. One Identity.';
    closeDrawer();
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('globalSearchResults').hidden = true;
  }
  function routeFromHash() { return (location.hash || '#beranda').slice(1); }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const route = link.getAttribute('href').slice(1);
    if (!routes.includes(route)) return;
    event.preventDefault();
    setRoute(route, true);
  });
  window.addEventListener('hashchange', () => setRoute(routeFromHash(), false));
  window.addEventListener('popstate', () => setRoute(routeFromHash(), false));
  menuButton.addEventListener('click', () => {
    if (isMobile()) {
      const opened = shell.classList.toggle('drawer-open');
      menuButton.setAttribute('aria-expanded', String(opened));
      menuButton.setAttribute('aria-label', opened ? 'Tutup menu' : 'Buka menu');
      menuButton.innerHTML = opened ? '<svg><use href="#i-close"/></svg>' : '<svg><use href="#i-menu"/></svg>';
    } else {
      shell.classList.toggle('sidebar-collapsed');
    }
  });
  scrim.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeDrawer();
      document.getElementById('globalSearchResults').hidden = true;
    }
  });
  window.addEventListener('resize', () => { if (!isMobile()) closeDrawer(); });
  window.CP_NAV = { go: route => setRoute(route, true), closeDrawer, routes };
  setRoute(routeFromHash(), false);
})();
