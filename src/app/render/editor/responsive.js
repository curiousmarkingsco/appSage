/*

  editor/responsive.js

  This file is dedicated to spitting out all sidebar editor options to the
  sidebar for each of the supported breakpoints; xs, sm, md, lg, xl, and 2xl.

*/

// This function orchestrates which where everything goes based on the input
// type and spits it out to all the breakpoints provided in the array.
// DATA IN: ['HTML Element, <div id="sidebar-dynamic">', 'HTML Element, <div>', 'String || Array:String', 'String || Array:String', 'String || Array:String', 'String']
function addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, options, inputType = 'select') {
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  breakpoints.forEach(bp => {
    const label = createLabel(bp, labelPrefix, `${bp}-${labelPrefix.replace(' ', '-')}-${cssClassBase}`);
    let control;
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);

    switch (inputType) {
      case 'input':
        control = document.createElement('input');
        container.appendChild(label);
        container.appendChild(control);
        handleInput(bp, labelPrefix, options, cssClassBase, grid, control);
        // If this is for a background image file, append the placeholder dropdown
        if (labelPrefix === 'Background Image File') {
          addPlaceholderDropdown(control, grid);
        }
        control.classList.add('col-span-5');
        break;
      case 'textarea':
        control = document.createElement('textarea');
        container.appendChild(label);
        container.appendChild(control);
        handleTextareaType(labelPrefix, grid, control);
        control.classList.add('col-span-5');
        break;
      case 'single-icon-select':
        control = document.createElement('div');
        container.appendChild(label);
        container.appendChild(control);
        handleSingleIconSelect(bp, labelPrefix, options, cssClassBase, grid, control);
        break;
      case 'reset':
        control = document.createElement('div');
        label.className = 'hidden';
        container.appendChild(label);
        container.appendChild(control);
        handleReset(bp, grid, options, cssClassBase, control);
        control.classList.add('col-span-1');
        break;
      case 'icon-select':
        control = document.createElement('div');
        container.appendChild(label);
        container.appendChild(control);
        handleIconSelect(bp, grid, options, labelPrefix, cssClassBase, control);
        control.classList.add('col-span-5');
        break;
      case 'toggle':
        control = document.createElement('div');
        container.appendChild(label);
        container.appendChild(control);
        handleToggle(bp, options, grid, cssClassBase, control);
        control.classList.add('col-span-1');
        break;
      case 'select':
        control = document.createElement('select');
        container.appendChild(label);
        container.appendChild(control);
        handleSelect(bp, grid, control, options, cssClassBase, labelPrefix);
        control.classList.add('col-span-5');
        break;
      default:
        console.error('Unsupported input type specified.');
        return;
    }
  });
} // DATA OUT: null
window.addDeviceTargetedOptions = addDeviceTargetedOptions;

// This function messily handles all the nuance thus far encountered from
// supporting resetting styles for the sidebar editor controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleReset(bp, grid, options, cssClassBase, control) {
  const resetButton = document.createElement('button');
  resetButton.innerHTML = appSageEditorIcons['reset'];
  resetButton.className = 'iconButton h-12 w-12 p-4 bg-slate-100 hover:bg-slate-200 p-2 rounded';
  resetButton.setAttribute('data-extra-info', tooltips['reset']);
  control.appendChild(resetButton);

  resetButton.onclick = () => {
    options.forEach(opt => {
      // Check if cssClassBase is an array or a string
      if (Array.isArray(cssClassBase)) {
        // If it's an array, loop through each class and remove the class from the grid
        cssClassBase.forEach(cssClass => {
          if (opt.includes('gap') || (/^p(t|r|b|l)?$/.test(opt)) || (/^m(t|r|b|l)?$/.test(opt))) {
            grid.classList.remove(`${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${opt}-${cssClass}`);
          } else {
            grid.classList.remove(`${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClass}-${opt}`);
          }
        });
      } else {
        // If it's a string, directly remove the class from the grid
        if (opt.includes('gap') || (/^p(t|r|b|l)?$/.test(opt)) || (/^m(t|r|b|l)?$/.test(opt))) {
          grid.classList.remove(`${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${opt}-${cssClassBase}`);
        } else {
          grid.classList.remove(`${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`);
        }
      }
    });
  };
} // DATA OUT: null
window.handleReset = handleReset;

