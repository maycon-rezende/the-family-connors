(() => {
  'use strict';

  const records = [
    {
      code: 'C-07.1',
      title: 'Recurso preservado',
      caption: 'Mesmo fora da patrulha, Clhoe prepara o que pode manter alguém de pé.',
      src: 'img-hellsing/clhoe-presente.png',
      alt: 'Clhoe preparando recursos de cuidado no acampamento dos Hellsings',
    },
    {
      code: 'C-07.2',
      title: 'Cuidado sob pressão',
      caption: 'Ao lado de Alice, o retorno de um sobrevivente também se torna uma missão de campo.',
      src: 'img-hellsing/alice-clhoe.png',
      alt: 'Clhoe e Alice cuidando de um sobrevivente no presente',
    },
    {
      code: 'C-07.3',
      title: 'Recursos para o abrigo',
      caption: 'Entre frascos e suprimentos, a proteção continua mesmo depois que a ameaça recua.',
      src: 'img-hellsing/alice-clhoe1.png',
      alt: 'Clhoe e Alice organizando recursos de cuidado em campo',
    },
    {
      code: 'C-07.4',
      title: 'Remédios preservados',
      caption: 'O que antes era rotina virou uma reserva preciosa para quem ainda precisa de tempo.',
      src: 'img-hellsing/alice-clhoe2.png',
      alt: 'Clhoe e Alice preparando remédios no acampamento',
    },
    {
      code: 'C-07.5',
      title: 'O retorno importa',
      caption: 'A família é o motivo para cada perímetro existir e cada rota terminar em segurança.',
      src: 'img-hellsing/clhoe-presente-familia.png',
      alt: 'Clhoe junto de sua família no presente',
    },
    {
      code: 'C-07.6',
      title: 'Núcleo protegido',
      caption: 'Marido e filho dividem o arquivo que Clhoe se recusa a deixar para trás.',
      src: 'img-hellsing/clhoe-familia-presente.png',
      alt: 'Clhoe com seu marido e seu filho no presente',
    },
  ];

  const stage = document.querySelector('[data-watch-stage]');
  if (!stage) return;

  const image = stage.querySelector('[data-watch-image]');
  const code = stage.querySelector('[data-watch-code]');
  const title = stage.querySelector('[data-watch-title]');
  const caption = stage.querySelector('[data-watch-caption]');
  const progress = stage.querySelector('[data-watch-progress]');
  const count = document.querySelector('[data-watch-count]');
  const previous = stage.querySelector('[data-watch-previous]');
  const next = stage.querySelector('[data-watch-next]');
  const open = stage.querySelector('[data-watch-open]');
  const selectors = [...document.querySelectorAll('[data-watch-select]')];
  const dialog = document.querySelector('[data-watch-lightbox]');
  const dialogImage = document.querySelector('[data-watch-lightbox-image]');
  const dialogCode = document.querySelector('[data-watch-lightbox-code]');
  const dialogTitle = document.querySelector('[data-watch-lightbox-title]');
  const close = document.querySelector('[data-watch-close]');
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
    stage.style.setProperty('--watch-background', 'url("' + record.src + '")');

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
})();
