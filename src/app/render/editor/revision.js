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
  const db = await openDB();
  const transaction = db.transaction("RevisionHistory", "readwrite");
  const store = transaction.objectStore("RevisionHistory");

  store.get(pageName).onsuccess = (event) => {
    const pageHistory = event.target.result;
    if (pageHistory && pageHistory.revisions[pointer]) {
      if (!electronMode) {
        // Parse the existing localStorage object
        const appStorage = JSON.parse(localStorage.appSageStorage);

        // Update the specific page's page_data with the selected revision
        if (appStorage.pages && appStorage.pages[pageName]) {
          appStorage.pages[pageName].page_data = JSON.stringify(pageHistory.revisions[pointer]);
        } else {
          console.error(`Page ${pageName} not found in localStorage`);
          return;
        }

        // Write the updated appStorage back to localStorage
        localStorage.appSageStorage = JSON.stringify(appStorage);
      } else if (electronMode) {
        window.api.readStoreData().then((storeData) => {
          // Update the page data
          if (!storeData.pages) {
            storeData.pages = {};
          }

          if (!storeData.pages[pageName]) {
            storeData.pages[pageName] = {};
          }

          storeData.pages[pageName] = { ...storeData.pages[pageName], page_data: pageHistory.revisions[pointer] };
          // Save the updated data back to Electron store
          window.api.updateStoreData(storeData).then(updatedData => {
            window.appSageStore = updatedData;
            console.log(updatedData.pages[pageName].page_data[2].content)
          }).catch((error) => {
            console.error('Error saving page data in Electron mode:', error);
          });
        }).catch((error) => {
          console.error('Error reading store data in Electron mode:', error);
        });
      }

      // Reload the page
      // TODO: Test if soft reloading works and/or implement soft reloading properly
      window.location.reload();
    } else {
      console.error(`Revision ${pointer} for page ${pageName} not found`);
    }
  };
}

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