function handleHtml(element, controlValue, mode = 'apply') {
  // Check or assign a unique class to the element
  let uniqueClass = Array.from(element.classList).find(cls => cls.startsWith('custom-html-'));
  if (!uniqueClass) {
    uniqueClass = `custom-html-${generateUniqueId()}`;
    element.classList.add(uniqueClass);
  }

  const htmlClass = uniqueClass;

  if (mode === 'apply') {
    // Remove existing html tag if it exists
    const existingHtmlTag = document.querySelector(`#${htmlClass}`);
    if (existingHtmlTag) {
      existingHtmlTag.remove();
    }

    if (controlValue.trim()) {
      try {
        // Create a new html tag
        const customHtml = document.createElement('div');
        customHtml.id = htmlClass;
        customHtml.class = 'ugc-keep'
        customHtml.innerHTML = controlValue;
        element.appendChild(customHtml);
      } catch (error) {
        console.error('Error applying custom HTML:', error);
      }
    }
  } else if (mode === 'retrieve') {
    // Retrieve existing html content if present
    const existingHtmlTag = document.getElementById(`${htmlClass}`);
    return existingHtmlTag ? existingHtmlTag.innerHTML : '';
  }
}
window.handleHtml = handleHtml;

function handleJs(element, controlValue, mode = 'apply') {
  // Check or assign a unique class to the element
  let uniqueClass = Array.from(element.classList).find(cls => cls.startsWith('custom-js-'));
  if (!uniqueClass) {
    uniqueClass = `custom-js-${generateUniqueId()}`;
    element.classList.add(uniqueClass);
  }

  const scriptClass = uniqueClass;

  if (mode === 'apply') {
    // Remove existing script tag if it exists
    const existingScript = document.querySelector(`#${scriptClass}`);
    if (existingScript) {
      existingScript.remove();
    }

    if (controlValue.trim()) {
      try {
        // Create a new script tag
        const script = document.createElement('script');
        script.id = scriptClass;
        script.class = 'ugc-keep'
        script.textContent = controlValue;
        element.appendChild(script);
      } catch (error) {
        console.error('Error applying custom JS:', error);
      }
    }
  } else if (mode === 'retrieve') {
    // Retrieve existing script content if present
    const existingScript = document.getElementById(`${scriptClass}`);
    return existingScript ? existingScript.textContent : '';
  }
}
window.handleJs = handleJs;

function executeCustomJSAfterLoad() {
  const applyScripts = () => {
    // Find all elements with a class starting with 'custom-js-'
    const elements = document.querySelectorAll('[class*="custom-js-"]');

    elements.forEach(element => {
      // Extract the class that starts with 'custom-js-'
      const customJsClass = Array.from(element.classList).find(cls => cls.startsWith('custom-js-'));
      if (customJsClass) {
        // Retrieve the script content associated with this element
        const controlValue = handleJs(element, '', 'retrieve');

        if (controlValue) {
          // Apply the retrieved script
          handleJs(element, controlValue, 'apply');
        }
      }
    });
  };

  if (document.readyState === 'complete') {
    // If the page is already fully loaded
    applyScripts();
  } else {
    // Wait for the page to fully load
    window.addEventListener('load', applyScripts);
  }
}
window.executeCustomJSAfterLoad = executeCustomJSAfterLoad;

