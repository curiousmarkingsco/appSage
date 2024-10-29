// app/storage/page.js


// Create & Update Storage
function storePageHtml(pageId, pageHTML) {

  // Store HTML for the page with unique ID
  store.set(`appSage.pages.${pageId}.html`, pageHTML);
}

function storePageCSS(pageId, tailwindCSS) {
  // Example:
  // const tailwindCSS = '<style>/* Tailwind generated CSS */</style>';

  // Store TailwindCSS and its configuration for the page
  store.set(`appSage.pages.${pageId}.styles.css`, tailwindCSS);
}

function storePageSettings(pageId, settings){
  store.set(`appSage.pages.${pageId}.settings`, settings);
}

function storePageComponent(pageId) {
    // Retrieve the existing components for the page (or initialize if undefined)
    const components = store.get(`appSage.pages.${pageId}.components`) || {};

    // Add the new component dynamically
    components[componentName] = componentData;

    // Store the updated components object back to electron-store
    store.set(`appSage.pages.${pageId}.components`, components);
}

// Retrieve Storage
function getPageHTML(pageId) {
  const storedHTML = store.get(`appSage.pages.${pageId}.html`);
  return storedHTML;
}

function getPageCSS(pageId) {
  const storedCSS = store.get(`appSage.pages.${pageId}.styles.css`);
  return storedCSS;
}

function getPageSettings(pageId) {
  const storedSettings = store.get(`appSage.pages.${pageId}.settings`);
  return storedSettings;
}

function getPageComponent(pageId, componentName) {
  // Retrieve all components for the specified page
  const components = store.get(`appSage.pages.${pageId}.components`) || {};
  
  return components[componentName];
}
