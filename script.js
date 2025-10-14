/*
==============================================
PLATAFORMA ONG - JAVASCRIPT PRINCIPAL
==============================================

Este arquivo implementa todas as funcionalidades dinâmicas:
- Gerenciamento de dados com LocalStorage
- Navegação e menu mobile
- Formulários e validação
- Animações e interatividade
- Painel administrativo
- Sistema de autenticação

Autor: ONG Transformar Vidas
Data: 2025
==============================================
*/

// ===========================================
// 1. INICIALIZAÇÃO E DADOS MOCK
// ===========================================

/**
 * Inicializa o LocalStorage com dados mock se não existirem
 * Isso simula um banco de dados para a aplicação
 */
function initializeLocalStorage() {
    // Projetos iniciais
    if (!localStorage.getItem('projects')) {
        const projects = [
            {
                id: 1,
                title: 'Educação para Todos',
                category: 'educacao',
                description: 'Programa de reforço escolar e alfabetização para crianças em situação de vulnerabilidade social.',
                longDescription: 'Este projeto oferece aulas de reforço, material escolar e acompanhamento pedagógico para mais de 200 crianças da comunidade.',
                goal: 50000,
                raised: 35000,
                image: '📚',
                status: 'active',
                startDate: '2024-01-15',
                beneficiaries: 200
            },
            {
                id: 2,
                title: 'Cultura e Arte na Comunidade',
                category: 'cultura',
                description: 'Oficinas de música, teatro, dança e artes visuais para jovens da periferia.',
                longDescription: 'Através da arte, jovens descobrem talentos, desenvolvem autoestima e constroem perspectivas de futuro.',
                goal: 30000,
                raised: 22000,
                image: '🎭',
                status: 'active',
                startDate: '2024-02-01',
                beneficiaries: 150
            },
            {
                id: 3,
                title: 'Alimentação Solidária',
                category: 'assistencia',
                description: 'Distribuição de cestas básicas e refeições para famílias em situação de insegurança alimentar.',
                longDescription: 'Garantimos alimentação digna para 500 famílias mensalmente, além de orientação nutricional.',
                goal: 80000,
                raised: 65000,
                image: '🍲',
                status: 'active',
                startDate: '2023-11-01',
                beneficiaries: 500
            },
            {
                id: 4,
                title: 'Horta Comunitária Sustentável',
                category: 'meio-ambiente',
                description: 'Cultivo de alimentos orgânicos e educação ambiental para a comunidade.',
                longDescription: 'A horta não só produz alimentos saudáveis, mas também ensina práticas sustentáveis e gera renda.',
                goal: 25000,
                raised: 18000,
                image: '🌱',
                status: 'active',
                startDate: '2024-03-10',
                beneficiaries: 80
            }
        ];
        localStorage.setItem('projects', JSON.stringify(projects));
    }

    // Oportunidades de voluntariado
    if (!localStorage.getItem('opportunities')) {
        const opportunities = [
            {
                id: 1,
                title: 'Professor(a) Voluntário',
                area: 'educacao',
                description: 'Dar aulas de reforço em português e matemática para crianças do ensino fundamental.',
                requirements: 'Ensino superior (cursando ou completo)',
                time: 'tarde',
                hours: '4 horas/semana',
                vacancies: 5
            },
            {
                id: 2,
                title: 'Instrutor de Artes',
                area: 'cultura',
                description: 'Ministrar oficinas de música, teatro, dança ou artes visuais.',
                requirements: 'Experiência em artes',
                time: 'fim-de-semana',
                hours: '3 horas/semana',
                vacancies: 3
            },
            {
                id: 3,
                title: 'Assistente Administrativo',
                area: 'administrativo',
                description: 'Auxiliar na organização de documentos, cadastros e gestão de projetos.',
                requirements: 'Conhecimentos em informática',
                time: 'manha',
                hours: '6 horas/semana',
                vacancies: 2
            },
            {
                id: 4,
                title: 'Designer Gráfico',
                area: 'comunicacao',
                description: 'Criar materiais visuais para divulgação dos projetos nas redes sociais.',
                requirements: 'Conhecimento em design',
                time: 'noite',
                hours: '2 horas/semana',
                vacancies: 1
            }
        ];
        localStorage.setItem('opportunities', JSON.stringify(opportunities));
    }

    // Posts do blog
    if (!localStorage.getItem('blogPosts')) {
        const posts = [
            {
                id: 1,
                title: 'ONG Transformar Vidas completa 8 anos de atuação',
                category: 'noticias',
                excerpt: 'Celebramos 8 anos transformando vidas e construindo um futuro melhor para nossa comunidade.',
                content: 'Nestes 8 anos de história, a ONG Transformar Vidas já impactou mais de 15 mil pessoas através de seus diversos projetos sociais. Nossa jornada começou com um pequeno grupo de voluntários e hoje somos uma equipe de mais de 320 pessoas dedicadas...',
                author: 'Maria Rodrigues',
                date: '2025-01-15',
                featured: true,
                image: '🎉'
            },
            {
                id: 2,
                title: 'História de Sucesso: Conheça a trajetória de João',
                category: 'historias',
                excerpt: 'Ex-aluno do projeto Educação para Todos é aprovado em universidade federal.',
                content: 'João Silva, 18 anos, começou a frequentar nossas aulas de reforço há 5 anos. Hoje, ele foi aprovado em Engenharia na USP...',
                author: 'Ana Santos',
                date: '2025-01-10',
                featured: false,
                image: '🎓'
            },
            {
                id: 3,
                title: 'Campanha de Arrecadação de Alimentos bate meta',
                category: 'noticias',
                excerpt: 'Graças à solidariedade de nossos doadores, arrecadamos 5 toneladas de alimentos.',
                content: 'A campanha "Solidariedade na Mesa" superou todas as expectativas. Foram arrecadadas 5 toneladas de alimentos não perecíveis...',
                author: 'Pedro Costa',
                date: '2025-01-05',
                featured: false,
                image: '🍱'
            }
        ];
        localStorage.setItem('blogPosts', JSON.stringify(posts));
    }

    // Campanhas de doação
    if (!localStorage.getItem('campaigns')) {
        const campaigns = [
            {
                id: 1,
                title: 'Volta às Aulas 2025',
                description: 'Ajude a comprar material escolar para 200 crianças',
                goal: 15000,
                raised: 8500,
                deadline: '2025-02-28',
                image: '📚'
            },
            {
                id: 2,
                title: 'Instrumentos Musicais',
                description: 'Adquirir instrumentos para a oficina de música',
                goal: 12000,
                raised: 9200,
                deadline: '2025-03-31',
                image: '🎵'
            }
        ];
        localStorage.setItem('campaigns', JSON.stringify(campaigns));
    }

    // Voluntários cadastrados
    if (!localStorage.getItem('volunteers')) {
        localStorage.setItem('volunteers', JSON.stringify([]));
    }

    // Doações realizadas
    if (!localStorage.getItem('donations')) {
        localStorage.setItem('donations', JSON.stringify([]));
    }

    // Credenciais de admin (simulado)
    if (!localStorage.getItem('adminCredentials')) {
        localStorage.setItem('adminCredentials', JSON.stringify({
            username: 'admin',
            password: 'admin123'
        }));
    }
}

