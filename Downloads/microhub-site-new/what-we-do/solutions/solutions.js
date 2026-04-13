/* what-we-do/solutions/solutions.js */
/* CRM Page Specific JavaScript */

(function() {
  'use strict';

  // ============================================
  // CRM PAGE SPECIFIC FUNCTIONS
  // ============================================

  /**
   * Animate progress bars in hero section when they come into view
   * This triggers the progress bars to fill with animation
   */
  function initProgressBars() {
    const heroSection = document.querySelector('.page-crm .page-hero');
    const progressBars = document.querySelectorAll('.progress-bar-animated');
    let progressAnimated = false;

    if (!progressBars.length) return;

    const animateProgress = () => {
      progressBars.forEach(bar => {
        const target = parseInt(bar.getAttribute('data-target'));
        // Find the parent div to locate the value span
        const parentDiv = bar.closest('div');
        const valueSpan = parentDiv?.nextElementSibling?.querySelector('.progress-value');

        // Animate the progress bar width
        bar.style.width = target + '%';

        // Animate the percentage numbers
        if (valueSpan) {
          let current = 0;
          const interval = setInterval(() => {
            if (current < target) {
              current += Math.ceil(target / 30);
              if (current > target) current = target;
              valueSpan.textContent = current;
              if (current >= target) clearInterval(interval);
            } else {
              clearInterval(interval);
            }
          }, 25);
        }
      });
    };

    const progressObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !progressAnimated) {
        progressAnimated = true;
        animateProgress();
      }
    }, { threshold: 0.3 });

    if (heroSection) progressObserver.observe(heroSection);
  }

  /**
   * Animate pipeline value and deals count with count-up effect
   */
  function initPipelineValues() {
    const pipelineValue = document.querySelector('.page-crm .pipeline-value');
    const dealsCount = document.querySelector('.page-crm .deals-count');

    if (pipelineValue) {
      const valueObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          pipelineValue.style.animation = 'countUp 0.6s ease forwards';
          if (dealsCount) dealsCount.style.animation = 'countUp 0.6s ease 0.2s forwards';
          valueObserver.disconnect();
        }
      }, { threshold: 0.5 });
      valueObserver.observe(pipelineValue);
    }
  }

  /**
   * Add hover effects to feature cards (icon pulse animation)
   */
  function initFeatureCardHover() {
    const featureCards = document.querySelectorAll('.page-crm .feature-card-enhanced');
    
    featureCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.card-icon');
        if (icon) icon.classList.add('card-icon-pulse');
      });
      
      card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.card-icon');
        if (icon) icon.classList.remove('card-icon-pulse');
      });
    });
  }

  /**
   * Add floating effect to dashboard preview card on hover
   */
  function initDashboardPreview() {
    const dashboard = document.querySelector('.page-crm .dashboard-preview');
    
    if (dashboard) {
      let hoverTimeout;
      
      dashboard.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        dashboard.style.transform = 'translateY(-8px)';
      });
      
      dashboard.addEventListener('mouseleave', () => {
        hoverTimeout = setTimeout(() => {
          dashboard.style.transform = 'translateY(0)';
        }, 100);
      });
    }
  }

  /**
   * Animate stat counters with count-up and bounce effect
   */
  function initStatCounters() {
    const statNumbers = document.querySelectorAll('.page-crm .stat-number .counter-num');
    
    if (!statNumbers.length) return;

    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target'));
          const suffix = el.getAttribute('data-suffix') || '';
          let current = 0;
          const increment = target / 40;
          
          const updateCounter = () => {
            current += increment;
            
            if (current >= target) {
              // Display final value with suffix
              if (suffix === '/5') {
                el.textContent = target.toFixed(1) + suffix;
              } else {
                el.textContent = target + suffix;
              }
              // Add bounce effect
              el.style.transform = 'scale(1.05)';
              setTimeout(() => { 
                el.style.transform = ''; 
              }, 200);
              return;
            }
            
            // Update counter with proper formatting
            if (suffix === '%') {
              el.textContent = Math.floor(current) + suffix;
            } else if (suffix === '+') {
              el.textContent = Math.floor(current) + suffix;
            } else if (suffix === '/5') {
              el.textContent = current.toFixed(1) + suffix;
            } else {
              el.textContent = Math.floor(current).toLocaleString() + suffix;
            }
            
            requestAnimationFrame(updateCounter);
          };
          
          updateCounter();
          statObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(num => statObserver.observe(num));
  }

  /**
   * Add smooth hover lift to all buttons on the page
   */
  function initButtons() {
    const buttons = document.querySelectorAll('.page-crm .btn-primary-custom, .page-crm .btn-outline-custom, .page-crm .btn-white-custom');
    
    buttons.forEach(btn => {
      // Add hover-lift class if not already present
      if (!btn.classList.contains('hover-lift')) {
        btn.classList.add('hover-lift');
      }
    });
  }

  /**
   * Initialize all CRM page animations
   */
  function initCRM() {
    initProgressBars();
    initPipelineValues();
    initFeatureCardHover();
    initDashboardPreview();
    initStatCounters();
    initButtons();
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCRM);
  } else {
    initCRM();
  }

  // Re-initialize after fragment loading (for navbar/footer)
  document.addEventListener('microhub:fragments-loaded', initCRM);

})();



