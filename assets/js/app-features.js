/*
==============================================
APP FEATURES - Funcionalidades Adicionais
==============================================

Funcionalidades de Doações, Blog e Admin

==============================================
*/

// ==========================================
// DOAÇÕES PAGE
// ==========================================

window.initDoacoesPage = function() {
    loadCampaigns();
    initDonationButtons();
    initDonationForm();
};

function loadCampaigns() {
    const container = document.getElementById('campaigns-list');
    if (!container) return;

    const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');

    container.innerHTML = campaigns.map(campaign => `
        <div class="campaign-card">
            <div class="campaign-icon">${campaign.image}</div>
            <h3>${campaign.title}</h3>
            <p>${campaign.description}</p>
            <div class="campaign-progress">
                <div class="progress-info">
                    <span>${pages.utils.formatCurrency(campaign.raised)}</span>
                    <span>${pages.utils.calculatePercentage(campaign.raised, campaign.goal)}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${pages.utils.calculatePercentage(campaign.raised, campaign.goal)}%"></div>
                </div>
                <p class="progress-goal">Meta: ${pages.utils.formatCurrency(campaign.goal)}</p>
                <p class="campaign-deadline">Prazo: ${pages.utils.formatDate(campaign.deadline)}</p>
            </div>
            <button class="btn btn-primary" onclick="openDonationModal('unica', 50)">Doar Agora</button>
        </div>
    `).join('');
}

function initDonationButtons() {
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const amount = parseFloat(btn.getAttribute('data-amount'));
            const type = btn.getAttribute('data-type');
            openDonationModal(type, amount);
        });
    });
}

window.openDonationModal = function(type, suggestedAmount = null) {
    const modal = document.getElementById('donation-modal');
    if (!modal) return;

    const typeSelect = modal.querySelector('#donation-type');
    const amountInput = modal.querySelector('#donation-amount');

    if (typeSelect) {
        typeSelect.value = type;
    }

    if (amountInput && suggestedAmount && suggestedAmount > 0) {
        amountInput.value = suggestedAmount;
    }

    openModal('donation-modal');
};

function initDonationForm() {
    const form = document.getElementById('donation-form');
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
            amount: parseFloat(document.getElementById('donation-amount').value),
            type: document.getElementById('donation-type').value,
            name: document.getElementById('donor-name').value.trim(),
            email: document.getElementById('donor-email').value.trim(),
            cpf: document.getElementById('donor-cpf').value.trim(),
            phone: document.getElementById('donor-phone').value.trim(),
            anonymous: document.getElementById('anonymous').checked,
            date: new Date().toISOString()
        };

        const donations = JSON.parse(localStorage.getItem('donations') || '[]');
        donations.push(formData);
        localStorage.setItem('donations', JSON.stringify(donations));

        alert(`Doação de ${pages.utils.formatCurrency(formData.amount)} realizada com sucesso! Obrigado por sua generosidade.`);
        form.reset();
        closeModal('donation-modal');
    });
}

// ==========================================
// BLOG PAGE
// ==========================================

window.initBlogPage = function() {
    loadFeaturedPost();
    loadBlogPosts();
    initBlogFilters();
    initNewsletterForm();
};

function loadFeaturedPost() {
    const container = document.getElementById('featured-post');
    if (!container) return;

    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const featured = posts.find(p => p.featured);

    if (!featured) return;

    container.innerHTML = `
        <article class="featured-post-card">
            <div class="featured-post-icon">${featured.image}</div>
            <div class="featured-post-content">
                <span class="post-category">${featured.category}</span>
                <h2>${featured.title}</h2>
                <p class="post-meta">Por ${featured.author} em ${pages.utils.formatDate(featured.date)}</p>
                <p class="post-excerpt">${featured.excerpt}</p>
                <button class="btn btn-primary" onclick="showPostDetails(${featured.id})">Ler Mais</button>
            </div>
        </article>
    `;
}

