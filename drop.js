// Start: drop.js //

// Once the element is dropped, we have to take into account various scenarios
function drop(event) {
  event.preventDefault();
  event.stopPropagation();

  const id = event.dataTransfer.getData('text/plain');
  const draggableElement = document.getElementById(id);
  const clone = draggableElement.cloneNode(true);
  clone.id = 'pageSage_' + id + '_element_' + Math.random().toString(36).substring(2, 9); // Assign a unique ID to the clone
  clone.ondragstart = function(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
  };
  clone.ondragover = function(event) {
    event.preventDefault();
  };
  clone.ondrop = drop;

  let target = event.target;

  // If the target is a child of a grid, set the target to the grid
  if (target.parentNode.classList.contains('grid')) {
    target = target.parentNode;
  }

  // Check if the target is a grid or a grid cell, or if the target and the draggable element are not grids
  if (target === document.getElementById('page') || 
    target.classList.contains('grid') || 
    (!target.classList.contains('grid') && !draggableElement.classList.contains('grid'))) {
    if (target === document.getElementById('page')) {
      document.getElementById('page').appendChild(clone);
    } else {
      target.appendChild(clone);
    }
  }

  // Remove the original draggable element if it's not a child of the sidebar
  if (document.getElementById('sidebar') === null || !document.getElementById('sidebar').contains(draggableElement)) {
    draggableElement.remove();
  }
  if (document.getElementById('sidebar') !== null) {
    selectedElement = clone;
    switchEditMode('edit');

    // Show or hide editing options based on the type of the selected element
    const isGrid = selectedElement.id.startsWith('pageSage_grid');
    document.getElementById('mobileEditGridCols').parentElement.style.display = isGrid ? 'block' : 'none';
    document.getElementById('mobileEditGridRows').parentElement.style.display = isGrid ? 'block' : 'none';
    document.getElementById('mobileEditText').parentElement.style.display = isGrid ? 'none' : 'block';
    document.getElementById('mobileEditFontSize').parentElement.style.display = isGrid ? 'none' : 'block';
    document.getElementById('tabletEditGridCols').parentElement.style.display = isGrid ? 'block' : 'none';
    document.getElementById('tabletEditGridRows').parentElement.style.display = isGrid ? 'block' : 'none';
    document.getElementById('tabletEditText').parentElement.style.display = isGrid ? 'none' : 'block';
    document.getElementById('tabletEditFontSize').parentElement.style.display = isGrid ? 'none' : 'block';
    document.getElementById('desktopEditGridCols').parentElement.style.display = isGrid ? 'block' : 'none';
    document.getElementById('desktopEditGridRows').parentElement.style.display = isGrid ? 'block' : 'none';
    document.getElementById('desktopEditText').parentElement.style.display = isGrid ? 'none' : 'block';
    document.getElementById('desktopEditFontSize').parentElement.style.display = isGrid ? 'none' : 'block';

    // If the selected element is a grid, populate the editing options with its current values
    if (isGrid) {
      clone.textContent = '';
      var sizeScope = responsiveTab;
      const cols = selectedElement.classList.contains('grid-cols-2') ? '2' : '1';
      const rows = selectedElement.classList.contains('grid-rows-2') ? '2' : '1';
      if (sizeScope === 'mobile') {
        document.getElementById('mobileEditGridCols').value = 'grid-cols-' + cols;
        document.getElementById('mobileEditGridRows').value = 'grid-rows-' + rows;
      }
      if (sizeScope === 'tablet') {
        document.getElementById('tabletEditGridCols').value = 'md:grid-cols-' + cols;
        document.getElementById('tabletEditGridRows').value = 'md:grid-rows-' + rows;
      }
      if (sizeScope === 'desktop') {
        document.getElementById('desktopEditGridCols').value = 'lg:grid-cols-' + cols;
        document.getElementById('desktopEditGridRows').value = 'lg:grid-rows-' + rows;
      }
    }
  }
  document.querySelectorAll('.draggable').forEach(addClickHandler);
}

// End: drop.js //
