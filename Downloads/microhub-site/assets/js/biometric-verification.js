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
