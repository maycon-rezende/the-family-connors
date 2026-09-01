(() => {
  const carousel = document.querySelector('[data-diana-carousel]');
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('[data-diana-slide]')];
  const previous = carousel.querySelector('[data-diana-prev]');
  const next = carousel.querySelector('[data-diana-next]');
  const current = carousel.querySelector('[data-diana-current]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let timer;
  let touchStart = 0;

  const show = (newIndex) => {
    index = (newIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    current.textContent = String(index + 1).padStart(2, '0');
  };

  const stop = () => window.clearInterval(timer);
  const play = () => {
    stop();
    if (!reducedMotion.matches) timer = window.setInterval(() => show(index + 1), 5600);
  };
  const move = (direction) => {
    show(index + direction);
    play();
  };

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', play);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', play);
  carousel.addEventListener('touchstart', (event) => {
    touchStart = event.changedTouches[0].clientX;
  }, { passive: true });
  carousel.addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
  }, { passive: true });
  reducedMotion.addEventListener?.('change', play);

  show(0);
  play();
})();
