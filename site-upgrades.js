(function () {
  const pages = [
    {
      href: 'telainicial.html',
      label: 'Inicio',
      type: 'Portal',
      desc: 'Entrada principal da familia Connor e do universo Hellsings.',
    },
    {
      href: 'hellsing.html',
      label: 'Hellsings',
      type: 'Organizacao',
      desc: 'Codigo, agentes e a estrutura criada por Jack Connor.',
    },
    {
      href: 'galeria.html',
      label: 'Galeria',
      type: 'Arquivo visual',
      desc: 'Irmaos Connor, mansao e registros da linhagem.',
    },
    {
      href: 'jack.html',
      label: 'Jack Connor',
      type: 'Personagem',
      desc: 'Primogenito, ex-FBI e fundador dos Hellsings.',
    },
    {
      href: 'alice.html',
      label: 'Alice Connor',
      type: 'Personagem',
      desc: 'Medica, esposa de Jack e eixo afetivo da familia.',
    },
    {
      href: 'mark.html',
      label: 'Mark Connor',
      type: 'Personagem',
      desc: 'Ex-marinha, irmao de Jack e parceiro de Ariani.',
    },
    {
      href: 'ariani.html',
      label: 'Ariani Salvatore',
      type: 'Personagem',
      desc: 'Advogada, amor de Mark e guardia de um segredo.',
    },
    {
      href: 'britney.html',
      label: 'Britney Connor',
      type: 'Personagem',
      desc: 'Irma Connor, estudante e presenca afiada da casa.',
    },
    {
      href: 'jully.html',
      label: 'Jully Connor',
      type: 'Personagem',
      desc: 'Cacula, estudante e energia inquieta da familia.',
    },
  ];

  const characterDossiers = {
    'jack.html': {
      first: 'Jack',
      last: 'Connor',
      seal: 'Arquivo 01 - Fundador',
      historyTitle: 'O irmao que virou escudo',
      history:
        'Jack Connor foi empurrado cedo demais para o centro da familia. A perda dos pais transformou a infancia em responsabilidade, e responsabilidade em instinto. Antes de ser agente, antes de ser fundador, ele foi o irmao que aprendeu a ficar de pe para que os outros nao caissem.',
      excerpt:
        'Jack observou a casa em silencio, como se cada janela guardasse uma promessa antiga. Nao havia medalha, distintivo ou missao que pesasse mais que aquele corredor cheio de vozes. Ali, entre passos pequenos e portas entreabertas, ele lembrava por que ainda lutava.',
      meta: 'Cena sugerida - substituir pelo trecho real do livro',
      relations: [
        [
          'Alice',
          'Amor',
          'Ela o enxergou para alem do soldado e segurou a parte humana que o dever tentava apagar.',
        ],
        [
          'Mark',
          'Irmao',
          'Mais que protegido: Mark se tornou o homem que Jack queria ao lado nas sombras.',
        ],
        [
          'Hellsings',
          'Legado',
          'A organizacao e a extensao do seu codigo: eficiencia com limites.',
        ],
        ['Familia', 'Juramento', 'Tudo comeca e termina na promessa de proteger os seus.'],
      ],
      secretsTitle: 'Camada escondida',
      secrets:
        'A dureza de Jack nao nasce de frieza. Nasce do medo disciplinado de falhar com quem ja perdeu demais.',
    },
    'alice.html': {
      first: 'Alice',
      last: 'Myers Connor',
      seal: 'Arquivo medico - Londres',
      historyTitle: 'A mulher que foi vista',
      history:
        'Alice cresceu acostumada a ser ignorada, mas nunca vazia. Quando Jack a viu, nao encontrou fragilidade: encontrou profundidade. Londres deu a ela tecnica, medicina e autonomia; a familia Connor deu um lugar onde seu cuidado virou forca.',
      excerpt:
        'Alice fechou o prontuario antes de tocar a mao dele. Jack sempre chegava inteiro por fora, mesmo quando alguma coisa por dentro havia se partido. Ela nao perguntava de imediato. Apenas ficava. E, com Alice, ficar tambem era uma forma de salvar.',
      meta: 'Cena sugerida - substituir pelo trecho real do livro',
      relations: [
        ['Jack', 'Marido', 'O primeiro a enxerga-la quando o mundo a tratava como invisivel.'],
        [
          'Filhos',
          'Familia',
          'Seu cuidado organiza a casa quando o trabalho dos Hellsings ameaca transbordar.',
        ],
        ['Londres', 'Origem profissional', 'Onde transformou sensibilidade em ciencia e vocacao.'],
        [
          'Hellsings',
          'Limite humano',
          'Ela lembra aos agentes que toda missao tem consequencias reais.',
        ],
      ],
      secretsTitle: 'Forca silenciosa',
      secrets:
        'Alice nao precisa dominar uma sala para muda-la. Ela altera o rumo das pessoas pela calma.',
    },
    'mark.html': {
      first: 'Mark',
      last: 'Connor',
      seal: 'Arquivo 02 - Marinha',
      historyTitle: 'O soldado que voltou tarde',
      history:
        'Mark escolheu o mar para se provar fora da sombra de Jack. Partiu jovem, deixando Ariani para tras sem saber que tambem deixava uma verdade crescendo em silencio. O retorno nao trouxe apenas reencontro: trouxe consequencia.',
      excerpt:
        'O uniforme parecia mais pesado em terra firme. Mark reconheceu Ariani antes que ela dissesse qualquer coisa, mas havia uma distancia nova entre eles: anos, escolhas, um filho, e a verdade que esperara tempo demais para respirar.',
      meta: 'Cena sugerida - substituir pelo trecho real do livro',
      relations: [
        ['Ariani', 'Amor', 'O passado interrompido que voltou cobrando maturidade.'],
        ['Jack', 'Irmao', 'Referencia, comandante e ponto fixo quando o mundo muda rapido demais.'],
        ['Marinha', 'Formacao', 'O mar ensinou disciplina; a volta ensinou responsabilidade.'],
        ['Hellsings', 'Nova lealdade', 'Onde sua experiencia militar encontra proposito familiar.'],
      ],
      secretsTitle: 'O peso do retorno',
      secrets:
        'Mark nao teme combate. O que o assombra e descobrir que sua ausencia tambem teve consequencias.',
    },
    'ariani.html': {
      first: 'Ariani',
      last: 'Salvatore',
      seal: 'Arquivo legal - Confidencial',
      historyTitle: 'A advogada que guardou a verdade',
      history:
        'Ariani nao parou quando Mark partiu. Criou um filho, construiu nome proprio e aprendeu a vencer em salas onde todos esperavam que ela cedesse. O segredo nao a diminuiu; tornou sua sobrevivencia ainda mais afiada.',
      excerpt:
        'No tribunal, Ariani nunca tremia. Mas naquela noite, diante de Mark, cada palavra parecia uma sentenca. Ela havia vencido homens poderosos, casos impossiveis e anos de silencio. Ainda assim, contar a verdade era o ato mais dificil.',
      meta: 'Cena sugerida - substituir pelo trecho real do livro',
      relations: [
        ['Mark', 'Amor interrompido', 'A partida dele abriu a ferida; o retorno exigiu verdade.'],
        ['Filho', 'Prioridade', 'O centro das escolhas que ela fez mesmo quando estava sozinha.'],
        ['Carreira', 'Armadura', 'A advocacia virou independencia, voz e protecao.'],
        ['Familia Connor', 'Reentrada', 'Um vinculo antigo que retorna com novas condicoes.'],
      ],
      secretsTitle: 'O segredo que sustenta',
      secrets:
        'Ariani nao escondeu por fraqueza. Ela escondeu porque, por anos, sobreviver exigiu controle.',
    },
    'britney.html': {
      first: 'Britney',
      last: 'Connor',
      seal: 'Arquivo 03 - Irma',
      historyTitle: 'A inteligencia que observa',
      history:
        'Britney parece leve apenas para quem nao presta atencao. Por tras dos oculos e da rotina universitaria, ela absorve tudo: tensoes, silenciamentos, mudancas de humor. Em uma familia de agentes e segredos, observar tambem e poder.',
      excerpt:
        'Britney fingiu concentracao no livro, mas ja havia entendido a discussao inteira pela metade das frases. Na casa Connor, ninguem dizia tudo. Ela aprendeu cedo a escutar portas, pausas e olhares.',
      meta: 'Cena sugerida - substituir pelo trecho real do livro',
      relations: [
        ['Jully', 'Irma', 'A cumplicidade que mistura cuidado, provocacao e lealdade absoluta.'],
        ['Mark', 'Casa', 'O irmao com quem divide rotina, caos e pequenas guerras domesticas.'],
        ['Jack', 'Protecao', 'Figura quase paterna, mesmo quando ela resiste a admitir.'],
        ['Universidade', 'Futuro', 'O lugar onde Britney pode ser mais que o sobrenome Connor.'],
      ],
      secretsTitle: 'Leitura de ambiente',
      secrets: 'Britney percebe rachaduras antes dos outros ouvirem o primeiro estalo.',
    },
    'jully.html': {
      first: 'Jully',
      last: 'Connor',
      seal: 'Arquivo 04 - Cacula',
      historyTitle: 'A energia que desafia a casa',
      history:
        'Jully carrega a liberdade dos mais novos e o peso de nascer em uma familia que todos tentam proteger. Ela provoca, ri, testa limites e transforma a casa em movimento. Mas por tras da impulsividade existe uma menina que entende mais do que deixam ela saber.',
      excerpt:
        'Jully desceu as escadas como se a mansao fosse pequena demais para ela. Britney ergueu os olhos, Mark suspirou, e por um segundo a casa pareceu normal. Era esse o talento de Jully: baguncar o medo ate ele parecer vida.',
      meta: 'Cena sugerida - substituir pelo trecho real do livro',
      relations: [
        ['Britney', 'Irma', 'Dupla inseparavel, entre confidencias e implicancias.'],
        ['Mark', 'Irmão', 'Ela atormenta a vida dele com a precisao de quem sabe que e amada.'],
        ['Jack', 'Guardiao', 'A autoridade que ela desafia e procura quando tudo aperta.'],
        ['Mansao', 'Territorio', 'A casa como palco de liberdade, segredos e crescimento.'],
      ],
      secretsTitle: 'Mais atenta do que parece',
      secrets:
        'Jully usa humor como porta aberta, mas tambem como escudo quando sente que a tratam como pequena demais.',
    },
  };

  function currentFile() {
    return (location.pathname.split('/').pop() || 'telainicial.html').toLowerCase();
  }

  function createProgress() {
    const bar = document.createElement('div');
    bar.className = 'reading-progress';
    document.body.appendChild(bar);

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
  }

  function createUniverseMap() {
    if (document.querySelector('.universe-fab')) return;

    const button = document.createElement('button');
    button.className = 'universe-fab';
    button.type = 'button';
    button.textContent = 'Mapa';
    button.setAttribute('aria-label', 'Abrir mapa do universo');

    const overlay = document.createElement('div');
    overlay.className = 'universe-overlay';
    overlay.innerHTML = `
      <section class="universe-panel" role="dialog" aria-modal="true" aria-label="Mapa do universo Connor">
        <div class="universe-head">
          <h2>Mapa do Universo</h2>
          <button class="universe-close" type="button" aria-label="Fechar">x</button>
        </div>
        <input class="universe-search" type="search" placeholder="Buscar personagem, galeria, Hellsings...">
        <div class="universe-grid"></div>
      </section>
    `;

    document.body.append(button, overlay);

    const grid = overlay.querySelector('.universe-grid');
    const search = overlay.querySelector('.universe-search');

    const render = (value) => {
      const term = (value || '').trim().toLowerCase();
      const results = pages.filter((page) =>
        `${page.label} ${page.type} ${page.desc}`.toLowerCase().includes(term)
      );
      grid.innerHTML = results
        .map(
          (page) => `
        <a class="universe-card" href="${page.href}">
          <small>${page.type}</small>
          <strong>${page.label}</strong>
          <span>${page.desc}</span>
        </a>
      `
        )
        .join('');
    };

    const open = () => {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      render(search.value);
      setTimeout(() => search.focus(), 30);
    };

    const close = () => {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
      button.focus();
    };

    button.addEventListener('click', open);
    overlay.querySelector('.universe-close').addEventListener('click', close);
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) close();
    });
    search.addEventListener('input', () => render(search.value));
    document.addEventListener('keydown', (event) => {
      if (
        (event.key === 'm' || event.key === 'M') &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey &&
        document.activeElement.tagName !== 'INPUT'
      ) {
        open();
      }
      if (event.key === 'Escape' && overlay.classList.contains('open')) close();
    });

    render('');
  }

  function createDossier(data) {
    const section = document.createElement('section');
    section.className = 'story-dossier reveal';
    section.id = 'arquivo-narrativo';
    section.innerHTML = `
      <div class="story-dossier-inner">
        <aside class="dossier-cover">
          <div>
            <p class="dossier-kicker">Arquivo narrativo</p>
            <h2 class="dossier-title">${data.first}<br><span>${data.last}</span></h2>
          </div>
          <div>
            <span class="dossier-seal">${data.seal}</span>
            <button class="focus-toggle" type="button">Modo leitura</button>
          </div>
        </aside>
        <div class="story-reader">
          <div class="story-tabs">
            <button class="story-tab active" type="button" data-panel="historia">Historia</button>
            <button class="story-tab" type="button" data-panel="manuscrito">Manuscrito</button>
            <button class="story-tab" type="button" data-panel="relacoes">Relacoes</button>
            <button class="story-tab" type="button" data-panel="segredos">Camada interna</button>
          </div>
          <article class="story-panel active" data-panel="historia">
            <h3>${data.historyTitle}</h3>
            <p>${data.history}</p>
          </article>
          <article class="story-panel" data-panel="manuscrito">
            <h3>Cena do livro</h3>
            <div class="manuscript-page">
              <p>${data.excerpt}</p>
              <span class="story-meta">${data.meta}</span>
            </div>
          </article>
          <article class="story-panel" data-panel="relacoes">
            <h3>Mapa de relacoes</h3>
            <div class="relation-grid">
              ${data.relations
                .map(
                  ([name, label, desc]) => `
                <div class="relation-card">
                  <span class="relation-label">${label}</span>
                  <strong>${name}</strong>
                  <p>${desc}</p>
                </div>
              `
                )
                .join('')}
            </div>
          </article>
          <article class="story-panel" data-panel="segredos">
            <h3>${data.secretsTitle}</h3>
            <p>${data.secrets}</p>
          </article>
        </div>
      </div>
    `;

    section.querySelectorAll('.story-tab').forEach((tab) => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.panel;
        section
          .querySelectorAll('.story-tab')
          .forEach((item) => item.classList.toggle('active', item === tab));
        section
          .querySelectorAll('.story-panel')
          .forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === target));
      });
    });

    section.querySelector('.focus-toggle').addEventListener('click', () => {
      document.body.classList.toggle('focus-mode');
    });

    return section;
  }

  function injectCharacterDossier() {
    const data = characterDossiers[currentFile()];
    if (!data || document.querySelector('#arquivo-narrativo')) return;

    const anchor =
      document.querySelector('.big-quote') ||
      document.querySelector('footer') ||
      document.body.lastElementChild;
    const dossier = createDossier(data);
    anchor.parentNode.insertBefore(dossier, anchor);
  }

  function enhanceRevealForInjectedContent() {
    const targets = document.querySelectorAll('.story-dossier.reveal');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
    );

    targets.forEach((target) => observer.observe(target));
  }

  document.addEventListener('DOMContentLoaded', () => {
    createProgress();
    createUniverseMap();
    injectCharacterDossier();
    enhanceRevealForInjectedContent();
  });
})();
(() => {
  const emblemSelectors = [
    '.book-sigil',
    '.emblem-letter',
    '.career-seal',
    '.naval-seal',
    '.hellsings-sigil',
    '.lineage-bond',
    '.tree-couple > i',
    '.origin-seal > b',
    '.h-mark > i',
  ];
  document.querySelectorAll(emblemSelectors.join(',')).forEach((slot) => {
    const monogram = slot.textContent.trim();
    if (monogram !== 'C' && monogram !== 'H') return;
    const logo = document.createElement('img');
    logo.className = 'hellsings-brand-mark';
    logo.src = 'img-hellsing/brand/hellsings-emblem.png';
    logo.alt = slot.getAttribute('aria-hidden') === 'true' ? '' : 'Emblema dos Hellsings';
    slot.textContent = '';
    slot.append(logo);
  });
})();
