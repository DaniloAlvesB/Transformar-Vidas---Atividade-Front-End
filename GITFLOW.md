# GitFlow - Estratégia de Branching

## 📋 Visão Geral

Este projeto segue a estratégia **GitFlow** para controle de versão, garantindo um fluxo de trabalho organizado e profissional.

## 🌳 Estrutura de Branches

### Branches Principais

#### `master` (ou `main`)
- **Propósito**: Código em produção
- **Proteção**: Apenas recebe merges de `release/*` ou `hotfix/*`
- **Tags**: Todas as versões são taggeadas aqui (v3.0.0, v3.1.0, etc.)
- **Nunca**: Fazer commits diretos

#### `develop`
- **Propósito**: Branch de integração para desenvolvimento
- **Proteção**: Recebe merges de `feature/*` e `release/*`
- **Estado**: Sempre com código funcional e testado
- **Base**: Para criar novas features

### Branches de Suporte

#### `feature/*`
- **Propósito**: Desenvolvimento de novas funcionalidades
- **Nomenclatura**: `feature/nome-da-feature`
- **Origem**: Criada a partir de `develop`
- **Destino**: Merge em `develop`
- **Exemplos**:
  - `feature/dark-mode`
  - `feature/keyboard-navigation`
  - `feature/high-contrast-mode`

#### `release/*`
- **Propósito**: Preparação para nova versão de produção
- **Nomenclatura**: `release/v3.1.0`
- **Origem**: Criada a partir de `develop`
- **Destino**: Merge em `master` E `develop`
- **Ações**: Ajustes finais, testes, atualização de versão
- **Não**: Adicionar novas features

#### `hotfix/*`
- **Propósito**: Correções urgentes em produção
- **Nomenclatura**: `hotfix/v3.0.1`
- **Origem**: Criada a partir de `master`
- **Destino**: Merge em `master` E `develop`
- **Incremento**: Versão PATCH (3.0.0 → 3.0.1)

---

## 🔄 Fluxo de Trabalho

### 1. Desenvolvendo uma Nova Feature

```bash
# 1. Atualizar develop
git checkout develop
git pull origin develop

# 2. Criar branch de feature
git checkout -b feature/dark-mode

# 3. Desenvolver e fazer commits
git add .
git commit -m "feat: implement dark mode toggle"
git commit -m "style: add dark mode CSS variables"
git commit -m "docs: update README with dark mode info"

# 4. Finalizar feature
git checkout develop
git merge feature/dark-mode
git branch -d feature/dark-mode
git push origin develop
```

### 2. Criando uma Release

```bash
# 1. Criar branch de release
git checkout develop
git checkout -b release/v3.1.0

# 2. Atualizar versão
echo "3.1.0" > VERSION

# 3. Atualizar CHANGELOG.md
# Adicionar entrada para v3.1.0 com todas as mudanças

# 4. Commit de release
git commit -am "chore: bump version to 3.1.0"

# 5. Merge em master
git checkout master
git merge release/v3.1.0
git tag -a v3.1.0 -m "Release version 3.1.0"

# 6. Merge de volta em develop
git checkout develop
git merge release/v3.1.0

# 7. Limpar branch de release
git branch -d release/v3.1.0

# 8. Push de tudo
git push origin master develop --tags
```

### 3. Aplicando um Hotfix

```bash
# 1. Criar branch de hotfix
git checkout master
git checkout -b hotfix/v3.0.1

# 2. Corrigir bug
git commit -am "fix: resolve critical validation error"

# 3. Atualizar versão
echo "3.0.1" > VERSION
git commit -am "chore: bump version to 3.0.1"

# 4. Merge em master
git checkout master
git merge hotfix/v3.0.1
git tag -a v3.0.1 -m "Hotfix version 3.0.1"

# 5. Merge em develop
git checkout develop
git merge hotfix/v3.0.1

# 6. Limpar
git branch -d hotfix/v3.0.1
git push origin master develop --tags
```

---

## 📝 Commits Semânticos

### Formato

```
<tipo>(<escopo>): <descrição curta>

<corpo opcional>

<rodapé opcional>
```

### Tipos de Commit

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| `feat` | Nova funcionalidade | `feat: add dark mode toggle` |
| `fix` | Correção de bug | `fix: resolve modal padding issue` |
| `docs` | Documentação | `docs: update README with SPA info` |
| `style` | Formatação, CSS | `style: improve button hover states` |
| `refactor` | Refatoração de código | `refactor: extract validation logic` |
| `perf` | Melhoria de performance | `perf: optimize image loading` |
| `test` | Adicionar testes | `test: add validation unit tests` |
| `chore` | Tarefas de manutenção | `chore: update dependencies` |
| `ci` | CI/CD | `ci: add GitHub Actions workflow` |
| `build` | Build system | `build: configure minification` |

