# Guia de Build e Deploy para Produção

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Build para Produção](#build-para-produção)
- [Otimizações Aplicadas](#otimizações-aplicadas)
- [Deploy](#deploy)
- [Performance](#performance)

---

## 🔧 Pré-requisitos

### Necessário

- **Node.js** v14+ (para build)
- **npm** ou **yarn** (gerenciador de pacotes)
- **Git** (versionamento)

### Verificar Instalação

```bash
node --version    # v14.0.0 ou superior
npm --version     # 6.0.0 ou superior
git --version     # 2.0.0 ou superior
```

---

## 📦 Instalação

### 1. Clonar Repositório

```bash
git clone https://github.com/usuario/ong-transformar-vidas.git
cd ong-transformar-vidas
```

### 2. Instalar Dependências

```bash
npm install
```

**Dependências de Desenvolvimento:**
- `terser` - Minificação de JavaScript
- `clean-css-cli` - Minificação de CSS
- `html-minifier-terser` - Minificação de HTML
- `http-server` - Servidor HTTP local
- `rimraf` - Limpeza de diretórios

---

## 🚀 Build para Produção

### Comando de Build

```bash
npm run build
```

### O que o Build Faz

1. **Limpa** pasta `dist/` (se existir)
2. **Minifica CSS** (style.css, validation-styles.css, themes.css)
3. **Minifica JavaScript** (todos os arquivos .js)
4. **Minifica HTML** (index.html)
5. **Copia** documentação e arquivos adicionais
6. **Gera** relatório de otimização

### Exemplo de Saída

```
🚀 INICIANDO BUILD PARA PRODUÇÃO

================================================

📦 Minificando CSS...

  Minificando CSS: assets/css/style.css
    ✓ 138.5 KB → 102.3 KB (26%)

  Minificando CSS: assets/css/validation-styles.css
    ✓ 18.2 KB → 13.1 KB (28%)

  Minificando CSS: assets/css/themes.css
    ✓ 22.7 KB → 16.4 KB (28%)

📦 Minificando JavaScript...

  Minificando JS: assets/js/router.js
    ✓ 8.5 KB → 4.2 KB (51%)

  Minificando JS: assets/js/validation.js
    ✓ 18.3 KB → 9.1 KB (50%)

  Minificando JS: assets/js/masks.js
    ✓ 7.4 KB → 3.8 KB (49%)

  [...]

📦 Minificando HTML...

  Minificando HTML: index.html
    ✓ 9.2 KB → 6.8 KB (26%)

📋 Copiando arquivos adicionais...

  Copiando pasta: docs/
  Copiando arquivo: README.md
  [...]

================================================
✅ BUILD CONCLUÍDO COM SUCESSO!

📊 ESTATÍSTICAS DE OTIMIZAÇÃO:

CSS:        179.4 KB → 131.8 KB (27%)
JavaScript: 285.7 KB → 148.3 KB (48%)
HTML:       9.2 KB → 6.8 KB (26%)
────────────────────────────────────────────────
TOTAL:      474.3 KB → 286.9 KB (39%)
ECONOMIA:   187.4 KB

================================================

📁 Arquivos otimizados em: C:\...\dist

```

### Estrutura do Diretório `dist/`

```
dist/
├── index.html                    # HTML minificado
├── assets/
│   ├── css/
│   │   ├── style.css            # CSS minificado
│   │   ├── validation-styles.css
│   │   └── themes.css
│   ├── js/
│   │   ├── router.js            # JS minificado
│   │   ├── validation.js
│   │   ├── masks.js
│   │   ├── themes.js
│   │   ├── app.js
│   │   ├── app-features.js
│   │   └── components/
│   │       ├── pages.js
│   │       └── pages2.js
│   └── data/
│       └── mock-data.js
├── docs/                         # Documentação
├── README.md
├── CHANGELOG.md
└── VERSION
```

---

## ⚡ Otimizações Aplicadas

### 1. Minificação de CSS

**Antes:**
```css
/* Comentários detalhados */
.button {
    background-color: #2563eb;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
}
```

**Depois:**
```css
.button{background-color:#2563eb;padding:1rem 2rem;border-radius:.5rem}
```

**Benefícios:**
- Remove comentários
- Remove espaços em branco desnecessários
- Redução típica: 25-30%

### 2. Minificação de JavaScript

**Antes:**
```javascript
// Classe do Router
class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = '/';
    }

    navigate(path, addToHistory = true) {
        if (!this.routes[path]) {
            path = '/';
        }
        // ... resto do código
    }
}
```

**Depois:**
```javascript
class Router{constructor(){this.routes={},this.currentRoute="/"}navigate(t,e=!0){this.routes[t]||(t="/")}}
```

**Benefícios:**
- Remove comentários
- Remove espaços em branco
- Encurta nomes de variáveis (t, e ao invés de path, addToHistory)
- Redução típica: 45-55%

### 3. Minificação de HTML

**Antes:**
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <!-- Meta tags essenciais -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ONG Transformar Vidas</title>
</head>
<body>
    <!-- Conteúdo -->
</body>
</html>
```

**Depois:**
```html
<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>ONG Transformar Vidas</title></head><body></body></html>
```

**Benefícios:**
- Remove comentários HTML
- Remove espaços entre tags
- Minifica CSS/JS inline
- Redução típica: 20-30%

### 4. Outras Otimizações

- ✅ **Gzip/Brotli**: Ative compressão no servidor (redução adicional 60-70%)
- ✅ **Cache**: Configure headers de cache
- ✅ **CDN**: Use CDN para Google Fonts
- ✅ **Lazy Loading**: Imagens carregadas sob demanda (já implementado)
- ✅ **Code Splitting**: Possível com webpack (futuro)

---

## 🌐 Deploy

### Opção 1: GitHub Pages (Gratuito)

#### 1. Configurar GitHub Pages

```bash
# 1. Build
npm run build

# 2. Commit dist/
git add dist/
git commit -m "build: add production build"

# 3. Push para branch gh-pages
git subtree push --prefix dist origin gh-pages
```

#### 2. Configurar no GitHub

1. Vá para: **Settings** → **Pages**
2. Source: **Branch: gh-pages**, **/ (root)**
3. Save
4. Site disponível em: `https://usuario.github.io/ong-transformar-vidas/`

### Opção 2: Vercel (Gratuito)

#### 1. Instalar Vercel CLI

```bash
npm install -g vercel
```

#### 2. Deploy

```bash
# 1. Build
npm run build

# 2. Deploy dist/
cd dist
vercel
```

#### 3. Configurar

- Siga prompts na CLI
- Deploy automático em: `https://projeto.vercel.app`

**Build Commands (Vercel):**
- Build Command: `npm run build`
- Output Directory: `dist`

### Opção 3: Netlify (Gratuito)

#### 1. Via Interface Web

1. Vá para: https://app.netlify.com/
2. **New site from Git** → selecione repositório
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy

#### 2. Via Netlify CLI

```bash
# 1. Instalar CLI
npm install -g netlify-cli

# 2. Build
npm run build

# 3. Deploy
netlify deploy --dir=dist --prod
```

### Opção 4: Servidor Próprio

#### Nginx

```nginx
server {
    listen 80;
    server_name transformarvidas.org.br;
    root /var/www/ong-transformar-vidas/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Apache (.htaccess)

```apache
# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>

# SPA routing
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

---

## 📊 Performance

### Métricas Alvo (Lighthouse)

| Métrica | Alvo | Descrição |
|---------|------|-----------|
| **Performance** | ≥ 90 | Velocidade de carregamento |
| **Accessibility** | ≥ 90 | Acessibilidade WCAG AA |
| **Best Practices** | ≥ 90 | Boas práticas web |
| **SEO** | ≥ 90 | Otimização para motores de busca |

### Core Web Vitals

| Métrica | Alvo | Descrição |
|---------|------|-----------|
| **LCP** | < 2.5s | Largest Contentful Paint |
| **FID** | < 100ms | First Input Delay |
| **CLS** | < 0.1 | Cumulative Layout Shift |

### Testar Performance

#### Lighthouse (Chrome DevTools)

```bash
1. Abra o site em produção
2. F12 → aba Lighthouse
3. Selecione todas as categorias
4. Generate report
```

#### WebPageTest

```bash
1. Acesse: https://www.webpagetest.org/
2. Cole URL do site
3. Run Test
4. Analise resultados
```

#### PageSpeed Insights

```bash
1. Acesse: https://pagespeed.web.dev/
2. Cole URL do site
3. Analyze
```

---

## 🔄 CI/CD (Opcional)

### GitHub Actions

Crie `.github/workflows/deploy.yml`:

```yaml
name: Build and Deploy

on:
  push:
    branches: [ master ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 📝 Checklist de Deploy

Antes de fazer deploy para produção:

- [ ] Build concluído sem erros (`npm run build`)
- [ ] Teste local do build (`cd dist && npx http-server`)
- [ ] Lighthouse score ≥ 90 em todas categorias
- [ ] Testes de acessibilidade passando (axe DevTools)
- [ ] Navegação por teclado funcional
- [ ] Todos os temas funcionando (claro, escuro, alto contraste)
- [ ] Formulários validando corretamente
- [ ] SPA routing funcionando (sem page reloads)
- [ ] Testado em múltiplos browsers (Chrome, Firefox, Safari, Edge)
- [ ] Testado em mobile (responsivo)
- [ ] CHANGELOG.md atualizado
- [ ] VERSION atualizado
- [ ] README.md atualizado
- [ ] Git commit e tag criados

---

## 🆘 Troubleshooting

### Erro: "npm: command not found"

**Solução:** Instale Node.js de https://nodejs.org/

### Erro: "Cannot find module 'terser'"

**Solução:** Execute `npm install`

### Build muito lento

**Solução:** Adicione cache no CI/CD ou use ferramentas mais rápidas (esbuild, swc)

### Site não funciona após deploy

**Problema:** Caminhos relativos incorretos

**Solução:** Use caminhos absolutos a partir da raiz (`/assets/...`) ou configure base URL

---

## 📚 Recursos Adicionais

- **Web.dev**: https://web.dev/
- **Lighthouse**: https://developer.chrome.com/docs/lighthouse/
- **Webpack** (futuro): https://webpack.js.org/
- **Vite** (alternativa): https://vitejs.dev/

---

<div align="center">

**Projeto otimizado para performance e acessibilidade**

[← Voltar para Documentação](./INDEX.md)

</div>
