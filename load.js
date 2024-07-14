/* load.js */

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
  alert('Changes saved successfully!');
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
      const column = document.createElement(item.tagName);
      column.className = item.className;
      column.innerHTML = item.content;
      pageContainer.appendChild(column);
  });
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

function addEditingCapabilities(column) {
  const editButton = column.querySelector('.editContent');
  if (editButton) {
      editButton.addEventListener('click', function() {
          updateSidebarForContentType(column);
      });
  }

  const removeButton = column.querySelector('.removeColumn');
  if (removeButton) {
      removeButton.addEventListener('click', function() {
          if (columnHasContent(column)) {
              showConfirmationModal('Are you sure you want to delete this column?', () => {
                  column.parentNode.removeChild(column);
                  updateColumnCount(column.parentNode);
              });
          } else {
              column.parentNode.removeChild(column);
              updateColumnCount(column.parentNode);
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
      addEditingCapabilities(column);
  });
}
