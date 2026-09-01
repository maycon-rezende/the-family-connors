(() => {
  const tabs = [...document.querySelectorAll('.journey-tab')];
  const pages = [...document.querySelectorAll('.journey-page')];
  tabs.forEach((tab) =>
    tab.addEventListener('click', () => {
      const target = tab.dataset.journey;
      tabs.forEach((item) => {
        const selected = item === tab;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-selected', String(selected));
      });
      pages.forEach((page) => {
        const selected = page.dataset.page === target;
        page.hidden = !selected;
        page.classList.toggle('active', selected);
      });
    })
  );

  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && innerWidth > 760) {
    const journey = document.querySelector('.britney-journey');
    let last = 0;
    journey?.addEventListener('pointermove', (event) => {
      if (Date.now() - last < 90) return;
      last = Date.now();
      const mote = document.createElement('i');
      mote.className = 'britney-mote';
      mote.style.left = `${event.clientX}px`;
      mote.style.top = `${event.clientY}px`;
      mote.style.animationDuration = `${1.5 + Math.random()}s`;
      document.body.appendChild(mote);
      mote.addEventListener('animationend', () => mote.remove());
    });
  }

  const audio = document.querySelector('#britney-audio');
  const musicButton = document.querySelector('.music-control');
  const equalizer = document.querySelector('.equalizer');
  const syncMusicUI = () => {
    const playing = audio && !audio.paused;
    musicButton?.setAttribute('aria-pressed', String(playing));
    if (musicButton) musicButton.querySelector('span').textContent = playing ? '❚❚' : '▶';
    equalizer?.classList.toggle('paused', !playing);
  };
  musicButton?.addEventListener('click', async () => {
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch (_) {
        /* o navegador pode exigir interação */
      }
    } else {
      audio.pause();
    }
    syncMusicUI();
  });
  audio?.addEventListener('play', syncMusicUI);
  audio?.addEventListener('pause', syncMusicUI);
  syncMusicUI();

  if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-3px)`;
      });
      card.addEventListener('pointerleave', () => {
        card.style.transform = '';
      });
    });
  }
})();
