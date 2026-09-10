(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const revealNodes = document.querySelectorAll('[data-mary-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), { threshold: .1 });
    revealNodes.forEach((node) => observer.observe(node));
  } else revealNodes.forEach((node) => node.classList.add('is-visible'));

  const slides = [...document.querySelectorAll('[data-mary-slide]')];
  const carousel = document.querySelector('[data-mary-carousel]');
  const current = document.querySelector('[data-mary-current]');
  let index = 0;
  let timer;
  let touchX = 0;
  const show = (value) => {
    index = (value + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    if (current) current.textContent = String(index + 1).padStart(2, '0');
  };
  const stop = () => clearInterval(timer);
  const play = () => {
    stop();
    if (!reduced.matches) timer = setInterval(() => show(index + 1), 5400);
  };
  const move = (step) => { show(index + step); play(); };
  document.querySelector('[data-mary-prev]')?.addEventListener('click', () => move(-1));
  document.querySelector('[data-mary-next]')?.addEventListener('click', () => move(1));
  carousel?.addEventListener('mouseenter', stop);
  carousel?.addEventListener('mouseleave', play);
  carousel?.addEventListener('focusin', stop);
  carousel?.addEventListener('focusout', play);
  carousel?.addEventListener('touchstart', (event) => { touchX = event.changedTouches[0].clientX; }, { passive: true });
  carousel?.addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].clientX - touchX;
    if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
  }, { passive: true });
  show(0);
  play();

  const shell = document.querySelector('[data-mary-video]');
  const video = shell?.querySelector('video');
  const videoState = shell?.querySelector('[data-mary-video-state]');
  video?.addEventListener('play', () => {
    stop(); shell.classList.add('is-playing');
    if (videoState) videoState.textContent = 'TRANSMITINDO';
  });
  video?.addEventListener('pause', () => {
    shell.classList.remove('is-playing');
    if (videoState) videoState.textContent = 'PAUSADO';
    play();
  });
  video?.addEventListener('ended', () => {
    if (videoState) videoState.textContent = 'ARQUIVADO';
    play();
  });

  const cursor = document.querySelector('.mary-cursor');
  const cursorLabel = document.querySelector('[data-mary-cursor-label]');
  if (!cursor) return;
  addEventListener('pointermove', (event) => {
    if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    document.documentElement.classList.add('has-mary-cursor');
    cursor.classList.add('is-visible');
    cursor.style.transform = `translate3d(${event.clientX - 22}px,${event.clientY - 22}px,0)`;
    const interactive = event.target.closest('a,button,video');
    const route = event.target.closest('.mary-protocol li,.mary-legacy-grid article,.mary-slide');
    cursor.classList.toggle('is-target', Boolean(interactive || route));
    if (cursorLabel) cursorLabel.textContent = interactive ? 'ACESSAR' : route ? 'ANALISAR' : 'DIAGNOSTICAR';
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));
})();
