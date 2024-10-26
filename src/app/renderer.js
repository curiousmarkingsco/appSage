// renderer.js

document.addEventListener('DOMContentLoaded', function () {
  // Parse the current URL to determine the route
  const currentPath = window.location.pathname;

  // Map routes to HTML files and their corresponding JS files
  const routes = {
    '/': {
      html: 'app/index.html',  // Main page
      js: 'app/index/main.js'  // Renamed from index.js
    },
    '/editor': {
      html: 'app/editor.html', // Editor page
      js: 'app/editor/main.js', // Editor JS
      loadAdditionalFiles: loadEditorScripts  // Function to load all files in app/js/editor/*
    },
    '/preview': {
      html: 'app/preview.html', // Preview page
      js: 'app/js/preview/main.js'  // Preview JS
    }
  };

  // Function to load additional editor-specific scripts
  function loadEditorScripts() {
    const editorScripts = [
      './app/js/editor/file1.js',
      './app/js/editor/file2.js',
      // Add more scripts as needed
    ];

    editorScripts.forEach(src => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true; // Optional: Loads scripts asynchronously
      document.body.appendChild(script);
    });
  }

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

  // Route handling logic
  if (routes[currentPath]) {
    const route = routes[currentPath];

    // Load the appropriate HTML
    loadHTMLContent(route.html);

    // Load the associated JavaScript file
    loadJavaScript(route.js);

    // If there are additional files to load (like in the editor), load them
    if (route.loadAdditionalFiles) {
      route.loadAdditionalFiles();
    }
  } else {
    // Default behavior if the route doesn't exist (optional)
    console.error('Route not found:', currentPath);
    document.body.innerHTML = '<h1>404 - Page Not Found</h1>';
  }
});

console.log('Renderer process running');