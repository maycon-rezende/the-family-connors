# Registro técnico atual — A Era da Extinção

Atualizado em **2 de novembro de 2026**.

Este documento é o mapa operacional do projeto no estado atual. Ele registra o que já foi implementado, onde cada parte do código vive, como as páginas conversam entre si, quais comandos foram usados para validar o site e como continuar o trabalho sem apagar a identidade visual já construída.

> Os guias específicos continuam sendo a fonte mais detalhada de duas áreas: [a abertura cinematográfica](GUIA-TECNICO-INTRO.md) e [os herdeiros](GUIA-TECNICO-HERDEIROS.md). Este arquivo conecta essas áreas ao restante do site.

## 1. Visão geral do sistema

O site continua construído em HTML, CSS e JavaScript sem framework nem etapa obrigatória de compilação. As páginas HTML ficam na raiz para preservar URLs públicas. Os estilos compartilhados ficam em `css/`, os scripts compartilhados em `js/` e os estilos/scripts específicos do presente em `era-extincao-presente/`. A integração opcional dos chats usa o servidor Node local `server.js`; hospedagem estática, por si só, não executa o endpoint da IA.

| Camada | Responsabilidade | Exemplos |
| --- | --- | --- |
| HTML | Estrutura, semântica, textos, links e pontos de montagem | `intro.html`, `alice-presente.html`, `mark-fotos.html` |
| CSS | Identidade visual, responsividade, cursor, transições e redução de movimento | `css/site-cursor.css`, `era-extincao-presente/alice-presente.css` |
| JavaScript | Timeline, carrosséis, filtros, diálogos, revelações e estado local | `era-extincao-presente/extinction-intro.js`, `js/britney-registros.js` |
| Mídia | Imagens, áudios e vídeos vinculados por caminhos relativos | `img-presente/`, `img-hellsing/`, `img-intro/`, `audio/`, `video/` |
| Documentação | Lore confirmada, decisões, manutenção e publicação | `resumo-do-projeto/` |

## 2. Abertura cinematográfica do presente

### Arquivos responsáveis

| Arquivo | Papel |
| --- | --- |
| `intro.html` | Tela de entrada, botões **INICIAR TRANSMISSÃO**, **PULAR** e **ACORDAR NO PRESENTE**. |
| `era-extincao-presente/extinction-intro.js` | Constrói a timeline, troca cenas e sincroniza tudo pelo tempo real do áudio. |
| `era-extincao-presente/extinction-opening-cinematic.css` | Letterbox, poeira, clarões, enquadramentos, título de areia/fumaça e cursor cinematográfico. |
| `audio/intro-ultron-reference.mp3` | Faixa temporária que funciona como relógio da montagem. Deve ser trocada antes de monetização. |
| `img-intro/` e `video/` | Frames, vídeos de ação, perda de Jully, Antártica/Hades e revelação de Doom. |

### Como a sincronização funciona

O código não encadeia dezenas de `setTimeout`. A música é o único relógio:

```js
const DURATION = 117.702;
const seconds = Math.min(audio.currentTime, DURATION);
const index = scenes.findIndex(
  (scene) => seconds >= scene.start && seconds < scene.end,
);
```

Cada cena do array `scenes` usa um dos dois construtores abaixo:

```js
const I = (src, start, end, text, className) => ({
  kind: 'img', src, start, end, text, className,
});

const V = (src, start, end, text, className, offset = 0) => ({
  kind: 'video', src, start, end, text, className, offset,
});
```

- `I(...)` registra uma fotografia/frame.
- `V(...)` registra um vídeo. O campo `offset` determina de qual segundo interno o vídeo deve começar quando a cena é ativada.
- `build()`, `load()` e `preload()` criam somente as mídias próximas da cena corrente.
- `indexAt()`, `activate()` e `render()` escolhem a cena conforme `audio.currentTime` muda.
- `prepareTitle()` divide o título final em letras para a animação individual por areia/fumaça.
- `finish()` exibe o final; `enter()` grava `ede-intro-liberada` em `sessionStorage` e abre `index.html?intro=concluida`.

### Doom e a frase final

A sequência final é configurada em `extinction-intro.js`. O vídeo `video/versao1.mp4` é iniciado escondido antes do foco narrativo; a queda fica coberta e Doom passa a ser revelado caminhando por volta de `1:45`. A montagem se aproxima do rosto na fala final, enquanto o título **A Era da Extinção** aparece letra a letra após a frase. O arquivo detalhado de tempos, efeitos e mídia está em `GUIA-TECNICO-INTRO.md`.

### Regra para incluir um novo frame

1. Colocar a imagem em `img-intro/` ou o vídeo em `video/`.
2. Adicionar uma entrada `I(...)` ou `V(...)` ao array `scenes`.
3. Manter o intervalo sem sobreposição acidental e dentro de `DURATION`.
4. Escolher classe de enquadramento (`fit-contain`, `fit-video`, `portrait`, `focus-*`, `action`, `ice`, `grief`, `monster-reveal` etc.).
5. Executar a auditoria e assistir à sequência completa antes de publicar.

## 3. Arquivos do presente — padrão de dossiê

