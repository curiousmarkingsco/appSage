/* grid.js */

function addGridOptions(grid) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Edit Grid: ${grid.querySelectorAll('.col-span-1').length}</strong></div>`;

  const widthOptionsContainer = document.createElement('div');
  widthOptionsContainer.className = 'grid-width-options';

  const fullWidthOption = document.createElement('button');
  fullWidthOption.textContent = 'Full Screen';
  fullWidthOption.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded mr-2';
  fullWidthOption.onclick = () => setGridWidth(grid, 'w-full', 'Full');

  const fixedWidthOption = document.createElement('button');
  fixedWidthOption.textContent = 'Fixed Width';
  fixedWidthOption.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded';
  fixedWidthOption.onclick = () => setGridWidth(grid, 'max-w-7xl mx-auto w-full', 'Fixed');

  widthOptionsContainer.appendChild(fullWidthOption);
  widthOptionsContainer.appendChild(fixedWidthOption);

  if (grid) {
    sidebar.appendChild(widthOptionsContainer);
    addRemoveGridButton(grid, sidebar);
    addEditableRowsAndColumns(sidebar, grid);
    highlightEditingElement(grid);

    addEditableBackgroundColor(sidebar, grid);
    addEditableBorders(sidebar, grid);
    addEditableBackgroundImage(sidebar, grid);
    addEditableMarginAndPadding(sidebar, grid);
  }
}

function addRemoveGridButton(grid, sidebar) {
  const removeGridButton = document.createElement('button');
  removeGridButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded mt-4';
  removeGridButton.textContent = 'Remove';
  removeGridButton.onclick = function () {
    showConfirmationModal('Are you sure you want to delete this entire grid?', () => {
      grid.parentNode.removeChild(grid);
      sidebar.innerHTML = '<p>Nothing to edit. Add a grid by clicking the Plus (+) button.</p>';
    });
  };
  sidebar.appendChild(removeGridButton);
}

function setGridWidth(grid, widthClasses, plainEnglish) {
  document.getElementById('sidebar-dynamic').querySelectorAll('.notice').forEach(notice => { notice.remove() });
  const notice = document.createElement('p');
  notice.className = 'my-2 notice';
  notice.textContent = plainEnglish + ' width set! Depending on device width you are currently using, you may not see any changes.';
  document.getElementById('sidebar-dynamic').appendChild(notice);
  // Remove current width classes first
  grid.classList.remove('w-full', 'max-w-7xl', 'mx-auto');
  // Add the new width class based on the selection
  widthClasses.split(' ').forEach(cls => grid.classList.add(cls));
}

function createVerticalMoveGridButton(grid, direction) {
  const button = document.createElement('button');
  button.className = 'moveGrid inline ugc-discard bg-yellow-500 hover:bg-yellow-700 text-white font-bold pt-1 pb-1.5 rounded w-12';
  if (direction == 'up') {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z"/></svg>';
  } else {
    button.innerHTML = ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M246.6 502.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 402.7 192 192c0-17.7 14.3-32 32-32s32 14.3 32 32l0 210.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128zM64 160c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 96C0 43 43 0 96 0L352 0c53 0 96 43 96 96l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7-14.3-32-32-32L96 64C78.3 64 64 78.3 64 96l0 64z"/></svg>';
  }
  button.addEventListener('click', function () {
    moveVertical(grid, direction);
  });
  return button;
}

function addEditableRowsAndColumns(sidebar, grid) {
  const breakpoints = ['', 'sm', 'md', 'lg', 'xl', '2xl'];
  const maxGridLines = 12; // Assuming the grid can have up to 12 columns/rows

  breakpoints.forEach(bp => {
    // Create dropdowns for columns
    const columnLabel = document.createElement('label');
    columnLabel.textContent = `${bp.toUpperCase()}: Number of Columns`;
    columnLabel.className = 'block text-gray-700 text-sm font-bold mb-2';

    const columnSelect = document.createElement('select');
    columnSelect.className = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

    // Create dropdowns for rows
    const rowLabel = document.createElement('label');
    rowLabel.textContent = `${bp.toUpperCase()}: Number of Rows`;
    rowLabel.className = 'block text-gray-700 text-sm font-bold mb-2';

    const rowSelect = document.createElement('select');
    rowSelect.className = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

    for (let i = 1; i <= maxGridLines; i++) {
      // Options for columns
      const columnOption = document.createElement('option');
      columnOption.value = `${bp === '' ? bp : bp + ':'}grid-cols-${i}`;
      columnOption.textContent = `${i} Column${i > 1 ? 's' : ''}`;
      if (grid.className.includes(`${bp === '' ? bp : bp + ':'}grid-cols-${i}`)) {
        columnOption.selected = true;
      }
      columnSelect.appendChild(columnOption);

      // Options for rows
      const rowOption = document.createElement('option');
      rowOption.value = `${bp === '' ? bp : bp + ':'}grid-rows-${i}`;
      rowOption.textContent = `${i} Row${i > 1 ? 's' : ''}`;
      if (grid.className.includes(`${bp === '' ? bp : bp + ':'}grid-rows-${i}`)) {
        rowOption.selected = true;
      }
      rowSelect.appendChild(rowOption);
    }

    columnSelect.onchange = () => {
      // Remove old class and add new one
      updateGridClass(grid, columnSelect.value, 'cols', bp);
    };

    rowSelect.onchange = () => {
      // Remove old class and add new one
      updateGridClass(grid, rowSelect.value, 'rows', bp);
    };

    // Append to sidebar
    sidebar.appendChild(columnLabel);
    sidebar.appendChild(columnSelect);
    sidebar.appendChild(rowLabel);
    sidebar.appendChild(rowSelect);
  });
}

function updateGridClass(grid, newValue, type, breakpoint) {
  const classRegex = new RegExp(`\\b${breakpoint === '' ? breakpoint : breakpoint + ':'}${type === 'cols' ? 'grid-cols' : 'grid-rows'}-\\d+\\b`, 'g');
  grid.className = grid.className.replace(classRegex, '').trim() + ` ${newValue}`;
}
