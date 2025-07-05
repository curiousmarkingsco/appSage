// editor/settings.js

function initializeSettings() {
  const advancedModeCheckbox = document.getElementById("advancedMode");

  // Add event listener for adding new font fields
  document.getElementById("addFont").addEventListener("click", function () {
    const fontsContainer = document.getElementById("fontsContainer");
    const fontEntry = document.createElement("div");
    fontEntry.classList.add("font-entry");
    fontEntry.innerHTML = `
      <input type="text" placeholder="Enter a Google Font name" class="shadow border rounded py-2 px-3 text-fuscous-gray-700 leading-tight w-full focus:outline-none focus:shadow-outline">
    `;
    fontsContainer.appendChild(fontEntry);
  });


  // Function to save settings
  document.getElementById('AppstartSettingsForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    // Collect selected fonts and manually added fonts
    let selectedFonts = Array.from(document.getElementById('fonts').selectedOptions).map(option => option.value);
    let manualFonts = Array.from(document.querySelectorAll('#fontsContainer input[type="text"]'))
      .map(input => input.value)
      .filter(Boolean); // Remove empty entries

    // Combine selected and manually entered fonts
    let allFonts = [...new Set([...selectedFonts, ...manualFonts])]; // Avoid duplicates

    // Convert font names to object with kebab-case keys
    let fontsObject = allFonts.reduce((acc, font) => {
      const fontKey = font.toLowerCase().replace(/\+/g, '').replace(/\ /g, ''); // Convert to kebab-case
      acc[fontKey] = font.replace(/\ /g, '+');
      return acc;
    }, {});

    // Create a structure for colors where each color has multiple shades
    let colors = Array.from(document.querySelectorAll('.color-group')).reduce((acc, group) => {
      let colorName = group.querySelector('.customColorName').value;

      // Sanitize color name: replace non-alphanumeric characters with hyphens
      colorName = colorName.replace(/[^a-zA-Z0-9]/g, '-');

      // Replace multiple consecutive hyphens with a single hyphen
      colorName = colorName.replace(/-+/g, '-');

      // Ensure a color name is entered
      if (colorName) {
        acc[colorName] = {};

        // For each color group, collect the shades
        group.querySelectorAll('.shade-entry').forEach(entry => {
          const shade = entry.querySelector('.colorShade').value;
          const colorValue = entry.querySelector('.customColorValue').value;

          // Add the shade and color value to the color group
          acc[colorName][shade] = colorValue;
        });
      }

      return acc;
    }, {});


    let formData = {
      fonts: fontsObject, // Save the fonts object
      colors: colors,     // Save the grouped colors
      advancedMode: document.getElementById('advancedMode').checked
    };

    // Using IndexedDB
    await idbSet(AppstartSettingsString, JSON.stringify(formData));
    generateGfontsEmbedCode();

    const params = new URLSearchParams(window.location.search);
    params.set('settingsSaved', 'true');
    window.location.href = window.location.pathname + '?' + params.toString();
  });



    const colorsContainer = document.getElementById('colorsContainer');

    // Add event listener for dynamically added "Delete Color" buttons
    colorsContainer.addEventListener('click', function (event) {
      if (event.target.classList.contains('deleteColor')) {
        // Find the parent color group and remove it
        const colorGroup = event.target.closest('.color-group');
        if (colorGroup) {
          colorGroup.remove();
        }
      }
    });

    // Add event listener for "Add Color Group" button (if required)
    const addColorGroupButton = document.getElementById('addColorGroup');
    addColorGroupButton.addEventListener('click', function () {
      const newColorGroup = document.createElement('div');
      newColorGroup.className = 'color-group border-b border-pearl-bush-300 pb-4';
      newColorGroup.innerHTML = `
        <div class="color-name-section">
          <label for="customColorName" class="block text-fuscous-gray-600 font-medium">Color Name:</label>
          <input type="text"
            class="customColorName shadow border rounded py-2 px-3 text-fuscous-gray-700 leading-tight w-full focus:outline-none focus:shadow-outline"
            name="customColorName[]" placeholder="Enter color name (e.g., 'primary')">
        </div>
        <div class="shades-container space-y-2">
          <div class="shade-entry flex space-x-4">
            <div>
              <label for="colorShade" class="block text-fuscous-gray-600 font-medium">Shade:</label>
              <select name="colorShade[]"
                class="colorShade shadow border rounded py-2 px-3 text-fuscous-gray-700 w-full">
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
                <option value="300">300</option>
                <option value="400">400</option>
                <option value="500">500</option>
                <option value="600">600</option>
                <option value="700">700</option>
                <option value="800">800</option>
                <option value="900">900</option>
                <option value="950">950</option>
              </select>
            </div>
            <div>
              <label for="customColorValue" class="block text-fuscous-gray-600 font-medium">Color Value:</label>
              <input type="color"
                class="customColorValue shadow border rounded w-full h-10 focus:outline-none focus:shadow-outline"
                name="customColorValue[]">
            </div>
          </div>
        </div>
        <button type="button" class="addShade mt-2 py-2 px-4 border border-fruit-salad-500 font-semibold text-fruit-salad-600 rounded shadow">Add Shade</button>
        <button type="button" class="deleteColor mt-2 text-russett-600 underline-offset-4 hover:underline ml-2">Delete Shade</button>
      `;
      colorsContainer.appendChild(newColorGroup);
    });

}
window.initializeSettings = initializeSettings;

