# 🌟 Plataforma ONG Transformar Vidas - SPA

> **Single Page Application** moderna desenvolvida com HTML5, CSS3 e JavaScript puro (Vanilla JS) para gestão de ONGs

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Características Principais](#-características-principais)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar](#-como-executar)
- [Funcionalidades](#-funcionalidades)
- [Validação e Máscaras](#-validação-e-máscaras)
- [Documentação](#-documentação)
- [Requisitos Atendidos](#-requisitos-atendidos)

---

## 🎯 Sobre o Projeto

Plataforma web completa para gestão de ONGs desenvolvida como projeto acadêmico de **Desenvolvimento Front-end para Web** (1º Semestre).

Uma **Single Page Application (SPA)** 100% em JavaScript puro, sem frameworks, que demonstra domínio completo de:
- Manipulação avançada do DOM
- Sistema de rotas personalizado
- Validação complexa de formulários
- Máscaras de entrada em tempo real
- Componentização e templates JavaScript
- LocalStorage para persistência de dados

---

## ✨ Características Principais

### 🚀 SPA (Single Page Application)
- ✅ **Navegação sem reload** - Instantânea e fluida
- ✅ **Sistema de rotas hash-based** - URLs amigáveis (#/projetos, #/voluntariado)
- ✅ **Suporte a histórico do navegador** - Botões voltar/avançar funcionam
- ✅ **Transições suaves** entre páginas
- ✅ **Uma única página HTML** - Toda a aplicação em `index.html`

### 🎨 Sistema de Templates JavaScript
- ✅ **Templates como funções** - Retornam HTML dinâmico
- ✅ **Componentização** - Código reutilizável e modular
- ✅ **Renderização dinâmica** - Conteúdo carregado sob demanda

### ✅ Validação Avançada de Formulários
- ✅ **Validação em tempo real** - Feedback enquanto o usuário digita
- ✅ **Feedback visual rico**:
  - Bordas coloridas (vermelho = erro, verde = sucesso)
  - Ícones de status (✕ erro, ✓ sucesso)
  - Mensagens de erro descritivas
  - Background colorido sutil
  - Animações suaves
- ✅ **12 validadores diferentes**: required, email, CPF, telefone, números, etc.
- ✅ **Validação de CPF com dígitos verificadores**
- ✅ **Acessibilidade** - ARIA attributes, foco automático

### 🎭 Máscaras de Entrada
- ✅ **CPF**: `000.000.000-00`
- ✅ **Telefone**: `(00) 00000-0000` (detecta fixo/celular automaticamente)
- ✅ **Formatação em tempo real** - Enquanto digita
- ✅ **Suporte a paste** - Ao colar também formata
- ✅ **Limite automático de caracteres**

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5** - Estrutura semântica
- **CSS3** - Design system com variáveis CSS, Flexbox e Grid
- **JavaScript (ES6+)** - Vanilla JS puro, sem frameworks

### Recursos JavaScript
- Classes (Router, FormValidator)
- Arrow Functions
- Template Literals
- Destructuring
- Array Methods (map, filter, reduce)
- LocalStorage API
- History API
- Intersection Observer API
- Custom Events

### Bibliotecas Externas
- **Google Fonts** - Poppins (tipografia)

### Persistência
- **LocalStorage** - Simula banco de dados no navegador

---

## 📁 Estrutura do Projeto

```
projeto/
├── index.html                    # ← Ponto de entrada único (SPA)
├── README.md                     # Este arquivo
├── CLAUDE.md                     # Documentação técnica
├── docs/                         # Documentação adicional
│   ├── README-SPA.md            # Guia completo de uso
│   ├── INSTRUCOES-RAPIDAS.md    # Guia rápido
│   └── MUDANCAS-SPA.md          # Histórico de mudanças
├── assets/
│   ├── css/
│   │   ├── style.css            # CSS principal (2900+ linhas)
│   │   └── validation-styles.css # Estilos de validação (390+ linhas)
│   ├── js/
│   │   ├── router.js            # Sistema de rotas SPA (181 linhas)
│   │   ├── validation.js        # Validação avançada (417 linhas)
│   │   ├── masks.js             # Máscaras de entrada (169 linhas)
│   │   ├── app.js               # Lógica principal (550+ linhas)
│   │   ├── app-features.js      # Features adicionais (450+ linhas)
│   │   └── components/
│   │       ├── pages.js         # Templates parte 1 (450+ linhas)
│   │       └── pages2.js        # Templates parte 2 (350+ linhas)
│   └── data/
│       └── mock-data.js         # Dados mock (280+ linhas)
└── .git/                        # Repositório Git
```

**Total de código**: ~5.500 linhas de JavaScript + ~3.300 linhas de CSS

---

## 🚀 Como Executar

### Pré-requisitos
- Python 3.x OU Node.js instalado
- Navegador moderno (Chrome, Firefox, Edge, Safari)

### Opção 1: Python (Recomendado)

```bash
# 1. Navegue até a pasta do projeto
cd "caminho/do/projeto"

# 2. Inicie o servidor HTTP
python -m http.server 8000

# 3. Abra no navegador
http://localhost:8000
```

### Opção 2: Node.js

```bash
# 1. Navegue até a pasta do projeto
cd "caminho/do/projeto"

# 2. Inicie o servidor HTTP
npx http-server -p 8000

# 3. Abra no navegador
http://localhost:8000
```

### Opção 3: Abertura Direta

Você pode abrir o arquivo `index.html` diretamente no navegador (duplo clique), mas usar um servidor HTTP é recomendado.

### ⚠️ IMPORTANTE: Cache do Navegador

Se você testou versões anteriores, **limpe o cache** ou use **aba anônima**:

- **Aba Anônima** (recomendado):
  - Chrome/Edge: `Ctrl + Shift + N`
  - Firefox: `Ctrl + Shift + P`

- **Limpar Cache**:
  - `Ctrl + Shift + Delete` → Limpar "Cache"

- **Hard Refresh**:
  - `Ctrl + F5` ou `Ctrl + Shift + R`

---

## 🎯 Funcionalidades

### 1. Home (`#/`)
- Hero section com call-to-action
- Missão, Visão e Valores da ONG
- Estatísticas com contador animado
- Projetos em destaque
- Equipe
- Call to action final

### 2. Projetos (`#/projetos`)
- Lista de projetos sociais
- Filtros por categoria (Educação, Cultura, Assistência, Meio Ambiente)
- Busca por texto
- Cards com barra de progresso de arrecadação
- Modal com detalhes completos do projeto

### 3. Voluntariado (`#/voluntariado`)
- Oportunidades de voluntariado
- Filtros por área e horário
- **Formulário de cadastro com validação completa**:
  - Nome, email, CPF, telefone
  - Data de nascimento
  - Área de interesse
  - Disponibilidade
  - Experiência e motivação
- **Máscaras**: CPF e telefone formatam automaticamente

### 4. Doações (`#/doacoes`)
- Opções de doação única ou recorrente
- Valores sugeridos (botões rápidos)
- Campanhas ativas com progresso
- Impacto das doações (quanto ajuda cada valor)
- Transparência (gráfico de uso dos recursos)
- **Modal de doação com formulário validado**
- **Máscaras**: CPF e telefone formatam automaticamente

### 5. Blog (`#/blog`)
- Post em destaque
- Grid de posts com filtros por categoria
- Busca por texto
- Modal de leitura completa
- Botões de compartilhamento social
- Newsletter

### 6. Admin (`#/admin`)
- Login simulado (user: `admin`, senha: `admin123`)
- Dashboard com estatísticas
- Gerenciamento de:
  - Projetos
  - Voluntários cadastrados
  - Doações recebidas
  - Posts do blog

---

## ✅ Validação e Máscaras

### Validadores Disponíveis

| Validador | Descrição | Uso |
|-----------|-----------|-----|
| `required` | Campo obrigatório | `required` (HTML) |
| `email` | Email válido | `type="email"` |
| `cpf` | CPF brasileiro válido | `data-validate="cpf"` |
| `phone` | Telefone brasileiro | `data-validate="phone"` |
| `minLength` | Tamanho mínimo | `minlength="3"` |
| `maxLength` | Tamanho máximo | `maxlength="100"` |
| `positiveNumber` | Número > 0 | `data-validate="positiveNumber"` |
| `minValue` | Valor mínimo | `min="5"` |
| `maxValue` | Valor máximo | `max="1000"` |

### Máscaras Disponíveis

| Máscara | Formato | Uso |
|---------|---------|-----|
| CPF | `000.000.000-00` | `data-mask="cpf"` |
| Telefone | `(00) 00000-0000` | `data-mask="phone"` |
| CEP | `00000-000` | `data-mask="cep"` |
| Data | `00/00/0000` | `data-mask="date"` |

**Exemplo de campo com validação e máscara:**
```html
<input type="text"
       id="cpf"
       required
       data-mask="cpf"
       data-validate="cpf"
       placeholder="000.000.000-00">
```

---

## 📚 Documentação

### Documentação Principal
- **README.md** (este arquivo) - Visão geral do projeto
- **CLAUDE.md** - Documentação técnica detalhada

### Documentação Adicional (pasta `/docs`)
- **README-SPA.md** - Guia completo de uso e testes
- **INSTRUCOES-RAPIDAS.md** - Guia rápido de início
- **MUDANCAS-SPA.md** - Histórico de transformação para SPA

---

## ✅ Requisitos Atendidos

### Atividade 3 - JavaScript Avançado

#### 1. Sistema de Single Page Application (SPA) ✅
- [x] Uma única página HTML (`index.html`)
- [x] Sistema de rotas hash-based (`router.js`)
- [x] Navegação sem reload da página
- [x] Renderização dinâmica de conteúdo
- [x] Suporte a histórico do navegador
- **Localização**: `assets/js/router.js`

#### 2. Sistema de Templates JavaScript ✅
- [x] Templates como funções JavaScript
- [x] Componentes reutilizáveis
- [x] Separação de responsabilidades
- [x] Templates retornam HTML dinâmico
- **Localização**: `assets/js/components/pages.js` e `pages2.js`

#### 3. Validação de Formulários com Feedback Visual ✅
- [x] Validação em tempo real
- [x] Feedback visual imediato:
  - [x] Bordas coloridas (vermelho/verde)
  - [x] Ícones de status (✕/✓)
  - [x] Mensagens de erro descritivas
  - [x] Background colorido
  - [x] Animações suaves
- [x] Verificação de consistência:
  - [x] CPF com dígitos verificadores
  - [x] Email com regex
  - [x] Telefone brasileiro
  - [x] Valores numéricos
  - [x] Campos obrigatórios
- [x] **Máscaras de entrada em tempo real** (bônus)
- **Localização**: `assets/js/validation.js` e `assets/js/masks.js`

---

## 🎓 Conceitos Aplicados

### JavaScript ES6+
- Classes (Router, FormValidator)
- Arrow Functions
- Template Literals
- Destructuring
- Spread Operator
- Array Methods modernos

### Manipulação do DOM
- createElement, querySelector
- Event Listeners
- Custom Events
- classList manipulation
- innerHTML dinâmico

### APIs Web
- LocalStorage API
- History API
- Intersection Observer API
- Events API

### Padrões de Projeto
- Singleton (Router, FormValidator)
- Module Pattern
- Observer Pattern (eventos customizados)
- Template Method

### Acessibilidade
- ARIA attributes
- Navegação por teclado
- Focus management
- Semantic HTML

---

## 📊 Estatísticas do Projeto

- **Total de linhas de código**: ~8.800 linhas
  - JavaScript: ~5.500 linhas
  - CSS: ~3.300 linhas
- **Arquivos criados**: 13
- **Zero frameworks/bibliotecas** (exceto Google Fonts)
- **100% Vanilla JavaScript**

---

## 🧪 Como Testar

### Teste Rápido do SPA

1. Abra `http://localhost:8000`
2. URL deve ser `http://localhost:8000#/`
3. Clique em "Projetos" → URL muda para `#/projetos`
4. Página **NÃO recarrega**
5. Aperte botão **voltar** → volta para home sem recarregar

✅ **Se isso aconteceu = SPA funcionando!**

### Teste de Validação

1. Vá para `#/voluntariado`
2. Role até o formulário
3. Clique no campo "Nome Completo"
4. Saia sem preencher
5. Deve aparecer:
   - ❌ Borda vermelha
   - ❌ Ícone ✕
   - ❌ Mensagem "Este campo é obrigatório"

### Teste de Máscaras

1. Vá para `#/voluntariado` ou `#/doacoes`
2. No campo CPF, digite: `12345678900`
3. Deve aparecer: `123.456.789-00`
4. No campo Telefone, digite: `11987654321`
5. Deve aparecer: `(11) 98765-4321`

---

## 📦 LocalStorage

Os dados são salvos no LocalStorage do navegador:

**Visualizar:**
1. F12 → Application (Chrome) ou Storage (Firefox)
2. Local Storage → `http://localhost:8000`
3. Veja: `projects`, `volunteers`, `donations`, etc.

**Limpar:**
```javascript
// No console (F12):
localStorage.clear();
location.reload();
```

---

## 🐛 Solução de Problemas

**Problema**: Página recarrega ao clicar nos links
- **Solução**: Limpe o cache ou use aba anônima

**Problema**: Erro 404
- **Solução**: Certifique-se de usar um servidor HTTP

**Problema**: Validação não funciona
- **Solução**: Verifique o console (F12) por erros

**Problema**: Máscara não formata
- **Solução**: Verifique se `masks.js` está carregado

---

## 👨‍💻 Desenvolvedor

Projeto desenvolvido como atividade acadêmica de **Desenvolvimento Front-end para Web** (1º Semestre).

---

## 📄 Licença

Este projeto é de uso acadêmico e educacional.

---

## 🎯 Próximos Passos (Melhorias Futuras)

- [ ] Integração com backend real (API REST)
- [ ] Sistema de autenticação JWT
- [ ] Upload de imagens
- [ ] Gráficos interativos (Chart.js)
- [ ] Sistema de notificações
- [ ] PWA (Progressive Web App)
- [ ] Testes automatizados
- [ ] CI/CD

---

<div align="center">

**Desenvolvido com ❤️ usando JavaScript puro**

[📚 Ver Toda Documentação](./docs/INDEX.md) | [🔧 Documentação Técnica](./CLAUDE.md) | [🚀 Início Rápido](./docs/INSTRUCOES-RAPIDAS.md)

</div>
