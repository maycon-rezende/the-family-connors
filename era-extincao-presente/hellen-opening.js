(() => {
  'use strict';

  const root = document.documentElement;
  const opening = document.querySelector('[data-hellen-opening]');
  const video = opening?.querySelector('[data-hellen-opening-video]');
  const pageRegions = [...document.querySelectorAll('.hellen-grid, .hellen-nav, main, .hellen-footer')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const clearOpening = () => {
    root.classList.remove('hellen-opening-pending');
    document.body.classList.remove('hellen-opening-active');
    opening?.setAttribute('hidden', '');
    pageRegions.forEach((region) => region.removeAttribute('inert'));
  };

  if (!opening || !video || reducedMotion) {
    clearOpening();
    return;
  }

  let finished = false;
  let revealTimer;
  let closeTimer;

  function closeOpening() {
    if (finished) return;
    finished = true;
    window.clearTimeout(revealTimer);
    window.clearTimeout(closeTimer);
    video.pause();
    opening.classList.add('is-leaving');
    document.body.classList.remove('hellen-opening-active');
    pageRegions.forEach((region) => region.removeAttribute('inert'));

    window.setTimeout(() => {
      opening.hidden = true;
      opening.classList.remove('is-leaving', 'is-revealing');
      root.classList.remove('hellen-opening-pending');
    }, 900);
  }

  function revealCopy() {
    if (finished || opening.classList.contains('is-revealing')) return;
    window.clearTimeout(revealTimer);
    video.pause();
    opening.classList.add('is-revealing');
    closeTimer = window.setTimeout(closeOpening, 4700);
  }

  root.classList.add('hellen-opening-pending');
  document.body.classList.add('hellen-opening-active');
  pageRegions.forEach((region) => region.setAttribute('inert', ''));
  opening.hidden = false;
  opening.focus({ preventScroll: true });

  video.muted = true;
  revealTimer = window.setTimeout(revealCopy, 30000);

  video.addEventListener('loadedmetadata', () => {
    if (!Number.isFinite(video.duration) || video.duration <= 0) return;
    window.clearTimeout(revealTimer);
    revealTimer = window.setTimeout(revealCopy, Math.min(video.duration * 1000 + 2200, 45000));
  }, { once: true });

  video.addEventListener('ended', revealCopy, { once: true });
  video.addEventListener('error', revealCopy, { once: true });
  video.play().catch(revealCopy);
})();
