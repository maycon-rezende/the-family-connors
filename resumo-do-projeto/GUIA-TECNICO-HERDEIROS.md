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
