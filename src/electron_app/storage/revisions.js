const MAX_REVISIONS = 50;

// Function to save a new revision of the page data
function saveNewRevision(pageId, pageData) {
  // Retrieve the current page revisions and revision index
  const revisions = store.get(`appSage.pages.${pageId}.revisions`) || [];
  const currentRevisionIndex = store.get(`appSage.pages.${pageId}.currentRevisionIndex`) || 0;

  // Add the current page data as a new revision
  revisions.push(pageData);

  // If we exceed the max number of revisions, remove the oldest
  if (revisions.length > MAX_REVISIONS) {
    revisions.shift(); // Remove the first (oldest) revision
  }

  // Update the revision index to point to the latest revision
  store.set(`appSage.pages.${pageId}.revisions`, revisions);
  store.set(`appSage.pages.${pageId}.currentRevisionIndex`, revisions.length - 1);
}

// Function to retrieve the current revision of the page
function getCurrentRevision(pageId) {
  const revisions = store.get(`appSage.pages.${pageId}.revisions`) || [];
  const currentRevisionIndex = store.get(`appSage.pages.${pageId}.currentRevisionIndex`) || 0;
  
  return revisions[currentRevisionIndex] || {};
}

// Function to undo the last change
function undoRevision(pageId) {
  let currentRevisionIndex = store.get(`appSage.pages.${pageId}.currentRevisionIndex`) || 0;

  if (currentRevisionIndex > 0) {
    // Move the index back by one to go to the previous revision
    currentRevisionIndex -= 1;
    store.set(`appSage.pages.${pageId}.currentRevisionIndex`, currentRevisionIndex);
  }

  // Retrieve and return the previous revision data
  return getCurrentRevision(pageId);
}

// Function to redo the next change
function redoRevision(pageId) {
  const revisions = store.get(`appSage.pages.${pageId}.revisions`) || [];
  let currentRevisionIndex = store.get(`appSage.pages.${pageId}.currentRevisionIndex`) || 0;

  if (currentRevisionIndex < revisions.length - 1) {
    // Move the index forward by one to go to the next revision
    currentRevisionIndex += 1;
    store.set(`appSage.pages.${pageId}.currentRevisionIndex`, currentRevisionIndex);
  }

  // Retrieve and return the next revision data
  return getCurrentRevision(pageId);
}
