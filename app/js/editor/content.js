/*

  editor/content.js

  TODO: A button for adding placeholder media paths for media elements
  TODO: For anything using color, a manual colorpicker option in case the
        designer needs to break out of their theme palette.
  TODO: Currently, if a column has no margins, padding, or content inside of
        it, it can be extremely hard to click. How do we resolve this?

*/

// This function creates a container for individual HTML elements. This is
// intended to make it easier to comprehend, within the code, movements of
// elements through the DOM and to be able to do things like add background
// images while still being able to give the actual element a background color
// so that legibility is still possible.
// TODO: The background color example mentioned above isn't actually supported.
// TODO: Additionally, adding a background color to a button, for example,
//       creates confusing results since clicking that background doesn't
//       actually result in clicking the link. This needs to be fixed and
//       crafted more intentionally for certain elements.
// DATA IN: null
function addContentContainer() {
  const contentContainer = document.createElement('div');
  contentContainer.className = 'content-container pagecontent text-base'; // A new class specifically for content

  contentContainer.addEventListener('click', function (event) {
    event.stopPropagation();
    detectAndLoadContentType(contentContainer);
    // Editing options for all types of content
    addEditableBorders(sidebar, contentContainer);
    addEditableBackgroundColor(sidebar, contentContainer);
    addEditableBackgroundImage(sidebar, contentContainer);
    addEditableBackgroundImageURL(sidebar, contentContainer);
    addEditableBackgroundFeatures(sidebar, contentContainer);
    addEditableMarginAndPadding(sidebar, contentContainer);
    addEditableDimensions(sidebar, contentContainer);
    highlightEditingElement(contentContainer);
  });

  return contentContainer;
} // DATA OUT: HTML Element, <div class="pagecontent">

// This function adds a lot of the standard editing options that should be
// available for all elements. This listens for any clicks on editable content
// and also adds more important editing options before the standard options,
// such as the actual text being added, hrefs for links, form fields, etc.
// DATA IN: HTML Element, <div>
function enableEditContentOnClick(contentContainer) {
  contentContainer.addEventListener('click', function (event) {
    event.stopPropagation();
    detectAndLoadContentType(contentContainer);
    // Editing options for all types of content
    addEditableBorders(sidebar, contentContainer);
    addEditableBackgroundColor(sidebar, contentContainer);
    addEditableBackgroundImage(sidebar, contentContainer);
    addEditableBackgroundImageURL(sidebar, contentContainer);
    addEditableBackgroundFeatures(sidebar, contentContainer);
    addEditableMarginAndPadding(sidebar, contentContainer);
    addEditableDimensions(sidebar, contentContainer);
    highlightEditingElement(contentContainer);
  });
} // DATA OUT: null

