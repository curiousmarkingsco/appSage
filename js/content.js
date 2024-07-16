/* content.js */

function addContentContainer(column) {
  const contentContainer = document.createElement('div');
  contentContainer.className = 'content-container pagefont-medium column-content'; // A new class specifically for content
  column.prepend(contentContainer);

  column.appendChild(addEditContentButton(contentContainer));
  column.appendChild(contentContainer);
  return contentContainer;
}

function addEditContentButton(contentContainer) {
  const button = document.createElement('button');
  button.className = 'editContent ugc-discard z-50 hidden group-hover:block absolute left-28 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded h-12 w-12';
  button.textContent = '✏️';
  button.addEventListener('click', function () {
    detectAndLoadContentType(contentContainer);
    tabinate('Edit Content');
    highlightEditingElement(contentContainer);
  });
  return button;
}

function detectAndLoadContentType(contentContainer) {
  const types = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'img', 'video', 'audio', 'a', 'form', 'ul'];
  const found = types.find(type => contentContainer.querySelector(type));
  if (found) {
    switch (found) {
      case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6':
        updateSidebarForHeading(contentContainer);
        break;
      case 'p':
        updateSidebarForParagraph(contentContainer);
        break;
      case 'img': case 'video': case 'audio':
        updateSidebarForMedia(contentContainer);
        break;
      case 'a':
        updateSidebarForButton(contentContainer);
        break;
      case 'form':
        updateSidebarForForm(contentContainer);
        break;
      case 'ul':
        updateSidebarForList(contentContainer);
        break;
    }
    updateSidebarForContentType(contentContainer, true)
  } else {
    // If no specific type is found, proceed with showing options to add new content
    updateSidebarForContentType(contentContainer);  // Redisplay content options as a fallback
  }
  highlightEditingElement(contentContainer);
}

function updateSidebarForHeading(contentContainer) {
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
  const existingHeading = contentContainer.querySelector('h1, h2, h3, h4, h5, h6');
  if (existingHeading) {
    select.value = existingHeading.tagName.toLowerCase();
    textInput.value = existingHeading.textContent;
  }

  textInput.addEventListener('input', function () {
    let heading = contentContainer.querySelector('h1, h2, h3, h4, h5, h6');
    if (!heading) {
      heading = document.createElement(select.value);
      contentContainer.appendChild(heading);
    }
    heading.tagName !== select.value && (heading = replaceWithNewHeading(heading, select.value));
    heading.textContent = this.value;
  });

  select.addEventListener('change', function () {
    const heading = contentContainer.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      replaceWithNewHeading(heading, this.value);
    }
  });

  sidebar.appendChild(textInput);

  // Add font size options
  addFontSizeOptions(sidebar, contentContainer);
}

