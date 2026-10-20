(() => {
  'use strict';

  const records = [
    {
      code: 'AS-PRE-01',
      title: 'Vigília de campo',
      caption: 'Ariani observa o acampamento antes que qualquer conversa comece.',
      src: 'img-hellsing/ariani-presente.png',
      alt: 'Ariani Connor em vigília no acampamento dos Hellsings',
    },
    {
      code: 'AS-PRE-02',
      title: 'Informação em movimento',
      caption: 'Nenhuma rota é segura sem alguém disposto a ler o que o cenário esconde.',
      src: 'img-hellsing/ariani-salvatore.png',
      alt: 'Ariani Salvatore Connor armada diante de estruturas destruídas',
    },
    {
      code: 'AS-PRE-03',
      title: 'A decisão antes do risco',
      caption: 'Ela mantém a calma quando a cidade já não oferece respostas simples.',
      src: 'img-hellsing/salvatore-ariani.png',
      alt: 'Ariani Connor armada em uma rua devastada',
    },
    {
      code: 'AS-PRE-04',
      title: 'Força e razão',
      caption: 'Ao lado de Mark, Ariani encontra repouso sem abandonar a vigilância.',
      src: 'img-hellsing/ariani-mark.png',
      alt: 'Ariani e Mark Connor juntos no acampamento ao entardecer',
    },
    {
      code: 'AS-PRE-05',
      title: 'O ponto de retorno',
      caption: 'Há decisões que só sobrevivem porque alguém ainda se importa com quem volta.',
      src: 'img-hellsing/ariani-mark1.png',
      alt: 'Ariani e Mark Connor juntos diante de uma fogueira no acampamento',
    },
    {
      code: 'AS-PRE-06',
      title: 'Parceria em alerta',
      caption: 'A inteligência de Ariani e a força de Mark se encontram quando a rota fecha.',
      src: 'img-hellsing/ariani-mark-acao.png',
      alt: 'Ariani e Mark Connor em uma cena de ação entre ruínas',
    },
    {
      code: 'AS-PRE-07',
      title: 'Sinal de ameaça',
      caption: 'Ela lê o perigo enquanto o grupo procura o próximo abrigo.',
      src: 'img-hellsing/markari-presente.png',
      alt: 'Ariani e Mark Connor armados em uma cidade em ruínas',
    },
    {
      code: 'AS-PRE-08',
      title: 'Aliança preservada',
      caption: 'Ariani e Alice compartilham a responsabilidade de manter os sobreviventes vivos.',
      src: 'img-hellsing/alice-ariani.png',
      alt: 'Ariani e Alice juntas no presente após a extinção',
    },
  ];

  const stage = document.querySelector('[data-carousel]');
  if (!stage) return;

  const image = stage.querySelector('[data-carousel-image]');
  const code = stage.querySelector('[data-carousel-code]');
  const title = stage.querySelector('[data-carousel-title]');
  const caption = stage.querySelector('[data-carousel-caption]');
  const progress = stage.querySelector('[data-carousel-progress]');
  const count = document.querySelector('[data-carousel-count]');
  const previous = stage.querySelector('[data-carousel-prev]');
  const next = stage.querySelector('[data-carousel-next]');
  const open = stage.querySelector('[data-carousel-open]');
  const dialog = document.querySelector('[data-lightbox]');
  const dialogImage = document.querySelector('[data-lightbox-image]');
  const dialogCode = document.querySelector('[data-lightbox-code]');
  const dialogTitle = document.querySelector('[data-lightbox-title]');
  const close = document.querySelector('[data-lightbox-close]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let current = 0;
  let cycle = null;
  let transition = 0;

  const twoDigits = (value) => String(value).padStart(2, '0');

  function setRecord(index, immediate = false) {
    current = (index + records.length) % records.length;
    const record = records[current];
    const token = ++transition;

    code.textContent = record.code;
    title.textContent = record.title;
    caption.textContent = record.caption;
    count.textContent = `${twoDigits(current + 1)} / ${twoDigits(records.length)}`;
    progress.style.width = `${((current + 1) / records.length) * 100}%`;

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

    if (immediate) {
      image.classList.remove('is-visible');
      showImage();
      return;
    }

    image.classList.remove('is-visible');
    window.setTimeout(showImage, 180);
  }

  function stopCycle() {
    if (cycle) window.clearInterval(cycle);
    cycle = null;
  }

  function startCycle() {
    stopCycle();
    if (reducedMotion || document.hidden) return;
    cycle = window.setInterval(() => setRecord(current + 1), 6200);
  }

  function go(index) {
    setRecord(index);
    startCycle();
  }

  previous.addEventListener('click', () => go(current - 1));
  next.addEventListener('click', () => go(current + 1));

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

  setRecord(0, true);
  startCycle();

  window.setTimeout(() => {
    records.slice(1).forEach((record) => {
      const preload = new Image();
      preload.src = record.src;
    });
  }, 1500);
})();
