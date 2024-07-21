/* responsive.js */

function addDeviceTargetedOptions(sidebar, grid, labelPrefix, optionCount, cssClassBase, getCurrentValueCallback, customOptions = []) {
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  breakpoints.forEach(bp => {
    const label = document.createElement('label');
    label.textContent = `${labelPrefix}`;
    label.className = 'block text-gray-700 text-sm font-bold mb-2';

    const select = document.createElement('select');
    select.className = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

    const breakpointTab = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`)
    breakpointTab.appendChild(label);
    breakpointTab.appendChild(select);

    customOptions.forEach((option, index) => {
      const value = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`;
      const optionElement = document.createElement('option');
      optionElement.value = value;
      optionElement.textContent = option.replace('-', ' ').toUpperCase();
      optionElement.selected = getCurrentValueCallback(grid, bp, index + 1);
      select.appendChild(optionElement);
    });

    select.onchange = () => {
      // Ensure only one class of this type is active at any time
      customOptions.forEach(opt => {
        grid.classList.remove(`${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`);
      });
      grid.classList.add(select.value);
    };
  });
}

function updateGridClass(element, newValue, classType, breakpoint) {
  const classRegex = new RegExp(`\\b${breakpoint === 'xs' ? ' ' : breakpoint + ':'}${classType}-\\d+\\b`, 'g');
  element.className = element.className.replace(classRegex, '').trim() + ` ${newValue}`;
}
