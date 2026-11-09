# A Era da Extinção — Resumo do Projeto

Site narrativo dedicado à Família Connor e ao universo de **A Era da Extinção**.

## Conceito

A experiência combina drama familiar, espionagem, operações clandestinas e um mundo devastado. A cronologia oficial possui três momentos: o passado dos Connor antes do colapso, o Dia Zero apresentado em **Doomsday** e o presente dos personagens muitos anos depois, na verdadeira Era da Extinção.

## Experiência atual

- `index.html`: experiência principal da Era da Extinção no presente devastado.
- `jack-presente.html` e `mark-presente.html`: dossiês atuais com terminais de celular interativos; os registros de Jack preservam o convite de Mick Braddock para encontrar os Hellsings e a perda do sinal, enquanto os de Mark guardam fragmentos com Hanson e Salazar.
- O dossiê presente de Jack começa no Dia D e acompanha a retirada antes dos bombardeios, o resgate de Naomi, Luke e sua família, Joey e outros sobreviventes, a entrada pelo túnel até o bunker, o longo confinamento e a luta na Era da Extinção. Inclui um balanço de 121 operações e uma cronologia até o confronto com a Dominus; as contagens de campo são estimativas revisáveis, e a biografia anterior ao Dia D permanece na página do passado.
- `mark-presente.html` agora traz o balanço tático de Mark e o relato completo da Travessia sem Faróis, incluindo a perda de veículo e suprimentos durante o resgate do motorista. A Marinha fica como experiência anterior ao Dia D; os contatos com Hanson e Salazar não estabelecem uma cadeia de comando.
- `alice-presente.html` acompanha Alice do Dia D ao presente: neurocirurgia, a ala hospitalar avançada do bunker, formação médica das filhas, corredor da Bacia Branca e cerca de 3.100 vidas preservadas em estimativa narrativa.
- `arquivo-passado.html`: portal cinematográfico para a vida dos Connor antes do Dia D.
- `telainicial.html`: narrativa do passado e apresentação da família jovem.
- Páginas individuais de Jack, Alice, Mark, Ariani, Britney e Jully.
- Portal dos herdeiros e arquivos individuais da segunda geração: Alucard, Diana, Nicolai, Mary, Isolde, Pollyana e Nathan.
- Diana possui um dossiê exclusivo de combate; Isolde possui arquivo fotográfico cinematográfico em looping.
- Galerias fotográficas separadas para Jack, Alice, Mark, Ariani, Britney e Jully; os registros de Jack ficam no dossiê independente `registros-jack.html`.
- Alice, Mark, Ariani e Britney possuem dossiês do presente com ficha técnica, habilidades, cursor temático e arquivos fotográficos independentes sem recorte de imagens.
- John possui um dossiê memorial, 11 registros visuais, uma reconstrução com Olivia e um retrato familiar que reúne John, Amélia, Henry, Samuel e Olivia; as dez imagens individuais dele são anteriores à morte, e um retrato associado de Amélia permanece sem data identificada. A foto familiar é uma reconstrução visual sem data documental. Henry (34) e Samuel (27) aparecem como filhos vivos de John e Amélia; suas funções atuais são propostas revisáveis. Brian Taylor possui memorial individual com quinze registros visuais; a página central abre com uma dedicatória solene e a faixa de *Nothing Else Matters* na versão da Apocalyptica, apresenta **A estrada até aqui...** antes dos registros e traz um retrato do presente, a jornada até sua morte e 24 homenagens reconstruídas da formação, das famílias, dos filhos e das pessoas do comboio em um mural responsivo de retratos clicáveis, com leitura em posts individuais. O relato de John sobre a última fuga agora é um livro interativo de oito páginas; depois da explosão, uma página final mostra a reconstrução visual dele abraçando Olivia, de um momento anterior à fuga. No fim do caderno de depoimentos de Brian, o vídeo de despedida tem um atalho direto e áudio habilitado. A mensagem de John no memorial de Brian está identificada como escrita em vida. Brian morreu antes de John. A página `john-memorial.html` reúne a dedicatória de Amélia e 34 publicações dos Hellsings, incluindo as vozes dos filhos; o antigo arquivo de frequências não se repete no memorial central. `memorial.html` reúne as duas mortes, com links a partir dos dossiês, e homenageia pessoas ligadas às rotas dos Hellsings. O menu Arquivos inclui o memorial central, e os links de John e Brian abrem essa página geral. A página de Lana tem 21 registros fotográficos e um arquivo separado de dezesseis imagens com Pollyana, sua cunhada. Bobby Lee possui dossiê narrativo com a agência fictícia Jingwei, três operações, sua entrada nos Hellsings e a história com Britney; a galeria independente mantém dois retratos e uma colagem. A foto de Joey com Britney foi retirada. Dimitri possui dossiê e galeria com função de campo ainda provisória.
- Os arquivos de Brian e John registram que os três agentes especiais (Jack, John e Brian) somaram 100+ missões e mais de 90% de êxito coletivo entre FBI e Hellsings. As páginas exibem funções, tipos de missão e frases; resgates e abates individuais seguem sem balanço confirmado. A ficha não transforma lacunas de arquivo em zero.
- No memorial, as fotografias principais de Brian e John e a imagem de John com Olivia começam coloridas e passam gradualmente para preto e branco conforme aparecem na leitura.
- A trilha do memorial usa somente o áudio de `video/theme-memorial.mp4` e acompanha a leitura em `memorial.html`, nas homenagens de John e Gabriel, no arquivo de Brian e nos registros de John. A posição da faixa é retomada entre essas páginas; não há controles visíveis.
- A abertura do registro de Brian usa o retrato exclusivo `img-hellsing/brian-memorial-portrait.png`, criado com fotos do presente como referência e identificado no site como reconstrução de memória.
- `amelia-arquivo.html` agora mostra um retrato individual de cada filho: Henry (34), Samuel (27) e Olivia (5 na última fuga). Os três são reconstruções visuais; as aparências de Henry e Samuel permanecem propostas revisáveis.
- As páginas de Alice, Mark e Naomi tocam suas trilhas temáticas em loop, sem controles visíveis. A trilha de Naomi também acompanha a navegação entre o dossiê e `naomi-registros.html`, retomando a posição salva na sessão; a reprodução tenta iniciar ao abrir e é retomada no primeiro toque/tecla se o navegador bloquear áudio automático.
- Alice ganhou uma abertura cinematográfica em CSS baseada no quadro gerado `img-presente/personagens/alice-abertura-presente.png`. A imagem recebe movimento sutil, poeira e luz, enquanto frase e nome surgem; “Connor” aparece em vermelho na abertura e no título do perfil. A trilha da página continua sem áudio adicional.
- A intro global toca `audio/intro-ultron-reference.mp3`; assim que ela termina, começa `audio/efeito-sonoro-vento-intro.mp3` e **ENTRAR NO SITE** aparece junto com o início do vento. Caso o navegador bloqueie o áudio, a intro tenta reproduzi-lo após uma interação na tela e mostra o botão quando o efeito começa.
- A página `faccao-dominus.html` toca `audio/theme-dominus.mp3` em loop, sem controles visíveis; o helper compartilhado tenta iniciar a faixa e pode retomá-la após uma interação se o navegador bloquear o autoplay.
- O destaque do dossiê de Naomi fica limitado à altura da janela em desktop, para manter nome e apresentação visíveis no início; em telas pequenas, a composição continua vertical.
- O vídeo experimental `video/naomi.mp4` abre o dossiê uma vez, sem som, com o título sobreposto; a trilha própria da página continua. Não há botão visível; Esc encerra a abertura e a preferência por movimento reduzido a omite.
- O perfil de Naomi ganhou duas cenas planejadas com quadros-guia: `img-naomi-presente/resgate.png` para um resgate em campo e `img-naomi-presente/naomi-bobby-lee.png` para uma retirada coordenada entre os irmãos. Os espaços são responsivos, sem áudio próprio, e aguardam os clipes finais do Gemini.
- `john-presente.html` inclui `img-winchester/winchester-family-before-last-flight.jpg`, retrato reconstruído de John, Amélia e os três filhos. A página identifica a imagem como memória visual sem data documental.
- `galeria.html`: arquivo visual por núcleos familiares e Mansão Connor.
- `membros-hellsings.html`: índice de personagens ligados aos Hellsings, com perfis de Lana Whitmore, Sally Ward e Hilary Caldwell Ashford. O dossiê de Hilary reúne seu background, cronologia e galerias distintas de antes do Dia D e do presente.
- As páginas presentes das Cobras, do Fogo, da Ordem do Sal, dos Nômades de Ferro e de Dominus incluem canais roteirizados e um controle opcional para gerar duas falas com IA por solicitação. A IA também está disponível, quando configurada no servidor, no chat da página inicial, no memorial e no **Assemble Hellsings**. A página separada `posts-hellsings.html` exibe publicações contínuas dos Hellsings em ordem aleatória, com comentários e reações; é acessível pelo destaque da página e pelo submenu **Arquivos**, sem publicação de visitantes.
- `videos.html`: central audiovisual com registros compartilhados.
- `hellsing.html`: experiência cinematográfica dos Hellsings, com abertura, bunker, radar, dossiês e formação oficial.
- `era-extincao-presente/index.html`: endereço legado que redireciona para a nova entrada principal.
- `dimitri-presente.html`: endereço legado que redireciona para `dimitri-arquivo.html`.

