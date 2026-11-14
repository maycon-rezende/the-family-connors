(() => {
  'use strict';

  const body = document.body;
  const mode = body?.dataset.distortionMode;
  const presets = {
    jack: { min: 5200, max: 8700, duration: 430 },
    mark: { min: 7100, max: 10800, duration: 720 },
    alice: { min: 8200, max: 11800, duration: 880 },
    ariani: { min: 4600, max: 7600, duration: 540 },
    britney: { min: 5600, max: 9000, duration: 520 },
    jully: { min: 3900, max: 6800, duration: 650 },
    hellen: { min: 8500, max: 14200, duration: 760 },
  };
  const preset = presets[mode];

  if (!body || !preset) return;

  const screen = document.createElement('div');
  screen.className = 'hellsings-distortion-screen';
  screen.setAttribute('aria-hidden', 'true');
  body.prepend(screen);

  const titles = [...document.querySelectorAll('h1, [role="dialog"] h2, .jack-presence-intro h2')];
  titles.forEach((title) => title.classList.add('hellsings-distortion-title'));
  body.classList.add('hellsings-distortion-ready');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let cycleTimer = null;
  let pulseTimer = null;

  function clearPulse() {
    window.clearTimeout(pulseTimer);
    body.classList.remove('hellsings-distortion-active');
  }

  function scheduleNext(minimumDelay = preset.min, maximumDelay = preset.max) {
    window.clearTimeout(cycleTimer);
    const delay = minimumDelay + Math.random() * (maximumDelay - minimumDelay);
    cycleTimer = window.setTimeout(triggerDistortion, delay);
  }

  function triggerDistortion() {
    if (document.hidden) return;

    const y = 12 + Math.random() * 76;
    const height = 3 + Math.random() * 18;
    const shift = (Math.random() * 5 - 2.5).toFixed(2) + 'vw';
    screen.style.setProperty('--hd-y', y.toFixed(1) + '%');
    screen.style.setProperty('--hd-height', height.toFixed(1) + '%');
    screen.style.setProperty('--hd-shift', shift);

    body.classList.add('hellsings-distortion-active');
    pulseTimer = window.setTimeout(clearPulse, preset.duration);
    scheduleNext();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      window.clearTimeout(cycleTimer);
      clearPulse();
      return;
    }

    scheduleNext(900, 1800);
  });

  scheduleNext(1800, 3200);
})();
