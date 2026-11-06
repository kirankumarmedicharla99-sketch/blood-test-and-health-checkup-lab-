/**
 * AARA CLINICAL LABORATORIES & DIAGNOSTICS
 * Interactive Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // ---------------------------------------------------------------------------
  // 1. Theme Toggle (Clinical Light Mode vs Clinical Dark Mode)
  // ---------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('aara-theme') || localStorage.getItem('aara_theme') || 'light';

  function setTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      if (themeIcon) themeIcon.innerHTML = '<i data-lucide="sun"></i>';
      localStorage.setItem('aara-theme', 'dark');
      localStorage.setItem('aara_theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      if (themeIcon) themeIcon.innerHTML = '<i data-lucide="moon"></i>';
      localStorage.setItem('aara-theme', 'light');
      localStorage.setItem('aara_theme', 'light');
    }
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  setTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-theme');
      const newTheme = isDark ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(newTheme === 'dark' ? 'Clinical Dark Mode enabled' : 'Clinical Light Mode enabled');
    });
  }

  // ---------------------------------------------------------------------------
  // 2. RTL (Right-to-Left) Text Direction Toggle
  // ---------------------------------------------------------------------------
  const rtlToggleBtn = document.getElementById('rtlToggleBtn');
  const rtlLabel = document.getElementById('rtlLabel');
  const savedDir = localStorage.getItem('aara-dir') || localStorage.getItem('aara_dir') || 'ltr';

  function setDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    if (rtlLabel) {
      rtlLabel.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
    }
    localStorage.setItem('aara-dir', dir);
    localStorage.setItem('aara_dir', dir);
  }

  setDirection(savedDir);

  if (rtlToggleBtn) {
    rtlToggleBtn.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      setDirection(newDir);
      showToast(newDir === 'rtl' ? 'Direction switched to RTL' : 'Direction switched to LTR');
    });
  }

  // ---------------------------------------------------------------------------
  // 3. Header Scroll Glassmorphism Effect
  // ---------------------------------------------------------------------------
  const siteHeader = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // ---------------------------------------------------------------------------
  // 4. Mobile Menu Drawer
  // ---------------------------------------------------------------------------
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');

  function toggleDrawer(open) {
    const shouldOpen = open !== undefined ? open : !mobileNavDrawer.classList.contains('open');
    if (shouldOpen) {
      mobileNavDrawer.classList.add('open');
      drawerBackdrop.classList.add('active');
      hamburgerBtn.classList.add('active');
      mobileNavDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.body.classList.add('mobile-drawer-open');
    } else {
      mobileNavDrawer.classList.remove('open');
      drawerBackdrop.classList.remove('active');
      hamburgerBtn.classList.remove('active');
      mobileNavDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-drawer-open');
    }
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => toggleDrawer());
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', () => toggleDrawer(false));
  }

  document.querySelectorAll('[data-close-drawer]').forEach(link => {
    link.addEventListener('click', () => toggleDrawer(false));
  });

  // ---------------------------------------------------------------------------
  // 5. Space Styling Guide Tabs (Section 5)
  // ---------------------------------------------------------------------------
  const stylingTabBtns = document.querySelectorAll('.styling-tab-btn');
  const stylingPanes = document.querySelectorAll('.styling-tab-pane');

  stylingTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      stylingTabBtns.forEach(b => b.classList.remove('active'));
      stylingPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(btn.getAttribute('data-tab'));
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // ---------------------------------------------------------------------------
  // 6. Gallery Category Filtering (Section 6)
  // ---------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ---------------------------------------------------------------------------
  // 7. Modals System (Open, Close, Outside Click, Escape Key)
  // ---------------------------------------------------------------------------
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      // Close mobile drawer if opened
      toggleDrawer(false);
      if (window.lucide) {
        lucide.createIcons();
      }
    }
  }

  function closeModal(modal) {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.modal-overlay');
      closeModal(parentModal);
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m));
      toggleDrawer(false);
    }
  });

  // Login Page Redirection Triggers
  const loginBtn = document.getElementById('loginBtn');
  const mobileLoginBtn = document.getElementById('mobileLoginBtn');
  if (loginBtn) loginBtn.addEventListener('click', () => { window.location.href = 'login.html'; });
  if (mobileLoginBtn) mobileLoginBtn.addEventListener('click', () => { window.location.href = 'login.html'; });

  // Dashboard Page Triggers
  const navDashboard = document.getElementById('navDashboard');
  const mobileDashboardBtn = document.getElementById('mobileDashboardBtn');
  const footerVipPortalLink = document.getElementById('footerVipPortalLink');
  if (navDashboard) navDashboard.addEventListener('click', () => { window.location.href = 'dashboard.html'; });
  if (mobileDashboardBtn) mobileDashboardBtn.addEventListener('click', () => { window.location.href = 'dashboard.html'; });
  if (footerVipPortalLink) footerVipPortalLink.addEventListener('click', () => { window.location.href = 'login.html'; });

  // Custom Pricing & Commission Calculator Triggers
  const navPricing = document.getElementById('navPricing');
  const mobilePricingBtn = document.getElementById('mobilePricingBtn');
  const darkSectionCtaBtn = document.getElementById('darkSectionCtaBtn');
  const btnRequestNewBespoke = document.getElementById('btnRequestNewBespoke');

  [navPricing, mobilePricingBtn, darkSectionCtaBtn, btnRequestNewBespoke].forEach(el => {
    if (el) el.addEventListener('click', () => openModal('pricingModal'));
  });

  document.querySelectorAll('.open-calculator-link, .open-commission-link, [data-service-inquire]').forEach(el => {
    el.addEventListener('click', () => openModal('pricingModal'));
  });

  // Home 2 Lookbook Modal Triggers
  const btnOpenHome2 = document.getElementById('btnOpenHome2');
  const mobileHome2Btn = document.getElementById('mobileHome2Btn');
  if (btnOpenHome2) btnOpenHome2.addEventListener('click', () => openModal('home2Modal'));
  if (mobileHome2Btn) mobileHome2Btn.addEventListener('click', () => openModal('home2Modal'));

  // Quick View Lightbox Trigger on Gallery Cards
  const quickViewModal = document.getElementById('quickViewModal');
  const quickViewImg = document.getElementById('quickViewImg');
  const quickViewTitle = document.getElementById('quickViewTitle');
  const quickViewDims = document.getElementById('quickViewDims');
  const quickViewPrice = document.getElementById('quickViewPrice');

  document.querySelectorAll('.gallery-card').forEach(card => {
    const qvBtn = card.querySelector('.btn-quick-view');
    const orderBtn = card.querySelector('.btn-order-piece');

    const triggerQuickView = () => {
      const title = card.getAttribute('data-title');
      const price = card.getAttribute('data-price');
      const dims = card.getAttribute('data-dims');
      const img = card.getAttribute('data-img');

      if (quickViewImg) quickViewImg.src = img;
      if (quickViewTitle) quickViewTitle.textContent = title;
      if (quickViewDims) quickViewDims.textContent = dims;
      if (quickViewPrice) quickViewPrice.textContent = price;

      openModal('quickViewModal');
    };

    if (qvBtn) qvBtn.addEventListener('click', triggerQuickView);
    if (orderBtn) orderBtn.addEventListener('click', () => openModal('pricingModal'));
  });

  const btnQuickViewOrder = document.getElementById('btnQuickViewOrder');
  if (btnQuickViewOrder) {
    btnQuickViewOrder.addEventListener('click', () => {
      closeModal(quickViewModal);
      openModal('pricingModal');
    });
  }

  // ---------------------------------------------------------------------------
  // 8. Diagnostic Test & Health Package Cost Estimator Logic
  // ---------------------------------------------------------------------------
  const calcType = document.getElementById('calcType');
  const calcScale = document.getElementById('calcScale');
  const calcGold = document.getElementById('calcGold');
  const calcResultDisplay = document.getElementById('calcResultDisplay');

  function calculateCustomPrice() {
    if (!calcType || !calcScale || !calcGold || !calcResultDisplay) return;

    const basePrice = parseFloat(calcType.options[calcType.selectedIndex].getAttribute('data-base')) || 25;
    const scaleVal = parseFloat(calcScale.options[calcScale.selectedIndex].getAttribute('data-mult')) || 1;
    const visitAdd = scaleVal === 1.2 ? 15 : (scaleVal === 1.5 ? 25 : 0);
    const addonAdd = parseFloat(calcGold.options[calcGold.selectedIndex].getAttribute('data-add')) || 0;

    const total = Math.round(basePrice + visitAdd + addonAdd);
    calcResultDisplay.textContent = `$${total.toLocaleString()} USD`;
  }

  [calcType, calcScale, calcGold].forEach(select => {
    if (select) select.addEventListener('change', calculateCustomPrice);
  });

  const calculatorForm = document.getElementById('calculatorForm');
  if (calculatorForm) {
    calculatorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(document.getElementById('pricingModal'));
      showToast('Diagnostic appointment request registered. Our patient care team will confirm your slot shortly.');
    });
  }

  // ---------------------------------------------------------------------------
  // 9. Login / Register Modal Tabs & Submissions
  // ---------------------------------------------------------------------------
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
      registerForm.style.display = 'block';
      loginForm.style.display = 'none';
    });

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(document.getElementById('loginModal'));
      showToast('Welcome back. Authenticated to Patient Diagnostic Portal.');
      setTimeout(() => openModal('dashboardModal'), 800);
    });

    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(document.getElementById('loginModal'));
      showToast('Patient account registered. Welcome to AARA Clinical Laboratories.');
    });
  }

  // ---------------------------------------------------------------------------
  // 10. Newsletter Form Submission
  // ---------------------------------------------------------------------------
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input[type="email"]');
      if (input) input.value = '';
      showToast('Thank you for subscribing to AARA Clinical Health Guides.');
    });
  }

  const aboutLearnMoreBtn = document.getElementById('aboutLearnMoreBtn');
  if (aboutLearnMoreBtn) {
    aboutLearnMoreBtn.addEventListener('click', () => {
      const timeline = document.getElementById('timeline');
      if (timeline) timeline.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ---------------------------------------------------------------------------
  // 11. Toast Notification Helper
  // ---------------------------------------------------------------------------
  const toastMsg = document.getElementById('toastMsg');
  const toastText = document.getElementById('toastText');
  let toastTimer = null;

  function showToast(message, duration = 4000) {
    if (!toastMsg || !toastText) return;
    toastText.textContent = message;
    toastMsg.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastMsg.classList.remove('show');
    }, duration);
  }

  // ScrollSpy Active Link Tracking
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const id = href.substring(1);
        if (id === currentId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  }, { passive: true });

});
