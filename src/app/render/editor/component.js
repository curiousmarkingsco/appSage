/*

  editor/component.js

*/

// Component data management functions
async function saveComponentData(pageId, componentId, componentName, data) {
  try {
    // Store in IndexedDB with component-specific key
    const key = `${pageId}:${componentName}:${componentId}`;
    await saveBlobToIndexedDB(key, data);

    // Update cache for immediate access
    if (!window._componentDataCache) window._componentDataCache = {};
    if (!window._componentDataCache[pageId]) window._componentDataCache[pageId] = {};
    if (!window._componentDataCache[pageId][componentName]) window._componentDataCache[pageId][componentName] = {};
    window._componentDataCache[pageId][componentName][componentId] = data;

  } catch (error) {
    console.error(`Failed to save component data for ${componentName}:${componentId}`, error);
  }
}
window.saveComponentData = saveComponentData;

async function loadComponentData(pageId, componentId, componentName) {
  try {
    // Try cache first
    if (window._componentDataCache &&
        window._componentDataCache[pageId] &&
        window._componentDataCache[pageId][componentName] &&
        window._componentDataCache[pageId][componentName][componentId]) {
      return window._componentDataCache[pageId][componentName][componentId];
    }

    // Load from IndexedDB
    const key = `${pageId}:${componentName}:${componentId}`;
    const data = await loadBlobFromIndexedDB(key);

    // Update cache
    if (data) {
      if (!window._componentDataCache) window._componentDataCache = {};
      if (!window._componentDataCache[pageId]) window._componentDataCache[pageId] = {};
      if (!window._componentDataCache[pageId][componentName]) window._componentDataCache[pageId][componentName] = {};
      window._componentDataCache[pageId][componentName][componentId] = data;
    }

    return data;
  } catch (error) {
    console.error(`Failed to load component data for ${componentName}:${componentId}`, error);
    return null;
  }
}
window.loadComponentData = loadComponentData;

async function deleteComponentData(pageId, componentId, componentName) {
  try {
    // Remove from IndexedDB
    const key = `${pageId}:${componentName}:${componentId}`;
    const db = await openDB();
    const transaction = db.transaction('blobs', 'readwrite');
    const store = transaction.objectStore('blobs');
    await store.delete(key);

    // Remove from cache
    if (window._componentDataCache &&
        window._componentDataCache[pageId] &&
        window._componentDataCache[pageId][componentName] &&
        window._componentDataCache[pageId][componentName][componentId]) {
      delete window._componentDataCache[pageId][componentName][componentId];
    }

  } catch (error) {
    console.error(`Failed to delete component data for ${componentName}:${componentId}`, error);
  }
}
window.deleteComponentData = deleteComponentData;

// Auto-save component data when form inputs change
function setupComponentDataAutoSave(componentContainer, formElement) {
  const componentId = componentContainer.getAttribute('data-component-id');
  const componentName = componentContainer.getAttribute('data-component-name');
  const pageId = getPageId();

  if (!componentId || !componentName || !pageId) {
    console.warn('Missing required attributes for component data auto-save');
    return;
  }

  // Listen for changes in the form
  formElement.addEventListener('input', async function(e) {
    const formData = new FormData(formElement);
    const data = {};

    // Convert FormData to regular object
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    // Save the data
    await saveComponentData(pageId, componentId, componentName, data);

    // Trigger component update if there's an update function
    const updateFunctionName = `update${componentName.charAt(0).toUpperCase() + componentName.slice(1)}`;
    if (window[updateFunctionName]) {
      window[updateFunctionName](componentContainer, data);
    }
  });

  // Also listen for change events (for selects, checkboxes, etc.)
  formElement.addEventListener('change', async function(e) {
    const formData = new FormData(formElement);
    const data = {};

    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    await saveComponentData(pageId, componentId, componentName, data);

    const updateFunctionName = `update${componentName.charAt(0).toUpperCase() + componentName.slice(1)}`;
    if (window[updateFunctionName]) {
      window[updateFunctionName](componentContainer, data);
    }
  });
}
window.setupComponentDataAutoSave = setupComponentDataAutoSave;