## Hellsings

Os Hellsings são uma unidade privada de operações especiais fundada por Jack Connor. A formação atual possui dez integrantes. Jack ocupa o comando, Mark atua no comando tático e Alice Myers administra contratos, clientes, recursos e negócios; ela não participa mais de operações em campo.

A organização possui retratos oficiais para toda a formação e uma base subterrânea apresentada em doze setores visuais. A tela principal contém um portal pela entrada secreta do bunker; a página dos Hellsings continua a transição pelo interior da instalação. O centro de comando também funciona como sistema narrativo, com indicadores operacionais, registros provisórios de missões, fórum interno e geração local de pré-contratos.

## Aplicativo e identidade oficial — atualização de 24/08/2026

- `hellsings-app/`: aplicativo mobile em Expo com abertura, comando, agentes, missões, bunker, arquivos secretos, diário e investigação interativa.
- `img-hellsing/brand/hellsings-emblem.png`: emblema oficial compartilhado pelo site e pelo aplicativo.
- O aplicativo recebeu cadastro local de agente, perfil persistente e estrutura de autenticação narrativa com codinome, divisão e matrícula.
- `img-hellsing/scenes/`: coleção cinematográfica com comando, inteligência e retorno de missão, criada para uso compartilhado entre site e aplicativo.
- Alice e Ariani agora possuem registros audiovisuais individuais em seus próprios perfis.
- As galerias de Alice, Jack e da família foram ampliadas com os novos registros visuais.

