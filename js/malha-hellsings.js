(() => {
  const root = document.querySelector('[data-malha]');
  if (!root) return;

  const tabs = [...root.querySelectorAll('[data-malha-tab]')];
  const panels = [...root.querySelectorAll('[data-malha-panel]')];

  const scriptedMessages = {
    rota: [
      { name: 'Hellen Wren', role: 'H-10 // INFILTRAÇÃO', avatar: 'img-hellsing/hellen-presente.png', time: '06:26', text: 'Curva limpa. A marca some onde o mapa dobra; não vou além sem confirmação.', reactions: [{ icon: '⌕', name: 'Naomi', label: 'Naomi marcou para cruzar com o sinal' }] },
      { name: 'Naomi Yagami', role: 'N-05 // INTELIGÊNCIA', avatar: 'img-hellsing/naomi-presente.png', time: '06:29', text: 'O sinal abriu por mais dois segundos. A mesma pausa, nenhuma coordenada.' },
      { name: 'Mark Connor', role: 'COMANDO TÁTICO', avatar: 'img-presente/personagens/mark-presente2.png', time: '06:32', text: 'Sem coordenadas, o comboio não se move. Aguardamos outro ciclo.', reactions: [{ icon: '✓', name: 'Jack', label: 'Jack confirmou a ordem' }] },
      { name: 'Alice Connor', role: 'COMANDO MÉDICO', avatar: 'img-presente/personagens/alice-presente1.png', time: '06:36', text: 'O kit de triagem está pronto. Quero a equipe inteira de volta.' },
      { name: 'Jack Connor', role: 'JC-01 // COMANDO', avatar: 'img-presente/personagens/jack-presente1.png', time: '06:40', text: 'Motores frios. Se o sinal fechar, ficamos. Rota nenhuma vale voltar com alguém a menos.', reactions: [{ icon: '⌖', name: 'Mark', label: 'Mark marcou a decisão' }] },
      { name: 'Naomi Yagami', role: 'N-05 // INTELIGÊNCIA', avatar: 'img-hellsing/naomi-presente.png', time: '06:44', text: 'Separei a frequência de Mick das chamadas locais. O último pacote não traz coordenada nem confirmação de encontro.' },
      { name: 'Britney Connor', role: 'FORMAÇÃO H // PRESENTE', avatar: 'img-presente/personagens/britney-presente1.png', time: '06:47', text: 'O silêncio no rádio não responde por eles, Jack. Só diz que não conseguimos ouvir.' },
      { name: 'Jack Connor', role: 'JC-01 // COMANDO', avatar: 'img-presente/personagens/jack-presente1.png', time: '06:50', text: 'Eu sei. Reunimos os Hellsings para encontrá-los; não vou transformar a interrupção em despedida.', reactions: [{ icon: '♥', name: 'Britney', label: 'Britney reconheceu a resposta' }] },
      { name: 'Mark Connor', role: 'COMANDO TÁTICO', avatar: 'img-presente/personagens/mark-presente2.png', time: '06:53', text: 'A busca continua, mas ninguém avança sozinho. Quando houver sinal, conferimos a origem antes de mudar a rota.' },
      { name: 'Hellen Wren', role: 'H-10 // INFILTRAÇÃO', avatar: 'img-hellsing/hellen-presente.png', time: '06:56', text: 'Deixei os pontos de escuta em pares. Se uma frequência reaparecer, teremos duas leituras para comparar.' },
      { name: 'Alice Connor', role: 'COMANDO MÉDICO', avatar: 'img-presente/personagens/alice-presente1.png', time: '07:00', text: 'Preparei kits extras para quem possa chegar. Não sabemos quando, mas ainda podemos estar prontos.' },
      { name: 'Jack Connor', role: 'JC-01 // COMANDO', avatar: 'img-presente/personagens/jack-presente1.png', time: '07:03', text: 'Registrem cada tentativa. O encontro com o pessoal de Doomsday ainda está adiante; até lá, mantemos o canal e seguimos procurando.' }
    ],
    bunker: [
      { name: 'Jack Connor', role: 'JC-01 // COMANDO', avatar: 'img-presente/personagens/jack-presente1.png', time: '20:14', text: 'O mapa do Brian fica na mesa. As anotações dele ainda têm coisa para nos ensinar.' },
      { name: 'Naomi Yagami', role: 'N-05 // INTELIGÊNCIA', avatar: 'img-hellsing/naomi-presente.png', time: '20:18', text: 'Arquivo desta noite salvo. Sem data para o que ainda dói.' },
      { name: 'Alice Connor', role: 'COMANDO MÉDICO', avatar: 'img-presente/personagens/alice-presente1.png', time: '20:22', text: 'Ninguém precisa decidir hoje o que fazer com a caneca.', reactions: [{ icon: '♥', name: 'Jully', label: 'Jully agradeceu a Alice' }] },
      { name: 'Jully Connor', role: 'FORMAÇÃO H // PRESENTE', avatar: 'img-presente/personagens/jully-presente1.png', time: '20:26', text: 'Amanhã talvez eu leve a caneca para a sala de mapas. Hoje ela fica aqui.' },
      { name: 'Britney Connor', role: 'FORMAÇÃO H // PRESENTE', avatar: 'img-presente/personagens/britney-presente1.png', time: '20:29', text: 'Se você levar, eu vou junto. Não precisa atravessar isso sozinha.', reactions: [{ icon: '♥', name: 'Alice', label: 'Alice deixou uma reação de carinho' }] },
      { name: 'Bobby Lee', role: 'INTELIGÊNCIA DE CAMPO', avatar: 'img-presente/personagens/bobby-presente.png', time: '20:34', text: 'A chaleira está no fogo baixo. Ainda dá tempo de chegar antes que a água passe do ponto.' },
      { name: 'Jully Connor', role: 'FORMAÇÃO H // PRESENTE', avatar: 'img-presente/personagens/jully-presente1.png', time: '20:37', text: 'Eu ouvi. Pode trazer duas canecas, Lee.' },
      { name: 'Bobby Lee', role: 'INTELIGÊNCIA DE CAMPO', avatar: 'img-presente/personagens/bobby-presente.png', time: '20:39', text: 'Duas canecas e nenhuma pergunta até você querer responder.', reactions: [{ icon: '♥', name: 'Jully', label: 'Jully aceitou a companhia' }] },
      { name: 'Jack Connor', role: 'JC-01 // COMANDO', avatar: 'img-presente/personagens/jack-presente1.png', time: '20:43', text: 'A sala de mapas fica aberta. Para quem quiser falar, ou só ficar perto.' }
    ]
  };
  const progress = new Map();
  const status = root.querySelector('[data-malha-status]');
  let inView = false;
  let aiBusy = false;
  let postTimer = 0;
  let typingTimer = 0;
  let typingNode = null;

  const setStatus = (text) => {
    if (status) status.textContent = text;
  };
  const clearPending = () => {
    window.clearTimeout(postTimer);
    window.clearTimeout(typingTimer);
    postTimer = 0;
    typingTimer = 0;
    typingNode?.remove();
    typingNode = null;
  };
  const activePanel = () => panels.find((panel) => !panel.hidden);
  const updateCounts = (channel, panel) => {
    const count = String(panel.querySelectorAll('.malha-message:not(.malha-message--typing)').length).padStart(2, '0');
    root.querySelectorAll('[data-malha-count="' + channel + '"], [data-malha-total="' + channel + '"]').forEach((element) => {
      element.textContent = count;
    });
  };
  const createTyping = (message) => {
    const item = document.createElement('li');
    item.className = 'malha-message malha-message--typing';
    item.setAttribute('aria-hidden', 'true');
    const avatar = document.createElement('img');
    avatar.src = message.avatar;
    avatar.alt = '';
    avatar.setAttribute('aria-hidden', 'true');
    const content = document.createElement('div');
    content.className = 'malha-message__content';
    const heading = document.createElement('header');
    const author = document.createElement('b');
    author.textContent = message.name;
    const role = document.createElement('span');
    role.textContent = 'ESCREVENDO NA MALHA';
    heading.append(author, role);
    const text = document.createElement('p');
    text.textContent = 'digitando';
    const dots = document.createElement('span');
    dots.className = 'malha-typing-dots';
    for (let index = 0; index < 3; index += 1) dots.appendChild(document.createElement('i'));
    text.appendChild(dots);
    content.append(heading, text);
    item.append(avatar, content);
    return item;
  };
  const createMessage = (message) => {
    const item = document.createElement('li');
    item.className = 'malha-message malha-message--scheduled';
    const avatar = document.createElement('img');
    avatar.src = message.avatar;
    avatar.alt = '';
    avatar.setAttribute('aria-hidden', 'true');
    const content = document.createElement('div');
    content.className = 'malha-message__content';
    const heading = document.createElement('header');
    const author = document.createElement('b');
    author.textContent = message.name;
    const role = document.createElement('span');
    role.textContent = message.role;
    const time = document.createElement('time');
    time.dateTime = message.time;
    time.textContent = message.time;
    heading.append(author, role, time);
    const text = document.createElement('p');
    text.textContent = message.text;
    content.append(heading, text);
    if (message.reactions?.length) {
      const reactions = document.createElement('div');
      reactions.className = 'malha-reactions';
      reactions.setAttribute('aria-label', 'Reações');
      message.reactions.forEach((entry) => {
        const reaction = document.createElement('span');
        reaction.setAttribute('aria-label', entry.label);
        const icon = document.createElement('b');
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = entry.icon;
        const name = document.createElement('small');
        name.textContent = entry.name;
        reaction.append(icon, name);
        reactions.appendChild(reaction);
      });
      content.appendChild(reactions);
    }
    const origin = document.createElement('small');
    origin.className = 'malha-message__origin';
    origin.textContent = 'RECORTE ROTEIRIZADO';
    content.appendChild(origin);
    item.append(avatar, content);
    return item;
  };

  const scheduleRecut = () => {
    clearPending();
    if (!inView) {
      setStatus('RECORTES EM ESPERA');
      return;
    }
    if (aiBusy) {
      setStatus('DIÁLOGO COM IA EM ANDAMENTO');
      return;
    }
    const panel = activePanel();
    const channel = panel?.dataset.malhaPanel;
    const queue = scriptedMessages[channel];
    if (!panel || !queue) return;
    const index = progress.get(channel) || 0;
    if (index >= queue.length) {
      setStatus('CICLO ROTEIRIZADO CONCLUÍDO');
      return;
    }
    const feed = panel.querySelector('.malha-feed');
    if (!feed) return;
    const message = queue[index];
    setStatus('PRÓXIMO RECORTE // ' + message.name.toUpperCase());
    postTimer = window.setTimeout(() => {
      if (!inView || panel.hidden) return;
      typingNode = createTyping(message);
      feed.appendChild(typingNode);
      setStatus(message.name.toUpperCase() + ' // DIGITANDO');
      typingTimer = window.setTimeout(() => {
        if (!inView || panel.hidden) {
          clearPending();
          return;
        }
        const nearBottom = feed.scrollHeight - feed.scrollTop - feed.clientHeight < 90;
        typingNode?.remove();
        typingNode = null;
        feed.appendChild(createMessage(message));
        progress.set(channel, index + 1);
        updateCounts(channel, panel);
        setStatus(message.name.toUpperCase() + ' // RECORTE PROGRAMADO');
        if (nearBottom) feed.scrollTop = feed.scrollHeight;
        if (index + 1 < queue.length) scheduleRecut();
        else setStatus('CICLO ROTEIRIZADO CONCLUÍDO');
      }, 1100);
    }, index === 0 ? 3600 : 7800);
  };

  const activate = (tab, moveFocus = false) => {
    const channel = tab.dataset.malhaTab;

    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      item.classList.toggle('is-active', selected);
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.malhaPanel !== channel;
    });

    if (moveFocus) tab.focus();
    if (inView) scheduleRecut();
  };

  root.addEventListener('malha-ai:start', () => {
    aiBusy = true;
    clearPending();
    setStatus('DIÁLOGO COM IA EM ANDAMENTO');
  });
  root.addEventListener('malha-ai:finish', () => {
    aiBusy = false;
    scheduleRecut();
  });

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      activate(tabs[nextIndex], true);
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.some((entry) => entry.isIntersecting);
      if (visible === inView) return;
      inView = visible;
      scheduleRecut();
    }, { threshold: .08, rootMargin: '0px 0px -24px 0px' });
    observer.observe(root);
  } else {
    inView = true;
    scheduleRecut();
  }
})();
