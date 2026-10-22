(() => {
  'use strict';

  document.documentElement.classList.add('joey-ready');

  const revealTargets = [...document.querySelectorAll('[data-joey-reveal]')];
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
      label: 'SUPRIMENTOS // VARREDURA ATIVA',
      copy: 'Estrutura vasculhada. Recursos úteis separados antes que o perímetro feche.',
    },
    {
      label: 'COBERTURA // RETIRADA ABERTA',
      copy: 'Quando a ameaça ocupa a entrada, Joey mantém a saída disponível para o grupo inteiro.',
    },
    {
      label: 'HELLEN WREN // DUPLA CONFIRMADA',
      copy: 'Hellen encontra a passagem. Joey sustenta a rota de volta. Os dois seguem juntos.',
    },
  ];

  const reportLabel = document.querySelector('[data-joey-label]');
  const reportCopy = document.querySelector('[data-joey-copy]');
  const reportControls = [...document.querySelectorAll('[data-joey-readout]')];

  reportControls.forEach((button) => {
    button.addEventListener('click', () => {
      const report = reports[Number(button.dataset.joeyReadout)];
      if (!report || !reportLabel || !reportCopy) return;
      reportLabel.textContent = report.label;
      reportCopy.textContent = report.copy;
      reportControls.forEach((control) => {
        const active = control === button;
        control.classList.toggle('is-active', active);
        control.setAttribute('aria-pressed', String(active));
      });
    });
  });

  const records = [
    {
      code: 'J-12.1',
      title: 'Vigília de rota',
      caption: 'Antes de entrar, Joey mede o que o horizonte ainda pode esconder.',
      src: 'img-hellsing/joey-presente.png',
      alt: 'Joey observando o horizonte no presente pós-extinção',
    },
    {
      code: 'J-12.2',
      title: 'Posto de vigília',
      caption: 'A estrada continua mudando, mas Joey permanece atento ao que pode chegar por ela.',
      src: 'img-hellsing/joey-presente1.png',
      alt: 'Joey em um posto de vigília no presente pós-extinção',
    },
    {
      code: 'J-12.3',
      title: 'Campo aberto',
      caption: 'Equipamento pronto e uma decisão: seguir enquanto ainda existe luz na rota.',
      src: 'img-hellsing/joey-presente2.png',
      alt: 'Joey com equipamento de campo entre ruínas',
    },
    {
      code: 'J-12.4',
      title: 'Ponto de controle',
      caption: 'Entre estruturas destruídas, a leitura do ambiente decide se a equipe avança ou retorna.',
      src: 'img-hellsing/joey-gordon-presente.png',
      alt: 'Joey entre ruínas no presente pós-extinção',
    },
    {
      code: 'J-12.5',
      title: 'Entrada silenciosa',
      caption: 'Um mercado abandonado ainda pode oferecer recursos ou uma emboscada.',
      src: 'img-hellsing/joey-explorando.png',
      alt: 'Joey explorando uma estrutura abandonada',
    },
    {
      code: 'J-12.6',
      title: 'Recuperação',
      caption: 'O que cabe na mochila precisa justificar a volta pelo mesmo caminho.',
      src: 'img-hellsing/joey-explorando1.png',
      alt: 'Joey separando suprimentos em uma estrutura abandonada',
    },
    {
      code: 'J-12.7',
      title: 'Dupla em movimento',
      caption: 'Hellen e Joey leem o mesmo espaço por ângulos diferentes e seguem em frente.',
      src: 'img-hellsing/joey-hellen-explorando.png',
      alt: 'Joey e Hellen Wren em expedição por uma estrutura abandonada',
    },
    {
      code: 'J-12.8',
      title: 'Cobertura compartilhada',
      caption: 'Quando o silêncio termina, os dois respondem sem perder a saída de vista.',
      src: 'img-hellsing/joey-hellen-acao.png',
      alt: 'Joey e Hellen Wren cobrindo uma retirada juntos',
    },
    {
      code: 'J-12.9',
      title: 'Retirada',
      caption: 'Uma dupla só está completa quando ambos atravessam a porta de volta.',
      src: 'img-hellsing/joey-hellen-acao1.png',
      alt: 'Joey e Hellen Wren em combate juntos entre ruínas',
    },
    {
      code: 'J-12.10',
      title: 'Arquivo de vigília',
      caption: 'Fragmentos de uma rotina feita de estrada, atenção e permanência.',
      src: 'img-hellsing/joey-blocos.png',
      alt: 'Montagem de registros de Joey no presente',
    },
  ];

  const stage = document.querySelector('[data-joey-stage]');
  if (!stage) return;

  const image = stage.querySelector('[data-joey-image]');
  const code = stage.querySelector('[data-joey-record-code]');
  const title = stage.querySelector('[data-joey-record-title]');
  const caption = stage.querySelector('[data-joey-record-caption]');
  const progress = stage.querySelector('[data-joey-progress]');
  const count = document.querySelector('[data-joey-count]');
  const previous = stage.querySelector('[data-joey-previous]');
  const next = stage.querySelector('[data-joey-next]');
  const open = stage.querySelector('[data-joey-open]');
  const selectors = [...document.querySelectorAll('[data-joey-select]')];
  const dialog = document.querySelector('[data-joey-lightbox]');
  const dialogImage = document.querySelector('[data-joey-lightbox-image]');
  const dialogCode = document.querySelector('[data-joey-lightbox-code]');
  const dialogTitle = document.querySelector('[data-joey-lightbox-title]');
  const close = document.querySelector('[data-joey-close]');

  if (!image || !code || !title || !caption || !progress || !count || !previous || !next || !open) return;

  let current = 0;
  let cycle = null;
  let transition = 0;
  const digits = (value) => String(value).padStart(2, '0');

  function setRecord(index, immediate = false) {
    current = (index + records.length) % records.length;
    const record = records[current];
    const token = ++transition;

    code.textContent = record.code;
    title.textContent = record.title;
    caption.textContent = record.caption;
    count.textContent = digits(current + 1) + ' / ' + digits(records.length);
    progress.style.width = ((current + 1) / records.length) * 100 + '%';
    stage.style.setProperty('--joey-background', 'url("' + record.src + '")');

    selectors.forEach((button, buttonIndex) => {
      const active = buttonIndex === current;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    const showImage = () => {
      if (token !== transition) return;
      image.src = record.src;
      image.alt = record.alt;
      const reveal = () => {
        if (token === transition) image.classList.add('is-visible');
      };
      if (image.complete) reveal();
      else image.addEventListener('load', reveal, { once: true });
    };

    image.classList.remove('is-visible');
    if (immediate) showImage();
    else window.setTimeout(showImage, 180);
  }

  function stopCycle() {
    if (cycle) window.clearInterval(cycle);
    cycle = null;
  }

  function startCycle() {
    stopCycle();
    if (reducedMotion || document.hidden) return;
    cycle = window.setInterval(() => setRecord(current + 1), 6500);
  }

  function go(index) {
    setRecord(index);
    startCycle();
  }

  previous.addEventListener('click', () => go(current - 1));
  next.addEventListener('click', () => go(current + 1));
  selectors.forEach((button, index) => button.addEventListener('click', () => go(index)));
  stage.addEventListener('mouseenter', stopCycle);
  stage.addEventListener('mouseleave', startCycle);
  stage.addEventListener('focusin', stopCycle);
  stage.addEventListener('focusout', (event) => {
    if (!stage.contains(event.relatedTarget)) startCycle();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopCycle();
    else startCycle();
  });

  if (dialog && dialogImage && dialogCode && dialogTitle && close) {
    open.addEventListener('click', () => {
      const record = records[current];
      dialogImage.src = record.src;
      dialogImage.alt = record.alt;
      dialogCode.textContent = record.code;
      dialogTitle.textContent = record.title;
      if (typeof dialog.showModal === 'function') dialog.showModal();
    });
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  setRecord(0, true);
  startCycle();
})();
