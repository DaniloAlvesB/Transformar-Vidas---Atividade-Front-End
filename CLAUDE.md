# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Plataforma Web para ONGs** - Projeto acadêmico de Desenvolvimento Front-end para Web (1º Semestre)

Uma **Single Page Application (SPA)** completa em HTML, CSS e JavaScript puro (sem frameworks) para gestão de ONGs, incluindo:
- Páginas institucionais
- Gerenciamento de projetos sociais
- Sistema de voluntariado
- Portal de doações
- Blog de notícias
- Painel administrativo

## Tecnologias Utilizadas

- **HTML5 Semântico**: Estrutura com tags adequadas (header, main, section, article, aside, footer)
- **CSS3**: Design system com variáveis CSS, Flexbox e Grid Layout
- **JavaScript (ES6+)**:
  - Vanilla JS com manipulação de DOM
  - Sistema de rotas SPA (Hash-based routing)
  - Validação avançada de formulários em tempo real
  - Sistema de templates JavaScript
  - LocalStorage para persistência de dados
- **Tipografia**: Google Fonts (Poppins)
- **Armazenamento**: LocalStorage para simular banco de dados

## Nova Estrutura de Arquivos (SPA)

```
├── index.html                    # Ponto de entrada único (SPA)
├── index-old.html               # Backup da versão multi-página anterior
├── assets/
│   ├── css/
│   │   ├── style.css            # CSS principal com design system
│   │   └── validation-styles.css # Estilos de validação de formulários
│   ├── js/
│   │   ├── router.js            # Sistema de rotas SPA
│   │   ├── validation.js        # Sistema de validação avançada
│   │   ├── masks.js             # Máscaras de entrada (CPF, telefone, etc)
│   │   ├── app.js               # Lógica principal da aplicação
│   │   ├── app-features.js      # Funcionalidades adicionais (doações, blog, admin)
│   │   └── components/
│   │       ├── pages.js         # Templates das páginas (Home, Projetos, Voluntariado)
│   │       └── pages2.js        # Templates adicionais (Doações, Blog, Admin)
│   └── data/
│       └── mock-data.js         # Dados mock e inicialização do LocalStorage
└── CLAUDE.md                     # Este arquivo
```

## Como Executar o Projeto

### Ambiente de Desenvolvimento

1. **Servidor Local Simples:**
   ```bash
   # Usando Python 3
   python -m http.server 8000

   # Ou usando Node.js (http-server)
   npx http-server -p 8000
   ```

2. **Acessar no navegador:**
   ```
   http://localhost:8000
   ```

3. **Ou abrir diretamente:**
   - Abrir `index.html` diretamente no navegador (funciona sem servidor)

### Sem Dependências

Este projeto não requer instalação de dependências. Funciona 100% no browser.

## Arquitetura SPA e Conceitos Aplicados

### Arquitetura da Aplicação

**Single Page Application (SPA):**
- **Uma única página HTML** (`index.html`) serve como ponto de entrada
- **Sistema de rotas hash-based**: URLs como `#/`, `#/projetos`, `#/voluntariado`
- **Renderização dinâmica**: Conteúdo carregado via JavaScript sem reload
- **Transições suaves**: Animações entre mudanças de página
- **History API**: Suporte aos botões voltar/avançar do navegador

**Módulos JavaScript:**

1. **router.js** - Sistema de Rotas
   - Classe `Router` que gerencia navegação
   - Interceptação de clics em links internos
   - Suporte a `popstate` para histórico do navegador
   - Renderização de componentes baseada em rotas

2. **validation.js** - Validação Avançada
   - Classe `FormValidator` com validadores reutilizáveis
   - **Validação em tempo real** enquanto o usuário digita
   - **Feedback visual imediato**: ícones de erro/sucesso
   - **Mensagens personalizadas** de erro
   - Validadores: required, email, CPF, phone, minLength, maxLength, etc.

3. **mock-data.js** - Dados e Inicialização
   - Dados mock estruturados
   - Função `initializeLocalStorage()` para popular dados iniciais

4. **pages.js / pages2.js** - Templates de Componentes
   - Funções que retornam strings HTML (templates)
   - Componentes reutilizáveis
   - Separação de responsabilidades

5. **app.js** - Lógica Principal
   - Inicialização da aplicação
   - Registro de rotas
   - Event handlers de cada página
   - Gerenciamento de estado

6. **app-features.js** - Features Adicionais
   - Funcionalidades de Doações, Blog e Admin
   - Separação modular de código

### HTML5 Semântico

