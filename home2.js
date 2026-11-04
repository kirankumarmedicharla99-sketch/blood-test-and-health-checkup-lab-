/* ==========================================================================
   HOME2.JS — AARA CLINICAL LABORATORIES (Preventive Care & Diagnostics Hub)
   Interactive behavior: animations, navigation, modals, theme & RTL
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

  // 4. RTL (Right-To-Left) Toggle
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
  applyTheme(savedTheme === 'dark');

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isCurrentlyDark = document.body.classList.contains('dark-theme');
      applyTheme(!isCurrentlyDark);
    });
  }

  // 6. Safe Smooth Scrolling for In-Page Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      // Prevent crash on href="#" or empty selectors
      if (!href || href === '#' || href.length < 2) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = siteHeader ? siteHeader.offsetHeight : 70;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: 'smooth'
        });
      }
    });
  });

  // 7. Scroll Reveal Animation via IntersectionObserver
  const revealElements = document.querySelectorAll('.h2-reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Instant fallback if IntersectionObserver is unsupported
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // 8. Stat Counter Animation
  const animateCounter = (el) => {
    const originalText = el.textContent.trim();
    const suffix = originalText.replace(/[\d]/g, '');
    const targetValue = parseInt(originalText.replace(/[^\d]/g, ''), 10);
    if (isNaN(targetValue)) return;

    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * targetValue);
      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };
    requestAnimationFrame(tick);
  };

  const statNumbers = document.querySelectorAll('.h2-stat-n');
  if ('IntersectionObserver' in window && statNumbers.length > 0) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          statObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => statObserver.observe(num));
  }

  // 9. Toast Notification System
  const showToast = (message) => {
    const toast = document.getElementById('h2Toast');
    const toastText = document.getElementById('h2ToastText');
    if (!toast) return;

    if (toastText) {
      toastText.textContent = message;
    }
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3600);
  };

  // 10. Patient Health Bulletin Subscription Form
  const newsletterForm = document.getElementById('h2NewsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter-input');
      if (input && input.value) {
        showToast('Subscribed to AARA Preventive Health Guides. Confirmation sent.');
        input.value = '';
      }
    });
  }

  // 11. Hero Floating Cards Interactive Parallax
  const floatingCards = document.querySelectorAll('.h2-floating-card');
  if (floatingCards.length > 0 && window.innerWidth > 1024) {
    window.addEventListener('mousemove', (e) => {
      const xRatio = (e.clientX / window.innerWidth - 0.5) * 2;
      const yRatio = (e.clientY / window.innerHeight - 0.5) * 2;

      floatingCards.forEach((card, idx) => {
        const factor = (idx + 1) * 5;
        card.style.transform = `translate(${xRatio * factor}px, ${yRatio * factor}px)`;
      });
    }, { passive: true });
  }

  // 12. Modal Utility Functions
  const openModal = (modal) => {
    if (modal) modal.classList.add('active');
  };

  const closeModal = (modal) => {
    if (modal) modal.classList.remove('active');
  };

  document.querySelectorAll('[data-close-modal]').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(closeModal);
    });
  });

  // 13. Patient Portal / Login Modal
  const loginModal = document.getElementById('loginModal');
  const loginBtn = document.getElementById('loginBtn');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  const tabBtnLogin = document.getElementById('tabBtnLogin');
  const tabBtnRegister = document.getElementById('tabBtnRegister');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
      window.location.href = 'login.html';
    });
  }

  if (mobileLoginBtn) {
    mobileLoginBtn.addEventListener('click', (e) => {
      toggleDrawer(false);
      window.location.href = 'login.html';
    });
  }

  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) closeModal(loginModal);
    });
  }

  const footerVipPortalLink = document.getElementById('footerVipPortalLink');
  if (footerVipPortalLink) {
    footerVipPortalLink.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  // Login Modal Tabs Switcher
  if (tabBtnLogin && tabBtnRegister) {
    tabBtnLogin.addEventListener('click', () => {
      tabBtnLogin.classList.add('active');
      tabBtnRegister.classList.remove('active');
      if (loginForm) loginForm.style.display = 'block';
      if (registerForm) registerForm.style.display = 'none';
    });

    tabBtnRegister.addEventListener('click', () => {
      tabBtnRegister.classList.add('active');
      tabBtnLogin.classList.remove('active');
      if (loginForm) loginForm.style.display = 'none';
      if (registerForm) registerForm.style.display = 'block';
    });
  }

  // Form Submissions
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(loginModal);
      showToast('Welcome back to AARA Patient Portal. Loading diagnostic reports.');
      loginForm.reset();
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(loginModal);
      showToast('Patient Portal registration complete. Welcome to AARA Clinical Laboratories.');
      registerForm.reset();
    });
  }

  // 14. Patient Diagnostic Portal Modal
  const dashboardModal = document.getElementById('dashboardModal');
  const navDashboard = document.getElementById('navDashboard');
  const mobileDashboardBtn = document.getElementById('mobileDashboardBtn');
  const btnRequestNewBespoke = document.getElementById('btnRequestNewBespoke');

  if (navDashboard) {
    navDashboard.addEventListener('click', () => {
      window.location.href = 'dashboard.html';
    });
  }

  if (mobileDashboardBtn) {
    mobileDashboardBtn.addEventListener('click', () => {
      toggleDrawer(false);
      window.location.href = 'dashboard.html';
    });
  }

  if (dashboardModal) {
    dashboardModal.addEventListener('click', (e) => {
      if (e.target === dashboardModal) closeModal(dashboardModal);
    });
  }

  if (btnRequestNewBespoke) {
    btnRequestNewBespoke.addEventListener('click', () => {
      closeModal(dashboardModal);
      window.location.href = 'service.html';
    });
  }

  // ── Diagnostic Spectrum Tab Switcher ───────────────────────────────────────
  const artTabs = document.querySelectorAll('.h2-at-tab');
  const artPanels = document.querySelectorAll('.h2-at-panel');

  if (artTabs.length && artPanels.length) {
    artTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const idx = tab.dataset.tab;

        // Update tabs
        artTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Update panels — remove active, then re-add to trigger animation
        artPanels.forEach(p => p.classList.remove('active'));
        const target = document.querySelector(`.h2-at-panel[data-panel="${idx}"]`);
        if (target) {
          target.classList.add('active');
        }

        // Re-render Lucide icons inside new panel
        initLucide();
      });
    });
  }

  // ── Analytical Infrastructure Ribbon Navigation ────────────────────────────
  const paletteRibbonItems = document.querySelectorAll('.h2-ribbon-item');
  if (paletteRibbonItems.length) {
    paletteRibbonItems.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.dataset.target;
        if (!targetId) return;

        // Update active ribbon button
        paletteRibbonItems.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const card = document.getElementById(targetId);
        if (card) {
          const headerOffset = 90;
          const cardTop = card.getBoundingClientRect().top + window.scrollY - headerOffset;
          window.scrollTo({
            top: Math.max(0, cardTop),
            behavior: 'smooth'
          });

          // Trigger highlight pulse animation
          card.classList.remove('pcard-highlight');
          void card.offsetWidth; // trigger reflow
          card.classList.add('pcard-highlight');
        }
      });
    });
  }

  // Ensure Lucide renders on any dynamically generated elements
  initLucide();

});
