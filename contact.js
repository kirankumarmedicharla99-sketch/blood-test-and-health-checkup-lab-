/**
 * AARA CLINICAL LABORATORIES (AARA DIAGNOSTICS & LAB) — CONTACT & HOME COLLECTION LOGIC (contact.js)
 * Controls the doorstep home sample collection booking form, prescription upload simulator,
 * Jubilee Hills Hyderabad central lab map interactions, FAQ accordion, theme/RTL toggles,
 * and patient portal modals with 100% Home 1 fidelity.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  const initLucide = () => {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  };
  initLucide();

  // 2. Sticky Header Elevation on Scroll
  const siteHeader = document.getElementById('siteHeader');
  const handleScroll = () => {
    if (!siteHeader) return;
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Mobile Off-Canvas Navigation Drawer
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseLinks = document.querySelectorAll('[data-close-drawer]');

  const openDrawer = () => {
    if (!mobileNavDrawer || !drawerBackdrop) return;
    mobileNavDrawer.classList.add('open');
    drawerBackdrop.classList.add('open');
    if (hamburgerBtn) hamburgerBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (!mobileNavDrawer || !drawerBackdrop) return;
    mobileNavDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    if (hamburgerBtn) hamburgerBtn.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNavDrawer && mobileNavDrawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  drawerCloseLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // 4. RTL / LTR Direction Switcher
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

  // 5. Dark / Light Theme Toggle (Persisted in localStorage)
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

  // 6. Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href.length < 2) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = siteHeader ? siteHeader.offsetHeight : 80;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: 'smooth'
        });
      }
    });
  });

  // 7. Toast Notification Utility
  const toastMsg = document.getElementById('toastMsg');
  const toastText = document.getElementById('toastText');
  let toastTimer = null;

  const showToast = (message, duration = 4200) => {
    if (!toastMsg || !toastText) return;
    toastText.textContent = message;
    toastMsg.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastMsg.classList.remove('show');
    }, duration);
  };

  // 8. FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.cnt-faq-wrapper .faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            const otherBtn = other.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 9. Prescription / Previous Report Upload Dropzone Simulator
  const uploadDropzone = document.getElementById('uploadDropzone');
  const fileInput = document.getElementById('fileAttachment');
  const selectedFilesList = document.getElementById('selectedFilesList');
  let uploadedFiles = [];

  const updateFilesUI = () => {
    if (!selectedFilesList) return;
    selectedFilesList.innerHTML = '';

    if (uploadedFiles.length === 0) return;

    uploadedFiles.forEach((file, index) => {
      const pill = document.createElement('div');
      pill.className = 'file-item-pill';

      const sizeStr = file.size > 1024 * 1024
        ? (file.size / (1024 * 1024)).toFixed(1) + ' MB'
        : (file.size / 1024).toFixed(0) + ' KB';

      pill.innerHTML = `
        <span style="display:flex; align-items:center; gap:6px;">
          <i data-lucide="file-check" style="width:14px; height:14px; color:var(--color-accent-primary);"></i>
          <strong>${file.name}</strong> (${sizeStr})
        </span>
        <button type="button" class="remove-file-btn" data-index="${index}" style="background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:1rem; padding:0 4px;" title="Remove file">&times;</button>
      `;

      selectedFilesList.appendChild(pill);
    });

    initLucide();

    // Attach remove handlers
    selectedFilesList.querySelectorAll('.remove-file-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        uploadedFiles.splice(idx, 1);
        updateFilesUI();
      });
    });
  };

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files) {
        Array.from(e.target.files).forEach(f => uploadedFiles.push(f));
        updateFilesUI();
      }
    });
  }

  if (uploadDropzone) {
    ['dragenter', 'dragover'].forEach(eventName => {
      uploadDropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadDropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      uploadDropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        uploadDropzone.classList.remove('dragover');
      });
    });

    uploadDropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer && e.dataTransfer.files) {
        Array.from(e.dataTransfer.files).forEach(f => uploadedFiles.push(f));
        updateFilesUI();
      }
    });
  }

  // 10. Home Sample Collection Booking Form Submission & Validation
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitCommissionBtn');

  if (contactForm) {
    // Realtime error clearing
    const nameInput = document.getElementById('clientName');
    const emailInput = document.getElementById('clientEmail');
    const phoneInput = document.getElementById('clientPhone');
    const detailsInput = document.getElementById('projectDetails');

    [nameInput, emailInput, phoneInput, detailsInput].forEach(input => {
      if (!input) return;
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group) group.classList.remove('has-error');
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Patient Name
      if (!nameInput || !nameInput.value.trim()) {
        const group = nameInput.closest('.form-group');
        if (group) group.classList.add('has-error');
        isValid = false;
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
        const group = emailInput.closest('.form-group');
        if (group) group.classList.add('has-error');
        isValid = false;
      }

      // Validate Phone
      if (!phoneInput || phoneInput.value.trim().length < 7) {
        const group = phoneInput.closest('.form-group');
        if (group) group.classList.add('has-error');
        isValid = false;
      }

      // Validate Address & Clinical Details
      if (!detailsInput || detailsInput.value.trim().length < 10) {
        const group = detailsInput.closest('.form-group');
        if (group) group.classList.add('has-error');
        isValid = false;
      }

      if (!isValid) {
        showToast('Please complete all required patient registration fields marked in red.', 3600);
        return;
      }

      // Simulated Submission State
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span>Registering Sample Collection...</span>
          <i data-lucide="loader" style="width:16px; height:16px; animation:spin 1s linear infinite;"></i>
        `;
        initLucide();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          initLucide();

          showToast(`Booking confirmed for ${nameInput.value.trim()}! Our phlebotomy dispatch desk will send your slot confirmation via WhatsApp within 15 minutes.`, 6000);

          contactForm.reset();
          uploadedFiles = [];
          updateFilesUI();
        }, 800);
      }
    });
  }

  // 11. Modals Management (Patient Login & Live Sample Status)
  const loginModal = document.getElementById('loginModal');
  const dashboardModal = document.getElementById('dashboardModal');

  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Close buttons and overlay clicks
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(loginModal);
      closeModal(dashboardModal);
    });
  });

  [loginModal, dashboardModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Login Modal Tabs Switcher
  const tabBtnLogin = document.getElementById('tabBtnLogin');
  const tabBtnRegister = document.getElementById('tabBtnRegister');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (tabBtnLogin && tabBtnRegister && loginForm && registerForm) {
    tabBtnLogin.addEventListener('click', () => {
      tabBtnLogin.classList.add('active');
      tabBtnRegister.classList.remove('active');
      loginForm.style.display = 'block';
      registerForm.style.display = 'none';
    });

    tabBtnRegister.addEventListener('click', () => {
      tabBtnRegister.classList.add('active');
      tabBtnLogin.classList.remove('active');
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    });
  }

  // Open Login Page Directly
  const loginBtn = document.getElementById('loginBtn');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }
  if (mobileLoginBtn) {
    mobileLoginBtn.addEventListener('click', () => {
      closeDrawer();
      window.location.href = 'login.html';
    });
  }

  // Open Patient Portal Dashboard
  const navDashboard = document.getElementById('navDashboard');
  const mobileDashboardBtn = document.getElementById('mobileDashboardBtn');
  const footerVipPortalLink = document.getElementById('footerVipPortalLink');

  if (navDashboard) navDashboard.addEventListener('click', () => { window.location.href = 'dashboard.html'; });
  if (mobileDashboardBtn) mobileDashboardBtn.addEventListener('click', () => {
    closeDrawer();
    window.location.href = 'dashboard.html';
  });
  if (footerVipPortalLink) footerVipPortalLink.addEventListener('click', () => { window.location.href = 'login.html'; });

  // Request New Test in Modal
  const btnRequestNewBespoke = document.getElementById('btnRequestNewBespoke');
  if (btnRequestNewBespoke) {
    btnRequestNewBespoke.addEventListener('click', () => {
      closeModal(dashboardModal);
      const formSection = document.getElementById('commission-inquiry');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Newsletter Subscription
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showToast(`Thank you! ${emailInput.value} has been registered for preventive health checkup alerts.`);
        emailInput.value = '';
      }
    });
  }

  // Escape key closes modals and drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(loginModal);
      closeModal(dashboardModal);
      closeDrawer();
    }
  });
});
