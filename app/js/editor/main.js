/*

  editor/main.js

  This file is to support the initial setup or re-setup of a page.

*/

// This big chunk does everything necessary for initial page setup which is
// largely comprised of setting up all the listeners that allow various editing
// functions that show up in the sidebar.
// DATA IN: null
document.addEventListener('DOMContentLoaded', function () {
  const editPageButton = document.getElementById('editPageSettings');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const pageSettingsButton = document.getElementById('pageSettings');
  const appSageSettingsButton = document.getElementById('appSageSettings');

  // Show/hide the drop-up menu
  editPageButton.addEventListener('click', function (event) {
    dropdownMenu.classList.toggle('hidden');
    event.stopPropagation(); // Prevent the event from propagating further
  });

  // Clicking outside the dropdown menu hides it
  document.addEventListener('click', function () {
    dropdownMenu.classList.add('hidden');
  });

  // Prevent click inside the menu from closing it
  dropdownMenu.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  // Handle Page Settings button click
  pageSettingsButton.addEventListener('click', function () {
    addPageOptions(); // Call your existing function
    dropdownMenu.classList.add('hidden'); // Hide the menu after click
  });

  // Handle appSage Settings button click
  appSageSettingsButton.addEventListener('click', function () {
    showSettingsModal();
  });

  const addGridButton = document.getElementById('addGrid');
  addGridButton.addEventListener('click', function () {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'w-full min-w-full max-w-full min-h-auto h-auto max-h-auto pagegrid grid grid-cols-1 pl-0 pr-0 pt-0 pb-0 ml-0 mr-0 mt-0 mb-0 ugc-keep';

    const initialColumn = createColumn();
    gridContainer.appendChild(initialColumn);
    initialColumn.appendChild(createAddContentButton(initialColumn));

    document.getElementById('page').appendChild(gridContainer);

    addGridOptions(gridContainer);
    highlightEditingElement(gridContainer);
    addIdAndClassToElements();

    // Append add column button at the end
    const addColumnButton = createAddColumnButton(gridContainer);
    gridContainer.appendChild(addColumnButton);

    enableEditGridOnClick(gridContainer);
  });

  const addContainerButton = document.getElementById('addContainer');
  addContainerButton.addEventListener('click', function () {
    const containerContainer = document.createElement('div');
    containerContainer.className = 'group w-full min-w-full max-w-full min-h-auto h-auto max-h-auto maincontainer pagecontainer ml-0 mr-0 mt-0 mb-0 ugc-keep';

    document.getElementById('page').appendChild(containerContainer);

    addContainerOptions(containerContainer);
    highlightEditingElement(containerContainer);
    addIdAndClassToElements();

    // Enable recursive boxes
    const addContainerButton = createAddContainerButton(containerContainer);
    containerContainer.appendChild(addContainerButton);

    // Append add content button at the end
    const addContentButton = createAddContentButton(containerContainer);
    containerContainer.appendChild(addContentButton);

    enableEditContainerOnClick(containerContainer);
  });

  const addHtmlButton = document.getElementById('addHtml');
  addHtmlButton.addEventListener('click', function () {
    showHtmlModal(() => { });
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

// Function to save metadata to localStorage, ensuring no duplicate tags
function saveMetadataToLocalStorage(page_id, newMetaTags) {
  const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
  const settings = JSON.parse(storedData.pages[page_id].settings);

  if (!settings.metaTags) {
    settings.metaTags = [];
  }

  // Helper function to check if the meta tag already exists
  function tagExists(newTag) {
    return settings.metaTags.some(tag => tag.type === newTag.type && tag.name === newTag.name);
  }

  // Iterate over the newMetaTags and add them if they don't already exist
  newMetaTags.forEach(newTag => {
    if (!tagExists(newTag)) {
      settings.metaTags.push(newTag); // Add new meta tag only if it doesn't exist
    } else {
      console.warn(`Meta tag with type: "${newTag.type}" and name: "${newTag.name}" already exists.`);
    }
  });

  // Save updated settings back to localStorage
  storedData.pages[page_id].settings = JSON.stringify(settings);
  localStorage.setItem(appSageStorageString, JSON.stringify(storedData));

  console.log('Metadata saved successfully!');
}


// This function is for adding to the sidebar all the options available for
// styles that impact the entire page, or metadata like page titles, og:image
// tags, descriptions, etc.
// DATA IN: null
function addPageOptions() {
  const page = document.getElementById('page');
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `${generateSidebarTabs()}`; // Clear existing editor
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

// This hulking function brings up a modal for pasting in HTML with Tailwind
// classes. This is for folks who have/bought existing HTML that uses
// TailwindCSS.
// TODO: Validate that the HTML is indeed Tailwind-y before proceeding to litter
// the page/page editor with the markup. Or... do we just ignore the fact that
// it isn't Tailwind-y and let them edit it anyway? In which case, nothing to do here.
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
    const content = document.getElementById('tailwindHtml').value;
    const page = document.getElementById('page');
    page.appendChild(convertTailwindHtml(content));
    document.body.removeChild(modal);
  });


  document.getElementById('cancelHtml').addEventListener('click', function () {
    document.body.removeChild(modal);
  });
} // DATA OUT: null

function convertTailwindHtml(content) {
  // Create a container to hold the pasted content
  const parentElement = document.createElement('div');
  parentElement.classList = 'pastedHtmlContainer maincontainer ugc-keep p-4';
  parentElement.innerHTML = content;

  wrapElements(parentElement);
  return parentElement;
}

function wrapElements(container) {
  const children = Array.from(container.childNodes);

  const structureTags = ['ARTICLE', 'SECTION', 'DIV', 'NAV', 'ASIDE', 'HEADER', 'FOOTER', 'MAIN', 'TABLE', 'THEAD', 'TBODY', 'TFOOT', 'TR'];

  const contentTags = ['P', 'BUTTON', 'A', 'SPAN', 'BLOCKQUOTE', 
    'IMG', 'VIDEO', 'AUDIO', 'FIGURE', 'IFRAME',
    'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 
    'FIGCAPTION', 'CAPTION', 'TIME', 'MARK', 'SUMMARY', 'DETAILS', 
    'PROGRESS', 'METER', 'DL', 'DT', 'DD'];

  const tableTags = ['TH', 'TD', 'COL', 'COLGROUP'];

  children.forEach((child) => {
    if (child.nodeType === Node.ELEMENT_NODE) {
      // Check if child is part of a grid structure by looking at its immediate parent
      const isInGrid = container.classList.contains('grid');

      // Check if the element is holding content children
      const hasContentChildren = Array.from(child.children).some(el => 
        contentTags.includes(el.tagName) || tableTags.includes(el.tagName)
      );

      // Apply grid-related classes
      if (child.classList.contains('grid')) {
        child.classList.add('pagegrid');
      }

      // If child is inside a grid, apply `pagecolumn` class
      if (isInGrid) {
        child.classList.add('pagecolumn');
      }

      // Handle structured elements like `th`, `td`, etc.
      if (tableTags.includes(child.tagName)) {
        child.classList.add('pagecontent', 'content-container');
        const wrapper = document.createElement('div');
        // Wrap the internal HTML content of `th`, `td`, etc.
        wrapper.innerHTML = child.innerHTML;
        child.innerHTML = ''; // Clear original content
        child.appendChild(wrapper);
        // Enable editing and observation for the element
        enableEditContentOnClick(child);
        observeClassManipulation(child);
      } else if (hasContentChildren && child.tagName === 'DIV' && child.children.length === 1) {
        // For divs with single content elements, add classes directly without wrapping
        child.classList.add('pagecontent', 'content-container');
      } else if (contentTags.includes(child.tagName)) {
        // Wrap content elements in a div with `pagecontent content-container` classes
        const wrapper = document.createElement('div');
        wrapper.classList.add('pagecontent', 'content-container');
        wrapper.appendChild(child.cloneNode(true));
        container.replaceChild(wrapper, child);

        // Enable editing and observation for the wrapper
        enableEditContentOnClick(wrapper);
        observeClassManipulation(wrapper);

        // Recursively apply wrapping to the children of the new wrapper
        wrapElements(wrapper.firstChild);
      } else if (hasContentChildren) {
        // If the element houses content, add `pagecontainer` class but don't wrap
        child.classList.add('pagecontainer');

        // Recursively apply wrapping to children
        wrapElements(child);
      } else {
        // Recursively handle child elements for non-wrapped cases
        child.classList.add('pagecontainer');
        wrapElements(child);
      }
    }
  });
}


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

// This is a way for people who don't know how to integrate a back-end to
// simply copy/paste page contents into their own document or back-end repo.
// DATA IN: HTML Element
function copyPageHTML(element) {
  const params = new URLSearchParams(window.location.search);
  const page_id = params.get('config');
  const html_content = JSON.parse(localStorage.getItem(appSageStorageString)).pages[page_id].page_data;
  const container_settings = JSON.parse(localStorage.getItem(appSageStorageString)).pages[page_id].settings;
  const textToCopy = `<style>${getCompiledCSS()}</style>
                      ${flattenJSONToHTML(html_content, container_settings)}`;
  copyText(textToCopy, element);
} // DATA OUT: null

// This is a way for people who don't know how to integrate a back-end to
// simply copy/paste page metadata into their own document or back-end repo.
// DATA IN: HTML Element
function copyMetadata(element) {
  const params = new URLSearchParams(window.location.search);
  const config = params.get('config');
  const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
  const settings = JSON.parse(storedData.pages[config].settings);
  const metaTags = settings.metaTags;
  let metaTagsString = '';

  metaTags.forEach(tag => {
    if (tag.type === 'link') {
      metaTagsString += `<link rel="${tag.name}" href="${tag.content}">`;
    } else {
      metaTagsString += `<meta ${tag.type}="${tag.name}" content="${tag.content}">`;
    }
  });

  copyText(metaTagsString, element);
} // DATA OUT: null

// This is the workhorse function for `copyMetadata` and `copyPageHTML`
// DATA IN: ['String', 'HTML Element, <div>']
function copyText(textToCopy, element) {
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      element.innerHTML = '<svg id="poppyCopy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M32 32a32 32 0 1 1 64 0A32 32 0 1 1 32 32zM448 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32 256a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM167 153c-9.4-9.4-9.4-24.6 0-33.9l8.3-8.3c16.7-16.7 27.2-38.6 29.8-62.1l3-27.4C209.6 8.2 221.5-1.3 234.7 .1s22.7 13.3 21.2 26.5l-3 27.4c-3.8 34.3-19.2 66.3-43.6 90.7L201 153c-9.4 9.4-24.6 9.4-33.9 0zM359 311l8.2-8.3c24.4-24.4 56.4-39.8 90.7-43.6l27.4-3c13.2-1.5 25 8 26.5 21.2s-8 25-21.2 26.5l-27.4 3c-23.5 2.6-45.4 13.1-62.1 29.8L393 345c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9zM506.3 8.5c8.6 10.1 7.3 25.3-2.8 33.8l-10 8.5c-14.8 12.5-33.7 19.1-53 18.6c-16.6-.4-30.6 12.4-31.6 29l-1.8 30c-2.5 42.5-38.3 75.3-80.8 74.2c-7.6-.2-15 2.4-20.7 7.3l-10 8.5c-10.1 8.6-25.3 7.3-33.8-2.8s-7.3-25.3 2.8-33.8l10-8.5c14.8-12.5 33.7-19.1 53-18.6c16.6 .4 30.6-12.4 31.6-29l1.8-30c2.5-42.5 38.3-75.3 80.8-74.2c7.6 .2 15-2.4 20.7-7.3l10-8.5c10.1-8.6 25.3-7.3 33.8 2.8zM150.6 201.4l160 160c7.7 7.7 10.9 18.8 8.6 29.4s-9.9 19.4-20 23.2l-39.7 14.9L83.1 252.5 98 212.8c3.8-10.2 12.6-17.7 23.2-20s21.7 1 29.4 8.6zM48.2 345.6l22.6-60.2L226.6 441.2l-60.2 22.6L48.2 345.6zM35.9 378.5l97.6 97.6L43.2 510c-11.7 4.4-25 1.5-33.9-7.3S-2.4 480.5 2 468.8l33.8-90.3z"/></svg>';
      resetCopyPageButton(element);
    })
    .catch(err => {
      return String(console.error("Failed to copy text: ", err));
    });
} // DATA OUT: String

