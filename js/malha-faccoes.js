(() => {
  const root = document.querySelector('[data-faction-chat]');
  if (!root) return;

  const feed = root.querySelector('[data-faction-feed]');
  const status = root.querySelector('[data-faction-status]');
  const counter = root.querySelector('[data-faction-count]');
  const channel = root.dataset.factionChat;
  if (!feed || !status) return;

  const scripts = {
    cobras: [
      { name: 'Helena “Naja” Voss', role: 'COBRA-01 // AUTORIDADE MÁXIMA', avatar: 'img-faccoes/cobras/helena-naja-voss.png', time: '08:14', text: 'Silas, você trocou a ordem das saídas no quadro?', glyph: 'HV' },
      { name: 'Silas “Cascavel” Ramires', role: 'COBRA-02 // MESTRE DAS ROTAS', avatar: 'img-faccoes/cobras/silas-cascavel-ramires.png', time: '08:16', text: 'Só a ordem no desenho. As saídas continuam onde estavam.', glyph: 'SR', replyTo: 'Helena', replyText: 'Você trocou a ordem das saídas no quadro?' },
      { name: 'Helena “Naja” Voss', role: 'COBRA-01 // AUTORIDADE MÁXIMA', avatar: 'img-faccoes/cobras/helena-naja-voss.png', time: '08:17', text: 'Então por que metade do mercado está seguindo a seta antiga?', glyph: 'HV', replyTo: 'Silas', replyText: 'As saídas continuam onde estavam.' },
      { name: 'Silas “Cascavel” Ramires', role: 'COBRA-02 // MESTRE DAS ROTAS', avatar: 'img-faccoes/cobras/silas-cascavel-ramires.png', time: '08:20', text: 'Alguém redesenhou por cima sem apagar a primeira. Vou corrigir antes da próxima troca de turno.', glyph: 'SR', replyTo: 'Helena', replyText: 'Metade do mercado está seguindo a seta antiga.' },
      { name: 'Helena “Naja” Voss', role: 'COBRA-01 // AUTORIDADE MÁXIMA', avatar: 'img-faccoes/cobras/helena-naja-voss.png', time: '08:22', text: 'Apague as duas. Um caminho só é útil quando todos sabem qual seguir.', glyph: 'HV', replyTo: 'Silas', replyText: 'Vou corrigir antes da próxima troca de turno.' },
      { name: 'Silas “Cascavel” Ramires', role: 'COBRA-02 // MESTRE DAS ROTAS', avatar: 'img-faccoes/cobras/silas-cascavel-ramires.png', time: '08:25', text: 'Setas antigas apagadas. Deixei uma única rota em cada entrada do mercado.', glyph: 'SR', replyTo: 'Helena', replyText: 'Um caminho só é útil quando todos sabem qual seguir.' },
      { name: 'Helena “Naja” Voss', role: 'COBRA-01 // AUTORIDADE MÁXIMA', avatar: 'img-faccoes/cobras/helena-naja-voss.png', time: '08:27', text: 'E os recém-chegados? Eles não conhecem os sinais do nosso quadro.', glyph: 'HV', replyTo: 'Silas', replyText: 'Deixei uma única rota em cada entrada.' },
      { name: 'Silas “Cascavel” Ramires', role: 'COBRA-02 // MESTRE DAS ROTAS', avatar: 'img-faccoes/cobras/silas-cascavel-ramires.png', time: '08:29', text: 'Vou deixar alguém em cada entrada para explicar. Sem depender de cor ou de letra pequena.', glyph: 'SR' },
      { name: 'Helena “Naja” Voss', role: 'COBRA-01 // AUTORIDADE MÁXIMA', avatar: 'img-faccoes/cobras/helena-naja-voss.png', time: '08:32', text: 'Boa. Uma rota precisa ser compreendida por quem chega com medo e sem tempo.', glyph: 'HV', replyTo: 'Silas', replyText: 'Alguém em cada entrada para explicar.' },
      { name: 'Silas “Cascavel” Ramires', role: 'COBRA-02 // MESTRE DAS ROTAS', avatar: 'img-faccoes/cobras/silas-cascavel-ramires.png', time: '08:34', text: 'Entendido. O mapa orienta; a pessoa confirma.', glyph: 'SR', replyTo: 'Helena', replyText: 'Uma rota precisa ser compreendida por quem chega com medo e sem tempo.' },
      { name: 'Helena “Naja” Voss', role: 'COBRA-01 // AUTORIDADE MÁXIMA', avatar: 'img-faccoes/cobras/helena-naja-voss.png', time: '08:37', text: 'Então agora podemos abrir o mercado.', glyph: 'HV' }
    ],
    fogo: [
      { name: 'Aurelia Cinerária Varga', role: 'FIRE-01 // LIDERANÇA DO CINTURÃO', avatar: 'img-faccoes/fogo/aurelia-cineraria-varga.png', time: '11:02', text: 'Dário, quem deixou uma chave inglesa sobre o painel da Fornalha?', glyph: 'AV' },
      { name: 'Dário “Fornalha” Cruz', role: 'FIRE-02 // COMANDO INDUSTRIAL', avatar: 'img-faccoes/fogo/dario-fornalha-cruz.png', time: '11:04', text: 'A equipe da caldeira. Disseram que era a única bancada livre no turno.', glyph: 'DC', replyTo: 'Aurelia', replyText: 'Quem deixou uma chave inglesa sobre o painel da Fornalha?' },
      { name: 'Aurelia Cinerária Varga', role: 'FIRE-01 // LIDERANÇA DO CINTURÃO', avatar: 'img-faccoes/fogo/aurelia-cineraria-varga.png', time: '11:05', text: 'E nenhuma oficina tinha uma bancada livre?', glyph: 'AV', replyTo: 'Dário', replyText: 'Era a única bancada livre no turno.' },
      { name: 'Dário “Fornalha” Cruz', role: 'FIRE-02 // COMANDO INDUSTRIAL', avatar: 'img-faccoes/fogo/dario-fornalha-cruz.png', time: '11:08', text: 'Tinha. A chave estava mais perto do painel.', glyph: 'DC', replyTo: 'Aurelia', replyText: 'Nenhuma oficina tinha uma bancada livre?' },
      { name: 'Aurelia Cinerária Varga', role: 'FIRE-01 // LIDERANÇA DO CINTURÃO', avatar: 'img-faccoes/fogo/aurelia-cineraria-varga.png', time: '11:09', text: 'Mande-a de volta para a oficina. Proximidade não é autorização.', glyph: 'AV', replyTo: 'Dário', replyText: 'A chave estava mais perto do painel.' },
      { name: 'Dário “Fornalha” Cruz', role: 'FIRE-02 // COMANDO INDUSTRIAL', avatar: 'img-faccoes/fogo/dario-fornalha-cruz.png', time: '11:12', text: 'A chave voltou. Também achei o relatório de temperatura que sumiu da prancheta.', glyph: 'DC', replyTo: 'Aurelia', replyText: 'Mande-a de volta para a oficina.' },
      { name: 'Aurelia Cinerária Varga', role: 'FIRE-01 // LIDERANÇA DO CINTURÃO', avatar: 'img-faccoes/fogo/aurelia-cineraria-varga.png', time: '11:14', text: 'Onde estava?', glyph: 'AV', replyTo: 'Dário', replyText: 'Achei o relatório de temperatura.' },
      { name: 'Dário “Fornalha” Cruz', role: 'FIRE-02 // COMANDO INDUSTRIAL', avatar: 'img-faccoes/fogo/dario-fornalha-cruz.png', time: '11:15', text: 'Debaixo da mesma chave inglesa.', glyph: 'DC' },
      { name: 'Aurelia Cinerária Varga', role: 'FIRE-01 // LIDERANÇA DO CINTURÃO', avatar: 'img-faccoes/fogo/aurelia-cineraria-varga.png', time: '11:17', text: 'Então a oficina acaba de recuperar dois itens e uma bancada.', glyph: 'AV', replyTo: 'Dário', replyText: 'Debaixo da mesma chave inglesa.' },
      { name: 'Dário “Fornalha” Cruz', role: 'FIRE-02 // COMANDO INDUSTRIAL', avatar: 'img-faccoes/fogo/dario-fornalha-cruz.png', time: '11:19', text: 'Vou chamar a equipe para devolver a bancada também.', glyph: 'DC' },
      { name: 'Aurelia Cinerária Varga', role: 'FIRE-01 // LIDERANÇA DO CINTURÃO', avatar: 'img-faccoes/fogo/aurelia-cineraria-varga.png', time: '11:21', text: 'Dessa vez, pode chamar antes de mover qualquer coisa.', glyph: 'AV' }
    ],
    sal: [
      { name: 'Samira “Maré Branca” Nasser', role: 'SALT-01 // GUARDIÃ DA PRIMEIRA FONTE', avatar: 'img-faccoes/sal/samira-mare-branca-nasser.png', time: '06:48', text: 'Elias, a leitura da quarta filtragem ficou legível?', glyph: 'SN' },
      { name: 'Elias “Poço Fundo” Moura', role: 'SALT-02 // GUARDIÃO DAS PROFUNDEZAS', avatar: 'img-faccoes/sal/elias-poco-fundo-moura.png', time: '06:50', text: 'A leitura, sim. O caderno é que ganhou uma mancha de sal bem em cima do número.', glyph: 'EM', replyTo: 'Samira', replyText: 'A leitura da quarta filtragem ficou legível?' },
      { name: 'Samira “Maré Branca” Nasser', role: 'SALT-01 // GUARDIÃ DA PRIMEIRA FONTE', avatar: 'img-faccoes/sal/samira-mare-branca-nasser.png', time: '06:51', text: 'Não se registra uma medição pela memória. Faça outra cópia.', glyph: 'SN', replyTo: 'Elias', replyText: 'O caderno ganhou uma mancha de sal.' },
      { name: 'Elias “Poço Fundo” Moura', role: 'SALT-02 // GUARDIÃO DAS PROFUNDEZAS', avatar: 'img-faccoes/sal/elias-poco-fundo-moura.png', time: '06:54', text: 'Já fiz. Uma no arquivo e outra na parede da cisterna.', glyph: 'EM', replyTo: 'Samira', replyText: 'Faça outra cópia.' },
      { name: 'Samira “Maré Branca” Nasser', role: 'SALT-01 // GUARDIÃ DA PRIMEIRA FONTE', avatar: 'img-faccoes/sal/samira-mare-branca-nasser.png', time: '06:56', text: 'Boa. Apague a parede depois que o arquivo confirmar. Gosto de redundância; não de mofo.', glyph: 'SN', replyTo: 'Elias', replyText: 'Uma no arquivo e outra na parede da cisterna.' },
      { name: 'Elias “Poço Fundo” Moura', role: 'SALT-02 // GUARDIÃO DAS PROFUNDEZAS', avatar: 'img-faccoes/sal/elias-poco-fundo-moura.png', time: '07:02', text: 'A bomba da cisterna voltou a vibrar. O nível continua igual, mas o som mudou.', glyph: 'EM' },
      { name: 'Samira “Maré Branca” Nasser', role: 'SALT-01 // GUARDIÃ DA PRIMEIRA FONTE', avatar: 'img-faccoes/sal/samira-mare-branca-nasser.png', time: '07:04', text: 'Desligue por um ciclo e anote a leitura antes e depois. Não conclua pela vibração.', glyph: 'SN', replyTo: 'Elias', replyText: 'O som mudou.' },
      { name: 'Elias “Poço Fundo” Moura', role: 'SALT-02 // GUARDIÃO DAS PROFUNDEZAS', avatar: 'img-faccoes/sal/elias-poco-fundo-moura.png', time: '07:09', text: 'Variação registrada. O filtro está limpo; a correia, não.', glyph: 'EM', replyTo: 'Samira', replyText: 'Anote a leitura antes e depois.' },
      { name: 'Samira “Maré Branca” Nasser', role: 'SALT-01 // GUARDIÃ DA PRIMEIRA FONTE', avatar: 'img-faccoes/sal/samira-mare-branca-nasser.png', time: '07:11', text: 'Troque a correia depois da segunda leitura. Guarde a antiga para sabermos quando começou a falha.', glyph: 'SN' },
      { name: 'Elias “Poço Fundo” Moura', role: 'SALT-02 // GUARDIÃO DAS PROFUNDEZAS', avatar: 'img-faccoes/sal/elias-poco-fundo-moura.png', time: '07:14', text: 'Nova leitura igual à primeira. Vou etiquetar a peça e separar a reposição.', glyph: 'EM' },
      { name: 'Samira “Maré Branca” Nasser', role: 'SALT-01 // GUARDIÃ DA PRIMEIRA FONTE', avatar: 'img-faccoes/sal/samira-mare-branca-nasser.png', time: '07:16', text: 'Obrigada. Água limpa começa com alguém que se recusa a adivinhar.', glyph: 'SN', replyTo: 'Elias', replyText: 'Nova leitura igual à primeira.' }
    ],
    ferro: [
      { name: 'Augusto “Atlas” Ferraz', role: 'IRON-01 // CONDUTOR-GERAL', avatar: 'img-faccoes/ferro/augusto-atlas-ferraz.png', time: '17:31', text: 'Quem moveu o banco do vagão médico?', glyph: 'AF' },
      { name: 'Mecânica do Eixo', role: 'OFICINA MÓVEL // TURNO B', glyph: 'ME', time: '17:33', text: 'Fui eu, Condutor. A porta raspava quando a composição fazia a curva.', replyTo: 'Atlas', replyText: 'Quem moveu o banco do vagão médico?' },
      { name: 'Augusto “Atlas” Ferraz', role: 'IRON-01 // CONDUTOR-GERAL', avatar: 'img-faccoes/ferro/augusto-atlas-ferraz.png', time: '17:34', text: 'Resolva a porta também. Um banco solto atravessa o vagão mais rápido que qualquer ordem.', glyph: 'AF', replyTo: 'Mecânica do Eixo', replyText: 'A porta raspava quando a composição fazia a curva.' },
      { name: 'Mecânica do Eixo', role: 'OFICINA MÓVEL // TURNO B', glyph: 'ME', time: '17:37', text: 'Entendido. Vou marcar a posição nova para ninguém procurar o banco no próximo turno.', replyTo: 'Atlas', replyText: 'Resolva a porta também.' },
      { name: 'Augusto “Atlas” Ferraz', role: 'IRON-01 // CONDUTOR-GERAL', avatar: 'img-faccoes/ferro/augusto-atlas-ferraz.png', time: '17:39', text: 'Marque no mapa, não no banco. Na última vez, o mapa sumiu com a tinta.', glyph: 'AF', replyTo: 'Mecânica do Eixo', replyText: 'Vou marcar a posição nova.' },
      { name: 'Mecânica do Eixo', role: 'OFICINA MÓVEL // TURNO B', glyph: 'ME', time: '17:44', text: 'A porta já não raspa. O banco está preso com duas cintas e a passagem ficou livre.', replyTo: 'Atlas', replyText: 'Resolva a porta também.' },
      { name: 'Augusto “Atlas” Ferraz', role: 'IRON-01 // CONDUTOR-GERAL', avatar: 'img-faccoes/ferro/augusto-atlas-ferraz.png', time: '17:46', text: 'Confirme a passagem com o vagão médico antes de prender a segunda cinta.', glyph: 'AF', replyTo: 'Mecânica do Eixo', replyText: 'A passagem ficou livre.' },
      { name: 'Mecânica do Eixo', role: 'OFICINA MÓVEL // TURNO B', glyph: 'ME', time: '17:50', text: 'A equipe da enfermaria passou com a maca. Ninguém precisou virar de lado.', replyTo: 'Atlas', replyText: 'Confirme a passagem com o vagão médico.' },
      { name: 'Augusto “Atlas” Ferraz', role: 'IRON-01 // CONDUTOR-GERAL', avatar: 'img-faccoes/ferro/augusto-atlas-ferraz.png', time: '17:52', text: 'Então registre o ajuste. Quero saber se continua firme depois da próxima curva.', glyph: 'AF' },
      { name: 'Mecânica do Eixo', role: 'OFICINA MÓVEL // TURNO B', glyph: 'ME', time: '17:57', text: 'Anotado no quadro e no caderno. O banco, desta vez, não recebeu nenhuma tinta.', replyTo: 'Atlas', replyText: 'Registre o ajuste.' },
      { name: 'Augusto “Atlas” Ferraz', role: 'IRON-01 // CONDUTOR-GERAL', avatar: 'img-faccoes/ferro/augusto-atlas-ferraz.png', time: '18:00', text: 'Bom. A composição pode seguir quando o maquinista confirmar.', glyph: 'AF' }
    ],
    dominus: [
      { name: 'SINAL 01', role: 'ORIGEM NÃO ATRIBUÍDA', glyph: '01', time: '00:00', text: 'Registro recebido: “chave devolvida à gaveta”.' },
      { name: 'SINAL 02', role: 'ORIGEM NÃO ATRIBUÍDA', glyph: '02', time: '00:01', text: 'Nenhuma gaveta consta no inventário deste terminal.', replyTo: 'SINAL 01', replyText: 'Chave devolvida à gaveta.' },
      { name: 'SINAL 01', role: 'ORIGEM NÃO ATRIBUÍDA', glyph: '01', time: '00:02', text: 'O registro afirma que alguém a encontrou.', replyTo: 'SINAL 02', replyText: 'Nenhuma gaveta consta no inventário.' },
      { name: 'SINAL 02', role: 'ORIGEM NÃO ATRIBUÍDA', glyph: '02', time: '00:03', text: 'Quem?', replyTo: 'SINAL 01', replyText: 'Alguém a encontrou.' },
      { name: 'SINAL 01', role: 'ORIGEM NÃO ATRIBUÍDA', glyph: '01', time: '00:04', text: 'Assinatura ausente. Hora da devolução: antes do pedido.', replyTo: 'SINAL 02', replyText: 'Quem?' },
      { name: 'SINAL 02', role: 'ORIGEM NÃO ATRIBUÍDA', glyph: '02', time: '00:05', text: 'O pedido não foi localizado no arquivo.', replyTo: 'SINAL 01', replyText: 'Antes do pedido.' },
      { name: 'SINAL 01', role: 'ORIGEM NÃO ATRIBUÍDA', glyph: '01', time: '00:06', text: 'Então a gaveta continua sem dono.', replyTo: 'SINAL 02', replyText: 'O pedido não foi localizado.' },
      { name: 'SINAL 02', role: 'ORIGEM NÃO ATRIBUÍDA', glyph: '02', time: '00:07', text: 'Uma gaveta pode ser inventariada?', replyTo: 'SINAL 01', replyText: 'A gaveta continua sem dono.' },
      { name: 'SINAL 01', role: 'ORIGEM NÃO ATRIBUÍDA', glyph: '01', time: '00:08', text: 'Só se alguém admitir que a encontrou.', replyTo: 'SINAL 02', replyText: 'Pode ser inventariada?' },
      { name: 'SINAL 02', role: 'ORIGEM NÃO ATRIBUÍDA', glyph: '02', time: '00:09', text: 'Registro atualizado: gaveta não localizada.', replyTo: 'SINAL 01', replyText: 'Alguém admitir que a encontrou.' },
      { name: 'SINAL 01', role: 'ORIGEM NÃO ATRIBUÍDA', glyph: '01', time: '00:10', text: 'A chave continua no arquivo.', replyTo: 'SINAL 02', replyText: 'Gaveta não localizada.' }
    ]
  };

  const queue = scripts[channel];
  if (!queue) return;

  let progress = 0;
  let inView = false;
  let aiBusy = false;
  let postTimer = 0;
  let typingTimer = 0;
  let typingNode = null;

  const setStatus = (value) => { status.textContent = value; };
  const clearTimers = () => {
    window.clearTimeout(postTimer);
    window.clearTimeout(typingTimer);
    postTimer = 0;
    typingTimer = 0;
    typingNode?.remove();
    typingNode = null;
  };
  const canPost = () => inView && !document.hidden && !aiBusy;

  const createTyping = (message) => {
    const item = document.createElement('li');
    item.className = 'faction-chat__message faction-chat__message--typing';
    item.setAttribute('aria-hidden', 'true');
    const avatar = document.createElement(message.avatar ? 'img' : 'span');
    avatar.className = 'faction-chat__avatar';
    if (message.avatar) { avatar.src = message.avatar; avatar.alt = ''; }
    else avatar.textContent = message.glyph || '··';
    const bubble = document.createElement('div');
    bubble.className = 'faction-chat__bubble';
    const label = document.createElement('b');
    label.textContent = message.name + ' digitando';
    const dots = document.createElement('span');
    dots.className = 'faction-chat__dots';
    for (let index = 0; index < 3; index += 1) dots.appendChild(document.createElement('i'));
    bubble.append(label, dots);
    item.append(avatar, bubble);
    return item;
  };

  const createMessage = (message) => {
    const item = document.createElement('li');
    item.className = 'faction-chat__message faction-chat__message--scripted';
    const avatar = document.createElement(message.avatar ? 'img' : 'span');
    avatar.className = 'faction-chat__avatar';
    if (message.avatar) { avatar.src = message.avatar; avatar.alt = ''; }
    else avatar.textContent = message.glyph || '··';

    const bubble = document.createElement('div');
    bubble.className = 'faction-chat__bubble';
    const header = document.createElement('header');
    const identity = document.createElement('div');
    const name = document.createElement('b');
    name.textContent = message.name;
    const role = document.createElement('small');
    role.textContent = message.role;
    const time = document.createElement('time');
    time.dateTime = message.time;
    time.textContent = message.time;
    identity.append(name, role);
    header.append(identity, time);
    bubble.appendChild(header);

    if (message.replyTo && message.replyText) {
      const reply = document.createElement('blockquote');
      const author = document.createElement('b');
      author.textContent = 'EM RESPOSTA A ' + message.replyTo;
      const quoted = document.createElement('span');
      quoted.textContent = message.replyText;
      reply.append(author, quoted);
      bubble.appendChild(reply);
    }

    const text = document.createElement('p');
    text.textContent = message.text;
    const origin = document.createElement('small');
    origin.className = 'faction-chat__origin';
    origin.textContent = 'RECORTE ROTEIRIZADO';
    bubble.append(text, origin);
    item.append(avatar, bubble);
    return item;
  };

  const schedule = () => {
    clearTimers();
    if (!canPost()) {
      setStatus('CANAL EM ESPERA // PRESERVANDO A CONVERSA');
      return;
    }
    if (progress >= queue.length) {
      setStatus('RECORTES DESTA SESSÃO CONCLUÍDOS');
      return;
    }

    const message = queue[progress];
    setStatus('PRÓXIMA VOZ // ' + message.name.toUpperCase());
    postTimer = window.setTimeout(() => {
      if (!canPost()) return;
      typingNode = createTyping(message);
      feed.appendChild(typingNode);
      setStatus(message.name.toUpperCase() + ' // DIGITANDO');
      typingTimer = window.setTimeout(() => {
        if (!canPost()) { clearTimers(); return; }
        const nearBottom = feed.scrollHeight - feed.scrollTop - feed.clientHeight < 80;
        typingNode?.remove();
        typingNode = null;
        feed.appendChild(createMessage(message));
        progress += 1;
        if (counter) counter.textContent = String(progress).padStart(2, '0');
        setStatus(message.name.toUpperCase() + ' // MENSAGEM PROGRAMADA');
        if (nearBottom) feed.scrollTop = feed.scrollHeight;
        if (progress < queue.length) schedule();
        else setStatus('RECORTES DESTA SESSÃO CONCLUÍDOS');
      }, 1050);
    }, progress === 0 ? 3300 : 7600);
  };

  root.addEventListener('malha-ai:start', () => {
    aiBusy = true;
    clearTimers();
    setStatus('DIÁLOGO COM IA EM ANDAMENTO');
  });
  root.addEventListener('malha-ai:finish', () => {
    aiBusy = false;
    schedule();
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.some((entry) => entry.isIntersecting);
      if (visible === inView) return;
      inView = visible;
      schedule();
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    observer.observe(root);
  } else {
    inView = true;
    schedule();
  }

  document.addEventListener('visibilitychange', schedule);
})();
