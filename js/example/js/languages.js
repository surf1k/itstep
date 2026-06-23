const translations = {
    uk: {
        heroWelcome: 'Ласкаво просимо!',
        holdToEnter: 'Утримуйте, щоб увійти',
        devName: 'ym1co',
        devTitle: 'Веб-розробник',
        emailTitle: 'Електронна пошта',
        navAbout: 'Про мене',
        navProjects: 'Проекти',
        aboutTitle: 'Про мене',
        aboutText1: 'Привіт! Я розробник, який створює інноваційні веб-додатки та проекти.',
        aboutText2: 'На цій сторінці ви можете переглянути мою роботу та дізнатися більше про мої навички.',
        skillsTitle: 'Мої навички',
        coffeeConsumed: 'Випито кави',
        bugsSquashed: 'Виправлено багів',
        sysControl: 'Керування системою',
        pingBtn: 'Пінг',
        projectsTitle: 'Мої Проекти',
        technologiesUsed: 'Використані технології',
        projectDetailsTitle: 'Деталі проекту',
        backToPortfolio: 'Повернутися до портфоліо',
        filterAll: 'Всі',
        filterWeb: 'Веб',
        filterSoftware: 'Програми'
    },
    en: {
        heroWelcome: 'Welcome!',
        holdToEnter: 'Hold to Enter',
        devName: 'ym1co',
        devTitle: 'Web Developer',
        emailTitle: 'Email',
        navAbout: 'About',
        navProjects: 'Projects',
        aboutTitle: 'About Me',
        aboutText1: 'Hi! I\'m a developer who creates innovative web applications and projects.',
        aboutText2: 'On this page you can view my work and learn more about my skills.',
        skillsTitle: 'My Skills',
        coffeeConsumed: 'Coffee Consumed',
        bugsSquashed: 'Bugs Squashed',
        sysControl: 'System Control',
        pingBtn: 'Ping',
        projectsTitle: 'My Projects',
        technologiesUsed: 'Technologies Used',
        projectDetailsTitle: 'Project Details',
        backToPortfolio: 'Back to Portfolio',
        filterAll: 'All',
        filterWeb: 'Web',
        filterSoftware: 'Software'
    },
    ru: {
        heroWelcome: 'Добро пожаловать!',
        holdToEnter: 'Удерживайте для входа',
        devName: 'ym1co',
        devTitle: 'Веб-разработчик',
        emailTitle: 'Почта',
        navAbout: 'Обо мне',
        navProjects: 'Проекты',
        aboutTitle: 'Обо мне',
        aboutText1: 'Привет! Я разработчик, создающий инновационные веб-приложения и проекты.',
        aboutText2: 'На этой странице вы можете посмотреть мои работы и узнать больше о моих навыках.',
        skillsTitle: 'Мои навыки',
        coffeeConsumed: 'Выпито кофе',
        bugsSquashed: 'Исправлено багов',
        sysControl: 'Управление системой',
        pingBtn: 'Пинг',
        projectsTitle: 'Мои Проекты',
        technologiesUsed: 'Использованные технологии',
        projectDetailsTitle: 'Детали проекта',
        backToPortfolio: 'Вернуться к портфолио',
        filterAll: 'Все',
        filterWeb: 'Веб',
        filterSoftware: 'Программы'
    }
};

let currentLanguage = localStorage.getItem('portfolio_language') || 'uk';

function updatePageLanguage() {
    const t = translations[currentLanguage];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    // Update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.dataset.lang === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function switchLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('portfolio_language', lang);
    updatePageLanguage();
}

document.addEventListener('DOMContentLoaded', () => {
    updatePageLanguage();
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchLanguage(e.target.dataset.lang);
        });
    });
});
