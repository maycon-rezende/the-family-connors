(() => {
  if (document.body.dataset.character !== 'alice') return;

  const viewer = document.querySelector('[data-memory-viewer]');
  const gallery = document.querySelector('[data-gallery]');
  const dots = document.querySelector('[data-memory-dots]');
  const status = document.querySelector('[data-memory-status]');
  const previous = document.querySelector('[data-memory-prev]');
  const next = document.querySelector('[data-memory-next]');
  if (!viewer || !gallery) return;

  const figures = [...gallery.querySelectorAll('figure')];
  if (!figures.length) return;

  gallery.setAttribute('aria-live', 'polite');
  let active = 0;
  let timer = null;

  const show = (index, announce = true) => {
    active = (index + figures.length) % figures.length;
    figures.forEach((figure, figureIndex) => {
      const selected = figureIndex === active;
      figure.classList.toggle('is-active', selected);
      figure.setAttribute('aria-hidden', String(!selected));
      if (!selected) figure.setAttribute('tabindex', '-1');
      else figure.removeAttribute('tabindex');
    });
    dots.querySelectorAll('button').forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === active);
      dot.setAttribute('aria-selected', String(dotIndex === active));
    });
    if (announce && status) {
      const label = figures[active].querySelector('figcaption')?.textContent || 'REGISTRO';
      status.textContent = `REGISTRO ${String(active + 1).padStart(2, '0')} // ${label}`;
    }
  };

  figures.forEach((figure, index) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Abrir memória ${index + 1}`);
    dot.addEventListener('click', () => {
      show(index);
      restart();
    });
    dots.appendChild(dot);
  });

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };
  const start = () => {
    stop();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      timer = window.setInterval(() => show(active + 1), 5200);
    }
  };
  const restart = () => start();

  previous?.addEventListener('click', () => { show(active - 1); restart(); });
  next?.addEventListener('click', () => { show(active + 1); restart(); });
  viewer.addEventListener('mouseenter', stop);
  viewer.addEventListener('mouseleave', start);
  viewer.addEventListener('focusin', stop);
  viewer.addEventListener('focusout', (event) => {
    if (!viewer.contains(event.relatedTarget)) start();
  });

  show(0, false);
  start();
})();
