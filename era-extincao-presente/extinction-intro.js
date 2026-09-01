(() => {
  const body = document.body;
  const awakening = document.querySelector('.awakening');
  const cursor = document.querySelector('.world-cursor');
  const beats = [...document.querySelectorAll('[data-cinema-beat]')];
  const trailerFrames = [...document.querySelectorAll('[data-cinema-frame]')];
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
  let soundtrackHasPlayed = false;
  let soundtrackPosition = 0;
  let soundEnabled = false;
  let pendingStart = false;
  let lastElapsed = 0;
  let cinemaStarted = false;
  let soundtrackEnded = false;
  let soundtrackStartIssued = false;

  // Tempos de segurança. Quando o SoundCloud informa a duração, estes pontos
  // são recalculados para acompanhar a construção musical da faixa inteira.
  let beatTimes = [0, 0, 9000, 18000, 28000, 38000, 48000, 58000, 68000, 78000, 88000, 98000, 106000];
  const soundtrack = window.SC && soundtrackFrame ? window.SC.Widget(soundtrackFrame) : null;

  const requestSoundtrackStart = () => {
    if (!soundtrack || !soundtrackReady || soundtrackStartIssued || soundtrackEnded) return;
    soundtrackStartIssued = true;
    pendingStart = false;
    soundtrack.seekTo(0);
    soundtrack.setVolume(soundEnabled ? 38 : 0);
    soundtrack.play();
  };

  if (soundtrack) {
    soundtrack.bind(window.SC.Widget.Events.READY, () => {
      soundtrackReady = true;
      soundtrack.setVolume(soundEnabled ? 38 : 0);
      soundtrack.getDuration((duration) => {
        if (!Number.isFinite(duration) || duration < 30000) return;
        // Doze atos distribuídos pela faixa inteira. O título só começa nos
        // segundos finais, depois da explosão e da ruptura da contenção.
        beatTimes = [
          0,
          0,
          duration * 0.08,
          duration * 0.17,
          duration * 0.26,
          duration * 0.35,
          duration * 0.44,
          duration * 0.53,
          duration * 0.62,
          duration * 0.71,
          duration * 0.8,
          duration * 0.89,
          duration * 0.96,
        ];
      });
      if (pendingStart) requestSoundtrackStart();
    });
    soundtrack.bind(window.SC.Widget.Events.PLAY, () => {
      if (soundtrackEnded) {
        soundtrack.pause();
        return;
      }
      soundtrackPlaying = true;
      soundtrackHasPlayed = true;
      pendingStart = false;
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
      soundtrackEnded = true;
      pendingStart = false;
      soundtrack.pause();
      finishCinema();
    });
  }

  let titleLetterIndex = 0;
  document.querySelectorAll('.cinema-final h1 > span, .cinema-final h1 > em').forEach((line) => {
    const letters = [...line.textContent];
    line.textContent = '';
    letters.forEach((character) => {
      const letter = document.createElement('i');
      letter.className = character === ' ' ? 'intro-dust-letter intro-dust-space' : 'intro-dust-letter';
      letter.style.setProperty('--dust-index', titleLetterIndex);
      letter.textContent = character === ' ' ? '\u00a0' : character;
      line.append(letter);
      if (character !== ' ') titleLetterIndex += 1;
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
    trailerFrames.forEach((frame) => frame.classList.toggle('is-active', Number(frame.dataset.cinemaFrame) === index));
    awakening.classList.toggle('is-zero', index === 10);
    awakening.classList.toggle('is-years', index >= 9);
    if (index === 10) {
      awakening.classList.add('is-flashing', 'is-shaking', 'is-exploding');
      timers.push(setTimeout(() => awakening.classList.remove('is-flashing', 'is-shaking'), 1600));
      timers.push(setTimeout(() => awakening.classList.remove('is-exploding'), 6800));
    } else {
      awakening.classList.remove('is-flashing', 'is-shaking', 'is-exploding');
    }
    const status = [
      'AGUARDANDO CONEXÃO',
      'MEMÓRIA RECUPERADA',
      'CONTENÇÃO ATIVA',
      'OBSERVAÇÃO RECÍPROCA',
      'DIA ZERO RECUPERADO',
      'COMBOIO EM MOVIMENTO',
      'FREQUÊNCIA HLS ATIVA',
      'ROTA SOB ATAQUE',
      'PROTOCOLO MÉDICO ATIVO',
      'SINAIS HUMANOS ENCERRADOS',
      'IMPACTO DETECTADO',
      'CONTENÇÃO ROMPIDA',
      'CONSCIÊNCIA INCONCLUSIVA',
    ];
    if (introStatus) introStatus.textContent = status[index];
  };

  const startCinema = () => {
    if (cinemaStarted) return;
    cinemaStarted = true;
    clearTimers();
    awakening.classList.add('is-running');
    awakening.classList.remove('is-zero', 'is-years', 'is-flashing', 'is-shaking', 'is-exploding');
    setBeat(1);
    startedAt = performance.now();
    lastElapsed = 0;
    soundtrackPosition = 0;
    soundtrackHasPlayed = false;
    pendingStart = true;
    soundtrackEnded = false;
    soundtrackStartIssued = false;
    setSound(true);
    if (soundtrackReady) {
      requestSoundtrackStart();
    } else if (introStatus) {
      introStatus.textContent = 'CONECTANDO AO SINAL';
    }

    const followSoundtrack = () => {
      const fallback = Math.max(0, performance.now() - startedAt - 5000);
      const soundtrackElapsed = soundtrackHasPlayed ? soundtrackPosition : fallback;
      // Se o SoundCloud estiver armazenando dados, a imagem pausa junto com a
      // música em vez de continuar e perder o sincronismo.
      const elapsed = Math.max(lastElapsed, soundtrackElapsed);
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
    pendingStart = false;
    awakening.classList.add('is-running', 'is-years');
    setBeat(beats.length - 1);
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
