(() => {
  const body = document.body;
  const cursor = document.querySelector('.world-cursor');
  const dialog = document.querySelector('#classifiedDialog');
  const fileCode = document.querySelector('#fileCode');
  const transition = document.querySelector('.period-transition');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

  const buildTitle = async () => {
    const lines = [...document.querySelectorAll('[data-title-line]')];
    const canvas = document.querySelector('.title-particle-canvas');
    const context = canvas?.getContext('2d');
    lines.forEach((line) => line.replaceChildren());
    if (!canvas || !context) return;
    await document.fonts.ready;

    const width = Math.max(320, canvas.clientWidth);
    const height = Math.max(250, canvas.clientHeight);
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const buffer = document.createElement('canvas');
    buffer.width = Math.round(width);
    buffer.height = Math.round(height);
    const bufferContext = buffer.getContext('2d', { willReadFrequently: true });
    const particles = [];
    let order = 0;

    const prepareLine = (text, baseline, fontSize, colors) => {
      bufferContext.font = `800 ${fontSize}px "Barlow Condensed", Impact, sans-serif`;
      bufferContext.textBaseline = 'alphabetic';
      const spacing = fontSize * 0.025;
      const widths = [...text].map((character) => bufferContext.measureText(character).width);
      const totalWidth = widths.reduce((sum, value) => sum + value, 0) + spacing * (text.length - 1);
      let x = (width - totalWidth) / 2;

      [...text].forEach((character, characterIndex) => {
        const characterWidth = widths[characterIndex];
        if (character !== ' ') {
          bufferContext.clearRect(0, 0, width, height);
          bufferContext.fillStyle = '#fff';
          bufferContext.fillText(character, x, baseline);
          const pixels = bufferContext.getImageData(
            Math.max(0, Math.floor(x - 3)),
            Math.max(0, Math.floor(baseline - fontSize * 1.05)),
            Math.min(width - Math.max(0, Math.floor(x - 3)), Math.ceil(characterWidth + 8)),
            Math.min(height - Math.max(0, Math.floor(baseline - fontSize * 1.05)), Math.ceil(fontSize * 1.2))
          );
          const originX = Math.max(0, Math.floor(x - 3));
          const originY = Math.max(0, Math.floor(baseline - fontSize * 1.05));
          const step = width < 600 ? 6 : 5;

          for (let pixelY = 0; pixelY < pixels.height; pixelY += step) {
            for (let pixelX = 0; pixelX < pixels.width; pixelX += step) {
              const alpha = pixels.data[(pixelY * pixels.width + pixelX) * 4 + 3];
              if (alpha < 90) continue;
              const targetX = originX + pixelX;
              const targetY = originY + pixelY;
              particles.push({
                targetX,
                targetY,
                startX: targetX - 55 - Math.random() * 175,
                startY: targetY + (Math.random() - 0.5) * 48,
                delay:
                  order * 650 +
                  (pixelX / Math.max(1, pixels.width)) * 520 +
                  Math.random() * 130,
                duration: 540 + Math.random() * 300,
                size: 0.9 + Math.random() * 2.4,
                color: colors[Math.floor(Math.random() * colors.length)],
                drift: (Math.random() - 0.5) * 15,
              });
            }
          }
          order += 1;
        }
        x += characterWidth + spacing;
      });
    };

    const largeSize = Math.min(width * 0.205, height * 0.43);
    prepareLine('A ERA DA', height * 0.43, largeSize * 0.62, ['#eadbc0', '#b6a68b', '#74654e']);
    prepareLine('EXTINÇÃO', height * 0.82, largeSize, ['#f0783d', '#bc4125', '#6d2017']);
    const totalTime = (order - 1) * 650 + 1550;

    await new Promise((resolve) => {
      const startedAt = performance.now();
      const render = (now) => {
        const elapsed = now - startedAt;
        context.clearRect(0, 0, width, height);
        particles.forEach((particle) => {
          if (elapsed < particle.delay) return;
          const progress = Math.min((elapsed - particle.delay) / particle.duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const x = particle.startX + (particle.targetX - particle.startX) * eased;
          const y = particle.startY + (particle.targetY - particle.startY) * eased + Math.sin(progress * Math.PI) * particle.drift;
          context.globalAlpha = progress < 0.34 ? progress * 2 : Math.min(1, progress * 2.8);
          context.fillStyle = progress < 0.52 ? '#514943' : particle.color;
          context.fillRect(x, y, particle.size, particle.size);
        });
        context.globalAlpha = 1;
        if (elapsed < totalTime) requestAnimationFrame(render);
        else resolve();
      };
      requestAnimationFrame(render);
    });

    lines.forEach((line) => {
      [...(line.dataset.titleLine || '')].forEach((character) => {
        const letter = document.createElement('i');
        const isSpace = character === ' ';
        letter.className = isSpace
          ? 'title-letter title-space is-visible-space'
          : 'title-letter is-solid';
        letter.textContent = isSpace ? '\u00a0' : character;
        letter.setAttribute('aria-hidden', 'true');
        line.appendChild(letter);
      });
    });
    canvas.classList.add('is-complete');
    await wait(460);
  };

  const startIndexOpening = () => {
    body.classList.remove('world-locked');
    body.classList.add('world-entered');

    setTimeout(async () => {
      await buildTitle();
      await wait(850);
      body.classList.add('world-content-visible');
    }, 2800);
  };

  startIndexOpening();

  if (cursor && matchMedia('(pointer:fine)').matches) {
    addEventListener(
      'pointermove',
      (event) => {
        cursor.style.opacity = '1';
        cursor.style.transform = `translate(${event.clientX}px,${event.clientY}px)`;
      },
      { passive: true }
    );

    document.querySelectorAll('a, button').forEach((element) => {
      element.addEventListener('mouseenter', () => {
        cursor.querySelector('span').textContent = 'ACESSAR';
      });
      element.addEventListener('mouseleave', () => {
        cursor.querySelector('span').textContent = 'RASTREAR';
      });
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach((element) => {
    if (reduced) element.classList.add('is-visible');
    else observer.observe(element);
  });

  document.querySelectorAll('.survivor').forEach((button) => {
    button.addEventListener('click', () => {
      if (!dialog || !fileCode) return;
      fileCode.textContent = `${button.dataset.file} // PRESENTE`;
      dialog.showModal();
      if (cursor) dialog.append(cursor);
    });
  });

  document.querySelector('[data-close-file]')?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog?.addEventListener('close', () => {
    if (cursor) body.append(cursor);
  });

  document.querySelectorAll('[data-open-past], a[href="arquivo-passado.html"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (reduced || !transition) return;
      event.preventDefault();
      transition.classList.add('is-active');
      setTimeout(() => {
        location.href = link.href;
      }, 1050);
    });
  });

  addEventListener(
    'scroll',
    () => {
      const available = document.documentElement.scrollHeight - innerHeight;
      const progress = available > 0 ? Math.min(scrollY / available, 1) : 0;
      document.documentElement.style.setProperty('--world-progress', progress);
    },
    { passive: true }
  );
})();
