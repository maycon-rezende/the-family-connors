(function () {
  'use strict';
  const video = document.querySelector('video');
  if (!video) return;
  const shell = video.closest('.video-shell');
  video.addEventListener('play', () => shell.classList.add('is-playing'));
  video.addEventListener('pause', () => shell.classList.remove('is-playing'));
  if (location.hash) {
    window.setTimeout(
      () =>
        document
          .querySelector(location.hash)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' }),
      250
    );
  }
})();
