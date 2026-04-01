$ErrorActionPreference = 'Stop'

function Encode-Html([string]$Text) {
  if ($null -eq $Text) { return '' }
  return [System.Net.WebUtility]::HtmlEncode($Text)
}

function Join-Lines([System.Collections.Generic.List[string]]$Lines) {
  return ($Lines -join "`r`n")
}

function Get-DisplayDateLabel($Post) {
  if ($Post.dateLabel) { return [string]$Post.dateLabel }
  if (-not $Post.date) { return '' }

  try {
    $date = [datetime]::Parse([string]$Post.date, [System.Globalization.CultureInfo]::InvariantCulture)
    return $date.ToString('MMM d, yyyy', [System.Globalization.CultureInfo]::InvariantCulture)
  } catch {
    return [string]$Post.date
  }
}

function Get-AuthorInitials($Post) {
  if ($Post.authorInitials) { return [string]$Post.authorInitials }
  if (-not $Post.authorName) { return 'MH' }

  $parts = @(([string]$Post.authorName).Split(' ', [System.StringSplitOptions]::RemoveEmptyEntries))
  if ($parts.Count -eq 0) { return 'MH' }
  if ($parts.Count -eq 1) { return $parts[0].Substring(0, [Math]::Min(2, $parts[0].Length)).ToUpperInvariant() }
  return ($parts[0].Substring(0, 1) + $parts[$parts.Count - 1].Substring(0, 1)).ToUpperInvariant()
}

function Get-ToneClass($Post) {
  $tone = if ($Post.visualTone) { [string]$Post.visualTone } else { 'software' }
  return "tone-$tone"
}

function Get-PostUrl($Post) {
  return "posts/$($Post.slug).html"
}

function Get-MediaSource($Post) {
  if ($Post.media -and $Post.media.src) { return [string]$Post.media.src }
  return ''
}

function Get-MediaAlt($Post) {
  if ($Post.media -and $Post.media.alt) { return [string]$Post.media.alt }
  return [string]$Post.title
}

function Get-MediaPosition($Post) {
  if ($Post.media -and $Post.media.position) { return [string]$Post.media.position }
  return 'center center'
}

function Render-Visual($Post, [string]$Variant) {
  $tone = Get-ToneClass $Post
  $icon = if ($Post.icon) { [string]$Post.icon } else { 'bi-journal-text' }
  $imageSrc = Get-MediaSource $Post

  if ($imageSrc) {
    return @"
<div class="blog-visual $tone blog-visual--$Variant has-image">
  <img src="$(Encode-Html($imageSrc))" alt="$(Encode-Html((Get-MediaAlt $Post)))" class="blog-visual__image" style="object-position: $(Encode-Html((Get-MediaPosition $Post)))">
</div>
"@
  }

  return @"
<div class="blog-visual $tone blog-visual--$Variant">
  <div class="blog-visual__grid" aria-hidden="true"></div>
  <div class="blog-visual__orb blog-visual__orb--one" aria-hidden="true"></div>
  <div class="blog-visual__orb blog-visual__orb--two" aria-hidden="true"></div>
  <i class="bi $icon"></i>
</div>
"@
}

