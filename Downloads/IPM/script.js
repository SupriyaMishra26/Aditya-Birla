// CUBE
const canvas = document.getElementById('cube-canvas');
const W = 200, H = 200;
canvas.width = W * Math.min(window.devicePixelRatio,2);
canvas.height = H * Math.min(window.devicePixelRatio,2);
canvas.style.width = W+'px'; canvas.style.height = H+'px';

const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setSize(W,H);
renderer.setClearColor(0,0);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

const s3 = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(42,1,0.1,100);
cam.position.set(4.2,3.2,5);
cam.lookAt(0,0,0);

s3.add(new THREE.AmbientLight(0xffffff,0.6));
const dl = new THREE.DirectionalLight(0xffffff,1.6);
dl.position.set(6,8,6); s3.add(dl);
const dl2 = new THREE.DirectionalLight(0x3A62B8,0.5);
dl2.position.set(-5,2,-4); s3.add(dl2);
const dl3 = new THREE.DirectionalLight(0xC4902A,0.3);
dl3.position.set(2,-6,3); s3.add(dl3);

// Classic Rubik's cube colors: Red, Blue, Yellow, White, Green, Orange
const COLS = [0xCC2200, 0x2255CC, 0xDDAA00, 0xEEEEEE, 0x118833, 0xDD6600];
const tileMats = COLS.map(c => new THREE.MeshStandardMaterial({color:c,roughness:0.14,metalness:0.05}));
const blackMat = new THREE.MeshStandardMaterial({color:0x1a1a2e,roughness:0.5,metalness:0.3});

const SCRAMBLE = [
  [1,2,0,3,5,4,2,1,3],[4,3,5,1,0,2,4,3,1],
  [2,5,4,0,3,1,5,2,0],[1,4,2,5,3,0,2,4,3],
  [3,1,4,2,0,5,3,0,4],[0,3,2,1,4,5,2,1,3],
];
const sidxs=[0,0,0,0,0,0];

const cubeGrp = new THREE.Group(); s3.add(cubeGrp);
const SP=1.0, CS=0.93, TR=0.025;

function mkShape(){
  const sh=new THREE.Shape(), s=0.38,r=0.06;
  sh.moveTo(-s+r,-s);sh.lineTo(s-r,-s);sh.quadraticCurveTo(s,-s,s,-s+r);
  sh.lineTo(s,s-r);sh.quadraticCurveTo(s,s,s-r,s);
  sh.lineTo(-s+r,s);sh.quadraticCurveTo(-s,s,-s,s-r);
  sh.lineTo(-s,-s+r);sh.quadraticCurveTo(-s,-s,-s+r,-s);
  return sh;
}
const tGeo=new THREE.ExtrudeGeometry(mkShape(),{depth:TR,bevelEnabled:true,bevelThickness:0.009,bevelSize:0.009,bevelSegments:3});

for(let cx=-1;cx<=1;cx++)for(let cy=-1;cy<=1;cy++)for(let cz=-1;cz<=1;cz++){
  const g=new THREE.Group();
  g.position.set(cx*SP,cy*SP,cz*SP);
  const base=new THREE.Mesh(new THREE.BoxGeometry(CS,CS,CS),blackMat);
  g.add(base);
  const addT=(fi,rx,ry,px,py,pz)=>{
    const ci=SCRAMBLE[fi][sidxs[fi]++];
    const t=new THREE.Mesh(tGeo,tileMats[ci]);
    if(rx)t.rotation.x=rx; if(ry)t.rotation.y=ry;
    t.position.set(px,py,pz); g.add(t);
  };
  if(cx===1)  addT(0,0,Math.PI/2,   CS/2+.001,0,0);
  if(cx===-1) addT(1,0,-Math.PI/2, -CS/2-.001,0,0);
  if(cy===1)  addT(2,-Math.PI/2,0,  0,CS/2+.001,0);
  if(cy===-1) addT(3,Math.PI/2,0,   0,-CS/2-.001,0);
  if(cz===1)  addT(4,0,0,           0,0,CS/2+.001);
  if(cz===-1) addT(5,0,Math.PI,     0,0,-CS/2-.001);
  cubeGrp.add(g);
}

