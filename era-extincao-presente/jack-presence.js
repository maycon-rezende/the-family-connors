(() => {
  'use strict';

  const audio = document.querySelector('[data-jack-theme]');
  const intro = document.querySelector('[data-jack-presence-intro]');
  if (!audio || !intro) return;

  const MUSIC_CUE_SECONDS = 14;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let sequenceStarted = false;
  intro.hidden = false;

  function syncPresenceToTrack() {
    if (audio.paused) return;
    const time = audio.currentTime;
    intro.classList.remove('is-capability-1', 'is-capability-2', 'is-capability-3', 'is-quote');

    if (time >= 12 && time < MUSIC_CUE_SECONDS) intro.classList.add('is-quote');
    else if (time >= 8) intro.classList.add('is-capability-3');
    else if (time >= 5) intro.classList.add('is-capability-2');
    else if (time >= 2) intro.classList.add('is-capability-1');

    if (sequenceStarted || time < MUSIC_CUE_SECONDS) return;
    sequenceStarted = true;
    intro.classList.add('is-name');

    window.setTimeout(() => intro.classList.add('is-portrait'), reducedMotion ? 40 : 2450);
    window.setTimeout(() => intro.classList.add('is-releasing'), reducedMotion ? 650 : 5200);
    window.setTimeout(() => {
      intro.hidden = true;
    }, reducedMotion ? 700 : 6700);
  }

  audio.addEventListener('timeupdate', syncPresenceToTrack);
  audio.addEventListener('playing', syncPresenceToTrack);
  audio.addEventListener('seeked', syncPresenceToTrack);
  syncPresenceToTrack();
})();
