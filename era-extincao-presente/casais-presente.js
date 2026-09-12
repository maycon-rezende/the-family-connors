(() => {
  const revealNodes = document.querySelectorAll('[data-bond-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), { threshold: .08 });
    revealNodes.forEach((node) => observer.observe(node));
  } else revealNodes.forEach((node) => node.classList.add('is-visible'));

  const lightbox = document.querySelector('[data-bond-lightbox]');
  const lightboxImage = lightbox?.querySelector('img');
  const close = () => {
    lightbox?.classList.remove('is-open');
    lightbox?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('[data-bond-image]').forEach((card) => card.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = card.dataset.bondImage;
    lightboxImage.alt = card.querySelector('img')?.alt || 'Registro ampliado do casal';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }));
  document.querySelector('[data-bond-close]')?.addEventListener('click', close);
  lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) close(); });
  addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });

  const cursor = document.querySelector('.bonds-cursor');
  addEventListener('pointermove', (event) => {
    if (!cursor || (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen')) return;
    document.documentElement.classList.add('has-bonds-cursor');
    cursor.classList.add('is-visible');
    cursor.style.transform = `translate3d(${event.clientX - 21}px,${event.clientY - 21}px,0)`;
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => cursor?.classList.remove('is-visible'));
})();
