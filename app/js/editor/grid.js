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
  button.setAttribute('data-extra-info', 'Remove this grid forever (that\'s a long time!)')
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
// DATA IN: ['HTML Element, <div>', 'string:up/down']
function createVerticalMoveGridButton(grid, direction) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', `Move this grid ${direction}ward in the document`)
  button.className = 'moveGrid inline ugc-discard bg-amber-500 hover:bg-amber-700 text-slate-50 font-bold pt-1 pb-1.5 rounded w-12';
  if (direction == 'up') {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z"/></svg>';
  } else {
    button.innerHTML = ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M246.6 502.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 402.7 192 192c0-17.7 14.3-32 32-32s32 14.3 32 32l0 210.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128zM64 160c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 96C0 43 43 0 96 0L352 0c53 0 96 43 96 96l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7-14.3-32-32-32L96 64C78.3 64 64 78.3 64 96l0 64z"/></svg>';
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
