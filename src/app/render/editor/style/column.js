/*

  editor/style/column.js

  This file is intended to be the primary location for anything adding editor
  options to the sidebar in a context primarily for columns & seldom elsewhere.
  All functions here rely on `addDeviceTargetedOptions` which helps segregate
  styles between targeted device sizes.

*/

// This function gives the column editor sidebar the ability to use alignment
// options from TailwindCSS.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addColumnAlignmentOptions(sidebar, column) {
  const justifyContentsOptions = ['start', 'end', 'center', 'stretch', 'between', 'around', 'evenly', 'reset'];
  const colSpanOptions = Array.from({ length: 12 }, (_, i) => `${i + 1}`);

  // Add 'Justify Content' as an icon-select
  addDeviceTargetedOptions(sidebar, column, 'Justify Content', 'justify', justifyContentsOptions, 'icon-select');

  // Add 'Column Span' as an icon-select or select
  addDeviceTargetedOptions(sidebar, column, 'Column Span', 'col-span', colSpanOptions, 'select'); // 'icon-select' is also possible
}  // DATA OUT: null
window.addColumnAlignmentOptions = addColumnAlignmentOptions;