// This function is intended to facilitate manual CSS styling for the textarea
// field dedicated for this activity.
// DATA IN: ['HTML Element, <div>', 'String']
function handleStyles(element, controlValue, mode = 'apply') {
  if (element) {
    if (mode === 'apply') {
      // Apply styles to the element
      const styles = controlValue.split(';');
      styles.forEach(style => {
        const [property, value] = style.split(':');
        if (property && value) {
          const camelCaseProperty = property.trim().replace(/-([a-z])/g, (match, p1) => p1.toUpperCase());
          element.style[camelCaseProperty] = value.trim();
        }
      });
    } else if (mode === 'retrieve') {
      // Retrieve inline styles from the element
      const computedStyles = element.style;
      const retrievedStyles = [];

      for (let i = 0; i < computedStyles.length; i++) {
        const property = computedStyles[i];
        const value = computedStyles.getPropertyValue(property);

        if (value) {
          // Convert camelCase properties back to kebab-case
          const kebabCaseProperty = property.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
          retrievedStyles.push(`${kebabCaseProperty}:${value}`);
        }
      }

      // Join styles into a semicolon-separated string
      return retrievedStyles.join(';') + ';';
    }
  }
}
window.handleStyles = handleStyles;
// DATA OUT: null

// This function attempts to find existing styles so that other functions know
// what/where to replace new classes, if applicable.
// DATA IN: ['String:Breakpoint class name', 'Array:String', 'String', 'HTML Element, <div>]
function getCurrentStyle(bp, options, cssClassBase, grid) {
  if (options) {
    return options.find(option => {
      const className = `${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}${cssClassBase !== '' ? '-': ''}${option}`;
      return grid.classList.contains(className);
    }) || '';
  }
} // DATA OUT: String
window.getCurrentStyle = getCurrentStyle;

// This function is the catch-all for handling labels of the sidebar editor
// elements. Its primary purpose is to reduce label clutter by narrowing
// certain groupings of style elements into categories where the label can
// represent all elements of that category, while the redundant ones remain
// in the document for accessibility, but invisible to the naked eye.
// DATA IN: ['String:Breakpoint class name', 'String', 'String']
function createLabel(bp, labelPrefix, forAttr) {
  const collapseLabels = (labelPrefix.includes('Margin') || labelPrefix.includes('Padding') || labelPrefix.includes('Font') || labelPrefix.includes('Border Radius') || labelPrefix.includes('Border Color') || labelPrefix.includes('Height') || labelPrefix.includes('Width') || labelPrefix.includes('Gap'));
  let keepLabel = (labelPrefix === 'Margin (t)' ? true : false || labelPrefix === 'Padding (t)' ? true : false || labelPrefix === 'Font Family' ? true : false || labelPrefix === 'Border Width' ? true : false || labelPrefix === 'Minimum Height' ? true : false || labelPrefix === 'Minimum Width' ? true : false || labelPrefix === 'Gap (x)' ? true : false);
  let advanced = false;
  if (labelPrefix === 'class' || labelPrefix === 'inline css') {
    advanced = true;
  }
  if (collapseLabels && keepLabel === false) {
    const label = document.createElement('label');
    label.className = 'hidden';
    return label
  } else {
    keepLabel = labelPrefix.replace(' (t)', '');
    keepLabel = labelPrefix.replace('Minimum ', '');
    keepLabel = keepLabel.includes('Font Family') ? 'Font Styles' : keepLabel;
    keepLabel = keepLabel.includes('Border Width') ? 'Border Width & Radius' : keepLabel;
    keepLabel = keepLabel.includes('Gap') ? 'Gaps Between Columns' : keepLabel;
    const label = document.createElement('label');
    const mobileIcon = document.createElement('span')
    mobileIcon.className = 'h-3 w-3 mr-2 inline-block';
    mobileIcon.innerHTML = `${appSageEditorIcons['responsive'][bp]}`;
    label.innerHTML = `<span class="inline-block">${keepLabel}${advanced === true ? ' (Advanced Option)' : ''}</span>`;
    label.className = 'block col-span-5 text-slate-700 text-xs uppercase mt-2';
    label.setAttribute('for', forAttr);
    label.prepend(mobileIcon);
    return label;
  }
} // DATA OUT: HTML Element, <label>
window.createLabel = createLabel;

