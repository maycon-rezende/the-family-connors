# Arquitetura do Site

## Páginas principais

| Arquivo | Função |
| --- | --- |
| `index.html` | Experiência principal no presente devastado, com o atalho do chat Assemble Hellsings e acesso a Posts dos Hellsings pelo destaque e pelo submenu **Arquivos** |
| `arquivo-passado.html` | Prólogo e entrada dos Arquivos do Passado |
| `telainicial.html` | Narrativa do passado dos Connor antes do Dia D |
| `hellsing.html` | Arquivo do centro de comando Hellsings antes do Dia D |
| `faccao-hellsings-presente.html` | Dossiê dos Hellsings no presente, com operações, integrantes ativos, chat Assemble Hellsings e acesso à página de posts |
| `jack-presente.html` e `mark-presente.html` | Dossiês atuais com terminal de celular, mensagens arquivadas do crossover Doomsday e caderno de campo interativo |
| `posts-hellsings.html` | Posts dos Hellsings: feed separado com publicações que entram continuamente em ciclo aleatório, comentários em fio e reações locais |
| `membros-hellsings.html` | Índice de personagens ligados aos Hellsings, com acesso aos arquivos individuais da Lana e da Sally |
| `memorial.html` | Memorial central com jornada e caderno de 24 homenagens de Brian, chat coletivo dos sobreviventes e vídeo de despedida com áudio habilitado e atalho no caderno; também contém o relato interativo da última fuga de John. A dedicatória e as 34 homenagens de John ficam em `john-memorial.html`; o canal duplicado foi removido daqui. |
| `galeria.html` | Álbuns familiares e ambientes da mansão |
| `videos.html` | Central de registros audiovisuais |
| `era-extincao-presente/index.html` | Redirecionamento legado para a entrada principal |

## Livro público de visitantes — planejado para a fase final

- O autor decidiu deixar o mural de mensagens dos visitantes para depois que o restante do site estiver concluído.
- A preferência é que visitantes possam escrever sem conta GitHub e que as mensagens publicadas apareçam para as próximas pessoas que acessarem o memorial.
- Supabase é a opção escolhida para armazenar essas mensagens; o site estático não as guarda por conta própria. A configuração de moderação, aprovação e proteção contra spam ainda será decidida na implementação.
- Giscus não foi integrado. A busca no projeto confirmou que não há código ou configuração dele.

## Assemble Hellsings — conversas narrativas

