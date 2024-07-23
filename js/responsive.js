/* responsive.js */

function addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, options, inputType = 'select') {
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  breakpoints.forEach(bp => {
    const label = document.createElement('label');
    label.textContent = `${bp.toUpperCase()}: ${labelPrefix}`;
    label.className = 'block text-gray-700 text-sm font-bold mb-2';

    let control;

    // Function to get the current style directly inside this function
    function getCurrentStyle() {
      if (options) {
        return options.find(option => {
          const className = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`;
          return grid.classList.contains(className);
        }) || '';
      }
    }

    switch (inputType) {
      case 'input':
        control = document.createElement('input');
        control.type = 'text';
        control.value = getCurrentStyle();
        control.className = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
        control.onchange = () => {
          const newValue = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${control.value}`;
          updateGridClass(grid, newValue, cssClassBase, bp);
        };
        break;

      case 'icon-select':
        if (!options) {
          console.error('No options provided for icons input type.');
          break;
        }
        control = document.createElement('div');
        control.className = 'flex space-x-2';
        options.forEach(option => {
          const iconButton = document.createElement('button');
          iconButton.className = 'p-2 rounded hover:bg-gray-200';
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
          // The string starts with 'text-' and ends with '-50' or '*00' where * is 1-9
          // In other words, it is a Tailwind color class
          if (/^text-.*-(50|[1-9]00)$/.test(iconTextCandidate1)) {
            iconTextCandidate1 = iconTextCandidate1.replace('text', 'bg');
            iconButton.classList.add(iconTextCandidate1);
            iconButton.classList.add(`hover:${iconTextCandidate1}/50`);
          } else if (/^text-.*-(50|[1-9]00)$/.test(iconTextCandidate2)) {
            iconTextCandidate2 = iconTextCandidate2.replace('text', 'bg');
            iconButton.classList.add(iconTextCandidate2);
            iconButton.classList.add(`hover:${iconTextCandidate1}/50`);
          }
          control.appendChild(iconButton);
        });
        break;

      case 'toggle':
        control = document.createElement('input');
        control.type = 'checkbox';
        control.className = 'shadow border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline';
        control.checked = getCurrentStyle() === cssClassBase;
        control.onchange = () => {
          const className = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}`;
          grid.classList.toggle(className);
        };
        break;

      case 'select':
        if (!options) {
          console.error('No options provided for select input type.');
          break;
        }
        control = document.createElement('select');
        control.className = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
        options.forEach(option => {
          const value = `${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${option}`;
          const optionElement = document.createElement('option');
          optionElement.value = value;
          optionElement.textContent = option;
          optionElement.selected = getCurrentStyle() === option;
          control.appendChild(optionElement);
        });
        control.onchange = () => {
          options.forEach(opt => {
            grid.classList.remove(`${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${opt}`);
          });
          grid.classList.add(control.value);
        };
        break;

      default:
        console.error('Unsupported input type specified.');
        break;
    }

    const container = sidebar.querySelector(`#mobileTabContent .tab-content-${bp}`);
    if (control) {
      container.appendChild(label);
      container.appendChild(control);
    }
  });
}

function updateGridClass(element, newValue, classType, breakpoint) {
  const classRegex = new RegExp(`\\b${breakpoint === 'xs' ? ' ' : breakpoint + ':'}${classType}-\\d+\\b`, 'g');
  element.className = element.className.replace(classRegex, '').trim() + ` ${newValue}`;
}