// ===========================================
// 2. UTILITÁRIOS
// ===========================================

/**
 * Formata valores monetários para o padrão brasileiro
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

/**
 * Formata datas para o padrão brasileiro
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

/**
 * Calcula porcentagem com segurança
 */
function calculatePercentage(current, total) {
    if (total === 0) return 0;
    return Math.min(Math.round((current / total) * 100), 100);
}

/**
 * Valida email
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Valida CPF (formato básico)
 */
function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    return cpf.length === 11;
}

/**
 * Valida telefone
 */
function validatePhone(phone) {
    const cleaned = phone.replace(/[^\d]/g, '');
    return cleaned.length >= 10;
}

// ===========================================
// 3. NAVEGAÇÃO E MENU MOBILE
// ===========================================

/**
 * Inicializa o menu mobile hambúrguer
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);

            // Previne scroll quando menu está aberto
            if (isExpanded) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Fecha menu ao clicar em um link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            });
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

// ===========================================
// 4. ANIMAÇÕES E INTERAÇÕES
// ===========================================

/**
 * Anima números (contador animado)
 */
function animateNumber(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60 FPS
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

/**
 * Observa elementos para animação ao scroll (Intersection Observer)
 */
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

// ===========================================
// 5. MODAL
// ===========================================

/**
 * Abre modal
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Foca no primeiro elemento focável do modal
        const firstFocusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            setTimeout(() => firstFocusable.focus(), 100);
        }
    }
}

/**
 * Fecha modal
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

/**
 * Inicializa eventos de modais
 */
function initModals() {
    // Fecha modal ao clicar no overlay ou botão fechar
    document.querySelectorAll('[data-close-modal]').forEach(element => {
        element.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            if (modal) {
                closeModal(modal.id);
            }
        });
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

// ===========================================
// 6. PÁGINA INICIAL (index.html)
// ===========================================

/**
 * Carrega projetos em destaque na home
 */
function loadFeaturedProjects() {
    const container = document.getElementById('featured-projects-list');
    if (!container) return;

    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const featured = projects.slice(0, 3); // Primeiros 3 projetos

    container.innerHTML = featured.map(project => `
        <article class="project-card">
            <div class="project-image">${project.image}</div>
            <div class="project-content">
                <span class="project-category">${getCategoryName(project.category)}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-progress">
                    <div class="progress-info">
                        <span>${formatCurrency(project.raised)} arrecadados</span>
                        <span>${calculatePercentage(project.raised, project.goal)}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${calculatePercentage(project.raised, project.goal)}%"></div>
                    </div>
                    <p class="progress-goal">Meta: ${formatCurrency(project.goal)}</p>
                </div>
            </div>
        </article>
    `).join('');
}

/**
 * Retorna nome legível da categoria
 */
function getCategoryName(category) {
    const categories = {
        'educacao': 'Educação',
        'cultura': 'Cultura',
        'assistencia': 'Assistência Social',
        'meio-ambiente': 'Meio Ambiente',
        'saude': 'Saúde'
    };
    return categories[category] || category;
}

// ===========================================
// 7. PÁGINA DE PROJETOS (projetos.html)
// ===========================================

/**
 * Carrega lista de projetos com filtros
 */
function loadProjects(filter = 'all', searchTerm = '') {
    const container = document.getElementById('projects-list');
    const noResults = document.getElementById('no-projects');
    if (!container) return;

    let projects = JSON.parse(localStorage.getItem('projects') || '[]');

    // Aplica filtro de categoria
    if (filter !== 'all') {
        projects = projects.filter(p => p.category === filter);
    }

    // Aplica busca
    if (searchTerm) {
        projects = projects.filter(p =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    // Mostra/esconde mensagem de sem resultados
    if (projects.length === 0) {
        container.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
        return;
    } else {
        if (noResults) noResults.style.display = 'none';
    }

    container.innerHTML = projects.map(project => `
        <article class="project-card" onclick="showProjectDetails(${project.id})">
            <div class="project-image">${project.image}</div>
            <div class="project-content">
                <span class="project-category">${getCategoryName(project.category)}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-progress">
                    <div class="progress-info">
                        <span>${formatCurrency(project.raised)}</span>
                        <span>${calculatePercentage(project.raised, project.goal)}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${calculatePercentage(project.raised, project.goal)}%"></div>
                    </div>
                    <p class="progress-goal">Meta: ${formatCurrency(project.goal)}</p>
                </div>
            </div>
        </article>
    `).join('');
}

/**
 * Mostra detalhes do projeto em modal
 */
function showProjectDetails(projectId) {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    const modalBody = document.getElementById('modal-body');
    if (!modalBody) return;

    modalBody.innerHTML = `
        <div class="project-image" style="width: 100%; height: 250px; margin-bottom: 1.5rem;">
            ${project.image}
        </div>
        <span class="project-category">${getCategoryName(project.category)}</span>
        <h2 id="modal-title">${project.title}</h2>
        <p><strong>Início:</strong> ${formatDate(project.startDate)}</p>
        <p><strong>Beneficiários:</strong> ${project.beneficiaries} pessoas</p>
        <hr style="margin: 1.5rem 0;">
        <p>${project.longDescription}</p>
        <div class="project-progress" style="margin-top: 2rem;">
            <h3>Progresso da Arrecadação</h3>
            <div class="progress-info">
                <span>${formatCurrency(project.raised)} de ${formatCurrency(project.goal)}</span>
                <span>${calculatePercentage(project.raised, project.goal)}%</span>
            </div>
            <div class="progress-bar" style="height: 12px;">
                <div class="progress-fill" style="width: ${calculatePercentage(project.raised, project.goal)}%"></div>
            </div>
        </div>
        <div style="margin-top: 2rem; text-align: center;">
            <a href="doacoes.html" class="btn btn-primary">Apoiar este Projeto</a>
        </div>
    `;

    openModal('project-modal');
}

/**
 * Inicializa filtros de projetos
 */
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
    const searchInput = document.getElementById('project-search');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
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

    // Carrega projetos inicialmente
    loadProjects();
}

// ===========================================
// 8. PÁGINA DE VOLUNTARIADO (voluntariado.html)
// ===========================================

/**
 * Carrega oportunidades de voluntariado
 */
function loadOpportunities(areaFilter = 'all', timeFilter = 'all') {
    const container = document.getElementById('opportunities-list');
    if (!container) return;

    let opportunities = JSON.parse(localStorage.getItem('opportunities') || '[]');

    // Aplica filtros
    if (areaFilter !== 'all') {
        opportunities = opportunities.filter(o => o.area === areaFilter);
    }
    if (timeFilter !== 'all') {
        opportunities = opportunities.filter(o => o.time === timeFilter);
    }

    container.innerHTML = opportunities.map(opp => `
        <article class="card">
            <h3>${opp.title}</h3>
            <p><strong>Área:</strong> ${getCategoryName(opp.area)}</p>
            <p>${opp.description}</p>
            <p><strong>Requisitos:</strong> ${opp.requirements}</p>
            <p><strong>Horário:</strong> ${getTimeName(opp.time)}</p>
            <p><strong>Dedicação:</strong> ${opp.hours}</p>
            <p><strong>Vagas:</strong> ${opp.vacancies}</p>
            <button class="btn btn-primary" onclick="scrollToForm()">Candidatar-se</button>
        </article>
    `).join('');
}

/**
 * Retorna nome legível do horário
 */
function getTimeName(time) {
    const times = {
        'manha': 'Manhã',
        'tarde': 'Tarde',
        'noite': 'Noite',
        'fim-de-semana': 'Fim de Semana'
    };
    return times[time] || time;
}

/**
 * Scroll suave para o formulário
 */
function scrollToForm() {
    const form = document.getElementById('volunteer-form');
    if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Foca no primeiro campo
        setTimeout(() => {
            const firstInput = form.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 500);
    }
}

/**
 * Inicializa formulário de voluntariado
 */
function initVolunteerForm() {
    const form = document.getElementById('volunteer-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validação
        const fullName = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const birthDate = document.getElementById('birth-date').value;
        const areasInterest = Array.from(document.getElementById('areas-interest').selectedOptions).map(o => o.value);
        const availability = Array.from(document.querySelectorAll('input[name="availability"]:checked')).map(c => c.value);
        const terms = document.getElementById('terms').checked;

        // Limpa mensagens de erro
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        let hasError = false;

        if (!fullName || fullName.length < 3) {
            document.getElementById('name-error').textContent = 'Nome deve ter pelo menos 3 caracteres';
            hasError = true;
        }

        if (!validateEmail(email)) {
            document.getElementById('email-error').textContent = 'E-mail inválido';
            hasError = true;
        }

        if (!validatePhone(phone)) {
            document.getElementById('phone-error').textContent = 'Telefone inválido';
            hasError = true;
        }

        if (!birthDate) {
            document.getElementById('birth-error').textContent = 'Data de nascimento é obrigatória';
            hasError = true;
        }

        if (areasInterest.length === 0) {
            alert('Selecione pelo menos uma área de interesse');
            hasError = true;
        }

        if (availability.length === 0) {
            alert('Selecione pelo menos uma disponibilidade');
            hasError = true;
        }

        if (!terms) {
            alert('Você deve aceitar os termos de voluntariado');
            hasError = true;
        }

        if (hasError) return;

        // Salva voluntário
        const volunteer = {
            id: Date.now(),
            fullName,
            email,
            phone,
            birthDate,
            areasInterest,
            availability,
            skills: document.getElementById('skills').value,
            motivation: document.getElementById('motivation').value,
            registrationDate: new Date().toISOString(),
            status: 'pending'
        };

        const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
        volunteers.push(volunteer);
        localStorage.setItem('volunteers', JSON.stringify(volunteers));

        // Mostra mensagem de sucesso
        form.style.display = 'none';
        const successMessage = document.getElementById('form-success');
        if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

/**
 * Inicializa filtros de oportunidades
 */
function initOpportunityFilters() {
    const areaFilter = document.getElementById('area-filter');
    const timeFilter = document.getElementById('time-filter');

    if (areaFilter && timeFilter) {
        const updateFilters = () => {
            loadOpportunities(areaFilter.value, timeFilter.value);
        };

        areaFilter.addEventListener('change', updateFilters);
        timeFilter.addEventListener('change', updateFilters);

        loadOpportunities();
    }
}

// ===========================================
// 9. PÁGINA DE DOAÇÕES (doacoes.html)
// ===========================================

/**
 * Carrega campanhas de doação
 */
function loadCampaigns() {
    const container = document.getElementById('campaigns-list');
    if (!container) return;

    const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');

    container.innerHTML = campaigns.map(campaign => `
        <article class="card">
            <div class="card-icon">${campaign.image}</div>
            <h3>${campaign.title}</h3>
            <p>${campaign.description}</p>
            <div class="project-progress">
                <div class="progress-info">
                    <span>${formatCurrency(campaign.raised)}</span>
                    <span>${calculatePercentage(campaign.raised, campaign.goal)}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${calculatePercentage(campaign.raised, campaign.goal)}%"></div>
                </div>
                <p>Meta: ${formatCurrency(campaign.goal)}</p>
                <p><strong>Prazo:</strong> ${formatDate(campaign.deadline)}</p>
            </div>
            <button class="btn btn-primary" onclick="openDonationModal('single', ${campaign.goal - campaign.raised})">Doar para esta Campanha</button>
        </article>
    `).join('');
}

// Variável global para armazenar o valor selecionado antes de abrir a modal
let selectedDonationAmount = 50;
let selectedDonationType = 'single';

/**
 * Abre modal de doação
 */
function openDonationModal(type, suggestedAmount = null) {
    const modal = document.getElementById('donation-modal');
    if (!modal) return;

    // Pega o valor dos inputs customizados se houver
    let amountToUse = suggestedAmount;

    if (!amountToUse) {
        if (type === 'single') {
            const customInput = document.getElementById('custom-amount-single');
            const customValue = customInput ? parseFloat(customInput.value) : 0;
            amountToUse = customValue > 0 ? customValue : selectedDonationAmount;
        } else if (type === 'monthly') {
            const customInput = document.getElementById('custom-amount-monthly');
            const customValue = customInput ? parseFloat(customInput.value) : 0;
            amountToUse = customValue > 0 ? customValue : selectedDonationAmount;
        }
    }

    // Se ainda não tem valor, usa o global ou padrão
    if (!amountToUse || amountToUse === 0) {
        amountToUse = selectedDonationAmount || 50;
    }

    // Reseta o formulário
    const form = document.getElementById('donation-form');
    if (form) {
        form.reset();
        form.style.display = 'block';
    }

    // Esconde mensagem de sucesso
    const successDiv = document.getElementById('donation-success');
    if (successDiv) {
        successDiv.style.display = 'none';
    }

    // Define tipo e valor
    document.getElementById('donation-type').value = type;
    document.getElementById('donation-amount').value = amountToUse;
    document.getElementById('donation-amount-display').textContent = formatCurrency(amountToUse);

    // Abre modal
    openModal('donation-modal');
}

/**
 * Inicializa botões de valor rápido FORA da modal
 */
function initQuickAmounts() {
    // Botões de valor rápido FORA da modal
    document.querySelectorAll('.amount-btn-outside').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const amount = parseFloat(btn.getAttribute('data-amount'));
            const type = btn.getAttribute('data-type');

            // Salva o valor selecionado
            selectedDonationAmount = amount;
            selectedDonationType = type;

            // Destaca o botão selecionado
            const container = btn.closest('.donation-option-card');
            if (container) {
                container.querySelectorAll('.amount-btn-outside').forEach(b => {
                    b.style.backgroundColor = '';
                    b.style.color = '';
                });
                btn.style.backgroundColor = 'var(--color-primary)';
                btn.style.color = 'var(--color-white)';
            }

            // Abre a modal direto com esse valor
            openDonationModal(type, amount);
        });
    });

    // Inputs de valor customizado FORA da modal
    const customInputSingle = document.getElementById('custom-amount-single');
    if (customInputSingle) {
        customInputSingle.addEventListener('input', (e) => {
            const amount = parseFloat(e.target.value);
            if (amount > 0) {
                selectedDonationAmount = amount;
                selectedDonationType = 'single';
                e.target.style.borderColor = 'var(--color-success)';
            } else {
                e.target.style.borderColor = '';
            }
        });
    }

    const customInputMonthly = document.getElementById('custom-amount-monthly');
    if (customInputMonthly) {
        customInputMonthly.addEventListener('input', (e) => {
            const amount = parseFloat(e.target.value);
            if (amount > 0) {
                selectedDonationAmount = amount;
                selectedDonationType = 'monthly';
                e.target.style.borderColor = 'var(--color-success)';
            } else {
                e.target.style.borderColor = '';
            }
        });
    }
}

/**
 * Inicializa formulário de doação
 */
function initDonationForm() {
    const form = document.getElementById('donation-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const amount = parseFloat(document.getElementById('donation-amount').value);
        const type = document.getElementById('donation-type').value;
        const name = document.getElementById('donor-name').value.trim();
        const email = document.getElementById('donor-email').value.trim();
        const cpf = document.getElementById('donor-cpf').value.trim();
        const phone = document.getElementById('donor-phone').value.trim();
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        const isAnonymous = document.getElementById('anonymous-donation').checked;

        // Validação
        if (!amount || amount <= 0) {
            alert('Selecione um valor para doar');
            return;
        }

        if (!name || name.length < 3) {
            alert('Nome inválido');
            return;
        }

        if (!validateEmail(email)) {
            alert('E-mail inválido');
            return;
        }

        if (!validateCPF(cpf)) {
            alert('CPF inválido');
            return;
        }

        // Salva doação
        const donation = {
            id: Date.now(),
            amount,
            type,
            donor: {
                name: isAnonymous ? 'Anônimo' : name,
                email,
                cpf,
                phone
            },
            paymentMethod,
            isAnonymous,
            date: new Date().toISOString(),
            status: 'completed'
        };

        const donations = JSON.parse(localStorage.getItem('donations') || '[]');
        donations.push(donation);
        localStorage.setItem('donations', JSON.stringify(donations));

        // Mostra sucesso
        form.style.display = 'none';
        const successDiv = document.getElementById('donation-success');
        if (successDiv) {
            successDiv.style.display = 'block';
        }

        // Atualiza estatísticas (simulado)
        updateDonationStats(amount);
    });
}

