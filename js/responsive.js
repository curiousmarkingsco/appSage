/* responsive.js */

function addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, getCurrentValueCallback, options) {
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  breakpoints.forEach(bp => {
    const label = document.createElement('label');
    label.textContent = `${bp.toUpperCase()}: ${labelPrefix}`;
    label.className = 'block text-gray-700 text-sm font-bold mb-2';

    const select = document.createElement('select');
    select.className = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

    options.forEach((option, index) => {
      const value = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`;
      const optionElement = document.createElement('option');
      optionElement.value = value;
      optionElement.textContent = `${option} ${cssClassBase.replace('-', ' ')}${option > 1 ? 's' : ''}`;
      optionElement.selected = getCurrentValueCallback(grid, bp, option);
      select.appendChild(optionElement);
    });

    select.onchange = () => {
      options.forEach(opt => {
        const classToRemove = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`;
        grid.classList.remove(classToRemove);
      });
      grid.classList.add(select.value);
    };

    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`) || sidebar;
    container.appendChild(label);
    container.appendChild(select);
  });
}

function updateGridClass(element, newValue, classType, breakpoint) {
  const classRegex = new RegExp(`\\b${breakpoint === 'xs' ? ' ' : breakpoint + ':'}${classType}-\\d+\\b`, 'g');
  element.className = element.className.replace(classRegex, '').trim() + ` ${newValue}`;
}
