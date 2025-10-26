# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [3.0.0] - 2025-10-26

### Adicionado
- Sistema de Single Page Application (SPA) completo
- Sistema de rotas hash-based (router.js)
- Sistema de validação avançada de formulários (validation.js)
- Sistema de máscaras de entrada em tempo real (masks.js)
- Validação de CPF com dígitos verificadores
- Máscaras para CPF e telefone brasileiro
- Feedback visual rico em formulários (ícones, cores, mensagens)
- Validação em tempo real enquanto o usuário digita
- Sistema de templates JavaScript
- Suporte a histórico do navegador (botões voltar/avançar)
- Transições suaves entre páginas
- Modal de detalhes de projetos
- Modal de doação com validação completa
- Modal de posts do blog
- Estilos de validação dedicados (validation-styles.css)
- Estilos de modais com espaçamento adequado
- Documentação completa organizada em pasta docs/
- README principal atualizado para SPA
- Guia de instruções rápidas
- Histórico de mudanças (MUDANCAS-SPA.md)

### Modificado
- Transformação de aplicação multi-página para SPA
- Estrutura de pastas organizada (assets/css, assets/js, assets/data)
- CSS movido para assets/css/
- JavaScript modularizado em múltiplos arquivos
- Dados mock separados em arquivo próprio
- Sistema de inicialização de máscaras automático
- Validação de min/max value apenas para campos numéricos
- Documentação reorganizada em pasta docs/

### Removido
- Múltiplas páginas HTML (projetos.html, voluntariado.html, etc.)
- Script.js monolítico
- Arquivos HTML antigos (movidos para backup)
- Logs temporários

### Corrigido
- Erro de validação em campos select
- Modal sem margem/padding
- Validação aplicada incorretamente em selects

## [2.0.0] - 2025-10-13

### Adicionado
- Página inicial com hero section
- Página de projetos com filtros
- Página de voluntariado com formulário
- Página de doações com campanhas
- Página de blog com posts
- Painel administrativo
- Sistema de autenticação simulado
- LocalStorage para persistência de dados
- Validação básica de formulários
- Design responsivo completo
- Animações e interações

### Modificado
- Estrutura HTML semântica
- CSS com design system
- JavaScript com funções modulares

## [1.0.0] - 2025-10-XX

### Adicionado
- Estrutura HTML básica
- CSS inicial
- Primeira versão do projeto

---

## Tipos de Mudanças

- `Adicionado` para novas funcionalidades
- `Modificado` para mudanças em funcionalidades existentes
- `Deprecated` para funcionalidades que serão removidas
- `Removido` para funcionalidades removidas
- `Corrigido` para correções de bugs
- `Segurança` para vulnerabilidades corrigidas

## Versionamento Semântico

Dado um número de versão MAJOR.MINOR.PATCH, incremente:

- **MAJOR** quando fizer mudanças incompatíveis na API
- **MINOR** quando adicionar funcionalidades mantendo compatibilidade
- **PATCH** quando corrigir bugs mantendo compatibilidade

Versão adicional pode ser incluída para pré-lançamentos: 3.0.0-beta.1
