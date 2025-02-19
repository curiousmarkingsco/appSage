async function initializeDashboard() {
  try {

    // Check if a project was open before refresh
    const lastOpenedProject = localStorage.getItem('lastOpenedProject');

    if (lastOpenedProject) {
      displayPages(lastOpenedProject);  // Open pages view instead of projects
      return;
    }

    // Inject head content
    document.head.innerHTML = `
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="./tailwind-output.css">
    `;

    // Clear body and inject layout
    document.body.innerHTML = `
      <div class="h-screen lg:hidden bg-slate-100 p-4">
        <h2 class="text-4xl font-bold text-center mt-20">Please use a desktop computer to access appSage.</h2>
      </div>
      <div class="min-h-screen w-full bg-slate-100 hidden lg:block">
        <div class="w-full grid grid-cols-3 h-16 bg-slate-200 items-center">
          <div class="flex ml-4">
            <img src="./assets/logo_icon.svg" class="w-12 h-12">
            <img src="./assets/logo_wordmark.svg" class="w-36 h-8 ml-2 mt-2">
          </div>
          <div></div>
          <div class="text-right mr-4">
            <button id="newProjectButton" class="bg-slate-600 text-white p-2 rounded">New Project</button>
          </div>
        </div>
        <div class="text-left mx-20 mt-8">
          <h1 class="text-3xl text-slate-600">Locally Stored Projects</h1>
        </div>
        <div class="mx-16">
          <div id="projectList" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-4"></div>
        </div>
      </div>
    `;

    // Load projects persistently
    let appSageStorage = await getStoredProjects();
    displayProjects(appSageStorage.titleIdMap, appSageStorage.projects, document.getElementById('projectList'));

    // Attach event listener for new projects
    document.getElementById('newProjectButton').addEventListener('click', addProject);
  } catch (error) {
    console.error("Error initializing dashboard:", error);
  }
}
window.initializeDashboard = initializeDashboard;

// Function to load a script dynamically
async function getStoredProjects() {
  let appSageStorage = JSON.parse(localStorage.getItem('appSageStorage')) || { projects: [], titleIdMap: {}, pages: {} };

  // Ensure proper structure
  if (!Array.isArray(appSageStorage.projects)) appSageStorage.projects = [];
  if (typeof appSageStorage.titleIdMap !== 'object') appSageStorage.titleIdMap = {};
  if (typeof appSageStorage.pages !== 'object') appSageStorage.pages = {};

  // Ensure every project's pages is an array
  Object.keys(appSageStorage.pages).forEach(projectId => {
    if (!Array.isArray(appSageStorage.pages[projectId])) {
      console.warn(`⚠️ Fixing pages for project ${projectId}, was:`, appSageStorage.pages[projectId]);
      appSageStorage.pages[projectId] = [];
    }
  });

  console.log("✅ getStoredProjects result:", appSageStorage);
  return appSageStorage;
}

// Function to display projects
function displayProjects(titleIdMap, projectList, container) {
  container.innerHTML = '';

  if (!projectList.length) {
    container.innerHTML = `
      <div class="text-center col-span-5">
        <h2 class="text-3xl text-slate-500 p-2">No projects yet.</h2>
        <button class="bg-sky-500 text-white px-4 py-2 rounded" onclick="addProject()">Create a new project</button>
      </div>
    `;
    return;
  }

  projectList.forEach((projectId) => {
    const projectTitle = titleIdMap[projectId] || `Project ${projectId}`;
    const column = document.createElement('div');
    column.className = 'col-span-1 bg-white border-2 border-gray-200 p-4 rounded-lg shadow-lg';
    column.onclick = () => displayPages(projectId);
    column.innerHTML = `
      <h2 class="text-lg font-semibold text-gray-800">${projectTitle}</h2>
      <div class="flex justify-around mt-4">
        <button class="bg-blue-500 text-white px-3 py-2 rounded" onclick="editProject('${projectId}')">Settings</button>
        <button class="bg-red-500 text-white px-3 py-2 rounded" onclick="deleteProject('${projectId}', this.parentElement.parentElement)">Delete</button>
      </div>
    `;
    container.appendChild(column);
  });
}

// Function to add a new project (persists data in localStorage)
function addProject() {
  getStoredProjects().then((appSageStorage) => {
    const projectId = `proj-${Date.now()}`;
    appSageStorage.projects.push(projectId);
    appSageStorage.titleIdMap[projectId] = `New Project ${appSageStorage.projects.length}`;

    // Save to localStorage for persistence
    localStorage.setItem('appSageStorage', JSON.stringify(appSageStorage));

    // Refresh project list dynamically
    displayProjects(appSageStorage.titleIdMap, appSageStorage.projects, document.getElementById('projectList'));
  });
}

// Function to delete a project & update localStorage
function deleteProject(projectId, projectElement) {
  if (!confirm('Are you sure you want to delete this project?')) return;

  getStoredProjects().then((appSageStorage) => {
    appSageStorage.projects = appSageStorage.projects.filter(id => id !== projectId);
    delete appSageStorage.titleIdMap[projectId];

    // Save to localStorage for persistence
    localStorage.setItem('appSageStorage', JSON.stringify(appSageStorage));

    // Remove project from UI dynamically
    projectElement.remove();
  });
}

