/* MicroHub - Navigation JS */
'use strict';

(function () {
  function initNavigation() {
    const navbar = document.querySelector('.navbar-custom');
    if (!navbar || navbar.dataset.navigationReady === 'true') return;

    navbar.dataset.navigationReady = 'true';
    const keepScrolledState = navbar.classList.contains('scrolled');

    const hamburger = document.querySelector('#hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const megaMenu = document.querySelector('.mega-menu');
    const megaTrigger = document.querySelector('[data-mega]');
    const megaChevron = document.querySelector('#mega-chevron');

    let megaOpen = false;
    let scrollTimer;
    let megaCloseTimer;

    /* ── Navbar scroll state + logo swap ── */
    const logoImage = document.querySelector('.nav-logo-img');
    
    function updateNavbar() {
      navbar.classList.toggle('scrolled', keepScrolledState || window.scrollY > 40);
      syncMegaMenuPosition();
      
      // Swap logo when scrolled (navbar has white background)
      if (logoImage) {
        const isScrolled = navbar.classList.contains('scrolled');
        logoImage.src = isScrolled ? '/assets/images/Microhub_logo.png' : '/assets/images/microhub-white-logo.svg';
      }
    }

    // Initialize logo
    if (logoImage) {
      logoImage.src = '/assets/images/microhub-white-logo.svg';
      logoImage.alt = 'MicroHub Logo';
    }

    /* ── Mega menu (desktop) ── */
    function setMegaMenuState(isOpen) {
      megaOpen = isOpen;
      megaMenu?.classList.toggle('show', isOpen);
      if (megaChevron) megaChevron.style.transform = isOpen ? 'rotate(180deg)' : '';
    }

    function syncMegaMenuPosition() {
      if (!megaMenu || window.innerWidth < 992) {
        if (megaMenu) megaMenu.style.top = '';
        return;
      }
      const navbarBottom = navbar.getBoundingClientRect().bottom;
      megaMenu.style.top = `${Math.round(navbarBottom - 18)}px`;
    }

    function openMegaMenu() {
      clearTimeout(megaCloseTimer);
      syncMegaMenuPosition();
      setMegaMenuState(true);
    }

    function scheduleMegaMenuClose() {
      clearTimeout(megaCloseTimer);
      megaCloseTimer = setTimeout(() => setMegaMenuState(false), 160);
    }

    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = requestAnimationFrame(updateNavbar);
    }, { passive: true });
    window.addEventListener('resize', () => {
      syncMegaMenuPosition();
      if (window.innerWidth >= 992) {
        closeMobileMenu();
      }
    });
    updateNavbar();

    /* ── Hamburger / mobile menu ── */
    function openMobileMenu() {
      closeAllParents();
      closeAllSubSections();
      mobileMenu?.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
      mobileMenu?.classList.remove('open');
      document.body.style.overflow = '';
      closeAllParents();
      closeAllSubSections();
    }

    if (hamburger) hamburger.addEventListener('click', () => {
      mobileMenu?.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
    });

    document.querySelector('#mob-close-btn')?.addEventListener('click', closeMobileMenu);

    document.querySelectorAll('.mobile-menu a').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    /* ── Desktop: mega menu hover / click ── */
    if (megaTrigger && megaMenu) {
      megaTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        clearTimeout(megaCloseTimer);
        syncMegaMenuPosition();
        setMegaMenuState(!megaOpen);
      });
      megaTrigger.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 992) openMegaMenu();
      });
      megaTrigger.closest('.nav-item-mega')?.addEventListener('mouseleave', () => {
        if (window.innerWidth >= 992) scheduleMegaMenuClose();
      });
      megaMenu.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 992) openMegaMenu();
      });
      megaMenu.addEventListener('mouseleave', () => {
        if (window.innerWidth >= 992) scheduleMegaMenuClose();
      });
    }

    document.addEventListener('click', (e) => {
      if (megaMenu && !megaMenu.contains(e.target) && !megaTrigger?.contains(e.target)) {
        clearTimeout(megaCloseTimer);
        setMegaMenuState(false);
      }
    });

    /* ── Desktop: small dropdowns (Insights, Get Started) ── */
    document.querySelectorAll('.has-dropdown').forEach((item) => {
      const trigger = item.querySelector('.nav-link-custom');
      const dropdown = item.querySelector('.dropdown-custom');
      if (!trigger || !dropdown) return;
      let timer;
      item.addEventListener('mouseenter', () => { clearTimeout(timer); dropdown.classList.add('show'); });
      item.addEventListener('mouseleave', () => { timer = setTimeout(() => dropdown.classList.remove('show'), 120); });
      trigger.addEventListener('click', () => dropdown.classList.toggle('show'));
    });

    /* ── Mobile: strict single-open parent accordion ──
       Collects all top-level toggles (.mob-parent-toggle) and their
       matching sub panels (.mob-parent-sub).  Opening one closes all others.
    ── */
    function closeAllParents() {
      document.querySelectorAll('.mob-parent-sub').forEach((sub) => {
        sub.style.maxHeight = '0px';
        sub.classList.remove('open');
      });
      document.querySelectorAll('.mob-parent-toggle').forEach((btn) => {
        btn.classList.remove('expanded');
        const icon = btn.querySelector('.mob-parent-chevron');
        if (icon) icon.style.transform = '';
      });
    }

    document.querySelectorAll('.mob-parent-toggle').forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const targetId = toggle.dataset.target;
        const sub = document.querySelector(`#${targetId}`);
        if (!sub) return;

        const isOpen = toggle.classList.contains('expanded');

        closeAllParents();           // close everything first
        closeAllSubSections();       // also collapse any open sub-categories

        if (!isOpen) {
          toggle.classList.add('expanded');
          sub.classList.add('open');
          sub.style.maxHeight = `${sub.scrollHeight + 600}px`;
          const icon = toggle.querySelector('.mob-parent-chevron');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    });

    /* ── Mobile: strict single-open sub-section accordion
       (Software Solutions / IT Infrastructure / Hardware)
    ── */
    const subSections = [
      { toggleId: 'mob-software-toggle', bodyId: 'mob-software-body' },
      { toggleId: 'mob-services-toggle', bodyId: 'mob-services-body' },
      { toggleId: 'mob-hardware-toggle', bodyId: 'mob-hardware-body' },
    ];

    function closeAllSubSections() {
      subSections.forEach(({ toggleId, bodyId }) => {
        const t = document.querySelector(`#${toggleId}`);
        const b = document.querySelector(`#${bodyId}`);
        if (t) t.classList.remove('expanded');
        if (b) b.style.maxHeight = '0px';
        const chevron = t?.querySelector('.toggle-chevron');
        if (chevron) chevron.style.transform = '';
      });
    }

    subSections.forEach(({ toggleId, bodyId }) => {
      const toggleBtn = document.querySelector(`#${toggleId}`);
      const body = document.querySelector(`#${bodyId}`);
      if (!toggleBtn || !body) return;

      toggleBtn.addEventListener('click', () => {
        const isOpen = toggleBtn.classList.contains('expanded');

        closeAllSubSections();   // close siblings

        if (!isOpen) {
          toggleBtn.classList.add('expanded');
          body.style.maxHeight = `${body.scrollHeight}px`;

          // keep the parent "What We Do" sub tall enough
          const parentSub = document.querySelector('#mob-whatwedo-sub');
          if (parentSub) {
            parentSub.style.maxHeight = `${parentSub.scrollHeight + body.scrollHeight + 200}px`;
          }

          const chevron = toggleBtn.querySelector('.toggle-chevron');
          if (chevron) chevron.style.transform = 'rotate(180deg)';
        }
      });
    });

    /* ── Escape key ── */
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      setMegaMenuState(false);
      closeMobileMenu();
      document.querySelectorAll('.dropdown-custom').forEach((d) => d.classList.remove('show'));
      if (megaChevron) megaChevron.style.transform = '';
    });
  }

  function boot() { initNavigation(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
  document.addEventListener('microhub:fragments-loaded', boot);
})();
