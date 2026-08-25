(() => {
  const opening = document.querySelector('#hls-opening');
  if (!opening) return;

  const status = opening.querySelector('#hls-opening-status');
  const enter = opening.querySelector('.hls-opening-enter');
  const skip = opening.querySelector('.hls-opening-skip');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let closed = false;

  const messages = [
    [650, '10 ASSINATURAS LOCALIZADAS'],
    [1550, 'IDENTIDADE DO COMANDO CONFIRMADA'],
    [2550, 'PROTOCOLO HLS-01 CARREGADO'],
    [3650, 'NÍVEL ÔMEGA CONCEDIDO'],
    [4550, 'CENTRO DE COMANDO DISPONÍVEL'],
  ];

  const timers = messages.map(([delay, message]) =>
    setTimeout(
      () => {
        if (!closed) status.textContent = message;
      },
      reducedMotion ? 0 : delay
    )
  );

  const closeOpening = () => {
    if (closed) return;
    closed = true;
    timers.forEach(clearTimeout);
    opening.classList.add('is-unlocked');
    status.textContent = 'ACESSO AUTORIZADO';
    requestAnimationFrame(() =>
      setTimeout(() => opening.classList.add('is-leaving'), reducedMotion ? 0 : 380)
    );
    setTimeout(
      () => {
        document.body.classList.remove('hls-opening-active');
        opening.remove();
        dispatchEvent(new CustomEvent('hls:opened'));
        document.querySelector('.command-hero')?.focus({ preventScroll: true });
      },
      reducedMotion ? 30 : 1300
    );
  };

  enter.addEventListener('click', closeOpening);
  skip.addEventListener('click', closeOpening);
  addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') closeOpening();
    },
    { once: true }
  );

  if (reducedMotion) opening.classList.add('is-ready');
})();
