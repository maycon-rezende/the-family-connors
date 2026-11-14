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
    {
      code: 'D-08.4',
      title: 'Alerta no corredor',
      caption: 'Dimitri e Anya param em um corredor em ruínas ao perceber algo adiante.',
      src: 'img-dimitri/Alerta no corredor em ruínas.png',
      alt: 'Dimitri e Anya atentos em um corredor destruído',
    },
    {
      code: 'D-08.5',
      title: 'Café em família',
      caption: 'Dimitri, sua esposa e as duas filhas compartilham uma refeição; a imagem não indica uma data.',
      src: 'img-dimitri/Café da manhã em família.png',
      alt: 'Dimitri, a esposa e as filhas reunidos à mesa',
    },
    {
      code: 'D-08.6',
      title: 'Busca no mercado',
      caption: 'Entre as prateleiras quebradas, Dimitri examina o que ainda pode ser aproveitado.',
      src: 'img-dimitri/Dimitri no mercado em ruínas.png',
      alt: 'Dimitri procurando itens úteis em um mercado destruído',
    },
    {
      code: 'D-08.7',
      title: 'Memórias ao entardecer',
      caption: 'Dimitri segura uma fotografia da família. Anya senta-se ao lado dele e toca seu braço.',
      src: 'img-dimitri/Memórias compartilhadas ao entardecer.png',
      alt: 'Dimitri e Anya observam uma fotografia da família ao entardecer',
    },
    {
      code: 'D-08.8',
      title: 'Filtros e baterias',
      caption: 'Dimitri entrega moedas por filtros e baterias em uma banca de mercado.',
      src: 'img-dimitri/Moedas por filtros e baterias.png',
      alt: 'Dimitri negociando moedas por filtros e baterias',
    },
    {
      code: 'D-08.9',
      title: 'Suprimentos no mercado',
      caption: 'Anya conduz a negociação. Dimitri acompanha a conversa sem tirar a decisão das mãos dela.',
      src: 'img-dimitri/Negociação de suprimentos no mercado do deserto.png',
      alt: 'Anya negocia suprimentos enquanto Dimitri observa ao lado',
    },
    {
      code: 'D-08.10',
      title: 'No posto de controle',
      caption: 'Dimitri conversa com um viajante armado diante de um posto de controle no deserto.',
      src: 'img-dimitri/Negociação no posto de controle desértico.png',
      alt: 'Dimitri conversa com um sobrevivente em um posto desértico',
    },
    {
      code: 'D-08.11',
      title: 'Negociação conjunta',
      caption: 'Anya apresenta sua proposta no posto de controle; Dimitri lê as reações ao redor.',
      src: 'img-dimitri/Negociação no posto de controle do deserto.png',
      alt: 'Dimitri e Anya negociam com uma viajante no deserto',
    },
    {
      code: 'D-08.12',
      title: 'A loja abandonada',
      caption: 'Pai e filha procuram suprimentos entre os restos de uma loja.',
      src: 'img-dimitri/Pai e filha exploram loja abandonada.png',
      alt: 'Dimitri e Anya exploram juntos uma loja abandonada',
    },
    {
      code: 'D-08.13',
      title: 'Risos no acampamento',
      caption: 'Por alguns minutos, Dimitri divide uma pausa e uma risada com um mecânico do acampamento.',
      src: 'img-dimitri/Risadas no acampamento de reparos.png',
      alt: 'Dimitri ri com um mecânico no acampamento de reparos',
    },
    {
      code: 'D-08.14',
      title: 'Um riso compartilhado',
      caption: 'Anya e Dimitri encontram um instante leve entre ferramentas, trabalho e vida no acampamento.',
      src: 'img-dimitri/Risos entre pai e filha no acampamento.png',
      alt: 'Anya e Dimitri riem juntos no acampamento',
    },
    {
      code: 'D-08.15',
      title: 'A rota no capô',
      caption: 'Com o mapa aberto sobre o capô empoeirado, Dimitri aponta os trechos mais difíceis do caminho.',
      src: 'img-dimitri/Rota difícil no capô empoeirado.png',
      alt: 'Dimitri e uma companheira analisam uma rota sobre o capô de um veículo',
    },
    {
      code: 'D-08.16',
      title: 'Um ruído à porta',
      caption: 'Dimitri interrompe o avanço e escuta antes de atravessar a entrada do prédio.',
      src: 'img-dimitri/Surpresa à porta do prédio abandonado.png',
      alt: 'Dimitri atento à entrada de um prédio abandonado',
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
