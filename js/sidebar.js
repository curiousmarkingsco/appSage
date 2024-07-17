/* sidebar.js */

function showConfirmationModal(message, onConfirm) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center';
  modal.innerHTML = `
      <div class="bg-white p-4 rounded-lg max-w-sm mx-auto">
          <p class="text-black">${message}</p>
          <div class="flex justify-between mt-4">
              <button id="confirmDelete" class="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded">Delete</button>
              <button id="cancelDelete" class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded">Cancel</button>
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

function loadColumnSettings(editingElement) {
  const sidebarDynamic = document.getElementById('sidebar-dynamic');
  if (editingElement) {
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
    highlightEditingElement(editingElement);
  } else {
    document.getElementById('sidebar-dynamic').innerHTML = '<p>Nothing to edit. Add a column by clicking the Plus (+) button after making a grid.</p>';
  }
}
