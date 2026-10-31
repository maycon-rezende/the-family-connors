(() => {
  const root = document.querySelector('[data-malha]');
  if (!root) return;

  const tabs = [...root.querySelectorAll('[data-malha-tab]')];
  const panels = [...root.querySelectorAll('[data-malha-panel]')];

  const activate = (tab, moveFocus = false) => {
    const channel = tab.dataset.malhaTab;

    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      item.classList.toggle('is-active', selected);
    });

    panels.forEach((panel) => {
      panel.hidden = panel.dataset.malhaPanel !== channel;
    });

    if (moveFocus) tab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      activate(tabs[nextIndex], true);
    });
  });
})();
