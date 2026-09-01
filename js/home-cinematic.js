(() => {
  document.body.classList.add('saga-redesign');
  const chapters = [...document.querySelectorAll('.saga-chapter')];
  const revealItems = document.querySelectorAll('.saga-reveal');
  const progress = document.querySelector('.saga-progress span');
  const railNumber = document.querySelector('.rail-number');
  const railTitle = document.querySelector('.rail-title');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );
  revealItems.forEach((item) => revealObserver.observe(item));

  const chapterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        railNumber.textContent = entry.target.dataset.roman;
        railTitle.textContent = entry.target.dataset.chapter;
      });
    },
    { threshold: 0.52 }
  );
  chapters.forEach((chapter) => chapterObserver.observe(chapter));

  let ticking = false;
  const update = () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    const ratio = max > 0 ? scrollY / max : 0;
    progress.style.height = `${Math.min(100, ratio * 100)}%`;
    const mansion = document.querySelector('.saga-image--mansion');
    if (mansion && scrollY < innerHeight * 1.2)
      mansion.style.transform = `scale(1.03) translateY(${scrollY * 0.08}px)`;
    ticking = false;
  };
  addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
  update();

  const collapse = document.querySelector('[data-collapse]');
  const doomsday = document.querySelector('.doomsday-chapter');
  if (collapse && doomsday) {
    let played = false;
    new IntersectionObserver(
      ([entry], observer) => {
        if (!entry.isIntersecting || played) return;
        played = true;
        const started = performance.now();
        const run = (now) => {
          const value = Math.max(2, Math.round(100 - Math.min(1, (now - started) / 2400) * 98));
          collapse.textContent = value;
          if (value > 2) requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
        observer.disconnect();
      },
      { threshold: 0.5 }
    ).observe(doomsday);
  }
})();
