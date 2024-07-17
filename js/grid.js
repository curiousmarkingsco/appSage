/* grid.js */

function updateColumnCount(grid) {
  const columns = grid.querySelectorAll('.col-span-1').length;
  grid.className = `w-full pagegrid grid grid-cols-${columns} gap-4 p-4 ugc-keep`;
  const sidebar = document.getElementById('sidebar-dynamic');
  addGridOptions(grid);
}

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
    highlightEditingElement(grid);
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