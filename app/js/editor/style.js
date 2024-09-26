/*

  editor/style.js

*/

// This function gives a scrollable box for editing background colors.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableBackgroundColor(sidebar, element) {
  const colors = colorArray;
  const labelPrefix = 'Background Color';
  const cssClassBase = 'bg';

  addDeviceTargetedOptions(sidebar, element, labelPrefix, cssClassBase, colors, 'icon-select');
} // DATA OUT: null

// This function gives all the bits needed for changing border colors & styles.
// Like background color, it is in a handy little scrollable box.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
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
} // DATA OUT: null

// This function adds brevity to sidebar populating functions since if one is
// being added, I can't think of a scenario where the other wouldn't be as well
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableMarginAndPadding(sidebar, element) {
  addEditableMargin(sidebar, element);
  addEditablePadding(sidebar, element);
} // DATA OUT: null

// This function gives all the necessary bits for editing paddings.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditablePadding(sidebar, element) {
  const sides = ['t', 'b', 'l', 'r', 'a']; // added a for all sides
  const values = ['0', '1', '2', '4', '8', '16'];

  sides.forEach(side => {
    let cssClassBase;
  
    if (side === 'a') {
      cssClassBase = 'p';
      element.classList.remove('pt', 'pb', 'pl', 'pr'); 
    } else {
      cssClassBase = `p${side}`;
    }
  
    addDeviceTargetedOptions(sidebar, element, `Padding (${side === 'a' ? 'All' : side})`, cssClassBase, values, 'single-icon-select');
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

    const resetPaddingElement = document.createElement('div');
    const label = createLabel(bp, `Reset Padding`, `${bp}-padding`);
    label.className = 'hidden';
    paddingContainer.appendChild(label);
    paddingContainer.appendChild(resetPaddingElement);
    handleReset(bp, element, ['pt', 'pr', 'pb', 'pl', 'p'], values, resetPaddingElement);
    resetPaddingElement.classList.add('col-span-1');
  });
} // DATA OUT: null

// This function gives all the necessary bits for editing margins.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableMargin(sidebar, element) {
  const sides = ['t', 'b', 'l', 'r', 'a']; // added a for all sides
  const values = ['0', '1', '2', '4', '8', '16'];

  sides.forEach(side => {
    const cssClassBase = side === 'a' ? 'm' : `m${side}`;

    addDeviceTargetedOptions(sidebar, element, `Margin (${side === 'a' ? 'All' : side})`, cssClassBase, values, 'single-icon-select');
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

    const resetMarginElement = document.createElement('div');
    const label = createLabel(bp, `Reset Margins`, `${bp}-margin`);
    label.className = 'hidden';
    marginContainer.appendChild(label);
    marginContainer.appendChild(resetMarginElement);
    handleReset(bp, element, ['mt', 'mr', 'mb', 'ml', 'm'], values, resetMarginElement);
    resetMarginElement.classList.add('col-span-1');
  });
} // DATA OUT: null

// This function allows the laoding of a background image via remote URL.
// See `addEditableBackgroundFeatures` for the styling specific editing options.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableBackgroundImageURL(sidebar, grid) {
  const labelPrefix = 'Background Image URL';
  const cssClassBase = 'bg';

  addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, null, 'input');
} // DATA OUT: null

// This function is for adding the background image itself via direct "upload".
// The word "upload" is in quotes because the attachment is simply being put
// into the document as a plaintext base64 image blob.
// See `addEditableBackgroundFeatures` for the styling specific editing options.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableBackgroundImage(sidebar, grid) {
  const labelPrefix = 'Background Image File';
  const cssClassBase = 'bg';

  // Add file input for direct image selection
  addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, null, 'input');

  const fileInput = sidebar.querySelector('input[type="file"]');
  if (fileInput) {
    const placeholderDropdown = document.createElement('select');
    placeholderDropdown.className = fileInput.className;
    placeholderDropdown.style.width = '100%';
    placeholderDropdown.style.padding = '8px';
    placeholderDropdown.style.border = '1px solid #ccc';
    placeholderDropdown.style.borderRadius = '4px';
    placeholderDropdown.style.marginTop = '8px';
    placeholderDropdown.style.boxSizing = 'border-box';

    const imageOnlyMedia = Object.keys(appSagePlaceholderMedia).filter(key => {
      return appSagePlaceholderMedia[key].endsWith('.jpg') ||
             appSagePlaceholderMedia[key].endsWith('.png') ||
             appSagePlaceholderMedia[key].endsWith('.svg');
    }).reduce((obj, key) => {
      obj[key] = appSagePlaceholderMedia[key];
      return obj;
    }, {});

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select Placeholder Image';
    placeholderDropdown.appendChild(defaultOption);

    for (const key in imageOnlyMedia) {
      const option = document.createElement('option');
      option.value = imageOnlyMedia[key];
      option.textContent = key;
      placeholderDropdown.appendChild(option);
    }

    fileInput.parentElement.appendChild(placeholderDropdown);

    fileInput.addEventListener('change', function () {
      if (fileInput.files.length > 0) {
        placeholderDropdown.value = '';
        placeholderDropdown.disabled = false;
      }
    });

    placeholderDropdown.addEventListener('change', function () {
      if (placeholderDropdown.value) {
        fileInput.value = '';
        fileInput.disabled = false;

        // Apply background using Tailwind-style class or inline CSS
        grid.style.backgroundImage = '';
        grid.classList.remove(...Array.from(grid.classList).filter(c => c.startsWith('bg-'))); // Clear previous background classes
        grid.classList.add(`bg-[url('${placeholderDropdown.value}')]`);
        grid.style.backgroundSize = 'cover';
        grid.style.backgroundPosition = 'center';
      }
    });
  } else {
    console.error('No existing file input found.');
  }
} // DATA OUT: null