- O chat Hellsings aparece para o público como **Assemble Hellsings**. Ele fica em `faccao-hellsings-presente.html`; `index.html` também oferece o atalho flutuante no canto inferior esquerdo. `hellsing.html`, que guarda o arquivo anterior ao Dia D, permanece fora destas mudanças.
- `era-extincao-presente/malha-hellsings.css` define o visual do canal; `js/malha-hellsings.js` controla a troca acessível entre canais por mouse e teclado.
- Na página inicial, `era-extincao-presente/malha-chat.css` e `js/malha-chat.js` controlam o botão **ABRIR ASSEMBLE**, o painel responsivo, as abas e o fechamento por botão, Escape ou clique fora. As conversas apresentam dois recortes ficcionais do presente: uma operação e uma conversa de convivência que lembra Brian.
- `memorial.html` reutiliza o componente flutuante com dois recortes próprios: a vigília de Brian e a lembrança da última rota de John. Os dois são mencionados pelos sobreviventes, sem publicar mensagens deles após a morte.
- O registro de John em `memorial.html` inclui a estrada até a última fuga e um arquivo de 13 transmissões textuais, selecionadas uma por vez, com reações e respostas; o formato não repete o mural de retratos de Brian. Brian morreu antes de John e não publica homenagem no memorial dele.
- Os canais iniciais são `Rota sem nome` (operações) e `Entre os seus` (convívio do bunker). As cenas roteirizadas continuam preservadas no HTML; com o servidor Node e a chave configurados, cada canal também pode gerar duas falas por solicitação.
- A linha do presente inclui integrantes ativos. Brian e John aparecem apenas nos registros de memória; uma conversa de Jully e Alice preserva a lembrança de Brian sem atribuir mensagens a ele.
- `memorial.html` aplica a mesma ideia nas 24 homenagens individuais, por meio de reações e uma resposta de personagem em cada post. `js/memorial-journal.js` monta as conversas; `era-extincao-presente/memorial-hellsings.css` estiliza o fio de respostas dentro do diálogo.
- John deixa um recado identificado como escrito em vida; ele e Brian não aparecem reagindo às conversas atuais. O livro público de visitantes continua separado e planejado para Supabase após a conclusão do site.
- `faccao-cobras.html`, `faccao-fogo.html`, `faccao-ordem-sal.html`, `faccao-nomades-ferro.html` e `faccao-dominus.html` têm canais próprios de diálogo. `js/malha-faccoes.js` libera falas roteirizadas em sequência quando cada canal entra na área visível; `era-extincao-presente/malha-faccoes.css` preserva uma cor temática por facção. Dominus usa sinais sem nomes, mantendo as identidades desconhecidas.
- `posts-hellsings.html` é a página **Posts dos Hellsings**, separada do chat e do mural: mostra publicações dos integrantes vivos, comentários em fio e reações. `js/posts-hellsings.js` acrescenta novas publicações continuamente, sorteando uma sequência sem repetir o mesmo autor em posts consecutivos; há textos para treze membros e cada publicação recebe respostas e reações. A página inicial dá acesso pelo destaque e pelo submenu **Arquivos**; o dossiê presente também tem o link. Não existe publicação de visitantes nem armazenamento compartilhado neste feed.
- `membros-hellsings.html` reúne integrantes, familiares e vínculos em um índice separado, acessível pelo submenu **Arquivos** e pelo dossiê da facção. As páginas existentes de Lana e Sally agora distinguem **Antes do Dia D** e **Presente**; as imagens já disponíveis ficam no período presente. Os blocos visuais anteriores ao Dia D aguardam fotos desse período.
- Os roteiros, posts, respostas e reações locais continuam revisáveis. Os onze canais podem pedir uma troca de duas falas à IA por clique quando o backend está configurado; a chave fica no servidor e o site não persiste as respostas. O mural de posts e o livro público de visitantes seguem separados dessa integração.
- `js/dispositivo-recuperado.js` controla os celulares de Jack e Mark. `era-extincao-presente/dispositivo-recuperado.css` define a interface responsiva com paleta individual, seleção de contatos e aplicativos por teclado, foco restaurado ao fechar e leitura offline. Os registros são texto ficcional roteirizado; não consultam IA nem serviço externo.
- O terminal de Jack conserva o convite de encontro enviado a Mick e a interrupção do sinal; uma mensagem registra que Jack o preparou no FBI para liderar os agentes especiais quando seguiu para a Interpol. O caderno mantém a busca aberta e o reencontro futuro. O terminal de Mark registra que ele cumpriu seu tempo na Marinha e deixou o serviço; as mensagens de Hanson e Salazar refletem conhecidos de sua vida militar, sem colocar Mark sob o comando de Hanson nem afirmar os destinos dos oficiais depois do Dia D.
- Os diálogos do chat inicial, Assemble Hellsings, memorial e cinco facções foram ampliados com conversas encadeadas e vozes específicas. Brian e John não publicam postumamente; no memorial de Brian, John pode falar porque ainda estava vivo quando Brian morreu. As linhas são recortes roteirizados que terminam após o conjunto preparado.

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
- `img-amelia.passado.presente/`: nove imagens adicionadas à galeria de `amelia-arquivo.html`, identificadas por período nas legendas.
- `img-hilary-passado=presente/`: pasta com 26 imagens; a galeria atual reúne dez registros anteriores ao Dia D e nove do presente.
- `img-naomi-presente/`: sequência de 32 imagens novas integrada ao álbum único de Naomi.
- `img-jully/jully-presente.png`: foto atual usada na capa do dossiê e como sexto registro em `jully-registros.html`.
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
- `audio/theme-jack-presente.mp3`: tema da página atual de Jack, iniciado junto com `jack-presente.html`.
- `era-extincao-presente/jack-theme.js`: tenta iniciar a trilha na abertura da página e repete a tentativa em interação geral se o navegador bloquear autoplay.
- `era-extincao-presente/jack-presence.css/js`: sequência cinematográfica sincronizada à faixa; antes do segundo 14 apresenta a formação e a liderança de Jack e uma fala dele, depois revela nome, foto atual e perfil.
- `video/theme-memorial.mp4`: em `memorial.html`, é usado apenas como fonte de áudio dentro de `<audio>`; nenhum vídeo dessa faixa é exibido.
- `era-extincao-presente/memorial-theme.js`: inicia a trilha do memorial, retenta após interação geral se autoplay for bloqueado e pausa a música enquanto o vídeo de despedida de Brian toca.
- Padrão de áudio do projeto: músicas de página tocam junto com a página; não usar botões de ligar, desligar ou pausar música.
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
# IA nos chats do presente — 1º de novembro de 2026

- `server.js` serve o site localmente e fornece `/api/status` e `/api/chat`; a chave é lida somente de `OPENAI_API_KEY` no processo do servidor.
- `js/ai-dialogue.js` conecta os controles da página inicial, memorial, Malha Hellsings e canais das cinco facções ao endpoint. `era-extincao-presente/ai-dialogue.css` estiliza os controles e identifica as falas geradas.
- `js/malha-chat.js`, `js/malha-hellsings.js` e `js/malha-faccoes.js` suspendem os roteiros enquanto chega uma resposta e os retomam em seguida.
- A geração é iniciada pelo visitante em cada clique; cada resposta acrescenta duas falas identificadas como geradas por IA. Os roteiros ainda funcionam quando o servidor não tem chave.
- A hospedagem atual do projeto não tinha backend configurado. A integração local está pronta; a hospedagem pública precisa executar Node ou uma função equivalente e armazenar a chave como segredo. Consulte `INTEGRACAO-IA-CHATS.md`.

# Navegação principal simplificada — 1º de novembro de 2026

- A barra de `index.html` mantém seis acessos diretos: Mundo, Hellsings, Sobreviventes, Facções, Regiões e Fórum.
- Desaparecidos, Cronologia e O Passado foram agrupados sob o menu expansível **Arquivos**. As páginas e seções continuam acessíveis.
- `era-extincao-presente/world-archive.css` estiliza o dropdown para desktop e celular; `world-menu.js` fecha o grupo quando o menu principal fecha ou um link é escolhido.