### Exemplos de Bons Commits

```bash
# Feature
git commit -m "feat(validation): add CPF mask with real-time formatting"

# Fix
git commit -m "fix(modal): add proper padding to modal content"

# Docs
git commit -m "docs: add accessibility guidelines to README"

# Style
git commit -m "style(forms): improve error message visibility"

# Refactor
git commit -m "refactor(router): extract route handling logic"

# Performance
git commit -m "perf(images): implement lazy loading"

# Breaking change
git commit -m "feat(api)!: change LocalStorage structure

BREAKING CHANGE: LocalStorage keys have been renamed for consistency"
```

---

## 🏷️ Versionamento Semântico

Seguimos o padrão [Semantic Versioning 2.0.0](https://semver.org/lang/pt-BR/)

### Formato: `MAJOR.MINOR.PATCH`

- **MAJOR** (3.x.x): Mudanças incompatíveis na API
  - Exemplo: Reestruturação completa do LocalStorage

- **MINOR** (x.1.x): Nova funcionalidade mantendo compatibilidade
  - Exemplo: Adicionar modo escuro

- **PATCH** (x.x.1): Correções de bugs mantendo compatibilidade
  - Exemplo: Corrigir validação de CPF

### Exemplos

```
1.0.0 → 1.0.1   (correção de bugs)
1.0.1 → 1.1.0   (nova feature)
1.1.0 → 2.0.0   (breaking change)
```

### Pré-releases

```
3.1.0-alpha.1   (Alpha)
3.1.0-beta.1    (Beta)
3.1.0-rc.1      (Release Candidate)
```

---

## 📦 Releases no GitHub

### Criar Release

1. Após merge em master e criação de tag:
```bash
git tag -a v3.1.0 -m "Release version 3.1.0"
git push origin v3.1.0
```

2. No GitHub:
   - Ir em "Releases" → "Create a new release"
   - Selecionar a tag (v3.1.0)
   - Título: "Version 3.1.0 - Nome descritivo"
   - Descrição: Copiar do CHANGELOG.md
   - Anexar arquivos minificados (se houver)
   - Publicar

---

## 🎯 Boas Práticas

### ✅ Fazer

- ✅ Commits pequenos e atômicos
- ✅ Mensagens de commit descritivas
- ✅ Testar antes de fazer merge
- ✅ Atualizar CHANGELOG.md regularmente
- ✅ Usar branches de feature para tudo
- ✅ Revisar código antes de merge
- ✅ Manter develop sempre funcional

### ❌ Evitar

- ❌ Commits diretos em master
- ❌ Mensagens de commit vagas ("fix", "update")
- ❌ Features incompletas em develop
- ❌ Misturar múltiplas mudanças em um commit
- ❌ Esquecer de atualizar VERSION e CHANGELOG
- ❌ Deletar branches antes de fazer merge
- ❌ Push force em branches compartilhadas

---

## 🔍 Comandos Úteis

```bash
# Ver histórico de commits
git log --oneline --graph --all

# Ver branches
git branch -a

# Ver tags
git tag

# Ver diferenças entre branches
git diff develop master

# Ver commits de uma branch
git log develop..feature/dark-mode

# Ver arquivos modificados
git status

# Ver último commit
git show HEAD
```

---

## 📚 Referências

- [GitFlow Original](https://nvie.com/posts/a-successful-git-branching-model/)
- [Conventional Commits](https://www.conventionalcommits.org/pt-br/)
- [Semantic Versioning](https://semver.org/lang/pt-BR/)
- [Keep a Changelog](https://keepachangelog.com/pt-BR/)

---

## 📊 Estado Atual do Projeto

### Branches Ativas
- `master` - Versão 3.0.0 (SPA completo)
- `develop` - Base para novas features

### Próximas Features Planejadas
1. `feature/keyboard-navigation` - Melhorias de acessibilidade
2. `feature/dark-mode` - Modo escuro
3. `feature/high-contrast` - Alto contraste
4. `feature/production-optimization` - Minificação e otimização

### Próxima Release
- **Versão**: 3.1.0
- **Features**: Acessibilidade WCAG 2.1 AA
- **Data prevista**: Conforme cronograma do curso