// This function messily handles all the nuance thus far encountered from
// supporting file-based input elements for sidebar editor controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleInput(bp, labelPrefix, options, cssClassBase, grid, control) {
  const isFile = labelPrefix.includes('File');
  const isUrl = (labelPrefix === 'Background Image URL');
  control.type = isFile ? 'file' : 'text';
  if (isFile) control.setAttribute('accept', 'image/*');
  if (isUrl) {
    const url = String(grid.classList).match(/bg-\[url\('([^']*)'\)\]/);
    if (url) control.value = url[1] || '';
  } else if (!isFile) { 
    control.value = getCurrentStyle(bp, options, cssClassBase, grid);
  }
  control.className = 'shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
  let newValue;
  control.onchange = (event) => {
    if (isUrl) {
      // assumes 'bg' is URL
      newValue = `${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${cssClassBase === 'bg' ? '[url(\'' : ''}${control.value}${cssClassBase === 'bg' ? '\')]' : ''}`;
      const classRegex = new RegExp(`\\b${bp === 'xs' ? ' ' : bp + ':'}${cssClassBase}-\\d+\\b`, 'g');
      grid.className = grid.className.replace(classRegex, '').trim() + ` ${newValue}`;
    } else if (labelPrefix === 'Background Image File') {
      grid.style.backgroundImage = '';
      generateMediaUrl(event, grid, true);
      displayMediaFromStorage(grid);
    }
  };
} // DATA OUT: null
window.handleInput = handleInput;

// This function messily handles all the nuance thus far encountered from
// supporting textarea elements for sidebar editor controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleTextareaType(labelPrefix, grid, control) {
  if (labelPrefix == 'html') {
    control.value = handleHtml(grid, '', 'retrieve');
  }
  if (labelPrefix == 'class') {
    control.value = (grid.classList);
  }
  if (labelPrefix == 'inline css') {
    control.value = handleStyles(grid, '', 'retrieve');
  }
  if (labelPrefix == 'inline js') {
    control.value = handleJs(grid, '', 'retrieve');
  }
  control.className = 'shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
  control.onchange = () => {
    if (labelPrefix == 'class') grid.className = control.value;
    if (labelPrefix == 'html') {
      control.value = handleHtml(grid, control.value, 'apply');
    }
    if (labelPrefix == 'inline css') {
      handleStyles(grid, control.value, 'apply');
    }
    if (labelPrefix == 'inline js') {
      control.value = handleJs(grid, control.value, 'apply');
    }
  };
} // DATA OUT: null
window.handleTextareaType = handleTextareaType;