As páginas do presente seguem uma linguagem comum: hero com retrato, identificação/código, lore curta, ficha técnica, blocos de habilidade, memórias e ligação para uma galeria independente. O arquivo compartilhado `era-extincao-presente/personagem-presente.js` fornece dados comuns por meio de `data-character`:

```html
<body data-character="alice">
```

```js
const key = document.body.dataset.character;
const p = profiles[key];
```

O script só monta componentes que existem na página. Por exemplo, a galeria compartilhada é consultada com `document.querySelector('[data-gallery]')`; se uma página usa um arquivo separado, ela não recebe a galeria antiga por engano.

### Cursor e acessibilidade compartilhada

- `css/site-cursor.css` e `js/site-cursor.js` fornecem o cursor visual em mouse/caneta.
- Em telas de toque, o cursor decorativo fica desligado e os controles nativos continuam funcionais.
- Todo cursor tem `pointer-events: none`; por isso ele não bloqueia links, botões ou diálogos.
- `:focus-visible` preserva foco de teclado.
- `prefers-reduced-motion: reduce` desliga looping e transições relevantes.
- Carrosséis pausam ao receber foco, ao receber mouse e quando a aba deixa de estar visível.

## 4. Dossiês e galerias concluídos

### Jack Connor — revisão de responsividade

| Arquivo | Implementação |
| --- | --- |
| `jack-presente.html` | Hero reorganizado para mostrar o retrato inteiro em telas estreitas; ficha de comando com experiência e quatro habilidades ligadas à lore confirmada. |
| `era-extincao-presente/jack-responsive.css` | Enquadramento próprio no notebook, composição empilhada em tablet/celular, cartões flexíveis e cursor nativo como reserva. |
| `era-extincao-presente/personagem-presente.js` | Ativa o cursor personalizado somente quando há mouse com capacidade de hover. |
| `css/present-responsive.css` | Ajustes de colunas e navegação nas fichas de Alice, Mark, Ariani, Britney, John e Dimitri. |

Os arquivos de Naomi, Luke, Clhoe, Hellen e Joey passaram a reorganizar suas grades já em `1180px`, antes que as três colunas comprimam o conteúdo no notebook. A revisão estática não substitui conferência visual em aparelhos reais.

### Alice Myers Connor

| Arquivo | Implementação |
| --- | --- |
| `alice-presente.html` | Perfil do presente, hero, ficha técnica, habilidades e acesso a **Memórias da Extinção**. |
| `era-extincao-presente/alice-presente.css` | Identidade turquesa/médica, dados operacionais, molduras e layout responsivo. |
| `era-extincao-presente/alice-presente-gallery.js` | Loop do painel de memória do perfil; dots, setas, pausa por foco/mouse e anúncio de estado. |
| `alice-fotos.html` | Álbum independente de registros do presente. |
| `css/alice-fotos-polish.css` | Moldura do arquivo, carrossel, controles, cursor e responsividade. |
| `js/alice-fotos.js` | Filtros, paginação, visualizador `<dialog>`, teclado e rotação do registro em destaque. |

Pontos de manutenção: a galeria de Alice deve usar registros do presente. Para incluir uma foto, criar o card com `data-group`, texto alternativo e legenda em `alice-fotos.html`; o JavaScript cuida da filtragem e do diálogo.

### Mark Connor

| Arquivo | Implementação |
| --- | --- |
| `mark-presente.html` | Perfil de comandante tático com ficha técnica, habilidades e atalho para registros. |
| `era-extincao-presente/mark-presente.css` | Paleta de aço/âmbar, radar, painel técnico e versão mobile. |
| `mark-fotos.html` | Arquivo de fotos separado do perfil. |
| `css/mark-fotos-polish.css` | Acabamento visual do álbum, radar e carrossel de foco. |
| `js/mark-fotos.js` | Filtros por conjunto, atualização da URL com `?set=`, modal de imagem e carrossel principal. |

O arquivo de Mark separa os grupos de registros por `data-group`. Para criar um grupo novo, adicionar o botão `data-filter`, a marcação nos cards e a entrada correspondente no script, preservando texto alternativo e legenda.

### Ariani Salvatore Connor

| Arquivo | Implementação |
| --- | --- |
| `ariani-presente.html` | Dossiê do presente com identidade, habilidades, blocos narrativos e chamada para a galeria. |
| `era-extincao-presente/ariani-presente.css` | Paleta vinho/rosa, camadas de sinal e layout da ficha. |
| `ariani-fotos.html` | Galeria independente **Ariani em Movimento**. |
| `css/ariani-fotos.css` | Carrossel compacto, moldura de transmissão, lightbox, cursor e ajustes mobile. |
| `js/ariani-fotos.js` | Oito registros, loop de 6,2 s, setas, pausa por interação, pré-carregamento e `<dialog>`. |

Ariani utiliza o padrão de imagem inteira:

```css
.ariani-carousel__stage > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}
```

Assim, fotos verticais e horizontais não cortam rostos ou personagens. No desktop, o palco é limitado por `height: clamp(280px, 31vw, 380px)`; no mobile usa `min(56svh, 460px)` com mínimo de 360 px.

### Britney Connor

