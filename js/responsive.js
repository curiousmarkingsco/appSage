/* responsive.js */

function addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, getCurrentValueCallback, options, isInputType = false) {
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  breakpoints.forEach(bp => {
    const label = document.createElement('label');
    label.textContent = `${bp.toUpperCase()}: ${labelPrefix}`;
    label.className = 'block text-gray-700 text-sm font-bold mb-2';

    let control;
    if (isInputType) {
      control = document.createElement('input');
      control.type = 'text';
      control.value = getCurrentValueCallback(grid, bp) || '';
      control.className = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

      control.onchange = () => {
        const newValue = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-[url('${control.value}')]`;
        updateGridClass(grid, newValue, cssClassBase, bp);
      };
    } else {
      control = document.createElement('select');
      control.className = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

      options.forEach(option => {
        const value = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`;
        const optionElement = document.createElement('option');
        optionElement.value = value;
        optionElement.textContent = `${option} (${cssClassBase})`;
        optionElement.selected = getCurrentValueCallback(grid, bp, option);
        control.appendChild(optionElement);
      });

      control.onchange = () => {
        options.forEach(opt => {
          grid.classList.remove(`${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`);
        });
        grid.classList.add(control.value);
      };
    }

    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    container.appendChild(label);
    container.appendChild(control);
  });
}

function updateGridClass(element, newValue, classType, breakpoint) {
  const classRegex = new RegExp(`\\b${breakpoint === 'xs' ? ' ' : breakpoint + ':'}${classType}-\\d+\\b`, 'g');
  element.className = element.className.replace(classRegex, '').trim() + ` ${newValue}`;
}
