(() => {
  'use strict';

  const music = document.querySelector('[data-memorial-theme]');
  const farewellVideo = document.querySelector('#despedida-brian video');
  const dedication = document.querySelector('[data-memorial-dedication]');
  const enterMemorial = dedication?.querySelector('[data-memorial-enter]');
  const pageContent = document.querySelectorAll('.memorial-nav, main, .memorial-footer');
  const musicPositionKey = 'hellsings-memorial-theme-position';
  let dedicationTimer;

  const closeDedication = () => {
    if (!dedication || dedication.hidden || dedication.classList.contains('is-leaving')) return;
    window.clearTimeout(dedicationTimer);
    dedication.classList.add('is-leaving');
    document.body.classList.remove('memorial-intro-active');
    pageContent.forEach((element) => element.removeAttribute('inert'));
    document.removeEventListener('keydown', skipDedicationOnEscape);
    window.setTimeout(() => {
      dedication.hidden = true;
      dedication.classList.remove('is-visible', 'is-leaving');
      document.querySelector('.memorial-hero__link')?.focus({ preventScroll: true });
    }, 1000);
  };

  const skipDedicationOnEscape = (event) => {
    if (event.key === 'Escape') closeDedication();
    else if (event.key === 'Tab') {
      event.preventDefault();
      enterMemorial?.focus({ preventScroll: true });
    }
  };

  if (dedication) {
    dedication.hidden = false;
    dedication.classList.add('is-visible');
    document.body.classList.add('memorial-intro-active');
    pageContent.forEach((element) => element.setAttribute('inert', ''));
    enterMemorial?.focus({ preventScroll: true });
    enterMemorial?.addEventListener('click', closeDedication);
    document.addEventListener('keydown', skipDedicationOnEscape);
    dedicationTimer = window.setTimeout(closeDedication, 10500);
  }

  if (!music) return;

  const startMusic = () => {
    if (document.hidden || (farewellVideo && !farewellVideo.paused)) return;
    if (music.paused) music.play().catch(() => {});
  };

  let lastStoredPosition = 0;
  const storeMusicPosition = (force = false) => {
    const position = music.currentTime;
    if (!Number.isFinite(position) || position < 0) return;
    if (!force && Math.abs(position - lastStoredPosition) < 1) return;
    try {
      sessionStorage.setItem(musicPositionKey, String(position));
      lastStoredPosition = position;
    } catch {
      // A navegação continua funcionando mesmo se o navegador bloquear o armazenamento da sessão.
    }
  };

  const restoreMusicPosition = () => {
    let savedPosition = 0;
    try {
      savedPosition = Number(sessionStorage.getItem(musicPositionKey));
    } catch {
      return startMusic();
    }

    if (Number.isFinite(savedPosition) && savedPosition > 0) {
      const duration = music.duration;
      const position = Number.isFinite(duration) && duration > 0 ? savedPosition % duration : savedPosition;
      try {
        music.currentTime = position;
        lastStoredPosition = position;
      } catch {
        // O navegador restaura no início caso o formato não aceite busca precisa.
      }
    }
    startMusic();
  };

  if (music.readyState >= 1) restoreMusicPosition();
  else music.addEventListener('loadedmetadata', restoreMusicPosition, { once: true });

  music.addEventListener('timeupdate', () => storeMusicPosition());
  window.addEventListener('pagehide', () => storeMusicPosition(true));

  // Retenta após um gesto geral se o navegador bloquear autoplay com som.
  document.addEventListener('pointerdown', startMusic, { once: true, passive: true });
  document.addEventListener('touchstart', startMusic, { once: true, passive: true });
  document.addEventListener('keydown', startMusic, { once: true });

  farewellVideo?.addEventListener('play', () => music.pause());
  farewellVideo?.addEventListener('pause', startMusic);
  farewellVideo?.addEventListener('ended', startMusic);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      storeMusicPosition(true);
      music.pause();
    }
    else startMusic();
  });
})();
