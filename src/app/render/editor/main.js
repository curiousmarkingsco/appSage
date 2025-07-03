/*

  editor/main.js

  This file is to support the initial setup or re-setup of a page.

*/

function initializeEditor() {
  initializeEditorHtml().then(() => {
    setupPageEvents();
    window.editorInitialized = true;
  }).catch(error => {
    console.error('Error during editor initialization:', error);
  });
}
window.initializeEditor = initializeEditor;

async function initializeEditorHtml() {
  return new Promise((resolve, reject) => {
    try {
      document.querySelector('body').id = 'editor';
      // Inject the head content dynamically
      // CSP is handled by Electron for dev and production. For local web dev, we set up inline CSP.
      // For web production, CSP is handled by GitHub pages.

      let htmlInsideRendererJSToBlock = "";
      // Only assign this block if we're NOT in an extension environment.
      if (!chrome || !chrome.runtime || !chrome.runtime.getURL) {
        htmlInsideRendererJSToBlock = `
        <link rel="apple-touch-icon" sizes="180x180" href="./assets/favicons/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="./assets/favicons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="./assets/favicons/favicon-16x16.png">
        <link rel="manifest" href="./assets/favicons/site.webmanifest">
        <link rel="mask-icon" href="./assets/favicons/safari-pinned-tab.svg" color="#4b5d48">
        <meta name="msapplication-TileColor" content="#f2f0e9">
        <meta name="theme-color" content="#f2f0e9">`;
      }

      document.head.innerHTML = `
        <meta charset="UTF-8">
        <title>appSage Editor</title>
        ${window.location.host === 'localhost:8080' ? `<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline'; media-src 'self' 'unsafe-inline' localhost:8080 blob: data:;  img-src 'self' 'unsafe-inline' localhost:8080 blob: data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' 'unsafe-inline' fonts.gstatic.com;">` : '' }
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        ${htmlInsideRendererJSToBlock}
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="./styles.css">
      `;

      // Dynamic body content (initial structure)
      const apex = document.getElementById('apex');
      apex.innerHTML = `
        <div class="h-screen lg:hidden bg-pearl-bush-100 p-4">
          <h2 class="text-4xl max-w-96 font-bold mx-auto mt-20">Please use a desktop computer to access appSage.</h2>
          <p class="mx-auto max-w-96 mt-4">If you feel like it, <a class="text-fruit-salad-600 hover:text-fruit-salad-800 hover:underline" href="mailto:contact@curiousmarkings.com">email us today</a> if you are hellbent on designing apps on your mobile phone. You will email us knowing your designs will most likely look terrible on larger devices.</p>
        </div>
        <div class="lg:flex hidden">
          <div id="tooltip"
            class="tooltip fixed bg-pearl-bush-900 text-fuscous-gray-50 p-2 rounded text-xs z-[1001] opacity-0 transition-opacity duration-300">
          </div>
          <div id="sidebar" class="w-72 z-[55] bg-pearl-bush-50 fixed h-screen overflow-y-auto overscroll-contain pb-16 pt-10">
            <!-- Sidebar content for editing elements will be dynamically added here -->
            <div id="sidebar-dynamic" class="p-4">
              <p>No content to edit. Add content by making a grid or column.</p>
            </div>
          </div>

          <div id="page" class="min-h-screen w-[calc(100%-18rem)] ml-72 mb-24">
            <!-- The designer's page content goes here -->
          </div>
        </div>
        <div class="hidden lg:block mt-20"><!-- Give the bottom some space for anything that might bleed under the Add Grid element --></div>
        <div class="lg:block hidden w-[calc(100%-18rem)] ml-72 bg-pearl-bush-200 fixed bottom-0 text-center border-t-4 border-l-2 border-pearl-bush-50"
          id="gridButtonsBottombar">
          <button id="addGrid" data-extra-info="Create a grid"
            class="pagebuilder-only mt-4 bg-fruit-salad-500 hover:bg-fruit-salad-700 text-fuscous-gray-50 font-bold pt-1 pb-1.5 px-4 mb-2 rounded inline mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white"
              class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
              <path
                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white"
              class=" h-5 w-5 inline"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.-->
              <path
                d="M0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40L0 72zM0 232c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48zM128 392l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40zM160 72c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48zM288 232l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40zM160 392c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48zM448 72l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40zM320 232c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48zM448 392l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40z" />
            </svg>
          </button>
          <button id="addContainer" data-extra-info="Create a flexible container"
            class="hidden pagebuilder-only mt-4 bg-fruit-salad-500 hover:bg-fruit-salad-700 text-fuscous-gray-50 font-bold pt-1 pb-1.5 px-4 mb-2 rounded inline mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white"
              class="h-4 w-4 inline"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
              <path
                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
            </svg>
            <svg class="w-5 h-5 inline" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M48 32C21.5 32 0 53.5 0 80L0 240c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-160c0-26.5-21.5-48-48-48L48 32zM304 224c-26.5 0-48 21.5-48 48l0 160c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-160c0-26.5-21.5-48-48-48l-96 0zM0 400l0 32c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-32c0-26.5-21.5-48-48-48l-96 0c-26.5 0-48 21.5-48 48zM304 32c-26.5 0-48 21.5-48 48l0 32c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-32c0-26.5-21.5-48-48-48l-96 0z"/></svg>
          </button>
          <button id="addHtml" data-extra-info="Paste HTML"
            class="hidden pagebuilder-only mt-4 bg-fruit-salad-500 hover:bg-fruit-salad-700 text-fuscous-gray-50 font-bold pt-1 pb-1.5 px-4 mb-2 rounded inline mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 inline"><path d="M160 0c-23.7 0-44.4 12.9-55.4 32L48 32C21.5 32 0 53.5 0 80L0 400c0 26.5 21.5 48 48 48l144 0 0-272c0-44.2 35.8-80 80-80l48 0 0-16c0-26.5-21.5-48-48-48l-56.6 0C204.4 12.9 183.7 0 160 0zM272 128c-26.5 0-48 21.5-48 48l0 272 0 16c0 26.5 21.5 48 48 48l192 0c26.5 0 48-21.5 48-48l0-220.1c0-12.7-5.1-24.9-14.1-33.9l-67.9-67.9c-9-9-21.2-14.1-33.9-14.1L320 128l-48 0zM160 40a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
          </button>
          <div class="relative group float-right mr-4">
            <button id="editPageSettings"
              class="pagebuilder-only mt-4 bg-gray-asparagus-500 hover:bg-gray-asparagus-700 text-fuscous-gray-50 font-bold p-2 px-4 mb-2 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" class="h-5 w-5 mx-auto" viewBox="0 0 512 512">
                <!-- Font Awesome icon here -->
                <path
                  d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
              </svg>
            </button>
            <div id="dropdownMenu"
              class="bottom-10 right-0 bg-pearl-bush-50 w-40 dropdown-menu hidden group-hover:block absolute bg-white text-mine-shaft-700 text-sm shadow-lg rounded mt-1">
              <button id="pageSettings" data-extra-info="Edit page colors, metadata, & more"
                class="block w-full text-left rounded-t p-3 hover:bg-pearl-bush-300">Page Settings</button>
              <button id="appSageSettings"
                class="block w-full text-left rounded-b p-3 hover:bg-pearl-bush-300">appSageSettings</button>
            </div>
          </div>
          <button id="copyPage" onclick="copyPageHTML(this)" data-extra-info="Copy raw HTML to paste into an HTML file"
            class="pagebuilder-only transition mt-4 bg-gray-asparagus-500 hover:bg-gray-asparagus-700 text-fuscous-gray-50 font-bold p-2 px-4 mb-2 rounded float-right mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" class="h-5 w-5 mx-auto"
              viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
              <path
                d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" />
            </svg>
          </button>
          <button id="copyMetadata" onclick="copyMetadata(this)"
            data-extra-info="Copy raw metadata to paste into an HTML file's <head> tag"
            class="hidden pagebuilder-only transition mt-4 bg-fruit-salad-500 hover:bg-fruit-salad-700 text-fuscous-gray-50 font-bold p-2 px-4 mb-2 rounded float-right mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" class="h-5 w-5 mx-auto"
              viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
              <path
                d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" />
            </svg>
          </button>
        </div>
        <div id="settingsModal"
          class="fixed py-12 inset-0 bg-pearl-bush-800 bg-opacity-50 flex justify-center items-center z-[60] hidden">
          <form id="appSageSettingsForm"
            class="bg-pearl-bush-100 p-4 rounded-lg max-w-md mx-auto pb-16">
            <div class="relative overflow-y-auto overscroll-contain h-[calc(100vh-(10rem))]">
              <div class="pb-16 pt-10">
                <h2 class="text-russett-600 text-3xl font-bold">Warning! This settings area is under active development</h2>
                <div class="space-y-6 px-4">
                  <!-- Fonts Section -->
                  <fieldset class="border border-pearl-bush-300 p-4 rounded">
                    <legend class="text-lg font-semibold">Custom Fonts</legend>
                    <div id="fontsContainer" class="space-y-2">
                      <label for="customFont" class="block text-fuscous-gray-600 font-medium">Choose or Enter Google Fonts:</label>
                      <select id="fonts" name="customFont" multiple
                        class="shadow border rounded py-2 px-3 text-fuscous-gray-700 leading-tight w-full focus:outline-none focus:shadow-outline">
                        <option value="Roboto">Roboto</option>
                        <option value="Open+Sans">Open Sans</option>
                        <option value="Lato">Lato</option>
                        <option value="Montserrat">Montserrat</option>
                        <option value="Oswald">Oswald</option>
                        <option value="Raleway">Raleway</option>
                        <option value="Poppins">Poppins</option>
                        <option value="Source+Sans+Pro">Source Sans Pro</option>
                        <option value="Merriweather">Merriweather</option>
                        <option value="Nunito">Nunito</option>
                        <option value="Ubuntu">Ubuntu</option>
                        <option value="Playfair+Display">Playfair Display</option>
                        <option value="Noto+Sans">Noto Sans</option>
                        <option value="Mukta">Mukta</option>
                        <option value="Roboto+Condensed">Roboto Condensed</option>
                        <option value="Quicksand">Quicksand</option>
                      </select>

                      <input type="text" id="manual-font" placeholder="Enter a Google Font name"
                        class="shadow border rounded py-2 px-3 text-fuscous-gray-700 leading-tight w-full focus:outline-none focus:shadow-outline">
                    </div>
                    <button type="button" id="addFont" class="mt-2 py-2 px-4 bg-fruit-salad-500 font-semibold text-white rounded shadow">Add
                      Font</button>
                  </fieldset>

                  <!-- Colors Section -->
                  <fieldset class="border border-pearl-bush-300 p-4 rounded">
                    <legend class="text-lg font-semibold">Custom Colors</legend>
                    <div id="colorsContainer" class="space-y-4">
                      <div class="color-group border-b border-pearl-bush-300 pb-4">
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
                      </div>
                    </div>

                    <button type="button" id="addColorGroup" class="mt-4 py-2 px-4 bg-fruit-salad-500 font-semibold text-white rounded shadow">Add Color Group</button>
                  </fieldset>

                  <fieldset class="border border-pearl-bush-300 p-4 rounded">
                    <a class="${advancedMode ? 'block' : 'hidden'} w-48 mt-4 py-2 px-4 bg-fruit-salad-500 font-semibold text-white rounded shadow cursor-pointer" onclick="showColorJsonInputModal()">Paste JSON Object</a>
                  </fieldset>

                  <!-- Advanced Mode -->
                  <fieldset class="border border-pearl-bush-300 p-4 rounded">
                    <legend class="text-lg font-semibold">Advanced Mode</legend>
                    <label
                      data-extra-info="Turn this on if you are a coder person or enjoy getting confused and breaking things."
                      for="advancedMode" class="inline-flex items-center space-x-2 text-fuscous-gray-600 font-medium">
                      <input type="checkbox" id="advancedMode" name="advancedMode"
                        class="shadow border rounded focus:outline-none focus:shadow-outline">
                      <span>Enable Advanced Mode</span>
                    </label>
                  </fieldset>
                </div>
              </div>
              <div class="flex justify-between fixed bottom-10 bg-pearl-bush-100 pb-2 w-[26rem]">
                <button type="submit" id="confirmSaveSettings"
                  class="bg-fruit-salad-500 hover:bg-fruit-salad-700 border-2 border-transparent text-fuscous-gray-50 font-bold p-2 rounded">Save</button>
                <a id="cancelSaveSettings"
                  class="cursor-pointer border-2 border-fruit-salad-500 hover:border-fruit-salad-700 text-fruit-salad-500 hover:text-fruit-salad-700 font-bold p-2 rounded">Cancel</a>
              </div>
            </div>
          </form>
        </div>
      `;

      if (electronMode) {
        loadEditorScripts().then(() => {
          initializeConfig().then(()=>{
            activateComponents(true);
            resolve();
          });
        });
      } else {
        initializeConfig().then(()=>{
          activateComponents(true);
          resolve();
        });
      }
    } catch (error) {
      reject(error); // Reject the promise if there's an error
    }
  });
}
window.initializeEditorHtml = initializeEditorHtml;

async function loadEditorScripts() {
  if (editorScriptsAlreadyLoaded === true) {
    return new Promise((resolve, reject) => { resolve(); });
  } else {
    await loadScript('./render/indexeddb.js');
    await loadScript('./render/load.js');
    await loadScript('./render/editor/revision.js');
    await loadScript('./render/editor/save.js');
    await loadScript('./render/editor/grid.js');
    await loadScript('./render/editor/style/grid.js');
    await loadScript('./render/editor/container.js');
    await loadScript('./render/editor/style/container.js');
    await loadScript('./render/editor/component.js');
    await loadScript('./render/editor/column.js');
    await loadScript('./render/editor/style/column.js');
    await loadScript('./render/editor/content.js');
    await loadScript('./render/editor/sidebar.js');
    await loadScript('./render/editor/style.js');
    await loadScript('./render/editor/load.js');
    await loadScript('./render/editor/components/main.js');
    await loadScript('./render/editor/responsive.js');
    await loadScript('./render/remote_save.js');
    await loadScript('./render/editor/media.js');
    await loadScript('./render/main.js');
    return new Promise((resolve, reject) => {
      try {
        // TODO
        // loadScripts([ all the waits above used to be in here, some should be added back for efficiency sake ]);

        const components = Object.keys(appSageComponents).map(key => appSageComponents[key]);
        components.map(component => {
          if (component.html_template !== '') return;
          if (component.license === 'premium' && appSagePremium === false) return;

          const path = component.license === 'premium'
            ? `./render/editor/components/premium/${component.file}`
            : `./render/editor/components/free/${component.file}`;

          loadScript(path);
        });
        editorScriptsAlreadyLoaded = true;
        resolve();
      } catch(error) {
        reject(error);
        console.error('Error loading scripts:', error.stack || error);
      }
    });
  }
}
window.loadEditorScripts = loadEditorScripts;

function setupPageEvents() {
  // This big chunk does everything necessary for initial page setup which is
  // largely comprised of setting up all the listeners that allow various editing
  // functions that show up in the sidebar.
  const editPageButton = document.getElementById('editPageSettings');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const addHtmlButton = document.getElementById('addHtml');
  const pageSettingsButton = document.getElementById('pageSettings');
  const appSageSettingsButton = document.getElementById('appSageSettings');

  const apex = document.getElementById('apex');

  // Show/hide the drop-up menu
  editPageButton.addEventListener('click', function (event) {
    dropdownMenu.classList.toggle('hidden');
    event.stopPropagation(); // Prevent the event from propagating further
  });

  if (addHtmlButton) {
    addHtmlButton.addEventListener('click', function(e){
      pasteHtmlPortion(e, document.getElementById('page'));
    });
  }

  // Clicking outside the dropdown menu hides it
  document.addEventListener('click', function () {
    dropdownMenu.classList.add('hidden');
  });

  // Prevent click inside the menu from closing it
  dropdownMenu.addEventListener('click', function (event) {
    event.stopPropagation();
  });

  // Handle Page Settings button click
  pageSettingsButton.addEventListener('click', function () {
    addPageOptions(); // Call your existing function
    dropdownMenu.classList.add('hidden'); // Hide the menu after click
  });

  // Handle appSage Settings button click
  appSageSettingsButton.addEventListener('click', function () {
    showSettingsModal();
  });

  const addGridButton = document.getElementById('addGrid');
  addGridButton.addEventListener('click', function (e) {
    e.stopPropagation();
    const gridContainer = document.createElement('div');
    gridContainer.className = 'w-full min-w-full max-w-full min-h-auto h-auto max-h-auto pagegrid grid grid-cols-1 p-4 ml-0 mr-0 mt-0 mb-0 ugc-keep';

    const initialColumn = createColumn();
    gridContainer.appendChild(initialColumn);
    initialColumn.appendChild(createAddContentButton(initialColumn));
    initialColumn.appendChild(createAddComponentButton(initialColumn));
    initialColumn.appendChild(createCopyHtmlSectionButton(initialColumn));

    document.getElementById('page').appendChild(gridContainer);

    addGridOptions(gridContainer);

    // Append add column button at the end
    const addColumnButton = createAddColumnButton(gridContainer);
    gridContainer.appendChild(addColumnButton);
    const addCopyHtmlButton = createCopyHtmlSectionButton(gridContainer);
    gridContainer.appendChild(addCopyHtmlButton);

    enableEditGridOnClick(gridContainer);
  });

  const addContainerButton = document.getElementById('addContainer');
  addContainerButton.addEventListener('click', function () {
    const containerContainer = document.createElement('div');
    containerContainer.className = 'group w-full min-w-full max-w-full min-h-auto h-auto max-h-auto maincontainer pagecontainer flex ml-0 mr-0 mt-0 mb-0 p-4 ugc-keep';
    const page = document.getElementById('page');
    page.appendChild(containerContainer);

    addContainerOptions(containerContainer);
    addIdAndClassToElements();

    // Enable recursive boxes
    const addContainerButton = createAddContainerButton(containerContainer);
    containerContainer.appendChild(addContainerButton);
    const addGridButton = createAddGridButton(containerContainer);
    containerContainer.appendChild(addGridButton);

    if (advancedMode === true){
      const addHtmlButton = createAddHtmlButton(containerContainer);
      containerContainer.appendChild(addHtmlButton);
      const addCopyHtmlButton = createCopyHtmlSectionButton(containerContainer);
      containerContainer.appendChild(addCopyHtmlButton);
    }

    // Append add content button at the end
    const addContentButton = createAddContentButton(containerContainer);
    containerContainer.appendChild(addContentButton);

    const addComponentButton = createAddComponentButton(containerContainer);
    containerContainer.appendChild(addComponentButton);

    enableEditContainerOnClick(containerContainer);
    highlightEditingElement(containerContainer);
  });

  // Mouse enter event
  apex.addEventListener('mouseenter', function (e) {
    if (e.target.matches('[data-extra-info]') && e.target.getAttribute('data-extra-info')) {
      updateTooltip(e, true);
    }
  }, true); // Use capture phase to ensure tooltip updates immediately

  // Mouse leave event
  apex.addEventListener('mouseleave', function (e) {
    if (e.target.matches('[data-extra-info]')) {
      updateTooltip(e, false);
    }
  }, true);

  // Reveal advanced features
  if (window.advancedMode === true) {
    const pasteHtmlBtn = document.getElementById('addHtml');
    if (pasteHtmlBtn) pasteHtmlBtn.classList.remove('hidden');
    const addContainerBtn = document.getElementById('addContainer')
    if (addContainerBtn) addContainerBtn.classList.remove('hidden');
    const copyMetaBtn = document.getElementById('copyMetadata')
    if (copyMetaBtn) copyMetaBtn.classList.remove('hidden');
  }
}
window.setupPageEvents = setupPageEvents;

function loadScripts(scriptUrls) {
  scriptUrls.forEach(src => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    const apex = document.getElementById('apex');
    apex.appendChild(script);
  });
}
window.loadScripts = loadScripts;

async function initializeConfig() {
  const params = new URLSearchParams(window.location.search);
  const config = params.get('config');
  let pageData = await loadPage(config);
  return new Promise((resolve, reject) => {
    try {
      if (typeof config !== 'undefined' && config !== 'new') {
        if (!electronMode) {
          // Using localStorage for non-Electron mode
          const titleIdMap = JSON.parse(localStorage.getItem(appSageTitleIdMapString)) || {};
          let pageTitle = Object.entries(titleIdMap).find(([title, id]) => id === config)?.[0] || 'Untitled';
          document.querySelector('title').textContent = `Editing: ${pageTitle} | appSage`;
          if (pageData && pageData.length > 0) {
            loadChanges(pageData);
            loadPageSettings(config);
            loadPageMetadata(config);
          }
        } else if (electronMode) {
          // Using Electron storage
          if (pageData) {
            document.querySelector('title').textContent = `Editing: ${pageData.title} | appSage`;
            if ((typeof pageData.page_data !== 'undefined')) {
              loadChanges(pageData.page_data);
              loadPageSettings(config);
              loadPageMetadata(config);
            }
          }
        }
        setupAutoSave(config);
      } else {
        createNewConfigurationFile();
      }
      resolve();
    } catch (error) {
      reject(error); // Reject the promise if there's an error
    }
  });
}
window.initializeConfig = initializeConfig;

window.editorMode = true;

// Function to save metadata to localStorage, ensuring no duplicate tags
function saveMetadataToLocalStorage(page_id, newMetaTags) {
  const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
  const settings = JSON.parse(storedData.pages[page_id].settings);

  if (!settings.metaTags) {
    settings.metaTags = [];
  }

  // Helper function to check if the meta tag already exists
  function tagExists(newTag) {
    return settings.metaTags.some(tag => tag.type === newTag.type && tag.name === newTag.name);
  }

  // Iterate over the newMetaTags and add them if they don't already exist
  newMetaTags.forEach(newTag => {
    if (!tagExists(newTag)) {
      settings.metaTags.push(newTag); // Add new meta tag only if it doesn't exist
    } else {
      console.warn(`Meta tag with type: "${newTag.type}" and name: "${newTag.name}" already exists.`);
    }
  });

  // Save updated settings back to localStorage
  storedData.pages[page_id].settings = JSON.stringify(settings);
  localStorage.setItem(appSageStorageString, JSON.stringify(storedData));

  console.log('Metadata saved successfully!');
}
window.saveMetadataToLocalStorage = saveMetadataToLocalStorage;

// This function is for adding to the sidebar all the options available for
// styles that impact the entire page, or metadata like page titles, og:image
// tags, descriptions, etc.
// DATA IN: null
function addPageOptions() {
  const page = document.getElementById('page');
  const sidebar = document.getElementById('sidebar-dynamic');
  sidebar.innerHTML = `${generateSidebarTabs()}`; // Clear existing editor
  const editTitle = document.createElement('div');
  editTitle.innerHTML = `<strong>Edit Page Styles &amp; Metadata</strong>`
  activateTabs();

  if (page) {
    addEditableMetadata(sidebar, 'prepend');
    addEditablePageTitle(sidebar, 'prepend');
    sidebar.prepend(editTitle);
    addEditableBackgroundColor(sidebar, page);
    addEditableBackgroundImage(sidebar, page);
    addEditableBackgroundImageURL(sidebar, page);
    addEditableBackgroundFeatures(sidebar, page);
  }
} // DATA OUT: null
window.addPageOptions = addPageOptions;

// This function makes tooltips show up anywhere you hover over an element that
// has the `data-extra-info` attribute. This functional is critical for
// elaborating on WTF something does for the designer making a page.
// DATA IN: ['HTML Element', 'Boolean']
function updateTooltip(e, show) {
  const tooltip = document.getElementById('tooltip');
  let extraClasses = '';

  if (show) {
    extraClasses = e.target.getAttribute('data-extra-info-class') || '';
    const targetRect = e.target.getBoundingClientRect();
    tooltip.innerHTML = e.target.getAttribute('data-extra-info') || '';
    let tooltipX = targetRect.left + (targetRect.width / 2) - (tooltip.offsetWidth / 2);
    let tooltipY = targetRect.top - tooltip.offsetHeight - 5;

    // Ensure the tooltip does not overflow horizontally
    const apex = document.getElementById('apex');
    const rightOverflow = tooltipX + tooltip.offsetWidth - apex.clientWidth;
    if (rightOverflow > 0) {
      tooltipX -= rightOverflow;  // Adjust to the left if overflowing on the right
    }
    if (tooltipX < 0) {
      tooltipX = 5;  // Keep some space from the left edge if overflowing on the left
    }

    // Adjust vertically if there is not enough space above the target
    if (targetRect.top < tooltip.offsetHeight + 10) {
      tooltipY = targetRect.bottom + 5;
    }

    // Set tooltip position
    tooltip.style.left = `${tooltipX}px`;
    tooltip.style.top = `${tooltipY}px`;

    // Show tooltip with extra classes
    tooltip.classList.replace('opacity-0', 'opacity-100');
    tooltip.classList.remove('invisible');
    tooltip.classList.add('visible');
    if (extraClasses !== '') extraClasses.split(' ').forEach(cls => tooltip.classList.add(cls));
  } else {
    // Hide tooltip and remove extra classes
    tooltip.classList.replace('opacity-100', 'opacity-0');
    tooltip.classList.remove('visible');
    tooltip.classList.add('invisible');
    if (extraClasses !== '') extraClasses.split(' ').forEach(cls => tooltip.classList.remove(cls));
  }
} // DATA OUT: null
window.updateTooltip = updateTooltip;

// This hulking function brings up a modal for pasting in HTML with Tailwind
// classes. This is for folks who have/bought existing HTML that uses
// TailwindCSS.
// TODO: Validate that the HTML is indeed Tailwind-y before proceeding to litter
// the page/page editor with the markup. Or... do we just ignore the fact that
// it isn't Tailwind-y and let them edit it anyway? In which case, nothing to do here.
// DATA IN: Optional function()
function showHtmlModal(element, onConfirm = null) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-[60] bg-pearl-bush-800 bg-opacity-50 flex justify-center items-center';
  modal.innerHTML = `
      <div class="bg-pearl-bush-100 p-4 rounded-lg max-w-2xl mx-auto w-full">
          <p class="text-fuscous-gray-900">Add HTML with TailwindCSS classes:</p>
          <textarea id="tailwindHtml" rows="20" class="shadow border rounded py-2 px-3 text-fuscous-gray-700 leading-tight my-1.5 w-full focus:outline-none focus:shadow-outline"></textarea>
          <div class="flex justify-between mt-4" id="btnContainer">
            <button id="cancelHtml" class="bg-fruit-salad-500 hover:bg-fruit-salad-700 text-fuscous-gray-50 font-bold p-2 rounded">Cancel</button>
          </div>
      </div>
  `;

  const apex = document.getElementById('apex');

  apex.appendChild(modal);

  const btnContainer = document.getElementById('btnContainer');
  const confButton = document.createElement('button');
  confButton.className = 'bg-gray-asparagus-500 hover:bg-gray-asparagus-700 text-fuscous-gray-50 font-bold p-2 rounded';
  confButton.textContent = 'Add HTML';
  btnContainer.prepend(confButton);
  confButton.addEventListener('click', function () {
    if (onConfirm) onConfirm();
    const content = document.getElementById('tailwindHtml').value;
    convertTailwindHtml(content, element);
    apex.removeChild(modal);
  });

  document.getElementById('cancelHtml').addEventListener('click', function () {
    apex.removeChild(modal);
  });
} // DATA OUT: null
window.showHtmlModal = showHtmlModal;

function convertTailwindHtml(content, element) {
  // Create a container to hold the pasted content
  const parentElement = document.createElement('div');
  parentElement.classList = 'pastedHtmlContainer pagecontainer';
  parentElement.innerHTML = content;
  element.appendChild(parentElement);
  wrapElements(parentElement);
  addIdAndClassToElements();
}
window.convertTailwindHtml = convertTailwindHtml;

function wrapElements(container) {
  const children = Array.from(container.childNodes);

  const structureTags = ['ARTICLE', 'SECTION', 'DIV', 'NAV', 'ASIDE', 'HEADER', 'FOOTER', 'MAIN', 'TABLE', 'THEAD', 'TBODY', 'TFOOT', 'TR'];

  const contentTags = ['P', 'BUTTON', 'A', 'SPAN', 'BLOCKQUOTE',
    'IMG', 'VIDEO', 'AUDIO', 'FIGURE', 'IFRAME',
    'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
    'FIGCAPTION', 'CAPTION', 'TIME', 'MARK', 'SUMMARY', 'DETAILS',
    'PROGRESS', 'METER', 'DL', 'DT', 'DD'];

  const tableTags = ['TH', 'TD', 'COL', 'COLGROUP'];

  children.forEach((child) => {
    if (child.nodeType === Node.ELEMENT_NODE) {
      // Check if child is part of a grid structure by looking at its immediate parent
      const isInGrid = container.classList.contains('grid');

      // Check if the element is holding content children
      const hasContentChildren = Array.from(child.children).some(el =>
        contentTags.includes(el.tagName) || tableTags.includes(el.tagName)
      );

      // Apply grid-related classes
      if (child.classList.contains('grid')) {
        child.classList.add('pagegrid');
      }

      // If child is inside a grid, apply `pagecolumn` class
      if (isInGrid) {
        child.classList.add('pagecolumn');
      }

      // Handle structured elements like `th`, `td`, etc.
      if (tableTags.includes(child.tagName)) {
        child.classList.add('pagecontent', 'content-container');
        const wrapper = document.createElement('div');
        // Wrap the internal HTML content of `th`, `td`, etc.
        wrapper.innerHTML = child.innerHTML;
        child.innerHTML = ''; // Clear original content
        child.appendChild(wrapper);
        // Enable editing and observation for the element
        displayMediaFromStorage(child.firstElementChild);
        enableEditContentOnClick(child);
        observeClassManipulation(child);
      } else if (hasContentChildren && child.tagName === 'DIV' && child.children.length === 1) {
        // For divs with single content elements, add classes directly without wrapping
        child.classList.add('pagecontent', 'content-container');
      } else if (contentTags.includes(child.tagName)) {
        // Wrap content elements in a div with `pagecontent content-container` classes
        const wrapper = document.createElement('div');
        wrapper.classList.add('pagecontent', 'content-container');
        wrapper.appendChild(child.cloneNode(true));
        container.replaceChild(wrapper, child);

        // Enable editing and observation for the wrapper
        displayMediaFromStorage(wrapper.firstElementChild);
        enableEditContentOnClick(wrapper);
        observeClassManipulation(wrapper);

        // Recursively apply wrapping to the children of the new wrapper
        wrapElements(wrapper.firstChild);
      } else if (hasContentChildren) {
        // If the element houses content, add `pagecontainer` class but don't wrap
        child.classList.add('pagecontainer');

        // Recursively apply wrapping to children
        wrapElements(child);
      } else {
        // Recursively handle child elements for non-wrapped cases
        child.classList.add('pagecontainer');
        wrapElements(child);
      }
    }
  });
}
window.wrapElements = wrapElements;

// This function adds a cyan glow around the element being edited to give a visual
// breadcrumb of what element is currently going to be effected by any changes
// made from the sidebar.
// DATA IN: null
function highlightEditingElement(element) {
  removeEditingHighlights(); // Clear existing highlights
  document.getElementById('page').querySelectorAll('.highlightButton').forEach(btn => {
    btn.classList.add('hidden');
    btn.classList.remove('block');
  });
  if (element) {
    element.classList.add('editing-highlight'); // Highlight the current element
    element.querySelectorAll(':scope > .highlightButton').forEach(btn => {
      btn.classList.add('block');
      btn.classList.remove('hidden');
    });
  }
} // DATA OUT: null
window.highlightEditingElement = highlightEditingElement;

// This function removes the above visual breadcrumb making way for a new
// highlight. This function should ideally always be called prior to its
// antithetical counterpart.
// DATA IN: null
function removeEditingHighlights() {
  const highlight = document.querySelectorAll('.editing-highlight');
  window.highlighty = highlight;
  if (highlight) {
    highlight.forEach(el => {
      el.classList.remove('editing-highlight');
    });
  }
} // DATA OUT: null
window.removeEditingHighlights = removeEditingHighlights;

// This function helps move column/content buttons figure out where to go
// when moving their element without getting confused by editor-specific
// elements potentially confusing where to go in the finished product.
// DATA IN: ['HTML Element, <div>', 'String:up/down']
function getNextValidSibling(element, direction) {
  let sibling = (direction === 'left' || direction === 'up') ? element.previousElementSibling : element.nextElementSibling;
  while (sibling && sibling.classList.contains('ugc-discard')) {
    sibling = (direction === 'left' || direction === 'up') ? sibling.previousElementSibling : sibling.nextElementSibling;
  }
  return sibling;
} // DATA OUT: HTML Element, <div>
window.getNextValidSibling = getNextValidSibling;

// This is a way for people who don't know how to integrate a back-end to
// simply copy/paste page contents into their own document or back-end repo.
// DATA IN: HTML Element
function copyPageHTML(button) {
  const params = new URLSearchParams(window.location.search);
  const page_id = params.get('config');
  const html_content = JSON.parse(localStorage.getItem(appSageStorageString)).pages[page_id].page_data;
  const container_settings = JSON.parse(localStorage.getItem(appSageStorageString)).pages[page_id].settings;
  const textToCopy = `<style>${getCompiledCSS()}</style>
                      ${flattenJSONToHTML(html_content, container_settings)}`;
  copyText(textToCopy, button);
} // DATA OUT: null
window.copyPageHTML = copyPageHTML;

function copyHtmlPortion(button, element) {
  // Create a clone of the element to manipulate
  const clonedElement = element.cloneNode(true);

  // Remove elements with the class 'ugc-discard'
  const elementsToDiscard = clonedElement.querySelectorAll('.ugc-discard');
  elementsToDiscard.forEach(el => el.remove());

  // Clean the cloned element using the helper function
  cleanHtmlElement(clonedElement);

  // Get the modified innerHTML
  const cloneContainer = document.createElement('div');
  cloneContainer.appendChild(clonedElement);
  const textToCopy = cloneContainer.innerHTML;

  // Use your existing copyText function
  copyText(textToCopy, button);
} // DATA OUT: null
window.copyHtmlPortion = copyHtmlPortion;

function createCopyHtmlSectionButton(container) {
  const button = document.createElement('button');
  button.setAttribute('data-extra-info', tooltips['copy-html-section']);
  button.className = 'copyHtmlSection highlightButton hidden w-16 h-12 absolute -bottom-12 left-[26rem] ugc-discard bg-fruit-salad-500 hover:bg-fruit-salad-700 text-fuscous-gray-50 font-bold p-2 rounded-b z-50';
  button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="white" class="h-5 w-5 mx-auto" viewBox="0 0 448 512"><path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z" /></svg>`;
  button.addEventListener('click', function(e) {
    e.stopPropagation();
    copyHtmlPortion(button, container);
  })
  return button;
} // DATA OUT: HTML Element, <button>
window.createCopyHtmlSectionButton = createCopyHtmlSectionButton;

function cleanHtmlElement(element) {
  // Remove ids with the name "editing-highlight"
  if (element.classList.contains('editing-highlight')) {
    element.classList.remove('editing-highlight');
  }

  // Classes to remove
  const classesToRemove = [
    "maincontainer",
    "pastedHtmlContainer"
  ];

  // Remove specified classes
  classesToRemove.forEach(className => {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    }
  });

  // Recursively clean child elements
  Array.from(element.children).forEach(child => cleanHtmlElement(child));
}

function pasteHtmlPortion(button, element) {
  navigator.clipboard.readText().then(textToPaste => {
    const parent = document.createElement('div');
    parent.className = 'maincontainer pagecontainer ugc-keep';
    textToPaste = textToPaste.replace(/ugc-keep/g, '');
    parent.innerHTML = textToPaste;
    element.appendChild(parent);
    loadChanges(element, true);
    button.innerHTML = '<svg id="poppyCopy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M32 32a32 32 0 1 1 64 0A32 32 0 1 1 32 32zM448 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32 256a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM167 153c-9.4-9.4-9.4-24.6 0-33.9l8.3-8.3c16.7-16.7 27.2-38.6 29.8-62.1l3-27.4C209.6 8.2 221.5-1.3 234.7 .1s22.7 13.3 21.2 26.5l-3 27.4c-3.8 34.3-19.2 66.3-43.6 90.7L201 153c-9.4 9.4-24.6 9.4-33.9 0zM359 311l8.2-8.3c24.4-24.4 56.4-39.8 90.7-43.6l27.4-3c13.2-1.5 25 8 26.5 21.2s-8 25-21.2 26.5l-27.4 3c-23.5 2.6-45.4 13.1-62.1 29.8L393 345c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9zM506.3 8.5c8.6 10.1 7.3 25.3-2.8 33.8l-10 8.5c-14.8 12.5-33.7 19.1-53 18.6c-16.6-.4-30.6 12.4-31.6 29l-1.8 30c-2.5 42.5-38.3 75.3-80.8 74.2c-7.6-.2-15 2.4-20.7 7.3l-10 8.5c-10.1 8.6-25.3 7.3-33.8-2.8s-7.3-25.3 2.8-33.8l10-8.5c14.8-12.5 33.7-19.1 53-18.6c16.6 .4 30.6-12.4 31.6-29l1.8-30c2.5-42.5 38.3-75.3 80.8-74.2c7.6 .2 15-2.4 20.7-7.3l10-8.5c10.1-8.6 25.3-7.3 33.8 2.8zM150.6 201.4l160 160c7.7 7.7 10.9 18.8 8.6 29.4s-9.9 19.4-20 23.2l-39.7 14.9L83.1 252.5 98 212.8c3.8-10.2 12.6-17.7 23.2-20s21.7 1 29.4 8.6zM48.2 345.6l22.6-60.2L226.6 441.2l-60.2 22.6L48.2 345.6zM35.9 378.5l97.6 97.6L43.2 510c-11.7 4.4-25 1.5-33.9-7.3S-2.4 480.5 2 468.8l33.8-90.3z"/></svg>';
    resetCopyPageButton(button);
  }).catch(err => {
    console.error('Failed to read clipboard contents:', err);
  });
} // DATA OUT: null
window.pasteHtmlPortion = pasteHtmlPortion;

// This is a way for people who don't know how to integrate a back-end to
// simply copy/paste page metadata into their own document or back-end repo.
// DATA IN: HTML Element
function copyMetadata(element) {
  const params = new URLSearchParams(window.location.search);
  const config = params.get('config');
  const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
  const settings = JSON.parse(storedData.pages[config].settings);
  const metaTags = settings.metaTags;
  let metaTagsString = '';

  metaTags.forEach(tag => {
    if (tag.type === 'link') {
      metaTagsString += `<link rel="${tag.name}" href="${tag.content}">`;
    } else {
      metaTagsString += `<meta ${tag.type}="${tag.name}" content="${tag.content}">`;
    }
  });

  copyText(metaTagsString, element);
} // DATA OUT: null
window.copyMetadata = copyMetadata;

// This is the workhorse function for `copyMetadata` and `copyPageHTML`
// DATA IN: ['String', 'HTML Element, <div>']
function copyText(textToCopy, element) {
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      element.innerHTML = '<svg id="poppyCopy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M32 32a32 32 0 1 1 64 0A32 32 0 1 1 32 32zM448 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32 256a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM167 153c-9.4-9.4-9.4-24.6 0-33.9l8.3-8.3c16.7-16.7 27.2-38.6 29.8-62.1l3-27.4C209.6 8.2 221.5-1.3 234.7 .1s22.7 13.3 21.2 26.5l-3 27.4c-3.8 34.3-19.2 66.3-43.6 90.7L201 153c-9.4 9.4-24.6 9.4-33.9 0zM359 311l8.2-8.3c24.4-24.4 56.4-39.8 90.7-43.6l27.4-3c13.2-1.5 25 8 26.5 21.2s-8 25-21.2 26.5l-27.4 3c-23.5 2.6-45.4 13.1-62.1 29.8L393 345c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9zM506.3 8.5c8.6 10.1 7.3 25.3-2.8 33.8l-10 8.5c-14.8 12.5-33.7 19.1-53 18.6c-16.6-.4-30.6 12.4-31.6 29l-1.8 30c-2.5 42.5-38.3 75.3-80.8 74.2c-7.6-.2-15 2.4-20.7 7.3l-10 8.5c-10.1 8.6-25.3 7.3-33.8-2.8s-7.3-25.3 2.8-33.8l10-8.5c14.8-12.5 33.7-19.1 53-18.6c16.6 .4 30.6-12.4 31.6-29l1.8-30c2.5-42.5 38.3-75.3 80.8-74.2c7.6 .2 15-2.4 20.7-7.3l10-8.5c10.1-8.6 25.3-7.3 33.8 2.8zM150.6 201.4l160 160c7.7 7.7 10.9 18.8 8.6 29.4s-9.9 19.4-20 23.2l-39.7 14.9L83.1 252.5 98 212.8c3.8-10.2 12.6-17.7 23.2-20s21.7 1 29.4 8.6zM48.2 345.6l22.6-60.2L226.6 441.2l-60.2 22.6L48.2 345.6zM35.9 378.5l97.6 97.6L43.2 510c-11.7 4.4-25 1.5-33.9-7.3S-2.4 480.5 2 468.8l33.8-90.3z"/></svg>';
      resetCopyPageButton(element);
    })
    .catch(err => {
      return String(console.error("Failed to copy text: ", err));
    });
} // DATA OUT: String
window.copyText = copyText;

