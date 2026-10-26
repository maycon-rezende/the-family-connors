(() => {
  'use strict';

  document.documentElement.classList.add('john-ready');

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = [...document.querySelectorAll('[data-john-reveal]')];

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }),
      { threshold: 0.12, rootMargin: '0px 0px -6%' }
    );
    revealTargets.forEach((target) => observer.observe(target));
  }

  const channels = [
    {
      label: 'EQUIPAMENTO // REGISTRO HISTÓRICO',
      copy: 'Os arquivos de equipamento preservam a função de John antes de sua última missão.',
    },
    {
      label: 'COBERTURA // ARQUIVO VISUAL',
      copy: 'As imagens mostram John em apoio de campo aos Hellsings antes de sua morte.',
    },
    {
      label: 'RETORNO // ÚLTIMA MISSÃO',
      copy: 'John atraiu a ameaça para longe e permitiu que o restante da equipe escapasse.',
    },
  ];

  const label = document.querySelector('[data-john-channel-label]');
  const copy = document.querySelector('[data-john-channel-copy]');
  const buttons = [...document.querySelectorAll('[data-john-channel]')];

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const channel = channels[Number(button.dataset.johnChannel)];
      if (!channel || !label || !copy) return;
      label.textContent = channel.label;
      copy.textContent = channel.copy;
      buttons.forEach((item) => item.classList.toggle('is-active', item === button));
    });
  });
})();