// This function is dedicated for adding the necessary editing options for
// background images and the styles applicable to them.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addEditableBackgroundFeatures(sidebar, grid) {
  const bgSizeOptions = ['cover', 'contain'];
  const bgPositionOptions = ['center', 'top', 'bottom', 'left', 'right'];
  const bgRepeatOptions = ['repeat', 'no-repeat', 'repeat-x', 'repeat-y'];

  // Function to update background image size
  function addBackgroundSizeOptions() {
    const labelPrefix = 'Background Size';
    const cssClassBase = 'bg';

    addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, bgSizeOptions, 'icon-select');

    // Add Reset Button for Background Size
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    breakpoints.forEach(bp => {
      const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
      const resetSizeElement = document.createElement('div');
      const label = createLabel(bp, `Reset Background Size`, `${bp}-bg-size`);
      label.className = 'hidden';
      container.appendChild(label);
      container.appendChild(resetSizeElement);

      // Add the handleReset call for background size
      handleReset(bp, grid, ['cover', 'contain'], 'bg', resetSizeElement);
      resetSizeElement.classList.add('col-span-1');
    });
  }

  // Function to update background position
  function addBackgroundPositionOptions() {
    const labelPrefix = 'Background Position';
    const cssClassBase = 'bg';

    addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, bgPositionOptions, 'icon-select');

    // Add Reset Button for Background Position
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
    breakpoints.forEach(bp => {
      const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
      const resetPositionElement = document.createElement('div');
      const label = createLabel(bp, `Reset Background Position`, `${bp}-bg-position`);
      label.className = 'hidden';
      container.appendChild(label);
      container.appendChild(resetPositionElement);

      // Add the handleReset call for background position
      handleReset(bp, grid, bgPositionOptions, 'bg', resetPositionElement);
      resetPositionElement.classList.add('col-span-1');
    });
  }

  // Function to update background repeat
  function addBackgroundRepeatOptions() {
    const labelPrefix = 'Background Repeat';
    const cssClassBase = 'bg';

    addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, bgRepeatOptions, 'icon-select');
  }

  // Calling all functions to add options and reset buttons
  addBackgroundSizeOptions();
  addBackgroundPositionOptions();
  addBackgroundRepeatOptions();
}// DATA OUT: null

// This funciton is dedicated to adding the editing elements relevant to the
// suite of expected editing options for stylizing text and its placement.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>']
function addTextOptions(sidebar, element) {
  const textColorOptions = colorArray;
  const textSizeOptions = ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'];
  const textAlignOptions = ['left', 'center', 'right', 'justify'];
  const fontWeightOptions = ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black'];
  const fontStyleOptions = ['italic', 'not-italic'];
  const fontUnderlineOptions = ['underline', 'not-underline'];

  addDeviceTargetedOptions(sidebar, element, 'Text Color', 'text', textColorOptions, 'icon-select');
  // Add Reset Button for Text Color
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  breakpoints.forEach(bp => {
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    const resetTextColorElement = document.createElement('div');
    const label = createLabel(bp, `Reset Text Color`, `${bp}-text-color`);
    label.className = 'hidden';
    container.appendChild(label);
    container.appendChild(resetTextColorElement);

    // Add the handleReset call for text color
    handleReset(bp, element, textColorOptions, 'text', resetTextColorElement);
    resetTextColorElement.classList.add('col-span-1');
  });

  addDeviceTargetedOptions(sidebar, element, 'Font Size', 'text', textSizeOptions, 'single-icon-select');
  addDeviceTargetedOptions(sidebar, element, 'Font Style', 'italic', fontStyleOptions, 'toggle');
  addDeviceTargetedOptions(sidebar, element, 'Font Weight', 'font', fontWeightOptions, 'single-icon-select');
  addDeviceTargetedOptions(sidebar, element, 'Font Style', 'underline', fontUnderlineOptions, 'toggle');
  addDeviceTargetedOptions(sidebar, element, 'Text Alignment', 'text', textAlignOptions, 'icon-select');
} // DATA OUT: null

// TODO: This doesn't quite work properly yet
// This particular HTML function should most likely be a dedicated content.js content feature
function addManualHtmlElement(sidebar, element) {
  if (localStorage.getItem(appSageSettings)){
    if(JSON.parse(localStorage.appSageSettings).advancedMode) {
      addDeviceTargetedOptions(sidebar, element, 'html', '', [], 'textarea');
    }
  }
} // DATA OUT: null

