/*

  editor/container.js

  This file is intended to be the primary location for anything related to adding, editing, and removing container box.

*/

// This function populates the sidebar with relevant editing options for container box.
// DATA IN: HTML Element, <div>
function addContainerOptions(container) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Edit Flexible Container</strong></div>${generateSidebarTabs()}`;
  activateTabs();

  if (container) {
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
  }
} // DATA OUT: null
window.addContainerOptions = addContainerOptions;

function createAddHtmlButton(containingBox) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', 'Paste in a Tailwind template');
  button.className = 'addContainer highlightButton hidden w-16 h-12 absolute -bottom-12 left-44 ugc-discard bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded-b z-50';
  button.innerHTML = `<svg class="h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 54 33"><g clip-path="url(#prefix__clip0)"><path fill="#ffffff" fill-rule="evenodd" d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"clip-rule="evenodd" /></g><defs><clipPath id="prefix__clip0"><path fill="#fff" d="M0 0h54v32.4H0z" /></clipPath></defs></svg>`

  button.addEventListener('click', function (e) {
    showHtmlModal(containingBox, () => { });
  });
  return button;
}
window.createAddHtmlButton = createAddHtmlButton;

function createAddContainerButton(containingBox) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['add-container']);
  button.className = 'addContainer highlightButton hidden w-16 h-12 absolute -bottom-12 left-4 ugc-discard bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded-b z-50';
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" /></svg><svg class="w-4 h-4 inline" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M48 32C21.5 32 0 53.5 0 80L0 240c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-160c0-26.5-21.5-48-48-48L48 32zM304 224c-26.5 0-48 21.5-48 48l0 160c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-160c0-26.5-21.5-48-48-48l-96 0zM0 400l0 32c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-32c0-26.5-21.5-48-48-48l-96 0c-26.5 0-48 21.5-48 48zM304 32c-26.5 0-48 21.5-48 48l0 32c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-32c0-26.5-21.5-48-48-48l-96 0z"/></svg>`;
  button.addEventListener('click', function () {
    const containerContainer = document.createElement('div');
    containerContainer.className = 'group w-auto min-w-auto max-w-auto min-h-auto h-auto max-h-auto pagecontainer ml-0 mr-0 mt-0 mb-0 p-4';

    containingBox.appendChild(containerContainer);

    addContainerOptions(containerContainer);
    addIdAndClassToElements();

    // Enable recursive boxes
    const addContainerButton = createAddContainerButton(containerContainer);
    containerContainer.appendChild(addContainerButton);

    if (advancedMode === true){
      const addHtmlButton = createAddHtmlButton(containerContainer);
      containerContainer.appendChild(addHtmlButton);
    }

    // Append add content button at the end
    const addContentButton = createAddContentButton(containerContainer);
    containerContainer.appendChild(addContentButton);

    const addComponentButton = createAddComponentButton(containerContainer);
    containerContainer.appendChild(addComponentButton);

    enableEditContainerOnClick(containerContainer);
    highlightEditingElement(containerContainer);
  });
  // This creates a reliable hover effect for many nested elements
  // containingBox.addEventListener('mouseover', function(event){
  //   event.stopPropagation();
  //   button.classList.add('block');
  //   button.classList.remove('hidden');
  // });
  // containingBox.addEventListener('mouseout', function(event){
  //   event.stopPropagation();
  //   button.classList.add('hidden');
  //   button.classList.remove('block');
  // });
  return button;
} 
window.createAddContainerButton = createAddContainerButton;

// This function creates the button for deleting the container currently being
// edited. As the tooltip mentions, FOREVER. That's a long time!
// Currently, this button lives at the topbar nestled between the 'move container'
// buttons on its left and right.
// DATA IN: ['HTML Element, <div>', 'HTML Element, <div id="sidebar-dynamic">']
function addRemoveContainerButton(container, sidebar) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['remove-container'])
  button.className = 'removeContainer bg-rose-500 hover:bg-rose-700 text-slate-50 font-bold p-2 rounded h-12 w-12 mx-auto';
  button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32l512 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64zm32 64l512 0L517.3 421.8c-3 33-30.6 58.2-63.7 58.2l-331.1 0c-33.1 0-60.7-25.2-63.7-58.2L32 128zm256 88c2.2 0 4.3 1.1 5.5 2.9l20.7 29.6c7.3 10.5 21.6 13.4 32.4 6.6c11.7-7.3 14.8-22.9 6.9-34.1l-20.7-29.6c-10.2-14.6-27-23.3-44.8-23.3s-34.6 8.7-44.8 23.3l-20.7 29.6c-7.9 11.3-4.7 26.8 6.9 34.1c10.8 6.8 25.1 3.9 32.4-6.6l20.7-29.6c1.3-1.8 3.3-2.9 5.5-2.9zm-88.3 77.1c-10.8-6.8-25.1-3.9-32.4 6.6l-21.5 30.7c-6.4 9.1-9.8 20-9.8 31.2c0 30.1 24.4 54.4 54.4 54.4l49.6 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-49.6 0c-3.5 0-6.4-2.9-6.4-6.4c0-1.3 .4-2.6 1.2-3.7l21.5-30.7c7.9-11.3 4.7-26.8-6.9-34.1zM312 392c0 13.3 10.7 24 24 24l49.6 0c30.1 0 54.4-24.4 54.4-54.4c0-11.2-3.4-22.1-9.8-31.2l-21.5-30.7c-7.3-10.5-21.6-13.4-32.4-6.6c-11.7 7.3-14.8 22.9-6.9 34.1l21.5 30.7c.8 1.1 1.2 2.4 1.2 3.7c0 3.5-2.9 6.4-6.4 6.4L336 368c-13.3 0-24 10.7-24 24z"/></svg>';
  button.onclick = function () {
    showConfirmationModal('Are you sure you want to delete this entire container?', () => {
      container.parentNode.removeChild(container);
      sidebar.innerHTML = '<p>Nothing to edit. Add a container by clicking the Plus (+) button.</p>';
    });
  };
  return button;
} // DATA OUT: HTML Element, <button>
window.addRemoveContainerButton = addRemoveContainerButton;

// This function creates the button for moving the element it belongs to upward
// and downward in the DOM. Currently, these buttons live at the top of the
// editor sidebar when the container is/has been selected for editing.
// DATA IN: ['HTML Element, <div>', 'String:up/down']
function createVerticalMoveContainerButton(container, direction) {
  const button = document.createElement('button');
  button.className = 'moveContainer inline ugc-discard bg-amber-500 hover:bg-amber-700 text-slate-50 font-bold pt-1 pb-1.5 rounded w-12';
  if (direction == 'up') {
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3 192 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 64c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-64z"/></svg>';
    button.setAttribute('data-extra-info', tooltips['move-container-up'])
  } else {
    button.innerHTML = ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M246.6 502.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 402.7 192 192c0-17.7 14.3-32 32-32s32 14.3 32 32l0 210.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-128 128zM64 160c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 96C0 43 43 0 96 0L352 0c53 0 96 43 96 96l0 64c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-64c0-17.7-14.3-32-32-32L96 64C78.3 64 64 78.3 64 96l0 64z"/></svg>';
    button.setAttribute('data-extra-info', tooltips['move-container-down'])
  }
  button.addEventListener('click', function () {
    moveVertical(container, direction);
  });
  return button;
} // DATA OUT: HTML Element, <button>
window.createVerticalMoveContainerButton = createVerticalMoveContainerButton;

// This function is intended to present the sidebar editing options when a container
// is clicked.
// DATA IN: HTML Element, <div>
function enableEditContainerOnClick(container) {
  if (container.classList.contains('pagecomponent')) {
    enableEditComponentOnClick(container);
  } else {
    container.addEventListener('click', function (event) {
      event.stopPropagation();
      addContainerOptions(container);
      highlightEditingElement(container);
      addIdAndClassToElements();
    });
  }
} // DATA OUT: null
window.enableEditContainerOnClick = enableEditContainerOnClick;
