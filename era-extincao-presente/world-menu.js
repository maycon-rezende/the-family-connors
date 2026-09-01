(() => {
  const body = document.body;
  const header = document.querySelector('.world-nav');
  const toggle = document.querySelector('.world-menu-toggle');
  const menu = document.querySelector('.world-nav nav');

  if (!header || !toggle || !menu) return;

  menu.id = 'worldMenu';
  toggle.setAttribute('aria-controls', menu.id);

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('is-open', open);
    body.classList.toggle('world-menu-open', open);
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
    if (!header.contains(event.target)) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setOpen(false);
      toggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 950) setOpen(false);
  }, { passive: true });
})();
