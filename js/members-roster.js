(() => {
  const directory = document.querySelector("#members-directory");
  if (!directory) return;

  const cards = Array.from(directory.querySelectorAll(".member-card"));
  const groups = Array.from(directory.querySelectorAll(".members-group"));
  const search = directory.querySelector("#memberSearch");
  const filters = Array.from(directory.querySelectorAll("[data-member-filter]"));
  const status = directory.querySelector("#memberFilterStatus");
  const emptyState = directory.querySelector(".members-empty");
  const mapPanel = directory.querySelector("#members-relationship-map");
  const treeSelect = directory.querySelector("#lifeTreePerson");
  const treeRoot = directory.querySelector("#lifeTreeTree");
  const treeStatus = directory.querySelector("#lifeTreeStatus");
  const mapEmpty = directory.querySelector("#lifeTreeEmpty");
  const mapCardsButton = directory.querySelector("[data-map-show-cards]");
  let activeFilter = "all";
  let selectedTree = "jack-presente.html";

  const normalize = (value) => String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  })[character]);

  const cardGroup = (card) => card.closest("[data-member-group]")?.dataset.memberGroup || "";
  const personById = new Map();
  const allEdges = [];
  const categoryLabels = {
    family: "Família",
    friendship: "Amizade e confiança",
    team: "Equipe e missão",
    rescue: "Resgates e alianças",
    faction: "Facção e trajetória",
    archive: "Registro no arquivo"
  };
  const statusLabels = {
    confirmed: "VÍNCULO REGISTRADO",
    proposal: "LORE REVISÁVEL",
    unclear: "NATUREZA DO LAÇO EM ABERTO"
  };

  cards.forEach((card) => {
    const href = card.getAttribute("href");
    const heading = card.querySelector("h3");
    if (!href || !heading) return;
    const headingCopy = heading.cloneNode(true);
    headingCopy.querySelectorAll("br").forEach((lineBreak) => lineBreak.replaceWith(" "));
    const figure = card.querySelector("figure");
    const image = figure?.querySelector("img");
    personById.set(href, {
      id: href,
      href,
      name: headingCopy.textContent.replace(/\s+/g, " ").trim().replace(/[.\s]+$/, ""),
      role: card.querySelector(".member-card__tag")?.textContent.trim() ||
        figure?.querySelector("figcaption")?.textContent.trim() || "Pessoa ligada aos Hellsings",
      summary: card.querySelector(".member-card__body > p")?.textContent.trim() || "",
      image: image?.getAttribute("src") || "",
      proposal: /proposta|revis.vel/i.test(card.textContent),
      isNewcomer: cardGroup(card) === "newcomers",
      selectable: true
    });
  });

  const addProfile = (href, name, role) => {
    const existing = personById.get(href);
    personById.set(href, {
      ...(existing || {}),
      id: href,
      href,
      name,
      role,
      summary: existing?.summary || "",
      image: existing?.image || "",
      proposal: existing?.proposal || false,
      isNewcomer: false,
      selectable: true
    });
  };

  [
    ["jack-presente.html", "Jack Connor", "Fundador e líder dos Hellsings"],
    ["alice-presente.html", "Alice Myers Connor", "Médica e integrante do núcleo fundador"],
    ["mark-presente.html", "Mark Connor", "Campo e evacuação"],
    ["brian-presente.html", "Brian Taylor", "Agente especial e integrante dos Hellsings"],
    ["john-presente.html", "John Bertolai Winchester", "Agente especial e integrante dos Hellsings"],
    ["luke-presente.html", "Luke Carver", "Inteligência e tecnologia"],
    ["naomi-presente.html", "Naomi Yagami", "Inteligência e operações de campo"],
    ["bobby-presente.html", "Bobby Lee Yagami", "Agente especial e integrante dos Hellsings"],
    ["dimitri-presente.html", "Dimitri Volkov Belov", "Integrante dos Hellsings"],
    ["joey-presente.html", "Joey Muller", "Integrante dos Hellsings"],
    ["hellen-presente.html", "Hellen Wren", "Inteligência e integrante dos Hellsings"],
    ["clhoe-presente.html", "Chloe Bennett", "Integrante do núcleo original dos Hellsings"],
    ["ariani-presente.html", "Ariani Salvatore Connor", "Integrante dos Hellsings"],
    ["britney-presente.html", "Britney", "Integrante dos Hellsings"],
    ["jully-presente.html", "Jully", "Integrante dos Hellsings"],
    ["alucard-presente.html", "Alucard Myers Connor", "Família Connor e Hellsings"],
    ["nathalia-presente.html", "Sophie Romanoff", "Família Connor e Hellsings"],
    ["nathan-presente.html", "Nathan Salvatore Connor", "Família Connor e Hellsings"],
    ["nicolai-presente.html", "Nicolai Connor", "Família Connor e Hellsings"],
    ["diana-presente.html", "Diana Connor", "Família Connor"],
    ["mary-presente.html", "Mary Connor", "Família Connor"],
    ["isolde-presente.html", "Isolde Connor", "Família Connor"],
    ["pollyana-presente.html", "Pollyana Salvatore Connor", "Família Connor e Hellsings"]
  ].forEach(([href, name, role]) => addProfile(href, name, role));

  const addContext = (id, name, role) => {
    personById.set(id, { id, name, role, summary: "", image: "", selectable: true, context: true });
  };
  [
    ["context:henry", "Henry", "Filho de John e Amélia"],
    ["context:samuel", "Samuel", "Filho de John e Amélia"],
    ["context:olivia", "Olivia", "Filha de John e Amélia; falecida aos cinco anos"],
    ["context:james", "James", "Filho de Mark e Ariani"],
    ["context:gabriel", "Gabriel", "Noivo falecido de Jully; registro revisável"]
  ].forEach(([id, name, role]) => addContext(id, name, role));

  const addGroup = (id, name, role) => {
    personById.set(id, { id, name, role, summary: "", image: "", selectable: false, context: true });
  };
  addGroup("group:hellsings", "Rede dos Hellsings", "Arquivo coletivo e grupo de sobrevivência");
  addGroup("group:salt", "Facção do Sal", "Origem da trajetória de Kelly");

  const connect = (fromId, toId, kind, labelFrom, labelTo, detailFrom, detailTo, state = "confirmed") => {
    if (!personById.has(fromId) || !personById.has(toId)) return;
    allEdges.push({ from: fromId, to: toId, kind, label: labelFrom, detail: detailFrom, state });
    allEdges.push({ from: toId, to: fromId, kind, label: labelTo, detail: detailTo, state });
  };
  const pair = (a, b, kind, labelA, labelB, detailA, detailB, state) =>
    connect(a, b, kind, labelA, labelB, detailA, detailB, state);
  const parent = (parentId, childId, parentLabel, childLabel, detailParent, detailChild, state = "confirmed") =>
    connect(parentId, childId, "family", parentLabel, childLabel, detailParent, detailChild, state);
  const couple = (a, b, detail) =>
    pair(a, b, "family", "CÔNJUGE", "CÔNJUGE", detail, detail);
  const addGroupMember = (personId, groupId, label, detail, state = "confirmed", kind = "team") =>
    connect(personId, groupId, kind, label, "PESSOAS REGISTRADAS", detail,
      "Este arquivo coletivo reúne os registros das pessoas associadas a esse grupo. Abra um nome para explorar sua árvore pessoal.", state);

  const JACK = "jack-presente.html";
  const ALICE = "alice-presente.html";
  const MARK = "mark-presente.html";
  const BRIAN = "brian-presente.html";
  const JOHN = "john-presente.html";
  const LUKE = "luke-presente.html";
  const NAOMI = "naomi-presente.html";
  const BOBBY = "bobby-presente.html";
  const DIMITRI = "dimitri-presente.html";
  const JOEY = "joey-presente.html";
  const HELLEN = "hellen-presente.html";
  const CHLOE = "clhoe-presente.html";
  const ARIANI = "ariani-presente.html";
  const BRITNEY = "britney-presente.html";
  const JULLY = "jully-presente.html";
  const ALUCARD = "alucard-presente.html";
  const SOPHIE = "nathalia-presente.html";
  const NATHAN = "nathan-presente.html";
  const LANA = "lana-presente.html";
  const NICOLAI = "nicolai-presente.html";
  const SALLY = "sally-presente.html";
  const HILARY = "hilary-caldwell-ashford.html";
  const KELLY = "kelly-presente.html";
  const LEONA = "leona-presente.html";
  const DARIUS = "darius-bennett.html";
  const MICAH = "micah-bennett.html";
  const IMANI = "imani-carver.html";
  const ASHA = "asha-carver.html";
  const NYLA = "nyla-carver.html";
  const AMELIA = "amelia-arquivo.html";
  const POLLYANA = "pollyana-presente.html";

  couple(JACK, ALICE, "Jack e Alice formam a família Connor e compartilham a liderança dos Hellsings.");
  [
    [ALUCARD, "FILHO", "PAI"],
    ["diana-presente.html", "FILHA", "PAI"],
    [NICOLAI, "FILHO", "PAI"],
    ["mary-presente.html", "FILHA", "PAI"],
    ["isolde-presente.html", "FILHA", "PAI"]
  ].forEach(([child, parentLabel, childLabel]) => {
    parent(JACK, child, parentLabel, childLabel, "Jack é pai de " + personById.get(child)?.name + ".", "Jack Connor é seu pai.");
    parent(ALICE, child, parentLabel, "MÃE", "Alice é mãe de " + personById.get(child)?.name + ".", "Alice Myers Connor é sua mãe.");
  });

  couple(JOHN, AMELIA, "John e Amélia são casados e formaram uma família antes do Dia D.");
  [
    ["context:henry", "FILHO", "PAI"],
    ["context:samuel", "FILHO", "PAI"],
    ["context:olivia", "FILHA", "PAI"]
  ].forEach(([child, parentLabel, childLabel]) => {
    parent(JOHN, child, parentLabel, childLabel, "John é pai de " + personById.get(child).name + ".", "John Bertolai Winchester é seu pai.");
    parent(AMELIA, child, parentLabel, "MÃE", "Amélia é mãe de " + personById.get(child).name + ".", "Amélia é sua mãe.");
  });

  [
    [POLLYANA, "FILHA"],
    [NATHAN, "FILHO"],
    ["context:james", "FILHO"]
  ].forEach(([child, label]) => {
    parent(MARK, child, label, "PAI", "Mark é pai de " + personById.get(child).name + ".", "Mark Connor é seu pai.");
    parent(ARIANI, child, label, "MÃE", "Ariani é mãe de " + personById.get(child).name + ".", "Ariani Salvatore Connor é sua mãe.");
  });

  parent(JOEY, LEONA, "FILHA", "PAI", "Joey Muller é pai de Leona.", "Joey Muller é seu pai.");
  parent(HELLEN, LEONA, "FILHA", "MÃE", "Hellen Wren é mãe de Leona.", "Hellen Wren é sua mãe.");
  couple(CHLOE, DARIUS, "Chloe e Darius são casados; os três fatos desta família foram situados antes do Dia D.");
  parent(CHLOE, MICAH, "FILHO", "MÃE", "Chloe é mãe de Micah; ele nasceu antes do Dia D.", "Chloe é sua mãe. Você nasceu antes do Dia D.");
  parent(DARIUS, MICAH, "FILHO", "PAI", "Darius é pai de Micah; ele nasceu antes do Dia D.", "Darius é seu pai. Você nasceu antes do Dia D.");
  couple(LUKE, IMANI, "Luke e Imani já eram casados antes do Dia D.");
  [ASHA, NYLA].forEach((child) => {
    parent(LUKE, child, "FILHA", "PAI", "Luke é pai de " + personById.get(child)?.name + ".", "Luke Carver é seu pai. Você nasceu antes do Dia D.");
    parent(IMANI, child, "FILHA", "MÃE", "Imani é mãe de " + personById.get(child)?.name + ".", "Imani Carver é sua mãe. Você nasceu antes do Dia D.");
  });

  couple(ALUCARD, SOPHIE, "Alucard e Sophie Romanoff são casados.");
  couple(NATHAN, LANA, "Nathan Salvatore Connor e Lana Whitmore são casados.");
  pair(NAOMI, BOBBY, "family", "IRMÃO MAIS NOVO", "IRMÃ MAIS VELHA", "Naomi Yagami é a irmã mais velha de Bobby Lee Yagami.", "Bobby Lee Yagami é irmão de Naomi.");
  pair(BRITNEY, BOBBY, "family", "CÔNJUGE", "CÔNJUGE", "Britney e Bobby Lee são casados.", "Bobby Lee e Britney são casados.");
  pair(BRITNEY, MARK, "family", "IRMÃO", "IRMÃ", "Britney é irmã de Mark.", "Mark é irmão de Britney.");
  pair(BRITNEY, JULLY, "family", "IRMÃ", "IRMÃ", "Britney e Jully são irmãs.", "Britney e Jully são irmãs.");
  pair(JULLY, "context:gabriel", "friendship", "NOIVO FALECIDO // LORE REVISÁVEL", "NOIVA FALECIDA // LORE REVISÁVEL", "O memorial em desenvolvimento apresenta Gabriel como noivo falecido de Jully. Este ramo permanece revisável.", "O memorial em desenvolvimento apresenta Gabriel como seu noivo falecido. Este ramo permanece revisável.", "proposal");

  pair(JACK, BRIAN, "team", "COLEGA DE EQUIPE", "COLEGA DE EQUIPE", "Jack, Brian e John foram agentes especiais do FBI na mesma equipe. Brian era mais velho que Jack e seguia suas ordens sem questionar.", "Brian integrou a equipe de agentes especiais do FBI liderada por Jack. Mesmo mais velho, seguia as ordens de Jack sem questionar.");
  pair(JACK, JOHN, "team", "COLEGA DE EQUIPE", "COLEGA DE EQUIPE", "Jack, Brian e John foram agentes especiais do FBI na mesma equipe; depois, Jack convidou John para os Hellsings.", "John permaneceu no FBI quando Jack saiu e mais tarde aceitou o convite para integrar os Hellsings.");
  pair(BRIAN, JOHN, "team", "COLEGA DE EQUIPE", "COLEGA DE EQUIPE", "Brian e John faziam parte da equipe de agentes especiais do FBI de Jack.", "John e Brian faziam parte da mesma equipe de agentes especiais do FBI.");
  pair(JACK, LUKE, "friendship", "AMIZADE E CONFIANÇA", "AMIZADE E CONFIANÇA", "A amizade dos dois resistiu à saída de Jack do FBI. Luke era especialista em inteligência e tecnologia, lia caminhos e preparava alternativas para as operações.", "Jack e Luke compartilhavam decisões difíceis desde o FBI. Anos depois, Jack o convidou para construir os Hellsings.");
  pair(JACK, MARK, "friendship", "CONFIANÇA EM CAMPO", "CONFIANÇA EM CAMPO", "Jack confiou a Mark a liderança de evacuações. Em Travessia sem Faróis, Mark voltou para buscar um motorista desaparecido.", "A missão Travessia sem Faróis mostra a confiança de Jack em Mark e a decisão de Mark de voltar por um motorista que faltava.");
  pair(HELLEN, NAOMI, "team", "PARCEIRAS DE INTELIGÊNCIA", "PARCEIRAS DE INTELIGÊNCIA", "Hellen e Naomi trabalharam juntas para interpretar sinais durante a Operação Mirror.", "Naomi e Hellen colaboraram na análise de sinais da Operação Mirror.");
  pair(NAOMI, BOBBY, "team", "PARCERIA DE CAMPO", "PARCERIA DE CAMPO", "Além de irmãos, Naomi e Bobby atuaram juntos em operações de inteligência e campo.", "Bobby e Naomi trabalharam juntos em operações de inteligência e campo.");
  pair(JACK, BOBBY, "rescue", "RECRUTOU PARA OS HELLSINGS", "ACEITOU O CONVITE", "Após uma colaboração em um resgate, Jack convidou Bobby Lee a integrar os Hellsings.", "Jack o convidou a integrar os Hellsings depois da colaboração em um resgate.");
  pair(JACK, NAOMI, "rescue", "RESGATE NA EVACUAÇÃO", "RESGATADA NA EVACUAÇÃO", "Quando os bombardeios foram anunciados, Jack saiu do caminho seguro para reunir Naomi e outras pessoas antes de seguir ao bunker.", "Jack arriscou o caminho até Naomi e outras pessoas para conduzi-las ao bunker antes dos bombardeios.");
  pair(JACK, LUKE, "rescue", "RESGATE NA EVACUAÇÃO", "RESGATADO NA EVACUAÇÃO", "Na evacuação rumo ao bunker, Jack também foi buscar Luke e sua família no pouco tempo que restava.", "Jack voltou para reunir Luke e sua família antes dos bombardeios.");
  pair(JACK, JOEY, "rescue", "RESGATE NA EVACUAÇÃO", "RESGATADO NA EVACUAÇÃO", "Jack incluiu Joey entre as pessoas que tentou reunir para alcançar o bunker a tempo.", "Durante a evacuação dos bombardeios, Jack arriscou o caminho para reunir Joey com o grupo.");
  pair(JACK, BRIAN, "team", "CONVITE AOS HELLSINGS", "CONVITE AOS HELLSINGS", "Depois de deixar o FBI, Jack chamou Brian para compor os Hellsings.", "Jack convidou Brian para os Hellsings após a saída dele do FBI.");
  pair(JACK, JOHN, "team", "CONVITE AOS HELLSINGS", "CONVITE AOS HELLSINGS", "Depois de deixar o FBI, Jack chamou John para compor os Hellsings.", "Jack convidou John para os Hellsings após sua saída do FBI.");
  pair(JACK, LUKE, "team", "CONVITE AOS HELLSINGS", "CONVITE AOS HELLSINGS", "Jack procurou Luke anos depois para convidá-lo a fazer parte da organização que estava montando.", "Anos depois da saída de Jack do FBI, ele convidou Luke para os Hellsings.");

  [JACK, ALICE, MARK, DIMITRI, NAOMI, CHLOE].forEach((personId) =>
    addGroupMember(personId, "group:hellsings", "NÚCLEO FUNDADOR", "Os registros disponíveis colocam esta pessoa no primeiro núcleo dos Hellsings.", "confirmed")
  );
  [BRIAN, JOHN, LUKE, BOBBY, JOEY, HELLEN].forEach((personId) =>
    addGroupMember(personId, "group:hellsings", "INTEGRANTE DOS HELLSINGS", "O arquivo registra esta pessoa entre os integrantes dos Hellsings.", "confirmed")
  );

  pair(KELLY, "group:salt", "faction", "ORIGEM NA FACÇÃO", "INTEGRANTE", "A trajetória de Kelly começou na Facção do Sal.", "Kelly Sullivan faz parte do registro de pessoas cuja trajetória passou pela Facção do Sal.");
  connect(KELLY, "group:hellsings", "faction", "ESCOLHEU SEGUIR COM", "PESSOAS REGISTRADAS", "Depois do ataque da Dominus, Kelly escolheu seguir com os Hellsings.", "O arquivo registra a escolha de Kelly de seguir com os Hellsings após o ataque da Dominus.");

  pair(SALLY, NICOLAI, "rescue", "ENCONTRO QUE MUDOU DUAS VIDAS", "ENCONTRO QUE MUDOU DUAS VIDAS", "A ficha diz que um encontro com Nicolai mudou o rumo de duas vidas, mas não define a natureza exata do vínculo.", "O registro menciona um encontro com Sally que mudou duas vidas; a relação entre eles ainda está em aberto.", "unclear");
  pair(HILARY, "group:hellsings", "rescue", "ACOLHIDA PELO GRUPO", "PESSOAS REGISTRADAS", "Hilary encontrou nos Connor um lugar seguro e transformou essa experiência em cuidado. O grau de parentesco não está definido.", "O registro do arquivo inclui Hilary entre as pessoas acolhidas e ligadas aos Hellsings; o tipo exato de vínculo permanece em aberto.", "unclear");

  cards.forEach((card) => {
    const id = card.getAttribute("href");
    const person = personById.get(id);
    if (!person) return;
    if (person.isNewcomer) {
      addGroupMember(id, "group:hellsings", "NOVO CODINOME // PROPOSTA", "A ficha apresenta este codinome como novo integrante, mas a lore continua revisável. Este ramo registra a entrada no arquivo sem inventar relações pessoais.", "proposal", "faction");
    } else if (!allEdges.some((edge) => edge.from === id)) {
      addGroupMember(id, "group:hellsings", "VÍNCULO NO ARQUIVO", person.summary || "A pessoa aparece no diretório dos Hellsings. O arquivo ainda não especifica outros laços pessoais.", person.proposal ? "proposal" : "unclear", "archive");
    }
  });

  personById.forEach((person) => {
    if (person.selectable && !allEdges.some((edge) => edge.from === person.id)) {
      addGroupMember(person.id, "group:hellsings", "VÍNCULO NO ARQUIVO", "Este nome está registrado no arquivo geral; outros laços aguardam confirmação.", "unclear", "archive");
    }
  });

  const people = Array.from(personById.values())
    .filter((person) => person.selectable)
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));

  const edgesFrom = (id) => allEdges.filter((edge) => edge.from === id);
  const treeSearchText = (person) => normalize([
    person.name,
    person.role,
    person.summary,
    ...edgesFrom(person.id).flatMap((edge) => {
      const target = personById.get(edge.to);
      return [target?.name, target?.role, edge.label, edge.detail, categoryLabels[edge.kind], statusLabels[edge.state]];
    })
  ].filter(Boolean).join(" "));

  const setCount = (selector, value) => {
    const node = directory.querySelector(selector);
    if (node) node.textContent = String(value);
  };

  setCount("[data-member-total]", cards.length);
  setCount('[data-filter-count="all"]', cards.length);

  groups.forEach((group) => {
    const key = group.dataset.memberGroup;
    const count = group.querySelectorAll(".member-card").length;
    setCount('[data-filter-count="' + key + '"]', count);
    setCount('[data-member-count="' + key + '"]', count);
  });

  const renderTreeOptions = (query) => {
    if (!treeSelect) return [];
    const matching = query ? people.filter((person) => treeSearchText(person).includes(query)) : people;
    const currentStillMatches = matching.some((person) => person.id === selectedTree);
    if (query && !currentStillMatches) selectedTree = matching[0]?.id || "";
    if (!query && !people.some((person) => person.id === selectedTree)) selectedTree = "jack-presente.html";

    const options = matching.map((person) =>
      '<option value="' + escapeHtml(person.id) + '">' + escapeHtml(person.name) +
      (person.context ? " — registro sem dossiê" : "") + "</option>"
    );
    treeSelect.innerHTML = options.length ? options.join("") : '<option value="">Nenhum registro encontrado</option>';
    treeSelect.value = matching.some((person) => person.id === selectedTree) ? selectedTree : "";
    return matching;
  };

  const renderLink = (edge) => {
    const person = personById.get(edge.to);
    if (!person) return "";
    const avatar = person.image
      ? '<img src="' + escapeHtml(person.image) + '" alt="" loading="lazy" />'
      : '<span aria-hidden="true">' + escapeHtml(person.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2)) + "</span>";
    const dossier = person.href
      ? '<a class="life-tree__action" href="' + escapeHtml(person.href) + '">ABRIR DOSSIÊ <span aria-hidden="true">→</span></a>'
      : '<span class="life-tree__no-dossier">REGISTRO SEM DOSSIÊ</span>';
    const treeAction = person.selectable
      ? '<button class="life-tree__action life-tree__action--quiet" type="button" data-life-tree-select="' + escapeHtml(person.id) + '">VER ÁRVORE DE ' + escapeHtml(person.name) + "</button>"
      : "";
    return '<details class="life-tree__link" data-status="' + edge.state + '" data-kind="' + edge.kind + '">' +
      '<summary><span class="life-tree__avatar">' + avatar + '</span>' +
      '<span class="life-tree__link-main"><b>' + escapeHtml(person.name) + '</b><small>' + escapeHtml(edge.label) + '</small></span>' +
      '<span class="life-tree__chevron" aria-hidden="true">+</span></summary>' +
      '<div class="life-tree__detail"><p>' + escapeHtml(edge.detail) + '</p>' +
      '<span class="life-tree__status" data-status="' + edge.state + '">' + escapeHtml(statusLabels[edge.state]) + '</span>' +
      '<div class="life-tree__actions">' + dossier +
      treeAction +
      "</div></div></details>";
  };

  const renderTree = () => {
    if (!treeRoot) return;
    const person = personById.get(selectedTree);
    if (!person) {
      treeRoot.innerHTML = "";
      if (treeStatus) treeStatus.textContent = "Nenhuma árvore encontrada para esta busca.";
      if (mapEmpty) mapEmpty.hidden = false;
      return;
    }
    const edges = edgesFrom(person.id);
    const branches = Object.keys(categoryLabels).map((kind) => ({
      kind,
      edges: edges.filter((edge) => edge.kind === kind)
    })).filter((branch) => branch.edges.length);

    const portrait = person.image
      ? '<img src="' + escapeHtml(person.image) + '" alt="" />'
      : '<span aria-hidden="true">' + escapeHtml(person.name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2)) + "</span>";
    const rootDossier = person.href
      ? '<a href="' + escapeHtml(person.href) + '" class="life-tree__root-link">ABRIR DOSSIÊ <span aria-hidden="true">→</span></a>'
      : '<span class="life-tree__no-dossier">REGISTRO SEM DOSSIÊ</span>';

    treeRoot.innerHTML =
      '<div class="life-tree__origin"><span class="life-tree__origin-label">RAIZ // VIDA SELECIONADA</span>' +
      '<article class="life-tree__root-card"><div class="life-tree__root-avatar">' + portrait + '</div>' +
      '<div class="life-tree__root-copy"><p class="members-kicker">' + escapeHtml(person.role || "ARQUIVO PESSOAL") + '</p>' +
      '<h4>' + escapeHtml(person.name) + '</h4>' +
      '<p>' + escapeHtml(person.summary || "Abra os ramos para acompanhar os laços registrados nesta árvore.") + '</p>' +
      '<div class="life-tree__actions">' + rootDossier + "</div></div></article></div>" +
      '<div class="life-tree__trunk" aria-hidden="true"></div>' +
      '<div class="life-tree__branches">' + branches.map((branch) =>
        '<section class="life-tree__branch" data-kind="' + branch.kind + '">' +
        '<header><span class="life-tree__branch-symbol" aria-hidden="true">' + ({
          family: "✦", friendship: "∞", team: "⌘", rescue: "↗", faction: "⚑", archive: "⌂"
        })[branch.kind] + '</span><div><small>RAMO // ' + escapeHtml(categoryLabels[branch.kind]) + '</small>' +
        '<h5>' + escapeHtml(categoryLabels[branch.kind]) + '</h5></div><b>' +
        String(branch.edges.length).padStart(2, "0") + "</b></header>" +
        '<div class="life-tree__nodes">' + branch.edges.map(renderLink).join("") + "</div></section>"
      ).join("") + "</div>";

    if (treeStatus) treeStatus.textContent = person.name + " // " + edges.length + " laços registrados em " + branches.length + " ramos.";
    if (mapEmpty) mapEmpty.hidden = true;
  };

  const refresh = () => {
    const query = normalize(search?.value.trim() || "");
    const isMapView = activeFilter === "archive";
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesGroup = activeFilter === "all" || (activeFilter === "newcomers" && cardGroup(card) === "newcomers");
      const matchesSearch = !query || normalize(card.textContent).includes(query);
      const isVisible = !isMapView && matchesGroup && matchesSearch;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    const hasScopedView = activeFilter !== "all" || Boolean(query);
    groups.forEach((group) => {
      const hasVisibleCards = Array.from(group.querySelectorAll(".member-card")).some((card) => !card.hidden);
      const groupMatchesFilter = activeFilter !== "newcomers" || group.dataset.memberGroup === "newcomers";
      group.hidden = isMapView || !groupMatchesFilter || (hasScopedView && !hasVisibleCards);
      if (isMapView) return;
      if (query) group.open = hasVisibleCards;
      else if (activeFilter === "newcomers") group.open = group.dataset.memberGroup === "newcomers";
    });

    if (mapPanel) mapPanel.hidden = !isMapView;
    if (isMapView) {
      const matches = renderTreeOptions(query);
      renderTree();
      if (mapEmpty) mapEmpty.hidden = !query || matches.length > 0;
      if (status) {
        status.textContent = query
          ? matches.length + " árvores combinam com \"" + search.value.trim() + "\"."
          : "Árvore pessoal aberta. Escolha outra vida ou expanda um ramo para ler seus registros.";
      }
    } else if (mapEmpty) {
      mapEmpty.hidden = true;
    }

    if (emptyState) emptyState.hidden = isMapView || visibleCount !== 0;
    if (status && !isMapView) {
      status.textContent = visibleCount === 0
        ? "Nenhum perfil encontrado. Ajuste a busca ou escolha outro filtro."
        : activeFilter === "all" && !query
          ? visibleCount + " perfis no arquivo. Abra um grupo para explorar ou busque um nome."
          : "Exibindo " + visibleCount + " de " + cards.length + " perfis.";
    }

    filters.forEach((button) => {
      const selected = button.dataset.memberFilter === activeFilter;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
      if (button.hasAttribute("aria-expanded")) button.setAttribute("aria-expanded", String(selected));
    });
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.memberFilter || "all";
      refresh();
    });
  });

  treeSelect?.addEventListener("change", () => {
    selectedTree = treeSelect.value;
    renderTree();
  });

  treeRoot?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-life-tree-select]");
    if (!button) return;
    selectedTree = button.dataset.lifeTreeSelect;
    if (search) search.value = "";
    refresh();
    treeSelect?.focus();
  });

  mapCardsButton?.addEventListener("click", () => {
    activeFilter = "all";
    if (search) search.value = "";
    refresh();
    const archiveGroup = groups.find((group) => group.dataset.memberGroup === "archive");
    if (archiveGroup) {
      archiveGroup.open = true;
      archiveGroup.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  search?.addEventListener("input", refresh);
  refresh();
})();
