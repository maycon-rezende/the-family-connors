(() => {
  const portal = document.querySelector('.hellsings-portal');
  if (!portal || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  portal.addEventListener('pointermove', (event) => {
    const rect = portal.getBoundingClientRect();
    portal.style.setProperty('--portal-x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
    portal.style.setProperty('--portal-y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
  });
  portal.addEventListener('pointerleave', () => {
    portal.style.setProperty('--portal-x', '50%');
    portal.style.setProperty('--portal-y', '50%');
  });
})();
