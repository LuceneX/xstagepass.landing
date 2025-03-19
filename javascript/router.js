document.addEventListener('DOMContentLoaded', function() {
    const routes = {
        '/': 'public/views/home.html',
        '/login': 'public/views/login.html',
        '/demo': 'public/views/demo.html'
    };

    function navigate() {
        const path = window.location.pathname;
        const route = routes[path] || 'public/views/404.html'; // Redirect to 404.html for invalid routes
        fetch(route)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                document.getElementById('app').innerHTML = html;
            })
            .catch(error => {
                console.error('Error fetching the route:', error);
                document.getElementById('app').innerHTML = '<h1>404 - Page Not Found</h1>';
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