## Ligação com Doomsday e o presente

- O presente devastado é agora a experiência principal e a primeira página do projeto.
- A narrativa familiar construída nas páginas principais representa o passado dos personagens.
- O portal `ANT-DOOM-00` conduz ao site **Apocalipse/Doomsday**, que representa o Dia Zero.
- Doomsday e Era da Extinção são o mesmo universo em períodos diferentes. Jack preparou Mick no FBI para liderar os agentes especiais quando partiu para a Interpol e mais tarde o chamou para encontrar os Hellsings; o sinal caiu antes do encontro. Mark cumpriu seu tempo na Marinha e deixou o serviço antes do Dia D; Hanson e Salazar o conhecem por sua vida militar. Detalhes e limites estão em `UNIVERSO-E-LORE.md` e `LORE-PRESENTE.md`.
- A direção de encerramento definida pelo autor é derrotar Dominus e descobrir uma estufa do governo dos Estados Unidos, com variedades de plantas, para iniciar a restauração de regiões cuja vegetação morreu com as bombas nucleares e a recuperação da terra frente aos patógenos zumbis. Essa direção contém spoilers e ainda precisa de cenas e método definidos.
- A caixa-preta Connor conduz aos Arquivos do Passado e altera cinematograficamente o período da experiência.
- O presente possui identidade pós-colapso própria, com deserto, radiação, escassez e arquivos dos Connor envelhecidos.
- Destinos, territórios e atividades atuais permanecerão classificados até a entrega da nova lore.

