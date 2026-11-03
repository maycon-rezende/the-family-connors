(() => {
  'use strict';
  const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
  const layer = document.createElement('div');
  layer.className = 'members-sandstorm';
  layer.setAttribute('aria-hidden', 'true');
  const gust = document.createElement('span');
  gust.className = 'members-sandstorm__gust';
  layer.appendChild(gust);
  document.body.appendChild(layer);
  if (motionPreference.matches) {
    layer.classList.add('members-sandstorm--still');
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.className = 'members-sandstorm__grains';
  layer.appendChild(canvas);
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) { layer.remove(); return; }

  const stormDuration = 6200;
  let width = 0, height = 0, ratio = 1, frame = 0, stopped = false;
  let started = performance.now(), previous = started, grains = [], streaks = [];
  const random = (min, max) => min + Math.random() * (max - min);
  const makeGrain = (initial) => ({
    x: random(-8, width + 8),
    y: initial ? random(-8, height + 8) : random(-height * .2, 0),
    radius: random(.45, 1.45), speed: random(8, 24), drift: random(-2, 8),
    alpha: random(.12, .38), phase: random(0, Math.PI * 2)
  });
  const makeStreak = (initial) => ({
    x: initial ? random(0, width) : random(width, width + 160),
    y: random(-30, height + 30), length: random(20, 105),
    speed: random(250, 780), drift: random(-34, 34),
    alpha: random(.12, .42), weight: random(.45, 1.2)
  });

  function resize() {
    width = innerWidth; height = innerHeight;
    ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    grains = Array.from({ length: Math.max(24, Math.min(110, Math.round(width * height / 14500))) }, () => makeGrain(true));
    streaks = Array.from({ length: Math.max(90, Math.min(270, Math.round(width * .18))) }, () => makeStreak(true));
  }
  function draw(now) {
    if (stopped || document.hidden) return;
    const delta = Math.min((now - previous) / 1000, .035);
    previous = now;
    const elapsed = now - started;
    ctx.clearRect(0, 0, width, height);
    for (const grain of grains) {
      grain.y += grain.speed * delta;
      grain.x += grain.drift * delta + Math.sin(elapsed * .0007 + grain.phase) * delta * 4;
      if (grain.y > height + 4) Object.assign(grain, makeGrain(false));
      if (grain.x < -8) grain.x = width + 4;
      if (grain.x > width + 8) grain.x = -4;
      ctx.beginPath();
      ctx.fillStyle = 'rgba(225, 183, 125, ' + grain.alpha + ')';
      ctx.arc(grain.x, grain.y, grain.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    if (elapsed < stormDuration) {
      const fade = 1 - elapsed / stormDuration;
      for (const streak of streaks) {
        streak.x -= streak.speed * delta;
        streak.y += streak.drift * delta;
        if (streak.x < -streak.length - 8) Object.assign(streak, makeStreak(false));
        ctx.beginPath();
        ctx.moveTo(streak.x, streak.y);
        ctx.lineTo(streak.x + streak.length, streak.y - streak.drift * .035);
        ctx.strokeStyle = 'rgba(239, 198, 145, ' + (streak.alpha * fade) + ')';
        ctx.lineWidth = streak.weight;
        ctx.stroke();
      }
    }
    frame = requestAnimationFrame(draw);
  }
  function start() {
    if (stopped || frame || document.hidden) return;
    previous = performance.now();
    frame = requestAnimationFrame(draw);
  }
  function visibilityChanged() {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
    else start();
  }
  function stop() {
    stopped = true;
    cancelAnimationFrame(frame);
    removeEventListener('resize', resize);
    document.removeEventListener('visibilitychange', visibilityChanged);
    layer.remove();
  }
  addEventListener('resize', resize, { passive: true });
  document.addEventListener('visibilitychange', visibilityChanged);
  motionPreference.addEventListener?.('change', (event) => { if (event.matches) stop(); });
  resize();
  start();
})();
