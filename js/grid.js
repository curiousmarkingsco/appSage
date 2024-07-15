/* grid.js */

function updateColumnCount(grid) {
  const columns = grid.querySelectorAll('.col-span-1').length;
  grid.className = `w-full grid grid-cols-${columns} gap-4 p-4 ugc-keep`;
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Edit Grid Columns: ${columns}</strong></div>`;

  const removeGridButton = document.createElement('button');
  removeGridButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4';
  removeGridButton.textContent = 'Remove Grid';
  removeGridButton.onclick = function () {
    showConfirmationModal('Are you sure you want to delete this entire grid?', () => {
      grid.parentNode.removeChild(grid);
    });
  };
  sidebar.appendChild(removeGridButton);
}

function updateSidebar(grid) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Edit Grid Columns: ${grid.querySelectorAll('.col-span-1').length}</strong></div>`;

  const removeGridButton = document.createElement('button');
  removeGridButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4';
  removeGridButton.textContent = 'Remove Grid';
  removeGridButton.onclick = function () {
    showConfirmationModal('Are you sure you want to delete this entire grid?', () => {
      grid.parentNode.removeChild(grid);
    });
  };
  sidebar.appendChild(removeGridButton);
}

function addWidthOptions(grid) {
  const widthOptionsContainer = document.createElement('div');
  widthOptionsContainer.className = 'grid-width-options text-center';

  const fullWidthOption = document.createElement('button');
  fullWidthOption.textContent = 'Full Screen';
  fullWidthOption.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1';
  fullWidthOption.onclick = () => setGridWidth(grid, 'w-full');

  const fixedWidthOption = document.createElement('button');
  fixedWidthOption.textContent = 'Fixed Width';
  fixedWidthOption.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1';
  fixedWidthOption.onclick = () => setGridWidth(grid, 'max-w-7xl mx-auto w-full');

  widthOptionsContainer.appendChild(fullWidthOption);
  widthOptionsContainer.appendChild(fixedWidthOption);

  const sidebar = document.getElementById('sidebar');
  sidebar.appendChild(widthOptionsContainer, grid.nextSibling);
}

function setGridWidth(grid, widthClasses) {
  // Remove current width classes first
  grid.classList.remove('w-full', 'max-w-7xl', 'mx-auto');
  // Add the new width class based on the selection
  widthClasses.split(' ').forEach(cls => grid.classList.add(cls));
}