(() => {
  const journal = document.querySelector('[data-john-journal]');
  if (!journal) return;

  const cover = journal.querySelector('[data-john-journal-open]');
  const reader = journal.querySelector('[data-john-journal-reader]');
  const grid = journal.querySelector('[data-john-memory-grid]');
  const closeJournal = journal.querySelector('[data-john-journal-close]');
  const dialog = document.querySelector('[data-john-post]');
  const counter = journal.querySelector('[data-john-journal-counter]');
  const category = journal.querySelector('[data-john-journal-category]');

  if (!cover || !reader || !grid || !dialog) return;

  const records = [
    {
      name: 'Jack Connor',
      role: 'COMANDANTE // AMIGO DE JOHN',
      image: 'img-presente/personagens/jack-presente1.png',
      label: 'O MAPA DOBRADO',
      title: 'A rota que ele me entregou',
      quote: 'No fim da fuga, John colocou o mapa dobrado na minha mão. Não pediu que eu voltasse por ele. Apontou para a curva e me fez entender que minha tarefa era levar os outros até o lado de lá. Passei anos chamando aquilo de ordem, porque era mais fácil do que admitir que eu tinha obedecido ao meu amigo e seguido sem ele. Hoje sei: ele não queria que eu guardasse a última posição dele. Queria que eu guardasse os nomes de quem conseguiu passar.',
      signoff: 'O caminho ainda está no mapa. A saída, agora, está nas pessoas que voltaram.',
      reactions: [{ by: 'Mark Connor', icon: '🗺' }, { by: 'Alice Myers Connor', icon: '🕯' }],
      reply: { by: 'Mark Connor', role: 'COMANDO TÁTICO', text: 'O círculo que você desenhou ainda está lá. Nunca consegui apagar nenhum dos dois nomes.' },
    },
    {
      name: 'Mark Connor',
      role: 'HELLSING // COMANDO',
      image: 'img-presente/personagens/mark-presente2.png',
      label: 'A LISTA DE EXTRAÇÃO',
      title: 'O nome que não cruzou',
      quote: 'Eu conferi cada pessoa na saída duas vezes. Na terceira, percebi que ainda procurava John na coluna dos que tinham atravessado. A lista não mudou, mas minha mão continuou voltando ao espaço em branco. Ele passou a vida garantindo que ninguém fosse esquecido numa contagem. Não vou deixar que a última contagem dele termine em silêncio.',
      signoff: 'A lista ficou incompleta. O que ele salvou, não.',
      reactions: [{ by: 'Ariani Salvatore Connor', icon: '🤍' }, { by: 'Dimitri', icon: '🕯' }],
      reply: { by: 'Ariani Salvatore Connor', role: 'FAMÍLIA HELLSINGS', text: 'Você ainda confere a lista antes de dormir. Eu sei qual nome está procurando.' },
    },
    {
      name: 'Alice Myers Connor',
      role: 'COMANDO MÉDICO // HELLSINGS',
      image: 'img-presente/personagens/alice-presente1.png',
      label: 'A RESPOSTA QUE NÃO VEIO',
      title: 'O campo em aberto',
      quote: 'Quando a confirmação chegou, eu comecei a escrever o relatório e parei no campo “último contato”. Reescrevi a hora, conferi o sinal, conferi de novo. Nenhuma dessas coisas me devolveu uma frase que pudesse ser chamada de despedida. John merecia mais do que uma linha encerrada por um protocolo. Então deixei o campo aberto. Por uma noite, ao menos, o arquivo não conseguiu fingir que estava pronto para perdê-lo.',
      signoff: 'A ficha foi concluída depois. O luto não recebeu prazo.',
      reactions: [{ by: 'Jack Connor', icon: '🕯' }, { by: 'Naomi Yagami', icon: '📻' }],
      reply: { by: 'Jack Connor', role: 'COMANDO', text: 'Eu também demorei para preencher a última linha. Ainda leio o espaço em branco primeiro.' },
    },
    {
      name: 'Ariani Salvatore Connor',
      role: 'HELLSING // FAMÍLIA',
      image: 'img-presente/personagens/ariani-presente2.png',
      label: 'A LUZ DO CORREDOR',
      title: 'Antes de qualquer fuga',
      quote: 'Naquela noite, a luz do corredor piscava e ninguém tinha tempo para consertá-la. John abriu o painel, segurou o fio com uma mão e pediu que eu não deixasse Mark encostar em nada com a outra. A luz voltou. Ele saiu sem esperar agradecimento, já falando da próxima coisa que precisava funcionar. Só depois entendi que era assim que cuidava da equipe: consertava o que podia antes que alguém percebesse que estava prestes a falhar.',
      signoff: 'Ainda acendemos aquela luz. Ninguém pergunta por quê.',
      reactions: [{ by: 'Mark Connor', icon: '💡' }, { by: 'Jully Connor', icon: '🤍' }],
      reply: { by: 'Mark Connor', role: 'COMANDO TÁTICO', text: 'Eu toquei no painel. Ele me mandou esperar. Pela primeira vez, obedeci sem discutir.' },
    },
    {
      name: 'Britney Connor',
      role: 'HELLSING // SOBREVIVENTE',
      image: 'img-presente/personagens/britney-presente1.png',
      label: 'A FREQUÊNCIA DA CASA',
      title: 'O rádio na mesa',
      quote: 'Nas confraternizações da mansão, John deixava um rádio ligado baixo perto da cozinha. Dizia que era hábito de serviço. Eu achava que ele não sabia descansar. Uma vez, quando a conversa ficou alta demais, ele aumentou o volume só um pouco: uma estação antiga tocava uma música que ninguém reconheceu. Foi a primeira vez que o vi ficar à mesa até o fim. Depois da fuga, o rádio ficou quieto. Por muito tempo, ninguém teve coragem de sintonizá-lo.',
      signoff: 'Hoje deixamos a música terminar antes de desligar.',
      reactions: [{ by: 'Jully Connor', icon: '📻' }, { by: 'Bobby Lee', icon: '🎵' }],
      reply: { by: 'Bobby Lee', role: 'HELLSING // INTELIGÊNCIA', text: 'Eu me lembro. Ele fingiu que não conhecia a canção e acompanhou o refrão inteiro.' },
    },
    {
      name: 'Jully Connor',
      role: 'HELLSING // SOBREVIVENTE',
      image: 'img-presente/personagens/jully-presente1.png',
      label: 'O LUGAR AO LADO',
      title: 'Quando ninguém perguntou',
      quote: 'Antes de eu aprender a falar sobre quem perdi, John sentou ao meu lado do lado de fora do bunker. Não fez perguntas. Deixou um copo de água entre nós e ficou olhando para o portão como se aquela vigília fosse uma tarefa importante. Na manhã seguinte, o copo continuava ali, vazio. Não sei se ele esperava que eu bebesse ou que eu dissesse alguma coisa. Naquela noite, só o fato de não ter ficado sozinha já foi resposta suficiente.',
      signoff: 'Ele sabia que às vezes companhia é a única ordem que ajuda.',
      reactions: [{ by: 'Alice Myers Connor', icon: '🤍' }, { by: 'Britney Connor', icon: '🫂' }],
      reply: { by: 'Alice Myers Connor', role: 'COMANDO MÉDICO', text: 'Eu vi o copo na manhã seguinte. Nunca perguntei quem o tinha deixado.' },
    },
    {
      name: 'Brian Taylor',
      role: 'PARCEIRO DE CAMPO // REGISTRO FEITO EM VIDA',
      image: 'img-hellsing/brian-presente.png',
      label: 'ARQUIVADO ANTES DA MORTE DE BRIAN',
      title: 'A voz do outro lado',
      era: 'REGISTRO HISTÓRICO // BRIAN AINDA ESTAVA VIVO',
      quote: 'Quando o canal abriu, ouvi John contar as pessoas que ainda vinham atrás. Não contou a própria respiração, não contou os passos dele. Só os nomes dos outros. Eu conhecia aquele jeito: John transformava medo em instrução curta para ninguém precisar carregá-lo junto. Depois que a linha caiu, fiquei com o rádio na mão esperando uma segunda chamada. Nunca veio. O que veio foi a equipe atravessando a porta que ele manteve aberta.',
      signoff: 'Esta homenagem foi registrada após a fuga e antes da morte de Brian.',
      reactions: [{ by: 'Jack Connor', icon: '🕯' }, { by: 'Naomi Yagami', icon: '📻' }],
      reply: { by: 'Jack Connor', role: 'COMANDO', text: 'Guardei seu registro junto do mapa. Os dois contam a mesma parte da história.' },
    },
    {
      name: 'Naomi Yagami',
      role: 'HELLSING // INTELIGÊNCIA',
      image: 'img-hellsing/naomi-presente.png',
      label: 'O CANAL ABERTO',
      title: 'O silêncio depois do sinal',
      quote: 'Eu mantive a frequência aberta até a última pessoa confirmar que tinha atravessado. O sinal de John sumiu antes disso. Continuei chamando mesmo assim, porque fechar o canal parecia uma decisão que eu não tinha o direito de tomar. Quando finalmente desliguei, o rádio ainda estava quente. O bunker inteiro pareceu grande demais para o som que sobrou.',
      signoff: 'O registro marca a hora da perda. Não marca a hora em que parei de escutar.',
      reactions: [{ by: 'Hellen Wren', icon: '📻' }, { by: 'Alice Myers Connor', icon: '🕯' }],
      reply: { by: 'Hellen Wren', role: 'INTELIGÊNCIA DE CAMPO', text: 'Eu ouvi você chamar. Fiquei ao seu lado até o rádio esfriar.' },
    },
    {
      name: 'Dimitri',
      role: 'HELLSING // CAMPO',
      image: 'img-hellsing/dimitri-presente.png',
      label: 'A TERCEIRA CONTAGEM',
      title: 'Todo mundo, outra vez',
      quote: 'Na saída, contei o grupo uma vez e comecei de novo. John sempre dizia que a pressa fazia a gente perder justamente quem estava mais perto. Na terceira contagem, todos os nomes que eu conseguia chamar estavam do lado de fora — menos o dele. Tentei refazer o número. Jack me segurou pelo ombro. Eu sabia a resposta; só precisava de mais um minuto antes de aceitá-la.',
      signoff: 'Desde então, eu conto duas vezes. A terceira ainda é para John.',
      reactions: [{ by: 'Mark Connor', icon: '🫡' }, { by: 'Joey Muller', icon: '🕯' }],
      reply: { by: 'Mark Connor', role: 'COMANDO TÁTICO', text: 'Ninguém te apressou naquela noite. Ninguém vai apressar agora.' },
    },
    {
      name: 'Clhoe',
      role: 'HELLSING // INFILTRAÇÃO',
      image: 'img-hellsing/clhoe-presente.png',
      label: 'A PASSAGEM ESTREITA',
      title: 'A porta não fechou',
      quote: 'A passagem tinha uma porta emperrada que voltava a fechar sempre que alguém soltava a alavanca. John ficou segurando o mecanismo enquanto o grupo atravessava. Eu disse que podia trocar com ele. Ele olhou para o espaço que ainda faltava e apontou para a fila. Não foi uma despedida; foi uma instrução. Acho que é por isso que demorei tanto para entender que aquela seria a última vez que eu o veria.',
      signoff: 'A porta abriu para todos. Ele não passou por ela.',
      reactions: [{ by: 'Jack Connor', icon: '🕯' }, { by: 'Luke', icon: '🚪' }],
      reply: { by: 'Luke', role: 'CAMPO', text: 'A trava foi encontrada aberta quando voltamos. Ninguém conseguiu fechá-la.' },
    },
    {
      name: 'Luke',
      role: 'HELLSING // CAMPO',
      image: 'img-hellsing/luke-presente.png',
      label: 'AS MARCAS NO CHÃO',
      title: 'A trilha que se divide',
      quote: 'Eu reconheci a direção que John escolheu porque as marcas no chão deixaram de apontar para a saída. Ele levou a horda para longe. Por um instante, pensei em seguir aquele rastro e puxá-lo de volta. Então ouvi o último grupo cruzar atrás de mim. Fiquei com a rota que ele tinha aberto, porque voltar significaria fechar a passagem para todos os outros.',
      signoff: 'Ainda sei onde o rastro se separa. Nunca mais chamei aquele lugar de atalho.',
      reactions: [{ by: 'Jack Connor', icon: '🧭' }, { by: 'Hellen Wren', icon: '🕯' }],
      reply: { by: 'Jack Connor', role: 'COMANDO', text: 'Você manteve a escolha dele viva quando trouxe os últimos para fora.' },
    },
    {
      name: 'Hellen Wren',
      role: 'HELLSING // INTELIGÊNCIA DE CAMPO',
      image: 'img-hellsing/hellen-presente.png',
      label: 'A LINHA NO MAPA',
      title: 'O ponto que não apaguei',
      quote: 'Depois, pediram que eu atualizasse o mapa da região. Tracei a rota de fuga, marquei as zonas perdidas e deixei um pequeno círculo onde o sinal de John desapareceu. Não era coordenada útil para outra missão. Era o único modo que encontrei de impedir que aquele lugar virasse apenas terreno vazio. O mapa foi dobrado e arquivado com o ponto ainda visível.',
      signoff: 'Algumas marcas não servem para voltar. Servem para lembrar por que alguém conseguiu ir.',
      reactions: [{ by: 'Naomi Yagami', icon: '🗺' }, { by: 'Mark Connor', icon: '🕯' }],
      reply: { by: 'Naomi Yagami', role: 'INTELIGÊNCIA', text: 'Reconheci o círculo no primeiro olhar. Não pedi que você o removesse.' },
    },
    {
      name: 'Joey Muller',
      role: 'HELLSING // CAMPO',
      image: 'img-hellsing/joey-presente.png',
      label: 'O COLDRE SOLTO',
      title: 'O último ajuste',
      quote: 'Antes de sairmos, John viu que meu coldre estava frouxo. Parou, apertou a fivela e me mandou correr sem olhar para baixo. Foi uma coisa pequena, dessas que desaparecem no meio de uma missão. Depois da fuga, encontrei a fivela ainda presa no mesmo ponto. Levei semanas para conseguir usar aquele equipamento de novo sem esperar que ele surgisse atrás de mim para conferir.',
      signoff: 'A fivela continua firme. A mão que a ajustou, não volta.',
      reactions: [{ by: 'Dimitri', icon: '🛠' }, { by: 'Alice Myers Connor', icon: '🤍' }],
      reply: { by: 'Dimitri', role: 'CAMPO', text: 'Ele ajustou o meu rádio na mesma saída. Nem percebi até você contar.' },
    },
    {
      name: 'Bobby Lee',
      role: 'HELLSING // INTELIGÊNCIA',
      image: 'img-presente/personagens/bobby-presente.png',
      label: 'O PRIMEIRO EXERCÍCIO',
      title: 'Confiar a retaguarda',
      quote: 'No meu primeiro exercício com os Hellsings, eu ainda media cada pessoa pela distância até a saída. John percebeu. Em vez de me pedir confiança, colocou a retaguarda sob minha responsabilidade e seguiu para a frente. Não explicou o gesto; deixou que eu entendesse que alguém estava contando comigo do mesmo modo que eu contava com todos. Na fuga, fiz o mesmo por quem vinha atrás.',
      signoff: 'Foi a primeira equipe em que eu parei de calcular quem ficaria para trás.',
      reactions: [{ by: 'Britney Connor', icon: '🤍' }, { by: 'Jack Connor', icon: '✓' }],
      reply: { by: 'Jack Connor', role: 'COMANDANTE', text: 'Ele viu que você já estava pronto antes de você acreditar nisso.' },
    },
  ];

  const fields = {
    counter: dialog.querySelector('[data-john-post-counter]'),
    code: dialog.querySelector('[data-john-post-code]'),
    category: dialog.querySelector('[data-john-post-category]'),
    title: dialog.querySelector('[data-john-post-title]'),
    quote: dialog.querySelector('[data-john-post-quote]'),
    name: dialog.querySelector('[data-john-post-name]'),
    role: dialog.querySelector('[data-john-post-role]'),
    signoff: dialog.querySelector('[data-john-post-signoff]'),
    era: dialog.querySelector('[data-john-post-era]'),
    speakerImage: dialog.querySelector('[data-john-speaker-image]'),
    speakerCaption: dialog.querySelector('[data-john-speaker-caption]'),
    reactions: dialog.querySelector('[data-john-post-reactions]'),
    replies: dialog.querySelector('[data-john-post-replies]'),
    close: dialog.querySelector('[data-john-post-close]'),
    previous: dialog.querySelector('[data-john-post-prev]'),
    next: dialog.querySelector('[data-john-post-next]'),
  };

  let current = 0;
  let activeCard = null;

  const makeCard = (record, index) => {
    const card = document.createElement('button');
    card.className = 'memorial-memory-card memorial-memory-card--john';
    card.type = 'button';
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('aria-label', `Abrir a homenagem de ${record.name}`);

    const imageFrame = document.createElement('span');
    imageFrame.className = 'memorial-memory-card__image';
    const image = document.createElement('img');
    image.src = record.image;
    image.alt = `Retrato de ${record.name}; a fotografia de John no diálogo é anterior à morte dele`;
    image.loading = 'lazy';
    imageFrame.append(image);

    const indexLabel = document.createElement('span');
    indexLabel.className = 'memorial-memory-card__index';
    indexLabel.textContent = `MEMÓRIA ${String(index + 1).padStart(2, '0')} // J-06`;

    const identity = document.createElement('span');
    identity.className = 'memorial-memory-card__identity';
    const name = document.createElement('b');
    name.textContent = record.name;
    const role = document.createElement('small');
    role.textContent = record.role;
    identity.append(name, role);

    const activity = document.createElement('span');
    activity.className = 'memorial-memory-card__activity';
    activity.setAttribute('aria-hidden', 'true');
    record.reactions.forEach((reaction) => {
      const icon = document.createElement('span');
      icon.textContent = reaction.icon;
      activity.append(icon);
    });
    const reactionCount = document.createElement('small');
    reactionCount.textContent = `${record.reactions.length} REAÇÕES // 1 RESPOSTA`;
    activity.append(reactionCount);

    const action = document.createElement('span');
    action.className = 'memorial-memory-card__action';
    action.append(document.createTextNode('LER HOMENAGEM'));
    const actionIcon = document.createElement('b');
    actionIcon.setAttribute('aria-hidden', 'true');
    actionIcon.textContent = '↗';
    action.append(actionIcon);

    card.append(indexLabel, imageFrame, identity, activity, action);
    card.addEventListener('click', () => openRecord(index, card));
    return card;
  };

  grid.replaceChildren(...records.map(makeCard));

  const renderReplies = (record) => {
    fields.reactions.replaceChildren(...record.reactions.map((reaction) => {
      const badge = document.createElement('span');
      badge.className = 'memorial-memory-thread__reaction';
      badge.setAttribute('aria-label', `${reaction.by} reagiu com ${reaction.icon}`);
      const icon = document.createElement('b');
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = reaction.icon;
      const by = document.createElement('small');
      by.textContent = reaction.by;
      badge.append(icon, by);
      return badge;
    }));

    fields.replies.replaceChildren();
    const reply = record.reply;
    const item = document.createElement('li');
    item.className = 'memorial-memory-thread__reply';
    const portrait = document.createElement('span');
    portrait.className = 'memorial-memory-thread__avatar';
    const image = document.createElement('img');
    image.src = records.find((person) => person.name === reply.by)?.image || '';
    image.alt = '';
    image.setAttribute('aria-hidden', 'true');
    image.loading = 'lazy';
    portrait.append(image);

    const body = document.createElement('div');
    body.className = 'memorial-memory-thread__body';
    const heading = document.createElement('header');
    const name = document.createElement('b');
    name.textContent = reply.by;
    const role = document.createElement('small');
    role.textContent = reply.role;
    heading.append(name, role);
    const message = document.createElement('p');
    message.textContent = reply.text;
    body.append(heading, message);
    item.append(portrait, body);
    fields.replies.append(item);
  };

  const renderRecord = () => {
    const record = records[current];
    fields.counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(records.length).padStart(2, '0')}`;
    fields.code.textContent = `MEMÓRIA ${String(current + 1).padStart(2, '0')}`;
    fields.category.textContent = record.label;
    fields.title.textContent = record.title;
    fields.quote.textContent = `“${record.quote}”`;
    fields.name.textContent = record.name;
    fields.role.textContent = record.role;
    fields.signoff.textContent = record.signoff;
    fields.era.textContent = record.era || 'MEMORIAL DE JOHN // VOZES PRESERVADAS';
    fields.speakerImage.src = record.image;
    fields.speakerImage.alt = `Retrato de ${record.name}`;
    fields.speakerCaption.textContent = record.name;
    fields.previous.disabled = current === 0;
    fields.next.disabled = current === records.length - 1;
    category.textContent = record.category || record.label;
    renderReplies(record);
  };

  const openRecord = (index, card) => {
    current = index;
    activeCard = card;
    renderRecord();
    dialog.showModal();
    fields.close.focus();
  };

  const changeRecord = (direction) => {
    const next = current + direction;
    if (next < 0 || next >= records.length) return;
    current = next;
    activeCard = grid.children[current];
    renderRecord();
  };

  const openJournal = () => {
    cover.hidden = true;
    cover.setAttribute('aria-expanded', 'true');
    reader.hidden = false;
    grid.querySelector('button')?.focus();
  };

  const closeJournalView = () => {
    activeCard = cover;
    if (dialog.open) dialog.close();
    reader.hidden = true;
    cover.hidden = false;
    cover.setAttribute('aria-expanded', 'false');
    cover.focus();
  };

  cover.addEventListener('click', openJournal);
  closeJournal?.addEventListener('click', closeJournalView);
  fields.previous.addEventListener('click', () => changeRecord(-1));
  fields.next.addEventListener('click', () => changeRecord(1));
  dialog.addEventListener('close', () => activeCard?.focus());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      changeRecord(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      changeRecord(1);
    }
  });

  counter.textContent = `${records.length} VOZES`;
})();
