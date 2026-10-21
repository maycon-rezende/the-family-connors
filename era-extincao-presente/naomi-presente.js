(() => {
  'use strict';

  document.documentElement.classList.add('naomi-js');

  const channels = [
    {
      label: 'REDE // RECONSTRUÇÃO EM CURSO',
      copy:
        'Rádios quebrados e repetidores clandestinos mantêm os Hellsings conectados ao que ainda existe lá fora.',
    },
    {
      label: 'ARQUIVO // 7.318 SINAIS NÃO IDENTIFICADOS',
      copy:
        'Cada transmissão interrompida é preservada: não para contar os mortos, mas para lembrar que alguém ainda esperava ser ouvido.',
    },
    {
      label: 'FREQUÊNCIA 00 // ORIGEM IMPOSSÍVEL',
      copy:
        'Uma transmissão começou anos antes de ser enviada. No ruído, uma palavra retorna sem cessar: Dominus.',
    },
  ];

  const label = document.querySelector('[data-naomi-channel-label]');
  const copy = document.querySelector('[data-naomi-channel-copy]');
  const buttons = [...document.querySelectorAll('[data-naomi-channel]')];

  if (label && copy && buttons.length) {
    const selectChannel = (index) => {
      const channel = channels[index] || channels[0];
      label.textContent = channel.label;
      copy.textContent = channel.copy;

      buttons.forEach((button, buttonIndex) => {
        const active = buttonIndex === index;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });
    };

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        selectChannel(Number(button.dataset.naomiChannel) || 0);
      });
    });

    selectChannel(0);
  }

  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        activeObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -7% 0px' }
  );

  revealItems.forEach((item) => observer.observe(item));
})();
