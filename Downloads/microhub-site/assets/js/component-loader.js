/* MicroHub - Fragment Loader */
'use strict';

(function (window, document, $) {
  function isRelativePath(value) {
    return Boolean(value)
      && !value.startsWith('#')
      && !value.startsWith('/')
      && !value.startsWith('//')
      && !/^[a-z][a-z0-9+.-]*:/i.test(value);
  }

  function prefixSiteRoot(value, siteRoot) {
    if (!siteRoot || !isRelativePath(value)) return value;

    const normalizedValue = value.replace(/^\.\//, '');
    if (normalizedValue.startsWith(siteRoot)) return normalizedValue;
    return `${siteRoot}${normalizedValue}`;
  }

  function rewriteFragmentPaths($container, siteRoot) {
    ['href', 'src', 'action'].forEach((attribute) => {
      $container.find(`[${attribute}]`).each((_, element) => {
        const value = element.getAttribute(attribute);
        if (!value) return;
        element.setAttribute(attribute, prefixSiteRoot(value, siteRoot));
      });
    });
  }

  function finalizeFragment($container, siteRoot) {
    rewriteFragmentPaths($container, siteRoot);

    if (!document.body.classList.contains('page-home')) {
      $container.find('.navbar-custom').addClass('scrolled');
    }
  }

  function loadFragment(container) {
    const $container = $(container);
    const fragmentPath = String($container.data('include') || '').trim();
    const siteRoot = document.body.dataset.siteRoot || '';
    const deferred = $.Deferred();

    if (!fragmentPath) {
      deferred.resolve();
      return deferred.promise();
    }

    $container.load(prefixSiteRoot(fragmentPath, siteRoot), (responseText, status, xhr) => {
      if (status === 'error') {
        console.error(`Failed to load fragment: ${fragmentPath}`, xhr?.status, xhr?.statusText);
        container.dataset.includeError = 'true';
        deferred.resolve();
        return;
      }

      finalizeFragment($container, siteRoot);
      container.dataset.includeLoaded = 'true';
      deferred.resolve();
    });

    return deferred.promise();
  }

  function dispatchLoadedEvent() {
    document.dispatchEvent(new CustomEvent('microhub:fragments-loaded'));
  }

  function initFragments() {
    if (!$) {
      console.error('jQuery is required for MicroHub fragment loading.');
      dispatchLoadedEvent();
      return;
    }

    const $containers = $('[data-include]');
    if (!$containers.length) {
      dispatchLoadedEvent();
      return;
    }

    const jobs = $containers.map((_, container) => loadFragment(container)).get();
    $.when.apply($, jobs).always(dispatchLoadedEvent);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFragments, { once: true });
  } else {
    initFragments();
  }
})(window, document, window.jQuery);
