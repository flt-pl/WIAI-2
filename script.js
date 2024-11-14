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

function showFiles(projectName) {
    const fileListContainer = document.getElementById('fileListContainer');
    const fileList = document.getElementById('fileList');
    const projectTitle = document.getElementById('projectTitle');
    
    projectTitle.textContent = projectName;
    fileList.innerHTML = `
        <li class="list-group-item" onclick="showFileContent('index.html')">index.html</li>
        <li class="list-group-item" onclick="showFileContent('style.css')">style.css</li>
        <li class="list-group-item" onclick="showFileContent('script.js')">script.js</li>
    `;

    fileListContainer.style.display = 'block';
}

function showFileContent(fileName) {
    document.getElementById('fileContentLabel').textContent = fileName;
    document.getElementById('fileContent').textContent = `Zawartość pliku ${fileName}`;
    $('#fileContentModal').modal('show');
}

function filterProjects(status) {
    const projects = document.querySelectorAll('.list-group-item');
    projects.forEach(project => {
        const badge = project.querySelector('.badge');
        project.style.display = (status === 'all' || (badge && badge.textContent === status)) ? '' : 'none';
    });
}

function searchProjects() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const projects = document.querySelectorAll('.list-group-item');
    projects.forEach(project => {
        const title = project.textContent.toLowerCase();
        project.style.display = title.includes(input) ? '' : 'none';
    });
}

function updateProgress() {
    const totalProjects = document.querySelectorAll('.list-group-item').length;
    const completedProjects = document.querySelectorAll('.badge-success').length;
    const progressPercentage = (completedProjects / totalProjects) * 100;
    document.getElementById('projectProgress').style.width = `${progressPercentage}%`;
    document.getElementById('projectProgress').textContent = `${Math.round(progressPercentage)}% zakończonych`;
}

updateProgress();