function addManualClassEditor(sidebar, element) {
  if (localStorage.getItem(appSageSettings)){
    if(JSON.parse(localStorage.appSageSettings).advancedMode) {
      addDeviceTargetedOptions(sidebar, element, 'class', '', [], 'textarea');
    }
  }
} // DATA OUT: null

function addManualCssEditor(sidebar, element) {
  if (localStorage.getItem(appSageSettings)){
    if(JSON.parse(localStorage.appSageSettings).advancedMode) {
      addDeviceTargetedOptions(sidebar, element, 'css', '', [], 'textarea');
    }
  }
} // DATA OUT: null

function addEditableDimensions(sidebar, element){
  const heightOpts = [['min-h', 'Minimum Height'], ['h', 'Height'], ['max-h', 'Maximum Height']];
  const widthOpts = [['min-w', 'Minimum Width'], ['w', 'Width'], ['max-w', 'Maximum Width']];
  const lengthOptions = ['auto', 'full', 'screen', '1/2', '1/3', '2/3', '1/4', '3/4', '1/5', '2/5', '3/5', '4/5', '1/6', '5/6', '8', '10', '12', '16', '20', '24', '28', '32', '36', '40', '44', '48', '52', '64', '72', '96'];
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  breakpoints.forEach(bp => {
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    const sizeContainer = document.createElement('div');
    sizeContainer.className = 'grid grid-cols-4 col-span-5';

    widthOpts.forEach(widthOpt => {
      // 0 = class prefix, e.g. `min-w`
      // 1 = Plain English, e.g. 'Minimum Width'
      const label = createLabel(bp, widthOpt[1], `${bp}-${widthOpt[0]}`);
      control = document.createElement('div');
      sizeContainer.appendChild(label);
      sizeContainer.appendChild(control);
      handleSingleIconSelect(bp, widthOpt[1], lengthOptions, widthOpt[0], element, control);
    });

    resetHeightElement = document.createElement('div');
    const label = createLabel(bp, `Reset`, `${bp}-min-w,max-w,w`);
    label.className = 'hidden';
    sizeContainer.appendChild(label);
    sizeContainer.appendChild(resetHeightElement);
    handleReset(bp, element, ['min-w', 'max-w', 'w'], lengthOptions, resetHeightElement);
    resetHeightElement.classList.add('col-span-1');

    container.appendChild(sizeContainer);
  });

  breakpoints.forEach(bp => {
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    const sizeContainer = document.createElement('div');
    sizeContainer.className = 'grid grid-cols-4 col-span-5';

    heightOpts.forEach(heightOpt => {
      // 0 = class prefix, e.g. `min-h`
      // 1 = Plain English, e.g. 'Minimum Height'
      const label = createLabel(bp, heightOpt[1], `${bp}-${heightOpt[0]}`);
      control = document.createElement('div');
      sizeContainer.appendChild(label);
      sizeContainer.appendChild(control);
      handleSingleIconSelect(bp, heightOpt[1], lengthOptions, heightOpt[0], element, control);
    });

    resetHeightElement = document.createElement('div');
    const label = createLabel(bp, `Reset`, `${bp}-min-h,max-h,h`);
    label.className = 'hidden';
    sizeContainer.appendChild(label);
    sizeContainer.appendChild(resetHeightElement);
    handleReset(bp, element, ['min-h', 'max-h', 'h'], lengthOptions, resetHeightElement);
    resetHeightElement.classList.add('col-span-1');

    container.appendChild(sizeContainer);
  });
} // DATA OUT: null

function addEditableColumnGaps(sidebar, element) {
  const axis = ['x', 'y', 'all'];
  const lengthOptions = ['0', '1', '2', '4', '8', '16'];
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  breakpoints.forEach(bp => {
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    const gapContainer = document.createElement('div');
    gapContainer.className = 'grid grid-cols-4 col-span-5';

    axis.forEach(axisOpt => {
      const cssClassBase = `gap-${axisOpt}`;
      const label = createLabel(bp, `Gap (${axisOpt})`, `${bp}-${`Gap (${axisOpt})`.replace(' ', '-')}-${cssClassBase}`);
      control = document.createElement('div');
      gapContainer.appendChild(label);
      gapContainer.appendChild(control);
      handleSingleIconSelect(bp, `Gap (${axisOpt})`, lengthOptions, cssClassBase, element, control);
    });

    resetElement = document.createElement('div');
    const label = createLabel(bp, `Reset`, `${bp}-gap-x,gap-y,gap`);
    label.className = 'hidden';
    gapContainer.appendChild(label);
    gapContainer.appendChild(resetElement);
    handleReset(bp, element, ['gap-x', 'gap-y', 'gap'], lengthOptions, resetElement);
    resetElement.classList.add('col-span-1');

    container.appendChild(gapContainer);
  });
} // DATA OUT: null