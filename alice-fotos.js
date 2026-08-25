(() => {
  'use strict';
  const cards = [...document.querySelectorAll('.photo-card')];
  const filters = [...document.querySelectorAll('.archive-filter')];
  const count = document.getElementById('visible-count');
  const status = document.getElementById('page-status');
  const previous = document.getElementById('page-prev');
  const next = document.getElementById('page-next');
  const viewer = document.getElementById('photo-viewer');
  const viewerImage = viewer.querySelector('img');
  const viewerTitle = viewer.querySelector('strong');
  const viewerMeta = viewer.querySelector('small');
  const close = viewer.querySelector('.viewer-close');
  const pageSize = matchMedia('(max-width: 560px)').matches ? 4 : 6;
  let group = 'all';
  let page = 0;
  let visibleCards = cards;
  let viewerIndex = 0;

  const pageCount = () => Math.max(1, Math.ceil(visibleCards.length / pageSize));
  function render() {
    const start = page * pageSize;
    const end = Math.min(start + pageSize, visibleCards.length);
    cards.forEach(card => { card.hidden = true; card.classList.remove('is-revealed'); });
    visibleCards.slice(start, end).forEach((card, index) => {
      card.hidden = false;
      card.style.setProperty('--reveal-delay', `${index * 75}ms`);
      requestAnimationFrame(() => card.classList.add('is-revealed'));
    });
    count.textContent = String(visibleCards.length).padStart(2, '0');
    status.textContent = visibleCards.length ? `Registros ${String(start + 1).padStart(2,'0')}–${String(end).padStart(2,'0')} de ${String(visibleCards.length).padStart(2,'0')}` : 'Nenhum registro';
    previous.disabled = page === 0;
    next.disabled = page >= pageCount() - 1;
  }

  function filter(nextGroup) {
    group = nextGroup;
    page = 0;
    visibleCards = cards.filter(card => group === 'all' || card.dataset.group === group);
    filters.forEach(button => button.classList.toggle('is-active', button.dataset.filter === group));
    const url = new URL(location.href);
    group === 'all' ? url.searchParams.delete('set') : url.searchParams.set('set', group);
    history.replaceState({}, '', url);
    render();
  }

  function changePage(direction) {
    page = Math.max(0, Math.min(pageCount() - 1, page + direction));
    render();
    document.querySelector('.archive-toolbar').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function open(card) {
    viewerIndex = visibleCards.indexOf(card);
    const selected = visibleCards[viewerIndex];
    viewerImage.src = selected.dataset.file;
    viewerImage.alt = selected.querySelector('img').alt;
    viewerTitle.textContent = selected.dataset.title;
    viewerMeta.textContent = `${selected.querySelector('span').textContent} · ${viewerIndex + 1} / ${visibleCards.length}`;
    viewer.classList.add('is-open');
    viewer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    close.focus();
  }

  function browse(direction) {
    viewerIndex = (viewerIndex + direction + visibleCards.length) % visibleCards.length;
    open(visibleCards[viewerIndex]);
  }

  function shut() { viewer.classList.remove('is-open'); viewer.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
  filters.forEach(button => button.addEventListener('click', () => filter(button.dataset.filter)));
  cards.forEach(card => card.addEventListener('click', () => open(card)));
  previous.addEventListener('click', () => changePage(-1));
  next.addEventListener('click', () => changePage(1));
  close.addEventListener('click', shut);
  viewer.addEventListener('click', event => { if (event.target === viewer) shut(); });
  document.addEventListener('keydown', event => {
    if (!viewer.classList.contains('is-open')) return;
    if (event.key === 'Escape') shut();
    if (event.key === 'ArrowLeft') browse(-1);
    if (event.key === 'ArrowRight') browse(1);
  });
  const requested = new URLSearchParams(location.search).get('set');
  filter(['medica', 'pessoal', 'presente'].includes(requested) ? requested : 'all');
})();
