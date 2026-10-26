(() => {
  'use strict';

  const page = document.querySelector('.nathan-page');
  if (!page) return;

  const root = document.documentElement;
  const cursor = document.querySelector('[data-nathan-cursor]');
  const dialog = document.querySelector('[data-nathan-dialog]');
  const revealItems = [...document.querySelectorAll('[data-nathan-reveal]')];
  const motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  const pointerQuery = window.matchMedia?.('(hover: hover) and (pointer: fine)');

  const motionIsReduced = () => Boolean(motionQuery?.matches);

  // Content is hidden for the reveal only after the observer is available.
  const revealObserver = typeof IntersectionObserver === 'function'
    ? new IntersectionObserver((entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.06, rootMargin: '0px 0px -7% 0px' })
    : null;

  const syncReveals = () => {
    const enabled = Boolean(revealObserver && revealItems.length && !motionIsReduced());
    root.classList.toggle('nathan-effects-ready', enabled);
    if (!revealObserver) return;

    revealObserver.disconnect();
    if (enabled) {
      for (const item of revealItems) {
        if (!item.classList.contains('is-visible')) revealObserver.observe(item);
      }
    }
  };

  syncReveals();

  if (cursor && pointerQuery) {
    let cursorX = 0;
    let cursorY = 0;
    let frame = 0;
    let clickTimer = 0;

    const canShowCursor = () => pointerQuery.matches
      && !motionIsReduced()
      && document.visibilityState === 'visible'
      && !dialog?.open;

    const hideCursor = () => {
      root.classList.remove('has-nathan-cursor');
      cursor.classList.remove('is-visible', 'is-active', 'is-clicked');
      if (frame) cancelAnimationFrame(frame);
      if (clickTimer) clearTimeout(clickTimer);
      frame = 0;
      clickTimer = 0;
    };

    const paintCursor = () => {
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
      cursor.classList.toggle('is-right-edge', cursorX > window.innerWidth - 160);
      frame = 0;
    };

    const onPointerMove = (event) => {
      // A hybrid device may report a fine primary pointer while being used by touch.
      if (event.pointerType === 'touch') {
        hideCursor();
        return;
      }
      if (!event.isTrusted || (event.pointerType !== 'mouse' && event.pointerType !== 'pen')) return;
      if (!canShowCursor()) {
        hideCursor();
        return;
      }

      cursorX = event.clientX;
      cursorY = event.clientY;
      if (cursor.classList.contains('is-visible')) {
        if (!frame) frame = requestAnimationFrame(paintCursor);
      } else {
        // Place it before showing it, so the first frame cannot flash at (0, 0).
        paintCursor();
      }
      cursor.classList.toggle('is-active', Boolean(
        event.target instanceof Element
          && event.target.closest('a, button, [role="button"]')
      ));
      root.classList.add('has-nathan-cursor');
      cursor.classList.add('is-visible');
    };

    const onPointerDown = (event) => {
      if (event.pointerType === 'touch') {
        hideCursor();
        return;
      }
      if (!event.isTrusted || !cursor.classList.contains('is-visible')) return;
      cursor.classList.add('is-clicked');
      if (clickTimer) clearTimeout(clickTimer);
      clickTimer = window.setTimeout(() => {
        cursor.classList.remove('is-clicked');
        clickTimer = 0;
      }, 220);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    root.addEventListener('pointerleave', hideCursor);
    window.addEventListener('blur', hideCursor);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState !== 'visible') hideCursor();
    });
    dialog?.addEventListener('close', hideCursor);

    if (dialog && typeof MutationObserver === 'function') {
      new MutationObserver(() => {
        if (dialog.open) hideCursor();
      }).observe(dialog, { attributes: true, attributeFilter: ['open'] });
    }

    const onPreferenceChange = () => {
      hideCursor();
      syncReveals();
    };
    if (motionQuery?.addEventListener) motionQuery.addEventListener('change', onPreferenceChange);
    else motionQuery?.addListener?.(onPreferenceChange);
    if (pointerQuery.addEventListener) pointerQuery.addEventListener('change', hideCursor);
    else pointerQuery.addListener?.(hideCursor);
  } else if (motionQuery) {
    if (motionQuery.addEventListener) motionQuery.addEventListener('change', syncReveals);
    else motionQuery.addListener?.(syncReveals);
  }
})();
