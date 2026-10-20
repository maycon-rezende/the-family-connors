(() => {
  'use strict';

  document.documentElement.classList.add('jully-ready');

  const channels = [
    {
      label: 'FREQ. 01 // REDE DE EMERGÊNCIA',
      copy: 'Um sinal encontrado pode significar abrigo, rota, perigo — ou alguém esperando para ser ouvido.',
    },
    {
      label: 'FREQ. 02 // EQUIPAMENTO RECUPERADO',
      copy: 'Peças esquecidas não voltam a ser o que eram. Ainda assim, podem manter uma conversa viva por mais uma noite.',
    },
    {
      label: 'FREQ. 03 // MEMÓRIA PRESERVADA',
      copy: 'Nem todo arquivo aponta para o futuro. Alguns existem para provar que uma voz esteve aqui.',
    },
  ];

  const label = document.querySelector('[data-jully-channel-label]');
  const copy = document.querySelector('[data-jully-channel-copy]');
  const controls = [...document.querySelectorAll('[data-jully-channel]')];

  controls.forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.jullyChannel);
      const channel = channels[index];
      if (!channel || !label || !copy) return;

      controls.forEach((control) => control.classList.toggle('is-active', control === button));
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
      { threshold: 0.12 },
    );
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add('is-visible'));
  }
})();
