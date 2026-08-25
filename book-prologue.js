(() => {
  const prologue = document.querySelector('.book-prologue');
  if (!prologue) return;
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    prologue.classList.add('is-gone');
    prologue.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('book-locked');
    document.dispatchEvent(new CustomEvent('connor:book-opened'));
    setTimeout(() => prologue.remove(), 1300);
  };
  document.body.classList.add('book-locked');
  prologue.querySelector('.book-open').addEventListener('click', () => {
    prologue.classList.add('is-opening');
    setTimeout(finish, 2450);
  });
  prologue.querySelector('.book-skip').addEventListener('click', finish);
  addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape') finish();
    },
    { once: true }
  );
})();
