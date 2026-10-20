(() => {
  'use strict';

  const records = [
    {
      code: 'BC-PRE-01',
      title: 'O olhar que ficou',
      caption: 'A câmera deixou de ser vitrine: agora ela guarda uma prova de que alguém atravessou a queda.',
      src: 'img-presente/personagens/britney-presente.png',
      alt: 'Britney Connor com uma câmera em uma cidade devastada',
    },
    {
      code: 'BC-PRE-02',
      title: 'Ponto de retorno',
      caption: 'Entre o acampamento e a estrada, Britney preserva os sinais que ajudam o grupo a se reencontrar.',
      src: 'img-presente/personagens/britney-presente1.png',
      alt: 'Britney Connor sentada em um acampamento de sobreviventes',
    },
    {
      code: 'BC-PRE-03',
      title: 'Rota sem silêncio',
      caption: 'Mobilidade não é fuga: é a chance de levar informação, ajuda e pessoas de volta para casa.',
      src: 'img-presente/personagens/britney-presente2.png',
      alt: 'Britney Connor em uma motocicleta diante da entrada do Connor Estate',
    },
    {
      code: 'BC-PRE-04',
      title: 'Vigília no acampamento',
      caption: 'Mesmo quando a estrada cala, ela continua observando quem chega, quem parte e o que ficou para trás.',
      src: 'img-presente/personagens/britney-presente3.png',
      alt: 'Britney Connor sentada com equipamento em uma cidade devastada',
    },
  ];

  const stage = document.querySelector('[data-present-carousel]');
  if (!stage) return;

  const image = stage.querySelector('[data-present-carousel-image]');
  const code = stage.querySelector('[data-present-carousel-code]');
  const title = stage.querySelector('[data-present-carousel-title]');
  const caption = stage.querySelector('[data-present-carousel-caption]');
  const progress = stage.querySelector('[data-present-carousel-progress]');
  const count = document.querySelector('[data-present-carousel-count]');
  const previous = stage.querySelector('[data-present-carousel-prev]');
  const next = stage.querySelector('[data-present-carousel-next]');
  const open = stage.querySelector('[data-present-carousel-open]');
  const dialog = document.querySelector('[data-present-lightbox]');
  const dialogImage = document.querySelector('[data-present-lightbox-image]');
  const dialogCode = document.querySelector('[data-present-lightbox-code]');
  const dialogTitle = document.querySelector('[data-present-lightbox-title]');
  const close = document.querySelector('[data-present-lightbox-close]');

  if (![image, code, title, caption, progress, count, previous, next, open, dialog, dialogImage, dialogCode, dialogTitle, close].every(Boolean)) return;

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let cycle = null;
  let transition = 0;
  let opener = null;

  const twoDigits = (value) => String(value).padStart(2, '0');

  function setRecord(index, immediate = false) {
    current = (index + records.length) % records.length;
    const record = records[current];
    const token = ++transition;

    stage.setAttribute('aria-label', `${record.code}: ${record.title}`);
    stage.setAttribute('aria-busy', 'true');
    code.textContent = record.code;
    title.textContent = record.title;
    caption.textContent = record.caption;
    count.textContent = `${twoDigits(current + 1)} / ${twoDigits(records.length)}`;
    progress.style.width = `${((current + 1) / records.length) * 100}%`;

    const reveal = () => {
      if (token !== transition) return;
      image.classList.add('is-visible');
      stage.setAttribute('aria-busy', 'false');
    };

    const showImage = () => {
      if (token !== transition) return;
      image.src = record.src;
      image.alt = record.alt;
      if (image.complete) reveal();
      else image.addEventListener('load', reveal, { once: true });
      image.addEventListener('error', () => stage.setAttribute('aria-busy', 'false'), { once: true });
    };

    image.classList.remove('is-visible');
    if (immediate || reducedMotion) showImage();
    else window.setTimeout(showImage, 180);
  }

  function stopCycle() {
    if (cycle) window.clearInterval(cycle);
    cycle = null;
  }

  function startCycle() {
    stopCycle();
    if (reducedMotion || document.hidden) return;
    cycle = window.setInterval(() => setRecord(current + 1), 6200);
  }

  function go(index) {
    setRecord(index);
    startCycle();
  }

  previous.addEventListener('click', () => go(current - 1));
  next.addEventListener('click', () => go(current + 1));

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

  open.addEventListener('click', () => {
    const record = records[current];
    opener = document.activeElement;
    dialogImage.src = record.src;
    dialogImage.alt = record.alt;
    dialogCode.textContent = record.code;
    dialogTitle.textContent = record.title;
    if (typeof dialog.showModal === 'function' && !dialog.open) dialog.showModal();
  });

  close.addEventListener('click', () => {
    if (dialog.open) dialog.close();
  });
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    if (opener instanceof HTMLElement) opener.focus();
    opener = null;
  });

  setRecord(0, true);
  startCycle();

  window.setTimeout(() => {
    records.slice(1).forEach((record) => {
      const preload = new Image();
      preload.src = record.src;
    });
  }, 1500);
})();
