/* content.js */

function detectAndLoadContentType(column) {
  const types = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'img', 'video', 'audio', 'a'];
  const found = types.find(type => column.querySelector(type));
  if (found) {
    switch (found) {
      case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6':
        updateSidebarForHeading(column);
        break;
      case 'p':
        updateSidebarForParagraph(column);
        break;
      case 'img': case 'video': case 'audio':
        updateSidebarForMedia(column);
        break;
      case 'a':
        updateSidebarForButton(column);
        break;
    }
  }
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

  textInput.addEventListener('input', function () {
    let heading = column.querySelector('h1, h2, h3, h4, h5, h6');
    if (!heading) {
      heading = document.createElement(select.value);
      column.appendChild(heading);
    }
    heading.tagName !== select.value && (heading = replaceWithNewHeading(heading, select.value));
    heading.textContent = this.value;
  });

  select.addEventListener('change', function () {
    const heading = column.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      replaceWithNewHeading(heading, this.value);
    }
  });

  sidebar.appendChild(textInput);

  // Add font size options
  addFontSizeOptions(sidebar, column);
}

function updateSidebarForContentType(column) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Select Content Type:</strong></div>`;

  const contentTypes = [
    { label: '🔠<br> Heading', action: () => updateSidebarForHeading(column) },
    { label: '🎥🏞️🎵<br> Media', action: () => updateSidebarForMedia(column) },
    { label: '📝<br> Paragraph', action: () => updateSidebarForParagraph(column) },
    { label: '🔗<br> Button', action: () => updateSidebarForButton(column) }
  ];

  if (columnHasContent(column)) {
    // If content exists, directly load the editing interface for the existing content type
    detectAndLoadContentType(column);
  } else {
    // No content exists, show options to add new content
    contentTypes.forEach(type => {
      const button = document.createElement('button');
      button.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded m-2 content-button';
      button.innerHTML = type.label;
      button.onclick = type.action;
      sidebar.appendChild(button);
    });
  }
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
  textInput.oninput = function () {
    if (!p) {
      p = document.createElement('p');
      column.className = 'pagefont-medium';
      column.appendChild(p);
    }
    p.textContent = this.value;
  };

  sidebar.appendChild(textInput);

  // Add font size options
  addFontSizeOptions(sidebar, column);
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

  const buttonUpdate = function () {
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

  // Add font size options
  addFontSizeOptions(sidebar, column);
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
  fileInput.onchange = function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
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
}

function addFontSizeOptions(sidebar, element) {
  const fontSizeLabel = document.createElement('label');
  fontSizeLabel.textContent = 'Font Size:';
  fontSizeLabel.className = 'block text-gray-700 text-sm font-bold mb-2';

  const fontSizeSelect = document.createElement('select');
  fontSizeSelect.className = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

  // Array of possible font sizes
  const sizes = ['small', 'medium', 'large'];

  // Determine if the element has a font size class
  const existingFontSize = element.className.split(' ').find(cls => cls.startsWith('pagefont-'));

  sizes.forEach(size => {
    const option = document.createElement('option');
    option.value = 'pagefont-' + size;
    option.textContent = size.charAt(0).toUpperCase() + size.slice(1);

    // Set the selected attribute if this size is the current font size
    if ('pagefont-' + size === existingFontSize) {
      option.selected = true;
    }

    fontSizeSelect.appendChild(option);
  });

  // Update the class of the element on change
  fontSizeSelect.onchange = () => {
    // Remove any existing font size class and add the selected one
    element.className = element.className.split(' ').filter(cls => !cls.startsWith('pagefont-')).join(' ') + ' ' + fontSizeSelect.value;
  };

  // Append the label and select box to the sidebar
  sidebar.appendChild(fontSizeLabel);
  sidebar.appendChild(fontSizeSelect);
}