function updateSidebarForContentType(containerContainer, append) {
  if (append) { //boolean
    // ??
    // Need to somehow make this work with multiple pieces of content
  } else {
    const sidebar = document.getElementById('sidebar-dynamic');
    sidebar.innerHTML = `<div><strong>Add Content Type:</strong></div>`;

    const contentTypes = [
      { label: '🔠<br> Heading', action: () => updateSidebarForHeading(containerContainer) },
      { label: '🎥🏞️🎵<br> Media', action: () => updateSidebarForMedia(containerContainer) },
      { label: '📝<br> Paragraph', action: () => updateSidebarForParagraph(containerContainer) },
      { label: '🔗<br> Button', action: () => updateSidebarForButton(containerContainer) },
      { label: '📋<br> Form', action: () => updateSidebarForForm(containerContainer) },
      { label: '🗂️<br> List', action: () => updateSidebarForList(containerContainer) }
    ];

    if (columnHasContent(containerContainer)) {
      // If content exists, directly load the editing interface for the existing content type
      detectAndLoadContentType(containerContainer);
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
}

function updateSidebarForForm(contentContainer) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Edit Form:</strong></div>`;
  let form = contentContainer.querySelector('form');
  let submitButton;

  if (!form) {
    form = document.createElement('form');
    contentContainer.appendChild(form);

    // Add submit button
    submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    submitButton.className = 'mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded';
    form.appendChild(submitButton);
  } else {
    submitButton = form.querySelector('button[type="submit"]');
  }

  const submitLabel = document.createElement('label');
  submitLabel.textContent = 'Submit Button Text:';
  submitLabel.className = 'block text-gray-700 text-sm font-bold mb-2';

  const submitField = document.createElement('input');
  submitField.type = 'text';
  submitField.placeholder = 'Change button name';
  submitField.className = 'shadow appearance-none border rounded-l py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block w-48';
  submitField.oninput = function () {
    submitButton.textContent = submitField.value;
  };

  const inputLabel = document.createElement('label');
  inputLabel.textContent = 'Field Label:';
  inputLabel.className = 'block text-gray-700 text-sm font-bold mb-2';

  const inputField = document.createElement('input');
  inputField.type = 'text';
  inputField.placeholder = 'Enter label...';
  inputField.className = 'shadow appearance-none border rounded-l py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block w-48';

  const typeLabel = document.createElement('label');
  typeLabel.textContent = 'Field Type:';
  typeLabel.className = 'block text-gray-700 text-sm font-bold mb-2';

  const typeField = document.createElement('select');
  typeField.className = 'shadow appearance-none border rounded-l py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block w-48';
  const inputTypes = ['text', 'url', 'tel', 'password', 'number', 'file', 'email', 'date', 'color', 'checkbox'];

  inputTypes.forEach(type => {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    typeField.appendChild(option);
  });

  const addButton = document.createElement('button');
  addButton.textContent = 'Add';
  addButton.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-4 rounded-r mr-2 mt-2 inline-block';
  addButton.onclick = function () {
    const input = document.createElement('input');
    input.type = typeField.value;
    input.placeholder = inputField.value; // Use label as placeholder
    input.className = 'mt-2 p-2 border border-gray-300 w-full';
    form.insertBefore(input, submitButton);
    updateSidebarFields(form, sidebarForm, submitButton, inputTypes);
  };

  const sidebarForm = document.createElement('form');
  sidebarForm.onsubmit = function (e) {
    e.preventDefault();
  };

  const newFieldGroup = document.createElement('div');
  newFieldGroup.className = 'group my-4 bg-white/50 p-4'
  sidebar.appendChild(sidebarForm);
  sidebarForm.appendChild(newFieldGroup);
  sidebarForm.appendChild(submitLabel);
  sidebarForm.appendChild(submitField);
  newFieldGroup.appendChild(typeLabel);
  newFieldGroup.appendChild(typeField);
  newFieldGroup.appendChild(inputLabel);
  newFieldGroup.appendChild(inputField);
  newFieldGroup.appendChild(addButton);

  updateSidebarFields(form, sidebarForm, submitButton, inputTypes);
}

function updateSidebarFields(form, sidebarForm, submitButton, inputTypes) {
  // Remove all existing field editors except the add new field section
  const existingEditors = sidebarForm.querySelectorAll('.field-editor');
  existingEditors.forEach(editor => editor.remove());

  // Iterate over form inputs and create corresponding editors in the sidebar form
  form.querySelectorAll('input, select, textarea').forEach(input => {
    if (input === submitButton) return;

    const fieldEditor = document.createElement('div');
    fieldEditor.className = 'field-editor group my-4 bg-white/50 p-4';

    const fieldLabel = document.createElement('label');
    fieldLabel.textContent = 'Edit Field Label:';
    fieldLabel.className = 'block text-gray-700 text-sm font-bold mb-2';

    const fieldInput = document.createElement('input');
    fieldInput.type = 'text';
    fieldInput.value = input.placeholder;
    fieldInput.className = 'shadow appearance-none border rounded-l py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block w-48';
    fieldInput.oninput = function () {
      input.placeholder = fieldInput.value;
    };

    const fieldTypeLabel = document.createElement('label');
    fieldTypeLabel.textContent = 'Edit Field Type:';
    fieldTypeLabel.className = 'block text-gray-700 text-sm font-bold mb-2';

    const fieldType = document.createElement('select');
    fieldType.className = 'shadow appearance-none border rounded-l py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block w-48';
    inputTypes.forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
      if (type === input.type) option.selected = true;
      fieldType.appendChild(option);
    });
    fieldType.onchange = function () {
      input.type = fieldType.value;
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-4 rounded mt-2 inline-block';
    deleteButton.onclick = function () {
      input.remove();
      fieldEditor.remove();
    };

    fieldEditor.appendChild(fieldLabel);
    fieldEditor.appendChild(fieldInput);
    fieldEditor.appendChild(fieldTypeLabel);
    fieldEditor.appendChild(fieldType);
    fieldEditor.appendChild(deleteButton);

    sidebarForm.appendChild(fieldEditor);
  });
}

function updateSidebarForList(contentContainer) {}

function updateSidebarForParagraph(contentContainer) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = '<div><strong>Edit Paragraph Text:</strong></div>';

  const textInput = document.createElement('textarea');
  textInput.className = 'mt-2 p-2 border border-gray-300 w-full';
  textInput.rows = 4;
  let p = contentContainer.querySelector('p');
  if (p) {
    textInput.value = p.textContent;
  }
  textInput.oninput = function () {
    if (!p) {
      p = document.createElement('p');
      contentContainer.className = 'pagefont-medium text-alt';
      contentContainer.appendChild(p);
    }
    p.textContent = this.value;
  };

  sidebar.appendChild(textInput);

  // Add font size options
  addFontSizeOptions(sidebar, contentContainer);
}

function updateSidebarForButton(contentContainer) {
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

  let button = contentContainer.querySelector('a');
  if (button) {
    textInput.value = button.textContent;
    urlInput.value = button.href;
    checkbox.checked = button.target === '_blank';
  }

  checkboxLabel.insertBefore(checkbox, checkboxLabel.firstChild);

  const buttonUpdate = function () {
    if (!button) {
      button = document.createElement('a');
      button.className = 'bg-link text-background hover:bg-background hover:text-link font-bold py-2 px-4 rounded';
      contentContainer.appendChild(button);
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
  addFontSizeOptions(sidebar, contentContainer);
}

function replaceWithNewHeading(oldHeading, newTag) {
  const newHeading = document.createElement(newTag);
  newHeading.textContent = oldHeading.textContent;
  oldHeading.parentNode.replaceChild(newHeading, oldHeading);
  return newHeading;
}

function updateSidebarForMedia(contentContainer) {
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
        let mediaElement = contentContainer.querySelector('img, video, audio');
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
          contentContainer.appendChild(mediaElement);
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