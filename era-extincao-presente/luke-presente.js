(() => {
  'use strict';

  document.documentElement.classList.add('luke-js');

  const channels = [
    {
      label: 'ROTA NORTE // TRÊS SAÍDAS CONFIRMADAS',
      copy:
        'A rota norte permanece limpa por enquanto. O campo muda; a equipe precisa mudar junto.',
    },
    {
      label: 'TRAVESSIA // MARCAS DE RETORNO',
      copy:
        'Túneis, florestas queimadas e cidades sem nome exigem leitura constante. Uma rota segura só existe enquanto pode ser atravessada.',
    },
    {
      label: 'ROTA L-0 // ACESSO NEGADO',
      copy:
        'Luke selou a passagem pessoalmente e a removeu dos mapas oficiais. Toda noite, ele ainda verifica o selo.',
    },
  ];

  const label = document.querySelector('[data-luke-channel-label]');
  const copy = document.querySelector('[data-luke-channel-copy]');
  const buttons = [...document.querySelectorAll('[data-luke-channel]')];

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
        selectChannel(Number(button.dataset.lukeChannel) || 0);
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
