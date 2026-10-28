(() => {
  'use strict';

  const gallery = document.querySelector('[data-twins-gallery]');
  if (!gallery) return;

  const slides = [...gallery.querySelectorAll('[data-twins-slide]')];
  const thumbnails = [...document.querySelectorAll('[data-twins-select]')];
  const previous = document.querySelector('[data-twins-prev]');
  const next = document.querySelector('[data-twins-next]');
  const open = document.querySelector('[data-twins-open]');
  const current = document.querySelector('[data-twins-current]');
  const total = document.querySelector('[data-twins-total]');
  const progress = document.querySelector('.twins-progress > span');
  const dialog = document.querySelector('[data-twins-dialog]');
  const dialogImage = document.querySelector('[data-twins-dialog-image]');
  const dialogCaption = document.querySelector('[data-twins-dialog-caption]');
  const close = document.querySelector('[data-twins-close]');

  if (!slides.length || slides.length !== thumbnails.length) return;

  let selected = 0;
  const number = (value) => String(value).padStart(2, '0');

  function updateDialog() {
    const image = slides[selected].querySelector('img');
    dialogImage.src = image.getAttribute('src');
    dialogImage.alt = image.alt;
    dialogCaption.textContent = `MA-01/02.${number(selected + 1)} // REGISTRO CONJUNTO ${number(selected + 1)}`;
  }

  function show(index) {
    selected = (index + slides.length) % slides.length;
    slides.forEach((slide, position) => {
      const active = position === selected;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      if (active) slide.querySelector('img').loading = 'eager';
    });
    thumbnails.forEach((button, position) => {
      const active = position === selected;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    current.textContent = number(selected + 1);
    total.textContent = number(slides.length);
    progress.style.width = `${((selected + 1) / slides.length) * 100}%`;
    if (dialog.open) updateDialog();
  }

  previous.addEventListener('click', () => show(selected - 1));
  next.addEventListener('click', () => show(selected + 1));
  thumbnails.forEach((button, index) => button.addEventListener('click', () => show(index)));

  open.addEventListener('click', () => {
    updateDialog();
    dialog.showModal();
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => open.focus());

  document.addEventListener('keydown', (event) => {
    if (!dialog.open && !gallery.contains(event.target) && !event.target.closest?.('.twins-controls, .twins-thumbs')) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(selected - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(selected + 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      show(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      show(slides.length - 1);
    }
  });

  let touchStart = null;
  gallery.addEventListener('touchstart', (event) => {
    const touch = event.changedTouches[0];
    touchStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });
  gallery.addEventListener('touchend', (event) => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(deltaX) > 55 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      show(selected + (deltaX < 0 ? 1 : -1));
    }
  }, { passive: true });

  show(0);
})();
