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
    { label: 'СЕВЕР // ROTA EM ANÁLISE', copy: 'Os registros disponíveis não identificam uma operação ou rota específica.' },
    { label: 'СТАЛЬ // FUNÇÃO EM ANÁLISE', copy: 'Intervenção e extração permanecem hipóteses até a definição da biografia oficial.' },
    { label: 'ВОЗВРАТ // CONTEXTO PENDENTE', copy: 'A imagem com Jack confirma o registro conjunto, mas não a missão ou o papel de cada agente.' },
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