// When a copy button is clicked, the icon is replaced with a "Tada!" emoji.
// This function swaps it back to the regular icon after 0.75 seconds.
// DATA IN: HTML Element
function resetCopyPageButton(element) {
  setTimeout(function () {
    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="white" class="h-5 w-5 mx-auto" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/></svg>';
  }, 750)
} // DATA OUT: null

// This function creates the form input for changing the page's title.
// DATA IN: ['HTML Element, <div>', 'null || String:append/prepend']
// This function creates the form input for changing the page's title.
// DATA IN: ['HTML Element, <div>', 'null || String:append/prepend']
function addEditablePageTitle(container, placement) {
  const params = new URLSearchParams(window.location.search);

  const titleIdMap = JSON.parse(localStorage.getItem(appSageTitleIdMapString)) || {};
  let currentTitle = Object.entries(titleIdMap).find(([title, id]) => id === params.get('config'))?.[0];

  const titleLabel = document.createElement('label');
  titleLabel.className = 'text-slate-700 text-xs uppercase mt-2';
  titleLabel.setAttribute('for', 'page-title');
  titleLabel.textContent = 'Page Title'
  const titleInput = document.createElement('input');
  titleInput.className = 'metadata meta-content my-1 shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
  titleInput.setAttribute('name', 'page-title');
  titleInput.type = 'text';
  titleInput.value = currentTitle;
  titleInput.placeholder = 'Page Title';

  titleInput.addEventListener('change', function () {
    newTitle = titleInput.value;
    changeLocalStoragePageTitle(newTitle);
  });
  if (placement === 'prepend') {
    container.prepend(titleInput);
    container.prepend(titleLabel);
  } else {
    container.appendChild(titleLabel);
    container.appendChild(titleInput);
  }
} // DATA OUT: null

