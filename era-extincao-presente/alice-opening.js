(() => {
  'use strict';

  const documentRoot = document.documentElement;
  const opening = document.querySelector('[data-alice-opening]');
  if (!opening) {
    documentRoot.classList.remove('alice-opening-pending');
    return;
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    documentRoot.classList.remove('alice-opening-pending');
    return;
  }

  const video = opening.querySelector('[data-alice-opening-video]');
  if (!video) {
    documentRoot.classList.remove('alice-opening-pending');
    return;
  }

  const pageRegions = [...document.querySelectorAll('.profile-nav, .profile-hero, main, .profile-footer')];
  let finished = false;
  let closeTimer = window.setTimeout(closeOpening, 16000);

  function closeOpening() {
    if (finished) return;
    finished = true;
    window.clearTimeout(closeTimer);
    video.pause();
    opening.classList.add('is-leaving');
    document.body.classList.remove('alice-opening-active');
    pageRegions.forEach((region) => region.removeAttribute('inert'));
    document.removeEventListener('keydown', handleKeydown);
    window.setTimeout(() => {
      opening.hidden = true;
      opening.classList.remove('is-leaving');
      documentRoot.classList.remove('alice-opening-pending');
      document.querySelector('.profile-nav a')?.focus({ preventScroll: true });
    }, 900);
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') closeOpening();
  }

  function handleVideoError() {
    closeOpening();
  }

  opening.hidden = false;
  document.body.classList.add('alice-opening-active');
  pageRegions.forEach((region) => region.setAttribute('inert', ''));
  opening.focus({ preventScroll: true });
  document.addEventListener('keydown', handleKeydown);

  video.muted = true;
  video.addEventListener('ended', closeOpening, { once: true });
  video.addEventListener('error', handleVideoError, { once: true });
  video.addEventListener('loadedmetadata', () => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(closeOpening, Math.min(video.duration * 1000 + 1800, 30000));
  }, { once: true });

  video.play().catch(closeOpening);
})();
