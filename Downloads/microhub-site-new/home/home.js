/* MicroHub - Home Page JS */
'use strict';

(function () {
  let parallaxElements = [];
  let parallaxBound = false;
  let parallaxTicking = false;
  let infraHeightSyncBound = false;

  function initHomeScene() {
    const canvas = document.getElementById('globe-canvas');
    if (!canvas || canvas.dataset.homeSceneReady === 'true' || typeof THREE === 'undefined') return;

    canvas.dataset.homeSceneReady = 'true';

    const width = 500;
    const height = 500;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 2.8;

    const sphereGeo = new THREE.SphereGeometry(1, 32, 32);
    const wireframe = new THREE.WireframeGeometry(sphereGeo);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x0D9488, opacity: 0.18, transparent: true });
    const globe = new THREE.LineSegments(wireframe, wireMat);
    scene.add(globe);

    const dotsGeo = new THREE.BufferGeometry();
    const dotPositions = [];
    for (let index = 0; index < 800; index += 1) {
      const phi = Math.acos(-1 + (2 * index) / 800);
      const theta = Math.sqrt(800 * Math.PI) * phi;
      const radius = 1.005;
      dotPositions.push(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
    }
    dotsGeo.setAttribute('position', new THREE.Float32BufferAttribute(dotPositions, 3));
    const dotsMat = new THREE.PointsMaterial({ color: 0x14B8A6, size: 0.018, sizeAttenuation: true });
    const dots = new THREE.Points(dotsGeo, dotsMat);
    scene.add(dots);

    const ring1Geo = new THREE.TorusGeometry(1.25, 0.003, 8, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x0D9488, opacity: 0.5, transparent: true });
    const ring1 = new THREE.Mesh(ring1Geo, ringMat1);
    ring1.rotation.x = Math.PI / 2.5;
    scene.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.4, 0.002, 8, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x14B8A6, opacity: 0.3, transparent: true });
    const ring2 = new THREE.Mesh(ring2Geo, ringMat2);
    ring2.rotation.y = Math.PI / 3;
    ring2.rotation.z = Math.PI / 6;
    scene.add(ring2);

    const sat1Geo = new THREE.SphereGeometry(0.025, 8, 8);
    const sat1Mat = new THREE.MeshBasicMaterial({ color: 0x14B8A6 });
    const sat1 = new THREE.Mesh(sat1Geo, sat1Mat);
    const sat1Pivot = new THREE.Object3D();
    sat1.position.x = 1.25;
    sat1Pivot.add(sat1);
    sat1Pivot.rotation.x = Math.PI / 2.5;
    scene.add(sat1Pivot);

    const sat2Geo = new THREE.SphereGeometry(0.02, 8, 8);
    const sat2Mat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
    const sat2 = new THREE.Mesh(sat2Geo, sat2Mat);
    const sat2Pivot = new THREE.Object3D();
    sat2.position.x = 1.4;
    sat2Pivot.add(sat2);
    sat2Pivot.rotation.y = Math.PI / 3;
    sat2Pivot.rotation.z = Math.PI / 6;
    scene.add(sat2Pivot);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    let mouseX = 0;
    let mouseY = 0;
    let orbitDriftX = 0;
    let orbitDriftY = 0;
    let autoRotationY = 0;
    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 0.6;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 0.4;
    });

    let animationId;
    function animate() {
      animationId = requestAnimationFrame(animate);
      autoRotationY += 0.004;
      orbitDriftY += (mouseX * 0.35 - orbitDriftY) * 0.04;
      orbitDriftX += ((-mouseY) * 0.25 - orbitDriftX) * 0.04;

      globe.rotation.y = autoRotationY + orbitDriftY;
      globe.rotation.x = orbitDriftX + Math.sin(autoRotationY * 0.45) * 0.04;
      dots.rotation.y = globe.rotation.y;
      dots.rotation.x = globe.rotation.x;
      ring1.rotation.z += 0.004;
      ring2.rotation.z -= 0.003;
      sat1Pivot.rotation.z += 0.018;
      sat2Pivot.rotation.z -= 0.012;

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('beforeunload', () => cancelAnimationFrame(animationId));

    const bgCanvas = document.getElementById('hero-canvas');
    if (bgCanvas) {
      const bgRenderer = new THREE.WebGLRenderer({ canvas: bgCanvas, antialias: false, alpha: true });
      bgRenderer.setPixelRatio(1);
      bgRenderer.setSize(window.innerWidth, window.innerHeight);
      bgRenderer.setClearColor(0x000000, 0);

      const bgScene = new THREE.Scene();
      const bgCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      bgCamera.position.z = 5;

      const starGeo = new THREE.BufferGeometry();
      const starPositions = [];
      for (let index = 0; index < 1200; index += 1) {
        starPositions.push(
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30
        );
      }
      starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
      const starMat = new THREE.PointsMaterial({ color: 0x14B8A6, size: 0.04, sizeAttenuation: true, opacity: 0.6, transparent: true });
      bgScene.add(new THREE.Points(starGeo, starMat));

      function animateBackground() {
        requestAnimationFrame(animateBackground);
        bgScene.rotation.y += 0.0003;
        bgRenderer.render(bgScene, bgCamera);
      }
      animateBackground();

      window.addEventListener('resize', () => {
        bgRenderer.setSize(window.innerWidth, window.innerHeight);
        bgCamera.aspect = window.innerWidth / window.innerHeight;
        bgCamera.updateProjectionMatrix();
      });
    }
  }

  function initHeroOrbit() {
    const stage = document.querySelector('.hero-visual-stage');
    if (!stage || stage.dataset.heroOrbitReady === 'true') return;

    stage.dataset.heroOrbitReady = 'true';

    const revealOrbit = () => {
      stage.classList.add('is-settled');
    };

    if (window.innerWidth < 992 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealOrbit();
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      revealOrbit();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealOrbit();
        observer.disconnect();
      });
    }, { threshold: 0.25 });

    observer.observe(stage);
  }

  function updateHomeParallax() {
    parallaxTicking = false;

    if (!parallaxElements.length) return;

    const viewportCenter = window.innerHeight / 2;
    parallaxElements.forEach((element) => {
      const strength = Number(element.dataset.homeParallax || 0);
      if (!strength) return;

      const rect = element.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const distance = viewportCenter - elementCenter;
      const ratio = Math.max(-1, Math.min(1, distance / viewportCenter));
      element.style.setProperty('--home-shift', `${(ratio * strength).toFixed(2)}px`);
    });
  }

  function scheduleHomeParallax() {
    if (parallaxTicking) return;
    parallaxTicking = true;
    window.requestAnimationFrame(updateHomeParallax);
  }

  function initHomeScrollMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    parallaxElements = Array.from(document.querySelectorAll('[data-home-parallax]'));
    if (!parallaxElements.length) return;

    if (!parallaxBound) {
      parallaxBound = true;
      window.addEventListener('scroll', scheduleHomeParallax, { passive: true });
      window.addEventListener('resize', scheduleHomeParallax);
    }

    scheduleHomeParallax();
  }

  function initHardwareSliders() {
    const sliders = Array.from(document.querySelectorAll('[data-hardware-slider]'));
    if (!sliders.length) return;

    sliders.forEach((slider) => {
      if (slider.dataset.hardwareReady === 'true') return;
      slider.dataset.hardwareReady = 'true';

      const track = slider.querySelector('.hardware-track');
      const slides = Array.from(slider.querySelectorAll('.hardware-card'));
      const dotsHost = slider.querySelector('[data-hardware-dots]');
      const prevButton = slider.querySelector('[data-hardware-prev]');
      const nextButton = slider.querySelector('[data-hardware-next]');

      if (!track || slides.length < 2) {
        slider.classList.add('is-static');
        return;
      }

      const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      const originalSlides = slides.map((slide) => slide.cloneNode(true));
      let currentIndex = 0;
      let visibleCount = 0;
      let visualIndex = 0;
      let isStatic = false;
      let autoplayId = 0;
      let dots = [];
      let isAnimating = false;

      const getVisibleCount = () => {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 992) return 2;
        if (window.innerWidth < 1400) return 3;
        return 4;
      };

      const getStepSize = () => {
        const firstSlide = track.querySelector('.hardware-card');
        if (!firstSlide) return 0;

        const trackStyles = window.getComputedStyle(track);
        const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || '0') || 0;
        return firstSlide.getBoundingClientRect().width + gap;
      };

      const normalizeIndex = (index) => {
        const total = originalSlides.length;
        if (!total) return 0;
        return ((index % total) + total) % total;
      };

      const setTrackPosition = (index, animate = true) => {
        const stepSize = getStepSize();
        if (!stepSize) return;

        track.style.transition = animate ? '' : 'none';
        track.style.transform = `translate3d(-${index * stepSize}px, 0, 0)`;

        if (!animate) {
          track.getBoundingClientRect();
          track.style.transition = '';
        }
      };

      const syncDots = () => {
        dots.forEach((dot, index) => {
          const isActive = index === currentIndex;
          dot.classList.toggle('is-active', isActive);
          dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
      };

      const rebuildTrack = () => {
        visibleCount = getVisibleCount();
        isStatic = originalSlides.length <= visibleCount;

        const leadingClones = isStatic
          ? []
          : originalSlides.map((slide) => {
              const clone = slide.cloneNode(true);
              clone.dataset.hardwareClone = 'true';
              clone.setAttribute('aria-hidden', 'true');
              clone.tabIndex = -1;
              return clone;
            });

        const mainSlides = originalSlides.map((slide) => {
          const clone = slide.cloneNode(true);
          clone.removeAttribute('data-hardware-clone');
          clone.removeAttribute('aria-hidden');
          clone.removeAttribute('tabindex');
          return clone;
        });

        const trailingClones = isStatic
          ? []
          : originalSlides.map((slide) => {
              const clone = slide.cloneNode(true);
              clone.dataset.hardwareClone = 'true';
              clone.setAttribute('aria-hidden', 'true');
              clone.tabIndex = -1;
              return clone;
            });

        track.replaceChildren(...leadingClones, ...mainSlides, ...trailingClones);
        currentIndex = normalizeIndex(currentIndex);
        visualIndex = isStatic ? 0 : currentIndex + originalSlides.length;
        isAnimating = false;
        slider.classList.toggle('is-static', isStatic);
        setTrackPosition(visualIndex, false);
      };

      const buildDots = () => {
        if (!dotsHost) return;

        dotsHost.innerHTML = '';
        dots = [];
        if (isStatic || originalSlides.length < 2) return;

        for (let index = 0; index < originalSlides.length; index += 1) {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'hardware-slider-dot';
          dot.setAttribute('aria-label', `Go to hardware position ${index + 1}`);
          dot.addEventListener('click', () => {
            jumpTo(index);
            restartAutoplay();
          });
          dotsHost.appendChild(dot);
          dots.push(dot);
        }

        syncDots();
      };

      function stopAutoplay() {
        if (!autoplayId) return;
        window.clearInterval(autoplayId);
        autoplayId = 0;
      }

      function startAutoplay() {
        stopAutoplay();
        if (motionQuery.matches || isStatic) return;

        autoplayId = window.setInterval(() => {
          moveBy(1);
        }, 4200);
      }

      function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
      }

      function moveBy(step) {
        if (isStatic) {
          currentIndex = 0;
          visualIndex = 0;
          isAnimating = false;
          setTrackPosition(0, false);
          return;
        }

        if (isAnimating) return;

        currentIndex = normalizeIndex(currentIndex + step);
        visualIndex += step;
        isAnimating = true;
        setTrackPosition(visualIndex, true);
        syncDots();
      }

      function jumpTo(targetIndex) {
        if (isStatic || isAnimating) return;

        const normalizedTarget = normalizeIndex(targetIndex);
        if (normalizedTarget === currentIndex) return;

        const total = originalSlides.length;
        const forwardDistance = (normalizedTarget - currentIndex + total) % total;
        const backwardDistance = forwardDistance - total;
        const delta = Math.abs(backwardDistance) < Math.abs(forwardDistance) ? backwardDistance : forwardDistance;
        if (!delta) return;

        currentIndex = normalizedTarget;
        visualIndex += delta;
        isAnimating = true;
        setTrackPosition(visualIndex, true);
        syncDots();
      }

      if (prevButton) {
        prevButton.addEventListener('click', () => {
          moveBy(-1);
          restartAutoplay();
        });
      }

      if (nextButton) {
        nextButton.addEventListener('click', () => {
          moveBy(1);
          restartAutoplay();
        });
      }

      track.addEventListener('transitionend', (event) => {
        if (event.target !== track || event.propertyName !== 'transform' || isStatic) return;

        const total = originalSlides.length;
        if (visualIndex < total) {
          visualIndex += total;
          setTrackPosition(visualIndex, false);
        } else if (visualIndex >= total * 2) {
          visualIndex -= total;
          setTrackPosition(visualIndex, false);
        }

        isAnimating = false;
      });

      slider.addEventListener('mouseenter', stopAutoplay);
      slider.addEventListener('mouseleave', startAutoplay);
      slider.addEventListener('focusin', stopAutoplay);
      slider.addEventListener('focusout', () => {
        window.setTimeout(() => {
          if (!slider.contains(document.activeElement)) startAutoplay();
        }, 0);
      });

      if (typeof motionQuery.addEventListener === 'function') {
        motionQuery.addEventListener('change', startAutoplay);
      } else if (typeof motionQuery.addListener === 'function') {
        motionQuery.addListener(startAutoplay);
      }

      function onResize() {
        rebuildTrack();
        buildDots();
        syncDots();
        startAutoplay();
      }

      window.addEventListener('resize', onResize);
      onResize();
    });
  }

  function syncInfrastructurePanelHeights() {
    const copyPanel = document.querySelector('.infra-solutions-copy');
    const serviceGrid = document.querySelector('.infra-solutions-grid');

    if (!copyPanel || !serviceGrid) return;

    serviceGrid.style.removeProperty('height');

    if (window.innerWidth < 1200) return;

    const copyHeight = Math.ceil(copyPanel.getBoundingClientRect().height);
    if (copyHeight > 0) {
      serviceGrid.style.height = `${copyHeight}px`;
    }
  }

  function initInfrastructureHeightSync() {
    if (!document.querySelector('.infra-solutions-grid')) return;

    window.requestAnimationFrame(syncInfrastructurePanelHeights);

    if (infraHeightSyncBound) return;
    infraHeightSyncBound = true;

    window.addEventListener('resize', syncInfrastructurePanelHeights);

    if (document.fonts && 'ready' in document.fonts) {
      document.fonts.ready.then(syncInfrastructurePanelHeights).catch(() => {});
    }

    if (document.fonts && typeof document.fonts.addEventListener === 'function') {
      document.fonts.addEventListener('loadingdone', syncInfrastructurePanelHeights);
    }
  }
