(() => {
  const messages = {
    jack: ['01 / JACK', 'O irmão que se tornou guardião e ensinou que proteger também é uma forma de amar.'],
    mark: ['02 / MARK', 'O irmão que voltou do mar e abriu para Jully e Britney uma nova casa.'],
    britney: ['03 / BRITNEY', 'A irmã de rotina, confidências e uma cumplicidade construída enquanto cresciam.'],
    jully: ['04 / JULLY', 'A mais nova dos Connor — aquela que mantém a família olhando também para o amanhã.']
  };
  const label = document.querySelector('.constellation-message span');
  const text = document.querySelector('.constellation-message p');
  document.querySelectorAll('.family-star').forEach(star => star.addEventListener('click', () => {
    document.querySelectorAll('.family-star').forEach(item => item.classList.toggle('active', item === star));
    const content = messages[star.dataset.family];
    if (!content || !label || !text) return;
    label.textContent = content[0];
    text.textContent = content[1];
    text.style.animation = 'none';
    requestAnimationFrame(() => { text.style.animation = ''; });
  }));

  const canvas = document.querySelector('#jully-stars');
  if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const context = canvas.getContext('2d');
  let stars = [];
  const resize = () => {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = canvas.clientWidth * ratio;
    canvas.height = canvas.clientHeight * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    stars = Array.from({length: Math.min(120, Math.floor(canvas.clientWidth / 9))}, () => ({x:Math.random()*canvas.clientWidth,y:Math.random()*canvas.clientHeight,r:Math.random()*1.25+.2,a:Math.random(),v:Math.random()*.012+.003}));
  };
  const draw = () => {
    context.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
    stars.forEach(star => {star.a += star.v;if(star.a>1||star.a<.12)star.v*=-1;context.beginPath();context.fillStyle=`rgba(176,225,255,${star.a})`;context.arc(star.x,star.y,star.r,0,Math.PI*2);context.fill()});
    requestAnimationFrame(draw);
  };
  resize(); addEventListener('resize', resize, {passive:true}); draw();
})();
