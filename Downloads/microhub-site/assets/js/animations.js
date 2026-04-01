/* MicroHub - Animations JS */
'use strict';

(function () {
  function initTypewriter(el, words, speed = 90, pause = 1800) {
    if (!el || el.dataset.typewriterReady === 'true') return;

    el.dataset.typewriterReady = 'true';
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function tick() {
      const word = words[wordIndex];
      el.textContent = isDeleting
        ? word.substring(0, --charIndex)
        : word.substring(0, ++charIndex);

      let delay = isDeleting ? speed / 2 : speed;

      if (!isDeleting && charIndex === word.length) {
        delay = pause;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 400;
      }

      window.setTimeout(tick, delay);
    }

    tick();
  }

  function initDelayedElements() {
    document.querySelectorAll('[data-delay]').forEach((element) => {
      if (element.dataset.delayReady === 'true') return;
      element.dataset.delayReady = 'true';
      element.style.transitionDelay = `${element.dataset.delay}ms`;
    });
  }

  function initParallax() {
    if (document.body.dataset.heroParallaxReady === 'true') return;
    document.body.dataset.heroParallaxReady = 'true';

    window.addEventListener('scroll', () => {
      const heroEl = document.querySelector('.hero-parallax');
      if (heroEl && window.scrollY < window.innerHeight) {
        heroEl.style.transform = `translateY(${window.scrollY * 0.25}px)`;
      }
    }, { passive: true });
  }

  function initAnimations() {
    initTypewriter(document.getElementById('typewriter-text'), [
      'Smart Software Solutions',
      'Secure IT Infrastructure',
      'Premium Hardware Supply',
      'Cloud-Ready ERP Systems',
      'End-to-End Tech Support',
    ]);
    initDelayedElements();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations, { once: true });
  } else {
    initAnimations();
  }

  document.addEventListener('microhub:fragments-loaded', initAnimations);
})();
