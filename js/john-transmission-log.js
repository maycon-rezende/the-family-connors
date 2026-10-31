(() => {
  const journal = document.querySelector('[data-john-journal]');
  if (!journal) return;

  const index = journal.querySelector('[data-john-transmission-index]');
  const counter = journal.querySelector('[data-john-post-counter]');
  const title = journal.querySelector('[data-john-post-title]');
  const role = journal.querySelector('[data-john-post-role]');
  const message = journal.querySelector('[data-john-post-message]');
  const name = journal.querySelector('[data-john-post-name]');
  const signoff = journal.querySelector('[data-john-post-signoff]');
  const era = journal.querySelector('[data-john-post-era]');
  const reactions = journal.querySelector('[data-john-post-reactions]');
  const reply = journal.querySelector('[data-john-post-reply]');

  if (!index || !counter || !title || !role || !message || !name || !signoff || !era || !reactions || !reply) return;

  const records = [
    {
      name: 'Jack Connor', role: 'COMANDANTE // AMIGO DE JOHN', channel: 'O MAPA DOBRADO',
      title: 'A rota que ele me entregou',
      message: 'No fim da fuga, John colocou o mapa dobrado na minha mão. Não pediu que eu voltasse por ele. Apontou para a curva e me fez entender que minha tarefa era levar os outros até o lado de lá. Passei anos chamando aquilo de ordem, porque era mais fácil do que admitir que eu tinha obedecido ao meu amigo e seguido sem ele. Hoje sei: ele não queria que eu guardasse a última posição dele. Queria que eu guardasse os nomes de quem conseguiu passar.',
      signoff: 'O caminho ainda está no mapa. A saída, agora, está nas pessoas que voltaram.',
      reactions: [{ by: 'Mark Connor', icon: '⌖' }, { by: 'Alice Myers Connor', icon: '🕯' }],
      reply: { by: 'Mark Connor', role: 'COMANDO TÁTICO', text: 'O círculo que você desenhou ainda está lá. Nunca consegui apagar nenhum dos dois nomes.' },
    },
    {
      name: 'Mark Connor', role: 'HELLSING // COMANDO', channel: 'A LISTA DE EXTRAÇÃO',
      title: 'O nome que não cruzou',
      message: 'Eu conferi cada pessoa na saída duas vezes. Na terceira, percebi que ainda procurava John na coluna dos que tinham atravessado. A lista não mudou, mas minha mão continuou voltando ao espaço em branco. Ele passou a vida garantindo que ninguém fosse esquecido numa contagem. Não vou deixar que a última contagem dele termine em silêncio.',
      signoff: 'A lista ficou incompleta. O que ele salvou, não.',
      reactions: [{ by: 'Ariani Salvatore Connor', icon: '🤍' }, { by: 'Dimitri', icon: '🕯' }],
      reply: { by: 'Ariani Salvatore Connor', role: 'FAMÍLIA HELLSINGS', text: 'Você ainda confere a lista antes de dormir. Eu sei qual nome está procurando.' },
    },
    {
      name: 'Alice Myers Connor', role: 'COMANDO MÉDICO // HELLSINGS', channel: 'A RESPOSTA QUE NÃO VEIO',
      title: 'O campo em aberto',
      message: 'Quando a confirmação chegou, eu comecei a escrever o relatório e parei no campo “último contato”. Reescrevi a hora, conferi o sinal, conferi de novo. Nenhuma dessas coisas me devolveu uma frase que pudesse ser chamada de despedida. John merecia mais do que uma linha encerrada por um protocolo. Então deixei o campo aberto. Por uma noite, ao menos, o arquivo não conseguiu fingir que estava pronto para perdê-lo.',
      signoff: 'A ficha foi concluída depois. O luto não recebeu prazo.',
      reactions: [{ by: 'Jack Connor', icon: '🕯' }, { by: 'Naomi Yagami', icon: '⌁' }],
      reply: { by: 'Jack Connor', role: 'COMANDO', text: 'Eu também demorei para preencher a última linha. Ainda leio o espaço em branco primeiro.' },
    },
    {
      name: 'Ariani Salvatore Connor', role: 'HELLSING // FAMÍLIA', channel: 'A LUZ DO CORREDOR',
      title: 'Antes de qualquer fuga',
      message: 'Naquela noite, a luz do corredor piscava e ninguém tinha tempo para consertá-la. John abriu o painel, segurou o fio com uma mão e pediu que eu não deixasse Mark encostar em nada com a outra. A luz voltou. Ele saiu sem esperar agradecimento, já falando da próxima coisa que precisava funcionar. Só depois entendi que era assim que cuidava da equipe: consertava o que podia antes que alguém percebesse que estava prestes a falhar.',
      signoff: 'Ainda acendemos aquela luz. Ninguém pergunta por quê.',
      reactions: [{ by: 'Mark Connor', icon: '⌁' }, { by: 'Jully Connor', icon: '🤍' }],
      reply: { by: 'Mark Connor', role: 'COMANDO TÁTICO', text: 'Eu toquei no painel. Ele me mandou esperar. Pela primeira vez, obedeci sem discutir.' },
    },
    {
      name: 'Britney Connor', role: 'HELLSING // SOBREVIVENTE', channel: 'A FREQUÊNCIA DA CASA',
      title: 'O rádio na mesa',
      message: 'Nas confraternizações da mansão, John deixava um rádio ligado baixo perto da cozinha. Dizia que era hábito de serviço. Eu achava que ele não sabia descansar. Uma vez, quando a conversa ficou alta demais, ele aumentou o volume só um pouco: uma estação antiga tocava uma música que ninguém reconheceu. Foi a primeira vez que o vi ficar à mesa até o fim. Depois da fuga, o rádio ficou quieto. Por muito tempo, ninguém teve coragem de sintonizá-lo.',
      signoff: 'Hoje deixamos a música terminar antes de desligar.',
      reactions: [{ by: 'Jully Connor', icon: '♫' }, { by: 'Bobby Lee', icon: '🤍' }],
      reply: { by: 'Bobby Lee', role: 'HELLSING // INTELIGÊNCIA', text: 'Eu me lembro. Ele fingiu que não conhecia a canção e acompanhou o refrão inteiro.' },
    },
    {
      name: 'Jully Connor', role: 'HELLSING // SOBREVIVENTE', channel: 'O LUGAR AO LADO',
      title: 'Quando ninguém perguntou',
      message: 'Antes de eu aprender a falar sobre quem perdi, John sentou ao meu lado do lado de fora do bunker. Não fez perguntas. Deixou um copo de água entre nós e ficou olhando para o portão como se aquela vigília fosse uma tarefa importante. Na manhã seguinte, o copo continuava ali, vazio. Não sei se ele esperava que eu bebesse ou que eu dissesse alguma coisa. Naquela noite, só o fato de não ter ficado sozinha já foi resposta suficiente.',
      signoff: 'Ele sabia que às vezes companhia é a única ordem que ajuda.',
      reactions: [{ by: 'Alice Myers Connor', icon: '🤍' }, { by: 'Britney Connor', icon: '🫂' }],
      reply: { by: 'Alice Myers Connor', role: 'COMANDO MÉDICO', text: 'Eu vi o copo na manhã seguinte. Nunca perguntei quem o tinha deixado.' },
    },
    {
      name: 'Naomi Yagami', role: 'HELLSING // INTELIGÊNCIA', channel: 'O CANAL ABERTO',
      title: 'O silêncio depois do sinal',
      message: 'Eu mantive a frequência aberta até a última pessoa confirmar que tinha atravessado. O sinal de John sumiu antes disso. Continuei chamando mesmo assim, porque fechar o canal parecia uma decisão que eu não tinha o direito de tomar. Quando finalmente desliguei, o rádio ainda estava quente. O bunker inteiro pareceu grande demais para o som que sobrou.',
      signoff: 'O registro marca a hora da perda. Não marca a hora em que parei de escutar.',
      reactions: [{ by: 'Hellen Wren', icon: '⌁' }, { by: 'Alice Myers Connor', icon: '🕯' }],
      reply: { by: 'Hellen Wren', role: 'INTELIGÊNCIA DE CAMPO', text: 'Eu ouvi você chamar. Fiquei ao seu lado até o rádio esfriar.' },
    },
    {
      name: 'Dimitri', role: 'HELLSING // CAMPO', channel: 'A TERCEIRA CONTAGEM',
      title: 'Todo mundo, outra vez',
      message: 'Na saída, contei o grupo uma vez e comecei de novo. John sempre dizia que a pressa fazia a gente perder justamente quem estava mais perto. Na terceira contagem, todos os nomes que eu conseguia chamar estavam do lado de fora — menos o dele. Tentei refazer o número. Jack me segurou pelo ombro. Eu sabia a resposta; só precisava de mais um minuto antes de aceitá-la.',
      signoff: 'Desde então, eu conto duas vezes. A terceira ainda é para John.',
      reactions: [{ by: 'Mark Connor', icon: '🫡' }, { by: 'Joey Muller', icon: '🕯' }],
      reply: { by: 'Mark Connor', role: 'COMANDO TÁTICO', text: 'Ninguém te apressou naquela noite. Ninguém vai apressar agora.' },
    },
    {
      name: 'Clhoe', role: 'HELLSING // INFILTRAÇÃO', channel: 'A PASSAGEM ESTREITA',
      title: 'A porta não fechou',
      message: 'A passagem tinha uma porta emperrada que voltava a fechar sempre que alguém soltava a alavanca. John ficou segurando o mecanismo enquanto o grupo atravessava. Eu disse que podia trocar com ele. Ele olhou para o espaço que ainda faltava e apontou para a fila. Não foi uma despedida; foi uma instrução. Acho que é por isso que demorei tanto para entender que aquela seria a última vez que eu o veria.',
      signoff: 'A porta abriu para todos. Ele não passou por ela.',
      reactions: [{ by: 'Jack Connor', icon: '🕯' }, { by: 'Luke', icon: '✓' }],
      reply: { by: 'Luke', role: 'CAMPO', text: 'A trava foi encontrada aberta quando voltamos. Ninguém conseguiu fechá-la.' },
    },
    {
      name: 'Luke', role: 'HELLSING // CAMPO', channel: 'AS MARCAS NO CHÃO',
      title: 'A trilha que se divide',
      message: 'Eu reconheci a direção que John escolheu porque as marcas no chão deixaram de apontar para a saída. Ele levou a horda para longe. Por um instante, pensei em seguir aquele rastro e puxá-lo de volta. Então ouvi o último grupo cruzar atrás de mim. Fiquei com a rota que ele tinha aberto, porque voltar significaria fechar a passagem para todos os outros.',
      signoff: 'Ainda sei onde o rastro se separa. Nunca mais chamei aquele lugar de atalho.',
      reactions: [{ by: 'Jack Connor', icon: '⌖' }, { by: 'Hellen Wren', icon: '🕯' }],
      reply: { by: 'Jack Connor', role: 'COMANDO', text: 'Você manteve a escolha dele viva quando trouxe os últimos para fora.' },
    },
    {
      name: 'Hellen Wren', role: 'HELLSING // INTELIGÊNCIA DE CAMPO', channel: 'A LINHA NO MAPA',
      title: 'O ponto que não apaguei',
      message: 'Depois, pediram que eu atualizasse o mapa da região. Tracei a rota de fuga, marquei as zonas perdidas e deixei um pequeno círculo onde o sinal de John desapareceu. Não era coordenada útil para outra missão. Era o único modo que encontrei de impedir que aquele lugar virasse apenas terreno vazio. O mapa foi dobrado e arquivado com o ponto ainda visível.',
      signoff: 'Algumas marcas não servem para voltar. Servem para lembrar por que alguém conseguiu ir.',
      reactions: [{ by: 'Naomi Yagami', icon: '⌖' }, { by: 'Mark Connor', icon: '🕯' }],
      reply: { by: 'Naomi Yagami', role: 'INTELIGÊNCIA', text: 'Reconheci o círculo no primeiro olhar. Não pedi que você o removesse.' },
    },
    {
      name: 'Joey Muller', role: 'HELLSING // CAMPO', channel: 'O COLDRE SOLTO',
      title: 'O último ajuste',
      message: 'Antes de sairmos, John viu que meu coldre estava frouxo. Parou, apertou a fivela e me mandou correr sem olhar para baixo. Foi uma coisa pequena, dessas que desaparecem no meio de uma missão. Depois da fuga, encontrei a fivela ainda presa no mesmo ponto. Levei semanas para conseguir usar aquele equipamento de novo sem esperar que ele surgisse atrás de mim para conferir.',
      signoff: 'A fivela continua firme. A mão que a ajustou, não volta.',
      reactions: [{ by: 'Dimitri', icon: '⌁' }, { by: 'Alice Myers Connor', icon: '🤍' }],
      reply: { by: 'Dimitri', role: 'CAMPO', text: 'Ele ajustou o meu rádio na mesma saída. Nem percebi até você contar.' },
    },
    {
      name: 'Bobby Lee', role: 'HELLSING // INTELIGÊNCIA', channel: 'O PRIMEIRO EXERCÍCIO',
      title: 'Confiar a retaguarda',
      message: 'No meu primeiro exercício com os Hellsings, eu ainda media cada pessoa pela distância até a saída. John percebeu. Em vez de me pedir confiança, colocou a retaguarda sob minha responsabilidade e seguiu para a frente. Não explicou o gesto; deixou que eu entendesse que alguém estava contando comigo do mesmo modo que eu contava com todos. Na fuga, fiz o mesmo por quem vinha atrás.',
      signoff: 'Foi a primeira equipe em que eu parei de calcular quem ficaria para trás.',
      reactions: [{ by: 'Britney Connor', icon: '🤍' }, { by: 'Jack Connor', icon: '✓' }],
      reply: { by: 'Jack Connor', role: 'COMANDANTE', text: 'Ele viu que você já estava pronto antes de você acreditar nisso.' },
    },
  ];

  const makeOption = (record, position) => {
    const option = document.createElement('button');
    option.className = 'john-transmission-index__option';
    option.type = 'button';
    option.id = `john-voice-${position + 1}`;
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', 'false');
    option.tabIndex = -1;

    const code = document.createElement('span');
    code.className = 'john-transmission-index__code';
    code.textContent = `F-${String(position + 1).padStart(2, '0')}`;
    const identity = document.createElement('span');
    identity.className = 'john-transmission-index__identity';
    const speaker = document.createElement('b');
    speaker.textContent = record.name;
    const channel = document.createElement('small');
    channel.textContent = record.channel;
    const signal = document.createElement('i');
    signal.setAttribute('aria-hidden', 'true');
    identity.append(speaker, channel);
    option.append(code, identity, signal);
    option.addEventListener('click', () => selectRecord(position, true));
    return option;
  };

  const options = records.map(makeOption);
  index.replaceChildren(...options);

  const renderThread = (record) => {
    reactions.replaceChildren(...record.reactions.map((reaction) => {
      const item = document.createElement('span');
      item.className = 'john-transmission__reaction';
      item.setAttribute('aria-label', `${reaction.by} reagiu com ${reaction.icon}`);
      const icon = document.createElement('b');
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = reaction.icon;
      const author = document.createElement('small');
      author.textContent = reaction.by;
      item.append(icon, author);
      return item;
    }));

    const replyAuthor = document.createElement('b');
    replyAuthor.textContent = record.reply.by;
    const replyRole = document.createElement('small');
    replyRole.textContent = record.reply.role;
    const replyText = document.createElement('p');
    replyText.textContent = record.reply.text;
    reply.replaceChildren(replyAuthor, replyRole, replyText);
  };

  const selectRecord = (position, moveFocus = false) => {
    const record = records[position];
    options.forEach((option, optionIndex) => {
      const selected = optionIndex === position;
      option.setAttribute('aria-selected', String(selected));
      option.tabIndex = selected ? 0 : -1;
    });

    counter.textContent = `FREQUÊNCIA ${String(position + 1).padStart(2, '0')} / ${String(records.length).padStart(2, '0')}`;
    title.textContent = record.title;
    role.textContent = `${record.name} // ${record.role}`;
    message.textContent = `“${record.message}”`;
    name.textContent = record.name;
    signoff.textContent = record.signoff;
    era.textContent = record.channel;
    renderThread(record);
    if (moveFocus) options[position].focus();
  };

  index.addEventListener('keydown', (event) => {
    const current = options.indexOf(document.activeElement);
    if (current < 0) return;
    let next = current;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (current + 1) % options.length;
    else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (current - 1 + options.length) % options.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = options.length - 1;
    else return;

    event.preventDefault();
    selectRecord(next, true);
  });

  selectRecord(0);
})();