/**
 * Atualiza estatísticas de doação (simulado)
 */
function updateDonationStats(amount) {
    // Atualiza campanha aleatória
    const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    if (campaigns.length > 0) {
        const randomCampaign = campaigns[Math.floor(Math.random() * campaigns.length)];
        randomCampaign.raised += amount;
        localStorage.setItem('campaigns', JSON.stringify(campaigns));
    }
}

// ===========================================
// 10. PÁGINA DE BLOG (blog.html)
// ===========================================

/**
 * Carrega posts do blog
 */
function loadBlogPosts(category = 'all', searchTerm = '') {
    const container = document.getElementById('blog-posts-list');
    const featuredContainer = document.getElementById('featured-post');
    if (!container) return;

    let posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');

    // Post em destaque
    if (featuredContainer) {
        const featured = posts.find(p => p.featured);
        if (featured) {
            featuredContainer.innerHTML = `
                <div class="project-image" style="height: 300px;">${featured.image}</div>
                <div class="project-content" style="padding: 2rem;">
                    <span class="project-category">${featured.category}</span>
                    <h2>${featured.title}</h2>
                    <p style="margin-bottom: 1rem;"><small>Por ${featured.author} • ${formatDate(featured.date)}</small></p>
                    <p>${featured.excerpt}</p>
                    <button class="btn btn-primary" onclick="showPostDetails(${featured.id})">Ler Mais</button>
                </div>
            `;
        }
    }

    // Filtra posts (excluindo o featured)
    let filteredPosts = posts.filter(p => !p.featured);

    if (category !== 'all') {
        filteredPosts = filteredPosts.filter(p => p.category === category);
    }

    if (searchTerm) {
        filteredPosts = filteredPosts.filter(p =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    const noResults = document.getElementById('no-posts');
    if (filteredPosts.length === 0) {
        container.innerHTML = '';
        if (noResults) noResults.style.display = 'block';
        return;
    } else {
        if (noResults) noResults.style.display = 'none';
    }

    container.innerHTML = filteredPosts.map(post => `
        <article class="card" style="cursor: pointer;" onclick="showPostDetails(${post.id})">
            <div class="card-icon">${post.image}</div>
            <span class="project-category">${post.category}</span>
            <h3>${post.title}</h3>
            <p><small>Por ${post.author} • ${formatDate(post.date)}</small></p>
            <p>${post.excerpt}</p>
            <button class="btn btn-primary" onclick="showPostDetails(${post.id})">Ler Mais</button>
        </article>
    `).join('');
}

/**
 * Mostra detalhes do post em modal
 */
function showPostDetails(postId) {
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const modalContent = document.getElementById('post-modal-content');
    if (!modalContent) return;

    modalContent.innerHTML = `
        <div class="project-image" style="width: 100%; height: 300px; margin-bottom: 1.5rem;">
            ${post.image}
        </div>
        <span class="project-category">${post.category}</span>
        <h2 id="post-modal-title">${post.title}</h2>
        <p><small>Por ${post.author} • ${formatDate(post.date)}</small></p>
        <hr style="margin: 1.5rem 0;">
        <div style="line-height: 1.8;">
            ${post.content}
        </div>
    `;

    openModal('post-modal');
}

/**
 * Inicializa filtros do blog
 */
function initBlogFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn[data-category]');
    const searchInput = document.getElementById('blog-search');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            const category = btn.getAttribute('data-category');
            const searchTerm = searchInput ? searchInput.value : '';
            loadBlogPosts(category, searchTerm);
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeFilter = document.querySelector('.filter-btn[data-category].active');
            const category = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
            loadBlogPosts(category, e.target.value);
        });
    }

    loadBlogPosts();
}

