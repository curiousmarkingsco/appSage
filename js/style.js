/* style.js */

function addEditableTextColor(sidebar, element) {
  const label = document.createElement('label');
  label.textContent = 'Text Color:';
  label.className = 'block text-gray-700 text-sm font-bold mb-2';

  const select = document.createElement('select');
  select.className = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

  const colors = ['black', 'white', 'red-500', 'blue-500', 'green-500', 'yellow-500'];
  colors.forEach(color => {
    const option = document.createElement('option');
    option.value = `text-${color}`;
    option.textContent = color.replace('-', ' ').toUpperCase();
    option.selected = element.classList.contains(`text-${color}`);
    select.appendChild(option);
  });

  select.onchange = () => {
    colors.forEach(color => {
      element.classList.remove(`text-${color}`);
    });
    element.classList.add(select.value);
  };

  sidebar.appendChild(label);
  sidebar.appendChild(select);
}

function addEditableBackgroundColor(sidebar, element) {
  const label = document.createElement('label');
  label.textContent = 'Background Color:';
  label.className = 'block text-gray-700 text-sm font-bold mb-2';

  const select = document.createElement('select');
  select.className = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

  const colors = ['white', 'gray-100', 'red-500', 'blue-500', 'green-500', 'yellow-500'];
  colors.forEach(color => {
    const option = document.createElement('option');
    option.value = `bg-${color}`;
    option.textContent = color.replace('-', ' ').toUpperCase();
    option.selected = element.classList.contains(`bg-${color}`);
    select.appendChild(option);
  });

  select.onchange = () => {
    colors.forEach(color => {
      element.classList.remove(`bg-${color}`);
    });
    element.classList.add(select.value);
  };

  sidebar.appendChild(label);
  sidebar.appendChild(select);
}

function addEditableBorders(sidebar, element) {
  const labels = ['Border Color', 'Border Width', 'Border Radius', 'Border Style'];
  const properties = ['color', 'width', 'radius', 'style'];
  const options = {
    color: ['gray-300', 'red-500', 'blue-500', 'green-500'],
    width: ['1', '2', '4', '8'],
    radius: ['none', 'sm', 'md', 'lg'],
    style: ['solid', 'dashed', 'dotted', 'double']
  };

  properties.forEach((prop, index) => {
    const label = document.createElement('label');
    label.textContent = labels[index] + ':';
    label.className = 'block text-gray-700 text-sm font-bold mb-2';

    const select = document.createElement('select');
    select.className = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
    options[prop].forEach(option => {
      // Update to handle 'style' properly with 'border-' prefix
      const valuePrefix = prop === 'color' ? 'border-' : (prop === 'width' ? 'border-' : (prop === 'radius' ? 'rounded-' : (prop === 'style' ? 'border-' : '')));
      const optionElement = document.createElement('option');
      optionElement.value = valuePrefix + option;
      optionElement.textContent = option.toUpperCase();
      optionElement.selected = element.classList.contains(valuePrefix + option);
      select.appendChild(optionElement);
    });

    select.onchange = () => {
      options[prop].forEach(option => {
        const valuePrefix = prop === 'color' ? 'border-' : (prop === 'width' ? 'border-' : (prop === 'radius' ? 'rounded-' : (prop === 'style' ? 'border-' : '')));
        element.classList.remove(valuePrefix + option);
      });
      element.classList.add(select.value);
    };

    sidebar.appendChild(label);
    sidebar.appendChild(select);
  });
}


function updateBackgroundImageClass(element, imageUrl) {
  // Handling the removal of an existing bg-[url(...)] class
  const currentClasses = Array.from(element.classList);
  const bgImageUrlPattern = /bg-\[url\(.*?\)\]/;  // Regex to match dynamic bg-[url(...)] classes
  currentClasses.forEach(cls => {
      if (bgImageUrlPattern.test(cls)) {
          element.classList.remove(cls);
      }
  });

  // Add the new background image class using TailwindCSS utility
  const newClass = `bg-[url('${imageUrl}')]`;
  element.classList.add(newClass);
}

function updateTailwindClass(element, value, prefix, possibleValues) {
  possibleValues.forEach(val => {
      element.classList.remove(`${prefix}-${val}`);
  });
  element.classList.add(`${prefix}-${value}`);
}

