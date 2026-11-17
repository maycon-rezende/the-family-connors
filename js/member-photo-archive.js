(() => {
  const root = document.querySelector('[data-member-archive]');
  if (!root) return;
  const buttons = Array.from(root.querySelectorAll('[data-member-photo]'));
  const dialog = root.querySelector('[data-member-lightbox]');
  if (!buttons.length || !dialog) return;
  const image = dialog.querySelector('[data-member-lightbox-image]');
  const caption = dialog.querySelector('[data-member-lightbox-caption]');
  const count = dialog.querySelector('[data-member-lightbox-count]');
  let current = 0;
  const show = index => {
    current = (index + buttons.length) % buttons.length;
    const button = buttons[current];
    image.src = button.dataset.src;
    image.alt = button.querySelector('img')?.alt || button.dataset.caption || '';
    caption.textContent = button.dataset.caption || '';
    count.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(buttons.length).padStart(2, '0');
  };
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    show(index);
    if (!dialog.open) dialog.showModal();
  }));
  dialog.querySelector('[data-member-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-member-prev]').addEventListener('click', () => show(current - 1));
  dialog.querySelector('[data-member-next]').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
})();
