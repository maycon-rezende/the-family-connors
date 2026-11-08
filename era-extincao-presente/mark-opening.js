(() => {
  'use strict';

  const opening = document.querySelector('[data-mark-opening]');
  const video = opening?.querySelector('[data-mark-opening-video]');
  if (!opening || !video) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const pageRegions = [
    ...document.querySelectorAll(
      '.profile-nav, .profile-hero, main, .profile-footer, .recovered-device-launch, .recovered-device'
    ),
  ];
  let finished = false;
  let fallbackTimer = window.setTimeout(finishOpening, 25000);

  function finishOpening() {
    if (finished) return;
    finished = true;
    window.clearTimeout(fallbackTimer);
    video.pause();
    opening.classList.add('is-leaving');
    document.body.classList.remove('mark-opening-active');
    pageRegions.forEach((region) => region.removeAttribute('inert'));
    document.removeEventListener('keydown', handleKeydown);
    window.setTimeout(() => {
      opening.hidden = true;
      opening.classList.remove('is-leaving');
      document.querySelector('.profile-nav a')?.focus({ preventScroll: true });
    }, 900);
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') finishOpening();
  }

  opening.hidden = false;
  document.body.classList.add('mark-opening-active');
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
