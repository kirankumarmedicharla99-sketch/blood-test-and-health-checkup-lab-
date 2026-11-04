/* ==========================================================================
   PRICING.JS — AARA CLINICAL LABORATORIES & DIAGNOSTICS
   Interactive functionality: Scope Switcher (Individual/Family vs. Corporate),
   Instant Health Package Estimator, FAQ Accordion, Theme, RTL, and Modals
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
    if (rtlLabel) rtlLabel.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
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

  // 8. Scope Switcher (Individual & Family vs. Corporate & Annual Wellness)
  const btnScopeRes = document.getElementById('btnScopeRes');
  const btnScopeCom = document.getElementById('btnScopeCom');

  // Pricing elements to update
  const tier1Name = document.getElementById('tier1Name');
  const tier1Price = document.getElementById('tier1Price');
  const tier1Period = document.getElementById('tier1Period');
  const tier1Desc = document.getElementById('tier1Desc');
  const tier1Deposit = document.getElementById('tier1Deposit');

  const tier2Name = document.getElementById('tier2Name');
  const tier2Price = document.getElementById('tier2Price');
  const tier2Period = document.getElementById('tier2Period');
  const tier2Desc = document.getElementById('tier2Desc');
  const tier2Deposit = document.getElementById('tier2Deposit');

  const tier3Name = document.getElementById('tier3Name');
  const tier3Price = document.getElementById('tier3Price');
  const tier3Period = document.getElementById('tier3Period');
  const tier3Desc = document.getElementById('tier3Desc');
  const tier3Deposit = document.getElementById('tier3Deposit');

  const setPricingScope = (scope) => {
    if (scope === 'corporate') {
      btnScopeCom.classList.add('active');
      btnScopeRes.classList.remove('active');

      if (tier1Name) tier1Name.textContent = 'Corporate Pre-Employment Screen';
      if (tier1Price) tier1Price.textContent = '35';
      if (tier1Period) tier1Period.textContent = 'USD / Employee (25+ Staff)';
      if (tier1Desc) tier1Desc.textContent = 'Standardized pre-employment & annual baseline screening (CBC, Fasting Glucose, Lipid Profile, Creatinine, SGPT & Urine) for corporate teams.';
      if (tier1Deposit) tier1Deposit.innerHTML = '<i data-lucide="info"></i> On-Site Office Camp or Lab Voucher';

      if (tier2Name) tier2Name.textContent = 'Corporate Annual Wellness 68';
      if (tier2Price) tier2Price.textContent = '68';
      if (tier2Period) tier2Period.textContent = 'USD / Employee (20% Corp Savings)';
      if (tier2Desc) tier2Desc.textContent = 'Complete 68-parameter annual employee wellness checkup including CBC, Lipid, LFT, KFT, Thyroid, HbA1c, and Vitamin D & B12.';
      if (tier2Deposit) tier2Deposit.innerHTML = '<i data-lucide="info"></i> Includes Free Home or Office Phlebotomy';

      if (tier3Name) tier3Name.textContent = 'C-Suite & Leadership Master 92';
      if (tier3Price) tier3Price.textContent = '118';
      if (tier3Period) tier3Period.textContent = 'USD / Executive';
      if (tier3Desc) tier3Desc.textContent = 'Comprehensive 92-biomarker executive cardiac, metabolic, endocrine, and nutritional longevity assessment for senior leadership.';
      if (tier3Deposit) tier3Deposit.innerHTML = '<i data-lucide="info"></i> Priority Same-Day Report & HR Analytics';
    } else {
      btnScopeRes.classList.add('active');
      btnScopeCom.classList.remove('active');

      if (tier1Name) tier1Name.textContent = 'Essential Vitality Screening';
      if (tier1Price) tier1Price.textContent = '45';
      if (tier1Period) tier1Period.textContent = 'USD / Person';
      if (tier1Desc) tier1Desc.textContent = 'Foundational 38-parameter routine blood and urine checkup for baseline hematology, blood sugar, cholesterol, and kidney-liver health.';
      if (tier1Deposit) tier1Deposit.innerHTML = '<i data-lucide="info"></i> 38 Biomarkers • 8–10 Hr Fasting Required';

      if (tier2Name) tier2Name.textContent = 'Comprehensive Full Body Checkup';
      if (tier2Price) tier2Price.textContent = '85';
      if (tier2Period) tier2Period.textContent = 'USD / All-Inclusive';
      if (tier2Desc) tier2Desc.textContent = 'Complete 68-parameter multi-organ wellness assessment including Thyroid, HbA1c, Liver, Kidney, Lipids, and Vitamin D & B12.';
      if (tier2Deposit) tier2Deposit.innerHTML = '<i data-lucide="info"></i> 68 Biomarkers • Includes Free Doorstep Collection';

      if (tier3Name) tier3Name.textContent = 'Executive Cardiac & Metabolic Master';
      if (tier3Price) tier3Price.textContent = '145';
      if (tier3Period) tier3Period.textContent = 'USD / Executive';
      if (tier3Desc) tier3Desc.textContent = 'Advanced 92-parameter longevity, cardiovascular inflammation, hormone, and micronutrient screening for comprehensive preventive care.';
      if (tier3Deposit) tier3Deposit.innerHTML = '<i data-lucide="info"></i> 92 Biomarkers • Free Home Visit + Priority Report';
    }
    initLucide();
  };

  if (btnScopeRes && btnScopeCom) {
    btnScopeRes.addEventListener('click', () => setPricingScope('individual'));
    btnScopeCom.addEventListener('click', () => setPricingScope('corporate'));
  }

  // 9. Interactive Health Package & Diagnostic Test Estimator Calculator
  const calcDiscipline = document.getElementById('calcDiscipline');
  const calcSize = document.getElementById('calcSize');
  const calcMineral = document.getElementById('calcMineral');
  const estimatorResultPrice = document.getElementById('estimatorResultPrice');
  const estimatorResultSub = document.getElementById('estimatorResultSub');

  const recalculateEstimate = () => {
    if (!calcDiscipline || !calcSize || !calcMineral || !estimatorResultPrice) return;

    const basePrice = parseInt(calcDiscipline.value, 10) || 85;
    const sizeMultiplier = parseFloat(calcSize.value) || 1.0;
    const addonFee = parseInt(calcMineral.value, 10) || 0;

    const totalEstimate = Math.round((basePrice + addonFee) * sizeMultiplier);
    estimatorResultPrice.textContent = `$${totalEstimate.toLocaleString()} USD`;

    // Dynamic turnaround & home visit note
    let turnaroundNote = 'Turnaround: Same Day (6 – 12 Hours)';
    if (basePrice >= 85 || addonFee >= 35) {
      turnaroundNote = 'Turnaround: 12 – 24 Hours';
    }
    const homeVisitBenefit = totalEstimate >= 85
      ? 'Includes FREE doorstep home collection'
      : 'Walk-in lab fee (or +$15 for home collection)';

    if (estimatorResultSub) {
      estimatorResultSub.textContent = `${homeVisitBenefit}, MD Pathologist verification & digital PDF report • ${turnaroundNote}`;
    }
  };

  if (calcDiscipline && calcSize && calcMineral) {
    calcDiscipline.addEventListener('change', recalculateEstimate);
    calcSize.addEventListener('change', recalculateEstimate);
    calcMineral.addEventListener('change', recalculateEstimate);
    recalculateEstimate();
  }

  // 10. Interactive FAQ Accordion
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

  // 11. Modals System (Patient Portal & Package Booking)
  const loginModal = document.getElementById('loginModal');
  const dashboardModal = document.getElementById('dashboardModal');
  const loginBtn = document.getElementById('loginBtn');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  const navDashboard = document.getElementById('navDashboard');
  const mobileDashboardBtn = document.getElementById('mobileDashboardBtn');
  const footerVipPortalLink = document.getElementById('footerVipPortalLink');

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

  // Package booking buttons trigger booking/tracker modal
  document.querySelectorAll('[data-open-commission]').forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(dashboardModal);
      const tier = btn.getAttribute('data-open-commission') || 'Health Checkup Package';
      showToast(`Opening Appointment Booking for ${tier}...`);
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.modal-overlay');
      if (parent) closeModal(parent);
    });
  });

  // Login / Register Form Tabs
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

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterForm.reset();
      showToast('Thank you for subscribing to AARA Clinical Health Bulletins.');
    });
  }

});
