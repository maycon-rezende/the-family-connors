(() => {
  const buttons = document.querySelectorAll('[data-open-record]');
  buttons.forEach((button) => {
    const dialog = document.querySelector(`[data-record="${button.dataset.openRecord}"]`);
    if (!dialog) return;
    button.addEventListener('click', () => {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    });
  });
  document.querySelectorAll('[data-close-record]').forEach((button) => {
    button.addEventListener('click', () => button.closest('dialog')?.close());
  });
  document.querySelectorAll('.britney-record').forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  });
})();
