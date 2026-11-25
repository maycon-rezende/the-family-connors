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
  const mapClusters = Array.from(directory.querySelectorAll("[data-map-cluster]"));
  const mapEmpty = directory.querySelector(".relationship-map__empty");
  const mapCardsButton = directory.querySelector("[data-map-show-cards]");
  let activeFilter = "all";

  const normalize = (value) => String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");

  const cardGroup = (card) => card.closest("[data-member-group]")?.dataset.memberGroup || "";

  const setCount = (selector, value) => {
    const node = directory.querySelector(selector);
    if (node) node.textContent = String(value);
  };

  setCount("[data-member-total]", cards.length);
  setCount('[data-filter-count="all"]', cards.length);

  groups.forEach((group) => {
    const key = group.dataset.memberGroup;
    const count = group.querySelectorAll(".member-card").length;
    setCount(`[data-filter-count="${key}"]`, count);
    setCount(`[data-member-count="${key}"]`, count);
  });

  const refresh = () => {
    const query = normalize(search?.value.trim() || "");
    const isMapView = activeFilter === "archive";
    let visibleCount = 0;
    let matchedMapClusters = 0;

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

      if (isMapView) {
        return;
      } else if (query) {
        group.open = hasVisibleCards;
      } else if (activeFilter === "newcomers") {
        group.open = group.dataset.memberGroup === "newcomers";
      }
    });

    mapClusters.forEach((cluster) => {
      const matchesSearch = !query || normalize(cluster.textContent).includes(query);
      cluster.hidden = !matchesSearch;
      if (matchesSearch) matchedMapClusters += 1;

      cluster.querySelectorAll("[data-map-node]").forEach((node) => {
        const matchesNode = Boolean(query) && normalize(node.textContent).includes(query);
        node.classList.toggle("is-match", matchesNode);
        node.classList.toggle("is-dimmed", Boolean(query) && matchesSearch && !matchesNode);
      });
    });
    if (mapPanel) mapPanel.hidden = !isMapView;
    if (mapEmpty) mapEmpty.hidden = !isMapView || !query || matchedMapClusters > 0;

    if (emptyState) emptyState.hidden = isMapView || visibleCount !== 0;
    if (status) {
      if (isMapView) {
        status.textContent = query
          ? matchedMapClusters > 0
            ? `${matchedMapClusters} grupos do mapa correspondem à busca.`
            : "Nenhum ramo combina com essa busca."
          : "Mapa aberto. Linhas contínuas marcam vínculos confirmados; traços indicam dados em aberto; pontos mostram relações por definir.";
      } else {
        status.textContent = visibleCount === 0
          ? "Nenhum perfil encontrado. Ajuste a busca ou escolha outro filtro."
          : activeFilter === "all" && !query
            ? `${visibleCount} perfis no arquivo. Abra um grupo para explorar ou busque um nome.`
            : `Exibindo ${visibleCount} de ${cards.length} perfis.`;
      }
    }

    filters.forEach((button) => {
      const selected = button.dataset.memberFilter === activeFilter;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
      if (button.hasAttribute("aria-expanded")) {
        button.setAttribute("aria-expanded", String(selected));
      }
    });
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.memberFilter || "all";
      refresh();
    });
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
