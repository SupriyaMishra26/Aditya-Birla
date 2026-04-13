/**
 * Financial Management Page JavaScript
 * Scroll animations, counter animations, and interactive elements
 * Brand Color: #35516A
 */

(function() {
  'use strict';

  // ========== SCROLL REVEAL ANIMATION ==========
  const revealItems = document.querySelectorAll('.fin-reveal');
  
  if (revealItems.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });
    
    revealItems.forEach((item) => observer.observe(item));
  }

  // ========== STATS COUNTER ANIMATION ==========
  const statCards = document.querySelectorAll('.fin-stat-card');
  
  const animateNumber = (element, start, end, duration, isCurrency = false, isTime = false) => {
    const startTime = performance.now();
    
    const updateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(start + (end - start) * easeProgress);
      
      if (isCurrency) {
        element.textContent = `₹${currentValue.toLocaleString('en-IN')}`;
      } else if (isTime) {
        if (currentValue < 1) {
          element.textContent = `<${currentValue}s`;
        } else {
          element.textContent = `<1s`;
        }
      } else {
        element.textContent = currentValue;
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        if (isCurrency) {
          element.textContent = `₹${end.toLocaleString('en-IN')}`;
        } else if (isTime) {
          element.textContent = `<1s`;
        } else {
          element.textContent = end;
        }
        element.classList.add('animated');
      }
    };
    
    requestAnimationFrame(updateNumber);
  };
  
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const strongElement = card.querySelector('strong');
        
        if (strongElement && !strongElement.classList.contains('animated')) {
          const text = strongElement.textContent;
          
          if (text.includes('₹0')) {
            animateNumber(strongElement, 0, 0, 500, true);
          } else if (text.includes('<1s') || text.includes('<2s')) {
            animateNumber(strongElement, 0, 1, 600, false, true);
          } else if (text.includes('GST') || text.includes('ERP')) {
            strongElement.classList.add('animated');
          } else if (text.match(/\d+/)) {
            const number = parseInt(text.match(/\d+/)[0]);
            if (!isNaN(number)) {
              animateNumber(strongElement, 0, number, 800);
            }
          } else {
            strongElement.classList.add('animated');
          }
        }
        
        statObserver.unobserve(card);
      }
    });
  }, { threshold: 0.5 });
  
  statCards.forEach((card) => statObserver.observe(card));

  // ========== FAQ TOGGLE FUNCTION ==========
  window.toggleSingleFAQ = function(element) {
    const faqItem = element.closest('.premium-faq-item');
    const content = faqItem.querySelector('.premium-faq-content');
    const toggleIcon = element.querySelector('.premium-faq-toggle-box i');
    const isOpen = faqItem.classList.contains('open');
    
    document.querySelectorAll('.premium-faq-item').forEach(item => {
      if (item !== faqItem && item.classList.contains('open')) {
        item.classList.remove('open');
        const otherContent = item.querySelector('.premium-faq-content');
        const otherIcon = item.querySelector('.premium-faq-toggle-box i');
        if (otherContent) otherContent.style.maxHeight = null;
        if (otherIcon) {
          otherIcon.className = 'bi bi-plus-lg';
        }
      }
    });
    
    if (isOpen) {
      faqItem.classList.remove('open');
      content.style.maxHeight = null;
      toggleIcon.className = 'bi bi-plus-lg';
    } else {
      faqItem.classList.add('open');
      content.style.maxHeight = content.scrollHeight + 'px';
      toggleIcon.className = 'bi bi-dash-lg';
    }
  };
  
  document.querySelectorAll('.premium-faq-item').forEach(item => {
    item.classList.remove('open');
    const content = item.querySelector('.premium-faq-content');
    const icon = item.querySelector('.premium-faq-toggle-box i');
    if (content) content.style.maxHeight = null;
    if (icon) icon.className = 'bi bi-plus-lg';
  });

  // ========== PARALLAX EFFECT FOR HERO ==========
  const heroSection = document.querySelector('.page-hero');
  if (heroSection && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      heroSection.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
  }

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========== TOOL CARD INTERACTIONS ==========
  const toolCards = document.querySelectorAll('.fin-tool-card');
  toolCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.fin-feature-icon');
      if (icon) {
        icon.style.transform = 'scale(1.15)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.fin-feature-icon');
      if (icon) {
        icon.style.transform = 'scale(1)';
      }
    });
  });

  console.log('Financial Management page initialized with brand color #35516A');
})();

/**
 * Financial Management Page JavaScript
 * Enhanced with scroll animations, parallax effects, and counter animations
 * Brand Color: #35516A
 */