function initProductTabs() {
  var INTERVAL = 4500;
  var timer, currentIndex = 0;

  var nav = document.getElementById('ptab-nav');
  var panels = document.getElementById('ptab-panels');

  if (!nav || !panels) return;

  var btns = nav.querySelectorAll('.ptab-btn');
  var panes = panels.querySelectorAll('.ptab-panel');
  var total = btns.length;

  function activate(idx) {
    btns[currentIndex].classList.remove('active');
    btns[currentIndex].setAttribute('aria-selected', 'false');
    panes[currentIndex].classList.remove('active');

    currentIndex = (idx + total) % total;

    btns[currentIndex].classList.add('active');
    btns[currentIndex].setAttribute('aria-selected', 'true');
    panes[currentIndex].classList.add('active');
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(function () {
      activate(currentIndex + 1);
    }, INTERVAL);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  btns.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      activate(i);
      stopTimer();
      startTimer();
    });
  });

  nav.addEventListener('mouseenter', stopTimer);
  nav.addEventListener('mouseleave', startTimer);

  startTimer();
}
  function boot() {
    initHomeScene();
    initHeroOrbit();
    initHomeScrollMotion();
    initHardwareSliders();
    initInfrastructureHeightSync();
    initProductTabs(); 
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  document.addEventListener('microhub:fragments-loaded', boot);
})();

