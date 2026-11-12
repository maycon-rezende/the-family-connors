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
    {
      code: 'BC-PRE-05',
      title: 'A rua antes da escolha',
      caption: 'Britney lê o vazio antes de cruzá-lo: janelas, saídas e o trecho que ainda pode ser atravessado.',
      src: 'img-presente/personagens/01_Britney_na_rua_deserta.png',
      alt: 'Britney observa uma rua deserta antes de avançar.',
    },
    {
      code: 'BC-PRE-06',
      title: 'Abrigo de passagem',
      caption: 'Um prédio abandonado não é seguro por si só; cada entrada precisa continuar sob observação.',
      src: 'img-presente/personagens/02_Retrato_em_predio_abandonado.png',
      alt: 'Retrato de Britney dentro de um prédio abandonado.',
    },
    {
      code: 'BC-PRE-07',
      title: 'Busca de suprimentos',
      caption: 'Ela procura o que mantém o grupo avançando, sem esquecer a rota de retorno.',
      src: 'img-presente/personagens/03_Procurando_suprimentos.png',
      alt: 'Britney procura suprimentos em uma construção danificada.',
    },
    {
      code: 'BC-PRE-08',
      title: 'A rota no acampamento',
      caption: 'Antes de sair, Britney confirma no mapa os pontos de encontro e o que ainda precisa ser conferido.',
      src: 'img-presente/personagens/04_Consultando_mapa_no_acampamento.png',
      alt: 'Britney consulta um mapa no acampamento dos Hellsings.',
    },
    {
      code: 'BC-PRE-09',
      title: 'O mapa na rua',
      caption: 'A rota sai do papel e encontra o terreno: ela confere o que mudou antes de seguir.',
      src: 'img-presente/personagens/05_Com_mapa_na_rua.png',
      alt: 'Britney confere um mapa em uma rua devastada.',
    },
    {
      code: 'BC-PRE-10',
      title: 'Revisão de percurso',
      caption: 'De volta ao acampamento, uma segunda leitura transforma observações em plano.',
      src: 'img-presente/personagens/06_Mapa_no_acampamento_versao_2.png',
      alt: 'Britney revisa o mapa no acampamento.',
    },
    {
      code: 'BC-PRE-11',
      title: 'Atenção fora do quadro',
      caption: 'Um ruído distante muda a direção do olhar; ela observa antes de reagir.',
      src: 'img-presente/personagens/07_Olhando_ao_lado.png',
      alt: 'Britney olha atentamente para o lado durante uma missão.',
    },
    {
      code: 'BC-PRE-12',
      title: 'O lado que falta conferir',
      caption: 'Antes de avançar, Britney verifica a lateral da passagem e procura um ponto de cobertura.',
      src: 'img-presente/personagens/08_Olhando_para_a_esquerda.png',
      alt: 'Britney olha para a esquerda, atenta ao caminho.',
    },
    {
      code: 'BC-PRE-13',
      title: 'Preparar para partir',
      caption: 'A mochila precisa estar pronta antes que a equipe deixe o abrigo.',
      src: 'img-presente/personagens/09_Arrumando_a_mochila.png',
      alt: 'Britney ajusta a mochila antes de sair.',
    },
    {
      code: 'BC-PRE-14',
      title: 'Checagem final',
      caption: 'Ela revisa alças e fechos para que nada a atrase quando a rota apertar.',
      src: 'img-presente/personagens/10_Arrumando_a_mochila_versao_2.png',
      alt: 'Britney termina de ajustar a mochila de campo.',
    },
    {
      code: 'BC-PRE-15',
      title: 'Pausa sem baixar a guarda',
      caption: 'Sentar por um instante não significa abandonar a vigilância.',
      src: 'img-presente/personagens/11_Sentada_na_caixa.png',
      alt: 'Britney sentada sobre uma caixa no acampamento.',
    },
    {
      code: 'BC-PRE-16',
      title: 'Marca de identidade',
      caption: 'A tatuagem permanece como parte dela, mesmo quando a vida inteira precisa caber no equipamento.',
      src: 'img-presente/personagens/13_Tatuagem_no_antebraco.png',
      alt: 'Detalhe da tatuagem no antebraço de Britney.',
    },
    {
      code: 'BC-PRE-17',
      title: 'Dentro da fábrica',
      caption: 'No prédio industrial, Britney observa as estruturas antes de escolher por onde passar.',
      src: 'img-presente/personagens/16_Fabrica_rosto_referencia_2.png',
      alt: 'Britney examina o interior de uma fábrica abandonada.',
    },
    {
      code: 'BC-PRE-18',
      title: 'Luz no corredor',
      caption: 'A luz fria atravessa o espaço abandonado; ela mantém o foco no que existe além dela.',
      src: 'img-presente/personagens/18_Loira_na_fabrica_versao_2.png',
      alt: 'Britney em um corredor de fábrica abandonada.',
    },
    {
      code: 'BC-PRE-19',
      title: 'Registro da instalação',
      caption: 'Um retrato preservado durante a operação, com a atenção ainda voltada ao entorno.',
      src: 'img-presente/personagens/20_Na_instalacao_tom_de_pele_ajustado.png',
      alt: 'Britney dentro de uma instalação abandonada.',
    },
    {
      code: 'BC-PRE-20',
      title: 'Infiltração em equipe',
      caption: 'Britney, Naomi e Bobby atravessam juntos a instalação, cada um atento a um ângulo distinto.',
      src: 'img-presente/personagens/22_Infiltracao_com_Naomi_e_Bobby_versao_2.png',
      alt: 'Britney, Naomi e Bobby durante uma infiltração em uma instalação.',
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

  function preloadNextRecord(index) {
    const nextRecord = records[(index + 1) % records.length];
    const preload = new Image();
    preload.decoding = 'async';
    preload.src = nextRecord.src;
  }

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
      preloadNextRecord(current);
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
})();