/**
 * Inicializa formulário de newsletter
 */
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('newsletter-email').value.trim();

        if (!validateEmail(email)) {
            alert('Por favor, insira um e-mail válido');
            return;
        }

        // Simula cadastro
        const newsletters = JSON.parse(localStorage.getItem('newsletters') || '[]');
        newsletters.push({
            email,
            date: new Date().toISOString()
        });
        localStorage.setItem('newsletters', JSON.stringify(newsletters));

        // Mostra mensagem de sucesso
        form.style.display = 'none';
        const successMessage = document.getElementById('newsletter-success');
        if (successMessage) {
            successMessage.style.display = 'block';
        }
    });
}

/**
 * Inicializa botões de compartilhamento
 */
function initShareButtons() {
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('share-btn') || e.target.closest('.share-btn')) {
            const btn = e.target.classList.contains('share-btn') ? e.target : e.target.closest('.share-btn');
            const shareType = btn.getAttribute('data-share');
            const url = window.location.href;
            const title = document.title;

            switch (shareType) {
                case 'facebook':
                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
                    break;
                case 'twitter':
                    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
                    break;
                case 'linkedin':
                    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`, '_blank');
                    break;
                case 'whatsapp':
                    window.open(`https://wa.me/?text=${title} ${url}`, '_blank');
                    break;
                case 'copy':
                    navigator.clipboard.writeText(url).then(() => {
                        alert('Link copiado para a área de transferência!');
                    });
                    break;
            }
        }
    });
}

