/*
==============================================
PAGES - Templates das Páginas (SPA)
==============================================

Templates JavaScript para cada página da aplicação
Sistema de componentes reutilizáveis

==============================================
*/

// Utilitários reutilizáveis
const utils = {
    formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    },

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    },

    calculatePercentage(current, total) {
        if (total === 0) return 0;
        return Math.min(Math.round((current / total) * 100), 100);
    },

    getCategoryName(category) {
        const categories = {
            'educacao': 'Educação',
            'cultura': 'Cultura',
            'assistencia': 'Assistência Social',
            'meio-ambiente': 'Meio Ambiente',
            'saude': 'Saúde',
            'administrativo': 'Administrativo',
            'comunicacao': 'Comunicação'
        };
        return categories[category] || category;
    },

    getTimeName(time) {
        const times = {
            'manha': 'Manhã',
            'tarde': 'Tarde',
            'noite': 'Noite',
            'fim-de-semana': 'Fim de Semana'
        };
        return times[time] || time;
    }
};

// ==========================================
// HOME PAGE
// ==========================================
const homePage = () => {
    return `
        <!-- Hero Section -->
        <section class="hero" aria-labelledby="hero-title">
            <div class="container">
                <div class="hero-content">
                    <h1 id="hero-title">Transformando vidas através da solidariedade</h1>
                    <p class="hero-subtitle">Juntos podemos construir um futuro melhor para comunidades em situação de vulnerabilidade social</p>
                    <div class="hero-actions">
                        <a href="#/voluntariado" class="btn btn-primary">Seja Voluntário</a>
                        <a href="#/doacoes" class="btn btn-secondary">Faça uma Doação</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Missão, Visão e Valores -->
        <section class="mission-section" aria-labelledby="mission-title">
            <div class="container">
                <h2 id="mission-title" class="section-title">Nossa Essência</h2>
                <div class="cards-grid">
                    <article class="card">
                        <div class="card-icon" aria-hidden="true">🎯</div>
                        <h3>Missão</h3>
                        <p>Promover a transformação social através de projetos educacionais, culturais e de assistência, garantindo dignidade e oportunidades para comunidades em vulnerabilidade.</p>
                    </article>
                    <article class="card">
                        <div class="card-icon" aria-hidden="true">👁️</div>
                        <h3>Visão</h3>
                        <p>Ser referência nacional em projetos sociais inovadores, reconhecida pela transparência, eficiência e impacto positivo nas vidas transformadas.</p>
                    </article>
                    <article class="card">
                        <div class="card-icon" aria-hidden="true">💎</div>
                        <h3>Valores</h3>
                        <ul class="values-list">
                            <li>Transparência e ética</li>
                            <li>Respeito à diversidade</li>
                            <li>Compromisso social</li>
                            <li>Sustentabilidade</li>
                        </ul>
                    </article>
                </div>
            </div>
        </section>

        <!-- Estatísticas -->
        <section class="stats-section" aria-labelledby="stats-title">
            <div class="container">
                <h2 id="stats-title" class="section-title">Nosso Impacto</h2>
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-number" data-target="15000">0</span>
                        <span class="stat-label">Vidas Impactadas</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number" data-target="42">0</span>
                        <span class="stat-label">Projetos Ativos</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number" data-target="320">0</span>
                        <span class="stat-label">Voluntários</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number" data-target="8">0</span>
                        <span class="stat-label">Anos de Atuação</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Projetos em Destaque -->
        <section class="featured-projects" aria-labelledby="projects-title">
            <div class="container">
                <h2 id="projects-title" class="section-title">Projetos em Destaque</h2>
                <p class="section-subtitle">Conheça algumas de nossas iniciativas que estão transformando vidas</p>
                <div class="projects-grid" id="featured-projects-list"></div>
                <div class="section-cta">
                    <a href="#/projetos" class="btn btn-primary">Ver Todos os Projetos</a>
                </div>
            </div>
        </section>

        <!-- Nossa Equipe -->
        <section class="team-section" aria-labelledby="team-title">
            <div class="container">
                <h2 id="team-title" class="section-title">Nossa Equipe</h2>
                <p class="section-subtitle">Pessoas dedicadas a fazer a diferença</p>
                <div class="team-grid">
                    <article class="team-member">
                        <div class="member-photo" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                            <span class="member-initial">MR</span>
                        </div>
                        <h3>Maria Rodrigues</h3>
                        <p class="member-role">Diretora Executiva</p>
                        <p class="member-bio">15 anos de experiência em gestão de ONGs</p>
                    </article>
                    <article class="team-member">
                        <div class="member-photo" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
                            <span class="member-initial">JS</span>
                        </div>
                        <h3>João Silva</h3>
                        <p class="member-role">Coordenador de Projetos</p>
                        <p class="member-bio">Especialista em desenvolvimento social</p>
                    </article>
                    <article class="team-member">
                        <div class="member-photo" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
                            <span class="member-initial">AS</span>
                        </div>
                        <h3>Ana Santos</h3>
                        <p class="member-role">Gerente de Voluntários</p>
                        <p class="member-bio">Psicóloga social e mobilizadora comunitária</p>
                    </article>
                    <article class="team-member">
                        <div class="member-photo" style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);">
                            <span class="member-initial">PC</span>
                        </div>
                        <h3>Pedro Costa</h3>
                        <p class="member-role">Diretor Financeiro</p>
                        <p class="member-bio">Contador e especialista em captação de recursos</p>
                    </article>
                </div>
            </div>
        </section>

        <!-- Call to Action -->
        <section class="cta-section" aria-labelledby="cta-title">
            <div class="container">
                <h2 id="cta-title">Faça Parte dessa Transformação</h2>
                <p>Sua contribuição pode mudar vidas. Seja através de voluntariado, doações ou compartilhando nosso trabalho.</p>
                <div class="cta-buttons">
                    <a href="#/voluntariado" class="btn btn-primary">Quero Ser Voluntário</a>
                    <a href="#/doacoes" class="btn btn-secondary">Quero Doar</a>
                </div>
            </div>
        </section>
    `;
};

