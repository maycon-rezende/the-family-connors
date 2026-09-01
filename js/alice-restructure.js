(function () {
  'use strict';
  const root = document.querySelector('.alice-profession');
  if (!root) return;
  const tabs = [...root.querySelectorAll('.profession-tab')],
    panels = [...root.querySelectorAll('.profession-panel')];
  function activate(name, focus = false) {
    tabs.forEach((tab) => {
      const active = tab.dataset.profession === name;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focus) tab.focus();
    });
    panels.forEach((panel) => {
      const active = panel.id === `profession-${name}`;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab.dataset.profession));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      const next = (index + direction + tabs.length) % tabs.length;
      activate(tabs[next].dataset.profession, true);
    });
  });
  activate('london');
})();
