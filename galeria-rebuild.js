(() => {
  const defs = [
    {
      key: 'hellsings',
      name: 'Operações Hellsings',
      desc: 'Formação oficial, inteligência, comando e registros operacionais da organização.',
      cover: 'img-hellsing/scenes/comando-jack-mark-alice.png',
      files: [
        ['img-hellsing/scenes/comando-jack-mark-alice.png', 'Comando — Jack, Mark & Alice'],
        [
          'img-hellsing/scenes/inteligencia-boby-naomi-clhoe.png',
          'Inteligência — Boby, Naomi & Clhoe',
        ],
        [
          'img-hellsing/scenes/retorno-luke-dimitri-brian-hellen.png',
          'Retorno — Luke, Dimitri, Brian & Hellen',
        ],
        ['img-jack/jack-hellsings-commander.png', 'Jack Connor — Comandante'],
        ['img-mark/markhellsing.png', 'Mark Connor — Comando tático'],
        ['img-alice/alice-hellsings-admin.png', 'Alice Myers — Administração'],
        ['img-hellsing/boby-johhn.png', 'Boby Johhn — Tecnologia'],
        ['img-hellsing/naomi.png', 'Naomi — Inteligência'],
        ['img-hellsing/clhoe.png', 'Clhoe — Reconhecimento'],
        ['img-hellsing/luke.png', 'Luke — Estratégia'],
        ['img-hellsing/dimitri.png', 'Dimitri — Extração'],
        ['img-hellsing/brian-taylor.png', 'Brian Taylor — Rastreamento'],
        ['img-hellsing/hellen.png', 'Hellen — Infiltração'],
      ],
    },
    {
      key: 'eventos',
      name: 'Eventos & cotidiano',
      desc: 'Celebrações, viagens, encontros e momentos vividos fora das operações.',
      cover: 'img-alice/evento2.png',
      files: [
        ['img-alice/alice&ariani.png', 'Alice & Ariani na praia'],
        ['img-alice/banho.png', 'Um momento reservado'],
        ['img-alice/casal.png', 'Casais Connor em noite de gala'],
        ['img-alice/casal1.png', 'Os casais na celebração'],
        ['img-alice/casal3.png', 'Chegada ao evento'],
        ['img-alice/casal4.png', 'Jack & Alice'],
        ['img-alice/evento.png', 'Noite Connor'],
        ['img-alice/evento1.png', 'Olhares'],
        ['img-alice/evento2.png', 'Chegada'],
        ['img-alice/evento3.png', 'Encontro'],
        ['img-alice/evento4.png', 'Juntos no evento'],
        ['img-alice/festa.png', 'Celebração em família'],
        ['img-alice/frio.png', 'Inverno a dois'],
        ['img-alice/frio1.png', 'Paris no inverno'],
        ['img-alice/jantar.png', 'Jantar de Jack & Alice'],
        ['img-alice/shopping.png', 'Um dia comum'],
        ['img-mark/cosplay1.png', 'Jack & Mark em caracterização'],
        ['img-mark/cosplay3.png', 'Os irmãos Connor'],
        ['img-mark/cosplay4.png', 'Noite temática'],
      ],
    },
    {
      key: 'irmaos',
      name: 'Irmãos Connor',
      desc: 'Os quatro irmãos, encontros e memórias da linhagem Connor.',
      cover: 'img-brothers/brothers.png',
      files: [
        ['img-brothers/brothers.png', 'Irmãos Connor'],
        ['img-brothers/brothers0.png', 'Os Connor reunidos'],
        ['img-brothers/brothers1.png', 'Encontro entre irmãos'],
        ['img-brothers/brothers2.png', 'Retrato dos irmãos'],
        ['img-brothers/brothers3.png', 'Laços Connor'],
        ['img-brothers/brothers4.png', 'Um mesmo caminho'],
        ['img-brothers/jackmark.png', 'Jack & Mark'],
        ['img-brothers/casal.png', 'Os casais Connor'],
      ],
    },
    {
      key: 'jack-familia',
      name: 'Família de Jack',
      desc: 'A família construída por Jack e os registros desse novo núcleo.',
      cover: 'img-brothers/familiajack.png',
      files: [
        ['img-brothers/familiajack.png', 'A família de Jack'],
        ['img-brothers/family.png', 'Família reunida'],
        ['img-alice/licefamilia.png', 'Alice e sua família'],
        ['img-alice/licefamilia2.png', 'Retrato da família'],
        ['img-alice/gravida.png', 'Uma nova vida'],
        ['img-alice/treinoconoors.png', 'Treinamento Connor'],
        ['img-alice/treinoconoors1.png', 'Família em treinamento'],
        ['img-alice/all.png', 'O núcleo Connor'],
        ['img-alice/familia-piscina.png', 'Família junto à piscina'],
        ['img-alice/familia.png', 'Dia em família'],
        ['img-alice/familia1.png', 'Memória familiar'],
      ],
    },
    {
      key: 'jack-alice',
      name: 'Jack & Alice',
      desc: 'A história do casal em momentos que existem além das missões.',
      cover: 'img-alice/licejack.png',
      files: [
        ['img-alice/licejack.png', 'Jack & Alice'],
        ['img-alice/iate.png', 'Jack & Alice no iate'],
        ['img-alice/iate1.png', 'Um dia no mar'],
        ['img-alice/alice&jack.png', 'Juntos'],
        ['img-alice/jakc&alice.png', 'Jack e Alice'],
        ['img-alice/juntos.png', 'Uma vida compartilhada'],
        ['img-alice/cavaleiro.png', 'Noite a dois'],
        ['img-alice/alice&jack1.png', 'Jack e Alice juntos'],
      ],
    },
    {
      key: 'mark-familia',
      name: 'Mark, Ariani & filhos',
      desc: 'O casal, os filhos e a família que Mark e Ariani construíram.',
      cover: 'img-ariani/markfam.png',
      files: [
        ['img-ariani/markfam.png', 'Mark, Ariani e os filhos'],
        ['img-ariani/markari.png', 'Mark & Ariani'],
        ['img-ariani/arimark.png', 'Ariani & Mark'],
        ['img-ariani/arimarkdrink.png', 'Um brinde a dois'],
        ['img-ariani/arimarkpraia.png', 'Mark & Ariani na praia'],
        ['img-ariani/ari&mark.png', 'Ariani & Mark na cidade'],
        ['img-ariani/familia.png', 'Família reunida'],
      ],
    },
    {
      key: 'brit-jully',
      name: 'Britney & Jully',
      desc: 'A cumplicidade das duas irmãs mais novas em diferentes fases.',
      cover: 'img-brothers/britjull1.png',
      files: [
        ['img-brothers/bj.png', 'Britney & Jully'],
        ['img-brothers/britjull.png', 'As irmãs Connor'],
        ['img-brothers/britjull0.png', 'Britney e Jully juntas'],
        ['img-brothers/britjull1.png', 'Noite das irmãs'],
        ['img-brothers/jullybrit.png', 'Jully & Britney'],
        ['img-brothers/jullybrit2.jpeg', 'Retrato das irmãs'],
        ['img-brothers/universidade.png', 'Juntas na universidade'],
        ['img-brothers/sis.png', 'As irmãs na estrada'],
      ],
    },
  ];
  defs.forEach(
    (a) => (a.items = a.files.map((x, i) => ({ src: x[0], title: x[1], group: a.name, id: i })))
  );
  const roomData = [
    ['mansao.png', 'Mansão Connor'],
    ['portao.png', 'Portão'],
    ['entrada.png', 'Entrada principal'],
    ['hall.png', 'Hall'],
    ['sala.png', 'Sala principal'],
    ['sala-de-estar.png', 'Sala de estar'],
    ['cozinha.png', 'Cozinha'],
    ['areagourmet.png', 'Área gourmet'],
    ['cinema.png', 'Cinema privado'],
    ['bibliotecageek.png', 'Biblioteca geek'],
    ['adegabar.png', 'Adega & bar'],
    ['garagem1.png', 'Garagem subterrânea'],
    ['garagem2.png', 'Garagem coleção'],
    ['academia.png', 'Academia'],
    ['treinorecuperação.png', 'Treino & recuperação'],
    ['piscina.png', 'Piscina'],
    ['quartocasal.png', 'Quarto do casal'],
    ['quartocasalclosset.png', 'Closet do casal'],
    ['quartomeninas.png', 'Quarto das meninas'],
    ['quartomeninos.png', 'Quarto dos meninos'],
    ['quartohosp.png', 'Quarto de hóspedes'],
    ['quartohosp2.png', 'Suíte de hóspedes'],
    ['salajogos.png', 'Sala de jogos'],
    ['escritorio.png', 'Escritório'],
  ];
  const rooms = roomData.map((x, i) => ({
    src: `casa/${x[0]}`,
    title: x[1],
    group: 'Mansão Connor',
    id: i,
  }));
  let filter = 'todos',
    viewerItems = [],
    viewerIndex = 0,
    room = 0;
  const $ = (s) => document.querySelector(s),
    $$ = (s) => [...document.querySelectorAll(s)];
  function render() {
    const albums = filter === 'todos' ? defs : defs.filter((x) => x.key === filter);
    $('#brotherGrid').innerHTML = albums
      .map(
        (a, i) =>
          `<button class="memory" data-key="${a.key}"><img src="${a.cover}" alt="Capa: ${a.name}"><span><small>ÁLBUM ${String(i + 1).padStart(2, '0')}</small><strong>${a.name}</strong><i class="album-total">${a.items.length} fotografias · ${a.desc}</i></span></button>`
      )
      .join('');
    $('#resultCount').textContent = `${albums.length} ${albums.length === 1 ? 'álbum' : 'álbuns'}`;
    $$('.memory').forEach(
      (b) =>
        (b.onclick = () => {
          const a = defs.find((x) => x.key === b.dataset.key);
          open(a.items, 0);
        })
    );
  }
  function hero() {
    const pool = [
      defs[0].items[0],
      defs[1].items[0],
      defs[2].items[0],
      defs[3].items[0],
      defs[4].items[0],
      rooms[0],
    ];
    $('#heroSlides').innerHTML = pool
      .map(
        (x, i) => `<div class="${i ? '' : 'active'}"><img src="${x.src}" alt="${x.title}"></div>`
      )
      .join('');
    let n = 0;
    setInterval(() => {
      const s = $$('#heroSlides div');
      s[n].classList.remove('active');
      n = (n + 1) % s.length;
      s[n].classList.add('active');
      $('#heroCount').textContent = `${String(n + 1).padStart(2, '0')} / 06`;
    }, 5200);
  }
  function open(items, n) {
    viewerItems = items;
    viewerIndex = (n + items.length) % items.length;
    const x = items[viewerIndex];
    $('#viewerImage').src = x.src;
    $('#viewerTitle').textContent = x.title;
    $('#viewerGroup').textContent = x.group;
    $('#viewerCount').textContent =
      `${String(viewerIndex + 1).padStart(2, '0')} / ${String(items.length).padStart(2, '0')}`;
    $('#viewer').open || $('#viewer').showModal();
  }
  function setRoom(n) {
    room = (n + rooms.length) % rooms.length;
    const x = rooms[room];
    $('#roomImage').src = x.src;
    $('#roomImage').alt = x.title;
    $('#roomTitle').textContent = x.title;
    $('#roomCode').textContent = `AMBIENTE ${String(room + 1).padStart(2, '0')}`;
    $('#roomCount').textContent = `${String(room + 1).padStart(2, '0')} / 24`;
    $('#roomText').textContent = `Registro ${room + 1} de 24 da propriedade Connor.`;
    $$('#roomStrip button').forEach((b, i) => b.classList.toggle('active', i === room));
  }
  function buildRooms() {
    $('#roomStrip').innerHTML = rooms
      .map(
        (x, i) =>
          `<button data-i="${i}" aria-label="${x.title}"><img src="${x.src}" alt="" loading="lazy"></button>`
      )
      .join('');
    $$('#roomStrip button').forEach((b) => (b.onclick = () => setRoom(+b.dataset.i)));
    setRoom(0);
  }
  $$('#filters button').forEach(
    (b) =>
      (b.onclick = () => {
        filter = b.dataset.filter;
        $$('#filters button').forEach((x) => x.classList.toggle('active', x === b));
        render();
      })
  );
  $('#roomPrev').onclick = () => setRoom(room - 1);
  $('#roomNext').onclick = () => setRoom(room + 1);
  $('#roomStage').onclick = () => open(rooms, room);
  $('#viewerClose').onclick = () => $('#viewer').close();
  $('#viewerPrev').onclick = () => open(viewerItems, viewerIndex - 1);
  $('#viewerNext').onclick = () => open(viewerItems, viewerIndex + 1);
  document.addEventListener('keydown', (e) => {
    if (!$('#viewer').open) return;
    if (e.key === 'ArrowLeft') open(viewerItems, viewerIndex - 1);
    if (e.key === 'ArrowRight') open(viewerItems, viewerIndex + 1);
  });
  hero();
  render();
  buildRooms();
})();
