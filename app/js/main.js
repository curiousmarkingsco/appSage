/*

  main.js

  This file is primarily for interface elements on index.html, though is also
  used in editor.html.

*/

// This function is for confirmation of deleting pages and elements.
// DATA IN: ['String', 'function()']
function showConfirmationModal(message, onConfirm) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-[1000] bg-slate-800 bg-opacity-50 flex justify-center items-center';
  modal.innerHTML = `
      <div class="bg-slate-100 p-4 rounded-lg max-w-sm mx-auto">
          <p class="text-slate-900">${message}</p>
          <div class="flex justify-between mt-4">
              <button id="confirmDelete" class="bg-rose-500 hover:bg-rose-700 text-slate-50 font-bold p-2 rounded">Delete</button>
              <button id="cancelDelete" class="bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded">Cancel</button>
          </div>
      </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('confirmDelete').addEventListener('click', function () {
    onConfirm();
    document.body.removeChild(modal);
  });

  document.getElementById('cancelDelete').addEventListener('click', function () {
    document.body.removeChild(modal);
  });
} // DATA OUT: null

// This function is for permanently deleting a page from localStorage.
// DATA IN: ['String', 'HTML Element, <div>']
function deletePage(page_id, element) {
  const message = "Are you sure you want to delete this page? This action cannot be undone.";

  showConfirmationModal(message, function () {
    const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
    const titleIdMap = JSON.parse(localStorage.getItem(appSageTitleIdMapString) || '{}');

    if (appSageStorage.pages && appSageStorage.pages[page_id]) {
      delete appSageStorage.pages[page_id];
    }

    for (let title in titleIdMap) {
      if (titleIdMap[title] === page_id) {
        delete titleIdMap[title];
        break;
      }
    }

    localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));
    localStorage.setItem(appSageTitleIdMapString, JSON.stringify(titleIdMap));
    element.remove();

    console.log(`Page with ID ${page_id} has been deleted successfully.`);
  });
} // DATA OUT: null
