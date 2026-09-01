(() => {
  const body = document.body;
  if (!body.classList.contains('isolde-page')) return;

  const cursor = document.querySelector('.isolde-cursor');
  const heroImage = document.querySelector('.isolde-hero > img');
  const carousel = document.querySelector('[data-isolde-carousel]');
  const signalCard = document.querySelector('.isolde-signal-card');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  document.querySelectorAll('[data-isolde-letters]').forEach((title) => {
    const accessibleName = title.textContent.replace(/\s+/g, ' ').trim();
    const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let letterIndex = 0;

    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
      const fragment = document.createDocumentFragment();
      [...node.textContent].forEach((character) => {
        if (/\s/.test(character)) {
          fragment.append(character);
          return;
        }
        const letter = document.createElement('span');
        letter.className = 'isolde-letter';
        letter.textContent = character;
        letter.style.setProperty('--isolde-letter', letterIndex++);
        fragment.append(letter);
      });
      node.replaceWith(fragment);
    });

    title.setAttribute('aria-label', accessibleName);
  });

  const reveals = document.querySelectorAll(
    '[data-isolde-letters], .isolde-signal-card, .isolde-records > p, .isolde-carousel'
  );

  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((element) => element.classList.add('isolde-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('isolde-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14 });
    reveals.forEach((element) => observer.observe(element));
  }

  if (cursor && finePointer) {
    window.addEventListener('pointermove', (event) => {
      cursor.classList.add('is-visible');
      cursor.style.setProperty('--x', `${event.clientX}px`);
      cursor.style.setProperty('--y', `${event.clientY}px`);

      if (!reducedMotion && heroImage && event.clientY < window.innerHeight) {
        const horizontal = event.clientX / window.innerWidth - .5;
        heroImage.style.setProperty('--isolde-shift', `${horizontal * -9}px`);
      }
    }, { passive: true });

    document.querySelectorAll('a, button').forEach((element) => {
      element.addEventListener('pointerenter', () => cursor.classList.add('is-active'));
      element.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
    });
  }

  carousel?.addEventListener('isolde:slidechange', () => {
    if (!signalCard) return;
    signalCard.classList.remove('is-pulsing');
    void signalCard.offsetWidth;
    signalCard.classList.add('is-pulsing');
  });
})();
