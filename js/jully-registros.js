(() => {
  'use strict';

  const records = [
    {
      code: 'JC-PRE-01',
      title: 'Estação de escuta',
      caption: 'Jully mantém uma estação improvisada aberta para qualquer resposta.',
      src: 'img-presente/personagens/jully-presente.png',
      alt: 'Jully Connor em uma estação improvisada de transmissão',
    },
    {
      code: 'JC-PRE-02',
      title: 'Rota de apoio',
      caption: 'Mesmo entre ruínas, ela mantém os olhos no caminho que ainda pode levar alguém para casa.',
      src: 'img-presente/personagens/jully-presente1.png',
      alt: 'Jully Connor em um ponto de apoio após a queda',
    },
    {
      code: 'JC-PRE-03',
      title: 'Vigília de campo',
      caption: 'Quando a frequência silencia, Jully continua procurando o próximo ponto de contato.',
      src: 'img-presente/personagens/jully-presente2.png',
      alt: 'Jully Connor em vigília junto de uma rota devastada',
    },
    {
      code: 'JC-PRE-04',
      title: 'Memória que resiste',
      caption: 'Há perdas que não se consertam; elas permanecem para lembrar por que vale continuar.',
      src: 'img-presente/personagens/jully-perda.png',
      alt: 'Jully Connor expressando dor em meio às ruínas',
    },
    {
      code: 'JC-PRE-05',
      title: 'Abrigo temporário',
      caption: 'No intervalo entre uma transmissão e outra, cada ferramenta preservada pode virar futuro.',
      src: 'img-presente/personagens/jull-presente.png',
      alt: 'Jully Connor em um abrigo de campo no presente',
    },
  ];

  const stage = document.querySelector('[data-record-stage]');
  if (!stage) return;

  const image = stage.querySelector('[data-record-image]');
  const code = stage.querySelector('[data-record-code]');
  const title = stage.querySelector('[data-record-title]');
  const caption = stage.querySelector('[data-record-caption]');
  const progress = stage.querySelector('[data-record-progress]');
  const count = document.querySelector('[data-record-count]');
  const previous = stage.querySelector('[data-record-previous]');
  const next = stage.querySelector('[data-record-next]');
  const open = stage.querySelector('[data-record-open]');
  const selectors = [...document.querySelectorAll('[data-record-select]')];
  const dialog = document.querySelector('[data-record-lightbox]');
  const dialogImage = document.querySelector('[data-record-lightbox-image]');
  const dialogCode = document.querySelector('[data-record-lightbox-code]');
  const dialogTitle = document.querySelector('[data-record-lightbox-title]');
  const close = document.querySelector('[data-record-close]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    stage.style.setProperty('--record-background', 'url("' + record.src + '")');
    selectors.forEach((button, buttonIndex) => {
      button.classList.toggle('is-active', buttonIndex === current);
      button.setAttribute('aria-pressed', String(buttonIndex === current));
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
    cycle = window.setInterval(() => setRecord(current + 1), 6400);
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

  setRecord(0, true);
  startCycle();

  window.setTimeout(() => {
    records.slice(1).forEach((record) => {
      const preload = new Image();
      preload.src = record.src;
    });
  }, 1500);
})();
