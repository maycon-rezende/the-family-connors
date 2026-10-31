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
    'Alice Myers Connor': ['img-presente/personagens/alice-presente.png', 'Retrato de Alice Myers Connor no presente'],
    John: ['img-hellsing/john-presente.png', 'John em um registro anterior ao seu sacrifício'],
    'Bobby Lee': ['img-presente/personagens/bobby-presente.png', 'Retrato de Bobby Lee no presente'],
    'Naomi Yagami': ['img-hellsing/naomi-presente.png', 'Retrato de Naomi Yagami no presente'],
    'Hellen Wren': ['img-hellsing/hellen-wren-presente.png', 'Retrato de Hellen Wren no presente'],
    'Joey Muller': ['img-hellsing/joey-presente.png', 'Retrato de Joey Muller no presente'],
    Dimitri: ['img-hellsing/dimitri-presente.png', 'Retrato de Dimitri no presente'],
    Clhoe: ['img-hellsing/clhoe-presente.png', 'Retrato de Clhoe no presente'],
    Luke: ['img-hellsing/luke-presente.png', 'Retrato de Luke no presente'],
    'Ariani Salvatore Connor': ['img-presente/personagens/ariani-presente.png', 'Retrato de Ariani Salvatore Connor no presente'],
    'Britney Connor': ['img-presente/personagens/britney-presente.png', 'Retrato de Britney Connor no presente'],
    'Jully Connor': ['img-presente/personagens/jully-presente.png', 'Retrato de Jully Connor no presente'],
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
    };
  });

  const makeCard = (record, index) => {
    const button = document.createElement('button');
    button.className = 'memorial-memory-card';
    if (record.note.classList.contains('memorial-brian-note--alice')) button.classList.add('memorial-memory-card--cyan');
    if (record.note.classList.contains('memorial-brian-note--john')) button.classList.add('memorial-memory-card--red');
    button.type = 'button';
    button.setAttribute('aria-haspopup', 'dialog');
    button.setAttribute('aria-label', `Abrir a homenagem de ${record.name}`);

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
    action.innerHTML = 'LER MEMÓRIA <b aria-hidden="true">↗</b>';

    button.append(indexLabel, imageFrame, identity, action);
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
    const togetherPhoto = record.name === 'Jack Connor'
      ? ['img-hellsing/brian&jack-presente.png', 'Registro preservado de Brian e Jack juntos']
      : null;

    fields.counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(records.length).padStart(2, '0')}`;
    fields.code.textContent = record.code;
    fields.category.textContent = record.label;
    fields.title.textContent = memoryTitles[record.name] || 'A estrada que ficou';
    fields.quote.textContent = record.note.querySelector('blockquote')?.textContent.trim() || '';
    fields.name.textContent = record.name;
    fields.role.textContent = record.role;
    fields.previous.disabled = current === 0;
    fields.next.disabled = current === records.length - 1;

    fields.sharedFrame.hidden = !togetherPhoto;
    fields.personFrame.hidden = Boolean(togetherPhoto);
    fields.brianFrame.hidden = Boolean(togetherPhoto);
    if (togetherPhoto) {
      fields.sharedImage.src = togetherPhoto[0];
      fields.sharedImage.alt = togetherPhoto[1];
      fields.sharedCaption.textContent = 'JACK + BRIAN // UMA ROTA QUE OS DOIS CONHECIAM';
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
  fields.close?.addEventListener('click', () => dialog.close());
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
