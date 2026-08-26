(() => {
  const body = document.body;
  const awakening = document.querySelector('.awakening');
  const cursor = document.querySelector('.world-cursor');
  const beats = [...document.querySelectorAll('[data-cinema-beat]')];
  const progressParts = [...document.querySelectorAll('.cinema-progress > i')];
  const progressLine = document.querySelector('.cinema-progress > span');
  const introStatus = document.querySelector('#introStatus');
  const timecode = document.querySelector('#cinemaTimecode');
  const introAudio = document.querySelector('#worldIntroAudio');
  const soundButton = document.querySelector('[data-toggle-sound]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timers = [];
  let timecodeTimer = 0;
  let startedAt = 0;
  let leaving = false;

  document.querySelectorAll('.cinema-final h1 > span, .cinema-final h1 > em').forEach((line) => {
    const letters = [...line.textContent];
    line.textContent = '';
    letters.forEach((character, index) => {
      const letter = document.createElement('i');
      letter.className = character === ' ' ? 'intro-dust-letter intro-dust-space' : 'intro-dust-letter';
      letter.style.setProperty('--dust-index', index);
      letter.textContent = character === ' ' ? '\u00a0' : character;
      line.append(letter);
    });
  });

  const clearTimers = () => {
    timers.forEach(clearTimeout);
    timers = [];
    clearInterval(timecodeTimer);
  };

  const setSound = (enabled) => {
    if (!introAudio || !soundButton) return;
    if (enabled) {
      introAudio.volume = 0.28;
      introAudio.play().then(() => {
        soundButton.textContent = 'SOM // ON';
        soundButton.setAttribute('aria-pressed', 'true');
      }).catch(() => setSound(false));
    } else {
      introAudio.pause();
      soundButton.textContent = 'SOM // OFF';
      soundButton.setAttribute('aria-pressed', 'false');
    }
  };

  const setBeat = (index) => {
    beats.forEach((beat, beatIndex) => beat.classList.toggle('is-active', beatIndex === index));
    progressParts.forEach((part, partIndex) => part.classList.toggle('is-passed', partIndex < index));
    if (progressLine) progressLine.style.width = `${Math.min((index / 4) * 100, 100)}%`;
    awakening.classList.toggle('is-zero', index === 2);
    awakening.classList.toggle('is-years', index >= 3);
    if (index === 2) {
      awakening.classList.add('is-flashing', 'is-shaking', 'is-exploding');
      timers.push(setTimeout(() => awakening.classList.remove('is-flashing', 'is-shaking'), 900));
      timers.push(setTimeout(() => awakening.classList.remove('is-exploding'), 3400));
    }
    const status = [
      'AGUARDANDO CONEXÃO',
      'ARQUIVO RECUPERADO',
      'IMPACTO DETECTADO',
      'TEMPO CORROMPIDO',
      'SINAL ESTABILIZADO',
    ];
    if (introStatus) introStatus.textContent = status[index];
  };

  const startCinema = () => {
    clearTimers();
    awakening.classList.add('is-running');
    startedAt = performance.now();
    setSound(true);
    timecodeTimer = setInterval(() => {
      const elapsed = Math.max(0, performance.now() - startedAt);
      const seconds = Math.floor(elapsed / 1000);
      const frames = Math.floor((elapsed % 1000) / 40);
      if (timecode) timecode.textContent = `00:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
    }, 40);
    [[1, 250], [2, 3550], [3, 6850], [4, 10150]].forEach(([beat, delay]) => {
      timers.push(setTimeout(() => setBeat(beat), delay));
    });
    timers.push(setTimeout(clearTimers, 11500));
  };

  const finishCinema = () => {
    clearTimers();
    awakening.classList.add('is-running', 'is-years');
    setBeat(4);
  };

  const enterWorld = () => {
    if (leaving) return;
    leaving = true;
    clearTimers();
    if (reduced) {
      location.href = 'index.html';
      return;
    }
    awakening.classList.add('is-disintegrating');
    body.classList.add('world-transitioning');
    if (introStatus) introStatus.textContent = 'MATÉRIA EM DISPERSÃO';
    setTimeout(() => {
      awakening.classList.add('is-dust-exiting');
      if (introStatus) introStatus.textContent = 'ATRAVESSANDO A TEMPESTADE';
    }, 2300);
    setTimeout(() => {
      location.href = 'index.html';
    }, 3250);
  };

  document.querySelector('[data-start-cinema]')?.addEventListener('click', startCinema);
  document.querySelector('[data-skip-cinema]')?.addEventListener('click', finishCinema);
  document.querySelector('[data-awaken]')?.addEventListener('click', enterWorld);
  soundButton?.addEventListener('click', () => setSound(introAudio?.paused ?? true));

  if (reduced) finishCinema();

  if (cursor && matchMedia('(pointer:fine)').matches) {
    addEventListener('pointermove', (event) => {
      cursor.style.opacity = '1';
      cursor.style.transform = `translate(${event.clientX}px,${event.clientY}px)`;
    }, { passive: true });
    document.querySelectorAll('button').forEach((button) => {
      button.addEventListener('mouseenter', () => (cursor.querySelector('span').textContent = 'ACESSAR'));
      button.addEventListener('mouseleave', () => (cursor.querySelector('span').textContent = 'RASTREAR'));
    });
  }
})();
