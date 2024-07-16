/* main.js */

document.addEventListener('DOMContentLoaded', function () {
  const addGridButton = document.getElementById('addGrid');
  addGridButton.addEventListener('click', function () {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'w-full grid grid-cols-1 gap-4 p-4 ugc-keep';

    const initialColumn = createColumn(gridContainer);
    addContentContainer(initialColumn);
    gridContainer.appendChild(initialColumn);

    document.getElementById('page').appendChild(gridContainer);
    tabinate('Edit Grid');
    addGridOptions(gridContainer);
    highlightEditingElement(gridContainer);

    // Append add column button at the end
    const addColumnButton = createAddColumnButton(gridContainer);
    gridContainer.appendChild(addColumnButton);
  });
});
