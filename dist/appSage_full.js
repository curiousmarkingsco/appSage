/* File: ./app/js/editor/grid.js */
/*

  editor/grid.js

  This file is intended to be the primary location for anything related to adding, editing, and removing grids.

*/

// This function populates the sidebar with relevant editing options for grids.
// DATA IN: HTML Element, <div>
function addGridOptions(grid) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Edit Grid</strong></div>${generateMobileTabs()}`;
  activateTabs();

  if (grid) {
    const moveButtons = document.createElement('div');
    moveButtons.className = 'flex justify-between my-2'
    moveButtons.id = 'moveGridButtons'
    sidebar.prepend(moveButtons);

    const gridCount = document.getElementById('page').querySelectorAll('.grid').length
    if (gridCount > 1) moveButtons.appendChild(createVerticalMoveGridButton(grid, 'up'));
    moveButtons.appendChild(addRemoveGridButton(grid, sidebar));
    if (gridCount > 1) moveButtons.appendChild(createVerticalMoveGridButton(grid, 'down'));

    addEditableColumns(sidebar, grid);
    addGridAlignmentOptions(sidebar, grid);
    addEditableDimensions(sidebar, grid);
    highlightEditingElement(grid);

    addEditableColumnGaps(sidebar, grid);
    addEditableBorders(sidebar, grid);
    addEditableBackgroundColor(sidebar, grid);
    addEditableBackgroundImage(sidebar, grid);
    addEditableBackgroundImageURL(sidebar, grid);
    addEditableBackgroundFeatures(sidebar, grid);
    addEditableMarginAndPadding(sidebar, grid);
  }
} // DATA OUT: null

// This function creates the button for deleting the grid currently being
// edited. As the tooltip mentions, FOREVER. That's a long time!
// Currently, this button lives at the topbar nestled between the 'move grid'
// buttons on its left and right.
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div id="sidebar-dynamic">']
function addRemoveGridButton(grid, sidebar) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['remove-grid'])
  button.className = 'removeGrid bg-rose-500 hover:bg-rose-700 text-slate-50 font-bold p-2 rounded h-12 w-12 mx-auto';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32l512 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64zm32 64l512 0L517.3 421.8c-3 33-30.6 58.2-63.7 58.2l-331.1 0c-33.1 0-60.7-25.2-63.7-58.2L32 128zm256 88c2.2 0 4.3 1.1 5.5 2.9l20.7 29.6c7.3 10.5 21.6 13.4 32.4 6.6c11.7-7.3 14.8-22.9 6.9-34.1l-20.7-29.6c-10.2-14.6-27-23.3-44.8-23.3s-34.6 8.7-44.8 23.3l-20.7 29.6c-7.9 11.3-4.7 26.8 6.9 34.1c10.8 6.8 25.1 3.9 32.4-6.6l20.7-29.6c1.3-1.8 3.3-2.9 5.5-2.9zm-88.3 77.1c-10.8-6.8-25.1-3.9-32.4 6.6l-21.5 30.7c-6.4 9.1-9.8 20-9.8 31.2c0 30.1 24.4 54.4 54.4 54.4l49.6 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-49.6 0c-3.5 0-6.4-2.9-6.4-6.4c0-1.3 .4-2.6 1.2-3.7l21.5-30.7c7.9-11.3 4.7-26.8-6.9-34.1zM312 392c0 13.3 10.7 24 24 24l49.6 0c30.1 0 54.4-24.4 54.4-54.4c0-11.2-3.4-22.1-9.8-31.2l-21.5-30.7c-7.3-10.5-21.6-13.4-32.4-6.6c-11.7 7.3-14.8 22.9-6.9 34.1l21.5 30.7c.8 1.1 1.2 2.4 1.2 3.7c0 3.5-2.9 6.4-6.4 6.4L336 368c-13.3 0-24 10.7-24 24z"/></svg>';
  button.onclick = function () {
    showConfirmationModal('Are you sure you want to delete this entire grid?', () => {
      grid.parentNode.removeChild(grid);
      sidebar.innerHTML = '<p>Nothing to edit. Add a grid by clicking the Plus (+) button.</p>';
    });
  };
  return button;
} // DATA OUT: HTML Element, <button>

// This function creates the button for moving the element it belongs to upward
// and downward in the DOM. Currently, these buttons live at the top of the
// editor sidebar when the grid is/has been selected for editing.
// DATA IN: ['HTML Element, <div>', 'String:up/down']
function createVerticalMoveGridButton(grid, direction) {
  const button = document.createElement('button');
  button.className = 'moveGrid inline ugc-discard bg-amber-500 hover:bg-amber-700 text-slate-50 font-bold pt-1 pb-1.5 rounded w-12';
  if (direction == 'up') {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z"/></svg>';
    button.setAttribute('data-extra-info', tooltips['move-grid-up'])
  } else {
    button.innerHTML = ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M246.6 502.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 402.7 192 192c0-17.7 14.3-32 32-32s32 14.3 32 32l0 210.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128zM64 160c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 96C0 43 43 0 96 0L352 0c53 0 96 43 96 96l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7-14.3-32-32-32L96 64C78.3 64 64 78.3 64 96l0 64z"/></svg>';
    button.setAttribute('data-extra-info', tooltips['move-grid-down'])
  }
  button.addEventListener('click', function () {
    moveVertical(grid, direction);
  });
  return button;
} // DATA OUT: HTML Element, <button>

// This function is intended to present the sidebar editing options when a grid
// is clicked. Only the outer edges of the grid are clickable for this to work
// due to columns and content overlapping it.
// DATA IN: HTML Element, <div>
function enableEditGridOnClick(grid) {
  grid.addEventListener('click', function (event) {
    event.stopPropagation();
    addGridOptions(grid);
    highlightEditingElement(grid);
  });
} // DATA OUT: null


/* File: ./app/js/editor/style/grid.js */
/*

  editor/style/grid.js

  This file is intended to be the primary location for anything adding editor
  options to the sidebar in a context primarily for grids & seldom elsewhere.
  All functions here rely on `addDeviceTargetedOptions` which helps segregate
  styles between targeted device sizes.

*/

// This function gives the grid editor sidebar the ability to use alignment
// options from TailwindCSS.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addGridAlignmentOptions(sidebar, grid) {
  const justifyItemsOptions = ['start', 'end', 'center', 'stretch', 'reset'];
  const alignContentOptions = ['start', 'end', 'center', 'stretch', 'between', 'around', 'evenly', 'reset'];
  const placeItemsOptions = ['start', 'end', 'center', 'stretch', 'reset'];

  // Justify Items - See: https://tailwindcss.com/docs/justify-items
  addDeviceTargetedOptions(sidebar, grid, 'Justify Items', 'justify-items', justifyItemsOptions, 'icon-select');
  // Align Content - See: https://tailwindcss.com/docs/align-content
  addDeviceTargetedOptions(sidebar, grid, 'Align Content', 'content', alignContentOptions, 'icon-select');
  // Place Items - See: https://tailwindcss.com/docs/place-items
  addDeviceTargetedOptions(sidebar, grid, 'Place Items', 'place-items', placeItemsOptions, 'icon-select');
} // DATA OUT: null

// This function is for chooding the number of columns (vertical) that exist
// within the grid.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableColumns(sidebar, grid) {
  // Arbitrary constraint of 12 columns to reduce laymen designers making
  // things messy.
  const columns = Array.from({ length: 12 }, (_, i) => i + 1);

  // See: https://tailwindcss.com/docs/grid-template-columns
  addDeviceTargetedOptions(sidebar, grid, 'Number of Columns', 'grid-cols', columns, 'select');
} // DATA OUT: null


/* File: ./app/js/editor/column.js */
/*

  editor/column.js

  This file is intended to be the primary location for anything related to
  adding, editing, and removing columns.

  TODO: Currently, if a column has no margins, padding, or content inside of
        it, it can be extremely hard to click. How do we resolve this?

*/

// This function used to be more complex, but has been simplified over time.
// It is still here under a "don't fix it if it ain't broke" line of thinking.
// DATA IN: null
function createColumn() {
  const column = document.createElement('div');
  column.className = 'col-span-1 pagecolumn group';
  enableEditColumnOnClick(column);
  return column;
} // DATA OUT: HTML Element, <div>

// This function makes it so that when you click on a column, the editing options
// will be revealed in the sidebar to the left of the screen. It does this by
// first making the label and supporting elements for moving and removing the
// column, and then adding the editor buttons, dropdowns, etc.
// DATA IN: HTML Element, <div>
function enableEditColumnOnClick(column) {
  const sidebar = document.getElementById('sidebar-dynamic');
  column.addEventListener('click', function (event) {
    event.stopPropagation();
    sidebar.innerHTML = `<div><strong>Edit Column</strong></div>${generateMobileTabs()}`;
    activateTabs();
    highlightEditingElement(column);

    const moveButtons = document.createElement('div');
    moveButtons.className = 'flex justify-between my-2'
    moveButtons.id = 'moveColumnButtons'
    sidebar.prepend(moveButtons);
    moveButtons.appendChild(createHorizontalMoveColumnButton(column, 'left'));
    moveButtons.appendChild(createRemoveColumnButton(column, column.parentElement));
    moveButtons.appendChild(createHorizontalMoveColumnButton(column, 'right'));

    addColumnAlignmentOptions(sidebar, column);
    addEditableBorders(sidebar, column);
    addEditableBackgroundColor(sidebar, column);
    addEditableBackgroundImage(sidebar, column);
    addEditableBackgroundImageURL(sidebar, column);
    addEditableBackgroundFeatures(sidebar, column);
    addEditableDimensions(sidebar, column);
    addEditableMarginAndPadding(sidebar, column);
  });
} // DATA OUT: null

// This function creates the button for moving the element it belongs to upward
// and downward in the DOM. Because it is a column, this sometimes or often
// means it will be moving left/right, rather than literally 'upward/downward.'
// Currently, these buttons live at the top of the editor sidebar when the
// column is/has been selected for editing.
// DATA IN: ['HTML Element', 'String:left/right']
function createHorizontalMoveColumnButton(column, direction) {
  const button = document.createElement('button');
  button.className = 'moveColumn ugc-discard bg-amber-500 hover:bg-amber-700 text-slate-50 font-bold p-2 rounded h-12 w-16';
  button.setAttribute('data-extra-info', tooltips['move-column'] + direction);
  if (direction == 'left') {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L109.3 224 320 224c17.7 0 32 14.3 32 32s-14.3 32-32 32l-210.7 0 73.4 73.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-128-128zM352 96c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0z"/></svg>';
    button.innerHTML += ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l512 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM192 96l0 320L64 416 64 96l128 0zm64 0l128 0 0 320-128 0 0-320zm320 0l0 320-128 0 0-320 128 0z"/></svg>';
  } else {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l512 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM192 96l0 320L64 416 64 96l128 0zm64 0l128 0 0 320-128 0 0-320zm320 0l0 320-128 0 0-320 128 0z"/></svg>';
    button.innerHTML += ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>';
  }
  button.addEventListener('click', function () {
    moveColumnHorizontal(column, direction);
  });
  return button;
} // DATA OUT: HTML Element, <button>

// This function creates the button for deleting the column currently being
// edited. As the tooltip mentions, FOREVER. That's a long time!
// Currently, this button lives at the topbar nestled between the Move Column
// buttons on its left and right.
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div>']
function createRemoveColumnButton(column, gridContainer) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['remove-column'])
  button.className = 'removeColumn ugc-discard  bg-rose-500 top-2 hover:bg-rose-700 text-slate-50 font-bold p-2 rounded h-12 w-12 mx-auto';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32l512 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64zm32 64l512 0L517.3 421.8c-3 33-30.6 58.2-63.7 58.2l-331.1 0c-33.1 0-60.7-25.2-63.7-58.2L32 128zm256 88c2.2 0 4.3 1.1 5.5 2.9l20.7 29.6c7.3 10.5 21.6 13.4 32.4 6.6c11.7-7.3 14.8-22.9 6.9-34.1l-20.7-29.6c-10.2-14.6-27-23.3-44.8-23.3s-34.6 8.7-44.8 23.3l-20.7 29.6c-7.9 11.3-4.7 26.8 6.9 34.1c10.8 6.8 25.1 3.9 32.4-6.6l20.7-29.6c1.3-1.8 3.3-2.9 5.5-2.9zm-88.3 77.1c-10.8-6.8-25.1-3.9-32.4 6.6l-21.5 30.7c-6.4 9.1-9.8 20-9.8 31.2c0 30.1 24.4 54.4 54.4 54.4l49.6 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-49.6 0c-3.5 0-6.4-2.9-6.4-6.4c0-1.3 .4-2.6 1.2-3.7l21.5-30.7c7.9-11.3 4.7-26.8-6.9-34.1zM312 392c0 13.3 10.7 24 24 24l49.6 0c30.1 0 54.4-24.4 54.4-54.4c0-11.2-3.4-22.1-9.8-31.2l-21.5-30.7c-7.3-10.5-21.6-13.4-32.4-6.6c-11.7 7.3-14.8 22.9-6.9 34.1l21.5 30.7c.8 1.1 1.2 2.4 1.2 3.7c0 3.5-2.9 6.4-6.4 6.4L336 368c-13.3 0-24 10.7-24 24z"/></svg>';
  button.addEventListener('click', function () {
    if (columnHasContent(column)) {
      showConfirmationModal('Are you sure you want to delete this column?', () => {
        gridContainer.removeChild(column);
      });
    } else {
      gridContainer.removeChild(column);
    }
  });
  return button;
} // DATA OUT: HTML Element, <button>

// This function creates the button for making a new column. This button exists
// inside an already existing grid. You are able to see this button when
// hovering the mouse over said existing grid. Once it makes the new column,
// it updates the sidebar to reveal all of the editing options someone at some
// point deemed to be available for columns.
// DATA IN: HTML Element, <div>
function createAddColumnButton(gridContainer) {
  const sidebar = document.getElementById('sidebar-dynamic');
  const menuItem = document.createElement('button');
  menuItem.setAttribute('data-extra-info', tooltips['add-column']);
  menuItem.className = 'addColumn w-48 h-12 ugc-discard bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded';
  menuItem.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l512 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM192 96l0 320L64 416 64 96l128 0zm64 0l128 0 0 320-128 0 0-320zm320 0l0 320-128 0 0-320 128 0z"/></svg>`;
  menuItem.onclick = function () {
    const newColumn = createColumn();
    gridContainer.insertBefore(newColumn, this);
    newColumn.appendChild(createAddContentButton(newColumn));

    addColumnAlignmentOptions(sidebar, newColumn);
    addEditableBorders(sidebar, newColumn);
    addEditableBackgroundColor(sidebar, newColumn);
    addEditableBackgroundImage(sidebar, newColumn);
    addEditableBackgroundImageURL(sidebar, newColumn);
    addEditableBackgroundFeatures(sidebar, newColumn);
    addEditableMarginAndPadding(sidebar, newColumn);

    highlightEditingElement(newColumn);
  };
  return menuItem;
} // DATA OUT: HTML Element, <button>

// This function checks if content exists in a column so that the designer
// is warned when they click the 'delete column' button.
// DATA IN: HTML Element, <div>
function columnHasContent(column) {
  if (column) {
    // Check if column contains any significant elements
    // We assume here that only certain tags are considered "content"
    const contentTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'video', 'audio', 'form', 'button', 'a']; // Add other tags as needed
    return Array.from(column.querySelectorAll('*')).some(child => {
      // Check if the element is one of the content types and not empty
      return contentTags.includes(child.tagName.toLowerCase()) && (
        child.textContent.trim() !== '' || // Text content is not empty
        (child.src && child.src.trim() !== '') || // For media elements with src
        (child.href && child.href.trim() !== '') // For links
      );
    });
  }
} // DATA OUT: null

// This function is the ...function...al bit of the 'move column' buttons.
// DATA IN: ['HTML Element, <div>', 'String:left/right']
function moveColumnHorizontal(column, direction) {
  const parent = column.parentNode;
  let targetSibling = getNextValidSibling(column, direction);

  if (direction === 'left' && targetSibling) {
    parent.insertBefore(column, targetSibling);
  } else if (direction === 'right' && targetSibling) {
    parent.insertBefore(targetSibling, column);
  }
} // DATA OUT: null


/* File: ./app/js/editor/style/column.js */
/*

  editor/style/column.js

  This file is intended to be the primary location for anything adding editor
  options to the sidebar in a context primarily for columns & seldom elsewhere.
  All functions here rely on `addDeviceTargetedOptions` which helps segregate
  styles between targeted device sizes.

*/

// This function gives the column editor sidebar the ability to use alignment
// options from TailwindCSS.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addColumnAlignmentOptions(sidebar, column) {
  const justifyContentsOptions = ['start', 'end', 'center', 'stretch', 'between', 'around', 'evenly', 'reset'];
  const placeSelfOptions = ['start', 'end', 'center', 'stretch', 'reset'];

  // Justify Content - See: https://tailwindcss.com/docs/justify-content
  addDeviceTargetedOptions(sidebar, column, 'Justify Content', 'justify', justifyContentsOptions, 'icon-select');
  // Place Self - See: https://tailwindcss.com/docs/place-self
  // TODO: Add missing icons to js/editor/globals.js
  addDeviceTargetedOptions(sidebar, column, 'Place Self', 'place-self', placeSelfOptions, 'icon-select');
} // DATA OUT: null


/* File: ./app/js/editor/content.js */
/*

  editor/content.js

  TODO: A button for adding placeholder media paths for media elements
  TODO: Currently, if a column has no margins, padding, or content inside of
        it, it can be extremely hard to click. How do we resolve this?

*/

// This function creates a container for individual HTML elements. This is
// intended to make it easier to comprehend, within the code, movements of
// elements through the DOM and to be able to do things like add background
// images while still being able to give the actual element a background color
// so that legibility is still possible.
// TODO: Additionally, adding a background color to a button, for example,
//       creates confusing results since clicking that background doesn't
//       actually result in clicking the link. This needs to be fixed and
//       crafted more intentionally for certain elements.
// DATA IN: null
function addContentContainer() {
  const contentContainer = document.createElement('div');
  contentContainer.className = 'content-container pagecontent text-base'; // A new class specifically for content

  enableEditContentOnClick(contentContainer);
  observeClassManipulation(contentContainer);
  return contentContainer;
} // DATA OUT: HTML Element, <div class="pagecontent">

// This function adds a lot of the standard editing options that should be
// available for all elements. This listens for any clicks on editable content
// and also adds more important editing options before the standard options,
// such as the actual text being added, hrefs for links, form fields, etc.
// DATA IN: HTML Element, <div>
function enableEditContentOnClick(contentContainer) {
  const sidebar = document.getElementById('sidebar-dynamic');
  contentContainer.addEventListener('click', function (event) {
    event.stopPropagation();
    detectAndLoadContentType(contentContainer);
    // Editing options for all types of content
    addEditableBorders(sidebar, contentContainer);
    addEditableBackgroundColor(sidebar, contentContainer);
    addEditableBackgroundImage(sidebar, contentContainer);
    addEditableBackgroundImageURL(sidebar, contentContainer);
    addEditableBackgroundFeatures(sidebar, contentContainer);
    addEditableMarginAndPadding(sidebar, contentContainer);
    addEditableDimensions(sidebar, contentContainer);
    highlightEditingElement(contentContainer);
  });
} // DATA OUT: null

