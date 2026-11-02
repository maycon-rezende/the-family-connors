(() => {
  const records = {
    estate: {
      code: 'LOCAL CONFIRMADO // DIA D',
      title: 'Propriedade Connor',
      copy: 'A Mansão Connor foi o ponto de reunião quando o Dia D começou. De lá, os sobreviventes desceram ao bunker Hellsings antes do impacto do míssil na cidade. Anos depois, Brian Taylor morreria na enfermaria dessa base.',
      status: 'MEMÓRIA PRESERVADA // BUNKER HELLSINGS'
    },
    city: {
      code: 'ALVO DO SEGUNDO CLARÃO',
      title: 'A cidade sem nome',
      copy: 'Da propriedade Connor, o grupo viu o míssil seguir em direção à cidade. O nome e as coordenadas não foram recuperados; o ponto no desenho só indica sua relação com a propriedade, sem escala geográfica.',
      status: 'PONTO ESQUEMÁTICO // NOME NÃO RECUPERADO'
    },
    basin: {
      code: 'ALIANÇA HELLSINGS + ORDEM DO SAL',
      title: 'Bacia Branca',
      copy: 'Alice negociou um corredor médico entre o bunker e a Bacia Branca. Os Hellsings protegem equipes que procuram aquíferos em zonas controladas por traficantes de água. O lugar e essa ligação estão registrados; sua posição geográfica não.',
      status: 'PASSAGEM REGISTRADA // POSIÇÃO NÃO PLOTADA'
    },
    factions: {
      code: 'REGIÃO // CONTROLE VARIÁVEL',
      title: 'Territórios de facções',
      copy: 'O arquivo nomeia a Bacia Branca, o Cinturão da Facção do Fogo, o Serpentário sob uma metrópole e a cidade-comboio dos Nômades de Ferro. Só a ligação dos Hellsings com a Bacia está confirmada; as demais visitas não foram registradas.',
      status: 'TERRITÓRIOS CONHECIDOS // VISITAS NÃO CONFIRMADAS'
    },
    convoy: {
      code: 'PRESENTE // ROTA EM CURSO',
      title: 'O comboio de Jack',
      copy: 'Jack conduz um grande comboio pelas regiões devastadas. O grupo procura uma terra que, segundo rumores, estaria livre das hordas e das grandes facções. A posição atual e o trajeto exato não foram definidos.',
      status: 'SEM COORDENADAS ATUAIS'
    },
    freeland: {
      code: 'SINAL INTERMITENTE // BRADDOCK',
      title: 'A terra livre',
      copy: 'As transmissões raras de Braddock podem trazer coordenadas para um lugar onde seja possível recomeçar. Até agora, esse destino é uma esperança em busca de confirmação, não um ponto marcado no mapa.',
      status: 'DESTINO NÃO CONFIRMADO'
    },
    missions: {
      code: 'ARQUIVOS OPERACIONAIS // PRÉ-DIA D',
      title: 'Janela de Cinzas e Linha Vermelha',
      copy: 'Janela de Cinzas (HLS-126) ligou Bobby Lee à equipe antes de seu ingresso. Já integrante dos Hellsings, Lee participou de Linha Vermelha (HLS-131). Os registros disponíveis não informam onde ocorreram.',
      status: 'DUAS MISSÕES // COORDENADAS AUSENTES'
    },
    losses: {
      code: 'MEMORIAL // PONTOS DE PERDA',
      title: 'As últimas rotas',
      copy: 'Brian Taylor voltou de uma saída de campo infectado e morreu na enfermaria do bunker. Mais tarde, John sacrificou-se para permitir que muitas pessoas escapassem durante uma fuga; o local exato não foi registrado.',
      status: 'BRIAN: BUNKER // JOHN: LOCAL NÃO IDENTIFICADO'
    }
  };

  const title = document.querySelector('[data-atlas-title]');
  const code = document.querySelector('[data-atlas-code]');
  const copy = document.querySelector('[data-atlas-copy]');
  const status = document.querySelector('[data-atlas-status]');
  const selectors = [...document.querySelectorAll('[data-atlas-select], [data-atlas-pin]')];

  if (!title || !code || !copy || !status || !selectors.length) return;

  const selectRecord = (key) => {
    const record = records[key];
    if (!record) return;

    title.textContent = record.title;
    code.textContent = record.code;
    copy.textContent = record.copy;
    status.textContent = record.status;

    selectors.forEach((control) => {
      const controlKey = control.dataset.atlasSelect || control.dataset.atlasPin;
      control.setAttribute('aria-pressed', String(controlKey === key));
    });
  };

  selectors.forEach((control) => {
    control.setAttribute('aria-pressed', String(
      (control.dataset.atlasSelect || control.dataset.atlasPin) === 'estate'
    ));
    control.addEventListener('click', () => {
      selectRecord(control.dataset.atlasSelect || control.dataset.atlasPin);
    });
  });
})();
