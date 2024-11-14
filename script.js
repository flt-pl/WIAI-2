window.onscroll = function() {
    document.getElementById('scrollTopBtn').style.display =
        (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) ? 'block' : 'none';
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        const projectList = document.getElementById('projectList');
        data.forEach(project => {
            const projectItem = document.createElement('a');
            projectItem.classList.add('list-group-item', 'list-group-item-action');
            projectItem.textContent = project.name;
            projectItem.dataset.date = project.date;  // Добавляем дату
            projectItem.addEventListener('click', () => showFiles(project.name, project.files));
            const badge = document.createElement('span');
            badge.classList.add('badge', project.status === 'Zakończony' ? 'badge-success' : 'badge-warning');
            badge.textContent = project.status;
            projectItem.appendChild(badge);
            projectList.appendChild(projectItem);
        });
    });

function showFiles(projectName, files) {
    const fileListContainer = document.getElementById('fileListContainer');
    const fileList = document.getElementById('fileList');
    fileList.innerHTML = '';
    document.getElementById('projectTitle').textContent = `Pliki projektu: ${projectName}`;
    files.forEach(file => {
        const fileItem = document.createElement('li');
        fileItem.classList.add('list-group-item');
        fileItem.textContent = file;
        fileItem.addEventListener('click', () => showFileContent(file));
        fileList.appendChild(fileItem);
    });
    fileListContainer.style.display = 'block';
}

function showFileContent(fileName) {
    document.getElementById('fileContentLabel').textContent = fileName;
    document.getElementById('fileContent').textContent = 'Ładowanie...';
    $('#fileContentModal').modal('show');

    setTimeout(() => {
        document.getElementById('fileContent').textContent = `Kod pliku: ${fileName}`;
        Prism.highlightAll();
    }, 1000);
}

function filterProjects(status) {
    const allProjects = document.querySelectorAll('.list-group-item');
    allProjects.forEach(item => {
        if (status === 'all' || item.textContent.includes(status)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

function searchProjects() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const projectList = document.querySelectorAll('.list-group-item');
    projectList.forEach(item => {
        const projectName = item.textContent.toLowerCase();
        item.style.display = projectName.includes(searchInput) ? 'block' : 'none';
    });
}

function sortProjectsByDate() {
    const projectList = document.querySelectorAll('.list-group-item');
    const projects = Array.from(projectList);
    
    projects.sort((a, b) => {
        const dateA = new Date(a.dataset.date);
        const dateB = new Date(b.dataset.date);
        return dateB - dateA;
    });

    const projectListContainer = document.getElementById('projectList');
    projects.forEach(project => projectListContainer.appendChild(project));
}
