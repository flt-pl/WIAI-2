let projects = [];

fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        projects = data;
        updateProjectList();
    });

function updateProjectList() {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = '';

    projects.forEach(project => {
        const projectItem = document.createElement('li');
        projectItem.classList.add('list-group-item');
        projectItem.textContent = `${project.name} - ${project.status}`;
        projectItem.dataset.date = project.date;
        projectItem.addEventListener('click', () => loadFiles(project));

        updateProgressBar(project.progress);

        projectList.appendChild(projectItem);
    });
}

function updateProgressBar(progress) {
    const progressBarElement = document.querySelector('.progress-bar');
    progressBarElement.style.width = `${progress}%`;
    progressBarElement.textContent = `${progress}% zakończonych`;
}

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
        fileItem.addEventListener('click', () => showFileContent(file, project));
        fileList.appendChild(fileItem);
    });

    fileListContainer.style.display = 'block';
}

function showFileContent(fileName, project) {
    const fileContentModal = $('#fileContentModal');
    document.getElementById('fileContentLabel').textContent = fileName;
    document.getElementById('fileContent').textContent = 'Ładowanie...';
    fileContentModal.modal('show');

    setTimeout(() => {
        fetch(`${project.path}/${fileName}`)
            .then(response => response.text())
            .then(content => {
                document.getElementById('fileContent').textContent = content;
                Prism.highlightAll();
            });
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

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

document.addEventListener('scroll', () => {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (document.documentElement.scrollTop > 200) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});
