/*
  editor/style/column.js

  This file is intended to be the primary location for anything adding editor
  options to the sidebar in a context primarily for columns & seldom elsewhere.
  All functions here rely on `addDeviceTargetedOptions` which helps segregate
  styles between targeted device sizes.
*/

// This function gives the column editor sidebar the ability to use alignment
// options from TailwindCSS.
function addColumnAlignmentOptions(sidebar, column) {
  const justifyContentsOptions = ['start', 'end', 'center', 'stretch', 'between', 'around', 'evenly', 'reset'];
  const placeSelfOptions = ['start', 'end', 'center', 'stretch', 'reset'];

  // Justify Content - See: https://tailwindcss.com/docs/justify-content
  addDeviceTargetedOptions(sidebar, column, 'Justify Content', 'justify', justifyContentsOptions, 'icon-select');
  // Place Self - See: https://tailwindcss.com/docs/place-self
  addDeviceTargetedOptions(sidebar, column, 'Place Self', 'place-self', placeSelfOptions, 'icon-select');
}