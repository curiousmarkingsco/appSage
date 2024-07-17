/* content.js */

function addContentContainer(column, addButton) {
  const contentContainer = document.createElement('div');
  contentContainer.className = 'content-container pagecontent text-base'; // A new class specifically for content

  if (addButton) {
    column.appendChild(createAddContentButton(contentContainer));
  }
  column.appendChild(contentContainer);
  contentContainer.appendChild(createEditContentButton(contentContainer));
  return contentContainer;
}

function createEditContentButton(contentContainer) {
  const button = document.createElement('button');
  button.className = 'editContent ugc-discard z-50 hidden group-hover:block absolute top-0 left-28 bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded h-12 w-12';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>';
  button.addEventListener('click', function () {
    detectAndLoadContentType(contentContainer);
    highlightEditingElement(contentContainer);
  });
  return button;
}

function createAddContentButton(contentContainer) {
  const button = document.createElement('button');
  button.className = 'addContent ugc-discard z-50 hidden group-hover:block absolute top-2 left-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded h-12 w-24';
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/></svg> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>`;
  button.addEventListener('click', function () {
    updateSidebarForContentType(contentContainer);
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
    }
  } else {
    // If no specific type is found, proceed with showing options to add new content
    updateSidebarForContentType(contentContainer);  // Redisplay content options as a fallback
  }
  highlightEditingElement(contentContainer);
}

function updateSidebarForHeading(contentContainer, newContent) {
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

  if (newContent) {
    newContainer = addContentContainer(contentContainer, false)
    if (contentContainer.classList.contains('pagecolumn')) {
      // if it's a column, append our new content container
      contentContainer.appendChild(newContainer);
    } else {
      // if it's not a column (presumably another content container),
      // get the parent (the column) and then append our new content container
      contentContainer.parentElement.appendChild(newContainer);
    }
    heading = document.createElement(select.value);
    newContainer.appendChild(heading);
    contentContainer = newContainer;
  } else {
    // Pre-fill if existing heading
    const existingHeading = contentContainer.querySelector('h1, h2, h3, h4, h5, h6');
    if (existingHeading) {
      select.value = existingHeading.tagName.toLowerCase();
      textInput.value = existingHeading.textContent;
    }
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

function updateSidebarForContentType(contentContainer) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Add Content Type:</strong></div>`;

  const contentTypes = [
    { label: '🔠<br> Heading', action: () => updateSidebarForHeading(contentContainer, true) },
    { label: '🎵 📷 🎥<br> Media', action: () => updateSidebarForMedia(contentContainer, true) },
    { label: '📝<br> Paragraph', action: () => updateSidebarForParagraph(contentContainer, true) },
    { label: '🔗<br> Button', action: () => updateSidebarForButton(contentContainer, true) },
    { label: '📋<br> Form', action: () => updateSidebarForForm(contentContainer, true) }
  ];
  showNewContentMenu(contentTypes, sidebar);
}

function showNewContentMenu(contentTypes, sidebar) {
  contentTypes.forEach(type => {
    const button = document.createElement('button');
    button.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded m-2 h-24 w-24';
    button.innerHTML = type.label;
    button.onclick = type.action;
    sidebar.appendChild(button);
  });
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
    submitButton.className = 'mt-4 bg-green-500 hover:bg-green-700 top-2 text-white font-bold p-2 rounded';
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

function updateSidebarForParagraph(contentContainer, newContent) {
  if (newContent) {
    newContainer = addContentContainer(contentContainer, false)
    if (contentContainer.classList.contains('pagecolumn')) {
      // if it's a column, append our new content container
      contentContainer.appendChild(newContainer);
    } else {
      // if it's not a column (presumably another content container),
      // get the parent (the column) and then append our new content container
      contentContainer.parentElement.appendChild(newContainer);
    }
    contentContainer = newContainer;
  }
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
      contentContainer.classList.add('text-base');
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
      button.className = 'bg-link text-background hover:bg-background hover:text-link font-bold p-2 rounded';
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
