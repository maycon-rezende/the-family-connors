(function () {
  const intro = document.getElementById('cinematic-intro');
  if (!intro) return;

  const beats = Array.from(intro.querySelectorAll('.intro-beat'));
  const skip = document.getElementById('intro-skip');
  const audio = document.getElementById('opening-audio');
  const title = document.getElementById('main-title');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const beatDuration = reducedMotion ? 900 : 3500;
  let current = 0;
  let timer;
  let finished = false;
  let introStarted = false;
  let volumeFrame;

  function prepareNuclearTitle() {
    if (!title || title.querySelector('.title-letter')) return;
    const lines = ['A ERA DA', 'EXTINÇÃO'];
    title.setAttribute('aria-label', lines.join(' '));
    title.innerHTML = lines
      .map((line, lineIndex) => {
        const letters = Array.from(line)
          .map((letter, letterIndex) => {
            const delay = lineIndex * 8 + letterIndex;
            const content = letter === ' ' ? '&nbsp;' : letter;
            const dust =
              letter === ' '
                ? ''
                : '<span class="letter-dust"><i></i><i></i><i></i><i></i><i></i><i></i></span>';
            return `<span class="title-letter" style="--letter:${delay}" aria-hidden="true">${content}${dust}</span>`;
          })
          .join('');
        return `<span class="title-line title-line--${lineIndex + 1}">${letters}</span>`;
      })
      .join('');
  }

  function createAmbientDust() {
    const scene = document.getElementById('scene');
    if (!scene || scene.querySelector('.apocalypse-dust')) return;

    const layer = document.createElement('div');
    layer.className = 'apocalypse-dust';
    layer.setAttribute('aria-hidden', 'true');

    for (let index = 0; index < 54; index += 1) {
      const mote = document.createElement('i');
      const depth = index % 3;
      mote.style.setProperty('--dust-y', `${5 + Math.random() * 90}%`);
      mote.style.setProperty('--dust-size', `${1 + depth * 1.4 + Math.random() * 2.2}px`);
      mote.style.setProperty('--dust-delay', `${-Math.random() * 18}s`);
      mote.style.setProperty('--dust-duration', `${12 + depth * 5 + Math.random() * 9}s`);
      mote.style.setProperty('--dust-drift', `${-45 + Math.random() * 90}px`);
      mote.style.setProperty('--dust-opacity', `${0.12 + depth * 0.09 + Math.random() * 0.2}`);
      layer.appendChild(mote);
    }

    scene.appendChild(layer);
  }

  function fadeVolume(target, duration) {
    if (!audio || audio.paused) return;
    window.cancelAnimationFrame(volumeFrame);
    const startVolume = audio.volume;
    const difference = target - startVolume;
    const startTime = performance.now();

    function step(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      audio.volume = Math.max(0, Math.min(1, startVolume + difference * eased));
      if (progress < 1) volumeFrame = window.requestAnimationFrame(step);
    }

    volumeFrame = window.requestAnimationFrame(step);
  }

  function showBeat(index) {
    beats.forEach((beat, beatIndex) => beat.classList.toggle('is-active', beatIndex === index));
    current = index;
    window.clearTimeout(timer);
    timer = window.setTimeout(
      index < beats.length - 1 ? () => showBeat(index + 1) : finish,
      beatDuration
    );
  }

  function finish() {
    if (finished) return;
    finished = true;
    window.clearTimeout(timer);
    intro.classList.add('is-leaving');
    document.body.classList.add('intro-complete');
    fadeVolume(0.58, reducedMotion ? 300 : 3600);
    window.setTimeout(() => intro.remove(), 1200);
    document.getElementById('enter-btn')?.focus({ preventScroll: true });
  }

  async function startSound() {
    if (!audio) return;
    try {
      if (audio.paused) {
        audio.volume = 0;
        await audio.play();
      }
      fadeVolume(finished ? 0.58 : 0.16, finished ? 1800 : 2400);
    } catch (_) {
      // Autoplay pode ser bloqueado; a primeira interação destrava a trilha.
    }
  }

  skip.addEventListener('click', finish);
  const unlockSound = () => startSound();
  document.addEventListener('pointerdown', unlockSound, { once: true });
  document.addEventListener('keydown', unlockSound, { once: true });
  document.addEventListener('keydown', (event) => {
    if (finished || !introStarted) return;
    if (event.key === 'Escape') finish();
    if (event.key === 'ArrowRight') showBeat(Math.min(current + 1, beats.length - 1));
  });

  prepareNuclearTitle();
  createAmbientDust();

  function startIntro() {
    if (introStarted) return;
    introStarted = true;
    intro.style.setProperty('--intro-duration', `${(beats.length * beatDuration) / 1000}s`);
    startSound();
    requestAnimationFrame(() => intro.classList.add('is-running'));
    showBeat(0);
  }

  if (document.querySelector('.book-prologue')) {
    document.addEventListener('connor:book-opened', startIntro, { once: true });
  } else {
    startIntro();
  }
})();
