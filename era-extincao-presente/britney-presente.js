(() => {
  'use strict';

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

  const fragmentsKey = 'bc05-diary-fragments';
  const fallbackFragments = new Set();
  const chapters = [
    { id: 'start', title: 'A cidade ficou para trás.', text: '<p><b>DIA D // REGISTRO ABERTO</b> Bobby pediu que eu não olhasse para trás. Eu olhei mesmo assim. Não para contar os mortos — para guardar o desenho da rua, a placa torta, a janela acesa no terceiro andar. Naquele instante, achei que lembrar de cada detalhe nos ajudaria a voltar. Depois entendi: lembrar também era uma forma de não deixar que aquele lugar virasse apenas ruína.</p>', needs: null },
    { id: 'bobby', title: 'A conversa que continuou depois do churrasco.', text: '<p><b>ANTES DO DIA D // FRAGMENTO RECUPERADO</b> Jack reunia a equipe na mansão para que ninguém fosse só uma função ou uma patente. Bobby tinha acabado de chegar aos Hellsings quando nos conhecemos numa dessas noites. Falamos pouco naquela primeira vez; o bastante para eu notar que ele escutava até o que eu não dizia. O que veio depois não foi rápido. Foram encontros, confiança e a escolha repetida de ficar.</p>', needs: 'bobby' },
    { id: 'day-d', title: 'A primeira noite não terminou.', text: '<p><b>SEMANA 03</b> Jack abriu espaço para mim. Jully não fez perguntas. Alice me ensinou a fechar um ferimento sem tremer. Eu ainda não sabia que aquele gesto seria uma forma de família. Bobby passou a noite verificando as saídas; quando percebeu que eu estava filmando, não pediu para desligar. Só perguntou se eu queria que ele segurasse a luz.</p>', needs: 'day-d' },
    { id: 'mark', title: 'Algumas portas fecham por medo.', text: '<p><b>REGISTRO RECUPERADO</b> Quando saí da casa de Mark com uma mala, nenhum dos dois encontrou a frase certa. Eu precisava escolher um lugar onde pudesse atravessar a gravidez em paz; ele precisava aprender que cuidar de mim também significava me deixar decidir. O silêncio doeu, mas nunca apagou o parentesco. Eu continuava sendo irmã dele, mesmo do outro lado da porta.</p>', needs: 'mark' },
    { id: 'jully', title: 'A casa onde eu pude respirar.', text: '<p><b>FRAGMENTO // ENDEREÇO TEMPORÁRIO</b> Jully abriu espaço para mim sem transformar acolhimento em dívida. Na primeira noite, não perguntou o que eu faria depois do parto, do mês seguinte ou do fim do mundo. Fez chá, puxou uma cadeira e ficou por perto. Às vezes, uma pessoa salva outra antes de existir qualquer perigo visível: basta não deixá-la enfrentar sozinha uma decisão grande demais.</p>', needs: 'jully' },
    { id: 'camera', title: 'O que a câmera passou a guardar.', text: '<p><b>FRAGMENTO // MUDANÇA DE OFÍCIO</b> Antes do colapso, eu gravava para dividir o cotidiano com quem me acompanhava. Depois, parei de apontar a lente para mim. Passei a pedir licença antes de registrar alguém e a anotar nomes quando as imagens não podiam ser feitas. A câmera continuou comigo; mudou a pergunta. Já não era “vocês viram isto?”. Era “como faço para que ninguém esqueça que você esteve aqui?”.</p>', needs: 'camera' },
    { id: 'present', title: 'Agora eu encontro o caminho.', text: '<p><b>AGORA</b> Ainda procuro pegadas, padrões e rotas de fuga. Também procuro aquilo que não aparece no mapa: quem está com medo de pedir ajuda, quem ficou para trás na conversa, quem precisa ouvir o próprio nome. Se eu encontrar alguém na estrada, vou saber levá-lo de volta — e vou registrar de onde veio, caso precise encontrar esse caminho outra vez.</p>', needs: 'present' },
  ];
  const enigmas = [
    {
      id: 'bobby',
      title: 'O homem que ficou para a conversa',
      clue: 'No churrasco de Jack, um agente recém-chegado preferiu escutar Britney a falar de si. A relação demorou a começar; depois virou casamento e família. Qual é o nome pelo qual ela o chama?',
      answers: ['bobby', 'bobby lee', 'bobby lee yagami'],
      hint: 'A resposta também aparece nas legendas das duas fotografias.',
    },
    {
      id: 'jully',
      title: 'A porta sem perguntas',
      clue: 'Britney saiu da casa de Mark quando soube da gravidez. Qual irmã dividiu com ela o novo endereço e o silêncio daquela primeira noite?',
      answers: ['jully'],
      hint: 'Procure o nome da irmã na carta e no registro sobre a mala.',
    },
    {
      id: 'camera',
      title: 'Antes de virar arquivo',
      clue: 'Britney já registrava o cotidiano antes do Dia D. Que aparelho continuou com ela quando gravar deixou de ser compartilhar e virou preservar?',
      answers: ['camera', 'câmera', 'filmadora', 'camera de video', 'câmera de vídeo'],
      hint: 'É o objeto que aparece no texto da página e na entrada sobre a mudança de ofício.',
    },
  ];

  const diary = document.querySelector('[data-record="diary-investigation"]');
  const content = diary?.querySelector('[data-diary-content]');
  const enigmaList = diary?.querySelector('[data-enigma-list]');
  const lock = diary?.querySelector('[data-diary-lock]');
  const progress = diary?.querySelector('[data-diary-progress]');

  function found() {
    try {
      const saved = JSON.parse(localStorage.getItem(fragmentsKey) || '[]');
      return new Set([...fallbackFragments, ...(Array.isArray(saved) ? saved : [])]);
    } catch {
      return new Set(fallbackFragments);
    }
  }

  function normalize(answer) {
    return answer
      .trim()
      .toLocaleLowerCase('pt-BR')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '');
  }

  function renderEnigmas(unlocked) {
    if (!enigmaList) return;
    enigmaList.innerHTML = enigmas.map((enigma) => {
      if (unlocked.has(enigma.id)) {
        return `<article class="britney-enigma is-solved"><span>CHAVE RECUPERADA // ${enigma.id.toUpperCase()}</span><h4>${enigma.title}</h4><p>Este fragmento já está aberto no caderno.</p></article>`;
      }
      return `<article class="britney-enigma"><span>ENIGMA // ${enigma.id.toUpperCase()}</span><h4>${enigma.title}</h4><p>${enigma.clue}</p><form data-enigma-form="${enigma.id}"><label for="britney-answer-${enigma.id}">Sua resposta</label><div><input id="britney-answer-${enigma.id}" type="text" autocomplete="off" required aria-describedby="britney-hint-${enigma.id}" /><button type="submit">VERIFICAR</button></div><small id="britney-hint-${enigma.id}">${enigma.hint}</small><output aria-live="polite"></output></form></article>`;
    }).join('');
  }

  function renderDiary() {
    if (!content) return;
    const unlocked = found();
    const visible = chapters.filter((chapter) => !chapter.needs || unlocked.has(chapter.needs));
    content.innerHTML = visible.map((chapter, index) => `<article class="diary-chapter"><span>CAPÍTULO ${String(index + 1).padStart(2, '0')} // ${chapter.id.toUpperCase()}</span><h3>${chapter.title}</h3>${chapter.text}</article>`).join('');
    renderEnigmas(unlocked);
    const complete = chapters.every((chapter) => !chapter.needs || unlocked.has(chapter.needs));
    if (progress) progress.textContent = `FRAGMENTOS ${String(visible.length).padStart(2, '0')} // ${String(chapters.length).padStart(2, '0')}`;
    if (lock) lock.textContent = complete ? 'ARQUIVO COMPLETO // TODAS AS PÁGINAS RECUPERADAS' : `${visible.length} DE ${chapters.length} PÁGINAS ABERTAS // RESOLVA OS ENIGMAS OU RECUPERE FRAGMENTOS PELO SITE`;
  }

  enigmaList?.addEventListener('submit', (event) => {
    const form = event.target.closest('[data-enigma-form]');
    if (!form) return;
    event.preventDefault();
    const enigma = enigmas.find((item) => item.id === form.dataset.enigmaForm);
    if (!enigma) return;
    const input = form.querySelector('input');
    const output = form.querySelector('output');
    const accepted = enigma.answers.some((answer) => normalize(answer) === normalize(input.value));
    if (!accepted) {
      output.textContent = 'Ainda não. Releia a pista e tente outra vez.';
      form.classList.add('has-error');
      input.focus();
      return;
    }
    const unlocked = found();
    unlocked.add(enigma.id);
    fallbackFragments.add(enigma.id);
    try { localStorage.setItem(fragmentsKey, JSON.stringify([...unlocked])); } catch { /* O fragmento permanece disponível nesta visita. */ }
    window.dispatchEvent(new CustomEvent('diary-fragment-found', { detail: enigma.id }));
  });

  document.querySelectorAll('[data-open-record]').forEach((button) => {
    const target = button.dataset.openRecord;
    const dialog = document.querySelector(`[data-record="${target}"]`);
    if (!dialog) return;
    button.addEventListener('click', () => {
      const parentDialog = button.closest('dialog');
      if (parentDialog && parentDialog !== dialog && parentDialog.open) parentDialog.close();
      if (target === 'diary-investigation') renderDiary();
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    });
  });

  document.querySelectorAll('[data-close-record]').forEach((button) => button.addEventListener('click', () => button.closest('dialog')?.close()));
  document.querySelectorAll('.britney-record').forEach((dialogElement) => dialogElement.addEventListener('click', (event) => { if (event.target === dialogElement) dialogElement.close(); }));
  window.addEventListener('diary-fragment-found', renderDiary);
})();
