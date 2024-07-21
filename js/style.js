/* style.js */

function addEditableTextColor(sidebar, element) {
  const colors = ['black', 'white', 'red-500', 'blue-500', 'green-500', 'yellow-500'];
  const labelPrefix = 'Text Color';
  const cssClassBase = 'text';

  const getCurrentTextColor = (grid, bp, index) => {
    const color = colors[index]; // Use index directly for 0-based array
    return grid.className.includes(`${bp === 'xs' ? '' : bp + ':'}text-${color}`);
  };

  addDeviceTargetedOptions(sidebar, element, labelPrefix, cssClassBase, getCurrentTextColor, colors);
}

function addEditableBackgroundColor(sidebar, element) {
  const colors = ['gray-100', 'red-100', 'blue-100', 'green-100', 'yellow-100', 'purple-100'];
  const labelPrefix = 'Background Color';
  const cssClassBase = 'bg';

  const getCurrentBackgroundColor = (element, bp, index) => {
    const color = colors[index]; // Use index directly for 0-based array
    return element.className.includes(`${bp === 'xs' ? '' : bp + ':'}bg-${color}`);
  };

  addDeviceTargetedOptions(sidebar, element, labelPrefix, cssClassBase, getCurrentBackgroundColor, colors);
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
    const cssClassBase = prop === 'color' ? 'border' : (prop === 'width' ? 'border' : (prop === 'radius' ? 'rounded' : (prop === 'style' ? 'border' : '')));
    const getCurrentBorderValue = (grid, bp, option) => {
      const valuePrefix = prop === 'color' ? 'border-' : (prop === 'width' ? 'border-' : (prop === 'radius' ? 'rounded-' : (prop === 'style' ? 'border-' : '')));
      return grid.className.includes(`${bp === 'xs' ? '' : bp + ':'}${valuePrefix}${option}`);
    };

    addDeviceTargetedOptions(sidebar, element, labels[index], cssClassBase, getCurrentBorderValue, options[prop]);
  });
}

function addEditableMarginAndPadding(sidebar, element) {
  const props = ['Margin', 'Padding'];
  const sides = ['t', 'b', 'l', 'r'];
  const values = ['0', '1', '2', '4', '8', '16'];

  props.forEach(prop => {
    sides.forEach(side => {
      const labelPrefix = `${prop} (${side.toUpperCase()})`;
      const cssClassBase = `${prop[0].toLowerCase()}${side}`;

      const getCurrentValue = (element, bp, value) => {
        return element.className.includes(`${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${value}`);
      };

      addDeviceTargetedOptions(sidebar, element, labelPrefix, cssClassBase, getCurrentValue, values);
    });
  });
}

function addEditableBackgroundImage(sidebar, grid) {
  const labelPrefix = 'Background Image URL';
  const cssClassBase = 'bg';

  const getCurrentBackgroundImageUrl = (grid, bp) => {
    // Extracting background image URL from class
    const regex = new RegExp(`\\b${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-\$begin:math:display$url\\\\('([^']+)\\'\\\\)\\$end:math:display$\\b`, 'g');
    const match = regex.exec(grid.className);
    return match ? match[1] : '';
  };

  addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, getCurrentBackgroundImageUrl, null, true);
}

function addEditableBackgroundFeatures(sidebar, grid) {
  const bgSizeOptions = ['auto', 'cover', 'contain'];
  const bgPositionOptions = ['center', 'top', 'bottom', 'left', 'right'];
  const bgRepeatOptions = ['repeat', 'no-repeat', 'repeat-x', 'repeat-y'];

  // Function to update background image size
  function addBackgroundSizeOptions() {
    const labelPrefix = 'Background Size';
    const cssClassBase = 'bg';
    const getCurrentBgSize = (grid, bp) => bgSizeOptions.find(size => grid.className.includes(`${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${size}`));

    addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, getCurrentBgSize, bgSizeOptions);
  }

  // Function to update background position
  function addBackgroundPositionOptions() {
    const labelPrefix = 'Background Position';
    const cssClassBase = 'bg';
    const getCurrentBgPosition = (grid, bp) => bgPositionOptions.find(position => grid.className.includes(`${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${position}`));

    addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, getCurrentBgPosition, bgPositionOptions);
  }

  // Function to update background repeat
  function addBackgroundRepeatOptions() {
    const labelPrefix = 'Background Repeat';
    const cssClassBase = 'bg';
    const getCurrentBgRepeat = (grid, bp) => bgRepeatOptions.find(repeat => grid.className.includes(`${bp === 'xs' ? '' : bp + ':'}${cssClassBase}-${repeat}`));

    addDeviceTargetedOptions(sidebar, grid, labelPrefix, cssClassBase, getCurrentBgRepeat, bgRepeatOptions);
  }

  // Calling all functions to add options
  addBackgroundSizeOptions();
  addBackgroundPositionOptions();
  addBackgroundRepeatOptions();
}
