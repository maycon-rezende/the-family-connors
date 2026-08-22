# Arquitetura do Site

## Páginas principais

| Arquivo | Função |
| --- | --- |
| `index.html` | Prólogo e entrada da Mansão Connor |
| `telainicial.html` | Página inicial narrativa |
| `hellsing.html` | Centro de comando dos Hellsings |
| `galeria.html` | Álbuns familiares e ambientes da mansão |
| `videos.html` | Central de registros audiovisuais |

## Personagens

| Perfil | Galeria separada |
| --- | --- |
| `jack.html` | `jack-fotos.html` |
| `alice.html` | `alice-fotos.html` |
| `mark.html` | `mark-fotos.html` |
| `ariani.html` | Galeria integrada ao perfil |
| `britney.html` | `britney-fotos.html` |
| `jully.html` | `jully-fotos.html` |

## Pastas de mídia

- `img-jack/`, `img-alice/`, `img-mark/`, `img-ariani/`, `img-britney/` e `img-jully/`: imagens individuais.
- `img-brothers/`: irmãos, casais e núcleos familiares.
- `casa/`: 24 ambientes da Mansão Connor.
- `audio/`: trilhas das páginas.
- `video/`: vídeos compartilhados.
- `galeria-assets/`: recursos auxiliares e versões otimizadas anteriores.

## Vídeos catalogados

- `ariani&alice.mp4`: Ariani e Alice.
- `ariani&mark.mp4`: Mark e Ariani.
- `brothers.mp4`: irmãos Connor.
- `jully&brit.mp4`: Britney e Jully.

Os MP4 são reproduzidos apenas em `videos.html`. As páginas individuais usam cartões de acesso, evitando carregar vídeos pesados em várias páginas.

## Componentes compartilhados

- `site-cursor.*`: cursor global compatível com diálogos em camada superior.
- `site-transmission.*`: interferência visual global.
- `video-record-link.css`: cartões de registros audiovisuais.
- `hellsings-command.*`: formação, radar, dossiês e interações dos Hellsings.
- `hellsings-cursor.css`: mira tática exclusiva dos Hellsings.
- `galeria-rebuild.*` e `galeria-polish.css`: álbuns familiares e mansão.

## Uniformes Hellsings

- `img-mark/markhellsing.png`: uniforme tático de Mark.
- `img-jack/jack-hellsings-commander.png`: uniforme de comandante de Jack.
- `img-alice/alice-hellsings-admin.png`: uniforme administrativo-médico de Alice.

Os demais agentes permanecem representados por silhuetas cromáticas até receberem imagens oficiais.
