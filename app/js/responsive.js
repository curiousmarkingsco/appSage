/* responsive.js */

var plainEnglish = {
  "xs": 'Extra Small',
  "sm": 'Small-Sized',
  "md": 'Medium-Sized',
  "lg": 'Large',
  "xl": 'Extra Large',
  "2xl": 'Extra, Extra Large'
}

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
        handleReset(bp, grid, options, labelPrefix, cssClassBase, control);
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
        handleSelect(bp, grid, control, options, cssClassBase);
        control.classList.add('col-span-5');
        break;
      default:
        console.error('Unsupported input type specified.');
        return;
    }
  });
}

function handleReset(bp, grid, options, labelPrefix, cssClassBase, control){
  const resetButton = document.createElement('button');
  resetButton.innerHTML = pageSageEditorIcons['reset'];
  resetButton.className = 'iconButton h-12 w-12 p-4 bg-slate-100 hover:bg-slate-200 p-2 rounded'
  control.appendChild(resetButton);
  resetButton.onclick = () => {
    options.forEach(opt => {
      cssClassBase.forEach(cssClass => {
        grid.classList.remove(`${bp === 'xs' ? '' : bp + ':'}${cssClass}-${opt}`);
      });
    });
  };
}

function applyStyles(element, controlValue) {
  if (element) {
    const styles = controlValue.split(';');
    styles.forEach(style => {
      const [property, value] = style.split(':');
      if (property && value) {
        const camelCaseProperty = property.trim().replace(/-([a-z])/g, (match, p1) => p1.toUpperCase());
        element.style[camelCaseProperty] = value.trim();
      }
    });
  }
}

