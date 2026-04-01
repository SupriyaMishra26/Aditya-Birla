/* MicroHub - Main JS */
'use strict';

(function () {
  let revealObserver;
  let counterObserver;

  function ensureRevealObserver() {
    if (revealObserver) return revealObserver;

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    return revealObserver;
  }

  function animateCounter(element, target, suffix = '') {
    let start = 0;
    const duration = 2200;
    const step = target / (duration / 16);
    const timer = window.setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        window.clearInterval(timer);
      }
      element.textContent = `${Math.floor(start).toLocaleString()}${suffix}`;
    }, 16);
  }

  function ensureCounterObserver() {
    if (counterObserver) return counterObserver;

    counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const element = entry.target;
        const target = parseInt(element.dataset.target, 10);
        const suffix = element.dataset.suffix || '';
        animateCounter(element, target, suffix);
        counterObserver.unobserve(element);
      });
    }, { threshold: 0.5 });

    return counterObserver;
  }

  function initBackToTop() {
    const button = document.getElementById('back-to-top');
    if (!button) return;

    if (document.body.dataset.backToTopScrollReady !== 'true') {
      document.body.dataset.backToTopScrollReady = 'true';
      window.addEventListener('scroll', () => {
        const currentButton = document.getElementById('back-to-top');
        if (currentButton) currentButton.classList.toggle('show', window.scrollY > 400);
      }, { passive: true });
    }

    if (button.dataset.buttonReady !== 'true') {
      button.dataset.buttonReady = 'true';
      button.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    button.classList.toggle('show', window.scrollY > 400);
  }

  function initRevealElements() {
    const observer = ensureRevealObserver();
    document.querySelectorAll('.reveal').forEach((element) => {
      if (element.dataset.revealReady === 'true') return;
      element.dataset.revealReady = 'true';
      observer.observe(element);
    });
  }

  function initCounters() {
    const observer = ensureCounterObserver();
    document.querySelectorAll('.counter-num').forEach((element) => {
      if (element.dataset.counterReady === 'true') return;
      element.dataset.counterReady = 'true';
      observer.observe(element);
    });
  }

  function normalizePath(path) {
    return path.replace(/\/index\.html$/, '/');
  }

  function getCurrentSection(currentPath) {
    if (currentPath.includes('/what-we-do/')) return 'what-we-do';
    if (currentPath.includes('/insights/')) return 'insights';
    if (currentPath.includes('/get-started/')) return 'get-started';
    if (currentPath.endsWith('/who-we-are.html')) return 'who-we-are';
    return '';
  }

  function highlightActiveLinks() {
    const currentPath = normalizePath(window.location.pathname);

    document.querySelectorAll('[data-nav-section]').forEach((item) => {
      item.classList.toggle('active', item.dataset.navSection === getCurrentSection(currentPath));
    });

    document.querySelectorAll('.nav-link-custom, .mega-link, .footer-links a').forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) return;

      const linkUrl = new URL(href, window.location.href);
      if (normalizePath(linkUrl.pathname) === currentPath && currentPath !== '/') {
        link.classList.add('active');
      }
    });
  }

  function initPageTransitions() {
    document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto"]):not([href^="tel"]):not([target])').forEach((link) => {
      if (link.dataset.transitionReady === 'true') return;

      link.dataset.transitionReady = 'true';
      link.addEventListener('click', (event) => {
        if (link.hostname !== window.location.hostname) return;

        event.preventDefault();
        const target = link.href;
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.25s ease';
        window.setTimeout(() => {
          window.location.href = target;
        }, 250);
      });
    });
  }

  function initTabs() {
    document.querySelectorAll('.tab-btn').forEach((button) => {
      if (button.dataset.tabReady === 'true') return;

      button.dataset.tabReady = 'true';
      button.addEventListener('click', () => {
        const tabGroup = button.closest('[data-tab-group]');
        if (!tabGroup) return;

        const target = button.dataset.tab;
        tabGroup.querySelectorAll('.tab-btn').forEach((item) => item.classList.remove('active'));
        tabGroup.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.remove('active'));
        button.classList.add('active');

        const panel = tabGroup.querySelector(`[data-panel="${target}"]`);
        if (panel) panel.classList.add('active');
      });
    });
  }

  function initTooltips() {
    if (typeof bootstrap === 'undefined') return;

    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((element) => {
      if (element.dataset.tooltipReady === 'true') return;
      element.dataset.tooltipReady = 'true';
      new bootstrap.Tooltip(element);
    });
  }

  function initTiltCards() {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      if (card.dataset.tiltReady === 'true') return;
      card.dataset.tiltReady = 'true';

      const inner = card.querySelector('.flip-card-inner');
      if (!inner) return;

      const isTouchDevice = () => window.matchMedia('(hover: none)').matches || window.innerWidth <= 768;

      card.addEventListener('mousemove', (event) => {
        if (isTouchDevice()) return;
        if (!card.matches(':hover') || inner.style.transform.includes('180deg')) return;

        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const tiltX = ((y / rect.height) - 0.5) * -14;
        const tiltY = ((x / rect.width) - 0.5) * 14;
        card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02,1.02,1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s ease';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s linear';
      });

      card.addEventListener('click', () => {
        if (!isTouchDevice()) return;
        card.classList.toggle('flipped');
      });
    });
  }

  function initMain() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';

    initBackToTop();
    initRevealElements();
    initCounters();
    highlightActiveLinks();
    initPageTransitions();
    initTabs();
    initTooltips();
    initTiltCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMain, { once: true });
  } else {
    initMain();
  }

  document.addEventListener('microhub:fragments-loaded', initMain);
})();
