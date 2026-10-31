# Arquitetura do Site

## Páginas principais

| Arquivo | Função |
| --- | --- |
| `index.html` | Experiência principal no presente devastado, agora com o atalho flutuante da Malha Hellsings no canto inferior esquerdo |
| `arquivo-passado.html` | Prólogo e entrada dos Arquivos do Passado |
| `telainicial.html` | Narrativa do passado dos Connor antes do Dia D |
| `hellsing.html` | Arquivo do centro de comando Hellsings antes do Dia D |
| `faccao-hellsings-presente.html` | Dossiê da facção no presente, com operações, integrantes ativos e o piloto de conversas Malha Hellsings |
| `memorial.html` | Memorial central de Brian Taylor (retrato do presente, jornada, diário com 24 homenagens individuais, respostas e reações da equipe, chat coletivo dos sobreviventes e despedida sem áudio), homenagem ampliada de John com trajetória e 13 transmissões textuais, e outras pessoas perdidas nas rotas dos Hellsings; ainda sem livro público de visitantes |
| `galeria.html` | Álbuns familiares e ambientes da mansão |
| `videos.html` | Central de registros audiovisuais |
| `era-extincao-presente/index.html` | Redirecionamento legado para a entrada principal |

## Livro público de visitantes — planejado para a fase final

- O autor decidiu deixar o mural de mensagens dos visitantes para depois que o restante do site estiver concluído.
- A preferência é que visitantes possam escrever sem conta GitHub e que as mensagens publicadas apareçam para as próximas pessoas que acessarem o memorial.
- Supabase é a opção escolhida para armazenar essas mensagens; o site estático não as guarda por conta própria. A configuração de moderação, aprovação e proteção contra spam ainda será decidida na implementação.
- Giscus não foi integrado. A busca no projeto confirmou que não há código ou configuração dele.

## Malha Hellsings — conversas narrativas

- O piloto de facção fica em `faccao-hellsings-presente.html`; `index.html` também oferece um chat flutuante da Malha no canto inferior esquerdo. `hellsing.html`, que guarda o arquivo anterior ao Dia D, não foi alterado.
- `era-extincao-presente/malha-hellsings.css` define o visual do canal; `js/malha-hellsings.js` controla a troca acessível entre canais por mouse e teclado.
- Na página inicial, `era-extincao-presente/malha-chat.css` e `js/malha-chat.js` controlam o botão **ABRIR CHAT**, o painel responsivo, as abas e o fechamento por botão, Escape ou clique fora. As conversas apresentam dois recortes ficcionais do presente: uma operação e uma conversa de convivência que lembra Brian.
- `memorial.html` reutiliza o componente flutuante com dois recortes próprios: a vigília de Brian e a lembrança da última rota de John. Os dois são mencionados pelos sobreviventes, sem publicar mensagens deles após a morte.
- O registro de John em `memorial.html` inclui a estrada até a última fuga e um arquivo de 13 transmissões textuais, selecionadas uma por vez, com reações e respostas; o formato não repete o mural de retratos de Brian. Brian morreu antes de John e não publica homenagem no memorial dele.
- Os canais iniciais são `Rota sem nome` (operações) e `Entre os seus` (convívio do bunker). As mensagens são cenas escritas e preservadas no HTML, com respostas e reações; não são uma conversa ao vivo nem conteúdo enviado por visitantes.
- A linha do presente inclui integrantes ativos. Brian e John aparecem apenas nos registros de memória; uma conversa de Jully e Alice preserva a lembrança de Brian sem atribuir mensagens a ele.
- `memorial.html` aplica a mesma ideia nas 24 homenagens individuais, por meio de reações e uma resposta de personagem em cada post. `js/memorial-journal.js` monta as conversas; `era-extincao-presente/memorial-hellsings.css` estiliza o fio de respostas dentro do diálogo.
- John deixa um recado identificado como escrito em vida; ele e Brian não aparecem reagindo às conversas atuais. O livro público de visitantes continua separado e planejado para Supabase após a conclusão do site.
- As demais páginas de facções aguardam a adaptação do formato. O conteúdo atual da Malha é narrativo e fixo, sem publicação pública ou armazenamento de mensagens.

