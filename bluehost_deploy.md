# Guia de Implementação: Bluehost Deployment
**Projecto:** Portfólio Vocação Técnica, Lda

Este documento descreve como hospedar este site profissional no Bluehost para que ele seja acessível sob o seu próprio domínio.

## 1. Preparação dos Ficheiros (Build)
Como este site utiliza tecnologias modernas (React e Tailwind CSS), os ficheiros de desenvolvimento precisam de ser "compilados" em HTML, CSS e JS puros antes de serem enviados para o servidor.

1. No terminal do seu projecto, execute:
   ```bash
   npm run build
   ```
2. Isto irá criar uma pasta chamada `dist` na raiz do projecto.
3. **A pasta `dist` contém o site real.** É apenas HTML, CSS e JS limpo e optimizado.

## 2. Configuração do Bluehost
1. Faça login no seu painel de controlo (cPanel) no Bluehost.
2. Navegue até **File Manager** (Gerenciador de Arquivos).
3. Entre na pasta `public_html` (este é o directório raiz do seu domínio).

## 3. Upload dos Ficheiros
1. Pegue em **todos os ficheiros e pastas** dentro da pasta `dist` (não a pasta `dist` em si, apenas o seu conteúdo).
2. Faça upload para a pasta `public_html` no Bluehost.
   - Pode usar o botão "Upload" no File Manager ou um cliente FTP (como FileZilla).
   - O ficheiro `index.html` deve estar directamente dentro de `public_html`.

## 4. Ajuste de Rotas (Opcional)
Se decidir usar rotas mais complexas futuramente, crie um ficheiro chamado `.htaccess` na raiz (`public_html`) com o seguinte conteúdo para garantir que o Bluehost direcione tudo corretamente:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 5. Resumo Profissional para o Cliente
Quando o site estiver no ar, ele terá:
* **Domínio Próprio:** `www.vt.co.mz` (sem menção a AI Studio).
* **Performance Ultra-rápida:** Código minificado e optimizado.
* **Segurança:** Pode activar o Certificado SSL gratuito no painel do Bluehost.

---
*Nota: Ao exportar este projecto (via menu superior do AI Studio > Download ZIP), o senhor terá exactamente o código-fonte necessário para gerar a pasta `dist` descrita acima.*
