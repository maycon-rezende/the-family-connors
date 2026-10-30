(() => {
  const journal = document.querySelector('[data-brian-journal]');
  if (!journal) return;

  const cover = journal.querySelector('[data-journal-open]');
  const reader = journal.querySelector('[data-journal-reader]');
  const page = journal.querySelector('[data-journal-page]');
  const counter = journal.querySelector('[data-journal-counter]');
  const category = journal.querySelector('[data-journal-category]');
  const previous = journal.querySelector('[data-journal-prev]');
  const next = journal.querySelector('[data-journal-next]');
  const close = journal.querySelector('[data-journal-close]');
  const messages = [...journal.querySelectorAll('.memorial-brian-note')];
  const groups = [...journal.querySelectorAll('.memorial-brian-forum__group')];

  if (!cover || !reader || !page || !messages.length) return;

  let current = 0;

  const render = () => {
    const activeMessage = messages[current];
    const activeGroup = groups.find((group) => group.contains(activeMessage));

    messages.forEach((message, index) => {
      message.hidden = index !== current;
    });
    groups.forEach((group) => {
      group.hidden = group !== activeGroup;
    });

    counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(messages.length).padStart(2, '0')}`;
    category.textContent = activeGroup?.classList.contains('memorial-brian-forum__group--people')
      ? 'POVO DA ROTA'
      : activeGroup?.getAttribute('aria-labelledby') === 'memorial-brian-children-title'
        ? 'FILHOS E HERDEIROS'
        : 'EQUIPE E FAMÍLIA';
    previous.disabled = current === 0;
    next.disabled = current === messages.length - 1;

    page.classList.remove('is-turning');
    void page.offsetWidth;
    page.classList.add('is-turning');
  };

  const open = () => {
    cover.hidden = true;
    cover.setAttribute('aria-expanded', 'true');
    reader.hidden = false;
    render();
    next.focus();
  };

  const shut = () => {
    reader.hidden = true;
    cover.hidden = false;
    cover.setAttribute('aria-expanded', 'false');
    cover.focus();
  };

  cover.addEventListener('click', open);
  previous.addEventListener('click', () => {
    if (current > 0) {
      current -= 1;
      render();
      if (current === 0) next.focus();
    }
  });
  next.addEventListener('click', () => {
    if (current < messages.length - 1) {
      current += 1;
      render();
      if (current === messages.length - 1) previous.focus();
    }
  });
  close.addEventListener('click', shut);

  reader.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && current > 0) {
      event.preventDefault();
      current -= 1;
      render();
      if (current === 0) next.focus();
    } else if (event.key === 'ArrowRight' && current < messages.length - 1) {
      event.preventDefault();
      current += 1;
      render();
      if (current === messages.length - 1) previous.focus();
    } else if (event.key === 'Escape') {
      event.preventDefault();
      shut();
    }
  });
})();
