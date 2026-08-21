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

  const symbols = document.createElement('div');
  symbols.className = 'clinical-symbols';
  symbols.setAttribute('aria-hidden', 'true');
  ['+','Rx','O₂','+','ECG','MD','+','A+','72','+'].forEach((label,index) => {
    const symbol = document.createElement('i');
    symbol.className = 'clinical-symbol';
    symbol.textContent = label;
    symbol.style.setProperty('--symbol-x', `${4 + (index * 29) % 92}%`);
    symbol.style.setProperty('--symbol-y', `${9 + (index * 37) % 84}%`);
    symbol.style.setProperty('--symbol-size', `${1.1 + (index % 4) * .55}rem`);
    symbol.style.setProperty('--symbol-speed', `${7 + index % 5 * 2}s`);
    symbol.style.setProperty('--symbol-delay', `${-index * 1.7}s`);
    symbols.appendChild(symbol);
  });
  document.body.prepend(symbols);

  const vitals = document.createElement('aside');
  vitals.className = 'alice-vitals';
  vitals.setAttribute('aria-label', 'Monitor clínico decorativo');
  vitals.innerHTML = '<div class="vitals-head"><span>AMC // MONITOR</span><i></i></div><div class="vitals-wave"></div><div class="vitals-data"><span><b data-vital="bpm">72</b>BPM</span><span><b data-vital="oxygen">98</b>O₂</span><span><b data-vital="temp">36.6</b>°C</span></div>';
  document.body.appendChild(vitals);

  const clinicalFocus = document.createElement('div');
  clinicalFocus.className = 'clinical-focus';
  clinicalFocus.setAttribute('aria-hidden', 'true');
  document.body.appendChild(clinicalFocus);
  document.addEventListener('pointermove', event => {
    clinicalFocus.style.left = `${event.clientX}px`;
    clinicalFocus.style.top = `${event.clientY}px`;
  }, { passive: true });
  document.querySelectorAll('.profile-card,.skill-item,.profession-panel').forEach(element => {
    element.addEventListener('pointerenter', () => clinicalFocus.classList.add('is-reading'));
    element.addEventListener('pointerleave', () => clinicalFocus.classList.remove('is-reading'));
  });

  document.querySelectorAll('.profile-card').forEach((card,index) => {
    card.dataset.clinicalId = String(index + 1).padStart(3, '0');
    card.addEventListener('pointerenter', () => card.classList.add('is-scanning'));
    card.addEventListener('pointerleave', () => card.classList.remove('is-scanning'));
  });

  let ticking = false;
  const updateScan = () => {
    const progress = window.scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
    ambient.style.setProperty('--alice-scan', `${10 + progress * 80}%`);
    const bpm = vitals.querySelector('[data-vital="bpm"]');
    const oxygen = vitals.querySelector('[data-vital="oxygen"]');
    bpm.textContent = String(Math.round(68 + progress * 12));
    oxygen.textContent = progress > .72 ? '97' : '98';
    vitals.classList.toggle('is-hidden', progress > .97);
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
