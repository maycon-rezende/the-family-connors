# Guia de publicação e AdSense

Este guia separa o que já está preparado no projeto do que depende do domínio, da conta do responsável e da autorização das mídias.

## Antes de publicar

1. Substituir a trilha temporária do SoundCloud e `audio/intro-ultron-reference.mp3` por áudio próprio ou licenciado.
2. Confirmar a licença de todos os vídeos em `video/`, especialmente `video/versao-3.mp4`.
3. Revisar imagens recebidas ou geradas e registrar autoria, licença ou autorização em uma lista de créditos.
4. Definir um e-mail real de contato na política de privacidade e publicar o site em HTTPS.
5. Testar a experiência em celular, tablet e desktop com teclado, leitor de tela e `prefers-reduced-motion`.

## Domínio e indexação

- Cadastrar o domínio no Google Search Console.
- Gerar `sitemap.xml` usando o domínio definitivo; ele não é criado antes porque o endereço público ainda não foi definido.
- Manter `robots.txt` apontando para o sitemap definitivo quando o domínio existir.
- Conferir títulos, descrições, canonical, páginas legais e links internos após a publicação.

## AdSense

- Criar ou associar a conta AdSense do responsável pelo domínio.
- Solicitar a revisão somente depois que a auditoria de direitos acima estiver concluída.
- Inserir o script oficial fornecido pelo AdSense, sem inventar publisher ID no código.
- Criar `ads.txt` na raiz usando exatamente a linha fornecida pelo AdSense.
- Adicionar um mecanismo de consentimento para cookies e publicidade quando a legislação ou a plataforma exigir.
- Atualizar a política de privacidade e os termos com cookies, personalização e compartilhamento de dados antes de ativar anúncios.

## Estado atual

As páginas possuem idioma, descrições SEO, textos alternativos, foco visível, navegação móvel e suporte a movimento reduzido. O AdSense ainda não foi inserido: faltam domínio definitivo, confirmação de direitos e publisher ID.