// Function to edit a project (opens settings)
function editProject(projectId) {
  if (!electronMode) {
    window.open(`${window.location.href}?config=${projectId}`, '_blank');
  } else {
    window.api.createEditorWindow(projectId).catch(error => {
      console.error('Error opening editor:', error.stack || error);
    });
  }
}

function displayPages(projectId) {
  // Store the last opened project so it persists on refresh
  localStorage.setItem('lastOpenedProject', projectId);

  getStoredProjects().then((appSageStorage) => {
    const titleIdMap = appSageStorage.titleIdMap || {};
    const pageList = appSageStorage.pages?.[projectId] || [];

    document.body.innerHTML = `
      <div class="h-screen lg:hidden bg-slate-100 p-4">
        <h2 class="text-4xl font-bold text-center mt-20">Please use a desktop computer to access appSage.</h2>
      </div>
      <div class="min-h-screen w-full bg-slate-100 hidden lg:block">
        <div class="w-full grid grid-cols-3 h-16 bg-slate-200 items-center">
          <div class="flex ml-4">
            <img src="./assets/logo_icon.svg" class="w-12 h-12">
            <img src="./assets/logo_wordmark.svg" class="w-36 h-8 ml-2 mt-2">
          </div>
          <div></div>
          <div class="text-right mr-4">
            <button class="bg-gray-500 text-white px-4 py-2 rounded" onclick="goBackToProjects()">⬅ Back to Projects</button>
          </div>
        </div>

        <div class="text-left mx-20 mt-8">
          <h1 class="text-3xl text-slate-600">${titleIdMap[projectId] || `Project ${projectId}`} - Pages</h1>
        </div>

        <div class="mx-16">
          <button class="bg-green-500 text-white px-4 py-2 rounded mt-4" onclick="addPage('${projectId}')">➕ New Page</button>

          <div id="pageList" class="mt-6">
            ${pageList.length ? pageList.map(page => `
              <div class="bg-white border border-gray-300 p-4 rounded-lg shadow mb-4 flex justify-between items-center">
                <h2 class="text-lg font-semibold text-gray-800">${page.title || 'Untitled Page'}</h2>
                <div class="flex gap-2">
                  <button class="bg-blue-500 text-white px-3 py-2 rounded" onclick="editPage('${projectId}', '${page.id}')">Edit</button>
                  <button class="bg-yellow-500 text-white px-3 py-2 rounded" onclick="pageSettings('${projectId}', '${page.id}')">Settings</button>
                  <button class="bg-red-500 text-white px-3 py-2 rounded" onclick="deletePage('${projectId}', '${page.id}', event)">Delete</button>
                </div>
              </div>
            `).join('') : `<p class="text-gray-500 text-xl mt-6">No pages yet. Click "New Page" to create one.</p>`}
          </div>
        </div>
      </div>
    `;
  });
}

function goBackToProjects() {
  localStorage.removeItem('lastOpenedProject');
  initializeDashboard();
}

async function addPage(projectId) {
  try {
    let appSageStorage = await getStoredProjects();
    
    // Ensure pages structure exists
    if (!appSageStorage.pages) appSageStorage.pages = {};
    if (!appSageStorage.pages[projectId]) appSageStorage.pages[projectId] = [];
    
    const newPage = {
      id: `page-${Date.now()}`,
      title: `New Page ${appSageStorage.pages[projectId].length + 1}`
    };
    
    appSageStorage.pages[projectId].push(newPage);
    localStorage.setItem('appSageStorage', JSON.stringify(appSageStorage));
    
    // Refresh page list dynamically
    displayPages(projectId);
    
    // Open editor for the new page
    editPage(projectId, newPage.id);
  } catch (error) {
    console.error("Error adding page:", error);
  }
}

async function editPage(projectId, pageId) {
  try {
    let appSageStorage = await getStoredProjects();
    
    // Check if page exists before opening
    if (!appSageStorage.pages[projectId] || !appSageStorage.pages[projectId].some(p => p.id === pageId)) {
      console.error("Page not found:", pageId);
      return;
    }
    
    if (!electronMode) {
      window.open(`${window.location.href}?project=${projectId}&page=${pageId}&mode=edit`, '_blank');
    } else {
      window.api.createEditorWindow(pageId).catch(error => {
        console.error('Error opening editor:', error.stack || error);
      });
    }
  } catch (error) {
    console.error("Error editing page:", error);
  }
}

// Opens page settings (can be expanded later)
function pageSettings(projectId, pageId) {
  alert(`Settings for ${pageId} inside ${projectId}`);
}

// Function to delete a page from a project
function deletePage(projectId, pageId, event) {
  event.stopPropagation(); // Prevent parent click from triggering

  getStoredProjects().then((appSageStorage) => {
    appSageStorage.pages[projectId] = appSageStorage.pages[projectId].filter(p => p.id !== pageId);
    localStorage.setItem('appSageStorage', JSON.stringify(appSageStorage));

    // Refresh project view
    displayPages(projectId);
  });
}