(() => {
  'use strict';

  const music = document.querySelector('[data-memorial-theme]');
  const farewellVideo = document.querySelector('#despedida-brian video');
  if (!music) return;

  const startMusic = () => {
    if (document.hidden || (farewellVideo && !farewellVideo.paused)) return;
    if (music.paused) music.play().catch(() => {});
  };

  startMusic();

  // Retenta após um gesto geral se o navegador bloquear autoplay com som.
  document.addEventListener('pointerdown', startMusic, { once: true, passive: true });
  document.addEventListener('touchstart', startMusic, { once: true, passive: true });
  document.addEventListener('keydown', startMusic, { once: true });

  farewellVideo?.addEventListener('play', () => music.pause());
  farewellVideo?.addEventListener('pause', startMusic);
  farewellVideo?.addEventListener('ended', startMusic);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) music.pause();
    else startMusic();
  });
})();
