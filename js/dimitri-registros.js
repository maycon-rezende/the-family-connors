(() => {
  'use strict';

  const records = [
    {
      code: 'D-08.1',
      title: 'Ponto de vigília',
      caption: 'Dimitri aparece em vigília no acampamento dos Hellsings.',
      src: 'img-hellsing/dimitri-presente.png',
      alt: 'Dimitri em vigília no acampamento dos Hellsings',
    },
    {
      code: 'D-08.2',
      title: 'Terreno aberto',
      caption: 'Registro de Dimitri em terreno aberto após o Dia D.',
      src: 'img-hellsing/dimi-presente.png',
      alt: 'Dimitri em terreno aberto no presente pós-extinção',
    },
    {
      code: 'D-08.3',
      title: 'Rota com o comando',
      caption: 'Dimitri e Jack aparecem diante de um mapa; o contexto da missão ainda não foi identificado.',
      src: 'img-hellsing/dimitri-jack.png',
      alt: 'Dimitri e Jack analisando uma rota no acampamento dos Hellsings',
    },
  ];

  const stage = document.querySelector('[data-dimitri-stage]');
  if (!stage) return;

  const image = stage.querySelector('[data-dimitri-image]');
  const code = stage.querySelector('[data-dimitri-record-code]');
  const title = stage.querySelector('[data-dimitri-record-title]');
  const caption = stage.querySelector('[data-dimitri-record-caption]');
  const progress = stage.querySelector('[data-dimitri-progress]');
  const count = document.querySelector('[data-dimitri-count]');
  const previous = stage.querySelector('[data-dimitri-previous]');
  const next = stage.querySelector('[data-dimitri-next]');
  const open = stage.querySelector('[data-dimitri-open]');
  const selectors = [...document.querySelectorAll('[data-dimitri-select]')];
  const dialog = document.querySelector('[data-dimitri-lightbox]');
  const dialogImage = document.querySelector('[data-dimitri-lightbox-image]');
  const dialogCode = document.querySelector('[data-dimitri-lightbox-code]');
  const dialogTitle = document.querySelector('[data-dimitri-lightbox-title]');
  const close = document.querySelector('[data-dimitri-close]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover)').matches;

  if (!image || !code || !title || !caption || !progress || !count || !previous || !next || !open) return;

  let current = 0;
  let cycle = null;
  let transition = 0;
  const digits = (value) => String(value).padStart(2, '0');
  const interactionAreas = [stage, ...new Set(selectors.map((button) => button.parentElement).filter(Boolean))];
  const isInteracting = () =>
    Boolean(dialog?.open) ||
    interactionAreas.some((area) => area.contains(document.activeElement) || (canHover && area.matches(':hover')));

  function preloadNext(index) {
    const record = records[(index + 1) % records.length];
    const preload = new Image();
    preload.src = record.src;
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

    const reveal = () => {
      if (token !== transition) return;
      image.classList.add('is-visible');
    };
    const showImage = () => {
      if (token !== transition) return;
      image.src = record.src;
      image.alt = record.alt;
      if (image.complete) reveal();
      else image.addEventListener('load', reveal, { once: true });
      preloadNext(current);
    };

    image.classList.remove('is-visible');
    if (immediate) showImage();
    else window.setTimeout(showImage, 180);
  }

  function stopCycle() {
    if (cycle) window.clearInterval(cycle);
    cycle = null;
  }

  function startCycle() {
    stopCycle();
    if (reducedMotion || document.hidden || isInteracting()) return;
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
    area.addEventListener('mouseenter', stopCycle);
    area.addEventListener('mouseleave', startCycle);
    area.addEventListener('focusin', stopCycle);
    area.addEventListener('focusout', () => window.setTimeout(startCycle, 0));
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopCycle();
    else startCycle();
  });

  if (dialog && dialogImage && dialogCode && dialogTitle && close) {
    open.addEventListener('click', () => {
      const record = records[current];
      dialogImage.src = record.src;
      dialogImage.alt = record.alt;
      dialogCode.textContent = record.code;
      dialogTitle.textContent = record.title;
      if (typeof dialog.showModal === 'function') {
        stopCycle();
        dialog.showModal();
      }
    });
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', () => window.setTimeout(startCycle, 0));
  }

  setRecord(0, true);
  startCycle();
})();