// This function creates the button for adding content to the column currently
// being hovered over by the designer.
// DATA IN: HTML Element, <div>
function createAddContentButton(column) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['add-content']);
  button.className = 'addContent ugc-discard z-50 hidden group-hover:block absolute bottom-2 left-[calc(50%-3rem)] bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded h-12 w-24';
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>`;
  button.addEventListener('click', function (event) {
    event.stopPropagation();
    updateSidebarForContentType(column);
    highlightEditingElement(column);
  });
  return button;
} // DATA OUT: HTML Element, <button>

// This function creates the button for deleting the content currently being
// edited. As the tooltip mentions, FOREVER. That's a long time!
// Currently, this button lives at the topbar nestled between the
// 'move content' buttons on its left and right.
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div id="sidebar-dynamic">']
function createRemoveContentButton(contentContainer) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['remove-content'])
  button.className = 'removeContent ugc-discard bg-rose-500 hover:bg-rose-700 text-slate-50 font-bold p-2 rounded h-12 w-12 mx-auto';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L409.6 295.8l42.1-42.1L474.3 231l11.3-11.3-33.9-33.9-62.1-62.1L355.7 89.8l-11.3 11.3-22.6 22.6-57.8 57.8L38.8 5.1zM306.2 214.7l50.5-50.5c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-47.8 47.8-25.4-19.9zM195.5 250l-72.9 72.9c-10.4 10.4-18 23.3-22.2 37.4L65 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2l88.3-88.3-77.9-61.4-27.6 27.6c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l24.9-24.9L195.5 250zM224 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9l-78.1 23 23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM426.7 18.7L412.3 33.2 389.7 55.8 378.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L517.3 18.7c-25-25-65.5-25-90.5 0z"/></svg>';
  button.addEventListener('click', function () {
    showConfirmationModal('Are you sure you want to delete this content?', () => {
      contentContainer.remove();
      document.getElementById('sidebar-dynamic').innerHTML = '';
    });
  });
  return button;
} // DATA OUT: HTML Element, <button>

// This function creates the button for moving the element the content belongs
// to upward and downward in the column. Currently, these buttons live at the
// top of the editor sidebar when the grid is/has been selected for editing.
// DATA IN: ['HTML Element, <div>', 'String:up/down']
function createVerticalMoveContentButton(contentContainer, direction) {
  const button = document.createElement('button');
  button.className = 'moveContent ugc-discard bg-amber-500 hover:bg-amber-700 text-slate-50 font-bold p-2 rounded h-12 w-16';
  if (direction == 'up') {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z"/></svg>';
    button.innerHTML += ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>';
    button.setAttribute('data-extra-info', tooltips['move-content-up'])
  } else {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>';
    button.innerHTML += ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M246.6 502.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 402.7 192 192c0-17.7 14.3-32 32-32s32 14.3 32 32l0 210.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128zM64 160c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 96C0 43 43 0 96 0L352 0c53 0 96 43 96 96l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7-14.3-32-32-32L96 64C78.3 64 64 78.3 64 96l0 64z"/></svg>';
    button.setAttribute('data-extra-info', tooltips['move-content-down'])
  }
  button.addEventListener('click', function () {
    moveVertical(contentContainer, direction);
  });
  return button;
} // DATA OUT: HTML Element, <button>

// This function figures out what to do after something in the editing view is
// clicked and either creates or finds the contextually relevant element and
// updates the sidebar with relevant styling options.
// DATA IN: HTML Element, <div>
function detectAndLoadContentType(contentContainer) {
  const sidebar = document.getElementById('sidebar-dynamic');
  // const oldMoveButtons = document.getElementById('moveContentButtons');
  // if (oldMoveButtons) { oldMoveButtons.remove }
  const types = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'img', 'video', 'audio', 'a', 'button', 'form']//, 'div', 'ul' ,'ol', 'li', 'textarea', 'input', 'select', 'option', 'figure', 'figcaption', 'article', 'section', 'header', 'nav', 'aside', 'footer', 'address', 'main', 'blockquote', 'dl', 'dt', 'dd'];
  const found = types.find(type => contentContainer.querySelector(type));
  if (found) {
    switch (found) {
      case 'h1': case 'h2': case 'h3': case 'h4': case 'h5': case 'h6': //case 'p': case 'a': case 'button': case 'ol': case 'ul': case 'li': case 'form': case 'textarea': case 'input':
        updateSidebarForHeader(contentContainer);
        break;
      case 'p':
        updateSidebarForParagraph(contentContainer);
        break;
      case 'img': case 'video': case 'audio':
        updateSidebarForMedia(contentContainer);
        break;
      case 'a': case 'button':
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

  const moveButtons = document.createElement('div');
  moveButtons.className = 'flex justify-between my-2';
  moveButtons.id = 'moveContentButtons';
  sidebar.prepend(moveButtons);

  // Minus one to remove the 'Add Content' button from the count
  const contentCount = contentContainer.parentElement.children.length - 1
  if (contentCount > 1) moveButtons.appendChild(createVerticalMoveContentButton(contentContainer, 'up'));
  moveButtons.appendChild(createRemoveContentButton(contentContainer));
  if (contentCount > 1) moveButtons.appendChild(createVerticalMoveContentButton(contentContainer, 'down'));

  highlightEditingElement(contentContainer);
} // DATA OUT: null

// This cobbles together all the needed bits for adding/editing header elements.
// TODO: This should eventually be wrapped up in updateSidebarForTextElements
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div>']
function updateSidebarForHeader(contentContainer, newContent) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = generateMobileTabs();
  activateTabs();
  const sidebarTitle = document.createElement('div')
  sidebarTitle.innerHTML = `<div><strong>Edit Heading:</strong></div>`;

  const select = document.createElement('select');
  const options = ['Title (h1)', 'Heading One (h2)', 'Heading Two (h3)', 'Heading Three (h4)', 'Heading Four (h5)', 'Heading Five (h6)'];
  select.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
  options.forEach(opt => {
    const optionElement = document.createElement('option');
    optionElement.value = opt.substring(opt.indexOf('(') + 1, opt.indexOf(')'));
    optionElement.textContent = opt;
    select.appendChild(optionElement);
  });

  const textInputLabel = document.createElement('label');
  textInputLabel.setAttribute('for', 'textInput');
  const textInput = document.createElement('input');
  textInput.setAttribute('name', 'textInput');
  textInput.type = 'text';
  textInput.maxLength = 144;
  textInput.placeholder = 'Enter heading text here...';
  textInput.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';

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

  addTextOptions(sidebar, contentContainer);
} // DATA OUT: null

// This function and the one below it creates various buttons to choose from
// available elements that can be created.
// TODO: This function should be used by updateSidebarForTextElements so that the
//       options are more illustrative than a plaintext dropdown menu.
// DATA IN: HTML Element, <div>
function updateSidebarForContentType(contentContainer) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Add Content Type:</strong></div>${generateMobileTabs()}`;
  activateTabs();

  const contentTypes = [
    { label: `<div class="p-6" data-extra-info="Text Content including Forms.">${appSageEditorIcons["heading"]}</div>`, action: () => updateSidebarForHeader(contentContainer, true) },
    { label: `<div class="p-6" data-extra-info="Multi-Media Files">${appSageEditorIcons["media"]}</div>`, action: () => updateSidebarForMedia(contentContainer, true) },
    { label: `<div class="p-6" data-extra-info="Button (Link)">${appSageEditorIcons["button"]}</div>`, action: () => updateSidebarForButton(contentContainer, true) },
  ];
  showNewContentMenu(contentTypes, sidebar);
} // DATA OUT: null

