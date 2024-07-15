/* sidebar.js */

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
          const editingElement = document.querySelector('#editing-highlight');
          loadTabContent(tab.textContent.trim(), editingElement);
      });
  });

  function loadTabContent(tabName, editingElement) {
    removeEditingHighlights();
    const currentlyEditing = document.querySelector('#editing-highlight'); // Find currently highlighted element
    console.log(currentlyEditing);
    if (currentlyEditing) {
      currentlyEditing.id = ''; // Remove highlight from previously edited element
    }

    sidebarDynamic.innerHTML = ''; // Clear existing content

    // Delay the following operations to allow DOM changes to settle
    setTimeout(() => {
      sidebarDynamic.innerHTML = ''; // Clear existing content
      switch (tabName) {
          case 'Edit Grid':
              loadGridSettings(editingElement);
              break;
          case 'Edit Column':
              loadColumnSettings(editingElement);
              break;
          case 'Edit Content':
              loadContentSettings(editingElement);
              break;
      }
    }, 100);
  }

  function loadGridSettings(editingElement) {
    highlightEditingElement(editingElement);
    const gridSettingsHTML = `
        <p><strong>Grid Width:</strong></p>
        <button onclick="setGridWidth(document.getElementById('editing-highlight'), 'w-full')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Full Screen</button>
        <button onclick="setGridWidth(document.getElementById('editing-highlight'), 'max-w-7xl w-full mx-auto')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Fixed Width</button>
    `;
    sidebarDynamic.innerHTML = gridSettingsHTML;
  }

  function loadColumnSettings(editingElement) {
    highlightEditingElement(editingElement);
    const columnSettingsHTML = `
        <p><strong>Edit Column Padding & Margin:</strong></p>
        <select onchange="updateColumnClass(document.getElementById('editing-highlight'), 'p-' + this.value, 'p-')">
            <option value="0">No Padding</option>
            <option value="1">Small</option>
            <option value="2">Medium</option>
            <option value="4">Large</option>
        </select>
        <select onchange="updateColumnClass(document.getElementById('editing-highlight'), 'm-' + this.value, 'm-')">
            <option value="0">No Margin</option>
            <option value="1">Small</option>
            <option value="2">Medium</option>
            <option value="4">Large</option>
        </select>
        <button onclick="removeColumn(editingElement)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Remove Column</button>
    `;
    sidebarDynamic.innerHTML = columnSettingsHTML;
  }

  function loadContentSettings(editingElement) {
    highlightEditingElement(editingElement);
    if (columnHasContent(editingElement)) {
      detectAndLoadContentType(editingElement); // Use existing function to load content-specific settings
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