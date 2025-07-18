/*

  editor/content.js

*/

// This function creates a container for individual HTML elements. This is
// intended to make it easier to comprehend, within the code, movements of
// elements through the DOM and to be able to do things like add background
// images while still being able to give the actual element a background color
// so that legibility is still possible.
// DATA IN: null
function addContentContainer() {
  const contentContainer = document.createElement('div');
  contentContainer.className = 'content-container pagecontent w-auto'; // A new class specifically for content
  const contentTag = document.createElement('p'); // create a paragraph by default
  contentContainer.append(contentTag);

  displayMediaFromStorage(contentContainer.firstElementChild);
  enableEditContentOnClick(contentContainer);
  observeClassManipulation(contentContainer);
  addContentOptions(contentContainer);

  return contentContainer;
} // DATA OUT: HTML Element, <div class="pagecontent">
window.addContentContainer = addContentContainer;

// This function adds a lot of the standard editing options that should be
// available for all elements. This listens for any clicks on editable content
// and also adds more important editing options before the standard options,
// such as the actual text being added, hrefs for links, form fields, etc.
// DATA IN: HTML Element, <div>
function enableEditContentOnClick(contentContainer) {
  contentContainer.addEventListener('click', function (event) {
    event.stopPropagation();
    addContentOptions(contentContainer);
  });
} // DATA OUT: null
window.enableEditContentOnClick = enableEditContentOnClick;