// ===========================================
// 11. PAINEL ADMINISTRATIVO (admin.html)
// ===========================================

/**
 * Inicializa login administrativo
 */
function initAdminLogin() {
    const form = document.getElementById('admin-login-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('admin-username').value.trim();
        const password = document.getElementById('admin-password').value;

        const credentials = JSON.parse(localStorage.getItem('adminCredentials'));

        if (username === credentials.username && password === credentials.password) {
            // Login bem-sucedido
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminUsername', username);
            showAdminDashboard();
        } else {
            const errorDiv = document.getElementById('login-error');
            if (errorDiv) {
                errorDiv.textContent = 'Usuário ou senha inválidos';
                errorDiv.style.display = 'block';
            }
        }
    });

    // Verifica se já está logado
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        showAdminDashboard();
    }
}

/**
 * Mostra dashboard administrativo
 */
function showAdminDashboard() {
    const loginScreen = document.getElementById('login-screen');
    const dashboard = document.getElementById('admin-dashboard');

    if (loginScreen) loginScreen.style.display = 'none';
    if (dashboard) {
        dashboard.style.display = 'block';
        loadAdminDashboard();
    }
}

/**
 * Carrega dados do dashboard
 */
function loadAdminDashboard() {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
    const donations = JSON.parse(localStorage.getItem('donations') || '[]');
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');

    // Atualiza estatísticas
    document.getElementById('dash-projects').textContent = projects.length;
    document.getElementById('dash-volunteers').textContent = volunteers.length;

    // Soma total de doações do mês atual
    const currentMonth = new Date().getMonth();
    const monthlyDonations = donations
        .filter(d => new Date(d.date).getMonth() === currentMonth)
        .reduce((sum, d) => sum + d.amount, 0);
    document.getElementById('dash-donations').textContent = formatCurrency(monthlyDonations);

    document.getElementById('dash-posts').textContent = posts.length;

    // Carrega nome do admin
    const username = localStorage.getItem('adminUsername');
    const userNameEl = document.getElementById('admin-user-name');
    if (userNameEl) userNameEl.textContent = username;
}

