/* MicroHub - Enhancements JS
 * Handles: Talk to Sales popup, WhatsApp sticky button, pricing label fix
 */
'use strict';

(function () {

  /* ============================================================
     TALK TO SALES MODAL
     Creates a clean popup with call CTA when "Talk to Sales" clicked
  ============================================================ */
  function createSalesModal() {
    if (document.getElementById('mh-sales-modal')) return;

    var overlay = document.createElement('div');
    overlay.id = 'mh-sales-modal';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Talk to Sales');
    overlay.style.cssText = [
      'display:none',
      'position:fixed',
      'inset:0',
      'z-index:99999',
      'background:rgba(10,20,40,0.55)',
      'backdrop-filter:blur(4px)',
      '-webkit-backdrop-filter:blur(4px)',
      'align-items:center',
      'justify-content:center',
      'padding:16px'
    ].join(';');

    overlay.innerHTML = [
      '<div style="background:#fff;border-radius:16px;padding:36px 32px 28px;max-width:380px;width:100%;box-shadow:0 24px 64px rgba(0,0,0,0.18);position:relative;text-align:center;font-family:Inter,sans-serif;">',
        '<button id="mh-sales-modal-close" aria-label="Close" style="position:absolute;top:14px;right:16px;background:none;border:none;cursor:pointer;font-size:1.4rem;color:#555;line-height:1;">&times;</button>',
        '<div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#1a3a5c,#2e4b65);display:flex;align-items:center;justify-content:center;margin:0 auto 18px;">',
          '<svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#fff" stroke-width="2">',
            '<path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>',
          '</svg>',
        '</div>',
        '<h3 style="margin:0 0 6px;font-size:1.25rem;font-weight:700;color:#111;">Talk to Sales</h3>',
        '<p style="margin:0 0 22px;color:#555;font-size:0.93rem;line-height:1.5;">Our team is ready to help. Give us a call and we\'ll connect you with the right expert.</p>',
        '<p style="margin:0 0 20px;font-size:1.1rem;font-weight:600;color:#1a3a5c;">Call Now: +91 92208 07363</p>',
        '<a href="tel:+919220807363" style="display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#1a3a5c,#2e4b65);color:#fff;text-decoration:none;padding:13px 28px;border-radius:8px;font-size:0.97rem;font-weight:600;width:100%;justify-content:center;transition:opacity 0.2s;" onmouseenter="this.style.opacity=\'0.9\'" onmouseleave="this.style.opacity=\'1\'">',
          '<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">',
            '<path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>',
          '</svg>',
          'Call +91 92208 07363',
        '</a>',
      '</div>'
    ].join('');

    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeSalesModal();
    });

    document.getElementById('mh-sales-modal-close').addEventListener('click', closeSalesModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeSalesModal();
    });
  }

  function openSalesModal() {
    var modal = document.getElementById('mh-sales-modal');
    if (!modal) { createSalesModal(); modal = document.getElementById('mh-sales-modal'); }
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeSalesModal() {
    var modal = document.getElementById('mh-sales-modal');
    if (modal) modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  function initTalkToSalesButtons() {
    document.querySelectorAll('a, button').forEach(function (el) {
      if (el.dataset.salesInitDone) return;
      var text = el.textContent.trim();
      if (text.indexOf('Talk to Sales') !== -1) {
        el.dataset.salesInitDone = 'true';
        el.addEventListener('click', function (e) {
          e.preventDefault();
          openSalesModal();
        });
      }
    });
  }

  /* ============================================================
     WHATSAPP STICKY BUTTON
  ============================================================ */
  function createWhatsAppButton() {
    if (document.getElementById('mh-whatsapp-btn')) return;

    var style = document.createElement('style');
    style.textContent = [
      '#mh-whatsapp-btn {',
        'position:fixed;',
        'bottom:24px;',
        'right:24px;',
        'z-index:9998;',
        'display:flex;',
        'align-items:center;',
        'justify-content:center;',
        'width:56px;',
        'height:56px;',
        'border-radius:50%;',
        'background:#25D366;',
        'box-shadow:0 4px 16px rgba(37,211,102,0.45);',
        'text-decoration:none;',
        'transition:transform 0.2s,box-shadow 0.2s;',
      '}',
      '#mh-whatsapp-btn:hover {',
        'transform:scale(1.1);',
        'box-shadow:0 6px 24px rgba(37,211,102,0.6);',
      '}',
      '#mh-whatsapp-btn svg { display:block; }',
      '#mh-whatsapp-pulse {',
        'position:absolute;',
        'top:0;right:0;',
        'width:14px;height:14px;',
        'border-radius:50%;',
        'background:#ff4444;',
        'border:2px solid #fff;',
        'animation:mh-pulse 2s infinite;',
      '}',
      '@keyframes mh-pulse {',
        '0%{transform:scale(1);opacity:1}',
        '50%{transform:scale(1.3);opacity:0.7}',
        '100%{transform:scale(1);opacity:1}',
      '}',
      '@media(max-width:480px){',
        '#mh-whatsapp-btn{bottom:16px;right:16px;width:50px;height:50px;}',
      '}'
    ].join('');
    document.head.appendChild(style);

    var btn = document.createElement('a');
    btn.id = 'mh-whatsapp-btn';
    btn.href = 'https://wa.me/919220807363';
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.setAttribute('aria-label', 'Chat on WhatsApp');
    btn.innerHTML = [
      '<div id="mh-whatsapp-pulse"></div>',
      '<svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">',
        '<path fill="#fff" d="M16 2.9C8.8 2.9 3 8.7 3 15.9c0 2.3.6 4.5 1.8 6.5L3 29l6.8-1.8c1.9 1 4 1.6 6.2 1.6 7.2 0 13-5.8 13-13S23.2 2.9 16 2.9zm6.5 17.4c-.3.8-1.5 1.5-2.1 1.6-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .5.4.2.4.7 1.7.8 1.9.1.1.1.3 0 .4-.1.2-.1.3-.3.5-.1.1-.3.3-.4.4-.1.1-.2.3-.1.5.5.8 1.1 1.6 1.7 2.2.7.7 1.4 1 1.7 1.1.2.1.4.1.5-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.7-.1.3.1 1.7.8 2 1 .3.1.5.2.6.3.1.3.1 1.1-.2 1.9z"/>',
      '</svg>'
    ].join('');

    document.body.appendChild(btn);
  }

  /* ============================================================
     PRICING SECTION - Always show "Monthly" label after price
  ============================================================ */
  function fixPricingLabels() {
    var billingToggle = document.getElementById('billing-toggle');
    if (!billingToggle) return;

    var monthly = ['999', '2499'];
    var annual = ['799', '1999'];

    billingToggle.addEventListener('change', function () {
      var isAnnual = billingToggle.checked;
      var priceEls = document.querySelectorAll('.pricing-card .pricing-price');
      priceEls.forEach(function (el, idx) {
        if (idx === 0) {
          el.innerHTML = '<sup>&#8377;</sup>' + (isAnnual ? annual[0] : monthly[0]) + '<sub>/month</sub>';
        } else if (idx === 1) {
          el.innerHTML = '<sup>&#8377;</sup>' + (isAnnual ? annual[1] : monthly[1]) + '<sub>/month</sub>';
        } else {
          el.innerHTML = 'Custom';
          el.style.fontSize = '2.2rem';
        }
      });
    });
  }

  /* ============================================================
     MOBILE BLANK SCREEN FIX
     Ensures body and html are visible and overflow is not hidden globally
  ============================================================ */
  function fixMobileRendering() {
    var style = document.createElement('style');
    style.textContent = [
      'html, body { min-height: 100%; overflow-x: hidden; }',
      'body { display: block !important; visibility: visible !important; opacity: 1 !important; }'
    ].join('\n');
    document.head.appendChild(style);
  }

  /* ============================================================
     INIT - Run after DOM ready, also re-run after component loader
  ============================================================ */
  function init() {
    createSalesModal();
    createWhatsAppButton();
    fixPricingLabels();
    initTalkToSalesButtons();
    fixMobileRendering();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  document.addEventListener('microhub:fragments-loaded', function () {
    initTalkToSalesButtons();
    fixPricingLabels();
  });

  setTimeout(initTalkToSalesButtons, 800);

  /* Force hero orbit cards to appear if animation hasn't settled */
  setTimeout(function () {
    var stage = document.querySelector('.hero-visual-stage');
    if (stage && !stage.classList.contains('is-settled')) {
      stage.classList.add('is-settled');
    }
  }, 300);

})();
