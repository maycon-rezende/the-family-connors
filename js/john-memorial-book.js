(() => {
  'use strict';

  const book = document.querySelector('[data-john-book]');
  if (!book) return;

  const stack = book.querySelector('[data-john-book-pages]');
  const pages = [...book.querySelectorAll('[data-john-book-page]')];
  const previous = book.querySelector('[data-john-book-previous]');
  const next = book.querySelector('[data-john-book-next]');
  const counter = book.querySelector('[data-john-book-counter]');
  const progress = book.querySelector('[data-john-book-progress]');
  const fill = book.querySelector('[data-john-book-progress-fill]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!stack || !pages.length || !previous || !next || !counter || !progress || !fill) return;

  let current = 0;
  let turning = false;
  let pointerStart = null;

  const number = (value) => String(value).padStart(2, '0');

  function updateControls() {
    previous.disabled = turning || current === 0;
    next.disabled = turning || current === pages.length - 1;
    const heading = pages[current].querySelector('.john-book-page__body h4, .john-book-page__cover-copy h4');
    const pageTitle = current === 0 ? 'O Último Abraço' : heading?.textContent.trim() || 'O Último Abraço';
    counter.textContent = current === 0
      ? `CAPA // ${number(current + 1)} / ${number(pages.length)} // ${pageTitle}`
      : `PÁGINA ${number(current + 1)} / ${number(pages.length)} // ${pageTitle}`;
    progress.setAttribute('aria-valuenow', String(current + 1));
    fill.style.width = `${((current + 1) / pages.length) * 100}%`;
  }

  function goTo(target) {
    if (turning || target < 0 || target >= pages.length || target === current) return;

    const direction = target > current ? 'next' : 'previous';
    const oldPage = pages[current];
    const newPage = pages[target];
    turning = true;
    updateControls();

    if (reducedMotion) {
      oldPage.hidden = true;
      newPage.hidden = false;
      current = target;
      turning = false;
      updateControls();
      return;
    }

    oldPage.dataset.flip = direction;
    oldPage.classList.add('is-turning-away');

    window.setTimeout(() => {
      oldPage.classList.remove('is-turning-away');
      oldPage.removeAttribute('data-flip');
      oldPage.hidden = true;

      newPage.hidden = false;
      newPage.dataset.flip = direction;
      newPage.classList.add('is-turning-in');
      current = target;
      updateControls();

      window.setTimeout(() => {
        newPage.classList.remove('is-turning-in');
        newPage.removeAttribute('data-flip');
        turning = false;
        updateControls();
      }, 440);
    }, 190);
  }

  pages.forEach((page, index) => {
    page.hidden = index !== current;
  });
  stack.classList.add('is-enhanced');
  book.dataset.enhanced = 'true';

  previous.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));

  book.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(current + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(current - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      goTo(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      goTo(pages.length - 1);
    }
  });

  book.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') pointerStart = event.clientX;
  }, { passive: true });

  book.addEventListener('pointerup', (event) => {
    if (pointerStart === null) return;
    const distance = event.clientX - pointerStart;
    pointerStart = null;
    if (distance < -55) goTo(current + 1);
    else if (distance > 55) goTo(current - 1);
  }, { passive: true });

  updateControls();
})();