// This function messily handles all the nuance thus far encountered from
// supporting select elements using icons for each option in sidebar controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleSingleIconSelect(bp, labelPrefix, options, cssClassBase, grid, control) {
  cssClassBase = cssClassBase.includes('-all') ? cssClassBase.replace('-all', '') : cssClassBase;
  const fontSize = (labelPrefix === 'Font Size' || labelPrefix === 'Font Weight');
  const borderOption = (labelPrefix === 'Border Width' || labelPrefix === 'Border Radius');
  const smallSelect = (labelPrefix.includes('Margin') || labelPrefix.includes('Padding') || labelPrefix.includes('Gap') || labelPrefix.includes('Height') || labelPrefix.includes('Width'));
  const iconTargetName = labelPrefix.toLowerCase().replace(' ', '-').replace(/[()]/g, '');

  control.className = `flex relative h-12 ${borderOption ? 'w-24 col-span-2 ' : ''}${fontSize ? 'w-48 col-span-4 ' : ''}${(smallSelect && !borderOption) ? (labelPrefix + ' w-20 ') : ''}`;

  const iconTarget = appSageEditorIcons[iconTargetName];
  const iconButton = document.createElement('span');
  iconButton.innerHTML = iconTarget;
  iconButton.className = `absolute ${(smallSelect && !borderOption) ? 'right-4 top-1 bg-none h-10 w-10' : 'right-0.5 top-0.5 bg-slate-50 h-11 w-11'} px-2 py-1 rounded-sm border-none pointer-events-none`;

  const selectControl = document.createElement('select');
  let extraInfo;
  if (labelPrefix.includes('Padding')) {
    extraInfo = tooltips['padding']
  } else if (labelPrefix.includes('Margin')) {
    extraInfo = tooltips['margin']
  } else if (labelPrefix.includes('Opacity')) {
    extraInfo = tooltips['opacity']
  } else {
    const attribute = labelPrefix.replace('Border ', '').replace('Font ', '').toLowerCase();
    extraInfo = `Change the <span class="${attribute === 'size' ? 'text-base' : ''}${attribute === 'weight' ? 'font-bold' : ''}">${attribute}</span>${borderOption ? ' of this element\'s border' : ''}${fontSize ? ' of your text' : ''}${attribute === 'weight' ? '<br>Nothing happening when making weight a selection? Not all fonts support these options' : ''}`;
  }

  selectControl.setAttribute('data-extra-info', extraInfo);
  selectControl.className = `appearance-none w-full bg-slate-50 p-2 border border-slate-300 ${(smallSelect && !borderOption) ? 'max-w-16 ' : ''}${fontSize ? 'pr-24 ' : ''}relative rounded`;

  options.forEach(option => {
    const value = `${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`;
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = option;
    optionElement.selected = String(grid.classList).includes(value);
    selectControl.appendChild(optionElement);
  });

  selectControl.onchange = () => {
    options.forEach(opt => {
      const classToRemove = `${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`;
      grid.classList.remove(classToRemove);
    });

    // Remove any individual side-specific classes for both margin and padding
    if (cssClassBase === 'm') {
      grid.classList.remove('mt-0', 'mb-0', 'ml-0', 'mr-0', 'mt-1', 'mb-1', 'ml-1', 'mr-1', 'mt-2', 'mb-2', 'ml-2', 'mr-2', 'mt-4', 'mb-4', 'ml-4', 'mr-4', 'mt-8', 'mb-8', 'ml-8', 'mr-8', 'mt-16', 'mb-16', 'ml-16', 'mr-16');
    }

    if (cssClassBase === 'p') {
      grid.classList.remove('pt-0', 'pb-0', 'pl-0', 'pr-0', 'pt-1', 'pb-1', 'pl-1', 'pr-1', 'pt-2', 'pb-2', 'pl-2', 'pr-2', 'pt-4', 'pb-4', 'pl-4', 'pr-4', 'pt-8', 'pb-8', 'pl-8', 'pr-8', 'pt-16', 'pb-16', 'pl-16', 'pr-16');
    }

    grid.classList.add(selectControl.value);
  };

  control.appendChild(selectControl);
  control.appendChild(iconButton);
}// DATA OUT: null
window.handleSingleIconSelect = handleSingleIconSelect;

