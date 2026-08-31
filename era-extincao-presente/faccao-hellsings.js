(() => {
  const cursor = document.querySelector('.faction-cursor');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (cursor && matchMedia('(pointer:fine)').matches) {
    addEventListener(
      'pointermove',
      (event) => {
        cursor.style.opacity = '1';
        cursor.style.transform = `translate(${event.clientX}px,${event.clientY}px)`;
      },
      { passive: true }
    );
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );
  document.querySelectorAll('.reveal').forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 3, 2) * 0.12}s`;
    if (reduced) element.classList.add('is-visible');
    else observer.observe(element);
  });
})();
