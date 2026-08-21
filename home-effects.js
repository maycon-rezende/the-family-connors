(function () {
  'use strict';

  const hero = document.getElementById('hero');
  const title = hero?.querySelector('.hero-title');
  const dust = hero?.querySelector('.hero-dust');
  if (!hero || !title || !dust) return;

  const lines = ['A ERA DA', 'EXTINÇÃO'];
  title.setAttribute('aria-label', lines.join(' '));
  title.innerHTML = lines.map((line, lineIndex) => {
    return `<span class="home-title-line home-title-line--${lineIndex + 1}">${Array.from(line).map((letter, letterIndex) => {
      const order = lineIndex * 8 + letterIndex;
      const letterDust = letter === ' ' ? '' : '<span class="home-letter-dust"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></span>';
      return `<span class="home-letter" style="--letter:${order}" aria-hidden="true">${letter === ' ' ? '&nbsp;' : letter}${letterDust}</span>`;
    }).join('')}</span>`;
  }).join('');

  for (let index = 0; index < 46; index += 1) {
    const particle = document.createElement('i');
    const depth = index % 3;
    particle.style.setProperty('--y', `${8 + Math.random() * 84}%`);
    particle.style.setProperty('--size', `${1 + depth + Math.random() * 2}px`);
    particle.style.setProperty('--duration', `${14 + depth * 5 + Math.random() * 8}s`);
    particle.style.setProperty('--delay', `${-Math.random() * 20}s`);
    particle.style.setProperty('--drift', `${-30 + Math.random() * 60}px`);
    particle.style.setProperty('--opacity', `${.1 + depth * .08 + Math.random() * .14}`);
    dust.appendChild(particle);
  }

  const brief = document.querySelector('.story-brief');
  const counters = Array.from(document.querySelectorAll('[data-count]'));
  if (brief && counters.length) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    counters.forEach(counter => { counter.textContent = '0'; });
    const counterObserver = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      counters.forEach(counter => {
        const target = Number(counter.dataset.count);
        const started = performance.now();
        const duration = 800;
        const tick = now => {
          const progress = Math.min(1, (now - started) / duration);
          counter.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      counterObserver.disconnect();
    }, { threshold: .35 });
    counterObserver.observe(brief);
  }

  const chapters = document.querySelectorAll('[data-lineage]');
  if (chapters.length) {
    const lineageObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        lineageObserver.unobserve(entry.target);
      });
    }, { threshold: .14, rootMargin: '0px 0px -8% 0px' });
    chapters.forEach(chapter => lineageObserver.observe(chapter));
  }

  const worldElements = document.querySelectorAll('[data-world-reveal], [data-memory]');
  if (worldElements.length) {
    const worldObserver = new IntersectionObserver(entries => {
      entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;
        window.setTimeout(() => entry.target.classList.add('is-visible'), index * 90);
        worldObserver.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    worldElements.forEach(element => worldObserver.observe(element));
  }

  const timeline = document.querySelector('#timeline .timeline-track');
  if (timeline) {
    const events = Array.from(timeline.querySelectorAll('.timeline-event'));
    events.forEach((event, index) => {
      const order = document.createElement('span');
      order.className = 'timeline-order';
      order.setAttribute('aria-hidden', 'true');
      order.textContent = String(index + 1).padStart(2, '0');
      event.prepend(order);
    });

    const updateTimeline = () => {
      const rect = timeline.getBoundingClientRect();
      const viewportPoint = window.innerHeight * .56;
      const progress = Math.max(0, Math.min(1, (viewportPoint - rect.top) / rect.height));
      timeline.style.setProperty('--timeline-progress', progress.toFixed(3));
    };
    updateTimeline();
    window.addEventListener('scroll', updateTimeline, { passive: true });
    window.addEventListener('resize', updateTimeline, { passive: true });
  }
})();