// This function creates the button for adding content to the column currently
// being hovered over by the designer.
// DATA IN: HTML Element, <div>
function createAddContentButton(column) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['add-content']);
  button.className = `addContent highlightButton ugc-discard z-50 absolute hidden -bottom-12 left-24 bg-fruit-salad-500 hover:bg-fruit-salad-700 text-fuscous-gray-50 font-bold p-2 rounded-b h-12 w-16`;
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>`;
  button.addEventListener('click', function (event) {
    event.stopPropagation();
    const contentContainer = addContentContainer();
    column.appendChild(contentContainer);
    highlightEditingElement(column);
    addIdAndClassToElements();
  });
  // This creates a reliable hover effect for many nested elements
  // column.addEventListener('mouseover', function(event){
  //   event.stopPropagation();
  //   button.classList.add('block');
  //   button.classList.remove('hidden');
  // });
  // column.addEventListener('mouseout', function(event){
  //   event.stopPropagation();
  //   button.classList.add('hidden');
  //   button.classList.remove('block');
  // });
  return button;
} // DATA OUT: HTML Element, <button>
window.createAddContentButton = createAddContentButton;

// This function creates the button for deleting the content currently being
// edited. As the tooltip mentions, FOREVER. That's a long time!
// Currently, this button lives at the topbar nestled between the
// 'move content' buttons on its left and right.
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div id="sidebar-dynamic">']
function createRemoveContentButton(contentContainer) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['remove-content'])
  button.className = 'removeContent ugc-discard bg-russett-500 hover:bg-russett-700 text-fuscous-gray-50 font-bold p-2 rounded h-12 w-12 mx-auto';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L409.6 295.8l42.1-42.1L474.3 231l11.3-11.3-33.9-33.9-62.1-62.1L355.7 89.8l-11.3 11.3-22.6 22.6-57.8 57.8L38.8 5.1zM306.2 214.7l50.5-50.5c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-47.8 47.8-25.4-19.9zM195.5 250l-72.9 72.9c-10.4 10.4-18 23.3-22.2 37.4L65 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2l88.3-88.3-77.9-61.4-27.6 27.6c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l24.9-24.9L195.5 250zM224 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9l-78.1 23 23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM426.7 18.7L412.3 33.2 389.7 55.8 378.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L517.3 18.7c-25-25-65.5-25-90.5 0z"/></svg>';
  button.addEventListener('click', function () {
    showConfirmationModal('Are you sure you want to delete this content?', () => {
      contentContainer.remove();
      document.getElementById('sidebar-dynamic').innerHTML = '';
    });
  });
  return button;
} // DATA OUT: HTML Element, <button>
window.createRemoveContentButton = createRemoveContentButton;

// This function creates the button for moving the element the content belongs
// to upward and downward in the column. Currently, these buttons live at the
// top of the editor sidebar when the grid is/has been selected for editing.
// DATA IN: ['HTML Element, <div>', 'String:up/down']
function createVerticalMoveContentButton(contentContainer, direction) {
  const button = document.createElement('button');
  button.className = 'moveContent ugc-discard bg-romantic-700 hover:bg-romantic-800 text-fuscous-gray-50 font-bold p-2 rounded h-12 w-16';
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
window.createVerticalMoveContentButton = createVerticalMoveContentButton;

// This function and the one below it creates various buttons to choose from
// available elements that can be created.
// DATA IN: HTML Element, <div>
function addContentOptions(contentContainer) {
  const sidebar = document.getElementById('sidebar-dynamic');
  updateSidebarForTextElements(sidebar, contentContainer);

  const moveButtons = document.createElement('div');
  moveButtons.className = 'flex justify-between my-2';
  moveButtons.id = 'moveContentButtons';
  sidebar.prepend(moveButtons);

  let multipleContent;
  let contentCount;
  if (contentContainer.classList.contains('pastedHtmlContainer')) {
    let gridCount = document.getElementById('page').querySelectorAll('.pagegrid').length
    contentCount = document.getElementById('page').querySelectorAll('.pastedHtmlContainer').length
    const flexCount = document.getElementById('page').querySelectorAll('.pageflex').length
    contentCount = gridCount + contentCount + flexCount;
  } else {
  // Minus one to remove the 'Add Content' button from the count
    multipleContent = contentContainer.parentNode === null ? contentContainer.children : contentContainer.parentNode.children;
    contentCount = multipleContent.length - 1;
  }
  if (contentCount > 1) moveButtons.appendChild(createVerticalMoveContentButton(contentContainer, 'up'));
  moveButtons.appendChild(createRemoveContentButton(contentContainer));
  if (contentCount > 1) moveButtons.appendChild(createVerticalMoveContentButton(contentContainer, 'down'));

  highlightEditingElement(contentContainer);
  addIdAndClassToElements();
} // DATA OUT: null
window.addContentOptions = addContentOptions;

// This cobbles together all the needed bits for adding/editing form fields.
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div>']
function updateSidebarFields(form, sidebarForm, submitButton, inputTypes) {
  // Remove all existing field editors except the add new field section
  const existingEditors = sidebarForm.querySelectorAll('.field-editor');
  existingEditors.forEach(editor => editor.remove());

  // Iterate over form inputs and create corresponding editors in the sidebar form
  form.querySelectorAll('input, select, textarea').forEach(input => {
    if (input === submitButton) return;

    const fieldEditor = document.createElement('div');
    fieldEditor.className = 'field-editor group my-4 bg-pearl-bush-50';

    const idLabel = document.createElement('label');
    idLabel.setAttribute('for', 'idField');
    idLabel.textContent = 'Input ID:';
    idLabel.className = 'block text-fuscous-gray-700 text-sm font-bold mb-2';

    const idField = document.createElement('input');
    idField.setAttribute('name', 'idField');
    idField.type = 'text';
    idField.value = input.id;
    idField.className = 'shadow border rounded py-2 px-3 text-fuscous-gray-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
    idField.oninput = function () {
      input.id = idField.value;
    };

    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'nameField');
    nameLabel.textContent = 'Input Name:';
    nameLabel.className = 'block text-fuscous-gray-700 text-sm font-bold mb-2';

    const nameField = document.createElement('input');
    nameField.setAttribute('name', 'nameField');
    nameField.type = 'text';
    nameField.value = input.name;
    nameField.className = 'shadow border rounded py-2 px-3 text-fuscous-gray-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
    nameField.oninput = function () {
      input.name = nameField.value;
    };

    const fieldLabel = document.createElement('label');
    fieldLabel.setAttribute('for', 'fieldInput');
    fieldLabel.textContent = 'Edit Field Label:';
    fieldLabel.className = 'block text-fuscous-gray-700 text-sm font-bold mb-2';

    const fieldInput = document.createElement('input');
    fieldInput.setAttribute('name', 'fieldInput');
    fieldInput.type = 'text';
    fieldInput.value = input.placeholder;
    fieldInput.className = 'shadow border rounded py-2 px-3 text-fuscous-gray-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
    fieldInput.oninput = function () {
      input.placeholder = fieldInput.value;
    };

    const fieldTypeLabel = document.createElement('label');
    fieldTypeLabel.setAttribute('for', 'fieldType');
    fieldTypeLabel.textContent = 'Edit Field Type:';
    fieldTypeLabel.className = 'block text-fuscous-gray-700 text-sm font-bold mb-2';

    const fieldType = document.createElement('select');
    fieldType.setAttribute('name', 'fieldType');
    fieldType.className = 'shadow border rounded py-2 px-3 text-fuscous-gray-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
    inputTypes.forEach(type => {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
      if (type === input.type) {
        option.selected = true;
      }
      fieldType.appendChild(option);
    });
    fieldType.onchange = function () {
      input.type = fieldType.value;
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'bg-russett-500 hover:bg-russett-700 text-fuscous-gray-50 font-bold py-1.5 px-4 rounded mt-2 inline-block';
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
window.updateSidebarFields = updateSidebarFields;

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
window.moveVertical = moveVertical;

// This function makes those all-caps labels with the icon to the left of them.
// DATA IN: null
function createLabelAllDevices() {
  const label = document.createElement('span');
  label.className = 'inline-block col-span-5 text-fuscous-gray-700 text-xs uppercase mt-2';
  label.textContent = 'All Devices';
  const breakpoints = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];
  breakpoints.forEach(bp => {
    const responsiveIcon = document.createElement('span');
    responsiveIcon.className = 'h-3 w-3 mr-2 inline-block';
    responsiveIcon.innerHTML = `${AppstartEditorIcons['responsive'][bp]}`;
    label.prepend(responsiveIcon);
  });
  return label;
} // DATA OUT: HTML Element, <span>
window.createLabelAllDevices = createLabelAllDevices;

// This function helps media tags generate the correct text needed for the
// value of their `src` attribute.
// DATA IN: ['HTML Element Event', 'HTML Element, <div>', 'String']
function generateMediaUrl(event, contentContainer, background) {
  const file = event.target.files ? event.target.files[0] : null;

  if (file) {
    const reader = new FileReader();

    reader.onload = async function (e) {

      // Store the media file in IndexedDB or file system (depending on deployment/package)
      const mediaId = contentContainer.getAttribute('data-media-id') || Date.now().toString();
      saveMediaToStorage(file, mediaId).then(() => {
        contentContainer.setAttribute('data-media-id', mediaId);
        let result = e.target.result;
        getMediaFromStorage(mediaId).then(fileUrl => {
          result = e.target.result;
          if (background) {
            contentContainer.style.backgroundImage = `url(${result})`;
          } else {
            contentContainer.src = result;
          }
        })
      })
    };

    reader.readAsDataURL(file);
  }
} // DATA OUT: null
window.generateMediaUrl = generateMediaUrl;

async function saveMediaToStorage(mediaBlob, mediaId) {
  // Uses IndexedDB
  const db = await openDatabase();
  const transaction = db.transaction(['mediaStore'], 'readwrite');
  const store = transaction.objectStore('mediaStore');
  const mediaEntry = { id: mediaId, blob: mediaBlob, url: './placeholder_media/lightmode_jpg/landscape_placeholder.jpg' };
  mediaEntry.url = URL.createObjectURL(mediaEntry.blob);
  store.put(mediaEntry);
}
window.saveMediaToStorage = saveMediaToStorage;

async function getMediaFromStorage(mediaId) {
  // Uses IndexedDB
  const db = await openDatabase();
  const transaction = db.transaction(['mediaStore'], 'readonly');
  const store = transaction.objectStore('mediaStore');

  return new Promise((resolve, reject) => {
    const request = store.get(mediaId);
    request.onsuccess = (event) => {resolve(event.target.url); console.log(event.target.url);}
    request.onerror = (event) => reject('Error fetching media:', event);
  });
}
window.getMediaFromStorage = getMediaFromStorage;

async function displayMediaFromStorage(targetElement) {
  const mediaId = targetElement.getAttribute('data-media-id');

  if (mediaId) {
    await getMediaFromStorage(mediaId).then((mediaEntry) => {
      if (mediaEntry) {
        const mediaElement = ['IMG', 'VIDEO', 'AUDIO'].includes(targetElement.tagName);
        let mediaUrl;
        if (typeof mediaEntry.url !== undefined) mediaUrl = mediaEntry;
        if (!mediaUrl) {
          mediaUrl = mediaEntry.url === './placeholder_media/lightmode_jpg/landscape_placeholder.jpg' ? URL.createObjectURL(mediaEntry.blob) : mediaEntry.url;
          mediaEntry.url = mediaUrl;
        }
        if (mediaElement) {
          targetElement.src = mediaUrl;
        } else {
          if (targetElement.classList.contains('pagecontainer') || targetElement.classList.contains('pagegrid') || targetElement.classList.contains('pagecolumn')){
            targetElement.style.backgroundImage = `url(${mediaUrl})`;
          } else {
            targetElement.parent.style.backgroundImage = `url(${mediaUrl})`;
          }
        }
      }
    }).catch((error) => {
      console.error('Error displaying media from IndexedDB', error);
    });
  }
}
window.displayMediaFromStorage = displayMediaFromStorage;

// This function is a half-complete attempt as a catch-all way of editing any
// and all HTML elements, particularly those that may have been copy/pasted in.
// DATA IN: HTML Element, <div>
function updateSidebarForTextElements(sidebar, container) {
  sidebar.innerHTML = `${generateSidebarTabs()}`;
  activateTabs();
  const targetElement = container.firstElementChild;
  let directEditing = false;

  let contentContainer;
  if (targetElement && ['IMG', 'VIDEO', 'AUDIO', 'A', 'BUTTON'].includes(targetElement.tagName)) {
    directEditing = true;
    contentContainer = targetElement;
  } else {
    contentContainer = container;
  }

  const tagDropdown = document.createElement('select');
  tagDropdown.className = 'shadow border rounded py-2 px-3 text-fuscous-gray-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
  const options = [
    { label: 'Paragraph', value: 'p' },
    { label: 'Heading 1', value: 'h1' },
    { label: 'Heading 2', value: 'h2' },
    { label: 'Heading 3', value: 'h3' },
    { label: 'Heading 4', value: 'h4' },
    { label: 'Heading 5', value: 'h5' },
    { label: 'Heading 6', value: 'h6' },
    { label: 'Line of text', value: 'span' },
    { label: 'Block of text', value: 'div' },
    // { label: 'Form', value: 'form' },
    { label: 'Link / Button', value: 'a' },
    { label: 'Button', value: 'button' },
    { label: 'Image', value: 'img' },
    { label: 'Video', value: 'video' },
    { label: 'Audio', value: 'audio' }
  ];

  const formContainer = document.createElement('div');

  options.forEach(opt => {
    const option = document.createElement('option');
    option.value = opt.value;
    option.textContent = opt.label;
    tagDropdown.appendChild(option);
  });

  const textInput = document.createElement('textarea');
  textInput.placeholder = 'Enter content here...';
  textInput.className = 'shadow border rounded py-2 px-3 text-fuscous-gray-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';

  const srOnly = document.createElement('input');
  srOnly.placeholder = 'Text for screen readers';
  srOnly.className = 'shadow border hidden rounded py-2 px-3 text-fuscous-gray-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
  srOnly.setAttribute('data-extra-info', 'If your element relies on imagery or visual references to make sense, add text here to give more detail.');
  if (advancedMode === true) srOnly.classList.remove('hidden');

  srOnly.addEventListener('change', function () {
    const selectedTag = tagDropdown.value;
    let element;
    const srOnlyElement = document.createElement('span')
    srOnlyElement.className = 'sr-only';
    srOnlyElement.textContent = srOnly.value;

    if (directEditing) {
      // This predicates that an img/video/audio (media) tag already exists
      element = contentContainer;
    } else {
      element = contentContainer.querySelector(selectedTag);
    }

    // If no element exists for the media tag, create one
    if (!element && !['img', 'video', 'audio'].includes(selectedTag)) {
      element = document.createElement(selectedTag);
      element.appendChild(srOnlyElement);
      contentContainer.appendChild(element);
    }

    // If it's not a media tag, update the text
    if (element && !['img', 'video', 'audio'].includes(selectedTag)) {
      element.textContent = textInput.value;
      element.appendChild(srOnlyElement);
    }
  });

  const mediaUrlInput = document.createElement('input');
  mediaUrlInput.type = 'text';
  mediaUrlInput.placeholder = 'Enter media URL...';
  mediaUrlInput.className = 'shadow border rounded py-2 px-3 text-fuscous-gray-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*, video/*, audio/*'; // Accept multiple media types
  fileInput.className = 'shadow border rounded py-2 bg-[#ffffff] px-3 text-fuscous-gray-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
  fileInput.onchange = function (event) {
    generateMediaUrl(event, targetElement, false);
  }

  function toggleInputs(selectedTag) {
    if (['img', 'video', 'audio'].includes(selectedTag)) {
      mediaUrlInput.style.display = 'block';
      fileInput.style.display = 'block';
      textInput.style.display = 'none';
    } else {
      mediaUrlInput.style.display = 'none';
      fileInput.style.display = 'none';
      textInput.style.display = 'block';
    }
  }

  tagDropdown.addEventListener('change', function () {
    const selectedTag = tagDropdown.value;
    let element;
    let tempContentContainer;

    if (!contentContainer.classList.contains('pagecontent')) {
      tempContentContainer = contentContainer.parentNode;
      element = tempContentContainer.querySelector(selectedTag);
    } else {
      tempContentContainer = contentContainer;
      element = tempContentContainer.querySelector(selectedTag);
    }

    if (element === null) {
      element = document.createElement(selectedTag);
      tempContentContainer.innerHTML = '';  // Clear existing content within tempContentContainer
      tempContentContainer.appendChild(element);
    }

    toggleInputs(selectedTag);


    // if (targetElement.classList.contains('pagecontent')) {
    //   contentContainer.style.backgroundImage = `url(${event.target.value})`;
    // } else {
    // targetElement.style.backgroundImage = `url(${e.target.result})`;
    // targetElement.classList.add(`bg-[url('${e.target.result}')]`);

    if (selectedTag === 'img' || selectedTag === 'video' || selectedTag === 'audio') {
      element.src = mediaUrlInput.value || './placeholder_media/lightmode_jpg/square_placeholder.jpg'; // Fallback to a placeholder if no URL
    } else {
      element.textContent = textInput.value;
    }

    // Call handleButtonFields for 'Link' selection
    if (['a', 'button'].includes(selectedTag)) {
      // Reload tab to ensure proper editing options for targetting the tag itself
      tempContentContainer.addEventListener('click', function(e) { e.preventDefault(); });
    } else {
      const linkOpts = document.getElementById('linkOpts');
      if (linkOpts) linkOpts.remove();
    }
    // Don't call addContentOptions here to prevent multiple rendering of text options
    // addContentOptions(tempContentContainer);
    // if (element.tagName === 'FORM') updateSidebarForTextElements(sidebar, tempContentContainer, true);
  });

  textInput.addEventListener('input', function () {
    const selectedTag = tagDropdown.value;
    let element;
    const srOnlyElement = document.createElement('span')
    srOnlyElement.className = 'sr-only';
    srOnlyElement.textContent = srOnly.value;

    if (directEditing) {
      // This predicates that an img/video/audio (media) tag already exists
      element = contentContainer;
    } else {
      element = contentContainer.querySelector(selectedTag);
    }

    // If no element exists for the media tag, create one
    if (!element && !['img', 'video', 'audio'].includes(selectedTag)) {
      element = document.createElement(selectedTag);
      element.appendChild(srOnlyElement);
      contentContainer.appendChild(element);
    }

    // If it's not a media tag, update the text
    if (element && !['img', 'video', 'audio'].includes(selectedTag)) {
      element.textContent = textInput.value;
      element.appendChild(srOnlyElement);
    }
  });

  mediaUrlInput.addEventListener('input', function () {
    const selectedTag = tagDropdown.value;
    let element = contentContainer.querySelector(selectedTag);

    if (element && ['img', 'video', 'audio'].includes(selectedTag)) {
      element.src = mediaUrlInput.value;
    }
  });

  if (targetElement) {
    if (['IMG', 'VIDEO', 'AUDIO'].includes(targetElement.tagName)) {
      mediaUrlInput.value = targetElement.src;
    } else {
      textInput.value = getTextWithoutSROnly(targetElement);
      if (typeof targetElement.children !== 'undefined') {
        const srOnlySpan = targetElement.querySelector('.sr-only');
        if (srOnlySpan) {
          srOnly.value = srOnlySpan.textContent;
        }
      }
    }
    tagDropdown.value = targetElement.tagName.toLowerCase();
    toggleInputs(tagDropdown.value);
  }

  const titleElement = document.createElement('h2');
  titleElement.textContent = 'Editing Content';
  titleElement.className = 'font-bold text-xl';


  if (targetElement && ['A', 'BUTTON'].includes(targetElement.tagName)) {
    handleButtonFields(formContainer, contentContainer, targetElement);

    sidebar.prepend(formContainer);
    formContainer.prepend(tagDropdown);
    formContainer.prepend(srOnly);
    formContainer.prepend(textInput);
    formContainer.prepend(titleElement);
  } else {
    const linkOpts = document.getElementById('linkOpts');
    if (linkOpts) linkOpts.remove();

    sidebar.prepend(formContainer);
    formContainer.prepend(tagDropdown);
    formContainer.prepend(srOnly);
    formContainer.prepend(textInput);
    formContainer.prepend(mediaUrlInput);
    formContainer.prepend(fileInput);
    formContainer.prepend(titleElement);
  }

  // Add text editing options at the top for text-based elements (after content form, before standard styling)
  const isTextBasedElement = targetElement ?
    ['A', 'BUTTON'].includes(targetElement.tagName) :
    (contentContainer.firstElementChild && !['IMG', 'VIDEO', 'AUDIO'].includes(contentContainer.firstElementChild.tagName));

  if (isTextBasedElement) {
    const elementToApplyTo = targetElement && ['A', 'BUTTON'].includes(targetElement.tagName) ? targetElement : contentContainer;
    addTextOptions(sidebar, elementToApplyTo);
  }

  // Standard editing options
  addEditableBorders(sidebar, contentContainer);
  addEditableOpacity(sidebar, contentContainer);
  addEditableBackgroundColor(sidebar, contentContainer);
  addEditableBackgroundImage(sidebar, contentContainer);
  addEditableBackgroundImageURL(sidebar, contentContainer);
  addEditableBackgroundFeatures(sidebar, contentContainer);
  addEditableMarginAndPadding(sidebar, contentContainer);
  addEditableDimensions(sidebar, contentContainer);
  addManualClassEditor(sidebar, contentContainer);
  addManualCssEditor(sidebar, contentContainer);
  addManualHtmlElement(sidebar, contentContainer);
  addManualJsEditor(sidebar, contentContainer);
  highlightEditingElement(contentContainer);
  addIdAndClassToElements();
}
window.updateSidebarForTextElements = updateSidebarForTextElements;

function getTextWithoutSROnly(element) {
  const clonedElement = element.cloneNode(true);
  if (typeof clonedElement.children === 'undefined') {
    return '';
  } else {
    // Remove all elements with the class 'sr-only'
    clonedElement.querySelectorAll('.sr-only').forEach(el => el.remove());

    return clonedElement.textContent.trim();
  }
}
window.getTextWithoutSROnly = getTextWithoutSROnly;

function handleButtonFields(formContainer, contentContainer, button) {
  const urlInput = document.createElement('input');
  urlInput.type = 'url';
  urlInput.placeholder = 'Button/Link URL';
  urlInput.className = 'mt-2 p-2 border border-pearl-bush-300 w-full';

  const checkboxLabel = document.createElement('label');
  checkboxLabel.setAttribute('for', 'checkbox');
  checkboxLabel.textContent = ' Open in new tab';
  checkboxLabel.className = 'inline-flex items-center mt-2';

  const checkbox = document.createElement('input');
  checkbox.setAttribute('name', 'checkbox');
  checkbox.type = 'checkbox';
  checkbox.className = 'ml-2';

  if (button) {
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
    button.href = urlInput.value;
    button.target = checkbox.checked ? '_blank' : '';
  };

  urlInput.oninput = buttonUpdate;
  checkbox.onchange = buttonUpdate;
  const linkOpts = document.createElement('div');
  linkOpts.id = 'linkOpts';

  linkOpts.append(urlInput);
  linkOpts.append(checkboxLabel);
  formContainer.append(linkOpts);
}
window.handleButtonFields = handleButtonFields;

// Function to transfer class to child element
function transferClassToChild(container, className, childElement) {
  // Map to track transferred classes from container to child elements
  const classTransferMap = new Map();
  childElement.classList.add(className);
  container.classList.remove(className);

  if (!classTransferMap.has(container)) {
    classTransferMap.set(container, new Map());
  }
  const containerMap = classTransferMap.get(container);
  containerMap.set(className, childElement);
}
window.transferClassToChild = transferClassToChild;

// Function to adjust classes for interactive elements
function adjustClassesForInteractiveElements(container) {
  const excludedClasses = ['content-container', 'pagecontent'];
  const interactiveElements = container.querySelectorAll('a, button, input, textarea, select, label, iframe, details, summary');

  if (interactiveElements.length === 0) {
    return;
  }

  const containerClasses = Array.from(container.classList);
  const classesToTransfer = containerClasses.filter(cls => !excludedClasses.includes(cls));

  if (classesToTransfer.length > 0) {
    interactiveElements.forEach(element => {
      classesToTransfer.forEach(className => {
        transferClassToChild(container, className, element);
      });
    });
  }
}
window.adjustClassesForInteractiveElements = adjustClassesForInteractiveElements;

// Function to dispatch a custom event when a class is added
function dispatchClassAdded(container, className) {
  const event = new CustomEvent('classAdded', {
    detail: { className }
  });
  container.dispatchEvent(event);
}
window.dispatchClassAdded = dispatchClassAdded;

// Function to dispatch a custom event when a class is removed
function dispatchClassRemoved(container, className) {
  const event = new CustomEvent('classRemoved', {
    detail: { className }
  });
  container.dispatchEvent(event);
}
window.dispatchClassRemoved = dispatchClassRemoved;

// Modify class manipulation to dispatch events
function addClassToContainer(container, ...classNames) {
  classNames.forEach(className => {
    if (!container.classList.contains(className)) {
      container.classList.add(className);
      dispatchClassAdded(container, className); // Dispatch custom event for each class
    }
  });
}
window.addClassToContainer = addClassToContainer;

function removeClassFromContainer(container, ...classNames) {
  classNames.forEach(className => {
    if (container.classList.contains(className)) {
      container.classList.remove(className);
      dispatchClassRemoved(container, className); // Dispatch custom event for each class
    }
  });
}
window.removeClassFromContainer = removeClassFromContainer;

// Handle custom event for class added
function handleClassAddedEvent(event) {
  const container = event.target;
  const className = event.detail.className;

  // Logic to handle the class added to the container
  adjustClassesForInteractiveElements(container);
}
window.handleClassAddedEvent = handleClassAddedEvent;

// Handle custom event for class removed
function handleClassRemovedEvent(event) {
  // Map to track transferred classes from container to child elements
  const classTransferMap = new Map();
  const container = event.target;
  const className = event.detail.className;

  // If the class was removed from the container, remove it from the child elements too
  const containerMap = classTransferMap.get(container);
  if (containerMap && containerMap.has(className)) {
    const childElement = containerMap.get(className);
    childElement.classList.remove(className);
    containerMap.delete(className);  // Clean up the mapping
  }
}
window.handleClassRemovedEvent = handleClassRemovedEvent;

// Setup listeners for custom events on the container
function observeClassManipulation(container) {
  container.addEventListener('classAdded', handleClassAddedEvent);
  container.addEventListener('classRemoved', handleClassRemovedEvent);
}
window.observeClassManipulation = observeClassManipulation;