// This function and the one above it creates various buttons to choose from
// available elements that can be created.
// TODO: This function should be used by updateSidebarForTextElements so that the
//       options are more illustrative than a plaintext dropdown menu.
// DATA IN: ['Array', 'HTML Element, <div id="sidebar-dynamic">']
function showNewContentMenu(contentTypes, sidebar) {
  contentTypes.forEach(type => {
    const button = document.createElement('button');
    button.className = 'bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded m-2 h-24 w-24';
    button.innerHTML = type.label;
    button.onclick = type.action;
    sidebar.appendChild(button);
  });
} // DATA OUT: null

// This cobbles together all the needed bits for adding/editing form fields.
// TODO: This should eventually be wrapped up in updateSidebarForTextElements, or
//       perhaps empowered by it?
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div>']
function updateSidebarForForm(contentContainer, newContent) {
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
  sidebar.innerHTML = '';
  const sidebarTitle = document.createElement('div');
  sidebarTitle.innerHTML = `<strong>Edit Form:</strong></div>${generateMobileTabs()}`;
  activateTabs();
  let form = contentContainer.querySelector('form');
  let submitButton;

  if (!form) {
    form = document.createElement('form');
    contentContainer.prepend(form);

    // Add submit button
    submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    submitButton.className = 'mt-4 bg-emerald-500 hover:bg-emerald-700 top-2 text-slate-50 font-bold p-2 rounded';
    form.appendChild(submitButton);
  } else {
    submitButton = form.querySelector('button[type="submit"]');
  }

  // Add UI for setting the form action
  const actionLabel = document.createElement('label');
  actionLabel.setAttribute('for', 'actionField');
  actionLabel.textContent = 'Form Action URL:';
  actionLabel.className = 'block text-slate-700 text-sm font-bold mb-2';

  const actionField = document.createElement('input');
  actionField.setAttribute('name', 'actionField');
  actionField.type = 'url';
  actionField.placeholder = 'Enter form action URL';
  actionField.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
  actionField.value = form.action;
  actionField.oninput = function () {
    form.action = actionField.value;
  };

  // Add UI for setting the form ID
  const formIdLabel = document.createElement('label');
  formIdLabel.setAttribute('for', 'formIdField');
  formIdLabel.textContent = 'Form ID:';
  formIdLabel.className = 'block text-slate-700 text-sm font-bold mb-2';

  const formIdField = document.createElement('input');
  formIdField.setAttribute('name', 'formIdField');
  formIdField.type = 'text';
  formIdField.placeholder = 'Enter form ID';
  formIdField.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
  formIdField.value = form.id;
  formIdField.oninput = function () {
    form.id = formIdField.value;
  };

  const submitLabel = document.createElement('label');
  submitLabel.setAttribute('for', 'submitField');
  submitLabel.textContent = 'Submit Button Text:';
  submitLabel.className = 'block text-slate-700 text-sm font-bold mb-2';

  const submitField = document.createElement('input');
  submitField.setAttribute('name', 'submitField');
  submitField.type = 'text';
  submitField.placeholder = 'Change button name';
  submitField.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
  submitField.oninput = function () {
    submitButton.textContent = submitField.value;
  };

  const inputLabel = document.createElement('label');
  inputLabel.setAttribute('for', 'inputField');
  inputLabel.textContent = 'Field Label:';
  inputLabel.className = 'block text-slate-700 text-sm font-bold mb-2';

  const inputField = document.createElement('input');
  inputField.setAttribute('name', 'inputField');
  inputField.type = 'text';
  inputField.placeholder = 'Enter label...';
  inputField.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';

  const typeLabel = document.createElement('label');
  typeLabel.setAttribute('for', 'typeField');
  typeLabel.textContent = 'Field Type:';
  typeLabel.className = 'block text-slate-700 text-sm font-bold mb-2';

  const typeField = document.createElement('select');
  typeField.setAttribute('name', 'typeField');
  typeField.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
  const inputTypes = ['text', 'url', 'tel', 'password', 'number', 'file', 'email', 'date', 'color', 'checkbox'];

  inputTypes.forEach(type => {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    typeField.appendChild(option);
  });

  const addButton = document.createElement('button');
  addButton.textContent = 'Add';
  addButton.className = 'bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold py-1.5 px-4 rounded mr-2 mt-2 inline-block';
  addButton.onclick = function () {
    const input = document.createElement('input');
    input.type = typeField.value;
    input.placeholder = inputField.value; // Use label as placeholder
    input.className = 'mt-2 p-2 border border-slate-300 w-full';
    form.insertBefore(input, submitButton);
    updateSidebarFields(form, sidebarForm, submitButton, inputTypes);
  };

  const sidebarForm = document.createElement('form');
  sidebarForm.onsubmit = function (e) {
    e.preventDefault();
  };

  const newFieldGroup = document.createElement('div');
  newFieldGroup.className = 'group my-4 bg-slate-50'
  sidebar.prepend(sidebarTitle);
  sidebar.prepend(sidebarForm);
  sidebarForm.prepend(newFieldGroup);
  sidebarForm.prepend(formIdField);
  sidebarForm.prepend(formIdLabel);
  sidebarForm.prepend(actionField);
  sidebarForm.prepend(actionLabel);
  sidebarForm.prepend(submitField);
  sidebarForm.prepend(submitLabel);
  newFieldGroup.appendChild(typeLabel);
  newFieldGroup.appendChild(typeField);
  newFieldGroup.appendChild(inputLabel);
  newFieldGroup.appendChild(inputField);
  newFieldGroup.appendChild(addButton);
  updateSidebarFields(form, sidebarForm, submitButton, inputTypes);
} // DATA OUT: null

