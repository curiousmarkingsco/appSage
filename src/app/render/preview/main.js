/*

  preview/main.js

  This file is intended to clean up any residual content that could pop up from
  the designer editing the page. And, of course, load the necessary data from
  localStorage to show the final page design without the sidebar cluttering up
  their eyes, giving an unadultered view of the page.

*/

function initializePreview() {
  return new Promise((resolve, reject) => {
    try {
      // Dynamically inject the required head resources like Tailwind and fonts
      document.head.innerHTML = `
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${window.location.host === 'localhost:8080' ? `<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline'; media-src 'self' 'unsafe-inline' localhost:8080 blob: data:;  img-src 'self' 'unsafe-inline' localhost:8080 blob: data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' 'unsafe-inline' fonts.gstatic.com;">` : '' }
        <title>Preview Page</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      `;

      // Inject body content (if any static content is necessary) or leave it for dynamic use
      const bodyElement = document.querySelector('body');
      const pageElement = document.createElement('div');
      pageElement.id = 'page';
      bodyElement.appendChild(pageElement);

      
      // Dynamically load scripts necessary for preview functionality
      const urlParams = new URLSearchParams(window.location.search);
      const previewPageId = urlParams.get('page');
    
      if (electronMode) {
        loadPreviewScripts().then(() => {
          if (previewPageId) loadPreview(previewPageId);
        });
      } else {
        if (previewPageId) loadPreview(previewPageId);
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
window.initializePreview = initializePreview;


async function loadPreviewScripts() {
  if (editorScriptsAlreadyLoaded === true) {
    return new Promise((resolve, reject) => { resolve(); });
  } else {
    await loadScript('./render/editor/components/main.js');
    await loadScript('./render/editor/save.js');
    await loadScript('./render/load.js');
    return new Promise((resolve, reject) => {
      try {
        // TODO
        // loadScripts([ all the waits above used to be in here, some should be added back for efficiency sake ]);

        const components = Object.keys(appSageComponents).map(key => appSageComponents[key]);
        components.map(component => {
          if (component.html_template !== '') return;
          if (component.license === 'premium' && appSagePremium === false) return;

          const path = component.license === 'premium'
            ? `./render/editor/components/premium/${component.file}`
            : `./render/editor/components/free/${component.file}`;

          loadScript(path);
        });
        editorScriptsAlreadyLoaded = true;
        resolve();
      } catch(error) {
        reject(error);
        console.error('Error loading scripts:', error.stack || error);
      }
    });
  }
}
window.loadPreviewScripts = loadPreviewScripts;

// This function does everything described above, though this comment should
// probably be reviewed and updated if anything is ever added to this file.
// DATA IN: String
async function loadPreview(pageId) {
  let json = await loadPage(pageId);

  // CLOUD SYNC: fetch latest from cloud if enabled
  if (apiEnabled && cloudStorage.isOnline()) {
    try {
      const cloudData = await cloudStorage.pullFromCloud(pageId);
      if (cloudData.page_data) {
        json = JSON.stringify(cloudData.page_data);
      }
    } catch (error) {
      console.error('Error loading preview from cloud:', error);
    }
  }  

  if (!electronMode) {
    // Using localStorage for non-Electron mode
    if (json) {
      const pageContainer = document.getElementById('page');
      pageContainer.innerHTML = ''; // Clear existing content

      document.querySelector('title').textContent = pageId;

      const data = JSON.parse(json);
      data.forEach(item => {
        pageContainer.innerHTML += item.content;
      });

      loadPageSettings(pageId, true);
      loadPageMetadata(pageId);
    } else {
      console.error('No saved data found for pageId:', pageId);
    }
    activateComponents();
  } else if (electronMode) {
    try {
      const storeData = await window.api.readStoreData();
      let data = storeData.pages?.[pageId]?.page_data;

      if (data) {
        const pageContainer = document.getElementById('page');
        pageContainer.innerHTML = ''; // Clear existing content

        document.querySelector('title').textContent = pageId;

        data.forEach(item => {
          pageContainer.innerHTML += item.content;
        });

        loadPageSettings(pageId, true);
        loadPageMetadata(pageId);
        activateComponents();
      } else {
        console.error('No saved data found for pageId:', pageId);
      }
    } catch (error) {
      console.error('Error loading preview from Electron store:', error);
    }
  }
}
window.loadPreview = loadPreview;
