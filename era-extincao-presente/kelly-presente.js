(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealItems = [...document.querySelectorAll("[data-kelly-reveal]")];

  if ("IntersectionObserver" in window && !reduceMotion) {
    document.body.classList.add("kelly-reveal-ready");
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const canvas = document.querySelector("[data-kelly-particles]");
  if (canvas && !reduceMotion) {
    const context = canvas.getContext("2d", { alpha: true });
    if (context) {
      const particles = [];
      const particleCount = Math.min(56, Math.max(24, Math.floor(window.innerWidth / 24)));
      let width = 0;
      let height = 0;
      let animationFrame = 0;

      const resize = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
      };

      for (let index = 0; index < particleCount; index += 1) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 1.35 + 0.35,
          speed: Math.random() * 0.22 + 0.06,
          drift: Math.random() * 0.24 - 0.12,
          phase: Math.random() * Math.PI * 2,
          tint: Math.random() > 0.55 ? "185,229,216" : "127,178,201",
        });
      }

      const draw = (time) => {
        context.clearRect(0, 0, width, height);
        particles.forEach((particle) => {
          particle.y -= particle.speed;
          particle.x += particle.drift + Math.sin(time * 0.00035 + particle.phase) * 0.08;
          if (particle.y < -4) {
            particle.y = height + 4;
            particle.x = Math.random() * width;
          }
          if (particle.x < -4) particle.x = width + 4;
          if (particle.x > width + 4) particle.x = -4;
          const glow = 0.12 + (Math.sin(time * 0.001 + particle.phase) + 1) * 0.07;
          context.beginPath();
          context.fillStyle = "rgba(" + particle.tint + "," + glow + ")";
          context.shadowColor = "rgba(" + particle.tint + "," + (glow * 0.8) + ")";
          context.shadowBlur = 7;
          context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          context.fill();
        });
        context.shadowBlur = 0;
        animationFrame = window.requestAnimationFrame(draw);
      };

      resize();
      window.addEventListener("resize", resize, { passive: true });
      animationFrame = window.requestAnimationFrame(draw);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          window.cancelAnimationFrame(animationFrame);
        } else {
          animationFrame = window.requestAnimationFrame(draw);
        }
      });
    }
  }

  const dialog = document.querySelector("[data-kelly-lightbox]");
  if (!dialog) return;
  const allGalleryButtons = [...document.querySelectorAll("[data-kelly-image]")];
  const dialogImage = dialog.querySelector("[data-kelly-lightbox-image]");
  const dialogCaption = dialog.querySelector("[data-kelly-lightbox-caption]");
  const counter = dialog.querySelector("[data-kelly-counter]");
  const closeButton = dialog.querySelector("[data-kelly-close]");
  let activeIndex = 0;
  let lastTrigger = null;
  let galleryButtons = [];

  const showImage = (index) => {
    activeIndex = (index + galleryButtons.length) % galleryButtons.length;
    const button = galleryButtons[activeIndex];
    const image = button.querySelector("img");
    dialogImage.src = button.dataset.kellyImage;
    dialogImage.alt = image?.alt || "";
    dialogCaption.textContent = button.dataset.kellyCaption || "";
    counter.textContent =
      String(activeIndex + 1).padStart(2, "0") + " / " + String(galleryButtons.length).padStart(2, "0");
  };

  allGalleryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const album = button.closest("[data-kelly-album]");
      galleryButtons = [...(album?.querySelectorAll("[data-kelly-image]") || [])];
      if (!galleryButtons.length) return;
      lastTrigger = button;
      showImage(galleryButtons.indexOf(button));
      dialog.showModal();
      closeButton.focus();
    });
  });

  dialog.querySelector("[data-kelly-prev]")?.addEventListener("click", () => showImage(activeIndex - 1));
  dialog.querySelector("[data-kelly-next]")?.addEventListener("click", () => showImage(activeIndex + 1));
  closeButton?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => lastTrigger?.focus());
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") showImage(activeIndex - 1);
    if (event.key === "ArrowRight") showImage(activeIndex + 1);
  });
})();
