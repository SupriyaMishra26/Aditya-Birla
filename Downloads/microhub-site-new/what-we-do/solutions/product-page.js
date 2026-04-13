/* ============================================================
   MICROHUB SOFTWARE PRODUCT PAGES — SHARED JS
   ============================================================ */

(function () {
  'use strict';

  /* ── Page Loader ── */
  var loader = document.getElementById('sp-loader');
  if (loader) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('hidden');
      }, 240);
    });
  }

  /* ── Scroll Reveal (IntersectionObserver) ── */
  function initReveal() {
    var els = document.querySelectorAll('.sp-reveal');
    if (!els.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('sp-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    els.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── Back to Top ── */
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Component Loader (navbar / footer) ── */
  function loadComponent(el) {
    var src = el.getAttribute('data-include');
    var root = document.body.getAttribute('data-site-root') || '';
    var url = root + src;
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (html) { el.innerHTML = html; })
      .catch(function () { el.innerHTML = ''; });
  }

  function initComponents() {
    document.querySelectorAll('[data-include]').forEach(loadComponent);
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initBackToTop();
    initComponents();
  });
})();