(function() {
  'use strict';

  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic',
    disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  });

  // ========== PARALLAX EFFECT FOR HERO BACKGROUND ==========
  const heroBg = document.querySelector('.parallax-bg');
  const ctaBg = document.querySelector('.parallax-bg-cta');
  
  if (heroBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
  }
  
  if (ctaBg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const ctaOffset = ctaBg.offsetTop;
      const relativeScroll = Math.max(0, scrolled - ctaOffset + window.innerHeight);
      ctaBg.style.transform = `translateY(${relativeScroll * 0.15}px)`;
    });
  }

  // ========== SCROLL PROGRESS INDICATOR ==========
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // ========== SCROLL REVEAL ANIMATION (Fallback) ==========
  const revealItems = document.querySelectorAll('.fin-reveal');
  
  if (revealItems.length && !window.AOS) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });
    
    revealItems.forEach((item) => observer.observe(item));
  }

  // ========== STATS COUNTER ANIMATION ==========
  const statCards = document.querySelectorAll('.fin-stat-card');
  
  const animateNumber = (element, start, end, duration, isCurrency = false, isTime = false) => {
    const startTime = performance.now();
    
    const updateNumber = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(start + (end - start) * easeProgress);
      
      if (isCurrency) {
        element.textContent = `₹${currentValue.toLocaleString('en-IN')}`;
      } else if (isTime) {
        if (currentValue < 1) {
          element.textContent = `<${currentValue}s`;
        } else {
          element.textContent = `<1s`;
        }
      } else {
        element.textContent = currentValue;
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        if (isCurrency) {
          element.textContent = `₹${end.toLocaleString('en-IN')}`;
        } else if (isTime) {
          element.textContent = `<1s`;
        } else {
          element.textContent = end;
        }
        element.classList.add('animated');
      }
    };
    
    requestAnimationFrame(updateNumber);
  };
  
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const strongElement = card.querySelector('strong');
        
        if (strongElement && !strongElement.classList.contains('animated')) {
          const text = strongElement.textContent;
          
          if (text.includes('₹0')) {
            animateNumber(strongElement, 0, 0, 500, true);
          } else if (text.includes('<1s') || text.includes('<2s')) {
            animateNumber(strongElement, 0, 1, 600, false, true);
          } else if (text.includes('GST') || text.includes('ERP')) {
            strongElement.classList.add('animated');
          } else if (text.match(/\d+/)) {
            const number = parseInt(text.match(/\d+/)[0]);
            if (!isNaN(number)) {
              animateNumber(strongElement, 0, number, 800);
            }
          } else {
            strongElement.classList.add('animated');
          }
        }
        
        statObserver.unobserve(card);
      }
    });
  }, { threshold: 0.5 });
  
  statCards.forEach((card) => statObserver.observe(card));

  // ========== STATS SECTION COUNTERS ==========
  const counterElements = document.querySelectorAll('.counter-num');
  
  const animateCounter = (element, target, suffix = '') => {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + suffix;
      }
    }, 20);
  };
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.dataset.target);
        const suffix = element.dataset.suffix || '';
        if (!isNaN(target) && !element.classList.contains('counted')) {
          element.classList.add('counted');
          animateCounter(element, target, suffix);
        }
        counterObserver.unobserve(element);
      }
    });
  }, { threshold: 0.5 });
  
  counterElements.forEach((el) => counterObserver.observe(el));

  // ========== FAQ TOGGLE FUNCTION ==========
  window.toggleSingleFAQ = function(element) {
    const faqItem = element.closest('.premium-faq-item');
    const content = faqItem.querySelector('.premium-faq-content');
    const toggleIcon = element.querySelector('.premium-faq-toggle-box i');
    const isOpen = faqItem.classList.contains('open');
    
    document.querySelectorAll('.premium-faq-item').forEach(item => {
      if (item !== faqItem && item.classList.contains('open')) {
        item.classList.remove('open');
        const otherContent = item.querySelector('.premium-faq-content');
        const otherIcon = item.querySelector('.premium-faq-toggle-box i');
        if (otherContent) otherContent.style.maxHeight = null;
        if (otherIcon) {
          otherIcon.className = 'bi bi-plus-lg';
        }
      }
    });
    
    if (isOpen) {
      faqItem.classList.remove('open');
      content.style.maxHeight = null;
      toggleIcon.className = 'bi bi-plus-lg';
    } else {
      faqItem.classList.add('open');
      content.style.maxHeight = content.scrollHeight + 'px';
      toggleIcon.className = 'bi bi-dash-lg';
    }
  };
  
  document.querySelectorAll('.premium-faq-item').forEach(item => {
    item.classList.remove('open');
    const content = item.querySelector('.premium-faq-content');
    const icon = item.querySelector('.premium-faq-toggle-box i');
    if (content) content.style.maxHeight = null;
    if (icon) icon.className = 'bi bi-plus-lg';
  });

  // ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ========== HERO SCROLL INDICATOR CLICK ==========
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const nextSection = document.querySelector('#fin-process');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // ========== BACK TO TOP BUTTON ==========
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ========== TOOL CARD INTERACTIONS ==========
  const toolCards = document.querySelectorAll('.fin-tool-card');
  toolCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const icon = card.querySelector('.fin-feature-icon');
      if (icon) {
        icon.style.transform = 'scale(1.15)';
      }
    });
    
    card.addEventListener('mouseleave', () => {
      const icon = card.querySelector('.fin-feature-icon');
      if (icon) {
        icon.style.transform = 'scale(1)';
      }
    });
  });

  // ========== SECTION BACKGROUND CHANGE ON SCROLL ==========
  const sections = document.querySelectorAll('.fin-section');
  if (sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, { threshold: 0.3 });
    
    sections.forEach(section => sectionObserver.observe(section));
  }

  console.log('Financial Management page initialized with enhanced animations');
})();