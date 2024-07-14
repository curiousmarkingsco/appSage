document.addEventListener('DOMContentLoaded', function() {
  const addGridButton = document.getElementById('addGrid');
  addGridButton.addEventListener('click', function() {
      const gridContainer = document.createElement('div');
      gridContainer.className = 'grid grid-cols-1 gap-4 border-4 border-magenta-500 p-4';
      gridContainer.setAttribute('id', 'editableGrid');

      const initialColumn = createColumn(gridContainer);
      gridContainer.appendChild(initialColumn);

      document.getElementById('page').appendChild(gridContainer);
      updateSidebar(gridContainer);

      // Append add column button at the end
      const addColumnButton = createAddColumnButton(gridContainer);
      gridContainer.appendChild(addColumnButton);
  });
});

function createColumn(gridContainer) {
  const column = document.createElement('div');
  column.className = 'col-span-1 column-content';  // Use column-content for CSS
  const editContentButton = document.createElement('button');
  editContentButton.className = 'editContent bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded';
  editContentButton.textContent = '✏️';
  editContentButton.addEventListener('click', function() {
      updateSidebarForContentType(column);
  });

  const removeColumnButton = document.createElement('button');
  removeColumnButton.className = 'removeColumn bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded';
  removeColumnButton.textContent = '🗑️';
  removeColumnButton.addEventListener('click', function() {
      showConfirmationModal('Are you sure you want to delete this column?', () => {
          gridContainer.removeChild(column);
          updateColumnCount(gridContainer);
      });
  });

  // Append buttons to the column
  column.appendChild(editContentButton);
  column.appendChild(removeColumnButton);

  return column;
}

function createAddColumnButton(gridContainer) {
  const button = document.createElement('button');
  button.className = 'addColumn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
  button.textContent = '+';
  button.onclick = function() {
    const currentColumns = gridContainer.querySelectorAll('.col-span-1').length;
    if (currentColumns < 6) {  // Check if the current number of columns is less than 6
        const newColumn = createColumn(gridContainer);
        gridContainer.insertBefore(newColumn, this);
        updateColumnCount(gridContainer);
    } else {
        alert('Maximum of 6 columns allowed.');  // Alert the user if the limit is reached
    }
  };
  return button;
}

function updateColumnCount(grid) {
  const columns = grid.querySelectorAll('.col-span-1').length;
  grid.className = `grid grid-cols-${columns} gap-4 border-4 border-magenta-500 p-4`;
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Edit Grid Columns: ${columns}</strong></div>`;
  
  const removeGridButton = document.createElement('button');
  removeGridButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4';
  removeGridButton.textContent = 'Remove Grid';
  removeGridButton.onclick = function() {
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
  removeGridButton.onclick = function() {
      showConfirmationModal('Are you sure you want to delete this entire grid?', () => {
          grid.parentNode.removeChild(grid);
      });
  };
  sidebar.appendChild(removeGridButton);
}

function updateSidebarForHeading(column) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Choose Heading Type:</strong></div>`;
  
  const select = document.createElement('select');
  const options = ['Title (h1)', 'Heading One (h2)', 'Heading Two (h3)', 'Heading Three (h4)', 'Heading Four (h5)', 'Heading Five (h6)'];
  options.forEach(opt => {
      const optionElement = document.createElement('option');
      optionElement.value = opt.substring(opt.indexOf('(') + 1, opt.indexOf(')'));
      optionElement.textContent = opt;
      select.appendChild(optionElement);
  });
  sidebar.appendChild(select);

  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.maxLength = 144;
  textInput.placeholder = 'Enter heading text here...';
  textInput.className = 'mt-2 p-2 border border-gray-300 w-full';
  
  // Pre-fill if existing heading
  const existingHeading = column.querySelector('h1, h2, h3, h4, h5, h6');
  if (existingHeading) {
      select.value = existingHeading.tagName.toLowerCase();
      textInput.value = existingHeading.textContent;
  }

  textInput.addEventListener('input', function() {
      let heading = column.querySelector('h1, h2, h3, h4, h5, h6');
      if (!heading) {
          heading = document.createElement(select.value);
          column.appendChild(heading);
      }
      heading.tagName !== select.value && (heading = replaceWithNewHeading(heading, select.value));
      heading.textContent = this.value;
  });

  select.addEventListener('change', function() {
      const heading = column.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) {
          replaceWithNewHeading(heading, this.value);
      }
  });

  sidebar.appendChild(textInput);

  // Add margin and padding options
  addStyleOptions(sidebar, existingHeading || column);
  // Add font size options
  addFontSizeOptions(sidebar, existingHeading || column);
}

