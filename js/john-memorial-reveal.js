(() => {
  const section = document.querySelector('[data-john-arrival]');
  const card = section?.querySelector('[data-john-arrival-card]');
  if (!section || !card) return;

  const showImmediately = () => {
    section.classList.remove('has-sequence', 'is-revealed');
    card.removeAttribute('inert');
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    showImmediately();
    return;
  }

  section.classList.add('has-sequence');
  card.setAttribute('inert', '');
  const reveal = () => {
    section.classList.add('is-revealed');
    window.setTimeout(showImmediately, 5200);
  };

  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    reveal();
    observer.disconnect();
  }, { threshold: 0.25 });

  observer.observe(section);
})();
