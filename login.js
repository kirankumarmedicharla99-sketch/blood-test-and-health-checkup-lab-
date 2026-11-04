/**
 * AARA CLINICAL LABORATORIES — PATIENT PORTAL LOGIN SCRIPT (login.js)
 * Interactive theme/RTL toggles, input validation, password reveal,
 * and seamless navigation to the Patient Diagnostic Portal.
 */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize Lucide Icons
  const initLucide = () => {
    if (typeof window.lucide !== 'undefined' && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  };
  initLucide();

  // 2. RTL / LTR Direction Switcher
  const rtlBtn = document.getElementById('rtlToggleBtn');
  const rtlLabel = document.getElementById('rtlLabel');
  const htmlEl = document.documentElement;

  const setDirection = (dir) => {
    htmlEl.setAttribute('dir', dir);
    if (dir === 'rtl') {
      htmlEl.setAttribute('lang', 'ar');
      if (rtlLabel) rtlLabel.textContent = 'LTR';
    } else {
      htmlEl.setAttribute('lang', 'en');
      if (rtlLabel) rtlLabel.textContent = 'RTL';
    }
    localStorage.setItem('aara-dir', dir);
  };

  const initialDir = localStorage.getItem('aara-dir') || 'ltr';
  setDirection(initialDir);

  if (rtlBtn) {
    rtlBtn.addEventListener('click', () => {
      const current = htmlEl.getAttribute('dir') || 'ltr';
      setDirection(current === 'ltr' ? 'rtl' : 'ltr');
      initLucide();
    });
  }

  // 3. Theme Toggle (Clinical Light / Clinical Dark)
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

  // 4. Toast Notification Utility
  const toastEl = document.getElementById('authToast');
  const toastText = document.getElementById('toastText');
  let toastTimeout = null;

  const showToast = (message, duration = 3800) => {
    if (!toastEl || !toastText) return;
    toastText.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('show');
    }, duration);
  };

  // 5. Password Visibility Toggle
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  const loginPassword = document.getElementById('loginPassword');
  const passwordToggleIcon = document.getElementById('passwordToggleIcon');

  if (togglePasswordBtn && loginPassword) {
    togglePasswordBtn.addEventListener('click', () => {
      const isPassword = loginPassword.getAttribute('type') === 'password';
      loginPassword.setAttribute('type', isPassword ? 'text' : 'password');
      if (passwordToggleIcon) {
        passwordToggleIcon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
        initLucide();
      }
    });
  }

  // 6. Forgot Password Action
  const forgotPassBtn = document.getElementById('forgotPassBtn');
  if (forgotPassBtn) {
    forgotPassBtn.addEventListener('click', () => {
      const emailInput = document.getElementById('loginEmail');
      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (emailVal && emailVal.includes('@')) {
        showToast(`Password reset OTP & link sent to ${emailVal}`);
      } else {
        showToast('Please enter your registered patient email above, then click Forgot Password.');
        if (emailInput) emailInput.focus();
      }
    });
  }

  // 7. Form Validation & Submission
  const loginForm = document.getElementById('loginForm');
  const loginEmail = document.getElementById('loginEmail');
  const loginSubmitBtn = document.getElementById('loginSubmitBtn');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Email
      const emailVal = loginEmail ? loginEmail.value.trim() : '';
      const emailGroup = loginEmail?.closest('.form-group');
      if (!emailVal || !emailVal.includes('@') || !emailVal.includes('.')) {
        if (emailGroup) emailGroup.classList.add('has-error');
        isValid = false;
      } else {
        if (emailGroup) emailGroup.classList.remove('has-error');
      }

      // Validate Password
      const passVal = loginPassword ? loginPassword.value : '';
      const passGroup = loginPassword?.closest('.form-group');
      if (!passVal || passVal.length < 4) {
        if (passGroup) passGroup.classList.add('has-error');
        isValid = false;
      } else {
        if (passGroup) passGroup.classList.remove('has-error');
      }

      if (!isValid) {
        showToast('Please verify your patient credentials and try again.');
        return;
      }

      // Successful Login Simulation
      if (loginSubmitBtn) {
        loginSubmitBtn.disabled = true;
        loginSubmitBtn.innerHTML = '<span>Verifying Patient ID...</span><i data-lucide="loader" class="btn-arrow-icon"></i>';
        initLucide();
      }

      showToast('Authentication verified! Opening AARA Patient Diagnostic Portal...');

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    });

    // Clear errors on input
    [loginEmail, loginPassword].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          const group = input.closest('.form-group');
          if (group) group.classList.remove('has-error');
        });
      }
    });
  }

  // 8. Social Login Actions (Google & Apple)
  const googleBtn = document.getElementById('googleLoginBtn');
  const appleBtn = document.getElementById('appleLoginBtn');

  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      showToast('Connecting to Google Health Identity...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    });
  }

  if (appleBtn) {
    appleBtn.addEventListener('click', () => {
      showToast('Connecting to Apple Secure Health ID...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    });
  }

});
