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

  const collectionRecords = [
    ['01-naomi-sozinha/naomi-001-primeiro-traje-inspirado-na-kitana.jpg', 'Primeiro traje de campo', 'O traje azul e preto marca uma das primeiras imagens preservadas desta fase de Naomi.', 'Naomi em traje de campo azul e preto inspirado na Kitana, com duas katanas nas costas.'],
    ['01-naomi-sozinha/naomi-002-traje-kitana-em-acao.jpg', 'Duas lâminas em movimento', 'No meio da rua destruída, Naomi já escolheu o espaço por onde vai passar.', 'Naomi luta com duas katanas em uma rua em ruínas.'],
    ['01-naomi-sozinha/naomi-003-traje-kitana-preto-e-azul.jpg', 'Azul e preto', 'Um retrato do conjunto que se tornou parte da presença de Naomi em campo.', 'Naomi posa no acampamento usando traje preto e azul, com as katanas presas às costas.'],
    ['01-naomi-sozinha/naomi-005-kitana-ajustes-do-traje.jpg', 'Últimos ajustes', 'Antes de sair, ela confere o equipamento e deixa cada peça no lugar.', 'Naomi ajusta o traje e o equipamento no acampamento dos Hellsings.'],
    ['01-naomi-sozinha/naomi-006-kitana-acao-na-rua.jpg', 'A rua não está vazia', 'A passagem estreita obriga Naomi a reagir sem perder o equilíbrio.', 'Naomi se movimenta com uma katana entre os destroços de uma rua.'],
    ['01-naomi-sozinha/naomi-009-chegada-a-tenda-dos-hellsings.jpg', 'Chegada à tenda', 'Um instante no acampamento, entre a missão que terminou e a próxima chamada.', 'Naomi chega à tenda dos Hellsings com as katanas nas costas.'],
    ['01-naomi-sozinha/naomi-010-retrato-no-acampamento.jpg', 'Retrato no acampamento', 'Mesmo cercada pela rotina da equipe, Naomi mantém os olhos atentos ao entorno.', 'Retrato de Naomi no acampamento dos Hellsings, em traje de campo.'],
    ['01-naomi-sozinha/naomi-014-oracao-diante-da-familia.jpg', 'Nomes que ela carrega', 'Diante das fotografias, Naomi encontra um silêncio que nenhuma frequência consegue preencher.', 'Naomi faz uma oração diante de fotografias de sua família.'],
    ['01-naomi-sozinha/naomi-015-guardando-as-katanas-no-altar.jpg', 'Antes de guardar as lâminas', 'Um gesto de cuidado encerra o dia por alguns minutos.', 'Naomi guarda as katanas diante de um pequeno altar com fotografias.'],
    ['01-naomi-sozinha/naomi-030-naomi-observando-a-cidade-do-penhasco.jpg', 'A cidade abaixo', 'Do alto, ela observa as ruínas e mede a distância até o próximo caminho.', 'Naomi observa uma cidade destruída do alto de um penhasco.'],
    ['01-naomi-sozinha/naomi-032-naomi-olhando-para-tras-no-penhasco.jpg', 'Olhar para trás', 'O horizonte está à frente, mas Naomi ainda verifica quem ficou no caminho.', 'Naomi olha para trás enquanto observa a cidade do penhasco.'],
    ['01-naomi-sozinha/naomi-033-naomi-sobre-a-cidade-ao-entardecer.jpg', 'Luz sobre as ruínas', 'O fim do dia não torna a cidade menos perigosa; apenas muda as sombras.', 'Naomi contempla a cidade em ruínas ao entardecer.'],
    ['01-naomi-sozinha/naomi-034-katanas-maiores-no-penhasco.jpg', 'No limite do penhasco', 'A versão revisada da cena mantém Naomi diante da cidade, com as duas katanas bem visíveis.', 'Naomi observa a cidade do penhasco com duas katanas longas nas costas.'],
    ['01-naomi-sozinha/naomi-035-naomi-como-atriz-no-penhasco.jpg', 'A cidade ao entardecer', 'Por um instante, o acampamento e as vozes da equipe ficam longe.', 'Naomi olha para uma cidade em ruínas ao pôr do sol, vista de um penhasco.'],
    ['01-naomi-sozinha/naomi-041-naomi-sozinha-em-rua-destruida.jpg', 'Uma rua destruída', 'Ela avança sozinha pelo que restou da avenida, sem deixar de observar as janelas.', 'Naomi caminha por uma rua destruída com as katanas nas costas.'],
    ['01-naomi-sozinha/naomi-042-naomi-em-pe-depois-do-combate.jpg', 'Depois do confronto', 'Quando o movimento cessa, Naomi continua de pé e ainda procura sinais de perigo.', 'Naomi permanece em pé em uma rua destruída após um confronto.'],
    ['01-naomi-sozinha/naomi-048-retrato-solitario-entre-ruinas.jpg', 'Entre as ruínas', 'Um retrato próximo, sem pose de vitória: só a atenção de quem ainda está de serviço.', 'Retrato de Naomi entre construções destruídas.'],
    ['01-naomi-sozinha/naomi-051-naomi-de-corpo-inteiro-nas-ruinas.jpg', 'Ponto de observação', 'Naomi verifica o terreno antes de escolher por onde seguir.', 'Naomi observa uma área em ruínas, de corpo inteiro e com duas katanas.'],
    ['01-naomi-sozinha/naomi-052-corpo-inteiro-rosto-de-referencia.jpg', 'Rosto conhecido', 'Um registro de corpo inteiro que preserva os traços definidos para Naomi.', 'Naomi de corpo inteiro em traje de campo azul e preto entre construções abandonadas.'],
    ['01-naomi-sozinha/naomi-053-corpo-inteiro-tratamento-realista.jpg', 'Vigília no bosque', 'A vegetação retomou parte do espaço; Naomi ainda não confia no silêncio.', 'Naomi observa o bosque em traje de campo e com as katanas nas costas.'],
    ['01-naomi-sozinha/naomi-054-naomi-caminhando-sozinha-pela-rua.jpg', 'Ronda solitária', 'Ela segue pela rua com o passo medido de quem escuta antes de avançar.', 'Naomi caminha sozinha por uma rua pós-apocalíptica.'],
    ['01-naomi-sozinha/naomi-055-naomi-de-corpo-inteiro-versao-revista.jpg', 'Pronta para avançar', 'A versão revista do retrato mantém o equipamento completo e a postura alerta.', 'Naomi de corpo inteiro, equipada com duas katanas, em um caminho entre ruínas.'],
    ['01-naomi-sozinha/naomi-056-naomi-em-traje-kitana-realismo.jpg', 'Traje de combate', 'Uma leitura mais realista do visual de combate azul e preto.', 'Naomi em traje de combate azul e preto, de corpo inteiro, em uma rua abandonada.'],
    ['01-naomi-sozinha/naomi-057-naomi-desembainhando-duas-katanas.jpg', 'Duas katanas desembainhadas', 'O primeiro movimento é curto; a decisão já foi tomada.', 'Naomi desembainha duas katanas diante dos destroços.'],
    ['01-naomi-sozinha/naomi-058-naomi-em-acao-contra-infectados.jpg', 'Abrindo passagem', 'Naomi ocupa a linha de frente para manter o caminho livre.', 'Naomi enfrenta infectados com duas katanas em uma rua destruída.'],
    ['01-naomi-sozinha/naomi-059-naomi-de-pe-com-katanas-longas.jpg', 'Lâminas longas', 'Ela para por um segundo e avalia o terreno antes de continuar.', 'Naomi fica de pé entre ruínas com duas katanas longas.'],
    ['01-naomi-sozinha/naomi-060-naomi-em-acao-ultima-imagem.jpg', 'Última linha', 'Naomi protege o espaço atrás dela enquanto o perigo ainda está perto.', 'Naomi luta com duas katanas diante de sobreviventes em uma rua destruída.'],

    ['02-naomi-e-bobby/naomi-016-naomi-e-bobby-em-oracao.jpg', 'Silêncio entre irmãos', 'Naomi e Bobby encontram alguns minutos para lembrar da família.', 'Naomi e Bobby ajoelhados diante de fotografias em um pequeno altar.'],
    ['02-naomi-e-bobby/naomi-017-naomi-e-bobby-no-comboio.jpg', 'Entre os veículos', 'Os irmãos atravessam o comboio atentos ao movimento do acampamento.', 'Naomi e Bobby caminham juntos pelo acampamento dos Hellsings.'],
    ['02-naomi-e-bobby/naomi-018-naomi-e-bobby-analisando-mapa.jpg', 'Uma rota a dois', 'Bobby lê o mapa; Naomi acompanha cada possibilidade de entrada e saída.', 'Naomi e Bobby analisam um mapa sobre a mesa do acampamento.'],
    ['02-naomi-e-bobby/naomi-019-retrato-dos-irmaos-no-comboio.jpg', 'Irmãos de guarda', 'Mesmo fora de uma missão, os dois continuam atentos ao entorno.', 'Naomi e Bobby em pé juntos no acampamento, com suas espadas.'],
    ['02-naomi-e-bobby/naomi-020-retrato-dos-irmaos-revisado.jpg', 'Lado a lado', 'Um retrato revisado dos dois, no lugar que aprenderam a chamar de base.', 'Naomi e Bobby posam lado a lado no comboio dos Hellsings.'],
    ['02-naomi-e-bobby/naomi-021-os-irmaos-indo-ao-arsenal.jpg', 'Rumo ao arsenal', 'Antes da saída, os irmãos conferem o que a equipe vai levar.', 'Naomi e Bobby caminham em direção ao arsenal do acampamento.'],
    ['02-naomi-e-bobby/naomi-022-indo-ao-arsenal-versao-alternativa.jpg', 'Equipamento conferido', 'Uma segunda vista da preparação dos irmãos antes de uma missão.', 'Naomi e Bobby atravessam o acampamento em direção ao arsenal.'],
    ['02-naomi-e-bobby/naomi-023-os-irmaos-caminhando-juntos.jpg', 'A mesma direção', 'Nem toda jornada exige conversa; às vezes basta seguir no mesmo passo.', 'Naomi e Bobby caminham juntos pelo acampamento dos Hellsings.'],
    ['02-naomi-e-bobby/naomi-025-bobby-e-naomi-examinando-equipamentos.jpg', 'Inspeção de campo', 'Bobby verifica o equipamento enquanto Naomi acompanha cada detalhe.', 'Bobby e Naomi examinam juntos um equipamento no acampamento.'],
    ['02-naomi-e-bobby/naomi-026-treino-de-espadas-entre-irmaos.jpg', 'Treino de lâminas', 'A confiança entre os dois também foi construída durante o treino.', 'Naomi e Bobby treinam com espadas no acampamento.'],
    ['02-naomi-e-bobby/naomi-027-treino-corpo-a-corpo-entre-irmaos.jpg', 'Conhecer o movimento', 'Bobby e Naomi testam os reflexos um do outro sem perder o cuidado.', 'Naomi e Bobby treinam combate corpo a corpo.'],
    ['02-naomi-e-bobby/naomi-028-descanso-dos-irmaos-ao-pe-da-arvore.jpg', 'Uma pausa rara', 'Por alguns minutos, nenhum dos dois precisa vigiar a porta.', 'Naomi descansa ao lado de Bobby sob uma árvore no acampamento.'],
    ['02-naomi-e-bobby/naomi-029-preparando-equipamentos-do-comboio.jpg', 'Preparando o comboio', 'Um mapa aberto e equipamento à mão: os irmãos preparam a próxima saída.', 'Naomi e Bobby organizam o mapa e os equipamentos para o comboio.'],
    ['02-naomi-e-bobby/naomi-036-bobby-chegando-ao-penhasco.jpg', 'Ele chegou', 'Naomi vê Bobby se aproximar enquanto a cidade se estende abaixo deles.', 'Bobby chega ao penhasco onde Naomi observa a cidade.'],
    ['02-naomi-e-bobby/naomi-037-encontro-dos-irmaos-no-penhasco.jpg', 'Encontro no horizonte', 'O horizonte oferece espaço para dizer o que o rádio não alcança.', 'Naomi e Bobby se encontram no penhasco ao pôr do sol.'],
    ['02-naomi-e-bobby/naomi-038-abraco-fraterno-ao-entardecer.jpg', 'O abraço que ficou', 'Depois de tanto tempo em movimento, os irmãos param e se abraçam.', 'Naomi e Bobby se abraçam diante da cidade ao entardecer.'],
    ['02-naomi-e-bobby/naomi-039-naomi-olhando-para-bobby.jpg', 'Ela o reconhece', 'Antes de qualquer palavra, Naomi percebe que Bobby está de volta.', 'Naomi olha para Bobby, que se aproxima ao fundo no penhasco.'],
    ['02-naomi-e-bobby/naomi-040-naomi-e-bobby-frente-a-frente.jpg', 'Frente a frente', 'Um reencontro sem pressa, com a cidade destruída atrás deles.', 'Naomi e Bobby conversam frente a frente no penhasco.'],
    ['02-naomi-e-bobby/naomi-043-naomi-e-bobby-protegendo-sobreviventes.jpg', 'Abertura para os civis', 'Bobby segura a linha enquanto Naomi protege quem está tentando passar.', 'Naomi e Bobby protegem sobreviventes em uma rua destruída.'],
    ['02-naomi-e-bobby/naomi-044-a-escolta-dos-sobreviventes.jpg', 'Escolta em movimento', 'Os dois avançam junto ao grupo, mantendo os sobreviventes entre eles.', 'Naomi e Bobby escoltam um grupo de sobreviventes pelas ruínas.'],
    ['02-naomi-e-bobby/naomi-046-naomi-e-bobby-analisando-mapa.jpg', 'O plano sobre a mesa', 'Uma rota é traçada enquanto os irmãos comparam o que viram em campo.', 'Naomi e Bobby analisam juntos um mapa em um abrigo.'],
    ['02-naomi-e-bobby/naomi-047-protegendo-grupo-em-rua-destruida.jpg', 'Proteção na travessia', 'A passagem é estreita, mas a equipe não deixa o grupo para trás.', 'Naomi e Bobby protegem sobreviventes durante a travessia de uma rua destruída.'],
    ['02-naomi-e-bobby/naomi-049-planejamento-no-abrigo.jpg', 'Planejamento no abrigo', 'Os irmãos revisam o mapa e a próxima saída sob a luz do abrigo.', 'Naomi e Bobby planejam uma rota em uma mesa de abrigo.'],
    ['02-naomi-e-bobby/naomi-050-naomi-e-bobby-escoltando-sobreviventes.jpg', 'Até todos passarem', 'Bobby e Naomi avançam junto ao comboio até o último sobrevivente alcançar a saída.', 'Naomi e Bobby escoltam sobreviventes por uma rua em ruínas.'],

    ['03-naomi-com-hellen/naomi-011-naomi-caminhando-com-hellen.jpg', 'Caminhando com Hellen', 'Naomi atravessa o acampamento ao lado de Hellen, longe do ruído das missões.', 'Naomi caminha pelo acampamento ao lado de Hellen.'],
    ['03-naomi-com-hellen/naomi-013-naomi-e-hellen-em-conversa.jpg', 'Uma conversa com Hellen', 'As duas compartilham um momento de confiança entre uma tarefa e outra.', 'Naomi conversa com Hellen no acampamento dos Hellsings.'],
  ].map(([file, title, caption, alt], index) => ({
    code: 'N-05.Q' + String(index + sequenceRecords.length + 1).padStart(2, '0'),
    title,
    caption: caption + ' Data não identificada.',
    alt,
    src: 'img-naomi-presente/galeria/' + file,
  }));

  const records = [...leadRecords, ...sequenceRecords, ...collectionRecords];

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