// ============================================
  // Ticketing PAGE SPECIFIC FUNCTIONS
  // ============================================

  /* what-we-do/solutions/ticketing.js */
/* Ticketing System Page - Animated Background */

(function() {
  'use strict';
  
  function initTicketingBackground() {
    const canvas = document.getElementById('ticket-canvas');
    if (!canvas || canvas.dataset.ticketBgReady === 'true') return;
    
    canvas.dataset.ticketBgReady = 'true';
    
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId = null;
    
    // Array to store animated ticket particles
    let tickets = [];
    let messageRings = [];
    let floatingDots = [];
    
    // Colors based on your theme
    const colors = {
      primary: '#0D9488',
      primaryLight: '#14B8A6',
      accent: '#22D3EE',
      white: 'rgba(255,255,255,0.6)',
      glow: 'rgba(13,148,136,0.3)'
    };
    
    // Ticket class
    class Ticket {
      constructor(x, y, speed, size, opacity) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = size;
        this.opacity = opacity;
        this.angle = Math.random() * Math.PI * 2;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.02 + Math.random() * 0.03;
      }
      
      update() {
        this.y += this.speed;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.3;
        
        // Reset when off screen
        if (this.y > height + this.size) {
          this.y = -this.size;
          this.x = Math.random() * width;
          this.speed = 0.5 + Math.random() * 1.5;
        }
      }
      
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        // Draw ticket shape
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.size * 1.5, 0);
        ctx.lineTo(this.size * 1.5, this.size);
        ctx.lineTo(0, this.size);
        ctx.closePath();
        
        // Fill with gradient
        const gradient = ctx.createLinearGradient(0, 0, this.size * 1.5, this.size);
        gradient.addColorStop(0, colors.primaryLight);
        gradient.addColorStop(1, colors.primary);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw ticket perforation line
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255,255,255,0.8)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 4; i++) {
          ctx.beginPath();
          ctx.arc(this.size * 0.3 + i * 0.3 * this.size, this.size * 0.5, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,0.9)';
          ctx.fill();
        }
        
        // Draw ticket icon
        ctx.font = `${this.size * 0.6}px "Inter"`;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🎫', this.size * 0.75, this.size * 0.5);
        
        ctx.restore();
      }
    }
    
    // Message Ring class
    class MessageRing {
      constructor(x, y, radius, opacity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.maxRadius = radius + 80;
        this.opacity = opacity;
        this.growing = true;
      }
      
      update() {
        if (this.growing) {
          this.radius += 1.5;
          if (this.radius >= this.maxRadius) {
            this.growing = false;
          }
        } else {
          this.radius -= 1.5;
          if (this.radius <= 5) {
            return false;
          }
        }
        return true;
      }
      
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity * (1 - (this.radius - 5) / (this.maxRadius - 5));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = colors.primaryLight;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Draw inner ring
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();
      }
    }
    
    // Floating Dot class
    class FloatingDot {
      constructor(x, y, size, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.originalY = y;
        this.phase = Math.random() * Math.PI * 2;
      }
      
      update() {
        this.phase += 0.02;
        this.y = this.originalY + Math.sin(this.phase) * 3;
        this.x += this.speed;
        
        if (this.x > width + this.size) {
          this.x = -this.size;
        }
      }
      
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = colors.primaryLight;
        ctx.fill();
        ctx.restore();
      }
    }
    
    // Initialize particles
    function initParticles() {
      // Create tickets
      for (let i = 0; i < 25; i++) {
        tickets.push(new Ticket(
          Math.random() * width,
          Math.random() * height,
          0.3 + Math.random() * 1.2,
          18 + Math.random() * 12,
          0.2 + Math.random() * 0.3
        ));
      }
      
      // Create floating dots
      for (let i = 0; i < 60; i++) {
        floatingDots.push(new FloatingDot(
          Math.random() * width,
          Math.random() * height,
          2 + Math.random() * 4,
          0.1 + Math.random() * 0.3
        ));
      }
    }
    
    // Create message ripple at random positions
    function createMessageRipple() {
      if (Math.random() < 0.02) {
        messageRings.push(new MessageRing(
          Math.random() * width,
          Math.random() * height,
          5,
          0.3 + Math.random() * 0.3
        ));
      }
    }
    
    // Draw connection lines between tickets
    function drawConnections() {
      for (let i = 0; i < tickets.length; i++) {
        for (let j = i + 1; j < tickets.length; j++) {
          const dx = tickets[i].x - tickets[j].x;
          const dy = tickets[i].y - tickets[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.save();
            ctx.globalAlpha = 0.1 * (1 - distance / 150);
            ctx.beginPath();
            ctx.moveTo(tickets[i].x + tickets[i].size * 0.75, tickets[i].y + tickets[i].size * 0.5);
            ctx.lineTo(tickets[j].x + tickets[j].size * 0.75, tickets[j].y + tickets[j].size * 0.5);
            ctx.strokeStyle = colors.primaryLight;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    }
    
    // Draw data visualization particles
    function drawDataParticles() {
      for (let i = 0; i < 30; i++) {
        const time = Date.now() * 0.002;
        const x = (Math.sin(time + i) * 0.5 + 0.5) * width;
        const y = (Math.cos(time * 0.8 + i) * 0.5 + 0.5) * height;
        
        ctx.save();
        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = colors.accent;
        ctx.fill();
        ctx.restore();
      }
    }
    
    // Draw floating message icons
    function drawMessageIcons() {
      const time = Date.now() * 0.003;
      for (let i = 0; i < 15; i++) {
        const x = (Math.sin(time * 0.5 + i) * 0.4 + 0.5) * width;
        const y = (Math.cos(time * 0.7 + i * 2) * 0.3 + 0.5) * height;
        
        ctx.save();
        ctx.globalAlpha = 0.2;
        ctx.font = `${16 + Math.sin(time + i) * 4}px "Inter"`;
        ctx.fillStyle = colors.primaryLight;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('💬', x, y);
        ctx.fillText('📧', x + 30, y + 20);
        ctx.fillText('🔔', x - 25, y + 15);
        ctx.restore();
      }
    }
    
    // Animation loop
    function animate() {
      if (!canvas.isConnected) return;
      
      ctx.clearRect(0, 0, width, height);
      
      // Draw floating background grid
      ctx.save();
      ctx.globalAlpha = 0.05;
      ctx.strokeStyle = colors.primaryLight;
      ctx.lineWidth = 0.5;
      const step = 50;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();
      
      // Update and draw floating dots
      floatingDots.forEach(dot => {
        dot.update();
        dot.draw(ctx);
      });
      
      // Update and draw tickets
      tickets.forEach(ticket => {
        ticket.update();
        ticket.draw(ctx);
      });
      
      // Draw connections between tickets
      drawConnections();
      
      // Update and draw message rings
      for (let i = messageRings.length - 1; i >= 0; i--) {
        const alive = messageRings[i].update();
        if (alive) {
          messageRings[i].draw(ctx);
        } else {
          messageRings.splice(i, 1);
        }
      }
      
      // Create new message ripples
      createMessageRipple();
      
      // Draw data visualization particles
      drawDataParticles();
      
      // Draw floating message icons
      drawMessageIcons();
      
      animationId = requestAnimationFrame(animate);
    }
    
    // Handle resize
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Reinitialize particles on resize
      tickets = [];
      floatingDots = [];
      initParticles();
    }
    
    // Initialize
    function init() {
      handleResize();
      initParticles();
      animate();
      
      window.addEventListener('resize', handleResize);
    }
    
    init();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTicketingBackground);
  } else {
    initTicketingBackground();
  }
})();