// Load and populate component data into the sidebar form
async function populateComponentForm(componentContainer, formElement) {
  const componentId = componentContainer.getAttribute('data-component-id');
  const componentName = componentContainer.getAttribute('data-component-name');
  const pageId = getPageId();

  if (!componentId || !componentName || !pageId) {
    console.warn('Missing required attributes for component form population');
    return;
  }

  const data = await loadComponentData(pageId, componentId, componentName);

  if (data) {
    // Populate form fields with saved data
    Object.keys(data).forEach(key => {
      const field = formElement.querySelector(`[name="${key}"]`);
      if (field) {
        if (field.type === 'checkbox') {
          field.checked = Boolean(data[key]);
        } else if (field.type === 'radio') {
          if (field.value === data[key]) {
            field.checked = true;
          }
        } else {
          field.value = data[key];
        }
      }
    });

  }
}
window.populateComponentForm = populateComponentForm;

/*

  editor/component.js

*/

// This function makes it so that when you click on a component, the editing options
// will be revealed in the sidebar to the left of the screen. It does this by
// first making the label and supporting elements for moving and removing the
// component, and then adding the editor buttons, dropdowns, etc.
// Additionally, it now creates an isolated editing environment using #componentSteps
// DATA IN: HTML Element, <div>
function enableEditComponentOnClick(component) {
  component.addEventListener('click', function (event) {
    event.stopPropagation();
    enterComponentEditingMode(component);
  });
} // DATA OUT: null
window.enableEditComponentOnClick = enableEditComponentOnClick;

// Creates and manages the isolated component editing environment
function enterComponentEditingMode(component) {
  createComponentStepsOverlay();
  const componentSteps = document.getElementById('componentSteps');

  // Clone the component for isolated editing (get the most up-to-date version)
  const componentClone = component.cloneNode(true);
  componentClone.classList.add('component-editing-active');

  // Clear and prepare the componentSteps container
  componentSteps.innerHTML = '';
  componentSteps.appendChild(componentClone);

  // Show the overlay and hide the main page
  showComponentStepsOverlay();

  // Set up editing options in the sidebar
  addComponentOptions(componentClone);

  // Store reference to original component for syncing
  componentSteps.setAttribute('data-original-component-id', component.getAttribute('data-component-id') || '');
  componentClone.setAttribute('data-is-editing-clone', 'true');

  // Add exit button to return to page editing
  addExitComponentEditingButton();

  // Enable style editing for the component and its children
  enableStyleEditingForComponent(componentClone);
}
window.enterComponentEditingMode = enterComponentEditingMode;

// Creates the #componentSteps overlay if it doesn't exist
function createComponentStepsOverlay() {
  let componentSteps = document.getElementById('componentSteps');
  if (!componentSteps) {
    const page = document.getElementById('page');
    componentSteps = document.createElement('div');
    componentSteps.id = 'componentSteps';
    componentSteps.className = 'fixed inset-0 z-40 bg-pearl-bush-100 p-8 hidden overflow-auto';
    componentSteps.style.marginLeft = '18rem'; // Match the page margin
    componentSteps.style.width = 'calc(100% - 18rem)'; // Match the page width
    componentSteps.style.display = 'none'; // Explicitly start hidden to override CSS

    // Insert after the page element
    page.parentNode.append(componentSteps, page.nextSibling);
  }
}
window.createComponentStepsOverlay = createComponentStepsOverlay;

function enableStyleEditingForComponent(component) {
  // Make sure the component and its children can be styled
  component.setAttribute('data-component-editing', 'true');

  // Enable click-to-edit for all elements within the component
  const allElements = component.querySelectorAll('*');
  allElements.forEach(element => {
    element.addEventListener('click', function(e) {
      e.stopPropagation();

      // Clear previous selections
      document.querySelectorAll('.editor-selected').forEach(el => {
        el.classList.remove('editor-selected');
      });

      // Select this element
      element.classList.add('editor-selected');

      // Show styling options in sidebar
      if (window.addComponentOptions) {
        addComponentOptions(element);
      }
    });
  });
}
window.enableStyleEditingForComponent = enableStyleEditingForComponent;

// Shows the componentSteps overlay and hides the main page
function showComponentStepsOverlay() {
  const componentSteps = document.getElementById('componentSteps');
  const page = document.getElementById('page');

  if (componentSteps && page) {
    componentSteps.classList.remove('hidden');
    // Explicitly set display to flex to ensure it shows properly
    componentSteps.style.display = 'flex';
    page.classList.add('hidden');
  }
}
window.showComponentStepsOverlay = showComponentStepsOverlay;