// This cobbles together all the needed bits for adding/editing form fields.
// TODO: This should eventually be wrapped up in updateSidebarForTextElements, or
//       perhaps empowered by it?
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div>']
function updateSidebarFields(form, sidebarForm, submitButton, inputTypes) {
  // Remove all existing field editors except the add new field section
  const existingEditors = sidebarForm.querySelectorAll('.field-editor');
  existingEditors.forEach(editor => editor.remove());

  // Iterate over form inputs and create corresponding editors in the sidebar form
  form.querySelectorAll('input, select, textarea').forEach(input => {
    if (input === submitButton) return;

    const fieldEditor = document.createElement('div');
    fieldEditor.className = 'field-editor group my-4 bg-slate-50';

    const idLabel = document.createElement('label');
    idLabel.setAttribute('for', 'idField');
    idLabel.textContent = 'Input ID:';
    idLabel.className = 'block text-slate-700 text-sm font-bold mb-2';

    const idField = document.createElement('input');
    idField.setAttribute('name', 'idField');
    idField.type = 'text';
    idField.value = input.id;
    idField.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
    idField.oninput = function () {
      input.id = idField.value;
    };

    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'nameField');
    nameLabel.textContent = 'Input Name:';
    nameLabel.className = 'block text-slate-700 text-sm font-bold mb-2';

    const nameField = document.createElement('input');
    nameField.setAttribute('name', 'nameField');
    nameField.type = 'text';
    nameField.value = input.name;
    nameField.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
    nameField.oninput = function () {
      input.name = nameField.value;
    };

    const fieldLabel = document.createElement('label');
    fieldLabel.setAttribute('for', 'fieldInput');
    fieldLabel.textContent = 'Edit Field Label:';
    fieldLabel.className = 'block text-slate-700 text-sm font-bold mb-2';

    const fieldInput = document.createElement('input');
    fieldInput.setAttribute('name', 'fieldInput');
    fieldInput.type = 'text';
    fieldInput.value = input.placeholder;
    fieldInput.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
    fieldInput.oninput = function () {
      input.placeholder = fieldInput.value;
    };

    const fieldTypeLabel = document.createElement('label');
    fieldTypeLabel.setAttribute('for', 'fieldType');
    fieldTypeLabel.textContent = 'Edit Field Type:';
    fieldTypeLabel.className = 'block text-slate-700 text-sm font-bold mb-2';

    const fieldType = document.createElement('select');
    fieldType.setAttribute('name', 'fieldType');
    fieldType.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
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
    deleteButton.className = 'bg-rose-500 hover:bg-rose-700 text-slate-50 font-bold py-1.5 px-4 rounded mt-2 inline-block';
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
} // DATA OUT: null

// This cobbles together all the needed bits for adding/editing paragraph elements.
// TODO: This should eventually be wrapped up in updateSidebarForTextElements
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div>']
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
  sidebar.innerHTML = `${generateMobileTabs()}`;
  const label = document.createElement('div')
  label.innerHTML = '<strong>Edit Paragraph Text:</strong>';

  const textInput = document.createElement('textarea');
  textInput.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
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

  // Add font size options
  addTextOptions(sidebar, contentContainer);
  sidebar.prepend(textInput);
  sidebar.prepend(label);
} // DATA OUT: null

