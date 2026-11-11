(() => {
  'use strict';

  const documentRoot = document.documentElement;
  const opening = document.querySelector('[data-britney-opening]');
  const video = opening?.querySelector('[data-britney-opening-video]');

  const removePendingState = () => {
    documentRoot.classList.remove('britney-opening-pending');
    if (opening) opening.hidden = true;
  };

  if (!opening || !video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    removePendingState();
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
    closeTimer = window.setTimeout(closeOpening, 5200);
  }

  function closeOpening() {
    if (finished) return;
    finished = true;
    window.clearTimeout(revealTimer);
    window.clearTimeout(closeTimer);
    video.pause();
    opening.classList.add('is-leaving');
    document.body.classList.remove('britney-opening-active');
    pageRegions.forEach((region) => region.removeAttribute('inert'));
    window.setTimeout(() => {
      opening.hidden = true;
      opening.classList.remove('is-leaving');
      documentRoot.classList.remove('britney-opening-pending');
      document.querySelector('.profile-nav a')?.focus({ preventScroll: true });
    }, 900);
  }

  opening.hidden = false;
  document.body.classList.add('britney-opening-active');
  pageRegions.forEach((region) => region.setAttribute('inert', ''));
  opening.focus({ preventScroll: true });

  video.muted = true;
  video.addEventListener('ended', revealCopy, { once: true });
  video.addEventListener('error', revealCopy, { once: true });
  video.addEventListener('loadedmetadata', () => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    window.clearTimeout(revealTimer);
    revealTimer = window.setTimeout(revealCopy, Math.min(video.duration * 1000 + 2200, 45000));
  }, { once: true });

  video.play().catch(revealCopy);
})();
