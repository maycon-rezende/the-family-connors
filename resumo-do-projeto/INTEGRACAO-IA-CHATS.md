# Integração de IA nos chats

Atualizado em 1º de novembro de 2026.

## Escopo implementado

Os onze canais da página inicial, do memorial, do Assemble Hellsings e das cinco páginas de facção agora têm o controle **CONTINUAR CONVERSA COM IA**. Cada clique pede uma troca curta de duas falas no contexto daquele canal. O visitante não envia uma mensagem livre para a IA; os personagens conversam entre si a partir dos recortes já exibidos.

As respostas recebem a identificação **DIÁLOGO GERADO POR IA**. Os roteiros existentes continuam como fallback e não dependem da API. A IA não é chamada automaticamente ao abrir a página, evitando uso de créditos durante a navegação.

## Arquivos

- `server.js`: servidor Node local, arquivos estáticos e endpoints `/api/status` e `/api/chat`.
- `js/ai-dialogue.js`: controles, contexto recente, apresentação segura das falas e rótulo de origem.
- `era-extincao-presente/ai-dialogue.css`: estilo compartilhado dos controles e falas geradas.
- `js/malha-chat.js`, `js/malha-hellsings.js` e `js/malha-faccoes.js`: pausam as mensagens roteirizadas enquanto a IA responde.

## Ativar localmente no Windows

1. Crie uma chave de API na conta OpenAI que será usada para este site. O uso da API é separado do uso do ChatGPT e pode gerar cobrança conforme o uso.
2. Na raiz do projeto, abra o PowerShell e execute:

   ```powershell
   $env:PORT = "8788"
   $secureKey = Read-Host "Chave da API OpenAI" -AsSecureString
   $env:OPENAI_API_KEY = [System.Net.NetworkCredential]::new("", $secureKey).Password
   node .\server.js
   ```

3. Abra `http://127.0.0.1:8788/`. A porta 8787 fica livre para a prévia local já aberta. A chave fica no ambiente do processo Node e não deve ser escrita no HTML, no JavaScript do navegador, no GitHub ou enviada no chat.
4. Ao encerrar o servidor, feche esse terminal. A variável de ambiente foi definida apenas para aquela sessão do PowerShell.

Sem `OPENAI_API_KEY`, o site abre normalmente, os roteiros continuam funcionando e os controles da IA mostram que o servidor está sem configuração. `OPENAI_MODEL` pode trocar o modelo; o padrão atual é `gpt-6.1-terra`.

## Cânone e limites

- O servidor aceita apenas IDs de canal definidos no código e restringe as vozes ao elenco permitido em cada canal.
- Brian Taylor não fala no memorial de Brian. John não fala no memorial de John; Brian, que morreu antes, também não fala ali.
- Dominus permanece anônima. A mecânica dos Nômades de Ferro continua sem nome próprio inventado.
- O modelo recebe no máximo oito falas recentes, sem campo de prompt livre. A resposta deve conter exatamente duas falas de personagens diferentes e passa por validação antes de aparecer.
- Há limite básico de solicitações por endereço IP. Os diálogos não são gravados em banco pelo site; a chamada usa `store: false`. Isso não é uma declaração sobre as políticas de retenção do provedor da API.
- O mural `mural-hellsings.html` continua sendo uma página de posts roteirizados e não foi conectado à IA nem a publicação pública de visitantes.

## Publicação

O projeto não tinha backend nem hospedagem Node configurada. `server.js` serve para desenvolvimento local, vinculado por padrão a `127.0.0.1`. Uma hospedagem estática sozinha não executa `/api/chat`.

Para habilitar a IA no site público, será necessário escolher uma hospedagem com execução de servidor ou função de backend, cadastrar `OPENAI_API_KEY` como segredo nessa hospedagem e servir o site e a API sob a mesma origem. A publicação ainda não foi feita. O segredo não deve ser enviado ao navegador ou incluído no repositório.