/**
 * Logout administrativo
 */
function initAdminLogout() {
    const logoutBtn = document.getElementById('admin-logout');
    if (!logoutBtn) return;

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        location.reload();
    });
}

/**
 * Navegação entre seções do admin
 */
function initAdminNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('.admin-section');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            const sectionId = link.getAttribute('data-section');

            // Atualiza links ativos
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Mostra seção correspondente
            sections.forEach(s => s.classList.remove('active'));
            const targetSection = document.getElementById(`section-${sectionId}`);
            if (targetSection) {
                targetSection.classList.add('active');

                // Carrega dados da seção
                switch (sectionId) {
                    case 'projects':
                        loadAdminProjects();
                        break;
                    case 'volunteers':
                        loadAdminVolunteers();
                        break;
                    case 'donations':
                        loadAdminDonations();
                        break;
                    case 'blog':
                        loadAdminBlog();
                        break;
                }
            }
        });
    });
}

/**
 * Carrega tabela de projetos no admin
 */
function loadAdminProjects() {
    const container = document.getElementById('projects-table');
    if (!container) return;

    const projects = JSON.parse(localStorage.getItem('projects') || '[]');

    container.innerHTML = `
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background-color: var(--color-gray-100);">
                    <th style="padding: 0.75rem; text-align: left;">Projeto</th>
                    <th style="padding: 0.75rem; text-align: left;">Categoria</th>
                    <th style="padding: 0.75rem; text-align: right;">Meta</th>
                    <th style="padding: 0.75rem; text-align: right;">Arrecadado</th>
                    <th style="padding: 0.75rem; text-align: center;">Status</th>
                </tr>
            </thead>
            <tbody>
                ${projects.map(p => `
                    <tr style="border-bottom: 1px solid var(--color-gray-200);">
                        <td style="padding: 0.75rem;">${p.title}</td>
                        <td style="padding: 0.75rem;">${getCategoryName(p.category)}</td>
                        <td style="padding: 0.75rem; text-align: right;">${formatCurrency(p.goal)}</td>
                        <td style="padding: 0.75rem; text-align: right;">${formatCurrency(p.raised)}</td>
                        <td style="padding: 0.75rem; text-align: center;">
                            <span style="padding: 0.25rem 0.5rem; background: var(--color-success); color: white; border-radius: 4px; font-size: 0.875rem;">
                                ${p.status}
                            </span>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

/**
 * Carrega tabela de voluntários no admin
 */
function loadAdminVolunteers() {
    const container = document.getElementById('volunteers-table');
    if (!container) return;

    const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');

    container.innerHTML = `
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background-color: var(--color-gray-100);">
                    <th style="padding: 0.75rem; text-align: left;">Nome</th>
                    <th style="padding: 0.75rem; text-align: left;">E-mail</th>
                    <th style="padding: 0.75rem; text-align: left;">Telefone</th>
                    <th style="padding: 0.75rem; text-align: left;">Data Cadastro</th>
                </tr>
            </thead>
            <tbody>
                ${volunteers.map(v => `
                    <tr style="border-bottom: 1px solid var(--color-gray-200);">
                        <td style="padding: 0.75rem;">${v.fullName}</td>
                        <td style="padding: 0.75rem;">${v.email}</td>
                        <td style="padding: 0.75rem;">${v.phone}</td>
                        <td style="padding: 0.75rem;">${formatDate(v.registrationDate)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

/**
 * Carrega tabela de doações no admin
 */
function loadAdminDonations() {
    const container = document.getElementById('donations-table');
    if (!container) return;

    const donations = JSON.parse(localStorage.getItem('donations') || '[]');

    container.innerHTML = `
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background-color: var(--color-gray-100);">
                    <th style="padding: 0.75rem; text-align: left;">Doador</th>
                    <th style="padding: 0.75rem; text-align: right;">Valor</th>
                    <th style="padding: 0.75rem; text-align: left;">Tipo</th>
                    <th style="padding: 0.75rem; text-align: left;">Data</th>
                </tr>
            </thead>
            <tbody>
                ${donations.map(d => `
                    <tr style="border-bottom: 1px solid var(--color-gray-200);">
                        <td style="padding: 0.75rem;">${d.donor.name}</td>
                        <td style="padding: 0.75rem; text-align: right;">${formatCurrency(d.amount)}</td>
                        <td style="padding: 0.75rem;">${d.type === 'single' ? 'Única' : 'Mensal'}</td>
                        <td style="padding: 0.75rem;">${formatDate(d.date)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

/**
 * Carrega tabela de blog no admin
 */
function loadAdminBlog() {
    const container = document.getElementById('blog-table');
    if (!container) return;

    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');

    container.innerHTML = `
        <table style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr style="background-color: var(--color-gray-100);">
                    <th style="padding: 0.75rem; text-align: left;">Título</th>
                    <th style="padding: 0.75rem; text-align: left;">Categoria</th>
                    <th style="padding: 0.75rem; text-align: left;">Autor</th>
                    <th style="padding: 0.75rem; text-align: left;">Data</th>
                </tr>
            </thead>
            <tbody>
                ${posts.map(p => `
                    <tr style="border-bottom: 1px solid var(--color-gray-200);">
                        <td style="padding: 0.75rem;">${p.title}</td>
                        <td style="padding: 0.75rem;">${p.category}</td>
                        <td style="padding: 0.75rem;">${p.author}</td>
                        <td style="padding: 0.75rem;">${formatDate(p.date)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// ===========================================
// 12. INICIALIZAÇÃO GLOBAL
// ===========================================

/**
 * Função principal executada quando o DOM está pronto
 */
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa LocalStorage com dados mock
    initializeLocalStorage();

    // Funcionalidades globais (todas as páginas)
    initMobileMenu();
    initScrollAnimations();
    initModals();
    initShareButtons();

    // Detecta página atual e inicializa funcionalidades específicas
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    switch (currentPage) {
        case 'index.html':
        case '':
            loadFeaturedProjects();
            break;

        case 'projetos.html':
            initProjectFilters();
            break;

        case 'voluntariado.html':
            initVolunteerForm();
            initOpportunityFilters();
            break;

        case 'doacoes.html':
            loadCampaigns();
            initQuickAmounts();
            initDonationForm();
            break;

        case 'blog.html':
            initBlogFilters();
            initNewsletterForm();
            break;

        case 'admin.html':
            initAdminLogin();
            initAdminLogout();
            initAdminNavigation();
            break;
    }

    console.log('✅ Plataforma ONG inicializada com sucesso!');
});

// Expõe funções globais para serem chamadas inline do HTML
window.showProjectDetails = showProjectDetails;
window.showPostDetails = showPostDetails;
window.scrollToForm = scrollToForm;
window.openDonationModal = openDonationModal;