| Arquivo | Implementação |
| --- | --- |
| `britney-presente.html` | Dossiê da rastreadora/médica de campo, carta, diário investigativo e entrada para **Memórias do Tempo**. |
| `era-extincao-presente/britney-presente.css` | Identidade vinho/rosa, campo de memórias e acabamento dos componentes da página. |
| `britney-fotos.html` | Álbum independente do presente. A galeria antiga foi isolada como template inerte, sem carregar fotos antigas. |
| `css/britney-registros.css` | Layout do arquivo, paleta própria, carrossel sem recorte, lightbox e cursor temático. |
| `js/britney-registros.js` | Quatro registros solo, troca automática de 6,2 s, setas, pausa, pré-carregamento, tratamento de erro e restauração de foco após o diálogo. |

Somente estes quatro arquivos entram no álbum atual, para manter coerência com o presente e não incluir Bobby/Joey nem imagens antigas:

```text
img-presente/personagens/britney-presente.png
img-presente/personagens/britney-presente1.png
img-presente/personagens/britney-presente2.png
img-presente/personagens/britney-presente3.png
```

O carrossel usa os atributos `data-present-carousel-*` e o diálogo `data-present-lightbox`. O fluxo principal é:

```js
function setRecord(index, immediate = false) { /* atualiza foto, legenda, contador e progresso */ }
function stopCycle() { /* pausa o intervalo */ }
function startCycle() { /* reinicia somente sem redução de movimento */ }
function go(index) { setRecord(index); startCycle(); }
```

O estilo usa `object-fit: contain`; portanto, uma imagem pode ter faixas laterais propositalmente, mas nunca tem conteúdo importante recortado.

### John

| Arquivo | Implementação |
| --- | --- |
| `john-presente.html` | Dossiê memorial de John: tecnologia e armamentos antes da última fuga, com link ao Memorial dos Hellsings. |
| `era-extincao-presente/john-presente.css` e `.js` | Identidade ciano/cobre, ficha de campo, efeitos de revelação e leitura operacional. |
| `john-registros.html` | Arquivo independente com dez imagens de John anteriores à morte e um retrato associado de Amelia sem data identificada. |
| `css/john-registros.css` e `js/john-registros.js` | Carrossel com imagem inteira, loop de 6,5 s, pausa por interação, pré-carregamento do próximo registro e lightbox nativo. |

### Brian Taylor

| Arquivo | Implementação |
| --- | --- |
| `brian-presente.html` | Memorial individual com parceria de Brian e Jack no FBI, atuação como veterano e rastreador dos Hellsings, infecção fatal, link ao Memorial dos Hellsings e galeria integrada com quinze registros. |
| `era-extincao-presente/brian-presente.css` | Identidade visual em bronze e azul-acinzentado, retratos sem recorte e layout responsivo. |
| `img-hellsing/brian-taylor.png`, `brian-presente.png`, `brian-taylor-presente.png`, `brian-presente1.png` a `brian-presente3.png` e os novos registros de campo e enfermaria | Quinze registros visuais preservados na galeria individual de Brian; as imagens não recebem datas ou operações não confirmadas. |

O cartão de Brian na página inicial e a ficha do memorial dos Hellsings abrem `brian-presente.html`. O dossiê de John está ligado à ficha correspondente dos Hellsings. `memorial.html` reúne as baixas oficiais de Brian e John. A homenagem de Brian abre com `img-hellsing/brian-presente.png`, percorre a jornada dele até a morte e apresenta 24 mensagens reconstruídas — da formação original, de familiares, de nove descendentes identificados e das pessoas do comboio — em um mural responsivo de retratos clicáveis, com um post individual para cada voz. `js/memorial-journal.js` organiza os retratos, abre os posts, controla a navegação entre homenagens e restaura o foco ao fechar. Quando não há uma foto conjunta, o post mostra os retratos preservados da pessoa e de Brian; as cenas conjuntas de Jack com Brian e de Alice cuidando de Brian são usadas como imagem única. Ariani, Britney e Jully usam novos retratos do presente; Alice aparece na enfermaria do bunker. Os cartões sem imagem identificada permanecem selados, em linha com os arquivos ainda não recuperados. Os textos atuais são reconstruções literárias editáveis, abertas às cenas definitivas e imagens que o autor enviar. A homenagem termina com `video/despedida.mp4` silenciado por `js/memorial-video.js`. A mensagem de John está identificada como registrada enquanto ele ainda estava vivo; a fotografia dele anterior à morte permanece no memorial. `era-extincao-presente/memorial-hellsings.css` contém a identidade visual e os ajustes responsivos. Brian morreu após ser infectado em campo; John se sacrificou durante uma fuga para que muitas pessoas escapassem. Mara Voss é uma aliada civil criada para o memorial, não integrante oficial.

Brian aparece como `HLS-09` no arquivo de comando (`js/hellsings-command.js`) e como `BT-09` no índice e no memorial do presente; a página individual preserva ambos os identificadores conforme o contexto.

### Bobby Lee