/* ============================================
   PREMIUM STATS SECTION ANIMATION
   ============================================ */

function initPremiumStats() {
  const statNumbers = document.querySelectorAll('.stat-number-premium .counter-num');
  if (!statNumbers.length) return;

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
          current += increment;
          if (current >= target) {
            if (suffix === '/5') {
              el.textContent = target.toFixed(1) + suffix;
            } else if (suffix === 'hr') {
              el.textContent = Math.floor(current) + suffix;
            } else {
              el.textContent = target + suffix;
            }
            el.style.transform = 'scale(1.05)';
            setTimeout(() => { el.style.transform = ''; }, 200);
            return;
          }
          
          if (suffix === '%') {
            el.textContent = Math.floor(current) + suffix;
          } else if (suffix === '+') {
            el.textContent = Math.floor(current) + suffix;
          } else if (suffix === '/5') {
            el.textContent = current.toFixed(1) + suffix;
          } else if (suffix === 'hr') {
            el.textContent = Math.floor(current) + suffix;
          } else {
            el.textContent = Math.floor(current).toLocaleString() + suffix;
          }
          requestAnimationFrame(updateCounter);
        };
        updateCounter();
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(num => statObserver.observe(num));
}

/* ============================================
   PREMIUM CTA SECTION ANIMATION
   ============================================ */