// This function messily handles all the nuance thus far encountered from 
// supporting icon styled select dropdowns for sidebar editor controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleIconSelect(bp, grid, options, labelPrefix, cssClassBase, control) {
  if (!options) {
    console.error('No options provided for icons input type.');
    return;
  }
  const swatchboard = (labelPrefix === 'Text Color' || labelPrefix === 'Background Color' || labelPrefix === 'Border Color');
  const bgIcon = (labelPrefix === 'Background Position' || labelPrefix === 'Background Repeat');
  control.className = `grid grid-cols-5 col-span-5 gap-x-1 gap-y-2 overflow-y-scroll ${swatchboard ? 'hidden h-40 p-2 border bg-[#000000] dark:bg-[#ffffff] border-slate-400' : ''}`;

  if (swatchboard) {
    const toggleButton = document.createElement('button');
    toggleButton.className = `${labelPrefix === 'Border Color' ? 'col-span-1' : 'col-span-5'} w-full bg-[#ffffff] text-left shadow border rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline`;
    toggleButton.innerHTML = `<svg class="h-5 w-5 inline mr-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6l319.2 0 42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z"/></svg>${labelPrefix === 'Border Color' ? '' : ' ' + labelPrefix}`;
    toggleButton.setAttribute('data-extra-info', tooltips['color-vision-impairement']);
    toggleButton.addEventListener('click', function () {
      control.classList.toggle('hidden');
    });
    control.parentElement.insertBefore(toggleButton, control);

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.className = 'col-span-5 mb-2 w-full h-10 p-1 rounded';

    colorPicker.addEventListener('input', () => {
      const selectedColor = colorPicker.value;
      grid.classList.remove(`${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-[${selectedColor}]`);
      options.forEach(opt => {
        grid.classList.remove(`${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`);
      });
      let tailwindColorClass;

      if (labelPrefix === 'Text Color') {
        tailwindColorClass = `text-[${selectedColor}]`;
        grid.classList.forEach(cls => {
          if (/^text-\[.*\]$/.test(cls)) {
            grid.classList.remove(cls);
          }
        });
      } else if (labelPrefix === 'Background Color') {
        tailwindColorClass = `bg-[${selectedColor}]`;
        grid.classList.forEach(cls => {
          if (/^bg-\[.*\]$/.test(cls)) {
            grid.classList.remove(cls);
          }
        });
      } else if (labelPrefix === 'Border Color') {
        tailwindColorClass = `border-[${selectedColor}]`;
        grid.classList.forEach(cls => {
          if (/^border-\[.*\]$/.test(cls)) {
            grid.classList.remove(cls);
          }
        });
      }

      // Add the new Tailwind color class
      grid.classList.add(tailwindColorClass);
    });

    control.appendChild(colorPicker);
  }
  options.forEach(option => {
    const iconButton = document.createElement('button');
    iconButton.className = `iconButton ${option === 'reset' ? 'p-4 bg-slate-100 hover:bg-slate-200 ' : (swatchboard ? 'border-2 hover:border-sky-200 ' : 'bg-slate-200 hover:bg-slate-300 ')}${(bgIcon && option !== 'reset') ? 'p-0' : 'p-2'} rounded ${labelPrefix === 'Text Color' ? 'backdrop-invert' : ''}`;
    if (getCurrentStyle(bp, options, cssClassBase, grid) === option) {
      iconButton.classList.remove('bg-slate-200');
      iconButton.classList.add('bg-sky-200');
    }
    let iconTextCandidate1 = `${cssClassBase}-${option}`;
    let iconTextCandidate2 = labelPrefix.toLowerCase().replace(' ', '-');
    const iconTarget = appSageEditorIcons[iconTextCandidate1] || appSageEditorIcons[iconTextCandidate2] || appSageEditorIcons[option];
    iconButton.innerHTML = iconTarget;
    if (labelPrefix === 'Text Alignment') {
      iconButton.setAttribute('data-extra-info', `${option === 'justify' ? tooltips['text-alignment-justify'] : tooltips['text-alignment-other'] + option}`);
    } else if (labelPrefix === 'Border Style') {
      iconButton.setAttribute('data-extra-info', option === 'none' ? tooltips['border-style-none'] : tooltips['border-style-other'] + option + ' line');
    } else if (labelPrefix === 'Background Size') {
      iconButton.setAttribute('data-extra-info', option === 'cover' ? tooltips['background-size-cover'] : tooltips['background-size-contain']);
    } else if (labelPrefix === 'Background Position') {
      iconButton.setAttribute('data-extra-info', option === 'reset' ? tooltips['reset'] : `${tooltips['background-position']} ${option + '.'}`);
    } else if (labelPrefix === 'Background Repeat') {
      iconButton.setAttribute('data-extra-info', option === 'cover' ? tooltips['background-size-cover'] : tooltips['background-size-contain']);
    } else if (swatchboard) {
      iconButton.setAttribute('data-extra-info', tooltips['swatchboard'] + `${cssClassBase}-${option}`);
    } else if (bgIcon) {
      iconButton.setAttribute('data-extra-info', tooltips['bg-icon'] + option + " of the box it's inside");
    } else {
      handleTooltips(`${cssClassBase}-${option}`, iconButton);
    }
    if ((grid.classList).contains(iconTextCandidate1) && !swatchboard) {
      iconButton.classList.add('bg-sky-200');
    }
    if ((grid.classList).contains(iconTextCandidate1) && swatchboard) {
      iconButton.classList.add('border-sky-300');
    }
    iconButton.onclick = () => {
      if (/^(text|bg|border)-(black|white|.*-(50|[1-9]00))|(\[.*\])$/.test(iconTextCandidate1)) {
        // Remove any custom color picker class for this type
        grid.classList.forEach(cls => {
          if (labelPrefix === 'Text Color' && /^text-\[.*\]$/.test(cls)) {
            grid.classList.remove(cls);
          } else if (labelPrefix === 'Background Color' && /^bg-\[.*\]$/.test(cls)) {
            grid.classList.remove(cls);
          } else if (labelPrefix === 'Border Color' && /^border-\[.*\]$/.test(cls)) {
            grid.classList.remove(cls);
          }
        });
      }
      options.forEach(opt => {
        grid.classList.remove(`${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`);
        control.querySelectorAll('.iconButton').forEach(b => {
          if (!swatchboard) b.classList.remove('bg-sky-200');
          if (!swatchboard) b.classList.add('bg-slate-200');
          if (swatchboard) b.classList.remove('border-sky-300');
        });
        if (cssClassBase === 'justify') grid.classList.remove(`${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}flex`);
      });

      // Remove other preset color classes before applying the selected preset
      options.forEach(opt => grid.classList.remove(`${cssClassBase}-${opt}`));

      // Apply the new preset color class
      const presetColorClass = `${cssClassBase}-${option}`;
      grid.classList.add(presetColorClass);

      // Highlight the selected preset button
      control.querySelectorAll('.iconButton').forEach(btn => btn.classList.remove('bg-sky-200'));
      iconButton.classList.add('bg-sky-200');
    };
    if (/^(text|bg|border)-(black|white|.*-(50|[1-9]00))|(\[.*\])$/.test(iconTextCandidate1)) {
      if (iconTextCandidate1.includes('text')) {
        iconButton.querySelector('svg').classList.add(iconTextCandidate1);
        iconTextCandidate1 = iconTextCandidate1.replace('text', 'border');
        iconButton.classList.add('border-[0.175rem]', iconTextCandidate1);
      } else if (iconTextCandidate1.includes('bg')) {
        iconButton.classList.add(iconTextCandidate1);
        iconButton.querySelector('svg').classList.add('opacity-0');
      } else if (iconTextCandidate1.includes('border')) {
        iconTextCandidate1 = iconTextCandidate1.replace('border', 'bg');
        iconButton.classList.add(iconTextCandidate1);
        iconButton.querySelector('svg').classList.add('opacity-0');
      }
    }
    control.appendChild(iconButton);
  });
} // DATA OUT: null
window.handleIconSelect = handleIconSelect;

