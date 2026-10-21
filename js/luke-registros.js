(() => {
  'use strict';

  const records = [
    {
      code: 'L-06.1',
      title: 'Oficina de rota',
      caption: 'Antes de seguir, Luke devolve função ao que ainda pode manter a equipe em movimento.',
      src: 'img-hellsing/luke-presente.png',
      alt: 'Luke reparando equipamento de campo entre ruínas',
    },
    {
      code: 'L-06.2',
      title: 'Retorno protegido',
      caption: 'Há coordenadas que ele não registra. Voltar também significa saber o que não deve ser exposto.',
      src: 'img-hellsing/luke-presente-familia.png',
      alt: 'Luke ao lado de sua família no presente',
    },
    {
      code: 'L-06.3',
      title: 'Formação de campo',
      caption: 'Hellen, Naomi e Luke concentram cobertura, informação e leitura de terreno em uma mesma saída.',
      src: 'img-hellsing/hellen-naomi-luke-presente.png',
      alt: 'Hellen Wren, Naomi e Luke analisando equipamento e rotas de campo',
    },
    {
      code: 'L-06.4',
      title: 'Mapa compartilhado',
      caption: 'A equipe compara o que viu no terreno com o que a inteligência conseguiu preservar.',
      src: 'img-hellsing/hellen-naomi-luke.png',
      alt: 'Hellen Wren, Naomi e Luke estudando uma rota com equipamentos no acampamento',
    },
    {
      code: 'L-06.5',
      title: 'Campo em silêncio',
      caption: 'Nem todo planejamento precisa de muitas vozes. Às vezes basta uma peça, um mapa e quem sabe ler os dois.',
      src: 'img-hellsing/luke-naomi-helen.png',
      alt: 'Luke trabalhando com Hellen Wren e Naomi em uma bancada de campo',
    },
    {
      code: 'L-06.6',
      title: 'Retorno à base',
      caption: 'Uma equipe reaparece depois da travessia. O mapa só está completo quando todos passam pela porta.',
      src: 'img-hellsing/scenes/retorno-luke-dimitri-brian-hellen.png',
      alt: 'Equipe Hellsings retornando a uma base operacional',
    },
  ];

  const stage = document.querySelector('[data-route-stage]');
  if (!stage) return;

  const image = stage.querySelector('[data-route-image]');
  const code = stage.querySelector('[data-route-code]');
  const title = stage.querySelector('[data-route-title]');
  const caption = stage.querySelector('[data-route-caption]');
  const progress = stage.querySelector('[data-route-progress]');
  const count = document.querySelector('[data-route-count]');
  const previous = stage.querySelector('[data-route-previous]');
  const next = stage.querySelector('[data-route-next]');
  const open = stage.querySelector('[data-route-open]');
  const selectors = [...document.querySelectorAll('[data-route-select]')];
  const dialog = document.querySelector('[data-route-lightbox]');
  const dialogImage = document.querySelector('[data-route-lightbox-image]');
  const dialogCode = document.querySelector('[data-route-lightbox-code]');
  const dialogTitle = document.querySelector('[data-route-lightbox-title]');
  const close = document.querySelector('[data-route-close]');
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
    stage.style.setProperty('--route-background', 'url("' + record.src + '")');

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
