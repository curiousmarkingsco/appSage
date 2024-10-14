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
    pageContainer.innerHTML += item.content;
  });

  pageContainer.querySelectorAll('.pagegrid').forEach(grid => {
    restoreGridCapabilities(grid);
  });

  pageContainer.querySelectorAll('.maincontainer').forEach(maincontainer => {
    restoreContainerCapabilities(maincontainer);
  });

  pageContainer.querySelectorAll('.pagecontent').forEach(contentContainer => {
    displayMediaFromIndexedDB(contentContainer.firstElementChild);
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
  displayMediaFromIndexedDB(grid);
  Array.from(grid.querySelectorAll('.pagecolumn')).forEach(column => {
    enableEditColumnOnClick(column);
    displayMediaFromIndexedDB(column);
    column.appendChild(createAddContentButton(column));
    const addComponentButton = createAddComponentButton(column);
    column.appendChild(addComponentButton);
    const addContainerButton = createAddContainerButton(column);
    column.appendChild(addContainerButton);
    if (advancedMode === true){
      const addHtmlButton = createAddHtmlButton(column);
      column.appendChild(addHtmlButton);
    }
    enableEditContainerOnClick(column);
    displayMediaFromIndexedDB(column);
    Array.from(column.querySelectorAll('.pagecontent')).forEach(contentContainer => {
      displayMediaFromIndexedDB(contentContainer.firstElementChild);
      enableEditContentOnClick(contentContainer);
      observeClassManipulation(contentContainer);
    });
    Array.from(column.querySelectorAll('.pagecontainer')).forEach(contentContainer => {
      const addChildContentButton = createAddContentButton(contentContainer);
      contentContainer.appendChild(addChildContentButton);
      const addChildContainerButton = createAddContainerButton(contentContainer);
      contentContainer.appendChild(addChildContainerButton);
      enableEditContainerOnClick(contentContainer);
      displayMediaFromIndexedDB(contentContainer);
    });
  });
} // DATA OUT: null

// This function makes it so that saved elements related to container box can be edited once more.
// DATA IN: HTML Element, <div>
function restoreContainerCapabilities(container) {
  const addContentButton = createAddContentButton(container);
  container.appendChild(addContentButton);
  const addComponentButton = createAddComponentButton(container);
  container.appendChild(addComponentButton);
  const addContainerButton = createAddContainerButton(container);
  container.appendChild(addContainerButton);
  if (advancedMode === true){
    const addHtmlButton = createAddHtmlButton(container);
    container.appendChild(addHtmlButton);
  }
  enableEditContainerOnClick(container);
  displayMediaFromIndexedDB(container);
  Array.from(container.querySelectorAll('.pagecontainer')).forEach(contentContainer => {
    const addChildContentButton = createAddContentButton(contentContainer);
    contentContainer.appendChild(addChildContentButton);
    const addChildComponentButton = createAddComponentButton(contentContainer);
    contentContainer.appendChild(addChildComponentButton);
    const addChildContainerButton = createAddContainerButton(contentContainer);
    contentContainer.appendChild(addChildContainerButton);
    if (advancedMode === true){
      const addChildHtmlButton = createAddHtmlButton(contentContainer);
      contentContainer.appendChild(addChildHtmlButton);
    }
    enableEditContainerOnClick(contentContainer);
    displayMediaFromIndexedDB(contentContainer);
  });
  Array.from(container.querySelectorAll('.pagecontent')).forEach(contentContainer => {
    displayMediaFromIndexedDB(contentContainer.firstElementChild);
    enableEditContentOnClick(contentContainer);
    observeClassManipulation(contentContainer);
  });
} // DATA OUT: null