function generateGfontsEmbedCode(fonts) {
  const selectedFonts = fonts || Array.from(document.getElementById('fonts').selectedOptions).map(option => option.value).join('&family=');
  if (selectedFonts) {
    const embedTag = {
      content: `https://fonts.googleapis.com/css2?family=${selectedFonts}&display=swap`,
      name: 'stylesheet',
      type: 'link'
    }
    const params = new URLSearchParams(window.location.search);
    const page_id = params.get('config') || params.get('page');
    saveMetadataToLocalStorage(page_id, [embedTag])
  }
  console.log('Fonts saved to metadata.')
}
window.generateGfontsEmbedCode = generateGfontsEmbedCode;

function showSettingsModal() {
  const settingsModal = document.getElementById('settingsModal');
  const settingsForm = document.getElementById('AppstartSettingsForm');

  settingsModal.classList.remove('hidden');

  // Close the modal when clicking outside the form
  settingsModal.addEventListener('click', function (event) {
    if (event.target === settingsModal) {
      settingsModal.classList.add('hidden');
    }
  });

  document.getElementById('confirmSaveSettings').addEventListener('click', function () {
    settingsForm.submit();
  });

  document.getElementById('cancelSaveSettings').addEventListener('click', function () {
    settingsModal.classList.add('hidden');
  });
}
window.showSettingsModal = showSettingsModal;


function showSettingsSavedModal() {
  // Parse the query parameters from the URL
  const params = new URLSearchParams(window.location.search);

  // Check if the "settingsSaved" parameter is true
  if (params.get('settingsSaved') === 'true') {
      // Create the modal HTML and insert it into the DOM
      const modal = document.createElement('div');
      modal.innerHTML = `
          <div class="fixed inset-0 z-[60] bg-pearl-bush-800 bg-opacity-50 flex justify-center items-center">
              <div class="bg-pearl-bush-100 p-4 rounded-lg max-w-sm mx-auto">
                  <p class="text-fuscous-gray-900">Your settings have been successfully saved!</p>
                  <div class="flex justify-center mt-4">
                      <button id="closeModal" class="bg-fruit-salad-500 hover:bg-fruit-salad-700 text-fuscous-gray-50 font-bold p-2 rounded">
                          OK
                      </button>
                  </div>
              </div>
          </div>
      `;
      const apex = document.getElementById('apex');
      apex.appendChild(modal);

      // Add event listener to close the modal
      document.getElementById('closeModal').addEventListener('click', () => {
          // Remove the modal from the DOM
          modal.remove();
      });

      // Remove the "settingsSaved" parameter from the URL without reloading the page
      params.delete('settingsSaved');
      const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
      window.history.replaceState({}, '', newUrl);
  }
}
window.showSettingsSavedModal = showSettingsSavedModal;

