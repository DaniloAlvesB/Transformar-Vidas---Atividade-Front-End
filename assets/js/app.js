/*
==============================================
APP.JS - Aplicação Principal (SPA)
==============================================

Orquestra toda a aplicação Single Page Application
- Inicializa router e validação
- Gerencia eventos de cada página
- Implementa todas as funcionalidades dinâmicas

==============================================
*/

// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa LocalStorage com dados mock
    initializeLocalStorage();

    // Inicializa menu mobile
    initMobileMenu();

    // Inicializa modais globais
    initModals();

    // Registra rotas
    registerRoutes();

    // Inicializa router
    router.init('app-content');

    // Escuta mudanças de rota para reinicializar eventos
    window.addEventListener('routeChanged', handleRouteChange);
});

// ==========================================
// REGISTRO DE ROTAS
// ==========================================

function registerRoutes() {
    router.register('/', () => pages.home());
    router.register('/projetos', () => pages.projetos());
    router.register('/voluntariado', () => pages.voluntariado());
    router.register('/doacoes', () => pages.doacoes());
    router.register('/blog', () => pages.blog());
    router.register('/admin', () => pages.admin());
}

// ==========================================
// HANDLER DE MUDANÇA DE ROTA
// ==========================================

function handleRouteChange(event) {
    const path = event.detail.path;

    // Reinicializa máscaras para campos novos
    if (typeof initMasks === 'function') {
        setTimeout(() => initMasks(), 100);
    }

    // Executa lógica específica de cada página
    switch (path) {
        case '/':
            initHomePage();
            break;
        case '/projetos':
            initProjetosPage();
            break;
        case '/voluntariado':
            initVoluntariadoPage();
            break;
        case '/doacoes':
            initDoacoesPage();
            break;
        case '/blog':
            initBlogPage();
            break;
        case '/admin':
            initAdminPage();
            break;
    }
}

// ==========================================
// MENU MOBILE
// ==========================================

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);

            if (isExpanded) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Fecha menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
    }
}

// ==========================================
// MODAL SYSTEM
// ==========================================

function initModals() {
    // Fecha modal ao clicar no overlay ou botão fechar
    document.addEventListener('click', (e) => {
        if (e.target.hasAttribute('data-close-modal')) {
            const modal = e.target.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        }
    });

    // Fecha modal ao pressionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                closeModal(modal.id);
            });
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Reinicializa máscaras nos campos da modal
        if (typeof initMasks === 'function') {
            setTimeout(() => initMasks(modal), 100);
        }

        const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// ==========================================
// ANIMAÇÕES
// ==========================================

function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString('pt-BR');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString('pt-BR');
        }
    }, 16);
}

function initScrollAnimations() {
    const statsNumbers = document.querySelectorAll('.stat-number[data-target]');

    if (statsNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateNumber(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsNumbers.forEach(stat => observer.observe(stat));
    }
}

// ==========================================
// HOME PAGE
// ==========================================

function initHomePage() {
    loadFeaturedProjects();
    initScrollAnimations();
}

function loadFeaturedProjects() {
    const container = document.getElementById('featured-projects-list');
    if (!container) return;

    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const featured = projects.slice(0, 3);

    container.innerHTML = featured.map(project => `
        <article class="project-card">
            <div class="project-image">${project.image}</div>
            <div class="project-content">
                <span class="project-category">${pages.utils.getCategoryName(project.category)}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-progress">
                    <div class="progress-info">
                        <span>${pages.utils.formatCurrency(project.raised)} arrecadados</span>
                        <span>${pages.utils.calculatePercentage(project.raised, project.goal)}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${pages.utils.calculatePercentage(project.raised, project.goal)}%"></div>
                    </div>
                    <p class="progress-goal">Meta: ${pages.utils.formatCurrency(project.goal)}</p>
                </div>
            </div>
        </article>
    `).join('');
}

// ==========================================
// PROJETOS PAGE
// ==========================================

function initProjetosPage() {
    loadProjects();
    initProjectFilters();
}

function loadProjects(filter = 'all', searchTerm = '') {
    const container = document.getElementById('projects-list');
    const noResults = document.getElementById('no-projects');
    if (!container) return;

    let projects = JSON.parse(localStorage.getItem('projects') || '[]');

    if (filter !== 'all') {
        projects = projects.filter(p => p.category === filter);
    }

    if (searchTerm) {
        projects = projects.filter(p =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    if (projects.length === 0) {
        noResults.style.display = 'block';
        container.innerHTML = '';
        return;
    }

    noResults.style.display = 'none';
    container.innerHTML = projects.map(project => `
        <article class="project-card" data-project-id="${project.id}">
            <div class="project-image">${project.image}</div>
            <div class="project-content">
                <span class="project-category">${pages.utils.getCategoryName(project.category)}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-progress">
                    <div class="progress-info">
                        <span>${pages.utils.formatCurrency(project.raised)}</span>
                        <span>${pages.utils.calculatePercentage(project.raised, project.goal)}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${pages.utils.calculatePercentage(project.raised, project.goal)}%"></div>
                    </div>
                    <p class="progress-goal">Meta: ${pages.utils.formatCurrency(project.goal)}</p>
                </div>
                <button class="btn btn-primary" onclick="showProjectDetails(${project.id})">Ver Detalhes</button>
            </div>
        </article>
    `).join('');
}

function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
    const searchInput = document.getElementById('project-search');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            const filter = btn.getAttribute('data-filter');
            const searchTerm = searchInput ? searchInput.value : '';
            loadProjects(filter, searchTerm);
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeFilter = document.querySelector('.filter-btn.active');
            const filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
            loadProjects(filter, e.target.value);
        });
    }
}

