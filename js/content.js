/* content.js */

function addContentContainer(column) {
  const contentContainer = document.createElement('div');
  contentContainer.className = 'content-container column-content text-base'; // A new class specifically for content
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
  addTextOptions(sidebar, contentContainer);
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
      { label: '🎵 📷 🎥<br> Media', action: () => updateSidebarForMedia(containerContainer) },
      { label: '📝<br> Paragraph', action: () => updateSidebarForParagraph(containerContainer) },
      { label: '🔗<br> Button', action: () => updateSidebarForButton(containerContainer) },
      { label: '📋<br> Form', action: () => updateSidebarForForm(containerContainer) }
    ];

    if (columnHasContent(containerContainer)) {
      // If content exists, directly load the editing interface for the existing content type
      detectAndLoadContentType(containerContainer);
    } else {
      // No content exists, show options to add new content
      contentTypes.forEach(type => {
        const button = document.createElement('button');
        button.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded m-2 h-24 w-24';
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

  // Add UI for setting the form action
  const actionLabel = document.createElement('label');
  actionLabel.textContent = 'Form Action URL:';
  actionLabel.className = 'block text-gray-700 text-sm font-bold mb-2';

  const actionField = document.createElement('input');
  actionField.type = 'url';
  actionField.placeholder = 'Enter form action URL';
  actionField.className = 'shadow appearance-none border rounded-l py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block w-48';
  actionField.value = form.action;
  actionField.oninput = function () {
      form.action = actionField.value;
  };

  // Add UI for setting the form ID
  const formIdLabel = document.createElement('label');
  formIdLabel.textContent = 'Form ID:';
  formIdLabel.className = 'block text-gray-700 text-sm font-bold mb-2';

  const formIdField = document.createElement('input');
  formIdField.type = 'text';
  formIdField.placeholder = 'Enter form ID';
  formIdField.className = 'shadow appearance-none border rounded-l py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block w-48';
  formIdField.value = form.id;
  formIdField.oninput = function () {
      form.id = formIdField.value;
  };

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
  sidebarForm.appendChild(formIdLabel);
  sidebarForm.appendChild(formIdField);
  sidebarForm.appendChild(actionLabel);
  sidebarForm.appendChild(actionField);
  sidebarForm.appendChild(submitLabel);
  sidebarForm.appendChild(submitField);
  sidebarForm.appendChild(newFieldGroup);
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

    const idLabel = document.createElement('label');
    idLabel.textContent = 'Input ID:';
    idLabel.className = 'block text-gray-700 text-sm font-bold mb-2';

    const idField = document.createElement('input');
    idField.type = 'text';
    idField.value = input.id;
    idField.className = 'shadow appearance-none border rounded-l py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block w-48';
    idField.oninput = function () {
        input.id = idField.value;
    };

    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Input Name:';
    nameLabel.className = 'block text-gray-700 text-sm font-bold mb-2';

    const nameField = document.createElement('input');
    nameField.type = 'text';
    nameField.value = input.name;
    nameField.className = 'shadow appearance-none border rounded-l py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline inline-block w-48';
    nameField.oninput = function () {
        input.name = nameField.value;
    };

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
    fieldEditor.appendChild(idLabel);
    fieldEditor.appendChild(idField);
    fieldEditor.appendChild(nameLabel);
    fieldEditor.appendChild(nameField);
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
      contentContainer.className = 'text-base';
      contentContainer.appendChild(p);
    }
    p.textContent = this.value;
  };

  sidebar.appendChild(textInput);

  // Add font size options
  addTextOptions(sidebar, contentContainer);
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
  addTextOptions(sidebar, contentContainer);
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

function addTextOptions(sidebar, element) {
  const optionsLabel = document.createElement('label');
  optionsLabel.textContent = 'Text Options:';
  optionsLabel.className = 'block text-gray-700 text-sm font-bold mb-2';
  sidebar.appendChild(optionsLabel);

  const fontSizeLabel = document.createElement('label');
  fontSizeLabel.textContent = 'Font Size:';
  fontSizeLabel.className = 'block text-gray-700 text-sm font-bold mb-2';

  const fontSizeSelect = document.createElement('select');
  fontSizeSelect.className = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

  // Array of possible font sizes including base
  const sizes = [['base', 'Base'], ['sm', 'Small'], ['md', 'Medium'], ['lg', 'Large'], ['xl', 'Extra Large (XL)'], ['2xl', '2 XL'], ['3xl', '3 XL'], ['4xl', '4 XL'], ['5xl', '5 XL'], ['6xl', '6 XL'], ['7xl', '7 XL']];

  // Determine if the element has a font size class
  const existingFontSize = element.className.split(' ').find(cls => cls.startsWith('text-') && sizes.some(size => cls.includes(size[0]))) || 'text-base';

  sizes.forEach(size => {
    const option = document.createElement('option');
    option.value = 'text-' + size[0];
    option.textContent = size[1];
    option.selected = 'text-' + size[0] === existingFontSize;
    fontSizeSelect.appendChild(option);
  });

  fontSizeSelect.onchange = () => {
    updateElementClass(element, fontSizeSelect.value, 'size');
  };

  sidebar.appendChild(fontSizeLabel);
  sidebar.appendChild(fontSizeSelect);

  // Text alignment
  const textAlignLabel = document.createElement('label');
  textAlignLabel.textContent = 'Text Alignment:';
  textAlignLabel.className = 'block text-gray-700 text-sm font-bold mb-2';

  const textAlignSelect = document.createElement('select');
  textAlignSelect.className = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

  const alignments = ['left', 'center', 'right', 'justify', 'end', 'start'];

  const existingTextAlign = element.className.split(' ').find(cls => cls.startsWith('text-') && alignments.includes(cls.substring(5))) || 'text-left';

  alignments.forEach(alignment => {
    const option = document.createElement('option');
    option.value = 'text-' + alignment;
    option.textContent = alignment.charAt(0).toUpperCase() + alignment.slice(1);
    option.selected = 'text-' + alignment === existingTextAlign;
    textAlignSelect.appendChild(option);
  });

  textAlignSelect.onchange = () => {
    updateElementClass(element, textAlignSelect.value, 'align');
  };

  sidebar.appendChild(textAlignLabel);
  sidebar.appendChild(textAlignSelect);
}

// Helper function to update element class for sizes or alignment
function updateElementClass(element, newValue, type) {
  const prefix = 'text-';
  let classesToRemove = [];
  if (type === 'size') {
    classesToRemove = ['base', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'].map(size => prefix + size);
  } else if (type === 'align') {
    classesToRemove = ['left', 'center', 'right', 'justify', 'end', 'start'].map(align => prefix + align);
  }
  Array.from(element.children).forEach(child => {
    child.className = child.className
      .split(' ')
      .filter(cls => !classesToRemove.includes(cls))
      .concat(newValue)
      .join(' ');
  });
}
