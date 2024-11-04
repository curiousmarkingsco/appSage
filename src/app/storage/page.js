// app/storage/page.js
import { default as Store } from 'electron-store';
import { readStoreData, encryptData, loadSchema } from './index.js'

// Create & Update Storage
export async function storePageHtml(pageId, pageHTML, sessionKey) {
  const data = readStoreData(sessionKey);
  const schema = await loadSchema();
  const store = new Store({ schema });
console.log(data)
  if (!data.pages) {
    data.pages = {};
  }

  const page = data.pages[pageId] || (data.pages[pageId] = {});
  page.html = pageHTML;
console.log(page)
  data.pages[pageId] = page;
console.log(data)
  const encryptedData = encryptData(data, sessionKey);
  store.set('encryptedData', encryptedData);
  return data;
}

export async function storePageCSS(pageId, tailwindCSS, sessionKey) {
  const data = readStoreData(sessionKey);
  const schema = await loadSchema();
  const store = new Store({ schema });

  if (!data.pages) {
    data.pages = {};
  }

  const page = data.pages[pageId] || (data.pages[pageId] = { styles: {}});

  // Example:
  // const tailwindCSS = '<style>/* Tailwind generated CSS */</style>';
  data.pages[pageId].styles.css = tailwindCSS;

  const encryptedData = encryptData(data, sessionKey);
  store.set('encryptedData', encryptedData);
  return data;
}

export async function storePageSettings(pageId, settings, sessionKey){
  const data = readStoreData(sessionKey);
  const schema = await loadSchema();
  const store = new Store({ schema });

  if (!data.pages) {
    data.pages = {};
  }

  const page = data.pages[pageId] || (data.pages[pageId] = {});
  page.settings = settings;
  data.pages[pageId].settings = page.settings;
  const encryptedData = encryptData(data, sessionKey);
  store.set('encryptedData', encryptedData);
  return data;
}

export async function storePageComponent(pageId, componentName, componentData, sessionKey) {
  const store = readStoreData(sessionKey);
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
  const store = readStoreData(sessionKey);
  const storedHTML = store.get(`appSage.pages.${pageId}.html`);
  return storedHTML;
}

export async function getPageCSS(pageId, sessionKey) {
  const store = readStoreData(sessionKey);
  const storedCSS = store.get(`appSage.pages.${pageId}.styles.css`);
  return storedCSS;
}

export async function getPageSettings(pageId, sessionKey) {
  const store = readStoreData(sessionKey);
  const storedSettings = store.get(`appSage.pages.${pageId}.settings`);
  return storedSettings;
}

export async function getPageComponent(pageId, componentName, sessionKey) {
  const store = readStoreData(sessionKey);
  // Retrieve all components for the specified page
  const components = store.get(`appSage.pages.${pageId}.components`) || {};
  
  return components[componentName];
}
