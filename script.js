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