function updateSidebarForContentType(column) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Select Content Type:</strong></div>`;

  // List of content types
  const contentTypes = [
      { label: '🔠 Heading', action: () => updateSidebarForHeading(column) },
      { label: '🎥🏞️🎵 Media', action: () => updateSidebarForMedia(column) },
      { label: '📝 Paragraph', action: () => updateSidebarForParagraph(column) },
      { label: '🔗 Button', action: () => updateSidebarForButton(column) }
  ];

  contentTypes.forEach(type => {
      const button = document.createElement('button');
      button.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2';
      button.innerHTML = type.label;
      button.onclick = type.action;
      sidebar.appendChild(button);
  });
}

function updateSidebarForParagraph(column) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = '<div><strong>Edit Paragraph Text:</strong></div>';

  const textInput = document.createElement('textarea');
  textInput.className = 'mt-2 p-2 border border-gray-300 w-full';
  textInput.rows = 4;
  let p = column.querySelector('p');
  if (p) {
      textInput.value = p.textContent;
  }
  textInput.oninput = function() {
      if (!p) {
          p = document.createElement('p');
          column.appendChild(p);
      }
      p.textContent = this.value;
  };

  sidebar.appendChild(textInput);

  // Add margin and padding options
  addStyleOptions(sidebar, p || column);
  // Add font size options
  addFontSizeOptions(sidebar, p || column);
}

function updateSidebarForButton(column) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = '<div><strong>Configure Button:</strong></div>';

  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.placeholder = 'Button Text';
  textInput.className = 'mt-2 p-2 border border-gray-300 w-full';
  
  const urlInput = document.createElement('input');
  urlInput.type = 'url';
  urlInput.placeholder = 'Button URL';
  urlInput.className = 'mt-2 p-2 border border-gray-300 w-full';

  const checkboxLabel = document.createElement('label');
  checkboxLabel.textContent = ' Open in new tab';
  checkboxLabel.className = 'inline-flex items-center mt-2';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'ml-2';

  let button = column.querySelector('a');
  if (button) {
      textInput.value = button.textContent;
      urlInput.value = button.href;
      checkbox.checked = button.target === '_blank';
  }

  checkboxLabel.insertBefore(checkbox, checkboxLabel.firstChild);

  const buttonUpdate = function() {
      if (!button) {
          button = document.createElement('a');
          button.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
          column.appendChild(button);
      }
      button.textContent = textInput.value;
      button.href = urlInput.value;
      button.target = checkbox.checked ? '_blank' : '';
  };

  textInput.oninput = buttonUpdate;
  urlInput.oninput = buttonUpdate;
  checkbox.onchange = buttonUpdate;

  sidebar.appendChild(textInput);
  sidebar.appendChild(urlInput);
  sidebar.appendChild(checkboxLabel);

  // Add margin and padding options
  addStyleOptions(sidebar, button || column);
  // Add font size options
  addFontSizeOptions(sidebar, button || column);
}

function replaceWithNewHeading(oldHeading, newTag) {
  const newHeading = document.createElement(newTag);
  newHeading.textContent = oldHeading.textContent;
  oldHeading.parentNode.replaceChild(newHeading, oldHeading);
  return newHeading;
}

function updateSidebarForMedia(column) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Add/Edit Media:</strong></div>`;

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*, video/*, audio/*'; // Accept multiple media types
  fileInput.className = 'mt-2 p-2 border border-gray-300 w-full';
  fileInput.onchange = function(event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              let mediaElement = column.querySelector('img, video, audio');
              const mediaType = file.type.split('/')[0]; // 'image', 'video', or 'audio'

              if (mediaElement && mediaElement.tagName.toLowerCase() !== mediaType) {
                  // Remove old element if type does not match
                  mediaElement.parentNode.removeChild(mediaElement);
                  mediaElement = null;
              }

              if (!mediaElement) {
                  // Create new element if none exists or wrong type was removed
                  if (mediaType === 'image') {
                      mediaElement = document.createElement('img');
                  } else if (mediaType === 'video') {
                      mediaElement = document.createElement('video');
                      mediaElement.controls = true; // Add controls for video playback
                  } else if (mediaType === 'audio') {
                      mediaElement = document.createElement('audio');
                      mediaElement.controls = true; // Add controls for audio playback
                  }
                  column.appendChild(mediaElement);
              }

              // Update source of the existing/new media element
              mediaElement.src = e.target.result;
          };
          reader.readAsDataURL(file);
      }
  };

  sidebar.appendChild(fileInput);

  // Add margin and padding options
  let mediaElement = column.querySelector('img, video, audio');
  addStyleOptions(sidebar, mediaElement || column);
}

function showConfirmationModal(message, onConfirm) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center';
  modal.innerHTML = `
      <div class="bg-white p-4 rounded-lg max-w-sm mx-auto">
          <p class="text-black">${message}</p>
          <div class="flex justify-between mt-4">
              <button id="confirmDelete" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
              <button id="cancelDelete" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
          </div>
      </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('confirmDelete').addEventListener('click', function() {
      onConfirm();
      document.body.removeChild(modal);
  });

  document.getElementById('cancelDelete').addEventListener('click', function() {
      document.body.removeChild(modal);
  });
}

function addStyleOptions(sidebar, element) {
  const marginSelect = document.createElement('select');
  const paddingSelect = document.createElement('select');
  ['small', 'medium', 'large'].forEach(size => {
      let marginOption = document.createElement('option');
      marginOption.value = 'm-' + size;
      marginOption.textContent = 'Margin ' + size;
      marginSelect.appendChild(marginOption);

      let paddingOption = document.createElement('option');
      paddingOption.value = 'p-' + size;
      paddingOption.textContent = 'Padding ' + size;
      paddingSelect.appendChild(paddingOption);
  });

  marginSelect.onchange = () => updateClass(element, marginSelect.value, 'm-');
  paddingSelect.onchange = () => updateClass(element, paddingSelect.value, 'p-');

  sidebar.appendChild(marginSelect);
  sidebar.appendChild(paddingSelect);
}

function updateClass(element, value, prefix) {
  const currentClasses = element.className.split(' ').filter(cls => !cls.startsWith(prefix));
  currentClasses.push(value);
  element.className = currentClasses.join(' ');
}

function addFontSizeOptions(sidebar, element) {
  const fontSizeLabel = document.createElement('label');
  fontSizeLabel.textContent = 'Font Size:';
  fontSizeLabel.className = 'block text-gray-700 text-sm font-bold mb-2';

  const fontSizeSelect = document.createElement('select');
  fontSizeSelect.className = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
  const sizes = ['small', 'medium', 'large'];
  sizes.forEach(size => {
      const option = document.createElement('option');
      option.value = 'pagefont-' + size;
      option.textContent = size.charAt(0).toUpperCase() + size.slice(1);
      fontSizeSelect.appendChild(option);
  });

  fontSizeSelect.onchange = () => {
      element.className = element.className.split(' ').filter(cls => !cls.startsWith('pagefont-')).join(' ') + ' ' + fontSizeSelect.value;
  };

  sidebar.appendChild(fontSizeLabel);
  sidebar.appendChild(fontSizeSelect);
}