function addEditableBackgroundImage(sidebar, element) {
// Setup for URL input
const urlLabel = createLabel('Background Image URL:', 'block text-gray-700 text-sm font-bold mb-2');
const urlInput = createInput('text', 'Enter image URL', 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline');
urlInput.onchange = () => {
  if (urlInput.value.trim() !== '') {
    updateBackgroundImageClass(element, urlInput.value.trim());
  }
};
sidebar.appendChild(urlLabel);
sidebar.appendChild(urlInput);

// Setup for background repeat
const repeatSelect = createSelect(['repeat', 'repeat-x', 'repeat-y', 'no-repeat'], 'Background Repeat:', element, 'bg', ['repeat', 'repeat-x', 'repeat-y', 'no-repeat']);

// Setup for background size
const sizeSelect = createSelect(['auto', 'cover', 'contain'], 'Background Size:', element, 'bg', ['auto', 'cover', 'contain']);

// Setup for background position
const positionSelect = createSelect(['left-top', 'left', 'left-bottom', 'right-top', 'right', 'right-bottom', 'top', 'center', 'bottom'], 'Background Position:', element, 'bg', ['left-top', 'left', 'left-bottom', 'right-top', 'right', 'right-bottom', 'top', 'center', 'bottom']);

// Append controls for repeat, size, and position to the sidebar
sidebar.appendChild(repeatSelect.label);
sidebar.appendChild(repeatSelect.select);
sidebar.appendChild(sizeSelect.label);
sidebar.appendChild(sizeSelect.select);
sidebar.appendChild(positionSelect.label);
sidebar.appendChild(positionSelect.select);
}

function createLabel(text, className) {
  const label = document.createElement('label');
  label.textContent = text;
  label.className = className;
  return label;
}

function createInput(type, placeholder, className) {
  const input = document.createElement('input');
  input.type = type;
  input.placeholder = placeholder;
  input.className = className;
  return input;
}

function createSelect(options, labelText, element, prefix, possibleValues) {
  const label = createLabel(labelText, 'block text-gray-700 text-sm font-bold mb-2');
  const select = document.createElement('select');
  select.className = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';
  options.forEach(option => {
      const opt = document.createElement('option');
      opt.value = option;
      opt.textContent = option;
      select.appendChild(opt);
  });
  select.onchange = () => {
      updateTailwindClass(element, select.value, prefix, possibleValues);
  };
  return { label, select };
}


function updateBackgroundImageClass(element, imageUrl) {
  // Handle removal of existing bg-[url(...)] classes
  const regex = /\bbg-\[url\(.*?\)\]/g;
  element.className = element.className.replace(regex, '').trim();

  // Add new background image class if imageUrl is not empty
  if (imageUrl) {
      element.classList.add(`bg-[url('${imageUrl}')]`);
  }
}


function addEditableMarginAndPadding(sidebar, element) {
  const props = ['Margin', 'Padding'];
  const sides = ['t', 'b', 'l', 'r'];
  props.forEach(prop => {
    sides.forEach(side => {
      const label = document.createElement('label');
      label.textContent = `${prop} (${side.toUpperCase()}):`;
      label.className = 'block text-gray-700 text-sm font-bold mb-2';

      const select = document.createElement('select');
      select.className = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

      const values = ['0', '1', '2', '4', '8', '16'];
      values.forEach(value => {
        const option = document.createElement('option');
        option.value = `${prop[0].toLowerCase()}${side}-${value}`;
        option.textContent = value;
        option.selected = element.classList.contains(`${prop[0].toLowerCase()}${side}-${value}`);
        select.appendChild(option);
      });

      select.onchange = () => {
        console.log('something happened ig');
        console.log(element);
        values.forEach(value => {
          element.classList.remove(`${prop[0].toLowerCase()}${side}-${value}`);
        });
        element.classList.add(select.value);
      };

      sidebar.appendChild(label);
      sidebar.appendChild(select);
    });
  });
}

function updateBackgroundImageClass(element, imageUrl) {
  // Remove any existing background image classes
  const currentClasses = Array.from(element.classList);
  const bgImageUrlPattern = /bg-\[url\(.*?\)\]/;  // Regex to match dynamic bg-[url(...)] classes
  currentClasses.forEach(cls => {
    if (bgImageUrlPattern.test(cls)) {
      element.classList.remove(cls);
    }
  });

  // Add new background image class
  const newClass = `bg-[url('${imageUrl}')]`;
  element.classList.add(newClass);
}
