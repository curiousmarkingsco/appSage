/* style.js */

function addEditableBackgroundColor(sidebar, element) {
  const colors = colorArray;
  const labelPrefix = 'Background Color';
  const cssClassBase = 'bg';

  addDeviceTargetedOptions(sidebar, element, labelPrefix, cssClassBase, colors, 'icon-select');
}

function addEditableBorders(sidebar, element) {
  const labels = ['Border Width', 'Border Radius', 'Border Color', 'Border Style'];
  const properties = ['width', 'radius', 'color', 'style'];
  const options = {
    color: colorArray,
    width: ['1', '2', '4', '8'],
    radius: ['none', 'sm', 'md', 'lg'],
    style: ['solid', 'dashed', 'dotted', 'double', 'none'],
    input_type: ['single-icon-select', 'single-icon-select', 'icon-select', 'icon-select']
  };

  properties.forEach((prop, index) => {
    const cssClassBase = prop === 'color' ? 'border' : (prop === 'width' ? 'border' : (prop === 'radius' ? 'rounded' : (prop === 'style' ? 'border' : '')));

    addDeviceTargetedOptions(sidebar, element, labels[index], cssClassBase, options[prop], options.input_type[index]);
  });
}

function addEditableMarginAndPadding(sidebar, element) {
  addEditableMargin(sidebar, element);
  addEditablePadding(sidebar, element);
}

function addEditablePadding(sidebar, element) {
  const sides = ['t', 'b', 'l', 'r'];
  const values = ['0', '1', '2', '4', '8', '16'];

  sides.forEach(side => {
    const cssClassBase = `p${side}`;

    addDeviceTargetedOptions(sidebar, element, `Padding (${side})`, cssClassBase, values, 'single-icon-select');
  });

  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  breakpoints.forEach(bp => {
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    const paddingContainer = document.createElement('div');
    paddingContainer.className = 'grid grid-cols-4 col-span-5'
    const paddingElements = container.querySelectorAll('.Padding');
    paddingElements.forEach(paddingDropdown => {
      paddingContainer.appendChild(paddingDropdown);
    });
    container.appendChild(paddingContainer);
  });
}

function addEditableMargin(sidebar, element) {
  const sides = ['t', 'b', 'l', 'r'];
  const values = ['0', '1', '2', '4', '8', '16'];

  sides.forEach(side => {
    const cssClassBase = `m${side}`;

    addDeviceTargetedOptions(sidebar, element, `Margin (${side})`, cssClassBase, values, 'single-icon-select');
  });

  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  breakpoints.forEach(bp => {
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    const marginContainer = document.createElement('div');
    marginContainer.className = 'grid grid-cols-4 col-span-5'
    const marginElements = container.querySelectorAll('.Margin');
    marginElements.forEach(marginDropdown => {
      marginContainer.appendChild(marginDropdown);
    });
    container.appendChild(marginContainer);
  });
}

function addEditableBackgroundImageURL(sidebar, grid) {
  const labelPrefix = 'Background Image URL';
  const cssClassBase = 'bg';

  addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, null, 'input');
}

function addEditableBackgroundImage(sidebar, grid) {
  const labelPrefix = 'Background Image File';
  const cssClassBase = 'bg';

  addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, null, 'input');
}

function addEditableBackgroundFeatures(sidebar, grid) {
  const bgSizeOptions = ['cover', 'contain'];
  const bgPositionOptions = ['center', 'top', 'bottom', 'left', 'right'];
  const bgRepeatOptions = ['repeat', 'no-repeat', 'repeat-x', 'repeat-y'];

  // Function to update background image size
  function addBackgroundSizeOptions() {
    const labelPrefix = 'Background Size';
    const cssClassBase = 'bg';

    addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, bgSizeOptions, 'icon-select');
  }

  // Function to update background position
  function addBackgroundPositionOptions() {
    const labelPrefix = 'Background Position';
    const cssClassBase = 'bg';

    addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, bgPositionOptions, 'icon-select');
  }

  // Function to update background repeat
  function addBackgroundRepeatOptions() {
    const labelPrefix = 'Background Repeat';
    const cssClassBase = 'bg';

    addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, bgRepeatOptions, 'icon-select');
  }

  // Calling all functions to add options
  addBackgroundSizeOptions();
  addBackgroundPositionOptions();
  addBackgroundRepeatOptions();
}