// This function changes the page's title. Because localStorage data for the
// page is identified by the page's title, we have to copy the data over to a
// new object, then delete the old one.
// TODO: On page creation, generate an alphanumeric ID and store the object
//       that way instead. We will then need to update how localStorage loads
//       the page, perhaps by creating a new key-value object in the
//       localStorage like { page-title: 'thea-lpha-nume-rici-d123-4567'}
//       That way, we only have to replace that object and no longer risk
//       losing the entire page data like we potentially could with this
//       implementation as it exists now.
// DATA IN: String
function changeLocalStoragePageTitle(newTitle) {
  const params = new URLSearchParams(window.location.search);
  const currentPageId = params.get('config');

  // Retrieve the title-ID mapping from localStorage
  const titleIdMap = JSON.parse(localStorage.getItem(appSageTitleIdMapString)) || {};

  // Find the current title using the page ID
  let currentTitle = null;
  for (let [title, id] of Object.entries(titleIdMap)) {
    if (id === currentPageId) {
      currentTitle = title;
      break;
    }
  }

  if (currentTitle) {
    // Update the mapping with the new title
    delete titleIdMap[currentTitle];
    titleIdMap[newTitle] = currentPageId;

    // Save the updated mapping back to localStorage
    localStorage.setItem(appSageTitleIdMapString, JSON.stringify(titleIdMap));

    // Update the URL parameters (the page ID remains the same)
    params.set('config', currentPageId);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  } else {
    console.error(`Page with ID "${currentPageId}" does not exist.`);
  }
} // DATA OUT: null

