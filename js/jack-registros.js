(() => {
  const gallery = document.querySelector('[data-jack-gallery]');
  const cursor = document.querySelector('.jack-cursor');
  if (!gallery) return;

  const slides = [...gallery.querySelectorAll('[data-jack-slide]')];
  const thumbs = [...gallery.querySelectorAll('[data-jack-select]')];
  const previous = gallery.querySelector('[data-jack-prev]');
  const next = gallery.querySelector('[data-jack-next]');
  const current = gallery.querySelector('[data-jack-current]');
  const hudCurrent = gallery.querySelector('[data-jack-hud-current]');
  const total = gallery.querySelector('[data-jack-total]');
  const progress = gallery.querySelector('.jack-gallery__progress');
  const dialog = document.querySelector('[data-jack-dialog]');
  const dialogImage = document.querySelector('[data-jack-dialog-image]');
  const dialogCaption = document.querySelector('[data-jack-dialog-caption]');
  let index = 0;
  let pointerStart = null;

  const number = (value) => String(value).padStart(2, '0');
  if (total) total.textContent = number(slides.length);

  const show = (nextIndex, revealThumb = false) => {
    index = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    thumbs.forEach((thumb, thumbIndex) => {
      const active = thumbIndex === index;
      thumb.classList.toggle('is-active', active);
      thumb.setAttribute('aria-pressed', String(active));
    });
    if (current) current.textContent = number(index + 1);
    if (hudCurrent) hudCurrent.textContent = number(index + 1);
    if (progress) progress.style.setProperty('--jack-progress', `${((index + 1) / slides.length) * 100}%`);
    if (revealThumb) thumbs[index]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  };

  previous?.addEventListener('click', () => show(index - 1, true));
  next?.addEventListener('click', () => show(index + 1, true));
  thumbs.forEach((thumb, thumbIndex) => thumb.addEventListener('click', () => show(thumbIndex, true)));

  gallery.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(index - 1, true);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(index + 1, true);
    }
  });

  const stage = gallery.querySelector('[data-jack-stage]');
  stage?.addEventListener('pointerdown', (event) => { pointerStart = event.clientX; });
  stage?.addEventListener('pointerup', (event) => {
    if (pointerStart === null) return;
    const distance = event.clientX - pointerStart;
    if (Math.abs(distance) > 48) show(index + (distance < 0 ? 1 : -1), true);
    pointerStart = null;
  });
  stage?.addEventListener('pointercancel', () => { pointerStart = null; });

  const openButton = gallery.querySelector('[data-jack-open]');
  const closeButton = dialog?.querySelector('[data-jack-close]');
  openButton?.addEventListener('click', () => {
    const image = slides[index]?.querySelector('img');
    const caption = slides[index]?.querySelector('figcaption b');
    if (!image || !dialog || !dialogImage) return;
    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt;
    if (dialogCaption) dialogCaption.textContent = caption?.textContent || '';
    dialog.showModal();
  });
  closeButton?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', ({ clientX, clientY }) => {
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
      cursor.classList.add('is-visible');
    }, { passive: true });
    gallery.querySelectorAll('button, .jack-slide').forEach((target) => {
      target.addEventListener('pointerenter', () => cursor.classList.add('active'));
      target.addEventListener('pointerleave', () => cursor.classList.remove('active'));
    });
    window.addEventListener('blur', () => cursor.classList.remove('is-visible'));
  }

  show(0);
})();