window.showProjectDetails = function(projectId) {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const project = projects.find(p => p.id === projectId);

    if (!project) return;

    const modalContent = document.getElementById('modal-project-content');
    if (!modalContent) return;

    modalContent.innerHTML = `
        <div class="project-detail">
            <div class="project-detail-header">
                <span class="project-image-large">${project.image}</span>
                <div>
                    <span class="project-category">${pages.utils.getCategoryName(project.category)}</span>
                    <h2>${project.title}</h2>
                </div>
            </div>
            <div class="project-detail-content">
                <p>${project.longDescription}</p>
                <div class="project-stats">
                    <div class="stat">
                        <strong>Beneficiários:</strong> ${project.beneficiaries} pessoas
                    </div>
                    <div class="stat">
                        <strong>Início:</strong> ${pages.utils.formatDate(project.startDate)}
                    </div>
                </div>
                <div class="project-progress">
                    <div class="progress-info">
                        <span>${pages.utils.formatCurrency(project.raised)} arrecadados</span>
                        <span>${pages.utils.calculatePercentage(project.raised, project.goal)}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${pages.utils.calculatePercentage(project.raised, project.goal)}%"></div>
                    </div>
                    <p class="progress-goal">Meta: ${pages.utils.formatCurrency(project.goal)}</p>
                </div>
                <a href="#/doacoes" class="btn btn-primary btn-lg">Apoiar este Projeto</a>
            </div>
        </div>
    `;

    openModal('project-modal');
};

// ==========================================
// VOLUNTARIADO PAGE
// ==========================================

function initVoluntariadoPage() {
    loadOpportunities();
    initOpportunityFilters();
    initVolunteerForm();
}

function loadOpportunities(areaFilter = 'all', timeFilter = 'all') {
    const container = document.getElementById('opportunities-list');
    if (!container) return;

    let opportunities = JSON.parse(localStorage.getItem('opportunities') || '[]');

    if (areaFilter !== 'all') {
        opportunities = opportunities.filter(o => o.area === areaFilter);
    }

    if (timeFilter !== 'all') {
        opportunities = opportunities.filter(o => o.time === timeFilter);
    }

    container.innerHTML = opportunities.map(opp => `
        <div class="opportunity-card">
            <h3>${opp.title}</h3>
            <span class="opportunity-area">${pages.utils.getCategoryName(opp.area)}</span>
            <p>${opp.description}</p>
            <ul class="opportunity-details">
                <li><strong>Requisitos:</strong> ${opp.requirements}</li>
                <li><strong>Horário:</strong> ${pages.utils.getTimeName(opp.time)}</li>
                <li><strong>Horas:</strong> ${opp.hours}</li>
                <li><strong>Vagas:</strong> ${opp.vacancies}</li>
            </ul>
            <button class="btn btn-primary" onclick="scrollToVolunteerForm()">Candidatar-se</button>
        </div>
    `).join('');
}

function initOpportunityFilters() {
    const areaFilter = document.getElementById('area-filter');
    const timeFilter = document.getElementById('time-filter');

    if (areaFilter && timeFilter) {
        const updateFilters = () => {
            loadOpportunities(areaFilter.value, timeFilter.value);
        };

        areaFilter.addEventListener('change', updateFilters);
        timeFilter.addEventListener('change', updateFilters);
    }
}

window.scrollToVolunteerForm = function() {
    const formSection = document.getElementById('volunteer-form-section');
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const firstInput = formSection.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 500);
        }
    }
};

function initVolunteerForm() {
    const form = document.getElementById('volunteer-form');
    if (!form) return;

    // Inicializa validação
    formValidator.initForm(form, { realtime: true });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!formValidator.validateForm(form)) {
            return;
        }

        const formData = {
            id: Date.now(),
            fullName: document.getElementById('full-name').value.trim(),
            email: document.getElementById('email').value.trim(),
            cpf: document.getElementById('cpf').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            birthDate: document.getElementById('birth-date').value,
            areaInterest: document.getElementById('area-interest').value,
            availability: document.getElementById('availability').value,
            experience: document.getElementById('experience').value.trim(),
            motivation: document.getElementById('motivation').value.trim(),
            registeredAt: new Date().toISOString()
        };

        const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
        volunteers.push(formData);
        localStorage.setItem('volunteers', JSON.stringify(volunteers));

        alert('Cadastro realizado com sucesso! Entraremos em contato em breve.');
        form.reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Exporta funções globais necessárias
window.initHomePage = initHomePage;
window.initProjetosPage = initProjetosPage;
window.initVoluntariadoPage = initVoluntariadoPage;