function Render-Card($Post, [int]$Delay, [string]$BasePath = '') {
  $cardLines = [System.Collections.Generic.List[string]]::new()
  $filters = @($Post.filters) -join ' '
  $url = "$BasePath$(Get-PostUrl $Post)"
  $dateLabel = Get-DisplayDateLabel $Post

  $cardLines.Add("      <article class=`"col-lg-4 col-md-6 reveal reveal-delay-$Delay blog-render-item`" data-category=`"$(Encode-Html($filters))`">")
  $cardLines.Add("        <a href=`"$url`" class=`"blog-card blog-card-link`">")
  $cardLines.Add((Render-Visual $Post 'card').TrimEnd())
  $cardLines.Add('          <div class="blog-card-body">')
  $cardLines.Add("            <span class=`"blog-tag`">$(Encode-Html($Post.categoryLabel))</span>")
  $cardLines.Add("            <h3 class=`"blog-card-title`">$(Encode-Html($Post.title))</h3>")
  $cardLines.Add("            <p class=`"text-muted small mb-3`">$(Encode-Html($Post.excerpt))</p>")
  $cardLines.Add('            <div class="blog-card-meta">')
  $cardLines.Add("              <span><i class=`"bi bi-calendar3`"></i> $(Encode-Html($dateLabel))</span>")
  $cardLines.Add("              <span><i class=`"bi bi-clock`"></i> $(Encode-Html($Post.readTime))</span>")
  $cardLines.Add('            </div>')
  $cardLines.Add('          </div>')
  $cardLines.Add('        </a>')
  $cardLines.Add('      </article>')
  return Join-Lines $cardLines
}

function Render-Sections($Post) {
  $sectionLines = [System.Collections.Generic.List[string]]::new()

  foreach ($section in @($Post.sections)) {
    $sectionLines.Add('        <section class="article-section reveal">')
    $sectionLines.Add("          <h2>$(Encode-Html($section.heading))</h2>")

    foreach ($paragraph in @($section.paragraphs)) {
      $sectionLines.Add("          <p>$(Encode-Html($paragraph))</p>")
    }

    if (@($section.bullets).Count -gt 0) {
      $sectionLines.Add('          <ul class="article-keypoints">')
      foreach ($bullet in @($section.bullets)) {
        $sectionLines.Add("            <li>$(Encode-Html($bullet))</li>")
      }
      $sectionLines.Add('          </ul>')
    }

    $sectionLines.Add('        </section>')
    $sectionLines.Add('')
  }

  if ($sectionLines.Count -gt 0) {
    $null = $sectionLines.RemoveAt($sectionLines.Count - 1)
  }

  return Join-Lines $sectionLines
}

function Render-Filters($PageConfig) {
  $filterLines = [System.Collections.Generic.List[string]]::new()

  foreach ($filter in @($PageConfig.filters)) {
    $isActive = if ($filter.active) { ' active' } else { '' }
    $filterLines.Add("          <button type=`"button`" class=`"blog-filter-btn$isActive`" data-blog-filter=`"$(Encode-Html($filter.id))`">$(Encode-Html($filter.label))</button>")
  }

  return Join-Lines $filterLines
}

function Get-DefaultPageConfig() {
  return [pscustomobject]@{
    title = 'Blog - MicroHub Insights'
    metaDescription = 'Practical articles on remote teams, virtual staffing, productivity systems, and digital growth from the MicroHub team.'
    eyebrow = 'Insights & Articles'
    heroTitle = 'Practical reads on remote teams, smarter hiring, and digital growth.'
    heroDescription = 'This one file controls the blog listing, filters, article pages, dates, author info, highlights, and optional image fields so you can update the whole blog from one place.'
    featuredLabel = 'Featured'
    listEyebrow = 'Latest Articles'
    listTitle = 'Everything is driven from one editable content file.'
    ctaTitle = 'Need help turning insight into action?'
    ctaDescription = 'Talk to MicroHub when you want help with systems, operations, staffing support, or rollout planning.'
    ctaButtonText = 'Talk to the Team'
    ctaButtonHref = 'https://repair.microhub.in/register'
    filters = @(
      [pscustomobject]@{ id = 'all'; label = 'All'; active = $true },
      [pscustomobject]@{ id = 'remote-teams'; label = 'Remote Teams'; active = $false },
      [pscustomobject]@{ id = 'virtual-staffing'; label = 'Virtual Staffing'; active = $false },
      [pscustomobject]@{ id = 'productivity'; label = 'Productivity'; active = $false },
      [pscustomobject]@{ id = 'marketing'; label = 'Marketing'; active = $false }
    )
  }
}

function Merge-PageConfig($Source) {
  $default = Get-DefaultPageConfig
  if (-not $Source) { return $default }

  foreach ($property in $default.PSObject.Properties.Name) {
    if ($property -eq 'filters') {
      if (-not $Source.filters -or @($Source.filters).Count -eq 0) {
        $Source | Add-Member -NotePropertyName filters -NotePropertyValue $default.filters -Force
      }
      continue
    }

    if (-not $Source.PSObject.Properties[$property] -or [string]::IsNullOrWhiteSpace([string]$Source.$property)) {
      $Source | Add-Member -NotePropertyName $property -NotePropertyValue $default.$property -Force
    }
  }

  return $Source
}

function Write-BlogListingPage($OutputPath, $PageConfig, $Posts) {
  $featured = @($Posts | Where-Object { $_.featured } | Select-Object -First 1)
  if (-not $featured) {
    $featured = @($Posts | Select-Object -First 1)
  }
  $featured = $featured[0]

  $gridPosts = @($Posts | Where-Object { $_.slug -ne $featured.slug })
  $gridLines = [System.Collections.Generic.List[string]]::new()

  for ($i = 0; $i -lt $gridPosts.Count; $i++) {
    $delay = ($i % 3) + 1
    $gridLines.Add((Render-Card $gridPosts[$i] $delay))
    $gridLines.Add('')
  }

  if ($gridLines.Count -gt 0) {
    $null = $gridLines.RemoveAt($gridLines.Count - 1)
  }

  $featuredVisual = (Render-Visual $featured 'feature').TrimEnd()
  $featuredUrl = Get-PostUrl $featured
  $featuredDate = Get-DisplayDateLabel $featured
  $filters = Render-Filters $PageConfig

  $html = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$(Encode-Html($PageConfig.title))</title>
  <meta name="description" content="$(Encode-Html($PageConfig.metaDescription))">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../assets/css/main.css">
  <link rel="stylesheet" href="../assets/css/layout.css">
  <link rel="stylesheet" href="../assets/css/components.css">
  <link rel="stylesheet" href="../assets/css/animations.css">
  <link rel="stylesheet" href="../assets/css/responsive.css">
  <link rel="stylesheet" href="../assets/css/blog.css">
</head>
<body data-site-root="../" data-blog-page="listing">
<div id="navbar-root" data-include="components/navbar.html"></div>

<section class="page-hero">
  <div class="container position-relative" style="z-index:1">
    <div class="col-lg-8 fade-in-up-1">
      <div class="section-label" style="background:rgba(13,148,136,0.2);color:var(--primary-light)"><i class="bi bi-journal-text"></i> $(Encode-Html($PageConfig.eyebrow))</div>
      <h1 style="color:var(--white)">$(Encode-Html($PageConfig.heroTitle))</h1>
      <p style="color:rgba(255,255,255,0.72);margin-top:1.15rem;max-width:640px">$(Encode-Html($PageConfig.heroDescription))</p>
    </div>
  </div>
</section>

<section class="blog-shell-section" style="padding-bottom:34px;border-bottom:1px solid var(--border)">
  <div class="container">
    <div class="blog-search-shell reveal">
      <div class="search-bar">
        <i class="bi bi-search"></i>
        <input type="text" placeholder="Search articles..." id="blog-search" aria-label="Search articles">
      </div>
      <div class="blog-filter-row">
        <div class="blog-filter-group">
$filters
        </div>
        <span class="blog-results-count" id="blog-result-count">$($gridPosts.Count) articles</span>
      </div>
    </div>
  </div>
</section>

<section class="blog-shell-section" style="background:var(--accent)">
  <div class="container">
    <div class="blog-feature-shell reveal">
      <div class="blog-feature-media">
$featuredVisual
      </div>
      <div class="blog-feature-copy">
        <span class="blog-tag">$(Encode-Html($PageConfig.featuredLabel)) / $(Encode-Html($featured.categoryLabel))</span>
        <h2><a href="$featuredUrl">$(Encode-Html($featured.title))</a></h2>
        <p>$(Encode-Html($featured.excerpt))</p>
        <div class="blog-feature-meta">
          <span><i class="bi bi-calendar3"></i> $(Encode-Html($featuredDate))</span>
          <span><i class="bi bi-clock"></i> $(Encode-Html($featured.readTime))</span>
        </div>
        <a href="$featuredUrl" class="link-arrow mt-3 d-inline-flex">Read Full Article <i class="bi bi-arrow-right"></i></a>
      </div>
    </div>
  </div>
</section>

<section class="blog-shell-section">
  <div class="container">
    <div class="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-4 reveal">
      <div>
        <p class="section-subtitle mb-2" style="margin:0">$(Encode-Html($PageConfig.listEyebrow))</p>
        <h2 class="section-title mb-0" style="margin:0;font-size:clamp(1.45rem,2.4vw,2rem)">$(Encode-Html($PageConfig.listTitle))</h2>
      </div>
    </div>
    <div class="row g-4" id="blog-grid">
$(Join-Lines $gridLines)
    </div>
  </div>
</section>

<section class="cta-section">
  <div class="container position-relative" style="z-index:1;text-align:center">
    <h2 style="color:var(--white);margin-bottom:1rem">$(Encode-Html($PageConfig.ctaTitle))</h2>
    <p style="color:rgba(255,255,255,0.8);margin-bottom:2rem">$(Encode-Html($PageConfig.ctaDescription))</p>
    <a href="$(Encode-Html($PageConfig.ctaButtonHref))" class="btn-white-custom">$(Encode-Html($PageConfig.ctaButtonText)) <i class="bi bi-arrow-right"></i></a>
  </div>
</section>

<div id="footer-root" data-include="components/footer.html"></div>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="../assets/js/component-loader.js"></script>
<script src="../assets/js/navigation.js"></script>
<script src="../assets/js/animations.js"></script>
<script src="../assets/js/blog.js"></script>
<script src="../assets/js/main.js"></script>
</body>
</html>
"@

  Set-Content -Path $OutputPath -Value $html -Encoding UTF8
}

function Write-BlogPostPage($OutputPath, $PageConfig, $Post, $AllPosts) {
  $sectionHtml = Render-Sections $Post
  $postDate = Get-DisplayDateLabel $Post

  $relatedPosts = @(
    $AllPosts |
      Where-Object { $_.slug -ne $Post.slug } |
      Sort-Object @{ Expression = { if ($_.category -eq $Post.category) { 0 } else { 1 } } }, @{ Expression = { -(@($_.filters | Where-Object { @($Post.filters) -contains $_ }).Count) } }, @{ Expression = { [datetime]$_.date }; Descending = $true } |
      Select-Object -First 3
  )

  $relatedLines = [System.Collections.Generic.List[string]]::new()
  for ($i = 0; $i -lt $relatedPosts.Count; $i++) {
    $delay = ($i % 3) + 1
    $relatedLines.Add((Render-Card $relatedPosts[$i] $delay '../'))
    $relatedLines.Add('')
  }
  if ($relatedLines.Count -gt 0) {
    $null = $relatedLines.RemoveAt($relatedLines.Count - 1)
  }

  $highlightHtml = [System.Collections.Generic.List[string]]::new()
  foreach ($highlight in @($Post.highlights)) {
    $highlightHtml.Add("<span>$(Encode-Html($highlight))</span>")
  }

  $html = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>$(Encode-Html($Post.title)) - MicroHub Insights</title>
  <meta name="description" content="$(Encode-Html($Post.metaDescription))">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../assets/css/main.css">
  <link rel="stylesheet" href="../../assets/css/layout.css">
  <link rel="stylesheet" href="../../assets/css/components.css">
  <link rel="stylesheet" href="../../assets/css/animations.css">
  <link rel="stylesheet" href="../../assets/css/responsive.css">
  <link rel="stylesheet" href="../../assets/css/blog.css">
</head>
<body data-site-root="../../">
<div id="navbar-root" data-include="components/navbar.html"></div>

<section class="page-hero article-hero-shell">
  <div class="container position-relative" style="z-index:1">
    <div class="article-hero-simple fade-in-up-1">
      <a href="../blog.html" class="article-back-link"><i class="bi bi-arrow-left"></i> Back to blog</a>
      <span class="blog-tag">$(Encode-Html($Post.categoryLabel))</span>
      <h1>$(Encode-Html($Post.title))</h1>
      <p>$(Encode-Html($Post.excerpt))</p>
      <div class="article-meta-row article-meta-row--center">
        <span><i class="bi bi-calendar3"></i> $(Encode-Html($postDate))</span>
        <span><i class="bi bi-clock"></i> $(Encode-Html($Post.readTime))</span>
      </div>
      <div class="article-highlight-row article-highlight-row--center">
        $(Join-Lines $highlightHtml)
      </div>
    </div>
  </div>
</section>

<section class="article-body-shell" style="background:var(--white)">
  <div class="container">
    <div class="article-body-grid">
      <div class="article-content">
$sectionHtml
        <div class="article-takeaway reveal">
          <strong>Key takeaway</strong>
          <p>$(Encode-Html($Post.takeaway))</p>
        </div>
      </div>
      <aside class="article-rail reveal reveal-delay-1">
        <div class="article-rail-card">
          <span class="blog-tag">At a glance</span>
          <ul>
            <li><strong>Category</strong><span>$(Encode-Html($Post.categoryLabel))</span></li>
            <li><strong>Published</strong><span>$(Encode-Html($postDate))</span></li>
            <li><strong>Read time</strong><span>$(Encode-Html($Post.readTime))</span></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="related-posts-section">
  <div class="container">
    <div class="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-4 reveal">
      <div>
        <p class="section-subtitle mb-2" style="margin:0">Related Reads</p>
        <h2 class="section-title mb-0" style="margin:0;font-size:clamp(1.4rem,2.3vw,1.95rem)">Keep exploring the same content system.</h2>
      </div>
      <a href="../blog.html" class="btn-outline-custom">Back to Blog <i class="bi bi-arrow-right"></i></a>
    </div>
    <div class="row g-4">
$(Join-Lines $relatedLines)
    </div>
  </div>
</section>

<section class="cta-section">
  <div class="container position-relative" style="z-index:1;text-align:center">
    <h2 style="color:var(--white);margin-bottom:1rem">$(Encode-Html($PageConfig.ctaTitle))</h2>
    <p style="color:rgba(255,255,255,0.8);margin-bottom:2rem">$(Encode-Html($PageConfig.ctaDescription))</p>
    <a href="$(Encode-Html($PageConfig.ctaButtonHref))" class="btn-white-custom">$(Encode-Html($PageConfig.ctaButtonText)) <i class="bi bi-arrow-right"></i></a>
  </div>
</section>

<div id="footer-root" data-include="components/footer.html"></div>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="../../assets/js/component-loader.js"></script>
<script src="../../assets/js/navigation.js"></script>
<script src="../../assets/js/animations.js"></script>
<script src="../../assets/js/main.js"></script>
</body>
</html>
"@

  Set-Content -Path $OutputPath -Value $html -Encoding UTF8
}

function Write-ArticleRedirectPage($OutputPath) {
  $html = @"
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redirecting - MicroHub Insights</title>
  <meta http-equiv="refresh" content="0; url=blog.html">
  <script>
    (function () {
      var params = new URLSearchParams(window.location.search);
      var slug = params.get('slug');
      if (slug) {
        window.location.replace('posts/' + slug + '.html');
        return;
      }
      window.location.replace('blog.html');
    })();
  </script>
</head>
<body></body>
</html>
"@

  Set-Content -Path $OutputPath -Value $html -Encoding UTF8
}

$root = Split-Path -Parent $PSScriptRoot
$dataPath = Join-Path $root 'data\blog-posts.json'
$insightsPath = Join-Path $root 'insights'
$postsPath = Join-Path $insightsPath 'posts'

if (-not (Test-Path $postsPath)) {
  New-Item -Path $postsPath -ItemType Directory | Out-Null
}

$content = Get-Content $dataPath -Raw | ConvertFrom-Json
$pageConfig = Merge-PageConfig $content.page
$posts = @($content.posts | Sort-Object @{ Expression = { [datetime]$_.date }; Descending = $true })

Write-BlogListingPage -OutputPath (Join-Path $insightsPath 'blog.html') -PageConfig $pageConfig -Posts $posts

foreach ($post in $posts) {
  $outputPath = Join-Path $postsPath "$($post.slug).html"
  Write-BlogPostPage -OutputPath $outputPath -PageConfig $pageConfig -Post $post -AllPosts $posts
}

Write-ArticleRedirectPage -OutputPath (Join-Path $insightsPath 'article.html')
