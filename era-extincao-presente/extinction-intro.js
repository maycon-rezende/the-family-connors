(() => {
  const body = document.body;
  const awakening = document.querySelector('.awakening');
  const cursor = document.querySelector('.world-cursor');
  const beats = [...document.querySelectorAll('[data-cinema-beat]')];
  const progressParts = [...document.querySelectorAll('.cinema-progress > i')];
  const progressLine = document.querySelector('.cinema-progress > span');
  const introStatus = document.querySelector('#introStatus');
  const timecode = document.querySelector('#cinemaTimecode');
  const soundtrackFrame = document.querySelector('#introSoundcloudPlayer');
  const soundButton = document.querySelector('[data-toggle-sound]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timers = [];
  let cinemaFrame = 0;
  let startedAt = 0;
  let activeBeat = 0;
  let leaving = false;
  let soundtrackReady = false;
  let soundtrackPlaying = false;
  let soundtrackPosition = 0;
  let soundEnabled = false;
  let pendingStart = false;
  let lastElapsed = 0;

  // Tempos de segurança. Quando o SoundCloud informa a duração, estes pontos
  // são recalculados para acompanhar a construção musical da faixa inteira.
  let beatTimes = [0, 12000, 28000, 47000, 65000];
  const soundtrack = window.SC && soundtrackFrame ? window.SC.Widget(soundtrackFrame) : null;

  if (soundtrack) {
    soundtrack.bind(window.SC.Widget.Events.READY, () => {
      soundtrackReady = true;
      soundtrack.setVolume(soundEnabled ? 38 : 0);
      soundtrack.getDuration((duration) => {
        if (!Number.isFinite(duration) || duration < 30000) return;
        // A música define o ritmo, mas nenhuma tela pode permanecer parada por
        // dezenas de segundos caso a versão do SoundCloud seja muito longa.
        beatTimes = [
          0,
          Math.min(duration * 0.14, 9000),
          Math.min(duration * 0.32, 21000),
          Math.min(duration * 0.55, 34000),
          Math.min(duration * 0.82, 48000),
        ];
      });
      if (pendingStart) {
        soundtrack.seekTo(0);
        soundtrack.play();
      }
    });
    soundtrack.bind(window.SC.Widget.Events.PLAY, () => {
      soundtrackPlaying = true;
      if (introStatus && activeBeat === 0) introStatus.textContent = 'TRANSMISSÃO SINCRONIZADA';
    });
    soundtrack.bind(window.SC.Widget.Events.PAUSE, () => {
      soundtrackPlaying = false;
    });
    soundtrack.bind(window.SC.Widget.Events.PLAY_PROGRESS, (event) => {
      soundtrackPosition = event.currentPosition || 0;
    });
    soundtrack.bind(window.SC.Widget.Events.FINISH, () => {
      soundtrackPlaying = false;
      finishCinema();
    });
  }

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
    cancelAnimationFrame(cinemaFrame);
    cinemaFrame = 0;
  };

  const setSound = (enabled) => {
    soundEnabled = enabled;
    if (soundtrackReady) soundtrack.setVolume(enabled ? 38 : 0);
    if (!soundButton) return;
    soundButton.textContent = enabled ? 'SOM // ON' : 'SOM // OFF';
    soundButton.setAttribute('aria-pressed', String(enabled));
  };

  const setBeat = (index) => {
    activeBeat = index;
    beats.forEach((beat, beatIndex) => beat.classList.toggle('is-active', beatIndex === index));
    progressParts.forEach((part, partIndex) => part.classList.toggle('is-passed', partIndex < index));
    if (progressLine) progressLine.style.width = `${Math.min((index / 4) * 100, 100)}%`;
    awakening.classList.toggle('is-zero', index === 2);
    awakening.classList.toggle('is-years', index >= 3);
    if (index === 2) {
      awakening.classList.add('is-flashing', 'is-shaking', 'is-exploding');
      timers.push(setTimeout(() => awakening.classList.remove('is-flashing', 'is-shaking'), 1600));
      timers.push(setTimeout(() => awakening.classList.remove('is-exploding'), 6800));
    } else {
      awakening.classList.remove('is-flashing', 'is-shaking', 'is-exploding');
    }
    const status = [
      'AGUARDANDO CONEXÃO',
      'CONTENÇÃO COMPROMETIDA',
      'IMPACTO DETECTADO',
      'ORIGEM NÃO HUMANA',
      'CONSCIÊNCIA INCONCLUSIVA',
    ];
    if (introStatus) introStatus.textContent = status[index];
  };

  const startCinema = () => {
    clearTimers();
    awakening.classList.add('is-running');
    awakening.classList.remove('is-zero', 'is-years', 'is-flashing', 'is-shaking', 'is-exploding');
    setBeat(0);
    startedAt = performance.now();
    lastElapsed = 0;
    soundtrackPosition = 0;
    pendingStart = true;
    setSound(true);
    if (soundtrackReady) {
      soundtrack.seekTo(0);
      soundtrack.play();
    } else if (introStatus) {
      introStatus.textContent = 'CONECTANDO AO SINAL';
    }

    const followSoundtrack = () => {
      const fallback = Math.max(0, performance.now() - startedAt - 4000);
      const soundtrackElapsed = soundtrackPlaying ? soundtrackPosition : 0;
      const elapsed = Math.max(lastElapsed, soundtrackElapsed || fallback);
      lastElapsed = elapsed;
      const seconds = Math.floor(elapsed / 1000);
      const frames = Math.floor((elapsed % 1000) / 40);
      if (timecode) timecode.textContent = `00:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
      let nextBeat = 0;
      beatTimes.forEach((moment, index) => {
        if (elapsed >= moment) nextBeat = index;
      });
      if (nextBeat !== activeBeat) setBeat(nextBeat);
      if (elapsed < beatTimes.at(-1)) cinemaFrame = requestAnimationFrame(followSoundtrack);
    };
    cinemaFrame = requestAnimationFrame(followSoundtrack);
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
    if (soundtrackReady) soundtrack.pause();
    try {
      sessionStorage.setItem('ede-intro-liberada', 'sim');
    } catch {
      // O parâmetro da URL também libera a entrada quando o armazenamento está bloqueado.
    }
    if (reduced) {
      location.href = 'index.html?intro=concluida';
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
      location.href = 'index.html?intro=concluida';
    }, 3250);
  };

  document.querySelector('[data-start-cinema]')?.addEventListener('click', startCinema);
  document.querySelector('[data-skip-cinema]')?.addEventListener('click', finishCinema);
  document.querySelector('[data-awaken]')?.addEventListener('click', enterWorld);
  soundButton?.addEventListener('click', () => setSound(!soundEnabled));

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
