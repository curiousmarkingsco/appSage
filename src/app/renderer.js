// renderer.js

// Define `global` in the renderer process to mimic Node.js behavior
if (typeof global === 'undefined') {
  var global = window;  // In the browser, `global` is mapped to `window`
}

document.addEventListener('DOMContentLoaded', function () {
  const username = 'jojfsfweffwfe';
  const userPassword = 'aaafewfwefewaav';

  window.api.createStore(username, userPassword).then(store => {
    console.log('Store initialized:', store);
  })
  .catch(error => {
    console.error('Error initializing store:', error.stack || error);
  });
  // Initial route loading logic
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  // Map routes to HTML files and their corresponding JS files
  const routes = {
    'index.html': {
      html: './index.html',  // Dashboard - create pages, manage existing pages
      js: './render/index/main.js'
    },
    'editor.html': {
      html: './editor.html', // Edit page by ?config=id
      js: './render/editor/main.js'
    },
    'preview.html': {
      html: './preview.html', // Preview page by ?page=id
      js: './render/preview/main.js'
    }
  };

  // Helper to load HTML content
  function loadHTMLContent(htmlFilePath) {
    fetch(htmlFilePath)
      .then(response => response.text())
      .then(htmlContent => {
        document.body.innerHTML = htmlContent;
      })
      .catch(err => console.error('Error loading HTML:', err));
  }

  // Helper to load a JavaScript file
  function loadJavaScript(jsFilePath) {
    const script = document.createElement('script');
    script.src = jsFilePath;
    script.async = true; // Load the script asynchronously
    document.body.appendChild(script);
  }

  // Function to navigate between views
  function navigate(routeKey) {
    const route = routes[routeKey];

    if (route) {
      // Use history.pushState to change the URL and add the route to the history stack
      history.pushState({ routeKey }, '', routeKey);
      loadRoute(routeKey);
    } else {
      console.error('Route not found:', routeKey);
      document.body.innerHTML = '<h1>404 - Page Not Found</h1>';
    }
  }

  // Function to load both HTML and JS for a route
  function loadRoute(routeKey) {
    const route = routes[routeKey];
    if (route) {
      if (route.html !== 'index.html') {
        loadHTMLContent(route.html); // Load HTML content
      }
      loadJavaScript(route.js); // Load JS content
    }
  }

  // Handle back/forward navigation using the onpopstate event
  window.onpopstate = function (event) {
    if (event.state && event.state.routeKey) {
      loadRoute(event.state.routeKey);
    }
  };

  // Initial load: load the current route
  loadRoute(currentPath);

  // Example Back and Forward Button Logic
  // document.getElementById('backButton').addEventListener('click', function () {
  //   history.back(); // Go to the previous entry in the history stack
  // });

  // document.getElementById('forwardButton').addEventListener('click', function () {
  //   history.forward(); // Go to the next entry in the history stack
  // });

  console.log('Renderer process running');
});

/*

Example Navigation:

<!-- Back and Forward Buttons -->
<button id="backButton">Back</button>
<button id="forwardButton">Forward</button>

<!-- Navigation Links -->
<button onclick="navigate('editor.html')">Go to Editor</button>
<button onclick="navigate('preview.html')">Go to Preview</button>

*/
