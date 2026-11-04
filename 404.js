/**
 * AARA CLINICAL LABORATORIES — 404 ERROR PAGE LOGIC (404.js)
 * Clean, lightweight script managing Theme and RTL toggles for the 404 error page.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  const initLucide = () => {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  };
  initLucide();

  // 2. RTL / LTR Direction Switcher (Persisted in localStorage)
  const rtlToggleBtn = document.getElementById('rtlToggleBtn');
  const rtlLabel = document.getElementById('rtlLabel');

  const setDirection = (isRtl) => {
    const htmlEl = document.documentElement;
    if (isRtl) {
      htmlEl.setAttribute('dir', 'rtl');
      htmlEl.setAttribute('lang', 'ar');
      if (rtlLabel) rtlLabel.textContent = 'LTR';
      localStorage.setItem('aara-dir', 'rtl');
    } else {
      htmlEl.setAttribute('dir', 'ltr');
      htmlEl.setAttribute('lang', 'en');
      if (rtlLabel) rtlLabel.textContent = 'RTL';
      localStorage.setItem('aara-dir', 'ltr');
    }
  };

  const savedDir = localStorage.getItem('aara-dir');
  if (savedDir) {
    setDirection(savedDir === 'rtl');
  }

  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', () => {
      const isCurrentRtl = document.documentElement.getAttribute('dir') === 'rtl';
      setDirection(!isCurrentRtl);
    });
  }

  // 3. Dark / Light Theme Toggle (Persisted in localStorage)
  const themeBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  const applyTheme = (isDark) => {
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('aara-theme', isDark ? 'dark' : 'light');
    if (themeIcon) {
      themeIcon.innerHTML = isDark ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
      initLucide();
    }
  };

  const savedTheme = localStorage.getItem('aara-theme');
  const hasDarkClass = document.body.classList.contains('dark-theme');
  applyTheme(savedTheme !== null ? savedTheme === 'dark' : hasDarkClass);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isCurrentlyDark = document.body.classList.contains('dark-theme');
      applyTheme(!isCurrentlyDark);
    });
  }
});
