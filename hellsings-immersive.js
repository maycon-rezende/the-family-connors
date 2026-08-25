(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

  const meter = document.createElement('div');
  meter.className = 'hls-access-meter';
  meter.innerHTML = '<b>NÍVEL DE ACESSO</b><small id="hls-access-level">DELTA</small>';
  meter.style.setProperty('--access', '0%');
  document.body.append(meter);
  const accessLabel = meter.querySelector('small');
  const updateAccess = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const progress = Math.min(1, scrollY / max);
    const levels =
      progress < 0.22 ? 'DELTA' : progress < 0.48 ? 'GAMMA' : progress < 0.76 ? 'SIGMA' : 'ÔMEGA';
    meter.style.setProperty('--access', `${Math.round(progress * 100)}%`);
    accessLabel.textContent = levels;
  };
  addEventListener('scroll', updateAccess, { passive: true });
  updateAccess();

  document.querySelectorAll('.bunker-frame,.facility-track article').forEach((frame, index) => {
    const ui = document.createElement('i');
    ui.className = 'hls-camera-ui';
    ui.dataset.camera = String(index + 1).padStart(2, '0');
    ui.dataset.time = '--:--:--';
    frame.append(ui);
  });
  const cameraClock = () => {
    const now = new Date().toLocaleTimeString('pt-BR', { hour12: false });
    document
      .querySelectorAll('.hls-camera-ui')
      .forEach((ui) => (ui.dataset.time = `${now} // AO VIVO`));
  };
  cameraClock();
  setInterval(cameraClock, 1000);

  const detail = document.querySelector('#mission-detail');
  document.querySelectorAll('.mission-record').forEach((record) =>
    record.addEventListener(
      'click',
      () => {
        if (reduced || !detail) return;
        record.classList.add('decrypting');
        detail.classList.add('is-decoding');
        setTimeout(() => {
          record.classList.remove('decrypting');
          detail.classList.remove('is-decoding');
        }, 620);
      },
      { capture: true }
    )
  );

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'red-protocol-trigger';
  trigger.textContent = 'HLS';
  trigger.setAttribute('aria-label', 'Ativar Protocolo Vermelho');
  trigger.setAttribute('aria-pressed', 'false');
  const banner = document.createElement('div');
  banner.className = 'red-protocol-banner';
  banner.innerHTML =
    '<span>⚠ ALERTA INTERNO</span><b>PROTOCOLO VERMELHO ATIVO</b><span>SETORES EM CONTENÇÃO</span>';
  document.body.append(banner, trigger);
  trigger.addEventListener('click', () => {
    const active = document.body.classList.toggle('protocol-red');
    trigger.setAttribute('aria-pressed', String(active));
    trigger.setAttribute(
      'aria-label',
      active ? 'Desativar Protocolo Vermelho' : 'Ativar Protocolo Vermelho'
    );
  });

  if (finePointer) {
    const label = document.createElement('span');
    label.className = 'hls-cursor-label';
    document.body.append(label);
    const contexts = [
      ['.agent', 'LER BIOMETRIA', false],
      ['.mission-record', 'DESCLASSIFICAR', false],
      ['.bunker-frame,.facility-track article', 'MONITORAR CÂMERA', false],
      ['#secure-forum button', 'ABRIR TRANSMISSÃO', false],
      [
        '#contract-form input,#contract-form textarea,#contract-form select',
        'CANAL EXTERNO',
        false,
      ],
      ['.classified-stat', 'ACESSO NEGADO', true],
      ['.red-protocol-trigger', 'ALERTA MÁXIMO', true],
    ];
    const activeLayer = () =>
      [...document.querySelectorAll('dialog[open]')].at(-1) || document.body;
    document.addEventListener(
      'pointermove',
      (event) => {
        const layer = activeLayer();
        if (label.parentElement !== layer) layer.append(label);
        label.style.transform = `translate3d(${event.clientX}px,${event.clientY}px,0)`;
        const context = contexts.find(([selector]) => event.target.closest(selector));
        label.classList.toggle('show', Boolean(context));
        label.classList.toggle('denied', Boolean(context?.[2]));
        if (context) label.textContent = context[1];
      },
      { passive: true }
    );
    document.addEventListener('pointerup', (event) => {
      const ping = document.createElement('i');
      ping.className = 'hls-cursor-ping';
      ping.style.left = `${event.clientX}px`;
      ping.style.top = `${event.clientY}px`;
      activeLayer().append(ping);
      ping.addEventListener('animationend', () => ping.remove(), { once: true });
    });
  }
})();
