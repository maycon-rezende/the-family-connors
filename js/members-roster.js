(() => {
  const directory = document.querySelector("#members-directory");
  if (!directory) return;

  const cards = Array.from(directory.querySelectorAll(".member-card"));
  const groups = Array.from(directory.querySelectorAll(".members-group"));
  const search = directory.querySelector("#memberSearch");
  const filters = Array.from(directory.querySelectorAll("[data-member-filter]"));
  const status = directory.querySelector("#memberFilterStatus");
  const emptyState = directory.querySelector(".members-empty");
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
    let visibleCount = 0;

    cards.forEach((card) => {
      const matchesGroup = activeFilter === "all" || cardGroup(card) === activeFilter;
      const matchesSearch = !query || normalize(card.textContent).includes(query);
      const isVisible = matchesGroup && matchesSearch;
      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    const hasScopedView = activeFilter !== "all" || Boolean(query);
    groups.forEach((group) => {
      const hasVisibleCards = Array.from(group.querySelectorAll(".member-card")).some((card) => !card.hidden);
      group.hidden = hasScopedView && !hasVisibleCards;

      if (query) {
        group.open = hasVisibleCards;
      } else if (activeFilter !== "all") {
        group.open = group.dataset.memberGroup === activeFilter;
      }
    });

    if (emptyState) emptyState.hidden = visibleCount !== 0;
    if (status) {
      status.textContent = visibleCount === 0
        ? "Nenhum perfil encontrado. Ajuste a busca ou escolha outro filtro."
        : activeFilter === "all" && !query
          ? `${visibleCount} perfis no arquivo. Abra um grupo para explorar ou busque um nome.`
          : `Exibindo ${visibleCount} de ${cards.length} perfis.`;
    }

    filters.forEach((button) => {
      const selected = button.dataset.memberFilter === activeFilter;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.memberFilter || "all";
      refresh();
    });
  });

  search?.addEventListener("input", refresh);
  refresh();
})();
