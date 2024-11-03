// app/storage/page.js
import { readStore, encryptData } from './index.js'

// Create & Update Storage
export async function storePageHtml(pageId, pageHTML, sessionKey) {
  const data = readStore(sessionKey);
  if (!data.pages) {
    data.pages = {};
  }
  const page = data.pages[pageId] || (data.pages[pageId] = {});
  page.page_data = pageHTML;
  const encryptedData = encryptData(data, sessionKey);
  store.set('encryptedData', encryptedData)
  return data;
}

export async function storePageCSS(pageId, tailwindCSS, sessionKey) {
  const store = readStore(sessionKey);
  // Example:
  // const tailwindCSS = '<style>/* Tailwind generated CSS */</style>';

  // Store TailwindCSS and its configuration for the page
  store.set(`appSage.pages.${pageId}.styles.css`, tailwindCSS);
  return store;
}

export async function storePageSettings(pageId, settings, sessionKey){
  const data = readStore(sessionKey);
  data.pages[pageId].settings = settings;
  const encryptedData = encryptData(data, sessionKey);
  store.set('encryptedData', encryptedData)
  return data;
}

export async function storePageComponent(pageId, componentName, componentData, sessionKey) {
  const store = readStore(sessionKey);
  // Retrieve the existing components for the page (or initialize if undefined)
  const components = store.get(`appSage.pages.${pageId}.components`) || {};

  // Add the new component dynamically
  components[componentName] = componentData;

  // Store the updated components object back to electron-store
  store.set(`appSage.pages.${pageId}.components`, components);
  return store;
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
