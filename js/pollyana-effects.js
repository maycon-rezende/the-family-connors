(() => {
  const carousel = document.querySelector('[data-pollyana-carousel]');
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('[data-pollyana-slide]')];
  const previous = carousel.querySelector('[data-pollyana-prev]');
  const next = carousel.querySelector('[data-pollyana-next]');
  const current = carousel.querySelector('[data-pollyana-current]');
  const cursor = document.querySelector('.pollyana-cursor');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let timer;
  let touchStart = 0;

  document.querySelectorAll('[data-pollyana-letters]').forEach((title) => {
    const label = title.textContent.replace(/\s+/g, ' ').trim();
    const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
    const nodes = [];
    let count = 0;
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const fragment = document.createDocumentFragment();
      [...node.textContent].forEach((character) => {
        if (/\s/.test(character)) return fragment.append(character);
        const letter = document.createElement('span');
        letter.className = 'pollyana-letter';
        letter.textContent = character;
        letter.style.setProperty('--letter', count++);
        fragment.append(letter);
      });
      node.replaceWith(fragment);
    });
    title.setAttribute('aria-label', label);
  });

  const show = (newIndex) => {
    index = (newIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    current.textContent = String(index + 1).padStart(2, '0');
    carousel.classList.remove('is-switching');
    void carousel.offsetWidth;
    carousel.classList.add('is-switching');
  };

  const stop = () => window.clearInterval(timer);
  const play = () => {
    stop();
    if (!reduced.matches) timer = window.setInterval(() => show(index + 1), 5400);
  };
  const move = (direction) => { show(index + direction); play(); };

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', play);
  carousel.addEventListener('touchstart', (event) => { touchStart = event.changedTouches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
  }, { passive: true });

  const reveals = document.querySelectorAll('[data-pollyana-letters], .pollyana-lineage-data, .pollyana-records > p, .pollyana-carousel');
  if (reduced.matches || !('IntersectionObserver' in window)) {
    reveals.forEach((element) => element.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: .15 });
    reveals.forEach((element) => observer.observe(element));
  }

  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('pointermove', (event) => {
      cursor.classList.add('is-visible');
      cursor.style.setProperty('--x', `${event.clientX}px`);
      cursor.style.setProperty('--y', `${event.clientY}px`);
    }, { passive: true });
    document.querySelectorAll('a, button').forEach((element) => {
      element.addEventListener('pointerenter', () => cursor.classList.add('is-active'));
      element.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
    });
  }

  reduced.addEventListener?.('change', play);
  show(0);
  play();
})();
