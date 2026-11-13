(() => {
  'use strict';

  const body = document.body;
  if (!body?.classList.contains('bobby-page')) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const overlay = document.createElement('div');
  overlay.className = 'bobby-signal-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  body.append(overlay);

  if (reducedMotion.matches) return;

  let cycleTimer = 0;
  let pulseTimer = 0;

  function stopPulse() {
    window.clearTimeout(pulseTimer);
    body.classList.remove('bobby-signal-hit');
  }

  function schedulePulse(minDelay = 6500, maxDelay = 11800) {
    window.clearTimeout(cycleTimer);
    cycleTimer = window.setTimeout(triggerPulse, minDelay + Math.random() * (maxDelay - minDelay));
  }

  function triggerPulse() {
    if (document.hidden) return;

    overlay.style.setProperty('--bobby-band-y', `${14 + Math.random() * 70}%`);
    overlay.style.setProperty('--bobby-band-height', `${4 + Math.random() * 14}%`);
    overlay.style.setProperty('--bobby-band-shift', `${(Math.random() * 2 - 1).toFixed(2)}vw`);
    body.classList.add('bobby-signal-hit');
    pulseTimer = window.setTimeout(stopPulse, 540);
    schedulePulse();
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      window.clearTimeout(cycleTimer);
      stopPulse();
      return;
    }

    schedulePulse(1100, 2200);
  });

  schedulePulse(1800, 3200);
})();
