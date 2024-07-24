/* responsive.js */

function addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, options, inputType = 'select') {
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  breakpoints.forEach(bp => {
    const label = createLabel(bp, labelPrefix);
    let control;
    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);

    switch (inputType) {
      case 'input':
        control = document.createElement('input');
        container.appendChild(label);
        container.appendChild(control);
        handleInputType(bp, options, cssClassBase, grid, control);
        control.classList.add('col-span-5');
        break;
      case 'single-icon-select':
        control = document.createElement('div');
        container.appendChild(label);
        container.appendChild(control);
        handleSingleIconSelect(bp, labelPrefix, options, cssClassBase, grid, control);
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

function getCurrentStyle(bp, options, cssClassBase, grid) {
  if (options) {
    return options.find(option => {
      const className = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`;
      return grid.classList.contains(className);
    }) || '';
  }
}

function createLabel(bp, labelPrefix) {
  const label = document.createElement('label');
  label.textContent = `${bp.toUpperCase()}: ${labelPrefix}`;
  label.className = 'block hidden text-slate-700 text-sm font-bold mb-2';
  return label;
}

function handleInputType(bp, options, cssClassBase, grid, control) {
  control.type = 'text';
  control.value = getCurrentStyle(bp, options, cssClassBase, grid);
  control.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
  control.onchange = () => {
    // assumes 'bg' is URL
    const newValue = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${cssClassBase === 'bg' ? '[url(\'' : ''}${control.value}${cssClassBase === 'bg' ? '\')]' : ''}`;
    updateGridClass(grid, newValue, cssClassBase, bp);
  };
}

function handleSingleIconSelect(bp, labelPrefix, options, cssClassBase, grid, control) {
  const fontSize = (labelPrefix === 'Font Size' || labelPrefix === 'Font Weight')
  const borderOption = (labelPrefix === 'Border Width' || labelPrefix === 'Border Radius');
  const smallSelect = (labelPrefix.includes('Margin') || labelPrefix.includes('Padding'));
  const iconTargetName = labelPrefix.toLowerCase().replace(' ', '-').replace(/[()]/g, '');
  control.className = `flex relative h-12 ${borderOption ? 'w-24 col-span-2' : ''}${fontSize ? 'w-48 col-span-4 ' : ''}${smallSelect ? (labelPrefix + ' w-20 ') : ''}`;
  const iconTarget = pageEditorIcons[iconTargetName];
  const iconButton = document.createElement('span');
  iconButton.innerHTML = iconTarget;
  iconButton.className = `absolute ${smallSelect ? 'right-4 top-1 bg-none h-10 w-10' : 'right-1 top-0.5 bg-white h-11 w-11'} px-2 py-1 rounded-sm border-none pointer-events-none`;
  const selectControl = document.createElement('select');
  let extraInfo;
  if (labelPrefix.includes('Padding')) {
    extraInfo = 'Create space between the edge of the box and content inside of it.'
  } else if (labelPrefix.includes('Margin')) {
    extraInfo = 'Create space between the edge of the box and the boxes/content outside of it.'
  } else {
    const attribute = labelPrefix.replace('Border ', '').replace('Font ', '').toLowerCase()
    extraInfo = `Change the <span class="${attribute === 'size' ? 'text-base' : ''}${attribute === 'weight' ? 'font-bold' : ''}">${attribute}</span>${borderOption ? ' of this element\'s border' : ''}${fontSize ? ' of your text' : ''}`
  }
  selectControl.setAttribute('data-extra-info', extraInfo);
  selectControl.className = `appearance-none w-full bg-transparent p-2 border-2 border-slate-300 ${smallSelect ? 'max-w-16 ' : ''}${fontSize ? 'pr-24 ' : ''}relative rounded`;
  options.forEach(option => {
    const value = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`;
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.textContent = option;
    optionElement.selected = getCurrentStyle(bp, options, cssClassBase, grid) === value;
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
  const swatchboard = (labelPrefix === 'Text Color' || labelPrefix === 'Background Color' || labelPrefix === 'Border Color')
  control.className = `grid grid-cols-5 col-span-5 gap-x-1 gap-y-2 overflow-y-scroll ${swatchboard ? 'hidden h-40 p-2 border bg-[#000000] dark:bg-[#ffffff] border-slate-400' : ''}`;
  if (swatchboard) {
    const toggleButton = document.createElement('button')
    toggleButton.className = 'col-span-5 w-full bg-[#ffffff] text-left shadow border rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
    toggleButton.innerHTML = `<svg class="h-5 w-5 inline mr-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6l319.2 0 42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z"/></svg> ${labelPrefix}`;
    toggleButton.addEventListener('click', function() {
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
    iconButton.className = `p-2 rounded ${labelPrefix === 'Text Color' ? 'backdrop-invert' : ''}`;
    let iconTextCandidate1 = `${cssClassBase}-${option}`;
    let iconTextCandidate2 = labelPrefix.toLowerCase().replace(' ', '-');
    const iconTarget = pageEditorIcons[iconTextCandidate1] || pageEditorIcons[iconTextCandidate2];
    iconButton.innerHTML = iconTarget;
    if (labelPrefix == 'Text Alignment') {
      iconButton.setAttribute('data-extra-info', `${option === 'justify' ? 'Make text expand across the entire box. If you\'re not a professional designer, this option is a bad idea' : 'Align text to the ' + option}`)
    } else if (labelPrefix === 'Border Style') {
      if (option === 'none') iconButton.setAttribute('data-extra-info', 'Remove border styles from this element');
      if (option !== 'none') iconButton.setAttribute('data-extra-info', `Change the border style to be a ${option} line`);
    }
    iconButton.onclick = () => {
      options.forEach(opt => {
        grid.classList.remove(`${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`);
      });
      grid.classList.add(`${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`);
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
  control.className = 'relative bg-white h-12 w-12 border-2 border-slate-30 rounded'
  control.setAttribute('data-extra-info', `${cssClassBase.charAt(0).toUpperCase() + cssClassBase.slice(1).toLowerCase()}${cssClassBase === 'italic' ? 'ize' : ''} your text`);
  control.setAttribute('data-extra-info-class', cssClassBase);
  const iconButton = document.createElement('span');
  iconButton.innerHTML = pageEditorIcons[cssClassBase];
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
