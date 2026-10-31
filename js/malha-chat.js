(() => {
  const widget = document.querySelector('[data-malha-chat]');
  if (!widget) return;

  const launcher = widget.querySelector('[data-chat-launcher]');
  const panel = widget.querySelector('[data-chat-panel]');
  const closeButton = widget.querySelector('[data-chat-close]');
  const tabs = [...widget.querySelectorAll('[data-chat-tab]')];
  const threads = [...widget.querySelectorAll('[data-chat-thread]')];
  if (!launcher || !panel || !closeButton || tabs.length === 0 || threads.length === 0) return;

  const setOpen = (open, restoreFocus = false) => {
    panel.hidden = !open;
    launcher.setAttribute('aria-expanded', String(open));
    if (open) {
      const selectedTab = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || tabs[0];
      selectedTab.focus({ preventScroll: true });
    } else if (restoreFocus) {
      launcher.focus({ preventScroll: true });
    }
  };

  const activateTab = (selected, moveFocus = false) => {
    const channel = selected.dataset.chatTab;
    tabs.forEach((tab) => {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    threads.forEach((thread) => {
      thread.hidden = thread.dataset.chatThread !== channel;
    });
    if (moveFocus) selected.focus();
  };

  launcher.addEventListener('click', () => setOpen(panel.hidden));
  closeButton.addEventListener('click', () => setOpen(false, true));

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', (event) => {
      let nextIndex = index;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % tabs.length;
      else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      activateTab(tabs[nextIndex], true);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) setOpen(false, true);
  });

  document.addEventListener('pointerdown', (event) => {
    if (!panel.hidden && !widget.contains(event.target)) setOpen(false);
  });

  const menuObserver = new MutationObserver(() => {
    if (document.body.classList.contains('world-menu-open') && !panel.hidden) setOpen(false);
  });
  menuObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });
})();