| Arquivo | Implementação |
| --- | --- |
| `bobby-presente.html` | Dossiê de Bobby Lee com a Unidade Jingwei, Rota das Lanternas, Janela de Cinzas e Linha Vermelha; inclui função de inteligência de campo e cronologia do encontro com Britney, gravidez, casa com Jully e casamento. O filho é dos dois. O destino de Lee após a queda segue sem confirmação. |
| `era-extincao-presente/bobby-presente.css` | Identidade ferrugem/oliva/âmbar, retrato de capa sem recorte, cartões de operação e linha do tempo responsivos, com foco de teclado. |
| `bobby-registros.html` | Galeria independente com dois retratos de Bobby Lee e uma colagem de seis cenas, sem datas nem missões atribuídas. |
| `css/bobby-registros.css` e `js/bobby-registros.js` | Imagens inteiras, ciclo de 6,5 s, setas, miniaturas, pausa por interação, foco e aba oculta, redução de movimento e ampliação em diálogo nativo com retorno de foco. |
| `img-presente/personagens/bobby-presente.png`, `bobby-lee-presente.png` e `quadro-bobby.png` | Dois retratos e uma colagem visualmente coerentes; as datas não estão identificadas. |
| `resumo-do-projeto/BOBBY-LEE-LORE.md` | Fonte narrativa detalhada; separa os fatos definidos pelo autor dos elementos criados nesta etapa a pedido dele. |

A imagem `img-hellsing/britney-bobby.png` foi removida: o homem retratado com Britney é Joey, conforme confirmação do autor. As outras duas imagens semelhantes (`britney-marido.png` e `britney-boby-presente.png`) permanecem no acervo, mas foram retiradas dos dados da galeria para evitar atribuição incorreta a Bobby. Nenhuma delas deve ser usada como prova de relação romântica entre Joey e Britney.

### Dimitri

| Arquivo | Implementação |
| --- | --- |
| `dimitri-arquivo.html` | Dossiê de Dimitri com origem russa confirmada; intervenção, extração e leitura de rota identificadas como hipóteses até a biografia oficial. |
| `era-extincao-presente/dimitri-arquivo.css` e `.js` | Identidade exclusiva em aço, azul-gelo e vermelho profundo; ficha técnica, terminal interativo, cursor temático e responsividade. |
| `dimitri-registros.html` | Arquivo independente dos três registros atuais: vigília, terreno aberto e imagem de Dimitri com Jack diante de um mapa, sem missão identificada. |
| `css/dimitri-registros.css` e `js/dimitri-registros.js` | Carrossel de 6,5 s com `object-fit: contain`, controles de teclado, pausa por foco/mouse/aba oculta, redução de movimento e `<dialog>`. |

Os links internos de Clhoe e John foram atualizados para `dimitri-arquivo.html`; o acesso **Abrir registros do presente** agora aponta para um arquivo existente e auditado.

O endereço anterior `dimitri-presente.html` redireciona para `dimitri-arquivo.html`, evitando duas versões contraditórias do mesmo dossiê. John permanece no conjunto de arquivos do presente como memorial; suas imagens mostram momentos anteriores à morte confirmada em `LORE-PRESENTE.md`.

### Regra de paleta exclusiva

Cada dossiê usa variáveis e acentos próprios, derivados da função narrativa do personagem. Exemplos já consolidados: Alice (turquesa médico/cobre), Mark (aço/âmbar), Ariani (vinho/rosa), Britney (framboesa/azul-claro), Hellen (latão/fumaça), Joey (areia/sálvia), Naomi (teal/azul), Chloe (violeta/rosa), Luke (musgo/âmbar), John (ciano/cobre), Dimitri (aço/azul-gelo/vermelho), Nathan (verde-fósforo/grafite), Lana (verde-rádio/areia) e Pollyana (ameixa/âmbar). Novas páginas devem definir sua própria paleta antes de reutilizar uma existente.

## 5. Herdeiros e segunda geração

| Núcleo | Arquivos principais | Estado técnico |
| --- | --- | --- |
| Filhos de Jack e Alice | `filhos-connor.html`, `alucard-presente.html`, `diana-presente.html`, `nicolai-presente.html`, `mary-presente.html`, `isolde-presente.html` | Ordem aplicada: Alucard, Diana, Nicolai, Mary, Isolde. |
| Filhos de Mark e Ariani | `filhos-mark-ariani.html`, `pollyana-presente.html`, `pollyana-registros.html`, `nathan-presente.html`, `nathan-registros.html` | Três descendentes confirmados; arquivos individuais de Pollyana e Nathan abertos, arquivo visual de James selado. Nathan é atirador de precisão; seu álbum separado reúne dez imagens solo sem recorte e usa identidade verde-fósforo, retrato de fundo e efeitos de mira. Pollyana tem dossiê familiar ameixa/âmbar, álbum próprio com treze imagens individuais e uma proposta revisável de negociação de passagens, ainda não canônica. |
| Esposa de Nathan | `lana-presente.html`, `era-extincao-presente/lana-presente.css/js` | Dossiê próprio de Lana Whitmore, com retrato de capa, galeria ampliável de 21 registros e seção própria com dezesseis imagens dela e de Pollyana como cunhadas; origem britânica e casamento informados pelo autor, sobrenome e história criados nesta etapa. |
| Efeitos compartilhados | `era-extincao-presente/lineage-effects.css/js` | Partículas, varredura, revelação por observador, cursor em mouse/caneta e redução de movimento. |

As páginas individuais dos herdeiros têm detalhes específicos — por exemplo, a ampulheta de Alucard, a transmissão de combate de Diana, o arquivo policial de Sally, a bússola de Mary, o carrossel de Isolde e o álbum separado de Nathan em `nathan-registros.html`, controlado por `era-extincao-presente/nathan-presente.js`. Consultar `GUIA-TECNICO-HERDEIROS.md` antes de alterar essas páginas.

