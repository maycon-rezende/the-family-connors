(() => {
  const audio = document.querySelector('[data-character-theme]');
  if (!audio) return;
  const positionKey = audio.dataset.themePositionKey;

  // Tenta começar junto com a página, sem acrescentar controles visíveis.
  const retryEvents = ['pointerdown', 'keydown', 'touchstart'];
  const removeRetryListeners = () => {
    retryEvents.forEach((eventName) => {
      window.removeEventListener(eventName, startPlayback);
    });
  };

  const startPlayback = () => {
    if (!audio.paused) {
      removeRetryListeners();
      return;
    }

    const attempt = audio.play();
    if (attempt && typeof attempt.then === 'function') {
      attempt.then(removeRetryListeners).catch(() => {
        // Navegadores podem exigir uma interação antes de liberar áudio com som.
      });
    }
  };

  retryEvents.forEach((eventName) => {
    window.addEventListener(eventName, startPlayback, { once: true, passive: true });
  });
  audio.addEventListener('playing', removeRetryListeners, { once: true });

  if (!positionKey) {
    startPlayback();
    return;
  }

  let lastStoredPosition = 0;
  const storePosition = (force = false) => {
    const position = audio.currentTime;
    if (!Number.isFinite(position) || position < 0) return;
    if (!force && Math.abs(position - lastStoredPosition) < 1.5) return;
    try {
      sessionStorage.setItem(positionKey, String(position));
      lastStoredPosition = position;
    } catch {
      // The page can still play if session storage is unavailable.
    }
  };

  const restorePositionAndPlay = () => {
    try {
      const savedPosition = Number(sessionStorage.getItem(positionKey));
      if (Number.isFinite(savedPosition) && savedPosition > 0) {
        const duration = audio.duration;
        const position = Number.isFinite(duration) && duration > 0
          ? savedPosition % duration
          : savedPosition;
        audio.currentTime = position;
        lastStoredPosition = position;
      }
    } catch {
      // Start from the beginning if stored playback position cannot be read.
    }
    startPlayback();
  };

  if (audio.readyState >= 1) restorePositionAndPlay();
  else audio.addEventListener('loadedmetadata', restorePositionAndPlay, { once: true });

  audio.addEventListener('timeupdate', () => storePosition());
  window.addEventListener('pagehide', () => storePosition(true));
})();
