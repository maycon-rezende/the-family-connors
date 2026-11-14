(() => {
  'use strict';

  const records = [
    {
      code: 'B-11.1',
      title: 'Ajoelhado sob a chuva',
      caption: 'Bobby Lee ajoelhado com a katana no acampamento; data não identificada.',
      src: 'img-bobby-lee/bobby-lee-ajoelhado-chuva.png',
      alt: 'Bobby Lee ajoelhado sob a chuva, segurando a katana',
    },
    {
      code: 'B-11.2',
      title: 'Um cantil no acampamento',
      caption: 'Lee oferece água a um companheiro no acampamento dos Hellsings; data não identificada.',
      src: 'img-bobby-lee/bobby-lee-cantil-acampamento.png',
      alt: 'Bobby Lee estende um cantil a um companheiro no acampamento',
    },
    {
      code: 'B-11.3',
      title: 'A lâmina depois da missão',
      caption: 'Lee limpa a katana junto às tendas do acampamento; data não identificada.',
      src: 'img-bobby-lee/bobby-lee-limpando-katana.png',
      alt: 'Bobby Lee sentado, limpando sua katana no acampamento',
    },
    {
      code: 'B-11.4',
      title: 'Suprimentos para a equipe',
      caption: 'Lee separa cantis e provisões no acampamento dos Hellsings; data não identificada.',
      src: 'img-bobby-lee/bobby-lee-organizando-suprimentos.png',
      alt: 'Bobby Lee organiza cantis e suprimentos junto às tendas',
    },
    {
      code: 'B-11.5',
      title: 'Busca entre as prateleiras',
      caption: 'Lee percorre um edifício abandonado em busca de recursos; data não identificada.',
      src: 'img-bobby-lee/bobby-lee-explorando-prateleiras.png',
      alt: 'Bobby Lee explora um edifício abandonado com uma lanterna',
    },
    {
      code: 'B-11.6',
      title: 'Retrato de campo',
      caption: 'Bobby Lee no acampamento dos Hellsings; data não identificada.',
      src: 'img-presente/personagens/bobby-lee-perfil.png',
      alt: 'Retrato de Bobby Lee no acampamento dos Hellsings',
    },
    {
      code: 'B-11.7',
      title: 'Reconhecimento',
      caption: 'Bobby Lee observa uma rua abandonada durante um reconhecimento; data não identificada.',
      src: 'img-presente/personagens/bobby-lee-reconhecimento.png',
      alt: 'Bobby Lee com um rádio portátil observando uma rua em ruínas',
    },
    {
      code: 'B-11.8',
      title: 'Sala de operações',
      caption: 'Bobby Lee confere o mapa e acompanha o rádio no bunker; data não identificada.',
      src: 'img-presente/personagens/bobby-lee-inteligencia-bunker.png',
      alt: 'Bobby Lee analisando um mapa ao lado do rádio no bunker',
    },
    {
      code: 'B-11.9',
      title: 'Entre ruínas',
      caption: 'Bobby Lee aparece entre as ruínas; data não identificada.',
      src: 'img-presente/personagens/bobby-presente.png',
      alt: 'Bobby Lee entre ruínas, segurando uma arma',
    },
    {
      code: 'B-11.10',
      title: 'No bunker',
      caption: 'Registro de Bobby Lee sentado no bunker.',
      src: 'img-presente/personagens/bobby-lee-presente.png',
      alt: 'Bobby Lee sentado no interior do bunker',
    },
    {
      code: 'B-11.11',
      title: 'Colagem de registros',
      caption: 'Colagem de seis imagens de Bobby Lee preservadas no arquivo.',
      src: 'img-presente/personagens/quadro-bobby.png',
      alt: 'Colagem de seis imagens de Bobby Lee em diferentes momentos',
    },
    {
      code: 'B-11.12',
      title: 'Em silêncio sob a chuva',
      caption: 'Bobby Lee permanece ajoelhado, com a cabeça baixa e as mãos apoiadas na katana; data não identificada.',
      src: 'img-bobby-lee/bobby-lee-luto-chuva-katana.png',
      alt: 'Bobby Lee ajoelhado sob a chuva, em silêncio, segurando a katana com as duas mãos',
    },
    {
      code: 'B-11.13',
      title: 'Um lugar seguro',
      caption: 'Bobby abraça Britney à luz da fogueira no acampamento; um instante de descanso entre as rondas.',
      src: 'img-hellsing/bobby&brit.png',
      alt: 'Bobby Lee abraça Britney e beija sua testa junto à fogueira do acampamento',
    },
    {
      code: 'B-11.14',
      title: 'Farmácia abandonada',
      caption: 'Lee mantém a entrada sob observação enquanto Britney confere o material médico encontrado.',
      src: 'img-hellsing/bobby&brit1.png',
      alt: 'Bobby Lee vigia a entrada de uma farmácia abandonada enquanto Britney confere um pacote médico',
    },
    {
      code: 'B-11.15',
      title: 'Depois da ronda',
      caption: 'Britney e Bobby dividem uma pausa junto à fogueira, depois de deixarem a vigilância com o restante grupo.',
      src: 'img-hellsing/bobby&brit2.png',
      alt: 'Bobby Lee e Britney descansam juntos à mesa perto da fogueira do acampamento',
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
