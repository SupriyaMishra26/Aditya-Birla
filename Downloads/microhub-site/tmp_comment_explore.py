from pathlib import Path
path = Path('home/home.html')
text = path.read_text(encoding='utf-8')
replacements = {
    '<span class="hero-product-link">Explore <i class="bi bi-arrow-right"></i></span>': '<!-- <span class="hero-product-link">Explore <i class="bi bi-arrow-right"></i></span> -->',
    '<span class="product-highlight-link">Explore <i class="bi bi-arrow-right"></i></span>': '<!-- <span class="product-highlight-link">Explore <i class="bi bi-arrow-right"></i></span> -->',
    '<span class="infra-solution-link">Explore <i class="bi bi-arrow-right"></i></span>': '<!-- <span class="infra-solution-link">Explore <i class="bi bi-arrow-right"></i></span> -->',
    '<span class="hardware-card-link">Explore <i class="bi bi-arrow-right"></i></span>': '<!-- <span class="hardware-card-link">Explore <i class="bi bi-arrow-right"></i></span> -->',
}
for old, new in replacements.items():
    text = text.replace(old, new)
path.write_text(text, encoding='utf-8')
print('done')