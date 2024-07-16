/* column.js */

function createColumn(gridContainer) {
  const column = document.createElement('div');
  column.className = 'col-span-1 p-4 m-4 pagecolumn group';

  // Adding only the relevant buttons for column manipulation
  const removeColumnButton = document.createElement('button');
  removeColumnButton.className = 'removeColumn hidden z-50 absolute left-2 bg-red-500 group-hover:block hover:bg-red-700 text-white font-bold py-2 px-4 rounded h-12 w-12';
  removeColumnButton.textContent = '🗑️';
  removeColumnButton.addEventListener('click', function() {
    if (columnHasContent(column)) {
      showConfirmationModal('Are you sure you want to delete this column?', () => {
        gridContainer.removeChild(column);
        updateColumnCount(gridContainer);
      });
    } else {
      gridContainer.removeChild(column);
      updateColumnCount(gridContainer);
    }
  });

  const sidebar = document.getElementById('sidebar-dynamic');
  const editColumnButton = document.createElement('button');
  editColumnButton.className = 'editColumn ugc-discard hidden z-50 absolute left-16 group-hover:block bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded h-12 w-12';
  editColumnButton.textContent = '🏛️';
  editColumnButton.addEventListener('click', function () {
    sidebar.innerHTML = `<div><strong>Edit Column</strong></div>`;
    tabinate('Edit Column');
    highlightEditingElement(column);
    addStyleOptions(sidebar, column);
  });

  column.appendChild(editColumnButton);
  column.appendChild(removeColumnButton);
  return column;
}

function highlightEditingElement(element) {
  removeEditingHighlights(); // Clear existing highlights
  if (element) {
    element.id = 'editing-highlight'; // Highlight the current element
  }
}

function createAddColumnButton(gridContainer) {
  const button = document.createElement('button');
  button.className = 'addColumn ugc-discard bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
  button.textContent = '+';
  button.onclick = function () {
    const currentColumns = gridContainer.querySelectorAll('.col-span-1').length;
    if (currentColumns < 6) {  // Ensure limit is respected
      const newColumn = createColumn(gridContainer);
      gridContainer.insertBefore(newColumn, this);
      updateColumnCount(gridContainer);
    } else {
      alert('Maximum of 6 columns allowed.');
    }
  };
  return button;
}

function updateColumnClass(element, value, prefix) {
  const currentClasses = element.className.split(' ').filter(cls => !cls.startsWith(prefix));
  currentClasses.push(value); // Add the new class
  element.className = currentClasses.join(' ');
}

function columnHasContent(column) {
  if (column) {
    // Check if column contains any significant elements
    // We assume here that only certain tags are considered "content"
    const contentTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'video', 'audio', 'a']; // Add other tags as needed
    return Array.from(column.querySelectorAll('*')).some(child => {
      // Check if the element is one of the content types and not empty
      return contentTags.includes(child.tagName.toLowerCase()) && (
        child.textContent.trim() !== '' || // Text content is not empty
        (child.src && child.src.trim() !== '') || // For media elements with src
        (child.href && child.href.trim() !== '') // For links
      );
    });
  } else {
    sidebarDynamic = document.getElementById('sidebar-dynamic').innerHTML = '<p>Nothing to edit. Add a column by clicking the Plus (+) button.</p>';
  }
}

function addStyleOptions(sidebar, element) {
  const marginSelect = document.createElement('select');
  const paddingSelect = document.createElement('select');
  ['2', '4', '8'].forEach(size => {
    let marginOption = document.createElement('option');
    marginOption.value = 'm-' + size;
    marginOption.textContent = 'Margin ' + size;
    marginSelect.appendChild(marginOption);

    let paddingOption = document.createElement('option');
    paddingOption.value = 'p-' + size;
    paddingOption.textContent = 'Padding ' + size;
    paddingSelect.appendChild(paddingOption);
  });

  marginSelect.onchange = () => updateColumnClass(element, marginSelect.value, 'm-');
  paddingSelect.onchange = () => updateColumnClass(element, paddingSelect.value, 'p-');

  sidebar.appendChild(marginSelect);
  sidebar.appendChild(paddingSelect);
}

function removeEditingHighlights() {
  const highlight = document.getElementById('editing-highlight');
  if (highlight) {
    highlight.id = '';
  }
}