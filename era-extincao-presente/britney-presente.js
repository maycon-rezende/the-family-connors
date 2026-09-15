(() => {
  const photoSection = document.querySelector('[data-gallery]')?.closest('.chapter');
  if (photoSection) {
    photoSection.classList.add('britney-photo-memories');
    const title = photoSection.querySelector('.gallery-heading h2');
    const eyebrow = photoSection.querySelector('.gallery-heading .eyebrow');
    const intro = photoSection.querySelector('.gallery-heading p');
    if (eyebrow) eyebrow.textContent = 'ÁLBUM PESSOAL // BC-05 // REGISTROS PRESERVADOS';
    if (title) title.innerHTML = 'Lembranças<br><em>fotográficas.</em>';
    if (intro) intro.textContent = 'Antes de rastrear sinais, Britney colecionava instantes. Estas imagens são o álbum de uma mulher que aprendeu a guardar o que o mundo tenta apagar.';
    const label = document.createElement('div');
    label.className = 'photo-album-label';
    label.innerHTML = '<span>MEMÓRIAS DO TEMPO</span><i>04 REGISTROS // PRESENTE</i>';
    photoSection.querySelector('[data-gallery]')?.before(label);
  }
  const buttons = document.querySelectorAll('[data-open-record]');
  const fragmentsKey = 'bc05-diary-fragments';
  const chapters = [
    { id: 'start', title: 'O mundo acabou. Eu continuei.', text: '<p><b>DIA D</b> A cidade desapareceu em poucas horas. Bobby disse para eu não olhar para trás. Eu olhei.</p>', needs: null },
    { id: 'day-d', title: 'A primeira noite não terminou.', text: '<p><b>SEMANA 03</b> Jack abriu espaço para mim. Jully não fez perguntas. Alice me ensinou a fechar um ferimento sem tremer. Eu ainda não sabia que aquele gesto seria uma forma de família.</p>', needs: 'day-d' },
    { id: 'mark', title: 'Algumas portas fecham por medo.', text: '<p><b>REGISTRO RECUPERADO</b> Mark e eu passamos tempo demais sem nos falar. A raiva dele era medo com outro nome. Quando os Hellsings vieram me buscar, ele finalmente entendeu que eu nunca tinha deixado de ser sua irmã.</p>', needs: 'mark' },
    { id: 'present', title: 'Agora eu encontro o caminho.', text: '<p><b>AGORA</b> Não sou mais a garota que transmitia cada passo. Ainda registro tudo, mas agora procuro pegadas, padrões e rotas de fuga. Se eu encontrar alguém, vou saber levá-lo de volta.</p>', needs: 'present' },
  ];
  const diary = document.querySelector('[data-record="diary-investigation"]');
  const content = diary?.querySelector('[data-diary-content]');
  const lock = diary?.querySelector('[data-diary-lock]');
  const progress = diary?.querySelector('[data-diary-progress]');
  const found = () => new Set(JSON.parse(localStorage.getItem(fragmentsKey) || '[]'));
  const renderDiary = () => {
    if (!content) return;
    const unlocked = found();
    const visible = chapters.filter((chapter) => !chapter.needs || unlocked.has(chapter.needs));
    content.innerHTML = visible.map((chapter, index) => `<article class="diary-chapter"><span>CAPÍTULO ${String(index + 1).padStart(2, '0')} // ${chapter.id.toUpperCase()}</span><h3>${chapter.title}</h3>${chapter.text}</article>`).join('');
    const next = chapters.find((chapter) => chapter.needs && !unlocked.has(chapter.needs));
    if (progress) progress.textContent = `CAPÍTULO ${String(visible.length).padStart(2, '0')} // 04`;
    if (lock) lock.textContent = next ? `ENCONTRE A OUTRA PARTE DO DIÁRIO // PISTA: ${next.needs.toUpperCase()}` : 'ARQUIVO COMPLETO // TODOS OS FRAGMENTOS RECUPERADOS';
  };
  buttons.forEach((button) => {
    const target = button.dataset.openRecord === 'diary' ? 'diary-investigation' : button.dataset.openRecord;
    const dialog = document.querySelector(`[data-record="${target}"]`);
    if (!dialog) return;
    button.addEventListener('click', () => {
      if (target === 'diary-investigation') renderDiary();
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    });
  });
  document.querySelectorAll('[data-close-record]').forEach((button) => button.addEventListener('click', () => button.closest('dialog')?.close()));
  document.querySelectorAll('.britney-record').forEach((dialog) => dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); }));
  window.addEventListener('diary-fragment-found', renderDiary);
})();
