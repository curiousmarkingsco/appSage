// settings/main.js

document.addEventListener("DOMContentLoaded", function () {
  const advancedModeCheckbox = document.getElementById("advancedMode");
  const storedSettings = JSON.parse(localStorage.getItem(appSageSettingsString)) || {};

  // Set advanced mode state if previously stored
  if (storedSettings.advancedMode) {
    advancedModeCheckbox.checked = true;
  }

  // Add event listener for adding new font fields
  document.getElementById("addFont").addEventListener("click", function () {
    const fontsContainer = document.getElementById("fontsContainer");
    const fontEntry = document.createElement("div");
    fontEntry.classList.add("font-entry");
    fontEntry.innerHTML = `
      <input type="text" placeholder="Enter a Google Font name" class="shadow border rounded py-2 px-3 text-slate-700 leading-tight w-full focus:outline-none focus:shadow-outline">
    `;
    fontsContainer.appendChild(fontEntry);
  });
});

// Save settings to localStorage
document.getElementById('appSageSettingsForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Collect font data from both the default input and dynamically added ones
  let fontInputs = Array.from(document.querySelectorAll('#fontsContainer input[type="text"]')).map(input => input.value).filter(Boolean);

  let formData = {
    fonts: Array.from(document.getElementById('fonts').selectedOptions).map(option => option.value),
    manualFonts: fontInputs, // collect all the dynamic font inputs
    colors: Array.from(document.querySelectorAll('.color-entry')).map(entry => ({
      name: entry.querySelector('.customColorName').value,
      value: entry.querySelector('.customColorValue').value
    })),
    advancedMode: document.getElementById('advancedMode').checked
  };

  // Store in localStorage
  localStorage.setItem(appSageSettingsString, JSON.stringify(formData));

  alert('Settings saved!');
});

// Restore settings from localStorage
function restoreSettings() {
  let storedData = localStorage.getItem(appSageSettingsString);
  if (storedData) {
    let settings = JSON.parse(storedData);

    // Restore fonts
    let fonts = document.getElementById('fonts');
    Array.from(fonts.options).forEach(option => {
      if (settings.fonts.includes(option.value)) {
        option.selected = true;
      }
    });

    // Restore manually entered fonts (including dynamically added ones)
    if (settings.manualFonts && settings.manualFonts.length > 0) {
      let fontsContainer = document.getElementById('fontsContainer');
      settings.manualFonts.forEach(font => {
        const fontEntry = document.createElement("div");
        fontEntry.classList.add("font-entry", "mt-2");
        fontEntry.innerHTML = `
          <input type="text" placeholder="Enter a Google Font name" class="shadow border rounded py-2 px-3 text-slate-700 leading-tight w-full focus:outline-none focus:shadow-outline" value="${font}">
        `;
        fontsContainer.appendChild(fontEntry);
      });
    }

    // Restore colors
    if (settings.colors) {
      let colorsContainer = document.getElementById('colorsContainer');
      colorsContainer.innerHTML = ''; // Clear existing entries
      settings.colors.forEach(color => {
        let colorEntry = document.createElement('div');
        colorEntry.classList.add('color-entry', 'flex', 'space-x-4');

        colorEntry.innerHTML = `
          <div>
            <label for="customColorName" class="block text-slate-600 font-medium">Color Name:</label>
            <input type="text" class="customColorName shadow border rounded py-2 px-3 text-slate-700 leading-tight w-full focus:outline-none focus:shadow-outline" name="customColorName[]" value="${color.name}">
          </div>
          <div>
            <label for="customColorValue" class="block text-slate-600 font-medium">Color:</label>
            <input type="color" class="customColorValue shadow border rounded w-full h-10 focus:outline-none focus:shadow-outline" name="customColorValue[]" value="${color.value}">
          </div>
        `;
        colorsContainer.appendChild(colorEntry);
      });
    }

    // Restore advanced mode
    document.getElementById('advancedMode').checked = settings.advancedMode || false;
  }
}

// Call restoreSettings when the page loads
window.addEventListener('load', restoreSettings);

// Add more colors functionality
document.getElementById('addColor').addEventListener('click', function() {
  let colorsContainer = document.getElementById('colorsContainer');
  let newColorEntry = document.createElement('div');
  newColorEntry.classList.add('color-entry', 'flex', 'space-x-4');

  newColorEntry.innerHTML = `
    <div>
      <label for="customColorName" class="block text-slate-600 font-medium">Color Name:</label>
      <input type="text" class="customColorName shadow border rounded py-2 px-3 text-slate-700 leading-tight w-full focus:outline-none focus:shadow-outline" name="customColorName[]">
    </div>
    <div>
      <label for="customColorValue" class="block text-slate-600 font-medium">Color Value:</label>
      <input type="color" class="customColorValue shadow border rounded w-full h-10 focus:outline-none focus:shadow-outline" name="customColorValue[]">
    </div>
  `;
  colorsContainer.appendChild(newColorEntry);
});


// Function to dynamically update Tailwind config with multiple fonts/colors
function updateTailwindConfig(settings) {
  // Assuming tailwind.config.js is loaded globally

  // Handle custom fonts
  if (settings.customFonts.length > 0) {
    if (!tailwind.config.theme.fontFamily) {
      tailwind.config.theme.fontFamily = {};
    }
    tailwind.config.theme.fontFamily.custom = settings.customFonts;
  }

  // Handle custom colors
  if (Object.keys(settings.customColors).length > 0) {
    if (!tailwind.config.theme.extend) {
      tailwind.config.theme.extend = {};
    }
    if (!tailwind.config.theme.extend.colors) {
      tailwind.config.theme.extend.colors = {};
    }

    Object.keys(settings.customColors).forEach(function (colorName) {
      tailwind.config.theme.extend.colors[colorName] = settings.customColors[colorName];
    });
  }
}

function generateGfontsEmbedCode() {
  const selectedFonts = Array.from(document.getElementById('fonts').selectedOptions).map(option => option.value).join('&family=');
  if (selectedFonts) {
      const embedCode = `
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=${selectedFonts}&display=swap" rel="stylesheet">
      `;
      document.getElementById('embed-code').textContent = embedCode.trim();
  } else {
      document.getElementById('embed-code').textContent = '<!-- No fonts selected -->';
  }
}