/*
==============================================
PAGES PART 2 - Templates Adicionais
==============================================

Continuação dos templates (Doações, Blog, Admin)

==============================================
*/

// ==========================================
// DOAÇÕES PAGE
// ==========================================
const doacoesPage = () => {
    return `
        <!-- Page Header -->
        <section class="page-header" aria-labelledby="page-title">
            <div class="container">
                <h1 id="page-title">Faça uma Doação</h1>
                <p class="page-subtitle">Sua generosidade transforma vidas e constrói futuros</p>
            </div>
        </section>

        <!-- Opções de Doação -->
        <section class="donation-options-section">
            <div class="container">
                <h2 class="section-title">Como você deseja ajudar?</h2>
                <div class="donation-types">
                    <div class="donation-type-card">
                        <h3>Doação Única</h3>
                        <p>Faça uma contribuição pontual do valor que desejar</p>
                        <div class="quick-amounts">
                            <button class="amount-btn" data-amount="50" data-type="unica">R$ 50</button>
                            <button class="amount-btn" data-amount="100" data-type="unica">R$ 100</button>
                            <button class="amount-btn" data-amount="200" data-type="unica">R$ 200</button>
                            <button class="amount-btn" data-amount="0" data-type="unica">Outro valor</button>
                        </div>
                    </div>
                    <div class="donation-type-card featured">
                        <div class="badge">Mais impacto</div>
                        <h3>Doação Recorrente</h3>
                        <p>Contribua mensalmente e mantenha nossos projetos funcionando</p>
                        <div class="quick-amounts">
                            <button class="amount-btn" data-amount="30" data-type="recorrente">R$ 30/mês</button>
                            <button class="amount-btn" data-amount="50" data-type="recorrente">R$ 50/mês</button>
                            <button class="amount-btn" data-amount="100" data-type="recorrente">R$ 100/mês</button>
                            <button class="amount-btn" data-amount="0" data-type="recorrente">Outro valor</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Campanhas Ativas -->
        <section class="campaigns-section">
            <div class="container">
                <h2 class="section-title">Campanhas Ativas</h2>
                <p class="section-subtitle">Apoie nossas campanhas específicas</p>
                <div id="campaigns-list" class="campaigns-grid"></div>
            </div>
        </section>

        <!-- Impacto das Doações -->
        <section class="impact-section">
            <div class="container">
                <h2 class="section-title">Impacto das suas Doações</h2>
                <div class="impact-examples">
                    <div class="impact-item">
                        <span class="impact-value">R$ 50</span>
                        <p>Material escolar completo para 1 criança</p>
                    </div>
                    <div class="impact-item">
                        <span class="impact-value">R$ 100</span>
                        <p>Cesta básica para 1 família por 1 mês</p>
                    </div>
                    <div class="impact-item">
                        <span class="impact-value">R$ 200</span>
                        <p>Aulas de reforço para 1 criança por 1 mês</p>
                    </div>
                    <div class="impact-item">
                        <span class="impact-value">R$ 500</span>
                        <p>Instrumentos musicais para oficinas</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Transparência -->
        <section class="transparency-section">
            <div class="container">
                <h2 class="section-title">Transparência</h2>
                <p class="section-subtitle">Veja como utilizamos cada real doado</p>
                <div class="transparency-chart">
                    <div class="chart-item" style="--percentage: 70%">
                        <div class="chart-bar"></div>
                        <span class="chart-label">Projetos Sociais - 70%</span>
                    </div>
                    <div class="chart-item" style="--percentage: 20%">
                        <div class="chart-bar"></div>
                        <span class="chart-label">Gestão e Operação - 20%</span>
                    </div>
                    <div class="chart-item" style="--percentage: 10%">
                        <div class="chart-bar"></div>
                        <span class="chart-label">Captação de Recursos - 10%</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Modal de Doação -->
        <div id="donation-modal" class="modal" role="dialog" aria-labelledby="donation-modal-title" aria-hidden="true">
            <div class="modal-overlay" data-close-modal></div>
            <div class="modal-content">
                <button class="modal-close" data-close-modal aria-label="Fechar modal">&times;</button>
                <h2 id="donation-modal-title">Realizar Doação</h2>
                <form id="donation-form" class="donation-form" novalidate>
                    <div class="form-group">
                        <label for="donation-type">Tipo de Doação *</label>
                        <select id="donation-type" name="donation-type" required>
                            <option value="unica">Doação Única</option>
                            <option value="recorrente">Doação Recorrente (Mensal)</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="donation-amount">Valor (R$) *</label>
                        <input type="number" id="donation-amount" name="donation-amount" required min="5" step="0.01" data-validate="required,positiveNumber,minValue:5">
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="donor-name">Nome Completo *</label>
                            <input type="text" id="donor-name" name="donor-name" required data-validate="required,minLength:3">
                        </div>
                        <div class="form-group">
                            <label for="donor-email">E-mail *</label>
                            <input type="email" id="donor-email" name="donor-email" required>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="donor-cpf">CPF *</label>
                            <input type="text" id="donor-cpf" name="donor-cpf" required data-validate="cpf" data-mask="cpf" placeholder="000.000.000-00">
                        </div>
                        <div class="form-group">
                            <label for="donor-phone">Telefone *</label>
                            <input type="tel" id="donor-phone" name="donor-phone" required data-validate="phone" data-mask="phone" placeholder="(00) 00000-0000">
                        </div>
                    </div>

                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="anonymous" name="anonymous">
                            Quero doar anonimamente
                        </label>
                    </div>

                    <button type="submit" class="btn btn-primary btn-lg btn-block">Confirmar Doação</button>
                    <p class="form-note">* Campos obrigatórios</p>
                </form>
            </div>
        </div>
    `;
};

