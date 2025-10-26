/*
==============================================
SISTEMA DE TEMAS - JAVASCRIPT
==============================================

Gerencia a alternância entre temas acessíveis:
- Modo Claro (padrão)
- Modo Escuro
- Alto Contraste

Funcionalidades:
- Salva preferência no localStorage
- Respeita preferência do sistema
- Aplica tema ao carregar página
- Eventos de teclado para acessibilidade

==============================================
*/

/**
 * Gerenciador de Temas
 */
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.storageKey = 'ong-theme-preference';

        // Inicialização
        this.init();
    }

    /**
     * Inicializa o gerenciador de temas
     */
    init() {
        // Carrega tema salvo ou detecta preferência do sistema
        this.loadSavedTheme();

        // Configura event listeners
        this.setupEventListeners();

        // Aplica tema inicial
        this.applyTheme(this.currentTheme, false);
    }

    /**
     * Carrega tema salvo do localStorage ou detecta preferência do sistema
     */
    loadSavedTheme() {
        // Tenta carregar tema salvo
        const savedTheme = localStorage.getItem(this.storageKey);

        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            // Detecta preferência do sistema
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                this.currentTheme = 'dark';
            } else if (window.matchMedia && window.matchMedia('(prefers-contrast: high)').matches) {
                this.currentTheme = 'high-contrast';
            }
        }
    }

    /**
     * Configura event listeners para os botões de tema
     */
    setupEventListeners() {
        // Botões de tema
        const lightBtn = document.getElementById('theme-light');
        const darkBtn = document.getElementById('theme-dark');
        const contrastBtn = document.getElementById('theme-contrast');

        if (lightBtn) {
            lightBtn.addEventListener('click', () => this.setTheme('light'));
        }

        if (darkBtn) {
            darkBtn.addEventListener('click', () => this.setTheme('dark'));
        }

        if (contrastBtn) {
            contrastBtn.addEventListener('click', () => this.setTheme('high-contrast'));
        }

        // Atalhos de teclado (acessibilidade)
        document.addEventListener('keydown', (e) => {
            // Alt + T + L = Light
            // Alt + T + D = Dark
            // Alt + T + C = Contrast
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                this.showThemeSwitcher();
            }
        });

        // Detecta mudanças na preferência do sistema
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem(this.storageKey)) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    /**
     * Define o tema
     * @param {string} theme - 'light', 'dark', ou 'high-contrast'
     * @param {boolean} save - Se deve salvar no localStorage
     */
    setTheme(theme, save = true) {
        this.currentTheme = theme;
        this.applyTheme(theme, save);
    }

    /**
     * Aplica o tema ao documento
     * @param {string} theme - Nome do tema
     * @param {boolean} save - Se deve salvar no localStorage
     */
    applyTheme(theme, save = true) {
        const html = document.documentElement;

        // Remove todos os atributos de tema
        html.removeAttribute('data-theme');

        // Aplica novo tema (se não for light)
        if (theme !== 'light') {
            html.setAttribute('data-theme', theme);
        }

        // Atualiza botões
        this.updateButtons(theme);

        // Salva no localStorage
        if (save) {
            localStorage.setItem(this.storageKey, theme);
        }

        // Dispara evento customizado
        const event = new CustomEvent('themechange', {
            detail: { theme: theme }
        });
        document.dispatchEvent(event);

        // Anúncio para leitores de tela
        this.announceThemeChange(theme);
    }

    /**
     * Atualiza visual dos botões de tema
     * @param {string} activeTheme - Tema ativo
     */
    updateButtons(activeTheme) {
        const buttons = {
            'light': document.getElementById('theme-light'),
            'dark': document.getElementById('theme-dark'),
            'high-contrast': document.getElementById('theme-contrast')
        };

        // Remove classe active de todos e reseta aria-pressed
        Object.values(buttons).forEach(btn => {
            if (btn) {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });

        // Adiciona classe active no botão ativo
        const activeButton = buttons[activeTheme];
        if (activeButton) {
            activeButton.classList.add('active');
            activeButton.setAttribute('aria-pressed', 'true');
        }
    }

    /**
     * Anuncia mudança de tema para leitores de tela
     * @param {string} theme - Tema aplicado
     */
    announceThemeChange(theme) {
        const messages = {
            'light': 'Modo claro ativado',
            'dark': 'Modo escuro ativado',
            'high-contrast': 'Alto contraste ativado'
        };

        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = messages[theme] || 'Tema alterado';

        document.body.appendChild(announcement);

        // Remove após 1 segundo
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    /**
     * Mostra/foca no seletor de tema (para atalho de teclado)
     */
    showThemeSwitcher() {
        const switcher = document.querySelector('.theme-switcher');
        if (switcher) {
            const firstButton = switcher.querySelector('button');
            if (firstButton) {
                firstButton.focus();
            }
        }
    }

    /**
     * Retorna o tema atual
     * @returns {string}
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Alterna para o próximo tema (útil para botão único)
     */
    toggleTheme() {
        const themes = ['light', 'dark', 'high-contrast'];
        const currentIndex = themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        this.setTheme(themes[nextIndex]);
    }
}

// ============================================
// INICIALIZAÇÃO GLOBAL
// ============================================

// Instância global do gerenciador de temas
let themeManager;

// Inicializa quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        themeManager = new ThemeManager();
    });
} else {
    // DOM já está pronto
    themeManager = new ThemeManager();
}

// Exporta para uso global
window.themeManager = themeManager;
