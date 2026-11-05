(() => {
  'use strict';

  const audio = document.querySelector('[data-jack-theme]');
  if (!audio) return;

  const startMusic = () => {
    if (audio.paused) audio.play().catch(() => {});
  };

  startMusic();

  // Tenta de novo no primeiro gesto geral se o navegador bloquear autoplay com som.
  document.addEventListener('pointerdown', startMusic, { once: true, passive: true });
  document.addEventListener('touchstart', startMusic, { once: true, passive: true });
  document.addEventListener('keydown', startMusic, { once: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) audio.pause();
    else startMusic();
  });
})();
