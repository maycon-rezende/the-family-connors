# Guia técnico — abertura cinematográfica

Este documento registra, passo a passo, o trabalho realizado na abertura de **A Era da Extinção**, os arquivos envolvidos e onde alterar cada parte. O código-fonte completo permanece nos arquivos oficiais indicados abaixo, evitando que uma cópia documental fique desatualizada.

## 1. Arquivos principais

| Arquivo | Responsabilidade |
|---|---|
| `../intro.html` | Estrutura da abertura, botão inicial, textos, título, áudio e **PULAR**. |
| `../era-extincao-presente/extinction-intro.js` | Timeline, mídias, sincronização, Doom, título e navegação. |
| `../era-extincao-presente/extinction-opening-cinematic.css` | Visual, enquadramentos, poeira, clarão, cursor e responsividade. |
| `../era-extincao-presente/extinction-world.css` | Identidade visual compartilhada do presente. |
| `../audio/intro-ultron-reference.mp3` | Faixa temporária e relógio da abertura. |
| `../img-intro/` | Frames preparados para a intro. |
| `../img-presente/personagens/` | Personagens, Hades, destruição e título. |
| `../video/` | Família, ação, perda de Jully e Doom. |

## 2. Estrutura montada no HTML

Em `intro.html`, a ordem é:

1. `.intro-cursor`: cursor personalizado no computador.
2. `.intro-stage`: palco onde o JavaScript injeta os frames.
3. `.intro-atmosphere`: três camadas de poeira.
4. `.intro-flash`: clarão de impacto.
5. `.intro-letterbox`: barras cinematográficas.
6. `.intro-signal`: identificação da transmissão.
7. `.intro-copy`: textos narrativos.
8. `.intro-gate`: toque inicial exigido pelo navegador para liberar áudio.
9. `.intro-final`: título final e acesso ao presente.
10. `.intro-controls`: somente o botão **PULAR**.
11. `#introReferenceAudio`: faixa local.

CSS e JS usam `?v=28`. A versão deve aumentar quando uma publicação precisar quebrar o cache do navegador/GitHub Pages.

## 3. Código da linha do tempo

O começo de `extinction-intro.js` define a duração e os construtores:

```js
const DURATION = 117.702;
const I = (src, start, end, text = null, className = '') =>
  ({ kind: 'img', src, start, end, text, className });
const V = (src, start, end, text = null, className = '', offset = 0) =>
  ({ kind: 'video', src, start, end, text, className, offset });
```

- `I(...)`: cena de imagem.
- `V(...)`: cena de vídeo.
- `src`: caminho da mídia.
- `start` e `end`: tempos na faixa, em segundos.
- `text`: chamada, linha clara, linha contornada e legenda.
- `className`: enquadramento e efeitos.
- `offset`: ponto interno em que o vídeo deve começar.

Exemplo real:

```js
V('video/jully-grito.mp4', 68.969, 72.087, null,
  'grief focal-video fit-video');
```

A lista `scenes` contém os 38 frames atuais. Ordem, duração, texto e personagem são alterados nessa lista.

## 4. Sequência narrativa atual

| Tempo aproximado | Conteúdo |
|---|---|
| 00:00–00:17 | Mundo anterior ao Dia D, irmãos Connor, Alice e Ariani. |
| 00:17–00:32 | Antártica, Complexo Hades e consciência do patógeno. |
| 00:32–00:51 | Perda da contenção, Dia Zero e impacto. |
| 00:51–01:09 | Cidades destruídas e nascimento da resistência. |
| 01:09–01:12 | Jully gritando; somente o vídeo aparece. |
| 01:12–01:40 | Hellsings em ação; Alucard e Nicolai intercalados com as filhas e demais agentes. |
| 01:40–01:50 | Doom caminha até a câmera e se revela. |
| 01:50–01:57.702 | Título surgindo da poeira, letra por letra. |

Os tempos exatos estão no array `scenes` do JavaScript.

## 5. Música sem repetição

O áudio é o único relógio:

```js
const seconds = Math.min(audio.currentTime, DURATION);
activate(indexAt(seconds), seconds);
```

Nenhum `setTimeout` controla a faixa. Ao iniciar:

```js
audio.loop = false;
audio.currentTime = 0;
await audio.play();
```

`requestAnimationFrame(render)` atualiza o visual sem reiniciar o áudio. Pausar a faixa também pausa o vídeo ativo.

## 6. Sincronização dos vídeos

`activate()` calcula o tempo local de cada vídeo usando a posição da música:

```js
const local = Math.max(0,
  seconds - scenes[index].start + (scenes[index].offset || 0));

if (media.readyState >= 1 && Math.abs(media.currentTime - local) > 0.3) {
  media.currentTime = Math.min(local, media.duration || local);
}
```

Os vídeos são silenciosos, sem loop e usam `playsInline`. Toda voz e música vêm apenas do áudio principal.

## 7. Carregamento e desempenho

`build()` monta os elementos, mas mantém os endereços inicialmente em `data-src`. `preload()` carrega apenas cenas próximas:

```js
function preload(index, distance = 2) {
  for (let i = Math.max(0, index - 1);
       i <= Math.min(scenes.length - 1, index + distance); i++) load(i);
}
```

Imagens têm decodificação assíncrona. Vídeos usam `preload="metadata"`. A primeira imagem e o áudio recebem preload no HTML.

