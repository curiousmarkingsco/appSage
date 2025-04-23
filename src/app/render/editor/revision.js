/*

  editor/revision.js

  This file is intended to be the primary location for revision history
  saving, restoring, navigating, etc.

*/

// IndexedDB Setup
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("RevisionHistoryDB", 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("RevisionHistory")) {
        db.createObjectStore("RevisionHistory", { keyPath: "pageName" });
      }
    };
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

// Add a revision to the history
async function addRevision(pageName, pageData) {
  const db = await openDB();
  const transaction = db.transaction("RevisionHistory", "readwrite");
  const store = transaction.objectStore("RevisionHistory");

  store.get(pageName).onsuccess = (event) => {
    const pageHistory = event.target.result || { pageName, revisions: [], pointer: -1 };

    // Remove older revisions if necessary
    if (pageHistory.revisions.length >= 250) {
      pageHistory.revisions.shift();
    }

    // Add the new revision and adjust pointer
    pageHistory.revisions.push(pageData);
    pageHistory.pointer = pageHistory.revisions.length - 1;

    // Update IndexedDB
    store.put(pageHistory);
  };
}
window.addRevision = addRevision;

// Restore a specific revision
async function restoreRevision(pageName, pointer) {
  // 1) Load the requested revision from IndexedDB
  const db = await openDB();
  const tx = db.transaction("RevisionHistory", "readwrite");
  const store = tx.objectStore("RevisionHistory");
  const pageHistory = await new Promise((resolve, reject) => {
    const req = store.get(pageName);
    req.onsuccess = () => resolve(req.result);
    req.onerror   = () => reject(req.error);
  });

  if (!pageHistory || !pageHistory.revisions[pointer]) {
    console.error(`Revision ${pointer} for page ${pageName} not found`);
    return;
  }
  const revisionContent = pageHistory.revisions[pointer];

  // 2) ALWAYS do the default restore locally (or in Electron)
  if (!electronMode) {
    // Web: localStorage
    const appStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
    if (appStorage.pages?.[pageName]) {
      appStorage.pages[pageName].page_data = JSON.stringify(revisionContent);
      localStorage.setItem(appSageStorageString, JSON.stringify(appStorage));
    } else {
      console.error(`Page ${pageName} not found in localStorage`);
      return;
    }
  } else if (electronMode) {
    // Electron: secure store
    try {
      const storeData = await window.api.readStoreData();
      storeData.pages = storeData.pages || {};
      storeData.pages[pageName] = {
        ...storeData.pages[pageName],
        page_data: revisionContent
      };
      window.appSageStore = await window.api.updateStoreData(storeData);
    } catch (err) {
      console.error('Error saving page data in Electron mode:', err);
      return;
    }
  }

  // 3) If cloud sync is enabled, also send (or queue) this restore up to the server
  if (apiEnabled) {
    const payload = {
      pageId: pageName,
      content: revisionContent,
      timestamp: new Date().toISOString(),
      revisionId: pointer
    };
  
    if (cloudStorage.isOnline()) {
      try {
        await cloudStorage.sendToCloud(payload);
      } catch (err) {
        console.error('Error syncing revision to cloud:', err);
        cloudStorage.queueForLater(payload);
      }
    } else {
      cloudStorage.queueForLater(payload);
    }
  
    return;
  }  

  // 4) Finally reload to apply it
  window.location.reload();
}

window.restoreRevision = restoreRevision;

// Undo/Redo Operations
async function updatePointer(pageName, direction) {
  const db = await openDB();
  const transaction = db.transaction("RevisionHistory", "readwrite");
  const store = transaction.objectStore("RevisionHistory");

  store.get(pageName).onsuccess = (event) => {
    const pageHistory = event.target.result;
    if (pageHistory) {
      const newPointer = pageHistory.pointer + direction;
      if (newPointer >= 0 && newPointer < pageHistory.revisions.length) {
        pageHistory.pointer = newPointer;
        store.put(pageHistory);
        restoreRevision(pageName, pageHistory.pointer); // Restore the new revision
      }
    }
  };
}

  /* Revision listeners */

  // Event Listeners for Undo/Redo
  document.addEventListener("keydown", (event) => {
    const isMac = navigator.userAgentData
      ? navigator.userAgentData.platform.toUpperCase().includes("MAC")
      : navigator.userAgent.toUpperCase().includes("MAC");
      
    const ctrlKey = isMac ? event.metaKey : event.ctrlKey;

    if (ctrlKey && event.key === "z" && !event.shiftKey) {
      // Undo
      const pageName = getPageId(); // Replace with the current page identifier
      updatePointer(pageName, -1);
      event.preventDefault();
    } else if (ctrlKey && event.key === "z" && event.shiftKey) {
      // Redo
      const pageName = getPageId(); // Replace with the current page identifier
      updatePointer(pageName, 1);
      event.preventDefault();
    }
  });

  // Listeners for Undo/Redo Buttons
  const undoBtn = document.getElementById("undoBtn");
  if (undoBtn) undoBtn.addEventListener("click", () => {
    const pageName = getPageId(); // Replace with the current page identifier
    updatePointer(pageName, -1);
  });

  const redoBtn = document.getElementById("redoBtn");
  if (redoBtn) redoBtn.addEventListener("click", () => {
    const pageName = getPageId(); // Replace with the current page identifier
    updatePointer(pageName, 1);
  });