(() => {
  const records = [...document.querySelectorAll('[data-lana-record]')];
  const dialog = document.querySelector('.lana-lightbox');
  if (!records.length || !dialog || typeof dialog.showModal !== 'function') return;

  const enlargedImage = dialog.querySelector('.lana-lightbox__stage img');
  const caption = dialog.querySelector('.lana-lightbox__caption');
  const count = dialog.querySelector('.lana-lightbox__count');
  let activeIndex = 0;
  let opener = null;

  const showRecord = (index) => {
    activeIndex = (index + records.length) % records.length;
    const record = records[activeIndex];
    enlargedImage.src = record.getAttribute('href');
    enlargedImage.alt = record.querySelector('img')?.alt || 'Registro de Lana';
    caption.textContent = record.closest('figure')?.querySelector('figcaption strong')?.textContent || '';
    count.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(records.length).padStart(2, '0')}`;
  };

  records.forEach((record, index) => {
    record.addEventListener('click', (event) => {
      event.preventDefault();
      opener = record;
      showRecord(index);
      if (!dialog.open) dialog.showModal();
    });
  });

  dialog.querySelector('[data-lana-prev]').addEventListener('click', () => showRecord(activeIndex - 1));
  dialog.querySelector('[data-lana-next]').addEventListener('click', () => showRecord(activeIndex + 1));
  dialog.querySelector('[data-lana-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus({ preventScroll: true }));
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showRecord(activeIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showRecord(activeIndex + 1);
    }
  });
})();
