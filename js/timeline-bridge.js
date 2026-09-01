(() => {
  const portal = document.querySelector('[data-doomsday-portal]');
  if (!portal) return;

  const crossing = document.createElement('div');
  crossing.className = 'timeline-crossing';
  crossing.setAttribute('role', 'dialog');
  crossing.setAttribute('aria-modal', 'true');
  crossing.setAttribute('aria-hidden', 'true');
  crossing.innerHTML = `
    <div class="timeline-crossing__ice"></div><div class="timeline-crossing__fire"></div>
    <div class="timeline-crossing__noise"></div><div class="timeline-crossing__flash"></div>
    <div class="timeline-crossing__core">
      <span class="timeline-crossing__code">HELLSINGS // INTERCEPTAÇÃO TEMPORAL</span>
      <h2><span class="timeline-crossing__doom">DOOMS</span><span class="timeline-crossing__day">DAY</span></h2>
      <p class="timeline-crossing__status" aria-live="polite">Localizando arquivo ANT-DOOM-00...</p>
      <div class="timeline-crossing__bar"><i></i></div>
    </div>
    <button class="timeline-crossing__skip" type="button">ATRAVESSAR AGORA →</button>`;
  document.body.appendChild(crossing);

  const status = crossing.querySelector('.timeline-crossing__status');
  const skip = crossing.querySelector('.timeline-crossing__skip');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let destination = portal.href;
  let timers = [];

  const travel = () => {
    crossing.classList.add('is-departing');
    sessionStorage.setItem('connor_doomsday_crossing', 'ANT-DOOM-00');
    timers.push(setTimeout(() => (location.href = destination), reduced ? 120 : 720));
  };

  portal.addEventListener('click', (event) => {
    event.preventDefault();
    destination = portal.href;
    document.body.style.overflow = 'hidden';
    crossing.classList.add('is-active');
    crossing.setAttribute('aria-hidden', 'false');
    skip.focus();
    if (reduced) {
      status.textContent = 'Arquivo autenticado. Abrindo o Dia Zero...';
      timers.push(setTimeout(travel, 500));
      return;
    }
    const messages = [
      [850, 'Assinatura biológica localizada sob o gelo...'],
      [1650, 'Linha Connor sincronizada com o Dia Zero...'],
      [2450, 'Civilização restante: 02%...'],
      [3200, 'Arquivo autenticado. Abrindo a última manhã...'],
    ];
    messages.forEach(([delay, text]) =>
      timers.push(setTimeout(() => (status.textContent = text), delay))
    );
    timers.push(setTimeout(travel, 3900));
  });
  skip.addEventListener('click', travel);
})();