### Hilary Caldwell Ashford — membro e vínculo dos Hellsings

| Arquivo | Implementação |
| --- | --- |
| `hilary-caldwell-ashford.html` | Dossiê de Hilary com biografia, cronologia e galerias separadas de antes do Dia D e do presente. |
| `era-extincao-presente/hilary-caldwell-ashford.css`, `era-extincao-presente/hilary-cursor.css` e `js/hilary-archive.js` | Paleta exclusiva verde clínico/âmbar, cursor de rastreamento para mouse, navegação por período e visualizador acessível de imagens com botões, setas e Escape. Cursor desativado em touch e para preferência por movimento reduzido. |
| `img-hilary-passado=presente/` | Pasta com 20 arquivos do núcleo de Hilary; o perfil seleciona dez fotos anteriores ao Dia D e quatro registros do presente, sem misturar os períodos. |

O índice `membros-hellsings.html` apresenta Lana Whitmore, Sally Ward, Hilary Caldwell Ashford, Sophie Romanoff e Leona. Leona tem página própria; sua história detalhada está marcada como proposta.

## 6. Política de mídia e nomenclatura

1. **Não misturar passado e presente.** Arquivos de álbuns do presente usam somente mídias que mostram a versão atual dos personagens.
2. **Não inventar lore pelo nome do arquivo.** Um arquivo novo entra na página somente depois de associação explícita do autor.
3. **Sempre usar `alt`.** A auditoria verifica fotos sem texto alternativo.
4. **Evitar corte por CSS.** Em registros narrativos, priorizar `object-fit: contain`; `cover` só deve ser usado em textura/background cuja composição tenha sido conferida.
5. **Vídeos pesados usam `preload="metadata"`.** Isso reduz o travamento inicial em celular e notebook.
6. **Arquivos temporários precisam de licença antes da monetização.** Consultar `DIREITOS-AUTORais.md` e `GUIA-PUBLICACAO-ADSENSE.md`.

## 7. Comandos de trabalho, revisão e publicação

Executar os comandos abaixo no diretório raiz `C:\the family connors`.

### Inspeção de arquivos e referências

```powershell
rg --files
rg -n "texto-ou-seletor" .
git status --short
git diff --stat
```

- `rg --files`: lista rapidamente o conteúdo rastreado/local.
- `rg -n`: procura usos de um nome de classe, mídia ou texto com número de linha.
- `git status --short`: mostra alterações, novos arquivos e exclusões.
- `git diff --stat`: mostra o tamanho das alterações de código antes do commit.

### Validação antes do commit

```powershell
node --check js/britney-registros.js
node --check js/ariani-fotos.js
node --check js/alice-fotos.js
node --check js/mark-fotos.js
node --check js/john-registros.js
node --check js/bobby-registros.js
node --check js/dimitri-registros.js
node --check era-extincao-presente/dimitri-arquivo.js
git diff --check
node scripts/auditar-site.js
```

- `node --check`: valida sintaxe JavaScript sem executar a página.
- `git diff --check`: procura espaços em branco inválidos e problemas de patch.
- `node scripts/auditar-site.js`: verifica idioma, viewport, SEO básico, `alt`, links vazios e referências internas. No estado atual, a auditoria encontrou **68 páginas**, sem referências quebradas; avisos de `alt=""` são imagens explicitamente decorativas.

### Prévia local opcional

O site não exige build. Use qualquer servidor estático local e abra, por exemplo, `britney-fotos.html`, `ariani-fotos.html` e `intro.html` em desktop e celular. Não testar apenas o arquivo aberto por `file://`, pois vídeo, fonte e comportamento podem diferir de um servidor HTTP.

O comando `node scripts/preview-site.mjs` inicia uma prévia local em `http://127.0.0.1:8765/`. Para revisar Jack, abra `/jack-presente.html` e compare pelo menos notebook, tablet e celular.

### Commit e envio para GitHub

```powershell
git add -A
git status --short
git commit -m "feat: atualiza arquivos do presente e galerias"
git push origin main
git status --short
```

Antes de `git add -A`, conferir arquivos novos e garantir que nenhum vídeo/arquivo temporário indevido será enviado. O repositório aceita as imagens atuais; nenhum dos novos arquivos verificados ultrapassa o limite individual de 100 MB do GitHub.

## 8. Procedimento para uma nova galeria independente

1. Criar `personagem-fotos.html` com navegação de volta ao dossiê, hero, palco do carrossel, controles e `<dialog>`.
2. Criar `css/personagem-fotos.css` com variáveis de cor exclusivas, `object-fit: contain`, responsividade e `prefers-reduced-motion`.
3. Criar `js/personagem-fotos.js` com lista de registros (`code`, `title`, `caption`, `src`, `alt`), `setRecord`, pausa/reinício, diálogo e pré-carregamento.
4. Inserir na página do personagem uma seção de entrada com link para a galeria, em vez de despejar todas as fotos no perfil.
5. Carregar `css/site-cursor.css` e `js/site-cursor.js` para manter a experiência coerente em mouse/caneta.
6. Validar caminhos, sintaxe, auditoria estática e visualmente no desktop/mobile.

