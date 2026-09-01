(() => {
  const carousel = document.querySelector('[data-isolde-carousel]');

  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('[data-slide]')];
  const previousButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');
  const currentLabel = carousel.querySelector('[data-carousel-current]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let currentIndex = 0;
  let autoplayId;
  let touchStartX = 0;

  const showSlide = (nextIndex) => {
    currentIndex = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      const isActive = index === currentIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
    });

    currentLabel.textContent = String(currentIndex + 1).padStart(2, '0');
  };

  const stopAutoplay = () => window.clearInterval(autoplayId);

  const startAutoplay = () => {
    stopAutoplay();
    if (!reducedMotion.matches) {
      autoplayId = window.setInterval(() => showSlide(currentIndex + 1), 5200);
    }
  };

  const move = (direction) => {
    showSlide(currentIndex + direction);
    startAutoplay();
  };

  previousButton.addEventListener('click', () => move(-1));
  nextButton.addEventListener('click', () => move(1));
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  carousel.addEventListener('focusin', stopAutoplay);
  carousel.addEventListener('focusout', startAutoplay);

  carousel.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
  }, { passive: true });

  reducedMotion.addEventListener?.('change', startAutoplay);
  showSlide(0);
  startAutoplay();
})();
