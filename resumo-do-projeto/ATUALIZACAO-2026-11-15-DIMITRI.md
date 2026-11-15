# Atualização de 15 de novembro de 2026 — abertura e efeitos de Dimitri

## Abertura

- `dimitri-arquivo.html` abre com `video/abertura-dimitri-presente.mp4` em uma camada cinematográfica de tela cheia.
- O vídeo permanece mudo, centralizado e inteiro com `object-fit: contain`; um fundo desfocado preenche as laterais.
- A frase de Dimitri, seu nome e sua função aparecem ao fim da cena. O encerramento ocorre após a abertura e o estado é guardado na sessão para não repetir quando a pessoa retorna ao dossiê.
- `era-extincao-presente/dimitri-opening.css` e `dimitri-opening.js` cuidam da apresentação, do encerramento, do Escape, do erro ou bloqueio do vídeo e do movimento reduzido.

## Atmosfera do dossiê

- `era-extincao-presente/dimitri-arquivo.css` e `dimitri-arquivo.js` adicionam poeira fria em partículas, uma faixa de varredura e breves interferências horizontais de sinal.
- O canvas mantém a quantidade de partículas limitada, pausa quando a aba fica oculta e não recebe cliques (`pointer-events: none`).
- Com `prefers-reduced-motion`, as partículas ficam paradas e as distorções animadas são desativadas.

## Publicação

- A abertura e os efeitos foram publicados na branch `main` em `1e4956f` (`Add Dimitri cinematic opening and atmosphere`).