// Hides the componentSteps overlay and shows the main page
function hideComponentStepsOverlay() {
  const componentSteps = document.getElementById('componentSteps');
  const page = document.getElementById('page');

  if (componentSteps && page) {
    componentSteps.classList.add('hidden');
    // Explicitly set display to none to override CSS specificity
    componentSteps.style.display = 'none';

    // Ensure page is visible by removing hidden class and clearing any inline styles
    page.classList.remove('hidden');
    page.style.display = '';

    // Clear the componentSteps content
    componentSteps.innerHTML = '';
    componentSteps.removeAttribute('data-original-component-id');
  }
}
window.hideComponentStepsOverlay = hideComponentStepsOverlay;

// Ensures the page element is visible on load (in case of persisted hidden state)
function ensurePageVisibility() {
  const page = document.getElementById('page');
  const componentSteps = document.getElementById('componentSteps');

  if (page) {
    // Always ensure page is visible on load
    page.classList.remove('hidden');
    page.style.display = '';
  }

  if (componentSteps) {
    // Ensure componentSteps is properly hidden on load
    componentSteps.classList.add('hidden');
    componentSteps.style.display = 'none';
  }
}
window.ensurePageVisibility = ensurePageVisibility;

// Call on DOM content loaded to ensure proper state
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ensurePageVisibility);
} else {
  ensurePageVisibility();
}

// Adds an exit button to return to page editing mode
function addExitComponentEditingButton() {
  const sidebar = document.getElementById('sidebar-dynamic');
  const exitButton = document.createElement('button');
  exitButton.className = 'w-full mb-4 bg-russett-500 hover:bg-russett-700 text-fuscous-gray-50 font-bold py-2 px-4 rounded';
  exitButton.innerHTML = '← Exit Component Editing';
  exitButton.addEventListener('click', exitComponentEditingMode);

  // Insert at the top of the sidebar
  sidebar.insertBefore(exitButton, sidebar.firstChild);
}
window.addExitComponentEditingButton = addExitComponentEditingButton;

// Exits component editing mode and returns to page editing
function exitComponentEditingMode() {
  syncComponentChangesToPage();
  hideComponentStepsOverlay();

  // Clear sidebar
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = '<p>No content to edit. Add content by making a grid or column.</p>';

  // Remove any editing highlights
  removeEditingHighlights();
}
window.exitComponentEditingMode = exitComponentEditingMode;

// Syncs changes from the editing clone back to the original component
function syncComponentChangesToPage() {
  const componentSteps = document.getElementById('componentSteps');
  if (!componentSteps) return;

  const originalComponentId = componentSteps.getAttribute('data-original-component-id');

  if (originalComponentId) {
    const editingClone = componentSteps.querySelector('[data-is-editing-clone="true"]');
    const originalComponent = document.querySelector(`[data-component-id="${originalComponentId}"]`);

    if (editingClone && originalComponent) {
      // Preserve the original component's outer container attributes
      const originalAttributes = {};
      Array.from(originalComponent.attributes).forEach(attr => {
        originalAttributes[attr.name] = attr.value;
      });

      // Replace the original component's content while preserving structure
      originalComponent.innerHTML = editingClone.innerHTML;

      // Copy classes and attributes from the edited clone, but preserve container attributes
      Array.from(editingClone.attributes).forEach(attr => {
        if (attr.name !== 'data-is-editing-clone' && attr.name !== 'data-component-id') {
          originalComponent.setAttribute(attr.name, attr.value);
        }
      });

      // Ensure critical container attributes are preserved
      originalComponent.setAttribute('data-component-id', originalComponentId);
      if (originalAttributes['data-component-name']) {
        originalComponent.setAttribute('data-component-name', originalAttributes['data-component-name']);
      }

      // Get the clean HTML of the edited component for saving
      const cleanHTML = getCleanInnerHTML(editingClone);

      // Save the component changes
      const componentName = originalComponent.getAttribute('data-component-name');
      if (componentName) {
        const pageId = getPageId();
        saveComponent(pageId, componentName, cleanHTML);
      }

    }
  }
}
window.syncComponentChangesToPage = syncComponentChangesToPage;

