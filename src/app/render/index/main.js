// index/main.js

async function initializeDashboard() {
  return new Promise((resolve, reject) => {
    try {
      // Inject head content like meta tags and links for favicons and CSS
      document.head.innerHTML = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${window.location.host === 'localhost:8080' ? `<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline'; media-src 'self' 'unsafe-inline' localhost:8080 blob: data:;  img-src 'self' 'unsafe-inline' localhost:8080 blob: data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' 'unsafe-inline' fonts.gstatic.com;">` : ''}
        <link rel="apple-touch-icon" sizes="180x180" href="./assets/favicons/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="./assets/favicons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="./assets/favicons/favicon-16x16.png">
        <link rel="manifest" href="./assets/favicons/site.webmanifest">
        <link rel="mask-icon" href="./assets/favicons/safari-pinned-tab.svg" color="#4b5d48">
        <meta name="msapplication-TileColor" content="#f2f0e9">
        <meta name="theme-color" content="#f2f0e9">
        <title>Dashboard | appSage</title>
        <link rel="stylesheet" href="./tailwind-output.css">
      `;

      const apex = document.getElementById('apex');
      // Clear body and inject body content
      apex.innerHTML = `
        <div class="h-screen lg:hidden bg-pearl-bush-100 p-4">
          <h2 class="text-4xl max-w-96 font-bold mx-auto mt-20">Please use a desktop computer to access appSage.</h2>
          <p class="mx-auto max-w-96 mt-4">If you feel like it, <a class="text-fruit-salad-600 hover:text-fruit-salad-800 hover:underline" href="mailto:contact@curiousmarkings.com">email us today</a> if you are hellbent on designing apps on your mobile phone. You will email us knowing your designs will most likely look terrible on larger devices.</p>
        </div>
        <div class="min-h-screen w-full min-h-screen bg-pearl-bush-100 hidden lg:block">
          <div
            class="w-full min-w-full max-w-full pagegrid grid pl-0 pr-0 pt-0 pb-0 ml-0 mr-0 mt-0 mb-0 ugc-keep grid-cols-3 max-h-16 h-16 min-h-16 justify-items-center place-items-center border-pearl-bush-50 border-none bg-pearl-bush-200">
            <div class="col-span-1 pagecolumn group mt-1 justify-start flex">
              <div class="content-container text-base w-12 h-12"><img src="./assets/logo_icon.svg"></div>
              <div class="content-container text-base w-36 h-8 ml-2 mt-2 pt-1"><img src="./assets/logo_wordmark.svg"></div>
            </div>
            <div class="col-span-1 pagecolumn group"></div>
            <div class="col-span-1 pagecolumn group">
              <div
                class="content-container text-base text-fuscous-gray-50 rounded-md border-1 border-fruit-salad-600 mr-4 pb-2 min-w-52 max-w-36 text-center bg-fruit-salad-500 pt-2 mt-0">
                <a class="bg-link text-background hover:bg-background hover:text-link font-bold p-2 rounded" href="${window.location.href}?config=new"
                  id="newPageButton">New Page</a>
              </div>
            </div>
          </div>
          <div
            class="max-h-full pagegrid grid pl-0 pr-0 pt-0 pb-0 ml-0 mr-0 mt-0 mb-0 ugc-keep min-h-1/3 min-w-full w-full max-w-full place-items-center grid-cols-2 h-32 justify-items-center">
            <div class="col-span-1 pagecolumn group mt-8 ml-8">
              <div class="content-container font-light text-3xl text-left text-fuscous-gray-600">
                <h1>Locally Stored Pages</h1>
              </div>
            </div>
          </div>
          <div id="pageList" class="w-full gap-2 min-w-full max-w-full pagegrid grid mt-0 mb-0 ugc-keep grid-cols-2 sm:grid-cols-2 md:grid-cols-3 min-h-8 pt-2 pl-4 pr-4 pb-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center ml-8 mr-8">
          </div>
        </div>
      `;

      // Load pages from localStorage and populate the page list
      const container = document.getElementById('pageList');
      let appSageStorage, pageList, titleIdMap;

      // Using localStorage for non-Electron mode
      const appSageStoreObject = localStorage['appSageStorage'];
      appSageStorage = appSageStoreObject ? JSON.parse(appSageStoreObject) : { pages: [], titleIdMap: [], settings: {} };
      pageList = appSageStorage.pages;
      titleIdMap = JSON.parse(localStorage.getItem(appSageTitleIdMapString)) || {};
      displayPages(titleIdMap, pageList, container);

      resolve();
    } catch (error) {
      reject(error); // Reject the promise if there's an error
    }
  });
}
window.initializeDashboard = initializeDashboard;

function displayPages(titleIdMap, pageList, container) {
  try {
    // Populate page list with available pages
    Object.keys(pageList).forEach(pageId => {
      const pageTitle = Object.keys(titleIdMap).find(title => titleIdMap[title] === pageId) || pageId;
      const column = document.createElement('div');
      column.className = 'col-span-1 pagecolumn group bg-pearl-bush-50 border-2 border-pearl-bush-200 w-full bg-repeat bg-center';
      column.innerHTML = `
        <div class="content-container pagecontent text-base border-pearl-bush-200"></div>
        <div class="content-container pagecontent text-fuscous-gray-700 text-2xl m-2">
          <h2>${pageTitle}</h2>
        </div>
        <div class="flex justify-around mb-4 mt-2">
          <a class="bg-fruit-salad-500 text-fuscous-gray-50 hover:bg-fruit-salad-700 font-bold p-2 rounded cursor-pointer" onclick="window.open('${window.location.href}?config=${pageId}', '_blank');">Edit</a>
          <a class="bg-gray-asparagus-500 text-fuscous-gray-50 hover:bg-gray-asparagus-700 font-bold p-2 rounded cursor-pointer" onclick="window.open('${window.location.href}?page=${pageId}', '_blank');">Preview</a>
          <button class="bg-link text-fuscous-gray-50 bg-russett-500 border-1 border-russett-500 hover:bg-russett-700 hover:text-link font-bold p-2 rounded cursor-pointer" onclick="deletePage('${pageId}', this.parentElement.parentElement)">Delete</button>
        </div>
      `;
      container.appendChild(column);
    });
  } catch {
    container.innerHTML = `
      <div class="text-center col-span-3">
        <h2 class="text-4xl text-fuscous-gray-500 p-2 my-2">No pages yet.</h2>
        <a class="py-2 px-4 hover:bg-fruit-salad-700 text-xl bg-fruit-salad-500 text-fuscous-gray-50 font-bold rounded-lg" href="${window.location.href}?config=new">Start building a page</a>
      </div>
    `;
  }
}

// Functions to dynamically load the editor or preview logic (replace these with actual logic)
function loadEditor(pageId = null) {
  if (pageId) {
    const params = new URLSearchParams(window.location.search);
    params.set('config', pageId);
  }
  initializeEditor();
}
window.loadEditor = loadEditor;

function loadPreview(pageId) {
  const params = new URLSearchParams(window.location.search);
  params.set('page', pageId);
}
window.loadPreview = loadPreview;
