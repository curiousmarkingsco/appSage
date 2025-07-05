function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('AppstartDB', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('keyval')) {
        db.createObjectStore('keyval');
      }
      if (!db.objectStoreNames.contains('blobs')) {
        db.createObjectStore('blobs');
      }
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject(event.target.error);
    };
  });
}

async function idbGet(key) {
  const db = await openDB();
  const transaction = db.transaction('keyval', 'readonly');
  const store = transaction.objectStore('keyval');
  const request = store.get(key);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function idbSet(key, value) {
  const db = await openDB();
  const transaction = db.transaction('keyval', 'readwrite');
  const store = transaction.objectStore('keyval');
  const request = store.put(value, key);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveBlobToIndexedDB(pageId, blobData) {
  const db = await openDB();
  const tx = db.transaction('blobs', 'readwrite');
  tx.objectStore('blobs').put(blobData, pageId);
  return tx.complete;
}

async function loadBlobFromIndexedDB(pageId) {
  const db = await openDB();
  const tx = db.transaction('blobs', 'readonly');
  const request = tx.objectStore('blobs').get(pageId);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function idbClear() {
  const db = await openDB();
  const transaction = db.transaction(['keyval', 'blobs'], 'readwrite');
  const keyvalStore = transaction.objectStore('keyval');
  const blobsStore = transaction.objectStore('blobs');
  keyvalStore.clear();
  blobsStore.clear();
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

window.idbGet = idbGet;
window.idbSet = idbSet;
window.idbClear = idbClear; // expose clear function
window.saveBlobToIndexedDB = saveBlobToIndexedDB;
window.loadBlobFromIndexedDB = loadBlobFromIndexedDB;
