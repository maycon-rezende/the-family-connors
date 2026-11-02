(() => {
  const cursor = document.querySelector('.hilary-cursor');
  const cursorEnabled = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches;

  if (cursor && cursorEnabled) {
    const label = cursor.querySelector('[data-hilary-cursor-label]');
    let frame = 0;
    let pointer = null;

    document.documentElement.classList.add('has-hilary-cursor');

    document.addEventListener('pointermove', (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      pointer = { x: event.clientX, y: event.clientY };
      cursor.classList.add('is-active');
      if (frame) return;
      frame = requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${pointer.x}px,${pointer.y}px,0) translate(-50%,-50%)`;
        frame = 0;
      });
    }, { passive: true });

    document.addEventListener('pointerover', (event) => {
      const control = event.target.closest?.('a,button,[data-hilary-photo]');
      cursor.classList.toggle('is-target', Boolean(control));
      label.textContent = control?.hasAttribute('data-hilary-photo') ? 'AMPLIAR' : control?.matches('[data-hilary-close]') ? 'FECHAR' : control ? 'ACESSAR' : 'RASTREAR';
    }, { passive: true });

    document.addEventListener('pointerdown', () => cursor.classList.add('is-pressing'));
    document.addEventListener('pointerup', () => cursor.classList.remove('is-pressing'));
    document.documentElement.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
    window.addEventListener('blur', () => cursor.classList.remove('is-active'));
    document.addEventListener('focusin', (event) => {
      const control = event.target.closest?.('a,button,[data-hilary-photo]');
      cursor.classList.toggle('is-target', Boolean(control));
      label.textContent = control?.hasAttribute('data-hilary-photo') ? 'AMPLIAR' : control?.matches('[data-hilary-close]') ? 'FECHAR' : control ? 'ACESSAR' : 'RASTREAR';
    });
  }

  const dialog = document.querySelector('.hilary-lightbox');
  if (!dialog) return;

  const triggers = [...document.querySelectorAll('[data-hilary-photo]')];
  const image = dialog.querySelector('[data-hilary-lightbox-image]');
  const caption = dialog.querySelector('[data-hilary-lightbox-caption]');
  const close = dialog.querySelector('[data-hilary-close]');
  let current = 0;

  const show = (index) => {
    current = (index + triggers.length) % triggers.length;
    const trigger = triggers[current];
    image.src = trigger.dataset.hilaryPhoto;
    image.alt = trigger.querySelector('img')?.alt || 'Imagem do arquivo de Hilary';
    caption.textContent = trigger.dataset.hilaryCaption || 'REGISTRO AMPLIADO';
  };

  triggers.forEach((trigger, index) => trigger.addEventListener('click', () => {
    show(index);
    dialog.showModal();
  }));

  dialog.querySelector('[data-hilary-prev]').addEventListener('click', () => show(current - 1));
  dialog.querySelector('[data-hilary-next]').addEventListener('click', () => show(current + 1));
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });
})();
