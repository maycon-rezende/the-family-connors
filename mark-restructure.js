(function () {
  'use strict';
  const root = document.querySelector('.naval-command');
  if (!root) return;
  const tabs = [...root.querySelectorAll('.operations-tab')],
    panels = [...root.querySelectorAll('.operation-panel')];
  function activate(name, focus = false) {
    tabs.forEach((tab) => {
      const active = tab.dataset.operation === name;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focus) tab.focus();
    });
    panels.forEach((panel) => {
      const active = panel.id === `operation-${name}`;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab.dataset.operation));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const next = (index + direction + tabs.length) % tabs.length;
      activate(tabs[next].dataset.operation, true);
    });
  });
  activate('navy');
})();
