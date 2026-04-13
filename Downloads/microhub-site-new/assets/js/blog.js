'use strict';

(function () {
  function initBlogListing() {
    if (document.body.dataset.blogPage !== 'listing') return;
    if (document.body.dataset.blogStaticReady === 'true') return;

    const searchInput = document.getElementById('blog-search');
    const resultCount = document.getElementById('blog-result-count');
    const items = Array.from(document.querySelectorAll('.blog-render-item'));
    const buttons = Array.from(document.querySelectorAll('[data-blog-filter]'));

    if (!searchInput || !resultCount || !items.length || !buttons.length) return;

    document.body.dataset.blogStaticReady = 'true';
    let activeFilter = 'all';

    function render() {
      const query = searchInput.value.trim().toLowerCase();
      let visible = 0;

      items.forEach((item) => {
        const categories = item.dataset.category || '';
        const text = item.textContent.toLowerCase();
        const filterMatch = activeFilter === 'all' || categories.includes(activeFilter);
        const searchMatch = !query || text.includes(query);
        const show = filterMatch && searchMatch;

        item.hidden = !show;
        if (show) visible += 1;
      });

      resultCount.textContent = `${visible} article${visible === 1 ? '' : 's'}`;
    }

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        activeFilter = button.dataset.blogFilter || 'all';
        buttons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        render();
      });
    });

    searchInput.addEventListener('input', render);
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogListing, { once: true });
  } else {
    initBlogListing();
  }

  document.addEventListener('microhub:fragments-loaded', initBlogListing);
})();
