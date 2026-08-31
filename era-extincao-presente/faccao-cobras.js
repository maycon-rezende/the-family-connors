(() => {
  const cursor = document.querySelector('.cobra-cursor');
  if (cursor && matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', ({ clientX, clientY }) => {
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
    });
    document.querySelectorAll('a, button, .leader-card, .relation-card').forEach((target) => {
      target.addEventListener('pointerenter', () => cursor.classList.add('is-active'));
      target.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
    });
  }

  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
    observer.observe(item);
  });
})();
