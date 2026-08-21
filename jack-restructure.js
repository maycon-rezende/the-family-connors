(function(){
  'use strict';
  const command=document.querySelector('.career-command');
  if(!command)return;
  const tabs=Array.from(command.querySelectorAll('.career-tab'));
  const panels=Array.from(command.querySelectorAll('.career-environment'));
  const stage=command.querySelector('.career-stage');
  const colors={fbi:'rgba(72,120,148,.18)',interpol:'rgba(48,139,155,.18)',hellsings:'rgba(146,38,26,.22)'};

  function activate(name,focus=false){
    tabs.forEach(tab=>{
      const active=tab.dataset.career===name;
      tab.classList.toggle('is-active',active);
      tab.setAttribute('aria-selected',String(active));
      tab.tabIndex=active?0:-1;
      if(active&&focus)tab.focus();
    });
    panels.forEach(panel=>{
      const active=panel.id===`career-${name}`;
      panel.hidden=!active;
      panel.classList.toggle('is-active',active);
    });
    stage.dataset.activeCareer=name;
    command.style.setProperty('--career-glow',colors[name]);
  }

  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>activate(tab.dataset.career));
    tab.addEventListener('keydown',event=>{
      if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
      event.preventDefault();
      const direction=event.key==='ArrowRight'?1:-1;
      const next=(index+direction+tabs.length)%tabs.length;
      activate(tabs[next].dataset.career,true);
    });
  });
  activate('fbi');

  const cards=document.querySelectorAll('#perfil .profile-card');
  cards.forEach((card,index)=>card.dataset.file=`JC-PROFILE-${String(index+1).padStart(2,'0')}`);
})();
