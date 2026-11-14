(() => {
  'use strict';

  const opening = document.querySelector('[data-luke-opening]');
  const video = opening?.querySelector('[data-luke-opening-video]');
  if (!opening || !video) return;

  const pageRegions = [...document.querySelectorAll('.luke-nav, main, .luke-footer')];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let finished = false;
  let revealed = false;
  let revealTimer = window.setTimeout(revealCopy, 25000);
  let closeTimer;

  function closeOpening() {
    if (finished) return;
    finished = true;
    window.clearTimeout(revealTimer);
    window.clearTimeout(closeTimer);
    video.pause();
    opening.classList.add('is-leaving');
    document.body.classList.remove('luke-opening-active');
    pageRegions.forEach((region) => region.removeAttribute('inert'));
    document.removeEventListener('keydown', handleKeydown);

    window.setTimeout(() => {
      opening.hidden = true;
      opening.classList.remove('is-leaving', 'is-revealing');
      document.querySelector('.luke-nav a')?.focus({ preventScroll: true });
    }, 900);
  }

  function revealCopy() {
    if (finished || revealed) return;
    revealed = true;
    window.clearTimeout(revealTimer);
    video.pause();
    opening.classList.add('is-revealing');
    closeTimer = window.setTimeout(closeOpening, 4700);
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') closeOpening();
  }

  opening.hidden = false;
  opening.focus({ preventScroll: true });
  document.body.classList.add('luke-opening-active');
  pageRegions.forEach((region) => region.setAttribute('inert', ''));
  document.addEventListener('keydown', handleKeydown);

  video.muted = true;
  video.addEventListener('ended', revealCopy, { once: true });
  video.addEventListener('error', revealCopy, { once: true });
  video.addEventListener(
    'loadedmetadata',
    () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      window.clearTimeout(revealTimer);
      revealTimer = window.setTimeout(revealCopy, Math.min(video.duration * 1000 + 3500, 30000));
    },
    { once: true }
  );

  video.play().catch(revealCopy);
})();
