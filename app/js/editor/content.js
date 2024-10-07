/*

  editor/content.js

*/

// This function creates a container for individual HTML elements. This is
// intended to make it easier to comprehend, within the code, movements of
// elements through the DOM and to be able to do things like add background
// images while still being able to give the actual element a background color
// so that legibility is still possible.
// TODO: Additionally, adding a background color to a button, for example,
//       creates confusing results since clicking that background doesn't
//       actually result in clicking the link. This needs to be fixed and
//       crafted more intentionally for certain elements.
// DATA IN: null
function addContentContainer() {
  const contentContainer = document.createElement('div');
  contentContainer.className = 'content-container pagecontent text-base'; // A new class specifically for content
  const contentTag = document.createElement('p'); // create a paragraph by default
  contentContainer.append(contentTag);

  enableEditContentOnClick(contentContainer);
  observeClassManipulation(contentContainer);
  addContentOptions(contentContainer);
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
    addContentOptions(contentContainer);
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
    const contentContainer = addContentContainer();
    column.appendChild(contentContainer);
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
} // DATA OUT: null

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
// DATA IN: ['HTML Element Event', 'HTML Element, <div>', 'String']
function generateMediaSrc(event, contentContainer, isPlaceholder) {
  const file = event.target.files ? event.target.files[0] : null;

  if (file || isPlaceholder) {
    const reader = new FileReader();

    reader.onload = async function (e) {
      let mediaElement = contentContainer.querySelector('img, video, audio');
      const mediaType = file ? file.type.split('/')[0] : null;

      if (!isPlaceholder) {
        if (mediaElement && mediaElement.tagName.toLowerCase() !== mediaType) {
          mediaElement.remove();
          mediaElement = null;
        }

        if (!mediaElement) {
          if (mediaType === 'image') {
            mediaElement = document.createElement('img');
          } else if (mediaType === 'video') {
            mediaElement = document.createElement('video');
            mediaElement.controls = true;
          } else if (mediaType === 'audio') {
            mediaElement = document.createElement('audio');
            mediaElement.controls = true;
          }
          contentContainer.appendChild(mediaElement);
        }

        mediaElement.src = e.target.result;

        // Store the media file in IndexedDB
        const mediaId = contentContainer.getAttribute('data-media-id') || Date.now().toString();
        await saveMediaToIndexedDB(file, mediaId);
        contentContainer.setAttribute('data-media-id', mediaId);
      } else {
        contentContainer.style.backgroundImage = `url(${e.target.result})`;
        contentContainer.classList.add(`bg-[url('${e.target.result}')]`);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      contentContainer.style.backgroundImage = `url(${event.target.value})`;
    }
  }
} // DATA OUT: null

// Helper functions for IndexedDB storage
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('mediaDatabase', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore('mediaStore', { keyPath: 'id' });
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };

    request.onerror = (event) => {
      reject('Error opening database');
    };
  });
}

async function saveMediaToIndexedDB(mediaBlob, mediaId) {
  const db = await openDatabase();
  const transaction = db.transaction(['mediaStore'], 'readwrite');
  const store = transaction.objectStore('mediaStore');
  const mediaEntry = { id: mediaId, mediaBlob };
  store.put(mediaEntry);
}

async function getMediaFromIndexedDB(mediaId) {
  const db = await openDatabase();
  const transaction = db.transaction(['mediaStore'], 'readonly');
  const store = transaction.objectStore('mediaStore');

  return new Promise((resolve, reject) => {
    const request = store.get(mediaId);
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject('Error fetching media');
  });
}

function displayMediaFromIndexedDB(contentContainer) {
  const mediaId = contentContainer.getAttribute('data-media-id');
  if (mediaId) {
    getMediaFromIndexedDB(mediaId).then((mediaEntry) => {
      if (mediaEntry) {
        const mediaUrl = URL.createObjectURL(mediaEntry.mediaBlob);
        const mediaElement = contentContainer.querySelector('img, video, audio');
        if (mediaElement) {
          mediaElement.src = mediaUrl;
        } else {
          contentContainer.style.backgroundImage = `url(${mediaUrl})`;
        }
      }
    }).catch((error) => {
      console.error('Error displaying media from IndexedDB:', error);
    });
  }
}

