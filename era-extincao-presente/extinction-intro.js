(() => {
  const body = document.body;
  const awakening = document.querySelector('.awakening');
  const frameStage = document.querySelector('.intro-trailer-frames');
  const beats = [...document.querySelectorAll('[data-cinema-beat]')];
  const introStatus = document.querySelector('#introStatus');
  const timecode = document.querySelector('#cinemaTimecode');
  const audio = document.querySelector('#introReferenceAudio');
  const soundButton = document.querySelector('[data-toggle-sound]');
  const cursor = document.querySelector('.world-cursor');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const sceneTimes = [
    0, 3.736, 5.02, 7.734, 9.036, 10.319, 11.702, 12.903, 14.235, 15.651, 16.952,
    24.9, 26.419, 27.835, 31.753, 35.302, 37.271, 40.802, 42.22, 43.02, 43.569,
    44.271, 45.153, 46.02, 47.187, 50.238, 50.82, 56.87, 57.535, 59.285, 61.002,
    61.586, 64.837, 68.969, 71.005, 72.087, 73.469, 74.254, 78.054, 80.472, 81.887,
    82.72, 84.437, 85.273, 86.103, 86.938, 87.818, 88.687, 89.569, 90.321, 91.021,
    92.819, 93.57, 94.103, 94.62, 95.155, 95.704, 96.788, 98.455, 99.07, 99.819,
    100.287, 100.82, 101.287, 102.037, 102.321,
  ];

  const storySources = [
    'frame-01-ultimo-mundo.jpg', 'frame-02-contencao.jpg', 'frame-03-consciencia.jpg',
    'frame-16-fundadores.jpg', 'frame-36-jack-comando.jpg', 'frame-24-jack.jpg',
    'frame-25-jack-dimitri.jpg', 'frame-05-depois.jpg', 'frame-12-herdeiros.jpg',
    'frame-18-alucard.jpg', 'frame-21-nicolai.jpg', 'frame-22-nathan.jpg',
    'frame-23-pollyana.jpg', 'frame-13-combate.jpg', 'frame-19-diana.jpg', 'frame-20-mary.jpg',
    'frame-14-isolde.jpg', 'frame-15-nova-geracao.jpg', 'frame-17-resistencia.jpg',
    'frame-28-hellen.jpg', 'frame-29-naomi.jpg', 'frame-30-luke.jpg', 'frame-27-brian.jpg',
    'frame-26-john.jpg', 'frame-31-isolde-mecanica.jpg', 'frame-07-convoy.jpg',
    'frame-08-comunicacoes.jpg', 'frame-09-comandantes.jpg', 'frame-10-resgate.jpg',
    'frame-32-depois-do-caos.jpg', 'frame-06-sinal.jpg',
  ].map((name) => `img-intro/${name}`);

  const actionSources = ['irmas', 'diana', 'isolde', 'jack', 'mary'].flatMap((name) =>
    Array.from({ length: 6 }, (_, index) => `img-intro/sequence/action-${name}-${String(index + 1).padStart(2, '0')}.jpg`),
  );

  const sceneSources = [
    ...storySources,
    ...actionSources,
    'img-intro/frame-33-herdeiros-em-combate.jpg',
    'img-intro/frame-34-filhas-em-combate.jpg',
    'img-intro/frame-35-evento-extincao.jpg',
    'img-intro/frame-04-impacto.jpg',
    'img-intro/frame-11-libertacao.jpg',
  ];

  const beatTimes = [0, 0, 11.702, 25.334, 40.802, 56.87, 68.969, 78.054, 86.103, 94.103, 102.037, 105.5, 110.005];
  const statuses = [
    'AGUARDANDO CONEXÃO', 'MEMÓRIA RECUPERADA', 'CONTENÇÃO ATIVA', 'OBSERVAÇÃO RECÍPROCA',
    'DIA ZERO RECUPERADO', 'COMBOIO EM MOVIMENTO', 'FREQUÊNCIA HLS ATIVA', 'SEGUNDA GERAÇÃO ATIVA',
    'PROTOCOLO DE RESISTÊNCIA', 'SINAIS HUMANOS ENCERRADOS', 'IMPACTO DETECTADO',
    'CONTENÇÃO ROMPIDA', 'CONSCIÊNCIA INCONCLUSIVA',
  ];

  let frames = [];
  let activeFrame = -1;
  let activeBeat = 0;
  let animationFrame = 0;
  let started = false;
  let leaving = false;
  let effectTimers = [];

  const renderFrames = () => {
    frameStage.replaceChildren();
    const fragment = document.createDocumentFragment();
    sceneSources.forEach((source, index) => {
      const figure = document.createElement('figure');
      figure.className = index >= storySources.length ? 'intro-frame intro-action-frame' : 'intro-frame';
      const nextCut = sceneTimes[index + 1];
      if (nextCut && nextCut - sceneTimes[index] <= 1.2) figure.classList.add('intro-rapid-frame');
      figure.dataset.sequenceIndex = index;
      const image = document.createElement('img');
      image.alt = '';
      image.decoding = 'async';
      image.loading = 'eager';
      if (index < 10) image.src = source;
      else image.dataset.src = source;
      if (index === 0) image.fetchPriority = 'high';
      figure.append(image);
      fragment.append(figure);
    });
    frameStage.append(fragment);
    frames = [...frameStage.querySelectorAll('.intro-frame')];
  };

  const ensureFrame = (index) => {
    const image = frames[index]?.querySelector('img[data-src]');
    if (!image) return;
    image.src = image.dataset.src;
    delete image.dataset.src;
  };

  const prepareTitle = () => {
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
  };

  const setFrame = (index) => {
    if (activeFrame === index || !frames[index]) return;
    for (let preloadIndex = index; preloadIndex <= Math.min(index + 8, frames.length - 1); preloadIndex += 1) {
      ensureFrame(preloadIndex);
    }
    activeFrame = index;
    frames.forEach((frame, frameIndex) => frame.classList.toggle('is-active', frameIndex === index));
  };

  const setBeat = (index) => {
    if (activeBeat === index && beats[index]?.classList.contains('is-active')) return;
    activeBeat = index;
    beats.forEach((beat, beatIndex) => beat.classList.toggle('is-active', beatIndex === index));
    awakening.classList.toggle('is-zero', index === 10);
    awakening.classList.toggle('is-years', index >= 9);
    awakening.classList.remove('is-flashing', 'is-shaking', 'is-exploding');
    effectTimers.forEach(clearTimeout);
    effectTimers = [];
    if (index === 10) {
      awakening.classList.add('is-flashing', 'is-shaking', 'is-exploding');
      effectTimers.push(setTimeout(() => awakening.classList.remove('is-flashing', 'is-shaking'), 1500));
      effectTimers.push(setTimeout(() => awakening.classList.remove('is-exploding'), 7200));
    }
    if (introStatus) introStatus.textContent = statuses[index] || statuses.at(-1);
  };

  const indexAtTime = (moments, seconds) => {
    let result = 0;
    for (let index = 0; index < moments.length; index += 1) {
      if (seconds < moments[index]) break;
      result = index;
    }
    return result;
  };

  const renderTimeline = () => {
    if (!started || !audio) return;
    const seconds = Math.min(audio.currentTime, 117.702);
    const hundredths = Math.floor((seconds % 1) * 100);
    const wholeSeconds = Math.floor(seconds);
    if (timecode) timecode.textContent = `00:${String(wholeSeconds).padStart(2, '0')}:${String(hundredths).padStart(2, '0')}`;
    setFrame(indexAtTime(sceneTimes, seconds));
    setBeat(indexAtTime(beatTimes, seconds));
    if (!audio.paused && !audio.ended) animationFrame = requestAnimationFrame(renderTimeline);
  };

  const setSound = (enabled) => {
    if (audio) audio.muted = !enabled;
    if (!soundButton) return;
    soundButton.textContent = enabled ? 'SOM // ON' : 'SOM // OFF';
    soundButton.setAttribute('aria-pressed', String(enabled));
  };

  const finishCinema = () => {
    cancelAnimationFrame(animationFrame);
    if (audio) audio.pause();
    awakening.classList.add('is-running', 'is-years');
    setFrame(sceneSources.length - 1);
    setBeat(beats.length - 1);
  };

  const startCinema = async () => {
    if (started || !audio) return;
    started = true;
    awakening.classList.add('is-running');
    awakening.classList.remove('is-zero', 'is-years', 'is-flashing', 'is-shaking', 'is-exploding');
    audio.loop = false;
    audio.currentTime = 0;
    audio.volume = 0.46;
    setSound(true);
    setFrame(0);
    setBeat(1);
    try {
      await audio.play();
      animationFrame = requestAnimationFrame(renderTimeline);
    } catch {
      started = false;
      if (introStatus) introStatus.textContent = 'ÁUDIO BLOQUEADO // TENTE NOVAMENTE';
    }
  };

  const enterWorld = () => {
    if (leaving) return;
    leaving = true;
    cancelAnimationFrame(animationFrame);
    if (audio) audio.pause();
    try { sessionStorage.setItem('ede-intro-liberada', 'sim'); } catch {}
    if (reduced) {
      location.href = 'index.html?intro=concluida';
      return;
    }
    awakening.classList.add('is-disintegrating');
    body.classList.add('world-transitioning');
    if (introStatus) introStatus.textContent = 'MATÉRIA EM DISPERSÃO';
    setTimeout(() => awakening.classList.add('is-dust-exiting'), 2300);
    setTimeout(() => { location.href = 'index.html?intro=concluida'; }, 3250);
  };

  renderFrames();
  prepareTitle();
  audio?.addEventListener('ended', finishCinema, { once: true });
  audio?.addEventListener('play', () => {
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(renderTimeline);
  });
  document.querySelector('[data-start-cinema]')?.addEventListener('click', startCinema);
  document.querySelector('[data-skip-cinema]')?.addEventListener('click', finishCinema);
  document.querySelector('[data-awaken]')?.addEventListener('click', enterWorld);
  soundButton?.addEventListener('click', () => setSound(audio?.muted));

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
