// Start: main.js //
let selectedElement = null;
let responsiveTab = 'mobile';

function switchEditMode(mode) {
  if (document.getElementById('sidebar') !== null) {
    document.getElementById('addComponent').style.display = mode === 'add' ? 'block' : 'none';
    document.getElementById('editComponent').style.display = mode === 'edit' ? 'block' : 'none';
    switchTab(responsiveTab);
  }
}

function updateElement(property, value, dropdownId) {
  if (selectedElement) {
    if (property === 'className') {
      // Get the list of all possible classes in the same category as the new class
      const allClassesInCategory = Array.from(document.getElementById(dropdownId).options).map(opt => opt.value);

      // Remove any existing classes that are in the same category as the new class
      const oldClasses = Array.from(selectedElement.classList).filter(cls => allClassesInCategory.includes(cls));
      oldClasses.forEach(cls => selectedElement.classList.remove(cls));

      // Add the new class
      const device = responsiveTab;
      let prefix = '';
      switch (device) {
        case 'mobile':
          prefix = '';
          break;
        case 'tablet':
          prefix = 'md:';
          break;
        case 'desktop':
          prefix = 'lg:';
          break;
      }
      selectedElement.classList.add(prefix + value);

      // Update the data-original-classes attribute
      let originalClasses = selectedElement.dataset.originalClasses.split(' ');

      // Find the old class in the originalClasses array and remove it
      const oldClass = originalClasses.find(cls => cls.startsWith(prefix) && cls.includes(value.split('-')[0]));
      if (oldClass) {
        const index = originalClasses.indexOf(oldClass);
        if (index !== -1) {
          originalClasses.splice(index, 1);
        }
      }

      // Add new class to data-original-classes
      originalClasses.push(prefix + value);

      selectedElement.dataset.originalClasses = originalClasses.join(' ');

      // If the selected element is a grid and the columns or rows are changed, update the grid
      if (selectedElement.id.startsWith('pageSage_grid') && dropdownId.includes('ditGrid')) {
        const cols = getGridSize(selectedElement, 'grid-cols-');
        const rows = getGridSize(selectedElement, 'grid-rows-');

        let newCols = null;
        let newRows = null;
        if (responsiveTab === 'mobile') {
          newCols = getGridSize({classList: [document.getElementById('mobileEditGridCols').value]}, 'grid-cols-');
          newRows = getGridSize({classList: [document.getElementById('mobileEditGridRows').value]}, 'grid-rows-');
        }
        if (responsiveTab === 'tablet') {
          newCols = getGridSize({classList: [document.getElementById('tabletEditGridCols').value]}, 'grid-cols-');
          newRows = getGridSize({classList: [document.getElementById('tabletEditGridRows').value]}, 'grid-rows-');
        }
        if (responsiveTab === 'desktop') {
          newCols = getGridSize({classList: [document.getElementById('desktopEditGridCols').value]}, 'grid-cols-');
          newRows = getGridSize({classList: [document.getElementById('desktopEditGridRows').value]}, 'grid-rows-');
        }
        
        // Remove the old grid classes
        selectedElement.classList.remove('md:grid-cols-' + cols, 'md:grid-rows-' + rows);
        selectedElement.classList.remove('lg:grid-cols-' + cols, 'lg:grid-lg:rows-' + rows);
        // We need to remove mobile last or it will leave orphan `md:/lg:` classes
        selectedElement.classList.remove('grid-cols-' + cols, 'grid-rows-' + rows);

        // Add the new grid classes
        selectedElement.classList.add(prefix + 'grid-cols-' + newCols, prefix + 'grid-rows-' + newRows);
        
        // If the new grid has fewer cells than the old one, move the extra elements to the last cell
        if (newCols * newRows < cols * rows) {
          const cells = Array.from(selectedElement.children);
          const lastCell = cells[newCols * newRows - 1];
          for (let i = newCols * newRows; i < cells.length; i++) {
            lastCell.appendChild(cells[i]);
          }
        }
      }
    } else {
      eval('selectedElement.' + property + ' = value');
    }
  }
}

const draggableElements = document.querySelectorAll('.draggable');
draggableElements.forEach(element => {
  element.ondragstart = function(event) {
    event.dataTransfer.setData('text', event.target.id);

    // Remove the "disabled" class from all elements
    document.querySelectorAll('.disabled').forEach(el => el.classList.remove('disabled'));
  }

  element.ondragleave = function(event) {
    // Remove the "disabled" class from the target element
    event.target.classList.remove('disabled');
  }

  element.ondragend = function(event) {
    // Remove the "disabled" class from all elements
    document.querySelectorAll('.disabled').forEach(el => el.classList.remove('disabled'));
  }
});