// This function messily handles all the nuance thus far encountered from
// supporting toggle elements for sidebar editor controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleToggle(bp, options, grid, cssClassBase, control) {
  control.className = 'relative bg-slate-50 h-12 w-12 border-2 border-slate-30 rounded'
  if (cssClassBase === 'italic') {
    control.setAttribute('data-extra-info', tooltips['italicize']);
    control.setAttribute('data-extra-info-class', 'italic');
  } else if (cssClassBase === 'underline') {
    control.setAttribute('data-extra-info', tooltips['underline']);
    control.setAttribute('data-extra-info-class', 'underline');
  }
  const iconButton = document.createElement('span');
  iconButton.innerHTML = appSageEditorIcons[cssClassBase];
  iconButton.className = `absolute top-0.5 right-0 h-11 w-11 px-2 py-1 rounded-sm border-none pointer-events-none`;

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox';
  checkbox.className = 'rounded py-2 px-3 h-full w-full appearance-none checked:bg-sky-200';
  // In this particular case, cssClassBase needs to not get passed due to Tailwind class syntax
  checkbox.checked = getCurrentStyle(bp, options, '', grid) === cssClassBase;
  checkbox.onchange = () => {
    const className = `${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}`;
    grid.classList.toggle(className);
  };
  control.appendChild(checkbox);
  control.appendChild(iconButton);
} // DATA OUT: null
window.handleToggle = handleToggle;

