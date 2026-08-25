(() => {
  const items = document.querySelectorAll('.bunker-reveal');
  const entry = document.querySelector('.bunker-entry');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entryItem) => {
        if (!entryItem.isIntersecting) return;
        entryItem.target.classList.add('is-visible');
        observer.unobserve(entryItem.target);
      }),
    { threshold: 0.12, rootMargin: '0px 0px -8%' }
  );
  items.forEach((item) => observer.observe(item));

  let ticking = false;
  const moveBunker = () => {
    ticking = false;
    if (!entry) return;
    const rect = entry.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > innerHeight) return;
    const progress = (innerHeight - rect.top) / (innerHeight + rect.height);
    entry.style.setProperty('--bunker-shift', `${(progress - 0.5) * 24}px`);
  };
  addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(moveBunker);
    },
    { passive: true }
  );
  moveBunker();
})();