// ==========================================
// PROJETOS PAGE
// ==========================================
const projetosPage = () => {
    return `
        <!-- Page Header -->
        <section class="page-header" aria-labelledby="page-title">
            <div class="container">
                <h1 id="page-title">Nossos Projetos</h1>
                <p class="page-subtitle">Iniciativas que transformam realidades e constroem futuros melhores</p>
            </div>
        </section>

        <!-- Filtros -->
        <section class="filters-section" aria-labelledby="filters-title">
            <div class="container">
                <h2 id="filters-title" class="visually-hidden">Filtros de projetos</h2>
                <div class="filters">
                    <button class="filter-btn active" data-filter="all" aria-pressed="true">Todos</button>
                    <button class="filter-btn" data-filter="educacao" aria-pressed="false">Educação</button>
                    <button class="filter-btn" data-filter="cultura" aria-pressed="false">Cultura</button>
                    <button class="filter-btn" data-filter="assistencia" aria-pressed="false">Assistência Social</button>
                    <button class="filter-btn" data-filter="meio-ambiente" aria-pressed="false">Meio Ambiente</button>
                </div>
                <div class="search-box">
                    <label for="project-search" class="visually-hidden">Buscar projetos</label>
                    <input type="search" id="project-search" placeholder="Buscar projetos..." aria-label="Campo de busca de projetos">
                </div>
            </div>
        </section>

        <!-- Lista de Projetos -->
        <section class="projects-list-section" aria-labelledby="projects-list-title">
            <div class="container">
                <h2 id="projects-list-title" class="visually-hidden">Lista de projetos</h2>
                <div class="projects-grid" id="projects-list"></div>
                <div id="no-projects" class="no-results" style="display: none;">
                    <p>Nenhum projeto encontrado com os filtros selecionados.</p>
                </div>
            </div>
        </section>

        <!-- Modal de Detalhes do Projeto -->
        <div id="project-modal" class="modal" role="dialog" aria-labelledby="modal-title" aria-hidden="true">
            <div class="modal-overlay" data-close-modal></div>
            <div class="modal-content">
                <button class="modal-close" data-close-modal aria-label="Fechar modal">&times;</button>
                <div id="modal-project-content"></div>
            </div>
        </div>
    `;
};

