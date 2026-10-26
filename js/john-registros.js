(() => {
  'use strict';

  const records = [
    { code: 'J-06.1', title: 'Resposta de campo', caption: 'John presta atendimento de campo a um integrante dos Hellsings.', src: 'img-hellsing/john-presente.png', alt: 'John prestando atendimento de campo a um integrante dos Hellsings' },
    { code: 'J-06.2', title: 'Linha de cobertura', caption: 'John aparece em posição de cobertura entre ruínas.', src: 'img-hellsing/john-bertolai-presente.png', alt: 'John em posição de cobertura entre ruínas' },
    { code: 'J-06.3', title: 'Duas frentes', caption: 'Registro de John e Amelia em cobertura antes da morte de John.', src: 'img-hellsing/john-amelia-presente.png', alt: 'John e Amelia em cobertura entre ruínas no presente' },
    { code: 'J-06.4', title: 'Saída sob pressão', caption: 'John e Amelia aparecem em movimento entre ruínas.', src: 'img-hellsing/john-amelia-presente1.png', alt: 'John e Amelia avançando entre ruínas no presente' },
    { code: 'J-06.5', title: 'Vigília compartilhada', caption: 'Os dois aparecem em um registro de vigilância.', src: 'img-hellsing/john-amelia-presente2.png', alt: 'John e Amelia em vigilância no presente' },
    { code: 'J-06.6', title: 'Passagem estreita', caption: 'John e Amelia aparecem em uma passagem entre ruínas.', src: 'img-hellsing/john-amelia-presente3.png', alt: 'John e Amelia protegendo uma passagem entre ruínas' },
    { code: 'J-06.7', title: 'Linha compartilhada', caption: 'Arquivo visual da dupla em campo antes da última missão de John.', src: 'img-hellsing/john-amelia-presente4.png', alt: 'John e Amelia na linha de frente no presente' },
    { code: 'J-06.8', title: 'Retirada sob pressão', caption: 'Registro de John e Amelia em retirada.', src: 'img-hellsing/john-amelia-presente5.png', alt: 'John e Amelia em retirada sob pressão' },
    { code: 'J-06.9', title: 'Ponto de retorno', caption: 'John e Amelia aparecem juntos em uma rota no presente.', src: 'img-hellsing/john&amelia-presente.png', alt: 'John e Amelia juntos em uma rota no presente' },
    { code: 'J-06.10', title: 'Registro compartilhado', caption: 'Imagem preservada de John e Amelia, sem data ou missão identificada.', src: 'img-hellsing/john_amelia-presente.png', alt: 'John e Amelia em um registro compartilhado no presente' },
    { code: 'J-06.11', title: 'Arquivo associado', caption: 'Retrato de Amelia sem data identificada, associado ao acervo visual de John.', src: 'img-hellsing/amelia-presente.png', alt: 'Retrato de Amelia sem data identificada' },
  ];

  const stage = document.querySelector('[data-john-stage]');
  if (!stage) return;

  const image = stage.querySelector('[data-john-image]');
  const code = stage.querySelector('[data-john-record-code]');
  const title = stage.querySelector('[data-john-record-title]');
  const caption = stage.querySelector('[data-john-record-caption]');
  const progress = stage.querySelector('[data-john-progress]');
  const count = document.querySelector('[data-john-count]');
  const previous = stage.querySelector('[data-john-previous]');
  const next = stage.querySelector('[data-john-next]');
  const open = stage.querySelector('[data-john-open]');
  const selectors = [...document.querySelectorAll('[data-john-select]')];
  const dialog = document.querySelector('[data-john-lightbox]');
  const dialogImage = document.querySelector('[data-john-lightbox-image]');
  const dialogCode = document.querySelector('[data-john-lightbox-code]');
  const dialogTitle = document.querySelector('[data-john-lightbox-title]');
  const close = document.querySelector('[data-john-close]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = matchMedia('(hover: hover)').matches;

  if (!image || !code || !title || !caption || !progress || !count || !previous || !next || !open) return;

  let current = 0;
  let cycle = null;
  let transition = 0;
  const digits = (value) => String(value).padStart(2, '0');
  const interactionAreas = [stage, ...new Set(selectors.map((button) => button.parentElement).filter(Boolean))];
  const isInteracting = () =>
    Boolean(dialog?.open) ||
    interactionAreas.some((area) => area.contains(document.activeElement) || (canHover && area.matches(':hover')));

  function preloadNext(index) {
    const record = records[(index + 1) % records.length];
    const preload = new Image();
    preload.src = record.src;
  }

  function setRecord(index, immediate = false) {
    current = (index + records.length) % records.length;
    const record = records[current];
    const token = ++transition;

    code.textContent = record.code;
    title.textContent = record.title;
    caption.textContent = record.caption;
    count.textContent = `${digits(current + 1)} / ${digits(records.length)}`;
    progress.style.width = `${((current + 1) / records.length) * 100}%`;
    selectors.forEach((button, buttonIndex) => {
      const active = buttonIndex === current;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });

    const showImage = () => {
      if (token !== transition) return;
      image.src = record.src;
      image.alt = record.alt;
      const reveal = () => { if (token === transition) image.classList.add('is-visible'); };
      if (image.complete) reveal();
      else image.addEventListener('load', reveal, { once: true });
      preloadNext(current);
    };

    image.classList.remove('is-visible');
    if (immediate) showImage();
    else window.setTimeout(showImage, 180);
  }

  function stopCycle() { if (cycle) window.clearInterval(cycle); cycle = null; }
  function startCycle() {
    stopCycle();
    if (reducedMotion || document.hidden || isInteracting()) return;
    cycle = window.setInterval(() => setRecord(current + 1), 6500);
  }
  function go(index) { setRecord(index); startCycle(); }

  previous.addEventListener('click', () => go(current - 1));
  next.addEventListener('click', () => go(current + 1));
  selectors.forEach((button, index) => button.addEventListener('click', () => go(index)));
  interactionAreas.forEach((area) => {
    area.addEventListener('mouseenter', stopCycle);
    area.addEventListener('mouseleave', startCycle);
    area.addEventListener('focusin', stopCycle);
    area.addEventListener('focusout', () => window.setTimeout(startCycle, 0));
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopCycle(); else startCycle(); });

  if (dialog && dialogImage && dialogCode && dialogTitle && close) {
    open.addEventListener('click', () => {
      const record = records[current];
      dialogImage.src = record.src;
      dialogImage.alt = record.alt;
      dialogCode.textContent = record.code;
      dialogTitle.textContent = record.title;
      if (typeof dialog.showModal === 'function') {
        stopCycle();
        dialog.showModal();
      }
    });
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => window.setTimeout(startCycle, 0));
  }

  setRecord(0, true);
  startCycle();
})();
