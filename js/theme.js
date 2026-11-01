(function () {
  const root = document.documentElement;
  const button = document.getElementById('themeButton');
  const savedTheme = (() => {
    try { return localStorage.getItem('cp-theme'); } catch (_) { return null; }
  })();
  function setTheme(theme) {
    const light = theme === 'light';
    root.dataset.theme = light ? 'light' : 'dark';
    button.setAttribute('aria-label', light ? 'Aktifkan mode gelap' : 'Aktifkan mode terang');
    button.innerHTML = light ? '<svg><use href="#i-sun"/></svg>' : '<svg><use href="#i-moon"/></svg>';
    try { localStorage.setItem('cp-theme', light ? 'light' : 'dark'); } catch (_) { /* localStorage may be unavailable */ }
  }
  setTheme(savedTheme === 'light' ? 'light' : 'dark');
  button.addEventListener('click', () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light'));
})();
