(() => {
  const video = document.querySelector('.memorial-brian-film video');
  if (!video) return;

  const keepSilent = () => {
    if (!video.muted || video.volume !== 0) {
      video.muted = true;
      video.volume = 0;
    }
  };

  keepSilent();
  video.addEventListener('volumechange', keepSilent);
})();
