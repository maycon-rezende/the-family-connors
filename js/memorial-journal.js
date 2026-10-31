(() => {
  const journal = document.querySelector('[data-brian-journal]');
  if (!journal) return;

  const cover = journal.querySelector('[data-journal-open]');
  const reader = journal.querySelector('[data-journal-reader]');
  const counter = journal.querySelector('[data-journal-counter]');
  const category = journal.querySelector('[data-journal-category]');
  const closeJournal = journal.querySelector('[data-journal-close]');
  const dialog = document.querySelector('[data-journal-post]');
  const notes = [...journal.querySelectorAll('.memorial-brian-note')];
  const groups = [...journal.querySelectorAll('.memorial-brian-forum__group')];

  if (!cover || !reader || !dialog || !notes.length) return;

  const portraitFiles = {
    'Jack Connor': ['img-presente/personagens/jack-presente.png', 'Retrato de Jack Connor no presente'],
    'Mark Connor': ['img-presente/personagens/mark-presente.png', 'Retrato de Mark Connor no presente'],
    'Alice Myers Connor': ['img-hellsing/alice-examinando-taylor.png', 'Alice cuidando de Brian na enfermaria, com Jack ao lado'],
    John: ['img-hellsing/john-presente.png', 'John em um registro anterior ao seu sacrifício'],
    'Bobby Lee': ['img-presente/personagens/bobby-presente.png', 'Retrato de Bobby Lee no presente'],
    'Naomi Yagami': ['img-hellsing/naomi-presente.png', 'Retrato de Naomi Yagami no presente'],
    'Hellen Wren': ['img-hellsing/hellen-wren-presente.png', 'Retrato de Hellen Wren no presente'],
    'Joey Muller': ['img-hellsing/joey-presente.png', 'Retrato de Joey Muller no presente'],
    Dimitri: ['img-hellsing/dimitri-presente.png', 'Retrato de Dimitri no presente'],
    Clhoe: ['img-hellsing/clhoe-presente.png', 'Retrato de Clhoe no presente'],
    Luke: ['img-hellsing/luke-presente.png', 'Retrato de Luke no presente'],
    'Ariani Salvatore Connor': ['img-presente/personagens/ariani-presente2.png', 'Ariani Salvatore Connor no acampamento Hellsing no presente'],
    'Britney Connor': ['img-presente/personagens/britney-presente1.png', 'Britney Connor no acampamento Hellsing no presente'],
    'Jully Connor': ['img-presente/personagens/jully-presente1.png', 'Jully Connor no acampamento Hellsing no presente'],
    'Alucard Myers Connor': ['img-presente/personagens/alucard-hellsing.png', 'Retrato de Alucard Myers Connor'],
    'Diana Myers Connor': ['img-presente/personagens/diana-presente.png', 'Retrato de Diana Myers Connor no presente'],
    'Nicolai Myers Connor': ['img-presente/personagens/nicolai.png', 'Retrato de Nicolai Myers Connor'],
    'Mary Myers Connor': ['img-presente/personagens/mary-presente.png', 'Retrato de Mary Myers Connor no presente'],
    'Isolde Myers Connor': ['img-presente/personagens/isolde-presente.png', 'Retrato de Isolde Myers Connor no presente'],
    'Pollyana Salvatore Connor': ['img-hellsing/pollyana-presente.png', 'Retrato de Pollyana Salvatore Connor no presente'],
    'Nathan Salvatore Connor': ['img-hellsing/nathan-presente-filho-de-mark.png', 'Retrato de Nathan Salvatore Connor no presente'],
    'As pessoas da rota': ['img-presente/personagens/civis.png', 'Sobreviventes que cruzaram as rotas abertas pelos Hellsings'],
  };

  const memoryTitles = {
    'Jack Connor': 'A rota que não estava no mapa',
    'Mark Connor': 'A cadeira a mais',
    'Alice Myers Connor': 'O último turno',
    John: 'A rota que deixei marcada',
    'Bobby Lee': 'Um lugar à mesa',
    'Naomi Yagami': 'O relatório sem resposta',
    'Hellen Wren': 'O lugar que você guardava',
    'Joey Muller': 'Uma marca para a volta',
    Dimitri: 'Conta outra vez',
    Clhoe: 'A porta aberta',
    Luke: 'Os nomes no verso',
    'Ariani Salvatore Connor': 'A mesa depois do fogo',
    'Britney Connor': 'A primeira conversa',
    'Jully Connor': 'Do lado de fora da chuva',
    'Alucard Myers Connor': 'A história da padaria',
    'Diana Myers Connor': 'Antes do disparo',
    'Nicolai Myers Connor': 'Água para a volta',
    'Mary Myers Connor': 'Um pouco de sombra',
    'Isolde Myers Connor': 'A prateleira torta',
    'Pollyana Salvatore Connor': 'O caminho de volta',
    'Nathan Salvatore Connor': 'Quem está atrás do alvo',
    'James Salvatore Connor': 'Uma estrada de lápis',
    'Filho de Bobby Lee e Britney': 'As histórias que começam com Brian',
    'As pessoas da rota': 'A estrada chegou até nós',
  };

  const memoryThreads = {
    'Jack Connor': { reactions: [{ by: 'Mark Connor', icon: '🫡' }, { by: 'Alice Myers Connor', icon: '🕯' }], reply: { by: 'Mark Connor', role: 'COMANDO TÁTICO', text: 'A saída do túnel ainda está no meu mapa. Nunca apaguei o círculo que você desenhou.' } },
    'Mark Connor': { reactions: [{ by: 'Ariani Salvatore Connor', icon: '🤍' }, { by: 'Jully Connor', icon: '🪑' }], reply: { by: 'Ariani Salvatore Connor', role: 'FAMÍLIA HELLSINGS', text: 'Você ainda puxa a cadeira antes de a comida chegar. Aprendeu com ele sem perceber.' } },
    'Alice Myers Connor': { reactions: [{ by: 'Jack Connor', icon: '🤍' }, { by: 'Naomi Yagami', icon: '🕯' }], reply: { by: 'Jack Connor', role: 'COMANDO', text: 'Naquela manhã, ninguém tentou preencher o silêncio. Ficamos do lado de fora até você sair.' } },
    John: { era: 'RECADO DEIXADO EM VIDA // JOHN AINDA ESTAVA VIVO AO ESCREVER', reactions: [{ by: 'Jack Connor', icon: '🫡' }, { by: 'Alice Myers Connor', icon: '🕯' }], reply: { by: 'Jack Connor', role: 'COMANDO', text: 'Li seu recado antes da fuga. Guardei o mapa; ainda procuro nele a saída que você nos deu.' } },
    'Bobby Lee': { reactions: [{ by: 'Britney Connor', icon: '❤️' }, { by: 'Jully Connor', icon: '🍽' }], reply: { by: 'Britney Connor', role: 'FAMÍLIA', text: 'A cadeira que ele puxou continua em todas as mesas que a gente constrói.' } },
    'Naomi Yagami': { reactions: [{ by: 'Alice Myers Connor', icon: '☕' }, { by: 'Jack Connor', icon: '👁' }], reply: { by: 'Alice Myers Connor', role: 'COMANDO MÉDICO', text: 'O relatório ficou completo. A caneca voltou vazia para a enfermaria; você nem percebeu que eu a deixei lá.' } },
    'Hellen Wren': { reactions: [{ by: 'Naomi Yagami', icon: '👁' }, { by: 'Joey Muller', icon: '🫂' }], reply: { by: 'Naomi Yagami', role: 'INTELIGÊNCIA', text: 'Você também reconhece quem voltou antes de perguntar qual nome está usando.' } },
    'Joey Muller': { reactions: [{ by: 'Luke', icon: '🧭' }, { by: 'Jack Connor', icon: '✓' }], reply: { by: 'Luke', role: 'CAMPO', text: 'Aquela fita no portão guiou mais gente do que nós dois conseguimos contar.' } },
    Dimitri: { reactions: [{ by: 'Mark Connor', icon: '🔢' }, { by: 'Naomi Yagami', icon: '🕯' }], reply: { by: 'Mark Connor', role: 'COMANDO TÁTICO', text: 'A lista de extração ainda está aberta. Eu também paro no número que falta.' } },
    Clhoe: { reactions: [{ by: 'Hellen Wren', icon: '🔓' }, { by: 'Alice Myers Connor', icon: '🕯' }], reply: { by: 'Hellen Wren', role: 'INFILTRAÇÃO', text: 'Deixar a porta aberta não é fraqueza quando alguém ainda está tentando voltar.' } },
    Luke: { reactions: [{ by: 'Naomi Yagami', icon: '🗺' }, { by: 'Mark Connor', icon: '🫡' }], reply: { by: 'Naomi Yagami', role: 'INTELIGÊNCIA', text: 'Os nomes no verso continuam chegando ao abrigo. Cada rota sua ainda cumpre a promessa de volta.' } },
    'Ariani Salvatore Connor': { reactions: [{ by: 'Mark Connor', icon: '❤️' }, { by: 'Jully Connor', icon: '🍽' }], reply: { by: 'Jully Connor', role: 'FAMÍLIA HELLSINGS', text: 'Quando a mesa enche, ainda dá para notar o espaço que ele deixava entre todo mundo.' } },
    'Britney Connor': { reactions: [{ by: 'Bobby Lee', icon: '❤️' }, { by: 'Jully Connor', icon: '🪑' }], reply: { by: 'Bobby Lee', role: 'FAMÍLIA', text: 'Ele abriu espaço para mim naquela mesa. Você me ensinou a não ter medo de sentar.' } },
    'Jully Connor': { reactions: [{ by: 'Alice Myers Connor', icon: '😔' }, { by: 'Britney Connor', icon: '🤍' }], reply: { by: 'Britney Connor', role: 'FAMÍLIA', text: 'Eu lembro da chuva. Você não precisava falar; eu só fiquei ali com você.' } },
    'Alucard Myers Connor': { reactions: [{ by: 'Diana Myers Connor', icon: '🥐' }, { by: 'Jack Connor', icon: '🕯' }], reply: { by: 'Alice Myers Connor', role: 'COMANDO MÉDICO', text: 'A padaria nunca existiu. O lugar ao lado dele para você respirar, sim.' } },
    'Diana Myers Connor': { reactions: [{ by: 'Alice Myers Connor', icon: '🫡' }, { by: 'Mark Connor', icon: '🎯' }], reply: { by: 'Jack Connor', role: 'COMANDO', text: 'Ele viu o que você estava protegendo antes de você mesma conseguir dar nome a isso.' } },
    'Nicolai Myers Connor': { reactions: [{ by: 'Luke', icon: '💧' }, { by: 'Jack Connor', icon: '✓' }], reply: { by: 'Luke', role: 'CAMPO', text: 'A mochila que traz alguém de volta nunca parece heroica. Parece pesada. E isso basta.' } },
    'Mary Myers Connor': { reactions: [{ by: 'Alice Myers Connor', icon: '🌒' }, { by: 'Alucard Myers Connor', icon: '🕯' }], reply: { by: 'Alucard Myers Connor', role: 'FILHO DE JACK E ALICE', text: 'A sombra da janela continua lá. Eu conto uma história ruim quando a luz fica forte demais.' } },
    'Isolde Myers Connor': { reactions: [{ by: 'Mary Myers Connor', icon: '🕯' }, { by: 'Jack Connor', icon: '🛠' }], reply: { by: 'Mary Myers Connor', role: 'FILHA DE JACK E ALICE', text: 'A prateleira continua torta. Gosto de lembrar que foi consertada sem pressa.' } },
    'Pollyana Salvatore Connor': { reactions: [{ by: 'Nathan Salvatore Connor', icon: '🔁' }, { by: 'Ariani Salvatore Connor', icon: '🤍' }], reply: { by: 'Nathan Salvatore Connor', role: 'GÊMEO DE POLLYANA', text: 'Eu ainda reclamaria a viagem inteira. Mas agora voltaria para buscar as latas.' } },
    'Nathan Salvatore Connor': { reactions: [{ by: 'Pollyana Salvatore Connor', icon: '🎯' }, { by: 'Mark Connor', icon: '👁' }], reply: { by: 'Mark Connor', role: 'COMANDO TÁTICO', text: 'Você já olha para quem está atrás do alvo. Ele teria percebido isso primeiro.' } },
    'James Salvatore Connor': { reactions: [{ by: 'Mark Connor', icon: '🛣' }, { by: 'Nathan Salvatore Connor', icon: '📝' }], reply: { by: 'Nathan Salvatore Connor', role: 'ATIRADOR DE PRECISÃO', text: 'O mapa torto ainda está guardado. Marquei a sua volta ao lado da minha.' } },
    'Filho de Bobby Lee e Britney': { reactions: [{ by: 'Britney Connor', icon: '❤️' }, { by: 'Bobby Lee', icon: '🕯' }], reply: { by: 'Bobby Lee', role: 'PAI', text: 'Ele puxou uma cadeira para nós antes de saber quem seríamos um para o outro.' } },
    'As pessoas da rota': { reactions: [{ by: 'Naomi Yagami', icon: '🗺' }, { by: 'Jack Connor', icon: '🕯' }], reply: { by: 'Naomi Yagami', role: 'INTELIGÊNCIA', text: 'Seguimos as marcas sem saber quem as deixou. Agora sabemos o nome que acompanha essa estrada.' } },
  };

  const sharedPhotos = {
    'Jack Connor': ['img-hellsing/brian&jack-presente.png', 'Registro preservado de Brian e Jack juntos', 'JACK + BRIAN // UMA ROTA QUE OS DOIS CONHECIAM'],
    'Alice Myers Connor': ['img-hellsing/alice-examinando-taylor.png', 'Alice cuidando de Brian na enfermaria, com Jack ao lado', 'ALICE + BRIAN // ENFERMARIA DO BUNKER'],
  };

  const fields = {
    personImage: dialog.querySelector('[data-post-person-image]'),
    personFrame: dialog.querySelector('[data-post-person-frame]'),
    personCaption: dialog.querySelector('[data-post-person-caption]'),
    brianFrame: dialog.querySelector('[data-post-brian-frame]'),
    sharedFrame: dialog.querySelector('[data-post-shared-frame]'),
    sharedImage: dialog.querySelector('[data-post-shared-image]'),
    sharedCaption: dialog.querySelector('[data-post-shared-caption]'),
    counter: dialog.querySelector('[data-post-counter]'),
    code: dialog.querySelector('[data-post-code]'),
    category: dialog.querySelector('[data-post-category]'),
    title: dialog.querySelector('[data-post-title]'),
    quote: dialog.querySelector('[data-post-quote]'),
    name: dialog.querySelector('[data-post-name]'),
    role: dialog.querySelector('[data-post-role]'),
    threadEra: dialog.querySelector('[data-post-thread-era]'),
    threadReactions: dialog.querySelector('[data-post-thread-reactions]'),
    threadReplies: dialog.querySelector('[data-post-thread-replies]'),
    previous: dialog.querySelector('[data-post-prev]'),
    next: dialog.querySelector('[data-post-next]'),
    close: dialog.querySelector('[data-post-close]'),
  };

  const records = notes.map((note, index) => {
    const name = note.querySelector('footer b')?.textContent.trim() || 'Voz preservada';
    const role = note.querySelector('footer small')?.textContent.trim() || 'MEMÓRIA DOS HELLSINGS';
    const sourceLine = note.querySelector(':scope > span')?.textContent.trim() || `RESPOSTA ${index + 1}`;
    const match = sourceLine.match(/RESPOSTA\s+\d+\s*\/\/\s*(.+)/i);
    const photo = portraitFiles[name] || null;

    return {
      note,
      name,
      role,
      photo,
      group: note.closest('.memorial-brian-forum__group'),
      groupTitle: note.closest('.memorial-brian-forum__group')?.querySelector('.memorial-brian-forum__heading h5')?.textContent.trim() || 'MEMÓRIAS',
      label: match?.[1] || 'MEMÓRIA PRESERVADA',
      title: memoryTitles[name] || 'O que ficou de você',
      code: `RESPOSTA ${String(index + 1).padStart(2, '0')}`,
      thread: memoryThreads[name] || { reactions: [], reply: null },
    };
  });

  const makeCard = (record, index) => {
    const button = document.createElement('button');
    button.className = 'memorial-memory-card';
    if (record.note.classList.contains('memorial-brian-note--alice')) button.classList.add('memorial-memory-card--cyan');
    if (record.note.classList.contains('memorial-brian-note--john')) button.classList.add('memorial-memory-card--red');
    button.type = 'button';
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-label', `Abrir a homenagem e a conversa de ${record.name}`);

    const imageFrame = document.createElement('span');
    imageFrame.className = 'memorial-memory-card__image';
    if (record.photo) {
      const img = document.createElement('img');
      img.src = record.photo[0];
      img.alt = record.photo[1];
      img.loading = 'lazy';
      imageFrame.append(img);
    } else {
      imageFrame.classList.add('memorial-memory-card__image--sealed');
      const seal = document.createElement('span');
      seal.className = 'memorial-memory-card__seal';
      seal.setAttribute('aria-hidden', 'true');
      seal.textContent = record.name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2);
      const status = document.createElement('span');
      status.className = 'memorial-memory-card__sealed-label';
      status.textContent = 'RETRATO AINDA NÃO RECUPERADO';
      imageFrame.append(seal, status);
    }

    const indexLabel = document.createElement('span');
    indexLabel.className = 'memorial-memory-card__index';
    indexLabel.textContent = `MEMÓRIA ${String(index + 1).padStart(2, '0')} // BT-09`;

    const identity = document.createElement('span');
    identity.className = 'memorial-memory-card__identity';
    const name = document.createElement('b');
    name.textContent = record.name;
    const role = document.createElement('small');
    role.textContent = record.role;
    identity.append(name, role);

    const action = document.createElement('span');
    action.className = 'memorial-memory-card__action';
    action.append(document.createTextNode('LER MEMÓRIA E CONVERSA'));
    const actionIcon = document.createElement('b');
    actionIcon.setAttribute('aria-hidden', 'true');
    actionIcon.textContent = '↗';
    action.append(actionIcon);

    const activity = document.createElement('span');
    activity.className = 'memorial-memory-card__activity';
    activity.setAttribute('aria-hidden', 'true');
    record.thread.reactions.forEach((reaction) => {
      const icon = document.createElement('span');
      icon.textContent = reaction.icon;
      activity.append(icon);
    });
    const activityCount = document.createElement('small');
    activityCount.textContent = `${record.thread.reactions.length} REAÇÕES // ${record.thread.reply ? '1 RESPOSTA' : 'SEM RESPOSTAS'}`;
    activity.append(activityCount);

    button.append(indexLabel, imageFrame, identity, activity, action);
    button.addEventListener('click', () => openRecord(index, button));
    return button;
  };

  groups.forEach((group) => {
    const oldGrid = group.querySelector('.memorial-brian-tributes__grid');
    if (!oldGrid) return;
    const groupRecords = records.filter((record) => record.group === group);
    const cards = document.createElement('div');
    cards.className = 'memorial-brian-tributes__grid memorial-brian-memory-grid';
    groupRecords.forEach((record) => cards.append(makeCard(record, records.indexOf(record))));
    oldGrid.replaceWith(cards);
  });

  let current = 0;
  let activeCard = null;

  const renderRecord = () => {
    const record = records[current];
    const personPhoto = record.photo;
    const togetherPhoto = sharedPhotos[record.name] || null;

    fields.counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(records.length).padStart(2, '0')}`;
    fields.code.textContent = record.code;
    fields.category.textContent = record.label;
    fields.title.textContent = memoryTitles[record.name] || 'A estrada que ficou';
    fields.quote.textContent = record.note.querySelector('blockquote')?.textContent.trim() || '';
    fields.name.textContent = record.name;
    fields.role.textContent = record.role;
    fields.threadEra.textContent = record.thread.era || 'MEMORIAL DE BRIAN // RESPOSTAS PRESERVADAS';
    fields.threadReactions.replaceChildren(...record.thread.reactions.map((reaction) => {
      const badge = document.createElement('span');
      badge.className = 'memorial-memory-thread__reaction';
      badge.setAttribute('aria-label', `${reaction.by} reagiu com ${reaction.icon}`);
      const icon = document.createElement('b');
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = reaction.icon;
      const name = document.createElement('small');
      name.textContent = reaction.by;
      badge.append(icon, name);
      return badge;
    }));
    fields.threadReplies.replaceChildren();
    if (record.thread.reply) {
      const reply = record.thread.reply;
      const item = document.createElement('li');
      item.className = 'memorial-memory-thread__reply';
      const portrait = document.createElement('span');
      portrait.className = 'memorial-memory-thread__avatar';
      const replyPhoto = portraitFiles[reply.by];
      if (replyPhoto) {
        const image = document.createElement('img');
        image.src = replyPhoto[0];
        image.alt = '';
        image.setAttribute('aria-hidden', 'true');
        image.loading = 'lazy';
        portrait.append(image);
      } else {
        portrait.textContent = reply.by.split(/\s+/).map((part) => part[0]).join('').slice(0, 2);
      }
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
      fields.threadReplies.append(item);
    }
    fields.previous.disabled = current === 0;
    fields.next.disabled = current === records.length - 1;

    fields.sharedFrame.hidden = !togetherPhoto;
    fields.personFrame.hidden = Boolean(togetherPhoto);
    fields.brianFrame.hidden = Boolean(togetherPhoto);
    if (togetherPhoto) {
      fields.sharedImage.src = togetherPhoto[0];
      fields.sharedImage.alt = togetherPhoto[1];
      fields.sharedCaption.textContent = togetherPhoto[2];
      return;
    }

    fields.personFrame.classList.toggle('is-sealed', !personPhoto);
    fields.personImage.hidden = !personPhoto;
    if (personPhoto) {
      fields.personImage.src = personPhoto[0];
      fields.personImage.alt = personPhoto[1];
    } else {
      fields.personImage.removeAttribute('src');
      fields.personImage.alt = '';
    }
    fields.personCaption.textContent = record.name;
  };

  function openRecord(index, trigger) {
    current = index;
    activeCard = trigger;
    renderRecord();
    dialog.showModal();
    fields.close.focus();
  }

  const showPrevious = () => {
    if (current === 0) return;
    current -= 1;
    renderRecord();
  };

  const showNext = () => {
    if (current >= records.length - 1) return;
    current += 1;
    renderRecord();
  };

  const openJournal = () => {
    cover.hidden = true;
    cover.setAttribute('aria-expanded', 'true');
    reader.hidden = false;
    const firstCard = reader.querySelector('.memorial-memory-card');
    firstCard?.focus();
  };

  const closeJournalView = () => {
    if (dialog.open) dialog.close();
    reader.hidden = true;
    cover.hidden = false;
    cover.setAttribute('aria-expanded', 'false');
    cover.focus();
  };

  cover.addEventListener('click', openJournal);
  closeJournal?.addEventListener('click', closeJournalView);
  fields.previous?.addEventListener('click', showPrevious);
  fields.next?.addEventListener('click', showNext);

  dialog.addEventListener('close', () => activeCard?.focus());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrevious();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
    }
  });

  counter.textContent = `${records.length} VOZES`;
  category.textContent = 'ESCOLHA UM NOME';
})();