function addTextOptions(sidebar, element) {
  const textColorOptions = colorArray;
  const textSizeOptions = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'];
  const textAlignOptions = ['left', 'center', 'right', 'justify'];
  const fontWeightOptions = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'];
  const fontStyleOptions = ['italic', 'not-italic'];
  const fontUnderlineOptions = ['underline', 'not-underline'];

  addDeviceTargetedOptions(sidebar, element, 'Text Color', 'text', textColorOptions, 'icon-select');
  addDeviceTargetedOptions(sidebar, element, 'Font Size', 'text', textSizeOptions, 'single-icon-select');
  addDeviceTargetedOptions(sidebar, element, 'Font Style', 'italic', fontStyleOptions, 'toggle');
  addDeviceTargetedOptions(sidebar, element, 'Font Weight', 'font', fontWeightOptions, 'single-icon-select');
  addDeviceTargetedOptions(sidebar, element, 'Font Style', 'underline', fontUnderlineOptions, 'toggle');
  addDeviceTargetedOptions(sidebar, element, 'Text Alignment', 'text', textAlignOptions, 'icon-select');
}

function addEditableMetadata(container) {
  /* 
  defaults:
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  automatically generate?:
    <meta name="description" content="This page was built using pageSage">
    <meta property="og:title" content="Untitled | Built w/ pageSage">
  */

  const params = new URLSearchParams(window.location.search);
  const config = params.get('config');
  const metaDataPairsContainer = document.createElement('div');
  metaDataPairsContainer.innerHTML = '<h3 class="font-semibold text-lg mb-2">Metadata</h3>';
  metaDataPairsContainer.className = 'my-2 col-span-5 border border-slate-200 overflow-y-scroll p-2 max-h-48'
  container.appendChild(metaDataPairsContainer);
  const metaTags = loadPageMetadata(config, metaDataPairsContainer);
  console.log(metaTags);

  metaTags.forEach(tag => {
    addMetadataPair(tag.type, tag.name, tag.content);
  });
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
    select.appendChild(optionName);
    select.appendChild(optionProperty);

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
  addButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" /></svg> Metadata';
  addButton.className = 'col-span-2 bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded h-12 w-28 mt-2';
  addButton.id = 'add-metadata-button';
  container.appendChild(addButton);

  addButton.addEventListener('click', function () {
    addMetadataPair();
  });

  document.querySelectorAll('.metadata').forEach(input => {
    input.addEventListener('change', function () {
      const params = new URLSearchParams(window.location.search);
      const config = params.get('config');
      const storedData = JSON.parse(localStorage.getItem('pageSageStorage'));
      const settings = JSON.parse(storedData.pages[config].settings);
      const metaTags = [];
  
      document.querySelectorAll('.metadata-pair').forEach(pair => {
        const type = pair.querySelector('.meta-type').value;
        const name = pair.querySelector('.meta-name').value;
        const content = pair.querySelector('.meta-content').value;
        if (name && content) {
          metaTags.push({ type, name, content });
        }
      });
  
      settings.metaTags = metaTags;
      storedData.pages[config].settings = JSON.stringify(settings);
      localStorage.setItem('pageSageStorage', JSON.stringify(storedData));
      console.log('Metadata saved successfully!');
    });
  });
}

// TODO: Add these to sidebar once 'Advanced' settings is implemented
// This particular HTML function should most likely be a dedicated content.js content feature
function addManualHtmlElement(sidebar, element) {
  addDeviceTargetedOptions(sidebar, element, 'html', '', [], 'textarea');
}

// TODO: Add these to sidebar once 'Advanced' settings is implemented
function addManualClassEditor(sidebar, element) {
  addDeviceTargetedOptions(sidebar, element, 'class', '', [], 'textarea');
}

// TODO: Add these to sidebar once 'Advanced' settings is implemented
function addManualCssEditor(sidebar, element) {
  addDeviceTargetedOptions(sidebar, element, 'css', '', [], 'textarea');
}