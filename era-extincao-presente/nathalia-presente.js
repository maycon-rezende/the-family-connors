(()=>{
  'use strict';
  const archive=document.querySelector('[data-nathalia-archive]');
  const frames=[...document.querySelectorAll('[data-nathalia-frame]')];
  const coordinates=[...document.querySelectorAll('[data-nathalia-coordinate]')];
  const progress=document.querySelector('.nathalia-archive-progress i');
  let active=0,shifting=false,touchStart=0;

  const activate=index=>{
    active=(index+frames.length)%frames.length;
    frames.forEach((frame,position)=>{const selected=position===active;frame.classList.toggle('is-active',selected);frame.setAttribute('aria-hidden',String(!selected))});
    coordinates.forEach((button,position)=>{const selected=position===active;button.classList.toggle('is-active',selected);button.setAttribute('aria-pressed',String(selected))});
    if(progress)progress.style.transform=`translateX(${active*100}%)`;
  };
  const shift=index=>{
    if(shifting||index===active||!frames.length)return;
    shifting=true;archive?.classList.add('is-shifting');coordinates.forEach(button=>button.disabled=true);
    setTimeout(()=>activate(index),480);
    setTimeout(()=>{archive?.classList.remove('is-shifting');coordinates.forEach(button=>button.disabled=false);shifting=false},1100);
  };
  coordinates.forEach(button=>button.addEventListener('click',()=>shift(Number(button.dataset.nathaliaCoordinate))));
  const screen=document.querySelector('.nathalia-archive-screen');
  screen?.addEventListener('touchstart',event=>{touchStart=event.changedTouches[0].clientX},{passive:true});
  screen?.addEventListener('touchend',event=>{const distance=event.changedTouches[0].clientX-touchStart;if(Math.abs(distance)>45)shift(active+(distance<0?1:-1))},{passive:true});

  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('is-visible',entry.isIntersecting)),{threshold:.18});
  document.querySelectorAll('[data-nathalia-reveal]').forEach(element=>observer.observe(element));
  const cursor=document.querySelector('.nathalia-cursor');
  if(cursor&&matchMedia('(any-pointer:fine)').matches){
    document.documentElement.classList.add('has-nathalia-cursor');
    addEventListener('pointermove',event=>{cursor.style.opacity='1';cursor.style.transform=`translate3d(${event.clientX-22}px,${event.clientY-22}px,0)`},{passive:true});
    document.addEventListener('pointerleave',()=>{cursor.style.opacity='0'});
    document.querySelectorAll('a,button').forEach(target=>{target.addEventListener('pointerenter',()=>cursor.classList.add('is-target'));target.addEventListener('pointerleave',()=>cursor.classList.remove('is-target'))});
  }
  activate(0);
})();
