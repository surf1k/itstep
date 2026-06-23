// Projects Data
const defaultProjects = [
    {
        id: 1,
        title: 'Bermuda clinic',
        description: 'Course project for HTML/CSS. Full functional website created as a course project.',
        image: 'https://media.discordapp.net/attachments/1447331192419651665/1447331332223926413/image.png?ex=69373bd7&is=6935ea57&hm=4b61994192c772976431450d4d023a16c762b126cac2b37d9a9bfb36083049e4&=&format=webp&quality=lossless&width=1561&height=693',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Web'],
        details: 'Features responsive design, interactive elements, and modern UI/UX principles.'
    },
    {
        id: 2,
        title: 'Flichka',
        description: '1 page site to sell some stuff. Full completed site.',
        image: 'https://media.discordapp.net/attachments/1447331192419651665/1447333544157384780/image.png?ex=69373de7&is=6935ec67&hm=eee9cca8f8a9972876d7abdf3f92eb382843728dbc82f39632b1af3622d63d04&=&format=webp&quality=lossless&width=1520&height=693',
        technologies: ['HTML', 'CSS', 'Web'],
        details: 'Includes clean layout and optimized assets for quick loading times.'
    }
];

function renderProjects() {
    const projectsList = document.getElementById('projectsList');
    if (!projectsList) return;

    if (defaultProjects.length === 0) {
        projectsList.innerHTML = '<p>No projects available.</p>';
        return;
    }

    projectsList.innerHTML = defaultProjects.map((project) => `
        <div class="project-card" onclick="viewProjectDetails(${project.id})">
            <div class="project-image" style="background-image: url('${project.image}')"></div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-tech">${project.technologies.join(' • ')}</div>
                <p class="project-desc">${project.description}</p>
            </div>
        </div>
    `).join('');
}

function viewProjectDetails(id) {
    const project = defaultProjects.find(p => p.id === id);
    if (project) {
        document.getElementById('inlineDetailsTitle').textContent = project.title;
        document.getElementById('inlineDetailsImage').src = project.image;
        document.getElementById('inlineDetailsDescription').textContent = project.description;
        document.getElementById('inlineDetailsText').textContent = project.details;
        
        const techList = document.getElementById('inlineTechnologiesList');
        if (techList) {
            techList.innerHTML = project.technologies.map(tech => 
                `<span class="tech-badge">${tech}</span>`
            ).join('');
        }

        // Hide other articles, show project details
        document.querySelectorAll('.article-section').forEach(a => {
            a.classList.remove('active', 'slide-in-right', 'slide-in-left');
        });
        document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));

        const detailsArticle = document.getElementById('project-details-inline');
        if (detailsArticle) {
            detailsArticle.classList.add('active', 'slide-in-right');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    
    const backBtn = document.getElementById('back-to-projects');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            document.querySelectorAll('.article-section').forEach(a => {
                a.classList.remove('active', 'slide-in-right', 'slide-in-left');
            });
            const projectsTab = document.getElementById('projects');
            if (projectsTab) projectsTab.classList.add('active', 'slide-in-left');
            
            const projNav = document.querySelector('.nav-link[data-target="projects"]');
            if (projNav) projNav.classList.add('active');
        });
    }
});