// This function creates the button for adding content to the column currently
// being hovered over by the designer.
// DATA IN: HTML Element, <div>
function createAddContentButton(column) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['add-content']);
  button.className = 'addContent ugc-discard z-50 hidden group-hover:block absolute bottom-2 left-[calc(50%-3rem)] bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded h-12 w-24';
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>`;
  button.addEventListener('click', function (event) {
    event.stopPropagation();
    updateSidebarForContentType(column);
    highlightEditingElement(column);
  });
  return button;
} // DATA OUT: HTML Element, <button>

// This function creates the button for deleting the content currently being
// edited. As the tooltip mentions, FOREVER. That's a long time!
// Currently, this button lives at the topbar nestled between the
// 'move content' buttons on its left and right.
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div id="sidebar-dynamic">']
function createRemoveContentButton(contentContainer) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['remove-content'])
  button.className = 'removeContent ugc-discard bg-rose-500 hover:bg-rose-700 text-slate-50 font-bold p-2 rounded h-12 w-12 mx-auto';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L409.6 295.8l42.1-42.1L474.3 231l11.3-11.3-33.9-33.9-62.1-62.1L355.7 89.8l-11.3 11.3-22.6 22.6-57.8 57.8L38.8 5.1zM306.2 214.7l50.5-50.5c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-47.8 47.8-25.4-19.9zM195.5 250l-72.9 72.9c-10.4 10.4-18 23.3-22.2 37.4L65 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2l88.3-88.3-77.9-61.4-27.6 27.6c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l24.9-24.9L195.5 250zM224 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9l-78.1 23 23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM426.7 18.7L412.3 33.2 389.7 55.8 378.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L517.3 18.7c-25-25-65.5-25-90.5 0z"/></svg>';
  button.addEventListener('click', function () {
    showConfirmationModal('Are you sure you want to delete this content?', () => {
      contentContainer.remove();
      document.getElementById('sidebar-dynamic').innerHTML = '';
    });
  });
  return button;
} // DATA OUT: HTML Element, <button>

// This function creates the button for moving the element the content belongs
// to upward and downward in the column. Currently, these buttons live at the
// top of the editor sidebar when the grid is/has been selected for editing.
// DATA IN: ['HTML Element, <div>', 'String:up/down']
function createVerticalMoveContentButton(contentContainer, direction) {
  const button = document.createElement('button');
  button.className = 'moveContent ugc-discard bg-amber-500 hover:bg-amber-700 text-slate-50 font-bold p-2 rounded h-12 w-16';
  if (direction == 'up') {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z"/></svg>';
    button.innerHTML += ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>';
    button.setAttribute('data-extra-info', tooltips['move-content-up'])
  } else {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>';
    button.innerHTML += ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M246.6 502.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 402.7 192 192c0-17.7 14.3-32 32-32s32 14.3 32 32l0 210.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128zM64 160c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 96C0 43 43 0 96 0L352 0c53 0 96 43 96 96l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7-14.3-32-32-32L96 64C78.3 64 64 78.3 64 96l0 64z"/></svg>';
    button.setAttribute('data-extra-info', tooltips['move-content-down'])
  }
  button.addEventListener('click', function () {
    moveVertical(contentContainer, direction);
  });
  return button;
} // DATA OUT: HTML Element, <button>

// This function figures out what to do after something in the editing view is
// clicked and either creates or finds the contextually relevant element and
// updates the sidebar with relevant styling options.
// DATA IN: HTML Element, <div>
function detectAndLoadContentType(contentContainer) {
  const sidebar = document.getElementById('sidebar-dynamic');
  // const oldMoveButtons = document.getElementById('moveContentButtons');
  // if (oldMoveButtons) { oldMoveButtons.remove }
  // 'form' MUST be first so that other elements don't get snagged up
  const types = ['form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'img', 'video', 'audio', 'a', 'button', 'input', 'textarea'];//, 'div', 'ul' ,'ol', 'li', 'textarea', 'input', 'select', 'option', 'figure', 'figcaption', 'article', 'section', 'header', 'nav', 'aside', 'footer', 'address', 'main', 'blockquote', 'dl', 'dt', 'dd'];
  const found = types.find(type => contentContainer.querySelector(type));
  if (found) {
    switch (found) {
      case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6': case 'button': case 'a': case 'p': case 'ol': case 'ul': case 'li': case 'form': case 'textarea': case 'input':
        updateSidebarForTextElements(sidebar, contentContainer);
        break;
      case 'img': case 'video': case 'audio':
        updateSidebarForTextElements(sidebar, contentContainer);
        break;
    }
  } else {
    // If no specific type is found, proceed with showing options to add new content
    updateSidebarForContentType(contentContainer);  // Redisplay content options as a fallback
  }

  const moveButtons = document.createElement('div');
  moveButtons.className = 'flex justify-between my-2';
  moveButtons.id = 'moveContentButtons';
  sidebar.prepend(moveButtons);

  // Minus one to remove the 'Add Content' button from the count
  const contentCount = contentContainer.parentElement.children.length - 1
  if (contentCount > 1) moveButtons.appendChild(createVerticalMoveContentButton(contentContainer, 'up'));
  moveButtons.appendChild(createRemoveContentButton(contentContainer));
  if (contentCount > 1) moveButtons.appendChild(createVerticalMoveContentButton(contentContainer, 'down'));

  highlightEditingElement(contentContainer);
} // DATA OUT: null

// This function and the one below it creates various buttons to choose from
// available elements that can be created.
// DATA IN: HTML Element, <div>
function updateSidebarForContentType(contentContainer) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Add Content Type:</strong></div>${generateMobileTabs()}`;
  activateTabs();

  const contentTypes = [
    { label: `<div class="p-6" data-extra-info="Text Content including Form elements.">${appSageEditorIcons["heading"]}</div>`, action: () => updateSidebarForTextElements(sidebar, contentContainer) },
    { label: `<div class="p-6" data-extra-info="Multi-Media Files">${appSageEditorIcons["media"]}</div>`, action: () => updateSidebarForTextElements(sidebar, contentContainer) },
  ];
  updateSidebarForTextElements(sidebar, contentContainer, true);
} // DATA OUT: null

// This cobbles together all the needed bits for adding/editing form fields.
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div>']
function updateSidebarFields(form, sidebarForm, submitButton, inputTypes) {
  // Remove all existing field editors except the add new field section
  const existingEditors = sidebarForm.querySelectorAll('.field-editor');
  existingEditors.forEach(editor => editor.remove());

  // Iterate over form inputs and create corresponding editors in the sidebar form
  form.querySelectorAll('input, select, textarea').forEach(input => {
    if (input === submitButton) return;

    const fieldEditor = document.createElement('div');
    fieldEditor.className = 'field-editor group my-4 bg-slate-50';

    const idLabel = document.createElement('label');
    idLabel.setAttribute('for', 'idField');
    idLabel.textContent = 'Input ID:';
    idLabel.className = 'block text-slate-700 text-sm font-bold mb-2';

    const idField = document.createElement('input');
    idField.setAttribute('name', 'idField');
    idField.type = 'text';
    idField.value = input.id;
    idField.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
    idField.oninput = function () {
      input.id = idField.value;
    };

    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'nameField');
    nameLabel.textContent = 'Input Name:';
    nameLabel.className = 'block text-slate-700 text-sm font-bold mb-2';

    const nameField = document.createElement('input');
    nameField.setAttribute('name', 'nameField');
    nameField.type = 'text';
    nameField.value = input.name;
    nameField.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
    nameField.oninput = function () {
      input.name = nameField.value;
    };

    const fieldLabel = document.createElement('label');
    fieldLabel.setAttribute('for', 'fieldInput');
    fieldLabel.textContent = 'Edit Field Label:';
    fieldLabel.className = 'block text-slate-700 text-sm font-bold mb-2';

    const fieldInput = document.createElement('input');
    fieldInput.setAttribute('name', 'fieldInput');
    fieldInput.type = 'text';
    fieldInput.value = input.placeholder;
    fieldInput.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
    fieldInput.oninput = function () {
      input.placeholder = fieldInput.value;
    };

    const fieldTypeLabel = document.createElement('label');
    fieldTypeLabel.setAttribute('for', 'fieldType');
    fieldTypeLabel.textContent = 'Edit Field Type:';
    fieldTypeLabel.className = 'block text-slate-700 text-sm font-bold mb-2';

    const fieldType = document.createElement('select');
    fieldType.setAttribute('name', 'fieldType');
    fieldType.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
    inputTypes.forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
      if (type === input.type) option.selected = true;
      fieldType.appendChild(option);
    });
    fieldType.onchange = function () {
      input.type = fieldType.value;
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'bg-rose-500 hover:bg-rose-700 text-slate-50 font-bold py-1.5 px-4 rounded mt-2 inline-block';
    deleteButton.onclick = function () {
      input.remove();
      fieldEditor.remove();
    };

    fieldEditor.appendChild(fieldLabel);
    fieldEditor.appendChild(fieldInput);
    fieldEditor.appendChild(fieldTypeLabel);
    fieldEditor.appendChild(fieldType);
    fieldEditor.appendChild(idLabel);
    fieldEditor.appendChild(idField);
    fieldEditor.appendChild(nameLabel);
    fieldEditor.appendChild(nameField);
    fieldEditor.appendChild(deleteButton);

    sidebarForm.appendChild(fieldEditor);
  });
} // DATA OUT: null

// This function is the operational bits of the "Move Grid" and "Move Content"
// buttons.
// DATA IN: ['HTML Element, <div>', 'String:up/down']
function moveVertical(element, direction) {
  const parent = element.parentNode;
  let targetSibling = getNextValidSibling(element, direction);

  if (direction === 'up' && targetSibling) {
    parent.insertBefore(element, targetSibling);
  } else if (direction === 'down' && targetSibling) {
    // For moving down, we need to insert before the next element of the targetSibling
    const nextToTarget = targetSibling.nextElementSibling;
    if (nextToTarget) {
      parent.insertBefore(element, nextToTarget);
    } else {
      parent.appendChild(element);  // If there's no next sibling, append to the end of the parent
    }
  }
} // DATA OUT: null

// This function makes those all-caps labels with the icon to the left of them.
// DATA IN: null
function createLabelAllDevices() {
  const label = document.createElement('span');
  label.className = 'inline-block col-span-5 text-slate-700 text-xs uppercase mt-2';
  label.textContent = 'All Devices';
  const breakpoints = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
  breakpoints.forEach(bp => {
    const responsiveIcon = document.createElement('span');
    responsiveIcon.className = 'h-3 w-3 mr-2 inline-block';
    responsiveIcon.innerHTML = `${appSageEditorIcons['responsive'][bp]}`;
    label.prepend(responsiveIcon);
  });
  return label;
} // DATA OUT: HTML Element, <span>

// This function helps media tags generate the correct text needed for the
// value of their `src` attribute.
// TODO: Find an alternative to storing image blobs in the local storage and
//  in the copy/pastes that might end up in a database bloating it to oblivion.
//  To see the offending line, search for this text (less the // part):
// contentContainer.style.backgroundImage
// DATA IN: ['HTML Element Event', 'HTML Element, <div>', 'String']
function generateMediaSrc(event, contentContainer, isPlaceholder) {
  const file = event.target.files ? event.target.files[0] : null;

  if (file || isPlaceholder) {
    const reader = new FileReader();

    reader.onload = function (e) {
      let mediaElement = contentContainer.querySelector('img, video, audio');
      const mediaType = file ? file.type.split('/')[0] : null;  // 'image', 'video', 'audio'

      if (!isPlaceholder) {
        // For media elements (image, video, audio)
        if (mediaElement && mediaElement.tagName.toLowerCase() !== mediaType) {
          mediaElement.remove();  // Remove old element if the type does not match
          mediaElement = null;
        }

        if (!mediaElement) {
          // Create new element if none exists or wrong type was removed
          if (mediaType === 'image') {
            mediaElement = document.createElement('img');
          } else if (mediaType === 'video') {
            mediaElement = document.createElement('video');
            mediaElement.controls = true;  // Add controls for video playback
          } else if (mediaType === 'audio') {
            mediaElement = document.createElement('audio');
            mediaElement.controls = true;  // Add controls for audio playback
          }
          contentContainer.appendChild(mediaElement);
        }

        // Set the src for the media element
        mediaElement.src = e.target.result;
      } else {
        // For background images
        contentContainer.style.backgroundImage = `url(${e.target.result})`;
        contentContainer.classList.add(`bg-[url('${e.target.result}')]`);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      // If handling placeholders, set the background image directly
      contentContainer.style.backgroundImage = `url(${event.target.value})`;
    }
  }
} // DATA OUT: null

// This function is a half-complete attempt as a catch-all way of editing any
// and all HTML elements, particularly those that may have been copy/pasted in.
// DATA IN: HTML Element, <div>
function updateSidebarForTextElements(sidebar, container, isNewContent = false) {
  sidebar.innerHTML = `${generateMobileTabs()}`;
  activateTabs();

  let contentContainer;
  if (isNewContent || container.classList.contains('pagecolumn')) {
    contentContainer = addContentContainer();
    container.appendChild(contentContainer);
  } else {
    contentContainer = container;
  }

  const tagDropdown = document.createElement('select');
  tagDropdown.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
  const options = [
    { label: 'Paragraph', value: 'p' },
    { label: 'Heading 1', value: 'h1' },
    { label: 'Heading 2', value: 'h2' },
    { label: 'Heading 3', value: 'h3' },
    { label: 'Heading 4', value: 'h4' },
    { label: 'Heading 5', value: 'h5' },
    { label: 'Heading 6', value: 'h6' },
    { label: 'Form', value: 'form' },
    { label: 'Link', value: 'a' },
    { label: 'Button', value: 'button' },
    { label: 'Image', value: 'img' },
    { label: 'Video', value: 'video' },
    { label: 'Audio', value: 'audio' }
  ];

  const formContainer = document.createElement('div');

  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    tagDropdown.appendChild(option);
  });

  const textInput = document.createElement('textarea');
  textInput.placeholder = 'Enter content here...';
  textInput.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';

  const mediaUrlInput = document.createElement('input');
  mediaUrlInput.type = 'text';
  mediaUrlInput.placeholder = 'Enter media URL...';
  mediaUrlInput.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';

  function toggleInputs(selectedTag) {
    if (['img', 'video', 'audio'].includes(selectedTag)) {
      mediaUrlInput.style.display = 'block';
      textInput.style.display = 'none';
    } else {
      mediaUrlInput.style.display = 'none';
      textInput.style.display = 'block';
    }
  }

  tagDropdown.addEventListener('change', function () {
    const selectedTag = tagDropdown.value;
    let element = contentContainer.querySelector(selectedTag);

    if (!element) {
      element = document.createElement(selectedTag);
      contentContainer.innerHTML = '';  // Clear existing content within contentContainer
      contentContainer.appendChild(element);
    }

    toggleInputs(selectedTag);

    if (selectedTag === 'img' || selectedTag === 'video' || selectedTag === 'audio') {
      element.src = mediaUrlInput.value || 'placeholder/path/to/media'; // Fallback to a placeholder if no URL
    } else {
      element.textContent = textInput.value;
    }

    // Call handleButtonFields for 'Link' selection
    if (['a', 'button'].includes(selectedTag)) {
      handleButtonFields(formContainer, contentContainer, element);
    } else {
      const linkOpts = document.getElementById('linkOpts');
      if (linkOpts) linkOpts.remove();
    }

    if (element.tagName === 'FORM') updateSidebarForTextElements(sidebar, contentContainer, true);
  });

  textInput.addEventListener('input', function () {
    const selectedTag = tagDropdown.value;
    let element = contentContainer.querySelector(selectedTag);

    // If no element exists for the selected tag, create one
    if (!element && !['img', 'video', 'audio'].includes(selectedTag)) {
      element = document.createElement(selectedTag);
      contentContainer.appendChild(element);
    }

    if (element && !['img', 'video', 'audio'].includes(selectedTag)) {
      element.textContent = textInput.value;
    }
  });

  mediaUrlInput.addEventListener('input', function () {
    const selectedTag = tagDropdown.value;
    let element = contentContainer.querySelector(selectedTag);

    if (element && ['img', 'video', 'audio'].includes(selectedTag)) {
      element.src = mediaUrlInput.value;
    }
  });

  const targetElement = contentContainer.firstChild;

  if (targetElement) {
    if (['IMG', 'VIDEO', 'AUDIO'].includes(targetElement.tagName)) {
      mediaUrlInput.value = targetElement.src;
    } else {
      textInput.value = targetElement.textContent;
    }
    tagDropdown.value = targetElement.tagName.toLowerCase();
    toggleInputs(tagDropdown.value);
  }

  const titleElement = document.createElement('h2');
  titleElement.textContent = 'Editing Element';
  titleElement.className = 'font-bold text-xl';


  if (targetElement && ['A', 'BUTTON'].includes(targetElement.tagName)) {
    handleButtonFields(formContainer, contentContainer, targetElement);
  } else {
    const linkOpts = document.getElementById('linkOpts');
    if (linkOpts) linkOpts.remove();
  }

  sidebar.prepend(formContainer);
  formContainer.prepend(tagDropdown);
  formContainer.prepend(textInput);
  formContainer.prepend(mediaUrlInput);
  formContainer.prepend(titleElement);
  addTextOptions(sidebar, contentContainer);
  addManualClassEditor(sidebar, contentContainer);
  addManualCssEditor(sidebar, contentContainer);
}

function handleElementCreation() {
  const createButton = document.getElementById('create-element-button');
  createButton.addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar-dynamic');
    const container = document.getElementById('page-container');  // Assume this is where new elements go
    updateSidebarForTextElements(sidebar, container, true);
  });
}

function handleButtonFields(formContainer, contentContainer, button) {
  const urlInput = document.createElement('input');
  urlInput.type = 'url';
  urlInput.placeholder = 'Button/Link URL';
  urlInput.className = 'mt-2 p-2 border border-slate-300 w-full';

  const checkboxLabel = document.createElement('label');
  checkboxLabel.setAttribute('for', 'checkbox');
  checkboxLabel.textContent = ' Open in new tab';
  checkboxLabel.className = 'inline-flex items-center mt-2';

  const checkbox = document.createElement('input');
  checkbox.setAttribute('name', 'checkbox');
  checkbox.type = 'checkbox';
  checkbox.className = 'ml-2';

  if (button) {
    urlInput.value = button.href;
    checkbox.checked = button.target === '_blank';
  }

  checkboxLabel.insertBefore(checkbox, checkboxLabel.firstChild);

  const buttonUpdate = function () {
    if (!button) {
      button = document.createElement('a');
      button.className = 'bg-link text-background hover:bg-background hover:text-link font-bold p-2 rounded';
      contentContainer.appendChild(button);
    }
    button.href = urlInput.value;
    button.target = checkbox.checked ? '_blank' : '';
  };

  urlInput.oninput = buttonUpdate;
  checkbox.onchange = buttonUpdate;
  const linkOpts = document.createElement('div');
  linkOpts.id = 'linkOpts';

  linkOpts.append(urlInput);
  linkOpts.append(checkboxLabel);
  formContainer.append(linkOpts);
  enableEditContentOnClick(contentContainer);
}

function adjustClassesForInteractiveElements(container) {
  const excludedClasses = ['content-container', 'pagecontent'];
  const interactiveElements = container.querySelectorAll('a, button, input, textarea, select, label, iframe, details, summary');

  if (interactiveElements.length === 0) {
    return;
  }

  const containerClasses = Array.from(container.classList);
  const classesToTransfer = containerClasses.filter(cls => !excludedClasses.includes(cls));

  if (classesToTransfer.length > 0) {
    interactiveElements.forEach(element => {
      element.classList.add(...classesToTransfer);
    });
    container.classList.remove(...classesToTransfer);
  }
}


// Map to track transferred classes from container to child elements
const classTransferMap = new Map();

// Function to transfer class to child element
function transferClassToChild(container, className, childElement) {
  childElement.classList.add(className);
  container.classList.remove(className);

  if (!classTransferMap.has(container)) {
    classTransferMap.set(container, new Map());
  }
  const containerMap = classTransferMap.get(container);
  containerMap.set(className, childElement);
}

// Function to adjust classes for interactive elements
function adjustClassesForInteractiveElements(container) {
  const excludedClasses = ['content-container', 'pagecontent'];
  const interactiveElements = container.querySelectorAll('a, button, input, textarea, select, label, iframe, details, summary');

  if (interactiveElements.length === 0) {
    return;
  }

  const containerClasses = Array.from(container.classList);
  const classesToTransfer = containerClasses.filter(cls => !excludedClasses.includes(cls));

  if (classesToTransfer.length > 0) {
    interactiveElements.forEach(element => {
      classesToTransfer.forEach(className => {
        transferClassToChild(container, className, element);
      });
    });
  }
}

// Function to dispatch a custom event when a class is added
function dispatchClassAdded(container, className) {
  const event = new CustomEvent('classAdded', {
    detail: { className }
  });
  container.dispatchEvent(event);
}

// Function to dispatch a custom event when a class is removed
function dispatchClassRemoved(container, className) {
  const event = new CustomEvent('classRemoved', {
    detail: { className }
  });
  container.dispatchEvent(event);
}

// Modify class manipulation to dispatch events
function addClassToContainer(container, ...classNames) {
  classNames.forEach(className => {
    if (!container.classList.contains(className)) {
      container.classList.add(className);
      dispatchClassAdded(container, className); // Dispatch custom event for each class
    }
  });
}

function removeClassFromContainer(container, ...classNames) {
  classNames.forEach(className => {
    if (container.classList.contains(className)) {
      container.classList.remove(className);
      dispatchClassRemoved(container, className); // Dispatch custom event for each class
    }
  });
}

// Handle custom event for class added
function handleClassAddedEvent(event) {
  const container = event.target;
  const className = event.detail.className;

  // Logic to handle the class added to the container
  adjustClassesForInteractiveElements(container);
}

// Handle custom event for class removed
function handleClassRemovedEvent(event) {
  const container = event.target;
  const className = event.detail.className;

  // If the class was removed from the container, remove it from the child elements too
  const containerMap = classTransferMap.get(container);
  if (containerMap && containerMap.has(className)) {
    const childElement = containerMap.get(className);
    childElement.classList.remove(className);
    containerMap.delete(className);  // Clean up the mapping
  }
}

// Setup listeners for custom events on the container
function observeClassManipulation(container) {
  container.addEventListener('classAdded', handleClassAddedEvent);
  container.addEventListener('classRemoved', handleClassRemovedEvent);
}

/* File: ./app/js/editor/sidebar.js */
/*

  editor/sidebar.js

  This file is dedicated to housing the functions that exist entirely within
  the sidebar and don't directly touch anything else.

*/

// This function creates the tabs in the bottom-left screen of the editor page.
// These tabs represent the selected targeted viewport for the designer's
// editing actions.
// DATA IN: null
function generateMobileTabs() {
  const icons = {
      'xs': ['Smartwatch & larger', '<svg fill="currentColor" class="h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 48l256 0c0-26.5-21.5-48-48-48L112 0C85.5 0 64 21.5 64 48zM80 80C35.8 80 0 115.8 0 160L0 352c0 44.2 35.8 80 80 80l224 0c44.2 0 80-35.8 80-80l0-192c0-44.2-35.8-80-80-80L80 80zM192 213.3a42.7 42.7 0 1 1 0 85.3 42.7 42.7 0 1 1 0-85.3zM213.3 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-74.7-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm74.7-160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-74.7-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM64 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm224-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 512l160 0c26.5 0 48-21.5 48-48L64 464c0 26.5 21.5 48 48 48z"/></svg>'],
      'sm': ['Mobile & larger', '<svg fill="currentColor" class="h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM144 448c0 8.8 7.2 16 16 16l64 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-64 0c-8.8 0-16 7.2-16 16zM304 64L80 64l0 320 224 0 0-320z"/></svg>'],
      'md': ['Tall tablet & larger', '<svg fill="currentColor" class="h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM160 448c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-96 0c-8.8 0-16 7.2-16 16zM384 64L64 64l0 320 320 0 0-320z"/></svg>'],
      'lg': ['Wide tablet & larger', '<svg fill="currentColor" class="h-5 w-5 mx-auto rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM160 448c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-96 0c-8.8 0-16 7.2-16 16zM384 64L64 64l0 320 320 0 0-320z"/></svg>'],
      'xl': ['Laptop & larger', '<svg fill="currentColor" class="h-8 w-8 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M128 32C92.7 32 64 60.7 64 96l0 256 64 0 0-256 384 0 0 256 64 0 0-256c0-35.3-28.7-64-64-64L128 32zM19.2 384C8.6 384 0 392.6 0 403.2C0 445.6 34.4 480 76.8 480l486.4 0c42.4 0 76.8-34.4 76.8-76.8c0-10.6-8.6-19.2-19.2-19.2L19.2 384z"/></svg>'],
      '2xl': ['Desktop & larger', '<svg fill="currentColor" class="h-8 w-8 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z"/></svg>']
  };

  return `
  <div id="mobileTabContainer" class="flex fixed w-72 z-50 h-16 left-0 align-items-stretch justify-stretch bottom-0 bg-slate-300">
    ${Object.entries(icons).map(([size, icon]) => `
      <div title="${size.toUpperCase()} Screens" data-extra-info="${icon[0]}" class="tab-${size} ${size !== 'xs' ? 'border-slate-200' : 'bg-slate-50 border-slate-50'} w-12 text-slate-900 h-full inline-block responsive-tab cursor-pointer flex items-center p-2 hover:bg-slate-200 border-t-4">
        ${icon[1]}
      </div>
    `).join('')}
  </div>
  <div id="mobileTabContent">
    ${Object.entries(icons).map(([size]) => `
      <div class="${size !== 'xs' ? 'hidden ' : ''}tab-content tab-content-${size} grid grid-cols-5 gap-x-1 gap-y-2">
        <h3 class="relative text-lg font-bold text-slate-900 mt-4 -mb-3 col-span-5"><span class="inline-block text-slate-700 text-xs w-7 h-7 p-1 rounded-md border border-slate-500">${appSageEditorIcons["responsive"][size]}</span> <span class="inline-block absolute left-10 top-0">${plainEnglishBreakpointNames[size]} Styles</span></h3>
      </div>
    `).join('')}
  </div>
  `;
} // DATA OUT: String (of HTML)

