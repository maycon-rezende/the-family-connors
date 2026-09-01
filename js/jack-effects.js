(function () {
  'use strict';
  const hero = document.getElementById('hero');
  const title = hero?.querySelector('.hero-name');
  const embers = hero?.querySelector('.jack-embers');
  if (!hero || !title || !embers) return;
  const lines = ['JACK', 'CONNOR'];
  title.innerHTML = lines
    .map(
      (line, lineIndex) =>
        `<span class="jack-title-line jack-title-line--${lineIndex + 1}">${Array.from(line)
          .map(
            (letter, index) =>
              `<span class="jack-letter" style="--letter:${lineIndex * 4 + index}" aria-hidden="true">${letter}</span>`
          )
          .join('')}</span>`
    )
    .join('');
  for (let index = 0; index < 34; index += 1) {
    const ember = document.createElement('i');
    ember.style.setProperty('--x', Math.random() * 100 + '%');
    ember.style.setProperty('--size', 1 + Math.random() * 2.8 + 'px');
    ember.style.setProperty('--duration', 9 + Math.random() * 13 + 's');
    ember.style.setProperty('--delay', -Math.random() * 16 + 's');
    ember.style.setProperty('--drift', -35 + Math.random() * 70 + 'px');
    ember.style.setProperty('--opacity', 0.16 + Math.random() * 0.4);
    embers.appendChild(ember);
  }

  const photos = Array.from(document.querySelectorAll('.case-photo'));
  const filters = document.querySelectorAll('.case-filter');
  const lightbox = document.getElementById('case-lightbox');
  if (photos.length) {
    const photoObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry, index) => {
          if (!entry.isIntersecting) return;
          setTimeout(() => entry.target.classList.add('is-visible'), index * 55);
          photoObserver.unobserve(entry.target);
        }),
      { threshold: 0.08 }
    );
    photos.forEach((photo) => photoObserver.observe(photo));
    filters.forEach((filter) =>
      filter.addEventListener('click', () => {
        filters.forEach((item) => item.classList.toggle('active', item === filter));
        const group = filter.dataset.filter;
        photos.forEach((photo) =>
          photo.classList.toggle(
            'is-filtered',
            group !== 'all' && photo.dataset.caseGroup !== group
          )
        );
      })
    );
  }
  if (lightbox) {
    const image = lightbox.querySelector('img'),
      heading = lightbox.querySelector('strong'),
      closeButton = lightbox.querySelector('.case-lightbox-close');
    let lastTrigger;
    const close = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('case-lightbox-open');
      lastTrigger?.focus();
    };
    photos.forEach((photo) =>
      photo.addEventListener('click', () => {
        lastTrigger = photo;
        image.src = photo.dataset.caseFile;
        image.alt = photo.querySelector('img').alt;
        heading.textContent = photo.dataset.caseTitle;
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('case-lightbox-open');
        closeButton.focus();
      })
    );
    closeButton.addEventListener('click', close);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) close();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('open')) close();
    });
  }
})();
