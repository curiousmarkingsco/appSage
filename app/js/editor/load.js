/*

  editor/load.js
  
  This file is intended to be the primary location for functions that load
  saved content from previous edits. This loading is only for the editor page.

*/

// Passed data from local storage, this function iterates through all elements
// and appends them to the page.
// DATA IN: JSON Object
function loadChanges(json) {
  const pageContainer = document.getElementById('page');
  pageContainer.innerHTML = '';
  const data = JSON.parse(json);
  data.forEach(item => {
    const element = document.createElement(item.tagName);
    element.className = item.className;
    element.innerHTML = item.content;
    pageContainer.appendChild(element);

    if (element.classList.contains('pagegrid')) {
      restoreGridCapabilities(element);
    }

    if (element.classList.contains('maincontainer')) {
      restoreContainerCapabilities(element);
    }
  });

  pageContainer.querySelectorAll('.pagecontent').forEach(contentContainer => {
    
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

// This function makes it so that saved elements related to grids can be edited once more.
// DATA IN: HTML Element, <div>
function restoreGridCapabilities(grid) {
  const addColumnButton = createAddColumnButton(grid);
  grid.appendChild(addColumnButton);
  enableEditGridOnClick(grid);
  Array.from(grid.querySelectorAll('.pagecolumn')).forEach(column => {
    enableEditColumnOnClick(column);
    column.appendChild(createAddContentButton(column));
    Array.from(column.querySelectorAll('.pagecontent')).forEach(contentContainer => {
      enableEditContentOnClick(contentContainer);
      observeClassManipulation(contentContainer);
    });
  });
} // DATA OUT: null

// This function makes it so that saved elements related to container box can be edited once more.
// DATA IN: HTML Element, <div>
function restoreContainerCapabilities(container) {
  const addContentButton = createAddContentButton(container);
  container.appendChild(addContentButton);
  const addContainerButton = createAddContainerButton(container);
  container.appendChild(addContainerButton);
  enableEditContainerOnClick(container);
  Array.from(container.querySelectorAll('.pagecontainer')).forEach(contentContainer => {
    const addChildContentButton = createAddContentButton(contentContainer);
    contentContainer.appendChild(addChildContentButton);
    const addChildContainerButton = createAddContainerButton(contentContainer);
    contentContainer.appendChild(addChildContainerButton);
  });
  Array.from(container.querySelectorAll('.pagecontent')).forEach(contentContainer => {
    enableEditContentOnClick(contentContainer);
    observeClassManipulation(contentContainer);
  });
} // DATA OUT: null


