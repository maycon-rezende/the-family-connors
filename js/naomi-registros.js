(() => {
  'use strict';

  const records = [
    {
      code: 'N-05.1',
      title: 'Escuta de campo',
      caption: 'Antes de qualquer rota, Naomi registra o que o acampamento ainda consegue ouvir.',
      src: 'img-hellsing/naomi-presente.png',
      alt: 'Naomi no acampamento dos Hellsings depois do Dia D',
    },
    {
      code: 'N-05.2',
      title: 'Rota em movimento',
      caption: 'Fora do receptor, ela leva a escuta para onde o sinal pode decidir uma saída.',
      src: 'img-hellsing/naomi-presente1.png',
      alt: 'Naomi em uma motocicleta no presente pós-extinção',
    },
    {
      code: 'N-05.3',
      title: 'Resposta imediata',
      caption: 'Quando a informação aponta para o perigo, a inteligência também precisa abrir caminho.',
      src: 'img-hellsing/naomi-presente2.png',
      alt: 'Naomi em ação com uma lâmina entre ruínas no presente',
    },
  ];

  const stage = document.querySelector('[data-signal-stage]');
  if (!stage) return;

  const image = stage.querySelector('[data-signal-image]');
  const code = stage.querySelector('[data-signal-code]');
  const title = stage.querySelector('[data-signal-title]');
  const caption = stage.querySelector('[data-signal-caption]');
  const progress = stage.querySelector('[data-signal-progress]');
  const count = document.querySelector('[data-signal-count]');
  const previous = stage.querySelector('[data-signal-previous]');
  const next = stage.querySelector('[data-signal-next]');
  const open = stage.querySelector('[data-signal-open]');
  const selectors = [...document.querySelectorAll('[data-signal-select]')];
  const dialog = document.querySelector('[data-signal-lightbox]');
  const dialogImage = document.querySelector('[data-signal-lightbox-image]');
  const dialogCode = document.querySelector('[data-signal-lightbox-code]');
  const dialogTitle = document.querySelector('[data-signal-lightbox-title]');
  const close = document.querySelector('[data-signal-close]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!image || !code || !title || !caption || !progress || !count || !previous || !next || !open) return;

  let current = 0;
  let cycle = null;
  let transition = 0;

  const digits = (value) => String(value).padStart(2, '0');

  function setRecord(index, immediate = false) {
    current = (index + records.length) % records.length;
    const record = records[current];
    const token = ++transition;

    code.textContent = record.code;
    title.textContent = record.title;
    caption.textContent = record.caption;
    count.textContent = digits(current + 1) + ' / ' + digits(records.length);
    progress.style.width = ((current + 1) / records.length) * 100 + '%';
    stage.style.setProperty('--signal-background', 'url("' + record.src + '")');

    selectors.forEach((button, buttonIndex) => {
      const active = buttonIndex === current;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    const showImage = () => {
      if (token !== transition) return;
      image.src = record.src;
      image.alt = record.alt;
      const reveal = () => {
        if (token === transition) image.classList.add('is-visible');
      };
      if (image.complete) reveal();
      else image.addEventListener('load', reveal, { once: true });
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
    if (reducedMotion || document.hidden) return;
    cycle = window.setInterval(() => setRecord(current + 1), 6500);
  }

  function go(index) {
    setRecord(index);
    startCycle();
  }

  previous.addEventListener('click', () => go(current - 1));
  next.addEventListener('click', () => go(current + 1));
  selectors.forEach((button, index) => button.addEventListener('click', () => go(index)));

  stage.addEventListener('mouseenter', stopCycle);
  stage.addEventListener('mouseleave', startCycle);
  stage.addEventListener('focusin', stopCycle);
  stage.addEventListener('focusout', (event) => {
    if (!stage.contains(event.relatedTarget)) startCycle();
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
      if (typeof dialog.showModal === 'function') dialog.showModal();
    });

    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  setRecord(0, true);
  startCycle();

  window.setTimeout(() => {
    records.slice(1).forEach((record) => {
      const preload = new Image();
      preload.src = record.src;
    });
  }, 1500);
})();
