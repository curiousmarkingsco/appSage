/* column.js */

function createColumn(gridContainer) {
  const column = document.createElement('div');
  column.className = 'col-span-1 p-4 m-4 pagecolumn group';

  // Adding only the relevant buttons for column manipulation
  const removeButton = createRemoveColumnButton(column, gridContainer);
  const editButton = createEditColumnButton(column);
  const gridButton = createEditGridButton(gridContainer);
  column.appendChild(gridButton);
  column.appendChild(editButton);
  column.appendChild(removeButton);
  return column;
}

function highlightEditingElement(element) {
  removeEditingHighlights(); // Clear existing highlights
  if (element) {
    element.id = 'editing-highlight'; // Highlight the current element
  }
}

function createHorizontalMoveColumnButton(column, direction) {
  const button = document.createElement('button');
  button.className = 'moveColumn ugc-discard bg-yellow-500 hover:bg-yellow-700 text-white font-bold p-2 rounded h-12 w-16';
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
}

function createRemoveColumnButton(column, gridContainer) {
  const button = document.createElement('button');
  button.className = 'removeColumn ugc-discard hidden z-50 absolute right-0 bg-red-500 top-2 group-hover:block hover:bg-red-700 text-white font-bold p-2 rounded h-12 w-12';
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
}

function createEditColumnButton(column) {
  const oldButtons = document.getElementById('moveColumnButtons');
  if (oldButtons) { oldButtons.remove }
  const sidebar = document.getElementById('sidebar-dynamic');
  const button = document.createElement('button');
  button.className = 'editColumn ugc-discard hidden z-50 absolute left-14 group-hover:block bg-green-500 hover:bg-green-700 top-2 text-white font-bold p-2 rounded h-12 w-12';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l512 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM192 96l0 320L64 416 64 96l128 0zm64 0l128 0 0 320-128 0 0-320zm320 0l0 320-128 0 0-320 128 0z"/></svg>';
  button.addEventListener('click', function () {
    sidebar.innerHTML = `<div><strong>Edit Column</strong></div>${generateMobileTabs()}`;
    activateTabs();
    highlightEditingElement(column);

    const moveButtons = document.createElement('div');
    moveButtons.className = 'flex justify-between my-2'
    moveButtons.id = 'moveColumnButtons'
    sidebar.prepend(moveButtons);
    moveButtons.appendChild(createHorizontalMoveColumnButton(column, 'left'));
    moveButtons.appendChild(createHorizontalMoveColumnButton(column, 'right'));

    addEditableBackgroundColor(sidebar, column);
    addEditableBorders(sidebar, column);
    addEditableBackgroundImage(sidebar, column);
    addEditableMarginAndPadding(sidebar, column);
  });
  return button;
}

function createEditGridButton(grid) {
  const button = document.createElement('button');
  button.className = 'editGrid ugc-discard hidden z-50 absolute left-0 group-hover:block bg-green-500 hover:bg-green-700 top-2 text-white font-bold p-2 rounded h-12 w-12';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class=" h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40L0 72zM0 232c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48zM128 392l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40zM160 72c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48zM288 232l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40zM160 392c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48zM448 72l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40zM320 232c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48zM448 392l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40z"/></svg>';
  button.addEventListener('click', function () {
    addGridOptions(grid);
    highlightEditingElement(grid);
  });
  return button;
}

function createAddColumnButton(gridContainer) {
  const sidebar = document.getElementById('sidebar-dynamic');
  const button = document.createElement('button');
  button.className = 'addColumn ugc-discard bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded';
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l512 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zM192 96l0 320L64 416 64 96l128 0zm64 0l128 0 0 320-128 0 0-320zm320 0l0 320-128 0 0-320 128 0z"/></svg>`;
  button.onclick = function () {
    const newColumn = createColumn(gridContainer);
    gridContainer.insertBefore(newColumn, this);
    newColumn.appendChild(createAddContentButton(newColumn));

    addEditableBackgroundColor(sidebar, newColumn);
    addEditableBorders(sidebar, newColumn);
    addEditableBackgroundImage(sidebar, newColumn);
    addEditableMarginAndPadding(sidebar, newColumn);

    highlightEditingElement(newColumn);
  };
  return button;
}

function updateColumnClass(element, value, prefix) {
  const currentClasses = element.className.split(' ').filter(cls => !cls.startsWith(prefix));
  currentClasses.push(value); // Add the new class
  element.className = currentClasses.join(' ');
}

function columnHasContent(column) {
  if (column) {
    // Check if column contains any significant elements
    // We assume here that only certain tags are considered "content"
    const contentTags = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'img', 'video', 'audio', 'a']; // Add other tags as needed
    return Array.from(column.querySelectorAll('*')).some(child => {
      // Check if the element is one of the content types and not empty
      return contentTags.includes(child.tagName.toLowerCase()) && (
        child.textContent.trim() !== '' || // Text content is not empty
        (child.src && child.src.trim() !== '') || // For media elements with src
        (child.href && child.href.trim() !== '') // For links
      );
    });
  }
}

function removeEditingHighlights() {
  const highlight = document.getElementById('editing-highlight');
  if (highlight) {
    highlight.id = '';
  }
}

function moveColumnHorizontal(column, direction) {
  const parent = column.parentNode;
  let targetSibling = getNextValidSibling(column, direction);

  if (direction === 'left' && targetSibling) {
      parent.insertBefore(column, targetSibling);
  } else if (direction === 'right' && targetSibling) {
      parent.insertBefore(targetSibling, column);
  }
}

function moveColumnVertical(grid, column, direction) {
  // Assume a 12-column grid system and media queries that adapt at specific breakpoints
  const columnsPerRow = window.innerWidth > 768 ? 4 : 2; // Example: 4 columns per row on desktop, 2 on mobile
  const children = Array.from(grid.children);
  const currentIndex = children.indexOf(column);
  const targetIndex = direction === 'up'
    ? Math.max(currentIndex - columnsPerRow, 0)
    : Math.min(currentIndex + columnsPerRow, children.length - 1);

  if (currentIndex !== targetIndex) {
    if (direction === 'up') {
      grid.insertBefore(column, children[targetIndex]);
    } else {
      if (targetIndex === children.length - 1) {
        grid.appendChild(column); // Move to the end if going down from the last position
      } else {
        grid.insertBefore(column, children[targetIndex + 1]); // Insert before the element after the target
      }
    }
  }
}

function getNextValidSibling(element, direction) {
  let sibling = (direction === 'left' || direction === 'up') ? element.previousElementSibling : element.nextElementSibling;
  while (sibling && sibling.classList.contains('ugc-discard')) {
      sibling = (direction === 'left' || direction === 'up') ? sibling.previousElementSibling : sibling.nextElementSibling;
  }
  return sibling;
}
