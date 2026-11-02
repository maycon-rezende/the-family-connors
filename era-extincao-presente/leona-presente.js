(() => {
  const page = document.body;
  const cursor = document.querySelector('.leona-cursor');
  const canHover = matchMedia('(pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (cursor && canHover) {
    page.classList.add('has-leona-cursor');
    window.addEventListener('pointermove', (event) => {
      cursor.style.setProperty('--cursor-x', `${event.clientX}px`);
      cursor.style.setProperty('--cursor-y', `${event.clientY}px`);
      cursor.classList.add('is-visible');
    }, { passive: true });
    document.addEventListener('pointerout', (event) => {
      if (!event.relatedTarget) cursor.classList.remove('is-visible');
    });
  }

  const cover = document.querySelector('[data-leona-cover]');
  const coverImage = cover?.querySelector('img');
  const updateCover = () => cover?.classList.toggle('is-ready', Boolean(coverImage?.naturalWidth));
  if (coverImage) {
    coverImage.addEventListener('load', updateCover);
    coverImage.addEventListener('error', updateCover);
    if (coverImage.complete) updateCover();
  }

  const dialog = document.querySelector('.leona-lightbox');
  const lightboxImage = dialog?.querySelector('[data-leona-lightbox-image]');
  const caption = dialog?.querySelector('[data-leona-caption]');
  const closeButton = dialog?.querySelector('[data-leona-close]');

  document.querySelectorAll('[data-leona-photo]').forEach((button) => {
    const image = button.querySelector('img');
    const updatePhoto = () => {
      const ready = Boolean(image?.naturalWidth);
      button.classList.toggle('is-ready', ready);
      button.disabled = !ready;
      button.setAttribute('aria-label', ready ? `Ampliar ${image.alt}` : `Imagem aguardando arquivo: ${image?.getAttribute('src') || 'Leona'}`);
    };
    image?.addEventListener('load', updatePhoto);
    image?.addEventListener('error', updatePhoto);
    if (image?.complete) updatePhoto();

    button.addEventListener('click', () => {
      if (!image?.naturalWidth || !dialog || !lightboxImage) return;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      if (caption) caption.textContent = button.closest('figure')?.querySelector('figcaption b')?.textContent || 'LE-01 // REGISTRO AMPLIADO';
      dialog.showModal();
    });
  });

  closeButton?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog?.addEventListener('close', () => {
    if (lightboxImage) lightboxImage.removeAttribute('src');
  });
})();
