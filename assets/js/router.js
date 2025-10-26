/*
==============================================
ROUTER - Sistema de Roteamento SPA
==============================================

Sistema de navegação para Single Page Application
- Gerencia rotas e navegação
- Atualiza URL sem recarregar página
- Carrega componentes dinamicamente
- Suporta navegação por histórico do browser

==============================================
*/

class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = null;
        this.contentContainer = null;

        // Bind do contexto para event listeners
        this.handlePopState = this.handlePopState.bind(this);
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    /**
     * Inicializa o router
     * @param {string} containerId - ID do elemento onde o conteúdo será renderizado
     */
    init(containerId) {
        this.contentContainer = document.getElementById(containerId);

        if (!this.contentContainer) {
            console.error(`Container com ID "${containerId}" não encontrado`);
            return;
        }

        // Escuta mudanças no histórico (botões voltar/avançar)
        window.addEventListener('popstate', this.handlePopState);

        // Intercepta cliques em links
        this.setupLinkInterception();

        // Carrega rota inicial
        this.loadInitialRoute();
    }

    /**
     * Registra uma nova rota
     * @param {string} path - Caminho da rota (ex: '/', '/projetos')
     * @param {Function} handler - Função que renderiza o conteúdo da rota
     */
    register(path, handler) {
        this.routes[path] = handler;
    }

    /**
     * Navega para uma rota
     * @param {string} path - Caminho da rota
     * @param {boolean} addToHistory - Se deve adicionar ao histórico do browser
     */
    navigate(path, addToHistory = true) {
        // Verifica se a rota existe
        if (!this.routes[path]) {
            console.warn(`Rota "${path}" não encontrada. Redirecionando para home.`);
            path = '/';
        }

        // Atualiza a URL sem recarregar a página
        if (addToHistory) {
            window.history.pushState({ path }, '', `#${path}`);
        }

        // Remove classe active de todos os links de navegação
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
        });

        // Adiciona classe active ao link atual
        const currentLink = document.querySelector(`.nav-menu a[href="#${path}"]`);
        if (currentLink) {
            currentLink.classList.add('active');
        }

        // Renderiza o conteúdo da rota
        this.currentRoute = path;
        this.render(path);

        // Scroll para o topo
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Fecha menu mobile se estiver aberto
        this.closeMobileMenu();
    }

    /**
     * Renderiza o conteúdo de uma rota
     * @param {string} path - Caminho da rota
     */
    render(path) {
        const handler = this.routes[path];

        if (typeof handler === 'function') {
            // Adiciona animação de transição
            this.contentContainer.style.opacity = '0';

            setTimeout(() => {
                // Executa o handler da rota que retorna o HTML
                const content = handler();
                this.contentContainer.innerHTML = content;

                // Fade in
                this.contentContainer.style.opacity = '1';

                // Dispara evento customizado para que outros módulos possam reagir
                window.dispatchEvent(new CustomEvent('routeChanged', {
                    detail: { path, container: this.contentContainer }
                }));
            }, 150);
        }
    }

    /**
     * Carrega a rota inicial baseada na URL
     */
    loadInitialRoute() {
        const hash = window.location.hash.slice(1) || '/';
        this.navigate(hash, false);
    }

    /**
     * Lida com mudanças no histórico do browser
     */
    handlePopState(event) {
        const path = event.state?.path || '/';
        this.navigate(path, false);
    }

    /**
     * Intercepta cliques em links internos
     */
    setupLinkInterception() {
        document.addEventListener('click', this.handleLinkClick);
    }

    /**
     * Processa cliques em links
     */
    handleLinkClick(event) {
        const link = event.target.closest('a[href^="#"]');

        if (link) {
            event.preventDefault();
            const path = link.getAttribute('href').slice(1);
            this.navigate(path);
        }
    }

    /**
     * Fecha o menu mobile
     */
    closeMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');

        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) {
                menuToggle.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
        }
    }

    /**
     * Obtém a rota atual
     */
    getCurrentRoute() {
        return this.currentRoute;
    }

    /**
     * Destrói o router (útil para testes)
     */
    destroy() {
        window.removeEventListener('popstate', this.handlePopState);
        document.removeEventListener('click', this.handleLinkClick);
    }
}

// Exporta instância única do router (Singleton)
const router = new Router();
