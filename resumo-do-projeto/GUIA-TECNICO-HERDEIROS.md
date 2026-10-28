# Guia técnico — Herdeiros e arquivos individuais

Este documento registra a estrutura das páginas dos descendentes, seus efeitos e a manutenção da sequência familiar.

## 1. Ordem oficial da linhagem Myers Connor

| Posição | Personagem | Código | Página |
|---|---|---|---|
| 01 | Alucard Myers Connor | `JC-A01` | `alucard-presente.html` |
| 02 | Diana Myers Connor | `JC-D02` / `DC-02` | `diana-presente.html` |
| 03 | Nicolai Myers Connor | `JC-N03` | `nicolai-presente.html` |
| 04 | Mary Myers Connor | `JC-M04` | `mary-presente.html` |
| 05 | Isolde Myers Connor | `JC-I05` | `isolde-presente.html` |

A ordem deve permanecer igual no texto de `herdeiros-extincao.html`, nos cards de `filhos-connor.html` e nos links anterior/próximo. Fluxo correto: `Alucard → Diana → Nicolai → Mary → Isolde`.

## 2. Efeitos compartilhados das linhagens

`herdeiros-extincao.html` e `filhos-connor.html` carregam `era-extincao-presente/lineage-effects.css` e `lineage-effects.js`.

O CSS cria poeira, anéis genealógicos, varredura luminosa, brilho dos títulos, leitura dos cards e cursor personalizado. O JavaScript:

- define `--reveal-index` para escalonar a entrada dos cards;
- revela elementos com `IntersectionObserver`;
- aplica resposta visual ao toque;
- ativa o cursor apenas com `(any-pointer: fine)`;
- preserva acessibilidade com `prefers-reduced-motion`.

Camadas usadas no HTML:

```html
<div class="lineage-web" aria-hidden="true"><i></i><i></i><i></i></div>
<div class="lineage-cursor" aria-hidden="true"><i></i><b></b><span>JC // LINHAGEM</span></div>
```

## 3. Arquivo de Alucard

- `alucard-presente.html`: estrutura e narrativa.
- `era-extincao-presente/alucard-presente.css`: capa, bússola, ampulheta, areia e responsividade.
- `era-extincao-presente/alucard-presente.js`: carrossel, troca de registros, cursor e revelações.

Cada foto utiliza `data-alucard-slide`. O botão `data-alucard-hourglass` avança um registro e dispara a passagem de areia. Para adicionar outro registro:

```html
<figure class="alucard-slide" data-alucard-slide aria-hidden="true">
  <img src="caminho/imagem.png" alt="Descrição do registro" loading="lazy">
  <figcaption><span>A-01.8</span><b>NOME DO REGISTRO</b></figcaption>
</figure>
```

## 4. Arquivo de Nathália

- `nathalia-presente.html`: estrutura do dossiê.
- `era-extincao-presente/nathalia-presente.css`: capa e arquivo térmico.
- `era-extincao-presente/nathalia-presente.js`: seleção, transições, cursor e controles.

A galeria usa coordenadas de seleção e mostra uma fotografia por vez. Os registros relacionados ficam em `img-presente/personagens/`.

## 5. Galeria operacional de Diana

- `diana-presente.html`: slides e legendas.
- `era-extincao-presente/diana-presente.css`: identidade de combate e enquadramento.
- `era-extincao-presente/diana-carousel.js`: looping, botões, contador e gesto mobile.

A galeria possui 11 registros. Os seis quadros de `diana-acao.png` já estavam individualizados para a intro em:

```text
img-intro/sequence/action-diana-01.jpg
img-intro/sequence/action-diana-02.jpg
img-intro/sequence/action-diana-03.jpg
img-intro/sequence/action-diana-04.jpg
img-intro/sequence/action-diana-05.jpg
img-intro/sequence/action-diana-06.jpg
```

Eles são reutilizados sem duplicação ou nova compressão. Cada cena horizontal recebe `diana-action-slide` e `--action-bg`:

```html
<figure class="diana-combat-slide diana-action-slide"
        data-diana-slide aria-hidden="true"
        style="--action-bg:url('img-intro/sequence/action-diana-01.jpg')">
  <img src="img-intro/sequence/action-diana-01.jpg"
       alt="Descrição da ação" loading="lazy">
  <figcaption><span>DC-02.7</span><b>EXTRAÇÃO SOB FOGO</b></figcaption>
</figure>
```

O fundo usa a foto ampliada e desfocada; a imagem principal usa `object-fit: contain`. Isso preserva o quadro inteiro no notebook e no celular. O JavaScript encontra todos os elementos `[data-diana-slide]`, alterna `is-active`, atualiza `aria-hidden` e o contador, reinicia o intervalo após interação e aceita gesto lateral. O intervalo é de 5,6 segundos.

## 6. Checklist para adicionar imagens

1. Salvar na pasta temática adequada.
2. Conferir se o arquivo já existe para evitar duplicação.
3. Criar o `<figure>` com o atributo de slide correto.
4. Escrever um texto alternativo descritivo.
5. Usar `loading="lazy"`, exceto na primeira imagem visível.
6. Atualizar códigos e total apresentado no contador.
7. Conferir `object-position` no desktop e no mobile.
8. Validar caminhos e JavaScript antes da publicação.

## 7. Validação técnica

```powershell
node --check era-extincao-presente/diana-carousel.js
node --check era-extincao-presente/lineage-effects.js
node --check era-extincao-presente/alucard-presente.js
node --check era-extincao-presente/nathalia-presente.js
git diff --check
```

Antes de publicar, conferir também todas as referências `src`/`href` e testar uma tela larga e uma tela de celular.

## 8. Arquivos de Nicolai, Sally Ward e Mary

### Nicolai Myers Connor

- `nicolai-presente.html` é o dossiê correto do terceiro filho.
- `era-extincao-presente/nicolai-presente.css/js` controlam radar, rota da coragem, cursor, textos animados, galeria de nove registros e terminal audiovisual.
- A narrativa acompanha a passagem da admiração por Alucard para a descoberta da própria identidade ao salvar Sally.
- O cursor só aparece após o primeiro movimento real do mouse ou da caneta, evitando o rótulo preso no canto da tela.

### Sally Ward

- `sally-presente.html` apresenta um dossiê policial interrompido.
- `era-extincao-presente/sally-presente.css/js` controlam luzes de emergência, scanner de identidade, cursor contextual, três ocorrências biográficas, galeria e vídeo.
- O sobrenome oficial escolhido foi `Ward`, associado à ideia de tutela e proteção.
- O vídeo fica em `video/sally&nicolai.mp4` e usa `preload="metadata"` para reduzir o carregamento inicial.

### Mary Myers Connor

- `mary-presente.html` apresenta Mary como socorrista tática e rastreadora de campo.
- `era-extincao-presente/mary-presente.css/js` controlam pulso vital, bússola, cursor contextual, legados, protocolo, galeria e vídeo.
- Sua formação combina medicina de Alice, combate e armas de Jack, além de rastreamento, mapas e estratégia ensinados por Jack e Mark.
- O carrossel contém 12 registros. As seis cenas horizontais reutilizam `img-intro/sequence/action-mary-01.jpg` até `action-mary-06.jpg` com enquadramento integral e fundo desfocado.
- O vídeo `video/alice-diana-mary.mp4` representa a continuidade do conhecimento entre as mulheres Myers Connor.

## 9. Arquivo de Nathan Salvatore Connor

