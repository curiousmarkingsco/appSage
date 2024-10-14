/*

  editor/column.js

  This file is intended to be the primary location for anything related to
  adding, editing, and removing columns.

*/

// This function used to be more complex, but has been simplified over time.
// It is still here under a "don't fix it if it ain't broke" line of thinking.
// DATA IN: null
function createColumn() {
  const column = document.createElement('div');
  column.className = 'col-span-1 pagecolumn group p-4';
  enableEditColumnOnClick(column);
  return column;
} // DATA OUT: HTML Element, <div>

// This function makes it so that when you click on a column, the editing options
// will be revealed in the sidebar to the left of the screen. It does this by
// first making the label and supporting elements for moving and removing the
// column, and then adding the editor buttons, dropdowns, etc.
// DATA IN: HTML Element, <div>
function enableEditColumnOnClick(column) {
  column.addEventListener('click', function (event) {
    event.stopPropagation();
    addColumnOptions(column);
  });
} // DATA OUT: null

function addColumnOptions(column) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Edit Column</strong></div>${generateSidebarTabs()}`;
  activateTabs();
  highlightEditingElement(column);
  addIdAndClassToElements();

  const moveButtons = document.createElement('div');
  moveButtons.className = 'flex justify-between my-2'
  moveButtons.id = 'moveColumnButtons'
  sidebar.prepend(moveButtons);
  moveButtons.appendChild(createHorizontalMoveColumnButton(column, 'left'));
  moveButtons.appendChild(createRemoveColumnButton(column, column.parentElement));
  moveButtons.appendChild(createHorizontalMoveColumnButton(column, 'right'));

  // Column-specific editing options
  addColumnAlignmentOptions(sidebar, column);

  // Standard editing options
  addEditableBorders(sidebar, column);
  addEditableOpacity(sidebar, column);
  addEditableBackgroundColor(sidebar, column);
  addEditableBackgroundImage(sidebar, column);
  addEditableBackgroundImageURL(sidebar, column);
  addEditableBackgroundFeatures(sidebar, column);
  addEditableMarginAndPadding(sidebar, column);
  addEditableDimensions(sidebar, column);
  addManualClassEditor(sidebar, column);
  addManualCssEditor(sidebar, column);
}

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
  menuItem.className = 'addColumn highlightButton hidden w-16 h-12 absolute -bottom-12 left-4 ugc-discard bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded-b z-50';
  menuItem.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l512 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM192 96l0 320L64 416 64 96l128 0zm64 0l128 0 0 320-128 0 0-320zm320 0l0 320-128 0 0-320 128 0z"/></svg>`;
  menuItem.onclick = function () {
    const newColumn = createColumn();
    gridContainer.insertBefore(newColumn, this);
    newColumn.appendChild(createAddContentButton(newColumn));
    newColumn.appendChild(createAddComponentButton(newColumn));

    addColumnAlignmentOptions(sidebar, newColumn);
    addEditableBorders(sidebar, newColumn);
    addEditableBackgroundColor(sidebar, newColumn);
    addEditableBackgroundImage(sidebar, newColumn);
    addEditableBackgroundImageURL(sidebar, newColumn);
    addEditableBackgroundFeatures(sidebar, newColumn);
    addEditableMarginAndPadding(sidebar, newColumn);

    highlightEditingElement(newColumn);
    addIdAndClassToElements();
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
