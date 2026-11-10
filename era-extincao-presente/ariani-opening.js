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
  let revealTimer = window.setTimeout(revealCopy, 30000);
  let closeTimer;

  function revealCopy() {
    if (finished || opening.classList.contains('is-revealing')) return;
    window.clearTimeout(revealTimer);
    video.pause();
    opening.classList.add('is-revealing');
    closeTimer = window.setTimeout(closeOpening, 5600);
  }

  function closeOpening() {
    if (finished) return;
    finished = true;
    window.clearTimeout(revealTimer);
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
    revealCopy();
  }

  opening.hidden = false;
  document.body.classList.add('ariani-opening-active');
  pageRegions.forEach((region) => region.setAttribute('inert', ''));
  opening.focus({ preventScroll: true });

  video.muted = true;
  video.addEventListener('ended', revealCopy, { once: true });
  video.addEventListener('error', closeOnVideoError, { once: true });
  video.addEventListener('loadedmetadata', () => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    window.clearTimeout(revealTimer);
    revealTimer = window.setTimeout(revealCopy, Math.min(video.duration * 1000 + 1500, 60000));
  }, { once: true });

  video.play().catch(revealCopy);
})();