## 9. Estado de publicação e próximos cuidados

- O ramo de trabalho é `main`; antes deste conjunto de alterações, o remoto estava sincronizado com o commit `a89ca88`.
- O conjunto documentado aqui foi publicado no commit `33fcc48` (`feat: atualiza dossiês e galerias do presente`) em `origin/main`.
- A abertura usa música e referências temporárias. Não monetizar nem solicitar AdSense antes de regularizar licenças.
- Arquivos de mídia novos podem estar guardados no repositório antes de serem ligados a uma página; isso não significa que a lore foi confirmada.
- Priorizar revisão visual em telas pequenas sempre que uma galeria receber nova imagem, principalmente para confirmar que retratos verticais não foram cortados.

## Chat narrativo flutuante na página principal

- `index.html` monta o botão **ABRIR ASSEMBLE** e o painel não modal do Assemble Hellsings. O componente é exclusivo da página principal do presente; não altera páginas do passado.
- `era-extincao-presente/malha-chat.css` fornece o painel âmbar, a disposição compacta de mensagens e retratos, a adaptação mobile e os ajustes de foco/redução de movimento.
- `js/malha-chat.js` implementa a alternância dos canais, navegação por setas/Home/End, fechamento por Escape, botão e clique fora, ocultação ao abrir o menu global e recortes roteirizados em ciclos automáticos nos quatro canais.
- `memorial.html` reutiliza o componente e os mesmos arquivos compartilhados, com os canais `Depois da vigília` (Brian) e `A última rota` (John). Os registros vêm dos sobreviventes; os falecidos não enviam novas mensagens.
- O histórico inicial permanece no HTML; os recortes roteirizados são revelados com indicador de digitação. `js/ai-dialogue.js` também oferece duas falas geradas por solicitação quando `/api/chat` está configurado. As respostas não são sincronizadas entre visitantes nem guardadas em banco pelo site. Nos canais de Brian e John, só sobreviventes falam; o mural público em Supabase permanece planejado para depois da conclusão do site.
- O console integrado de `faccao-hellsings-presente.html` usa `js/malha-hellsings.js` para a Malha H-01: libera mensagens roteirizadas quando a seção entra em vista, atualiza os contadores dos canais e pausa/resume o ciclo conforme a rolagem e a aba selecionada.

## Conversas das facções e mural dos Hellsings

- `faccao-cobras.html`, `faccao-fogo.html`, `faccao-ordem-sal.html`, `faccao-nomades-ferro.html` e `faccao-dominus.html` receberam consoles de conversa em sequência, com digitação simulada, respostas explícitas, avatar ou sinal anônimo e pausa fora da área visível.
- `js/malha-faccoes.js` contém os roteiros locais para Helena e Silas, Aurelia e Dário, Samira e Elias, Atlas e uma função anônima da oficina móvel. Dominus exibe dois sinais não atribuídos e não define personagens, nomes ou origem.
- `era-extincao-presente/malha-faccoes.css` adapta o console às paletas de cada dossiê: verde para Cobras, brasa para Fogo, ciano salino para Sal, aço para Ferro e violeta para Dominus.
- `posts-hellsings.html` é a página Posts dos Hellsings, separada do chat Assemble e do mural. O JavaScript intercala novos posts continuamente entre treze integrantes vivos em ciclos aleatórios, com avatar, respostas em fio, status de escrita e reação local; o acesso aparece no dossiê presente e também na página inicial.
- `membros-hellsings.html` é o índice de membros, família e vínculos. Reúne Lana Whitmore, Sally Ward e Hilary Caldwell Ashford; o dossiê de Hilary contém fotos dos dois períodos e separa visualmente **Antes do Dia D** e **Presente**.
- Os textos roteirizados continuam como fallback revisável. O controle de IA usa `/api/chat` somente por solicitação; as sequências roteirizadas das facções avançam enquanto a seção está visível. O mural não usa IA nem inclui posts de Brian ou John depois de suas mortes.

## Memorial individual de John

- `memorial.html#john` mantém a entrada de John e acrescenta a seção **A estrada até a última fuga**, com a mordida e o sacrifício confirmados; as cenas de transição são identificadas como reconstruções literárias revisáveis.
- Brian morreu antes de John; a ordem consta em `LORE-PRESENTE.md`. Nenhuma fala de Brian aparece no registro de John.
- O arquivo J-06 apresenta 13 homenagens como transcrições de frequência, sem retratos individuais e sem repetir o mural do memorial de Brian. A pessoa escolhe uma voz na lista; o painel mostra a mensagem, reações e resposta.
- `js/john-transmission-log.js` controla a seleção por clique e teclado. A onda gráfica é decorativa: não há áudio inventado. `era-extincao-presente/memorial-hellsings.css` define o console ciano/cobre e sua disposição responsiva.

## Atlas geográfico e narrativo

