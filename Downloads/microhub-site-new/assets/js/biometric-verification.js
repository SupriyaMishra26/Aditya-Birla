(function(){
  const revealItems=document.querySelectorAll('.bio-reveal');
  if(revealItems.length){
    const observer=new IntersectionObserver((entries,obs)=>{
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },{threshold:0.18});
    revealItems.forEach((item)=>observer.observe(item));
  }

  const flowRoot = document.querySelector('[data-bio-flow]');
  if (flowRoot) {
    const track = flowRoot.querySelector('[data-bio-flow-track]');
    const stepCards = Array.from(flowRoot.querySelectorAll('[data-flow-step]'));
    const dots = Array.from(flowRoot.querySelectorAll('[data-flow-dot]'));
    const prev = flowRoot.querySelector('[data-flow-prev]');
    const next = flowRoot.querySelector('[data-flow-next]');
    const progress = flowRoot.querySelector('[data-bio-flow-progress]');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let activeIndex = 0;
    let autoTimer = 0;

    const render = (index) => {
      if (!track || !stepCards.length) return;
      activeIndex = (index + stepCards.length) % stepCards.length;
      track.style.transform = `translateX(-${activeIndex * 100}%)`;
      stepCards.forEach((card, cardIndex) => {
        card.classList.toggle('is-active', cardIndex === activeIndex);
      });
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === activeIndex);
        dot.setAttribute('aria-pressed', dotIndex === activeIndex ? 'true' : 'false');
      });
      if (progress) {
        progress.style.width = `${((activeIndex + 1) / stepCards.length) * 100}%`;
      }
    };

    const stopAuto = () => {
      if (autoTimer) {
        window.clearInterval(autoTimer);
        autoTimer = 0;
      }
    };

    const startAuto = () => {
      if (prefersReduced || stepCards.length < 2) return;
      stopAuto();
      autoTimer = window.setInterval(() => {
        render(activeIndex + 1);
      }, 4300);
    };

    if (prev) {
      prev.addEventListener('click', () => {
        render(activeIndex - 1);
        startAuto();
      });
    }

    if (next) {
      next.addEventListener('click', () => {
        render(activeIndex + 1);
        startAuto();
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        render(Number(dot.dataset.flowDot || 0));
        startAuto();
      });
    });

    flowRoot.addEventListener('mouseenter', stopAuto);
    flowRoot.addEventListener('mouseleave', startAuto);
    flowRoot.addEventListener('focusin', stopAuto);
    flowRoot.addEventListener('focusout', startAuto);

    render(0);
    startAuto();
  }
  const livenessRoot = document.querySelector('[data-bio-liveness]');
  if (livenessRoot) {
    const previewImage = livenessRoot.querySelector('[data-liveness-preview-image]');
    const cards = Array.from(livenessRoot.querySelectorAll('[data-liveness-card]'));
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let activeIndex = 0;
    let autoTimer = 0;

    const livenessStates = cards
      .map((card, index) => {
        const title = card.querySelector('strong')?.textContent?.trim() || `State ${index + 1}`;
        const subtitle = card.querySelector('small')?.textContent?.trim() || '';
        const rawImage = card.dataset.image || '';
        return {
          title,
          subtitle,
          image: rawImage ? new URL(rawImage, document.baseURI).href : '',
        };
      })
      .filter((state) => state.image);

    livenessStates.forEach((state) => {
      const preload = new Image();
      preload.src = state.image;
    });

    const stopAuto = () => {
      if (!autoTimer) return;
      window.clearInterval(autoTimer);
      autoTimer = 0;
    };

    const render = (index) => {
      if (!previewImage || !livenessStates.length) return;

      activeIndex = (index + livenessStates.length) % livenessStates.length;
      const state = livenessStates[activeIndex];

      cards.forEach((card, cardIndex) => {
        const isActive = cardIndex === activeIndex;
        card.classList.toggle('is-active', isActive);
        card.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      previewImage.style.opacity = '0';
      previewImage.src = state.image;
      previewImage.alt = state.subtitle ? `${state.title} - ${state.subtitle}` : `${state.title} preview`;
      window.requestAnimationFrame(() => {
        previewImage.style.opacity = '1';
      });
    };

    const startAuto = () => {
      stopAuto();
      if (prefersReduced || livenessStates.length < 2) return;
      autoTimer = window.setInterval(() => {
        render(activeIndex + 1);
      }, 4200);
    };

    cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        render(index);
        startAuto();
      });
    });

    livenessRoot.addEventListener('mouseenter', stopAuto);
    livenessRoot.addEventListener('mouseleave', startAuto);
    livenessRoot.addEventListener('focusin', stopAuto);
    livenessRoot.addEventListener('focusout', () => {
      window.setTimeout(() => {
        if (!livenessRoot.contains(document.activeElement)) startAuto();
      }, 0);
    });

    render(0);
    startAuto();
  }

  const steps=Array.from(document.querySelectorAll('[data-liveness-step]'));
  if(steps.length){
    let activeIndex=2;
    const render=()=>{
      steps.forEach((step,index)=>{
        const status=step.querySelector('.bio-status-pill');
        step.classList.remove('done','active');
        if(index<activeIndex){
          step.classList.add('done');
          if(status) status.textContent='Done';
        }else if(index===activeIndex){
          step.classList.add('active');
          if(status) status.textContent='Active';
        }else{
          if(status) status.textContent=index===steps.length-1?'Pending':'Waiting';
        }
      });
    };
    render();
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      window.setInterval(()=>{
        activeIndex=(activeIndex+1)%steps.length;
        render();
      },2200);
    }
  }
})();
