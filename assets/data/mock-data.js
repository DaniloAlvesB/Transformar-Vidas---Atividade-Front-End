/*
==============================================
MOCK DATA - Dados de Exemplo
==============================================

Dados iniciais para popular o LocalStorage
Simula um banco de dados para a aplicação

==============================================
*/

const mockData = {
    projects: [
        {
            id: 1,
            title: 'Educação para Todos',
            category: 'educacao',
            description: 'Programa de reforço escolar e alfabetização para crianças em situação de vulnerabilidade social.',
            longDescription: 'Este projeto oferece aulas de reforço, material escolar e acompanhamento pedagógico para mais de 200 crianças da comunidade. Com professores voluntários qualificados, proporcionamos um ambiente de aprendizado acolhedor onde cada criança pode desenvolver seu potencial máximo.',
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
            longDescription: 'Através da arte, jovens descobrem talentos, desenvolvem autoestima e constroem perspectivas de futuro. Oferecemos oficinas gratuitas de música, teatro, dança e artes visuais, ministradas por profissionais experientes.',
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
            longDescription: 'Garantimos alimentação digna para 500 famílias mensalmente, além de orientação nutricional. Nosso programa vai além da distribuição de alimentos, oferecendo também educação alimentar e nutricional.',
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
            longDescription: 'A horta não só produz alimentos saudáveis, mas também ensina práticas sustentáveis e gera renda. Participantes aprendem técnicas de agricultura orgânica, compostagem e economia circular.',
            goal: 25000,
            raised: 18000,
            image: '🌱',
            status: 'active',
            startDate: '2024-03-10',
            beneficiaries: 80
        }
    ],

    opportunities: [
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
        },
        {
            id: 5,
            title: 'Cozinheiro(a) Voluntário',
            area: 'assistencia',
            description: 'Preparar refeições para o programa Alimentação Solidária.',
            requirements: 'Experiência em cozinha',
            time: 'manha',
            hours: '5 horas/semana',
            vacancies: 2
        }
    ],

    blogPosts: [
        {
            id: 1,
            title: 'ONG Transformar Vidas completa 8 anos de atuação',
            category: 'noticias',
            excerpt: 'Celebramos 8 anos transformando vidas e construindo um futuro melhor para nossa comunidade.',
            content: `Nestes 8 anos de história, a ONG Transformar Vidas já impactou mais de 15 mil pessoas através de seus diversos projetos sociais. Nossa jornada começou com um pequeno grupo de voluntários e hoje somos uma equipe de mais de 320 pessoas dedicadas a transformar a realidade de comunidades vulneráveis.\n\nDesde o início, nosso foco tem sido promover mudanças reais e sustentáveis. Através de projetos nas áreas de educação, cultura, assistência social e meio ambiente, temos construído pontes de esperança e oportunidades.\n\nO caminho não foi fácil, mas cada desafio superado nos fortaleceu. Hoje, temos orgulho de celebrar não apenas nossos anos de existência, mas principalmente as vidas transformadas, os sonhos realizados e o futuro que estamos ajudando a construir.`,
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
            content: `João Silva, 18 anos, começou a frequentar nossas aulas de reforço há 5 anos. Hoje, ele foi aprovado em Engenharia na USP, uma das universidades mais concorridas do Brasil.\n\n"Eu não acreditava que conseguiria. Vinha de uma escola pública com muitas dificuldades, mas os professores voluntários da ONG nunca desistiram de mim", conta João emocionado.\n\nSua história é a prova viva de que a educação transforma. João não apenas passou no vestibular, mas também se tornou voluntário da ONG, ajudando outros jovens a trilharem o mesmo caminho de sucesso.`,
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
            content: `A campanha "Solidariedade na Mesa" superou todas as expectativas. Foram arrecadadas 5 toneladas de alimentos não perecíveis que beneficiarão mais de 500 famílias nos próximos meses.\n\nA mobilização foi impressionante. Empresas, escolas e pessoas físicas se uniram nesta corrente do bem. Os alimentos já estão sendo distribuídos para as famílias cadastradas em nossos programas.\n\n"Ver a solidariedade das pessoas nos dá esperança e força para continuar. Cada quilo doado representa amor e cuidado com o próximo", afirma Pedro Costa, diretor financeiro da ONG.`,
            author: 'Pedro Costa',
            date: '2025-01-05',
            featured: false,
            image: '🍱'
        },
        {
            id: 4,
            title: 'Nova parceria amplia atendimento na área da saúde',
            category: 'noticias',
            excerpt: 'Acordo com clínica médica possibilita consultas gratuitas para beneficiários.',
            content: `A ONG Transformar Vidas firmou parceria com a Clínica Saúde para Todos, que oferecerá consultas médicas gratuitas para os beneficiários de nossos projetos.\n\nA parceria contempla consultas nas áreas de clínica geral, pediatria e ginecologia, além de exames básicos. O atendimento já está disponível mediante agendamento.\n\nEsta é mais uma ação que reforça nosso compromisso com o bem-estar integral das comunidades que atendemos.`,
            author: 'Maria Rodrigues',
            date: '2025-01-03',
            featured: false,
            image: '🏥'
        }
    ],

    campaigns: [
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
    ],

    adminCredentials: {
        username: 'admin',
        password: 'admin123'
    }
};

/**
 * Inicializa o LocalStorage com dados mock se não existirem
 */
function initializeLocalStorage() {
    // Projetos
    if (!localStorage.getItem('projects')) {
        localStorage.setItem('projects', JSON.stringify(mockData.projects));
    }

    // Oportunidades de voluntariado
    if (!localStorage.getItem('opportunities')) {
        localStorage.setItem('opportunities', JSON.stringify(mockData.opportunities));
    }

    // Posts do blog
    if (!localStorage.getItem('blogPosts')) {
        localStorage.setItem('blogPosts', JSON.stringify(mockData.blogPosts));
    }

    // Campanhas de doação
    if (!localStorage.getItem('campaigns')) {
        localStorage.setItem('campaigns', JSON.stringify(mockData.campaigns));
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
        localStorage.setItem('adminCredentials', JSON.stringify(mockData.adminCredentials));
    }
}
