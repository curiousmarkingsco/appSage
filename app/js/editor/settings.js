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


  // Save settings to localStorage
  document.getElementById('appSageSettingsForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect selected fonts and manually added fonts as a single object
    let selectedFonts = Array.from(document.getElementById('fonts').selectedOptions).map(option => option.value);
    let manualFonts = Array.from(document.querySelectorAll('#fontsContainer input[type="text"]'))
      .map(input => input.value)
      .filter(Boolean); // Remove empty entries

    // Combine selected and manually entered fonts into one array
    let allFonts = [...new Set([...selectedFonts, ...manualFonts])]; // Avoid duplicates using Set

    let formData = {
      fonts: allFonts,
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

  // Add more colors functionality
  document.getElementById('addColor').addEventListener('click', function () {
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
});

// Restore settings from localStorage
// Restore settings from localStorage
function restoreSettings() {
  let storedData = localStorage.getItem(appSageSettingsString);
  if (storedData) {
    let settings = JSON.parse(storedData);

    // Restore fonts: dynamically add any manually entered fonts to the <select> options
    let fonts = document.getElementById('fonts');
    settings.fonts.forEach(font => {
      // Check if the font already exists in the <select>
      let optionExists = Array.from(fonts.options).some(option => option.value === font);
      if (!optionExists) {
        let newOption = document.createElement('option');
        newOption.value = font;
        newOption.textContent = font;
        newOption.selected = true;
        fonts.appendChild(newOption);
      } else {
        // Select existing option if it's already present
        Array.from(fonts.options).forEach(option => {
          if (option.value === font) {
            option.selected = true;
          }
        });
      }
    });

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
            <label for="customColorValue" class="block text-slate-600 font-medium">Color Value:</label>
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

// Function to dynamically update Tailwind config with multiple fonts/colors
function updateTailwindConfig() {
  const settings = JSON.parse(localStorage.getItem(appSageSettingsString));
  if (settings !== null) {
    // Handle custom fonts
    if (settings.fonts.length > 0) {
      if (!tailwind.config.theme.fontFamily) {
        tailwind.config.theme.fontFamily = {};
      }
      tailwind.config.theme.fontFamily.custom = settings.fonts;
    }

    // Handle custom colors
    if (Object.keys(settings.colors).length > 0) {
      if (!tailwind.config.theme.extend) {
        tailwind.config.theme.extend = {};
      }
      if (!tailwind.config.theme.extend.colors) {
        tailwind.config.theme.extend.colors = {};
      }

      Object.values(settings.colors).forEach(function (customColor) {
        tailwind.config.theme.extend.colors[customColor.name] = { "500": customColor.value };
      });
    }
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

// Call restoreSettings when the page loads
window.addEventListener('load', restoreSettings);