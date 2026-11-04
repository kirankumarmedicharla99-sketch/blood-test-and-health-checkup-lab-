/* ==========================================================================
   ABOUT.JS — AARA CLINICAL LABORATORIES & DIAGNOSTICS
   Interactive functionality: Theme, RTL, Header Glassmorphism, Modals,
   Scroll Reveal, Animated Metrics Counter, and Form Handlers
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
  const hasDarkClass = document.body.classList.contains('dark-theme');
  applyTheme(savedTheme !== null ? savedTheme === 'dark' : hasDarkClass);

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

  // 7. Toast Notification Utility
  const aboutToast = document.getElementById('aboutToast');
  const aboutToastText = document.getElementById('aboutToastText');
  let toastTimer = null;

  const showToast = (message, duration = 3800) => {
    if (!aboutToast || !aboutToastText) return;
    aboutToastText.textContent = message;
    aboutToast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      aboutToast.classList.remove('show');
    }, duration);
  };

  // 8. Modals System (Login/Register & Patient Diagnostic Portal)
  const loginModal = document.getElementById('loginModal');
  const dashboardModal = document.getElementById('dashboardModal');
  const loginBtn = document.getElementById('loginBtn');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  const navDashboard = document.getElementById('navDashboard');
  const mobileDashboardBtn = document.getElementById('mobileDashboardBtn');

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

  // Login Page Redirection
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

  // Open Patient Diagnostic Portal Dashboard Page
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

  const footerVipPortalLink = document.getElementById('footerVipPortalLink');
  if (footerVipPortalLink) {
    footerVipPortalLink.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }

  // Close triggers for any modal
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      closeModal(loginModal);
      closeModal(dashboardModal);
    });
  });

  [loginModal, dashboardModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
    }
  });

  // Modal Tabs (Patient Login vs New Registration)
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

  // Form Submissions
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(loginModal);
      showToast('Welcome back to AARA Patient Portal. Accessing your lab reports...', 4000);
      loginForm.reset();
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(loginModal);
      showToast('Patient Portal registration completed. Welcome to AARA Clinical Laboratories.', 4500);
      registerForm.reset();
    });
  }

  const aboutNewsletterForm = document.getElementById('aboutNewsletterForm');
  if (aboutNewsletterForm) {
    aboutNewsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Subscribed to AARA Preventive Health Guides.', 4000);
      aboutNewsletterForm.reset();
    });
  }

  const btnRequestNewBespoke = document.getElementById('btnRequestNewBespoke');
  if (btnRequestNewBespoke) {
    btnRequestNewBespoke.addEventListener('click', () => {
      closeModal(dashboardModal);
      const ctaSection = document.getElementById('about-cta');
      if (ctaSection) {
        ctaSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = 'service.html';
      }
    });
  }

  // 9. Scroll Reveal Animations via IntersectionObserver
  const revealElements = document.querySelectorAll('.h2-reveal');
  if ('IntersectionObserver' in window && revealElements.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 100px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // Safety fallback: ensure elements reveal even if not directly scrolled
    setTimeout(() => {
      revealElements.forEach(el => el.classList.add('revealed'));
    }, 800);
  } else {
    // Fallback: reveal immediately
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // 10. Metric Counter Animation for Hero Stats
  const statElements = document.querySelectorAll('.about-stat-num.h2-stat-n');
  if ('IntersectionObserver' in window && statElements.length) {
    const statObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const rawText = el.textContent.trim();
          const targetValue = parseInt(rawText, 10);
          const hasPlus = rawText.includes('+');

          if (!isNaN(targetValue)) {
            let start = 0;
            const duration = 1400;
            const startTime = performance.now();

            const updateCount = (now) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(start + (targetValue - start) * easeProgress);

              el.textContent = hasPlus ? `${current}+` : current;

              if (progress < 1) {
                requestAnimationFrame(updateCount);
              }
            };
            requestAnimationFrame(updateCount);
          }
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statElements.forEach(el => statObserver.observe(el));
  }

  // Final pass for icons
  initLucide();
});
