(() => {
  const body = document.body;
  if (!body.classList.contains('diana-page')) return;

  const cursor = document.querySelector('.diana-cursor');
  const target = document.querySelector('.diana-target');
  const heroImage = document.querySelector('.diana-hero > img');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  const wrapTextNode = (node, state) => {
    const fragment = document.createDocumentFragment();

    [...node.textContent].forEach((character) => {
      if (/\s/.test(character)) {
        fragment.append(character);
        return;
      }

      const letter = document.createElement('span');
      letter.className = 'diana-letter';
      letter.textContent = character;
      letter.style.setProperty('--diana-letter', state.index);
      state.index += 1;
      fragment.append(letter);
    });

    node.replaceWith(fragment);
  };

  document.querySelectorAll('[data-diana-letters]').forEach((title) => {
    const label = title.textContent.replace(/\s+/g, ' ').trim();
    const state = { index: 0 };
    const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
    const textNodes = [];

    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach((node) => wrapTextNode(node, state));
    title.setAttribute('aria-label', label);
  });

  const revealTargets = document.querySelectorAll(
    '[data-diana-letters], .diana-doctrine-copy, .diana-skills article, .diana-combat-carousel'
  );

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((element) => element.classList.add('diana-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('diana-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });

    revealTargets.forEach((element) => observer.observe(element));
  }

  if (cursor && finePointer) {
    window.addEventListener('pointermove', (event) => {
      cursor.classList.add('is-visible');
      cursor.style.setProperty('--cursor-x', `${event.clientX}px`);
      cursor.style.setProperty('--cursor-y', `${event.clientY}px`);

      if (!reducedMotion && target && heroImage && event.clientY < window.innerHeight) {
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        target.style.setProperty('--target-x', `${x * 16}px`);
        target.style.setProperty('--target-y', `${y * 12}px`);
        heroImage.style.setProperty('--image-shift-x', `${x * -8}px`);
        heroImage.style.setProperty('--image-shift-y', `${y * -5}px`);
      }
    }, { passive: true });

    document.querySelectorAll('a, button, .diana-skills article').forEach((element) => {
      element.addEventListener('pointerenter', () => cursor.classList.add('is-locked'));
      element.addEventListener('pointerleave', () => cursor.classList.remove('is-locked'));
    });

    document.documentElement.addEventListener('mouseleave', () => {
      cursor.classList.remove('is-visible');
    });
  }
})();
