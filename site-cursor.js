(() => {
  'use strict';
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const core = document.createElement('span');
  const ring = document.createElement('span');
  core.className = 'connor-cursor-core';
  ring.className = 'connor-cursor-ring';
  document.body.append(core, ring);
  root.classList.add('connor-cursor-enabled');

  let targetX = innerWidth / 2;
  let targetY = innerHeight / 2;
  let ringX = targetX;
  let ringY = targetY;
  let lastX = targetX;
  let lastY = targetY;
  let lastTime = 0;
  let visible = false;

  const topLayer = () => [...document.querySelectorAll('dialog[open]')].at(-1) || document.body;

  const syncCursorLayer = () => {
    const host = topLayer();
    if (core.parentElement !== host) host.append(core, ring);
  };

  const particleHost = () => topLayer();

  function dust(x, y) {
    if (reduced) return;
    const now = performance.now();
    if (Math.hypot(x - lastX, y - lastY) < 13 || now - lastTime < 28) return;
    lastX = x;
    lastY = y;
    lastTime = now;
    const mote = document.createElement('i');
    mote.className = 'connor-cursor-dust';
    mote.style.left = `${x}px`;
    mote.style.top = `${y}px`;
    mote.style.setProperty('--size', `${1.5 + Math.random() * 3}px`);
    mote.style.setProperty('--alpha', .28 + Math.random() * .42);
    mote.style.setProperty('--life', `${520 + Math.random() * 420}ms`);
    mote.style.setProperty('--drift-x', `${-14 + Math.random() * 28}px`);
    mote.style.setProperty('--drift-y', `${12 + Math.random() * 25}px`);
    particleHost().appendChild(mote);
    mote.addEventListener('animationend', () => mote.remove(), {once:true});
  }

  function animate() {
    const ease = reduced ? 1 : .16;
    ringX += (targetX - ringX) * ease;
    ringY += (targetY - ringY) * ease;
    core.style.transform = `translate3d(${targetX}px,${targetY}px,0)`;
    ring.style.transform = `translate3d(${ringX}px,${ringY}px,0)${ring.classList.contains('is-view') ? ' rotate(45deg)' : ''}`;
    requestAnimationFrame(animate);
  }

  document.addEventListener('pointermove', event => {
    syncCursorLayer();
    targetX = event.clientX;
    targetY = event.clientY;
    if (!visible) {
      visible = true;
      core.classList.add('is-visible');
      ring.classList.add('is-visible');
    }
    dust(targetX, targetY);
  }, {passive:true});

  document.addEventListener('pointerover', event => {
    const interactive = event.target.closest('a,button,input,textarea,select,[role="button"],.member-card,.memory-card,.lineage-person,.gallery-item,.memory');
    const visual = event.target.closest('img,.memory-card,.lineage-person,.gallery-item,.memory');
    core.classList.toggle('is-interactive', Boolean(interactive));
    ring.classList.toggle('is-interactive', Boolean(interactive));
    ring.classList.toggle('is-view', Boolean(visual));
  });

  document.addEventListener('pointerdown', () => ring.classList.add('is-down'));
  document.addEventListener('pointerup', event => {
    ring.classList.remove('is-down');
    if (reduced) return;
    const impact = document.createElement('i');
    impact.className = 'connor-cursor-impact';
    impact.style.left = `${event.clientX}px`;
    impact.style.top = `${event.clientY}px`;
    particleHost().appendChild(impact);
    impact.addEventListener('animationend', () => impact.remove(), {once:true});
  });

  new MutationObserver(syncCursorLayer).observe(document.body, {
    subtree: true,
    attributes: true,
    attributeFilter: ['open']
  });

  root.addEventListener('mouseleave', () => {
    visible = false;
    core.classList.remove('is-visible');
    ring.classList.remove('is-visible');
  });
  addEventListener('blur', () => {
    core.classList.remove('is-visible');
    ring.classList.remove('is-visible');
  });
  animate();
})();
