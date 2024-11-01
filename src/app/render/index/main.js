// index/main.js

async function initializeDashboard() {
  return new Promise((resolve, reject) => {
    try {
      // Inject head content like meta tags and links for favicons and CSS
      document.head.innerHTML = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${window.location.host === 'localhost:8080' ? `<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline'; img-src 'self' 'unsafe-inline' localhost:8080 blob: data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' 'unsafe-inline' fonts.gstatic.com;">` : '' }
        <link rel="apple-touch-icon" sizes="180x180" href="./assets/favicons/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="./assets/favicons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="./assets/favicons/favicon-16x16.png">
        <link rel="manifest" href="./assets/favicons/site.webmanifest">
        <link rel="mask-icon" href="./assets/favicons/safari-pinned-tab.svg" color="#4b5d48">
        <meta name="msapplication-TileColor" content="#f2f0e9">
        <meta name="theme-color" content="#f2f0e9">
        <title>Dashboard | appSage</title>
        <link rel="stylesheet" href="./tailwind-output.css">
        <script defer src="./renderer.js"></script>
      `;

      // Clear body and inject body content
      document.body.innerHTML = `
        <div class="h-screen lg:hidden bg-slate-100 p-4">
          <h2 class="text-4xl max-w-96 font-bold mx-auto mt-20">Please use a desktop computer to access appSage.</h2>
          <p class="mx-auto max-w-96 mt-4">If you feel like it, <a class="text-sky-600 hover:text-sky-800 hover:underline" href="mailto:contact@curiousmarkings.com">email us today</a> if you are hellbent on designing apps on your mobile phone. You will email us knowing your designs will most likely look terrible on larger devices.</p>
        </div>
        <div class="min-h-screen w-full min-h-screen bg-slate-100 hidden lg:block">
          <div
            class="w-full min-w-full max-w-full pagegrid grid pl-0 pr-0 pt-0 pb-0 ml-0 mr-0 mt-0 mb-0 ugc-keep grid-cols-3 max-h-16 h-16 min-h-16 justify-items-center place-items-center border-slate-50 border-none bg-slate-200">
            <div class="col-span-1 pagecolumn group mt-1 justify-start flex">
              <div class="content-container text-base w-12 h-12"><img src="./assets/logo_icon.svg"></div>
              <div class="content-container text-base w-36 h-8 ml-2 mt-2 pt-1"><img src="./assets/logo_wordmark.svg"></div>
            </div>
            <div class="col-span-1 pagecolumn group"></div>
            <div class="col-span-1 pagecolumn group">
              <div
                class="content-container text-base text-slate-50 rounded-md border-1 border-sky-600 mr-4 pb-2 min-w-52 max-w-36 text-center bg-slate-600 pt-2 mt-0">
                <a class="bg-link text-background hover:bg-background hover:text-link font-bold p-2 rounded" onclick="loadEditor()"
                  id="newPageButton">New Page</a>
              </div>
            </div>
          </div>
          <div
            class="max-h-full pagegrid grid pl-0 pr-0 pt-0 pb-0 ml-0 mr-0 mt-0 mb-0 ugc-keep min-h-1/3 min-w-full w-full max-w-full place-items-center grid-cols-2 h-32 justify-items-center">
            <div class="col-span-1 pagecolumn group mt-8 ml-8">
              <div class="content-container font-light text-3xl text-left text-slate-600">
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
      try {
        const appSageStorage = JSON.parse(localStorage['appSageStorage']);
        const pages = appSageStorage.pages;
        const titleIdMap = JSON.parse(localStorage.getItem(appSageTitleIdMapString)) || {};

        // Populate page list with available pages
        Object.keys(pages).forEach(pageId => {
          const pageTitle = Object.keys(titleIdMap).find(title => titleIdMap[title] === pageId) || pageId;

          const column = document.createElement('div');
          column.className = 'col-span-1 pagecolumn group bg-slate-50 border-2 border-slate-200 w-full bg-repeat bg-center';
          column.innerHTML = `
            <div class="content-container pagecontent text-base border-slate-200"></div>
            <div class="content-container pagecontent text-slate-700 text-2xl m-2">
              <h2>${pageTitle}</h2>
            </div>
            <div class="flex justify-around mb-4 mt-2">
              <a class="bg-sky-500 text-slate-50 hover:bg-sky-700 font-bold p-2 rounded" href="${window.location.href}?config=${pageId}" target="_blank">Edit</a>
              <a class="bg-emerald-500 text-slate-50 hover:bg-emerald-700 font-bold p-2 rounded" href="${window.location.href}?page=${pageId}" target="_blank">Preview</a>
              <button class="bg-link text-slate-50 bg-rose-500 border-1 border-rose-500 hover:bg-rose-700 hover:text-link font-bold p-2 rounded" onclick="deletePage('${pageId}', this.parentElement.parentElement)">Delete</button>
            </div>
          `;
          container.appendChild(column);
        });
      } catch {
        const randId = Array.from({ length: 16 }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[Math.floor(Math.random() * 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.length)]).join('');
        container.innerHTML = `
          <div class="text-center col-span-3">
            <h2 class="text-4xl text-slate-500 p-2 my-2">No pages yet.</h2>
            <a class="py-2 px-4 hover:bg-sky-700 text-xl bg-sky-500 text-slate-50 font-bold rounded-lg" href="${window.location.href}?config=${randId}">Start building a page</a>
          </div>
        `;
      }
      resolve();
    } catch (error) {
      reject(error); // Reject the promise if there's an error
    }
  });
}
window.initializeDashboard = initializeDashboard;

// Functions to dynamically load the editor or preview logic (replace these with actual logic)
function loadEditor(pageId = null) {
  if (pageId) {
    const params = new URLSearchParams(window.location.search);
    params.set('config', pageId);
  }
  if (typeof window.api !== 'undefined') {
    loadScript('./render/editor/main.js');
  } else {
    initializeEditor().then(() => { setupPageEvents() });
  }
}
window.loadEditor = loadEditor;

function loadPreview(pageId) {
  const params = new URLSearchParams(window.location.search);
  params.set('page', pageId);
  loadScript('./render/preview/main.js');
}
window.loadPreview = loadPreview;
