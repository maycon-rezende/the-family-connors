(() => {
  const initGallery = () => {
    const gallery = document.querySelector('[data-nathan-gallery]');
    if (!gallery) return;

    const slides = [...gallery.querySelectorAll('[data-nathan-slide]')];
    if (!slides.length) return;

    const previous = gallery.querySelector('[data-nathan-prev]');
    const next = gallery.querySelector('[data-nathan-next]');
    const current = gallery.querySelector('[data-nathan-current]');
    const total = gallery.querySelector('[data-nathan-total]');
    const selectors = [...gallery.querySelectorAll('[data-nathan-select]')];
    const dialog = document.querySelector('[data-nathan-dialog]');
    const dialogImage = dialog?.querySelector('[data-nathan-dialog-image]');
    const closeButton = dialog?.querySelector('[data-nathan-close]');
    const openButtons = [...document.querySelectorAll('[data-nathan-open]')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let active = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
    let timer = null;
    let dialogTrigger = null;

    const formatCount = (number) => String(number).padStart(2, '0');
    const isDialogOpen = () => Boolean(dialog?.open);

    const stop = () => {
      if (timer !== null) window.clearInterval(timer);
      timer = null;
    };

    const canAutoplay = () =>
      slides.length > 1 &&
      !reducedMotion.matches &&
      document.visibilityState !== 'hidden' &&
      !gallery.matches(':hover') &&
      !gallery.contains(document.activeElement) &&
      !isDialogOpen();

    const start = () => {
      stop();
      if (canAutoplay()) timer = window.setInterval(() => show(active + 1), 6500);
    };

    const show = (index) => {
      active = (index + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        const selected = slideIndex === active;
        slide.classList.toggle('is-active', selected);
        slide.setAttribute('aria-hidden', String(!selected));
        slide.inert = !selected;
      });

      selectors.forEach((selector, selectorIndex) => {
        const selected = selectorIndex === active;
        selector.classList.toggle('is-active', selected);
        selector.setAttribute('aria-pressed', String(selected));
        if (selected) selector.setAttribute('aria-current', 'true');
        else selector.removeAttribute('aria-current');
      });

      if (current) current.textContent = formatCount(active + 1);
      if (total) total.textContent = formatCount(slides.length);
    };

    const navigate = (index) => {
      show(index);
      start();
    };

    if (previous) {
      previous.disabled = slides.length < 2;
      if (!previous.hasAttribute('aria-label')) previous.setAttribute('aria-label', 'Imagem anterior');
      previous.addEventListener('click', () => navigate(active - 1));
    }

    if (next) {
      next.disabled = slides.length < 2;
      if (!next.hasAttribute('aria-label')) next.setAttribute('aria-label', 'Próxima imagem');
      next.addEventListener('click', () => navigate(active + 1));
    }

    selectors.forEach((selector, index) => {
      if (!selector.hasAttribute('aria-label')) {
        selector.setAttribute('aria-label', `Mostrar imagem ${index + 1} de ${slides.length}`);
      }
      selector.addEventListener('click', () => navigate(index));
    });

    gallery.addEventListener('keydown', (event) => {
      if (isDialogOpen() || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.target instanceof HTMLElement &&
          (event.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName))) return;

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigate(active - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigate(active + 1);
      }
    });

    gallery.addEventListener('mouseenter', stop);
    gallery.addEventListener('mouseleave', start);
    gallery.addEventListener('focusin', stop);
    gallery.addEventListener('focusout', () => window.setTimeout(start, 0));
    document.addEventListener('visibilitychange', start);
    if (typeof reducedMotion.addEventListener === 'function') {
      reducedMotion.addEventListener('change', start);
    } else {
      reducedMotion.addListener(start);
    }

    if (dialog && dialogImage && typeof dialog.showModal === 'function') {
      const closeDialog = () => {
        if (dialog.open) dialog.close();
      };

      openButtons.forEach((button) => {
        if (!button.hasAttribute('aria-label')) button.setAttribute('aria-label', 'Ampliar imagem');
        button.addEventListener('click', () => {
          const slide = button.closest('[data-nathan-slide]');
          const index = slide ? slides.indexOf(slide) : active;
          if (index >= 0 && index !== active) show(index);

          const sourceImage = slides[active].querySelector('img');
          if (!sourceImage) return;

          dialogImage.src = sourceImage.currentSrc || sourceImage.src;
          dialogImage.alt = sourceImage.alt;
          for (const attribute of ['srcset', 'sizes']) {
            if (sourceImage.hasAttribute(attribute)) {
              dialogImage.setAttribute(attribute, sourceImage.getAttribute(attribute));
            } else {
              dialogImage.removeAttribute(attribute);
            }
          }

          dialogTrigger = button;
          stop();
          if (!dialog.open) dialog.showModal();
          closeButton?.focus();
        });
      });

      closeButton?.addEventListener('click', closeDialog);
      dialog.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeDialog();
        }
      });
      dialog.addEventListener('close', () => {
        if (dialogTrigger?.isConnected) dialogTrigger.focus({ preventScroll: true });
        dialogTrigger = null;
        start();
      });
    }

    show(active);
    start();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery, { once: true });
  } else {
    initGallery();
  }
})();
