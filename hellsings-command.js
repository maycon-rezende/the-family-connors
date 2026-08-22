(() => {
  const agents = [
    {code:'HLS-01',name:'Jack Connor',role:'Criador · Comandante',color:'#bbd64a',skin:'#d2a17f',image:'img-jack/jack-hellsings-commander.png',bio:'Fundador e autoridade máxima dos Hellsings. Define a estratégia, aprova as operações e lidera as missões de maior risco.',tags:['Comando','Estratégia','Rastreamento','Combate'],field:true},
    {code:'HLS-02',name:'Mark Connor',role:'Comando tático · Campo',color:'#4e9cc7',skin:'#d7ae8c',image:'img-mark/markhellsing.png',bio:'Veterano da Marinha e braço tático da organização. Transforma objetivos em planos de entrada, intervenção e retirada.',tags:['Tática','Campo','Armas','Extração'],field:true},
    {code:'HLS-03',name:'Alice Myers',role:'Administração · Contratos',color:'#e3a63c',skin:'#d4a989',image:'img-alice/alice-hellsings-admin.png',bio:'Responsável pelos negócios, contratos, clientes, recursos e coordenação administrativa. Alice não participa mais das missões de campo.',tags:['Contratos','Administração','Finanças','Medicina'],field:false,admin:true},
    {code:'HLS-04',name:'Boby Johhn',role:'Tecnologia · Armamentos',color:'#5c82d8',skin:'#704733',bio:'Especialista responsável pela infraestrutura tecnológica, comunicações protegidas e preparação de equipamentos operacionais.',tags:['Tecnologia','Comunicações','Armamentos','Suporte'],field:true},
    {code:'HLS-05',name:'Naomi',role:'Inteligência · Análise',color:'#d95d6f',skin:'#d2a07c',bio:'Agente japonesa dedicada à análise de inteligência, cruzamento de informações e leitura de padrões antes das operações.',tags:['Inteligência','Análise','Idiomas','Coordenação'],field:true},
    {code:'HLS-06',name:'Clhoe',role:'Reconhecimento · Campo',color:'#bd6ed2',skin:'#754a35',bio:'Especialista em reconhecimento e observação avançada. Identifica ameaças, acessos e mudanças no terreno antes da entrada da equipe.',tags:['Reconhecimento','Vigilância','Campo','Precisão'],field:true},
    {code:'HLS-07',name:'Luke',role:'Rotas · Estratégia',color:'#53b68a',skin:'#68422f',bio:'Especialista em mapas, rotas e deslocamento operacional. Encontra caminhos de entrada e saída onde outros enxergam bloqueios.',tags:['Mapas','Rotas','Estratégia','Armas brancas'],field:true},
    {code:'HLS-08',name:'Dimitri',role:'Intervenção · Extração',color:'#c94a3e',skin:'#c99a79',bio:'Responsável por intervenção de alto impacto e retirada de agentes ou alvos em situações que exigem força e controle.',tags:['Intervenção','Extração','Proteção','Campo'],field:true},
    {code:'HLS-09',name:'Brian Taylor',role:'Veterano · Rastreador',color:'#b5a071',skin:'#c39372',bio:'Amigo de Jack desde o FBI e o agente mais experiente da formação. Rastreia pessoas, cargas e redes através de detalhes que outros ignoram.',tags:['Rastreamento','FBI','Estratégia','Experiência'],field:true},
    {code:'HLS-10',name:'Hellen',role:'Infiltração · Disfarce',color:'#d18450',skin:'#c89470',bio:'Especialista em infiltração, identidades de cobertura e inteligência humana. Entra sem chamar atenção e sai sem deixar vínculo.',tags:['Infiltração','Disfarce','Inteligência','Combate'],field:true}
  ];

  const roster = document.querySelector('#roster');
  roster.innerHTML = agents.map((agent,index) => `<button class="agent ${agent.admin?'admin':''} ${agent.image?'has-photo':''}" style="--agent:${agent.color};--skin:${agent.skin}" data-agent="${index}"><span class="agent-code">${agent.code} // ${agent.field?'FIELD':'ADMIN'}</span><i class="agent-state"></i>${agent.image?`<img class="agent-photo" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;filter:saturate(.82) contrast(1.05)" src="${agent.image}" alt="${agent.name} com uniforme dos Hellsings">`:'<div class="agent-silhouette"></div>'}<div class="agent-info"><small>${agent.role}</small><h3>${agent.name}</h3><p>${agent.tags.slice(0,3).join(' · ')}</p></div></button>`).join('');

  const dialog = document.querySelector('#dossier');
  const visual = dialog.querySelector('.dossier-visual');
  roster.querySelectorAll('.agent').forEach(button => button.addEventListener('click', () => {
    const agent = agents[Number(button.dataset.agent)];
    visual.style.cssText = agent.image ? `--agent:${agent.color};background-image:linear-gradient(0deg,rgba(5,7,6,.3),transparent 50%),url('${agent.image}');background-size:cover;background-position:center` : `--agent:${agent.color};--skin:${agent.skin};background:radial-gradient(ellipse at 50% 31%,var(--skin) 0 11%,transparent 11.5%),radial-gradient(ellipse at 50% 67%,var(--agent) 0 30%,transparent 30.5%),linear-gradient(145deg,color-mix(in srgb,var(--agent) 18%,#070907),#070907 65%)`;
    dialog.querySelector('.dossier-info>span').textContent = `${agent.code} // ${agent.field?'AUTORIZADO PARA CAMPO':'ADMINISTRAÇÃO'}`;
    dialog.querySelector('h2').textContent = agent.name;
    dialog.querySelector('h3').textContent = agent.role;
    dialog.querySelector('.dossier-info>p').textContent = agent.bio;
    dialog.querySelector('.dossier-tags').innerHTML = agent.tags.map(tag=>`<i>${tag}</i>`).join('');
    dialog.showModal();
  }));
  dialog.querySelector('.dossier-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});

  const canvas = document.querySelector('#radar');
  const ctx = canvas.getContext('2d');
  let angle=0,points=[];
  function resize(){const ratio=Math.min(devicePixelRatio||1,2);canvas.width=canvas.clientWidth*ratio;canvas.height=canvas.clientHeight*ratio;ctx.setTransform(ratio,0,0,ratio,0,0);points=Array.from({length:10},()=>({a:Math.random()*Math.PI*2,r:.15+Math.random()*.7,p:Math.random()}))}
  const animateRadar=!matchMedia('(prefers-reduced-motion: reduce)').matches;
  function draw(){const w=canvas.clientWidth,h=canvas.clientHeight,cx=w*.58,cy=h*.5,r=Math.min(w,h)*.36;ctx.clearRect(0,0,w,h);ctx.strokeStyle='rgba(187,214,74,.13)';ctx.lineWidth=1;for(let i=1;i<=4;i++){ctx.beginPath();ctx.arc(cx,cy,r*i/4,0,Math.PI*2);ctx.stroke()}for(let i=0;i<12;i++){const a=i*Math.PI/6;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);ctx.stroke()}const grad=ctx.createLinearGradient(cx,cy,cx+Math.cos(angle)*r,cy+Math.sin(angle)*r);grad.addColorStop(0,'rgba(187,214,74,0)');grad.addColorStop(1,'rgba(187,214,74,.55)');ctx.strokeStyle=grad;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(angle)*r,cy+Math.sin(angle)*r);ctx.stroke();points.forEach(p=>{const x=cx+Math.cos(p.a)*r*p.r,y=cy+Math.sin(p.a)*r*p.r;if(animateRadar)p.p+=.025;ctx.fillStyle=`rgba(187,214,74,${.25+Math.sin(p.p)*.2})`;ctx.fillRect(x-2,y-2,4,4)});if(animateRadar){angle+=.008;requestAnimationFrame(draw)}}
  resize();addEventListener('resize',resize,{passive:true});draw();
})();
