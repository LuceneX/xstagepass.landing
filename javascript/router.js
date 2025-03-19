document.addEventListener('DOMContentLoaded', function() {
    const routes = {
        '/': 'public/views/home.html',
        '/login': 'public/views/login.html',
        '/demo': 'public/views/demo.html'
    };

    function navigate() {
        const path = window.location.pathname;
        const route = routes[path] || 'public/views/404.html';
        fetch(route)
            .then(response => response.text())
            .then(html => {
                document.getElementById('app').innerHTML = html;
            });
    }

    window.onpopstate = navigate;
    navigate();

    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function(event) {
            event.preventDefault();
            history.pushState(null, '', anchor.getAttribute('href'));
            navigate();
        });
    });
});