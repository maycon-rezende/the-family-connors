(() => {
  'use strict';

  const records = [
    {
      code: 'H-10.1',
      title: 'Antes da passagem',
      caption: 'Uma bancada, uma rota e tudo o que a missão não pode deixar para trás.',
      src: 'img-hellsing/hellen-presente.png',
      alt: 'Hellen Wren trabalhando em uma bancada de campo',
    },
    {
      code: 'H-10.2',
      title: 'Cobertura em preparo',
      caption: 'Antes de cruzar uma fronteira, Hellen confere as peças que podem manter a equipe fora de vista.',
      src: 'img-hellsing/hellen-presente1.png',
      alt: 'Hellen Wren preparando equipamento em uma bancada no presente',
    },
    {
      code: 'H-10.3',
      title: 'Vigília de rota',
      caption: 'No posto avançado, ela observa o cenário antes de decidir qual identidade a missão vai exigir.',
      src: 'img-hellsing/hellen-presente2.png',
      alt: 'Hellen Wren em vigília num posto de campo dos Hellsings',
    },
    {
      code: 'H-10.4',
      title: 'Sem cobertura',
      caption: 'Quando já não existe espaço para o disfarce, o objetivo é abrir caminho para a saída.',
      src: 'img-hellsing/hellen-presente3.png',
      alt: 'Hellen Wren em combate com uma lâmina entre ruínas',
    },
    {
      code: 'H-10.5',
      title: 'Linha de extração',
      caption: 'O confronto revela a parte de Hellen que os nomes falsos nunca conseguem esconder.',
      src: 'img-hellsing/hellen-presente4.png',
      alt: 'Hellen Wren em combate com duas armas no presente',
    },
    {
      code: 'H-10.6',
      title: 'Busca silenciosa',
      caption: 'Entre prateleiras e metal enferrujado, Hellen procura o que pode manter a próxima rota em funcionamento.',
      src: 'img-hellsing/hellen-wren-presente.png',
      alt: 'Hellen Wren procurando suprimentos em uma construção abandonada',
    },
    {
      code: 'H-10.7',
      title: 'Pausa em vigília',
      caption: 'Mesmo no acampamento, a atenção não desarma. Um intervalo não é o mesmo que estar fora de perigo.',
      src: 'img-hellsing/hellen-wren2.png',
      alt: 'Hellen Wren sentada no acampamento ao entardecer',
    },
    {
      code: 'H-10.8',
      title: 'Leitura de rota',
      caption: 'Antes de cruzar as ruínas, cada linha do mapa vira uma possibilidade — ou um aviso.',
      src: 'img-hellsing/hellen-wren3.png',
      alt: 'Hellen Wren analisando um mapa de campo entre equipamentos',
    },
    {
      code: 'H-10.9',
      title: 'Vigília armada',
      caption: 'Quando a cobertura termina, Hellen sustenta a linha para que o restante da equipe continue avançando.',
      src: 'img-hellsing/hellen-presente5.png',
      alt: 'Hellen Wren em vigília armada no acampamento dos Hellsings',
    },
    {
      code: 'H-10.10',
      title: 'Motor de fuga',
      caption: 'Ferramentas, peças e uma rota de saída: preparação também é uma forma de se manter invisível.',
      src: 'img-hellsing/hellen-wren-presente1.png',
      alt: 'Hellen Wren realizando manutenção em uma motocicleta no acampamento',
    },
    {
      code: 'H-10.11',
      title: 'Horizonte de vigília',
      caption: 'Do alto das ruínas, ela observa o território antes que o próximo sinal se transforme em missão.',
      src: 'img-hellsing/wren-hellen.png',
      alt: 'Hellen Wren observando uma cidade destruída com binóculos ao amanhecer',
    },
  ];

  const stage = document.querySelector('[data-identity-stage]');
  if (!stage) return;

  const image = stage.querySelector('[data-identity-image]');
  const code = stage.querySelector('[data-identity-code]');
  const title = stage.querySelector('[data-identity-title]');
  const caption = stage.querySelector('[data-identity-caption]');
  const progress = stage.querySelector('[data-identity-progress]');
  const count = document.querySelector('[data-identity-count]');
  const previous = stage.querySelector('[data-identity-previous]');
  const next = stage.querySelector('[data-identity-next]');
  const open = stage.querySelector('[data-identity-open]');
  const selectors = [...document.querySelectorAll('[data-identity-select]')];
  const dialog = document.querySelector('[data-identity-lightbox]');
  const dialogImage = document.querySelector('[data-identity-lightbox-image]');
  const dialogCode = document.querySelector('[data-identity-lightbox-code]');
  const dialogTitle = document.querySelector('[data-identity-lightbox-title]');
  const close = document.querySelector('[data-identity-close]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    stage.style.setProperty('--identity-background', 'url("' + record.src + '")');
    selectors.forEach((button, buttonIndex) => {
      button.classList.toggle('is-active', buttonIndex === current);
      button.setAttribute('aria-pressed', String(buttonIndex === current));
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
