(() => {
  'use strict';

  document.documentElement.classList.add('hellen-ready');

  const channels = [
    {
      label: 'IDENTIDADE ATUAL // WREN',
      copy: 'Wren é o nome preservado neste dossiê. Os demais permanecem fora de alcance.',
    },
    {
      label: 'COBERTURA // SEM REGISTRO',
      copy: 'Vozes, roupas e histórias servem à missão. Nenhuma delas deve sobreviver por tempo demais.',
    },
    {
      label: 'SINAL FANTASMA // NÃO CONFIRMADO',
      copy: 'Uma das identidades apagadas continua enviando mensagens. Hellen ainda não disse quem pode estar do outro lado.',
    },
  ];

  const label = document.querySelector('[data-hellen-channel-label]');
  const copy = document.querySelector('[data-hellen-channel-copy]');
  const controls = [...document.querySelectorAll('[data-hellen-channel]')];

  controls.forEach((button) => {
    button.addEventListener('click', () => {
      const channel = channels[Number(button.dataset.hellenChannel)];
      if (!channel) return;

      controls.forEach((item) => {
        const selected = item === button;
        item.classList.toggle('is-active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });

      label.textContent = channel.label;
      copy.textContent = channel.copy;
    });
  });

  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add('is-visible'));
  }
})();