- Uso correto de elementos semânticos: `<header>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Atributos ARIA para acessibilidade
- Meta tags para SEO e Open Graph
- Formulários acessíveis com labels associados
- **Header e Footer fixos** que permanecem durante navegação SPA

### CSS3 - Design System

**Variáveis CSS (Design Tokens):**
- Cores primárias: `--color-primary` (azul), `--color-secondary` (verde)
- Escala de tipografia consistente
- Sistema de espaçamento baseado em 8px
- Sombras e bordas padronizadas

**Layouts Responsivos:**
- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px
- Grid CSS para layouts complexos
- Flexbox para componentes

**Componentes Reutilizáveis:**
- Botões (.btn, .btn-primary, .btn-secondary)
- Cards (.card, .project-card)
- Formulários (.form-group, .form-row)
- Modal (.modal, .modal-content)
- **Estados de validação** (.input-error, .input-success)

**Arquivo validation-styles.css:**
- Estilos para estados de erro e sucesso
- Animações de feedback
- Ícones de validação
- Mensagens de erro estilizadas

### Sistema de Validação de Formulários

**Características:**
1. **Validação em tempo real**: Feedback enquanto o usuário digita
2. **Validação no blur**: Quando o campo perde o foco
3. **Validação no submit**: Antes de enviar o formulário
4. **Feedback visual**:
   - Borda vermelha/verde
   - Ícone ✕ ou ✓
   - Mensagem de erro descritiva
   - Background colorido sutil
5. **Acessibilidade**:
   - `aria-invalid` nos campos com erro
   - `role="alert"` nas mensagens
   - Foco automático no primeiro erro

**Validadores Disponíveis:**
- `required` - Campo obrigatório
- `email` - Formato de email válido
- `cpf` - CPF brasileiro válido (com dígitos verificadores)
- `phone` - Telefone brasileiro (10-11 dígitos)
- `minLength` / `maxLength` - Tamanho do texto
- `number` - Valor numérico
- `positiveNumber` - Número positivo
- `minValue` / `maxValue` - Valores mínimo/máximo
- `url` - URL válida
- `date` - Data válida

**Uso em HTML:**
```html
<input type="text"
       id="cpf"
       required
       data-validate="cpf"
       data-error-cpf="CPF inválido. Use o formato 000.000.000-00">
```

### Sistema de Máscaras de Entrada

**Máscaras Implementadas (`masks.js`):**

O sistema formata automaticamente os dados enquanto o usuário digita:

- **CPF**: `000.000.000-00`
- **Telefone**: `(00) 00000-0000` ou `(00) 0000-0000` (detecta automaticamente)
- **CEP**: `00000-000`
- **Data**: `00/00/0000`
- **Apenas números**: Remove caracteres não numéricos

**Características:**
- ✅ Formatação em tempo real (enquanto digita)
- ✅ Formatação ao colar (paste)
- ✅ Limite automático de caracteres
- ✅ Detecção inteligente (telefone fixo vs celular)
- ✅ Remoção automática de caracteres inválidos

**Uso em HTML:**
```html
<input type="text"
       id="cpf"
       data-mask="cpf"
       data-validate="cpf"
       placeholder="000.000.000-00">

<input type="tel"
       id="phone"
       data-mask="phone"
       data-validate="phone"
       placeholder="(00) 00000-0000">
```

**Como funciona:**
1. Usuário digita apenas números: `12345678900`
2. Máscara formata automaticamente: `123.456.789-00`
3. Se colar texto, também formata
4. Campos com máscara são reinicializados:
   - Ao mudar de rota (SPA)
   - Ao abrir modais
   - No carregamento inicial

### LocalStorage como "Banco de Dados"

**Estrutura de Dados:**
- `projects` - Lista de projetos sociais
- `opportunities` - Oportunidades de voluntariado
- `volunteers` - Voluntários cadastrados
- `donations` - Histórico de doações
- `blogPosts` - Posts do blog
- `campaigns` - Campanhas de arrecadação
- `adminCredentials` - Credenciais do admin

### Acessibilidade (WCAG 2.1 AA)

- Contraste de cores adequado (mínimo 4.5:1)
- Navegação por teclado (tabindex, :focus-visible)
- ARIA labels e roles
- Textos alternativos
- Estados visuais claros (hover, focus, active)
- Suporte a prefers-reduced-motion

## Atendimento aos Requisitos da Atividade 3

### ✅ Requisitos Técnicos Obrigatórios Implementados

**1. Sistema de Single Page Application (SPA)**
- ✅ Implementado com sistema de rotas hash-based (`router.js`)
- ✅ Navegação sem reload da página
- ✅ Uma única página HTML (`index.html`)
- ✅ Renderização dinâmica de conteúdo
- ✅ Suporte a histórico do navegador (botões voltar/avançar)
- **Localização**: `assets/js/router.js` (linhas 1-181)

**2. Sistema de Templates JavaScript**
- ✅ Templates implementados como funções JavaScript
- ✅ Retornam strings HTML dinâmicas
- ✅ Componentes reutilizáveis
- ✅ Separação clara de responsabilidades
- **Localização**: `assets/js/components/pages.js` e `pages2.js`
- **Exemplo**: Função `homePage()` retorna template completo da home

**3. Sistema de Verificação de Consistência de Dados em Formulários**
- ✅ Validação avançada com feedback visual em tempo real
- ✅ Classe `FormValidator` com múltiplos validadores
- ✅ Mensagens personalizadas de erro para cada tipo de validação
- ✅ Avisos visuais ao usuário:
  - Bordas vermelhas/verdes nos campos
  - Ícones ✕ (erro) e ✓ (sucesso)
  - Mensagens de erro descritivas abaixo dos campos
  - Background colorido sutil (vermelho para erro, verde para sucesso)
- ✅ Validação de CPF com verificação de dígitos
- ✅ Validação de email com regex
- ✅ Validação de telefone brasileiro
- ✅ Validação de campos obrigatórios
- ✅ Validação de valores numéricos e limites
- **Localização**: `assets/js/validation.js` (linhas 1-417)
- **Estilos**: `assets/css/validation-styles.css` (linhas 1-392)

### Demonstração da Validação

**Formulários com validação completa:**

1. **Cadastro de Voluntário** (`#/voluntariado`)
   - Nome completo (obrigatório, mínimo 3 caracteres)
   - Email (obrigatório, formato válido)
   - CPF (obrigatório, validação com dígitos verificadores)
   - Telefone (obrigatório, 10-11 dígitos)
   - Data de nascimento (obrigatório)
   - Motivação (obrigatório, mínimo 20 caracteres)

