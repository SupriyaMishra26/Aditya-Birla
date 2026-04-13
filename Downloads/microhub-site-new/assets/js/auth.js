/* MicroHub - Auth JS */
'use strict';

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    if (!input) return;
    const isText = input.type === 'text';
    input.type = isText ? 'password' : 'text';
    btn.querySelector('i').className = isText ? 'bi bi-eye' : 'bi bi-eye-slash';
  });
});

// Login form
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = loginForm.querySelector('[type="submit"]');
    const email = document.getElementById('login-email')?.value;
    const pass = document.getElementById('login-password')?.value;

    if (!email || !pass) {
      loginForm.querySelectorAll('[required]').forEach(f => {
        if (!f.value) f.classList.add('is-invalid');
      });
      return;
    }

    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Signing in...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = 'Sign In';
      btn.disabled = false;
      // Show backend integration note
      const note = document.getElementById('login-note');
      if (note) { note.style.display = 'block'; }
    }, 1500);
  });
}

// Signup form
const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = signupForm.querySelector('[type="submit"]');
    const pass = document.getElementById('signup-password')?.value;
    const confirm = document.getElementById('signup-confirm')?.value;

    if (pass !== confirm) {
      document.getElementById('signup-confirm')?.classList.add('is-invalid');
      return;
    }

    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Creating account...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = 'Create Account';
      btn.disabled = false;
      const note = document.getElementById('signup-note');
      if (note) { note.style.display = 'block'; }
    }, 1500);
  });

  // Password strength indicator
  const passInput = document.getElementById('signup-password');
  const strengthBar = document.getElementById('password-strength');
  if (passInput && strengthBar) {
    passInput.addEventListener('input', () => {
      const val = passInput.value;
      let strength = 0;
      if (val.length >= 8) strength++;
      if (/[A-Z]/.test(val)) strength++;
      if (/[0-9]/.test(val)) strength++;
      if (/[^A-Za-z0-9]/.test(val)) strength++;

      const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e'];
      const labels = ['Weak', 'Fair', 'Good', 'Strong'];
      strengthBar.style.width = (strength * 25) + '%';
      strengthBar.style.background = colors[strength - 1] || '#e2e8f0';
      const label = document.getElementById('strength-label');
      if (label) label.textContent = labels[strength - 1] || '';
    });
  }
}
