(() => {
  const journal = document.querySelector('[data-john-journal]');

  const index = journal?.querySelector('[data-john-transmission-index]');
  const counter = journal?.querySelector('[data-john-post-counter]');
  const title = journal?.querySelector('[data-john-post-title]');
  const role = journal?.querySelector('[data-john-post-role]');
  const message = journal?.querySelector('[data-john-post-message]');
  const name = journal?.querySelector('[data-john-post-name]');
  const signoff = journal?.querySelector('[data-john-post-signoff]');
  const era = journal?.querySelector('[data-john-post-era]');
  const reactions = journal?.querySelector('[data-john-post-reactions]');
  const reply = journal?.querySelector('[data-john-post-reply]');

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
      name: 'Chloe', role: 'HELLSING // INFILTRAÇÃO', channel: 'A PASSAGEM ESTREITA',
      title: 'A porta não fechou',
      message: 'A passagem tinha uma porta emperrada que voltava a fechar sempre que alguém soltava a alavanca. John ficou segurando o mecanismo enquanto o grupo atravessava. Eu disse que podia trocar com ele. Ele olhou para o espaço que ainda faltava e apontou para a fila. Não foi uma despedida; foi uma instrução. Acho que é por isso que demorei tanto para entender que aquela seria a última vez que eu o veria.',
      signoff: 'A porta abriu para todos. Ele não passou por ela.',
      reactions: [{ by: 'Jack Connor', icon: '🕯' }, { by: 'Luke', icon: '✓' }],
      reply: { by: 'Luke', role: 'CAMPO', text: 'A trava foi encontrada aberta quando voltamos. Ninguém conseguiu fechá-la.' },
    },
    {
      name: 'Luke', role: 'HELLSING // CAMPO', channel: 'AS MARCAS NO CHÃO',
      title: 'A trilha que se divide',
      message: 'Eu reconheci o som antes de ver o clarão: John tinha preparado a bomba para o caso de a horda alcançar a passagem. Ele e Olivia ainda seguravam a retaguarda. Por um instante, pensei em correr de volta. Então ouvi Jack chamar os últimos nomes do comboio; fiquei na rota, porque retornar teria colocado todos outra vez diante da horda. A explosão veio depois que o último sobrevivente cruzou. Não houve terceira contagem para os dois.',
      signoff: 'Ainda sei onde o rastro se separa. Nunca mais chamei aquele lugar de atalho.',
      reactions: [{ by: 'Jack Connor', icon: '⌖' }, { by: 'Hellen Wren', icon: '🕯' }],
      reply: { by: 'Jack Connor', role: 'COMANDO', text: 'Você manteve a escolha dos dois viva quando trouxe os últimos para fora.' },
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

  const makeReconstructedVoice = (name, role, channel, title, message, signoff, replyBy, replyRole, replyText, section) => ({
    name,
    role,
    channel,
    title,
    message,
    signoff,
    section,
    reactions: [{ by: replyBy, icon: '🕯' }],
    reply: { by: replyBy, role: replyRole, text: replyText },
  });

  const nextGeneration = [
    makeReconstructedVoice('Alucard Myers Connor', 'FILHO DE JACK E ALICE', 'O RÁDIO NO ABRIGO', 'Uma criança escolheu o silêncio', 'No abrigo, um menino se assustava com o chiado do rádio. John não desligou o aparelho por ele; colocou o botão ao alcance da criança e esperou que ela própria decidisse quando o som podia voltar. Eu entendi naquele dia que ele não protegia só a passagem. Devolvia às pessoas pequenas escolhas que o mundo tinha arrancado.', 'O rádio ainda chia. Agora ninguém precisa ter medo de pedir que alguém fique por perto.', 'Alice Myers Connor', 'MÃE // HELLSINGS', 'Você se lembra do barulho. Eu me lembro de John esperando sem apressar ninguém.', 'GERAÇÃO SEGUINTE // FILHOS DOS HELLSINGS'),
    makeReconstructedVoice('Diana Myers Connor', 'FILHA DE JACK E ALICE', 'O ALVO E QUEM ESTÁ ATRÁS', 'A linha que ele me ensinou a ver', 'No treino, eu queria saber se tinha acertado o alvo. John olhou para além dele e perguntou quem teria ficado atrás se aquilo fosse uma missão. A mira era boa; o que faltava era enxergar todo mundo que dependia dela. Nunca mais consegui chamar precisão de habilidade completa sem pensar nessa pergunta.', 'Antes de apertar o gatilho, procuro quem precisa voltar para casa.', 'Jack Connor', 'PAI // COMANDO', 'Ele fazia uma pergunta curta e mudava o jeito como a gente via a missão inteira.', 'GERAÇÃO SEGUINTE // FILHOS DOS HELLSINGS'),
    makeReconstructedVoice('Nicolai Myers Connor', 'FILHO DE JACK E ALICE', 'A ROTA DE RETORNO', 'Ele sempre desenhava a volta', 'Eu observava os mapas de John esperando encontrar a parte mais rápida. Ele sempre começava pelo caminho de volta. Dizia que uma rota que só sabe levar alguém para longe não está terminada. Quando comecei a sair em campo, passei a marcar as duas pontas da estrada antes de marcar qualquer objetivo.', 'O traço de volta continua sendo a primeira linha do meu mapa.', 'Jack Connor', 'PAI // COMANDO', 'Essa regra veio dele. Você só foi o primeiro a guardá-la no próprio caderno.', 'GERAÇÃO SEGUINTE // FILHOS DOS HELLSINGS'),
    makeReconstructedVoice('Mary Myers Connor', 'FAMÍLIA MYERS CONNOR', 'A LISTA NA PORTA', 'Um nome antes do número', 'Na porta do abrigo, John nunca perguntava quantas pessoas ainda faltavam. Perguntava quem. Quando eu era mais nova, achei que era só um jeito diferente de fazer a contagem. Depois percebi que, para ele, um grupo não era um total: cada espaço vazio tinha um rosto que alguém ainda procurava.', 'Ainda escrevo nomes antes de fechar qualquer lista.', 'Alice Myers Connor', 'FAMÍLIA HELLSINGS', 'Você aprendeu com ele a não deixar que um número escondesse uma pessoa.', 'GERAÇÃO SEGUINTE // FILHOS DOS HELLSINGS'),
    makeReconstructedVoice('Isolde Myers Connor', 'FAMÍLIA MYERS CONNOR', 'A LUZ DA ENFERMARIA', 'Ele ficou até a luz voltar', 'Durante uma noite de blecaute, a enfermaria perdeu a iluminação e todo mundo começou a falar ao mesmo tempo. John ficou ao lado do gerador até a luz estabilizar. Não prometeu que o medo passaria; perguntou quem precisava de água enquanto esperávamos. Lembro menos do escuro do que da calma que ele emprestou para atravessá-lo.', 'Quando falta luz, ainda procuro primeiro quem está com sede.', 'Alice Myers Connor', 'FAMÍLIA HELLSINGS', 'Foi assim que ele cuidava: uma coisa concreta por vez, até a noite caber de novo.', 'GERAÇÃO SEGUINTE // FILHOS DOS HELLSINGS'),
    makeReconstructedVoice('Pollyana Salvatore Connor', 'IRMÃ GÊMEA DE NATHAN', 'A PORTA QUE EU MARQUEI', 'Não era apenas a irmã de alguém', 'Na primeira exploração em que participei, todos olhavam para Nathan porque ele era o atirador. John me entregou o mapa e pediu que eu marcasse cada saída segura. Não me chamou de “a irmã do Nathan”; perguntou o que eu tinha visto. Voltei com poeira nas mãos e uma rota inteira que a equipe conseguiu usar.', 'Ainda reconheço a minha letra nos mapas que sobreviveram.', 'Nathan Salvatore Connor', 'IRMÃO GÊMEO // ATIRADOR', 'Você voltou com a equipe inteira. John percebeu antes de qualquer um que aquele era o seu próprio trabalho.', 'GERAÇÃO SEGUINTE // FILHOS DOS HELLSINGS'),
    makeReconstructedVoice('Nathan Salvatore Connor', 'FILHO DE MARK E ARIANI // ATIRADOR DE PRECISÃO', 'O QUE A MIRA NÃO MOSTRA', 'Antes do disparo, a retaguarda', 'John me viu corrigindo a mira e perguntou se eu sabia quem estava fora do meu campo de visão. Eu respondi que não era parte do exercício. Ele disse que, numa missão, tudo o que a mira não mostrava também fazia parte da minha responsabilidade. Desde então, observo o alvo, a rota e as pessoas que precisam atravessar atrás de mim.', 'Um disparo só termina quando todos encontram abrigo.', 'Mark Connor', 'PAI // COMANDO TÁTICO', 'Você não esqueceu a retaguarda. Essa sempre foi a parte mais difícil de ensinar.', 'GERAÇÃO SEGUINTE // FILHOS DOS HELLSINGS'),
    makeReconstructedVoice('James Salvatore Connor', 'FILHO DE MARK E ARIANI', 'O DESENHO DO MAPA', 'A curva que ele deixou', 'Eu era pequeno demais para entender por que os adultos voltavam tão quietos daquela fuga. John desenhou uma curva num papel e me mostrou por onde o comboio tinha passado. Não enfeitou a história nem tentou fazer a perda parecer bonita. Só me disse quantas pessoas tinham conseguido chegar. Foi a primeira vez que entendi que um mapa também podia guardar gratidão.', 'Guardo aquele desenho dobrado com as histórias da família.', 'Ariani Salvatore Connor', 'MÃE // HELLSINGS', 'Você sempre pediu para ouvir essa história de novo. John ficaria feliz com isso.', 'GERAÇÃO SEGUINTE // FILHOS DOS HELLSINGS'),
  ];

  const factionVoices = [
    makeReconstructedVoice('Lana Whitmore', 'COMUNICAÇÕES DE EMERGÊNCIA // HELLSINGS', 'O INTERVALO ENTRE CHAMADAS', 'Eu espero a resposta inteira', 'Nas comunicações, um segundo de silêncio pode parecer uma eternidade. Nathan me contou que John mantinha o canal aberto até a última confirmação de retorno. Quando a estática cresce, hoje eu não encerro a chamada depressa. Espero mais uma vez. Às vezes uma vida inteira depende de alguém não confundir silêncio com resposta.', 'O canal fica aberto até o último nome confirmar que chegou.', 'Nathan Salvatore Connor', 'ATIRADOR // HELLSINGS', 'John faria o mesmo. Esperaria até ter certeza de que ninguém ficou sem ser ouvido.', 'MEMBROS DA FACÇÃO // OUTRAS ROTAS'),
    makeReconstructedVoice('Sally Ward', 'SOBREVIVENTE // VÍNCULO COM NICOLAI', 'A HISTÓRIA QUE NICOLAI GUARDA', 'O nome que veio antes de mim', 'Eu conheci John primeiro pelas pausas de Nicolai. Sempre que chegávamos a uma porta segura, ele olhava para trás antes de entrar — como se ainda esperasse alguém fechar a contagem. Um dia perguntei de quem era aquele hábito. Nicolai respondeu com o nome de John e, pela primeira vez, contou a história inteira sem encurtar o fim.', 'Há lutos que chegam até nós antes das lembranças.', 'Nicolai Myers Connor', 'HELLSING // FAMÍLIA', 'Obrigado por não me pedir para resumir. Nunca soube como fazer isso.', 'MEMBROS DA FACÇÃO // OUTRAS ROTAS'),
    makeReconstructedVoice('Hilary Caldwell Ashford', 'ENFERMEIRA DE CAMPO // HELLSINGS', 'A ENFERMARIA NO ESCURO', 'Cuidado sem exigir confiança', 'Quando os Hellsings me trouxeram ao bunker, eu não sabia se podia acreditar em adultos que diziam querer ajudar. John não me pediu confiança nem tentou arrancar uma resposta. Deixou água ao meu alcance e abriu espaço na enfermaria. Aprendi com aquele gesto que cuidado também é permitir que alguém escolha quando está pronto para falar.', 'Hoje eu deixo a porta aberta e a decisão com quem acabou de chegar.', 'Alice Myers Connor', 'COMANDO MÉDICO // HELLSINGS', 'Ele sabia que segurança começa quando ninguém força uma palavra antes da hora.', 'MEMBROS DA FACÇÃO // OUTRAS ROTAS'),
    makeReconstructedVoice('Sophie Romanoff', 'FAMÍLIA MYERS CONNOR // HELLSINGS', 'O QUE ALUCARD NÃO ESQUECE', 'A pergunta que sempre volta', 'Quando Alucard fala de John, há um instante antes de cada lembrança em que ele procura outra maneira de contar o final. Eu não tento completar a frase. Fico ao lado dele até que consiga dizer o nome de John e o de Olivia na mesma respiração. Amar alguém também é não apressar a parte da história que ainda dói.', 'John e Olivia podem ser lembrados juntos, sem que a dor precise escolher um dos dois.', 'Alucard Myers Connor', 'FAMÍLIA MYERS CONNOR', 'Você sabe quando eu preciso de silêncio. Obrigado por ficar nele comigo.', 'MEMBROS DA FACÇÃO // OUTRAS ROTAS'),
    makeReconstructedVoice('Leona', 'EXPLORAÇÃO E COMBATE // HELLSINGS', 'A SAÍDA ANTES DA ENTRADA', 'Eu procuro a volta primeiro', 'Fui treinada para ler um cômodo antes de atravessá-lo. O nome de John apareceu cedo nos mapas de rota dos meus pais: cada entrada vinha acompanhada de uma saída e de quem precisava alcançá-la. Quando preparo uma exploração, não marco apenas onde podemos chegar. Marco como cada pessoa volta.', 'A missão não termina quando a equipe entra. Termina quando todos conseguem sair.', 'Hellen Wren', 'INTELIGÊNCIA DE CAMPO // HELLSINGS', 'John nunca separava a rota de quem dependia dela. Você aprendeu a mesma coisa.', 'MEMBROS DA FACÇÃO // OUTRAS ROTAS'),
    makeReconstructedVoice('Darius Bennett', 'COMUNICAÇÕES DE ABRIGO // HELLSINGS', 'O RÁDIO QUE VOLTOU A FUNCIONAR', 'A estática também guarda nomes', 'Conserto rádios para que os abrigos saibam quem está chegando. Num dos aparelhos antigos, ainda havia uma etiqueta com o código de John e uma frequência anotada para o retorno. Não era uma ordem para ficar parado; era um jeito de dizer que alguém estaria escutando. Deixei a etiqueta no lugar.', 'O aparelho funciona melhor com a lembrança junto.', 'Chloe', 'RECONHECIMENTO // HELLSINGS', 'Ele teria gostado de saber que aquele rádio continua trazendo gente para casa.', 'MEMBROS DA FACÇÃO // OUTRAS ROTAS'),
    makeReconstructedVoice('Micah Bennett', 'MENSAGEIRO CIVIL // 20 ANOS', 'A COLUNA DOS QUE VOLTARAM', 'Não apago ninguém da lista', 'Quando uma mensagem chega incompleta, não marco ninguém como perdido até confirmar. Aprendi a fazer isso depois de ouvir a história da última fuga de John e Olivia: alguém ainda podia estar atravessando quando o rádio ficava mudo. Meu caderno tem uma coluna para “em trânsito”. É a forma que encontrei de dar a cada pessoa o tempo que John tentou comprar para o comboio.', 'Uma linha vazia não prova que alguém deixou de existir.', 'Chloe', 'HELLSING // MÃE', 'Você entendeu o que havia por trás da contagem: esperar também pode salvar.', 'MEMBROS DA FACÇÃO // OUTRAS ROTAS'),
    makeReconstructedVoice('Imani Carver', 'EDUCAÇÃO E ABRIGO // HELLSINGS', 'A HISTÓRIA ANTES DE DORMIR', 'A coragem não foi o que contei', 'As crianças do abrigo queriam saber se John teve medo. Eu não disse que não. Contei que ele preparou uma saída, percebeu quando a passagem deixou de ser segura e ficou para que outros pudessem cruzar. Uma delas perguntou se Olivia também sabia o plano. Respondi que ela escolheu ficar ao lado do pai. Ninguém pediu uma versão mais fácil.', 'As crianças merecem a verdade contada com cuidado.', 'Luke', 'HELLSING // CAMPO', 'É assim que a história deve ser lembrada: sem tirar da Olivia a escolha que ela fez.', 'MEMBROS DA FACÇÃO // OUTRAS ROTAS'),
    makeReconstructedVoice('Asha Carver', 'RECUPERAÇÃO DE EQUIPAMENTOS // HELLSINGS', 'A FERRAMENTA QUE ELE DEIXOU', 'Nem tudo se conserta para durar', 'Eu encontrei uma chave de manutenção guardada entre os materiais de campo de John. O cabo estava gasto no lugar onde uma mão sempre apertava primeiro. Não consegui consertar o desgaste, e parei de tentar. Passei a usar a ferramenta para preparar equipamento de quem sai em busca — não para que a marca desapareça, mas para que ela continue servindo.', 'Há lembranças que ficam mais claras quando ainda ajudam alguém.', 'Joey Muller', 'CAMPO // HELLSINGS', 'Ele teria devolvido a chave para você e perguntado se a equipe já estava pronta.', 'MEMBROS DA FACÇÃO // OUTRAS ROTAS'),
    makeReconstructedVoice('Nyla Carver', 'REGISTROS DA COMUNIDADE // HELLSINGS', 'OS NOMES NO CADERNO', 'Dois nomes na mesma página', 'No caderno da comunidade, John e Olivia ocupam linhas lado a lado. Algumas pessoas sugeriram separar as páginas: uma para o pai, outra para a filha. Eu deixei como estavam. A última rota foi deles dois, e o comboio atravessou porque ambos escolheram proteger quem vinha atrás.', 'Não vou separar uma história só para tornar a leitura mais fácil.', 'Luke', 'HELLSING // CAMPO', 'Obrigado por guardar os dois nomes juntos.', 'MEMBROS DA FACÇÃO // OUTRAS ROTAS'),
  ];

  const collectiveVoice = makeReconstructedVoice('As pessoas da rota', 'COMBOIO E SOBREVIVENTES', 'A TRAVESSIA', 'Todos chegaram do outro lado', 'Muitos de nós nunca seguraram um mapa de John. Alguns só ouviram o nome quando os Hellsings explicaram por que a passagem não podia ser esquecida. Mas chegamos vivos porque alguém ficou tempo suficiente para abrir a saída. Nossa memória não sabe repetir as últimas palavras dele; sabe repetir o gesto: continuar levando os outros para um lugar seguro.', 'O caminho que ele abriu segue atravessando com cada pessoa que chegou.', 'Mark Connor', 'HELLSING // COMANDO', 'Ninguém naquela rota chegou sozinho. É isso que os nomes deles nos pedem para lembrar.', 'COMBOIO // MENSAGEM COLETIVA');

  window.JOHN_MEMORIAL_RECORDS = [
    ...records.map((record) => ({ ...record, section: 'NÚCLEO ORIGINAL // HELLSINGS' })),
    ...nextGeneration,
    ...factionVoices,
    collectiveVoice,
  ];
  if (!journal || !index || !counter || !title || !role || !message || !name || !signoff || !era || !reactions || !reply) return;

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
