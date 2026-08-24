(() => {
  const intro = document.querySelector('.world-intro');
  const enter = document.querySelector('[data-enter-world]');
  if (!intro || !enter) return;
  enter.addEventListener('click', () => {
    intro.classList.add('is-gone');
    document.body.classList.remove('is-locked');
    sessionStorage.setItem('extinction_present_entered', '1');
    setTimeout(() => intro.remove(), 1100);
  });
  if (sessionStorage.getItem('extinction_present_entered') === '1') {
    intro.remove();
    document.body.classList.remove('is-locked');
  }
})();
