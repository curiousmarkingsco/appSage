/* load.js */

/* For future reference, removing storage: localStorage.removeItem('configId') */

function setupAutoSave(page) {
  const targetNode = document.getElementById('page');

  const config = {
    childList: true, // Observes direct children
    attributes: true, // Observes attributes changes
    subtree: true, // Observes all descendants
    characterData: true // Observes text changes
  };

  const callback = function (mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' || mutation.type === 'attributes' || mutation.type === 'characterData') {
        saveChanges(page); // Call save function whenever a change is detected
        break; // Break after saving once to avoid multiple saves for the same batch of mutations
      }
    }
  };

  const observer = new MutationObserver(callback);

  observer.observe(targetNode, config);
  console.log('Auto-save setup complete.');
}

function saveChanges(page) {
  const pageContainer = document.getElementById('page');
  const elements = pageContainer.querySelectorAll('.ugc-keep');

  const data = Array.from(elements).map(element => {
    return {
      tagName: element.tagName,
      className: element.className,
      // Filter out 'ugc-discard' elements before saving innerHTML
      content: getCleanInnerHTML(element)
    };
  });

  const json = JSON.stringify(data);
  localStorage.setItem(page, json);  // Save to localStorage for simplicity
  console.log('Changes saved successfully!');
}

function getCleanInnerHTML(element) {
  // Clone the element to not affect the original DOM
  const clone = element.cloneNode(true);

  // Remove all elements within the clone that have the 'ugc-discard' class
  const discardElements = clone.querySelectorAll('.ugc-discard');
  discardElements.forEach(el => el.parentNode.removeChild(el));

  // Return the cleaned innerHTML
  return clone.innerHTML;
}

function loadChanges(json) {
  const pageContainer = document.getElementById('page');
  pageContainer.innerHTML = ''; // Clear existing content

  const data = JSON.parse(json);
  data.forEach(item => {
    const element = document.createElement(item.tagName);
    element.className = item.className;
    element.innerHTML = item.content;
    pageContainer.appendChild(element);

    // Check if it is a grid container and restore grid capabilities
    if (element.classList.contains('grid')) {
      restoreGridCapabilities(element);
    } else {
      // Otherwise, it might be a column or other editable element
      addEditingCapabilities(element);
    }
  });
}

function addEditingCapabilities(column, grid) {
  const editButton = column.querySelector('.editContent');
  if (editButton) {
    editButton.addEventListener('click', function () {
      detectAndLoadContentType(column);
      tabinate('Edit Content');
      document.getElementById('sidebar-dynamic').classList.add('editing');
      highlightEditingElement(column);  // Highlight the column being edited
    });
  }

  const removeButton = column.querySelector('.removeColumn');
  if (removeButton) {
    removeButton.addEventListener('click', function () {
      if (columnHasContent(column)) {
        showConfirmationModal('Are you sure you want to delete this column?', () => {
          grid.removeChild(column);
          updateColumnCount(grid);
        });
      } else {
        grid.removeChild(column);
        updateColumnCount(grid);
      }
    });
  }
}

function restoreGridCapabilities(grid) {
  // Assuming you have functionality to add columns dynamically and edit grid properties
  const addColumnButton = createAddColumnButton(grid); // Ensures the 'add column' button is restored
  grid.appendChild(addColumnButton);

  // Restore editing properties for each column within the grid
  Array.from(grid.querySelectorAll('.column-content')).forEach(column => {
    addEditingCapabilities(column, grid);
  });
}