// This function is a half-complete attempt as a catch-all way of editing any
// and all HTML elements, particularly those that may have been copy/pasted in.
// DATA IN: HTML Element, <div>
function updateSidebarForTextElements(sidebar, container) {
  sidebar.innerHTML = `${generateSidebarTabs()}`;
  activateTabs();
  const targetElement = container.firstChild;
  let directEditing = false;

  let contentContainer;
  if (targetElement && ['IMG', 'VIDEO', 'AUDIO', 'A', 'BUTTON'].includes(targetElement.tagName)) {
    directEditing = true;
    contentContainer = targetElement;
  } else {
    contentContainer = container;
  }

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
    { label: 'Heading 6', value: 'span' },
    // { label: 'Form', value: 'form' },
    { label: 'Link / Button', value: 'a' },
    // { label: 'Button', value: 'button' },
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
  textInput.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';

  const mediaUrlInput = document.createElement('input');
  mediaUrlInput.type = 'text';
  mediaUrlInput.placeholder = 'Enter media URL...';
  mediaUrlInput.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*, video/*, audio/*'; // Accept multiple media types
  fileInput.className = 'shadow border rounded py-2 bg-[#ffffff] px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline';
  fileInput.onchange = function (event) {
    generateMediaSrc(event, contentContainer, false);
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

    if (selectedTag === 'img' || selectedTag === 'video' || selectedTag === 'audio') {
      element.src = mediaUrlInput.value || '/app/placeholder_media/lightmode_jpg/square_placeholder.jpg'; // Fallback to a placeholder if no URL
    } else {
      element.textContent = textInput.value;
    }

    // Call handleButtonFields for 'Link' selection
    if (['a', 'button'].includes(selectedTag)) {
      // Reload tab to ensure proper editing options for targetting the tag itself
      addContentOptions(tempContentContainer);
      tempContentContainer.addEventListener('click', function(e) { e.preventDefault(); });
    } else {
      const linkOpts = document.getElementById('linkOpts');
      if (linkOpts) linkOpts.remove();
    }

    // if (element.tagName === 'FORM') updateSidebarForTextElements(sidebar, tempContentContainer, true);
  });

  textInput.addEventListener('input', function () {
    const selectedTag = tagDropdown.value;
    let element;

    if (directEditing) {
      // This predicates that an img/video/audio (media) tag already exists
      element = contentContainer;
    } else {
      element = contentContainer.querySelector(selectedTag);
    }

    // If no element exists for the media tag, create one
    if (!element && !['img', 'video', 'audio'].includes(selectedTag)) {
      element = document.createElement(selectedTag);
      contentContainer.appendChild(element);
    }

    // If it's not a media tag, update the text
    if (element && !['img', 'video', 'audio'].includes(selectedTag)) {
      element.textContent = textInput.value;
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
      textInput.value = targetElement.textContent;
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
    formContainer.prepend(textInput);
    formContainer.prepend(titleElement);
    addTextOptions(sidebar, targetElement);
  } else {
    const linkOpts = document.getElementById('linkOpts');
    if (linkOpts) linkOpts.remove();

    sidebar.prepend(formContainer);
    formContainer.prepend(tagDropdown);
    formContainer.prepend(textInput);
    formContainer.prepend(mediaUrlInput);
    formContainer.prepend(fileInput);
    formContainer.prepend(titleElement);
    addTextOptions(sidebar, contentContainer);
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
  highlightEditingElement(contentContainer);
}

function handleButtonFields(formContainer, contentContainer, button) {
  const urlInput = document.createElement('input');
  urlInput.type = 'url';
  urlInput.placeholder = 'Button/Link URL';
  urlInput.className = 'mt-2 p-2 border border-slate-300 w-full';

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
      element.classList.add(...classesToTransfer);
    });
    container.classList.remove(...classesToTransfer);
  }
}


// Map to track transferred classes from container to child elements
const classTransferMap = new Map();

// Function to transfer class to child element
function transferClassToChild(container, className, childElement) {
  childElement.classList.add(className);
  container.classList.remove(className);

  if (!classTransferMap.has(container)) {
    classTransferMap.set(container, new Map());
  }
  const containerMap = classTransferMap.get(container);
  containerMap.set(className, childElement);
}

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

// Function to dispatch a custom event when a class is added
function dispatchClassAdded(container, className) {
  const event = new CustomEvent('classAdded', {
    detail: { className }
  });
  container.dispatchEvent(event);
}

// Function to dispatch a custom event when a class is removed
function dispatchClassRemoved(container, className) {
  const event = new CustomEvent('classRemoved', {
    detail: { className }
  });
  container.dispatchEvent(event);
}

// Modify class manipulation to dispatch events
function addClassToContainer(container, ...classNames) {
  classNames.forEach(className => {
    if (!container.classList.contains(className)) {
      container.classList.add(className);
      dispatchClassAdded(container, className); // Dispatch custom event for each class
    }
  });
}

function removeClassFromContainer(container, ...classNames) {
  classNames.forEach(className => {
    if (container.classList.contains(className)) {
      container.classList.remove(className);
      dispatchClassRemoved(container, className); // Dispatch custom event for each class
    }
  });
}

// Handle custom event for class added
function handleClassAddedEvent(event) {
  const container = event.target;
  const className = event.detail.className;

  // Logic to handle the class added to the container
  adjustClassesForInteractiveElements(container);
}

// Handle custom event for class removed
function handleClassRemovedEvent(event) {
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

// Setup listeners for custom events on the container
function observeClassManipulation(container) {
  container.addEventListener('classAdded', handleClassAddedEvent);
  container.addEventListener('classRemoved', handleClassRemovedEvent);
}