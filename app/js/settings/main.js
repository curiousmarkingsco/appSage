// settings/main.js

document.addEventListener("DOMContentLoaded", function () {
  const advancedModeCheckbox = document.getElementById("advancedMode");
  const storedSettings = JSON.parse(localStorage.getItem("appSageSettings")) || {};

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
      <label for="customFont">Font Name:</label>
      <input type="text" class="customFont" name="customFont[]" placeholder="Enter font name">
    `;
    fontsContainer.appendChild(fontEntry);
  });

  // Add event listener for adding new color fields
  document.getElementById("addColor").addEventListener("click", function () {
    const colorsContainer = document.getElementById("colorsContainer");
    const colorEntry = document.createElement("div");
    colorEntry.classList.add("color-entry");
    colorEntry.innerHTML = `
      <label for="customColorName">Color Name:</label>
      <input type="text" class="customColorName" name="customColorName[]" placeholder="Enter color name (e.g., 'primary')">
      
      <label for="customColorValue">Color Value:</label>
      <input type="color" class="customColorValue" name="customColorValue[]">
    `;
    colorsContainer.appendChild(colorEntry);
  });

  // Listen for form submission to save settings
  document.getElementById("appSageSettingsForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect all font values
    const fontInputs = document.querySelectorAll('.customFont');
    const customFonts = Array.from(fontInputs).map(input => input.value).filter(Boolean);

    // Collect all color values
    const colorNameInputs = document.querySelectorAll('.customColorName');
    const colorValueInputs = document.querySelectorAll('.customColorValue');
    const customColors = {};

    colorNameInputs.forEach((colorNameInput, index) => {
      const colorName = colorNameInput.value;
      const colorValue = colorValueInputs[index].value;
      if (colorName && colorValue) {
        customColors[colorName] = colorValue;
      }
    });

    // Check advanced mode state
    const advancedMode = advancedModeCheckbox.checked;

    // Store settings in localStorage
    const appSageSettings = {
      customFonts,
      customColors,
      advancedMode
    };
    localStorage.setItem("appSageSettings", JSON.stringify(appSageSettings));

    // Dynamically update Tailwind configuration
    updateTailwindConfig(appSageSettings);

    alert("Settings saved and Tailwind config updated.");
  });
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
