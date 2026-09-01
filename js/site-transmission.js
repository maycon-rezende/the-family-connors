(function () {
  'use strict';
  if (
    !location.pathname.endsWith('/index.html') &&
    !location.pathname.endsWith('/arquivo-passado.html')
  ) {
    const presentLink = document.createElement('a');
    presentLink.className = 'present-return-link';
    presentLink.href = 'index.html';
    presentLink.innerHTML = '<span>AGORA</span><b>Retornar ao presente</b>';
    presentLink.setAttribute('aria-label', 'Retornar ao presente devastado de A Era da Extinção');
    document.body.appendChild(presentLink);
  }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const overlay = document.createElement('div');
  overlay.className = 'transmission-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML =
    '<div class="transmission-message">Transmissão interrompida<small>Sinal Connor // tentando recuperar arquivo</small></div>';
  document.body.appendChild(overlay);
  let timer;
  function interrupt() {
    if (document.hidden) {
      schedule();
      return;
    }
    document.documentElement.classList.add('transmission-active');
    window.setTimeout(() => {
      document.documentElement.classList.remove('transmission-active');
      schedule();
    }, 760);
  }
  function schedule() {
    window.clearTimeout(timer);
    timer = window.setTimeout(interrupt, 12000 + Math.random() * 16000);
  }
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) schedule();
  });
  schedule();
})();