// When a copy button is clicked, the icon is replaced with a "Tada!" emoji.
// This function swaps it back to the regular icon after 0.75 seconds.
// DATA IN: HTML Element
function resetCopyPageButton(element) {
  setTimeout(function () {
    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="white" class="h-5 w-5 mx-auto" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/></svg>';
  }, 750)
} // DATA OUT: null
window.resetCopyPageButton = resetCopyPageButton;

// This function creates the form input for changing the page's title.
// DATA IN: ['HTML Element, <div>', 'null || String:append/prepend']
// This function creates the form input for changing the page's title.
// DATA IN: ['HTML Element, <div>', 'null || String:append/prepend']
function addEditablePageTitle(container, placement) {
  const params = new URLSearchParams(window.location.search);
  let titleIdMap;

  if (!electronMode) {
    // Using localStorage for non-Electron mode
    titleIdMap = JSON.parse(localStorage.getItem(appSageTitleIdMapString)) || {};
  } else {
    // Using Electron storage
    window.api.readStoreData().then((storeData) => {
      titleIdMap = storeData.titles || {};
    }).catch((error) => {
      console.error('Error reading title ID map in Electron mode:', error);
      titleIdMap = {}; // Fallback to an empty object if there's an error
    });
  }

  let currentTitle = Object.entries(titleIdMap).find(([title, id]) => id === params.get('config'))?.[0];

  const titleLabel = document.createElement('label');
  titleLabel.className = 'text-fuscous-gray-700 text-xs uppercase mt-2';
  titleLabel.setAttribute('for', 'page-title');
  titleLabel.textContent = 'Page Title'
  const titleInput = document.createElement('input');
  titleInput.className = 'metadata meta-content my-1 shadow border bg-[#ffffff] rounded py-2 px-3 text-fuscous-gray-700 leading-tight focus:outline-none focus:shadow-outline';
  titleInput.setAttribute('name', 'page-title');
  titleInput.type = 'text';
  titleInput.value = currentTitle;
  titleInput.placeholder = 'Page Title';

  titleInput.addEventListener('change', function () {
    const newTitle = titleInput.value;
    changeLocalStoragePageTitle(newTitle);
  });
  if (placement === 'prepend') {
    container.prepend(titleInput);
    container.prepend(titleLabel);
  } else {
    container.appendChild(titleLabel);
    container.appendChild(titleInput);
  }
} // DATA OUT: null
window.addEditablePageTitle = addEditablePageTitle;

