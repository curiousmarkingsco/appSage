/* load.js */

function setupAutoSave(page) {
  const targetNode = document.getElementById('page');
  const config = {
    childList: true,
    attributes: true,
    subtree: true,
    characterData: true
  };
  const callback = function(mutationsList, observer) {
    for (const mutation of mutationsList) {
      if (['childList', 'attributes', 'characterData'].includes(mutation.type)) {
        saveChanges(page);
        break;
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
  const data = Array.from(elements).map(element => ({
    tagName: element.tagName,
    className: element.className,
    content: getCleanInnerHTML(element)
  }));
  const json = JSON.stringify(data);
  localStorage.setItem(page, json);
  console.log('Changes saved successfully!');
}

function getCleanInnerHTML(element) {
  const clone = element.cloneNode(true);
  const discardElements = clone.querySelectorAll('.ugc-discard');
  discardElements.forEach(el => el.parentNode.removeChild(el));
  return clone.innerHTML;
}

function loadChanges(json) {
  const pageContainer = document.getElementById('page');
  pageContainer.innerHTML = '';
  const data = JSON.parse(json);
  data.forEach(item => {
    const element = document.createElement(item.tagName);
    element.className = item.className;
    element.innerHTML = item.content;
    pageContainer.appendChild(element);

    if (element.classList.contains('grid')) {
      restoreGridCapabilities(element);
    } else if (element.classList.contains('content-container')) {
      restoreContentCapabilities(element);
    } else {
      restoreColumnCapabilities(element, pageContainer);
    }
  });
}

function restoreGridCapabilities(grid) {
  const addColumnButton = createAddColumnButton(grid);
  grid.appendChild(addColumnButton);
  Array.from(grid.querySelectorAll('.pagecolumn')).forEach(column => {
    restoreColumnCapabilities(column, grid);
  });
}

function restoreColumnCapabilities(column, grid) {
  const editButton = column.querySelector('.editContent');
  const sidebar = document.getElementById('sidebar-dynamic');
  if (editButton) {
    editButton.addEventListener('click', function() {
      sidebar.innerHTML = `<div><strong>Edit Column</strong></div>`;
      tabinate('Edit Column');
      highlightEditingElement(column);
      addStyleOptions(sidebar, column);
    });
  }
  const removeButton = column.querySelector('.removeColumn');
  if (removeButton) {
    removeButton.addEventListener('click', function() {
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

function restoreContentCapabilities(contentContainer) {
  console.log(contentContainer);
  const editButton = contentContainer.querySelector('.editContent');
  if (editButton) {
    editButton.addEventListener('click', function() {
      detectAndLoadContentType(contentContainer);
      tabinate('Edit Content');
      highlightEditingElement(contentContainer);
    });
  }
}
