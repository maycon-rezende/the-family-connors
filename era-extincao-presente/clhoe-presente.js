(() => {
  'use strict';

  const revealTargets = [...document.querySelectorAll('[data-reveal]')];
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.14 }
    );

    revealTargets.forEach((target) => observer.observe(target));
  }

  const reports = [
    {
      label: 'PERÍMETRO // LEITURA ATUAL',
      copy: 'Observação visual confirmada. Nenhum civil no perímetro imediato.',
    },
    {
      label: 'ABRIGO // PROTOCOLO DE RETORNO',
      copy: 'Água, acesso e rota de fuga são verificados antes de qualquer pessoa baixar a guarda.',
    },
    {
      label: 'FAMÍLIA // PRIORIDADE ABSOLUTA',
      copy: 'Marido e filho preservados no arquivo. O lar continua sendo a única fronteira inegociável.',
    },
  ];

  const label = document.querySelector('[data-clhoe-label]');
  const copy = document.querySelector('[data-clhoe-copy]');
  const controls = [...document.querySelectorAll('[data-clhoe-readout]')];

  if (!label || !copy || !controls.length) return;

  controls.forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.clhoeReadout);
      const report = reports[index];
      if (!report) return;

      label.textContent = report.label;
      copy.textContent = report.copy;

      controls.forEach((control) => {
        const active = control === button;
        control.classList.toggle('is-active', active);
        control.setAttribute('aria-pressed', String(active));
      });
    });
  });
})();
