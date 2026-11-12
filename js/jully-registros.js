(() => {
  'use strict';

  const originalRecords = [
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
    {
      code: 'JC-PRE-06',
      title: 'Em movimento no acampamento',
      caption: 'Jully atravessa a base dos Hellsings entre uma tarefa e a próxima.',
      src: 'img-jully/jully-presente.png',
      alt: 'Jully Connor caminhando pelo acampamento dos Hellsings no presente',
    },
    {
      code: 'JC-PRE-07',
      title: 'Um lugar para respirar',
      caption: 'Do alto do acampamento, Jully mede a distância entre o que foi perdido e o que ainda pode ser reconstruído.',
      src: 'img-hellsing/jully-presente.png',
      alt: 'Jully observa o acampamento e a cidade ao longe',
    },
    {
      code: 'JC-PRE-08',
      title: 'Suprimentos para todos',
      caption: 'Ela confere cada pacote antes de entregá-lo: no acampamento, cuidado também é saber dividir.',
      src: 'img-hellsing/jully-presente1.png',
      alt: 'Jully organiza suprimentos para uma pessoa no acampamento',
    },
    {
      code: 'JC-PRE-09',
      title: 'A rota compartilhada',
      caption: 'Jully ensina a equipe a ler o mapa para que cada pessoa saiba onde encontrar abrigo e como voltar.',
      src: 'img-hellsing/jully-presente-ensinando.png',
      alt: 'Jully orienta jovens Hellsings ao redor de um mapa',
    },
    {
      code: 'JC-PRE-10',
      title: 'Cuidado que se aprende',
      caption: 'Ela mostra como fazer um curativo com calma; amanhã, quem aprende hoje poderá cuidar de outra pessoa.',
      src: 'img-hellsing/jully-ensinando.png',
      alt: 'Jully ensina primeiros socorros a uma jovem no acampamento',
    },
    {
      code: 'JC-PRE-11',
      title: 'Pronta para seguir',
      caption: 'Antes da próxima tarefa, Jully verifica o equipamento e mantém as mãos livres para ajudar.',
      src: 'img-hellsing/jully-connor-presente.png',
      alt: 'Jully Connor em pé no acampamento, pronta para uma missão',
    },
    {
      code: 'JC-PRE-12',
      title: 'O abrigo ainda respira',
      caption: 'Entre mapas, ferramentas e luz baixa, ela encontra alguns minutos para reorganizar o próximo passo.',
      src: 'img-hellsing/jull.png',
      alt: 'Jully dentro de um abrigo, junto a mapas e equipamentos',
    },
  ];

  const supplementalImages = [
    'img-jully-presente/02_Imagens_individuais_e_trajes/Anel de noivado à luz da lanterna.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Guerreira ruiva em armadura pós-apocalíptica.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Guerreira ruiva em armadura púrpura.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully com jeans azuis de cintura alta.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully como Nina no comboio pós-apocalíptico.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully Connor com top amarelo no acampamento.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully Connor como Frost no comboio.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully Connor como Vanessa no comboio.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully Connor em traje formal de combate.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully Connor em traje tático preto.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully Connor entre caminhões e tendas.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully Connor junto à barraca.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully Connor na tenda ao entardecer.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully Connor no acampamento ao amanhecer.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully Connor no acampamento de sobrevivência.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully Connor no comboio de sobreviventes.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully Connor no comboio dos sobreviventes.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully Connor no comboio pós-apocalíptico.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully Connor no comboio pós-apocalíptico(1).png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully Connor no traje de Sindel.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully em traje gótico vinho e preto.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully no comboio pós-apocalíptico.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Jully no crepúsculo com traje tático roxo.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Ninja magenta no acampamento Hellsing.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Ninja magenta no acampamento pós-apocalíptico.png',
    'img-jully-presente/02_Imagens_individuais_e_trajes/Sobrevivente ruiva no acampamento pós-apocalíptico.png',
    'img-jully-presente/03_Na_cachoeira/Irmãs à margem da cachoeira.png',
    'img-jully-presente/03_Na_cachoeira/Irmãs e borboleta junto à cachoeira.png',
    'img-jully-presente/03_Na_cachoeira/Irmãs nadam lado a lado na cachoeira.png',
    'img-jully-presente/03_Na_cachoeira/Irmãs relaxando na cachoeira.png',
    'img-jully-presente/03_Na_cachoeira/Irmãs rindo na cachoeira.png',
    'img-jully-presente/03_Na_cachoeira/Irmãs sorrindo à beira da cachoeira.png',
    'img-jully-presente/03_Na_cachoeira/Jully Connor na cachoeira da floresta.png',
    'img-jully-presente/03_Na_cachoeira/Jully Connor na cachoeira.png',
    'img-jully-presente/03_Na_cachoeira/Jully descobre uma cachoeira pós-apocalíptica.png',
    'img-jully-presente/03_Na_cachoeira/Jully escreve à beira da cachoeira.png',
    'img-jully-presente/03_Na_cachoeira/Jully no poço da cachoeira.png',
    'img-jully-presente/03_Na_cachoeira/Jully pisa na água da cachoeira.png',
    'img-jully-presente/03_Na_cachoeira/Jully se prepara para nadar.png',
    'img-jully-presente/03_Na_cachoeira/Mergulho tranquilo na cachoeira da floresta.png',
    'img-jully-presente/03_Na_cachoeira/Olhar sereno diante da cachoeira.png',
    'img-jully-presente/03_Na_cachoeira/Passo cauteloso na piscina da cachoeira.png',
    'img-jully-presente/04_Com_familia_e_outras_pessoas/Cunhadas na clínica do acampamento.png',
    'img-jully-presente/04_Com_familia_e_outras_pessoas/Encontro familiar ao pôr do sol.png',
    'img-jully-presente/04_Com_familia_e_outras_pessoas/Irmãos abraçados ao pôr do sol.png',
    'img-jully-presente/04_Com_familia_e_outras_pessoas/Irmãos caminhando juntos no acampamento.png',
    'img-jully-presente/04_Com_familia_e_outras_pessoas/Irmãos unidos ao pôr do sol.png',
    'img-jully-presente/04_Com_familia_e_outras_pessoas/Jully ajuda Alice na clínica do acampamento.png',
    'img-jully-presente/04_Com_familia_e_outras_pessoas/Quatro irmãos à luz da fogueira.png',
    'img-jully-presente/04_Com_familia_e_outras_pessoas/Quatro irmãos diante do horizonte.png',
    'img-jully-presente/04_Com_familia_e_outras_pessoas/Quatro irmãos diante do pôr do sol.png',
    'img-jully-presente/04_Com_familia_e_outras_pessoas/Quatro irmãos no acampamento Hellsing.png',
  ];

  const supplementalRecords = supplementalImages.map((src, index) => {
    const title = src.slice(src.lastIndexOf('/') + 1).replace(/\.png$/i, '');
    const category = src.includes('/03_')
      ? 'cachoeira'
      : src.includes('/04_')
        ? 'família'
        : 'acampamento';
    const captions = {
      acampamento: 'Um recorte do presente de Jully, entre a vigília da base e as rotas do comboio.',
      cachoeira: 'Longe dos alarmes, Jully e as irmãs encontram um raro intervalo de paz.',
      família: 'Entre os Hellsings, os laços que Jully protege também encontram lugar neste arquivo.',
    };

    return {
      code: 'JC-PRE-' + String(index + 13).padStart(2, '0'),
      title,
      caption: captions[category],
      src,
      alt: 'Registro do presente de Jully Connor: ' + title + '.',
      thumbnail: category.toLocaleUpperCase('pt-BR'),
    };
  });

  const records = [...originalRecords, ...supplementalRecords];

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
  const selectorRail = document.querySelector('[data-record-selectors]');
  let selectors = [];
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

  function renderSelectors() {
    const fragment = document.createDocumentFragment();

    records.forEach((record, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.recordSelect = String(index);
      button.setAttribute('aria-pressed', String(index === 0));
      button.setAttribute('aria-label', `Ver registro ${digits(index + 1)}: ${record.title}`);

      const thumbnail = document.createElement('img');
      thumbnail.src = record.src;
      thumbnail.alt = '';
      thumbnail.setAttribute('aria-hidden', 'true');
      thumbnail.loading = 'lazy';
      thumbnail.decoding = 'async';

      const label = document.createElement('span');
      const shortTitle = record.title.split(/\s+/).slice(0, 2).join(' ').toLocaleUpperCase('pt-BR');
      label.textContent = `${digits(index + 1)} // ${record.thumbnail || shortTitle}`;

      button.append(thumbnail, label);
      fragment.append(button);
    });

    selectorRail.replaceChildren(fragment);
    selectors = [...selectorRail.querySelectorAll('[data-record-select]')];
  }

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
        if (token !== transition) return;
        image.classList.add('is-visible');
        preloadNextRecord(current);
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

  renderSelectors();

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
})();
