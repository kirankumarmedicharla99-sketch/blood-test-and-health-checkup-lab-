/**
 * AARA CLINICAL LABORATORIES — PATIENT REGISTRATION SCRIPT (signup.js)
 * Interactive theme/RTL toggles, 4-field validation, password reveal,
 * and seamless patient diagnostic portal access.
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
  const toggleSignupPasswordBtn = document.getElementById('toggleSignupPasswordBtn');
  const signupPassword = document.getElementById('signupPassword');
  const signupPasswordToggleIcon = document.getElementById('signupPasswordToggleIcon');

  if (toggleSignupPasswordBtn && signupPassword) {
    toggleSignupPasswordBtn.addEventListener('click', () => {
      const isPassword = signupPassword.getAttribute('type') === 'password';
      signupPassword.setAttribute('type', isPassword ? 'text' : 'password');
      if (signupPasswordToggleIcon) {
        signupPasswordToggleIcon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
        initLucide();
      }
    });
  }

  // 6. 4-Field Form Validation & Submission
  const signupForm = document.getElementById('signupForm');
  const signupName = document.getElementById('signupName');
  const signupEmail = document.getElementById('signupEmail');
  const signupPhone = document.getElementById('signupPhone');
  const signupTerms = document.getElementById('signupTerms');
  const signupSubmitBtn = document.getElementById('signupSubmitBtn');

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // 1. Full Name
      const nameVal = signupName ? signupName.value.trim() : '';
      const nameGroup = signupName?.closest('.form-group');
      if (!nameVal || nameVal.length < 2) {
        if (nameGroup) nameGroup.classList.add('has-error');
        isValid = false;
      } else {
        if (nameGroup) nameGroup.classList.remove('has-error');
      }

      // 2. Email Address
      const emailVal = signupEmail ? signupEmail.value.trim() : '';
      const emailGroup = signupEmail?.closest('.form-group');
      if (!emailVal || !emailVal.includes('@') || !emailVal.includes('.')) {
        if (emailGroup) emailGroup.classList.add('has-error');
        isValid = false;
      } else {
        if (emailGroup) emailGroup.classList.remove('has-error');
      }

      // 3. Phone Number
      const phoneVal = signupPhone ? signupPhone.value.trim() : '';
      const phoneGroup = signupPhone?.closest('.form-group');
      if (!phoneVal || phoneVal.length < 7) {
        if (phoneGroup) phoneGroup.classList.add('has-error');
        isValid = false;
      } else {
        if (phoneGroup) phoneGroup.classList.remove('has-error');
      }

      // 4. Password
      const passVal = signupPassword ? signupPassword.value : '';
      const passGroup = signupPassword?.closest('.form-group');
      if (!passVal || passVal.length < 8) {
        if (passGroup) passGroup.classList.add('has-error');
        isValid = false;
      } else {
        if (passGroup) passGroup.classList.remove('has-error');
      }

      // 5. Terms Checkbox
      if (signupTerms && !signupTerms.checked) {
        showToast('Please agree to the Diagnostic Consent Terms & Medical Data Privacy Policy.');
        isValid = false;
      }

      if (!isValid) {
        if (signupTerms && signupTerms.checked) {
          showToast('Please complete all highlighted patient details.');
        }
        return;
      }

      // Successful Registration Simulation
      if (signupSubmitBtn) {
        signupSubmitBtn.disabled = true;
        signupSubmitBtn.innerHTML = '<span>Generating Patient ID...</span><i data-lucide="loader" class="btn-arrow-icon"></i>';
        initLucide();
      }

      showToast(`Welcome, ${nameVal}! Patient ID created. Opening Diagnostic Portal...`);

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1400);
    });

    // Clear errors on input
    [signupName, signupEmail, signupPhone, signupPassword].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          const group = input.closest('.form-group');
          if (group) group.classList.remove('has-error');
        });
      }
    });
  }

  // 7. Social Registration Actions (Google & Apple)
  const googleBtn = document.getElementById('googleSignupBtn');
  const appleBtn = document.getElementById('appleSignupBtn');

  if (googleBtn) {
    googleBtn.addEventListener('click', () => {
      showToast('Registering via Google Secure Patient Identity...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    });
  }

  if (appleBtn) {
    appleBtn.addEventListener('click', () => {
      showToast('Registering via Apple Secure Health ID...');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1200);
    });
  }

});
