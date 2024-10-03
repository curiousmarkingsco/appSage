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


  // Function to save settings
  document.getElementById('appSageSettingsForm').addEventListener('submit', function (event) {
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
      const fontKey = font.toLowerCase().replace(/\+/g, ''); // Convert to kebab-case
      acc[fontKey] = font;
      return acc;
    }, {});
  
    // Create a structure for colors where each color has multiple shades
    let colors = Array.from(document.querySelectorAll('.color-group')).reduce((acc, group) => {
      const colorName = group.querySelector('.customColorName').value;
      
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
  
    // Store in localStorage
    localStorage.setItem(appSageSettingsString, JSON.stringify(formData));
    generateGfontsEmbedCode();
  
    const params = new URLSearchParams(window.location.search);
    params.set('settingsSaved', 'true');
    window.location.href = window.location.pathname + '?' + params.toString();
  });
  

  // Functionality to add more shades to a color group
  document.querySelectorAll('.addShade').forEach(button => {
    button.addEventListener('click', function () {
      let shadesContainer = button.previousElementSibling; // Find the associated shades container
      let newShadeEntry = document.createElement('div');
      newShadeEntry.classList.add('shade-entry', 'flex', 'space-x-4');
      
      newShadeEntry.innerHTML = `
        <div>
          <label for="colorShade" class="block text-slate-600 font-medium">Shade:</label>
          <select name="colorShade[]" class="colorShade shadow border rounded py-2 px-3 text-slate-700 w-full">
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
          <label for="customColorValue" class="block text-slate-600 font-medium">Color Value:</label>
          <input type="color" class="customColorValue shadow border rounded w-full h-10 focus:outline-none focus:shadow-outline" name="customColorValue[]">
        </div>
      `;
      
      shadesContainer.appendChild(newShadeEntry); // Append the new shade entry to the container
    });
  });

  // Functionality to add a new color group
  document.getElementById('addColorGroup').addEventListener('click', function () {
    let colorsContainer = document.getElementById('colorsContainer');
    
    let newColorGroup = document.createElement('div');
    newColorGroup.classList.add('color-group', 'space-y-4');
    
    newColorGroup.innerHTML = `
      <div class="color-name-section">
        <label for="customColorName" class="block text-slate-600 font-medium">Color Name:</label>
        <input type="text" class="customColorName shadow border rounded py-2 px-3 text-slate-700 leading-tight w-full focus:outline-none focus:shadow-outline" name="customColorName[]" placeholder="Enter color name (e.g., 'secondary')">
      </div>
      <div class="shades-container space-y-2">
        <div class="shade-entry flex space-x-4">
          <div>
            <label for="colorShade" class="block text-slate-600 font-medium">Shade:</label>
            <select name="colorShade[]" class="colorShade shadow border rounded py-2 px-3 text-slate-700 w-full">
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
            <label for="customColorValue" class="block text-slate-600 font-medium">Color Value:</label>
            <input type="color" class="customColorValue shadow border rounded w-full h-10 focus:outline-none focus:shadow-outline" name="customColorValue[]">
          </div>
        </div>
      </div>
      <button type="button" class="addShade mt-2 py-2 px-4 bg-blue-500 text-white rounded shadow">Add Shade</button>
    `;
    
    colorsContainer.appendChild(newColorGroup); // Append the new color group to the container
  });
});

function generateGfontsEmbedCode() {
  const selectedFonts = Array.from(document.getElementById('fonts').selectedOptions).map(option => option.value).join('&family=');
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

function showSettingsModal() {
  const settingsModal = document.getElementById('settingsModal');
  settingsModal.classList.remove('hidden');

  document.getElementById('confirmSaveSettings').addEventListener('click', function () {
    document.getElementById('appSageSettingsForm').submit();
  });

  document.getElementById('cancelSaveSettings').addEventListener('click', function () {
    settingsModal.classList.add('hidden');
  });
}


function showSettingsSavedModal() {
  // Parse the query parameters from the URL
  const params = new URLSearchParams(window.location.search);

  // Check if the "settingsSaved" parameter is true
  if (params.get('settingsSaved') === 'true') {
      // Create the modal HTML and insert it into the DOM
      const modal = document.createElement('div');
      modal.innerHTML = `
          <div class="fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center">
              <div class="bg-slate-100 p-4 rounded-lg max-w-sm mx-auto">
                  <p class="text-slate-900">Your settings have been successfully saved!</p>
                  <div class="flex justify-center mt-4">
                      <button id="closeModal" class="bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded">
                          OK
                      </button>
                  </div>
              </div>
          </div>
      `;
      document.body.appendChild(modal);

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

document.addEventListener('DOMContentLoaded', showSettingsSavedModal);