## 8. Revelação de Doom

`video/versao1.mp4` ocupa de 100 a 110.005 segundos. A queda inicial e o impacto ficam cobertos até 103.65 segundos; Doom aparece poucos instantes depois de tocar o chão, já iniciando sua caminhada:

```js
awakening.classList.toggle('doom-veiled', seconds < 103.65);
```

O clarão de “O mundo se partiu” termina em 102.48 segundos e sua frase permanece apenas até 103.2. Depois, a cobertura CSS desaparece e Doom é revelado andando. Os textos finais mudam em fases nos tempos 102.037, 103.2 e 108.3 segundos, acompanhando a voz.

## 9. Título letra por letra

`prepareTitle()` separa cada caractere em um elemento:

```js
letter.className = char === ' ' ? 'dust-letter space' : 'dust-letter';
letter.style.setProperty('--letter', index++);
```

O CSS usa o índice para atrasar cada letra:

```css
.intro-final.is-visible .dust-letter {
  animation: fromDust .72s calc(var(--letter) * .16s)
    cubic-bezier(.16,.76,.2,1) forwards;
}
```

`fromDust` combina opacidade, desfoque, deslocamento, sombra de areia e `clip-path`. Por isso o título se forma sequencialmente.

## 10. Efeitos e onde estão

Em `extinction-opening-cinematic.css`:

- `.intro-atmosphere`: poeira contínua.
- `.flash-scene` e `.intro-flash`: explosão/clarão.
- `.hard` e `.rapid`: cortes de ação.
- `.ice`: Antártica e Hades.
- `.grief`: perda de Jully.
- `.action`: combate.
- `.monster-reveal`: sinal de Doom.
- `@keyframes camera`: movimento em fotos.
- `@keyframes monsterSignal`: interferência.
- `@keyframes fromDust`: formação do título.

## 11. Enquadramento e mobile

Classes aplicadas às cenas:

- `fit-contain`: mostra toda a imagem, preenchendo sobras com fundo desfocado.
- `fit-video`: mostra todo o vídeo sem cortar pessoas.
- `portrait`: protege vídeos verticais.
- `focus-john`, `focus-brian`, `focus-dimitri`, `focus-luke`, `focus-mary`, `focus-jack`, `focus-mark`, `focus-ariani`, `focus-britney` e `focus-clhoe`: ajustam o foco individual.

Há regras para telas até 600 px, celular em paisagem e `prefers-reduced-motion`. No mobile, vídeos usam `object-fit: contain`, textos diminuem e controles respeitam as áreas seguras.

## 12. Cursor, botões e entrada no site

No computador, `.intro-cursor` acompanha `pointermove`; sobre botões recebe `.is-target`. Em toque (`pointer: coarse`), ele é ocultado.

- **INICIAR TRANSMISSÃO**: libera áudio e timeline.
- **PULAR**: interrompe a montagem e abre o cartão final.
- **ACORDAR NO PRESENTE**: grava `ede-intro-liberada` na sessão e abre `index.html?intro=concluida`.

## 13. Como adicionar um frame

1. Salvar a mídia em `img-intro/`, `img-presente/personagens/` ou `video/`.
2. Abrir `const scenes = [...]` em `extinction-intro.js`.
3. Dividir o tempo da cena existente sem deixar lacunas ou sobreposições.
4. Inserir `I(...)` ou `V(...)` na ordem cronológica.
5. Aplicar uma classe de enquadramento.
6. Testar começo e fim do intervalo pela faixa.
7. Aumentar o valor atual de `?v=28` no CSS e JS em `intro.html` antes de publicar.

```js
I('img-intro/novo-frame.jpg', 80.0, 82.5,
  ['ARQUIVO // ESTADO', 'Primeira linha', 'segunda linha.', 'Legenda.'],
  'action fit-contain');
```

## 14. Validação antes de publicar

1. Confirmar que todas as mídias do array existem.
2. Conferir se `DURATION` corresponde ao áudio.
3. Garantir que uma cena termina quando a próxima começa.
4. Confirmar que nenhum vídeo usa loop.
5. Testar desktop, celular vertical e horizontal.
6. Testar os três botões.
7. Executar `git diff --check`.
8. Conferir `git status --short` para não publicar referências por engano.

```powershell
git status --short
git diff --check
rg -n "const scenes|DURATION|doom-veiled|data-skip-cinema" intro.html era-extincao-presente
```

## 15. Referências e publicação

Gravações como `video/celular.mp4`, `video/video-intro.mp4` e `video/tela-servidor` são referências de desenvolvimento e não devem entrar automaticamente no site. `video/versao2.mp4` permanece fora enquanto `versao1.mp4` é a versão oficial de Doom.

A versão publicada corresponde ao commit `14e7acc`, branch `main`. Página verificada:

`https://maycon-rezende.github.io/the-family-connors/intro.html`

## 16. Mapa de manutenção

- Narrativa, tempos e ordem: array `scenes` em `extinction-intro.js`.
- Vídeos: `activate()` e `render()`.
- Doom: bloco `monster-reveal` no JS e `.doom-veiled` no CSS.
- Poeira e título: `prepareTitle()`, `.dust-letter` e `fromDust`.
- Cortes: classes `fit-*` e `focus-*`.
- Estrutura e botões: `intro.html`.
- Cache: parâmetros `?v=` no HTML.

Última revisão: 8 de setembro de 2026.
