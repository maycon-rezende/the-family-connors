(() => {
  'use strict';

  const opening = document.querySelector('[data-bobby-opening]');
  const video = opening?.querySelector('[data-bobby-opening-video]');
  if (!opening || !video) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const pageRegions = [
    ...document.querySelectorAll('.bobby-nav, .bobby-page main, .bobby-footer'),
  ];
  let finished = false;
  let revealed = false;
  let revealTimer;
  let fallbackTimer = window.setTimeout(revealName, 35000);

  function finishOpening() {
    if (finished) return;
    finished = true;
    window.clearTimeout(revealTimer);
    window.clearTimeout(fallbackTimer);
    video.pause();
    opening.classList.add('is-leaving');
    document.body.classList.remove('bobby-opening-active');
    pageRegions.forEach((region) => region.removeAttribute('inert'));
    window.setTimeout(() => {
      opening.hidden = true;
      opening.classList.remove('is-leaving', 'is-revealing');
      document.querySelector('.bobby-nav a')?.focus({ preventScroll: true });
    }, 900);
  }

  function revealName() {
    if (finished || revealed) return;
    revealed = true;
    window.clearTimeout(fallbackTimer);
    video.pause();
    opening.classList.add('is-revealing');
    revealTimer = window.setTimeout(finishOpening, 3300);
  }

  opening.hidden = false;
  document.body.classList.add('bobby-opening-active');
  pageRegions.forEach((region) => region.setAttribute('inert', ''));
  opening.focus({ preventScroll: true });

  video.muted = true;
  video.addEventListener('ended', revealName, { once: true });
  video.addEventListener('error', revealName, { once: true });
  video.addEventListener(
    'loadedmetadata',
    () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      window.clearTimeout(fallbackTimer);
      fallbackTimer = window.setTimeout(revealName, video.duration * 1000 + 8000);
    },
    { once: true }
  );

  video.play().catch(revealName);
})();