function initPremiumCTA() {
  const ctaSection = document.querySelector('.premium-cta-section');
  if (!ctaSection) return;
  
  // Add floating animation to orbs
  const orbs = ctaSection.querySelectorAll('.cta-glow-orb, .cta-glow-orb-2');
  orbs.forEach(orb => {
    orb.style.animation = 'floatOrb 8s ease-in-out infinite';
  });
  
  // Animate buttons on hover
  const buttons = ctaSection.querySelectorAll('.btn-cta-primary, .btn-cta-secondary');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transform = 'translateY(-2px)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translateY(0)';
    });
  });
}

/* ============================================
   UPDATE INITIALIZATION
   ============================================ */

// Update the main initialization to include new functions
function initAllPages() {
  // Existing functions
  initProgressBars();
  initPipelineValues();
  initFeatureCardHover();
  initDashboardPreview();
  initStatCounters();
  initButtons();
  
  // New premium functions
  initPremiumStats();
  initPremiumCTA();
  initTicketingBackground(); // If ticketing canvas exists
}

// Replace the existing initCRM with initAllPages
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllPages);
} else {
  initAllPages();
}

document.addEventListener('microhub:fragments-loaded', initAllPages);

/* ============================================
   ANIMATIONS FOR CAPABILITIES SECTION
   ============================================ */

function initCapabilitiesAnimations() {
  const section = document.querySelector('.capabilities-equal');
  if (!section) return;
  
  // Scroll reveal animation
  const revealElements = section.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  
  revealElements.forEach(el => revealObserver.observe(el));
  
  // Add ripple effect to cards
  const cards = section.querySelectorAll('.card-custom');
  
  cards.forEach(card => {
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.classList.add('card-ripple');
      
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.style.position = 'relative';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add hover animation to feature items
  const featureItems = section.querySelectorAll('.feature-item');
  
  featureItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.feature-icon');
      if (icon) {
        icon.style.transition = 'all 0.3s ease';
      }
    });
  });
  
  // Add initial pulse to first card
  setTimeout(() => {
    const firstCard = section.querySelector('.card-custom');
    if (firstCard) {
      firstCard.style.animation = 'none';
      firstCard.offsetHeight; // Trigger reflow
      firstCard.style.animation = 'cardFloatUp 0.6s ease forwards';
    }
  }, 100);
  // Add hover sound-like feedback (micro interaction feel)
featureItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateX(4px)';
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateX(0)';
  });
});
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCapabilitiesAnimations);
} else {
  initCapabilitiesAnimations();
}

// Re-initialize after fragment loading
document.addEventListener('microhub:fragments-loaded', initCapabilitiesAnimations);


/* ============================================
   PREMIUM CTA SECTION ANIMATIONS
   ============================================ */

function initPremiumCTA() {
  const ctaSection = document.querySelector('.cta-section.premium-cta');
  if (!ctaSection) return;
  
  // Create floating particles
  function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'cta-particles';
    ctaSection.appendChild(particlesContainer);
    
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      const size = Math.random() * 6 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 8 + 6}s`;
      particle.style.animationDelay = `${Math.random() * 10}s`;
      particlesContainer.appendChild(particle);
    }
  }
  
  createParticles();
  
  // Animate stats if present
  const statNumbers = ctaSection.querySelectorAll('.stat-number');
  if (statNumbers.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target'));
          let current = 0;
          const increment = target / 50;
          
          const updateCounter = () => {
            current += increment;
            if (current >= target) {
              if (target === 99.9) {
                el.textContent = target + '%';
              } else if (target === 4.9) {
                el.textContent = target.toFixed(1);
              } else {
                el.textContent = Math.floor(target);
              }
              return;
            }
            
            if (target === 99.9) {
              el.textContent = current.toFixed(1) + '%';
            } else if (target === 4.9) {
              el.textContent = current.toFixed(1);
            } else {
              el.textContent = Math.floor(current);
            }
            requestAnimationFrame(updateCounter);
          };
          
          updateCounter();
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(num => observer.observe(num));
  }
  
  // Add hover effect to solution tags
  const solutionTags = ctaSection.querySelectorAll('.solution-tag');
  solutionTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.transform = 'translateY(-3px)';
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.transform = 'translateY(0)';
    });
  });
  
  // Add ripple effect to buttons
  const buttons = ctaSection.querySelectorAll('.btn-cta-primary, .btn-cta-secondary');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
      ripple.style.width = '0';
      ripple.style.height = '0';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.transition = 'all 0.5s ease-out';
      ripple.style.pointerEvents = 'none';
      
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.style.width = '300px';
        ripple.style.height = '300px';
        ripple.style.opacity = '0';
      }, 10);
      
      setTimeout(() => {
        ripple.remove();
      }, 500);
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPremiumCTA);
} else {
  initPremiumCTA();
}

// Re-initialize after fragment loading
document.addEventListener('microhub:fragments-loaded', initPremiumCTA);

/* ============================================
   PREMIUM BOX FAQ - Enhanced Toggle
   ============================================ */

function toggleBoxFAQ(header) {
  const faqItem = header.closest('.premium-faq-item');
  
  // Close other FAQs in the same card (optional - for cleaner look)
  const parentCard = faqItem.closest('.premium-faq-card');
  const allItems = parentCard.querySelectorAll('.premium-faq-item');
  
  allItems.forEach(item => {
    if (item !== faqItem && item.classList.contains('active')) {
      item.classList.remove('active');
    }
  });
  
  // Toggle current FAQ
  faqItem.classList.toggle('active');
}

function initBoxFAQ() {
  // Add entrance animations
  const faqCards = document.querySelectorAll('.premium-faq-card');
  
  faqCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 150);
  });
  
  // Add hover ripple effect
  const toggleButtons = document.querySelectorAll('.premium-faq-toggle-box');
  
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.width = '100%';
      ripple.style.height = '100%';
      ripple.style.background = 'radial-gradient(circle, rgba(13,148,136,0.3) 0%, transparent 70%)';
      ripple.style.borderRadius = '10px';
      ripple.style.transform = 'scale(0)';
      ripple.style.transition = 'transform 0.5s ease-out';
      ripple.style.pointerEvents = 'none';
      
      this.style.position = 'relative';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.style.transform = 'scale(3)';
        ripple.style.opacity = '0';
      }, 10);
      
      setTimeout(() => {
        ripple.remove();
      }, 500);
    });
  });
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBoxFAQ);
} else {
  initBoxFAQ();
}

document.addEventListener('microhub:fragments-loaded', initBoxFAQ);

/* ============================================
   UNIQUE PREMIUM CAPABILITIES - DYNAMIC EFFECTS
   ============================================ */

function initUniqueCapabilities() {
  const section = document.querySelector('.unique-premium-capabilities');
  if (!section) return;
  
  // Add entrance animations to cards
  const leftCards = section.querySelectorAll('.unique-card');
  const rightCards = section.querySelectorAll('.showcase-card');
  
  leftCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateX(0)';
    }, index * 100);
  });
  
  rightCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 400 + index * 80);
  });
  
  // Add magnetic effect on cards
  const allCards = section.querySelectorAll('.unique-card, .showcase-card');
  
  allCards.forEach(card => {
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
      this.style.transform = '';
    });
  });
  
  // Add ripple effect on click
  allCards.forEach(card => {
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.width = '0';
      ripple.style.height = '0';
      ripple.style.borderRadius = '50%';
      ripple.style.backgroundColor = 'rgba(13, 148, 136, 0.3)';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.transition = 'all 0.5s ease-out';
      ripple.style.pointerEvents = 'none';
      ripple.style.zIndex = '10';
      
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.style.width = '200px';
        ripple.style.height = '200px';
        ripple.style.opacity = '0';
      }, 10);
      
      setTimeout(() => {
        ripple.remove();
      }, 500);
    });
  });
  
  // Add shine effect on hover
  const showcaseCards = section.querySelectorAll('.showcase-card');
  
  showcaseCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const shine = document.createElement('div');
      shine.style.position = 'absolute';
      shine.style.top = '0';
      shine.style.left = '-100%';
      shine.style.width = '100%';
      shine.style.height = '100%';
      shine.style.background = 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)';
      shine.style.transition = 'left 0.5s ease';
      shine.style.pointerEvents = 'none';
      
      this.appendChild(shine);
      
      setTimeout(() => {
        shine.style.left = '100%';
      }, 10);
      
      setTimeout(() => {
        shine.remove();
      }, 500);
    });
  });
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initUniqueCapabilities);
} else {
  initUniqueCapabilities();
}

document.addEventListener('microhub:fragments-loaded', initUniqueCapabilities);
/* ============================================
   SINGLE PREMIUM FAQ - Toggle Functionality
   ============================================ */
/* ============================================
   SINGLE PREMIUM FAQ - Toggle Functionality
   ============================================ */

function toggleSingleFAQ(element) {
  // Find the closest FAQ item container
  const faqItem = element.closest('.premium-faq-item');
  
  if (!faqItem) return;
  
  // Toggle the active class on the clicked FAQ
  faqItem.classList.toggle('active');
  
  // Optional: Close other FAQs in the same column for cleaner look
  const parentCol = faqItem.closest('.premium-faq-col');
  if (parentCol) {
    const siblings = parentCol.querySelectorAll('.premium-faq-item');
    siblings.forEach(item => {
      if (item !== faqItem && item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });
  }
}

// Initialize animations and ensure FAQ works
function initSingleFAQ() {
  const section = document.querySelector('.premium-single-faq');
  if (!section) return;
  
  // Add entrance animation to card
  const faqCard = section.querySelector('.premium-single-card');
  if (faqCard) {
    faqCard.style.opacity = '0';
    faqCard.style.transform = 'translateY(30px)';
    faqCard.style.transition = 'all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    
    setTimeout(() => {
      faqCard.style.opacity = '1';
      faqCard.style.transform = 'translateY(0)';
    }, 200);
  }
  
  // Add ripple effect on FAQ items
  const faqItems = section.querySelectorAll('.premium-faq-item');
  faqItems.forEach(item => {
    // Remove any existing listeners to avoid duplicates
    item.removeEventListener('click', handleRipple);
    item.addEventListener('click', handleRipple);
  });
}

function handleRipple(e) {
  // Don't create ripple if clicking on the toggle button (optional)
  if (e.target.closest('.premium-faq-toggle-box')) {
    // Still create ripple but let the toggle work
  }
  
  const ripple = document.createElement('span');
  ripple.className = 'faq-ripple';
  const rect = this.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  ripple.style.cssText = `
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(13, 148, 136, 0.2), transparent);
    transform: translate(-50%, -50%);
    transition: all 0.5s ease-out;
    pointer-events: none;
    z-index: 10;
  `;
  
  this.style.position = 'relative';
  this.style.overflow = 'hidden';
  this.appendChild(ripple);
  
  setTimeout(() => {
    ripple.style.width = '200px';
    ripple.style.height = '200px';
    ripple.style.opacity = '0';
  }, 10);
  
  setTimeout(() => {
    ripple.remove();
  }, 500);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSingleFAQ);
} else {
  initSingleFAQ();
}

// Re-initialize after fragment loading (for dynamic content)
document.addEventListener('microhub:fragments-loaded', initSingleFAQ);

/* ============================================
   PULSE COLLECTION - Interactive Effects
   ============================================ */

function initPulseCollection() {
  const cards = document.querySelectorAll('.pulse-collection-card');
  
  if (!cards.length) return;

  // Magnetic tilt effect with smooth performance
  cards.forEach(card => {
    let ticking = false;
    const inner = card.querySelector('.card-inner-pulse-collection');
    
    card.addEventListener('mousemove', (e) => {
      if (!ticking && inner) {
        requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          inner.style.transform = `rotateX(${y * 4}deg) rotateY(${x * -4}deg) translateY(-8px)`;
          ticking = false;
        });
        ticking = true;
      }
    });

    card.addEventListener('mouseleave', () => {
      if (inner) inner.style.transform = '';
    });
  });

  // Ripple effect on click
  cards.forEach(card => {
    card.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        left: ${e.clientX - this.getBoundingClientRect().left}px;
        top: ${e.clientY - this.getBoundingClientRect().top}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(13, 148, 136, 0.4), transparent);
        transform: translate(-50%, -50%);
        transition: all 0.6s ease;
        pointer-events: none;
        z-index: 100;
      `;
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.style.width = '300px';
        ripple.style.height = '300px';
        ripple.style.opacity = '0';
      }, 10);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Staggered entrance animation
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 80);
  });
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPulseCollection);
} else {
  initPulseCollection();
}

