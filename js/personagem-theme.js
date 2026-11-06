(() => {
  const audio = document.querySelector('[data-character-theme]');
  if (!audio) return;

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
  startPlayback();
})();
