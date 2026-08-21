(function () {
  'use strict';

  const hero = document.getElementById('hero');
  const title = hero?.querySelector('.hero-title');
  const embers = hero?.querySelector('.hero-embers');
  const flash = hero?.querySelector('.hero-flash');
  const transmission = hero?.querySelector('.hero-transmission');
  if (!hero || !title || !embers) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const heroObserver = new IntersectionObserver(([entry]) => {
    document.body.classList.toggle('hero-in-view', entry.isIntersecting && entry.intersectionRatio > .25);
  }, { threshold: [0, .25, .6] });
  heroObserver.observe(hero);

  const echo = document.createElement('span');
  echo.className = 'title-echo-rift';
  echo.setAttribute('aria-hidden', 'true');
  echo.textContent = 'A ERA DA\nEXTINÇÃO';
  title.appendChild(echo);

  const letters = Array.from(title.querySelectorAll('.home-letter'));
  letters.forEach((letter, index) => {
    letter.style.setProperty('--exit-x', `${-150 + Math.random() * 300}px`);
    letter.style.setProperty('--exit-y', `${-100 + Math.random() * 220}px`);
    letter.style.setProperty('--exit-r', `${-55 + Math.random() * 110}deg`);
    if (index % 3 !== 1 || letter.textContent.trim() === '') return;
    const crack = document.createElement('i');
    crack.className = 'letter-crack';
    crack.setAttribute('aria-hidden', 'true');
    crack.style.setProperty('--crack-angle', `${-18 + Math.random() * 36}deg`);
    crack.style.setProperty('--crack-delay', `${-Math.random() * 5}s`);
    letter.appendChild(crack);
  });

  for (let index = 0; index < 42; index += 1) {
    const mote = document.createElement('i');
    const isRuin = index % 2 === 0;
    const x = isRuin ? Math.random() * 48 : 52 + Math.random() * 48;
    mote.style.setProperty('--x', `${x}%`);
    mote.style.setProperty('--size', `${1 + Math.random() * 2.5}px`);
    mote.style.setProperty('--speed', `${9 + Math.random() * 12}s`);
    mote.style.setProperty('--delay', `${-Math.random() * 18}s`);
    mote.style.setProperty('--drift', `${-45 + Math.random() * 90}px`);
    mote.style.setProperty('--opacity', `${.12 + Math.random() * .34}`);
    mote.style.setProperty('--tone', isRuin ? '#c64a27' : '#9ddcdf');
    embers.appendChild(mote);
  }

  if (!reducedMotion) {
    const messages = [
      ['TRANSMISSÃO CONNOR', 'SINAL LOCALIZADO', 'ORIGEM // DESCONHECIDA'],
      ['PROTOCOLO DOOMSDAY', 'CONTENÇÃO INSTÁVEL', 'STATUS // OBSERVANDO'],
      ['ARQUIVO RECUPERADO', 'LINHAGEM ATIVA', 'QUATRO ASSINATURAS'],
      ['REDE HELLSINGS', 'CANAL PROTEGIDO', 'ACESSO // AUTORIZADO']
    ];
    let messageIndex = 0;
    const showTransmission = () => {
      if (!transmission || !document.body.classList.contains('hero-in-view')) return;
      const message = messages[messageIndex++ % messages.length];
      transmission.querySelector('span').textContent = message[0];
      transmission.querySelector('strong').textContent = message[1];
      transmission.querySelector('small').textContent = message[2];
      transmission.classList.add('is-visible');
      window.setTimeout(() => transmission.classList.remove('is-visible'), 3600);
    };
    window.setTimeout(showTransmission, 2600);
    window.setInterval(showTransmission, 9200);

    const distantFlash = () => {
      if (!flash || !document.body.classList.contains('hero-in-view')) return;
      flash.classList.remove('is-active');
      void flash.offsetWidth;
      flash.classList.add('is-active');
    };
    window.setTimeout(distantFlash, 6200);
    window.setInterval(distantFlash, 17000);

    hero.addEventListener('pointermove', event => {
      const x = event.clientX / window.innerWidth - .5;
      const y = event.clientY / window.innerHeight - .5;
      hero.style.setProperty('--look-x', `${x * 22}px`);
      hero.style.setProperty('--look-y', `${y * 15}px`);
      title.style.setProperty('--title-x', `${x * 8}px`);
      title.style.setProperty('--title-y', `${y * 5}px`);
      hero.style.setProperty('--world-balance', `${event.clientX / window.innerWidth}`);
    }, { passive: true });

    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--look-x', '0px');
      hero.style.setProperty('--look-y', '0px');
      title.style.setProperty('--title-x', '0px');
      title.style.setProperty('--title-y', '0px');
    });
  }

  const actions = hero.querySelector('.hero-actions');
  const startButton = hero.querySelector('.hero-btn-primary');
  startButton?.addEventListener('pointerenter', () => actions?.classList.add('is-charged'));
  startButton?.addEventListener('pointerleave', () => actions?.classList.remove('is-charged'));
  startButton?.addEventListener('click', event => {
    if (reducedMotion) return;
    event.preventDefault();
    if (hero.classList.contains('is-entering-story')) return;
    hero.classList.add('is-entering-story');
    window.setTimeout(() => {
      document.getElementById('saga')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => hero.classList.remove('is-entering-story'), 1100);
    }, 760);
  });

  document.querySelectorAll('.saga-chapter').forEach(chapter => {
    chapter.addEventListener('pointermove', event => {
      const rect = chapter.getBoundingClientRect();
      chapter.style.setProperty('--chapter-x', `${event.clientX - rect.left}px`);
      chapter.style.setProperty('--chapter-y', `${event.clientY - rect.top}px`);
    }, { passive: true });
  });
})();