// This cobbles together all the needed bits for adding/editing button elements.
// TODO: This should eventually be wrapped up in updateSidebarForTextElements
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div>']
function updateSidebarForButton(contentContainer, newContent) {
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
  sidebar.innerHTML = `<div><strong>Configure Button:</strong></div>${generateMobileTabs()}`;

  const textInput = document.createElement('input');
  textInput.type = 'text';
  textInput.placeholder = 'Button Text';
  textInput.className = 'mt-2 p-2 border border-slate-300 w-full';

  const urlInput = document.createElement('input');
  urlInput.type = 'url';
  urlInput.placeholder = 'Button URL';
  urlInput.className = 'mt-2 p-2 border border-slate-300 w-full';

  const checkboxLabel = document.createElement('label');
  checkboxLabel.setAttribute('for', 'checkbox');
  checkboxLabel.textContent = ' Open in new tab';
  checkboxLabel.className = 'inline-flex items-center mt-2';

  const checkbox = document.createElement('input');
  checkbox.setAttribute('name', 'checkbox');
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
} // DATA OUT: null

// This function is a bit redundant compared to newer implementations, but...
// Don't fix it if it ain't broke.
// TODO: This will eventually be obsolete from updateSidebarForTextElements
// DATA IN: ['HTML Element, <h*>', 'String:h*'] // h* = all available heading tags.
function replaceWithNewHeading(oldHeading, newTag) {
  const newHeading = document.createElement(newTag);
  newHeading.textContent = oldHeading.textContent;
  oldHeading.parentNode.replaceChild(newHeading, oldHeading);
  return newHeading;
} // DATA OUT: HTML Element, <h*>