// This function creates listeners for swapping out the sidebar with the
// editing options relevant to the designer's selected device target:
// xs, sm, md, lg, xl, 2xl
// All classes under these tabs are prepended with these letters followed by a
// colon (:), such as `md:`.
// With 'xs' there is no prepending as it is the mobile-first default.
// DATA IN: null
function activateTabs() {
  // Add event listeners to toggle visibility
  document.querySelectorAll('#mobileTabContainer div').forEach(tab => {
    tab.addEventListener('click', function () {
      // Toggle display of associated content or styles when a tab is clicked
      const allTabs = document.querySelectorAll('.responsive-tab');
      allTabs.forEach(t => {
        t.classList.remove('bg-slate-50');
        t.classList.remove('border-slate-50');
        t.classList.add('border-slate-200');
      });  // Remove highlight from all tabs
      this.classList.remove('border-slate-200');
      this.classList.add('bg-slate-50');  // Highlight the clicked tab
      this.classList.add('border-slate-50');

      // Get the breakpoint from the class, assumes class is first in the list!
      const bp = this.classList[0].replace('tab-', '');

      // Assuming you have sections with IDs corresponding to breakpoints
      document.querySelectorAll('.tab-content').forEach(section => {
        if (section.classList.contains(`tab-content-${bp}`)) {
          section.classList.remove('hidden');
        } else {
          section.classList.add('hidden');
        }
      });
    });
  });
} // DATA OUT: null

/* File: ./app/js/editor/style.js */
/*

  editor/style.js

*/

// This function gives a scrollable box for editing background colors.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableBackgroundColor(sidebar, element) {
  const colors = colorArray;
  const labelPrefix = 'Background Color';
  const cssClassBase = 'bg';

  addDeviceTargetedOptions(sidebar, element, labelPrefix, cssClassBase, colors, 'icon-select');
} // DATA OUT: null

// This function gives all the bits needed for changing border colors & styles.
// Like background color, it is in a handy little scrollable box.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableBorders(sidebar, element) {
  const labels = ['Border Width', 'Border Radius', 'Border Color', 'Border Style'];
  const properties = ['width', 'radius', 'color', 'style'];
  const options = {
    color: colorArray,
    width: ['1', '2', '4', '8'],
    radius: ['none', 'sm', 'md', 'lg'],
    style: ['solid', 'dashed', 'dotted', 'double', 'none'],
    input_type: ['single-icon-select', 'single-icon-select', 'icon-select', 'icon-select']
  };

  properties.forEach((prop, index) => {
    const cssClassBase = prop === 'color' ? 'border' : (prop === 'width' ? 'border' : (prop === 'radius' ? 'rounded' : (prop === 'style' ? 'border' : '')));

    addDeviceTargetedOptions(sidebar, element, labels[index], cssClassBase, options[prop], options.input_type[index]);
  });
} // DATA OUT: null

// This function adds brevity to sidebar populating functions since if one is
// being added, I can't think of a scenario where the other wouldn't be as well
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableMarginAndPadding(sidebar, element) {
  addEditableMargin(sidebar, element);
  addEditablePadding(sidebar, element);
} // DATA OUT: null

// This function gives all the necessary bits for editing paddings.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditablePadding(sidebar, element) {
  const sides = ['t', 'b', 'l', 'r', 'a']; // added a for all sides
  const values = ['0', '1', '2', '4', '8', '16'];

  sides.forEach(side => {
    let cssClassBase;
  
    if (side === 'a') {
      cssClassBase = 'p';
      element.classList.remove('pt', 'pb', 'pl', 'pr'); 
    } else {
      cssClassBase = `p${side}`;
    }
  
    addDeviceTargetedOptions(sidebar, element, `Padding (${side === 'a' ? 'All' : side})`, cssClassBase, values, 'single-icon-select');
  });

  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  breakpoints.forEach(bp => {
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    const paddingContainer = document.createElement('div');
    paddingContainer.className = 'grid grid-cols-4 col-span-5'
    const paddingElements = container.querySelectorAll('.Padding');
    paddingElements.forEach(paddingDropdown => {
      paddingContainer.appendChild(paddingDropdown);
    });

    container.appendChild(paddingContainer);

    const resetPaddingElement = document.createElement('div');
    const label = createLabel(bp, `Reset Padding`, `${bp}-padding`);
    label.className = 'hidden';
    paddingContainer.appendChild(label);
    paddingContainer.appendChild(resetPaddingElement);
    handleReset(bp, element, ['pt', 'pr', 'pb', 'pl', 'p'], values, resetPaddingElement);
    resetPaddingElement.classList.add('col-span-1');
  });
} // DATA OUT: null

// This function gives all the necessary bits for editing margins.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableMargin(sidebar, element) {
  const sides = ['t', 'b', 'l', 'r', 'a']; // added a for all sides
  const values = ['0', '1', '2', '4', '8', '16'];

  sides.forEach(side => {
    const cssClassBase = side === 'a' ? 'm' : `m${side}`;

    addDeviceTargetedOptions(sidebar, element, `Margin (${side === 'a' ? 'All' : side})`, cssClassBase, values, 'single-icon-select');
  });

  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  breakpoints.forEach(bp => {
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    const marginContainer = document.createElement('div');
    marginContainer.className = 'grid grid-cols-4 col-span-5'
    const marginElements = container.querySelectorAll('.Margin');
    marginElements.forEach(marginDropdown => {
      marginContainer.appendChild(marginDropdown);
    });

    container.appendChild(marginContainer);

    const resetMarginElement = document.createElement('div');
    const label = createLabel(bp, `Reset Margins`, `${bp}-margin`);
    label.className = 'hidden';
    marginContainer.appendChild(label);
    marginContainer.appendChild(resetMarginElement);
    handleReset(bp, element, ['mt', 'mr', 'mb', 'ml', 'm'], values, resetMarginElement);
    resetMarginElement.classList.add('col-span-1');
  });
} // DATA OUT: null

// This function allows the laoding of a background image via remote URL.
// See `addEditableBackgroundFeatures` for the styling specific editing options.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableBackgroundImageURL(sidebar, grid) {
  const labelPrefix = 'Background Image URL';
  const cssClassBase = 'bg';

  addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, null, 'input');
} // DATA OUT: null

// This function is for adding the background image itself via direct "upload".
// The word "upload" is in quotes because the attachment is simply being put
// into the document as a plaintext base64 image blob.
// See `addEditableBackgroundFeatures` for the styling specific editing options.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableBackgroundImage(sidebar, grid) {
  const labelPrefix = 'Background Image File';
  const cssClassBase = 'bg';

  // Add file input for direct image selection
  addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, null, 'input');

  const fileInput = sidebar.querySelector('input[type="file"]');
  if (fileInput) {
    const placeholderDropdown = document.createElement('select');
    placeholderDropdown.className = fileInput.className;
    placeholderDropdown.style.width = '100%';
    placeholderDropdown.style.padding = '8px';
    placeholderDropdown.style.border = '1px solid #ccc';
    placeholderDropdown.style.borderRadius = '4px';
    placeholderDropdown.style.marginTop = '8px';
    placeholderDropdown.style.boxSizing = 'border-box';

    const imageOnlyMedia = Object.keys(appSagePlaceholderMedia).filter(key => {
      return appSagePlaceholderMedia[key].endsWith('.jpg') ||
             appSagePlaceholderMedia[key].endsWith('.png') ||
             appSagePlaceholderMedia[key].endsWith('.svg');
    }).reduce((obj, key) => {
      obj[key] = appSagePlaceholderMedia[key];
      return obj;
    }, {});

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select Placeholder Image';
    placeholderDropdown.appendChild(defaultOption);

    for (const key in imageOnlyMedia) {
      const option = document.createElement('option');
      option.value = imageOnlyMedia[key];
      option.textContent = key;
      placeholderDropdown.appendChild(option);
    }

    fileInput.parentElement.appendChild(placeholderDropdown);

    fileInput.addEventListener('change', function () {
      if (fileInput.files.length > 0) {
        placeholderDropdown.value = '';
        placeholderDropdown.disabled = false;
      }
    });

    placeholderDropdown.addEventListener('change', function () {
      if (placeholderDropdown.value) {
        fileInput.value = '';
        fileInput.disabled = false;

        // Apply background using Tailwind-style class or inline CSS
        grid.style.backgroundImage = '';
        grid.classList.remove(...Array.from(grid.classList).filter(c => c.startsWith('bg-'))); // Clear previous background classes
        grid.classList.add(`bg-[url('${placeholderDropdown.value}')]`);
        grid.style.backgroundSize = 'cover';
        grid.style.backgroundPosition = 'center';
      }
    });
  } else {
    console.error('No existing file input found.');
  }
} // DATA OUT: null

// This function is dedicated for adding the necessary editing options for
// background images and the styles applicable to them.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableBackgroundFeatures(sidebar, grid) {
  const bgSizeOptions = ['cover', 'contain'];
  const bgPositionOptions = ['center', 'top', 'bottom', 'left', 'right'];
  const bgRepeatOptions = ['repeat', 'no-repeat', 'repeat-x', 'repeat-y'];

  // Function to update background image size
  function addBackgroundSizeOptions() {
    const labelPrefix = 'Background Size';
    const cssClassBase = 'bg';

    addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, bgSizeOptions, 'icon-select');

    // Add Reset Button for Background Size
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    breakpoints.forEach(bp => {
      const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
      const resetSizeElement = document.createElement('div');
      const label = createLabel(bp, `Reset Background Size`, `${bp}-bg-size`);
      label.className = 'hidden';
      container.appendChild(label);
      container.appendChild(resetSizeElement);

      // Add the handleReset call for background size
      handleReset(bp, grid, ['cover', 'contain'], 'bg', resetSizeElement);
      resetSizeElement.classList.add('col-span-1');
    });
  }

  // Function to update background position
  function addBackgroundPositionOptions() {
    const labelPrefix = 'Background Position';
    const cssClassBase = 'bg';

    addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, bgPositionOptions, 'icon-select');

    // Add Reset Button for Background Position
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    breakpoints.forEach(bp => {
      const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
      const resetPositionElement = document.createElement('div');
      const label = createLabel(bp, `Reset Background Position`, `${bp}-bg-position`);
      label.className = 'hidden';
      container.appendChild(label);
      container.appendChild(resetPositionElement);

      // Add the handleReset call for background position
      handleReset(bp, grid, bgPositionOptions, 'bg', resetPositionElement);
      resetPositionElement.classList.add('col-span-1');
    });
  }

  // Function to update background repeat
  function addBackgroundRepeatOptions() {
    const labelPrefix = 'Background Repeat';
    const cssClassBase = 'bg';

    addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, bgRepeatOptions, 'icon-select');
  }

  // Calling all functions to add options and reset buttons
  addBackgroundSizeOptions();
  addBackgroundPositionOptions();
  addBackgroundRepeatOptions();
}// DATA OUT: null

// This funciton is dedicated to adding the editing elements relevant to the
// suite of expected editing options for stylizing text and its placement.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addTextOptions(sidebar, element) {
  const textColorOptions = colorArray;
  const textSizeOptions = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'];
  const textAlignOptions = ['left', 'center', 'right', 'justify'];
  const fontWeightOptions = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'];
  const fontStyleOptions = ['italic', 'not-italic'];
  const fontUnderlineOptions = ['underline', 'not-underline'];

  addDeviceTargetedOptions(sidebar, element, 'Text Color', 'text', textColorOptions, 'icon-select');
  // Add Reset Button for Text Color
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  breakpoints.forEach(bp => {
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    const resetTextColorElement = document.createElement('div');
    const label = createLabel(bp, `Reset Text Color`, `${bp}-text-color`);
    label.className = 'hidden';
    container.appendChild(label);
    container.appendChild(resetTextColorElement);

    // Add the handleReset call for text color
    handleReset(bp, element, textColorOptions, 'text', resetTextColorElement);
    resetTextColorElement.classList.add('col-span-1');
  });

  addDeviceTargetedOptions(sidebar, element, 'Font Size', 'text', textSizeOptions, 'single-icon-select');
  addDeviceTargetedOptions(sidebar, element, 'Font Style', 'italic', fontStyleOptions, 'toggle');
  addDeviceTargetedOptions(sidebar, element, 'Font Weight', 'font', fontWeightOptions, 'single-icon-select');
  addDeviceTargetedOptions(sidebar, element, 'Font Style', 'underline', fontUnderlineOptions, 'toggle');
  addDeviceTargetedOptions(sidebar, element, 'Text Alignment', 'text', textAlignOptions, 'icon-select');
} // DATA OUT: null

// TODO: This doesn't quite work properly yet
// This particular HTML function should most likely be a dedicated content.js content feature
function addManualHtmlElement(sidebar, element) {
  if(JSON.parse(localStorage.appSageSettings).advancedMode) {
    addDeviceTargetedOptions(sidebar, element, 'html', '', [], 'textarea');
  }
} // DATA OUT: null

function addManualClassEditor(sidebar, element) {
  if(JSON.parse(localStorage.appSageSettings).advancedMode) {
    addDeviceTargetedOptions(sidebar, element, 'class', '', [], 'textarea');
  }
} // DATA OUT: null

function addManualCssEditor(sidebar, element) {
  if(JSON.parse(localStorage.appSageSettings).advancedMode) {
    addDeviceTargetedOptions(sidebar, element, 'css', '', [], 'textarea');
  }
} // DATA OUT: null

function addEditableDimensions(sidebar, element){
  const heightOpts = [['min-h', 'Minimum Height'], ['h', 'Height'], ['max-h', 'Maximum Height']];
  const widthOpts = [['min-w', 'Minimum Width'], ['w', 'Width'], ['max-w', 'Maximum Width']];
  const lengthOptions = ['auto', 'full', 'screen', '1/2', '1/3', '2/3', '1/4', '3/4', '1/5', '2/5', '3/5', '4/5', '1/6', '5/6', '8', '10', '12', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '64', '72', '96'];
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  breakpoints.forEach(bp => {
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    const sizeContainer = document.createElement('div');
    sizeContainer.className = 'grid grid-cols-4 col-span-5';

    widthOpts.forEach(widthOpt => {
      // 0 = class prefix, e.g. `min-w`
      // 1 = Plain English, e.g. 'Minimum Width'
      const label = createLabel(bp, widthOpt[1], `${bp}-${widthOpt[0]}`);
      control = document.createElement('div');
      sizeContainer.appendChild(label);
      sizeContainer.appendChild(control);
      handleSingleIconSelect(bp, widthOpt[1], lengthOptions, widthOpt[0], element, control);
    });

    resetHeightElement = document.createElement('div');
    const label = createLabel(bp, `Reset`, `${bp}-min-w,max-w,w`);
    label.className = 'hidden';
    sizeContainer.appendChild(label);
    sizeContainer.appendChild(resetHeightElement);
    handleReset(bp, element, ['min-w', 'max-w', 'w'], lengthOptions, resetHeightElement);
    resetHeightElement.classList.add('col-span-1');

    container.appendChild(sizeContainer);
  });

  breakpoints.forEach(bp => {
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    const sizeContainer = document.createElement('div');
    sizeContainer.className = 'grid grid-cols-4 col-span-5';

    heightOpts.forEach(heightOpt => {
      // 0 = class prefix, e.g. `min-h`
      // 1 = Plain English, e.g. 'Minimum Height'
      const label = createLabel(bp, heightOpt[1], `${bp}-${heightOpt[0]}`);
      control = document.createElement('div');
      sizeContainer.appendChild(label);
      sizeContainer.appendChild(control);
      handleSingleIconSelect(bp, heightOpt[1], lengthOptions, heightOpt[0], element, control);
    });

    resetHeightElement = document.createElement('div');
    const label = createLabel(bp, `Reset`, `${bp}-min-h,max-h,h`);
    label.className = 'hidden';
    sizeContainer.appendChild(label);
    sizeContainer.appendChild(resetHeightElement);
    handleReset(bp, element, ['min-h', 'max-h', 'h'], lengthOptions, resetHeightElement);
    resetHeightElement.classList.add('col-span-1');

    container.appendChild(sizeContainer);
  });
} // DATA OUT: null

function addEditableColumnGaps(sidebar, element) {
  const axis = ['x', 'y', 'all'];
  const lengthOptions = ['0', '1', '2', '4', '8', '16'];
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  breakpoints.forEach(bp => {
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    const gapContainer = document.createElement('div');
    gapContainer.className = 'grid grid-cols-4 col-span-5';

    axis.forEach(axisOpt => {
      const cssClassBase = `gap-${axisOpt}`;
      const label = createLabel(bp, `Gap (${axisOpt})`, `${bp}-${`Gap (${axisOpt})`.replace(' ', '-')}-${cssClassBase}`);
      control = document.createElement('div');
      gapContainer.appendChild(label);
      gapContainer.appendChild(control);
      handleSingleIconSelect(bp, `Gap (${axisOpt})`, lengthOptions, cssClassBase, element, control);
    });

    resetElement = document.createElement('div');
    const label = createLabel(bp, `Reset`, `${bp}-gap-x,gap-y,gap`);
    label.className = 'hidden';
    gapContainer.appendChild(label);
    gapContainer.appendChild(resetElement);
    handleReset(bp, element, ['gap-x', 'gap-y', 'gap'], lengthOptions, resetElement);
    resetElement.classList.add('col-span-1');

    container.appendChild(gapContainer);
  });
} // DATA OUT: null

/* File: ./app/js/editor/main.js */
/*

  editor/main.js

  This file is to support the initial setup or re-setup of a page.

*/

// This big chunk does everything necessary for initial page setup which is
// largely comprised of setting up all the listeners that allow various editing
// functions that show up in the sidebar.
// DATA IN: null
document.addEventListener('DOMContentLoaded', function () {

  const editPageButton = document.getElementById('editPageSettings');
  editPageButton.addEventListener('click', function () {
    addPageOptions();
  });


  const addGridButton = document.getElementById('addGrid');
  addGridButton.addEventListener('click', function () {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'w-full min-w-full max-w-full min-h-auto h-auto max-h-auto pagegrid grid grid-cols-1 pl-0 pr-0 pt-0 pb-0 ml-0 mr-0 mt-0 mb-0 ugc-keep';

    const initialColumn = createColumn();
    gridContainer.appendChild(initialColumn);
    initialColumn.appendChild(createAddContentButton(initialColumn));

    document.getElementById('page').appendChild(gridContainer);

    addGridOptions(gridContainer);
    highlightEditingElement(gridContainer);

    // Append add column button at the end
    const addColumnButton = createAddColumnButton(gridContainer);
    gridContainer.appendChild(addColumnButton);

    enableEditGridOnClick(gridContainer);
  });

  const addHtmlButton = document.getElementById('addHtml');
  addHtmlButton.addEventListener('click', function () {
    showHtmlModal(() => { });
  });

  // Mouse enter event
  document.body.addEventListener('mouseenter', function (e) {
    if (e.target.matches('[data-extra-info]') && e.target.getAttribute('data-extra-info')) {
      updateTooltip(e, true);
    }
  }, true); // Use capture phase to ensure tooltip updates immediately

  // Mouse leave event
  document.body.addEventListener('mouseleave', function (e) {
    if (e.target.matches('[data-extra-info]')) {
      updateTooltip(e, false);
    }
  }, true);
}); // DATA OUT: null

// This function is for adding to the sidebar all the options available for
// styles that impact the entire page, or metadata like page titles, og:image
// tags, descriptions, etc.
// DATA IN: null
function addPageOptions() {
  const page = document.getElementById('page');
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `${generateMobileTabs()}`; // Clear existing editor
  const editTitle = document.createElement('div');
  editTitle.innerHTML = `<strong>Edit Page Styles &amp; Metadata</strong>`
  activateTabs();

  if (page) {
    addEditableMetadata(sidebar, 'prepend');
    addEditablePageTitle(sidebar, 'prepend');
    sidebar.prepend(editTitle);
    addEditableBackgroundColor(sidebar, page);
    addEditableBackgroundImage(sidebar, page);
    addEditableBackgroundImageURL(sidebar, page);
    addEditableBackgroundFeatures(sidebar, page);
  }
} // DATA OUT: null

