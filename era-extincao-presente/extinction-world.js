(() => {
  const body = document.body;
  const awakening = document.querySelector('.awakening');
  const cursor = document.querySelector('.world-cursor');
  const dialog = document.querySelector('#classifiedDialog');
  const fileCode = document.querySelector('#fileCode');
  const transition = document.querySelector('.period-transition');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const beats = [...document.querySelectorAll('[data-cinema-beat]')];
  const progressParts = [...document.querySelectorAll('.cinema-progress>i')];
  const progressLine = document.querySelector('.cinema-progress>span');
  const introStatus = document.querySelector('#introStatus');
  const timecode = document.querySelector('#cinemaTimecode');
  const introAudio = document.querySelector('#worldIntroAudio');
  const soundButton = document.querySelector('[data-toggle-sound]');
  let cinemaTimers = [];
  let timecodeTimer = 0;
  let cinemaStartedAt = 0;

  const clearCinemaTimers = () => {
    cinemaTimers.forEach(clearTimeout);
    cinemaTimers = [];
    clearInterval(timecodeTimer);
  };

  const setCinemaBeat = (index) => {
    beats.forEach((beat, beatIndex) => beat.classList.toggle('is-active', beatIndex === index));
    progressParts.forEach((part, partIndex) =>
      part.classList.toggle('is-passed', partIndex < index)
    );
    if (progressLine) progressLine.style.width = `${Math.min((index / 4) * 100, 100)}%`;
    awakening.classList.toggle('is-zero', index === 2);
    awakening.classList.toggle('is-years', index >= 3);
    if (index === 2) {
      awakening.classList.add('is-flashing', 'is-shaking', 'is-exploding');
      cinemaTimers.push(
        setTimeout(() => awakening.classList.remove('is-flashing', 'is-shaking'), 900)
      );
      cinemaTimers.push(setTimeout(() => awakening.classList.remove('is-exploding'), 3400));
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

  const setSound = (enabled) => {
    if (!introAudio || !soundButton) return;
    if (enabled) {
      introAudio.volume = 0.28;
      introAudio
        .play()
        .then(() => {
          soundButton.textContent = 'SOM // ON';
          soundButton.setAttribute('aria-pressed', 'true');
        })
        .catch(() => setSound(false));
    } else {
      introAudio.pause();
      soundButton.textContent = 'SOM // OFF';
      soundButton.setAttribute('aria-pressed', 'false');
    }
  };

  const startCinema = () => {
    clearCinemaTimers();
    awakening.classList.add('is-running');
    cinemaStartedAt = performance.now();
    setSound(true);
    timecodeTimer = setInterval(() => {
      const elapsed = Math.max(0, performance.now() - cinemaStartedAt);
      const seconds = Math.floor(elapsed / 1000);
      const frames = Math.floor((elapsed % 1000) / 40);
      if (timecode)
        timecode.textContent = `00:${String(seconds).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
    }, 40);
    [
      [1, 250],
      [2, 3550],
      [3, 6850],
      [4, 10150],
    ].forEach(([beat, delay]) => cinemaTimers.push(setTimeout(() => setCinemaBeat(beat), delay)));
    cinemaTimers.push(setTimeout(clearCinemaTimers, 11500));
  };

  const finishCinema = () => {
    clearCinemaTimers();
    awakening.classList.add('is-running', 'is-years');
    setCinemaBeat(4);
  };

  const enterWorld = () => {
    clearCinemaTimers();
    awakening.setAttribute('aria-hidden', 'true');
    awakening.classList.add('is-gone');
    body.classList.remove('world-locked');
    body.classList.add('world-entered');
    try {
      sessionStorage.setItem('extinction-cinema-v2', '1');
    } catch (error) {}
    if (introAudio) {
      const fade = setInterval(() => {
        introAudio.volume = Math.max(0, introAudio.volume - 0.04);
        if (introAudio.volume <= 0.01) {
          clearInterval(fade);
          introAudio.pause();
        }
      }, 70);
    }
  };

  document.querySelector('[data-start-cinema]')?.addEventListener('click', startCinema);
  document.querySelector('[data-skip-cinema]')?.addEventListener('click', finishCinema);
  document.querySelector('[data-awaken]')?.addEventListener('click', enterWorld);
  soundButton?.addEventListener('click', () => setSound(introAudio?.paused ?? true));

  let alreadyAwake = false;
  try {
    alreadyAwake = sessionStorage.getItem('extinction-cinema-v2') === '1';
  } catch (error) {}
  if (alreadyAwake) enterWorld();
  else if (reduced) finishCinema();

  if (cursor && matchMedia('(pointer:fine)').matches) {
    addEventListener(
      'pointermove',
      (event) => {
        cursor.style.opacity = '1';
        cursor.style.transform = `translate(${event.clientX}px,${event.clientY}px)`;
      },
      { passive: true }
    );
    document.querySelectorAll('a,button').forEach((element) => {
      element.addEventListener(
        'mouseenter',
        () => (cursor.querySelector('span').textContent = 'ACESSAR')
      );
      element.addEventListener(
        'mouseleave',
        () => (cursor.querySelector('span').textContent = 'RASTREAR')
      );
    });
  }

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
    { threshold: 0.12 }
  );
  document
    .querySelectorAll('.reveal')
    .forEach((element) =>
      reduced ? element.classList.add('is-visible') : observer.observe(element)
    );

  document.querySelectorAll('.survivor').forEach((button) =>
    button.addEventListener('click', () => {
      fileCode.textContent = `${button.dataset.file} // PRESENTE`;
      dialog.showModal();
    })
  );
  document.querySelector('[data-close-file]')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.querySelectorAll('[data-open-past],a[href="arquivo-passado.html"]').forEach((link) =>
    link.addEventListener('click', (event) => {
      if (reduced) return;
      event.preventDefault();
      transition.classList.add('is-active');
      setTimeout(() => (location.href = link.href), 1050);
    })
  );

  addEventListener(
    'scroll',
    () => {
      const progress = Math.min(scrollY / (document.documentElement.scrollHeight - innerHeight), 1);
      document.documentElement.style.setProperty('--world-progress', progress);
    },
    { passive: true }
  );
})();
