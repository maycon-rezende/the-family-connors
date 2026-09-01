(() => {
  const items = [...document.querySelectorAll('[data-src]')],
    d = document.querySelector('dialog'),
    img = d.querySelector('.stage img'),
    title = d.querySelector('.stage p'),
    count = d.querySelector('.top span'),
    bar = d.querySelector('.progress i');
  let current = 0;
  function show(n) {
    current = (n + items.length) % items.length;
    const x = items[current];
    img.src = x.dataset.src;
    title.textContent = x.dataset.title;
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    bar.style.transform = `scaleX(${current + 1})`;
    bar.style.transformOrigin = 'left';
  }
  items.forEach(
    (x, i) =>
      (x.onclick = () => {
        show(i);
        d.open || d.showModal();
      })
  );
  d.querySelector('.close').onclick = () => d.close();
  d.querySelector('.prev').onclick = () => show(current - 1);
  d.querySelector('.next').onclick = () => show(current + 1);
  document.addEventListener('keydown', (e) => {
    if (!d.open) return;
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
  let start = 0;
  d.addEventListener('touchstart', (e) => (start = e.changedTouches[0].clientX), { passive: true });
  d.addEventListener(
    'touchend',
    (e) => {
      const x = e.changedTouches[0].clientX - start;
      if (Math.abs(x) > 55) show(current + (x < 0 ? 1 : -1));
    },
    { passive: true }
  );
})();
