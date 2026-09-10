(()=>{
  'use strict';
  const animatedCopy=document.querySelector('[data-alucard-copy]');
  if(animatedCopy){
    const text=animatedCopy.textContent;
    animatedCopy.setAttribute('aria-label',text);animatedCopy.textContent='';
    [...text].forEach((char,index)=>{const letter=document.createElement('i');letter.textContent=char===' '?' ':char;letter.style.setProperty('--char',index);letter.setAttribute('aria-hidden','true');animatedCopy.append(letter)});
  }

  const carousel=document.querySelector('[data-alucard-carousel]');
  const slides=[...document.querySelectorAll('[data-alucard-slide]')];
  const counter=document.querySelector('[data-alucard-current]');
  const hourglass=document.querySelector('[data-alucard-hourglass]');
  let active=0,touchStart=0,transitioning=false;

  const show=next=>{
    active=(next+slides.length)%slides.length;
    slides.forEach((slide,index)=>{const selected=index===active;slide.classList.toggle('is-active',selected);slide.setAttribute('aria-hidden',String(!selected))});
    if(counter)counter.textContent=String(active+1).padStart(2,'0');
  };
  const sift=direction=>{
    if(transitioning||!slides.length)return;
    transitioning=true;carousel?.classList.add('is-sifting');hourglass?.setAttribute('disabled','');
    setTimeout(()=>show(active+direction),570);
    setTimeout(()=>{carousel?.classList.remove('is-sifting');hourglass?.removeAttribute('disabled');transitioning=false},1280);
  };
  hourglass?.addEventListener('click',()=>sift(1));
  const viewport=document.querySelector('.alucard-viewport');
  viewport?.addEventListener('touchstart',event=>{touchStart=event.changedTouches[0].clientX},{passive:true});
  viewport?.addEventListener('touchend',event=>{const distance=event.changedTouches[0].clientX-touchStart;if(Math.abs(distance)>45)sift(distance<0?1:-1)},{passive:true});

  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('is-visible',entry.isIntersecting)),{threshold:.22});
  document.querySelectorAll('[data-alucard-reveal]').forEach(element=>observer.observe(element));
  const cursor=document.querySelector('.alucard-cursor');
  if(cursor&&matchMedia('(any-pointer:fine)').matches){
    document.documentElement.classList.add('has-alucard-cursor');
    addEventListener('pointermove',event=>{cursor.style.opacity='1';cursor.style.transform=`translate3d(${event.clientX-21}px,${event.clientY-21}px,0)`},{passive:true});
    document.addEventListener('pointerleave',()=>{cursor.style.opacity='0'});
    document.querySelectorAll('a,button').forEach(target=>{target.addEventListener('pointerenter',()=>cursor.classList.add('is-target'));target.addEventListener('pointerleave',()=>cursor.classList.remove('is-target'))});
  }
})();