// This function changes the page's title. Because localStorage data for the
// page is identified by the page's title, we have to copy the data over to a
// new object, then delete the old one.
// DATA IN: String
function changeLocalStoragePageTitle(newTitle) {
  const params = new URLSearchParams(window.location.search);
  const currentPageId = params.get('config');

  // Retrieve the title-ID mapping from localStorage
  const titleIdMap = JSON.parse(localStorage.getItem(appSageTitleIdMapString)) || {};

  // Find the current title using the page ID
  let currentTitle = null;
  for (let [title, id] of Object.entries(titleIdMap)) {
    if (id === currentPageId) {
      currentTitle = title;
      break;
    }
  }

  if (currentTitle) {
    // Update the mapping with the new title
    delete titleIdMap[currentTitle];
    titleIdMap[newTitle] = currentPageId;

    // Save the updated mapping back to localStorage
    localStorage.setItem(appSageTitleIdMapString, JSON.stringify(titleIdMap));

    // Update the URL parameters (the page ID remains the same)
    params.set('config', currentPageId);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  } else {
    console.error(`Page with ID "${currentPageId}" does not exist.`);
  }
} // DATA OUT: null
window.changeLocalStoragePageTitle = changeLocalStoragePageTitle;

// This function generates the area for creating as many items of metadata as
// the designer deems necessary.
// DATA IN: ['HTML Element, <div>', 'null || String:append/prepend']
function addEditableMetadata(container, placement) {
  /*
  defaults:
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  automatically generate?:
    <meta name="description" content="This page was built using appSage">
    <meta property="og:title" content="Untitled | Built w/ appSage">
  */
  const metaDataContainer = document.createElement('div');
  if (placement === 'prepend') {
    container.prepend(metaDataContainer);
  } else {
    container.appendChild(metaDataContainer);
  }

  const params = new URLSearchParams(window.location.search);
  const page_id = params.get('config');
  const metaDataPairsContainer = document.createElement('div');
  metaDataPairsContainer.innerHTML = '<h3 class="font-semibold text-lg mb-2">Metadata</h3>';
  metaDataPairsContainer.className = 'my-2 col-span-5 border rounded-md border-pearl-bush-200 overflow-y-scroll p-2 max-h-48';
  metaDataContainer.appendChild(metaDataPairsContainer);

  const storedData = JSON.parse(localStorage.getItem(appSageStorageString));
  if (storedData) {
    const settings = storedData.pages[page_id].settings;
    if (typeof settings.length !== 'undefined') {
      const metaTags = JSON.parse(settings).metaTags;

      if (metaTags) {
        metaTags.forEach(tag => {
          addMetadataPair(tag.type, tag.name, tag.content);
        });
      }
    }
  }


  // Add initial empty metadata pair
  function addMetadataPair(meta_type, meta_name, meta_content) {
    const pair = document.createElement('div');
    pair.className = 'metadata-pair mt-2'

    const select = document.createElement('select');
    select.className = 'metadata meta-type my-1 shadow border bg-[#ffffff] rounded py-2 px-3 text-fuscous-gray-700 leading-tight focus:outline-none focus:shadow-outline';
    const optionName = document.createElement('option');
    optionName.value = 'name';
    optionName.selected = 'name' === meta_type;
    optionName.text = 'Name';
    const optionProperty = document.createElement('option');
    optionProperty.value = 'property';
    optionName.selected = 'property' === meta_type;
    optionProperty.text = 'Property';
    const optionLink = document.createElement('option');
    optionLink.value = 'link';
    optionLink.selected = 'link' === meta_type;
    optionLink.text = 'Link';
    select.appendChild(optionName);
    select.appendChild(optionProperty);
    select.appendChild(optionLink);

    const nameInput = document.createElement('input');
    nameInput.className = 'metadata meta-name my-1 shadow border bg-[#ffffff] rounded py-2 px-3 text-fuscous-gray-700 leading-tight focus:outline-none focus:shadow-outline';
    nameInput.type = 'text';
    nameInput.value = meta_name || '';
    nameInput.placeholder = 'Name/Property';

    const contentInput = document.createElement('input');
    contentInput.className = 'metadata meta-content my-1 shadow border bg-[#ffffff] rounded py-2 px-3 text-fuscous-gray-700 leading-tight focus:outline-none focus:shadow-outline';
    contentInput.type = 'text';
    contentInput.value = meta_content || '';
    contentInput.placeholder = 'Content';

    pair.appendChild(select);
    pair.appendChild(nameInput);
    pair.appendChild(contentInput);
    metaDataPairsContainer.appendChild(pair);
  }

  addMetadataPair();

  const addButton = document.createElement('button');
  addButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="white" class="h-4 w-4 inline mb-1"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" /></svg> Metadata';
  addButton.className = 'col-span-2 bg-fruit-salad-500 hover:bg-fruit-salad-700 text-fuscous-gray-50 font-bold p-2 rounded h-12 w-28 mt-2';
  addButton.id = 'add-metadata-button';
  metaDataContainer.appendChild(addButton);

  addButton.addEventListener('click', function () {
    addMetadataPair();
  });

  document.querySelectorAll('.metadata').forEach(input => {
    input.addEventListener('change', function () {
      const metaTags = [];
      document.querySelectorAll('.metadata-pair').forEach(pair => {
        const type = pair.querySelector('.meta-type').value;
        const name = pair.querySelector('.meta-name').value;
        const content = pair.querySelector('.meta-content').value;
        if (name && content) {
          metaTags.push({ type, name, content });
        }
      });

      saveMetadataToLocalStorage(page_id, metaTags);
    });
  });
} // DATA OUT: null
window.addEditableMetadata = addEditableMetadata;

