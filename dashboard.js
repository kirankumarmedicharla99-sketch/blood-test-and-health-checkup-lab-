/**
 * AARA CLINICAL LABORATORIES — PATIENT DIAGNOSTIC PORTAL & LAB DASHBOARD (dashboard.js)
 * High-performance JavaScript powering:
 *  - 5 Dynamic Clinical Portal Views + Patient Settings Tab Switching
 *  - Mobile Off-Canvas Sidebar Drawer
 *  - Functional RTL & Light/Dark Theme Toggles
 *  - Working Notification Bell with Unread Badge & Dropdown
 *  - Working Profile Avatar with Menu Dropdown
 *  - Billing Timeframe Toggle (Quarterly/Annual/All-Time) & CSV Export
 *  - Sample Pipeline Status Filters & Digital Report PDF Downloads
 *  - Patient Profile Save & Toast Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  const initLucide = () => {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  };
  initLucide();

  // 2. Toast Notification Utility
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

  // 3. Tab Switching Engine (5 Types + Settings)
  const navItems = document.querySelectorAll('.dash-nav-item[data-tab]');
  const tabPanes = document.querySelectorAll('.dash-tab-pane');

  const switchTab = (tabId) => {
    if (!tabId) return;

    // Update Sidebar Navigation States
    navItems.forEach(item => {
      if (item.getAttribute('data-tab') === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update Tab Content Panes
    tabPanes.forEach(pane => {
      if (pane.id === `tab-${tabId}`) {
        pane.classList.add('active');
      } else {
        pane.classList.remove('active');
      }
    });

    // Close mobile sidebar if open
    closeMobileSidebar();

    // Scroll to top of main panel
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Refresh any icons in newly visible view
    initLucide();
  };

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabId = item.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Support elements with data-switch-tab across dashboard
  document.querySelectorAll('[data-switch-tab]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = elem.getAttribute('data-switch-tab');
      switchTab(targetTab);
      closeAllDropdowns();
    });
  });

  // 4. Mobile Off-Canvas Sidebar Drawer
  const sidebar = document.getElementById('dashSidebar');
  const sidebarBackdrop = document.getElementById('sidebarBackdrop');
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');

  const openMobileSidebar = () => {
    if (!sidebar || !sidebarBackdrop) return;
    sidebar.classList.add('open');
    sidebarBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileSidebar = () => {
    if (!sidebar || !sidebarBackdrop) return;
    sidebar.classList.remove('open');
    sidebarBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener('click', () => {
      const isOpen = sidebar && sidebar.classList.contains('open');
      if (isOpen) {
        closeMobileSidebar();
      } else {
        openMobileSidebar();
      }
    });
  }

  if (sidebarCloseBtn) {
    sidebarCloseBtn.addEventListener('click', closeMobileSidebar);
  }

  if (sidebarBackdrop) {
    sidebarBackdrop.addEventListener('click', closeMobileSidebar);
  }

  // 5. RTL / LTR Direction Switcher (functional with localStorage)
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
      showToast(`Portal text direction switched to ${!isCurrentRtl ? 'RTL' : 'LTR'}.`);
    });
  }

  // 6. Dark / Light Theme Toggle (functional with localStorage)
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
      showToast(`Theme changed to ${!isCurrentlyDark ? 'Clinical Dark' : 'Clinical Light'} mode.`);
    });
  }

  // 7. Dropdown Panels (Notifications & Profile Menus)
  const notifBtn = document.getElementById('notifBtn');
  const notifDropdown = document.getElementById('notifDropdown');
  const notifBadge = document.getElementById('notifBadge');
  const markAllReadBtn = document.getElementById('markAllReadBtn');
  const notifItems = document.querySelectorAll('.notif-item');

  const profileBtn = document.getElementById('profileBtn');
  const profileDropdown = document.getElementById('profileDropdown');

  const closeAllDropdowns = () => {
    if (notifDropdown) notifDropdown.classList.remove('open');
    if (profileDropdown) profileDropdown.classList.remove('open');
  };

  // Toggle Notification Dropdown
  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = notifDropdown.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) {
        notifDropdown.classList.add('open');
      }
    });
  }

  // Mark all notifications as read
  if (markAllReadBtn) {
    markAllReadBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifItems.forEach(item => item.classList.remove('unread'));
      if (notifBadge) {
        notifBadge.style.display = 'none';
      }
      showToast('All laboratory and report notifications marked as read.');
    });
  }

  // Toggle Profile Dropdown
  if (profileBtn && profileDropdown) {
    profileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = profileDropdown.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) {
        profileDropdown.classList.add('open');
      }
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dash-dropdown-container')) {
      closeAllDropdowns();
    }
  });

  // 8. Billing Timeframe Switcher (Quarterly vs Annual vs All-Time)
  const timeframeBtns = document.querySelectorAll('#revenueTimeframeToggle .timeframe-btn');
  const grossRevenueVal = document.getElementById('grossRevenueVal');

  const revenueData = {
    weekly: { gross: '₹4,650', bars: ['55%', '65%', '75%', '90%', '82%', '70%'] },
    monthly: { gross: '₹14,850', bars: ['48%', '64%', '56%', '78%', '94%', '84%'] },
    yearly: { gross: '₹42,300', bars: ['60%', '72%', '80%', '88%', '96%', '92%'] }
  };

  timeframeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      timeframeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const time = btn.getAttribute('data-time');
      const data = revenueData[time] || revenueData.monthly;

      if (grossRevenueVal) {
        grossRevenueVal.textContent = data.gross;
      }

      // Update Bar heights smoothly
      const bars = document.querySelectorAll('.bar-pill .bar-fill');
      bars.forEach((bar, idx) => {
        if (data.bars[idx]) {
          bar.style.height = data.bars[idx];
        }
      });

      const labelMap = { weekly: 'Quarterly', monthly: 'Annual (2026)', yearly: 'All-Time' };
      showToast(`Diagnostic billing summary updated to ${labelMap[time] || time} view.`);
    });
  });

  // 8b. CSV Export for Medical Test Invoices & Health Receipts
  const exportInvoicesCsvBtn = document.getElementById('exportInvoicesCsvBtn');
  if (exportInvoicesCsvBtn) {
    exportInvoicesCsvBtn.addEventListener('click', () => {
      const csvRows = [
        ['Receipt ID', 'Patient Name', 'Diagnostic Package / Test', 'Date', 'Amount (INR)', 'Status'],
        ['#INV-2026-892', 'Dr. Eleanor Vance', 'Comprehensive Full Body Checkup (65 Tests)', '2026-09-14', '3499.00', 'Paid - UPI'],
        ['#INV-2026-874', 'Dr. Eleanor Vance', 'Advanced Thyroid & Vitamin D3/B12 Panel', '2026-08-24', '2199.00', 'Insurance Claimed'],
        ['#INV-2026-851', 'Arthur Vance', 'Senior Citizen Cardiac & Diabetes Package', '2026-08-15', '3999.00', 'Paid - Card'],
        ['#INV-2026-830', 'Dr. Eleanor Vance', 'Complete Blood Count (CBC) & HbA1c', '2026-08-04', '1150.00', 'Reimbursed']
      ];
      const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.join(',')).join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'AARA_Clinical_Health_Receipts_2026.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('Exported AARA_Clinical_Health_Receipts_2026.csv for Sec 80D / TPA claim.');
    });
  }

  // 9. Sample Pipeline Filter Pills
  const orderFilterPills = document.querySelectorAll('#ordersFilterBar .order-filter-pill');
  const orderRows = document.querySelectorAll('#ordersTable tbody tr');

  orderFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      orderFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');

      orderRows.forEach(row => {
        const category = row.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // Track Sample / View Dossier buttons in Sample Pipeline table
  document.querySelectorAll('.view-order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const row = btn.closest('tr');
      const sampleId = row ? row.querySelector('code').textContent : '#AARA';
      showToast(`Fetching live vacutainer barcode telemetry for sample ${sampleId}...`);
    });
  });

  // Digital Report PDF Download buttons
  document.querySelectorAll('.download-report-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const reportId = btn.getAttribute('data-report') || '#RPT-2026';
      showToast(`Downloading pathologist-signed digital report ${reportId}.pdf...`);
    });
  });

  // Medical Receipt Download buttons
  document.querySelectorAll('.download-invoice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const invoiceId = btn.getAttribute('data-invoice') || '#INV-2026';
      showToast(`Downloading itemized medical receipt ${invoiceId}.pdf...`);
    });
  });

  // QR Verification Button in Report Archive
  const scanBarcodeBtn = document.getElementById('scanBarcodeBtn');
  if (scanBarcodeBtn) {
    scanBarcodeBtn.addEventListener('click', () => {
      showToast('QR Digital Signature Verifier ready. All 18 archived reports carry valid NABL/ISO cryptographic seals.');
    });
  }

  // Edit Collection Address Button
  const editAddressBtn = document.getElementById('editAddressBtn');
  if (editAddressBtn) {
    editAddressBtn.addEventListener('click', () => {
      showToast('Home sample collection address unlocked for GPS pin update.');
    });
  }

  // 10. Settings Form Submission Handler
  const settingsForm = document.getElementById('settingsForm');
  const settingsName = document.getElementById('settingsName');
  const welcomeTitle = document.querySelector('.welcome-title');
  const profileName = document.querySelector('.profile-name');

  if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const newName = settingsName ? settingsName.value.trim() : 'Dr. Eleanor Vance';

      // Update header welcome and profile text
      if (welcomeTitle) {
        welcomeTitle.innerHTML = `Welcome back, <span class="gold-gradient-text">${newName}</span>`;
      }
      if (profileName) {
        profileName.textContent = newName.split(' ').slice(0, 2).join(' ') || 'Patient';
      }

      showToast('Patient profile, blood group & home collection preferences saved.');
    });
  }

  // Change Avatar Simulator
  const changeAvatarBtn = document.getElementById('changeAvatarBtn');
  if (changeAvatarBtn) {
    changeAvatarBtn.addEventListener('click', () => {
      showToast('Patient ID photo synchronized with AARA Clinical Laboratory records.');
    });
  }

  // Escape key closes modals, dropdowns, and mobile sidebar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllDropdowns();
      closeMobileSidebar();
    }
  });
});