function createRemoveComponentButton(component, gridContainer) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['remove-component'])
  button.className = 'removeComponent ugc-discard  bg-russett-500 top-2 hover:bg-russett-700 text-fuscous-gray-50 font-bold p-2 rounded h-12 w-12 mx-auto';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32l512 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64zm32 64l512 0L517.3 421.8c-3 33-30.6 58.2-63.7 58.2l-331.1 0c-33.1 0-60.7-25.2-63.7-58.2L32 128zm256 88c2.2 0 4.3 1.1 5.5 2.9l20.7 29.6c7.3 10.5 21.6 13.4 32.4 6.6c11.7-7.3 14.8-22.9 6.9-34.1l-20.7-29.6c-10.2-14.6-27-23.3-44.8-23.3s-34.6 8.7-44.8 23.3l-20.7 29.6c-7.9 11.3-4.7 26.8 6.9 34.1c10.8 6.8 25.1 3.9 32.4-6.6l20.7-29.6c1.3-1.8 3.3-2.9 5.5-2.9zm-88.3 77.1c-10.8-6.8-25.1-3.9-32.4 6.6l-21.5 30.7c-6.4 9.1-9.8 20-9.8 31.2c0 30.1 24.4 54.4 54.4 54.4l49.6 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-49.6 0c-3.5 0-6.4-2.9-6.4-6.4c0-1.3 .4-2.6 1.2-3.7l21.5-30.7c7.9-11.3 4.7-26.8-6.9-34.1zM312 392c0 13.3 10.7 24 24 24l49.6 0c30.1 0 54.4-24.4 54.4-54.4c0-11.2-3.4-22.1-9.8-31.2l-21.5-30.7c-7.3-10.5-21.6-13.4-32.4-6.6c-11.7 7.3-14.8 22.9-6.9 34.1l21.5 30.7c.8 1.1 1.2 2.4 1.2 3.7c0 3.5-2.9 6.4-6.4 6.4L336 368c-13.3 0-24 10.7-24 24z"/></svg>';
  button.addEventListener('click', function () {
    if (componentHasContent(component)) {
      showConfirmationModal('Are you sure you want to delete this component?', () => {
        gridContainer.removeChild(component);
      });
    } else {
      gridContainer.removeChild(component);
    }
  });
  return button;
} // DATA OUT: HTML Element, <button>
window.createRemoveComponentButton = createRemoveComponentButton;

function createAddComponentButton(container) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['add-component']);
  button.className = 'addComponent highlightButton hidden w-16 h-12 absolute -bottom-12 left-64 ugc-discard bg-fruit-salad-500 hover:bg-fruit-salad-700 text-fuscous-gray-50 font-bold p-2 rounded-b z-50';
  button.innerHTML = `<svg fill="white" class="h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path class="fa-secondary" opacity=".4" d="M153.7 85.8c-12.5 12.5-12.5 32.8 0 45.3l79.7 79.7c12.5 12.5 32.8 12.5 45.3 0L358.3 131c12.5-12.5 12.5-32.8 0-45.3L284.3 11.7C276.5 3.9 266.2 0 256 0s-20.5 3.9-28.3 11.7L153.7 85.8zm0 295.2c-12.5 12.5-12.5 32.8 0 45.3l74.1 74.1c7.8 7.8 18 11.7 28.3 11.7s20.5-3.9 28.3-11.7l74.1-74.1c6.2-6.2 9.4-14.4 9.4-22.6s-3.1-16.4-9.4-22.6l-79.7-79.7c-12.5-12.5-32.8-12.5-45.3 0L153.7 381z"/><path class="fa-primary" d="M131 153.7c-12.5-12.5-32.8-12.5-45.3 0L11.7 227.7c-15.6 15.6-15.6 40.9 0 56.6l74.1 74.1c12.5 12.5 32.8 12.5 45.3 0l79.7-79.7c12.5-12.5 12.5-32.8 0-45.3L131 153.7zM381 358.3c12.5 12.5 32.8 12.5 45.3 0l74.1-74.1c15.6-15.6 15.6-40.9 0-56.6l-74.1-74.1c-12.5-12.5-32.8-12.5-45.3 0l-79.7 79.7c-12.5 12.5-12.5 32.8 0 45.3L381 358.3z"/></svg>`;
  button.addEventListener('click', function(e) {
    e.stopPropagation();
    addComponentLibraryOptions(container);
    highlightEditingElement(container);
    addIdAndClassToElements();
  })
  return button;
} // DATA OUT: HTML Element, <button>
window.createAddComponentButton = createAddComponentButton;

