# Arquitetura do Site

## Páginas principais

| Arquivo | Função |
| --- | --- |
| `index.html` | Experiência principal no presente devastado |
| `arquivo-passado.html` | Prólogo e entrada dos Arquivos do Passado |
| `telainicial.html` | Narrativa do passado dos Connor antes do Dia D |
| `hellsing.html` | Centro de comando dos Hellsings |
| `galeria.html` | Álbuns familiares e ambientes da mansão |
| `videos.html` | Central de registros audiovisuais |
| `era-extincao-presente/index.html` | Redirecionamento legado para a entrada principal |

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
- `jack-presente.html`: perfil narrativo de Jack no presente, com fundo contínuo e acesso ao dossiê visual.
- `registros-jack.html`: arquivo fotográfico independente de Jack Connor.
- `filhos-connor.html`: central da segunda geração de Jack e Alice.
- `herdeiros-extincao.html`: portal da nova geração, separando as linhagens de Jack/Alice e Mark/Ariani.
- `filhos-mark-ariani.html`: central dos arquivos de Pollyana e Nathan, filhos de Mark e Ariani.
- `pollyana-presente.html` e `nathan-presente.html`: arquivos individuais da segunda linhagem.
- `alucard-presente.html`, `nicolai-presente.html`, `mary-presente.html`, `diana-presente.html` e `isolde-presente.html`: arquivos individuais dos cinco filhos.
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
- `jack.mp4`: registro individual de Jack.
- `mark.mp4`: registro individual de Mark.

Os vídeos compartilhados são reproduzidos em `videos.html`. Os registros individuais `jack.mp4` e `mark.mp4` são reproduzidos diretamente nos respectivos perfis, com `preload="metadata"` para limitar o carregamento inicial.

## Atualização mobile e audiovisual — 24/08/2026

- `hellsings-app/`: aplicativo Expo/React Native dos Hellsings.
- `video/alice.mp4` e `video/ariani.mp4`: registros individuais reproduzidos diretamente nos respectivos perfis.
- `img-hellsing/brand/hellsings-emblem.png`: emblema oficial usado pelo site e pelo aplicativo.
- `hellsings-immersive.css` e `hellsings-immersive.js`: impacto visual, interferência, iluminação e tipografia do centro de comando.

## Ponte temporal e hierarquia oficial

- `timeline-bridge.css` e `timeline-bridge.js`: transição cinematográfica para o Dia Zero de Doomsday.
- `index.html`: período principal e presente dos personagens, muitos anos depois do Dia D.
- `arquivo-passado.html`: cofre narrativo que preserva a experiência jovem já construída.
- `era-extincao-presente/`: estilos, comportamento e redirecionamento legado da experiência principal.
- `era-extincao-presente/extinction-world.css`: atmosfera de deserto, ferrugem, radiação e escassez.
- `era-extincao-presente/extinction-world.js`: controle da abertura e persistência por sessão.

A cronologia segue `passado dos Connor → Dia Zero/Doomsday → presente devastado`, mas a experiência agora começa no presente. O usuário abre o passado por meio da caixa-preta Connor.

## Componentes compartilhados

- `site-cursor.*`: cursor global compatível com diálogos em camada superior.
- `site-transmission.*`: interferência visual global.
- `video-record-link.css`: cartões de registros audiovisuais.
- `hellsings-command.*`: formação, radar, dossiês e interações dos Hellsings.
- `hellsings-cursor.css`: mira tática exclusiva dos Hellsings.
- `hellsings-opening.*`: abertura cinematográfica e autenticação Ômega.
- `hellsings-bunker.*`: apresentação dos ambientes e setores subterrâneos.
- `hellsings-typography.*`: efeitos individuais nas letras dos títulos.
- `hellsings-system.*`: painel operacional, registros, fórum narrativo e pré-contrato local.
- `home-hellsings-portal.*`: portal visual entre a tela principal e a base.
- `galeria-rebuild.*` e `galeria-polish.css`: álbuns familiares e mansão.

## Uniformes Hellsings

- `img-mark/markhellsing.png`: uniforme tático de Mark.
- `img-jack/jack-hellsings-commander.png`: uniforme de comandante de Jack.
- `img-alice/alice-hellsings-admin.png`: uniforme administrativo-médico de Alice.
- `img-hellsing/`: retratos oficiais de John, Naomi, Clhoe, Luke, Dimitri, Brian Taylor e Hellen. O retrato próprio de Bobby ainda será adicionado.
- `img-bunker/`: entrada, áreas operacionais, garagens, enfermaria, arsenal, biblioteca, alojamentos e setores de suporte.

Todos os dez integrantes possuem imagens oficiais nos cartões e dossiês da organização.