- `nathan-presente.html` reúne os fatos familiares confirmados e a função de atirador de precisão, confirmada pelo autor em 25 de outubro de 2026. Lana, britânica e esposa de Nathan, foi definida depois; formação e operações dele permanecem abertas. A página principal oferece um convite textual para `nathan-registros.html`, sem duplicar a galeria.
- `nathan-registros.html` guarda dez imagens individuais de Nathan, sem fotografias de Pollyana, Lana ou de outros vínculos. Quatro registros adicionais foram conferidos visualmente: `nathan2.png`, `nathan3.png`, `img-hellsing/nathan-presente.png` e `img-hellsing/nathan-presente-filho-de-mark.png`. A identidade própria usa verde-fósforo de mira sobre grafite, com retrato de Nathan ao fundo da abertura, fundo desfocado de cada fotografia no palco, varredura discreta e barra de progresso. As fotos principais permanecem inteiras, sem recorte; o antigo `nathan-presente.css` não é carregado.
- `era-extincao-presente/nathan-presente.js` agora é carregado apenas na página de registros e controla navegação circular, miniaturas e ampliação em `<dialog>`. O ciclo de 6,5 segundos pausa em hover, foco, aba oculta, diálogo aberto e preferência por movimento reduzido.
- `era-extincao-presente/nathan-effects.css/js` acrescentam a mira de cursor no ponteiro fino, pulso em clique, varredura discreta na capa e revelação das seções durante a rolagem. O cursor nativo volta no diálogo; toque, movimento reduzido e ausência de `IntersectionObserver` mantêm a página legível. O script do carrossel permanece separado.
- A fotografia dos gêmeos em `img-hellsing/pollyana-nathan-presente.png` aparece fora do carrossel, no bloco da família. O retrato solo da Pollyana foi retirado do arquivo de Nathan; a imagem com mulher identificada apenas pelo nome de arquivo `nathan-iris.png` aguarda definição de personagem e vínculo.
- `nathan-salvatore.png` não deve ser usado como retrato de Nathan: apesar do nome do arquivo, mostra uma mulher loira. `nathan-17.png` é quase igual à capa do dossiê e ficou fora do álbum para evitar repetição. `nathan2.png` e `nathan3.png` passaram a integrar o álbum após conferência visual solicitada pelo autor.
- A contagem da linhagem de Mark e Ariani é três filhos: Pollyana, Nathan e James. Apenas os dois primeiros possuem dossiês individuais abertos.

## 10. Arquivo de Lana Whitmore

- `lana-presente.html` apresenta a esposa britânica de Nathan em um dossiê próprio; o autor delegou a criação do sobrenome e da história. `LANA-WHITMORE-LORE.md` separa os fatos fornecidos dos detalhes criados.
- `era-extincao-presente/lana-presente.css/js` definem a apresentação e a ampliação dos registros. Além do retrato de capa `img-hellsing/lana-presente.png`, seis fotos solo formam a galeria editorial, com navegação por teclado e diálogo. O bloco do casal utiliza `nathan&lana-presente.png` e `nathan&lana1.png`.
- O arquivo de Nathan termina com um bloco de retrato e chamada clicáveis para Lana. A capa de Nathan usa `object-position: center top` para manter seu rosto no enquadramento desktop; no celular, o topo também é preservado.
- `casais-presente.html#nathan-lana` reúne o registro conjunto e links para os dois dossiês. Evitar deduzir do nome de outras imagens a identidade de uma pessoa ou um relacionamento.

## 11. Arquivo de Pollyana Salvatore Connor

- `pollyana-presente.html` mantém a grafia canônica **Pollyana** e separa os vínculos confirmados — filha de Mark e Ariani, gêmea de Nathan, irmã mais velha de James, nascida antes do Dia D — de uma trajetória criada para revisão. A negociação de passagens, personalidade e dinâmica operacional com Nathan são propostas, não cânone; ver `POLLYANA-LORE-PROPOSTA.md`. Missões e operações concretas continuam em aberto.
- `era-extincao-presente/pollyana-presente.css` dá ao dossiê uma paleta de ameixa e âmbar, distinta do verde-fósforo de Nathan; `Connor` permanece vermelho por convenção da linhagem. A imagem dos gêmeos fica no bloco familiar, fora do álbum individual.
- `pollyana-registros.html` reúne treze imagens solo: as oito antes exibidas no dossiê e cinco imagens adicionais (`polllyanna.png`, `polly.png`, `polly1.png`, `polly5.png`, `pollyanna5.png`) que o autor passou a tratar como fotos dela. O dossiê oferece uma chamada e um link de rodapé para o arquivo separado.
- `era-extincao-presente/pollyana-registros.css` mantém a mesma paleta na página do álbum; `js/pollyana-effects.js` preserva os efeitos do dossiê e controla miniaturas, setas, teclado, gesto de toque e ampliação em diálogo. A navegação é manual e respeita movimento reduzido. As fotos não recebem datas, missões ou confirmação da função narrativa proposta.
