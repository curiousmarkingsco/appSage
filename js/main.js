/* main.js */

document.addEventListener('DOMContentLoaded', function () {
  const addGridButton = document.getElementById('addGrid');
  addGridButton.addEventListener('click', function () {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'w-full pagegrid grid grid-cols-1 gap-4 p-4 ugc-keep';

    const initialColumn = createColumn(gridContainer);
    gridContainer.appendChild(initialColumn);

    const addContentButton = createAddContentButton(initialColumn, true);
    initialColumn.appendChild(addContentButton);

    document.getElementById('page').appendChild(gridContainer);
    addGridOptions(gridContainer);
    highlightEditingElement(gridContainer);

    // Append add column button at the end
    const addColumnButton = createAddColumnButton(gridContainer);
    gridContainer.appendChild(addColumnButton);
  });
});