// This function makes tooltips show up anywhere you hover over an element that
// has the `data-extra-info` attribute. This functional is critical for
// elaborating on WTF something does for the designer making a page.
// DATA IN: ['HTML Element', 'Boolean']
function updateTooltip(e, show) {
  const tooltip = document.getElementById('tooltip');
  const extraClasses = e.target.getAttribute('data-extra-info-class') || '';

  if (show) {
    const targetRect = e.target.getBoundingClientRect();
    tooltip.innerHTML = e.target.getAttribute('data-extra-info') || '';
    let tooltipX = targetRect.left + (targetRect.width / 2) - (tooltip.offsetWidth / 2);
    let tooltipY = targetRect.top - tooltip.offsetHeight - 5;

    // Ensure the tooltip does not overflow horizontally
    const rightOverflow = tooltipX + tooltip.offsetWidth - document.body.clientWidth;
    if (rightOverflow > 0) {
      tooltipX -= rightOverflow;  // Adjust to the left if overflowing on the right
    }
    if (tooltipX < 0) {
      tooltipX = 5;  // Keep some space from the left edge if overflowing on the left
    }

    // Adjust vertically if there is not enough space above the target
    if (targetRect.top < tooltip.offsetHeight + 10) {
      tooltipY = targetRect.bottom + 5;
    }

    // Set tooltip position
    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${tooltipY}px`;

    // Show tooltip with extra classes
    tooltip.classList.replace('opacity-0', 'opacity-100');
    tooltip.classList.remove('invisible');
    tooltip.classList.add('visible');
    if (extraClasses !== '') extraClasses.split(' ').forEach(cls => tooltip.classList.add(cls));
  } else {
    // Hide tooltip and remove extra classes
    tooltip.classList.replace('opacity-100', 'opacity-0');
    tooltip.classList.remove('visible');
    tooltip.classList.add('invisible');
    if (extraClasses !== '') extraClasses.split(' ').forEach(cls => tooltip.classList.remove(cls));
  }
} // DATA OUT: null

// This hulking function brings up a modal for pasting in HTML with Tailwind
// classes. This is for folks who have/bought existing HTML that uses
// TailwindCSS.
// TODO: Validate that the HTML is indeed Tailwind-y before proceeding to litter
// the page/page editor with the markup. Or... do we just ignore the fact that
// it isn't Tailwind-y and let them edit it anyway? In which case, nothing to do here.
// DATA IN: Optional function()
function showHtmlModal(onConfirm = null) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center';
  modal.innerHTML = `
      <div class="bg-slate-100 p-4 rounded-lg max-w-2xl mx-auto w-full">
          <p class="text-slate-900">Add HTML with TailwindCSS classes:</p>
          <textarea id="tailwindHtml" rows="20" class="shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline"></textarea>
          <div class="flex justify-between mt-4">
              <button id="confirmHtml" class="bg-emerald-500 hover:bg-emerald-700 text-slate-50 font-bold p-2 rounded">Add HTML</button>
              <button id="cancelHtml" class="bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded">Cancel</button>
          </div>
      </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('confirmHtml').addEventListener('click', function () {
    if (onConfirm) onConfirm();
    const page = document.getElementById('page');
    const content = document.getElementById('tailwindHtml');
    const parentElement = document.createElement('div');
    parentElement.classList = 'pagegrid grid grid-cols-1 ugc-keep p-4'
    page.appendChild(parentElement);
    const element = document.createElement('div');
    element.classList = 'pagecolumn col-span-1 p-4'
    parentElement.appendChild(element);
    const childElement = document.createElement('div');
    childElement.classList = 'content-container pagecontent htmlContent p-4'
    childElement.innerHTML = content.value;
    element.appendChild(childElement);
    document.body.removeChild(modal);
  });

  document.getElementById('cancelHtml').addEventListener('click', function () {
    document.body.removeChild(modal);
  });
} // DATA OUT: null

// This function adds a cyan glow around the element being edited to give a visual
// breadcrumb of what element is currently going to be effected by any changes
// made from the sidebar.
// DATA IN: null
function highlightEditingElement(element) {
  removeEditingHighlights(); // Clear existing highlights
  if (element) {
    element.id = 'editing-highlight'; // Highlight the current element
  }
} // DATA OUT: null

// This function removes the above visual breadcrumb making way for a new
// highlight. This function should ideally always be called prior to its
// antithetical counterpart.
// DATA IN: null
function removeEditingHighlights() {
  const highlight = document.getElementById('editing-highlight');
  if (highlight) {
    highlight.id = '';
  }
} // DATA OUT: null

// This function helps move column/content buttons figure out where to go
// when moving their element without getting confused by editor-specific
// elements potentially confusing where to go in the finished product.
// DATA IN: ['HTML Element, <div>', 'String:up/down']
function getNextValidSibling(element, direction) {
  let sibling = (direction === 'left' || direction === 'up') ? element.previousElementSibling : element.nextElementSibling;
  while (sibling && sibling.classList.contains('ugc-discard')) {
    sibling = (direction === 'left' || direction === 'up') ? sibling.previousElementSibling : sibling.nextElementSibling;
  }
  return sibling;
} // DATA OUT: HTML Element, <div>

// This is a way for people who don't know how to integrate a back-end to
// simply copy/paste page contents into their own document or back-end repo.
// DATA IN: HTML Element
function copyPageHTML(element) {
  const params = new URLSearchParams(window.location.search);
  const page_id = params.get('config');
  const html_content = JSON.parse(localStorage.getItem(appSageStorageString)).pages[page_id].page_data;
  const container_settings = JSON.parse(localStorage.getItem(appSageStorageString)).pages[page_id].settings;
  const textToCopy = `<style>${getCompiledCSS()}</style>
                      ${flattenJSONToHTML(html_content, container_settings)}`;
  copyText(textToCopy, element);
} // DATA OUT: null

// This is a way for people who don't know how to integrate a back-end to
// simply copy/paste page metadata into their own document or back-end repo.
// DATA IN: HTML Element
function copyMetadata(element) {
  const params = new URLSearchParams(window.location.search);
  const config = params.get('config');
  const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
  const settings = JSON.parse(storedData.pages[config].settings);
  const metaTags = settings.metaTags;
  let metaTagsString = '';

  metaTags.forEach(tag => {
    metaTagsString += `<meta ${tag.type}="${tag.name}" content="${tag.content}">`;
  });

  copyText(metaTagsString, element);
} // DATA OUT: null

// This is the workhorse function for `copyMetadata` and `copyPageHTML`
// DATA IN: ['String', 'HTML Element, <div>']
function copyText(textToCopy, element) {
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      element.innerHTML = '<svg id="poppyCopy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M32 32a32 32 0 1 1 64 0A32 32 0 1 1 32 32zM448 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32 256a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM167 153c-9.4-9.4-9.4-24.6 0-33.9l8.3-8.3c16.7-16.7 27.2-38.6 29.8-62.1l3-27.4C209.6 8.2 221.5-1.3 234.7 .1s22.7 13.3 21.2 26.5l-3 27.4c-3.8 34.3-19.2 66.3-43.6 90.7L201 153c-9.4 9.4-24.6 9.4-33.9 0zM359 311l8.2-8.3c24.4-24.4 56.4-39.8 90.7-43.6l27.4-3c13.2-1.5 25 8 26.5 21.2s-8 25-21.2 26.5l-27.4 3c-23.5 2.6-45.4 13.1-62.1 29.8L393 345c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9zM506.3 8.5c8.6 10.1 7.3 25.3-2.8 33.8l-10 8.5c-14.8 12.5-33.7 19.1-53 18.6c-16.6-.4-30.6 12.4-31.6 29l-1.8 30c-2.5 42.5-38.3 75.3-80.8 74.2c-7.6-.2-15 2.4-20.7 7.3l-10 8.5c-10.1 8.6-25.3 7.3-33.8-2.8s-7.3-25.3 2.8-33.8l10-8.5c14.8-12.5 33.7-19.1 53-18.6c16.6 .4 30.6-12.4 31.6-29l1.8-30c2.5-42.5 38.3-75.3 80.8-74.2c7.6 .2 15-2.4 20.7-7.3l10-8.5c10.1-8.6 25.3-7.3 33.8 2.8zM150.6 201.4l160 160c7.7 7.7 10.9 18.8 8.6 29.4s-9.9 19.4-20 23.2l-39.7 14.9L83.1 252.5 98 212.8c3.8-10.2 12.6-17.7 23.2-20s21.7 1 29.4 8.6zM48.2 345.6l22.6-60.2L226.6 441.2l-60.2 22.6L48.2 345.6zM35.9 378.5l97.6 97.6L43.2 510c-11.7 4.4-25 1.5-33.9-7.3S-2.4 480.5 2 468.8l33.8-90.3z"/></svg>';
      resetCopyPageButton(element);
    })
    .catch(err => {
      return String(console.error("Failed to copy text: ", err));
    });
} // DATA OUT: String

// When a copy button is clicked, the icon is replaced with a "Tada!" emoji.
// This function swaps it back to the regular icon after 0.75 seconds.
// DATA IN: HTML Element
function resetCopyPageButton(element) {
  setTimeout(function () {
    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="white" class="h-5 w-5 mx-auto" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/></svg>';
  }, 750)
} // DATA OUT: null

// This function creates the form input for changing the page's title.
// DATA IN: ['HTML Element, <div>', 'null || String:append/prepend']
function addEditablePageTitle(container, placement) {
  const params = new URLSearchParams(window.location.search);
  const currentTitle = params.get('config');
  const titleLabel = document.createElement('label');
  titleLabel.className = 'text-slate-700 text-xs uppercase mt-2';
  titleLabel.setAttribute('for', 'page-title');
  titleLabel.textContent = 'Page Title'
  const titleInput = document.createElement('input');
  titleInput.className = 'metadata meta-content my-1 shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
  titleInput.setAttribute('name', 'page-title');
  titleInput.type = 'text';
  titleInput.value = currentTitle;
  titleInput.placeholder = 'Page Title';

  titleInput.addEventListener('change', function () {
    newTitle = titleInput.value;
    changeLocalStoragePageTitle(newTitle);
  });
  if (placement === 'prepend') {
    container.prepend(titleInput);
    container.prepend(titleLabel);
  } else {
    container.appendChild(titleLabel);
    container.appendChild(titleInput);
  }
} // DATA OUT: null

// This function changes the page's title. Because localStorage data for the
// page is identified by the page's title, we have to copy the data over to a
// new object, then delete the old one.
// TODO: On page creation, generate an alphanumeric ID and store the object
//       that way instead. We will then need to update how localStorage loads
//       the page, perhaps by creating a new key-value object in the
//       localStorage like { page-title: 'thea-lpha-nume-rici-d123-4567'}
//       That way, we only have to replace that object and no longer risk
//       losing the entire page data like we potentially could with this
//       implementation as it exists now.
// DATA IN: String
function changeLocalStoragePageTitle(newTitle) {
  const params = new URLSearchParams(window.location.search);
  const currentTitle = params.get('config');

  // Retrieve the pages object from localStorage
  const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString));

  // Check if the currentTitle exists in the pages object
  if (appSageStorage.pages[currentTitle]) {
    // Clone the data from the current title
    const pageData = appSageStorage.pages[currentTitle];

    // Assign the data to the new title
    appSageStorage.pages[newTitle] = pageData;

    // Delete the current title entry
    delete appSageStorage.pages[currentTitle];

    // Save the updated pages object back to localStorage
    localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));

    // Update the URL parameters
    params.set('config', newTitle);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  } else {
    console.error(`Page with title "${currentTitle}" does not exist.`);
  }
} // DATA OUT: null

// This function generates the area for creating as many items of metadata as
// the designer deems necessary.
// DATA IN: ['HTML Element, <div>', 'null || String:append/prepend']
function addEditableMetadata(container, placement) {
  /* 
  defaults:
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  automatically generate?:
    <meta name="description" content="This page was built using appSage">
    <meta property="og:title" content="Untitled | Built w/ appSage">
  */
  const metaDataContainer = document.createElement('div');
  if (placement === 'prepend') {
    container.prepend(metaDataContainer);
  } else {
    container.appendChild(metaDataContainer);
  }

  const params = new URLSearchParams(window.location.search);
  const page_id = params.get('config');
  const metaDataPairsContainer = document.createElement('div');
  metaDataPairsContainer.innerHTML = '<h3 class="font-semibold text-lg mb-2">Metadata</h3>';
  metaDataPairsContainer.className = 'my-2 col-span-5 border rounded-md border-slate-200 overflow-y-scroll p-2 max-h-48'
  metaDataContainer.appendChild(metaDataPairsContainer);

  const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
  const settings = storedData.pages[page_id].settings;
  if (settings) {
    const metaTags = JSON.parse(settings).metaTags;

    if (metaTags) {
      metaTags.forEach(tag => {
        addMetadataPair(tag.type, tag.name, tag.content);
      });
    }
  }

  // Add initial empty metadata pair
  function addMetadataPair(meta_type, meta_name, meta_content) {
    const pair = document.createElement('div');
    pair.className = 'metadata-pair mt-2'

    const select = document.createElement('select');
    select.className = 'metadata meta-type my-1 shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
    const optionName = document.createElement('option');
    optionName.value = 'name';
    optionName.selected = 'name' === meta_type;
    optionName.text = 'Name';
    const optionProperty = document.createElement('option');
    optionProperty.value = 'property';
    optionName.selected = 'property' === meta_type;
    optionProperty.text = 'Property';
    select.appendChild(optionName);
    select.appendChild(optionProperty);

    const nameInput = document.createElement('input');
    nameInput.className = 'metadata meta-name my-1 shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
    nameInput.type = 'text';
    nameInput.value = meta_name || '';
    nameInput.placeholder = 'Name/Property';

    const contentInput = document.createElement('input');
    contentInput.className = 'metadata meta-content my-1 shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
    contentInput.type = 'text';
    contentInput.value = meta_content || '';
    contentInput.placeholder = 'Content';

    pair.appendChild(select);
    pair.appendChild(nameInput);
    pair.appendChild(contentInput);
    metaDataPairsContainer.appendChild(pair);
  }

  addMetadataPair();

  const addButton = document.createElement('button');
  addButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline mb-1"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" /></svg> Metadata';
  addButton.className = 'col-span-2 bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded h-12 w-28 mt-2';
  addButton.id = 'add-metadata-button';
  metaDataContainer.appendChild(addButton);

  addButton.addEventListener('click', function () {
    addMetadataPair();
  });

  document.querySelectorAll('.metadata').forEach(input => {
    input.addEventListener('change', function () {
      const params = new URLSearchParams(window.location.search);
      const page_id = params.get('config');
      const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
      const settings = JSON.parse(storedData.pages[page_id].settings);
      const metaTags = [];

      document.querySelectorAll('.metadata-pair').forEach(pair => {
        const type = pair.querySelector('.meta-type').value;
        const name = pair.querySelector('.meta-name').value;
        const content = pair.querySelector('.meta-content').value;
        if (name && content) {
          metaTags.push({ type, name, content });
        }
      });

      settings.metaTags = metaTags;
      storedData.pages[page_id].settings = JSON.stringify(settings);
      localStorage.setItem(appSageStorageString, JSON.stringify(storedData));
      console.log('Metadata saved successfully!');
    });
  });
} // DATA OUT: null

// This used to be in an inline script on the page:
document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const config = params.get('config');
  document.querySelector('title').textContent = `Editing: ${config} | appSage`;

  if (config) {
    const json = loadPage(config);
    if (json) {
      loadChanges(json);
      loadPageSettings(config);
      loadPageBlobs(config);
      loadPageMetadata(config)
    }
    setupAutoSave(config);
  } else {
    let pageId = createNewConfigurationFile();
    setupAutoSave(pageId);
  }
});

function createNewConfigurationFile() {
  let filename = 'Untitled';
  let counter = 1;
  while (loadPage(filename)) {
    filename = `Untitled-${counter}`;
    counter++;
  }

  savePage(filename, '[]'); // Initialize with an empty array
  window.location.search = `?config=${filename}`; // Redirect with the new file as a parameter
  return filename;
}

/* File: ./app/js/editor/globals.js */
/*

  editor/globals.js
  
  These house all the icons needed for the editor. Most icons are from
  FontAwesome, added to this repository in July 2024 under a paid license
  under the ownership of Ian McKenzie (https://psychosage.io/contact/)

*/

if (typeof customAppSageStorage !== 'undefined') {
  // This allows developers to set a custom storage name so that if people
  // are using multiple appSage derived products, the object won't get too
  // bogged down or confused. This was originally made to support dashSage.
  var appSageStorageString = customAppSageStorage;
} else {
  var appSageStorageString = 'appSageStorage';
}
var tailwindColors = tailwind.config.theme.colors;
var colorArray = extractColorNames(tailwindColors);
var interactivityState = '';

var plainEnglishBreakpointNames = {
  "xs": 'Extra Small',
  "sm": 'Small-Sized',
  "md": 'Medium-Sized',
  "lg": 'Large',
  "xl": 'Extra Large',
  "2xl": 'Extra, Extra Large'
}

var tooltips = {
  'justify-items-start': "Put columns in columns in the grid to the left-most side of the column's maximum span",
  'justify-items-end': "Put columns in columns in the grid to the right-most side of the column's maximum span",
  'justify-items-center': "Put columns in columns in the grid to the horizontal middle of the column's maximum span",
  'justify-items-stretch': "Stretch the columns across the column's maximum span",
  'justify-items-reset': "Reset justification of items to default",
  'content-start': "Align columns to the top left of the grid. Choosing this option may not be obvious unless you also choose 'Place Items Start'",
  'content-end': "Align columns to the bottom right of the grid. Choosing this option may not be obvious unless you also choose 'Place Items End'",
  'content-center': "Align columns to the center of the grid.",
  'content-stretch': "Stretch columns to fill the height of the grid",
  'content-between': "Align columns evenly from the very top and very bottom of the grid",
  'content-around': "Align columns evenly within the height of the grid",
  'content-evenly': "Align columns evenly between the columns and the space around the columns",
  'content-reset': "Reset column vertical alignment",
  'place-items-start': "Place content within your columns to the columns to the top left of the columns",
  'place-items-end': "Place content within your columns to the columns to the bottom right of the columns",
  'place-items-center': "Place content within your columns to the columns to the center of the columns",
  'place-items-stretch': "Stretch content to the full dimensions of your columns",
  'place-items-reset': "Reset items placement alignment",
  'bg-no-repeat': "Do not repeat the background, this option pairs well with 'contain' or 'cover' background sizing",
  'bg-repeat': "Repeat images to make a background pattern",
  'bg-repeat-x': "Repeat images to make a pattern horizontally",
  'bg-repeat-y': "Repeat images to make a pattern vertically",
  'move-column': "Move this column to the ",
  'remove-column': "Remove this column forever (that\'s a long time!)",
  'add-column': "Add another column to this grid",
  'add-content': "Add content to this column",
  'remove-content': "Remove this content forever (that\'s a long time!)",
  'move-content-up': "Move this content upward in the column",
  'move-content-down': "Move this content downward in the column",
  'remove-grid': "Remove this grid forever (that\'s a long time!)",
  'move-grid-up': "Move this grid upward in the document",
  'move-grid-down': "Move this grid downward in the document",
  'color-vision-impairement': "Please remember to make colors contrast well for people with vision impairments.",
  'text-alignment-justify': "Make text expand across the entire box. If you're not a professional designer, this option is a bad idea",
  'text-alignment-other': "Align text to the ",
  'border-style-none': "Remove border styles from this element",
  'border-style-other': "Change the border style to be a ",
  'background-size-cover': "Make your background image cover the entire box; cropping will occur",
  'background-size-contain': "Make your background image stay contained inside the box, empty space may become seen",
  'swatchboard': "TailwindCSS class name: ",
  'bg-icon': "Position your background image to the ",
  'italicize': "Italicize your text",
  'underline': "Underline your text",
  'padding': "Create space between the edge of the box and content inside of it.",
  'margin': "Create space between the edge of the box and content inside of it."
}