2. **Doação** (`#/doacoes`)
   - Valor (obrigatório, número positivo, mínimo R$ 5)
   - Nome completo (obrigatório, mínimo 3 caracteres)
   - Email (obrigatório, formato válido)
   - CPF (obrigatório, validação completa)
   - Telefone (obrigatório)

3. **Login Admin** (`#/admin`)
   - Usuário e senha com validação

**Feedback Visual de Erro:**
- Campo fica com borda vermelha
- Ícone ✕ vermelho aparece à direita do campo
- Mensagem de erro em vermelho abaixo do campo
- Background do campo fica levemente vermelho

**Feedback Visual de Sucesso:**
- Campo fica com borda verde
- Ícone ✓ verde aparece à direita do campo
- Background do campo fica levemente verde

## Funcionalidades Principais

### 1. Página Inicial (index.html)
- Hero section com call-to-action
- Missão, Visão e Valores
- Estatísticas animadas (contador)
- Projetos em destaque
- Equipe
- Footer com links e transparência

### 2. Projetos (projetos.html)
- Lista de projetos com filtros por categoria
- Busca por texto
- Cards com progresso de arrecadação
- Modal com detalhes do projeto

### 3. Voluntariado (voluntariado.html)
- Oportunidades de voluntariado com filtros
- Formulário de cadastro com validação
- Benefícios do voluntariado
- Depoimentos

### 4. Doações (doacoes.html)
- Opções de doação única ou recorrente
- Valores sugeridos
- Campanhas ativas com progresso
- Modal de doação com formulário
- Gráfico de transparência

### 5. Blog (blog.html)
- Post em destaque
- Grid de posts com filtros
- Modal de leitura completa
- Botões de compartilhamento social
- Newsletter

### 6. Painel Admin (admin.html)
- Login simulado (user: admin, senha: admin123)
- Dashboard com estatísticas
- Gerenciamento de projetos
- Lista de voluntários
- Histórico de doações
- Posts do blog

## Padrões de Código

### Nomenclatura CSS (BEM-like)

```css
.block { }                  /* Componente base */
.block__element { }         /* Elemento do componente */
.block--modifier { }        /* Variação do componente */
```

### JavaScript

- Funções com nomes descritivos em camelCase
- Comentários explicativos em blocos importantes
- Validação de dados do usuário
- Tratamento de erros
- Uso de template literals para HTML dinâmico

### Validações Implementadas

- Email: regex padrão
- CPF: formato com 11 dígitos
- Telefone: mínimo 10 dígitos
- Campos obrigatórios
- Valores numéricos positivos

## Dados de Teste

### Admin
- **Usuário:** admin
- **Senha:** admin123

### Projetos Mock
- 4 projetos pré-cadastrados em categorias diferentes
- Valores de meta e arrecadação simulados

### Campanhas
- 2 campanhas ativas com prazos

## Melhorias Futuras Possíveis

- Integração com backend real (Node.js, PHP, etc.)
- Sistema de autenticação JWT
- Upload de imagens
- Gráficos interativos (Chart.js)
- Sistema de notificações
- Paginação real
- Filtros avançados
- Dashboard com métricas reais
- Geração de certificados PDF
- Integração com gateways de pagamento

## Performance

- Lazy loading de imagens (implementável)
- CSS minificado para produção
- JavaScript modular
- Sem dependências externas pesadas
- LocalStorage para cache de dados

## Browser Support

- Chrome/Edge (últimas versões)
- Firefox (últimas versões)
- Safari (últimas versões)
- Compatível com IE11 com polyfills

## Observações Importantes

1. **LocalStorage tem limite de ~5-10MB** - Adequado para este projeto acadêmico
2. **Dados persistem no browser** - Limpar LocalStorage remove todos os dados
3. **Sem segurança real** - Autenticação é simulada (não usar em produção)
4. **Responsivo testado** - Mobile, tablet e desktop
5. **Acessibilidade verificada** - Navegação por teclado e leitores de tela
