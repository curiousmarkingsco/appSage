// app/storage/page.js
import { readStore } from './index.js'

// Create & Update Storage
export async function storePageHtml(pageId, pageHTML, sessionKey) {
  const store = readStore(sessionKey);

  // Store HTML for the page with unique ID
  store.set(`appSage.pages.${pageId}.html`, pageHTML);
}

export async function storePageCSS(pageId, tailwindCSS, sessionKey) {
  const store = readStore(sessionKey);
  // Example:
  // const tailwindCSS = '<style>/* Tailwind generated CSS */</style>';

  // Store TailwindCSS and its configuration for the page
  store.set(`appSage.pages.${pageId}.styles.css`, tailwindCSS);
}

export async function storePageSettings(pageId, settings, sessionKey){
  const store = readStore(sessionKey);
  store.set(`appSage.pages.${pageId}.settings`, settings);
}

export async function storePageComponent(pageId, componentName, componentData, sessionKey) {
  const store = readStore(sessionKey);
    // Retrieve the existing components for the page (or initialize if undefined)
    const components = store.get(`appSage.pages.${pageId}.components`) || {};

    // Add the new component dynamically
    components[componentName] = componentData;

    // Store the updated components object back to electron-store
    store.set(`appSage.pages.${pageId}.components`, components);
}

// Retrieve Storage
export async function getPageHTML(pageId, sessionKey) {
  const store = readStore(sessionKey);
  const storedHTML = store.get(`appSage.pages.${pageId}.html`);
  return storedHTML;
}

export async function getPageCSS(pageId, sessionKey) {
  const store = readStore(sessionKey);
  const storedCSS = store.get(`appSage.pages.${pageId}.styles.css`);
  return storedCSS;
}

export async function getPageSettings(pageId, sessionKey) {
  const store = readStore(sessionKey);
  const storedSettings = store.get(`appSage.pages.${pageId}.settings`);
  return storedSettings;
}

export async function getPageComponent(pageId, componentName, sessionKey) {
  const store = readStore(sessionKey);
  // Retrieve all components for the specified page
  const components = store.get(`appSage.pages.${pageId}.components`) || {};
  
  return components[componentName];
}