document.addEventListener('microhub:fragments-loaded', initPulseCollection);



/* ============================================
   PARALLAX BOX - Fixed Scroll-Based Scaling
   Box scales ONLY based on scroll position
   No hover effects, no delays
   ============================================ */

function initScrollParallaxBox() {
  const wrapper = document.querySelector('.parallax-box-wrapper');
  const boxBg = document.querySelector('.parallax-box-bg.visible-box');
  
  if (!wrapper || !boxBg) return;
  
  function updateBoxScale() {
    const rect = wrapper.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const sectionHeight = rect.height;
    
    // Calculate how much of the section is visible in the viewport
    let visibleProgress = 0;
    
    // Check if section is in viewport
    if (rect.top < windowHeight && rect.bottom > 0) {
      // Calculate visible portion
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(windowHeight, rect.bottom);
      const visibleHeight = visibleBottom - visibleTop;
      visibleProgress = visibleHeight / sectionHeight;
    }
    
    // Map visibleProgress to scale range: 0.85 (fully out) to 1.15 (fully visible)
    // When section enters: scale starts at 0.85
    // When fully centered: scale reaches 1.15
    // When section exits: scale returns to 0.85
    const scale = 0.85 + (visibleProgress * 0.30);
    
    // Apply scale with smooth transition
    boxBg.style.transform = `scale(${scale})`;
  }
  
  // Update on scroll - with throttling for performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateBoxScale();
        ticking = false;
      });
      ticking = true;
    }
  });
  
  // Update on resize
  window.addEventListener('resize', () => {
    updateBoxScale();
  });
  
  // Initial update
  updateBoxScale();
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollParallaxBox);
} else {
  initScrollParallaxBox();
}