// global variable
var appSageEditorIcons = {
  "responsive": {
    "xs": '<svg data-extra-info="For smartwatch screens & larger" fill="currentColor" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 48l256 0c0-26.5-21.5-48-48-48L112 0C85.5 0 64 21.5 64 48zM80 80C35.8 80 0 115.8 0 160L0 352c0 44.2 35.8 80 80 80l224 0c44.2 0 80-35.8 80-80l0-192c0-44.2-35.8-80-80-80L80 80zM192 213.3a42.7 42.7 0 1 1 0 85.3 42.7 42.7 0 1 1 0-85.3zM213.3 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-74.7-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm74.7-160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-74.7-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM64 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm224-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 512l160 0c26.5 0 48-21.5 48-48L64 464c0 26.5 21.5 48 48 48z"/></svg>',
    "sm": '<svg data-extra-info="For mobile phone screens & larger" fill="currentColor" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM144 448c0 8.8 7.2 16 16 16l64 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-64 0c-8.8 0-16 7.2-16 16zM304 64L80 64l0 320 224 0 0-320z"/></svg>',
    "md": '<svg data-extra-info="For tall tablet screens & larger" fill="currentColor" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM160 448c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-96 0c-8.8 0-16 7.2-16 16zM384 64L64 64l0 320 320 0 0-320z"/></svg>',
    "lg": '<svg data-extra-info="For wide tablet screens & larger" fill="currentColor" class="h-full w-full rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM160 448c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-96 0c-8.8 0-16 7.2-16 16zM384 64L64 64l0 320 320 0 0-320z"/></svg>',
    "xl": '<svg data-extra-info="For laptop screens & larger" fill="currentColor" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M128 32C92.7 32 64 60.7 64 96l0 256 64 0 0-256 384 0 0 256 64 0 0-256c0-35.3-28.7-64-64-64L128 32zM19.2 384C8.6 384 0 392.6 0 403.2C0 445.6 34.4 480 76.8 480l486.4 0c42.4 0 76.8-34.4 76.8-76.8c0-10.6-8.6-19.2-19.2-19.2L19.2 384z"/></svg>',
    "2xl": '<svg data-extra-info="For desktop screens & larger" fill="currentColor" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z"/></svg>'
  },
  "html-states": {
    "hover": '<svg data-extra-info="When the mouse is over the element" fill="currentColor" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M320 112c59.2 0 109.6 37.9 128.3 90.7c5 14.2 7.7 29.4 7.7 45.3c0 0-40 40-136 40s-136-40-136-40c0-15.9 2.7-31.1 7.7-45.3c18.7-52.8 69-90.7 128.3-90.7zm0-48c-90.1 0-165.2 64.8-180.9 150.4C55.1 237.5 0 276.2 0 320c0 70.7 143.3 128 320 128s320-57.3 320-128c0-43.8-55.1-82.5-139.1-105.6C485.2 128.8 410.2 64 320 64zm0 288a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM104 328a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm408-24a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>'
  },
  "heading": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32l48 0 48 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 112 224 0 0-112-16 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l48 0 48 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 144 0 176 16 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-48 0-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-144-224 0 0 144 16 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-48 0-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-176L48 96 32 96C14.3 96 0 81.7 0 64z"/></svg>',
  "media": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M192 64c0-35.3 28.7-64 64-64L576 0c35.3 0 64 28.7 64 64l0 69.6c-12.9-6.1-27.9-7.1-41.7-2.5l-98.9 33-37.8-60.5c-2.9-4.7-8.1-7.5-13.6-7.5s-10.6 2.8-13.6 7.5L388 177.9l-15.3-19.7c-3-3.9-7.7-6.2-12.6-6.2s-9.6 2.3-12.6 6.2l-56 72c-3.8 4.8-4.4 11.4-1.7 16.9s8.3 9 14.4 9l64 0 0 64-112 0c-35.3 0-64-28.7-64-64l0-192zM319.5 404.6c-13.8 10.3-25.2 25.2-29.6 43.4L64 448c-35.3 0-64-28.7-64-64L0 160c0-35.3 28.7-64 64-64l96 0 0 264c0 17.7 14.3 32 32 32l150.2 0c-8.2 3.3-15.8 7.5-22.6 12.6zM320 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM56 168l0 16c0 8.8 7.2 16 16 16l16 0c8.8 0 16-7.2 16-16l0-16c0-8.8-7.2-16-16-16l-16 0c-8.8 0-16 7.2-16 16zm16 80c-8.8 0-16 7.2-16 16l0 16c0 8.8 7.2 16 16 16l16 0c8.8 0 16-7.2 16-16l0-16c0-8.8-7.2-16-16-16l-16 0zM56 360l0 16c0 8.8 7.2 16 16 16l16 0c8.8 0 16-7.2 16-16l0-16c0-8.8-7.2-16-16-16l-16 0c-8.8 0-16 7.2-16 16zM630 164.5c6.3 4.5 10 11.8 10 19.5l0 48 0 160c0 1.2-.1 2.4-.3 3.6c.2 1.5 .3 2.9 .3 4.4c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48c5.5 0 10.9 .5 16 1.5l0-88.2-144 48L448 464c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48c5.5 0 10.9 .5 16 1.5L400 296l0-48c0-10.3 6.6-19.5 16.4-22.8l192-64c7.3-2.4 15.4-1.2 21.6 3.3z"/></svg>',
  "paragraph": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M192 32l64 0 160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0 0 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-352-32 0 0 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96-32 0c-88.4 0-160-71.6-160-160s71.6-160 160-160z"/></svg>',
  "button": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M448 96c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320zM377 273L265 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L88 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l214.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L377 239c9.4 9.4 9.4 24.6 0 33.9z"/></svg>',
  "form": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"/></svg>',
  "text-center": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M352 64c0-17.7-14.3-32-32-32L128 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32L32 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 416c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32l-192 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32z"/></svg>',
  "text-right": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M448 64c0 17.7-14.3 32-32 32L192 96c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>',
  "text-left": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M288 64c0 17.7-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32L32 352c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>',
  "text-justify": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M448 64c0-17.7-14.3-32-32-32L32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32L32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 160c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32L32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32z"/></svg>',
  "text-color": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M221.5 51.7C216.6 39.8 204.9 32 192 32s-24.6 7.8-29.5 19.7l-120 288-40 96c-6.8 16.3 .9 35 17.2 41.8s35-.9 41.8-17.2L93.3 384l197.3 0 31.8 76.3c6.8 16.3 25.5 24 41.8 17.2s24-25.5 17.2-41.8l-40-96-120-288zM264 320l-144 0 72-172.8L264 320z"/></svg>',
  "background-color": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6l319.2 0 42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z"/></svg>',
  "bg-contain": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M9.4 9.4C21.9-3.1 42.1-3.1 54.6 9.4L160 114.7 160 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 128c0 17.7-14.3 32-32 32L64 224c-17.7 0-32-14.3-32-32s14.3-32 32-32l50.7 0L9.4 54.6C-3.1 42.1-3.1 21.9 9.4 9.4zm448 0c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L397.3 160l50.7 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-128 0c-17.7 0-32-14.3-32-32l0-128c0-17.7 14.3-32 32-32s32 14.3 32 32l0 50.7L457.4 9.4zM32 320c0-17.7 14.3-32 32-32l128 0c17.7 0 32 14.3 32 32l0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-50.7L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L114.7 352 64 352c-17.7 0-32-14.3-32-32zm256 0c0-17.7 14.3-32 32-32l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-50.7 0L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L352 397.3l0 50.7c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128z"/></svg>',
  "bg-cover": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l50.7 0L256 210.7 141.3 96 192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32C46.3 32 32 46.3 32 64l0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-50.7L210.7 256 96 370.7 96 320c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 128c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-50.7 0L256 301.3 370.7 416 320 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 50.7L301.3 256 416 141.3l0 50.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L320 32z"/></svg>',
  "bg-center": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path fill="currentColor" d="M384,16c26.5,0,48,21.5,48,48v320c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h320ZM64,0C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64H64Z"/><circle fill="currentColor" cx="152" cy="176" r="24"/><path fill="currentColor" d="M317.9,277.2l-66-96c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6s6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4h0Z"/><path fill="currentColor" d="M317.9,277.2l-66-96c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6s6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4h0Z"/><circle fill="currentColor" cx="152" cy="176" r="24"/><path fill="currentColor" d="M251.9,181.2c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6s6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4l-66-96h0Z"/><circle fill="currentColor" cx="152" cy="176" r="24"/><path fill="white" d="M320,128h-192c-13.3,0-24,10.7-24,24v144c0,13.3,10.7,24,24,24h192c13.3,0,24-10.7,24-24v-144c0-13.3-10.7-24-24-24ZM152,152c13.3,0,24,10.7,24,24s-10.7,24-24,24-24-10.7-24-24,10.7-24,24-24ZM318.7,289.6c-2.1,4-6.2,6.4-10.7,6.4h-168c-4.5,0-8.7-2.5-10.7-6.6s-1.6-9,1.1-12.6l21.6-28.8,14.4-19.2c2.2-3,5.8-4.8,9.6-4.8s7.3,1.8,9.6,4.8l7.2,9.6,39.3-57.2c2.2-3.2,5.9-5.2,9.9-5.2s7.7,1.9,9.9,5.2l66,96c2.5,3.7,2.8,8.4.8,12.4Z"/></svg>',
  "bg-top": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path fill="currentColor" d="M384,16c26.5,0,48,21.5,48,48v320c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h320ZM64,0C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64H64Z"/><circle fill="currentColor" cx="137.6" cy="73.6" r="28.8"/><path fill="currentColor" d="M336.7,195l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><path fill="currentColor" d="M336.7,195l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><circle fill="currentColor" cx="137.6" cy="73.6" r="28.8"/><path fill="currentColor" d="M257.5,79.8c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9l-79.2-115.2h0Z"/><circle fill="currentColor" cx="137.6" cy="73.6" r="28.8"/><path fill="white" d="M339.2,16H108.8c-16,0-28.8,12.8-28.8,28.8v172.8c0,16,12.8,28.8,28.8,28.8h230.4c16,0,28.8-12.8,28.8-28.8V44.8c0-16-12.8-28.8-28.8-28.8ZM137.6,44.8c16,0,28.8,12.8,28.8,28.8s-12.8,28.8-28.8,28.8-28.8-12.8-28.8-28.8,12.8-28.8,28.8-28.8ZM337.6,209.9c-2.5,4.8-7.4,7.7-12.8,7.7H123.2c-5.4,0-10.4-3-12.8-7.9s-1.9-10.8,1.3-15.1l25.9-34.6,17.3-23c2.6-3.6,7-5.8,11.5-5.8s8.8,2.2,11.5,5.8l8.6,11.5,47.2-68.6c2.6-3.8,7.1-6.2,11.9-6.2s9.2,2.3,11.9,6.2l79.2,115.2c3,4.4,3.4,10.1,1,14.9Z"/></svg>',
  "bg-right": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path fill="currentColor" d="M384,16c26.5,0,48,21.5,48,48v320c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h320ZM64,0C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64H64Z"/><circle fill="currentColor" cx="201.6" cy="166.4" r="28.8"/><path fill="currentColor" d="M400.7,287.8l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><path fill="currentColor" d="M400.7,287.8l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><circle fill="currentColor" cx="201.6" cy="166.4" r="28.8"/><path fill="currentColor" d="M321.5,172.6c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9l-79.2-115.2h0Z"/><circle fill="currentColor" cx="201.6" cy="166.4" r="28.8"/><path fill="white" d="M403.2,108.8h-230.4c-16,0-28.8,12.8-28.8,28.8v172.8c0,16,12.8,28.8,28.8,28.8h230.4c16,0,28.8-12.8,28.8-28.8v-172.8c0-16-12.8-28.8-28.8-28.8ZM201.6,137.6c16,0,28.8,12.8,28.8,28.8s-12.8,28.8-28.8,28.8-28.8-12.8-28.8-28.8,12.8-28.8,28.8-28.8ZM401.6,302.7c-2.5,4.8-7.4,7.7-12.8,7.7h-201.6c-5.4,0-10.4-3-12.8-7.9s-1.9-10.8,1.3-15.1l25.9-34.6,17.3-23c2.6-3.6,7-5.8,11.5-5.8s8.8,2.2,11.5,5.8l8.6,11.5,47.2-68.6c2.6-3.8,7.1-6.2,11.9-6.2s9.2,2.3,11.9,6.2l79.2,115.2c3,4.4,3.4,10.1,1,14.9h0Z"/></svg>',
  "bg-bottom": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path fill="currentColor" d="M384,16c26.5,0,48,21.5,48,48v320c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h320ZM64,0C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64H64Z"/><circle fill="currentColor" cx="137.6" cy="259.2" r="28.8"/><path fill="currentColor" d="M336.7,380.6l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><path fill="currentColor" d="M336.7,380.6l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><circle fill="currentColor" cx="137.6" cy="259.2" r="28.8"/><path fill="currentColor" d="M257.5,265.4c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9l-79.2-115.2h0Z"/><circle fill="currentColor" cx="137.6" cy="259.2" r="28.8"/><path fill="white" d="M339.2,201.6H108.8c-16,0-28.8,12.8-28.8,28.8v172.8c0,16,12.8,28.8,28.8,28.8h230.4c16,0,28.8-12.8,28.8-28.8v-172.8c0-16-12.8-28.8-28.8-28.8ZM137.6,230.4c16,0,28.8,12.8,28.8,28.8s-12.8,28.8-28.8,28.8-28.8-12.8-28.8-28.8,12.8-28.8,28.8-28.8ZM337.6,395.5c-2.5,4.8-7.4,7.7-12.8,7.7H123.2c-5.4,0-10.4-3-12.8-7.9s-1.9-10.8,1.3-15.1l25.9-34.6,17.3-23c2.6-3.6,7-5.8,11.5-5.8s8.8,2.2,11.5,5.8l8.6,11.5,47.2-68.6c2.6-3.8,7.1-6.2,11.9-6.2s9.2,2.3,11.9,6.2l79.2,115.2c3,4.4,3.4,10.1,1,14.9h0Z"/></svg>',
  "bg-left": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path fill="currentColor" d="M384,16c26.5,0,48,21.5,48,48v320c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h320ZM64,0C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64H64Z"/><circle fill="currentColor" cx="73.6" cy="166.4" r="28.8"/><path fill="currentColor" d="M272.7,287.8l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><path fill="currentColor" d="M272.7,287.8l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><circle fill="currentColor" cx="73.6" cy="166.4" r="28.8"/><path fill="currentColor" d="M193.5,172.6c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9l-79.2-115.2h0Z"/><circle fill="currentColor" cx="73.6" cy="166.4" r="28.8"/><path fill="white" d="M275.2,108.8H44.8c-16,0-28.8,12.8-28.8,28.8v172.8c0,16,12.8,28.8,28.8,28.8h230.4c16,0,28.8-12.8,28.8-28.8v-172.8c0-16-12.8-28.8-28.8-28.8ZM73.6,137.6c16,0,28.8,12.8,28.8,28.8s-12.8,28.8-28.8,28.8-28.8-12.8-28.8-28.8,12.8-28.8,28.8-28.8ZM273.6,302.7c-2.5,4.8-7.4,7.7-12.8,7.7H59.2c-5.4,0-10.4-3-12.8-7.9s-1.9-10.8,1.3-15.1l25.9-34.6,17.3-23c2.6-3.6,7-5.8,11.5-5.8s8.8,2.2,11.5,5.8l8.6,11.5,47.2-68.6c2.6-3.8,7.1-6.2,11.9-6.2s9.2,2.3,11.9,6.2l79.2,115.2c3,4.4,3.4,10.1,1,14.9h0Z"/></svg>',
  "bg-repeat": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path fill="white" d="M447.8,128v-64c0-10.6-2.6-20.5-7.1-29.3h.1c-7.4-14.2-20-25.4-35.2-30.9h0c-3.4-1.2-6.8-2.1-10.4-2.8-3.6-.7-7.3-1-11.1-1H64c-13.7,0-26.3,4.3-36.7,11.6C10.8,23.2,0,42.3,0,64v320c0,35.1,28.3,63.6,63.3,64h322.6c8.8-.2,17.2-2.3,24.8-5.8,7.6-3.5,14.4-8.5,20-14.5,10.7-11.4,17.2-26.8,17.2-43.7V128h-.1Z"/><circle fill="black" cx="392" cy="176" r="24"/><circle fill="black" cx="152" cy="176" r="24"/><path fill="black" d="M251.9,181.2c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4l-66-96Z"/><circle fill="black" cx="392" cy="368" r="24"/><circle fill="black" cx="152" cy="368" r="24"/><path fill="black" d="M440.9,34.7c-7.4-14.2-20-25.4-35.2-30.9h0c-3.4-1.2-6.8-2.2-10.4-2.8-.9-.2-1.8-.3-2.7-.5-2.7-.4-5.5-.5-8.4-.5H64c-13.7,0-26.3,4.3-36.7,11.6C10.8,23.2,0,42.3,0,64v320c0,35.1,28.3,63.6,63.3,64h.1c0,.1,0,0,0,0h322.7c8.8-.2,17.2-2.3,24.8-5.8,7.6-3.5,14.3-8.5,20-14.5,10.7-11.4,17.2-26.8,17.2-43.7V64c0-10.6-2.6-20.5-7.1-29.3ZM419.3,416.5s0,0,0,0c0,0,0,0,0,0-1-.3.5-.5-3.3-.5s-7.3,1.8-9.6,4.8l-6.4,8.5-.2.2c-4.9,1.7-10.1,2.7-15.6,2.7h-91.7c0,0-40.5-59-40.5-59-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-8.5,11.3h0c0,0-93.8,0-93.8,0-4.5,0-8.8-.6-12.8-1.8h0l-35.1-51.1v-83.3h51.9c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4l-61.8-89.9v-83.3h51.9c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4L36.3,24.8s0,0,0,0c7.8-5.5,17.4-8.8,27.7-8.8h149.6l-20.9,30.4-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4h0c2.1-4,1.8-8.7-.8-12.4l-47.6-69.2h113.7c14.6,0,27.8,6.6,36.6,16.9,0,0,0,0,0,0,0,0-.1,0-.2,0-1.4-.6-.8-.9-4.6-.9s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h52v133.3l-6.4-8.5c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h52v88c0,12.5-4.8,23.9-12.7,32.5Z"/></svg>',
  "bg-no-repeat": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><rect fill="white" x="104" y="128" width="240" height="192"/><path fill="black" d="M384,0H64C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64ZM432,384c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h320c26.5,0,48,21.5,48,48v320Z"/><circle fill="black" cx="152" cy="176" r="24"/><path fill="black" d="M251.9,181.2c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4l-66-96Z"/></svg>',
  "bg-repeat-x": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><polygon fill="white" points="344 128 104 128 0 128 0 320 104 320 344 320 448 320 448 128 344 128"/><circle fill="black" cx="392" cy="176" r="24"/><path fill="black" d="M384,0H64C28.7,0,0,28.7,0,64v112h0v119.8h0v88.2c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64ZM432,384c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48v-88.1h53.8c3.7-.5,6.9-2.7,8.7-5.9,0,0,0-.1,0-.1.1-.1.1-.2.1-.2v-.2l-.3-.4c.2-.5.5-1,.6-1.5,1.3-3.6.8-7.7-1.5-10.9l-61.6-89.6v-123.1c0-26.5,21.5-48,48-48h320c26.5,0,48,21.5,48,48v173.2l-6.3-8.4c-1.4-2-3.5-3.4-5.8-4.2-.3-.1-.7-.3-1-.3-.9-.2-1.8-.3-2.8-.3s-1.9.1-2.8.3c-.3.1-.7.2-1,.3-2.3.8-4.3,2.2-5.8,4.2l-14.4,19.2-21.6,28.8c-.6.8-1.1,1.6-1.5,2.5-.2.3-.3.7-.4,1.1-.9,2.9-.7,6.2.8,9,1.3,2.6,3.5,4.6,6.1,5.7.1,0,.3.2.5.2,1.2.5,2.6.7,4,.7h52v88Z"/><circle fill="black" cx="152" cy="176" r="24"/><path fill="black" d="M251.9,181.2c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4l-66-96Z"/></svg>',
  "bg-repeat-y": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><polygon fill="white" points="104 0 104 128 104 320 104 448 344 448 344 320 344 128 344 0 104 0"/><circle fill="black" cx="152" cy="368" r="24"/><path fill="black" d="M384,0H64C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64ZM432,384c0,26.5-21.5,48-48,48h-91.7l-40.4-58.8c-.1-.2-.2-.4-.4-.6-.2-.2-.3-.4-.4-.5-1.8-2.1-4.3-3.5-7-4h-4.2c-2.7.5-5.2,1.9-7,4-.2.2-.3.3-.4.5,0,.2-.3.4-.4.6l-39.3,57.2-7.2-9.6c-1.4-2-3.5-3.4-5.8-4.2-.3,0-.7-.3-1-.3-.9-.2-1.8-.3-2.8-.3s-1.9,0-2.8.3c-.3.1-.7.2-1,.3-2.3.8-4.3,2.2-5.8,4.2l-8.4,11.2h-94c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h149.6l-20.8,30.3-7.2-9.6c-1.4-2-3.5-3.4-5.8-4.2-.3,0-.7-.3-1-.3-.9-.3-1.8-.3-2.8-.3s-1.9,0-2.8.3c-.3,0-.7.3-1,.3-2.3.8-4.3,2.2-5.8,4.2l-14.4,19.2-21.6,28.8c-.6.8-1.1,1.6-1.5,2.5-.2.3-.3.7-.4,1.1-.9,2.9-.7,6.2.8,9,1.3,2.6,3.5,4.6,6.1,5.7,0,.2.3.2.5.2,1.2.5,2.6.7,4,.7h169.7c3.6-.6,6.8-2.7,8.7-5.7.2-.2.3-.4.4-.6h0c2.1-4,1.8-8.7-.8-12.4l-47.6-69.2h113.6c26.5,0,48,21.5,48,48v320Z"/><circle fill="black" cx="152" cy="176" r="24"/><path fill="black" d="M251.9,181.2c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4l-66-96Z"/></svg>',
  "font-size": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 128l0-32 96 0 0 320-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-320 96 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-48c0-26.5-21.5-48-48-48L192 32 48 32C21.5 32 0 53.5 0 80l0 48c0 17.7 14.3 32 32 32s32-14.3 32-32zM384 304l0-16 64 0 0 128-16 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-16 0 0-128 64 0 0 16c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32c0-26.5-21.5-48-48-48l-224 0c-26.5 0-48 21.5-48 48l0 32c0 17.7 14.3 32 32 32s32-14.3 32-32z"/></svg>',
  "font-weight": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32l48 0 16 0 128 0c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128L96 480l-16 0-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-160L48 96 32 96C14.3 96 0 81.7 0 64zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64L112 96l0 128 112 0zM112 288l0 128 144 0c35.3 0 64-28.7 64-64s-28.7-64-64-64l-32 0-112 0z"/></svg>',
  "italic": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M128 64c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-58.7 0L160 416l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l58.7 0L224 96l-64 0c-17.7 0-32-14.3-32-32z"/></svg>',
  "underline": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M16 64c0-17.7 14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 128c0 53 43 96 96 96s96-43 96-96l0-128-16 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 128c0 88.4-71.6 160-160 160s-160-71.6-160-160L64 96 48 96C30.3 96 16 81.7 16 64zM0 448c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32z"/></svg>',
  "margin-t": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M32 32a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm96 0a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm64 32a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zM320 32a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm64 32a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zm-9.4 233.4l-128-128c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 269.3l0 66.7 0 112c0 17.7 14.3 32 32 32s32-14.3 32-32l0-112 0-66.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z"/></svg>',
  "margin-r": '<svg class="h-full w-full rotate-90" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M32 32a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm96 0a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm64 32a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zM320 32a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm64 32a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zm-9.4 233.4l-128-128c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 269.3l0 66.7 0 112c0 17.7 14.3 32 32 32s32-14.3 32-32l0-112 0-66.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z"/></svg>',
  "margin-b": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M374.6 214.6l-128 128c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 242.7l0-66.7 0-112c0-17.7 14.3-32 32-32s32 14.3 32 32l0 112 0 66.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3zM32 480a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm96 0a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm96-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm128-32a32 32 0 1 1 -64 0 32 32 0 1 1 64 0z"/></svg>',
  "margin-l": '<svg class="h-full w-full rotate-90" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M374.6 214.6l-128 128c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 242.7l0-66.7 0-112c0-17.7 14.3-32 32-32s32 14.3 32 32l0 112 0 66.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3zM32 480a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm96 0a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm96-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm128-32a32 32 0 1 1 -64 0 32 32 0 1 1 64 0z"/></svg>',
  "margin-all": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle fill="black" cx="256" cy="488" r="24"/><circle fill="black" cx="140" cy="488" r="24"/><circle fill="black" cx="24" cy="488" r="24"/><circle fill="black" cx="488" cy="488" r="24"/><circle fill="black" cx="372" cy="488" r="24"/><circle fill="black" cx="256" cy="24" r="24"/><circle fill="black" cx="140" cy="24" r="24"/><circle fill="black" cx="24" cy="24" r="24"/><circle fill="black" cx="488" cy="24" r="24"/><circle fill="black" cx="372" cy="24" r="24"/><path fill="black" d="M411.5,245.4l-45-45c-2.9-2.9-6.7-4.3-10.6-4.3s-7.7,1.4-10.6,4.3-4.3,6.7-4.3,10.6,1.4,7.7,4.3,10.6l19.3,19.3h-93.6v-93.8l19.3,19.3c2.9,2.9,6.7,4.3,10.6,4.3s7.7-1.4,10.6-4.3,4.3-6.7,4.3-10.6-1.4-7.7-4.3-10.7h0l-45-44.9c-5.8-5.8-15.3-5.8-21.2,0l-45,45c-2.9,2.9-4.3,6.7-4.3,10.6s1.4,7.7,4.3,10.6,6.7,4.3,10.6,4.3,7.7-1.4,10.6-4.3l19.3-19.3v93.7h-93.8l19.3-19.3c2.9-2.9,4.3-6.7,4.3-10.6s-1.4-7.7-4.3-10.6-6.7-4.3-10.6-4.3-7.7,1.4-10.7,4.3h0l-45,45.1c-5.8,5.8-5.8,15.3,0,21.2l45,45c2.9,2.9,6.7,4.3,10.6,4.3s7.7-1.4,10.6-4.3,4.3-6.7,4.3-10.6-1.4-7.7-4.3-10.6l-19.3-19.3h93.7v40h0v53.7l-19.3-19.3c-2.9-2.9-6.7-4.3-10.6-4.3s-7.7,1.4-10.6,4.3-4.3,6.8-4.3,10.6,1.5,7.7,4.3,10.6l45,45c5.8,5.8,15.3,5.8,21.2,0l45-45c2.9-2.9,4.3-6.7,4.3-10.6s-1.4-7.7-4.3-10.6-6.7-4.3-10.6-4.3-7.7,1.4-10.6,4.3l-19.3,19.3v-37.3h0v-56.2h93.7l-19.3,19.3c-2.9,2.9-4.3,6.7-4.3,10.6s1.4,7.7,4.3,10.6,6.8,4.3,10.6,4.3,7.7-1.5,10.6-4.3l45-45c5.8-5.8,5.8-15.3,0-21.2h0v-.2Z"/><circle fill="black" cx="24" cy="256" r="24"/><circle fill="black" cx="24" cy="140" r="24"/><circle fill="black" cx="24" cy="372" r="24"/><circle fill="black" cx="488" cy="256" r="24"/><circle fill="black" cx="488" cy="140" r="24"/><circle fill="black" cx="488" cy="372" r="24"/></svg>',
  "padding-t": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M374.6 297.4l-128-128c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 269.3 192 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3zM64 160l0-64c0-17.7 14.3-32 32-32l256 0c17.7 0 32 14.3 32 32l0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64c0-53-43-96-96-96L96 0C43 0 0 43 0 96l0 64c0 17.7 14.3 32 32 32s32-14.3 32-32z"/></svg>',
  "padding-r": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/></svg>',
  "padding-b": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M374.6 214.6l-128 128c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 242.7 192 32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 210.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3zM64 352l0 64c0 17.7 14.3 32 32 32l256 0c17.7 0 32-14.3 32-32l0-64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 64c0 53-43 96-96 96L96 512c-53 0-96-43-96-96l0-64c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg>',
  "padding-l": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32zm9.4 182.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L269.3 224 480 224c17.7 0 32 14.3 32 32s-14.3 32-32 32l-210.7 0 73.4 73.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-128-128z"/></svg>',
  "padding-all": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="black" d="M402.3,0H109.7C49.1,0,0,49.1,0,109.7v292.6c0,60.6,49.1,109.7,109.7,109.7h292.6c60.6,0,109.7-49.1,109.7-109.7V109.7c0-60.6-49.1-109.7-109.7-109.7ZM464,422.4c0,23-18.6,41.6-41.6,41.6H89.6c-23,0-41.6-18.6-41.6-41.6V89.6c0-23,18.6-41.6,41.6-41.6h332.8c23,0,41.6,18.6,41.6,41.6v332.8Z"/><path fill="black" d="M411.5,245.4l-45-45c-2.9-2.9-6.7-4.3-10.6-4.3s-7.7,1.4-10.6,4.3-4.3,6.7-4.3,10.6,1.4,7.7,4.3,10.6l19.3,19.3h-93.6v-93.8l19.3,19.3c2.9,2.9,6.7,4.3,10.6,4.3s7.7-1.4,10.6-4.3,4.3-6.7,4.3-10.6-1.4-7.7-4.3-10.7h0l-45-44.9c-5.8-5.8-15.3-5.8-21.2,0l-45,45c-2.9,2.9-4.3,6.7-4.3,10.6s1.4,7.7,4.3,10.6,6.7,4.3,10.6,4.3,7.7-1.4,10.6-4.3l19.3-19.3v93.7h-93.8l19.3-19.3c2.9-2.9,4.3-6.7,4.3-10.6s-1.4-7.7-4.3-10.6-6.7-4.3-10.6-4.3-7.7,1.4-10.7,4.3h0l-45,45.1c-5.8,5.8-5.8,15.3,0,21.2l45,45c2.9,2.9,6.7,4.3,10.6,4.3s7.7-1.4,10.6-4.3,4.3-6.7,4.3-10.6-1.4-7.7-4.3-10.6l-19.3-19.3h93.7v40h0v53.7l-19.3-19.3c-2.9-2.9-6.7-4.3-10.6-4.3s-7.7,1.4-10.6,4.3-4.3,6.8-4.3,10.6,1.5,7.7,4.3,10.6l45,45c5.8,5.8,15.3,5.8,21.2,0l45-45c2.9-2.9,4.3-6.7,4.3-10.6s-1.4-7.7-4.3-10.6-6.7-4.3-10.6-4.3-7.7,1.4-10.6,4.3l-19.3,19.3v-37.3h0v-56.2h93.7l-19.3,19.3c-2.9,2.9-4.3,6.7-4.3,10.6s1.4,7.7,4.3,10.6,6.8,4.3,10.6,4.3,7.7-1.5,10.6-4.3l45-45c5.8-5.8,5.8-15.3,0-21.2h0v-.2Z"/></svg>',
  "border-color": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6l319.2 0 42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z"/></svg>',
  "border-dashed": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M96 32l32 0 0 64L96 96c-17.7 0-32 14.3-32 32l0 32L0 160l0-32C0 75 43 32 96 32zM0 192l64 0 0 128L0 320 0 192zm384 0l64 0 0 128-64 0 0-128zm64-32l-64 0 0-32c0-17.7-14.3-32-32-32l-32 0 0-64 32 0c53 0 96 43 96 96l0 32zm0 192l0 32c0 53-43 96-96 96l-32 0 0-64 32 0c17.7 0 32-14.3 32-32l0-32 64 0zM64 352l0 32c0 17.7 14.3 32 32 32l32 0 0 64-32 0c-53 0-96-43-96-96l0-32 64 0zm96 128l0-64 128 0 0 64-128 0zm0-384l0-64 128 0 0 64L160 96z"/></svg>',
  "border-dotted": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><circle cx="32" cy="448" r="32"/><circle cx="128" cy="448" r="32"/><circle cx="128" cy="64" r="32"/><circle cx="320" cy="448" r="32"/><circle cx="320" cy="64" r="32"/><circle cx="224" cy="448" r="32"/><circle cx="224" cy="64" r="32"/><circle cx="416" cy="448" r="32"/><circle cx="416" cy="64" r="32"/><circle cx="32" cy="64" r="32"/><circle cx="416" cy="256" r="32"/><circle cx="32" cy="256" r="32"/><circle cx="416" cy="352" r="32"/><circle cx="32" cy="352" r="32"/><circle cx="416" cy="160" r="32"/><circle cx="32" cy="160" r="32"/></svg>',
  "border-double": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M384,48c26.5,0,48,21.5,48,48v320c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V96c0-26.5,21.5-48,48-48h320ZM64,32C28.7,32,0,60.7,0,96v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V96c0-35.3-28.7-64-64-64H64Z"/><path d="M366.9,70.3c23.7,0,42.9,19.2,42.9,42.9v285.7c0,23.7-19.2,42.9-42.9,42.9H81.1c-23.7,0-42.9-19.2-42.9-42.9V113.1c0-23.7,19.2-42.9,42.9-42.9h285.7ZM81.1,56c-31.5,0-57.1,25.6-57.1,57.1v285.7c0,31.5,25.6,57.1,57.1,57.1h285.7c31.5,0,57.1-25.6,57.1-57.1V113.1c0-31.5-25.6-57.1-57.1-57.1H81.1Z"/></svg>',
  "border-solid": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M384 80c8.8 0 16 7.2 16 16l0 320c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16L48 96c0-8.8 7.2-16 16-16l320 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z"/></svg>',
  "border-radius": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M96,32h32v64h-32c-17.7,0-32,14.3-32,32v32H0v-32C0,75,43,32,96,32Z"/><path d="M448,160h-64v-32c0-17.7-14.3-32-32-32h-32V32h32c53,0,96,43,96,96v32Z"/><path d="M448,352v32c0,53-43,96-96,96h-32v-64h32c17.7,0,32-14.3,32-32v-32h64Z"/><path d="M64,352v32c0,17.7,14.3,32,32,32h32v64h-32c-53,0-96-43-96-96v-32h64Z"/></svg>',
  "border-width": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M0,370c0-17.7,14.3-32,32-32h576c17.7,0,32,14.3,32,32s-14.3,32-32,32H32c-17.7,0-32-14.3-32-32Z"/><rect y="110" width="640" height="32" rx="16" ry="16"/><rect y="216" width="640" height="48" rx="24" ry="24"/></svg>',
  "border-none": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M486.8,479.6h0c0,0,0,0,0,0,0,0,0,0-.1,0h0Z"/><path d="M426.4,432H160c-8.8,0-16-7.2-16-16v-206.6l-.6-.5-47.4-37.4v244.4c0,35.3,28.7,64,64,64h320c1.8,0,3.5,0,5.3-.2.5,0,1-.1,1.5-.2l-60.3-47.5h0Z"/><path d="M630.8,469.1l-86.8-68V96c0-35.3-28.7-64-64-64H160c-.8,0-1.6,0-2.4,0-.4,0-.8,0-1.2,0-.4,0-.8,0-1.1,0-.5,0-1,0-1.5.1-.3,0-.6,0-.9.1-.3,0-.7,0-1,.1-.6,0-1.2.1-1.8.2-.6,0-1.2.2-1.8.3,0,0-.2,0-.3,0-.5,0-1,.2-1.5.3-.5,0-.9.2-1.4.3-.4,0-.7.2-1.1.3-.5.1-1,.3-1.5.4-.8.2-1.5.4-2.2.7h0c-.7.2-1.5.5-2.2.8-1.5.5-2.9,1.1-4.3,1.8-.5.2-.9.4-1.4.7-.5.2-.9.5-1.4.7-.5.3-1.1.6-1.6.9-.3.2-.6.3-.9.5-.9.5-1.8,1-2.7,1.6-.3.2-.6.4-.9.6-2.3,1.5-4.4,3.1-6.5,4.9-.4.4-.8.7-1.2,1.1,0,0,0,0-.1,0-.2.2-.4.4-.6.6,0,0-.2.1-.2.2-.3.3-.7.6-1,1-1.6,1.5-3,3.1-4.4,4.8-1,1.3-2.1,2.6-3,3.9L38.8,5.1C28.4-3.1,13.3-1.2,5.1,9.2-3.1,19.6-1.2,34.7,9.2,42.9l86.8,68,47.4,37.1.6.5,2,1.6v.4l349.9,274.2c0-.1,0-.2.1-.3l36.3,28.4,68.9,54c10.4,8.2,25.5,6.3,33.7-4.1,8.2-10.4,6.3-25.5-4.1-33.7ZM160,80h320c8.8,0,16,7.2,16,16v268.4l-.6-.5v-.4L145.5,89.3c2.5-5.5,8.1-9.3,14.5-9.3Z"/></svg>',
  "justify-center": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h0Z"/><rect x="318.5" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="204" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="89.5" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "justify-start": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M488.2,130.9H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h464.5c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8h0Z"/><rect y="204" width="104" height="104" rx="20.8" ry="20.8"/><rect x="114.5" y="204" width="104" height="104" rx="20.8" ry="20.8"/><rect x="229" y="204" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "justify-end": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><rect x="408" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="293.5" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="179" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "justify-stretch": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><rect x="178" y="204" width="156" height="104" rx="20.8" ry="20.8"/><rect y="204" width="156" height="104" rx="20.8" ry="20.8"/><rect x="356" y="204" width="156" height="104" rx="20.8" ry="20.8"/></svg>',
  "justify-around": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><rect x="392" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="204" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="16" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "justify-between": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h0Z"/><rect x="408" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="204" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect y="204.1" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "justify-evenly": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><rect x="358" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="204" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="50" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "justify-items-center": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect class="opacity-25" x="32.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 741) rotate(180)"/><rect  x="89" y="318.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(282 741) rotate(180)"/><rect class="opacity-25" x="262.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 741) rotate(180)"/><rect  x="319" y="318.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(742 741) rotate(180)"/><rect class="opacity-25" x="262.2" y="203.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 511) rotate(180)"/><rect  x="319" y="203.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(742 511) rotate(180)"/><rect class="opacity-25" x="32.2" y="203.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 511) rotate(180)"/><rect  x="89" y="203.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(282 511) rotate(180)"/><rect class="opacity-25" x="262.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 283) rotate(180)"/><rect  x="319" y="89.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(742 283) rotate(180)"/><rect class="opacity-25" x="32.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 283) rotate(180)"/><rect  x="89" y="89.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(282 283) rotate(180)"/></svg>',
  "justify-items-start": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect class="opacity-25" x="262.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect  x="262.2" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect  x="32.2" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32.2" y="204.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect  x="32.2" y="204.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="opacity-25" x="262.2" y="204.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect  x="262.2" y="204.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect  x="32.2" y="318.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="opacity-25" x="262.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect  x="262.2" y="318.5" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "justify-items-end": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect class="opacity-25" x="32.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 741) rotate(180)"/><rect  x="145.8" y="318.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(395.5 741) rotate(180)"/><rect class="opacity-25" x="262.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 741) rotate(180)"/><rect  x="375.8" y="318.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(855.5 741) rotate(180)"/><rect class="opacity-25" x="262.2" y="203.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 511) rotate(180)"/><rect  x="375.8" y="203.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(855.5 511) rotate(180)"/><rect class="opacity-25" x="32.2" y="203.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 511) rotate(180)"/><rect  x="145.8" y="203.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(395.5 511) rotate(180)"/><rect class="opacity-25" x="262.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 283) rotate(180)"/><rect  x="375.8" y="89.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(855.5 283) rotate(180)"/><rect class="opacity-25" x="32.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 283) rotate(180)"/><rect  x="145.8" y="89.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(395.5 283) rotate(180)"/></svg>',
  "justify-items-stretch": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect  x="32.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 741) rotate(180)"/><rect  x="262.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 741) rotate(180)"/><rect  x="262.2" y="203.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 511) rotate(180)"/><rect  x="32.2" y="203.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 511) rotate(180)"/><rect  x="262.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 283) rotate(180)"/><rect  x="32.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 283) rotate(180)"/></svg>',
  "content-start": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="262.2" y="32" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="32" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="147" width="217.5" height="104" rx="20.8" ry="20.8"/></svg>',
  "content-end": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32.2" y="376" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="261" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="262.2" y="261" width="217.5" height="104" rx="20.8" ry="20.8"/></svg>',
  "content-center": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32.2" y="261.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="146.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="262.2" y="146.5" width="217.5" height="104" rx="20.8" ry="20.8"/></svg>',
  "content-between": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="262.2" y="32" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="32" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="376" width="217.5" height="104" rx="20.8" ry="20.8"/></svg>',
  "content-around": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="262.2" y="89" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="89" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="319" width="217.5" height="104" rx="20.8" ry="20.8"/></svg>',
  "content-stretch": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32.2" y="86.1" width="217.5" height="163.9" rx="20.8" ry="20.8"/><rect x="262.2" y="86.1" width="217.5" height="163.9" rx="20.8" ry="20.8"/><rect x="32.2" y="262" width="217.5" height="164" rx="20.8" ry="20.8"/></svg>',
  "content-evenly": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g>  <rect x="262.2" y="101.6" width="217.5" height="104" rx="20.8" ry="20.8"/>  <rect x="32.2" y="101.6" width="217.5" height="104" rx="20.8" ry="20.8"/></g><rect x="32.2" y="306.4" width="217.5" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-content-start": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32.2" y="32" width="104" height="104" rx="20.8" ry="20.8"/><rect x="146.7" y="147" width="104" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="147" width="104" height="104" rx="20.8" ry="20.8"/><rect x="146.7" y="32" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-content-end": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="261.2" y="376" width="104" height="104" rx="20.8" ry="20.8"/><rect x="375.7" y="376" width="104" height="104" rx="20.8" ry="20.8"/><rect x="375.7" y="261" width="104" height="104" rx="20.8" ry="20.8"/><rect x="261.2" y="261" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-content-center": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="261.2" y="261" width="104" height="104" rx="20.8" ry="20.8"/><rect x="146.7" y="261" width="104" height="104" rx="20.8" ry="20.8"/><rect x="261.2" y="147" width="104" height="104" rx="20.8" ry="20.8"/><rect x="146.7" y="147" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-content-between": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32.2" y="376" width="104" height="104" rx="20.8" ry="20.8"/><rect x="375.7" y="376" width="104" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="32" width="104" height="104" rx="20.8" ry="20.8"/><rect x="375.7" y="32" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-content-around": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="318.5" y="318.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="cls-3" x="89.4" y="318.5" width="104" height="104" rx="20.8" ry="20.8"/><rect x="318.5" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/><rect x="89.4" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-content-stretch": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="261.2" y="261" width="219" height="219" rx="43.8" ry="43.8"/><rect x="31.7" y="261" width="219" height="219" rx="43.8" ry="43.8"/><rect x="261.2" y="32" width="219" height="219" rx="43.8" ry="43.8"/><rect x="31.7" y="32" width="219" height="219" rx="43.8" ry="43.8"/></svg>',
  "place-content-evenly": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="318.5" y="306.4" width="104" height="104" rx="20.8" ry="20.8"/><rect class="cls-3" x="89.4" y="306.4" width="104" height="104" rx="20.8" ry="20.8"/><rect x="318.5" y="101.6" width="104" height="104" rx="20.8" ry="20.8"/><rect x="89.4" y="101.6" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-items-start": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect class="opacity-25" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect x="32.2" y="32" width="104" height="104" rx="20.8" ry="20.8"/><rect x="32" y="261" width="104" height="104" rx="20.8" ry="20.8"/><rect x="261" y="261" width="104" height="104" rx="20.8" ry="20.8"/><rect x="261" y="32" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-items-end": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect class="opacity-25" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect x="146.7" y="376" width="104" height="104" rx="20.8" ry="20.8"/><rect x="375.7" y="376" width="104" height="104" rx="20.8" ry="20.8"/><rect x="146.7" y="147" width="104" height="104" rx="20.8" ry="20.8"/><rect x="375.7" y="147" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-items-center": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="318.5" y="318.5" width="104" height="104" rx="20.8" ry="20.8"/><rect x="89.5" y="318.5" width="104" height="104" rx="20.8" ry="20.8"/><rect x="318.5" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/><rect x="89.5" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="opacity-25" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/></svg>',
  "place-items-stretch": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/></svg>',
  "place-self-center": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="rgba(0,0,0,0.2)" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="black" x="318.5" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-self-start": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="rgba(0,0,0,0.2)" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="black" x="261.2" y="32" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-self-end": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="rgba(0,0,0,0.2)" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="black" x="375.7" y="147" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
  "place-self-stretch": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="black" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/></svg>',
  "reset": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M125.7 160l50.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L48 224c-17.7 0-32-14.3-32-32L16 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/></svg>',
  "minimum-height": '<svg class="h-full w-full rotate-90" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="black" d="M406.6,374.6l96-96c12.5-12.5,12.5-32.8,0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3,0s-12.5,32.8,0,45.3l41.4,41.4H109.2l41.4-41.4c12.5-12.5,12.5-32.8,0-45.3s-32.8-12.5-45.3,0L9.3,233.3c-12.5,12.5-12.5,32.8,0,45.3l96,96c12.5,12.5,32.8,12.5,45.3,0s12.5-32.8,0-45.3l-41.3-41.3h293.5l-41.4,41.4c-12.5,12.5-12.5,32.8,0,45.3s32.8,12.5,45.3,0h0Z"/><path fill="black" d="M288,96v320c0,17.7-14.3,32-32,32s-32-14.3-32-32V96c0-17.7,14.3-32,32-32s32,14.3,32,32Z"/></svg>',
  "height": '<svg class="h-full w-full rotate-90" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>',
  "maximum-height": '<svg class="h-full w-full rotate-90" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M32 64c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 96C0 78.3 14.3 64 32 64zm214.6 73.4c12.5 12.5 12.5 32.8 0 45.3L205.3 224l229.5 0-41.4-41.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3l-96 96c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 288l-229.5 0 41.4 41.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0zM640 96l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-320c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg>',
  "minimum-width": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="black" d="M406.6,374.6l96-96c12.5-12.5,12.5-32.8,0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3,0s-12.5,32.8,0,45.3l41.4,41.4H109.2l41.4-41.4c12.5-12.5,12.5-32.8,0-45.3s-32.8-12.5-45.3,0L9.3,233.3c-12.5,12.5-12.5,32.8,0,45.3l96,96c12.5,12.5,32.8,12.5,45.3,0s12.5-32.8,0-45.3l-41.3-41.3h293.5l-41.4,41.4c-12.5,12.5-12.5,32.8,0,45.3s32.8,12.5,45.3,0h0Z"/><path fill="black" d="M288,96v320c0,17.7-14.3,32-32,32s-32-14.3-32-32V96c0-17.7,14.3-32,32-32s32,14.3,32,32Z"/></svg>',
  "width": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>',
  "maximum-width": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M32 64c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 96C0 78.3 14.3 64 32 64zm214.6 73.4c12.5 12.5 12.5 32.8 0 45.3L205.3 224l229.5 0-41.4-41.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3l-96 96c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 288l-229.5 0 41.4 41.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0zM640 96l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-320c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg>',
  "gap-x": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>',
  "gap-y": '<svg class="h-full w-full rotate-90" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>',
  "gap-all": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="cls-1" d="M505,239.1l-72-72c-4.7-4.7-10.8-7-16.9-7-6.2,0-12.3,2.3-17,7s-7,10.8-7,17c0,6.2,2.3,12.3,7,17l31,31h-59.8s-90.1,0-90.1,0V81.9l31,31c4.7,4.7,10.8,7,16.9,7,6.2,0,12.3-2.3,17-7s7-10.8,7-16.9c0-6.2-2.3-12.4-7-17.1h0c0,0-72-71.9-72-71.9-9.4-9.4-24.6-9.4-34,0l-72,72c-4.7,4.7-7,10.8-7,16.9,0,6.2,2.3,12.3,7,17,4.7,4.7,10.8,7,17,7,6.2,0,12.3-2.3,17-7l31-31v150H81.9l31-31c4.7-4.7,7-10.8,7-16.9,0-6.2-2.3-12.3-7-17s-10.8-7-16.9-7c-6.2,0-12.4,2.3-17.1,7h0c0,0-72,72.1-72,72.1-9.4,9.4-9.4,24.6,0,34l72,72c4.7,4.7,10.8,7,16.9,7,6.2,0,12.3-2.3,17-7,4.7-4.7,7-10.8,7-17,0-6.2-2.3-12.3-7-17l-31-31h150.1v64h0v86.1l-31-31c-4.7-4.7-10.8-7-16.9-7-6.2,0-12.3,2.3-17,7-4.7,4.7-7,10.9-7,17,0,6.1,2.4,12.3,7,16.9l72,72c9.4,9.4,24.6,9.4,34,0l72-72c4.7-4.7,7-10.8,7-16.9,0-6.2-2.3-12.3-7-17s-10.8-7-17-7c-6.2,0-12.3,2.3-17,7l-31,31v-59.8h0v-90.1h64s86.1,0,86.1,0l-31,31c-4.7,4.7-7,10.8-7,16.9,0,6.2,2.3,12.3,7,17,4.7,4.7,10.9,7,17,7,6.1,0,12.3-2.4,16.9-7l72-72c9.4-9.4,9.4-24.6,0-34Z"/></svg>'
}

