(() => {
  'use strict';

  const opening = document.querySelector('[data-alice-opening]');
  if (!opening) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const pageRegions = [...document.querySelectorAll('.profile-nav, main, .profile-footer')];
  let finished = false;
  let closeTimer = window.setTimeout(closeOpening, 9000);

  function closeOpening() {
    if (finished) return;
    finished = true;
    window.clearTimeout(closeTimer);
    opening.classList.add('is-leaving');
    document.body.classList.remove('alice-opening-active');
    pageRegions.forEach((region) => region.removeAttribute('inert'));
    document.removeEventListener('keydown', handleKeydown);
    window.setTimeout(() => {
      opening.hidden = true;
      opening.classList.remove('is-leaving');
      document.querySelector('.profile-nav a')?.focus({ preventScroll: true });
    }, 900);
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') closeOpening();
  }

  opening.hidden = false;
  document.body.classList.add('alice-opening-active');
  pageRegions.forEach((region) => region.setAttribute('inert', ''));
  opening.focus({ preventScroll: true });
  document.addEventListener('keydown', handleKeydown);
})();
