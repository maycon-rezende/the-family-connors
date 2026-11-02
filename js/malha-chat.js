(() => {
  const widget = document.querySelector('[data-malha-chat]');
  if (!widget) return;

  const launcher = widget.querySelector('[data-chat-launcher]');
  const panel = widget.querySelector('[data-chat-panel]');
  const closeButton = widget.querySelector('[data-chat-close]');
  const tabs = [...widget.querySelectorAll('[data-chat-tab]')];
  const threads = [...widget.querySelectorAll('[data-chat-thread]')];
  if (!launcher || !panel || !closeButton || tabs.length === 0 || threads.length === 0) return;

  const scriptedMessages = {
    route: [
      { name: 'Naomi Yagami', avatar: 'img-hellsing/naomi-presente.png', time: '06:26', text: 'O sinal abriu por pouco. A pausa continua igual, mas não veio coordenada.', reaction: { icon: '⌖', name: 'Jack', label: 'Jack marcou o trecho para conferir' } },
      { name: 'Luke', avatar: 'img-hellsing/luke-presente.png', time: '06:29', text: 'Até a curva, o leito seco é firme. Depois dela, o mapa só oferece silêncio.' },
      { name: 'Mark Connor', avatar: 'img-presente/personagens/mark-presente2.png', time: '06:32', text: 'Então ninguém desloca o comboio. Uma marca não vira caminho só porque queremos que seja.', reaction: { icon: '⚠', name: 'Alice', label: 'Alice pediu confirmação antes da saída' } },
      { name: 'Hellen Wren', avatar: 'img-hellsing/hellen-presente.png', time: '06:36', text: 'Estou voltando sem motor. A curva está limpa até onde a luz alcança.' },
      { name: 'Alice Connor', avatar: 'img-presente/personagens/alice-presente1.png', time: '06:40', text: 'Triagem na volta. Ninguém troca uma confirmação por pressa.' },
      { name: 'Jack Connor', avatar: 'img-presente/personagens/jack-presente1.png', time: '06:43', text: 'Motores frios. Primeiro confirmamos o próximo trecho. Depois, a estrada.', reaction: { icon: '✓', name: 'Mark', label: 'Mark confirmou a ordem' } },
      { name: 'Britney Connor', avatar: 'img-presente/personagens/britney-presente1.png', time: '06:47', text: 'O último arquivo de Mick continua sem confirmação. Não vou deixar o rádio virar uma sentença antes da hora.' },
      { name: 'Naomi Yagami', avatar: 'img-hellsing/naomi-presente.png', time: '06:50', text: 'Separei as frequências por horário. Se algum sinal de Doomsday voltar, podemos comparar sem confundir com o ruído local.' },
      { name: 'Mark Connor', avatar: 'img-presente/personagens/mark-presente2.png', time: '06:53', text: 'E ninguém sai sozinho para seguir uma voz. Primeiro confirmamos de onde ela veio.' },
      { name: 'Hellen Wren', avatar: 'img-hellsing/hellen-presente.png', time: '06:57', text: 'Os pontos de escuta estão cobertos. Sem coordenada, não cruzo o perímetro.' },
      { name: 'Alice Connor', avatar: 'img-presente/personagens/alice-presente1.png', time: '07:01', text: 'Deixei kits extras separados. Se alguém aparecer na rota, quero poder cuidar sem desmontar a triagem.' },
      { name: 'Jack Connor', avatar: 'img-presente/personagens/jack-presente1.png', time: '07:05', text: 'Mantenham a busca aberta. O encontro com eles ainda não aconteceu; quando houver resposta, vamos saber antes de avançar.' }
    ],
    bunker: [
      { name: 'Jully Connor', avatar: 'img-presente/personagens/jully-presente1.png', time: '20:20', text: 'A caneca continua no mesmo lugar. Hoje consegui passar por ela sem parar.' },
      { name: 'Britney Connor', avatar: 'img-presente/personagens/britney-presente1.png', time: '20:24', text: 'Isso já é uma noite diferente. Não precisa medir mais do que isso.', reaction: { icon: '♥', name: 'Jully', label: 'Jully recebeu o carinho' } },
      { name: 'Alice Connor', avatar: 'img-presente/personagens/alice-presente1.png', time: '20:28', text: 'Deixei a luz pequena acesa no corredor. Quem precisar conversar sabe onde nos encontrar.' },
      { name: 'Mark Connor', avatar: 'img-presente/personagens/mark-presente2.png', time: '20:32', text: 'O mapa de Brian continua na sala. Jack pediu para preservar as anotações dele.' },
      { name: 'Naomi Yagami', avatar: 'img-hellsing/naomi-presente.png', time: '20:36', text: 'Registrei o recorte sem data. A letra no canto ainda não foi identificada.', reaction: { icon: '⌕', name: 'Alice', label: 'Alice marcou para revisar depois' } },
      { name: 'Bobby Lee', avatar: 'img-presente/personagens/bobby-presente.png', time: '20:40', text: 'A chaleira está pronta. Quem for para a sala de mapas pode levar uma caneca.' },
      { name: 'Jully Connor', avatar: 'img-presente/personagens/jully-presente1.png', time: '20:43', text: 'Duas, por favor. E deixa a porta aberta.' },
      { name: 'Bobby Lee', avatar: 'img-presente/personagens/bobby-presente.png', time: '20:45', text: 'Duas canecas. Porta aberta. Sem pressa para responder a ninguém.', reaction: { icon: '♥', name: 'Jully', label: 'Jully recebeu a oferta de companhia' } },
      { name: 'Britney Connor', avatar: 'img-presente/personagens/britney-presente1.png', time: '20:49', text: 'Vou com vocês. Hoje a sala não precisa ficar em silêncio.' }
    ],
    brian: [
      { name: 'Naomi Yagami', avatar: 'img-hellsing/naomi-presente.png', time: '00:06', text: 'Deixei o canal da vigília aberto. Não para esperar resposta; para ninguém atravessar essa noite sem ser ouvido.' },
      { name: 'Mark Connor', avatar: 'img-presente/personagens/mark-presente2.png', time: '00:10', text: 'O mapa dele continua na sala. A última rota não vai desaparecer junto com a luz da enfermaria.', reaction: { icon: '⌖', name: 'Jack', label: 'Jack guardou o registro' } },
      { name: 'Jully Connor', avatar: 'img-presente/personagens/jully-presente1.png', time: '00:14', text: 'A caneca ficou onde estava. Hoje eu consegui sentar à mesa. Só isso.' },
      { name: 'Alice Connor', avatar: 'img-presente/personagens/alice-presente1.png', time: '00:17', text: 'Isso basta por hoje. Amanhã a gente decide o que consegue carregar.', reaction: { icon: '♥', name: 'Britney', label: 'Britney deixou uma reação de carinho' } },
      { name: 'Jack Connor', avatar: 'img-presente/personagens/jack-presente1.png', time: '00:20', text: 'Ninguém apaga o nome dele do registro. Amanhã abrimos juntos a sala de mapas.' },
      { name: 'Britney Connor', avatar: 'img-presente/personagens/britney-presente1.png', time: '00:24', text: 'Ele sempre percebia quando alguém ficava para trás na conversa. Hoje vou falar por todos nós: Brian, você fez falta antes mesmo de partir.' },
      { name: 'Bobby Lee', avatar: 'img-presente/personagens/bobby-presente.png', time: '00:28', text: 'Quando eu ainda não conhecia os caminhos de vocês, ele me mostrou onde guardar o equipamento e onde sentar. Parecia pouca coisa. Não era.' },
      { name: 'Joey Muller', avatar: 'img-hellsing/joey-presente.png', time: '00:32', text: 'Brian dizia que uma trilha só era segura quando o último do grupo sabia como voltar. Eu ainda escuto isso antes de cada saída.' },
      { name: 'Dimitri', avatar: 'img-hellsing/dimitri-presente.png', time: '00:36', text: 'Ele nunca pediu que alguém fosse mais corajoso. Só conferia se estávamos juntos antes de abrir a porta.' },
      { name: 'John', avatar: 'img-hellsing/john-presente.png', time: '00:40', text: 'Quando eu chegava com um rádio que ninguém conseguia consertar, Brian dizia que o problema era o rádio, não o homem segurando a chave.' },
      { name: 'Hellen Wren', avatar: 'img-hellsing/hellen-presente.png', time: '00:44', text: 'Ele me ensinou a voltar sem deixar que o medo escolhesse a rota. Guardei isso mais vezes do que consigo contar.' },
      { name: 'Pollyana Salvatore Connor', avatar: 'img-presente/personagens/pollyanna.png', time: '00:48', text: 'Eu era pequena quando ele me mostrou como ler as marcas no mapa. Ainda procuro o caminho com a mesma calma que ele tinha.' },
      { name: 'Nathan Salvatore Connor', avatar: 'img-presente/personagens/nathan.png', time: '00:52', text: 'Ele me ensinou que mirar também é esperar. Não disparar antes de ter certeza pode salvar mais do que um tiro.' },
      { name: 'Jack Connor', avatar: 'img-presente/personagens/jack-presente1.png', time: '00:56', text: 'A sala de mapas fica aberta. Amanhã vamos ler as anotações dele juntos, sem fingir que isso será fácil.' }
    ],
    john: [
      { name: 'Naomi Yagami', avatar: 'img-hellsing/naomi-presente.png', time: '05:31', text: 'O canal segue aberto. Só chegam as vozes dos que alcançaram a saída.' },
      { name: 'Mark Connor', avatar: 'img-presente/personagens/mark-presente2.png', time: '05:35', text: 'Cada marca naquela rota corresponde a alguém que passou. Vou preservar todas.', reaction: { icon: '⌖', name: 'Naomi', label: 'Naomi confirmou o registro' } },
      { name: 'Hellen Wren', avatar: 'img-hellsing/hellen-presente.png', time: '05:39', text: 'O último ponto de John não vai sumir só para o mapa parecer mais limpo.' },
      { name: 'Alice Connor', avatar: 'img-presente/personagens/alice-presente1.png', time: '05:42', text: 'Tem gente que voltou sem conseguir falar. Deixem a enfermaria livre para eles.' },
      { name: 'Jack Connor', avatar: 'img-presente/personagens/jack-presente1.png', time: '05:46', text: 'O nome de John fica na rota. Não como destino, mas como a razão de a porta continuar aberta.', reaction: { icon: '✓', name: 'Mark', label: 'Mark confirmou a decisão' } },
      { name: 'Amelia', avatar: 'img-hellsing/john-presente.png', time: '05:51', text: 'Ele deixou uma lista de rádios para testar. Não consegui abrir ainda. Só preciso de um pouco mais de tempo.' },
      { name: 'Naomi Yagami', avatar: 'img-hellsing/naomi-presente.png', time: '05:55', text: 'Fica com ela. O inventário pode esperar; a enfermaria ainda está recebendo gente.' },
      { name: 'Mark Connor', avatar: 'img-presente/personagens/mark-presente2.png', time: '05:59', text: 'A rota de saída está marcada. Não vamos apagar nada que ele deixou para trás.', reaction: { icon: '⌖', name: 'Amelia', label: 'Amelia guardou o mapa' } },
      { name: 'Alice Connor', avatar: 'img-presente/personagens/alice-presente1.png', time: '06:03', text: 'A maca está livre agora. Quando quiser, eu fico com você enquanto abre a lista.' },
      { name: 'Amelia', avatar: 'img-hellsing/john-presente.png', time: '06:07', text: 'Obrigada. Hoje eu só queria ouvir alguém dizer que não preciso fazer isso sozinha.' }
    ]
  };

  const status = widget.querySelector('[data-chat-status]');
  const progress = new Map();
  let postTimer = 0;
  let typingTimer = 0;
  let pendingTyping = null;
  let aiBusy = false;

  const activeThread = () => threads.find((thread) => !thread.hidden);
  const setStatus = (message) => {
    if (status) status.textContent = message;
  };
  const clearTimers = () => {
    window.clearTimeout(postTimer);
    window.clearTimeout(typingTimer);
    postTimer = 0;
    typingTimer = 0;
    pendingTyping?.remove();
    pendingTyping = null;
  };

  const buildTyping = (message) => {
    const item = document.createElement('li');
    item.className = 'malha-chat-typing';
    item.setAttribute('aria-hidden', 'true');

    const avatar = document.createElement('img');
    avatar.src = message.avatar;
    avatar.alt = '';
    avatar.setAttribute('aria-hidden', 'true');

    const bubble = document.createElement('div');
    bubble.className = 'malha-chat-typing__bubble';
    const label = document.createElement('b');
    label.className = 'malha-chat-typing__label';
    label.textContent = message.name + ' digitando';
    const dots = document.createElement('span');
    dots.className = 'malha-chat-typing__dots';
    for (let index = 0; index < 3; index += 1) dots.appendChild(document.createElement('i'));
    bubble.append(label, dots);
    item.append(avatar, bubble);
    return item;
  };

  const buildMessage = (message) => {
    const item = document.createElement('li');
    item.className = 'malha-chat-message malha-chat-message--scheduled';

    const avatar = document.createElement('img');
    avatar.src = message.avatar;
    avatar.alt = '';
    avatar.setAttribute('aria-hidden', 'true');

    const body = document.createElement('div');
    const heading = document.createElement('header');
    const author = document.createElement('b');
    author.textContent = message.name;
    const time = document.createElement('time');
    time.dateTime = message.time;
    time.textContent = message.time;
    heading.append(author, time);

    const text = document.createElement('p');
    text.textContent = message.text;
    body.append(heading, text);

    if (message.reaction) {
      const reactions = document.createElement('div');
      reactions.className = 'malha-chat-reactions';
      const reaction = document.createElement('span');
      reaction.setAttribute('aria-label', message.reaction.label);
      reaction.append(document.createTextNode(message.reaction.icon + ' '));
      const name = document.createElement('small');
      name.textContent = message.reaction.name;
      reaction.appendChild(name);
      reactions.appendChild(reaction);
      body.appendChild(reactions);
    }

    const origin = document.createElement('small');
    origin.className = 'malha-chat-message__origin';
    origin.textContent = 'RECORTE ROTEIRIZADO';
    body.appendChild(origin);
    item.append(avatar, body);
    return item;
  };

  const syncBotStream = () => {
    clearTimers();
    if (panel.hidden) {
      setStatus('CANAL EM ESPERA');
      return;
    }
    if (aiBusy) {
      setStatus('DIÁLOGO COM IA EM ANDAMENTO');
      return;
    }

    const thread = activeThread();
    const channel = thread?.dataset.chatThread;
    const queue = scriptedMessages[channel];
    if (!thread || !queue) {
      setStatus('ARQUIVO FIXO');
      return;
    }

    const index = progress.get(channel) || 0;
    if (index >= queue.length) {
      setStatus('CICLO ROTEIRIZADO CONCLUÍDO');
      return;
    }

    const message = queue[index];
    const feed = thread.querySelector('.malha-chat-messages');
    if (!feed) return;
    setStatus('SINAL PROGRAMADO // ' + message.name.toUpperCase());

    postTimer = window.setTimeout(() => {
      if (panel.hidden || thread.hidden) return;
      pendingTyping = buildTyping(message);
      feed.appendChild(pendingTyping);
      thread.scrollTop = thread.scrollHeight;
      setStatus(message.name.toUpperCase() + ' // DIGITANDO');

      typingTimer = window.setTimeout(() => {
        if (panel.hidden || thread.hidden) {
          clearTimers();
          return;
        }

        const wasNearBottom = thread.scrollHeight - thread.scrollTop - thread.clientHeight < 100;
        pendingTyping?.remove();
        pendingTyping = null;
        feed.appendChild(buildMessage(message));
        progress.set(channel, index + 1);
        setStatus(message.name.toUpperCase() + ' // NOVO RECORTE PROGRAMADO');
        if (wasNearBottom) thread.scrollTop = thread.scrollHeight;

        if (index + 1 < queue.length) {
          syncBotStream();
        } else {
          setStatus('CICLO ROTEIRIZADO CONCLUÍDO');
        }
      }, 1050);
    }, index === 0 ? 2800 : 7600);
  };

  const setOpen = (open, restoreFocus = false) => {
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    if (open) {
      const selectedTab = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];
      selectedTab.focus({ preventScroll: true });
      const thread = activeThread();
      if (thread) window.requestAnimationFrame(() => { thread.scrollTop = thread.scrollHeight; });
      syncBotStream();
    } else if (restoreFocus) {
      syncBotStream();
      launcher.focus({ preventScroll: true });
    } else {
      syncBotStream();
    }
  };

  const activateTab = (selected, moveFocus = false) => {
    const channel = selected.dataset.chatTab;
    tabs.forEach((tab) => {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    threads.forEach((thread) => {
      thread.hidden = thread.dataset.chatThread !== channel;
    });
    if (moveFocus) selected.focus();
    if (!panel.hidden) {
      const thread = activeThread();
      if (thread) thread.scrollTop = thread.scrollHeight;
      syncBotStream();
    }
  };

  widget.addEventListener('malha-ai:start', () => {
    aiBusy = true;
    clearTimers();
    setStatus('DIÁLOGO COM IA EM ANDAMENTO');
  });
  widget.addEventListener('malha-ai:finish', () => {
    aiBusy = false;
    syncBotStream();
  });

  launcher.addEventListener('click', () => setOpen(panel.hidden));
  closeButton.addEventListener('click', () => setOpen(false, true));

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) setOpen(false, true);
  });

  document.addEventListener('pointerdown', (event) => {
    if (!panel.hidden && !widget.contains(event.target)) setOpen(false);
  });

  const menuObserver = new MutationObserver(() => {
    if (document.body.classList.contains('world-menu-open') && !panel.hidden) setOpen(false);
  });
  menuObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
})();