// This function is for supporting any editor capabilities that involve color.
// It gives the designer access to the color palette they labored over and
// keeps them focused on only those colors.
// DATA IN: JSON Object
function extractColorNames(colorObject) {
  let colorArray = [];
  for (const colorFamily in colorObject) {
    for (const shade in colorObject[colorFamily]) {
      colorArray.push(`${colorFamily}-${shade}`);
    }
  }
  return colorArray;
} // DATA OUT: Array

/* File: ./app/js/editor/save.js */
/*

  editor/save.js

  This file is intended to be the primary location for functions that save
  content from active/previous edits. This saving happens on the editor page.

*/

// Remove editor elements so that localStorage is not cluttered with unneeded
// elements making them production-ready for app/js/load.js
// DATA IN: HTML Element, <div>
function getCleanInnerHTML(element) {
  const clone = element.cloneNode(true);
  const discardElements = clone.querySelectorAll('.ugc-discard');
  discardElements.forEach(el => el.parentNode.removeChild(el));
  return clone.innerHTML;
} // DATA OUT: HTML Element, <div>

// This mutation observer ensures that the majority, if not all, changes
// occuring in #page will be saved to localStorage.
// DATA IN: String
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
} // DATA OUT: null

// This function saves all active element and style additions/changes/removals
// during the designer's traditional editor workflow.
// DATA IN: String
function saveChanges(page) {
  const pageContainer = document.getElementById('page');
  // Query only elements with 'ugc-keep' that are meant to be saved
  const elements = pageContainer.querySelectorAll('.ugc-keep:not([data-editor-temp])');
  const data = Array.from(elements).map(element => ({
    tagName: element.tagName,
    className: element.className,
    content: getCleanInnerHTML(element)
  }));
  const json = JSON.stringify(data);
  savePage(page, json);
  console.log('Changes saved successfully!');
} // DATA OUT: null