async function processPastedColorObject(newColorData) {
  let colorObject = await idbGet('AppstartSettings') || { fonts: {}, colors: {}, advancedMode: true };

  // Merging the new color data with the existing colors
  colorObject.colors = {
    ...colorObject.colors,
    ...newColorData
  };

  await idbSet('AppstartSettings', colorObject);
}
window.processPastedColorObject = processPastedColorObject;

// Modal function for JSON input
function showColorJsonInputModal() {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-[65] bg-pearl-bush-800 bg-opacity-50 flex justify-center items-center';
  modal.innerHTML = `
      <div class="bg-pearl-bush-100 p-4 rounded-lg max-w-2xl mx-auto w-full">
          <p class="text-fuscous-gray-900">Paste your JSON object below:</p>
          <textarea id="jsonInput" rows="20" class="shadow border rounded py-2 px-3 text-fuscous-gray-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline"></textarea>
          <div class="flex justify-between mt-4" id="btnContainer">
            <button id="cancelJson" class="bg-fruit-salad-500 hover:bg-fruit-salad-700 text-fuscous-gray-50 font-bold p-2 rounded">Cancel</button>
            <button id="saveJson" class="bg-gray-asparagus-500 hover:bg-gray-asparagus-700 text-fuscous-gray-50 font-bold p-2 rounded">Save JSON</button>
          </div>
      </div>
  `;
  const apex = document.getElementById('apex');
  apex.appendChild(modal);

  // Updated event listener in the modal function to use the new validation logic
  document.getElementById('saveJson').addEventListener('click', function () {
    const textarea = document.getElementById('jsonInput');
    try {
      const parsedInput = validateAndFixJsonInput(textarea.value);

      // Check if parsed input is an object
      if (typeof parsedInput === 'object' && !Array.isArray(parsedInput)) {
        processPastedColorObject(parsedInput);
        alert('Colors updated successfully!');
        apex.removeChild(modal);
      } else {
        alert('Invalid JSON input. Please provide a valid JSON object.');
      }
    } catch (error) {
      alert(error.message);
    }
  });

  document.getElementById('cancelJson').addEventListener('click', function () {
    apex.removeChild(modal);
  });
}
window.showColorJsonInputModal = showColorJsonInputModal;

function validateAndFixJsonInput(input) {
  try {
    // Try to parse the input as-is to see if it's valid JSON
    return JSON.parse(input);
  } catch (initialError) {
    // If parsing fails, attempt to auto-correct common issues
    let fixedInput = input;

    // Replace single quotes with double quotes
    fixedInput = fixedInput.replace(/'/g, '"');

    // Fix missing double quotes around keys (e.g., convert `key: value` to `"key": value`)
    fixedInput = fixedInput.replace(/([{,]\s*)([a-zA-Z0-9-_]+)(\s*:\s*)/g, '$1"$2"$3');

    // Remove trailing commas (e.g., "value": "color", or "key": {...},)
    fixedInput = fixedInput.replace(/,(\s*[\]}])/g, '$1');
    fixedInput = fixedInput.replace(/(\s*[\]}]),/g, '$1');

    // Ensure the input is wrapped in an object if not already
    if (!/^\s*{/.test(fixedInput)) {
      fixedInput = `{${fixedInput}}`;
    }
    console.log(fixedInput)

    // Attempt to parse again after auto-corrections
    try {
      return JSON.parse(fixedInput);
    } catch (error) {
      // If it still fails, notify the user
      throw new Error('Invalid JSON format. Please check your input.');
    }
  }
}

document.addEventListener('DOMContentLoaded', showSettingsSavedModal);

// Check if globals are loaded
if (window.editorInitialized) {
  initializeSettings();
} else {
  // Poll or wait for the global to be defined
  const checkGlobals = setInterval(() => {
    if (window.editorInitialized) {
      clearInterval(checkGlobals);
      initializeSettings();
    }
  }, 50);  // Check every 50ms
}
