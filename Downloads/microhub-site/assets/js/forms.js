/* MicroHub - Forms JS */
'use strict';

(function () {
  function validateForm(form) {
    let valid = true;

    form.querySelectorAll('[required]').forEach((field) => {
      const value = field.value.trim();
      if (!value) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        valid = false;
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        valid = false;
      } else {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
      }
    });

    return valid;
  }

  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm || contactForm.dataset.formReady === 'true') return;

    contactForm.dataset.formReady = 'true';
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validateForm(contactForm)) return;

      const button = contactForm.querySelector('[type="submit"]');
      if (!button) return;

      button.textContent = 'Sending...';
      button.disabled = true;

      window.setTimeout(() => {
        button.textContent = 'Message Sent!';
        button.style.background = '#059669';
        contactForm.reset();
        contactForm.querySelectorAll('.is-valid').forEach((field) => field.classList.remove('is-valid'));
      }, 1500);
    });
  }

  function initNewsletterForms() {
    document.querySelectorAll('.newsletter-form').forEach((form) => {
      if (form.dataset.formReady === 'true') return;

      form.dataset.formReady = 'true';
      form.addEventListener('submit', (event) => {
        event.preventDefault();

        const button = form.querySelector('button[type="submit"]');
        const input = form.querySelector('input[type="email"]');
        const isValidEmail = input && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);

        if (isValidEmail) {
          if (button) {
            button.textContent = 'Subscribed!';
            button.disabled = true;
          }
        } else if (input) {
          input.classList.add('is-invalid');
        }
      });
    });
  }

  function initRoiCalculator() {
    const calculator = document.getElementById('roi-calculator');
    if (!calculator || calculator.dataset.formReady === 'true') return;

    calculator.dataset.formReady = 'true';

    function updateRoi() {
      const employees = parseInt(document.getElementById('roi-employees')?.value || 50, 10);
      const wage = parseInt(document.getElementById('roi-wage')?.value || 3000, 10);
      const savings = parseFloat(document.getElementById('roi-savings')?.value || 20) / 100;
      const monthly = employees * wage * savings;
      const annual = monthly * 12;
      const roi = ((annual - 48000) / 48000 * 100).toFixed(0);

      const monthlyEl = document.getElementById('roi-monthly');
      const annualEl = document.getElementById('roi-annual');
      const roiEl = document.getElementById('roi-percent');

      if (monthlyEl) monthlyEl.textContent = `Rs. ${monthly.toLocaleString('en-IN')}`;
      if (annualEl) annualEl.textContent = `Rs. ${annual.toLocaleString('en-IN')}`;
      if (roiEl) roiEl.textContent = `${roi}%`;

      document.querySelectorAll('.roi-display-val').forEach((element) => {
        const key = element.dataset.display;
        if (key === 'employees') element.textContent = employees;
        if (key === 'wage') element.textContent = `Rs. ${wage.toLocaleString('en-IN')}`;
        if (key === 'savings') element.textContent = `${Math.round(savings * 100)}%`;
      });
    }

    calculator.querySelectorAll('input[type="range"]').forEach((input) => {
      input.addEventListener('input', updateRoi);
    });
    updateRoi();
  }

  function initForms() {
    initContactForm();
    initNewsletterForms();
    initRoiCalculator();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForms, { once: true });
  } else {
    initForms();
  }

  document.addEventListener('microhub:fragments-loaded', initForms);
})();