// This function creates or prepares the necessary localStorage object in order
// for subsequent content to be stored. If this objects already exists, it
// proceeds by properly setting existing content to these objects.
// DATA IN: ['String', 'JSON Object']
function savePage(pageId, data) {
  const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
  if (!appSageStorage.pages) {
    appSageStorage.pages = {};
  }
  if (!appSageStorage.pages[pageId]) {
    appSageStorage.pages[pageId] = { page_data: {}, settings: {}, blobs: {} };
  }
  appSageStorage.pages[pageId].page_data = data;
  localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));
} // DATA OUT: null

// This function saves all page's settings from the designer's additions,
// changes, and removals during the designer's traditional editor workflow
// from the dedicated Page Settings sidebar.
// DATA IN: ['String', 'JSON Object']
function savePageSettings(pageId, data) {
  const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
  if (!appSageStorage.pages) {
    appSageStorage.pages = {};
  }
  if (!appSageStorage.pages[pageId]) {
    appSageStorage.pages[pageId] = { page_data: {}, settings: {}, blobs: {} };
  }
  appSageStorage.pages[pageId].settings = data;
  localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));
} // DATA OUT: null

// This function creates or prepares the necessary localStorage object in order
// for subsequent settings to be stored. If this objects already exists, it
// proceeds by properly setting existing settings to these objects.
// DATA IN: String
function savePageSettingsChanges(pageId) {
  const page = document.getElementById('page');
  const settings = {
    id: page.id,
    className: page.className,
    metaTags: ''
  }
  const json = JSON.stringify(settings);
  savePageSettings(pageId, json);
} // DATA OUT: null


/* File: ./app/js/editor/load.js */
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

    if (element.classList.contains('grid')) {
      restoreGridCapabilities(element);
    }
  });

  const grid = document.querySelector('#page .grid');
  if (grid) {
    addGridOptions(grid);
  }
} // DATA OUT: null

// This function makes it so that saved elements can be edited once more.
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

/* File: ./app/js/load.js */
/*

  load.js
  
  This file is intended to be the primary location for functions that load
  saved content from previous edits. This loading is not just for the editor,
  but the preview page as well. As such, final outputs, particularly for
  preview, should present as production-ready.

*/

// Utility functions for managing localStorage with a 'appSageStorage' object
// DATA IN: String
function loadPage(pageId) {
  const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
  if (appSageStorage.pages && appSageStorage.pages[pageId] && appSageStorage.pages[pageId].page_data) {
    return appSageStorage.pages[pageId].page_data;
  } else {
    return null;
  }
} // DATA OUT: String || null

// Currently, media added through the file selector is stored as base64 plain
// text in the document (and consequently, storage). To keep things a bit
// tidier, these blobs are stored in an object separate from the HTML content.
// DATA IN: String
function loadPageBlobs(config) {
  const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
  const page = document.getElementById('page');

  if (appSageStorage.pages && appSageStorage.pages[config] && appSageStorage.pages[config].blobs) {
    const blobs = appSageStorage.pages[config].blobs;
    if (blobs) {
      Object.keys(blobs).forEach(key => {
        const element = page.querySelector(`.bg-local-${key}`);
        if (element) element.style.backgroundImage = `url(${blobs[key]})`;
      });
    }
  }
} // DATA OUT: null

// Because metadata needs to be added to the <head> tag rather than the
// expected '#page' div, metadata is stored in a separate object and,
// consequently, this separate function.
// DATA IN: ['String', 'HTML Element, <div>']
function loadPageMetadata(page_id, element) {
  const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
  const settings = storedData.pages[page_id].settings;
  if (settings) {
    const metaTags = settings.metaTags;
    if (metaTags) {
      if (element) {
        return metaTags;
      } else {
        const element = document.querySelector('head');

        metaTags.forEach(tag => {
          const metaTag = document.createElement('meta');
          metaTag.setAttribute(tag.type, tag.name);
          metaTag.setAttribute('content', tag.content);
          element.appendChild(metaTag);
        });
      }
    }
  }
} // DATA OUT: String || null

// Because page settings need to be added to various locations other than the
// expected '#page' div, page settings are stored in a separate object and,
// consequently, this separate function.
// DATA IN: ['String', 'Boolean']
function loadPageSettings(config, view = false){
  // Load the appSageStorage object from localStorage
  const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
  
  // Check if the page and settings exist
  if (appSageStorage.pages && appSageStorage.pages[config] && appSageStorage.pages[config].settings) {
    let settings;
    try {
      settings = JSON.parse(appSageStorage.pages[config].settings);
    } catch {
      settings = appSageStorage.pages[config].settings;
    }
    
    // Find the element by config and set the className if it exists
    const element = document.getElementById(settings.id);
    if (element && settings.className) {
      element.className = settings.className;
    }
    
    // Append metaTags to the head if they exist
    if (settings.metaTags) {
      const head = document.getElementsByTagName('head')[0];
      const div = document.createElement('div');
      div.innerHTML = settings.metaTags;
      
      // Append each meta tag found in the div to the head
      Array.from(div.childNodes).forEach(tag => {
        if (tag.nodeType === Node.ELEMENT_NODE) { // Ensure it is an element
          head.appendChild(tag);
        }
      });
    }
    if (element && view) {
      element.classList.remove('w-[calc(100%-18rem)]', 'ml-72', 'mb-24');
      element.classList.add ('w-full', 'min-h-screen');
    }
  } else {
    console.log('Settings for the specified page do not exist.');
  }
} // DATA OUT: null


/* File: ./app/js/editor/responsive.js */
/*

  editor/responsive.js

  This file is dedicated to spitting out all sidebar editor options to the
  sidebar for each of the supported breakpoints; xs, sm, md, lg, xl, and 2xl.

*/

// This function orchestrates which where everything goes based on the input
// type and spits it out to all the breakpoints provided in the array.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>', 'String || Array:String', 'String || Array:String', 'String || Array:String', 'String']
function addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, options, inputType = 'select') {
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  breakpoints.forEach(bp => {
    const label = createLabel(bp, labelPrefix, `${bp}-${labelPrefix.replace(' ', '-')}-${cssClassBase}`);
    let control;
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);

    switch (inputType) {
      case 'input':
        control = document.createElement('input');
        container.appendChild(label);
        container.appendChild(control);
        handleInput(bp, labelPrefix, options, cssClassBase, grid, control);
        control.classList.add('col-span-5');
        break;
      case 'textarea':
        control = document.createElement('textarea');
        container.appendChild(label);
        container.appendChild(control);
        handleTextareaType(labelPrefix, grid, control);
        control.classList.add('col-span-5');
        break;
      case 'single-icon-select':
        control = document.createElement('div');
        container.appendChild(label);
        container.appendChild(control);
        handleSingleIconSelect(bp, labelPrefix, options, cssClassBase, grid, control);
        break;
      case 'reset':
        control = document.createElement('div');
        label.className = 'hidden';
        container.appendChild(label);
        container.appendChild(control);
        handleReset(bp, grid, options, cssClassBase, control);
        control.classList.add('col-span-1');
        break;
      case 'icon-select':
        control = document.createElement('div');
        container.appendChild(label);
        container.appendChild(control);
        handleIconSelect(bp, grid, options, labelPrefix, cssClassBase, control);
        control.classList.add('col-span-5');
        break;
      case 'toggle':
        control = document.createElement('div');
        container.appendChild(label);
        container.appendChild(control);
        handleToggle(bp, options, grid, cssClassBase, control);
        control.classList.add('col-span-1');
        break;
      case 'select':
        control = document.createElement('select');
        container.appendChild(label);
        container.appendChild(control);
        handleSelect(bp, grid, control, options, cssClassBase);
        control.classList.add('col-span-5');
        break;
      default:
        console.error('Unsupported input type specified.');
        return;
    }
  });
} // DATA OUT: null

// This function messily handles all the nuance thus far encountered from
// supporting resetting styles for the sidebar editor controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleReset(bp, grid, options, cssClassBase, control) {
  const resetButton = document.createElement('button');
  resetButton.innerHTML = appSageEditorIcons['reset'];
  resetButton.className = 'iconButton h-12 w-12 p-4 bg-slate-100 hover:bg-slate-200 p-2 rounded';
  control.appendChild(resetButton);

  resetButton.onclick = () => {
    options.forEach(opt => {
      // Check if cssClassBase is an array or a string
      if (Array.isArray(cssClassBase)) {
        // If it's an array, loop through each class and remove the class from the grid
        cssClassBase.forEach(cssClass => {
          if (opt.includes('gap') || (/^p(t|r|b|l)?$/.test(opt)) || (/^m(t|r|b|l)?$/.test(opt))) {
            grid.classList.remove(`${interactivityState}${bp === 'xs' ? '' : bp + ':'}${opt}-${cssClass}`);
          } else {
            grid.classList.remove(`${interactivityState}${bp === 'xs' ? '' : bp + ':'}${cssClass}-${opt}`);
          }
        });
      } else {
        // If it's a string, directly remove the class from the grid
        if (opt.includes('gap') || (/^p(t|r|b|l)?$/.test(opt)) || (/^m(t|r|b|l)?$/.test(opt))) {
          grid.classList.remove(`${interactivityState}${bp === 'xs' ? '' : bp + ':'}${opt}-${cssClassBase}`);
        } else {
          grid.classList.remove(`${interactivityState}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`);
        }
      }
    });
  };
} // DATA OUT: null

// This function is intended to facilitate manual CSS styling for the textarea
// field dedicated for this activity.
// DATA IN: ['HTML Element, <div>', 'String']
function handleStyles(element, controlValue, mode = 'apply') {
  if (element) {
    if (mode === 'apply') {
      // Apply styles to the element
      const styles = controlValue.split(';');
      styles.forEach(style => {
        const [property, value] = style.split(':');
        if (property && value) {
          const camelCaseProperty = property.trim().replace(/-([a-z])/g, (match, p1) => p1.toUpperCase());
          element.style[camelCaseProperty] = value.trim();
        }
      });
    } else if (mode === 'retrieve') {
      // Retrieve inline styles from the element
      const computedStyles = element.style;
      const retrievedStyles = [];

      for (let i = 0; i < computedStyles.length; i++) {
        const property = computedStyles[i];
        const value = computedStyles.getPropertyValue(property);

        if (value) {
          // Convert camelCase properties back to kebab-case
          const kebabCaseProperty = property.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
          retrievedStyles.push(`${kebabCaseProperty}:${value}`);
        }
      }

      // Join styles into a semicolon-separated string
      return retrievedStyles.join(';') + ';';
    }
  }
}
 // DATA OUT: null

// This function attempts to find existing styles so that other functions know
// what/where to replace new classes, if applicable.
// DATA IN: ['String:Breakpoint class name', 'Array:String', 'String', 'HTML Element, <div>]
function getCurrentStyle(bp, options, cssClassBase, grid) {
  if (options) {
    return options.find(option => {
      const className = `${interactivityState}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`;
      return grid.classList.contains(className);
    }) || '';
  }
} // DATA OUT: String

// This function is the catch-all for handling labels of the sidebar editor
// elements. Its primary purpose is to reduce label clutter by narrowing
// certain groupings of style elements into categories where the label can
// represent all elements of that category, while the redundant ones remain
// in the document for accessibility, but invisible to the naked eye.
// DATA IN: ['String:Breakpoint class name', 'String', 'String']
function createLabel(bp, labelPrefix, forAttr) {
  const collapseLabels = (labelPrefix.includes('Margin') || labelPrefix.includes('Padding') || labelPrefix.includes('Font') || labelPrefix.includes('Border Radius') || labelPrefix.includes('Border Color') || labelPrefix.includes('Height') || labelPrefix.includes('Width') || labelPrefix.includes('Gap'));
  let keepLabel = (labelPrefix === 'Margin (t)' ? true : false || labelPrefix === 'Padding (t)' ? true : false || labelPrefix === 'Font Size' ? true : false || labelPrefix === 'Border Width' ? true : false || labelPrefix === 'Minimum Height' ? true : false || labelPrefix === 'Minimum Width' ? true : false || labelPrefix === 'Gap (x)' ? true : false);
  let advanced = false;
  if (labelPrefix === 'class' || labelPrefix === 'css') {
    advanced = true;
  }
  if (collapseLabels && keepLabel === false) {
    const label = document.createElement('label');
    label.className = 'hidden';
    return label
  } else {
    keepLabel = labelPrefix.replace(' (t)', '');
    keepLabel = labelPrefix.replace('Minimum ', '');
    keepLabel = keepLabel.includes('Font Size') ? 'Font Styles' : keepLabel;
    keepLabel = keepLabel.includes('Border Width') ? 'Border Width & Radius' : keepLabel;
    keepLabel = keepLabel.includes('Gap') ? 'Gaps Between Columns' : keepLabel;
    const label = document.createElement('label');
    const mobileIcon = document.createElement('span')
    mobileIcon.className = 'h-3 w-3 mr-2 inline-block';
    mobileIcon.innerHTML = `${appSageEditorIcons['responsive'][bp]}`;
    label.innerHTML = `<span class="inline-block">${keepLabel}${advanced === true ? ' (Advanced Option)' : ''}</span>`;
    label.className = 'block col-span-5 text-slate-700 text-xs uppercase mt-2';
    label.setAttribute('for', forAttr);
    label.prepend(mobileIcon);
    return label;
  }
} // DATA OUT: HTML Element, <label>

// This function messily handles all the nuance thus far encountered from
// supporting file-based input elements for sidebar editor controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleInput(bp, labelPrefix, options, cssClassBase, grid, control) {
  const isFile = labelPrefix.includes('File');
  control.type = isFile ? 'file' : 'text';
  if (isFile) control.setAttribute('accept', 'image/*');
  if (!isFile) control.value = getCurrentStyle(bp, options, cssClassBase, grid);
  control.className = 'shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
  let newValue;
  control.onchange = (event) => {
    if (labelPrefix === 'Background Image URL') {
      // assumes 'bg' is URL
      newValue = `${interactivityState}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${cssClassBase === 'bg' ? '[url(\'' : ''}${control.value}${cssClassBase === 'bg' ? '\')]' : ''}`;
      const classRegex = new RegExp(`\\b${bp === 'xs' ? ' ' : bp + ':'}${cssClassBase}-\\d+\\b`, 'g');
      grid.className = grid.className.replace(classRegex, '').trim() + ` ${newValue}`;
    } else if (labelPrefix === 'Background Image File') {
      grid.style.backgroundImage = '';
      generateMediaSrc(event, grid, true);
    }
  };
} // DATA OUT: null

// This function messily handles all the nuance thus far encountered from
// supporting textarea elements for sidebar editor controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleTextareaType(labelPrefix, grid, control) {
  control.type = 'text';
  if (labelPrefix == 'class') {
    control.value = (grid.classList);
  }
  if (labelPrefix == 'css') {
    control.value = handleStyles(grid, '', 'retrieve');
  }
  control.className = 'shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
  control.onchange = () => {
    if (labelPrefix == 'class') grid.className = control.value;
    if (labelPrefix == 'html'){
      const newHtmlElement = document.createElement('div');
      newHtmlElement.innerHTML = control.value;
      control.innerHTML = newHtmlElement;
    }
    if (labelPrefix == 'css') {
      handleStyles(grid, control.value, 'apply');
    }
  };
} // DATA OUT: null

// This function messily handles all the nuance thus far encountered from
// supporting select elements using icons for each option in sidebar controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleSingleIconSelect(bp, labelPrefix, options, cssClassBase, grid, control) {
  cssClassBase = cssClassBase.includes('-all') ? cssClassBase.replace('-all', '') : cssClassBase;
  const fontSize = (labelPrefix === 'Font Size' || labelPrefix === 'Font Weight');
  const borderOption = (labelPrefix === 'Border Width' || labelPrefix === 'Border Radius');
  const smallSelect = (labelPrefix.includes('Margin') || labelPrefix.includes('Padding') || labelPrefix.includes('Gap') || labelPrefix.includes('Height') || labelPrefix.includes('Width'));
  const iconTargetName = labelPrefix.toLowerCase().replace(' ', '-').replace(/[()]/g, '');
  
  control.className = `flex relative h-12 ${borderOption ? 'w-24 col-span-2 ' : ''}${fontSize ? 'w-48 col-span-4 ' : ''}${(smallSelect && !borderOption) ? (labelPrefix + ' w-20 ') : ''}`;
  
  const iconTarget = appSageEditorIcons[iconTargetName];
  const iconButton = document.createElement('span');
  iconButton.innerHTML = iconTarget;
  iconButton.className = `absolute ${(smallSelect && !borderOption) ? 'right-4 top-1 bg-none h-10 w-10' : 'right-0.5 top-0.5 bg-slate-50 h-11 w-11'} px-2 py-1 rounded-sm border-none pointer-events-none`;
  
  const selectControl = document.createElement('select');
  
  let extraInfo;
  if (labelPrefix.includes('Padding')) {
    extraInfo = tooltips['padding']
  } else if (labelPrefix.includes('Margin')) {
    extraInfo = tooltips['margin']
  } else {
    const attribute = labelPrefix.replace('Border ', '').replace('Font ', '').toLowerCase();
    extraInfo = `Change the <span class="${attribute === 'size' ? 'text-base' : ''}${attribute === 'weight' ? 'font-bold' : ''}">${attribute}</span>${borderOption ? ' of this element\'s border' : ''}${fontSize ? ' of your text' : ''}${attribute === 'weight' ? '<br>Nothing happening when making weight a selection? Not all fonts support these options' : ''}`;
  }
  
  selectControl.setAttribute('data-extra-info', extraInfo);
  selectControl.className = `appearance-none w-full bg-slate-50 p-2 border border-slate-300 ${(smallSelect && !borderOption) ? 'max-w-16 ' : ''}${fontSize ? 'pr-24 ' : ''}relative rounded`;
  
  options.forEach(option => {
    const value = `${interactivityState}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`;
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = option;
    optionElement.selected = String(grid.classList).includes(value);
    selectControl.appendChild(optionElement);
  });
  
  selectControl.onchange = () => {
    options.forEach(opt => {
      const classToRemove = `${interactivityState}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`;
      grid.classList.remove(classToRemove);
    });

    // Remove any individual side-specific classes for both margin and padding
    if (cssClassBase === 'm') {
      grid.classList.remove('mt-0', 'mb-0', 'ml-0', 'mr-0', 'mt-1', 'mb-1', 'ml-1', 'mr-1', 'mt-2', 'mb-2', 'ml-2', 'mr-2', 'mt-4', 'mb-4', 'ml-4', 'mr-4', 'mt-8', 'mb-8', 'ml-8', 'mr-8', 'mt-16', 'mb-16', 'ml-16', 'mr-16');
    }
    
    if (cssClassBase === 'p') {
      grid.classList.remove('pt-0', 'pb-0', 'pl-0', 'pr-0', 'pt-1', 'pb-1', 'pl-1', 'pr-1', 'pt-2', 'pb-2', 'pl-2', 'pr-2', 'pt-4', 'pb-4', 'pl-4', 'pr-4', 'pt-8', 'pb-8', 'pl-8', 'pr-8', 'pt-16', 'pb-16', 'pl-16', 'pr-16');
    }

    grid.classList.add(selectControl.value);
  };
  
  control.appendChild(selectControl);
  control.appendChild(iconButton);
}// DATA OUT: null

