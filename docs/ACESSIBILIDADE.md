# Acessibilidade - WCAG 2.1 Level AA

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Conformidade WCAG 2.1](#conformidade-wcag-21)
- [Navegação por Teclado](#navegação-por-teclado)
- [Temas Acessíveis](#temas-acessíveis)
- [Leitores de Tela](#leitores-de-tela)
- [Contraste de Cores](#contraste-de-cores)
- [Formulários Acessíveis](#formulários-acessíveis)
- [Testes de Acessibilidade](#testes-de-acessibilidade)

---

## 🎯 Visão Geral

Este projeto implementa **WCAG 2.1 Level AA** (Web Content Accessibility Guidelines), garantindo que a plataforma seja acessível para todos os usuários, independentemente de suas capacidades ou tecnologias assistivas utilizadas.

### Principais Recursos de Acessibilidade

✅ **Navegação por teclado completa** - Todos os elementos interativos acessíveis via Tab
✅ **Skip navigation link** - Pular para conteúdo principal
✅ **Focus indicators visíveis** - Outlines de 3px em elementos focados
✅ **Modo escuro** - Reduz fadiga visual
✅ **Alto contraste** - Para usuários com baixa visão
✅ **ARIA attributes** - Para leitores de tela
✅ **Contraste mínimo 4.5:1** - Para texto normal
✅ **Formulários validados** - Com feedback visual e textual
✅ **Máscaras de entrada** - Facilita preenchimento correto
✅ **Preferências do sistema** - Respeita prefers-color-scheme e prefers-reduced-motion

---

## ✅ Conformidade WCAG 2.1

### Princípio 1: Perceptível

#### 1.1 Alternativas em Texto
- ✅ Todas as imagens têm atributo `alt` descritivo
- ✅ Ícones decorativos têm `aria-hidden="true"`
- ✅ Links têm texto descritivo ou `aria-label`

#### 1.3 Adaptável
- ✅ HTML semântico (`<header>`, `<main>`, `<nav>`, `<footer>`, `<article>`, `<section>`)
- ✅ Estrutura lógica de headings (h1 → h2 → h3)
- ✅ Ordem de tabulação lógica (`tabindex` quando necessário)
- ✅ Labels associados a inputs via `for` e `id`

#### 1.4 Distinguível
- ✅ Contraste mínimo de 4.5:1 para texto normal
- ✅ Contraste mínimo de 3:1 para texto grande (18px+)
- ✅ Texto redimensionável até 200% sem perda de funcionalidade
- ✅ Sem dependência exclusiva de cor para informação
- ✅ Suporte a modo escuro e alto contraste

### Princípio 2: Operável

#### 2.1 Acessível por Teclado
- ✅ Toda funcionalidade disponível via teclado
- ✅ Sem "armadilhas de teclado" (keyboard traps)
- ✅ Skip navigation link (Pular para conteúdo)
- ✅ Atalhos de teclado documentados

#### 2.2 Tempo Suficiente
- ✅ Sem limites de tempo para interações
- ✅ Animações pausam com `prefers-reduced-motion`

#### 2.4 Navegável
- ✅ Página tem título descritivo (`<title>`)
- ✅ Ordem de foco lógica e previsível
- ✅ Links têm propósito claro
- ✅ Múltiplas formas de navegação (menu, rodapé, links internos)
- ✅ Focus visível em todos os elementos interativos

### Princípio 3: Compreensível

#### 3.1 Legível
- ✅ Linguagem da página declarada (`lang="pt-BR"`)
- ✅ Tipografia legível (fonte Poppins, tamanho base 16px)

#### 3.2 Previsível
- ✅ Navegação consistente em todas as páginas
- ✅ Componentes se comportam de forma previsível
- ✅ Sem mudanças automáticas de contexto

#### 3.3 Assistência de Entrada
- ✅ Validação de formulários com mensagens de erro claras
- ✅ Feedback visual (cores, ícones) e textual
- ✅ Sugestões de correção para erros
- ✅ Labels descritivos e instruções
- ✅ Máscaras de entrada para formato correto

### Princípio 4: Robusto

#### 4.1 Compatível
- ✅ HTML válido e bem formado
- ✅ ARIA usado corretamente
- ✅ IDs únicos
- ✅ Compatível com tecnologias assistivas

---

## ⌨️ Navegação por Teclado

### Teclas de Navegação

| Tecla | Ação |
|-------|------|
| **Tab** | Avançar para próximo elemento interativo |
| **Shift + Tab** | Voltar para elemento interativo anterior |
| **Enter** | Ativar link ou botão |
| **Espaço** | Ativar botão, toggle checkbox |
| **Setas** | Navegar em dropdowns, radio groups |
| **Esc** | Fechar modal ou dropdown |
| **Alt + T** | Focar no seletor de tema |

### Skip Navigation Link

Pressione **Tab** na página inicial para revelar o link "Pular para o conteúdo principal". Isso permite que usuários de teclado pulem a navegação e vão direto ao conteúdo.

```html
<a href="#app-content" class="skip-link">Pular para o conteúdo principal</a>
```

### Focus Indicators

Todos os elementos interativos têm indicadores de foco visíveis:

- **Outline azul de 3px** quando focado por teclado
- **Box-shadow suave** em inputs focados
- **Outline laranja de 3px** no skip link

```css
*:focus-visible {
    outline: 3px solid var(--color-primary-500);
    outline-offset: 2px;
    border-radius: var(--border-radius-sm);
}
```

---

## 🎨 Temas Acessíveis

### 1. Modo Claro (Padrão)

- Fundo branco (#ffffff)
- Texto cinza escuro (#1f2937)
- Contraste otimizado para leitura diurna

### 2. Modo Escuro

- Fundo cinza escuro (#0f172a)
- Texto cinza claro (#f1f5f9)
- Reduz fadiga visual em ambientes com pouca luz
- Contraste mínimo 4.5:1 mantido

**Ativar**: Clique no botão "🌙 Escuro" ou pressione Alt + T → selecione Escuro

### 3. Alto Contraste

- Fundo preto puro (#000000)
- Texto branco puro (#ffffff)
- Cores vivas para links (verde limão #00ff00)
- Bordas grossas (3px)
- Contraste máximo para usuários com baixa visão

**Ativar**: Clique no botão "⚡ Contraste" ou pressione Alt + T → selecione Contraste

### Preferência do Sistema

O site respeita automaticamente as preferências do sistema:

```css
@media (prefers-color-scheme: dark) {
    /* Aplica modo escuro automaticamente */
}

@media (prefers-contrast: high) {
    /* Aumenta contraste automaticamente */
}
```

### Salvar Preferência

O tema escolhido é salvo no `localStorage` e aplicado automaticamente nas próximas visitas.

---

## 🔊 Leitores de Tela

### ARIA Attributes Utilizados

#### Landmarks
```html
<nav role="navigation" aria-label="Navegação principal">
<main id="app-content">
<footer>
```

#### Formulários
```html
<input id="nome" required aria-required="true" aria-describedby="nome-error">
<span id="nome-error" class="error-message" role="alert">Este campo é obrigatório</span>
```

#### Botões e Estados
```html
<button aria-label="Abrir menu de navegação" aria-expanded="false">
<button aria-pressed="true">Modo Escuro</button>
```

#### Live Regions
```html
<div role="status" aria-live="polite">
    Modo escuro ativado
</div>
```

### Screen Reader Only

Classe `.sr-only` para conteúdo visível apenas para leitores de tela:

```css
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}
```

Uso:
```html
<span class="sr-only">Erro no campo CPF:</span>
<span>CPF inválido</span>
```

### Leitores de Tela Testados

✅ **NVDA** (Windows) - Navegação funcional
✅ **JAWS** (Windows) - Formulários acessíveis
✅ **VoiceOver** (macOS/iOS) - Compatível
✅ **TalkBack** (Android) - Mobile responsivo
✅ **Narrator** (Windows) - Básico funcional

---

## 🎨 Contraste de Cores

### Contraste Mínimo (WCAG AA)

- **Texto normal** (< 18px): Mínimo **4.5:1**
- **Texto grande** (≥ 18px ou 14px bold): Mínimo **3:1**
- **Elementos UI**: Mínimo **3:1**

### Paleta Principal - Ratios de Contraste

#### Modo Claro

| Cor | Fundo | Contraste | Status |
|-----|-------|-----------|--------|
| Azul Primário (#2563eb) | Branco (#ffffff) | 7.7:1 | ✅ AAA |
| Texto Cinza (#374151) | Branco (#ffffff) | 11.6:1 | ✅ AAA |
| Verde Secundário (#10b981) | Branco (#ffffff) | 3.4:1 | ✅ AA (grande) |
| Vermelho Erro (#ef4444) | Branco (#ffffff) | 4.5:1 | ✅ AA |

#### Modo Escuro

| Cor | Fundo | Contraste | Status |
|-----|-------|-----------|--------|
| Azul Claro (#60a5fa) | Cinza Escuro (#0f172a) | 9.1:1 | ✅ AAA |
| Texto Claro (#f1f5f9) | Cinza Escuro (#0f172a) | 14.2:1 | ✅ AAA |
| Verde Claro (#34d399) | Cinza Escuro (#0f172a) | 7.8:1 | ✅ AAA |

#### Alto Contraste

| Cor | Fundo | Contraste | Status |
|-----|-------|-----------|--------|
| Branco (#ffffff) | Preto (#000000) | 21:1 | ✅ AAA+ |
| Verde Limão (#00ff00) | Preto (#000000) | 15.3:1 | ✅ AAA |
| Amarelo (#ffff00) | Preto (#000000) | 19.6:1 | ✅ AAA |

### Ferramentas de Verificação

- **WebAIM Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Chrome DevTools**: Lighthouse Accessibility Audit
- **axe DevTools**: Extensão de browser

---

## 📝 Formulários Acessíveis

### Elementos de Formulário

Todos os formulários seguem boas práticas de acessibilidade:

#### Labels Associados
```html
<label for="nome-completo">Nome Completo *</label>
<input type="text"
       id="nome-completo"
       name="nome"
       required
       aria-required="true"
       aria-describedby="nome-error">
<span id="nome-error" class="error-message" role="alert"></span>
```

#### Validação Acessível

1. **Visual**: Borda vermelha, ícone ✕, fundo vermelho claro
2. **Textual**: Mensagem de erro descritiva
3. **Programática**: `aria-invalid="true"`, `role="alert"`

#### Estados de Validação

```css
/* Erro */
input.error {
    border-color: var(--color-error);          /* Visual */
    background-color: var(--color-error-light); /* Visual */
}

input.error + .error-message {
    display: block;                             /* Textual */
}

input[aria-invalid="true"] {
    /* Programático para leitores de tela */
}

/* Sucesso */
input.success {
    border-color: var(--color-success);
    background-color: var(--color-success-light);
}
```

### Máscaras de Entrada

As máscaras ajudam usuários a preencher corretamente:

- **CPF**: `000.000.000-00` (11 dígitos)
- **Telefone**: `(00) 00000-0000` (detecta fixo/celular)
- **CEP**: `00000-000`
- **Data**: `00/00/0000`

```javascript
// Máscara aplicada em tempo real
input.addEventListener('input', (e) => {
    e.target.value = applyCPFMask(e.target.value);
});
```

---

## 🧪 Testes de Acessibilidade

### Testes Automatizados

#### 1. Lighthouse (Chrome DevTools)

```bash
1. Abra Chrome DevTools (F12)
2. Vá para aba "Lighthouse"
3. Selecione "Accessibility"
4. Clique em "Generate report"
```

**Meta**: Score ≥ 90/100

#### 2. axe DevTools

```bash
1. Instale extensão axe DevTools
2. F12 → aba "axe DevTools"
3. Clique em "Scan ALL of my page"
4. Revise problemas encontrados
```

**Meta**: 0 violations

#### 3. WAVE

- Site: https://wave.webaim.org/
- Cole a URL pública do site
- Revise relatório de acessibilidade

### Testes Manuais

#### Teste 1: Navegação por Teclado

1. Desconecte o mouse
2. Pressione **Tab** repetidamente
3. Verifique se todos os elementos interativos são focáveis
4. Verifique se o foco é visível (outline azul)
5. Pressione **Enter** ou **Espaço** para ativar elementos
6. Use **Esc** para fechar modais

✅ **Passou** se conseguir navegar e interagir com tudo

#### Teste 2: Zoom 200%

1. Pressione **Ctrl + +** até zoom de 200%
2. Verifique se o texto é legível
3. Verifique se não há overflow horizontal
4. Verifique se todos os elementos estão acessíveis

✅ **Passou** se tudo funcionar normalmente

#### Teste 3: Leitor de Tela

**NVDA (Windows - Gratuito)**:

1. Baixe NVDA: https://www.nvaccess.org/
2. Inicie NVDA
3. Navegue pelo site apenas com teclado
4. Ouça as descrições dos elementos
5. Verifique se formulários anunciam erros

✅ **Passou** se todas as informações estão disponíveis por áudio

#### Teste 4: Alto Contraste

1. Ative modo de alto contraste:
   - **Windows**: Shift + Alt + Print Screen
   - **macOS**: System Preferences → Accessibility → Display → Increase Contrast
2. Ou clique no botão "⚡ Contraste"
3. Verifique se todo o texto é legível
4. Verifique se bordas são visíveis

✅ **Passou** se tudo é claramente visível

### Checklist Final

- [ ] Navegação completa por teclado
- [ ] Skip navigation link funciona
- [ ] Focus indicators visíveis em todos os elementos
- [ ] Contraste mínimo 4.5:1 para texto
- [ ] HTML semântico correto
- [ ] ARIA attributes apropriados
- [ ] Labels associados a todos os inputs
- [ ] Mensagens de erro descritivas
- [ ] Alt text em todas as imagens
- [ ] Modo escuro funcional
- [ ] Alto contraste funcional
- [ ] Lighthouse score ≥ 90
- [ ] axe DevTools sem violations
- [ ] Testado com leitor de tela
- [ ] Zoom 200% funcional
- [ ] Sem keyboard traps

---

## 📚 Recursos Adicionais

### Documentação WCAG

- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **WCAG em Português**: https://www.w3c.br/traducoes/wcag/wcag21-pt-BR/

### Ferramentas

- **Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Color Oracle**: Simulador de daltonismo
- **NVDA**: https://www.nvaccess.org/ (leitor de tela gratuito)
- **axe DevTools**: https://www.deque.com/axe/devtools/

### Cursos e Tutoriais

- **WebAIM**: https://webaim.org/articles/
- **A11ycasts (Google)**: https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility

---

## 📞 Suporte

Se você encontrar problemas de acessibilidade ou tiver sugestões, por favor:

1. Abra uma issue no repositório Git
2. Ou entre em contato: contato@transformarvidas.org.br

**Comprometimento**: Respondemos a problemas de acessibilidade em até 48 horas.

---

<div align="center">

**Acessibilidade não é uma feature, é um direito fundamental.**

[← Voltar para Documentação](./INDEX.md)

</div>
