# Arquitetura do Site

## Páginas ativas

| Arquivo | Função |
| --- | --- |
| `index.html` | Abertura cinematográfica e entrada da Mansão Connor |
| `telainicial.html` | Visão geral da família e do universo |
| `jack.html` | Dossiê de Jack Connor |
| `alice.html` | Dossiê de Alice Myers Connor |
| `mark.html` | Dossiê de Mark Connor |
| `ariani.html` | Dossiê de Ariani Salvatore |
| `britney.html` | Dossiê de Britney Connor |
| `jully.html` | Dossiê de Jully Connor |
| `hellsing.html` | Organização Hellsings |
| `galeria.html` | Arquivo visual |

## Pastas de mídia

- `img/`: imagens principais, alternativas de Jack e coleção de Jully.
- `galeria-assets/`: versões WebP otimizadas para galerias.
- `casa/`: ambientes da Mansão Connor.
- `audio/`: trilhas das páginas.
- `video/`: registros em vídeo.

## Componentes compartilhados

- `site-cursor.css` e `site-cursor.js`: cursor global com brasa, anel, poeira e impacto.
- `site-transmission.css` e `site-transmission.js`: interferência global de transmissão.
- `opening.css` e `opening.js`: prólogo e efeitos do `index`.
- `home-effects.css` e `home-effects.js`: efeitos e seções da tela inicial.
- `jack-effects.css` e `jack-effects.js`: identidade visual e galeria-dossiê de Jack.

## Organização realizada

- Remoção da cópia antiga do site que existia dentro de `ariani-img/the connors family`.
- Remoção de imagens duplicadas confirmadas por hash.
- Consolidação das imagens de Jully em `img/jully/`.
- Preservação de imagens alternativas de Jack em `img/jack-alternatives/`.
- Manutenção dos WebP da galeria para reduzir carregamento.
