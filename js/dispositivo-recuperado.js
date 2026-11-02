(() => {
  const dialog = document.querySelector('[data-recovered-device]');
  const opener = document.querySelector('[data-device-open]');
  if (!dialog || !opener) return;

  const closeButton = dialog.querySelector('[data-device-close]');
  const contactList = dialog.querySelector('[data-device-contacts]');
  const thread = dialog.querySelector('[data-device-thread]');
  const appTabs = [...dialog.querySelectorAll('[data-device-app]')];
  const views = [...dialog.querySelectorAll('[data-device-view]')];
  const character = document.body.dataset.character;
  let pageScrollState = null;

  const lockPageScroll = () => {
    if (pageScrollState) return;
    const root = document.documentElement;
    const body = document.body;
    pageScrollState = {
      x: window.scrollX,
      y: window.scrollY,
      rootOverflow: root.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyOverflow: body.style.overflow
    };
    root.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = '-' + pageScrollState.y + 'px';
    body.style.left = '-' + pageScrollState.x + 'px';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
  };

  const unlockPageScroll = () => {
    if (!pageScrollState) return;
    const state = pageScrollState;
    pageScrollState = null;
    const root = document.documentElement;
    const body = document.body;
    root.style.overflow = state.rootOverflow;
    body.style.position = state.bodyPosition;
    body.style.top = state.bodyTop;
    body.style.left = state.bodyLeft;
    body.style.right = state.bodyRight;
    body.style.width = state.bodyWidth;
    body.style.overflow = state.bodyOverflow;
    window.scrollTo(state.x, state.y);
  };

  const archive = {
    jack: {
      code: 'JC-01 // TERMINAL DE COMANDO',
      signal: 'CANAL INTERROMPIDO // BUSCA EM ABERTO',
      noteTitle: 'A frequência que não respondeu',
      note: 'Jack reuniu os Hellsings e chamou Mick para encontrá-los. O canal caiu antes de qualquer confirmação de encontro. Depois, os Hellsings iniciaram a busca pelos sobreviventes de Doomsday. O reencontro continua à frente na história; nenhum destino foi confirmado neste arquivo.',
      contacts: [
        {
          name: 'Mick Braddock',
          role: 'DOOMSDAY // CONTATO DE JACK',
          glyph: 'MK',
          messages: [
            { sender: 'Jack Connor', direction: 'outgoing', time: 'ENVIO PRESERVADO', text: 'Mick, no FBI eu preparei você para liderar os agentes especiais quando segui para a Interpol. Agora reúna os seus e venha ao encontro dos Hellsings assim que a rota estiver segura.' },
            { sender: 'Mick Braddock', direction: 'incoming', time: 'RESPOSTA PARCIAL', text: 'Eu lembro. Você me preparou para assumir a equipe. Estou com a Mei e as crianças; primeiro vou colocá-los em segurança, depois procuro vocês.' },
            { sender: 'Jack Connor', direction: 'outgoing', time: 'ÚLTIMO ENVIO RECUPERADO', text: 'Então faça como aprendeu: não confunda pressa com liderança. Proteja sua família. Nós manteremos a busca aberta.' },
            { sender: 'SISTEMA DE RÁDIO', direction: 'system', time: 'REGISTRO FINAL', text: 'A transmissão foi interrompida. Não há confirmação de encontro neste arquivo.' }
          ]
        }
      ]
    },
    mark: {
      code: 'MC-03 // TERMINAL DE CAMPO',
      signal: 'ARQUIVO RESTAURADO // DESTINO NÃO REGISTRADO',
      noteTitle: 'Uma linha militar entre dois mundos',
      note: 'Mark havia cumprido seu tempo na Marinha e deixado o serviço antes do Dia D. O Major James Hanson e o Coronel Samuel Salazar o conheciam por sua vida militar. Estes fragmentos guardam conversas entre antigos militares, não uma cadeia de comando de Hanson sobre Mark. O destino dos dois oficiais segue sem confirmação.',
      contacts: [
        {
          name: 'Major James Hanson',
          role: 'DOOMSDAY // INSTALAÇÃO MILITAR',
          glyph: 'JH',
          messages: [
            { sender: 'Major James Hanson', direction: 'incoming', time: 'FRAGMENTO RECUPERADO', text: 'Connor, a farda ensina a reconhecer quando é hora de recuar. Escolha a saída antes que o cerco se feche.' },
            { sender: 'Mark Connor', direction: 'outgoing', time: 'RESPOSTA PRESERVADA', text: 'Aprendi isso na Marinha, Major. Cumpri meu tempo e deixei o serviço, mas certas lições não se esquecem. Primeiro tiro minha família do cerco; depois procuro a rota.' },
            { sender: 'Major James Hanson', direction: 'incoming', time: 'PACOTE PARCIAL', text: 'A linha ainda está aberta deste lado. Se encontrar uma rota segura, me avise. Não precisa carregar todos sozinho.' },
            { sender: 'SISTEMA DE RÁDIO', direction: 'system', time: 'SEM CONFIRMAÇÃO POSTERIOR', text: 'O arquivo termina antes de registrar uma nova resposta.' }
          ]
        },
        {
          name: 'Coronel Samuel Salazar',
          role: 'DOOMSDAY // PENTÁGONO',
          glyph: 'SS',
          messages: [
            { sender: 'Coronel Samuel Salazar', direction: 'incoming', time: 'ALERTA PRESERVADO', text: 'Connor, o alerta foi elevado. Se esta mensagem chegar, proteja os seus e mantenha uma linha de comunicação enquanto for possível.' },
            { sender: 'Mark Connor', direction: 'outgoing', time: 'RESPOSTA PRESERVADA', text: 'Recebido, Coronel. Vou manter o grupo em movimento e guardar cada fragmento do canal.' },
            { sender: 'Coronel Samuel Salazar', direction: 'incoming', time: 'ÚLTIMO PACOTE LEGÍVEL', text: 'Faça isso. As ordens estão mudando mais rápido do que conseguimos transmiti-las.' },
            { sender: 'SISTEMA DE RÁDIO', direction: 'system', time: 'SEM CONFIRMAÇÃO POSTERIOR', text: 'Nenhum registro recuperado informa o que aconteceu com o remetente.' }
          ]
        }
      ]
    }
  };

  const record = archive[character];
  if (!record || !contactList || !thread) return;

  const putText = (selector, value) => {
    const node = dialog.querySelector(selector);
    if (node) node.textContent = value;
  };
  putText('[data-device-kicker]', record.code);
  putText('[data-device-signal]', record.signal);
  putText('[data-device-note-title]', record.noteTitle);
  putText('[data-device-note]', record.note);

  let activeContact = 0;

  const createContactButton = (contact, index) => {
    const button = document.createElement('button');
    button.className = 'recovered-device__contact';
    button.type = 'button';
    button.id = 'device-contact-' + index;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', 'device-thread');
    button.setAttribute('aria-selected', String(index === activeContact));
    button.tabIndex = index === activeContact ? 0 : -1;

    const avatar = document.createElement('span');
    avatar.className = 'recovered-device__avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent = contact.glyph;
    const identity = document.createElement('span');
    identity.className = 'recovered-device__contact-copy';
    const name = document.createElement('strong');
    name.textContent = contact.name;
    const role = document.createElement('small');
    role.textContent = contact.role;
    identity.append(name, role);
    button.append(avatar, identity);
    button.addEventListener('click', () => selectContact(index));
    button.addEventListener('keydown', (event) => {
      let next = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % record.contacts.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + record.contacts.length) % record.contacts.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = record.contacts.length - 1;
      else return;
      event.preventDefault();
      selectContact(next, true);
    });
    return button;
  };

  const renderThread = (contact) => {
    thread.replaceChildren();
    thread.setAttribute('aria-labelledby', 'device-contact-' + activeContact);
    contact.messages.forEach((message) => {
      const article = document.createElement('article');
      article.className = 'recovered-device__message recovered-device__message--' + message.direction;
      const meta = document.createElement('header');
      const sender = document.createElement('strong');
      sender.textContent = message.sender;
      const time = document.createElement('small');
      time.textContent = message.time;
      meta.append(sender, time);
      const text = document.createElement('p');
      text.textContent = message.text;
      article.append(meta, text);
      thread.appendChild(article);
    });
  };

  const selectContact = (index, moveFocus = false) => {
    activeContact = index;
    const contact = record.contacts[index];
    [...contactList.children].forEach((button, buttonIndex) => {
      const selected = buttonIndex === index;
      button.setAttribute('aria-selected', String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    renderThread(contact);
    if (moveFocus) contactList.children[index]?.focus();
  };

  record.contacts.forEach((contact, index) => contactList.appendChild(createContactButton(contact, index)));
  selectContact(0);

  const selectApp = (selectedTab, moveFocus = false) => {
    const app = selectedTab.dataset.deviceApp;
    appTabs.forEach((tab) => {
      const selected = tab === selectedTab;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    views.forEach((view) => { view.hidden = view.dataset.deviceView !== app; });
    if (moveFocus) selectedTab.focus();
  };

  appTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectApp(tab));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? appTabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : appTabs.length - 1)) % appTabs.length;
      selectApp(appTabs[next], true);
    });
  });

  opener.addEventListener('click', () => {
    if (dialog.open) return;
    lockPageScroll();
    try {
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    } catch (error) {
      unlockPageScroll();
      throw error;
    }
    opener.setAttribute('aria-expanded', 'true');
    (contactList.querySelector('[aria-selected="true"]') || closeButton).focus({ preventScroll: true });
  });
  closeButton?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    unlockPageScroll();
    opener.setAttribute('aria-expanded', 'false');
    opener.focus({ preventScroll: true });
  });
})();