function loadBlogPosts(category = 'all', searchTerm = '') {
    const container = document.getElementById('blog-posts');
    if (!container) return;

    let posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    posts = posts.filter(p => !p.featured); // Exclui o featured

    if (category !== 'all') {
        posts = posts.filter(p => p.category === category);
    }

    if (searchTerm) {
        posts = posts.filter(p =>
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    container.innerHTML = posts.map(post => `
        <article class="blog-post-card">
            <div class="post-icon">${post.image}</div>
            <span class="post-category">${post.category}</span>
            <h3>${post.title}</h3>
            <p class="post-meta">Por ${post.author} em ${pages.utils.formatDate(post.date)}</p>
            <p>${post.excerpt}</p>
            <button class="btn btn-secondary" onclick="showPostDetails(${post.id})">Ler Mais</button>
        </article>
    `).join('');
}

function initBlogFilters() {
    const filterBtns = document.querySelectorAll('.blog-filters .filter-btn');
    const searchInput = document.getElementById('blog-search');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');
            const searchTerm = searchInput ? searchInput.value : '';
            loadBlogPosts(category, searchTerm);
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const activeFilter = document.querySelector('.blog-filters .filter-btn.active');
            const category = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
            loadBlogPosts(category, e.target.value);
        });
    }
}

window.showPostDetails = function(postId) {
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');
    const post = posts.find(p => p.id === postId);

    if (!post) return;

    const modalContent = document.getElementById('modal-post-content');
    if (!modalContent) return;

    modalContent.innerHTML = `
        <article class="post-detail">
            <div class="post-detail-header">
                <span class="post-icon-large">${post.image}</span>
                <span class="post-category">${post.category}</span>
                <h2>${post.title}</h2>
                <p class="post-meta">Por ${post.author} em ${pages.utils.formatDate(post.date)}</p>
            </div>
            <div class="post-detail-content">
                <p>${post.content.replace(/\n/g, '</p><p>')}</p>
            </div>
            <div class="post-share">
                <strong>Compartilhar:</strong>
                <button class="btn btn-secondary btn-sm">Facebook</button>
                <button class="btn btn-secondary btn-sm">Twitter</button>
                <button class="btn btn-secondary btn-sm">LinkedIn</button>
            </div>
        </article>
    `;

    openModal('post-modal');
};

function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('newsletter-email').value.trim();

        if (!formValidator.validators.email.call(formValidator, email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        alert('Obrigado por se inscrever em nossa newsletter!');
        form.reset();
    });
}

// ==========================================
// ADMIN PAGE
// ==========================================

let isAdminLoggedIn = false;

window.initAdminPage = function() {
    initAdminLogin();
    initAdminLogout();
    initAdminNavigation();
};

function initAdminLogin() {
    const form = document.getElementById('admin-login-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = document.getElementById('admin-username').value.trim();
        const password = document.getElementById('admin-password').value;

        const credentials = JSON.parse(localStorage.getItem('adminCredentials') || '{}');

        if (username === credentials.username && password === credentials.password) {
            isAdminLoggedIn = true;
            showAdminDashboard();
        } else {
            alert('Usuário ou senha incorretos!');
        }
    });
}

function showAdminDashboard() {
    document.getElementById('admin-login-section').style.display = 'none';
    document.getElementById('admin-dashboard-section').style.display = 'block';
    loadAdminDashboard();
}

function loadAdminDashboard() {
    const statsContainer = document.getElementById('admin-stats');
    if (!statsContainer) return;

    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');
    const donations = JSON.parse(localStorage.getItem('donations') || '[]');
    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');

    const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);

    statsContainer.innerHTML = `
        <div class="admin-stat-card">
            <h3>${projects.length}</h3>
            <p>Projetos Ativos</p>
        </div>
        <div class="admin-stat-card">
            <h3>${volunteers.length}</h3>
            <p>Voluntários Cadastrados</p>
        </div>
        <div class="admin-stat-card">
            <h3>${donations.length}</h3>
            <p>Doações Recebidas</p>
        </div>
        <div class="admin-stat-card">
            <h3>${pages.utils.formatCurrency(totalDonations)}</h3>
            <p>Total Arrecadado</p>
        </div>
    `;
}

