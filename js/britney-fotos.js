(() => {
  const dialog = document.querySelector('.lightbox');
  const image = dialog.querySelector('img');
  const label = dialog.querySelector('span');
  document.querySelectorAll('.photo-grid button').forEach((button, index) => {
    button.addEventListener('click', () => {
      image.src = button.dataset.full;
      label.textContent = `Arquivo Britney · Registro ${String(index + 1).padStart(2, '0')}`;
      dialog.showModal();
    });
  });
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dialog.open) dialog.close();
  });
})();