// This cobbles together all the needed bits for adding/editing media files.
// TODO: This should eventually be wrapped up in updateSidebarForTextElements
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div>']
function updateSidebarForMedia(contentContainer, newContent) {
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
  sidebar.innerHTML = `${generateMobileTabs()}`;
  activateTabs();

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*, video/*, audio/*'; // Accept multiple media types
  fileInput.className = 'shadow border rounded py-2 bg-[#ffffff] px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
  fileInput.onchange = function (event) {
    generateMediaSrc(event, contentContainer, false);
  }

  const urlInput = document.createElement('input');
  const mediaCandidate = contentContainer.querySelector('img, video, audio');
  urlInput.type = 'text';
  urlInput.setAttribute('placeholder', 'Media URL');
  urlInput.value = mediaCandidate ? mediaCandidate.src : '';
  urlInput.className = 'shadow border w-full rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';

  urlInput.onchange = async () => {
    let mediaElement = contentContainer.querySelector('img, video, audio');
    const url = urlInput.value;

    // Function to determine media type from Content-Type header
    async function getMediaType(url) {
      try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentType = response.headers.get('Content-Type');

        if (contentType.startsWith('image/')) {
          return 'img';
        } else if (contentType.startsWith('audio/')) {
          return 'audio';
        } else if (contentType.startsWith('video/')) {
          return 'video';
        }
      } catch (error) {
        console.error('Error fetching the media URL:', error);
      }
      return null;
    }

    const mediaType = await getMediaType(url);

    if (!mediaElement && mediaType) {
      let newMediaElement;

      if (mediaType === 'img') {
        newMediaElement = document.createElement('img');
      } else if (mediaType === 'audio') {
        newMediaElement = document.createElement('audio');
        newMediaElement.setAttribute('controls', 'controls');
      } else if (mediaType === 'video') {
        newMediaElement = document.createElement('video');
        newMediaElement.setAttribute('controls', 'controls');
      }

      if (newMediaElement) {
        contentContainer.appendChild(newMediaElement);
        mediaElement = newMediaElement;
      }
    }

    if (mediaElement) {
      mediaElement.setAttribute('src', url);
    }
  };

  contentContainer.appendChild(urlInput);

  const fieldTitle = document.createElement('div');
  fieldTitle.innerHTML = '<h2 class="text-xl font-bold text-slate-900 my-2">Add/Edit Media:</h2></div>';

  sidebar.prepend(fileInput);
  sidebar.prepend(urlInput);
  sidebar.prepend(createLabelAllDevices());
  sidebar.prepend(fieldTitle);
} // DATA OUT: null

// This function is the operational bits of the "Move Grid" and "Move Content"
// buttons.
// DATA IN: ['HTML Element, <div>', 'String:up/down']
function moveVertical(element, direction) {
  const parent = element.parentNode;
  let targetSibling = getNextValidSibling(element, direction);

  if (direction === 'up' && targetSibling) {
    parent.insertBefore(element, targetSibling);
  } else if (direction === 'down' && targetSibling) {
    // For moving down, we need to insert before the next element of the targetSibling
    const nextToTarget = targetSibling.nextElementSibling;
    if (nextToTarget) {
      parent.insertBefore(element, nextToTarget);
    } else {
      parent.appendChild(element);  // If there's no next sibling, append to the end of the parent
    }
  }
} // DATA OUT: null

// This function makes those all-caps labels with the icon to the left of them.
// DATA IN: null
function createLabelAllDevices() {
  const label = document.createElement('span');
  label.className = 'inline-block col-span-5 text-slate-700 text-xs uppercase mt-2';
  label.textContent = 'All Devices';
  const breakpoints = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
  breakpoints.forEach(bp => {
    const responsiveIcon = document.createElement('span');
    responsiveIcon.className = 'h-3 w-3 mr-2 inline-block';
    responsiveIcon.innerHTML = `${appSageEditorIcons['responsive'][bp]}`;
    label.prepend(responsiveIcon);
  });
  return label;
} // DATA OUT: HTML Element, <span>

// This function helps media tags generate the correct text needed for the
// value of their `src` attribute.
// TODO: Find an alternative to storing image blobs in the local storage and
//  in the copy/pastes that might end up in a database bloating it to oblivion.
//  To see the offending line, search for this text (less the // part):
// contentContainer.style.backgroundImage
// DATA IN: ['HTML Element Event', 'HTML Element, <div>', 'String']
function generateMediaSrc(event, contentContainer, url){
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      let mediaElement = contentContainer.querySelector('img, video, audio');
      const mediaType = file.type.split('/')[0]; // 'image', 'video', or 'audio'

      if (!url){
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
      } else {
        // For now, maybe the blob gets put into a localStorage object?
        // Then there is a function that pulls from there with an
        // arbitrary value. Either way, the image has to get put in
        // as an inline style, just the way it is...
        const params = new URLSearchParams(window.location.search);
        const config = params.get('config');
        // Let's take the page name and add a randomgen string
        const generatedId = config + Array.from({length: 12}, () => Math.random().toString(36)[2]).join('').match(/.{1,4}/g).join('-');
        contentContainer.classList.add(`bg-local-${generatedId}`);
        // Store the object under the generated id
        const appSageStorage = JSON.parse(localStorage.getItem('appSageStorage'));
        appSageStorage.pages[config].blobs[generatedId] = e.target.result;
        localStorage.setItem('appSageStorage', JSON.stringify(appSageStorage));
        // TailwindCSS doesn't appear to like entire image blobs LOL
        // This is a workaround. Though, we should figure out a way to not use
        // any blobs at all and have some kind of remote URL or local folder
        // that we write to.
        contentContainer.style.backgroundImage = `url(${e.target.result})`;
      }
    };
    reader.readAsDataURL(file);
  }
} // DATA OUT: null

// This function is a half-complete attempt as a catch-all way of editing any
// and all HTML elements, particularly those that may have been copy/pasted in.
// TODO: Fix any existing bugs, add support for niche circumstances like forms,
//       form fields, links/buttons, and other elements that require certain
//       types of extra attributes.
// DATA IN: HTML Element, <div>
function updateSidebarForTextElements(container) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `${generateMobileTabs()}`;
  activateTabs();

  const tagDropdown = document.createElement('select');
  tagDropdown.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
  const options = [
    { label: 'Paragraph', value: 'p' },
    { label: 'Heading 1', value: 'h1' },
    { label: 'Heading 2', value: 'h2' },
    { label: 'Heading 3', value: 'h3' },
    { label: 'Heading 4', value: 'h4' },
    { label: 'Heading 5', value: 'h5' },
    { label: 'Heading 6', value: 'h6' },
    { label: 'Image', value: 'img' },
    { label: 'Video', value: 'video' },
    { label: 'Audio', value: 'audio' },
    { label: 'Link', value: 'a' },
    { label: 'Form', value: 'form' },
    { label: 'Unordered List', value: 'ul' },
    { label: 'Ordered List', value: 'ol' },
    { label: 'List Item', value: 'li' },
    { label: 'Button', value: 'button' }
  ];

  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    tagDropdown.appendChild(option);
  });

  const textInput = document.createElement('textarea');
  textInput.type = 'text';
  textInput.placeholder = 'Enter content here...';
  textInput.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';

  tagDropdown.addEventListener('change', function () {
    const selectedTag = tagDropdown.value;
    let element = container.querySelector(selectedTag);

    if (!element) {
      element = document.createElement(selectedTag);
      container.innerHTML = '';
      container.appendChild(element);
    }

    element.textContent = textInput.value;
  });

  textInput.addEventListener('input', function () {
    const selectedTag = tagDropdown.value;
    let element = container.querySelector(selectedTag);

    if (element) {
      element.textContent = textInput.value;
    } else {
      element = document.createElement(selectedTag);
      element.textContent = textInput.value;
      container.innerHTML = '';
      container.appendChild(element);
    }
  });

  const sidebarTitle = document.createElement('div');
  sidebarTitle.innerHTML = '<strong>Edit Content:</strong>'
  sidebar.prepend(textInput);
  sidebar.prepend(tagDropdown);
  sidebar.prepend(sidebarTitle);
} // DATA OUT: null