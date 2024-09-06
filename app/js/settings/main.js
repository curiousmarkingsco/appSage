// settings/main.js

// Load existing settings if present
document.addEventListener("DOMContentLoaded", function () {
  const advancedModeCheckbox = document.getElementById("advancedMode");
  const storedSettings = JSON.parse(localStorage.getItem("appSageSettings")) || {};

  // Set advanced mode state
  if (storedSettings.advancedMode) {
    advancedModeCheckbox.checked = true;
  }

  // Listen to form submit
  document.getElementById("appSageSettingsForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get user input values
    const customFont = document.getElementById("customFont").value;
    const customColorName = document.getElementById("customColorName").value;
    const customColorValue = document.getElementById("customColorValue").value;
    const advancedMode = document.getElementById("advancedMode").checked;

    // Store these settings in localStorage
    const appSageSettings = {
      customFont,
      customColors: {
        [customColorName]: customColorValue,
      },
      advancedMode
    };

    localStorage.setItem("appSageSettings", JSON.stringify(appSageSettings));

    // Dynamically update tailwind.config.js
    updateTailwindConfig(appSageSettings);

    alert("Settings saved and Tailwind config updated.");
  });
});

// Function to dynamically update Tailwind config
function updateTailwindConfig(settings) {
  // Assuming tailwind.config.js is loaded globally, and Tailwind is already running

  if (settings.customFont) {
    if (!tailwind.config.theme.fontFamily) {
      tailwind.config.theme.fontFamily = {};
    }
    tailwind.config.theme.fontFamily.custom = [settings.customFont];
  }

  if (settings.customColors) {
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