function createNewConfigurationFile() {
  const pageId = generateAlphanumericId();
  let title = 'Untitled';
  let counter = 1;

  if (!electronMode) {
    // Using localStorage for non-Electron mode
    const titleIdMap = JSON.parse(localStorage.getItem(appSageTitleIdMapString)) || {};
    while (title in titleIdMap) {
      title = `Untitled_${counter}`;
      counter++;
    }
    // Save the mapping of title to ID
    titleIdMap[title] = pageId;
    localStorage.setItem(appSageTitleIdMapString, JSON.stringify(titleIdMap));

    const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
    if (!appSageStorage.pages) {
      appSageStorage.pages = {};
    }
    appSageStorage.pages[pageId] = { page_data: [], title: title, settings: {} };
    localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));

    window.location.search = `?config=${pageId}`; // Redirect with the new file as a parameter
  } else if (electronMode) {
    // Using Electron storage
    window.api.readStoreData().then((storeData) => {
      const titleIdMap = storeData.titles || {};

      // Generate a unique title
      while (title in titleIdMap) {
        title = `Untitled_${counter}`;
        counter++;
      }

      // Save the mapping of title to ID
      titleIdMap[title] = pageId;
      storeData.titles = titleIdMap;

      // Initialize the new page data
      if (!storeData.pages) {
        storeData.pages = {};
      }

      if (!storeData.pages[pageId]) {
        storeData.pages[pageId] = {};
      }
      storeData.titles = titleIdMap;
      storeData.pages[pageId] = { page_data: [], title: title, settings: {} };

      // Save the updated data back to Electron store
      window.api.updateStoreData(storeData).then(updatedData => {
        window.appSageStore = updatedData;
        window.location.search = `?config=${pageId}`; // Redirect with the new file as a parameter
      }).catch((error) => {
        console.error('Error updating store data in Electron mode:', error);
      });
    }).catch((error) => {
      console.error('Error reading store data in Electron mode:', error);
    });
  }
}
window.createNewConfigurationFile = createNewConfigurationFile;

function generateAlphanumericId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 16 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
window.generateAlphanumericId = generateAlphanumericId;

function addIdAndClassToElements() {
  const targetClasses = ['pagecontent', 'pagegrid', 'pagecolumn', 'pageflex', 'pagecontainer'];

  // Find elements that match the specified classes
  const elements = document.querySelectorAll(targetClasses.map(cls => `.${cls}`).join(','));

  elements.forEach(element => {
    // Check if the element already has a class like 'group/some_id'
    const hasGroupClass = Array.from(element.classList).some(cls => cls.startsWith('group/'));

    if (!hasGroupClass) { // Only add ID and class if no group/ID class exists
      const newId = generateUniqueId();
      element.classList.add(`group/[${newId}]`);
    }
  });
}
window.addIdAndClassToElements = addIdAndClassToElements;

// Function to ensure the generated ID is unique on the page
function generateUniqueId() {
  let the_id;
  do {
    the_id = generateRandomId();
  } while (document.getElementById(the_id)); // Keep generating until a unique ID is found
  return the_id;
}
window.generateUniqueId = generateUniqueId;

// Helper function to generate a random alphanumeric string of a given length
function generateRandomId(length = 8) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
window.generateRandomId = generateRandomId;
