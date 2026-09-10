(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const revealNodes = document.querySelectorAll('[data-sally-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), { threshold: .1 });
    revealNodes.forEach((node) => observer.observe(node));
  } else revealNodes.forEach((node) => node.classList.add('is-visible'));

  const slides = [...document.querySelectorAll('[data-sally-slide]')];
  const carousel = document.querySelector('[data-sally-carousel]');
  const current = document.querySelector('[data-sally-current]');
  let index = 0;
  let timer;
  let touchX = 0;
  const show = (value) => {
    index = (value + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = index === slideIndex;
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
  document.querySelector('[data-sally-prev]')?.addEventListener('click', () => move(-1));
  document.querySelector('[data-sally-next]')?.addEventListener('click', () => move(1));
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

  const videoShell = document.querySelector('[data-sally-video]');
  const video = videoShell?.querySelector('video');
  const videoState = videoShell?.querySelector('[data-sally-video-state]');
  video?.addEventListener('play', () => {
    stop(); videoShell.classList.add('is-playing');
    if (videoState) videoState.textContent = 'GRAVANDO';
  });
  video?.addEventListener('pause', () => {
    videoShell.classList.remove('is-playing');
    if (videoState) videoState.textContent = 'PAUSADO';
    play();
  });
  video?.addEventListener('ended', () => {
    if (videoState) videoState.textContent = 'ARQUIVADO';
    play();
  });

  const cursor = document.querySelector('.sally-cursor');
  const cursorLabel = document.querySelector('[data-sally-cursor-label]');
  if (!cursor) return;
  window.addEventListener('pointermove', (event) => {
    if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    document.documentElement.classList.add('has-sally-cursor');
    cursor.classList.add('is-visible');
    cursor.style.transform = `translate3d(${event.clientX - 22}px,${event.clientY - 22}px,0)`;
    const interactive = event.target.closest('a,button,video');
    const evidence = event.target.closest('.sally-slide,.sally-case-grid article');
    cursor.classList.toggle('is-target', Boolean(interactive || evidence));
    if (cursorLabel) cursorLabel.textContent = interactive ? 'ACESSAR' : evidence ? 'IDENTIFICAR' : 'PROCURAR';
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));
})();