// This function generates the area for creating as many items of metadata as
// the designer deems necessary.
// DATA IN: ['HTML Element, <div>', 'null || String:append/prepend']
function addEditableMetadata(container, placement) {
  /* 
  defaults:
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  automatically generate?:
    <meta name="description" content="This page was built using appSage">
    <meta property="og:title" content="Untitled | Built w/ appSage">
  */
  const metaDataContainer = document.createElement('div');
  if (placement === 'prepend') {
    container.prepend(metaDataContainer);
  } else {
    container.appendChild(metaDataContainer);
  }

  const params = new URLSearchParams(window.location.search);
  const page_id = params.get('config');
  const metaDataPairsContainer = document.createElement('div');
  metaDataPairsContainer.innerHTML = '<h3 class="font-semibold text-lg mb-2">Metadata</h3>';
  metaDataPairsContainer.className = 'my-2 col-span-5 border rounded-md border-slate-200 overflow-y-scroll p-2 max-h-48';
  metaDataContainer.appendChild(metaDataPairsContainer);

  const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
  const settings = storedData.pages[page_id].settings;
  if (typeof settings.length !== 'undefined') {
    const metaTags = JSON.parse(settings).metaTags;

    if (metaTags) {
      metaTags.forEach(tag => {
        addMetadataPair(tag.type, tag.name, tag.content);
      });
    }
  }



  // Add initial empty metadata pair
  function addMetadataPair(meta_type, meta_name, meta_content) {
    const pair = document.createElement('div');
    pair.className = 'metadata-pair mt-2'

    const select = document.createElement('select');
    select.className = 'metadata meta-type my-1 shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
    const optionName = document.createElement('option');
    optionName.value = 'name';
    optionName.selected = 'name' === meta_type;
    optionName.text = 'Name';
    const optionProperty = document.createElement('option');
    optionProperty.value = 'property';
    optionName.selected = 'property' === meta_type;
    optionProperty.text = 'Property';
    const optionLink = document.createElement('option');
    optionLink.value = 'link';
    optionLink.selected = 'link' === meta_type;
    optionLink.text = 'Link';
    select.appendChild(optionName);
    select.appendChild(optionProperty);
    select.appendChild(optionLink);

    const nameInput = document.createElement('input');
    nameInput.className = 'metadata meta-name my-1 shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
    nameInput.type = 'text';
    nameInput.value = meta_name || '';
    nameInput.placeholder = 'Name/Property';

    const contentInput = document.createElement('input');
    contentInput.className = 'metadata meta-content my-1 shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
    contentInput.type = 'text';
    contentInput.value = meta_content || '';
    contentInput.placeholder = 'Content';

    pair.appendChild(select);
    pair.appendChild(nameInput);
    pair.appendChild(contentInput);
    metaDataPairsContainer.appendChild(pair);
  }

  addMetadataPair();

  const addButton = document.createElement('button');
  addButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline mb-1"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" /></svg> Metadata';
  addButton.className = 'col-span-2 bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded h-12 w-28 mt-2';
  addButton.id = 'add-metadata-button';
  metaDataContainer.appendChild(addButton);

  addButton.addEventListener('click', function () {
    addMetadataPair();
  });

  document.querySelectorAll('.metadata').forEach(input => {
    input.addEventListener('change', function () {
      const metaTags = [];
      document.querySelectorAll('.metadata-pair').forEach(pair => {
        const type = pair.querySelector('.meta-type').value;
        const name = pair.querySelector('.meta-name').value;
        const content = pair.querySelector('.meta-content').value;
        if (name && content) {
          metaTags.push({ type, name, content });
        }
      });

      saveMetadataToLocalStorage(page_id, metaTags);
    });
  });
} // DATA OUT: null

