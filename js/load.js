/* load.js */

function setupAutoSave(page) {
  const targetNode = document.getElementById('page');
  const config = {
      childList: true,
      attributes: true,
      subtree: true,
      characterData: true
  };
  const callback = function (mutationsList, observer) {
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
  savePage(page, json);
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
      }
  });
}

// Utility functions for managing localStorage with a 'tailwindvpb' object
function loadPage(pageId) {
  const tailwindvpb = JSON.parse(localStorage.getItem('tailwindvpb') || '{}');
  return tailwindvpb.pages ? tailwindvpb.pages[pageId] : null;
}

function savePage(pageId, data) {
  const tailwindvpb = JSON.parse(localStorage.getItem('tailwindvpb') || '{}');
  if (!tailwindvpb.pages) {
      tailwindvpb.pages = {};
  }
  tailwindvpb.pages[pageId] = data;
  localStorage.setItem('tailwindvpb', JSON.stringify(tailwindvpb));
}

function restoreGridCapabilities(grid) {
  const addColumnButton = createAddColumnButton(grid);
  grid.appendChild(addColumnButton);
  Array.from(grid.querySelectorAll('.pagecolumn')).forEach(column => {
    restoreColumnCapabilities(column, grid);
    restoreContentCapabilities(column);
  });
}

function restoreColumnCapabilities(column, grid) {
  let editButton;
  editButton = column.querySelector('.editContent');
  if (!editButton) {
    editButton = createEditColumnButton(column);
  }
  const sidebar = document.getElementById('sidebar-dynamic');
  column.appendChild(editButton);
  let removeButton;
  removeButton = column.querySelector('.removeColumn');
  if (!removeButton) {
    removeButton = createRemoveColumnButton(column, grid);
  }
  column.appendChild(removeButton);
}

function restoreContentCapabilities(contentContainer) {
  let editButton;
  editButton = contentContainer.querySelector('.editContent');
  if (!editButton) {
    editButton = addEditContentButton(contentContainer);
  }
  contentContainer.appendChild(editButton);
}
