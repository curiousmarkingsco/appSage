/*

  editor/component.js

*/

// This function used to be more complex, but has been simplified over time.
// It is still here under a "don't fix it if it ain't broke" line of thinking.
// DATA IN: null
function createComponent() {
  const component = document.createElement('div');
  component.className = 'col-span-1 pagecomponent group p-4';
  enableEditComponentOnClick(component);
  return component;
} // DATA OUT: HTML Element, <div>

// This function makes it so that when you click on a component, the editing options
// will be revealed in the sidebar to the left of the screen. It does this by
// first making the label and supporting elements for moving and removing the
// component, and then adding the editor buttons, dropdowns, etc.
// DATA IN: HTML Element, <div>
function enableEditComponentOnClick(component) {
  component.addEventListener('click', function (event) {
    event.stopPropagation();
    addComponentOptions(component);
  });
} // DATA OUT: null

function createRemoveComponentButton(component, gridContainer) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['remove-component'])
  button.className = 'removeComponent ugc-discard  bg-rose-500 top-2 hover:bg-rose-700 text-slate-50 font-bold p-2 rounded h-12 w-12 mx-auto';
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

function createAddComponentButton(container) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['add-component']);
  button.className = 'addComponent highlightButton hidden w-16 h-12 absolute -bottom-12 left-64 ugc-discard bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded-b z-50';
  button.innerHTML = `<svg fill="white" class="h-5 w-5 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path class="fa-secondary" opacity=".4" d="M153.7 85.8c-12.5 12.5-12.5 32.8 0 45.3l79.7 79.7c12.5 12.5 32.8 12.5 45.3 0L358.3 131c12.5-12.5 12.5-32.8 0-45.3L284.3 11.7C276.5 3.9 266.2 0 256 0s-20.5 3.9-28.3 11.7L153.7 85.8zm0 295.2c-12.5 12.5-12.5 32.8 0 45.3l74.1 74.1c7.8 7.8 18 11.7 28.3 11.7s20.5-3.9 28.3-11.7l74.1-74.1c6.2-6.2 9.4-14.4 9.4-22.6s-3.1-16.4-9.4-22.6l-79.7-79.7c-12.5-12.5-32.8-12.5-45.3 0L153.7 381z"/><path class="fa-primary" d="M131 153.7c-12.5-12.5-32.8-12.5-45.3 0L11.7 227.7c-15.6 15.6-15.6 40.9 0 56.6l74.1 74.1c12.5 12.5 32.8 12.5 45.3 0l79.7-79.7c12.5-12.5 12.5-32.8 0-45.3L131 153.7zM381 358.3c12.5 12.5 32.8 12.5 45.3 0l74.1-74.1c15.6-15.6 15.6-40.9 0-56.6l-74.1-74.1c-12.5-12.5-32.8-12.5-45.3 0l-79.7 79.7c-12.5 12.5-12.5 32.8 0 45.3L381 358.3z"/></svg>`;
  button.addEventListener('click', function(e) {
    event.stopPropagation();
    addComponentLibraryOptions(container);
    highlightEditingElement(container);
    addIdAndClassToElements();
  })
  return button;
} // DATA OUT: HTML Element, <button>

function addComponentLibraryOptions(container) {
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div id="appSageComponentsLibrary"><strong>Components Library</strong></div>`;
  const components = Object.keys(appSagePremiumComponents);
  components.forEach(component => {
    const menuItem = document.createElement('div');
    menuItem.className = 'w-24 h-24 cursor-pointer bg-sky-500 hover:bg-sky-700 rounded-lg p-8 text-white';
    menuItem.setAttribute('data-extra-info', appSagePremiumComponents['internationalClocks'].name)
    menuItem.innerHTML = `${appSagePremiumComponents[component].icon}`;
    const componentsList = document.getElementById('appSageComponentsLibrary');
    componentsList.appendChild(menuItem);
    menuItem.addEventListener('click', function () {
      const componentContainer = document.createElement('div');
      componentContainer.className = 'pagecomponent';
      convertTailwindHtml(internationalClocksTemplate.replace('{{clock.id}}', generateUniqueId()), componentContainer);
      container.appendChild(componentContainer);
      startClock(componentContainer.querySelector('.clock-container'));
    });
  });
}

