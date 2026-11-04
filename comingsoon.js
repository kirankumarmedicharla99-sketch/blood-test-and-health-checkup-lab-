/**
 * AARA CLINICAL LABORATORIES — COMING SOON PAGE LOGIC (comingsoon.js)
 * Powers RTL/Theme toggles, live genomics portal launch countdown timer,
 * and patient notification signup.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  // 2. RTL / LTR Direction Switcher
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

  // 3. Dark / Light Theme Toggle
  const themeBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  const applyTheme = (isDark) => {
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('aara-theme', isDark ? 'dark' : 'light');
    if (themeIcon) {
      themeIcon.innerHTML = isDark ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      }
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

  // 4. Live Countdown Timer for Genomics & Molecular Diagnostics Launch
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins = document.getElementById('cdMins');
  const cdSecs = document.getElementById('cdSecs');

  const launchTarget = Date.now() + (18 * 24 * 60 * 60 * 1000) + (9 * 60 * 60 * 1000) + (42 * 60 * 1000) + 15000;

  const updateCountdown = () => {
    const diff = Math.max(0, launchTarget - Date.now());
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / 1000 / 60) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    if (cdDays) cdDays.textContent = String(days).padStart(2, '0');
    if (cdHours) cdHours.textContent = String(hours).padStart(2, '0');
    if (cdMins) cdMins.textContent = String(mins).padStart(2, '0');
    if (cdSecs) cdSecs.textContent = String(secs).padStart(2, '0');
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // 5. Patient Notification Form Handler
  const notifyForm = document.getElementById('csNotifyForm');
  const notifyToast = document.getElementById('csToast');
  if (notifyForm) {
    notifyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = notifyForm.querySelector('input[type="email"]');
      if (input && input.value) {
        if (notifyToast) {
          notifyToast.textContent = `Confirmed. We will notify ${input.value} as soon as the Preventive Genomics & Molecular Diagnostics Portal opens for booking.`;
          notifyToast.classList.add('visible');
        }
        input.value = '';
      }
    });
  }
});
