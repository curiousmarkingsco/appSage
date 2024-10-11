/*

  editor/style/container.js

  This file is intended to be the primary location for anything adding editor
  options to the sidebar in a context primarily for container boxes & seldom
  elsewhere. All functions here rely on `addDeviceTargetedOptions` which helps
  segregate styles between targeted device sizes.

*/

// This function gives the container box editor sidebar the ability to use alignment
// options from TailwindCSS.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addContainerAlignmentOptions(sidebar, container) {
  const justifyContentOptions = ['start', 'end', 'center', 'stretch', 'between', 'around', 'evenly', 'reset'];
  const alignItemsOptions = ['start', 'end', 'center', 'baseline', 'stretch', 'reset'];
  const alignSelfOptions = ['start', 'end', 'center', 'stretch', 'baseline', 'reset'];

  // Justify Content - See: https://tailwindcss.com/docs/justify-content
  addDeviceTargetedOptions(sidebar, container, 'Justify Content', 'justify', justifyContentOptions, 'icon-select');
  // Align Items - See: https://tailwindcss.com/docs/align-items
  addDeviceTargetedOptions(sidebar, container, 'Align Items', 'items', alignItemsOptions, 'icon-select');
  // Align Self - See: https://tailwindcss.com/docs/place-items
  addDeviceTargetedOptions(sidebar, container, 'Align Self', 'self', alignSelfOptions, 'icon-select');
} // DATA OUT: null