let cubeT=0, cubeHovered=false, hoverSpinV=0;
canvas.style.cursor='pointer';
canvas.addEventListener('mouseenter',()=>{ cubeHovered=true; });
canvas.addEventListener('mouseleave',()=>{ cubeHovered=false; });

function animCube(){
  requestAnimationFrame(animCube);
  cubeT+=0.007;
  if(cubeHovered){ hoverSpinV += (0.06 - hoverSpinV)*0.08; }
  else { hoverSpinV += (0 - hoverSpinV)*0.05; }
  cubeGrp.rotation.y += 0.007 + hoverSpinV;
  cubeGrp.rotation.x = 0.28+Math.sin(cubeT*0.35)*0.1 + (cubeHovered ? Math.sin(cubeT*2)*0.08 : 0);
  const sc = cubeHovered ? 1 + Math.sin(cubeT*3)*0.015 : 1;
  cubeGrp.scale.setScalar(sc);
  renderer.render(s3,cam);
}
animCube();

// NAV SCROLL
const nav=document.getElementById('navbar');
window.addEventListener('scroll',()=>{
  nav.classList.toggle('scrolled', window.scrollY>40);
},{passive:true});

// MOBILE MENU
function toggleMobile(){
  const h=document.getElementById('hamburger');
  const d=document.getElementById('mobileDrawer');
  h.classList.toggle('open');
  d.classList.toggle('open');
  document.body.style.overflow=d.classList.contains('open')?'hidden':'';
}

// SCROLL REVEAL
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-from-top, .reveal-from-bottom, .reveal-from-left, .reveal-from-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

// CARD TILT
const tiltCards = document.querySelectorAll('.m4card, .do-card, .ap-feat-card, .region-card, .aside-card, .safeguard');
tiltCards.forEach(card => {
  let raf;
  card.addEventListener('mousemove', e => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width/2)) / (r.width/2);
      const dy = (e.clientY - (r.top + r.height/2)) / (r.height/2);
      card.style.transform = `perspective(700px) rotateX(${dy*5}deg) rotateY(${-dx*5}deg) translateY(-3px) scale(1.01)`;
      card.style.transition = 'transform .05s linear, box-shadow .15s, border-color .3s';
      card.style.boxShadow  = `${-dx*8}px ${-dy*8}px 32px rgba(14,27,61,0.12)`;
    });
  });
  card.addEventListener('mouseleave', () => {
    cancelAnimationFrame(raf);
    card.style.transform = '';
    card.style.boxShadow = '';
    card.style.transition = 'transform .5s cubic-bezier(0.22,1,0.36,1), box-shadow .5s, border-color .3s';
  });
  card.addEventListener('touchstart', () => { card.style.transform = ''; }, { passive: true });
});

