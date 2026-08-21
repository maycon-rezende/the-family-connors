(() => {
  document.body.classList.add('alice-clinical');

  const ambient = document.createElement('div');
  ambient.className = 'alice-ambient';
  ambient.setAttribute('aria-hidden', 'true');
  document.body.prepend(ambient);

  const microbes = document.createElement('div');
  microbes.className = 'alice-microbes';
  microbes.setAttribute('aria-hidden', 'true');
  for (let index = 0; index < 16; index += 1) {
    const particle = document.createElement('i');
    particle.className = 'alice-microbe';
    particle.style.setProperty('--x', `${(index * 37) % 101}%`);
    particle.style.setProperty('--s', `${8 + (index % 5) * 5}px`);
    particle.style.setProperty('--d', `${16 + (index % 7) * 3}s`);
    particle.style.setProperty('--delay', `${-(index * 2.7)}s`);
    microbes.appendChild(particle);
  }
  document.body.prepend(microbes);

  let ticking = false;
  const updateScan = () => {
    const progress = window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
    ambient.style.setProperty('--alice-scan', `${10 + progress * 80}%`);
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScan);
      ticking = true;
    }
  }, { passive: true });
  updateScan();

  const lightbox = document.createElement('div');
  lightbox.className = 'alice-lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Visualização do arquivo de Alice');
  lightbox.innerHTML = `
    <div class="alice-lightbox__frame">
      <button class="alice-lightbox__close" type="button" aria-label="Fechar registro">×</button>
      <img class="alice-lightbox__image" alt="">
      <div class="alice-lightbox__info"><strong></strong><span></span></div>
    </div>`;
  document.body.appendChild(lightbox);

  const fullImage = lightbox.querySelector('.alice-lightbox__image');
  const title = lightbox.querySelector('strong');
  const note = lightbox.querySelector('.alice-lightbox__info span');
  const closeButton = lightbox.querySelector('.alice-lightbox__close');
  let lastTrigger = null;

  const close = () => {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('alice-lightbox-open');
    setTimeout(() => { fullImage.src = ''; }, 300);
    lastTrigger?.focus();
  };
  document.querySelectorAll('.alice-photo').forEach((photo) => {
    photo.addEventListener('click', () => {
      lastTrigger = photo;
      fullImage.src = photo.dataset.full;
      fullImage.alt = photo.querySelector('img').alt;
      title.textContent = photo.dataset.title;
      note.textContent = photo.dataset.note;
      lightbox.classList.add('is-open');
      document.body.classList.add('alice-lightbox-open');
      closeButton.focus();
    });
  });
  closeButton.addEventListener('click', close);
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) close(); });
  addEventListener('keydown', (event) => { if (event.key === 'Escape' && lightbox.classList.contains('is-open')) close(); });
})();