document.addEventListener('microhub:fragments-loaded', initScrollParallaxBox);



/**
 * Financial Management Page Interactions
 * Scroll reveal animations and verification sequence simulator
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

  // ========== VERIFICATION SEQUENCE SIMULATOR (like biometric liveness) ==========
  const steps = Array.from(document.querySelectorAll('[data-fin-step]'));
  
  if (steps.length) {
    let activeIndex = 2; // Start at Budget check active (index 2)
    
    const renderSteps = () => {
      steps.forEach((step, index) => {
        const statusPill = step.querySelector('.fin-status-pill');
        step.classList.remove('done', 'active');
        
        if (index < activeIndex) {
          step.classList.add('done');
          if (statusPill) statusPill.textContent = 'Done';
        } else if (index === activeIndex) {
          step.classList.add('active');
          if (statusPill) statusPill.textContent = 'Active';
        } else {
          if (statusPill) {
            if (index === steps.length - 1) {
              statusPill.textContent = 'Pending';
            } else {
              statusPill.textContent = 'Waiting';
            }
          }
        }
      });
    };
    
    // Initial render
    renderSteps();
    
    // Auto-rotate through verification steps if motion is allowed
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      let interval = setInterval(() => {
        activeIndex = (activeIndex + 1) % steps.length;
        renderSteps();
      }, 2800);
      
      // Cleanup interval on page unload (optional but good practice)
      window.addEventListener('beforeunload', () => {
        if (interval) clearInterval(interval);
      });
    }
  }

  // ========== ADDITIONAL: Stats counter animation (optional) ==========
  const statNumbers = document.querySelectorAll('.fin-stat-card strong');
  
  const animateValue = (element, start, end, duration) => {
    if (element.dataset.animated === 'true') return;
    
    const startTime = performance.now();
    const updateValue = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(start + (end - start) * progress);
      
      if (element.textContent.includes('₹')) {
        element.textContent = `₹${value.toLocaleString('en-IN')}`;
      } else if (element.textContent.includes('<')) {
        // Keep the <1s format
        if (progress < 0.5) {
          element.textContent = `<${Math.floor(end * progress)}s`;
        } else {
          element.textContent = `<1s`;
        }
      } else {
        element.textContent = value;
      }
      
      if (progress < 1) {
        requestAnimationFrame(updateValue);
      } else {
        element.dataset.animated = 'true';
        // Set final value
        if (element.textContent.includes('₹')) {
          element.textContent = `₹${end.toLocaleString('en-IN')}`;
        } else if (element.textContent.includes('<')) {
          element.textContent = `<1s`;
        } else {
          element.textContent = end;
        }
      }
    };
    
    requestAnimationFrame(updateValue);
  };
  
  // Observe stat cards for counter animation
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statCard = entry.target;
        const strongElement = statCard.querySelector('strong');
        if (strongElement && !strongElement.dataset.animated) {
          const text = strongElement.textContent;
          if (text.includes('₹0')) {
            animateValue(strongElement, 0, 0, 500);
          } else if (text.includes('<1s')) {
            animateValue(strongElement, 0, 1, 600);
          } else if (text.includes('GST')) {
            // Don't animate text labels
            strongElement.dataset.animated = 'true';
          } else if (text.includes('ERP')) {
            strongElement.dataset.animated = 'true';
          } else {
            strongElement.dataset.animated = 'true';
          }
        }
        statObserver.unobserve(statCard);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('.fin-stat-card').forEach((card) => {
    statObserver.observe(card);
  });
})();