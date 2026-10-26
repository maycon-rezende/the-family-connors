(() => {
  'use strict';

  const records = [
    {
      code: 'B-11.1',
      title: 'Entre ruínas',
      caption: 'Bobby Lee aparece entre as ruínas; data não identificada.',
      src: 'img-presente/personagens/bobby-presente.png',
      alt: 'Bobby Lee entre ruínas, segurando uma arma',
    },
    {
      code: 'B-11.2',
      title: 'No bunker',
      caption: 'Registro de Bobby Lee sentado no bunker.',
      src: 'img-presente/personagens/bobby-lee-presente.png',
      alt: 'Bobby Lee sentado no interior do bunker',
    },
    {
      code: 'B-11.3',
      title: 'Seis registros',
      caption: 'Colagem de seis imagens de Bobby Lee preservadas no arquivo.',
      src: 'img-presente/personagens/quadro-bobby.png',
      alt: 'Colagem de seis imagens de Bobby Lee em diferentes momentos',
    },
  ];

  const stage = document.querySelector('[data-bobby-stage]');
  if (!stage) return;

  const image = stage.querySelector('[data-bobby-image]');
  const code = stage.querySelector('[data-bobby-record-code]');
  const title = stage.querySelector('[data-bobby-record-title]');
  const caption = stage.querySelector('[data-bobby-record-caption]');
  const progress = stage.querySelector('[data-bobby-progress]');
  const count = document.querySelector('[data-bobby-count]');
  const previous = stage.querySelector('[data-bobby-previous]');
  const next = stage.querySelector('[data-bobby-next]');
  const open = stage.querySelector('[data-bobby-open]');
  const selectors = [...document.querySelectorAll('[data-bobby-select]')];
  const dialog = document.querySelector('[data-bobby-lightbox]');
  const dialogImage = document.querySelector('[data-bobby-lightbox-image]');
  const dialogCode = document.querySelector('[data-bobby-lightbox-code]');
  const dialogTitle = document.querySelector('[data-bobby-lightbox-title]');
  const close = document.querySelector('[data-bobby-close]');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const canHover = window.matchMedia('(hover: hover)').matches;

  if (!image || !code || !title || !caption || !progress || !count || !previous || !next || !open) return;

  let current = 0;
  let cycle = null;
  let transition = 0;
  let focusBeforeDialog = null;

  const digits = (value) => String(value).padStart(2, '0');
  const interactionAreas = [stage, ...new Set(selectors.map((button) => button.parentElement).filter(Boolean))];
  const isInteracting = () =>
    Boolean(dialog?.open) ||
    interactionAreas.some((area) => area.contains(document.activeElement) || (canHover && area.matches(':hover')));

  function preloadNext(index) {
    const preload = new Image();
    preload.src = records[(index + 1) % records.length].src;
  }

  function setRecord(index, immediate = false) {
    current = (index + records.length) % records.length;
    const record = records[current];
    const token = ++transition;

    code.textContent = record.code;
    title.textContent = record.title;
    caption.textContent = record.caption;
    count.textContent = `${digits(current + 1)} / ${digits(records.length)}`;
    progress.style.width = `${((current + 1) / records.length) * 100}%`;
    selectors.forEach((button, buttonIndex) => {
      const active = buttonIndex === current;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    const showImage = () => {
      if (token !== transition) return;
      image.src = record.src;
      image.alt = record.alt;
      const reveal = () => { if (token === transition) image.classList.add('is-visible'); };
      if (image.complete) reveal();
      else image.addEventListener('load', reveal, { once: true });
      preloadNext(current);
    };

    image.classList.remove('is-visible');
    if (immediate || motionQuery.matches) showImage();
    else window.setTimeout(showImage, 180);
  }

  function stopCycle() {
    if (cycle) window.clearInterval(cycle);
    cycle = null;
  }

  function startCycle() {
    stopCycle();
    if (motionQuery.matches || document.hidden || isInteracting()) return;
    cycle = window.setInterval(() => setRecord(current + 1), 6500);
  }

  function go(index) {
    setRecord(index);
    startCycle();
  }

  previous.addEventListener('click', () => go(current - 1));
  next.addEventListener('click', () => go(current + 1));
  selectors.forEach((button, index) => button.addEventListener('click', () => go(index)));
  interactionAreas.forEach((area) => {
    if (canHover) {
      area.addEventListener('mouseenter', stopCycle);
      area.addEventListener('mouseleave', startCycle);
    }
    area.addEventListener('focusin', stopCycle);
    area.addEventListener('focusout', () => window.setTimeout(startCycle, 0));
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopCycle();
    else startCycle();
  });
  motionQuery.addEventListener?.('change', startCycle);

  if (dialog && dialogImage && dialogCode && dialogTitle && close) {
    open.addEventListener('click', () => {
      if (typeof dialog.showModal !== 'function') return;
      const record = records[current];
      focusBeforeDialog = document.activeElement instanceof HTMLElement ? document.activeElement : open;
      dialogImage.src = record.src;
      dialogImage.alt = record.alt;
      dialogCode.textContent = record.code;
      dialogTitle.textContent = record.title;
      stopCycle();
      dialog.showModal();
    });
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => {
      if (focusBeforeDialog?.isConnected) focusBeforeDialog.focus({ preventScroll: true });
      focusBeforeDialog = null;
      window.setTimeout(startCycle, 0);
    });
  }

  setRecord(0, true);
  startCycle();
})();