- `mapa-regioes.html` é a página independente de cartografia, acessível pelo menu **Regiões** e pela chamada na seção de facções de `index.html`.
- `era-extincao-presente/atlas-campanha.css` contém o mapa vetorial, seis territórios, filtros, painel de leitura, cronologia, responsividade e diálogo de imagem. `era-extincao-presente/atlas-campanha.js` alimenta os registros, filtros e ampliação das imagens.
- A camada visual inclui cursor tático em dispositivos com mouse, brilho ambiente que acompanha o ponteiro, barra de progresso da página, varredura luminosa do mapa, rotas e territórios animados, entrada gradual das seções e pulso do dossiê ao selecionar um ponto. O cursor customizado é omitido em telas touch e as animações respeitam `prefers-reduced-motion`.
- O mapa inclui Hellsings, Cobras, Dominus, Facção do Fogo, Nômades de Ferro e Ordem do Sal; distingue o impasse ainda sem disparos no Cinturão Rubro, as rotas móveis de Delta-09, os sinais sem coordenadas e as memórias de Brian e John.
- Imagens contextuais abrem no painel e podem ser ampliadas. As legendas identificam reconstruções visuais quando a imagem não documenta literalmente o lugar.
- O resgate na Bacia e a placa **“NÃO SE DEVE PISAR AQUI”** estão marcados como propostas revisáveis. O local do encontro presencial futuro com Mick, a origem do caos e coordenadas não recuperadas permanecem abertos conforme `ESCOPO-ATLAS-REGIOES.md`.
- `ROTA-BRADDOCK-PROPOSTA.md` reúne uma sequência narrativa revisável. No atlas, três cartões interativos abrem o registro de sinal perdido e a proposta de encontro presencial, a operação conjunta sugerida e a ligação proposta entre os fragmentos das Cobras, o impasse no Cinturão Rubro e a busca pela terra livre. Nenhum dos novos eventos recebe coordenadas nem passa a ser canon sem revisão do autor.

## 10. Índice de documentação complementar

- [README.md](README.md): visão geral e links para todos os documentos.
- [ARQUITETURA.md](ARQUITETURA.md): estrutura de páginas, diretórios e componentes.
- [GUIA-TECNICO-INTRO.md](GUIA-TECNICO-INTRO.md): timeline e manutenção da intro.
- [GUIA-TECNICO-HERDEIROS.md](GUIA-TECNICO-HERDEIROS.md): ordem, efeitos e arquivos da segunda geração.
- [ALTERACOES-E-PROXIMOS-PASSOS.md](ALTERACOES-E-PROXIMOS-PASSOS.md): histórico resumido de entregas e continuidade.
- [LORE-PRESENTE.md](LORE-PRESENTE.md) e [UNIVERSO-E-LORE.md](UNIVERSO-E-LORE.md): fatos narrativos confirmados e limites de criação.
- [DIREITOS-AUTORais.md](DIREITOS-AUTORais.md) e [GUIA-PUBLICACAO-ADSENSE.md](GUIA-PUBLICACAO-ADSENSE.md): preparação jurídica/técnica para publicação e monetização.
# Integração de IA nos chats — 1º de novembro de 2026

- Foi adicionado `server.js`, um servidor Node sem dependências externas que serve as páginas e expõe `/api/status` e `/api/chat`.
- A Responses API é chamada apenas pelo servidor. O navegador não recebe nem armazena a chave. Defina `OPENAI_API_KEY` no ambiente local; `OPENAI_MODEL` é opcional e o padrão é `gpt-6.1-terra`.
- `js/ai-dialogue.js` injeta controles em onze canais: dois na página inicial, dois no memorial, dois na Malha Hellsings e um em cada uma das cinco páginas de facção.
- Cada solicitação leva até oito falas recentes e gera exatamente duas falas, identificadas como IA. O elenco é validado pelo canal; os memoriais impedem falas postumamente atribuídas a Brian ou John.
- O site não guarda conversas em banco. A API recebe `store: false`; isso não descreve a política de retenção da OpenAI.
- A IA só gera quando solicitada, para evitar chamadas automáticas. Sem a chave, ficam disponíveis os roteiros locais.
- O servidor está preparado para abrir localmente em `http://127.0.0.1:8787/`. A integração pública depende de uma hospedagem com backend e segredo configurado; não houve deploy nem publicação.
- Ativação, segurança, elenco e próximos passos estão detalhados em `INTEGRACAO-IA-CHATS.md`.

# Navegação principal — 1º de novembro de 2026

- `index.html` mostra seis links diretos no menu; **Arquivos** contém Desaparecidos, Cronologia, Posts dos Hellsings e O passado.
- O submenu nativo usa `details/summary`, mantém navegação por teclado e fecha junto com o menu móvel. Estilos responsivos estão em `era-extincao-presente/world-archive.css`; o comportamento compartilhado fica em `era-extincao-presente/world-menu.js`.

# Terminais de celular do crossover — 1º de novembro de 2026