// This used to be in an inline script on the page:
document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const config = params.get('config');
  const titleIdMap = JSON.parse(localStorage.getItem(appSageTitleIdMapString)) || {};
  let pageTitle = Object.entries(titleIdMap).find(([title, id]) => id === config)?.[0] || 'Untitled';
  document.querySelector('title').textContent = `Editing: ${pageTitle} | appSage`;

  if (config) {
    const json = loadPage(config);
    if (json && json.length > 0) {
      loadChanges(json);
      loadPageSettings(config);
      loadPageBlobs(config);
      loadPageMetadata(config)
    }
    setupAutoSave(config);
  } else {
    let pageId = createNewConfigurationFile();
    setupAutoSave(pageId);
  }
});

function createNewConfigurationFile() {
  const pageId = generateAlphanumericId();
  let title = 'Untitled';
  let counter = 1;
  // Load or create the title-ID mapping from localStorage
  const titleIdMap = JSON.parse(localStorage.getItem(appSageTitleIdMapString)) || {};
  while (title in titleIdMap) {
    title = `Untitled-${counter}`;
    counter++;
  }
  // Save the mapping of title to ID
  titleIdMap[title] = pageId;
  localStorage.setItem(appSageTitleIdMapString, JSON.stringify(titleIdMap));
  const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
  if (!appSageStorage.pages) {
    appSageStorage.pages = {};
  }
  appSageStorage.pages[pageId] = { page_data: [], title: title, settings: {}, blobs: {} };
  localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));

  window.location.search = `?config=${pageId}`; // Redirect with the new file as a parameter
  return pageId;
}

function generateAlphanumericId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function addIdAndClassToElements() {
  const targetClasses = ['pagecontent', 'pagegrid', 'pagecolumn', 'pageflex', 'pagecontainer'];

  // Helper function to generate a random alphanumeric string of a given length
  function generateRandomId(length = 8) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  // Function to ensure the generated ID is unique on the page
  function generateUniqueId() {
    let the_id;
    do {
      the_id = generateRandomId();
    } while (document.getElementById(the_id)); // Keep generating until a unique ID is found
    return the_id;
  }

  // Find elements that match the specified classes
  const elements = document.querySelectorAll(targetClasses.map(cls => `.${cls}`).join(','));

  elements.forEach(element => {
    // Check if the element already has a class like 'group/some_id'
    const hasGroupClass = Array.from(element.classList).some(cls => cls.startsWith('group/'));

    if (!hasGroupClass) { // Only add ID and class if no group/ID class exists
      const newId = generateUniqueId();
      element.classList.add(`group/[${newId}]`);
    }
  });
}
