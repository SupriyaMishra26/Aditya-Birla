// CRM.js - Enhanced Animations for MicroHub CRM System Page
// All animations are optimized for performance with Intersection Observer

(function() {
    'use strict';

    // ============================================
    // 1. PAGE LOAD ANIMATIONS
    // ============================================
    window.addEventListener('DOMContentLoaded', function() {
        document.body.classList.add('crm-animations-ready');
        
        // Add loading animation class to hero elements
        const heroElements = document.querySelectorAll('.page-hero .fade-in-up-1, .page-hero .fade-in-up-2, .page-hero .fade-in-up-3');
        heroElements.forEach((el, index) => {
            el.style.animation = `fadeInUp 0.8s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards`;
            el.style.animationDelay = `${index * 0.15}s`;
            el.style.opacity = '0';
        });
    });

    // ============================================
    // 2. INTERSECTION OBSERVER FOR SCROLL REVEALS
    // ============================================
    const revealElements = document.querySelectorAll('.reveal, .fin-process-card, .fin-visual-card-equal, .fin-feature-item, .pricing-card-enhanced, .stat-number');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated-visible');
                
                // Add staggered animation to children if applicable
                if (entry.target.classList.contains('fin-feature-list')) {
                    const items = entry.target.querySelectorAll('.fin-feature-item');
                    items.forEach((item, idx) => {
                        item.style.animation = `slideInRight 0.5s ease forwards`;
                        item.style.animationDelay = `${idx * 0.1}s`;
                    });
                }
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ============================================
    // 3. COUNTER ANIMATION FOR STATS
    // ============================================
    const counters = document.querySelectorAll('.counter-num');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const suffix = counter.getAttribute('data-suffix') || '';
                let current = 0;
                const increment = target / 50;
                const duration = 1500;
                const stepTime = duration / 50;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.floor(current) + suffix;
                        setTimeout(updateCounter, stepTime);
                    } else {
                        counter.innerText = target + suffix;
                    }
                };
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ============================================
    // 4. PROGRESS BAR ANIMATION
    // ============================================
    const progressBars = document.querySelectorAll('.progress-bar-animated');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.getAttribute('data-target') || '75';
                const progressSpan = bar.closest('div')?.querySelector('.progress-value');
                
                let width = 0;
                const interval = setInterval(() => {
                    if (width >= targetWidth) {
                        clearInterval(interval);
                    } else {
                        width++;
                        bar.style.width = width + '%';
                        if (progressSpan) progressSpan.innerText = width;
                    }
                }, 20);
                
                progressObserver.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    progressBars.forEach(bar => progressObserver.observe(bar));

    // ============================================
    // 5. HOVER PARALLAX EFFECT FOR CARDS
    // ============================================
    const cards = document.querySelectorAll('.feature-card-enhanced, .pricing-card-enhanced, .fin-process-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });

    // ============================================
    // 6. FLOATING ANIMATION FOR ICONS
    // ============================================
    const icons = document.querySelectorAll('.card-icon, .fin-feature-icon, .pricing-card-enhanced i');
    
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'iconFloat 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });

    // ============================================
    // 7. SMOOTH SCROLL WITH OFFSET
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 8. BACK TO TOP BUTTON ANIMATION
    // ============================================
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.classList.remove('visible');
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================================
    // 9. TYPEWRITER EFFECT FOR HERO (Optional)
    // ============================================
    const heroText = document.querySelector('.page-hero h1 .gradient-text');
    if (heroText && heroText.getAttribute('data-typewriter') !== 'false') {
        const originalText = heroText.innerText;
        heroText.innerText = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < originalText.length) {
                heroText.innerText += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        };
        
        // Start typewriter when hero is visible
        const heroObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeWriter();
                heroObserver.disconnect();
            }
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroText);
    }

    // ============================================
    // 10. PARTICLE ANIMATION FOR CTA SECTION
    // ============================================
    const ctaSection = document.querySelector('.cta-section-enhanced');
    if (ctaSection && !ctaSection.querySelector('.custom-particles')) {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'custom-particles';
        particleContainer.style.position = 'absolute';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.overflow = 'hidden';
        particleContainer.style.zIndex = '1';
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'custom-particle';
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 6 + 2 + 'px';
            particle.style.height = particle.style.width;
            particle.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            particle.style.borderRadius = '50%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animation = `floatParticle ${Math.random() * 10 + 8}s linear infinite`;
            particle.style.animationDelay = Math.random() * 5 + 's';
            particleContainer.appendChild(particle);
        }
        
        ctaSection.style.position = 'relative';
        ctaSection.insertBefore(particleContainer, ctaSection.firstChild);
    }

    // ============================================
    // 11. SCROLL PROGRESS INDICATOR
    // ============================================
    const progressIndicator = document.createElement('div');
    progressIndicator.className = 'scroll-progress-indicator';
    progressIndicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #0d9488, #14b8a6, #0d9488);
        z-index: 10000;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px rgba(13, 148, 136, 0.5);
    `;
    document.body.appendChild(progressIndicator);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressIndicator.style.width = scrolled + '%';
    });

    // ============================================
    // 12. STAGGERED CARD ANIMATIONS ON SCROLL
    // ============================================
    const cardRows = document.querySelectorAll('.row.g-4');
    cardRows.forEach(row => {
        const cards = row.querySelectorAll('.col-lg-4, .col-md-6');
        cards.forEach((card, idx) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            const cardObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, idx * 80);
                    cardObserver.disconnect();
                }
            }, { threshold: 0.1 });
            
            cardObserver.observe(card);
        });
    });

    // ============================================
    // 13. PRICING CARD GLOW EFFECT
    // ============================================
    const pricingCards = document.querySelectorAll('.pricing-card-enhanced');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2), 0 0 0 2px rgba(13, 148, 136, 0.3)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    // ============================================
    // 14. BUTTON RIPPLE EFFECT
    // ============================================
    const buttons = document.querySelectorAll('.btn-primary-custom, .btn-outline-custom, .cta-btn-primary, .cta-btn-secondary');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ============================================
    // 15. ADD CSS ANIMATIONS DYNAMICALLY
    // ============================================
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes floatParticle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            20% {
                opacity: 0.6;
            }
            80% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100vh) translateX(50px);
                opacity: 0;
            }
        }
        
        @keyframes iconFloat {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(5deg); }
            100% { transform: translateY(0) rotate(0deg); }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes pulseGlow {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(13, 148, 136, 0.4);
            }
            50% {
                box-shadow: 0 0 0 15px rgba(13, 148, 136, 0);
            }
        }
        
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        
        .reveal.animated-visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .stat-number {
            transition: all 0.3s ease;
        }
        
        .stat-number:hover {
            transform: scale(1.05);
            text-shadow: 0 0 20px rgba(13, 148, 136, 0.5);
        }
        
        .crm-animations-ready .page-hero .fade-in-up-1,
        .crm-animations-ready .page-hero .fade-in-up-2,
        .crm-animations-ready .page-hero .fade-in-up-3 {
            opacity: 1;
        }
        
        .feature-card-enhanced, .pricing-card-enhanced, .fin-process-card {
            transition: transform 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1), box-shadow 0.4s ease;
        }
        
        .feature-card-enhanced:hover, .pricing-card-enhanced:hover, .fin-process-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        /* Smooth page fade-in */
        body.page-crm {
            animation: pageFadeIn 0.6s ease-out;
        }
        
        @keyframes pageFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        /* Back to top button animation */
        #back-to-top {
            transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
            transform: scale(0.9);
        }
        
        #back-to-top.visible {
            transform: scale(1);
        }
        
        #back-to-top:hover {
            transform: scale(1.1) translateY(-3px);
        }
        
        /* Dashboard preview card animation */
        .dashboard-preview {
            animation: cardGlow 3s ease-in-out infinite;
        }
        
        @keyframes cardGlow {
            0%, 100% {
                box-shadow: 0 0 20px rgba(13, 148, 136, 0.1);
            }
            50% {
                box-shadow: 0 0 40px rgba(13, 148, 136, 0.2);
            }
        }
        
        /* Responsive animation adjustments */
        @media (prefers-reduced-motion: reduce) {
            .reveal,
            .feature-card-enhanced,
            .pricing-card-enhanced,
            .fin-process-card,
            .stat-number,
            #back-to-top {
                transition: none !important;
                animation: none !important;
                transform: none !important;
            }
            
            .reveal {
                opacity: 1;
                transform: none;
            }
        }
    `;
    document.head.appendChild(styleSheet);

})();