- `jack-presente.html` e `mark-presente.html` carregam o diálogo modal interativo, restrito às páginas presentes; as páginas do passado não foram alteradas por esta etapa.
- `js/dispositivo-recuperado.js` seleciona o conteúdo pelo `data-character`, monta a lista de contatos e as mensagens com `textContent`, alterna entre **Mensagens** e **Caderno de campo**, aceita teclado, fecha por botão, Escape ou clique no fundo e devolve o foco ao botão de abertura.
- `era-extincao-presente/dispositivo-recuperado.css` dá ao terminal de Jack uma cor âmbar e ao de Mark uma cor azul-aço, com layout responsivo e respeito a movimento reduzido.
- Jack tem um arquivo de contato com Mick: o diálogo registra que Jack o preparou no FBI para liderar os agentes especiais ao seguir para a Interpol; anos depois, convida-o a encontrar os Hellsings. Há respostas parciais e interrupção antes do encontro. O caderno mantém a busca aberta; o reencontro permanece futuro.
- Mark cumpriu seu tempo na Marinha e deixou o serviço antes do Dia D. Os fragmentos com o Major James Hanson e o Coronel Samuel Salazar refletem que eles o conheciam por sua vida militar, sem transformar Mark em subordinado de Hanson. Os destinos dos oficiais continuam sem confirmação.
- Os arquivos públicos de Doomsday apresentam Mick como “Mick Bradock”, Hanson como major em uma instalação militar e Salazar como coronel no Pentágono. O autor confirmou que o sobrenome correto é **Braddock**; o site de Doomsday será corrigido por ele. As telas locais usam a grafia canônica. Fonte: [arquivo público de Doomsday](https://maycon-rezende.github.io/apocalipse/).
- As mensagens dos terminais são conteúdo ficcional escrito para o projeto, sem integração de IA, rede, áudio ou armazenamento externo.

# Diversidade dos chats e direção futura — 1º de novembro de 2026

- `js/malha-chat.js`, `js/malha-hellsings.js` e `js/malha-faccoes.js` ganharam novas sequências dialogadas, com respostas contextualizadas e vozes próprias para Cobras, Fogo, Sal, Ferro e Dominus. Dominus permanece anônimo.
- O canal de rota dos Hellsings menciona o sinal perdido de Doomsday e a busca sem antecipar o reencontro. As homenagens roteirizadas de Brian incluem diferentes integrantes e filhos; Brian não escreve após morrer, e John aparece falando enquanto ainda estava vivo.
- Lore atualizada em `UNIVERSO-E-LORE.md` e `LORE-PRESENTE.md`: Doomsday e Era pertencem ao mesmo universo; no final planejado, os Hellsings destroem Dominus, encontram a estufa do governo dos Estados Unidos e iniciam a restauração vegetal e o combate aos patógenos zumbis. Cenas, localização e método ainda não foram escritos.

### Perfis das famílias de Chloe e Luke — 2 de novembro de 2026

- `clhoe-familia.html` identifica Darius e Micah Bennett e liga aos dossiês `darius-bennett.html` e `micah-bennett.html`.
- `luke-familia.html` reúne Imani, Asha e Nyla Carver e liga a `imani-carver.html`, `asha-carver.html` e `nyla-carver.html`.
- `era-extincao-presente/family-profile.css` contém o layout responsivo comum. Cada perfil tem acentos próprios: Darius (ferrugem/sálvia), Micah (azul/cidreira), Imani (verde-mar/coral), Asha (lima/ardósia) e Nyla (ouro/azul-glacial). Chloe mantém violeta/rosa; Luke, musgo/âmbar.
- Os nomes e backgrounds foram criados como propostas revisáveis. As páginas identificam os recortes de fotos familiares usados enquanto não houver retratos individuais.

### Sophie Romanoff — membro da família Connor — 2 de novembro de 2026

- A antiga Nathália agora aparece como **Sophie Romanoff**, esposa de Alucard. O perfil visível continua em `nathalia-presente.html`; classes, CSS, JavaScript e arquivos de imagem mantêm seus nomes técnicos antigos para preservar compatibilidade.
- A galeria individual reúne três retratos diferentes: `nathalia.png`, `nathália.png` e `nthalia.png`. As imagens conjuntas com Alucard continuam no arquivo de casais.
- `alucard-presente.html` não apresenta mais a esposa nem a foto individual relacionada. `casais-presente.html` mantém os registros do casal com o nome atualizado.
- `membros-hellsings.html` inclui Sophie na quarta posição e, após a entrada de Leona, reúne cinco perfis individuais.
- O dossiê agora registra que Sophie tem 37 anos, é russa, viveu parte importante da vida na Rússia, mudou-se para o Canadá e estudava fisioterapia quando conheceu Alucard durante as férias prolongadas dos Connors. O Dia D interrompeu sua formação. A proposta de atuação em reabilitação e os detalhes de cena seguem editáveis pelo autor.

### Leona — perfil e arquivo visual — 2 de novembro de 2026

- `leona-presente.html` apresenta a ficha, o arco entre a infância e o presente, competências e a missão proposta **A Escada Cega**.
- `era-extincao-presente/leona-presente.css` cria uma paleta individual oliva/amarelo com acentos azul-frio e vermelho; `leona-presente.js` cuida do cursor e da ampliação de imagens quando os arquivos existem.
- A pasta `img-leona-presente/` já continha dez imagens atuais: nove registros de exploração e família, além do retrato de capa. A página usa esses arquivos na galeria do presente e no cartão de Leona em `membros-hellsings.html`.
- Nenhuma foto infantil ou anterior ao Dia D foi encontrada nessa pasta. A página mantém esse período identificado como arquivo em aberto, sem classificar imagens atuais como passado.
- `membros-hellsings.html` agora lista Leona como quinto perfil.
- Joey Muller e Hellen Wren são os pais, conforme a ficha. O background detalhado e o feito de campo são propostas revisáveis; data de nascimento, especialidade dos pais e demais operações não foram definidos.
