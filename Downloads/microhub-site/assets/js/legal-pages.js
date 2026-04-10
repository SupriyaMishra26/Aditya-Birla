/* MicroHub - Legal Pages JS */
'use strict';

(function () {
  function setActiveLink(links, targetId) {
    links.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${targetId}`;
      link.classList.toggle('active', isActive);
    });
  }

  function initPrintButtons() {
    document.querySelectorAll('[data-legal-print]').forEach((button) => {
      if (button.dataset.printReady === 'true') return;

      button.dataset.printReady = 'true';
      button.addEventListener('click', () => window.print());
    });
  }

  function initLegalPages() {
    document.querySelectorAll('[data-legal-page]').forEach((page) => {
      if (page.dataset.legalReady === 'true') return;
      page.dataset.legalReady = 'true';

      const sections = Array.from(page.querySelectorAll('[data-legal-section]'));
      const links = Array.from(page.querySelectorAll('[data-legal-toc-link]'));
      const mobileToggle = page.querySelector('[data-legal-mobile-toggle]');
      const mobilePanel = page.querySelector('[data-legal-mobile-panel]');
      const mobileLabel = page.querySelector('[data-legal-mobile-label]');

      const closeMobilePanel = () => {
        if (!mobileToggle || !mobilePanel) return;
        mobilePanel.classList.remove('open');
        mobileToggle.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        if (mobileLabel) mobileLabel.textContent = 'Open Topics';
      };

      const toggleMobilePanel = () => {
        if (!mobileToggle || !mobilePanel) return;
        const isOpen = mobilePanel.classList.toggle('open');
        mobileToggle.classList.toggle('is-open', isOpen);
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
        if (mobileLabel) mobileLabel.textContent = isOpen ? 'Close Topics' : 'Open Topics';
      };

      if (mobileToggle && mobilePanel) {
        mobileToggle.addEventListener('click', toggleMobilePanel);

        links.forEach((link) => {
          link.addEventListener('click', () => {
            if (window.innerWidth < 992) closeMobilePanel();
          });
        });
      }

      if (sections.length && links.length && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              setActiveLink(links, entry.target.id);
            });
          },
          { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
        );

        sections.forEach((section) => observer.observe(section));

        if (window.location.hash) {
          const initial = page.querySelector(window.location.hash);
          if (initial) setActiveLink(links, initial.id);
        } else if (sections[0]) {
          setActiveLink(links, sections[0].id);
        }
      }
    });
  }

  function initLegalFeatures() {
    initPrintButtons();
    initLegalPages();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLegalFeatures, { once: true });
  } else {
    initLegalFeatures();
  }

  document.addEventListener('microhub:fragments-loaded', initLegalFeatures);
})();
