(function () {
  'use strict';
  const cards = Array.from(document.querySelectorAll('.photo-card'));
  const filters = Array.from(document.querySelectorAll('.archive-filter'));
  const count = document.getElementById('visible-count');
  const viewer = document.getElementById('photo-viewer');
  const image = viewer.querySelector('img');
  const title = viewer.querySelector('strong');
  const close = viewer.querySelector('.viewer-close');

  function applyFilter(group) {
    let visible = 0;
    filters.forEach((button) =>
      button.classList.toggle('is-active', button.dataset.filter === group)
    );
    cards.forEach((card) => {
      const show = group === 'all' || card.dataset.group === group;
      card.hidden = !show;
      if (show) visible += 1;
    });
    count.textContent = String(visible).padStart(2, '0');
    const url = new URL(location.href);
    group === 'all' ? url.searchParams.delete('set') : url.searchParams.set('set', group);
    history.replaceState({}, '', url);
  }
  filters.forEach((button) =>
    button.addEventListener('click', () => applyFilter(button.dataset.filter))
  );
  const requested = new URLSearchParams(location.search).get('set');
  applyFilter(['fbi', 'interpol', 'hellsings'].includes(requested) ? requested : 'all');

  function closeViewer() {
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
  close.addEventListener('click', closeViewer);
  viewer.addEventListener('click', (event) => {
    if (event.target === viewer) closeViewer();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeViewer();
  });
})();
