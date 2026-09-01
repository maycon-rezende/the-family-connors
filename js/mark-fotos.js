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