function getCurrentStyle(bp, options, cssClassBase, grid) {
  if (options) {
    return options.find(option => {
      const className = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`;
      return grid.classList.contains(className);
    }) || '';
  }
}

function createLabel(bp, labelPrefix, forAttr) {
  const collapseLabels = (labelPrefix.includes('Margin') || labelPrefix.includes('Padding') || labelPrefix.includes('Font') || labelPrefix.includes('Border Radius') || labelPrefix.includes('Border Color') || labelPrefix.includes('Height') || labelPrefix.includes('Width') || labelPrefix.includes('Gap'));
  let keepLabel = (labelPrefix === 'Margin (t)' ? true : false || labelPrefix === 'Padding (t)' ? true : false || labelPrefix === 'Font Size' ? true : false || labelPrefix === 'Border Width' ? true : false || labelPrefix === 'Minimum Height' ? true : false || labelPrefix === 'Minimum Width' ? true : false || labelPrefix === 'Gap (x)' ? true : false);
  if (collapseLabels && keepLabel === false) {
    const label = document.createElement('label');
    label.className = 'hidden';
    return label
  } else {
    keepLabel = labelPrefix.replace(' (t)', '');
    keepLabel = labelPrefix.replace('Minimum ', '');
    keepLabel = keepLabel.includes('Font Size') ? 'Font Styles' : keepLabel;
    keepLabel = keepLabel.includes('Border Width') ? 'Border Width & Radius' : keepLabel;
    keepLabel = keepLabel.includes('Gap') ? 'Gaps Between Columns' : keepLabel;
    const label = document.createElement('label');
    const mobileIcon = document.createElement('span')
    mobileIcon.className = 'h-3 w-3 mr-2 inline-block';
    mobileIcon.innerHTML = `${pageSageEditorIcons['responsive'][bp]}`;
    label.innerHTML = `<span class="inline-block">${keepLabel}</span>`;
    label.className = 'block col-span-5 text-slate-700 text-xs uppercase mt-2';
    label.setAttribute('for', forAttr);
    label.prepend(mobileIcon);
    return label;
  }
}

function handleInput(bp, labelPrefix, options, cssClassBase, grid, control) {
  const isFile = labelPrefix.includes('File');
  control.type = isFile ? 'file' : 'text';
  if (isFile) control.setAttribute('accept', 'image/*');
  if (!isFile) control.value = getCurrentStyle(bp, options, cssClassBase, grid);
  control.className = 'shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
  let newValue;
  control.onchange = (event) => {
    if (labelPrefix === 'Background Image URL') {
      // assumes 'bg' is URL
      newValue = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${cssClassBase === 'bg' ? '[url(\'' : ''}${control.value}${cssClassBase === 'bg' ? '\')]' : ''}`;
      updateGridClass(grid, newValue, cssClassBase, bp);
    } else if (labelPrefix === 'Background Image File') {
      grid.style.backgroundImage = '';
      generateMediaSrc(event, grid, true);
    }
  };
}

function handleTextareaType(labelPrefix, grid, control) {
  control.type = 'text';
  control.value = (grid.classList);
  control.className = 'shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
  control.onchange = () => {
    if (labelPrefix == 'class') grid.className = control.value;
    if (labelPrefix == 'html'){
      const newHtmlElement = document.createElement('div');
      newHtmlElement.innerHTML = control.value;
      control.innerHTML = newHtmlElement;
    }
    if (labelPrefix == 'css') {
      applyStyles(grid, control.value);
    }
  };
}

function handleSingleIconSelect(bp, labelPrefix, options, cssClassBase, grid, control) {
  cssClassBase = cssClassBase.includes('-all') ? cssClassBase.replace('-all', '') : cssClassBase;
  const fontSize = (labelPrefix === 'Font Size' || labelPrefix === 'Font Weight')
  const borderOption = (labelPrefix === 'Border Width' || labelPrefix === 'Border Radius');
  const smallSelect = (labelPrefix.includes('Margin') || labelPrefix.includes('Padding') || labelPrefix.includes('Gap') || labelPrefix.includes('Height') || labelPrefix.includes('Width'));
  const iconTargetName = labelPrefix.toLowerCase().replace(' ', '-').replace(/[()]/g, '');
  control.className = `flex relative h-12 ${borderOption ? 'w-24 col-span-2' : ''}${fontSize ? 'w-48 col-span-4 ' : ''}${smallSelect ? (labelPrefix + ' w-20 ') : ''}`;
  const iconTarget = pageSageEditorIcons[iconTargetName];
  const iconButton = document.createElement('span');
  iconButton.innerHTML = iconTarget;
  iconButton.className = `absolute ${smallSelect ? 'right-4 top-1 bg-none h-10 w-10' : 'right-0.5 top-0.5 bg-slate-50 h-11 w-11'} px-2 py-1 rounded-sm border-none pointer-events-none`;
  const selectControl = document.createElement('select');
  let extraInfo;
  if (labelPrefix.includes('Padding')) {
    extraInfo = 'Create space between the edge of the box and content inside of it.'
  } else if (labelPrefix.includes('Margin')) {
    extraInfo = 'Create space between the edge of the box and the boxes/content outside of it.'
  } else {
    const attribute = labelPrefix.replace('Border ', '').replace('Font ', '').toLowerCase()
    extraInfo = `Change the <span class="${attribute === 'size' ? 'text-base' : ''}${attribute === 'weight' ? 'font-bold' : ''}">${attribute}</span>${borderOption ? ' of this element\'s border' : ''}${fontSize ? ' of your text' : ''}${attribute === 'weight' ? '<br>Nothing happening when making weight a selection? Not all fonts support these options' : ''}`
  }
  selectControl.setAttribute('data-extra-info', extraInfo);
  selectControl.className = `appearance-none w-full bg-slate-50 p-2 border border-slate-300 ${smallSelect ? 'max-w-16 ' : ''}${fontSize ? 'pr-24 ' : ''}relative rounded`;
  options.forEach(option => {
    const value = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`;
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = option;
    optionElement.selected = String(grid.classList).includes(value);
    selectControl.appendChild(optionElement);
  });
  selectControl.onchange = () => {
    options.forEach(opt => {
      grid.classList.remove(`${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`);
    });
    grid.classList.add(selectControl.value);
  };
  control.appendChild(selectControl);
  control.appendChild(iconButton);
}

function handleIconSelect(bp, grid, options, labelPrefix, cssClassBase, control) {
  if (!options) {
    console.error('No options provided for icons input type.');
    return;
  }
  const swatchboard = (labelPrefix === 'Text Color' || labelPrefix === 'Background Color' || labelPrefix === 'Border Color');
  const bgIcon = (labelPrefix === 'Background Position');
  control.className = `grid grid-cols-5 col-span-5 gap-x-1 gap-y-2 overflow-y-scroll ${swatchboard ? 'hidden h-40 p-2 border bg-[#000000] dark:bg-[#ffffff] border-slate-400' : ''}`;
  if (swatchboard) {
    const toggleButton = document.createElement('button')
    toggleButton.className = `${labelPrefix === 'Border Color' ? 'col-span-1' : 'col-span-5'} w-full bg-[#ffffff] text-left shadow border rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline`;
    toggleButton.innerHTML = `<svg class="h-5 w-5 inline mr-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6l319.2 0 42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z"/></svg>${labelPrefix === 'Border Color' ? '' : ' ' + labelPrefix}`;
    toggleButton.setAttribute('data-extra-info', 'Please remember to make colors contrast well for people with vision impairments.');
    toggleButton.addEventListener('click', function () {
      if (control.classList.contains('hidden')) {
        control.classList.remove('hidden');
      } else {
        control.classList.add('hidden');
      }
    });
    control.parentElement.insertBefore(toggleButton, control);
  }
  options.forEach(option => {
    const iconButton = document.createElement('button');
    iconButton.className = `iconButton ${option === 'reset' ? 'p-4 bg-slate-100 hover:bg-slate-200 ' : (swatchboard ? 'border-2 hover:border-sky-200 ' : 'bg-slate-200 hover:bg-slate-300 ')}${labelPrefix === 'Background Repeat' ? 'p-1' : (bgIcon ? 'p-0' : 'p-2')} rounded ${labelPrefix === 'Text Color' ? 'backdrop-invert' : ''}`;
    let iconTextCandidate1 = `${cssClassBase}-${option}`;
    let iconTextCandidate2 = labelPrefix.toLowerCase().replace(' ', '-');
    const iconTarget = pageSageEditorIcons[iconTextCandidate1] || pageSageEditorIcons[iconTextCandidate2] || pageSageEditorIcons[option];
    iconButton.innerHTML = iconTarget;
    if (labelPrefix == 'Text Alignment') {
      iconButton.setAttribute('data-extra-info', `${option === 'justify' ? 'Make text expand across the entire box. If you\'re not a professional designer, this option is a bad idea' : 'Align text to the ' + option}`)
    } else if (labelPrefix === 'Border Style') {
      if (option === 'none') iconButton.setAttribute('data-extra-info', 'Remove border styles from this element');
      if (option !== 'none') iconButton.setAttribute('data-extra-info', `Change the border style to be a ${option} line`);
    } else if (labelPrefix === 'Background Size') {
      iconButton.setAttribute('data-extra-info', `Make your background image ${option === 'cover' ? 'cover the entire box; cropping will occur' : 'stay contained inside the box, empty space may become seen'}`);
    } else if (swatchboard) {
      iconButton.setAttribute('data-extra-info', `TailwindCSS class name: ${cssClassBase}-${option}`);
    } else if (bgIcon) {
      iconButton.setAttribute('data-extra-info', `Position your background image to the ${option} of the box it's inside`);
    } else {
      handleTooltips(`${cssClassBase}-${option}`, iconButton);
    }
    if ((grid.classList).contains(iconTextCandidate1) && !swatchboard) {
      // Candidate1 means it is not a color icon, so we add a highlight to it.
      iconButton.classList.add('bg-sky-200');
    }
    if ((grid.classList).contains(iconTextCandidate1) && swatchboard) {
      iconButton.classList.add('border-sky-300');
    }
    iconButton.onclick = () => {
      options.forEach(opt => {
        grid.classList.remove(`${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`);
        control.querySelectorAll('.iconButton').forEach(b => {
          if (!swatchboard) b.classList.remove('bg-sky-200')
          if (swatchboard) b.classList.remove('border-sky-300');
        });
        if (cssClassBase === 'justify') grid.classList.remove(`${bp === 'xs' ? '' : bp + ':'}flex`);
      });
      if (option !== 'reset') {
        grid.classList.add(`${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`);
        if (swatchboard) iconButton.classList.add('border-sky-300');
        if (!swatchboard) iconButton.classList.add('bg-sky-200');
        // column justification requires flex to work as expected
        if (cssClassBase === 'justify') grid.classList.add(`${bp === 'xs' ? '' : bp + ':'}flex`);
      }
    };
    if (/^(text|bg|border)-(black|white|.*-(50|[1-9]00))$/.test(iconTextCandidate1)) {
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
}

function handleToggle(bp, options, grid, cssClassBase, control) {
  control.className = 'relative bg-slate-50 h-12 w-12 border-2 border-slate-30 rounded'
  if (cssClassBase === 'italic') {
    control.setAttribute('data-extra-info', 'Italicize your text');
    control.setAttribute('data-extra-info-class', 'italic');
  } else if (cssClassBase === 'underline') {
    control.setAttribute('data-extra-info', 'Underline your text');
    control.setAttribute('data-extra-info-class', 'underline');
  }
  const iconButton = document.createElement('span');
  iconButton.innerHTML = pageSageEditorIcons[cssClassBase];
  iconButton.className = `absolute top-0.5 right-0 h-11 w-11 px-2 py-1 rounded-sm border-none pointer-events-none`;

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox';
  checkbox.className = 'rounded py-2 px-3 h-full w-full appearance-none checked:bg-sky-200';
  checkbox.checked = getCurrentStyle(bp, options, cssClassBase, grid) === cssClassBase;
  checkbox.onchange = () => {
    const className = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}`;
    grid.classList.toggle(className);
  };
  control.appendChild(checkbox);
  control.appendChild(iconButton);
}

function handleSelect(bp, grid, control, options, cssClassBase) {
  if (!options) {
    console.error('No options provided for select input type.');
    return;
  }
  control.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
  options.forEach(option => {
    const value = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`;
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = option;
    optionElement.selected = getCurrentStyle(bp, options, cssClassBase, grid) === option;
    control.appendChild(optionElement);
  });
  control.onchange = () => {
    options.forEach(opt => {
      grid.classList.remove(`${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`);
    });
    grid.classList.add(control.value);
  };
}

function updateGridClass(element, newValue, classType, breakpoint) {
  const classRegex = new RegExp(`\\b${breakpoint === 'xs' ? ' ' : breakpoint + ':'}${classType}-\\d+\\b`, 'g');
  element.className = element.className.replace(classRegex, '').trim() + ` ${newValue}`;
}

function handleTooltips(cssClassToEvaluate, control) {
  if (cssClassToEvaluate === 'justify-items-start') {
    control.setAttribute('data-extra-info', "Put columns in columns in the grid to the left-most side of the column's maximum span");
  } else if (cssClassToEvaluate === 'justify-items-end') {
    control.setAttribute('data-extra-info', "Put columns in columns in the grid to the right-most side of the column's maximum span");
  } else if (cssClassToEvaluate === 'justify-items-center') {
    control.setAttribute('data-extra-info', "Put columns in columns in the grid to the horizontal middle of the column's maximum span");
  } else if (cssClassToEvaluate === 'justify-items-stretch') {
    control.setAttribute('data-extra-info', "Stretch the columns across the column's maximum span");
  } else if (cssClassToEvaluate === 'justify-items-reset') {
    control.setAttribute('data-extra-info', "Reset justification of items to default");
  } else if (cssClassToEvaluate === 'content-start') {
    control.setAttribute('data-extra-info', "Align columns to the top left of the grid. Choosing this option may not be obvious unless you also choose 'Place Items Start'");
  } else if (cssClassToEvaluate === 'content-end') {
    control.setAttribute('data-extra-info', "Align columns to the bottom right of the grid. Choosing this option may not be obvious unless you also choose 'Place Items End'");
  } else if (cssClassToEvaluate === 'content-center') {
    control.setAttribute('data-extra-info', "Align columns to the center of the grid.");
  } else if (cssClassToEvaluate === 'content-stretch') {
    control.setAttribute('data-extra-info', "Stretch columns to fill the height of the grid");
  } else if (cssClassToEvaluate === 'content-between') {
    control.setAttribute('data-extra-info', "Align columns evenly from the very top and very bottom of the grid");
  } else if (cssClassToEvaluate === 'content-around') {
    control.setAttribute('data-extra-info', "Align columns evenly within the height of the grid");
  } else if (cssClassToEvaluate === 'content-evenly') {
    control.setAttribute('data-extra-info', "Align columns evenly between the columns and the space around the columns");
  } else if (cssClassToEvaluate === 'content-reset') {
    control.setAttribute('data-extra-info', "Reset column vertical alignment");
  } else if (cssClassToEvaluate === 'place-items-start') {
    control.setAttribute('data-extra-info', "Place content within your columns to the columns to the top left of the columns");
  } else if (cssClassToEvaluate === 'place-items-end') {
    control.setAttribute('data-extra-info', "Place content within your columns to the columns to the bottom right of the columns");
  } else if (cssClassToEvaluate === 'place-items-center') {
    control.setAttribute('data-extra-info', "Place content within your columns to the columns to the center of the columns");
  } else if (cssClassToEvaluate === 'place-items-stretch') {
    control.setAttribute('data-extra-info', "Stretch content to the full dimensions of your columns");
  } else if (cssClassToEvaluate === 'place-items-reset') {
    control.setAttribute('data-extra-info', "Reset items placement alignment");
  } else if (cssClassToEvaluate === 'bg-no-repeat') {
    control.setAttribute('data-extra-info', "Do not repeat the background, this option pairs well with 'contain' or 'cover' background sizing");
  } else if (cssClassToEvaluate === 'bg-repeat') {
    control.setAttribute('data-extra-info', "Repeat images to make a background pattern");
  } else if (cssClassToEvaluate === 'bg-repeat-x') {
    control.setAttribute('data-extra-info', "Repeat images to make a pattern horizontally");
  } else if (cssClassToEvaluate === 'bg-repeat-y') {
    control.setAttribute('data-extra-info', "Repeat images to make a pattern vertically");
  } else {
    control.setAttribute('data-extra-info', "This tooltip is missing, tell the dev to fix it!");
  }
}