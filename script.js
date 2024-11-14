window.onscroll = function() {
    document.getElementById('scrollTopBtn').style.display =
        (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) ? 'block' : 'none';
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        const projectList = document.getElementById('projectList');
        data.forEach(project => {
            const projectItem = document.createElement('a');
            projectItem.classList.add('list-group-item', 'list-group-item-action');
            projectItem.textContent = project.name;
            projectItem.dataset.date = project.date;
            projectItem.addEventListener('click', () => loadFiles(project));
            projectList.appendChild(projectItem);
        });
    });

function loadFiles(project) {
    const fileListContainer = document.getElementById('fileListContainer');
    const fileList = document.getElementById('fileList');
    const projectTitle = document.getElementById('projectTitle');
    
    fileList.innerHTML = '';
    projectTitle.textContent = `Pliki projektu: ${project.name}`;
    
    project.files.forEach(file => {
        const fileItem = document.createElement('li');
        fileItem.classList.add('list-group-item');
        fileItem.textContent = file;
        fileItem.addEventListener('click', () => showFileContent(file));
        fileList.appendChild(fileItem);
    });
    
    fileListContainer.style.display = 'block';
}

function showFileContent(fileName) {
    const fileContentModal = $('#fileContentModal');
    document.getElementById('fileContentLabel').textContent = fileName;
    document.getElementById('fileContent').textContent = 'Ładowanie...';
    fileContentModal.modal('show');

    setTimeout(() => {
        document.getElementById('fileContent').textContent = `Kod pliku: ${fileName}`;
        Prism.highlightAll();
    }, 1000);
}

function addComment() {
    const comment = document.getElementById('commentInput').value;
    if (comment) {
        const commentList = document.getElementById('commentsList');
        const newComment = document.createElement('p');
        newComment.textContent = comment;
        commentList.appendChild(newComment);
        document.getElementById('commentInput').value = '';
    }
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
