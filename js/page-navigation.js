(() => {
  'use strict';

  const homeHref = 'index.html';
  const filename = window.location.pathname.split('/').pop().toLowerCase();
  const routeOrder = [
    ['jack-presente.html', 'JACK'],
    ['alice-presente.html', 'ALICE'],
    ['mark-presente.html', 'MARK'],
    ['ariani-presente.html', 'ARIANI'],
    ['britney-presente.html', 'BRITNEY'],
    ['jully-presente.html', 'JULLY'],
    ['hellen-presente.html', 'HELLEN'],
    ['naomi-presente.html', 'NAOMI'],
    ['luke-presente.html', 'LUKE'],
    ['clhoe-presente.html', 'CHLOE'],
    ['dimitri-arquivo.html', 'DIMITRI'],
    ['john-presente.html', 'JOHN'],
    ['brian-presente.html', 'BRIAN'],
    ['bobby-presente.html', 'BOBBY LEE'],
    ['joey-presente.html', 'JOEY'],
  ];

  const navigationCandidates = [...document.querySelectorAll('nav, header[class*="nav"]')];
  const nav = navigationCandidates.find((candidate) => {
    if (candidate.matches('[role="tablist"], .memorial-brian-journal__controls, .john-book-controls')) return false;
    return candidate.querySelector('a[href]');
  });
  if (!nav) return;
  nav.classList.add('ede-page-route-nav');

  const style = document.createElement('style');
  style.id = 'ede-page-navigation-style';
  style.textContent = `
    .ede-nav-home {
      display: inline-flex !important;
      flex: 0 0 auto;
      align-items: center;
      justify-content: center;
      gap: .42rem;
      min-height: 2.3rem;
      padding: .55rem .75rem;
      border: 1px solid color-mix(in srgb, currentColor 48%, transparent);
      background: color-mix(in srgb, #090806 82%, transparent);
      color: inherit !important;
      font: 700 .56rem/1 'DM Mono', 'Cinzel', serif !important;
      letter-spacing: .12em !important;
      text-decoration: none !important;
      white-space: nowrap;
      transition: border-color .2s ease, background-color .2s ease, transform .2s ease;
    }
    .ede-nav-home:hover, .ede-nav-home:focus-visible {
      border-color: currentColor;
      background: color-mix(in srgb, #17120d 88%, transparent);
      transform: translateY(-1px);
    }
    .ede-nav-home__icon { font-size: .9rem; line-height: .8; }
    .ede-page-route-nav { gap: clamp(.45rem, 1.3vw, 1.25rem) !important; }
    .ede-character-route {
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) auto auto minmax(0, 1fr);
      align-items: center;
      gap: clamp(.55rem, 1.5vw, 1.5rem) !important;
    }
    .ede-character-route > :first-child { justify-self: start; }
    .ede-character-route .ede-route-label { justify-self: center; text-align: center; }
    .ede-character-route .ede-route-home { justify-self: center; }
    .ede-character-route > :last-child { justify-self: end; text-align: right; }
    .ede-route-edge {
      color: currentColor;
      font: 600 .5rem/1.35 'DM Mono', 'Cinzel', serif;
      letter-spacing: .1em;
      opacity: .48;
      white-space: nowrap;
    }
    .ede-route-link { white-space: nowrap; }
    @media (max-width: 700px) {
      .ede-nav-home { min-height: 2rem; padding: .45rem .55rem; font-size: .5rem !important; letter-spacing: .06em !important; }
      .ede-page-route-nav { gap: .45rem !important; padding-inline: .75rem !important; }
      .ede-page-route-nav > a:not(.ede-nav-home) {
        max-width: 35vw;
        overflow: hidden;
        font-size: clamp(.42rem, 1.9vw, .55rem) !important;
        letter-spacing: .055em !important;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .ede-page-route-nav > span {
        max-width: 32vw;
        overflow: hidden;
        font-size: .43rem !important;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .ede-character-route {
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
        gap: .45rem !important;
        padding-inline: .75rem !important;
      }
      .ede-character-route .ede-route-label,
      .ede-character-route .ede-route-edge { display: none !important; }
      .ede-character-route .ede-route-home { grid-column: 2; }
      .ede-character-route .ede-route-prev { grid-column: 1; justify-self: start; }
      .ede-character-route .ede-route-next { grid-column: 3; justify-self: end; }
      .ede-character-route .ede-route-link { max-width: 36vw; overflow: hidden; text-overflow: ellipsis; font-size: .49rem !important; letter-spacing: .05em !important; }
    }
  `;
  document.head.append(style);

  const createHomeLink = () => {
    const link = document.createElement('a');
    link.className = 'ede-nav-home';
    link.href = homeHref;
    link.setAttribute('aria-label', 'Voltar ao início');
    link.innerHTML = '<span class="ede-nav-home__icon" aria-hidden="true">⌂</span><span>INÍCIO</span>';
    return link;
  };

  const routeIndex = routeOrder.findIndex(([route]) => route === filename);
  if (routeIndex !== -1) {
    const currentLabel =
      [...nav.children].find((child) => child.tagName === 'SPAN')?.textContent.trim() ||
      'ARQUIVO HELLSINGS // PRESENTE';
    const [currentRoute] = routeOrder[routeIndex];
    const previous = routeOrder[routeIndex - 1];
    const next = routeOrder[routeIndex + 1];
    const routeLink = (route, labelText, className) => {
      const link = document.createElement('a');
      link.className = `ede-route-link ${className}`;
      link.href = route;
      link.textContent = labelText;
      return link;
    };
    const edgeLabel = (text) => {
      const edge = document.createElement('span');
      edge.className = 'ede-route-edge';
      edge.textContent = text;
      return edge;
    };

    nav.classList.add('ede-character-route');
    nav.setAttribute('aria-label', 'Navegação entre os arquivos dos Hellsings');
    const previousNode = previous
      ? routeLink(previous[0], `← ${previous[1]}`, 'ede-route-prev')
      : edgeLabel('PRIMEIRO ARQUIVO');
    const label = document.createElement('span');
    label.className = 'ede-route-label';
    label.textContent = currentLabel;
    label.setAttribute('aria-current', 'page');
    const nextNode = next
      ? routeLink(next[0], `${next[1]} →`, 'ede-route-next')
      : edgeLabel('ÚLTIMO ARQUIVO');

    nav.replaceChildren(previousNode, label, createHomeLink(), nextNode);
    nav.dataset.edeRoute = currentRoute;
    return;
  }

  const existingHome = [...nav.querySelectorAll('a[href]')].find((link) => {
    const href = link.getAttribute('href') || '';
    return /(?:^|\/)(?:\.\/)?index\.html(?:$|\?[^#]*)/i.test(href) || href === '/';
  });
  if (existingHome) {
    existingHome.classList.add('ede-nav-home');
    existingHome.setAttribute('aria-label', 'Voltar ao início');
    existingHome.innerHTML = '<span class="ede-nav-home__icon" aria-hidden="true">⌂</span><span>INÍCIO</span>';
    return;
  }

  const homeLink = createHomeLink();
  const children = [...nav.children];
  const centerLabel = children.find((child) => child.tagName === 'SPAN');
  if (centerLabel?.nextElementSibling) centerLabel.after(homeLink);
  else if (nav.lastElementChild) nav.insertBefore(homeLink, nav.lastElementChild);
  else nav.append(homeLink);
})();