function addComponentLibraryOptions(container) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div class="-mt-12 py-4 w-full"><strong>Components Library</strong></div><div id="AppstartComponentsLibrary" class="grid gap-y-8 grid-cols-2"></div>`;
  const components = Object.keys(AppstartComponents);
  components.forEach(component => {
    const menuItem = document.createElement('div');
    menuItem.className = 'w-24 h-24 cursor-pointer bg-fruit-salad-500 hover:bg-fruit-salad-700 rounded-lg p-8 text-white';
    menuItem.setAttribute('data-extra-info', AppstartComponents[component].name)
    menuItem.innerHTML = `${AppstartComponents[component].icon}`;
    menuItem.setAttribute('data-extra-info', AppstartComponents[component].description.slice(0, 72));
    const componentsList = document.getElementById('AppstartComponentsLibrary');
    componentsList.appendChild(menuItem);
    menuItem.addEventListener('click', function () {
      const componentContainer = document.createElement('div');
      componentContainer.className = 'pagecomponent pagecontainer p-4 group';
      componentContainer.setAttribute('data-component-name', component);
      componentContainer.setAttribute('data-component-id', generateUniqueId());
      const componentTemplate = AppstartComponents[component].html_template;
      convertTailwindHtml(componentTemplate.replace(`{{${component}.id}}`, componentContainer.getAttribute('data-component-id')), componentContainer);
      container.appendChild(componentContainer);
      enableEditComponentOnClick(componentContainer);
      addComponentOptions(componentContainer, component);
    });
  });
}
window.addComponentLibraryOptions = addComponentLibraryOptions;

function addComponentOptions(container, componentName = null) {

  if (!componentName) {
    // Try to get component name from the container or its children
    componentName = container.getAttribute('data-component-name') ||
                   (container.querySelector('[data-component-name]') &&
                    container.querySelector('[data-component-name]').getAttribute('data-component-name'));
  }

  if (!componentName) {
    console.warn('Could not determine component name for container:', container);
    return;
  }

  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `${generateSidebarTabs()}`;
  activateTabs();

  const moveButtons = document.createElement('div');
  moveButtons.className = 'flex justify-between my-2'
  moveButtons.id = 'moveContainerButtons'
  sidebar.prepend(moveButtons);

  let containerCount = document.getElementById('page').querySelectorAll('.pagecontainer').length
  const contentCount = document.getElementById('page').querySelectorAll('.pastedHtmlContainer').length
  const gridCount = document.getElementById('page').querySelectorAll('.pagegrid').length
  containerCount = containerCount + contentCount + gridCount;
  if (containerCount > 1) moveButtons.appendChild(createVerticalMoveContainerButton(container, 'up'));
  moveButtons.appendChild(addRemoveContainerButton(container, sidebar));
  if (containerCount > 1) moveButtons.appendChild(createVerticalMoveContainerButton(container, 'down'));

  const componentTitle = document.createElement('div');
  componentTitle.innerHTML = `<strong>Edit ${AppstartComponents[componentName].name}</strong></div>`;

  // Find the component container - it might be the container itself or a child
  let componentContainer = container.querySelector(`.${componentName}-container`);
  if (!componentContainer) {
    // If we can't find it as a child, check if the container itself is the component
    if (container.classList && container.classList.contains(`${componentName}-container`)) {
      componentContainer = container;
    } else if (container.getAttribute && container.getAttribute('data-component-name') === componentName) {
      // The container might have the data-component-name but not the class
      componentContainer = container;
    }
  }

  if (!componentContainer) {
    console.error(`Could not find component container for ${componentName}`, container);
    return;
  }

  const componentId = componentContainer.getAttribute('data-component-id');
  const componentFormTemplate = AppstartComponents[componentName].form_template;
  const formContainer = document.createElement('div');
  formContainer.innerHTML = componentFormTemplate;
  const htmlComponentForm = formContainer.querySelector(`.${componentName}-form`)
  if (htmlComponentForm) htmlComponentForm.setAttribute('data-component-id', componentId);
  sidebar.prepend(formContainer);
  sidebar.prepend(componentTitle);
  initializeExistingComponents(componentContainer, componentName);
  initializeComponentForm(componentContainer, componentName, htmlComponentForm);

  // Container-specific editing options
  addContainerAlignmentOptions(sidebar, container);

  // Standard editing options
  addEditableBorders(sidebar, container);
  addEditableOpacity(sidebar, container);
  addEditableBackgroundColor(sidebar, container);
  addEditableBackgroundImage(sidebar, container);
  addEditableBackgroundImageURL(sidebar, container);
  addEditableBackgroundFeatures(sidebar, container);
  addEditableMarginAndPadding(sidebar, container);
  addEditableDimensions(sidebar, container);
  highlightEditingElement(container);
  addIdAndClassToElements();
  addManualClassEditor(sidebar, container);
  addManualCssEditor(sidebar, container);
  addManualHtmlElement(sidebar, container);
  addManualJsEditor(sidebar, container);
  // Hide tooltips lingering
  updateTooltip(null, false);
}
window.addComponentOptions = addComponentOptions;