## Documentos

- [GUIA-TECNICO-INTRO.md](GUIA-TECNICO-INTRO.md): passo a passo da intro, código, sincronização, efeitos, mídias e pontos de manutenção.
- [GUIA-TECNICO-HERDEIROS.md](GUIA-TECNICO-HERDEIROS.md): ordem oficial, páginas, cursores, efeitos e galerias dos descendentes.
- [REGISTRO-TECNICO-ATUAL.md](REGISTRO-TECNICO-ATUAL.md): mapa detalhado das páginas, código, comandos, validação, galerias e manutenção atual.
- [ESCOPO-ATLAS-REGIOES.md](ESCOPO-ATLAS-REGIOES.md): planejamento narrativo e técnico da página independente de regiões e rotas.
- [ROTA-BRADDOCK-PROPOSTA.md](ROTA-BRADDOCK-PROPOSTA.md): proposta revisável para o encontro presencial de Mick com os Hellsings, uma operação seguinte e a ligação com a busca pela terra livre.

- [ARQUITETURA.md](ARQUITETURA.md): páginas, pastas e componentes.
- [INTEGRACAO-IA-CHATS.md](INTEGRACAO-IA-CHATS.md): backend, canais, limites de cânone e ativação local da IA.
- [UNIVERSO-E-LORE.md](UNIVERSO-E-LORE.md): fatos confirmados e limites narrativos.
- [LORE-PRESENTE.md](LORE-PRESENTE.md): cronologia e personagens do presente.
- [JULLY-NOIVO-LORE-PROPOSTA.md](JULLY-NOIVO-LORE-PROPOSTA.md): proposta revisável para Gabriel Mercer, noivo de Jully, e seu memorial.
- [BOBBY-LEE-LORE.md](BOBBY-LEE-LORE.md): trajetória de Lee, agência, missões e sequência familiar, com origem de cada decisão registrada.
- [ALTERACOES-E-PROXIMOS-PASSOS.md](ALTERACOES-E-PROXIMOS-PASSOS.md): entregas recentes e roteiro futuro.
- [DIREITOS-AUTORais.md](DIREITOS-AUTORais.md): inventário de mídias temporárias e checklist para publicação/AdSense.
- [GUIA-PUBLICACAO-ADSENSE.md](GUIA-PUBLICACAO-ADSENSE.md): sequência técnica para domínio, indexação, consentimento e AdSense.
- [MIDIAS-PENDENTES.md](MIDIAS-PENDENTES.md): inventário dos arquivos recebidos que aguardam autorização e associação às páginas.

## Auditoria rápida

Com Node.js instalado, execute `node scripts/auditar-site.js` na raiz do projeto. O relatório verifica idioma, viewport, descrição SEO, `alt` das imagens, links vazios e referências internas quebradas.

## Preparação para publicação

- O inventário atual contém 86 páginas HTML. A nova página de Gabriel inclui descrição SEO, idioma declarado, texto alternativo e links internos.
- A auditoria estática confirmou `alt` em todas as imagens e nenhum link vazio.
- Acessibilidade compartilhada inclui foco visível, navegação de teclado, semântica do menu móvel e suporte a `prefers-reduced-motion`.
- Antes do domínio público, substituir as mídias temporárias e concluir o checklist de direitos em `DIREITOS-AUTORais.md`; só depois solicitar o AdSense.

Última atualização: 9 de novembro de 2026.

## Abertura do Jack — 9 de novembro de 2026

- `jack-presente.html` usa `video/abertura2-jack-presente.mp4` na sequência de presença, mantendo a faixa `audio/theme-jack-presente.mp3` como único áudio.
- O vídeo dura aproximadamente 10 segundos, fica sem loop e começa conforme a duração da faixa para terminar junto com a entrada musical aos 14 segundos. A sequência de frases e o surgimento do nome permanecem sincronizados pelo áudio.
- `img-presente/jack-abertura-acampamento-v2.png` aparece como quadro de carregamento correspondente à cena do acampamento à luz do dia.
