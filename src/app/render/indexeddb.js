function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('AppstartUploads', 2);
    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('blobs')) {
        db.createObjectStore('blobs');
      }
      console.log('[IndexedDB] Creating `blobs` store');
    };
    request.onsuccess = e => resolve(e.target.result);
    request.onerror = e => reject(e.target.error);
  });
}

async function saveBlobToIndexedDB(pageId, blobData) {
  const db = await openDatabase();
  const tx = db.transaction('blobs', 'readwrite');
  tx.objectStore('blobs').put(blobData, pageId);
  return tx.complete;
}

async function loadBlobFromIndexedDB(pageId) {
  const db = await openDatabase();
  const tx = db.transaction('blobs', 'readonly');
  const request = tx.objectStore('blobs').get(pageId);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

window.openDatabase = openDatabase;
window.saveBlobToIndexedDB = saveBlobToIndexedDB;
window.loadBlobFromIndexedDB = loadBlobFromIndexedDB;
