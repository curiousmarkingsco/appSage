/*
  editor/style/grid.js

  This file is intended to be the primary location for anything adding editor
  options to the sidebar in a context primarily for grids & seldom elsewhere.
  All functions here rely on `addDeviceTargetedOptions` which helps segregate
  styles between targeted device sizes.
*/

// This function gives the grid editor sidebar the ability to use alignment
// options from TailwindCSS.
function addGridAlignmentOptions(sidebar, grid) {
  const justifyItemsOptions = ['start', 'end', 'center', 'stretch', 'reset'];
  const alignContentOptions = ['start', 'end', 'center', 'stretch', 'between', 'around', 'evenly', 'reset'];
  const placeItemsOptions = ['start', 'end', 'center', 'stretch', 'reset'];

  // Justify Items - See: https://tailwindcss.com/docs/justify-items
  addDeviceTargetedOptions(sidebar, grid, 'Justify Items', 'justify-items', justifyItemsOptions, 'icon-select');
  // Align Content - See: https://tailwindcss.com/docs/align-content
  addDeviceTargetedOptions(sidebar, grid, 'Align Content', 'content', alignContentOptions, 'icon-select');
  // Place Items - See: https://tailwindcss.com/docs/place-items
  addDeviceTargetedOptions(sidebar, grid, 'Place Items', 'place-items', placeItemsOptions, 'icon-select');
}

// This function is for chooding the number of columns (vertical) that exist
// within the grid.
function addEditableColumns(sidebar, grid) {
  // Arbitrary constraint of 12 columns to reduce laymen designers making
  // things messy.
  const columns = Array.from({ length: 12 }, (_, i) => i + 1);

  // See: https://tailwindcss.com/docs/grid-template-columns
  addDeviceTargetedOptions(sidebar, grid, 'Number of Columns', 'grid-cols', columns, 'select');
}
