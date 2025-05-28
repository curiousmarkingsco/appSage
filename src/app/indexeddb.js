export function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('AppSageUploads', 1);
    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('blobs')) {
        db.createObjectStore('blobs');
      }
    };
    request.onsuccess = e => resolve(e.target.result);
    request.onerror = e => reject(e.target.error);
  });
}

export async function saveBlobToIndexedDB(pageId, blobData) {
  const db = await openDatabase();
  const tx = db.transaction('blobs', 'readwrite');
  tx.objectStore('blobs').put(blobData, pageId);
  return tx.complete;
}

export async function loadBlobFromIndexedDB(pageId) {
  const db = await openDatabase();
  const tx = db.transaction('blobs', 'readonly');
  const request = tx.objectStore('blobs').get(pageId);
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
