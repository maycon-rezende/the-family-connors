(() => {
  'use strict';
  document.documentElement.classList.add('dimitri-ready');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = [...document.querySelectorAll('[data-dimitri-reveal]')];
  if (reducedMotion || !('IntersectionObserver' in window)) targets.forEach((target) => target.classList.add('is-visible'));
  else {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), { threshold: .12, rootMargin: '0px 0px -6%' });
    targets.forEach((target) => observer.observe(target));
  }
  const channels = [
    { label: 'ПАМЯТЬ // FAMÍLIA', copy: 'Durante o apocalipse, Dimitri perdeu a esposa e a filha mais nova. Uma fotografia preserva as quatro pessoas que um dia couberam no mesmo retrato.' },
    { label: 'АНЯ // 35 ANOS', copy: 'Anya negocia, avalia mercadorias e explora ruínas. Dimitri permanece ao lado dela e aprende a confiar nas escolhas da filha adulta.' },
    { label: 'КГБ // PASSADO', copy: 'Dimitri foi agente da KGB antes do Dia D. O arquivo não revela sua função na agência nem como deixou o serviço.' },
  ];
  const label = document.querySelector('[data-dimitri-channel-label]');
  const copy = document.querySelector('[data-dimitri-channel-copy]');
  const buttons = [...document.querySelectorAll('[data-dimitri-channel]')];
  buttons.forEach((button) => button.addEventListener('click', () => {
    const channel = channels[Number(button.dataset.dimitriChannel)];
    if (!channel || !label || !copy) return;
    label.textContent = channel.label;
    copy.textContent = channel.copy;
    buttons.forEach((item) => item.classList.toggle('is-active', item === button));
  }));

  const canvas = document.querySelector('[data-dimitri-particles]');
  const context = canvas?.getContext('2d', { alpha: true });
  if (!canvas || !context) return;

  const reducedAtmosphere = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let width = 0;
  let height = 0;
  let particles = [];
  let frame = 0;
  const random = (min, max) => min + Math.random() * (max - min);

  function resizeAtmosphere() {
    cancelAnimationFrame(frame);
    frame = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(54, Math.max(20, Math.round(width / 28)));
    particles = Array.from({ length: count }, () => ({
      x: random(0, width),
      y: random(0, height),
      radius: random(.45, 1.65),
      speedX: random(-.12, .18),
      speedY: random(.12, .46),
      alpha: random(.12, .38),
      tint: Math.random() > .78 ? '189,90,80' : '190,211,213',
    }));
    drawAtmosphere();
  }

  function drawAtmosphere() {
    context.clearRect(0, 0, width, height);
    for (const mote of particles) {
      context.beginPath();
      context.fillStyle = `rgba(${mote.tint},${mote.alpha})`;
      context.shadowBlur = mote.radius > 1.15 ? 7 : 3;
      context.shadowColor = `rgba(${mote.tint},${mote.alpha * .72})`;
      context.ellipse(mote.x, mote.y, mote.radius * 1.8, mote.radius, -.35, 0, Math.PI * 2);
      context.fill();
      if (!reducedAtmosphere && !document.hidden) {
        mote.x += mote.speedX;
        mote.y += mote.speedY;
        if (mote.y > height + 5) { mote.y = -5; mote.x = random(0, width); }
        if (mote.x < -5) mote.x = width + 5;
        if (mote.x > width + 5) mote.x = -5;
      }
    }
    context.shadowBlur = 0;
    if (!reducedAtmosphere && !document.hidden) frame = requestAnimationFrame(drawAtmosphere);
  }

  resizeAtmosphere();
  window.addEventListener('resize', resizeAtmosphere, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(frame);
    else if (!reducedAtmosphere) frame = requestAnimationFrame(drawAtmosphere);
  });
})();
