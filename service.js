/* ==========================================================================
   SERVICE.JS — AARA CLINICAL LABORATORIES & DIAGNOSTICS
   Interactive functionality: Lucide Icons, Header Glassmorphism, Theme, RTL,
   FAQ Accordions, Mobile Drawer, Modals, and Notifications
   ========================================================================== */
'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // 1. Initialize Lucide Icons
  const initLucide = () => {
    if (typeof window.lucide !== 'undefined' && window.lucide.createIcons) {
      window.lucide.createIcons();
    }
  };
  initLucide();

  // 2. Header Scroll Glassmorphism Effect
  const siteHeader = document.getElementById('siteHeader');
  const updateHeaderScroll = () => {
    if (!siteHeader) return;
    const isScrolled = window.scrollY > 40;
    siteHeader.classList.toggle('scrolled', isScrolled);
  };
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  // 3. Mobile Off-Canvas Drawer
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  const toggleDrawer = (open) => {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.setAttribute('aria-hidden', String(!open));
    mobileNavDrawer.classList.toggle('open', open);
    if (drawerBackdrop) drawerBackdrop.classList.toggle('active', open);
    if (hamburgerBtn) hamburgerBtn.classList.toggle('active', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNavDrawer && mobileNavDrawer.classList.contains('open');
      toggleDrawer(!isOpen);
    });
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', () => toggleDrawer(false));
  }

  document.querySelectorAll('[data-close-drawer]').forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });

  // 4. RTL (Right-To-Left) Direction Switcher
  const rtlBtn = document.getElementById('rtlToggleBtn');
  const rtlLabel = document.getElementById('rtlLabel');
  const html = document.documentElement;

  const setDirection = (dir) => {
    html.setAttribute('dir', dir);
    localStorage.setItem('aara-dir', dir);
    if (rtlLabel) {
      rtlLabel.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    }
  };

  const initialDir = localStorage.getItem('aara-dir') || 'ltr';
  setDirection(initialDir);

  if (rtlBtn) {
    rtlBtn.addEventListener('click', () => {
      const current = html.getAttribute('dir') || 'ltr';
      setDirection(current === 'ltr' ? 'rtl' : 'ltr');
      initLucide();
    });
  }

  // 5. Light / Dark Theme Toggle
  const themeBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  const applyTheme = (isDark) => {
    document.body.classList.toggle('dark-theme', isDark);
    localStorage.setItem('aara-theme', isDark ? 'dark' : 'light');
    if (themeIcon) {
      themeIcon.innerHTML = isDark
        ? '<i data-lucide="sun"></i>'
        : '<i data-lucide="moon"></i>';
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

  // 6. Smooth Scrolling for In-Page Anchor Links
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

  const showToast = (message, duration = 3800) => {
    if (!toastMsg || !toastText) return;
    toastText.textContent = message;
    toastMsg.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastMsg.classList.remove('show');
    }, duration);
  };

  // 8. Interactive FAQ Accordion Functionality
  const faqItems = document.querySelectorAll('#faqAccordion .faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content-collapse');

    // Initialize initial active item
    if (item.classList.contains('active') && content) {
      content.style.maxHeight = content.scrollHeight + 'px';
      if (header) header.setAttribute('aria-expanded', 'true');
    }

    if (header && content) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other accordion items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherContent = otherItem.querySelector('.faq-content-collapse');
            const otherHeader = otherItem.querySelector('.faq-header');
            if (otherContent) otherContent.style.maxHeight = '0';
            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          content.style.maxHeight = '0';
          header.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          content.style.maxHeight = (content.scrollHeight + 20) + 'px';
          header.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 9. Modals System (Patient Portal Login/Register & Sample Tracker)
  const loginModal = document.getElementById('loginModal');
  const dashboardModal = document.getElementById('dashboardModal');
  const loginBtn = document.getElementById('loginBtn');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  const navDashboard = document.getElementById('navDashboard');
  const mobileDashboardBtn = document.getElementById('mobileDashboardBtn');
  const footerVipPortalLink = document.getElementById('footerVipPortalLink');
  const btnOpenCommissionModal = document.getElementById('btnOpenCommissionModal');

  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    initLucide();
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }
  if (mobileLoginBtn) {
    mobileLoginBtn.addEventListener('click', () => {
      toggleDrawer(false);
      window.location.href = 'login.html';
    });
  }

  if (navDashboard) navDashboard.addEventListener('click', () => { window.location.href = 'dashboard.html'; });
  if (mobileDashboardBtn) mobileDashboardBtn.addEventListener('click', () => {
    toggleDrawer(false);
    window.location.href = 'dashboard.html';
  });
  if (footerVipPortalLink) footerVipPortalLink.addEventListener('click', () => { window.location.href = 'login.html'; });

  if (btnOpenCommissionModal) {
    btnOpenCommissionModal.addEventListener('click', () => {
      openModal(dashboardModal);
      showToast('Opening Diagnostic Appointment & Sample Tracker...');
    });
  }

  // Close modals on backdrop click or close button
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.modal-overlay');
      if (parentModal) closeModal(parentModal);
    });
  });

  // Modal Login / Register Tabs
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

  // Handle Login & Register submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(loginModal);
      showToast('Welcome to the AARA Patient Diagnostic Portal.');
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(loginModal);
      showToast('Patient Portal registration completed.');
    });
  }

  // 10. Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterForm.reset();
      showToast('Thank you for subscribing to AARA Clinical Health Bulletins.');
    });
  }

});