// This function messily handles all the nuance thus far encountered from 
// supporting icon styled select dropdowns for sidebar editor controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleIconSelect(bp, grid, options, labelPrefix, cssClassBase, control) {
  if (!options) {
    console.error('No options provided for icons input type.');
    return;
  }
  const swatchboard = (labelPrefix === 'Text Color' || labelPrefix === 'Background Color' || labelPrefix === 'Border Color');
  const bgIcon = (labelPrefix === 'Background Position');
  control.className = `grid grid-cols-5 col-span-5 gap-x-1 gap-y-2 overflow-y-scroll ${swatchboard ? 'hidden h-40 p-2 border bg-[#000000] dark:bg-[#ffffff] border-slate-400' : ''}`;
  if (swatchboard) {
    const toggleButton = document.createElement('button')
    toggleButton.className = `${labelPrefix === 'Border Color' ? 'col-span-1' : 'col-span-5'} w-full bg-[#ffffff] text-left shadow border rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline`;
    toggleButton.innerHTML = `<svg class="h-5 w-5 inline mr-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6l319.2 0 42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z"/></svg>${labelPrefix === 'Border Color' ? '' : ' ' + labelPrefix}`;
    toggleButton.setAttribute('data-extra-info', tooltips['color-vision-impairement']);
    toggleButton.addEventListener('click', function () {
      if (control.classList.contains('hidden')) {
        control.classList.remove('hidden');
      } else {
        control.classList.add('hidden');
      }
    });
    control.parentElement.insertBefore(toggleButton, control);
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.className = 'col-span-5 mb-2 w-full h-10 p-1 rounded';

    colorPicker.addEventListener('input', () => {
      const selectedColor = colorPicker.value;
      const tailwindColorClass = `${labelPrefix === 'Text Color' ? 'text' : labelPrefix === 'Background Color' ? 'bg' : 'border'}-[${selectedColor}]`;

      // Remove any existing Tailwind color classes
      grid.classList.forEach(cls => {
        if (/^text-\[.*\]$|^bg-\[.*\]$|^border-\[.*\]$/.test(cls)) {
          grid.classList.remove(cls);
        }
      });

      // Add the new Tailwind color class
      grid.classList.add(tailwindColorClass);
    });

    control.appendChild(colorPicker);
  }
  options.forEach(option => {
    const iconButton = document.createElement('button');
    iconButton.className = `iconButton ${option === 'reset' ? 'p-4 bg-slate-100 hover:bg-slate-200 ' : (swatchboard ? 'border-2 hover:border-sky-200 ' : 'bg-slate-200 hover:bg-slate-300 ')}${labelPrefix === 'Background Repeat' ? 'p-1' : (bgIcon ? 'p-0' : 'p-2')} rounded ${labelPrefix === 'Text Color' ? 'backdrop-invert' : ''}`;
    let iconTextCandidate1 = `${cssClassBase}-${option}`;
    let iconTextCandidate2 = labelPrefix.toLowerCase().replace(' ', '-');
    const iconTarget = appSageEditorIcons[iconTextCandidate1] || appSageEditorIcons[iconTextCandidate2] || appSageEditorIcons[option];
    iconButton.innerHTML = iconTarget;
    if (labelPrefix === 'Text Alignment') {
      iconButton.setAttribute('data-extra-info', `${option === 'justify' ? tooltips['text-alignment-justify'] : tooltips['text-alignment-other'] + option}`);
    } else if (labelPrefix === 'Border Style') {
      iconButton.setAttribute('data-extra-info', option === 'none' ? tooltips['border-style-none'] : tooltips['border-style-other'] + option + ' line');
    } else if (labelPrefix === 'Background Size') {
      iconButton.setAttribute('data-extra-info', option === 'cover' ? tooltips['background-size-cover'] : tooltips['background-size-contain']);
    } else if (swatchboard) {
      iconButton.setAttribute('data-extra-info', tooltips['swatchboard'] + `${cssClassBase}-${option}`);
    } else if (bgIcon) {
      iconButton.setAttribute('data-extra-info', tooltips['bg-icon'] + option + " of the box it's inside");
    } else {
      handleTooltips(`${cssClassBase}-${option}`, iconButton);
    }  
    if ((grid.classList).contains(iconTextCandidate1) && !swatchboard) {
      // Candidate1 means it is not a color icon, so we add a highlight to it.
      iconButton.classList.add('bg-sky-200');
    }
    if ((grid.classList).contains(iconTextCandidate1) && swatchboard) {
      iconButton.classList.add('border-sky-300');
    }
    iconButton.onclick = () => {
      options.forEach(opt => {
        grid.classList.remove(`${interactivityState}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`);
        control.querySelectorAll('.iconButton').forEach(b => {
          if (!swatchboard) b.classList.remove('bg-sky-200')
          if (swatchboard) b.classList.remove('border-sky-300');
        });
        if (cssClassBase === 'justify') grid.classList.remove(`${interactivityState}${bp === 'xs' ? '' : bp + ':'}flex`);
      });
      if (option !== 'reset') {
        grid.classList.add(`${interactivityState}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`);
        if (swatchboard) iconButton.classList.add('border-sky-300');
        if (!swatchboard) iconButton.classList.add('bg-sky-200');
        // column justification requires flex to work as expected
        if (cssClassBase === 'justify') grid.classList.add(`${interactivityState}${bp === 'xs' ? '' : bp + ':'}flex`);
      }
    };
    if (/^(text|bg|border)-(black|white|.*-(50|[1-9]00))$/.test(iconTextCandidate1)) {
      if (iconTextCandidate1.includes('text')) {
        iconButton.querySelector('svg').classList.add(iconTextCandidate1);
        iconTextCandidate1 = iconTextCandidate1.replace('text', 'border');
        iconButton.classList.add('border-[0.175rem]', iconTextCandidate1);
      } else if (iconTextCandidate1.includes('bg')) {
        iconButton.classList.add(iconTextCandidate1);
        iconButton.querySelector('svg').classList.add('opacity-0');
      } else if (iconTextCandidate1.includes('border')) {
        iconTextCandidate1 = iconTextCandidate1.replace('border', 'bg');
        iconButton.classList.add(iconTextCandidate1);
        iconButton.querySelector('svg').classList.add('opacity-0');
      }
    }
    control.appendChild(iconButton);
  });
} // DATA OUT: null

// This function messily handles all the nuance thus far encountered from
// supporting toggle elements for sidebar editor controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleToggle(bp, options, grid, cssClassBase, control) {
  control.className = 'relative bg-slate-50 h-12 w-12 border-2 border-slate-30 rounded'
  if (cssClassBase === 'italic') {
    control.setAttribute('data-extra-info', tooltips['italicize']);
    control.setAttribute('data-extra-info-class', 'italic');
  } else if (cssClassBase === 'underline') {
    control.setAttribute('data-extra-info', tooltips['underline']);
    control.setAttribute('data-extra-info-class', 'underline');
  }
  const iconButton = document.createElement('span');
  iconButton.innerHTML = appSageEditorIcons[cssClassBase];
  iconButton.className = `absolute top-0.5 right-0 h-11 w-11 px-2 py-1 rounded-sm border-none pointer-events-none`;

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox';
  checkbox.className = 'rounded py-2 px-3 h-full w-full appearance-none checked:bg-sky-200';
  checkbox.checked = getCurrentStyle(bp, options, cssClassBase, grid) === cssClassBase;
  checkbox.onchange = () => {
    const className = `${interactivityState}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}`;
    grid.classList.toggle(className);
  };
  control.appendChild(checkbox);
  control.appendChild(iconButton);
} // DATA OUT: null

// This function messily handles all the nuance thus far encountered from
// supporting select elements for sidebar editor controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleSelect(bp, grid, control, options, cssClassBase) {
  if (!options) {
    console.error('No options provided for select input type.');
    return;
  }
  control.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
  options.forEach(option => {
    const value = `${interactivityState}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`;
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = option;
    optionElement.selected = getCurrentStyle(bp, options, cssClassBase, grid) === option;
    control.appendChild(optionElement);
  });
  control.onchange = () => {
    options.forEach(opt => {
      grid.classList.remove(`${interactivityState}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`);
    });
    grid.classList.add(control.value);
  };

} // DATA OUT: null

// This function is an all-in-one place for any and all tooltips necessary for
// the functions in this file.
// DATA IN: ['String', 'HTML Element']
function handleTooltips(cssClassToEvaluate, control) {
  const tooltipText = tooltips[cssClassToEvaluate] || "This tooltip is missing, tell the dev to fix it!";
  control.setAttribute('data-extra-info', tooltipText);
} // DATA OUT: null

function handlePlaceholderMedia(bp, grid, control, options, cssClassBase, isBackgroundImage = false) {
  // Populate the dropdown with placeholder media options
  for (const key in appSagePlaceholderMedia) {
    const selectedMedia = appSagePlaceholderMedia[key];
    if (isBackgroundImage && selectedMedia.endsWith('.mp3')) {
      continue; // Skip audio files
    }
    const option = document.createElement('option');
    option.value = selectedMedia;
    option.textContent = key;
    control.appendChild(option);
  }

  control.addEventListener('change', function (event) {
    const selectedMedia = event.target.value;
    let mediaElement = grid.querySelector(`.${bp}-media`);
    // Clear existing background styles if background image is being updated
    if (isBackgroundImage) {
      grid.style.backgroundImage = ''; // Clear existing background
      grid.classList.remove(...Array.from(grid.classList).filter(c => c.startsWith('bg-'))); // Remove existing bg- classes
    }
    // Apply media or background
    if (isBackgroundImage && (selectedMedia.endsWith('.jpg') || selectedMedia.endsWith('.png') || selectedMedia.endsWith('.svg'))) {
      grid.classList.add(`bg-[url('${selectedMedia}')]`);
      grid.style.backgroundSize = 'cover';
      grid.style.backgroundPosition = 'center'; // Center the background
    } else {
      if (mediaElement) {
        mediaElement.remove();
      }
      if (selectedMedia.endsWith('.mp4')) {
        mediaElement = document.createElement('video');
        mediaElement.controls = true;
      } else if (selectedMedia.endsWith('.mp3')) {
        mediaElement = document.createElement('audio');
        mediaElement.controls = true;
      }
      if (mediaElement) {
        mediaElement.classList.add(`${bp}-media`);
        mediaElement.src = selectedMedia;
        grid.appendChild(mediaElement);
      }
    }
  });
}

/* File: ./app/js/remote_save.js */
/*

  remote_save.js

  This file is not currently being used. It is an aspirational boilerplate for
  sending payloads to remote servers that will receive them and decide how they
  want to process the JSON object they receive.

  TODO: Add field on settings page for remote storage URL
  TODO: Add a button somewhere for these functions to actually be accessible

*/

// This function is the meat and bones of the fetch request to POST the data
// to the user's selected remote server. It may or may not be operational.
// DATA IN: ['String', 'String', 'String:Optional']
function saveDataToServer(url, page_id, css_content = null) {
  const html_content = JSON.parse(localStorage.getItem(appSageStorageString)).pages[page_id];
  const fullPath = url + (page_id ? ('/' + page_id) : '');
  fetch(fullPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ page_id: page_id, css: css_content, html_content: html_content })
  })
    .then(response => response.json())
    // TODO: Have these messages show up in a modal or something
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
} // DATA OUT: null

// This function is to support the copyPageHTML function.
// DATA IN: ['String', 'HTML Element, <div>']
function flattenJSONToHTML(jsonString, parentInfo) {
  try {
    const jsonArray = JSON.parse(jsonString);
    let parentClassName = JSON.parse(parentInfo).className || '';
    parentClassName = parentClassName.replace('w-[calc(100%-18rem)]', 'w-full');
    parentClassName = parentClassName.replace('ml-72', 'min-h-screen');
    parentClassName = parentClassName.replace('mb-24', '');

    const content = jsonArray.map(obj => {
      if (obj.tagName === "DIV" && obj.className && obj.content) {
        return `<div class="${obj.className}">${obj.content}</div>`;
      }
      return '';
    }).join('');

    return `<div class="${parentClassName}">${content}</div>`;
  } catch (error) {
    console.error("Invalid JSON string provided:", error);
    return '';
  }
} // DATA OUT: String (of an HTML element)

// Since the original developer doesn't yet want to load this repo up with NPM
// packages, we forgo something like PostCSS and just grab the compiled CSS
// generated by the Tailwind Play CDN (or its local cached equivalent). This
// may need to be fixed later. Dunno!
// DATA IN: null
function getCompiledCSS() {
  const styles = document.querySelectorAll('style');
    let tailwindStyles = '';

    for (let style of styles) {
      if (style.innerHTML.includes("/* ! tailwindcss v")) {
        tailwindStyles = style.innerHTML;
        break;
      }
    }

    if (tailwindStyles) {
      return tailwindStyles;
    } else {
      console.log('No TailwindCSS styles found.');
    }
} // DATA IN: String


/* File: ./app/js/editor/media.js */
/*

  editor/media.js

  This file is some syntax sugar for adding placeholder media.
  See `app/placeholder_media/README.md` for more info.

*/

/*

Examples:

   appSagePlaceholderMedia['photo_square']
=> './placeholder_media/square.jpg'

   appSagePlaceholderMedia['video']
=> './placeholder_media/video.mp4'

   randomImage()
=> './placeholder_media/square.jpg'

   randomMedia()
=> './placeholder_media/audio.mp3'

*/

// Global variable — These paths are relative to the HTML page loading them, not this file.
var appSagePlaceholderMedia = {
  "audio": './placeholder_media/audio.mp3',
  "video": './placeholder_media/video.mp4',
  "photo_avatar_darkmode_jpg": './placeholder_media/darkmode_jpg/avatar_placeholder.jpg',
  "photo_iframe_darkmode_jpg": './placeholder_media/darkmode_jpg/iframe_placeholder.jpg',
  "photo_landscape_darkmode_jpg": './placeholder_media/darkmode_jpg/landscape_placeholder.jpg',
  "photo_logo_darkmode_jpg": './placeholder_media/darkmode_jpg/logo_placeholder.jpg',
  "photo_portrait_darkmode_jpg": './placeholder_media/darkmode_jpg/portrait_placeholder.jpg',
  "photo_square_darkmode_jpg": './placeholder_media/darkmode_jpg/square_placeholder.jpg',
  "photo_avatar_darkmode_png": './placeholder_media/darkmode_png/avatar-dark.png',
  "photo_iframe_darkmode_png": './placeholder_media/darkmode_png/iframe-dark.png',
  "photo_landscape_darkmode_png": './placeholder_media/darkmode_png/landscape-dark.png',
  "photo_logo_darkmode_png": './placeholder_media/darkmode_png/logo-dark.png',
  "photo_portrait_darkmode_png": './placeholder_media/darkmode_png/portrait-dark.png',
  "photo_square_darkmode_png": './placeholder_media/darkmode_png/square-dark.png',
  "photo_avatar_darkmode_svg": './placeholder_media/darkmode_svg/avatar_placeholder.svg',
  "photo_iframe_darkmode_svg": './placeholder_media/darkmode_svg/iframe_placeholder.svg',
  "photo_landscape_darkmode_svg": './placeholder_media/darkmode_svg/landscape_placeholder.svg',
  "photo_logo_darkmode_svg": './placeholder_media/darkmode_svg/logo_placeholder.svg',
  "photo_portrait_darkmode_svg": './placeholder_media/darkmode_svg/portrait_placeholder.svg',
  "photo_square_darkmode_svg": './placeholder_media/darkmode_svg/square_placeholder.svg',
  "photo_avatar_lightmode_jpg": './placeholder_media/lightmode_jpg/avatar_placeholder.jpg',
  "photo_iframe_lightmode_jpg": './placeholder_media/lightmode_jpg/iframe_placeholder.jpg',
  "photo_landscape_lightmode_jpg": './placeholder_media/lightmode_jpg/landscape_placeholder.jpg',
  "photo_logo_lightmode_jpg": './placeholder_media/lightmode_jpg/logo_placeholder.jpg',
  "photo_portrait_lightmode_jpg": './placeholder_media/lightmode_jpg/portrait_placeholder.jpg',
  "photo_square_lightmode_jpg": './placeholder_media/lightmode_jpg/square_placeholder.jpg',
  "photo_avatar_lightmode_png": './placeholder_media/lightmode_png/avatar.png',
  "photo_iframe_lightmode_png": './placeholder_media/lightmode_png/iframe.png',
  "photo_landscape_lightmode_png": './placeholder_media/lightmode_png/landscape.png',
  "photo_logo_lightmode_png": './placeholder_media/lightmode_png/logo.png',
  "photo_portrait_lightmode_png": './placeholder_media/lightmode_png/portrait.png',
  "photo_square_lightmode_png": './placeholder_media/lightmode_png/square_placeholder.png',
  "photo_avatar_lightmode_svg": './placeholder_media/lightmode_svg/avatar_placeholder.svg',
  "photo_iframe_lightmode_svg": './placeholder_media/lightmode_svg/iframe_placeholder.svg',
  "photo_landscape_lightmode_svg": './placeholder_media/lightmode_svg/landscape_placeholder.svg',
  "photo_logo_lightmode_svg": './placeholder_media/lightmode_svg/logo_placeholder.svg',
  "photo_portrait_lightmode_svg": './placeholder_media/lightmode_svg/portrait_placeholder.svg',
  "photo_square_lightmode_svg": './placeholder_media/lightmode_svg/square_placeholder.svg'
}

// Keep in mind this does not output video or audio. If you want that, see
// the randomMedia() function.
// DATA IN: null
function randomImage() {
  const darkmodeOptions = placeholderDarkmodeOptions();
  const lightmodeOptions = placeholderLightmodeOptions();

  const options = darkmodeOptions.concat(lightmodeOptions);
  const result = options[Math.floor(Math.random() * options.length)];
  return appSagePlaceholderMedia[result];
} // DATA OUT: String

// For some apps like with user-generated content, they could be posting not
// just images, but other media. This is a good way for the designer to battle
// test their layout under these conditions.
// DATA IN: null
function randomMedia() {
  const darkmodeOptions = placeholderDarkmodeOptions();
  const lightmodeOptions = placeholderLightmodeOptions();

  const options = [
    'audio',
    'video',
    ...darkmodeOptions,
    ...lightmodeOptions
  ];

  const result = options[Math.floor(Math.random() * options.length)];
  return appSagePlaceholderMedia[result];
} // DATA OUT: String

// This is to bring brevity to multiple functions needing the same array.
// DATA IN: null
function placeholderDarkmodeOptions() {
  return [
    'photo_landscape_darkmode_jpg',
    'photo_square_darkmode_jpg',
    'photo_portrait_darkmode_jpg',
    'photo_landscape_darkmode_png',
    'photo_square_darkmode_png',
    'photo_portrait_darkmode_png',
    'photo_landscape_darkmode_svg',
    'photo_square_darkmode_svg',
    'photo_portrait_darkmode_svg'
  ];
} // DATA OUT: Array

// This is to bring brevity to multiple functions needing the same array.
// DATA IN: null
function placeholderLightmodeOptions() {
  return [
    'photo_landscape_lightmode_jpg',
    'photo_square_lightmode_jpg',
    'photo_portrait_lightmode_jpg',
    'photo_landscape_lightmode_png',
    'photo_square_lightmode_png',
    'photo_portrait_lightmode_png',
    'photo_landscape_lightmode_svg',
    'photo_square_lightmode_svg',
    'photo_portrait_lightmode_svg'
  ];
} // DATA OUT: Array


/* File: ./app/js/preview/main.js */
/*

  preview/main.js

  This file is intended to clean up any residual content that could pop up from
  the designer editing the page. And, of course, load the necessary data from
  localStorage to show the final page design without the sidebar cluttering up
  their eyes, giving an unadultered view of the page.

*/

// This function does everything described above, though this comment should
// probably be reviewed and updated if anything is ever added to this file.
// DATA IN: String
function loadPreview(pageId) {
  const json = loadPage(pageId);
  if (json) {
      const pageContainer = document.getElementById('page');
      pageContainer.innerHTML = ''; // Clear existing content

      document.querySelector('title').textContent = pageId;

      const data = JSON.parse(json);
      data.forEach(item => {
          const element = document.createElement(item.tagName);
          element.className = item.className;
          element.innerHTML = item.content;
          pageContainer.appendChild(element);
      });

      loadPageSettings(pageId, true);
      loadPageBlobs(pageId);
      loadPageMetadata(pageId);
  } else {
      console.error('No saved data found for pageId:', pageId);
  }
} // DATA OUT: null

// This used to be in an inline script on the page:
document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const previewPageId = urlParams.get('page');

  if (previewPageId) {
    loadPreview(previewPageId);
  }
});