function initAdminLogout() {
    const logoutBtn = document.getElementById('admin-logout-btn');
    if (!logoutBtn) return;

    logoutBtn.addEventListener('click', () => {
        isAdminLoggedIn = false;
        document.getElementById('admin-dashboard-section').style.display = 'none';
        document.getElementById('admin-login-section').style.display = 'block';
        document.getElementById('admin-login-form').reset();
    });
}

function initAdminNavigation() {
    const navBtns = document.querySelectorAll('.admin-nav-btn');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.getAttribute('data-section');

            // Atualiza botões ativos
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Esconde todas as seções
            document.querySelectorAll('.admin-content').forEach(content => {
                content.classList.remove('active');
            });

            // Mostra seção selecionada
            const selectedContent = document.getElementById(`admin-content-${section}`);
            if (selectedContent) {
                selectedContent.classList.add('active');

                // Carrega dados específicos
                switch (section) {
                    case 'dashboard':
                        loadAdminDashboard();
                        break;
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

function loadAdminProjects() {
    const container = document.getElementById('admin-projects-list');
    if (!container) return;

    const projects = JSON.parse(localStorage.getItem('projects') || '[]');

    container.innerHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Projeto</th>
                    <th>Categoria</th>
                    <th>Meta</th>
                    <th>Arrecadado</th>
                    <th>Progresso</th>
                </tr>
            </thead>
            <tbody>
                ${projects.map(p => `
                    <tr>
                        <td>${p.title}</td>
                        <td>${pages.utils.getCategoryName(p.category)}</td>
                        <td>${pages.utils.formatCurrency(p.goal)}</td>
                        <td>${pages.utils.formatCurrency(p.raised)}</td>
                        <td>${pages.utils.calculatePercentage(p.raised, p.goal)}%</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function loadAdminVolunteers() {
    const container = document.getElementById('admin-volunteers-list');
    if (!container) return;

    const volunteers = JSON.parse(localStorage.getItem('volunteers') || '[]');

    if (volunteers.length === 0) {
        container.innerHTML = '<p>Nenhum voluntário cadastrado ainda.</p>';
        return;
    }

    container.innerHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Área</th>
                    <th>Disponibilidade</th>
                    <th>Data Cadastro</th>
                </tr>
            </thead>
            <tbody>
                ${volunteers.map(v => `
                    <tr>
                        <td>${v.fullName}</td>
                        <td>${v.email}</td>
                        <td>${v.phone}</td>
                        <td>${pages.utils.getCategoryName(v.areaInterest)}</td>
                        <td>${pages.utils.getTimeName(v.availability)}</td>
                        <td>${pages.utils.formatDate(v.registeredAt)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function loadAdminDonations() {
    const container = document.getElementById('admin-donations-list');
    if (!container) return;

    const donations = JSON.parse(localStorage.getItem('donations') || '[]');

    if (donations.length === 0) {
        container.innerHTML = '<p>Nenhuma doação registrada ainda.</p>';
        return;
    }

    container.innerHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Doador</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                    <th>E-mail</th>
                </tr>
            </thead>
            <tbody>
                ${donations.map(d => `
                    <tr>
                        <td>${pages.utils.formatDate(d.date)}</td>
                        <td>${d.anonymous ? 'Anônimo' : d.name}</td>
                        <td>${d.type === 'unica' ? 'Única' : 'Recorrente'}</td>
                        <td>${pages.utils.formatCurrency(d.amount)}</td>
                        <td>${d.email}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function loadAdminBlog() {
    const container = document.getElementById('admin-blog-list');
    if (!container) return;

    const posts = JSON.parse(localStorage.getItem('blogPosts') || '[]');

    container.innerHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Categoria</th>
                    <th>Autor</th>
                    <th>Data</th>
                    <th>Destaque</th>
                </tr>
            </thead>
            <tbody>
                ${posts.map(p => `
                    <tr>
                        <td>${p.title}</td>
                        <td>${p.category}</td>
                        <td>${p.author}</td>
                        <td>${pages.utils.formatDate(p.date)}</td>
                        <td>${p.featured ? 'Sim' : 'Não'}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}
