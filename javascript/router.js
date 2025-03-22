document.addEventListener('DOMContentLoaded', function() {
    const routes = {
        '': 'public/views/home.html',
        'login': 'public/views/login.html',
        'demo': 'public/views/demo.html'
    };

    function navigate() {
        const path = window.location.pathname.replace(/^\//, '');
        const route = routes[path] || 'public/views/404.html'; // Redirect to 404.html for invalid routes
        fetch(route)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                // Parse the HTML and extract the content inside the app div
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const content = doc.querySelector('#app') ? 
                                doc.querySelector('#app').innerHTML : 
                                doc.body.innerHTML;
                document.getElementById('app').innerHTML = content;
                
                // Re-attach event listeners to newly added links
                attachLinkHandlers();
            })
            .catch(error => {
                console.error('Error fetching the route:', error);
                document.getElementById('app').innerHTML = '<h1>404 - Page Not Found</h1>';
            });
    }

    function attachLinkHandlers() {
        document.querySelectorAll('a').forEach(anchor => {
            // Skip links that already have the SPA handler
            if (anchor.getAttribute('data-spa-handled')) return;
            
            anchor.setAttribute('data-spa-handled', 'true');
            anchor.addEventListener('click', function(event) {
                const href = anchor.getAttribute('href');
                
                // Don't handle external links or hash links
                if (href.includes('://') || href.startsWith('#')) return;
                
                event.preventDefault();
                history.pushState(null, '', href);
                navigate();
            });
        });
    }

    window.onpopstate = navigate;
    navigate();
    attachLinkHandlers();
});