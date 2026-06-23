document.addEventListener('DOMContentLoaded', () => {
    const projectData = localStorage.getItem('selectedProject');
    
    if (projectData) {
        const project = JSON.parse(projectData);
        
        document.getElementById('detailsTitle').textContent = project.title;
        document.getElementById('detailsImage').src = project.image;
        document.getElementById('detailsDescription').textContent = project.description;
        document.getElementById('detailsText').textContent = project.details;
        
        const techList = document.getElementById('technologiesList');
        if (techList) {
            techList.innerHTML = project.technologies.map(tech => 
                `<span class="tech-badge">${tech}</span>`
            ).join('');
        }
    } else {
        // If no project is selected, go back
        window.location.href = 'index.html';
    }
});