// ==========================================
// VOLUNTARIADO PAGE
// ==========================================
const voluntariadoPage = () => {
    return `
        <!-- Page Header -->
        <section class="page-header" aria-labelledby="page-title">
            <div class="container">
                <h1 id="page-title">Voluntariado</h1>
                <p class="page-subtitle">Doe seu tempo e talento para transformar vidas</p>
            </div>
        </section>

        <!-- Benefícios do Voluntariado -->
        <section class="benefits-section">
            <div class="container">
                <h2 class="section-title">Por que ser voluntário?</h2>
                <div class="benefits-grid">
                    <div class="benefit-card">
                        <div class="benefit-icon">❤️</div>
                        <h3>Transforme Vidas</h3>
                        <p>Faça a diferença na vida de pessoas e comunidades</p>
                    </div>
                    <div class="benefit-card">
                        <div class="benefit-icon">🌟</div>
                        <h3>Desenvolva Habilidades</h3>
                        <p>Aprenda novas competências e ganhe experiência</p>
                    </div>
                    <div class="benefit-card">
                        <div class="benefit-icon">🤝</div>
                        <h3>Faça Networking</h3>
                        <p>Conheça pessoas inspiradoras e comprometidas</p>
                    </div>
                    <div class="benefit-card">
                        <div class="benefit-icon">🎯</div>
                        <h3>Encontre Propósito</h3>
                        <p>Contribua para um mundo melhor e mais justo</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Filtros de Oportunidades -->
        <section class="filters-section">
            <div class="container">
                <h2 class="section-title">Oportunidades de Voluntariado</h2>
                <div class="opportunity-filters">
                    <div class="filter-group">
                        <label for="area-filter">Área:</label>
                        <select id="area-filter">
                            <option value="all">Todas as áreas</option>
                            <option value="educacao">Educação</option>
                            <option value="cultura">Cultura</option>
                            <option value="assistencia">Assistência Social</option>
                            <option value="administrativo">Administrativo</option>
                            <option value="comunicacao">Comunicação</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label for="time-filter">Horário:</label>
                        <select id="time-filter">
                            <option value="all">Todos os horários</option>
                            <option value="manha">Manhã</option>
                            <option value="tarde">Tarde</option>
                            <option value="noite">Noite</option>
                            <option value="fim-de-semana">Fim de Semana</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>

        <!-- Lista de Oportunidades -->
        <section class="opportunities-section">
            <div class="container">
                <div id="opportunities-list" class="opportunities-grid"></div>
            </div>
        </section>

        <!-- Formulário de Cadastro -->
        <section class="volunteer-form-section" id="volunteer-form-section">
            <div class="container">
                <h2 class="section-title">Cadastre-se como Voluntário</h2>
                <p class="section-subtitle">Preencha o formulário abaixo e entraremos em contato</p>

                <form id="volunteer-form" class="volunteer-form" novalidate>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="full-name">Nome Completo *</label>
                            <input type="text" id="full-name" name="full-name" required data-validate="required,minLength:3">
                        </div>
                        <div class="form-group">
                            <label for="email">E-mail *</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="cpf">CPF *</label>
                            <input type="text" id="cpf" name="cpf" required data-validate="cpf" data-mask="cpf" placeholder="000.000.000-00">
                        </div>
                        <div class="form-group">
                            <label for="phone">Telefone *</label>
                            <input type="tel" id="phone" name="phone" required data-validate="phone" data-mask="phone" placeholder="(00) 00000-0000">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="birth-date">Data de Nascimento *</label>
                            <input type="date" id="birth-date" name="birth-date" required>
                        </div>
                        <div class="form-group">
                            <label for="area-interest">Área de Interesse *</label>
                            <select id="area-interest" name="area-interest" required>
                                <option value="">Selecione...</option>
                                <option value="educacao">Educação</option>
                                <option value="cultura">Cultura</option>
                                <option value="assistencia">Assistência Social</option>
                                <option value="administrativo">Administrativo</option>
                                <option value="comunicacao">Comunicação</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="availability">Disponibilidade *</label>
                        <select id="availability" name="availability" required>
                            <option value="">Selecione...</option>
                            <option value="manha">Manhã</option>
                            <option value="tarde">Tarde</option>
                            <option value="noite">Noite</option>
                            <option value="fim-de-semana">Fim de Semana</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="experience">Experiência e Habilidades</label>
                        <textarea id="experience" name="experience" rows="4" placeholder="Conte-nos sobre suas habilidades e experiências relevantes..."></textarea>
                    </div>

                    <div class="form-group">
                        <label for="motivation">Por que deseja ser voluntário? *</label>
                        <textarea id="motivation" name="motivation" rows="4" required data-validate="required,minLength:20" placeholder="Compartilhe sua motivação..."></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary btn-lg">Enviar Cadastro</button>
                </form>
            </div>
        </section>
    `;
};

// Exporta as páginas
window.pages = {
    home: homePage,
    projetos: projetosPage,
    voluntariado: voluntariadoPage,
    utils: utils
};
