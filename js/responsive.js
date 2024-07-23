/* responsive.js */

/* responsive.js */

function addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, options, inputType = 'select') {
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  breakpoints.forEach(bp => {
    const label = createLabel(bp, labelPrefix);
    let control;

    switch (inputType) {
      case 'input':
        control = document.createElement('input');
        handleInputType(bp, options, cssClassBase, grid, control);
        break;
      case 'single-icon-select':
        control = document.createElement('div');
        handleSingleIconSelect(bp, labelPrefix, options, cssClassBase, grid, control);
        break;
      case 'icon-select':
        control = document.createElement('div');
        handleIconSelect(bp, grid, options, labelPrefix, cssClassBase, control);
        break;
      case 'toggle':
        control = document.createElement('input');
        handleToggle(bp, options, grid, cssClassBase, control);
        break;
      case 'select':
        control = document.createElement('select');
        handleSelect(bp, grid, control, options, cssClassBase);
        break;
      default:
        console.error('Unsupported input type specified.');
        return;
    }

    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    if (control) {
      container.appendChild(label);
      container.appendChild(control);
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
  label.className = 'block text-slate-700 text-sm font-bold mb-2';
  return label;
}

function handleInputType(bp, options, cssClassBase, grid, control) {
  control.type = 'text';
  control.value = getCurrentStyle(bp, options, cssClassBase, grid);
  control.className = 'shadow border rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline';
  control.onchange = () => {
    const newValue = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${control.value}`;
    updateGridClass(grid, newValue, cssClassBase, bp);
  };
}

function handleSingleIconSelect(bp, labelPrefix, options, cssClassBase, grid, control) {
  control.className = 'flex relative h-12 w-36';
  const iconTarget = pageEditorIcons[labelPrefix.toLowerCase().replace(' ', '-')];
  const iconButton = document.createElement('span');
  iconButton.innerHTML = iconTarget;
  iconButton.className = 'absolute top-0.5 right-1 h-11 w-12 px-2 py-1 rounded-sm border-none bg-white pointer-events-none';

  const selectControl = document.createElement('select');
  selectControl.className = 'appearance-none bg-transparent p-2 border-2 border-slate-300 pr-24 relative rounded';
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
  control.className = `grid grid-cols-5 gap-x-1 gap-y-2 overflow-y-scroll ${labelPrefix === 'Text Color' ? 'h-40' : ''}`;
  options.forEach(option => {
    const iconButton = document.createElement('button');
    iconButton.className = 'p-2 rounded';
    let iconTextCandidate1 = `${cssClassBase}-${option}`;
    let iconTextCandidate2 = labelPrefix.toLowerCase().replace(' ', '-');
    const iconTarget = pageEditorIcons[iconTextCandidate1] || pageEditorIcons[iconTextCandidate2];
    iconButton.innerHTML = iconTarget;
    iconButton.onclick = () => {
      options.forEach(opt => {
        grid.classList.remove(`${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`);
      });
      grid.classList.add(`${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`);
    };
    if (/^text-(black|white|.*-(50|[1-9]00))$/.test(iconTextCandidate1)) {
      iconButton.querySelector('svg').classList.add(iconTextCandidate1);
      iconTextCandidate1 = iconTextCandidate1.replace('text', 'border');
      iconButton.classList.add('border-[0.175rem]', iconTextCandidate1);
    } else if (/^text-(black|white|.*-(50|[1-9]00))$/.test(iconTextCandidate2)) {
      iconButton.querySelector('svg').classList.add(iconTextCandidate2);
      iconTextCandidate2 = iconTextCandidate2.replace('text', 'border');
      iconButton.classList.add('border-[0.175rem]', iconTextCandidate2);
    }
    control.appendChild(iconButton);
  });
}

function handleToggle(bp, options, grid, cssClassBase, control) {
  control.type = 'checkbox';
  control.className = 'shadow border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline';
  control.checked = getCurrentStyle(bp, options, cssClassBase, grid) === cssClassBase;
  control.onchange = () => {
    const className = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}`;
    grid.classList.toggle(className);
  };
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
