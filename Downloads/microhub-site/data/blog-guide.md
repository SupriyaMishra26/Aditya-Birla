# Blog Content Guide

The entire blog is controlled from:

- `microhub/data/blog-posts.json`

After editing that file, regenerate the pages with:

```powershell
powershell -ExecutionPolicy Bypass -File .\microhub\tools\render-blog-pages.ps1
```

What you can update inside `blog-posts.json`:

- `page.title`: browser title for the listing page
- `page.metaDescription`: SEO description for the listing page
- `page.eyebrow`, `page.heroTitle`, `page.heroDescription`: hero content on the blog listing
- `page.filters`: the filter buttons on the listing page
- `page.ctaTitle`, `page.ctaDescription`, `page.ctaButtonText`, `page.ctaButtonHref`: shared CTA at the bottom

Each post supports:

- `slug`: creates `insights/posts/<slug>.html`
- `title`
- `excerpt`
- `metaDescription`
- `date`
- `dateLabel`
- `readTime`
- `authorName`
- `authorInitials`
- `authorRole`
- `category`
- `categoryLabel`
- `filters`
- `icon`
- `visualTone`
- `featured`
- `media.src`
- `media.alt`
- `media.position`
- `highlights`
- `sections`
- `takeaway`

Image notes:

- Leave `media.src` empty to use the abstract icon visual.
- Add any valid image path or URL to `media.src` if you want a real cover image.
- Use `media.position` like `center center`, `top center`, or `50% 20%` to control the crop.

Content notes:

- `excerpt` is used on the card, feature area, and article intro.
- `highlights` appear below the article title.
- `sections` build the article body.
- `takeaway` becomes the closing summary card.
- Author fields are optional and are currently stored only in the data source, not shown in the live blog UI.
