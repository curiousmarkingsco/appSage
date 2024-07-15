/* sidebar.js */
document.addEventListener('DOMContentLoaded', function () {
  const tabs = document.querySelectorAll('nav[aria-label="Tabs"] a');

  tabs.forEach(tab => {
      tab.addEventListener('click', function (event) {
          event.preventDefault();
          updateActiveTab(tabs, tab); // Add and remove styles as needed
          const editingElement = document.querySelector('#editing-highlight');
          loadTabContent(tab.textContent.trim(), editingElement);
      });
  });
});

function tabinate(chosenTab) {
  const tabs = document.querySelectorAll('nav[aria-label="Tabs"] a');
  tabs.forEach(tab => {
    if (tab.textContent == chosenTab) {
      updateActiveTab(tabs, tab); // Add and remove styles as needed
    }
  });
}

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

function loadTabContent(tabName, editingElement) {
  removeEditingHighlights();
  const currentlyEditing = document.querySelector('#editing-highlight'); // Find currently highlighted element
  if (currentlyEditing) {
    currentlyEditing.id = ''; // Remove highlight from previously edited element
  }

  // Delay the following operations to allow DOM changes to settle
  setTimeout(() => {
    const sidebarDynamic = document.getElementById('sidebar-dynamic');
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
        default:
            console.log(tabName);
            break;
    }
  }, 100);
}

function loadGridSettings(editingElement) {
  if (editingElement && editingElement.parentElement) {
    highlightEditingElement(editingElement);
    addGridOptions(editingElement.parentElement);
  } else {
    document.getElementById('sidebar-dynamic').innerHTML = '<p>Nothing to edit. Add a grid by clicking the Plus (+) button.</p>';
  }
}

function loadColumnSettings(editingElement) {
  const sidebarDynamic = document.getElementById('sidebar-dynamic');
  if (editingElement) {
    highlightEditingElement(editingElement);

    // Initialize selected values based on the classes of the editing element
    const paddingSelected = ['0', '2', '4', '8'].find(p => editingElement.classList.contains(`p-${p}`)) || '0';
    const marginSelected = ['0', '2', '4', '8'].find(m => editingElement.classList.contains(`m-${m}`)) || '0';

    const columnSettingsHTML = `
        <p><strong>Edit Column Padding & Margin:</strong></p>
        <select id="paddingSelect" onchange="updateColumnClass(document.getElementById('editing-highlight'), 'p-' + this.value, 'p-')">
            <option value="0" ${paddingSelected === '0' ? 'selected' : ''}>No Padding</option>
            <option value="2" ${paddingSelected === '2' ? 'selected' : ''}>Small</option>
            <option value="4" ${paddingSelected === '4' ? 'selected' : ''}>Medium</option>
            <option value="8" ${paddingSelected === '8' ? 'selected' : ''}>Large</option>
        </select>
        <select id="marginSelect" onchange="updateColumnClass(document.getElementById('editing-highlight'), 'm-' + this.value, 'm-')">
            <option value="0" ${marginSelected === '0' ? 'selected' : ''}>No Margin</option>
            <option value="2" ${marginSelected === '2' ? 'selected' : ''}>Small</option>
            <option value="4" ${marginSelected === '4' ? 'selected' : ''}>Medium</option>
            <option value="8" ${marginSelected === '8' ? 'selected' : ''}>Large</option>
        </select>
    `;
    sidebarDynamic.innerHTML = columnSettingsHTML;
  } else {
    document.getElementById('sidebar-dynamic').innerHTML = '<p>Nothing to edit. Add a column by clicking the Plus (+) button after making a grid.</p>';
  }
}

function loadContentSettings(editingElement) {
  highlightEditingElement(editingElement);
  if (editingElement) {
    updateSidebarForContentType(editingElement); // Use existing function to load content-specific settings
  } else {
    console.log(editingElement)
    const sidebarDynamic = document.getElementById('sidebar-dynamic')
    sidebarDynamic.innerHTML = '<p>No content to edit. Add content by making a grid or column.</p>';
  }
}


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