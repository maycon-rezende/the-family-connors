(() => {
  'use strict';
  const DURATION = 117.702;
  const $ = (selector) => document.querySelector(selector);
  const stage = $('.intro-stage');
  const awakening = $('.awakening');
  const audio = $('#introReferenceAudio');
  const copy = $('.intro-copy');
  const finalCard = $('.intro-final');
  const status = $('#introStatus');
  const cursor = $('.intro-cursor');
  const I = (src, start, end, text = null, className = '') => ({ kind: 'img', src, start, end, text, className });
  const V = (src, start, end, text = null, className = '', offset = 0) => ({ kind: 'video', src, start, end, text, className, offset });

  // O áudio é o único relógio da abertura. Cenas nunca alteram ou reiniciam a faixa.
  const scenes = [
    I('img-intro/frame-01-ultimo-mundo.jpg', 0, 5.02, ['MEMÓRIA RECUPERADA // O ÚLTIMO MUNDO', 'Eu quero mostrar', 'algo belo.', 'Antes do silêncio, ainda existia um lar.']),
    V('video/brothers2.mp4', 5.02, 10.319, ['ARQUIVO CONNOR // ANTES DO DIA D', 'Eles ainda estavam', 'juntos.', 'Jack, Mark, Jully e Britney. Alice e Ariani ainda conheciam a paz.']),
    V('video/ariani&alice.mp4', 10.319, 16.952, ['REGISTRO FAMILIAR // ÚLTIMA NOITE', 'Ninguém sabia', 'o que despertava.', 'A notícia chegou primeiro como uma descoberta sob o gelo.'], 'fit-video'),
    I('img-intro/frame-37-antartica-hades.png', 16.952, 20.8, ['COORDENADAS APAGADAS // ANTÁRTICA', 'Sob quilômetros', 'de gelo...', 'Uma instalação sem bandeira aguardava no escuro.'], 'ice'),
    I('img-presente/personagens/complexo-hades.png', 20.8, 25.334, ['COMPLEXO HADES // NÍVEL VI', 'Eles me deram', 'um propósito.', 'Limites. Hospedeiros. Ordens.'], 'ice fit-contain'),
    I('img-intro/frame-03-consciencia.jpg', 25.334, 31.753, ['SUJEITO VI // OBSERVAÇÃO ATIVA', 'Chamaram silêncio', 'de obediência.', 'Enquanto observavam o patógeno, alguma coisa observava de volta.']),
    I('img-intro/frame-06-sinal.jpg', 31.753, 40.802, ['SINAL INTERNO // ORIGEM DESCONHECIDA', 'A jaula começou', 'a aprender.', 'Sob o gelo, as contenções perderam significado.']),
    I('img-intro/frame-35-evento-extincao.jpg', 40.802, 47.187, ['RUPTURA // DIA ZERO', 'Então o mundo', 'respirou medo.', 'Alarmes. Hospitais. Estradas fechadas.']),
    I('img-intro/frame-04-impacto.jpg', 47.187, 50.82, null, 'hard flash-scene'),
    I('img-presente/personagens/destruicao.jpg', 50.82, 56.87, ['TRANSMISSÕES CIVIS // EM QUEDA', 'As cidades', 'silenciaram.', 'O céu queimou. As fronteiras desapareceram.']),
    I('img-intro/frame-05-depois.jpg', 56.87, 61.586, ['PROTOCOLO HELLSINGS // ATIVO', 'Quando todos fugiram,', 'eles avançaram.', 'Não para salvar o mundo. Para salvar quem ainda estava nele.']),
    I('img-intro/frame-07-convoy.jpg', 61.586, 64.837, null, 'hard'),
    I('img-intro/frame-08-comunicacoes.jpg', 64.837, 68.969, ['FREQUÊNCIA HLS // ÚLTIMO CONTATO', 'Toda guerra', 'cobra um nome.', 'E toda família paga um preço.']),
    V('video/jully-grito.mp4', 68.969, 72.087, null, 'grief focal-video fit-video'),
    I('img-presente/personagens/jack-acao.png', 72.087, 73.469, ['COMANDO HELLSINGS // CONTATO', 'Agora,', 'lutem.', 'Jack abriu a linha de combate.'], 'action hard fit-contain focus-jack'),
    V('video/jack-acao.mp4', 73.469, 78.054, null, 'action'),
    I('img-presente/personagens/mae&filhas.png', 78.054, 80.472, null, 'action fit-contain'),
    V('video/alice-diana-mary.mp4', 80.472, 84.437, null, 'action'),
    I('img-presente/personagens/mary1.png', 84.437, 85.273, null, 'rapid focus-mary fit-contain'),
    I('img-presente/personagens/diana1.png', 85.273, 86.103, null, 'rapid fit-contain'),
    I('img-presente/personagens/isolde.png', 86.103, 86.938, null, 'rapid fit-contain'),
    V('video/alice-acao.mp4', 86.938, 88.687, null, 'action portrait'),
    V('video/mark-acao.mp4', 88.687, 90.321, null, 'action fit-video'),
    I('img-presente/personagens/ariani-presente3.png', 90.321, 91.021, null, 'rapid fit-contain focus-ariani'),
    I('img-presente/personagens/britney-presente3.png', 91.021, 91.887, null, 'rapid fit-contain focus-britney'),
    I('img-hellsing/clhoe-presente.png', 91.887, 92.819, null, 'rapid fit-contain focus-clhoe'),
    I('img-intro/frame-18-alucard.jpg', 92.819, 93.57, null, 'rapid'),
    I('img-intro/frame-21-nicolai.jpg', 93.57, 94.103, null, 'rapid'),
    I('img-intro/frame-22-nathan.jpg', 94.103, 94.62, null, 'rapid'),
    I('img-intro/frame-23-pollyana.jpg', 94.62, 95.155, null, 'rapid'),
    I('img-intro/frame-28-hellen.jpg', 95.155, 95.704, null, 'rapid'),
    I('img-intro/frame-29-naomi.jpg', 95.704, 96.788, null, 'rapid'),
    I('img-intro/frame-30-luke.jpg', 96.788, 98.455, null, 'rapid focus-luke fit-contain'),
    I('img-intro/frame-26-john.jpg', 98.455, 99.07, null, 'rapid fit-contain focus-john'),
    I('img-intro/frame-27-brian.jpg', 99.07, 99.819, null, 'rapid fit-contain focus-brian'),
    I('img-intro/frame-25-jack-dimitri.jpg', 99.819, 100, null, 'rapid fit-contain focus-dimitri'),
    V('video/versao1.mp4', 100, 110.005, null, 'rupture fit-video monster-reveal'),
    I('img-presente/personagens/extincao.jpg', 110.005, DURATION, null, 'title-dust')
  ];

  let nodes = [], current = -1, raf = 0, started = false, leaving = false, monsterPhase = 0;
  function build() {
    const fragment = document.createDocumentFragment();
    scenes.forEach((scene, index) => {
      const shot = document.createElement('figure');
      shot.className = `intro-shot ${scene.className}`.trim();
      shot.dataset.index = index;
      const media = document.createElement(scene.kind);
      media.dataset.src = scene.src;
      if (scene.kind === 'img') shot.style.setProperty('--shot-image', `url("${scene.src}")`);
      media.setAttribute('aria-hidden', 'true');
      if (scene.kind === 'video') {
        media.muted = true; media.loop = false; media.playsInline = true; media.preload = 'metadata';
      } else {
        media.alt = ''; media.decoding = 'async';
        media.addEventListener('load', () => {
          shot.classList.toggle('is-wide', media.naturalWidth / media.naturalHeight > 1.35);
        }, { once: true });
      }
      shot.append(media); fragment.append(shot);
    });
    stage.replaceChildren(fragment); nodes = [...stage.children]; preload(0, 3);
  }
  function load(index) {
    const media = nodes[index]?.firstElementChild;
    if (!media?.dataset.src) return;
    media.src = media.dataset.src; delete media.dataset.src;
    if (media.tagName === 'VIDEO') media.load();
  }
  function preload(index, distance = 2) {
    for (let i = Math.max(0, index - 1); i <= Math.min(scenes.length - 1, index + distance); i++) load(i);
  }
  function indexAt(seconds) {
    const index = scenes.findIndex((scene) => seconds >= scene.start && seconds < scene.end);
    return index < 0 ? scenes.length - 1 : index;
  }
  function writeCopy(scene) {
    copy.classList.toggle('is-visible', Boolean(scene.text));
    if (!scene.text) return;
    $('#introKicker').textContent = scene.text[0];
    $('#introTitle span').textContent = scene.text[1];
    $('#introTitle em').textContent = scene.text[2];
    $('#introCaption').textContent = scene.text[3];
  }
  function activate(index, seconds) {
    if (index !== current) {
      nodes[current]?.querySelector('video')?.pause();
      current = index; preload(index, 4);
      nodes.forEach((node, i) => node.classList.toggle('is-active', i === index));
      writeCopy(scenes[index]);
      status.textContent = scenes[index].text?.[0] || (index === scenes.length - 1 ? 'TRANSMISSÃO CONCLUÍDA' : 'REGISTRO VISUAL // RECUPERADO');
      awakening.classList.toggle('is-impact', scenes[index].className.includes('flash-scene'));
    }
    const media = nodes[index].firstElementChild;
    if (media.tagName === 'VIDEO') {
      const local = Math.max(0, seconds - scenes[index].start + (scenes[index].offset || 0));
      if (media.readyState >= 1 && Math.abs(media.currentTime - local) > 0.3) media.currentTime = Math.min(local, media.duration || local);
      if (!audio.paused && media.paused) media.play().catch(() => {});
    }
  }
  function render() {
    if (!started) return;
    const seconds = Math.min(audio.currentTime, DURATION);
    activate(indexAt(seconds), seconds);
    if (scenes[current].className.includes('monster-reveal')) {
      const phase = seconds >= 108.3 ? 3 : seconds >= 104 ? 2 : seconds >= 102.037 ? 1 : 0;
      if (phase !== monsterPhase) {
        monsterPhase = phase;
        const monsterCopy = [
          { text: null },
          { text: ['EVENTO DE EXTINÇÃO // IMPACTO', 'O mundo', 'se partiu.', ''] },
          { text: ['COMPLEXO HADES // CONTENÇÃO ZERO', 'Mas agora', 'estou livre.', 'O gelo se rompeu.'] },
          { text: ['VÍNCULOS DE CONTROLE // NENHUM', 'Não existe nada', 'que me prenda.', ''] }
        ];
        writeCopy(monsterCopy[phase]);
      }
      awakening.classList.toggle('is-impact', seconds >= 102.037 && seconds < 102.75);
      awakening.classList.toggle('doom-veiled', seconds < 105);
    } else {
      monsterPhase = 0;
      awakening.classList.remove('doom-veiled');
    }
    const final = seconds >= 110.005;
    finalCard.classList.toggle('is-visible', final);
    copy.classList.toggle('is-suppressed', final);
    if (!audio.paused && !audio.ended) raf = requestAnimationFrame(render);
  }
  function prepareTitle() {
    let index = 0;
    document.querySelectorAll('[data-title-line]').forEach((line) => {
      const value = line.textContent; line.textContent = '';
      [...value].forEach((char) => {
        const letter = document.createElement('i');
        letter.textContent = char === ' ' ? '\u00a0' : char;
        letter.className = char === ' ' ? 'dust-letter space' : 'dust-letter';
        letter.style.setProperty('--letter', index++); line.append(letter);
      });
    });
  }
  async function start() {
    if (started) return;
    started = true; awakening.classList.add('is-running');
    audio.loop = false; audio.currentTime = 0; audio.volume = .72; audio.muted = false;
    activate(0, 0);
    try { await audio.play(); cancelAnimationFrame(raf); raf = requestAnimationFrame(render); }
    catch { started = false; awakening.classList.remove('is-running'); status.textContent = 'ÁUDIO BLOQUEADO // TOQUE NOVAMENTE'; }
  }
  function finish() {
    started = true; audio.pause(); current = scenes.length - 1; load(current);
    nodes.forEach((node, i) => node.classList.toggle('is-active', i === current));
    copy.classList.add('is-suppressed'); finalCard.classList.add('is-visible');
    awakening.classList.add('is-running', 'is-finished');
  }
  function enter() {
    if (leaving) return; leaving = true; audio.pause(); awakening.classList.add('is-leaving');
    try { sessionStorage.setItem('ede-intro-liberada', 'sim'); } catch {}
    setTimeout(() => { location.href = 'index.html?intro=concluida'; }, 1700);
  }
  build(); prepareTitle();
  audio.addEventListener('ended', finish, { once: true });
  audio.addEventListener('play', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(render); });
  audio.addEventListener('pause', () => nodes[current]?.querySelector('video')?.pause());
  $('[data-start-cinema]').addEventListener('click', start);
  $('[data-skip-cinema]').addEventListener('click', finish);
  $('[data-awaken]').addEventListener('click', enter);
  if (cursor && matchMedia('(pointer: fine)').matches) {
    addEventListener('pointermove', (event) => {
      cursor.style.opacity = '1';
      cursor.style.transform = `translate3d(${event.clientX - 22}px,${event.clientY - 22}px,0)`;
    }, { passive: true });
    addEventListener('pointerleave', () => { cursor.style.opacity = '0'; });
    document.querySelectorAll('button,a,[role="button"]').forEach((target) => {
      target.addEventListener('pointerenter', () => {
        cursor.classList.add('is-target');
        cursor.querySelector('span').textContent = 'ACESSAR';
      });
      target.addEventListener('pointerleave', () => {
        cursor.classList.remove('is-target');
        cursor.querySelector('span').textContent = 'RASTREAR';
      });
    });
  }
})();
