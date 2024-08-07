/*

  editor/main.js

  This file is to support the initial setup or re-setup of a page.

*/

// global variables, you've been warned!
var tailwindColors = tailwind.config.theme.colors;
var colorArray = extractColorNames(tailwindColors);

// This big chunk does everything necessary for initial page setup which is
// largely comprised of setting up all the listeners that allow various editing
// functions that show up in the sidebar.
// DATA IN: null
document.addEventListener('DOMContentLoaded', function () {
  const elementsToWatch = ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'img', 'video', 'audio', 'a', 'form', 'ul', 'ol', 'li', 'button', 'textarea', 'input', 'select', 'option', 'figure', 'figcaption', 'article', 'section', 'header', 'nav', 'aside', 'footer', 'address', 'main', 'blockquote', 'dl', 'dt', 'dd'];
  const sidebar = document.getElementById('sidebar-dynamic');

  document.body.addEventListener('click', function(event) {
    event.preventDefault();
    let element = event.target;
    if (elementsToWatch.includes(element.tagName.toLowerCase())) {
      element.classList.add('pagecontent');
      addTextOptions(sidebar, element);
    }
  });

  const editPageButton = document.getElementById('editPageSettings');
  editPageButton.addEventListener('click', function () {
    addPageOptions();
  });

  const addGridButton = document.getElementById('addGrid');
  addGridButton.addEventListener('click', function () {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'w-full min-w-full max-w-full min-h-full h-full max-h-full pagegrid grid grid-cols-1 pl-0 pr-0 pt-0 pb-0 ml-0 mr-0 mt-0 mb-0 ugc-keep';

    const initialColumn = createColumn();
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

  const addHtmlButton = document.getElementById('addHtml');
  addHtmlButton.addEventListener('click', function () {
    showHtmlModal(() => {});
  });

  // Mouse enter event
  document.body.addEventListener('mouseenter', function (e) {
    if (e.target.matches('[data-extra-info]') && e.target.getAttribute('data-extra-info')) {
      updateTooltip(e, true);
    }
  }, true); // Use capture phase to ensure tooltip updates immediately

  // Mouse leave event
  document.body.addEventListener('mouseleave', function (e) {
    if (e.target.matches('[data-extra-info]')) {
      updateTooltip(e, false);
    }
  }, true);
}); // DATA OUT: null

// This function is for adding to the sidebar all the options available for
// styles that impact the entire page, or metadata like page titles, og:image
// tags, descriptions, etc.
// DATA IN: null
function addPageOptions() {
  const page = document.getElementById('page');
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `${generateMobileTabs()}`; // Clear existing editor
  const editTitle = document.createElement('div');
  editTitle.innerHTML = `<strong>Edit Page Styles &amp; Metadata</strong>`
  activateTabs();

  if (page) {
    addEditableMetadata(sidebar, 'prepend');
    addEditablePageTitle(sidebar, 'prepend');
    sidebar.prepend(editTitle);
    addEditableBackgroundColor(sidebar, page);
    addEditableBackgroundImage(sidebar, page);
    addEditableBackgroundImageURL(sidebar, page);
    addEditableBackgroundFeatures(sidebar, page);
  }
} // DATA OUT: null

// This function makes tooltips show up anywhere you hover over an element that
// has the `data-extra-info` attribute. This functional is critical for
// elaborating on WTF something does for the designer making a page.
// DATA IN: ['HTML Element', 'Boolean']
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
} // DATA OUT: null

// This function is for supporting any editor capabilities that involve color.
// It gives the designer access to the color palette they labored over and
// keeps them focused on only those colors.
// DATA IN: JSON Object
function extractColorNames(colorObject) {
  let colorArray = [];
  for (const colorFamily in colorObject) {
    for (const shade in colorObject[colorFamily]) {
      colorArray.push(`${colorFamily}-${shade}`);
    }
  }
  return colorArray;
} // DATA OUT: Array

// This hulking function brings up a modal for pasting in HTML with Tailwind
// classes. This is for folks who have/bought existing HTML that uses
// TailwindCSS.
// TODO: Validate that the HTML is indeed Tailwind-y before proceeding to litter
// the page/page editor with the markup.
// DATA IN: Optional function()
function showHtmlModal(onConfirm = null) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center';
  modal.innerHTML = `
      <div class="bg-slate-100 p-4 rounded-lg max-w-2xl mx-auto w-full">
          <p class="text-slate-900">Add HTML with TailwindCSS classes:</p>
          <textarea id="tailwindHtml" rows="20" class="shadow border rounded py-2 px-3 text-slate-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline"></textarea>
          <div class="flex justify-between mt-4">
              <button id="confirmHtml" class="bg-emerald-500 hover:bg-emerald-700 text-slate-50 font-bold p-2 rounded">Add HTML</button>
              <button id="cancelHtml" class="bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded">Cancel</button>
          </div>
      </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('confirmHtml').addEventListener('click', function () {
    if (onConfirm) onConfirm();
    const page = document.getElementById('page');
    const content = document.getElementById('tailwindHtml');
    const parentElement = document.createElement('div');
    parentElement.classList = 'pagegrid grid grid-cols-1 ugc-keep p-4'
    page.appendChild(parentElement);
    const element = document.createElement('div');
    element.classList = 'pagecolumn col-span-1 p-4'
    parentElement.appendChild(element);
    const childElement = document.createElement('div');
    childElement.classList = 'content-container pagecontent htmlContent p-4'
    childElement.innerHTML = content.value;
    element.appendChild(childElement);
    document.body.removeChild(modal);
  });

  document.getElementById('cancelHtml').addEventListener('click', function () {
    document.body.removeChild(modal);
  });
} // DATA OUT: null

// This function adds a cyan glow around the element being edited to give a visual
// breadcrumb of what element is currently going to be effected by any changes
// made from the sidebar.
// DATA IN: null
function highlightEditingElement(element) {
  removeEditingHighlights(); // Clear existing highlights
  if (element) {
    element.id = 'editing-highlight'; // Highlight the current element
  }
} // DATA OUT: null

// This function removes the above visual breadcrumb making way for a new
// highlight. This function should ideally always be called prior to its
// antithetical counterpart.
// DATA IN: null
function removeEditingHighlights() {
  const highlight = document.getElementById('editing-highlight');
  if (highlight) {
    highlight.id = '';
  }
} // DATA OUT: null

// This function helps move column/content buttons figure out where to go
// when moving their element without getting confused by editor-specific
// elements potentially confusing where to go in the finished product.
// DATA IN: ['HTML Element, <div>', 'String:up/down']
function getNextValidSibling(element, direction) {
  let sibling = (direction === 'left' || direction === 'up') ? element.previousElementSibling : element.nextElementSibling;
  while (sibling && sibling.classList.contains('ugc-discard')) {
    sibling = (direction === 'left' || direction === 'up') ? sibling.previousElementSibling : sibling.nextElementSibling;
  }
  return sibling;
} // DATA OUT: HTML Element, <div>