// SVG LINES — single shared rAF loop (was 6 separate loops)
function buildLines(){
  const svg=document.getElementById('lines-svg');
  if(!svg) return;
  svg.querySelectorAll('.cl').forEach(e=>e.remove());
  const si=document.querySelector('.scene-wrap');
  const cw=document.getElementById('cube-canvas');
  if(!si||!cw) return;
  const siR=si.getBoundingClientRect();
  const cwR=cw.getBoundingClientRect();
  const svgW=siR.width, svgH=siR.height;
  svg.setAttribute('viewBox',`0 0 ${svgW} ${svgH}`);
  svg.style.width=svgW+'px'; svg.style.height=svgH+'px';
  const ccx=cwR.left-siR.left+cwR.width/2;
  const ccy=cwR.top-siR.top+cwR.height/2;

  // Store all animated dots in a shared array
  const dotData = [];
  document.querySelectorAll('.sc-card').forEach((card,i)=>{
    const cR=card.getBoundingClientRect();
    const cx=cR.left-siR.left+cR.width/2;
    const cy=cR.top-siR.top+cR.height/2;
    const mx=(cx+ccx)/2+(Math.random()-.5)*50;
    const my=(cy+ccy)/2+(Math.random()-.5)*30;
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',`M ${ccx} ${ccy} Q ${mx} ${my} ${cx} ${cy}`);
    path.setAttribute('class','cl');
    path.setAttribute('fill','none');
    path.setAttribute('stroke','rgba(180,205,255,0.6)');
    path.setAttribute('stroke-width','2');
    path.setAttribute('opacity','0.85');
    path.setAttribute('stroke-dasharray','7 10');
    svg.appendChild(path);
    const glowRing=document.createElementNS('http://www.w3.org/2000/svg','circle');
    glowRing.setAttribute('r','12'); glowRing.setAttribute('fill','rgba(122,155,212,0.25)'); glowRing.setAttribute('class','cl');
    svg.appendChild(glowRing);
    const dot=document.createElementNS('http://www.w3.org/2000/svg','circle');
    dot.setAttribute('r','7'); dot.setAttribute('fill','rgba(200,220,255,0.95)'); dot.setAttribute('opacity','0.95');
    dot.setAttribute('class','cl');
    svg.appendChild(dot);
    const len=path.getTotalLength?path.getTotalLength():200;
    dotData.push({ path, dot, glowRing, len, t: i*0.18 });
    card.addEventListener('mouseenter',()=>{path.setAttribute('opacity','1');path.setAttribute('stroke','rgba(200,225,255,0.95)');path.setAttribute('stroke-width','2.5');dot.setAttribute('r','9');glowRing.setAttribute('r','16');});
    card.addEventListener('mouseleave',()=>{path.setAttribute('opacity','0.85');path.setAttribute('stroke','rgba(180,205,255,0.6)');path.setAttribute('stroke-width','2');dot.setAttribute('r','7');glowRing.setAttribute('r','12');});
  });

  // ONE shared loop for all dots, paused when hero off-screen
  let heroVisible = true;
  const heroEl = document.getElementById('hero');
  if(heroEl){
    const io = new IntersectionObserver(e=>{ heroVisible=e[0].isIntersecting; if(heroVisible) raf(); },{threshold:0.05});
    io.observe(heroEl);
  }
  let animId;
  function raf(){
    dotData.forEach(d=>{
      d.t += 0.0006;
      const f=(d.t%1+1)%1;
      try{ const pt=d.path.getPointAtLength(f*d.len); d.dot.setAttribute('cx',pt.x); d.dot.setAttribute('cy',pt.y); d.glowRing.setAttribute('cx',pt.x); d.glowRing.setAttribute('cy',pt.y); }catch(e){}
    });
    if(heroVisible) animId=requestAnimationFrame(raf);
  }
  animId=requestAnimationFrame(raf);
}

// HERO TRAILS — viewport-paused, 8 trails (was 16)
(function(){
  const canvas = document.getElementById('hero-trails');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  let running = true;
  function resize(){
    canvas.width  = canvas.offsetWidth  * Math.min(window.devicePixelRatio,2);
    canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio,2);
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(Math.min(window.devicePixelRatio,2), Math.min(window.devicePixelRatio,2));
  }
  resize();
  window.addEventListener('resize', resize);
  const W=()=>canvas.offsetWidth, H=()=>canvas.offsetHeight;
  const COLORS=['rgba(91,126,197,','rgba(61,140,140,','rgba(122,155,212,','rgba(196,144,42,'];
  class Trail{
    constructor(i){this.i=i;this.reset(true);}
    reset(init){
      const w=W(),h=H();
      this.x=init?Math.random()*w:-50; this.y=Math.random()*h;
      this.vx=0.4+Math.random()*0.6; this.vy=(Math.random()-0.5)*0.3;
      this.col=COLORS[this.i%COLORS.length]; this.alpha=0.08+Math.random()*0.14;
      this.wd=1+Math.random()*1.5; this.len=80+Math.random()*150; this.hist=[];
      this.freq=0.007+Math.random()*0.01; this.amp=0.1+Math.random()*0.25;
      this.ph=Math.random()*Math.PI*2; this.age=0;
    }
    update(){this.age++;const c=Math.sin(this.age*this.freq+this.ph)*this.amp;this.x+=this.vx+c;this.y+=this.vy+c;this.hist.push({x:this.x,y:this.y});if(this.hist.length>this.len)this.hist.shift();if(this.x>W()+60||this.y>H()+60||this.y<-60)this.reset(false);}
    draw(){
      if(this.hist.length<4)return;
      const fi=Math.min(1,this.age/60),al=this.alpha*fi;
      ctx.save();
      for(let i=1;i<this.hist.length;i++){
        const t=i/this.hist.length;
        if(i%6===0||i===this.hist.length-1){
          ctx.beginPath(); ctx.strokeStyle=this.col+(al*t*1.2)+')'; ctx.lineWidth=this.wd*(0.3+t*0.7); ctx.lineCap='round';
          ctx.moveTo(this.hist[i-1].x,this.hist[i-1].y); ctx.lineTo(this.hist[i].x,this.hist[i].y); ctx.stroke();
        }
      }
      const hd=this.hist[this.hist.length-1];
      const g=ctx.createRadialGradient(hd.x,hd.y,0,hd.x,hd.y,this.wd*3);
      g.addColorStop(0,this.col+(al*2)+')'); g.addColorStop(1,this.col+'0)');
      ctx.beginPath(); ctx.arc(hd.x,hd.y,this.wd*2,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
      ctx.restore();
    }
  }
  const trails=Array.from({length:8},(_,i)=>new Trail(i));
  const io=new IntersectionObserver(e=>{running=e[0].isIntersecting; if(running)frame();},{threshold:0.05});
  io.observe(canvas.parentElement);
  function frame(){
    ctx.save(); ctx.globalCompositeOperation='source-over'; ctx.fillStyle='rgba(10,17,40,0.18)'; ctx.fillRect(0,0,W(),H()); ctx.restore();
    trails.forEach(t=>{t.update();t.draw();});
    if(running) requestAnimationFrame(frame);
  }
  frame();
})();

