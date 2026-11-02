(() => {
  const body = document.body;
  const header = document.querySelector('.world-nav');
  const toggle = document.querySelector('.world-menu-toggle');
  const menu = document.querySelector('.world-nav nav');
  const archiveDisclosure = menu?.querySelector('.world-nav-archive');
  const archivePanel = archiveDisclosure?.querySelector('.world-nav-archive__menu');

  if (!header || !toggle || !menu) return;

  menu.id = 'worldMenu';
  toggle.setAttribute('aria-controls', menu.id);

  const positionArchivePanel = () => {
    if (!archiveDisclosure?.open || !archivePanel?.classList.contains('is-portaled')) return;
    const triggerRect = archiveDisclosure.getBoundingClientRect();
    const panelWidth = archivePanel.getBoundingClientRect().width;
    const panelHeight = archivePanel.getBoundingClientRect().height;
    const maxLeft = Math.max(12, window.innerWidth - panelWidth - 12);
    const maxTop = Math.max(12, window.innerHeight - panelHeight - 12);
    archivePanel.style.left = `${Math.max(12, Math.min(triggerRect.right - panelWidth, maxLeft))}px`;
    archivePanel.style.top = `${Math.max(12, Math.min(triggerRect.bottom + 8, maxTop))}px`;
  };

  const showArchivePanel = () => {
    if (!archivePanel) return;
    document.body.appendChild(archivePanel);
    archivePanel.hidden = false;
    archivePanel.classList.add('is-portaled');
    header.classList.add('world-nav--archive-open');
    requestAnimationFrame(positionArchivePanel);
  };

  const hideArchivePanel = () => {
    if (!archivePanel || !archiveDisclosure) return;
    archivePanel.hidden = true;
    archivePanel.classList.remove('is-portaled');
    archivePanel.removeAttribute('style');
    archiveDisclosure.appendChild(archivePanel);
    header.classList.remove('world-nav--archive-open');
  };

  archiveDisclosure?.addEventListener('toggle', () => {
    if (archiveDisclosure.open) showArchivePanel();
    else hideArchivePanel();
  });

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu principal' : 'Abrir menu principal');
    menu.classList.toggle('is-open', open);
    body.classList.toggle('world-menu-open', open);
    if (!open) menu.querySelectorAll('details[open]').forEach((details) => { details.open = false; });
  };

  toggle.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('click', (event) => {
    if (!header.contains(event.target) && !archivePanel?.contains(event.target)) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const archiveWasOpen = Boolean(archiveDisclosure?.open);
      setOpen(false);
      if (archiveWasOpen) archiveDisclosure.querySelector('summary')?.focus();
      else toggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 950) setOpen(false);
    positionArchivePanel();
  }, { passive: true });
  window.addEventListener('scroll', positionArchivePanel, { passive: true, capture: true });
})();
