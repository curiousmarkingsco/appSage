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
        savePageSettingsChanges(page);
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
  // Query only elements with 'ugc-keep' that are meant to be saved
  const elements = pageContainer.querySelectorAll('.ugc-keep:not([data-editor-temp])');
  const data = Array.from(elements).map(element => ({
      tagName: element.tagName,
      className: element.className.replace(/bg-\[url\(.*?\)\]/g, '').replace(/\s+/g, ' ').trim(),
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

  const grid = document.querySelector('#page .grid');
  if (grid) {
    const pageElement = document.getElementById('page');
    const gridCount = Array.prototype.slice.call(pageElement.children).length;
    const buttonBar = document.getElementById('gridButtonsBottombar')
    if (gridCount > 1) {
      document.querySelectorAll('.moveGrid').forEach(element => element.remove());
      buttonBar.prepend(createVerticalMoveGridButton(grid, 'up'));
      buttonBar.appendChild(createVerticalMoveGridButton(grid, 'down'));
    }
    addGridOptions(grid);
  }
}

// Utility functions for managing localStorage with a 'tailwindvpb' object
function loadPage(pageId) {
  const tailwindvpb = JSON.parse(localStorage.getItem('tailwindvpb') || '{}');
  if (tailwindvpb.pages && tailwindvpb.pages[pageId] && tailwindvpb.pages[pageId].page_data) {
    return tailwindvpb.pages[pageId].page_data;
  } else {
    return null;
  }  
}

function savePage(pageId, data) {
  const tailwindvpb = JSON.parse(localStorage.getItem('tailwindvpb') || '{}');
  if (!tailwindvpb.pages) {
    tailwindvpb.pages = {};
  }
  if (!tailwindvpb.pages[pageId]) {
    tailwindvpb.pages[pageId] = { page_data: {}, settings: {}};
  }
  tailwindvpb.pages[pageId].page_data = data;
  localStorage.setItem('tailwindvpb', JSON.stringify(tailwindvpb));
}

function restoreGridCapabilities(grid) {
  const addColumnButton = createAddColumnButton(grid);
  grid.appendChild(addColumnButton);
  Array.from(grid.querySelectorAll('.pagecolumn')).forEach(column => {
    restoreColumnCapabilities(column, grid);
    Array.from(column.querySelectorAll('.pagecontent')).forEach(content => {
      restoreContentCapabilities(column, content);
    });
  });
}

function restoreColumnCapabilities(column, grid) {
  let gridButton;
  gridButton = column.querySelector('.editGrid');
  if (!gridButton) {
    gridButton = createEditGridButton(grid);
  }
  column.appendChild(gridButton);

  let editButton;
  editButton = column.querySelector('.editColumn');
  if (!editButton) {
    editButton = createEditColumnButton(column);
  }
  column.appendChild(editButton);

  let addButton;
  addButton = column.querySelector('.addContent');
  if (!addButton) {
    addButton = createAddContentButton(column);
  }
  column.appendChild(addButton);

  let removeButton;
  removeButton = column.querySelector('.removeColumn');
  if (!removeButton) {
    removeButton = createRemoveColumnButton(column, grid);
  }
  column.appendChild(removeButton);
}

function restoreContentCapabilities(column, contentContainer) {
  let editButton;
  editButton = contentContainer.querySelector('.editContent');
  if (!editButton) {
    editButton = createEditContentButton(contentContainer);
  }
  contentContainer.appendChild(editButton);

  let removeButton;
  removeButton = contentContainer.querySelector('.removeContent');
  if (!removeButton) {
    removeButton = createRemoveContentButton(column, contentContainer);
  }
  contentContainer.appendChild(removeButton);
}

function savePageSettingsChanges(pageId) {
  const page = document.getElementById('page');
  const settings = {
    id: page.id,
    className: page.className.replace(/bg-\[url\(.*?\)\]/g, '').replace(/\s+/g, ' ').trim(),
    metaTags: ''
  }
  console.log(settings);
  const json = JSON.stringify(settings);
  savePageSettings(pageId, json);
}

function savePageSettings(pageId, data) {
  const tailwindvpb = JSON.parse(localStorage.getItem('tailwindvpb') || '{}');
  if (!tailwindvpb.pages) {
    tailwindvpb.pages = {};
  }
  if (!tailwindvpb.pages[pageId]) {
    tailwindvpb.pages[pageId] = { page_data: {}, settings: {}};
  }
  console.log(data);
  tailwindvpb.pages[pageId].settings = data;
  localStorage.setItem('tailwindvpb', JSON.stringify(tailwindvpb));
}