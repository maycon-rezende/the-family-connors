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

- `img/`: imagens organizadas por personagem (`img-jack`, `img-alice`, `img-mark`, `img-ariani`, `img-britney`, `img-jully`) e fotos conjuntas dos irmãos em `img-brothers`.
- `galeria-assets/`: versões WebP otimizadas para galerias.
- `casa/`: ambientes da Mansão Connor.
- `audio/`: trilhas das páginas.
- `video/`: registros em vídeo.

## Componentes compartilhados

- `site-cursor.css` e `site-cursor.js`: cursor global com brasa, anel, poeira e impacto.
- `site-transmission.css` e `site-transmission.js`: interferência global de transmissão.
- `opening.css` e `opening.js`: prólogo e efeitos do `index`.
- `home-effects.css` e `home-effects.js`: efeitos e seções da tela inicial.
- `home-cinematic.css` e `home-cinematic.js`: narrativa principal em oito capítulos, progresso de leitura, revelações e transição até o pós-apocalipse.
- `jack-effects.css` e `jack-effects.js`: identidade visual e galeria-dossiê de Jack.
- `alice-effects.css` e `alice-effects.js`: atmosfera clínica, partículas ambientais e arquivo fotográfico interativo de Alice.
- `book-prologue.css` e `book-prologue.js`: primeiro ato do `index`; o livro permanece fechado e só libera o prólogo narrativo e a abertura nuclear após interação do visitante.

## Organização realizada

- Remoção da cópia antiga do site que existia dentro de `ariani-img/the connors family`.
- Remoção de imagens duplicadas confirmadas por hash.
- Consolidação das imagens de cada personagem em sua própria pasta dentro de `img/`.
- Separação das fotos conjuntas dos irmãos Connor em `img/img-brothers/`.
- Manutenção dos WebP da galeria para reduzir carregamento.
