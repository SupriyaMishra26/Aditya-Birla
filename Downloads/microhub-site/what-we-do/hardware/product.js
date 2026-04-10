/**
 * microhub-product.js
 * Shared JavaScript for all MicroHub product pages.
 */

'use strict';

(function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));
})();
