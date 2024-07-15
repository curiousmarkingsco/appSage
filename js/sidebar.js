function showConfirmationModal(message, onConfirm) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center';
  modal.innerHTML = `
      <div class="bg-white p-4 rounded-lg max-w-sm mx-auto">
          <p class="text-black">${message}</p>
          <div class="flex justify-between mt-4">
              <button id="confirmDelete" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
              <button id="cancelDelete" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
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
}

document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('nav[aria-label="Tabs"] a');
  const sidebarDynamic = document.getElementById('sidebar-dynamic');

  tabs.forEach(tab => {
    tab.addEventListener('click', function (event) {
      event.preventDefault();
      updateActiveTab(tabs, tab);
      loadTabContent(tab.textContent.trim());
    });
  });

  function loadTabContent(tabName) {
    const currentlyEditing = sidebarDynamic.querySelector('.editing'); // Check if there's an active editing marker
    let targetElement;

    if (currentlyEditing) {
      // Retain a reference to the element being edited, found by a specific class or identifier set during editing
      targetElement = document.querySelector('.' + currentlyEditing.dataset.editingTarget);
      if (targetElement) {
        targetElement.classList.remove('editing-highlight'); // Remove highlight from previously edited element
      }
    }

    sidebarDynamic.innerHTML = ''; // Clear existing content

    // Add a slight delay to avoid flickering when transitioning between edits
    switch (tabName) {
      case 'Edit Grid':
        loadGridSettings(targetElement || document.querySelector('.ugc-keep'));
        break;
      case 'Edit Column':
        loadColumnSettings(targetElement || document.querySelector('.column-content'));
        break;
      case 'Edit Content':
        loadContentSettings(targetElement || document.querySelector('.column-content'));
        break;
    }
    if (targetElement) {
      highlightEditingElement(targetElement); // Highlight the new element being edited
    }
  }

  function highlightEditingElement(element) {
    element.classList.add('editing-highlight'); // Apply highlighting class
    sidebarDynamic.dataset.editingTarget = element.classList[0]; // Store the target's class to find it later
  }

  function removeEditingHighlights() {
    const allEditingHighlights = document.querySelectorAll('.editing-highlight');
    allEditingHighlights.forEach(el => el.classList.remove('editing-highlight'));
    delete sidebarDynamic.dataset.editingTarget;
  }

  function loadGridSettings() {
    const grid = document.querySelector('.ugc-keep'); // Assume the first grid is what we want to edit
    const gridSettingsHTML = `
        <p><strong>Grid Width:</strong></p>
        <button onclick="setGridWidth(grid, 'w-full')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Full Screen</button>
        <button onclick="setGridWidth(grid, 'max-w-7xl w-full mx-auto')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Fixed Width</button>
    `;
    sidebarDynamic.innerHTML = gridSettingsHTML;
  }

  function loadColumnSettings() {
    const firstColumn = document.querySelector('.column-content'); // Assume the first column to edit
    const columnSettingsHTML = `
        <p><strong>Edit Column Padding & Margin:</strong></p>
        <select onchange="updateColumnClass(firstColumn, 'p-' + this.value, 'p-')">
            <option value="0">No Padding</option>
            <option value="1">Small</option>
            <option value="2">Medium</option>
            <option value="4">Large</option>
        </select>
        <select onchange="updateColumnClass(firstColumn, 'm-' + this.value, 'm-')">
            <option value="0">No Margin</option>
            <option value="1">Small</option>
            <option value="2">Medium</option>
            <option value="4">Large</option>
        </select>
        <button onclick="removeColumn(firstColumn)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove Column</button>
    `;
    sidebarDynamic.innerHTML = columnSettingsHTML;
  }

  function loadContentSettings() {
    const firstColumn = document.querySelector('.column-content'); // Assume the first column for content editing
    if (columnHasContent(firstColumn)) {
      detectAndLoadContentType(firstColumn); // Use existing function to load content-specific settings
    } else {
      sidebarDynamic.innerHTML = '<p>No content to edit. Add content using the main UI.</p>';
    }
  }
});

function updateActiveTab(tabs, activeTab) {
  tabs.forEach(t => {
    t.classList.remove('border-blue-500', 'text-blue-600');
    t.classList.add('border-transparent', 'text-gray-500', 'hover:border-gray-300', 'hover:text-gray-700');
  });
  activeTab.classList.add('border-blue-500', 'text-blue-600');
  activeTab.classList.remove('border-transparent', 'text-gray-500', 'hover:border-gray-300', 'hover:text-gray-700');
}

function clearEditingContext() {
  removeEditingHighlights();
  sidebarDynamic.innerHTML = '';
}