(() => {
  'use strict';

  const opening = document.querySelector('[data-naomi-opening]');
  const video = opening?.querySelector('[data-naomi-opening-video]');
  if (!opening || !video) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const pageRegions = [...document.querySelectorAll('.naomi-nav, main, .naomi-footer')];
  let finished = false;
  let fallbackTimer = window.setTimeout(finishOpening, 20000);

  function finishOpening() {
    if (finished) return;
    finished = true;
    window.clearTimeout(fallbackTimer);
    video.pause();
    opening.classList.add('is-leaving');
    document.body.classList.remove('naomi-opening-active');
    pageRegions.forEach((region) => region.removeAttribute('inert'));
    document.removeEventListener('keydown', handleKeydown);
    window.setTimeout(() => {
      opening.hidden = true;
      opening.classList.remove('is-leaving');
      document.querySelector('.naomi-nav a')?.focus({ preventScroll: true });
    }, 900);
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') finishOpening();
  }

  opening.hidden = false;
  document.body.classList.add('naomi-opening-active');
  pageRegions.forEach((region) => region.setAttribute('inert', ''));
  document.addEventListener('keydown', handleKeydown);
  video.addEventListener('ended', finishOpening, { once: true });
  video.addEventListener('error', finishOpening, { once: true });
  video.addEventListener(
    'loadedmetadata',
    () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      window.clearTimeout(fallbackTimer);
      fallbackTimer = window.setTimeout(finishOpening, Math.min(video.duration * 1000 + 4000, 30000));
    },
    { once: true }
  );
  opening.focus({ preventScroll: true });

  video.play().catch(finishOpening);
})();