## Abertura cinematográfica do presente

- `intro.html`: porta de entrada cinematográfica independente da página principal.
- `era-extincao-presente/extinction-intro.js`: linha do tempo dirigida exclusivamente pelo `currentTime` da trilha, evitando atrasos e repetições causados por temporizadores paralelos.
- `era-extincao-presente/extinction-opening-cinematic.css`: enquadramentos responsivos, letterbox, poeira, clarões, cursor personalizado e formação do título.
- `audio/intro-ultron-reference.mp3`: trilha temporária usada como relógio da montagem; deverá ser substituída por uma faixa licenciada ou original.
- A montagem atual possui 38 cenas entre `0:00` e `1:57.702`, misturando fotografias e vídeos curtos.
- Vídeos narrativos e de ação utilizados: `ariani&alice.mp4`, `brothers2.mp4`, `jully-grito.mp4`, `jack-acao.mp4`, `alice-diana-mary.mp4`, `alice-acao.mp4`, `mark-acao.mp4` e `versao1.mp4`.
- `versao1.mp4` apresenta Doom no encerramento: o vídeo começa oculto em `1:40`, a queda permanece coberta e Doom é revelado caminhando em `1:45`, aproximando-se do rosto durante a frase final.
- O rodapé da abertura mantém somente o comando `PULAR`; contador, progresso e controle de som foram removidos.
- Imagens e vídeos usam enquadramento integral no mobile, com preenchimento atmosférico para evitar cortes importantes.

## Personagens

| Perfil | Galeria separada |
| --- | --- |
| `jack.html` | `jack-fotos.html` |
| `alice.html` | `alice-fotos.html` |
| `mark.html` | `mark-fotos.html` |
| `ariani.html` | Galeria integrada ao perfil |
| `britney.html` | `britney-fotos.html` |
| `jully.html` | `jully-fotos.html` |

## Arquivos do presente e galerias atuais

| Dossiê do presente | Arquivo de registros | Estilos e comportamento |
| --- | --- | --- |
| `alice-presente.html` | `alice-fotos.html` | `era-extincao-presente/alice-presente.css`, `css/alice-fotos-polish.css`, `era-extincao-presente/alice-presente-gallery.js`, `js/alice-fotos.js` |
| `mark-presente.html` | `mark-fotos.html` | `era-extincao-presente/mark-presente.css`, `css/mark-fotos-polish.css`, `js/mark-fotos.js` |
| `ariani-presente.html` | `ariani-fotos.html` | `era-extincao-presente/ariani-presente.css`, `css/ariani-fotos.css`, `js/ariani-fotos.js` |
| `britney-presente.html` | `britney-fotos.html` | `era-extincao-presente/britney-presente.css`, `css/britney-registros.css`, `js/britney-registros.js` |
| `bobby-presente.html` | `bobby-registros.html` | `era-extincao-presente/bobby-presente.css`, `css/bobby-registros.css`, `js/bobby-registros.js` |
| `brian-presente.html` | Arquivo visual integrado com quinze registros | `era-extincao-presente/brian-presente.css` |
| `lana-presente.html` | Galeria de 21 registros e arquivo de dezesseis imagens com Pollyana | `era-extincao-presente/lana-presente.css`, `era-extincao-presente/lana-presente.js` |
| `brian-presente.html`, `john-presente.html` | `memorial.html` | `era-extincao-presente/brian-presente.css`, `era-extincao-presente/john-presente.css`, `era-extincao-presente/memorial-hellsings.css` |

Os arquivos fotográficos listados usam carrosséis independentes, controles de teclado/mouse, pausa por foco, diálogo de ampliação e `object-fit: contain` nos registros em que o enquadramento completo é obrigatório. A estrutura detalhada está em `REGISTRO-TECNICO-ATUAL.md`.

## Pastas de mídia

