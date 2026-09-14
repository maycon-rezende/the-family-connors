(() => {
  const clues = document.querySelectorAll('[data-diary-clue]');
  if (!clues.length) return;
  const key = 'bc05-diary-fragments';
  const found = new Set(JSON.parse(localStorage.getItem(key) || '[]'));
  const update = (button) => {
    const id = button.dataset.diaryClue;
    if (!found.has(id)) {
      found.add(id);
      localStorage.setItem(key, JSON.stringify([...found]));
      button.textContent = 'FRAGMENTO RECUPERADO // BC-05';
      button.classList.add('is-found');
      window.dispatchEvent(new CustomEvent('diary-fragment-found', { detail: id }));
    }
  };
  clues.forEach((button) => {
    if (found.has(button.dataset.diaryClue)) {
      button.textContent = 'FRAGMENTO RECUPERADO // BC-05';
      button.classList.add('is-found');
    }
    button.addEventListener('click', () => update(button));
  });
})();
