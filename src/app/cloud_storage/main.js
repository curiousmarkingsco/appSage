/*
  ./src/app/cloud_storage/main.js
  Shared synchronization utilities for two-way cloud sync.
  No localStorage interactions — persistence is handled by caller.
*/

const inMemoryQueue = [];

/**
 * Initialize the cloud sync module.
 * @param {string} baseUrl - Base URL of the sync API.
 * @param {string} currentDeviceId - Unique ID for this device.
 */
export function initSync(baseUrl, currentDeviceId) {
  appSageApiBaseUrl = baseUrl;
  deviceId = currentDeviceId;
  window.addEventListener('online', flushQueue);
}

/**
 * Check if the application is online.
 * @returns {boolean}
 */
export function isOnline() {
  return navigator.onLine;
}

/**
 * Queue a change for later upload (in-memory).
 * Callers should persist these changes as needed.
 * @param {object} change - Payload: { pageId, content, timestamp, revisionId }
 */
export function queueForLater(change) {
  inMemoryQueue.push(change);
}

/**
 * Flush the in-memory queue by sending each change to the cloud API.
 * If a change fails, it will be re-queued for a later attempt.
 */
export async function flushQueue() {
  while (inMemoryQueue.length > 0 && isOnline()) {
    const change = inMemoryQueue.shift();
    try {
      await sendToCloud(change);
    } catch (err) {
      console.warn('Cloud sync failed, re-queueing.', err);
      inMemoryQueue.unshift(change);
      break;
    }
  }
}

/**
 * Send a change payload to the cloud API.
 * Includes metadata for conflict resolution.
 * @param {object} payload - { pageId, content, timestamp, revisionId }
 * @returns {Promise<object>} Server response JSON
 */
export async function sendToCloud({ pageId, content, timestamp, revisionId }) {
  const url = `${appSageApiBaseUrl}/sync/${pageId}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, timestamp, revisionId, deviceId })
  });
  if (!response.ok) {
    throw new Error(`Sync error ${response.status}`);
  }
  return response.json();
}

/**
 * Pull the latest data for a given page from the cloud API.
 * @param {string} pageId - Identifier for the data to fetch.
 * @returns {Promise<object>} Latest cloud state
 */
export async function pullFromCloud(pageId) {
  const url = `${appSageApiBaseUrl}/sync/${pageId}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Fetch error ${response.status}`);
  }
  return response.json();
}
