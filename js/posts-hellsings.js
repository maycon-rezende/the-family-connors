(() => {
  const feed = document.querySelector('.hpost-feed');
  if (!feed) return;

  const liveStatus = feed.querySelector('[data-post-live]');
  const countLabel = document.querySelector('[data-post-count]');
  const scriptedPosts = [
    {
      author: { name: 'Jack Connor', role: 'JC-01 // COMANDO', avatar: 'img-presente/personagens/jack-presente1.png' },
      text: 'Depois do briefing, a sala de mapas fica aberta. Às vezes, estar junto já basta.',
      replies: [
        { name: 'Mark Connor', avatar: 'img-presente/personagens/mark-presente2.png', text: 'Deixei café no canto, longe das cartas desta vez.' },
        { name: 'Jack Connor', avatar: 'img-presente/personagens/jack-presente1.png', replyTo: 'Mark', text: 'Essa parte eu consigo cumprir.' }
      ],
      reaction: '♥'
    },
    {
      author: { name: 'Mark Connor', role: 'COMANDO TÁTICO', avatar: 'img-presente/personagens/mark-presente2.png' },
      text: 'A ronda do portão sul terminou. O trinco foi reforçado e a corrente antiga retirada. Quem assumir o próximo turno, testa antes de fechar.',
      replies: [
        { name: 'Jack Connor', avatar: 'img-presente/personagens/jack-presente1.png', text: 'Anotado. Vou conferir na troca.' },
        { name: 'Naomi Yagami', avatar: 'img-hellsing/naomi-presente.png', text: 'O quadro da ronda já está atualizado.' }
      ],
      reaction: '⌖'
    },
    {
      author: { name: 'Alice Connor', role: 'COMANDO MÉDICO', avatar: 'img-presente/personagens/alice-presente1.png' },
      text: 'Reabasteci o kit do veículo três. Se usarem a última gaze, avisem; o estojo vazio não conta como devolvido.',
      replies: [
        { name: 'Bobby Lee', avatar: 'img-presente/personagens/lee-presente.png', text: 'Deixei duas caixas novas na enfermaria.' },
        { name: 'Alice Connor', avatar: 'img-presente/personagens/alice-presente1.png', replyTo: 'Bobby', text: 'Recebidas. Obrigada, Lee.' }
      ],
      reaction: '✓'
    },
    {
      author: { name: 'Ariani Salvatore', role: 'HELLSINGS // COORDENAÇÃO', avatar: 'img-presente/personagens/ariani-presente3.png' },
      text: 'Atualizei a lista de remédios do depósito. A reserva continua separada; ninguém deve abrir sem registrar o motivo.',
      replies: [
        { name: 'Naomi Yagami', avatar: 'img-hellsing/naomi-presente.png', text: 'A cópia no quadro está igual à do arquivo.' },
        { name: 'Ariani Salvatore', avatar: 'img-presente/personagens/ariani-presente3.png', replyTo: 'Naomi', text: 'Perfeito. Deixe a anterior no arquivo também.' }
      ],
      reaction: '♥'
    },
    {
      author: { name: 'Britney Connor', role: 'FORMAÇÃO H // PRESENTE', avatar: 'img-presente/personagens/britney-presente3.png' },
      text: 'A música de hoje fica no refeitório. Pedido: nada de caixa de som perto da enfermaria depois que as luzes apagarem.',
      replies: [
        { name: 'Jully Connor', avatar: 'img-presente/personagens/jully-presente1.png', text: 'Vale também para quem canta?' },
        { name: 'Britney Connor', avatar: 'img-presente/personagens/britney-presente3.png', replyTo: 'Jully', text: 'Só se for pior que a caixa.' }
      ],
      reaction: '♫'
    },
    {
      author: { name: 'Jully Connor', role: 'FORMAÇÃO H // PRESENTE', avatar: 'img-presente/personagens/jully-presente1.png' },
      text: 'Tem duas canecas limpas na mesa da janela. Não são de ninguém. Pelo menos não tinham nome quando eu cheguei.',
      replies: [
        { name: 'Mark Connor', avatar: 'img-presente/personagens/mark-presente2.png', text: 'Agora uma tem meu nome.' },
        { name: 'Jully Connor', avatar: 'img-presente/personagens/jully-presente1.png', replyTo: 'Mark', text: 'Você marcou com fita tática?' }
      ],
      reaction: '☕'
    },
    {
      author: { name: 'Bobby Lee', role: 'INTELIGÊNCIA DE CAMPO', avatar: 'img-presente/personagens/lee-presente.png' },
      text: 'A caixa de ferramentas estava no lugar certo. Eu é que procurei no lugar errado. Caso encerrado.',
      replies: [
        { name: 'Britney Connor', avatar: 'img-presente/personagens/britney-presente3.png', text: 'Temos testemunha?' },
        { name: 'Bobby Lee', avatar: 'img-presente/personagens/lee-presente.png', replyTo: 'Britney', text: 'A caixa se recusou a depor.' }
      ],
      reaction: '☻'
    },
    {
      author: { name: 'Naomi Yagami', role: 'N-05 // INTELIGÊNCIA', avatar: 'img-hellsing/naomi-presente.png' },
      text: 'Registrei a troca de bateria dos rádios. O posto leste mantém a frequência antiga até confirmarmos o alcance da nova.',
      replies: [
        { name: 'Jack Connor', avatar: 'img-presente/personagens/jack-presente1.png', text: 'Confirmado. Sem mudança antes do teste.' },
        { name: 'Naomi Yagami', avatar: 'img-hellsing/naomi-presente.png', replyTo: 'Jack', text: 'Já deixei isso marcado no quadro.' }
      ],
      reaction: '✓'
    },
    {
      author: { name: 'Hellen Wren', role: 'H-10 // INFILTRAÇÃO', avatar: 'img-hellsing/hellen-presente.png' },
      text: 'O espelho do corredor mudou de lugar. Se alguém perguntar, não fui eu. Só percebi antes de todos.',
      replies: [
        { name: 'Joey Muller', avatar: 'img-hellsing/joey-presente.png', text: 'Você percebeu antes de quem colocou.' },
        { name: 'Hellen Wren', avatar: 'img-hellsing/hellen-presente.png', replyTo: 'Joey', text: 'Era isso que eu queria descobrir.' }
      ],
      reaction: '⌕'
    },
    {
      author: { name: 'Joey Muller', role: 'HELLSINGS // EXPLORAÇÃO', avatar: 'img-hellsing/joey-presente.png' },
      text: 'A trilha até o reservatório está livre. A bicicleta pendurada na cerca não faz parte da rota, mesmo que alguém insista.',
      replies: [
        { name: 'Hellen Wren', avatar: 'img-hellsing/hellen-presente.png', text: 'Não olhei para você.' },
        { name: 'Joey Muller', avatar: 'img-hellsing/joey-presente.png', replyTo: 'Hellen', text: 'E eu não fiz pergunta.' }
      ],
      reaction: '⌖'
    },
    {
      author: { name: 'Dimitri', role: 'HELLSINGS // CAMPO', avatar: 'img-hellsing/dimitri-presente.png' },
      text: 'Turno da oficina encerrado. A luz ficou acesa por um bom motivo: alguém ainda estava procurando a chave que deixou lá dentro.',
      replies: [
        { name: 'Jack Connor', avatar: 'img-presente/personagens/jack-presente1.png', text: 'A chave apareceu?' },
        { name: 'Dimitri', avatar: 'img-hellsing/dimitri-presente.png', replyTo: 'Jack', text: 'Sim. No bolso de quem perguntou.' }
      ],
      reaction: '☻'
    },
    {
      author: { name: 'Luke', role: 'HELLSINGS // MAPAS E ROTAS', avatar: 'img-hellsing/luke-presente.png' },
      text: 'Atualizei a rota interna. A cópia antiga ainda marca uma porta que emperra; risquei o traçado e deixei as duas saídas usáveis.',
      replies: [
        { name: 'Mark Connor', avatar: 'img-presente/personagens/mark-presente2.png', text: 'Vi. Agora dá para explicar sem apontar para três papéis.' },
        { name: 'Luke', avatar: 'img-hellsing/luke-presente.png', replyTo: 'Mark', text: 'Esse era o objetivo.' }
      ],
      reaction: '✓'
    },
    {
      author: { name: 'Chloe', role: 'HELLSINGS // RECONHECIMENTO', avatar: 'img-hellsing/clhoe-presente.png' },
      text: 'A luz de sinalização piscou três vezes no posto sul. Confirmei com a ronda: bateria em teste, sem alerta.',
      replies: [
        { name: 'Naomi Yagami', avatar: 'img-hellsing/naomi-presente.png', text: 'Registro atualizado. Obrigada por confirmar antes de abrir o canal.' },
        { name: 'Chloe', avatar: 'img-hellsing/clhoe-presente.png', replyTo: 'Naomi', text: 'Ótimo. Já posso tomar o café que deixei esfriar.' }
      ],
      reaction: '☕'
    }
  ];

  const updatePostCount = () => {
    if (countLabel) {
      const count = feed.querySelectorAll('.hpost-card').length;
      countLabel.textContent = String(count).padStart(2, '0') + ' PUBLICAÇÕES';
    }
  };

  const bindReaction = (button) => {
    const count = button.querySelector('[data-reaction-count]');
    const baseCount = Number(button.dataset.baseCount || 0);
    let active = false;
    button.addEventListener('click', () => {
      active = !active;
      button.setAttribute('aria-pressed', String(active));
      button.classList.toggle('is-active', active);
      if (count) count.textContent = String(baseCount + (active ? 1 : 0));
      button.setAttribute('aria-label', active ? 'Sua reação foi adicionada neste navegador' : 'Remover ou adicionar reação neste navegador');
    });
  };

  document.querySelectorAll('[data-post-reaction]').forEach(bindReaction);

  const createComment = (reply) => {
    const item = document.createElement('li');
    if (reply.replyTo) item.className = 'hpost-comment-reply';
    const avatar = document.createElement('img');
    avatar.src = reply.avatar;
    avatar.alt = '';
    avatar.loading = 'lazy';
    const content = document.createElement('div');
    const name = document.createElement('b');
    name.append(document.createTextNode(reply.name));
    if (reply.replyTo) {
      const replyLabel = document.createElement('span');
      replyLabel.textContent = '↳ ' + reply.replyTo;
      name.append(' ', replyLabel);
    }
    const text = document.createElement('p');
    text.textContent = reply.text;
    content.append(name, text);
    item.append(avatar, content);
    return item;
  };

  let postNumber = 0;
  const buildPost = (post) => {
    postNumber += 1;
    const article = document.createElement('article');
    article.className = 'hpost-card hpost-card--arriving';
    article.dataset.livePost = 'true';
    article.id = 'post-live-' + postNumber;

    const authorHeader = document.createElement('header');
    authorHeader.className = 'hpost-author';
    const avatar = document.createElement('img');
    avatar.src = post.author.avatar;
    avatar.alt = '';
    avatar.loading = 'lazy';
    const identity = document.createElement('div');
    const authorName = document.createElement('b');
    authorName.textContent = post.author.name;
    const role = document.createElement('span');
    role.textContent = post.author.role;
    identity.append(authorName, role);
    const time = document.createElement('time');
    const now = new Date();
    const stamp = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    time.dateTime = stamp;
    time.textContent = stamp;
    authorHeader.append(avatar, identity, time);

    const message = document.createElement('p');
    message.className = 'hpost-text';
    message.textContent = post.text;
    const origin = document.createElement('small');
    origin.className = 'hpost-origin';
    origin.textContent = 'CANAL HELLSINGS // CONVÍVIO';

    const replies = document.createElement('ol');
    replies.className = 'hpost-comments';
    replies.setAttribute('aria-label', 'Comentários na publicação de ' + post.author.name);
    post.replies.forEach((reply) => replies.appendChild(createComment(reply)));

    const actions = document.createElement('footer');
    actions.className = 'hpost-actions';
    const reaction = document.createElement('button');
    reaction.type = 'button';
    reaction.dataset.postReaction = '';
    reaction.dataset.baseCount = String(2 + Math.floor(Math.random() * 7));
    reaction.setAttribute('aria-pressed', 'false');
    reaction.setAttribute('aria-label', 'Reagir à publicação de ' + post.author.name);
    const icon = document.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = post.reaction;
    const reactionCount = document.createElement('b');
    reactionCount.dataset.reactionCount = '';
    reactionCount.textContent = reaction.dataset.baseCount;
    const reactionLabel = document.createElement('small');
    reactionLabel.textContent = 'REAÇÕES';
    reaction.append(icon, reactionCount, reactionLabel);
    bindReaction(reaction);
    const replyCount = document.createElement('span');
    replyCount.textContent = String(post.replies.length).padStart(2, '0') + ' RESPOSTAS';
    actions.append(reaction, replyCount);

    article.append(authorHeader, message, origin, replies, actions);
    return article;
  };

  const shuffle = (items) => {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const swap = Math.floor(Math.random() * (index + 1));
      [result[index], result[swap]] = [result[swap], result[index]];
    }
    return result;
  };

  let cycle = [];
  let cycleIndex = 0;
  let previousAuthor = '';
  const refillCycle = () => {
    cycle = shuffle(scriptedPosts.map((_, index) => index));
    if (scriptedPosts.length > 1 && scriptedPosts[cycle[0]].author.name === previousAuthor) {
      const alternate = cycle.findIndex((index) => scriptedPosts[index].author.name !== previousAuthor);
      [cycle[0], cycle[alternate]] = [cycle[alternate], cycle[0]];
    }
    cycleIndex = 0;
  };
  const nextPost = () => {
    if (cycleIndex >= cycle.length) refillCycle();
    const post = scriptedPosts[cycle[cycleIndex]];
    cycleIndex += 1;
    previousAuthor = post.author.name;
    return post;
  };

  const setStatus = (message) => {
    if (liveStatus) liveStatus.textContent = message;
  };

  let postTimer = 0;
  let typingTimer = 0;
  const scheduleNext = (delay) => {
    window.clearTimeout(postTimer);
    postTimer = window.setTimeout(() => {
      if (document.hidden) {
        scheduleNext(2500);
        return;
      }
      const post = nextPost();
      setStatus(post.author.name + ' está escrevendo...');
      typingTimer = window.setTimeout(() => {
        const article = buildPost(post);
        const firstPost = feed.querySelector('.hpost-card');
        feed.insertBefore(article, firstPost);
        const livePosts = [...feed.querySelectorAll('.hpost-card[data-live-post]')];
        livePosts.slice(12).forEach((oldPost) => oldPost.remove());
        updatePostCount();
        setStatus(post.author.name + ' publicou agora');
        scheduleNext(8500 + Math.random() * 6500);
      }, 1450);
    }, delay);
  };

  updatePostCount();
  scheduleNext(3600);
})();
