(() => {
  'use strict';

  document.documentElement.classList.add('luke-js');

  const channels = [
    {
      label: 'ROTA NORTE // TRÊS SAÍDAS CONFIRMADAS',
      copy:
        'A rota norte permanece limpa por enquanto. O campo muda; a equipe precisa mudar junto.',
      frequency: '146.8',
      status: 'RECEPÇÃO FRACA // ESCUTA ATIVA',
      signal: 'weak',
      tone: 1180,
    },
    {
      label: 'TRAVESSIA // MARCAS DE RETORNO',
      copy:
        'Túneis, florestas queimadas e cidades sem nome exigem leitura constante. Uma rota segura só existe enquanto pode ser atravessada.',
      frequency: '149.2',
      status: 'SINAL INTERMITENTE // INTERFERÊNCIA',
      signal: 'unstable',
      tone: 1540,
    },
    {
      label: 'ROTA L-0 // ACESSO NEGADO',
      copy:
        'Luke selou a passagem pessoalmente e a removeu dos mapas oficiais. Toda noite, ele ainda verifica o selo.',
      frequency: '000.0',
      status: 'PORTADORA AUSENTE // FAIXA SILENCIOSA',
      signal: 'lost',
      tone: 720,
    },
  ];

  const label = document.querySelector('[data-luke-channel-label]');
  const copy = document.querySelector('[data-luke-channel-copy]');
  const buttons = [...document.querySelectorAll('[data-luke-channel]')];
  const radioPanel = document.querySelector('[data-luke-radio]');
  const frequencyReadout = document.querySelector('[data-luke-frequency]');
  const radioStatus = document.querySelector('[data-luke-radio-status]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let radioEngine = null;
  let interferenceTimer;
  let tuningTimer;

  function createRadioEngine() {
    if (radioEngine) return true;
    const AudioContextType = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextType) return false;

    try {
      const context = new AudioContextType();
      const length = Math.floor(context.sampleRate * 2);
      const buffer = context.createBuffer(1, length, context.sampleRate);
      const samples = buffer.getChannelData(0);
      for (let index = 0; index < length; index += 1) {
        samples[index] = (Math.random() * 2 - 1) * 0.48;
      }

      const source = context.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      const filter = context.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1180;
      filter.Q.value = 0.72;
      const lowpass = context.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.value = 2800;
      const gain = context.createGain();
      gain.gain.value = 0.0001;

      source.connect(filter);
      filter.connect(lowpass);
      lowpass.connect(gain);
      gain.connect(context.destination);
      source.start();
      context.resume().catch(() => {});
      radioEngine = { context, filter, gain, source };
      return true;
    } catch {
      return false;
    }
  }

  function playRadioStatic(peak = 0.03, duration = 0.34) {
    if (!radioEngine) return;
    const { context, gain } = radioEngine;
    const now = context.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(peak, now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  }

  function activateRadio() {
    if (document.body.classList.contains('luke-opening-active')) return;
    if (!createRadioEngine()) return;
    window.removeEventListener('pointerdown', activateRadio);
    window.removeEventListener('keydown', activateRadio);
    playRadioStatic(0.022, 0.32);
  }

  window.addEventListener('pointerdown', activateRadio, { passive: true });
  window.addEventListener('keydown', activateRadio, { passive: true });

  if (label && copy && buttons.length) {
    const selectChannel = (index) => {
      const channel = channels[index] || channels[0];
      label.textContent = channel.label;
      copy.textContent = channel.copy;
      if (frequencyReadout) frequencyReadout.textContent = channel.frequency;
      if (radioStatus) radioStatus.textContent = channel.status;
      if (radioPanel) {
        radioPanel.dataset.signal = channel.signal;
        radioPanel.classList.add('is-tuning');
        window.clearTimeout(tuningTimer);
        tuningTimer = window.setTimeout(() => radioPanel.classList.remove('is-tuning'), 720);
      }

      buttons.forEach((button, buttonIndex) => {
        const active = buttonIndex === index;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
      });

      if (radioEngine) {
        radioEngine.filter.frequency.setTargetAtTime(channel.tone, radioEngine.context.currentTime, 0.06);
        playRadioStatic(channel.signal === 'lost' ? 0.048 : 0.032, channel.signal === 'lost' ? 0.72 : 0.42);
      }
    };

    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.classList.contains('is-active')));
      button.addEventListener('click', () => {
        const index = Number(button.dataset.lukeChannel);
        selectChannel(Number.isInteger(index) ? index : 0);
      });
    });

    selectChannel(0);
  }

  if (!reducedMotion) {
    const dust = document.querySelector('.luke-dust');
    if (dust) {
      const count = matchMedia('(max-width: 760px)').matches ? 22 : 38;
      const grains = document.createDocumentFragment();
      for (let index = 0; index < count; index += 1) {
        const grain = document.createElement('span');
        const duration = 13 + Math.random() * 21;
        grain.className = 'luke-dust__grain';
        grain.style.setProperty('--grain-left', `${Math.random() * 100}%`);
        grain.style.setProperty('--grain-size', `${(0.7 + Math.random() * 1.4).toFixed(2)}px`);
        grain.style.setProperty('--grain-opacity', (0.32 + Math.random() * 0.56).toFixed(2));
        grain.style.setProperty('--grain-duration', `${duration.toFixed(1)}s`);
        grain.style.setProperty('--grain-delay', `${(-Math.random() * duration).toFixed(1)}s`);
        grain.style.setProperty('--grain-drift', `${(-7 + Math.random() * 14).toFixed(1)}vw`);
        grains.append(grain);
      }
      dust.append(grains);
    }

    function scheduleInterference() {
      interferenceTimer = window.setTimeout(() => {
        if (!document.hidden) {
          const line = 12 + Math.random() * 76;
          document.documentElement.style.setProperty('--luke-glitch-line', `${line.toFixed(1)}%`);
          document.body.classList.add('luke-frequency-break');
          if (radioEngine && Math.random() > 0.42) playRadioStatic(0.018, 0.18);
          window.setTimeout(() => document.body.classList.remove('luke-frequency-break'), 250);
        }
        scheduleInterference();
      }, 12000 + Math.random() * 19000);
    }

    scheduleInterference();
  }

  const revealItems = [...document.querySelectorAll('[data-reveal]')];
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
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
  }

  window.addEventListener('pagehide', () => {
    window.clearTimeout(interferenceTimer);
    window.clearTimeout(tuningTimer);
    if (radioEngine) {
      try { radioEngine.source.stop(); } catch {}
      radioEngine.context.close().catch(() => {});
    }
  }, { once: true });
})();