// This function messily handles all the nuance thus far encountered from
// supporting select elements for sidebar editor controls.
// DATA IN: See `addDeviceTargetedOptions`
function handleSelect(bp, grid, control, options, cssClassBase, labelPrefix) {
  if (!options) {
    console.error('No options provided for select input type.');
    return;
  }
  control.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
  options.forEach(option => {
    const optionElement = document.createElement('option');
    let option_key = null;
    if (labelPrefix === 'Font Family') {
      option_key = option.replace(/\+/g, '').toLowerCase();
      optionElement.textContent = option.replace(/\+/g, ' ');
      optionElement.selected = getCurrentStyle(bp, [option_key], cssClassBase, grid) === option_key;
    } else {
      optionElement.textContent = option;
      optionElement.selected = getCurrentStyle(bp, options, cssClassBase, grid) === option;
    }
    const value = `${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option_key ? option_key : option}`;
    optionElement.value = value;
    control.appendChild(optionElement);
  });
  control.onchange = () => {
    options.forEach(opt => {
      grid.classList.remove(`${interactivityState === '' ? '' : interactivityState + ':'}${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`);
    });
    grid.classList.add(control.value);
  };

} // DATA OUT: null
window.handleSelect = handleSelect;

// This function is an all-in-one place for any and all tooltips necessary for
// the functions in this file.
// DATA IN: ['String', 'HTML Element']
function handleTooltips(cssClassToEvaluate, control) {
  const tooltipText = tooltips[cssClassToEvaluate] || "This tooltip is missing, tell the dev to fix it!";
  control.setAttribute('data-extra-info', tooltipText);
} // DATA OUT: null
window.handleTooltips = handleTooltips;

function handlePlaceholderMedia(bp, grid, control, options, cssClassBase, isBackgroundImage = false) {
  // Populate the dropdown with placeholder media options
  for (const key in appSagePlaceholderMedia) {
    const selectedMedia = appSagePlaceholderMedia[key];
    if (isBackgroundImage && selectedMedia.endsWith('.mp3')) {
      continue; // Skip audio files
    }
    const option = document.createElement('option');
    option.value = selectedMedia;
    option.textContent = key;
    control.appendChild(option);
  }

  control.addEventListener('change', function (event) {
    const selectedMedia = event.target.value;
    let mediaElement = grid.querySelector(`.${bp}-media`);
    // Clear existing background styles if background image is being updated
    if (isBackgroundImage) {
      grid.style.backgroundImage = ''; // Clear existing background
      grid.classList.remove(...Array.from(grid.classList).filter(c => c.startsWith('bg-'))); // Remove existing bg- classes
    }
    // Apply media or background
    if (isBackgroundImage && (selectedMedia.endsWith('.jpg') || selectedMedia.endsWith('.png') || selectedMedia.endsWith('.svg'))) {
      grid.classList.add(`bg-[url('${selectedMedia}')]`);
      grid.style.backgroundSize = 'cover';
      grid.style.backgroundPosition = 'center'; // Center the background
    } else {
      if (mediaElement) {
        mediaElement.remove();
      }
      if (selectedMedia.endsWith('.mp4')) {
        mediaElement = document.createElement('video');
        mediaElement.controls = true;
      } else if (selectedMedia.endsWith('.mp3')) {
        mediaElement = document.createElement('audio');
        mediaElement.controls = true;
      }
      if (mediaElement) {
        mediaElement.classList.add(`${bp}-media`);
        mediaElement.src = selectedMedia;
        grid.appendChild(mediaElement);
      }
    }
  });
}
window.handlePlaceholderMedia = handlePlaceholderMedia;

// Function to handle the dropdown for selecting placeholder images
function addPlaceholderDropdown(fileInput, grid) {
  const placeholderDropdown = document.createElement('select');
  placeholderDropdown.className = 'background-file-input shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline col-span-5';

  fileInput.parentElement.appendChild(placeholderDropdown);

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
}
window.addPlaceholderDropdown = addPlaceholderDropdown;
