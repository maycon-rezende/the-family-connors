(() => {
  const cursor = document.querySelector('.fire-cursor');
  if (cursor && matchMedia('(pointer: fine)').matches) {
    addEventListener('pointermove', ({ clientX, clientY }) => {
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
    });
    document.querySelectorAll('a, button, .commander, .conflict-card').forEach((item) => {
      item.addEventListener('pointerenter', () => cursor.classList.add('active'));
      item.addEventListener('pointerleave', () => cursor.classList.remove('active'));
    });
  }

  const targets = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    targets.forEach((target) => target.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  targets.forEach((target, index) => {
    target.style.transitionDelay = `${(index % 4) * 80}ms`;
    observer.observe(target);
  });
})();
