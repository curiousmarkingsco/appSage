/*

  editor/load.js

  This file is intended to be the primary location for functions that load
  saved content from previous edits. This loading is only for the editor page.

*/

// Passed data from local storage, this function iterates through all elements
// and appends them to the page.
// DATA IN: JSON Object
function loadChanges(json, pasted = false) {
  const pasteContainer = document.getElementById('page');
  if (!pasted) {
    pasteContainer.innerHTML = '';
    let data = json;
    if (typeof data === 'string') {
      data = JSON.parse(data);
    }
    data.forEach(item => {
      if (!item.className.includes('innergrid')) pasteContainer.innerHTML += item.content;
    });
    rebindEditingButtons();
  }

  pasteContainer.querySelectorAll('.pagegrid').forEach(grid => {
    restoreGridCapabilities(grid);
  });

  pasteContainer.querySelectorAll('.maincontainer').forEach(maincontainer => {
    restoreContainerCapabilities(maincontainer);
  });

  pasteContainer.querySelectorAll('.innergrid').forEach(grid => {
    restoreGridCapabilities(grid);
  });

  pasteContainer.querySelectorAll('.pagecontent').forEach(contentContainer => {
    const addCopyContentHtmlButton = createCopyHtmlSectionButton(contentContainer);
    contentContainer.appendChild(addCopyContentHtmlButton);
    displayMediaFromStorage(contentContainer.firstElementChild);
    enableEditContentOnClick(contentContainer);
    observeClassManipulation(contentContainer);
  });

  const grid = document.querySelector('#page .grid');
  if (grid) {
    addGridOptions(grid);
  }

  document.querySelectorAll('.pagecontent a, .pagecontent button').forEach(linkElement => {
    linkElement.addEventListener('click', function(e) { e.preventDefault(); });
  });
} // DATA OUT: null
window.loadChanges = loadChanges;

// This function makes it so that saved elements related to grids can be edited once more.
// DATA IN: HTML Element, <div>
function restoreGridCapabilities(grid) {
  const addColumnButton = createAddColumnButton(grid);
  grid.appendChild(addColumnButton);
  if (advancedMode == true) {
    const addContentChildHtmlButton = createAddHtmlButton(grid);
    grid.appendChild(addContentChildHtmlButton);
    const addCopyHtmlButton = createCopyHtmlSectionButton(grid);
    grid.appendChild(addCopyHtmlButton);
  }
  enableEditGridOnClick(grid);
  displayMediaFromStorage(grid);
  Array.from(grid.querySelectorAll('.pagecolumn')).forEach(column => {
    enableEditColumnOnClick(column);
    displayMediaFromStorage(column);
    column.appendChild(createAddContentButton(column));
    const addComponentButton = createAddComponentButton(column);
    column.appendChild(addComponentButton);
    const copyHtmlButton = createCopyHtmlSectionButton(column);
    column.appendChild(copyHtmlButton);
    const addContainerButton = createAddContainerButton(column);
    column.appendChild(addContainerButton);
    const addGridButton = createAddGridButton(column);
    column.appendChild(addGridButton);
    if (advancedMode === true){
      const addHtmlButton = createAddHtmlButton(column);
      column.appendChild(addHtmlButton);
    }
    enableEditContainerOnClick(column);
    displayMediaFromStorage(column);
    Array.from(column.querySelectorAll('.pagecontent')).forEach(contentContainer => {
      if (advancedMode === true){
        const addCopyContentHtmlButton = createCopyHtmlSectionButton(contentContainer);
        contentContainer.appendChild(addCopyContentHtmlButton);
      }
      displayMediaFromStorage(contentContainer.firstElementChild);
      enableEditContentOnClick(contentContainer);
      observeClassManipulation(contentContainer);
    });
    Array.from(column.querySelectorAll('.pagecontainer')).forEach(contentContainer => {
      const addChildContentButton = createAddContentButton(contentContainer);
      contentContainer.appendChild(addChildContentButton);
      const addChildContainerButton = createAddContainerButton(contentContainer);
      contentContainer.appendChild(addChildContainerButton);
      const addChildGridButton = createAddGridButton(contentContainer);
      contentContainer.appendChild(addChildGridButton);
      enableEditContainerOnClick(contentContainer);
      displayMediaFromStorage(contentContainer);
    });
  });
} // DATA OUT: null
window.restoreGridCapabilities = restoreGridCapabilities;

// This function makes it so that saved elements related to container box can be edited once more.
// DATA IN: HTML Element, <div>
function restoreContainerCapabilities(container) {
  const addContentButton = createAddContentButton(container);
  container.appendChild(addContentButton);
  const addComponentButton = createAddComponentButton(container);
  container.appendChild(addComponentButton);
  const addContainerButton = createAddContainerButton(container);
  container.appendChild(addContainerButton);
  const addGridButton = createAddGridButton(container);
  container.appendChild(addGridButton);
  if (advancedMode === true){
    const addHtmlButton = createAddHtmlButton(container);
    container.appendChild(addHtmlButton);
    const copyHtmlButton = createCopyHtmlSectionButton(container);
    container.appendChild(copyHtmlButton);
  }
  enableEditContainerOnClick(container);
  displayMediaFromStorage(container);
  Array.from(container.querySelectorAll('.pagecontainer')).forEach(contentContainer => {
    const addChildContentButton = createAddContentButton(contentContainer);
    contentContainer.appendChild(addChildContentButton);
    const addChildComponentButton = createAddComponentButton(contentContainer);
    contentContainer.appendChild(addChildComponentButton);
    const addChildContainerButton = createAddContainerButton(contentContainer);
    contentContainer.appendChild(addChildContainerButton);
    const addChildGridButton = createAddGridButton(contentContainer);
    contentContainer.appendChild(addChildGridButton);
    if (advancedMode === true){
      const addChildHtmlButton = createAddHtmlButton(contentContainer);
      contentContainer.appendChild(addChildHtmlButton);
      const copyHtmlChildButton = createCopyHtmlSectionButton(contentContainer);
      contentContainer.appendChild(copyHtmlChildButton);
    }
    enableEditContainerOnClick(contentContainer);
    displayMediaFromStorage(contentContainer);
  });
  Array.from(container.querySelectorAll('.pagecontent')).forEach(contentContainer => {
    if (advancedMode === true){
      const addCopyContentHtmlButton = createCopyHtmlSectionButton(contentContainer);
      contentContainer.appendChild(addCopyContentHtmlButton);
    }
    displayMediaFromStorage(contentContainer.firstElementChild);
    enableEditContentOnClick(contentContainer);
    observeClassManipulation(contentContainer);
  });
} // DATA OUT: null
window.restoreContainerCapabilities = restoreContainerCapabilities;

function rebindEditingButtons() {
  const page = document.getElementById('page');

  page.querySelectorAll('.pagegrid').forEach(grid => {
    restoreGridCapabilities(grid);
  });

  page.querySelectorAll('.maincontainer').forEach(container => {
    restoreContainerCapabilities(container);
  });

  page.querySelectorAll('.pagecontent').forEach(container => {
    const addCopy = createCopyHtmlSectionButton(container);
    container.appendChild(addCopy);
    enableEditContentOnClick(container);
    observeClassManipulation(container);
  });
}
window.rebindEditingButtons = rebindEditingButtons;
