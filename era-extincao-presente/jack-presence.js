(() => {
  'use strict';

  const audio = document.querySelector('[data-jack-theme]');
  const intro = document.querySelector('[data-jack-presence-intro]');
  const video = intro?.querySelector('[data-jack-presence-video]');
  const documentRoot = document.documentElement;
  if (!audio || !intro || !video) {
    documentRoot.classList.remove('jack-opening-pending');
    return;
  }

  const MUSIC_CUE_SECONDS = 14;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let sequenceStarted = false;
  let videoStarted = false;
  let introReleased = false;
  let releaseFailsafe = 0;
  intro.hidden = false;
  video.muted = true;

  function releaseIntro() {
    if (introReleased) return;
    introReleased = true;
    if (releaseFailsafe) window.clearTimeout(releaseFailsafe);
    intro.classList.add('is-portrait', 'is-releasing');
    window.setTimeout(() => {
      video.pause();
      intro.hidden = true;
      documentRoot.classList.remove('jack-opening-pending');
    }, 1350);
  }

  function startPresence() {
    if (videoStarted) return;
    videoStarted = true;

    if (reducedMotion) {
      intro.classList.add('is-portrait');
      window.setTimeout(releaseIntro, 2600);
      return;
    }

    try {
      video.currentTime = 0;
    } catch (_) {
      // O vídeo pode ainda estar carregando; o poster mantém a abertura visível.
    }

    const playback = video.play();
    if (playback && typeof playback.catch === 'function') {
      playback.catch(() => {
        intro.classList.add('is-portrait');
        window.setTimeout(releaseIntro, 5200);
      });
    }

    window.setTimeout(() => {
      if (!introReleased) intro.classList.add('is-portrait');
    }, 2450);

    const duration = Number.isFinite(video.duration) && video.duration > 0
      ? video.duration * 1000 + 4000
      : 30000;
    releaseFailsafe = window.setTimeout(releaseIntro, duration);
  }

  function syncPresenceToTrack() {
    if (audio.paused) return;
    const time = audio.currentTime;
    intro.classList.remove('is-capability-1', 'is-capability-2', 'is-capability-3', 'is-quote');

    if (time >= 12 && time < MUSIC_CUE_SECONDS) intro.classList.add('is-quote');
    else if (time >= 8) intro.classList.add('is-capability-3');
    else if (time >= 5) intro.classList.add('is-capability-2');
    else if (time >= 2) intro.classList.add('is-capability-1');

    if (time < MUSIC_CUE_SECONDS) return;
    if (!sequenceStarted) {
      sequenceStarted = true;
      intro.classList.add('is-name');
      startPresence();
      return;
    }

    if (videoStarted && video.paused && !video.ended && !reducedMotion) {
      video.play().catch(() => {});
    }
  }

  audio.addEventListener('timeupdate', syncPresenceToTrack);
  audio.addEventListener('playing', syncPresenceToTrack);
  audio.addEventListener('seeked', syncPresenceToTrack);
  video.addEventListener('loadedmetadata', syncPresenceToTrack);
  video.addEventListener('ended', releaseIntro, { once: true });
  video.addEventListener('error', () => {
    if (sequenceStarted) releaseIntro();
  });
  audio.addEventListener('pause', () => video.pause());
  syncPresenceToTrack();
})();
