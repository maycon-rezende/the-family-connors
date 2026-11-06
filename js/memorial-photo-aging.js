(() => {
  'use strict';

  const photos = [...document.querySelectorAll('[data-memorial-aging-photo]')];
  if (!photos.length || !('IntersectionObserver' in window)) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const agePhoto = (image) => {
    if (image.dataset.memorialAgingScheduled) return;
    image.dataset.memorialAgingScheduled = 'true';

    const delay = reducedMotion ? 0 : Number.parseInt(image.dataset.memorialAgingDelay || '0', 10);
    window.setTimeout(() => image.classList.add('is-monochrome'), delay);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const image = entry.target;
      observer.unobserve(image);
      image.classList.add('memorial-aging-photo');

      if (image.complete && image.naturalWidth > 0) {
        agePhoto(image);
      } else {
        image.addEventListener('load', () => agePhoto(image), { once: true });
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -6% 0px' });

  photos.forEach((image) => {
    image.classList.add('memorial-aging-photo');
    observer.observe(image);
  });
})();
