/* main.js */
var tailwindColors = tailwind.config.theme.colors;
var colorArray = extractColorNames(tailwindColors);//.push('black', 'white');

document.addEventListener('DOMContentLoaded', function () {
  // var tailwindColors = tailwind.config.theme.colors;
  const editPageButton = document.getElementById('editPageSettings');
  editPageButton.addEventListener('click', function () {
    addPageOptions();
  });

  const addGridButton = document.getElementById('addGrid');
  addGridButton.addEventListener('click', function () {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'w-full min-w-full max-w-full min-h-full h-full max-h-full pagegrid grid grid-cols-1 pl-0 pr-0 pt-0 pb-0 ml-0 mr-0 mt-0 mb-0 ugc-keep';

    const initialColumn = createColumn(gridContainer);
    gridContainer.appendChild(initialColumn);
    initialColumn.appendChild(createAddContentButton(initialColumn));

    document.getElementById('page').appendChild(gridContainer);

    addGridOptions(gridContainer);
    highlightEditingElement(gridContainer);

    // Append add column button at the end
    const addColumnButton = createAddColumnButton(gridContainer);
    gridContainer.appendChild(addColumnButton);

    enableEditGridOnClick(gridContainer);
  });

  // Mouse enter event
  document.body.addEventListener('mouseenter', function(e) {
    if (e.target.matches('[data-extra-info]') && e.target.getAttribute('data-extra-info')) {
      updateTooltip(e, true);
    }
  }, true); // Use capture phase to ensure tooltip updates immediately

  // Mouse leave event
  document.body.addEventListener('mouseleave', function(e) {
    if (e.target.matches('[data-extra-info]')) {
      updateTooltip(e, false);
    }
  }, true);
});

function addPageOptions() {
  const page = document.getElementById('page');
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `<div><strong>Edit Page Styles &amp; Metadata</strong></div>${generateMobileTabs()}`;
  activateTabs();

  if (page) {
    addEditableMetadata(sidebar, page);
    addEditableBackgroundColor(sidebar, page);
    addEditableBackgroundImage(sidebar, page);
    addEditableBackgroundImageURL(sidebar, page);
    addEditableBackgroundFeatures(sidebar, page);
  }
}

function updateTooltip(e, show) {
  const tooltip = document.getElementById('tooltip');
  const extraClasses = e.target.getAttribute('data-extra-info-class') || '';

  if (show) {
    const targetRect = e.target.getBoundingClientRect();
    tooltip.innerHTML = e.target.getAttribute('data-extra-info') || '';
    let tooltipX = targetRect.left + (targetRect.width / 2) - (tooltip.offsetWidth / 2);
    let tooltipY = targetRect.top - tooltip.offsetHeight - 5;

    // Ensure the tooltip does not overflow horizontally
    const rightOverflow = tooltipX + tooltip.offsetWidth - document.body.clientWidth;
    if (rightOverflow > 0) {
      tooltipX -= rightOverflow;  // Adjust to the left if overflowing on the right
    }
    if (tooltipX < 0) {
      tooltipX = 5;  // Keep some space from the left edge if overflowing on the left
    }

    // Adjust vertically if there is not enough space above the target
    if (targetRect.top < tooltip.offsetHeight + 10) {
      tooltipY = targetRect.bottom + 5;
    }

    // Set tooltip position
    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${tooltipY}px`;

    // Show tooltip with extra classes
    tooltip.classList.replace('opacity-0', 'opacity-100');
    tooltip.classList.remove('invisible');
    tooltip.classList.add('visible');
    if (extraClasses !== '') extraClasses.split(' ').forEach(cls => tooltip.classList.add(cls));
  } else {
    // Hide tooltip and remove extra classes
    tooltip.classList.replace('opacity-100', 'opacity-0');
    tooltip.classList.remove('visible');
    tooltip.classList.add('invisible');
    if (extraClasses !== '') extraClasses.split(' ').forEach(cls => tooltip.classList.remove(cls));
  }
}

function extractColorNames(colorObject) {
  let colorArray = [];
  for (const colorFamily in colorObject) {
    for (const shade in colorObject[colorFamily]) {
      colorArray.push(`${colorFamily}-${shade}`);
    }
  }
  return colorArray;
}