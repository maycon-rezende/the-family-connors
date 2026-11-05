(() => {
  'use strict';

  const leadRecords = [
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

  const sequenceRecords = [
    ['naomi.png', 'Retrato de campo', 'Retrato de Naomi Yagami no presente.'],
    ['naomi-yagami.png', 'Naomi Yagami', 'Naomi observa o ambiente antes de avançar.'],
    ['naomi-presente.png', 'Pausa no acampamento', 'Naomi no acampamento dos Hellsings.'],
    ['afiando-katana.png', 'Preparação', 'Naomi afia sua katana antes de sair.'],
    ['afiando.png', 'Lâmina pronta', 'Naomi confere o fio da katana.'],
    ['exploracao.png', 'Exploração', 'Naomi avança por uma área abandonada.'],
    ['encontrando-esconderijo.png', 'Abrigo à vista', 'Naomi localiza um possível esconderijo.'],
    ['sirene-foi-descoberta.png', 'O alarme', 'Uma sirene denuncia a presença do grupo.'],
    ['escondendo-hotel.png', 'Hotel em silêncio', 'Naomi procura cobertura dentro de um hotel.'],
    ['acao.png', 'Ação', 'Naomi reage quando a rota deixa de estar segura.'],
    ['escapando.png', 'Saída de serviço', 'Naomi escapa por uma passagem de serviço.'],
    ['seguindo-rastro.png', 'Seguindo o rastro', 'Naomi acompanha os sinais deixados no caminho.'],
    ['passagem-secreta.png', 'Passagem oculta', 'Naomi encontra uma passagem escondida.'],
    ['passagem-secreta-aberta.png', 'A passagem se abre', 'Naomi abre a passagem oculta.'],
    ['esconderijo.png', 'Refúgio', 'O grupo alcança um esconderijo temporário.'],
    ['som-atraiu.png', 'Ruído ao longe', 'Um som inesperado ameaça revelar a posição do grupo.'],
    ['rota-de-fuga.png', 'Rota de fuga', 'Naomi identifica uma rota para deixar a área.'],
    ['fugindo.png', 'Retirada', 'Naomi conduz a fuga por uma área em ruínas.'],
    ['blocoacoes.png', 'Bloqueando o acesso', 'O grupo tenta conter o avanço atrás de si.'],
    ['prisioneiros.png', 'Prisioneiros', 'Naomi encontra sobreviventes mantidos em cativeiro.'],
    ['save-prisioneiros.png', 'Libertação', 'Naomi ajuda a retirar os prisioneiros.'],
    ['resgate.png', 'Operação de resgate', 'O grupo inicia a retirada dos sobreviventes.'],
    ['resgate1.png', 'Rota segura', 'Naomi acompanha os sobreviventes durante o resgate.'],
    ['naomi-e-zoe.png', 'Naomi e Zoe', 'Naomi e Zoe seguem juntas pela zona de evacuação.'],
    ['fugindo1.png', 'Atravessando a rua', 'Naomi e o grupo atravessam uma rua exposta.'],
    ['fugindo2.png', 'Último trecho', 'O grupo corre para alcançar a saída.'],
    ['naomi-e-zoe-encontra-o-carro.png', 'O carro', 'Naomi e Zoe alcançam o veículo de fuga.'],
    ['resgate2.png', 'Retirada em andamento', 'O resgate continua enquanto o grupo deixa a área.'],
    ['acampamento-hellsings.png', 'Chegada ao acampamento', 'Naomi chega ao acampamento dos Hellsings.'],
    ['indo-ate-jack.png', 'Em direção a Jack', 'Naomi atravessa o acampamento para encontrar Jack.'],
    ['roupa-nova.png', 'Novo equipamento', 'Naomi aparece com sua nova roupa de campo no acampamento dos Hellsings.'],
    ['naomi-hilary.png', 'Uma pausa com Hilary', 'Naomi e Hilary dividem um momento descontraído no acampamento.'],
  ].map(([file, title, alt], index) => ({
    code: 'N-05.Q' + String(index + 1).padStart(2, '0'),
    title,
    alt,
    src: 'img-naomi-presente/' + file,
  }));

  const records = [...leadRecords, ...sequenceRecords];

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
  const preloadedSources = new Set([records[0].src]);

  const digits = (value) => String(value).padStart(2, '0');

  function preloadNext() {
    const record = records[(current + 1) % records.length];
    if (preloadedSources.has(record.src)) return;
    preloadedSources.add(record.src);
    const preload = new Image();
    preload.decoding = 'async';
    preload.src = record.src;
  }

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
    window.setTimeout(preloadNext, 900);
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

  let touchStartX = null;
  stage.addEventListener('touchstart', (event) => {
    if (event.target.closest('button')) {
      touchStartX = null;
      return;
    }
    touchStartX = event.changedTouches[0]?.clientX ?? null;
  }, { passive: true });
  stage.addEventListener('touchend', (event) => {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) < 48) return;
    go(current + (distance < 0 ? 1 : -1));
  }, { passive: true });

  stage.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(current - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(current + 1);
    }
  });

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
    function showLightbox(record) {
      dialogImage.src = record.src;
      dialogImage.alt = record.alt;
      dialogCode.textContent = record.code;
      dialogTitle.textContent = record.title;
      if (typeof dialog.showModal === 'function') dialog.showModal();
    }

    open.addEventListener('click', () => {
      showLightbox(records[current]);
      stopCycle();
    });

    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', startCycle);
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  setRecord(0, true);
  startCycle();
  window.setTimeout(preloadNext, 1200);
})();
