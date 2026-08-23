(() => {
  const selectors = [
    '.command-hero .hero-copy h1',
    '.manifesto-title h2',
    '.bunker-entry-copy h2',
    '.bunker-intro h3',
    '.bunker-facilities h3',
    '.section-head h2',
    '.alice-directive h2',
    '.operation-grid h3',
    '.protocol-copy h2',
    '.agent-info h3'
  ];
  const titles = [...document.querySelectorAll(selectors.join(','))];
  const heroTitle = document.querySelector('.command-hero .hero-copy h1');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const splitTextNode = (node, state) => {
    const fragment = document.createDocumentFragment();
    const parts = node.textContent.split(/(\s+)/);
    parts.forEach(part => {
      if (/^\s+$/.test(part)) {
        fragment.append(document.createTextNode(part));
        return;
      }
      const word = document.createElement('span');
      word.className = 'hls-word';
      Array.from(part).forEach(letter => {
        const char = document.createElement('span');
        char.className = 'hls-char';
        char.dataset.char = letter;
        char.style.setProperty('--char-index', state.index++);
        char.textContent = letter;
        word.append(char);
      });
      fragment.append(word);
    });
    node.replaceWith(fragment);
  };

  const prepare = title => {
    title.classList.add('hls-kinetic');
    if (title === heroTitle) title.querySelectorAll(':scope > span').forEach(span => span.classList.add('hls-accent'));
    const state = {index:0};
    const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) if (walker.currentNode.textContent.trim()) textNodes.push(walker.currentNode);
    textNodes.forEach(node => splitTextNode(node, state));
    if (reducedMotion) title.classList.add('is-type-visible');
  };
  titles.forEach(prepare);

  if (reducedMotion) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting || entry.target === heroTitle) return;
    entry.target.classList.add('is-type-visible');
    observer.unobserve(entry.target);
  }), {threshold:.3,rootMargin:'0px 0px -8%'});
  titles.forEach(title => { if (title !== heroTitle) observer.observe(title); });

  const revealHero = () => heroTitle?.classList.add('is-type-visible');
  if (!document.querySelector('#hls-opening')) revealHero();
  else addEventListener('hls:opened', revealHero, {once:true});
})();
