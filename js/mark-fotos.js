(function () {
  'use strict';
  const cards = [...document.querySelectorAll('.photo-card')],
    filters = [...document.querySelectorAll('.archive-filter')],
    count = document.getElementById('visible-count'),
    viewer = document.getElementById('viewer'),
    image = viewer.querySelector('img'),
    title = viewer.querySelector('strong'),
    close = viewer.querySelector('.viewer-close');
  function filter(group) {
    let visible = 0;
    filters.forEach((button) =>
      button.classList.toggle('is-active', button.dataset.filter === group)
    );
    cards.forEach((card) => {
      const show = group === 'all' || card.dataset.group === group;
      card.hidden = !show;
      if (show) visible++;
    });
    count.textContent = String(visible).padStart(2, '0');
    const url = new URL(location.href);
    group === 'all' ? url.searchParams.delete('set') : url.searchParams.set('set', group);
    history.replaceState({}, '', url);
  }
  filters.forEach((button) =>
    button.addEventListener('click', () => filter(button.dataset.filter))
  );
  const requested = new URLSearchParams(location.search).get('set');
  filter(['marinha', 'pessoal', 'hellsings'].includes(requested) ? requested : 'all');
  function shut() {
    viewer.classList.remove('is-open');
    viewer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  cards.forEach((card) =>
    card.addEventListener('click', () => {
      image.src = card.dataset.file;
      image.alt = card.querySelector('img').alt;
      title.textContent = card.dataset.title;
      viewer.classList.add('is-open');
      viewer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      close.focus();
    })
  );
  close.addEventListener('click', shut);
  viewer.addEventListener('click', (event) => {
    if (event.target === viewer) shut();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') shut();
  });
})();

/* O arquivo do presente usa a parede legada apenas como catálogo interno.
   A interface visível é um registro em looping, uma memória por vez. */
(() => {
  'use strict';

  const records = [...document.querySelectorAll('.photo-card')].filter(
    (card) => card.dataset.group === 'presente' && card.dataset.file.startsWith('img-presente/personagens/')
  );
  const counter = document.getElementById('visible-count');
  const carousel = document.querySelector('[data-carousel]');
  const image = document.querySelector('[data-carousel-image]');
  const code = document.querySelector('[data-carousel-code]');
  const title = document.querySelector('[data-carousel-title]');
  const status = document.querySelector('[data-carousel-status]');
  const progress = document.querySelector('[data-carousel-progress]');
  const previous = document.querySelector('[data-carousel-prev]');
  const next = document.querySelector('[data-carousel-next]');
  const open = document.querySelector('[data-carousel-open]');
  const viewer = document.getElementById('viewer');
  const viewerImage = viewer?.querySelector('img');
  const viewerTitle = viewer?.querySelector('strong');
  const viewerMeta = viewer?.querySelector('small');
  let index = 0;
  let timer = null;

  const render = () => {
    if (!carousel || !records.length) return;
    index = (index + records.length) % records.length;
    const record = records[index];
    const thumbnail = record.querySelector('img');
    image.classList.remove('is-swapping');
    void image.offsetWidth;
    image.src = record.dataset.file;
    image.alt = thumbnail.alt;
    image.classList.add('is-swapping');
    code.textContent = record.querySelector('span').textContent;
    title.textContent = record.dataset.title;
    status.textContent = `REGISTRO ${String(index + 1).padStart(2, '0')} // ATIVO`;
    progress.style.setProperty('--progress', `${((index + 1) / records.length) * 100}%`);
  };

  const start = () => {
    if (!carousel || !records.length || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    clearInterval(timer);
    timer = setInterval(() => {
      index += 1;
      render();
    }, 5200);
  };

  const openCurrent = () => {
    if (!viewer || !records.length) return;
    const record = records[index];
    const thumbnail = record.querySelector('img');
    viewerImage.src = record.dataset.file;
    viewerImage.alt = thumbnail.alt;
    viewerTitle.textContent = record.dataset.title;
    viewerMeta.textContent = `${record.querySelector('span').textContent} · ${index + 1} / ${records.length}`;
    viewer.classList.add('is-open');
    viewer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  if (counter) counter.textContent = String(records.length).padStart(2, '0');
  previous?.addEventListener('click', () => {
    index -= 1;
    render();
    start();
  });
  next?.addEventListener('click', () => {
    index += 1;
    render();
    start();
  });
  open?.addEventListener('click', openCurrent);
  render();
  start();
})();
