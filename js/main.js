/* main.js */

document.addEventListener('DOMContentLoaded', function () {
  const editPageButton = document.getElementById('editPageSettings');
  editPageButton.addEventListener('click', function () {
    addPageOptions();
  });

  const addGridButton = document.getElementById('addGrid');
  addGridButton.addEventListener('click', function () {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'w-full pagegrid grid grid-cols-1 gap-4 p-4 ugc-keep';

    const initialColumn = createColumn(gridContainer);
    gridContainer.appendChild(initialColumn);

    const addContentButton = createAddContentButton(initialColumn, true);
    initialColumn.appendChild(addContentButton);

    document.getElementById('page').appendChild(gridContainer);

    const pageElement = document.getElementById('page');
    const gridCount = Array.prototype.slice.call(pageElement.children).length;
    const buttonBar = document.getElementById('gridButtonsBottombar')
    if (gridCount > 1) {
      document.querySelectorAll('.moveGrid').forEach(element => element.remove());
      buttonBar.prepend(createVerticalMoveGridButton(gridContainer, 'up'));
      buttonBar.appendChild(createVerticalMoveGridButton(gridContainer, 'down'));
    } else {
      document.querySelectorAll('.moveGrid').forEach(element => element.remove());
    }

    addGridOptions(gridContainer);
    highlightEditingElement(gridContainer);

    // Append add column button at the end
    const addColumnButton = createAddColumnButton(gridContainer);
    gridContainer.appendChild(addColumnButton);
  });
});

function addPageOptions(page) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Edit Page Styles &amp; Metadata</strong></div>`;

  if (page) {
    addEditableBackgroundColor(sidebar, page);
    addEditableBackgroundImage(sidebar, page);
  }
}