// ==========================================
// BLOG PAGE
// ==========================================
const blogPage = () => {
    return `
        <!-- Page Header -->
        <section class="page-header" aria-labelledby="page-title">
            <div class="container">
                <h1 id="page-title">Blog</h1>
                <p class="page-subtitle">Notícias, histórias e novidades da ONG</p>
            </div>
        </section>

        <!-- Post em Destaque -->
        <section class="featured-post-section">
            <div class="container" id="featured-post"></div>
        </section>

        <!-- Filtros -->
        <section class="filters-section">
            <div class="container">
                <div class="blog-filters">
                    <button class="filter-btn active" data-category="all">Todas</button>
                    <button class="filter-btn" data-category="noticias">Notícias</button>
                    <button class="filter-btn" data-category="historias">Histórias de Sucesso</button>
                    <button class="filter-btn" data-category="eventos">Eventos</button>
                </div>
                <div class="search-box">
                    <input type="search" id="blog-search" placeholder="Buscar posts...">
                </div>
            </div>
        </section>

        <!-- Lista de Posts -->
        <section class="blog-posts-section">
            <div class="container">
                <div id="blog-posts" class="blog-grid"></div>
            </div>
        </section>

        <!-- Newsletter -->
        <section class="newsletter-section">
            <div class="container">
                <h2 class="section-title">Receba Nossas Novidades</h2>
                <p class="section-subtitle">Inscreva-se em nossa newsletter</p>
                <form id="newsletter-form" class="newsletter-form" novalidate>
                    <div class="form-group-inline">
                        <input type="email" id="newsletter-email" placeholder="Seu e-mail" required>
                        <button type="submit" class="btn btn-primary">Inscrever</button>
                    </div>
                </form>
            </div>
        </section>

        <!-- Modal de Post -->
        <div id="post-modal" class="modal" role="dialog" aria-labelledby="post-modal-title" aria-hidden="true">
            <div class="modal-overlay" data-close-modal></div>
            <div class="modal-content modal-large">
                <button class="modal-close" data-close-modal aria-label="Fechar modal">&times;</button>
                <div id="modal-post-content"></div>
            </div>
        </div>
    `;
};

// ==========================================
// ADMIN PAGE
// ==========================================
const adminPage = () => {
    return `
        <!-- Login Section -->
        <section id="admin-login-section" class="admin-login-section">
            <div class="container">
                <div class="login-box">
                    <h1>Painel Administrativo</h1>
                    <p>Acesso restrito para administradores</p>
                    <form id="admin-login-form" novalidate>
                        <div class="form-group">
                            <label for="admin-username">Usuário</label>
                            <input type="text" id="admin-username" name="username" required autocomplete="username">
                        </div>
                        <div class="form-group">
                            <label for="admin-password">Senha</label>
                            <input type="password" id="admin-password" name="password" required autocomplete="current-password">
                        </div>
                        <button type="submit" class="btn btn-primary btn-block">Entrar</button>
                    </form>
                    <p class="login-hint">Dica: usuário: admin / senha: admin123</p>
                </div>
            </div>
        </section>

        <!-- Dashboard Section -->
        <section id="admin-dashboard-section" class="admin-dashboard-section" style="display: none;">
            <div class="container">
                <div class="admin-header">
                    <h1>Painel Administrativo</h1>
                    <button id="admin-logout-btn" class="btn btn-secondary">Sair</button>
                </div>

                <!-- Navegação do Admin -->
                <nav class="admin-nav">
                    <button class="admin-nav-btn active" data-section="dashboard">Dashboard</button>
                    <button class="admin-nav-btn" data-section="projects">Projetos</button>
                    <button class="admin-nav-btn" data-section="volunteers">Voluntários</button>
                    <button class="admin-nav-btn" data-section="donations">Doações</button>
                    <button class="admin-nav-btn" data-section="blog">Blog</button>
                </nav>

                <!-- Dashboard Overview -->
                <div id="admin-content-dashboard" class="admin-content active">
                    <h2>Visão Geral</h2>
                    <div class="admin-stats-grid" id="admin-stats"></div>
                </div>

                <!-- Projetos -->
                <div id="admin-content-projects" class="admin-content">
                    <h2>Gerenciar Projetos</h2>
                    <div id="admin-projects-list"></div>
                </div>

                <!-- Voluntários -->
                <div id="admin-content-volunteers" class="admin-content">
                    <h2>Voluntários Cadastrados</h2>
                    <div id="admin-volunteers-list"></div>
                </div>

                <!-- Doações -->
                <div id="admin-content-donations" class="admin-content">
                    <h2>Histórico de Doações</h2>
                    <div id="admin-donations-list"></div>
                </div>

                <!-- Blog -->
                <div id="admin-content-blog" class="admin-content">
                    <h2>Posts do Blog</h2>
                    <div id="admin-blog-list"></div>
                </div>
            </div>
        </section>
    `;
};

// Adiciona as páginas ao objeto global
if (window.pages) {
    window.pages.doacoes = doacoesPage;
    window.pages.blog = blogPage;
    window.pages.admin = adminPage;
} else {
    window.pages = {
        doacoes: doacoesPage,
        blog: blogPage,
        admin: adminPage
    };
}
