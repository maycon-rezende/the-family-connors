(() => {
  'use strict';
  document.documentElement.classList.add('dimitri-ready');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = [...document.querySelectorAll('[data-dimitri-reveal]')];
  if (reducedMotion || !('IntersectionObserver' in window)) targets.forEach((target) => target.classList.add('is-visible'));
  else {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), { threshold: .12, rootMargin: '0px 0px -6%' });
    targets.forEach((target) => observer.observe(target));
  }
  const channels = [
    { label: 'ПАМЯТЬ // FAMÍLIA', copy: 'Durante o apocalipse, Dimitri perdeu a esposa e a filha mais nova. Uma fotografia preserva as quatro pessoas que um dia couberam no mesmo retrato.' },
    { label: 'АНЯ // 35 ANOS', copy: 'Anya negocia, avalia mercadorias e explora ruínas. Dimitri permanece ao lado dela e aprende a confiar nas escolhas da filha adulta.' },
    { label: 'КГБ // PASSADO', copy: 'Dimitri foi agente da KGB antes do Dia D. O arquivo não revela sua função na agência nem como deixou o serviço.' },
  ];
  const label = document.querySelector('[data-dimitri-channel-label]');
  const copy = document.querySelector('[data-dimitri-channel-copy]');
  const buttons = [...document.querySelectorAll('[data-dimitri-channel]')];
  buttons.forEach((button) => button.addEventListener('click', () => {
    const channel = channels[Number(button.dataset.dimitriChannel)];
    if (!channel || !label || !copy) return;
    label.textContent = channel.label;
    copy.textContent = channel.copy;
    buttons.forEach((item) => item.classList.toggle('is-active', item === button));
  }));
})();