// ABOUT PARTICLES — throttled, viewport-paused
(function(){
  const c = document.getElementById('about-particles');
  if(!c) return;
  const ctx = c.getContext('2d');
  let W, H, pts = [], active = false, lastFrame = 0;
  function resize(){ const s=c.parentElement; W=c.width=s.offsetWidth; H=c.height=s.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);
  // Reduced from 55 → 22 pts
  for(let i=0;i<22;i++){
    pts.push({ x:Math.random()*W, y:Math.random()*H, vx:(Math.random()-.5)*0.3, vy:(Math.random()-.5)*0.3, r:Math.random()*1.5+0.6, col: Math.random()>0.5?'58,98,184':'42,112,112' });
  }
  function draw(ts){
    if(!active){ lastFrame=0; return; }
    // Throttle to ~30fps
    if(ts - lastFrame < 33){ requestAnimationFrame(draw); return; }
    lastFrame = ts;
    ctx.clearRect(0,0,W,H);
    // O(n²) but n=22 → only 231 checks (was 1485)
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){ ctx.beginPath(); ctx.strokeStyle=`rgba(58,98,184,${0.07*(1-d/120)})`; ctx.lineWidth=0.5; ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.stroke(); }
      }
    }
    pts.forEach(p=>{ ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=`rgba(${p.col},0.25)`; ctx.fill(); p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1; });
    requestAnimationFrame(draw);
  }
  const io = new IntersectionObserver(entries=>{ active=entries[0].isIntersecting; if(active) requestAnimationFrame(draw); },{threshold:0.05});
  io.observe(c.parentElement);
})();

setTimeout(buildLines,600);
let rt; window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(buildLines,300);});

// GLOBAL SCOPE — region row activation
function activateRegion(el) {
  document.querySelectorAll('.gs-row').forEach(r => r.classList.remove('active'));
  el.classList.add('active');
}

// ═══════════════════════════════════
// COUNT-UP ANIMATION
// ═══════════════════════════════════
(function(){
  const nums = document.querySelectorAll('.scope-stat-n[data-count]');
  if(!nums.length) return;
  const countUp = el => {
    const target = parseInt(el.dataset.count);
    let cur = 0; const inc = target/80;
    const timer = setInterval(()=>{
      cur += inc;
      if(cur >= target){ el.textContent = target+(target>=40?'+':''); clearInterval(timer); }
      else el.textContent = Math.floor(cur)+'';
    }, 20);
  };
  const ob = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ nums.forEach(n=>countUp(n)); ob.disconnect(); } });
  }, {threshold:0.3});
  const strip = document.querySelector('.scope-stats-strip');
  if(strip) ob.observe(strip);
})();