document.getElementById('page').ondragover = function(event) {
  event.preventDefault();

  // If the target element already contains a child, add the "disabled" class
  if (event.target.hasChildNodes()) {
    event.target.classList.add('disabled');
  }
};

function addClickHandler(element) {
  element.onclick = function(event) {
    event.stopPropagation(); // Stop the click event from propagating up to parent elements
    selectedElement = event.target; // Select the clicked element for editing
    if (document.getElementById('sidebar') !== null) {
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
        const cols = getGridSize(selectedElement, 'grid-cols-');
        const rows = getGridSize(selectedElement, 'grid-rows-');
        if (responsiveTab === 'mobile') {
          document.getElementById('mobileEditGridCols').value = 'grid-cols-' + cols;
          document.getElementById('mobileEditGridRows').value = 'grid-rows-' + rows;
        }
        if (responsiveTab === 'tablet') {
          document.getElementById('tabletEditGridCols').value = 'md:grid-cols-' + cols;
          document.getElementById('tabletEditGridRows').value = 'md:grid-rows-' + rows;
        }
        if (responsiveTab === 'desktop') {
          document.getElementById('desktopEditGridCols').value = 'lg:grid-cols-' + cols;
          document.getElementById('desktopEditGridRows').value = 'lg:grid-rows-' + rows;
        }
      } else {
        // If the selected element is not a grid, populate the editing options with its current values
        const classes = selectedElement.dataset.originalClasses.split(' ');
        const fontSizeClass = classes.find(cls => cls.startsWith('text-'));
        const fontFamilyClass = classes.find(cls => cls.startsWith('font-'));
        const fontStyleClass = classes.find(cls => cls.startsWith('italic') || cls.startsWith('not-italic'));
        document.getElementById('mobileEditText').value = selectedElement.innerText;
        document.getElementById('mobileEditFontSize').value = fontSizeClass || 'text-base';
        document.getElementById('mobileEditFontFamily').value = fontFamilyClass || 'font-sans';
        document.getElementById('mobileEditFontStyle').value = fontStyleClass || 'not-italic';
        document.getElementById('tabletEditText').value = selectedElement.innerText;
        document.getElementById('tabletEditFontSize').value = fontSizeClass || 'text-base';
        document.getElementById('tabletEditFontFamily').value = fontFamilyClass || 'font-sans';
        document.getElementById('tabletEditFontStyle').value = fontStyleClass || 'not-italic';
        document.getElementById('desktopEditText').value = selectedElement.innerText;
        document.getElementById('desktopEditFontSize').value = fontSizeClass || 'text-base';
        document.getElementById('desktopEditFontFamily').value = fontFamilyClass || 'font-sans';
        document.getElementById('desktopEditFontStyle').value = fontStyleClass || 'not-italic';
      }
    }
  };
}

function getGridSize(element, prefix) {
  const classList = Array.from(element.classList);
  const classItem = classList.find(cls => cls.startsWith(prefix));
  if (classItem) {
    const size = classItem.replace(prefix, '');
    return size === 'none' ? 0 : parseInt(size, 10);
  }
  return 0;
}

function addClickHandlersToAll() {
  document.querySelectorAll('.draggable').forEach(addClickHandler);
}

function switchTab(tab) {
  // Hide all input sets
  document.getElementById('mobileInputs').style.display = 'none';
  document.getElementById('tabletInputs').style.display = 'none';
  document.getElementById('desktopInputs').style.display = 'none';
  document.getElementById('mobileTab').classList.remove('device-selected');
  document.getElementById('tabletTab').classList.remove('device-selected');
  document.getElementById('desktopTab').classList.remove('device-selected');
  responsiveTab = tab;

  // Show the correct input set based on the selected tab
  if (tab === 'mobile') {
    document.getElementById('mobileInputs').style.display = 'block';
  } else if (tab === 'tablet') {
    document.getElementById('tabletInputs').style.display = 'block';
  } else if (tab === 'desktop') {
    document.getElementById('desktopInputs').style.display = 'block';
  }
}

// Call this function when the page is loaded
window.onload = addClickHandlersToAll;

// End: main.js //
