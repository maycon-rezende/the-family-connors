(() => {
  const records = {
    hellsings: {
      kind: 'FACÇÃO F-01 // COMANDO JACK CONNOR', code: 'H-01', state: 'BASE CLASSIFICADA', certainty: 'confirmed',
      title: 'O bunker que ouviu o mundo cair', location: 'Propriedade Connor // localização geral protegida',
      copy: 'Quando o Dia D começou, Mark, Britney, Jully e os Hellsings chegaram à propriedade com as pessoas que conseguiram resgatar. Antes do impacto, a equipe desceu ao bunker projetado para resistir ao ataque. Anos depois, Brian voltaria de uma saída de campo infectado e morreria na enfermaria dessa mesma base. O mapa conserva o lugar. A coordenada, não.',
      image: 'img-presente/personagens/base.png', alt: 'Integrantes dos Hellsings dentro de sua base subterrânea.', caption: 'RECONSTRUÇÃO VISUAL // A BASE É REGISTRADA; ESTA IMAGEM NÃO FIXA SUA GEOGRAFIA.', link: 'faccao-hellsings-presente.html', linkLabel: 'DOSSIÊ DOS HELLSINGS'
    },
    salt: {
      kind: 'FACÇÃO F-06 // ORDEM DO SAL', code: 'F-06 / B-01', state: 'TERRITÓRIO REGISTRADO', certainty: 'confirmed',
      title: 'Bacia Branca', location: 'Cidadela da Primeira Fonte // posição regional em aberto',
      copy: 'Quatro torres de condensação guardam a fonte, as cisternas e o arquivo de mapas de água. Alice negociou um corredor médico entre o bunker e a Bacia. Os Hellsings protegem equipes que procuram aquíferos em zonas controladas por traficantes. É a passagem entre facções mais concreta nos registros atuais.',
      image: 'img-presente/personagens/civis.png', alt: 'Equipe Hellsings em um mercado de sobreviventes.', caption: 'IMAGEM DE AMBIENTAÇÃO // O CORREDOR MÉDICO EXISTE NA LORE; ESTA CENA NÃO É UMA FOTOGRAFIA DA BACIA.', link: 'faccao-ordem-sal.html', linkLabel: 'DOSSIÊ DA ORDEM DO SAL'
    },
    cobras: {
      kind: 'FACÇÃO F-02 // COBRAS', code: 'F-02 / SUBSOLO', state: 'TERRITÓRIO REGISTRADO', certainty: 'confirmed',
      title: 'Serpentário', location: 'Estação terminal sob uma metrópole coberta pela areia',
      copy: 'As Cobras transformaram túneis de serviço, galerias e reservatórios numa cidade subterrânea. A entrada muda de semana a semana. Jack e Helena mantêm uma trégua fria; as Cobras guardam fragmentos sobre a rota de Braddock. O arquivo anuncia que os Hellsings precisarão atravessar o território, mas ainda não registra essa passagem como concluída.',
      image: 'img-presente/personagens/exploracao2.png', alt: 'Equipe Hellsings avançando por uma estação subterrânea inundada.', caption: 'RECONSTRUÇÃO VISUAL // AMBIENTAÇÃO DE UMA ROTA SOB A METRÓPOLE.', link: 'faccao-cobras.html', linkLabel: 'DOSSIÊ DAS COBRAS'
    },
    fire: {
      kind: 'FACÇÃO F-04 // FACÇÃO DO FOGO', code: 'F-04 / CINTURÃO RUBRO', state: 'FRONTEIRA EM TENSÃO', certainty: 'confirmed',
      title: 'A fronteira rubra', location: 'Cinturão Rubro // sete complexos industriais',
      copy: 'O comboio de Jack se aproxima procurando a rota de Braddock. Dário recebeu ordem para detê-lo; Aurelia quer conversar antes do primeiro disparo. É um confronto iminente, ainda contido por uma escolha: ninguém abriu fogo. O mapa marca a fronteira como ponto de tensão, não como batalha consumada.',
      image: 'img-presente/personagens/destruicao.jpg', alt: 'Cidade em ruínas sob um clarão vermelho.', caption: 'IMAGEM DE AMBIENTAÇÃO // O CINTURÃO É UMA CIDADE INDUSTRIAL; A POSIÇÃO EXATA AINDA NÃO FOI DEFINIDA.', link: 'faccao-fogo.html', linkLabel: 'DOSSIÊ DA FACÇÃO DO FOGO'
    },
    iron: {
      kind: 'FACÇÃO F-05 // NÔMADES DE FERRO', code: 'F-05 / DELTA-09', state: 'POSIÇÃO MÓVEL', certainty: 'confirmed',
      title: 'A cidade que não para', location: 'Comboio dos Nômades // rota Delta-09',
      copy: 'Centenas de máquinas formam casas, oficinas, hospital e muralha. A cidade perdeu o primeiro lugar onde viveu; desde então, parar é aceitar que alguém a alcance. Sua posição muda com a rota. Os arquivos registram a ferrovia intacta encontrada em Delta-09, mas não confirmam que os Hellsings tenham acompanhado cada trecho.',
      image: 'img-presente/personagens/civilizacao-extincao.png', alt: 'Sobreviventes negociando recursos num mercado improvisado.', caption: 'IMAGEM DE AMBIENTAÇÃO // O COMBOIO É MÓVEL; ESTA CENA NÃO MOSTRA SUA LOCALIZAÇÃO.', link: 'faccao-nomades-ferro.html', linkLabel: 'DOSSIÊ DOS NÔMADES DE FERRO'
    },
    dominus: {
      kind: 'FACÇÃO F-03 // ALVO CONFIRMADO', code: 'F-03 / SEM CENTRO', state: 'SEDE NÃO LOCALIZADA', certainty: 'confirmed',
      title: 'Dominus não cabe num ponto', location: 'Sinais espalhados // nenhum centro geográfico confirmado',
      copy: 'O símbolo aparece em contratos sem autor, máquinas sem fabricante e coordenadas anteriores às cidades que deveriam indicar. Dominus é um inimigo confirmado pelos Hellsings, mas nenhum centro de operações foi localizado. O confronto final ainda está à frente; por isso o mapa mostra uma influência atravessando territórios, não uma batalha ou sede inventada.',
      image: 'img-faccoes/simbolos/dominus.svg', alt: 'Símbolo arquivado sob a identificação Dominus.', caption: 'EMBLEMA DETECTADO // NÃO É MARCADOR DE UMA SEDE.', link: 'faccao-dominus.html', linkLabel: 'DOSSIÊ DOMINUS'
    },
    dayd: {
      kind: 'DIA D // REGISTRO CONFIRMADO', code: 'EDE-00 / H-01', state: 'FATO REGISTRADO', certainty: 'confirmed',
      title: 'A noite antes do clarão', location: 'Mansão Connor → bunker → cidade sem nome',
      copy: 'A propriedade recebeu os que conseguiram chegar com vida. Da mansão, o grupo viu o míssil seguir na direção da cidade e desceu ao bunker antes do impacto. O nome da cidade não sobreviveu nos arquivos. O mapa guarda a direção do acontecimento, sem inventar distância ou coordenada.',
      image: 'img-presente/personagens/extincao.jpg', alt: 'Avenida de uma cidade devastada pelo colapso.', caption: 'IMAGEM DE AMBIENTAÇÃO // A CIDADE DO SEGUNDO CLARÃO NÃO FOI IDENTIFICADA.', link: 'index.html#cronologia', linkLabel: 'CRONOLOGIA DO DIA D'
    },
    rescue: {
      kind: 'OPERAÇÃO // PROTEÇÃO DO CORREDOR', code: 'R-01 / BACIA BRANCA', state: 'RECONSTRUÇÃO LITERÁRIA // PROPOSTA', certainty: 'proposal',
      title: 'A coluna da cisterna', location: 'Corredor médico da Bacia Branca // ponto exato em aberto',
      copy: 'Quando a bomba parou, o pedido no rádio não foi por munição. Foi por luz. Uma equipe da Ordem ficara isolada do lado errado da vala, com saqueadores fechando o corredor. Alice recusou transformar a água em preço; Mark segurou a linha de cabo enquanto Jack mandava deixar os tanques para trás. Primeiro atravessaram as pessoas. Só depois os Hellsings voltaram para buscar o equipamento. A passagem e a proteção são fatos; esta cena é uma proposta revisável.',
      image: 'img-presente/personagens/civis.png', alt: 'Sobreviventes e integrantes dos Hellsings entre suprimentos.', caption: 'RECONSTRUÇÃO VISUAL // CENA PROPOSTA PARA A PASSAGEM DA BACIA.', link: 'faccao-ordem-sal.html', linkLabel: 'ARQUIVO DA BACIA BRANCA'
    },
    border: {
      kind: 'OPERAÇÃO // HELLSINGS × FOGO', code: 'E-04 / LINHA RUBRA', state: 'IMPASSE REGISTRADO', certainty: 'confirmed',
      title: 'O primeiro disparo não veio', location: 'Entrada do Cinturão Rubro // fronteira em negociação',
      copy: 'Dário tinha ordem para deter o comboio. Aurelia queria ouvir Jack antes de mandar atirar. Os motores ficaram ligados, os faróis cortaram a poeira e ninguém baixou a arma. Naquele limite, o confronto ainda era uma decisão pendente. Essa tensão já está no arquivo da Facção do Fogo; a geografia precisa permanece esquemática.',
      image: 'img-presente/personagens/mark-jack-presente.png', alt: 'Mark e Jack Connor no presente.', caption: 'REGISTRO DOS IRMÃOS // NÃO É UMA IMAGEM DO ENCONTRO NA FRONTEIRA.', link: 'faccao-fogo.html', linkLabel: 'ARQUIVO DA FRONTEIRA RUBRA'
    },
    warning: {
      kind: 'MEMÓRIA // ZONA DE PERIGO', code: 'J-06 / ÚLTIMO SINAL', state: 'ANOTAÇÃO PROPOSTA // LOCAL INCERTO', certainty: 'danger',
      title: 'NÃO SE DEVE PISAR AQUI', location: 'Círculo final da rota de John // região aproximada, coordenada ausente',
      copy: 'O registro confirma que John ficou para trás e atraiu a horda para longe da rota de fuga. Na reconstrução proposta, Naomi marca no mapa o último sinal dele; uma segunda mão escreve por cima, em tinta vermelha: “NÃO SE DEVE PISAR AQUI”. O aviso fica onde a estrada termina. A fuga e o sacrifício são fatos; o nome do lugar, a região aproximada e a inscrição pertencem à proposta para o autor revisar.',
      image: 'img-presente/personagens/exploracao2.png', alt: 'Equipe atravessando uma estação subterrânea escura.', caption: 'RECONSTRUÇÃO VISUAL // LOCAL NÃO IDENTIFICADO; A ADVERTÊNCIA É UMA PROPOSTA NARRATIVA.', link: 'memorial.html#john', linkLabel: 'MEMORIAL DE JOHN'
    },
    brian: {
      kind: 'MEMÓRIA // BRIAN TAYLOR', code: 'BT-09 / ENFERMARIA', state: 'LOCAL DA MORTE CONFIRMADO', certainty: 'confirmed',
      title: 'Ele voltou para casa', location: 'Enfermaria do bunker Hellsings',
      copy: 'Brian foi infectado durante uma saída de campo. Ainda conseguiu voltar ao bunker e avisar a equipe. Alice e os demais usaram o que restava para cuidar dele; a infecção avançou mesmo assim. Brian morreu na enfermaria. Jack guardou os mapas e as anotações de rota que ele deixou. O lugar da infecção segue desconhecido.',
      image: 'img-hellsing/alice-examinando-taylor.png', alt: 'Alice e Jack ao lado de Brian na enfermaria do bunker.', caption: 'REGISTRO DE MEMÓRIA // BRIAN MORREU NO BUNKER; O PONTO DA INFECÇÃO NÃO FOI RECUPERADO.', link: 'brian-presente.html', linkLabel: 'MEMORIAL DE BRIAN'
    },
    'braddock-contact': {
      kind: 'PROPOSTA // JACK + MARK + MICK', code: 'BR-01 / SINAL PERDIDO', state: 'ENCONTRO PRESENCIAL FUTURO // LOCAL ABERTO', certainty: 'proposal',
      title: 'Quando a voz voltar', location: 'Estação da Agulha // nome de trabalho, região em aberto',
      copy: 'O contato por rádio e o convite de Jack para Mick encontrar os Hellsings estão confirmados. O sinal caiu antes do encontro, e os Hellsings procuraram o grupo. Esta proposta transforma a Estação da Agulha em um possível local para o encontro presencial futuro, sem fixar data ou coordenada. A composição do grupo que chegará com Mick continua aberta.',
      image: 'img-presente/personagens/mark-jack-presente.png', alt: 'Jack e Mark Connor em registro do presente.', caption: 'IMAGEM DE CONTEXTO // NÃO É UM REGISTRO DO ENCONTRO PRESENCIAL.', link: null
    },
    'braddock-crossing': {
      kind: 'PROPOSTA // OPERAÇÃO CONJUNTA', code: 'BR-02 / LEITO SECO', state: 'RESGATE E DESVIO // CENA A REVISAR', certainty: 'proposal',
      title: 'A passagem do leito seco', location: 'Galeria de drenagem sob um antigo leito de rio // local provisório',
      copy: 'Na primeira operação juntos, um grupo de sobreviventes pede ajuda de uma galeria enquanto uma horda fecha a estrada. Seguir o sinal de Braddock pode salvar a pista; desviar para a galeria pode salvar pessoas. Mark escolhe a passagem difícil. Jack e Braddock coordenam um desvio de ruído, e os grupos atravessam sem deixar ninguém para trás. A escolha aproxima os dois grupos e rende o primeiro fragmento de rota. Toda a operação é proposta, sem nova baixa oficial.',
      image: 'img-presente/personagens/civis.png', alt: 'Sobreviventes e integrantes dos Hellsings entre suprimentos.', caption: 'IMAGEM DE AMBIENTAÇÃO // NÃO DOCUMENTA A GALERIA PROPOSTA.', link: null
    },
    'braddock-fragments': {
      kind: 'PROPOSTA // LIGAÇÃO ENTRE REGISTROS', code: 'BR-03 / ROTA EM FRAGMENTOS', state: 'ORDEM SUGERIDA // A VALIDAR', certainty: 'proposal',
      title: 'O caminho cabe em fragmentos', location: 'Serpentário → Cinturão Rubro → sinal sem coordenadas',
      copy: 'Os arquivos confirmam que as Cobras guardam fragmentos da rota e que o comboio de Jack procura essa rota diante da fronteira do Cinturão Rubro. A proposta é que as duas pistas pertençam ao mesmo percurso: primeiro, uma trégua abre a negociação no Serpentário; depois, o impasse com Aurelia e Dário põe à prova a confiança de Jack. Essa ordem ainda precisa da aprovação do autor. A terra livre continua sem posição conhecida.',
      image: 'img-presente/personagens/exploracao2.png', alt: 'Equipe Hellsings avançando por uma estação subterrânea.', caption: 'IMAGEM DE AMBIENTAÇÃO // NÃO CONFIRMA UMA TRAVESSIA PELO SERPENTÁRIO.', link: 'faccao-cobras.html', linkLabel: 'ARQUIVO DAS COBRAS'
    },
    'free-land': {
      kind: 'SINAL // DESTINO PROCURADO', code: 'BR-04 / TERRA LIVRE', state: 'RUMOR // EXISTÊNCIA NÃO CONFIRMADA', certainty: 'signal',
      title: 'A casa que o sinal promete', location: 'Destino das transmissões de Braddock // sem coordenadas',
      copy: 'Braddock pode enviar coordenadas para um lugar que permaneça livre das hordas e das grandes facções. Nenhum registro confirma que alguém chegou lá. Nesta proposta, cada transmissão oferece apenas a peça necessária para continuar: uma direção, um marco, uma pergunta. O comboio avança porque ainda há gente que precisa acreditar que a estrada termina em algum lugar habitável.',
      image: 'img-presente/personagens/civilizacao-extincao.png', alt: 'Mercado improvisado entre sobreviventes.', caption: 'IMAGEM DE AMBIENTAÇÃO // NÃO É UMA PROVA DA EXISTÊNCIA DA TERRA LIVRE.', link: null
    },
    origin: {
      kind: 'ARQUIVO DE ORIGEM // EDE-00', code: 'LOCAL DE ORIGEM / ?', state: 'CAUSA E PONTO NÃO DEFINIDOS', certainty: 'signal',
      title: 'Onde começou o caos', location: 'Arquivo incompleto // nenhum lugar confirmado',
      copy: 'O colapso teve mais de um clarão e uma história que começou antes do mundo reconhecê-lo como perdido. O manuscrito ainda não fixa aqui a primeira infecção, a primeira ordem ou a primeira cidade atingida. O atlas mantém o espaço em aberto para que o começo do caos não seja confundido com o alvo do segundo clarão.',
      image: 'img-presente/personagens/destruicao.jpg', alt: 'Cidade em ruínas sob um clarão distante.', caption: 'IMAGEM DE AMBIENTAÇÃO // NÃO IDENTIFICA A ORIGEM DO CAOS.', link: 'index.html#cronologia', linkLabel: 'CRONOLOGIA DISPONÍVEL'
    },
    missions: {
      kind: 'ARQUIVO OPERACIONAL // HLS-126', code: 'HLS-126', state: 'MISSÃO REGISTRADA // SEM COORDENADAS', certainty: 'signal',
      title: 'Janela de Cinzas', location: 'Local e cronologia detalhada aguardam recuperação',
      copy: 'Uma operação da Unidade Jingwei aproximou Bobby Lee dos Hellsings. Lee escolheu retirar testemunhas em vez de preservar a vigilância da rede de tráfico; depois, colaborou com Jack e a equipe em Janela de Cinzas. O registro preserva a virada de lealdade, mas não indica uma cidade ou região onde a missão ocorreu.',
      image: null, alt: '', caption: '', link: 'bobby-presente.html', linkLabel: 'DOSSIÊ DE BOBBY LEE'
    },
    redline: {
      kind: 'ARQUIVO OPERACIONAL // HLS-131', code: 'HLS-131', state: 'MISSÃO REGISTRADA // SEM COORDENADAS', certainty: 'signal',
      title: 'Linha Vermelha', location: 'Operação Hellsings // local não recuperado',
      copy: 'Já como integrante da equipe, Bobby Lee participou de Linha Vermelha. O nome da missão sobreviveu ao arquivo; a posição no território, os demais integrantes e o resultado detalhado ainda precisam vir do livro.',
      image: null, alt: '', caption: '', link: 'bobby-presente.html', linkLabel: 'DOSSIÊ DE BOBBY LEE'
    }
  };

  const stage = document.querySelector('#atlasMapStage');
  const panel = document.querySelector('#atlasRecord');
  const markers = [...document.querySelectorAll('[data-atlas-point]')];
  const launchers = [...document.querySelectorAll('[data-atlas-open]')];
  const filters = [...document.querySelectorAll('[data-atlas-filter]')];
  const field = {
    kind: document.querySelector('[data-record-class]'), code: document.querySelector('[data-record-code]'),
    state: document.querySelector('[data-record-state]'), stateWrap: document.querySelector('.record-state'),
    title: document.querySelector('[data-record-title]'), location: document.querySelector('[data-record-location]'),
    copy: document.querySelector('[data-record-copy]'), visual: document.querySelector('[data-record-visual]'),
    image: document.querySelector('[data-record-image]'), caption: document.querySelector('[data-record-caption]'),
    link: document.querySelector('[data-record-link]'), reference: document.querySelector('[data-record-reference]')
  };
  const dialog = document.querySelector('.atlas-image-dialog');
  const lightboxImage = document.querySelector('[data-lightbox-image]');
  const lightboxCaption = document.querySelector('[data-lightbox-caption]');
  const openImage = document.querySelector('[data-open-image]');
  let imageTrigger = null;
  let panelPulseTimeout = null;

  if (!stage || !panel || !field.title) return;

  const selectRecord = (id, source = null) => {
    const record = records[id];
    if (!record) return;
    field.kind.textContent = record.kind;
    field.code.textContent = record.code;
    field.state.textContent = record.state;
    field.stateWrap.dataset.state = record.certainty;
    field.title.textContent = record.title;
    field.location.textContent = record.location;
    field.copy.textContent = record.copy;
    field.reference.textContent = record.certainty === 'proposal'
      ? 'CENA PROPOSTA // SUJEITA À REVISÃO DO AUTOR'
      : record.certainty === 'signal'
        ? 'ARQUIVO INCOMPLETO // POSIÇÃO OU STATUS EM ABERTO'
        : record.certainty === 'danger'
          ? 'ADVERTÊNCIA EM DESTAQUE // LOCAL APROXIMADO'
          : 'LORE REGISTRADA // ESCALA CARTOGRÁFICA ESQUEMÁTICA';

    if (record.image) {
      field.image.src = record.image;
      field.image.alt = record.alt;
      field.caption.textContent = record.caption;
      field.visual.hidden = false;
      openImage.setAttribute('aria-label', `Ampliar: ${record.alt}`);
    } else {
      field.visual.hidden = true;
      field.image.removeAttribute('src');
      field.image.alt = '';
    }

    if (record.link) {
      field.link.href = record.link;
      field.link.textContent = record.linkLabel;
      field.link.hidden = false;
    } else {
      field.link.hidden = true;
    }

    markers.forEach((marker) => {
      marker.setAttribute('aria-pressed', String(marker.dataset.atlasPoint === id));
    });
    launchers.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.atlasOpen === id));
    });
    panel.classList.remove('is-transmitting');
    window.clearTimeout(panelPulseTimeout);
    void panel.offsetWidth;
    panel.classList.add('is-transmitting');
    panelPulseTimeout = window.setTimeout(() => panel.classList.remove('is-transmitting'), 750);
    if (source && window.matchMedia('(max-width: 1120px)').matches) {
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  markers.forEach((marker) => marker.addEventListener('click', () => selectRecord(marker.dataset.atlasPoint, marker)));
  launchers.forEach((button) => button.addEventListener('click', () => selectRecord(button.dataset.atlasOpen, button)));

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      const key = filter.dataset.atlasFilter;
      filters.forEach((item) => item.setAttribute('aria-pressed', String(item === filter)));
      markers.forEach((marker) => {
        const kinds = marker.dataset.pointKind.split(/\s+/);
        const visible = key === 'all' || kinds.includes(key);
        marker.classList.toggle('is-filtered', !visible);
        marker.tabIndex = visible ? 0 : -1;
      });
    });
  });

  openImage?.addEventListener('click', () => {
    if (!field.image?.src || !dialog || !lightboxImage) return;
    imageTrigger = document.activeElement;
    lightboxImage.src = field.image.src;
    lightboxImage.alt = field.image.alt;
    lightboxCaption.textContent = field.caption.textContent;
    dialog.showModal();
  });

  document.querySelector('[data-close-image]')?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog?.addEventListener('close', () => {
    lightboxImage?.removeAttribute('src');
    imageTrigger?.focus();
  });

  const cursor = document.querySelector('#atlasCursor');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (cursor && finePointer) {
    let latestPointer = null;
    let cursorFrame = 0;
    const paintCursor = () => {
      cursorFrame = 0;
      if (!latestPointer) return;
      const { clientX, clientY, target } = latestPointer;
      cursor.style.setProperty('--cursor-x', `${clientX}px`);
      cursor.style.setProperty('--cursor-y', `${clientY}px`);
      cursor.classList.add('is-visible');
      document.body.classList.add('has-atlas-cursor');
      const element = target instanceof Element ? target : null;
      const interactive = element?.closest('a, button, [role="button"]');
      cursor.classList.toggle('is-hover', Boolean(interactive));

      if (element && stage.contains(element)) {
        const bounds = stage.getBoundingClientRect();
        stage.style.setProperty('--map-glow-x', `${((clientX - bounds.left) / bounds.width) * 100}%`);
        stage.style.setProperty('--map-glow-y', `${((clientY - bounds.top) / bounds.height) * 100}%`);
      }

      document.body.style.setProperty('--pointer-x', `${(clientX / window.innerWidth) * 100}%`);
      document.body.style.setProperty('--pointer-y', `${(clientY / window.innerHeight) * 100}%`);
    };
    const queueCursor = (event) => {
      if (event.pointerType !== 'mouse') return;
      latestPointer = event;
      if (!cursorFrame) cursorFrame = window.requestAnimationFrame(paintCursor);
    };
    const hideCursor = () => {
      cursor.classList.remove('is-visible', 'is-hover', 'is-pressed');
      document.body.classList.remove('has-atlas-cursor');
    };
    window.addEventListener('pointermove', queueCursor, { passive: true });
    window.addEventListener('pointerdown', () => cursor.classList.add('is-pressed'));
    window.addEventListener('pointerup', () => cursor.classList.remove('is-pressed'));
    window.addEventListener('blur', hideCursor);
    document.documentElement.addEventListener('pointerleave', hideCursor);
  }

  const navigation = document.querySelector('.atlas-nav');
  let scrollFrame = 0;
  const updateScrollEffects = () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(() => {
      scrollFrame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      document.body.style.setProperty('--page-progress', scrollable > 0 ? String(window.scrollY / scrollable) : '0');
      navigation?.classList.toggle('is-scrolled', window.scrollY > 24);
    });
  };
  window.addEventListener('scroll', updateScrollEffects, { passive: true });
  updateScrollEffects();

  const revealTargets = document.querySelectorAll(
    '.atlas-hero-stamp, .atlas-hero .atlas-kicker, .atlas-hero h1, .atlas-hero-copy, .atlas-hero-meta, .atlas-briefing, .atlas-section-heading, .atlas-filters, .atlas-map-frame, .atlas-map-coordinates, .atlas-record, .atlas-field-index, .chronology-track article, .chronology-note, .atlas-footer'
  );
  if ('IntersectionObserver' in window && revealTargets.length) {
    document.body.classList.add('atlas-reveals-ready');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in-view');
        observer.unobserve(entry.target);
      });
    }, { threshold: .08, rootMargin: '0px 0px -28px 0px' });
    revealTargets.forEach((element, index) => {
      element.dataset.atlasReveal = '';
      element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 75}ms`);
      revealObserver.observe(element);
    });
  }
})();
