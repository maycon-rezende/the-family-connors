(() => {
  'use strict';

  const documentRoot = document.documentElement;
  const opening = document.querySelector('[data-ariani-opening]');
  const video = opening?.querySelector('[data-ariani-opening-video]');
  if (!opening || !video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    documentRoot.classList.remove('ariani-opening-pending');
    return;
  }

  const pageRegions = [...document.querySelectorAll('.profile-nav, .profile-hero, main, .profile-footer')];
  let finished = false;
  let closeTimer = window.setTimeout(closeOpening, 30000);

  function closeOpening() {
    if (finished) return;
    finished = true;
    window.clearTimeout(closeTimer);
    video.pause();
    opening.classList.add('is-leaving');
    document.body.classList.remove('ariani-opening-active');
    pageRegions.forEach((region) => region.removeAttribute('inert'));
    window.setTimeout(() => {
      opening.hidden = true;
      opening.classList.remove('is-leaving');
      documentRoot.classList.remove('ariani-opening-pending');
      document.querySelector('.profile-nav a')?.focus({ preventScroll: true });
    }, 900);
  }

  function closeOnVideoError() {
    closeOpening();
  }

  opening.hidden = false;
  document.body.classList.add('ariani-opening-active');
  pageRegions.forEach((region) => region.setAttribute('inert', ''));
  opening.focus({ preventScroll: true });

  video.muted = true;
  video.addEventListener('ended', closeOpening, { once: true });
  video.addEventListener('error', closeOnVideoError, { once: true });
  video.addEventListener('loadedmetadata', () => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(closeOpening, Math.min(video.duration * 1000 + 2200, 60000));
  }, { once: true });

  video.play().catch(closeOpening);
})();