- `img-jack/`, `img-alice/`, `img-mark/`, `img-ariani/`, `img-britney/` e `img-jully/`: imagens individuais.
- `jack-presente.html`: perfil narrativo de Jack no presente, com fundo contínuo e acesso ao dossiê visual.
- `registros-jack.html`: arquivo fotográfico independente de Jack Connor.
- `filhos-connor.html`: central da segunda geração de Jack e Alice.
- `herdeiros-extincao.html`: portal da nova geração, separando as linhagens de Jack/Alice e Mark/Ariani.
- `filhos-mark-ariani.html`: central dos arquivos de Pollyana e Nathan, filhos de Mark e Ariani.
- `pollyana-presente.html` e `nathan-presente.html`: dossiês individuais da segunda linhagem. A galeria solo de Pollyana está em `pollyana-registros.html`, com treze imagens; sua proposta revisável de função narrativa consta em `POLLYANA-LORE-PROPOSTA.md`.
- `nathan-registros.html`: álbum individual de dez imagens de Nathan, separado do dossiê narrativo e sem registros de outros personagens.
- `lana-presente.html`: dossiê da esposa britânica de Nathan, com retrato de capa, 21 registros fotográficos ampliáveis, arquivo separado de dezesseis imagens com Pollyana e acesso a partir do perfil de Nathan.
- `alucard-presente.html`, `diana-presente.html`, `nicolai-presente.html`, `mary-presente.html` e `isolde-presente.html`: arquivos individuais dos cinco filhos, na ordem oficial da linhagem.
- `diana-presente.html`: dossiê de combate com doutrina, matriz de proficiência e transmissão visual organizada.
- `isolde-presente.html`: arquivo individual com capa exclusiva e registros fotográficos em looping.
- `era-extincao-presente/diana-carousel.js`: looping, controles, acessibilidade e gesto mobile dos registros de Diana.
- `era-extincao-presente/isolde-carousel.js`: looping, controles, acessibilidade e gesto mobile dos registros de Isolde.
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

Os estilos compartilhados que antes ficavam soltos na raiz agora estão em `css/`. Os controladores JavaScript correspondentes estão em `js/`. As páginas HTML permanecem reunidas na raiz para preservar seus endereços públicos e facilitar a navegação pelo Explorer.

- `css/site-cursor.css` + `js/site-cursor.js`: cursor global compatível com diálogos em camada superior.
- `css/site-transmission.css` + `js/site-transmission.js`: interferência visual global.
- `css/video-record-link.css`: cartões de registros audiovisuais.
- `css/hellsings-command.css` + `js/hellsings-command.js`: formação, radar, dossiês e interações dos Hellsings.
- `css/hellsings-cursor.css`: mira tática exclusiva dos Hellsings.
- `css/hellsings-opening.css` + `js/hellsings-opening.js`: abertura cinematográfica e autenticação Ômega.
- `css/hellsings-bunker.css` + `js/hellsings-bunker.js`: apresentação dos ambientes e setores subterrâneos.
- `css/hellsings-typography.css` + `js/hellsings-typography.js`: efeitos individuais nas letras dos títulos.
- `css/hellsings-system.css` + `js/hellsings-system.js`: painel operacional, registros, fórum narrativo e pré-contrato local.
- `css/home-hellsings-portal.css` + `js/home-hellsings-portal.js`: portal visual entre a tela principal e a base.
- `css/galeria-rebuild.css`, `js/galeria-rebuild.js` e `css/galeria-polish.css`: álbuns familiares e mansão.

## Uniformes Hellsings

- `img-mark/markhellsing.png`: uniforme tático de Mark.
- `img-jack/jack-hellsings-commander.png`: uniforme de comandante de Jack.
- `img-alice/alice-hellsings-admin.png`: uniforme administrativo-médico de Alice.
- `img-hellsing/`: retratos de John, Naomi, Clhoe, Luke, Dimitri, Brian Taylor e Hellen. Os retratos individuais usados no arquivo de Bobby estão em `img-presente/personagens/`; imagens antigas com Joey e Britney não devem ser apresentadas como Bobby.
- `img-bunker/`: entrada, áreas operacionais, garagens, enfermaria, arsenal, biblioteca, alojamentos e setores de suporte.

Todos os dez integrantes possuem imagens oficiais nos cartões e dossiês da organização.
