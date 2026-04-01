const fs = require('fs');
const path = 'home/home.html';
let t = fs.readFileSync(path, 'utf8');
const subs = [
  ['<span class="hero-product-link">Explore <i class="bi bi-arrow-right"></i></span>', '<!-- <span class="hero-product-link">Explore <i class="bi bi-arrow-right"></i></span> -->'],
  ['<span class="product-highlight-link">Explore <i class="bi bi-arrow-right"></i></span>', '<!-- <span class="product-highlight-link">Explore <i class="bi bi-arrow-right"></i></span> -->'],
  ['<span class="infra-solution-link">Explore <i class="bi bi-arrow-right"></i></span>', '<!-- <span class="infra-solution-link">Explore <i class="bi bi-arrow-right"></i></span> -->'],
  ['<span class="hardware-card-link">Explore <i class="bi bi-arrow-right"></i></span>', '<!-- <span class="hardware-card-link">Explore <i class="bi bi-arrow-right"></i></span> -->']
];
for (const [oldVal, newVal] of subs) {
  while (t.includes(oldVal)) t = t.replace(oldVal, newVal);
}
fs.writeFileSync(path, t, 'utf8');
console.log('done');
