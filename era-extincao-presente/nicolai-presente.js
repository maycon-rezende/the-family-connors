(() => {
  const carousel = document.querySelector('[data-nicolai-carousel]');
  const slides = [...document.querySelectorAll('[data-nicolai-slide]')];
  const current = document.querySelector('[data-nicolai-current]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let timer;
  let touchX = 0;

  const show = (value) => {
    index = (value + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    if (current) current.textContent = String(index + 1).padStart(2, '0');
  };
  const stop = () => clearInterval(timer);
  const play = () => {
    stop();
    if (!reduced.matches) timer = setInterval(() => show(index + 1), 5600);
  };
  const move = (step) => { show(index + step); play(); };

  document.querySelector('[data-nicolai-prev]')?.addEventListener('click', () => move(-1));
  document.querySelector('[data-nicolai-next]')?.addEventListener('click', () => move(1));
  carousel?.addEventListener('touchstart', (event) => { touchX = event.changedTouches[0].clientX; }, { passive: true });
  carousel?.addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].clientX - touchX;
    if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
  }, { passive: true });
  carousel?.addEventListener('mouseenter', stop);
  carousel?.addEventListener('mouseleave', play);
  carousel?.addEventListener('focusin', stop);
  carousel?.addEventListener('focusout', play);
  show(0);
  play();

  const prose = [...document.querySelectorAll('.nicolai-hero .child-copy > p, .nicolai-profile p, .nicolai-profile blockquote, .nicolai-records > p, .nicolai-video-copy p')];
  prose.forEach((paragraph) => {
    paragraph.classList.add('nicolai-prose');
    const walker = document.createTreeWalker(paragraph, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    let wordIndex = 0;
    textNodes.forEach((textNode) => {
      const fragment = document.createDocumentFragment();
      textNode.nodeValue.split(/(\s+)/).forEach((part) => {
        if (!part || /^\s+$/.test(part)) {
          fragment.append(part);
          return;
        }
        const word = document.createElement('span');
        word.className = 'nicolai-word';
        word.style.setProperty('--word', wordIndex++);
        word.textContent = part;
        fragment.append(word);
      });
      textNode.replaceWith(fragment);
    });
  });

  if ('IntersectionObserver' in window && !reduced.matches) {
    const proseObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-reading');
      proseObserver.unobserve(entry.target);
    }), { threshold: .28 });
    prose.forEach((paragraph) => proseObserver.observe(paragraph));
  } else {
    prose.forEach((paragraph) => paragraph.classList.add('is-reading'));
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), { threshold: .1 });
    document.querySelectorAll('[data-nicolai-reveal]').forEach((node) => observer.observe(node));
  } else {
    document.querySelectorAll('[data-nicolai-reveal]').forEach((node) => node.classList.add('is-visible'));
  }

  const livingCopy = [...document.querySelectorAll('.nicolai-origin-grid article, .nicolai-video-copy p')];
  livingCopy.forEach((node, nodeIndex) => {
    window.setTimeout(() => {
      node.classList.add('is-lit');
      window.setTimeout(() => node.classList.remove('is-lit'), 1400);
    }, 650 + nodeIndex * 380);
  });

  const terminal = document.querySelector('[data-nicolai-video]');
  const video = terminal?.querySelector('video');
  const state = terminal?.querySelector('[data-video-state]');
  video?.addEventListener('play', () => {
    stop(); terminal.classList.add('is-playing');
    if (state) state.textContent = 'REPRODUZINDO';
  });
  video?.addEventListener('pause', () => {
    terminal.classList.remove('is-playing');
    if (state) state.textContent = 'PAUSADO';
    play();
  });
  video?.addEventListener('ended', () => {
    if (state) state.textContent = 'ENCERRADO';
    play();
  });

  const cursor = document.querySelector('.nicolai-cursor');
  if (!cursor) return;
  window.addEventListener('pointermove', (event) => {
    if (event.pointerType && event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
    document.documentElement.classList.add('has-nicolai-cursor');
    cursor.classList.add('is-visible');
    cursor.style.transform = `translate3d(${event.clientX - 21}px,${event.clientY - 21}px,0)`;
    cursor.classList.toggle('is-target', Boolean(event.target.closest('a,button,video')));
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => cursor.classList.remove('is-visible'));
})();
