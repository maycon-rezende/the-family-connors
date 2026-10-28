(() => {
  const carousel = document.querySelector('[data-pollyana-carousel]');
  const cursor = document.querySelector('.pollyana-cursor');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.body.classList.add('is-enhanced');

  document.querySelectorAll('[data-pollyana-letters]').forEach((title) => {
    const label = title.innerText.replace(/\s+/g, ' ').trim();
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

  const reveals = document.querySelectorAll('[data-pollyana-letters], .pollyana-lineage-data, .pollyana-identity__heading, .pollyana-identity__facts, .pollyana-twin__photo, .pollyana-twin__copy, .pollyana-album > div, .pollyana-records > p, .pollyana-carousel');
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
      if (event.pointerType === 'touch' || reduced.matches) {
        cursor.classList.remove('is-visible');
        return;
      }
      cursor.classList.add('is-visible');
      cursor.style.setProperty('--x', `${event.clientX}px`);
      cursor.style.setProperty('--y', `${event.clientY}px`);
    }, { passive: true });
    document.querySelectorAll('a, button').forEach((element) => {
      element.addEventListener('pointerenter', () => cursor.classList.add('is-active'));
      element.addEventListener('pointerleave', () => cursor.classList.remove('is-active'));
    });
    window.addEventListener('blur', () => cursor.classList.remove('is-visible'));
    document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
  }

  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('[data-pollyana-slide]')];
  const thumbnails = [...carousel.querySelectorAll('[data-pollyana-thumb]')];
  const previous = carousel.querySelector('[data-pollyana-prev]');
  const next = carousel.querySelector('[data-pollyana-next]');
  const current = carousel.querySelector('[data-pollyana-current]');
  const total = carousel.querySelector('[data-pollyana-total]');
  if (!slides.length || !previous || !next || !current) return;
  let index = 0;
  let touchStart = 0;
  if (total) total.textContent = String(slides.length).padStart(2, '0');

  const show = (newIndex, animate = true) => {
    index = (newIndex + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === index;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    thumbnails.forEach((thumbnail, thumbnailIndex) => {
      thumbnail.setAttribute('aria-pressed', String(thumbnailIndex === index));
    });
    current.textContent = String(index + 1).padStart(2, '0');
    carousel.classList.remove('is-switching');
    if (animate && !reduced.matches) {
      void carousel.offsetWidth;
      carousel.classList.add('is-switching');
    }
  };

  const move = (direction) => show(index + direction);

  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  thumbnails.forEach((thumbnail, thumbnailIndex) => {
    thumbnail.addEventListener('click', () => {
      show(thumbnailIndex);
    });
  });
  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  carousel.addEventListener('touchstart', (event) => { touchStart = event.changedTouches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', (event) => {
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
  }, { passive: true });

  const expand = carousel.querySelector('[data-pollyana-expand]');
  const dialog = document.querySelector('[data-pollyana-dialog]');
  const dialogImage = dialog?.querySelector('[data-pollyana-dialog-image]');
  const dialogCaption = dialog?.querySelector('[data-pollyana-dialog-caption]');
  if (expand && dialog && dialogImage && dialogCaption) {
    expand.addEventListener('click', () => {
      const image = slides[index].querySelector('img');
      const caption = slides[index].querySelector('figcaption');
      dialogImage.src = image.getAttribute('src');
      dialogImage.alt = image.alt;
      dialogCaption.textContent = caption?.textContent.replace(/\s+/g, ' ').trim() || '';
      dialog.showModal();
    });
    dialog.querySelector('[data-pollyana-close]')?.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  }

  reduced.addEventListener?.('change', () => {
    if (reduced.matches) cursor?.classList.remove('is-visible');
    show(index, false);
  });
  show(0, false);
})();
