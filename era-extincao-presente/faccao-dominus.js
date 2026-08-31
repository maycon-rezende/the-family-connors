(() => {
  const cursor = document.querySelector('.dominus-cursor');
  if (cursor && matchMedia('(pointer: fine)').matches) {
    addEventListener('pointermove', ({ clientX, clientY }) => {
      cursor.style.left = `${clientX}px`;
      cursor.style.top = `${clientY}px`;
    });
    document.querySelectorAll('a, button, .node').forEach((item) => {
      item.addEventListener('pointerenter', () => cursor.classList.add('active'));
      item.addEventListener('pointerleave', () => cursor.classList.remove('active'));
    });
  }

  const targets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    targets.forEach((target, index) => {
      target.style.transitionDelay = `${(index % 4) * 70}ms`;
      observer.observe(target);
    });
  } else {
    targets.forEach((target) => target.classList.add('visible'));
  }

  const fragments = [
    '> nome do pesquisador: LAURENCE M██████',
    '> colaboradora: ERIN ███████',
    '> localização primária: HADES',
    '> complexo superior: LEVIATHAN',
    '> classificação biológica: 6',
    '> designação recuperada: D O O _',
    '> alerta: O ORGANISMO ESTÁ APRENDENDO',
    '> conexão encerrada por origem remota',
  ];
  const output = document.querySelector('[data-output]');
  const decode = document.querySelector('[data-decode]');
  let fragmentIndex = 0;
  decode?.addEventListener('click', () => {
    if (!output) return;
    output.textContent += `\n${fragments[fragmentIndex]}`;
    output.scrollTop = output.scrollHeight;
    fragmentIndex += 1;
    if (fragmentIndex >= fragments.length) {
      decode.textContent = 'CONEXÃO PERDIDA';
      decode.disabled = true;
    }
  });

  const lock = document.querySelector('.final-lock');
  document.querySelector('[data-final-access]')?.addEventListener('click', (event) => {
    lock?.classList.add('denied');
    event.currentTarget.textContent = 'ACESSO REVOGADO';
  });

  const channel = document.querySelector('[data-channel]');
  const channels = ['CANAL // NÃO EXISTE', 'CANAL // JÁ ESTAVA ABERTO', 'CANAL // OBSERVANDO', 'CANAL // NÃO EXISTE'];
  let channelIndex = 0;
  setInterval(() => {
    if (!channel) return;
    channelIndex = (channelIndex + 1) % channels.length;
    channel.textContent = channels[channelIndex];
  }, 4200);
})();
