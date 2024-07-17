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
      const valuePrefix = prop === 'color' ? 'border-' : (prop === 'width' ? 'border-' : (prop === 'radius' ? 'rounded-' : ''));
      const optionElement = document.createElement('option');
      optionElement.value = valuePrefix + option;
      optionElement.textContent = option.toUpperCase();
      optionElement.selected = element.classList.contains(valuePrefix + option);
      select.appendChild(optionElement);
    });

    select.onchange = () => {
      options[prop].forEach(option => {
        const valuePrefix = prop === 'color' ? 'border-' : (prop === 'width' ? 'border-' : (prop === 'radius' ? 'rounded-' : ''));
        element.classList.remove(valuePrefix + option);
      });
      element.classList.add(select.value);
    };

    sidebar.appendChild(label);
    sidebar.appendChild(select);
  });
}

function addEditableBackgroundImage(sidebar, element) {
  const label = document.createElement('label');
  label.textContent = 'Background Image URL:';
  label.className = 'block text-gray-700 text-sm font-bold mb-2';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter image URL';
  input.className = 'shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

  input.onchange = () => {
    element.style.backgroundImage = `url('${input.value}')`;
  };

  sidebar.appendChild(label);
  sidebar.appendChild(input);
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