// CTA TRAILS
(function(){
  const canvas = document.getElementById('cta-trails');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize(){
    canvas.width  = canvas.offsetWidth  * Math.min(window.devicePixelRatio, 2);
    canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 2);
    ctx.scale(Math.min(window.devicePixelRatio,2), Math.min(window.devicePixelRatio,2));
  }
  resize();
  window.addEventListener('resize', resize);
  const W = () => canvas.offsetWidth;
  const H = () => canvas.offsetHeight;
  const COLORS = ['rgba(91,126,197,','rgba(61,140,140,','rgba(122,155,212,','rgba(61,140,140,','rgba(196,144,42,'];
  class Trail {
    constructor(index){ this.index=index; this.reset(true); }
    reset(initial){
      const w=W(), h=H();
      const fromLeft=Math.random()>0.3;
      if(fromLeft){ this.x=initial?Math.random()*w:-50; this.y=Math.random()*h; this.vx=0.4+Math.random()*0.8; this.vy=(Math.random()-0.5)*0.4; }
      else{ this.x=Math.random()*w; this.y=initial?Math.random()*h:-50; this.vx=(Math.random()-0.5)*0.3; this.vy=0.3+Math.random()*0.7; }
      this.color=COLORS[this.index%COLORS.length]; this.alpha=0.15+Math.random()*0.25; this.width=1.2+Math.random()*2.5; this.length=120+Math.random()*220; this.history=[];
      this.freq=0.008+Math.random()*0.012; this.amp=0.15+Math.random()*0.35; this.phase=Math.random()*Math.PI*2; this.age=0;
    }
    update(){
      this.age++;
      const curve=Math.sin(this.age*this.freq+this.phase)*this.amp;
      this.x+=this.vx+(this.vy===0?0:curve); this.y+=this.vy+curve;
      this.history.push({x:this.x,y:this.y});
      if(this.history.length>this.length) this.history.shift();
      if(this.x>W()+60||this.y>H()+60||this.y<-60) this.reset(false);
    }
    draw(){
      if(this.history.length<4) return;
      const fadeIn=Math.min(1,this.age/60); const alpha=this.alpha*fadeIn;
      ctx.save(); ctx.beginPath(); ctx.moveTo(this.history[0].x,this.history[0].y);
      for(let i=1;i<this.history.length;i++){
        const t=i/this.history.length;
        if(i===1){ ctx.strokeStyle=this.color+alpha+')'; ctx.lineWidth=this.width*t; ctx.lineCap='round'; ctx.stroke(); ctx.beginPath(); ctx.moveTo(this.history[i-1].x,this.history[i-1].y); }
        ctx.lineTo(this.history[i].x,this.history[i].y);
        if(i%8===0||i===this.history.length-1){ ctx.strokeStyle=this.color+(alpha*t*1.2)+')'; ctx.lineWidth=this.width*(0.3+t*0.7); ctx.stroke(); ctx.beginPath(); ctx.moveTo(this.history[i].x,this.history[i].y); }
      }
      const head=this.history[this.history.length-1];
      const grad=ctx.createRadialGradient(head.x,head.y,0,head.x,head.y,this.width*3);
      grad.addColorStop(0,this.color+(alpha*2.5)+')'); grad.addColorStop(1,this.color+'0)');
      ctx.beginPath(); ctx.arc(head.x,head.y,this.width*2.5,0,Math.PI*2); ctx.fillStyle=grad; ctx.fill();
      ctx.restore();
    }
  }
  const trails=Array.from({length:8},(_,i)=>new Trail(i));
  let ctaVisible=false;
  const ctaSection=canvas.parentElement;
  const ctaIo=new IntersectionObserver(e=>{ctaVisible=e[0].isIntersecting; if(ctaVisible)frame();},{threshold:0.05});
  ctaIo.observe(ctaSection);
  function frame(){
    ctx.save(); ctx.globalCompositeOperation='source-over'; ctx.fillStyle='rgba(14,27,61,0.18)'; ctx.fillRect(0,0,W(),H()); ctx.restore();
    trails.forEach(t=>{t.update();t.draw();});
    if(ctaVisible) requestAnimationFrame(frame);
  }
})();
// ═══════════════════════════════════
// PAUSE ALL ON TAB HIDDEN
// ═══════════════════════════════════
document.addEventListener('visibilitychange',()=>{
  if(document.hidden){
    // Three.js cube pause
    if(typeof cubeHovered !== 'undefined') cubeHovered = false;
  }
});