// CRM.js - Parallax Animations for CRM System Page Sections
// Applies parallax effects to: Quick Screen Tour, Leads & Accounts, Deals & Forecasts, Quotes & Orders, Campaigns & Modules

(function() {
    'use strict';

    // ============================================
    // 1. PARALLAX SCROLL EFFECTS
    // ============================================
    
    // Sections to apply parallax to (excluding hero, stats, pricing, CTA)
    const parallaxSections = [
        document.getElementById('fin-process'),
        document.getElementById('fin-accounting'),
        document.getElementById('fin-validation'),
        document.getElementById('fin-reconciliation'),
        document.getElementById('fin-sync')
    ].filter(section => section !== null);

    // Parallax on scroll - moves background and elements at different speeds
    function updateParallax() {
        const scrollY = window.scrollY;
        
        parallaxSections.forEach((section, index) => {
            if (!section) return;
            
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + scrollY;
            const sectionBottom = sectionTop + rect.height;
            const viewportCenter = scrollY + window.innerHeight / 2;
            
            // Calculate progress through section (0 to 1)
            let progress = (viewportCenter - sectionTop) / rect.height;
            progress = Math.min(Math.max(progress, 0), 1);
            
            // Apply parallax to different elements within section
            const cards = section.querySelectorAll('.fin-process-card, .fin-visual-card-equal, .fin-content-equal');
            const images = section.querySelectorAll('.fin-media-image, .fin-compliance-animation svg, .fin-reconcile-animation svg, .fin-report-animation svg');
            const chips = section.querySelectorAll('.fin-chip, .fin-chip-row');
            
            // Cards - subtle vertical movement based on scroll
            cards.forEach((card, cardIndex) => {
                const cardOffset = (progress - 0.5) * 30 * (cardIndex % 2 === 0 ? 1 : -0.5);
                card.style.transform = `translateY(${cardOffset * 0.3}px)`;
            });
            
            // Images/SVGs - parallax depth effect
            images.forEach((img, imgIndex) => {
                const imgOffset = (progress - 0.5) * 40 * (imgIndex % 2 === 0 ? 0.8 : -0.6);
                img.style.transform = `translateY(${imgOffset * 0.2}px) scale(1.02)`;
            });
            
            // Chips - horizontal parallax
            chips.forEach((chipGroup, groupIndex) => {
                const chipOffset = (progress - 0.5) * 25;
                chipGroup.style.transform = `translateX(${chipOffset * 0.15}px)`;
            });
        });
    }

    // Throttled scroll event for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateParallax();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial call
    updateParallax();

    // ============================================
    // 2. MOUSE MOVE PARALLAX FOR CARDS (3D tilt effect)
    // ============================================
    
    const cards3d = document.querySelectorAll('.fin-process-card, .fin-visual-card-equal');
    
    cards3d.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (max 5 degrees)
            const rotateY = ((x - centerX) / centerX) * 5;
            const rotateX = ((centerY - y) / centerY) * 5;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            
            // Add shine effect
            const shine = this.querySelector('.parallax-shine') || (() => {
                const s = document.createElement('div');
                s.className = 'parallax-shine';
                s.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: inherit;
                    pointer-events: none;
                    background: radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 70%);
                    opacity: 0;
                    transition: opacity 0.2s;
                `;
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(s);
                return s;
            })();
            
            if (shine) {
                shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2), transparent 70%)`;
                shine.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            const shine = this.querySelector('.parallax-shine');
            if (shine) shine.style.opacity = '0';
        });
    });

    // ============================================
    // 3. SCROLL-TRIGGERED FADE AND SLIDE ANIMATIONS
    // ============================================
    
    const animateOnScrollElements = document.querySelectorAll(
        '.fin-process-card, .fin-visual-card-equal, .fin-content-equal, .fin-feature-item, .fin-chip-row'
    );
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.getAttribute('data-scroll-delay') || 
                             (el.classList.contains('fin-feature-item') ? 
                              (Array.from(el.parentNode?.children || []).indexOf(el) * 100) : 0);
                
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = `opacity 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)`;
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, delay);
                
                scrollObserver.unobserve(el);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    
    animateOnScrollElements.forEach(el => scrollObserver.observe(el));

    // ============================================
    // 4. BACKGROUND PARALLAX FOR SECTIONS
    // ============================================
    
    parallaxSections.forEach(section => {
        // Add a pseudo-element for background parallax if not present
        if (!section.querySelector('.section-parallax-bg')) {
            const bgLayer = document.createElement('div');
            bgLayer.className = 'section-parallax-bg';
            bgLayer.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 120%;
                background: radial-gradient(ellipse at 30% 40%, rgba(53, 81, 106, 0.08), transparent);
                pointer-events: none;
                z-index: 0;
                transition: transform 0.3s ease-out;
            `;
            section.style.position = 'relative';
            section.style.overflow = 'hidden';
            section.insertBefore(bgLayer, section.firstChild);
        }
    });
    
    function updateBackgroundParallax() {
        parallaxSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const windowCenter = window.innerHeight / 2;
            const offset = (sectionCenter - windowCenter) / 50;
            
            const bgLayer = section.querySelector('.section-parallax-bg');
            if (bgLayer) {
                bgLayer.style.transform = `translateY(${offset * 0.5}px)`;
            }
        });
    }
    
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateBackgroundParallax);
    });
    updateBackgroundParallax();

    // ============================================
    // 5. STAGGERED REVEAL FOR FEATURE ITEMS
    // ============================================
    
    const featureLists = document.querySelectorAll('.fin-feature-list');
    featureLists.forEach(list => {
        const items = list.querySelectorAll('.fin-feature-item');
        items.forEach((item, idx) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = `opacity 0.5s ease ${idx * 0.1}s, transform 0.5s ease ${idx * 0.1}s`;
            
            const itemObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                    itemObserver.disconnect();
                }
            }, { threshold: 0.3 });
            
            itemObserver.observe(item);
        });
    });

    // ============================================
    // 6. CHIP ROW SCROLL ANIMATION
    // ============================================
    
    const chipRows = document.querySelectorAll('.fin-chip-row');
    chipRows.forEach(row => {
        const chips = row.querySelectorAll('.fin-chip');
        chips.forEach((chip, idx) => {
            chip.style.opacity = '0';
            chip.style.transform = 'scale(0.8)';
            chip.style.transition = `opacity 0.4s ease ${idx * 0.05}s, transform 0.4s ease ${idx * 0.05}s`;
            
            const chipObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    chip.style.opacity = '1';
                    chip.style.transform = 'scale(1)';
                    chipObserver.disconnect();
                }
            }, { threshold: 0.5 });
            
            chipObserver.observe(chip);
        });
    });

    // ============================================
    // 7. SVG ANIMATION ENHANCEMENTS (Parallax depth)
    // ============================================
    
    const svgContainers = document.querySelectorAll('.fin-compliance-animation, .fin-reconcile-animation, .fin-report-animation');
    svgContainers.forEach(container => {
        const svg = container.querySelector('svg');
        if (svg) {
            // Add floating animation to SVG elements
            const circles = svg.querySelectorAll('circle');
            const rects = svg.querySelectorAll('rect');
            
            circles.forEach((circle, idx) => {
                circle.style.animation = `floatCircle ${2 + idx * 0.5}s ease-in-out infinite`;
                circle.style.animationDelay = `${idx * 0.3}s`;
            });
            
            rects.forEach((rect, idx) => {
                if (rect.hasAttribute('width') && rect.getAttribute('width') !== '100%') {
                    rect.style.animation = `pulseRect ${3 + idx * 0.3}s ease-in-out infinite`;
                }
            });
        }
    });

    // ============================================
    // 8. ADD CSS ANIMATIONS DYNAMICALLY
    // ============================================
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes floatCircle {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-3px);
            }
        }
        
        @keyframes pulseRect {
            0%, 100% {
                opacity: 0.6;
            }
            50% {
                opacity: 1;
            }
        }
        
        /* Parallax card hover effects */
        .fin-process-card, .fin-visual-card-equal {
            transition: box-shadow 0.3s ease, border-color 0.3s ease;
            will-change: transform;
        }
        
        .fin-process-card:hover, .fin-visual-card-equal:hover {
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            border-color: rgba(53, 81, 106, 0.6);
        }
        
        /* Smooth section transitions */
        .fin-section {
            transition: background 0.3s ease;
        }
        
        /* Image hover zoom with parallax */
        .fin-media-image {
            transition: transform 0.5s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        
        .fin-media-image:hover {
            transform: scale(1.05);
        }
        
        /* Chip hover effects */
        .fin-chip {
            transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        
        .fin-chip:hover {
            transform: translateY(-2px) translateX(3px);
            background: rgba(53, 81, 106, 0.3);
            border-color: #4a6d8a;
        }
        
        /* Feature item hover with slide */
        .fin-feature-item {
            transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        
        .fin-feature-item:hover {
            transform: translateX(8px);
            background: rgba(53, 81, 106, 0.12);
        }
        
        /* Responsive adjustments for reduced motion */
        @media (prefers-reduced-motion: reduce) {
            .fin-process-card, .fin-visual-card-equal,
            .fin-media-image, .fin-chip, .fin-feature-item {
                transition: none !important;
                animation: none !important;
                transform: none !important;
            }
            
            .section-parallax-bg {
                display: none;
            }
        }
        
        /* Scroll reveal base styles */
        .fin-process-card, .fin-visual-card-equal, 
        .fin-content-equal, .fin-feature-item, .fin-chip-row {
            opacity: 1;
            transition: none;
        }
    `;
    document.head.appendChild(styleSheet);

    // ============================================
    // 9. RESET PARALLAX ON WINDOW RESIZE
    // ============================================
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            updateParallax();
            updateBackgroundParallax();
        }, 150);
    });

    // ============================================
    // 10. INITIALIZE ALL PARALLAX EFFECTS
    // ============================================
    
    // Force a scroll update on load
    setTimeout(() => {
        updateParallax();
        updateBackgroundParallax();
    }, 100);

})();