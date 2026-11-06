/**
 * AARA CLINICAL LABORATORIES (AARA DIAGNOSTICS & LAB) — HEALTH GUIDES LOGIC (journal.js)
 * High-performance vanilla JavaScript powering interactive clinical category filters,
 * patient testing FAQs, theme/RTL toggles, and modals with 100% Home 1 parity.
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
    document.body.classList.add('mobile-drawer-open');
  };

  const closeDrawer = () => {
    if (!mobileNavDrawer || !drawerBackdrop) return;
    mobileNavDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('open');
    if (hamburgerBtn) hamburgerBtn.classList.remove('active');
    document.body.style.overflow = '';
    document.body.classList.remove('mobile-drawer-open');
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

  const showToast = (message, duration = 3800) => {
    if (!toastMsg || !toastText) return;
    toastText.textContent = message;
    toastMsg.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastMsg.classList.remove('show');
    }, duration);
  };

  // 8. Category Filter Tabs for the 6 Clinical Health Guide Cards
  const filterPills = document.querySelectorAll('#journalFilterPills .jnl-filter-pill');
  const journalCards = document.querySelectorAll('#journalCardsGrid .journal-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterValue = pill.getAttribute('data-filter');

      journalCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // 9. Interactive FAQ Accordion
  const faqItems = document.querySelectorAll('#faqAccordion .faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content-collapse');

    if (item.classList.contains('active') && content) {
      content.style.maxHeight = (content.scrollHeight + 30) + 'px';
      if (header) header.setAttribute('aria-expanded', 'true');
    }

    if (header && content) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        faqItems.forEach(other => {
          if (other !== item && other.classList.contains('active')) {
            other.classList.remove('active');
            const otherContent = other.querySelector('.faq-content-collapse');
            const otherHeader = other.querySelector('.faq-header');
            if (otherContent) otherContent.style.maxHeight = '0';
            if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          }
        });

        if (isActive) {
          item.classList.remove('active');
          content.style.maxHeight = '0';
          header.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          content.style.maxHeight = (content.scrollHeight + 30) + 'px';
          header.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 10. Modals Management (Patient Portal Login & Live Sample Status)
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

  // Home Sample Collection / Diagnostic Consultation Trigger Buttons
  document.querySelectorAll('[data-open-commission]').forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Patient Coordinator notified: Our phlebotomy desk will contact you shortly.');
    });
  });

  // Newsletter Subscription
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showToast(`Thank you! ${emailInput.value} has been subscribed to our preventive health updates.`);
        emailInput.value = '';
      }
    });
  }

  // Keyboard Escape to close modals and drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(loginModal);
      closeModal(dashboardModal);
      closeDrawer();
    }
  });
});
