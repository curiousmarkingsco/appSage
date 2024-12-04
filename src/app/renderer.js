// renderer.js

// Define `global` in the renderer process to mimic Node.js behavior
if (typeof global === 'undefined') {
  var global = window;  // In the browser, `global` is mapped to `window`
}

window.appSageStore;
window.editorScriptsAlreadyLoaded = false;
window.customBackend = false; // TODO: Add to appSageSettings modal
window.electronMode = !(typeof window.api === 'undefined');

document.addEventListener('DOMContentLoaded', function () {
  if (electronMode) {
    // STORAGE // TODO - Create basic authentication
    /* open: THIS AREA FOR DEV PURPOSES, DELETE ME! */
    let username = 'PLACEHOLDER_USERNAME';
    const userPassword = 'PLACEHOLDER_PASSWORD';
    const newStore = username === 'PLACEHOLDER_USERNAME';
    if (newStore) username = 'PLACEHOLDER_USERNAME_INITIALIZED'
    /* shut: THIS AREA FOR DEV PURPOSES, DELETE ME! */

    // Initialize the store and log the result or error
    window.api.createOrFindStore(username, userPassword, newStore).then(data => {
      window.appSageStore = data;
    }).catch(error => {
      console.error('Error initializing store:', error.stack || error);
    });

    loadScript('./render/tailwind.js', false).then(() => {
      loadScript('./render/tailwind.config.js', false).then(() => {
        loadScript('./render/editor/settings.js');
        routeRequestedResource();
      })
    });
  } else {
    routeRequestedResource();
  }
});

async function loadScripts(scripts) {
  const promises = scripts.map(script => loadScript(script));

  // Wait for all remaining scripts to load
  await Promise.all(promises);
}

function loadScript(scriptSrc, async = true) {
  // Check if the script is already part of the bundle
  if (electronMode) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = scriptSrc;
      script.async = async;
      script.onload = resolve;  // Resolve when loaded
      script.onerror = reject;  // Reject on error
      document.body.appendChild(script);
    });
  } else {
    // Skip loading as the script is already bundled
    // console.log(`${scriptSrc} is already bundled, skipping dynamic loading.`);
    return Promise.resolve();  // Return a resolved promise to continue the flow
  }
}

function routeRequestedResource() {
  initializeGlobals().then(() => {
    const params = new URLSearchParams(window.location.search);

    const config = params.get('config');
    if (config) {
      if (!electronMode) initializeEditor()
      if (electronMode) loadScript('./render/editor/main.js').then(() => { initializeEditor().then(() => { }) });
      executeCustomJSAfterLoad();
    }

    const pageConfig = params.get('page');
    if (pageConfig) {
      if (!electronMode) initializePreview();
      if (electronMode) loadScript('./render/preview/main.js').then(() => { initializePreview().then(() => { }) });
      executeCustomJSAfterLoad();
    }

    if (!config && !pageConfig) {
      if (!electronMode) initializeDashboard();
      if (electronMode) loadScript('./render/index/main.js').then(() => { initializeDashboard(); });
    }
  });
}

function activateComponents(editor = false) {
  const components = document.querySelectorAll('#page .pagecomponent')
  if (components.length > 0) {
    components.forEach((component) => {
      const comp = component.querySelector('[data-component-name]');
      if (editor !== false || comp.getAttribute('data-initialized') !== 'true') {
        comp.setAttribute('data-initialized', 'true');
      }
      initializeExistingComponents(comp, comp.getAttribute('data-component-name'));
    });
  }
}
window.activateComponents = activateComponents;

function initializeGlobals() {
  return new Promise((resolve, reject) => {
    try {
      /*

        editor/renderer.js#globals
        
        These house all the icons needed for the editor. Many icons are from
        FontAwesome, added to this repository in July 2024 under a paid license
        under the ownership of Ian McKenzie (https://psychosage.io/contact/)

        * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
        Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - 
        https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.
        * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

      */

      if (typeof customAppSageStorage !== 'undefined') {
        // This allows developers to set a custom storage name so that if people
        // are using multiple appSage derived products, the object won't get too
        // bogged down or confused. This was originally made to support dashSage.
        window.appSageStorageString = customAppSageStorage;
        window.appSageSettingsString = `${customAppSageStorage}Settings`;
        window.appSageTitleIdMapString = `${customAppSageStorage}TitleIdMap`;
        window.appSageDatabaseString = `${customAppSageStorage}Database`; // See: `function openDatabase() {...}` in content.js
      } else {
        window.appSageStorageString = 'appSageStorage';
        window.appSageSettingsString = 'appSageSettings';
        window.appSageTitleIdMapString = 'appSageTitleIdMap';
        window.appSageDatabaseString = 'appSageDatabase';
      }

      // Requires paid license
      window.appSagePremium = true;

      window.appSageComponents = combineComponentsLists();

      window.advancedMode = false;
      if (!electronMode && localStorage.getItem(appSageSettingsString)) {
        const settingsForAdvCheck = JSON.parse(localStorage.getItem(appSageSettingsString)).advancedMode;
        if (settingsForAdvCheck) window.advancedMode = settingsForAdvCheck;
      } else if (electronMode) {
        window.api.readStoreData().then((storeData) => {
          if (storeData && storeData.settings && storeData.settings.advancedMode) {
            window.advancedMode = storeData.settings.advancedMode;
          }
        }).catch((error) => {
          console.error('Error fetching settings from Electron store:', error);
        });
      }

      window.currentBreakpoint = 'xs';
      if (!electronMode && localStorage.getItem(appSageSettingsString)) {
        const settingsForBpCheck = JSON.parse(localStorage.getItem(appSageSettingsString)).currentBreakpoint;
        if (settingsForBpCheck) window.currentBreakpoint = settingsForBpCheck;
      } else if (electronMode) {
        window.api.readStoreData().then((storeData) => {
          if (storeData && storeData.settings && storeData.settings.currentBreakpoint) {
            window.currentBreakpoint = storeData.settings.currentBreakpoint;
          }
        }).catch((error) => {
          console.error('Error fetching settings from Electron store:', error);
        });
      }

      updateTailwindConfig();
      window.tailwindColors = mergeTailwindColors(tailwind.config.theme);
      window.colorArray = extractColorNames(tailwindColors);
      colorArray.push('reset'); window.interactivityState = ''; window.interactivityStates = {
        "default": ['', 'Default'],
        "hover": ['hover', 'When the user taps (mobile) or has their cursor on top of the element (desktop)'],
        "focus": ['focus', 'When the user has tapped the element to use it in some way'],
        "active": ['active', 'When the element has been activated by the user from interacting in some way']
      }

      window.plainEnglishBreakpointNames = {
        "xs": 'Extra Small',
        "sm": 'Small-Sized',
        "md": 'Medium-Sized',
        "lg": 'Large',
        "xl": 'Extra Large',
        "2xl": 'Extra, Extra Large'
      }
      window.tooltips = {
        'add-component': "Add a new component (appSage premium only)",
        'copy-html-section': 'Copy this highlighted section of the document onto your clipboard (HTML format)',
        'justify-items-start': "Put columns in columns in the grid to the left-most side of the column's maximum span",
        'justify-items-end': "Put columns in columns in the grid to the right-most side of the column's maximum span",
        'justify-items-center': "Put columns in columns in the grid to the horizontal middle of the column's maximum span",
        'justify-items-stretch': "Stretch the columns across the column's maximum span",
        'justify-items-reset': "Reset justification of items to default",
        'content-start': "Align columns to the top left of the grid. Choosing this option may not be obvious unless you also choose 'Place Items Start'",
        'content-end': "Align columns to the bottom right of the grid. Choosing this option may not be obvious unless you also choose 'Place Items End'",
        'content-center': "Align columns to the center of the grid.",
        'content-stretch': "Stretch columns to fill the height of the grid",
        'content-between': "Align columns evenly from the very top and very bottom of the grid",
        'content-around': "Align columns evenly within the height of the grid",
        'content-evenly': "Align columns evenly between the columns and the space around the columns",
        'content-reset': "Reset column vertical alignment",
        'place-items-start': "Place content within your columns to the columns to the top left of the columns",
        'place-items-end': "Place content within your columns to the columns to the bottom right of the columns",
        'place-items-center': "Place content within your columns to the columns to the center of the columns",
        'place-items-stretch': "Stretch content to the full dimensions of your columns",
        'place-items-reset': "Reset items placement alignment",
        'bg-no-repeat': "Do not repeat the background, this option pairs well with 'contain' or 'cover' background sizing",
        'bg-repeat': "Repeat images to make a background pattern",
        'bg-repeat-x': "Repeat images to make a pattern horizontally",
        'bg-repeat-y': "Repeat images to make a pattern vertically",
        'move-column': "Move this column to the ",
        'remove-column': "Remove this column forever (that\'s a long time!)",
        'add-column': "Add another column to this grid",
        'add-container': "Add another container to this element",
        'add-content': "Add content to this element",
        'remove-content': "Remove this content forever (that\'s a long time!)",
        'move-content-up': "Move this content upward in the column",
        'move-content-down': "Move this content downward in the column",
        'remove-grid': "Remove this grid forever (that\'s a long time!)",
        'remove-container': "Remove this container forever (that\'s a long time!)",
        'move-grid-up': "Move this grid upward in the document",
        'move-grid-down': "Move this grid downward in the document",
        'move-container-up': "Move this container left or upward in the document",
        'move-container-down': "Move this container right or downward in the document",
        'color-vision-impairement': "Please remember to make colors contrast well for people with vision impairments.",
        'text-alignment-justify': "Make text expand across the entire box. If you're not a professional designer, this option is a bad idea",
        'text-alignment-other': "Align text to the ",
        'border-style-none': "Remove border styles from this element",
        'border-style-other': "Change the border style to be a ",
        'background-size-cover': "Make your background image cover the entire box; cropping will occur",
        'background-size-contain': "Make your background image stay contained inside the box, empty space may become seen",
        'background-position': "Align the position of the image to the element's ",
        'swatchboard': "TailwindCSS class name: ",
        'bg-icon': "Position your background image to the ",
        'italicize': "Italicize your text",
        'underline': "Underline your text",
        'padding': "Create space between the edge of the box and content inside of it.",
        'margin': "Create space between the edge of the box and content outside of it.",
        'opacity': "Change how transparent the element is. Careful! This changes the opacity of everything inside the element.",
        'reset': "Reset to default settings.",
        'items-start': "Shrink inside boxes toward the beginning of the box.",
        'items-end': "Shrink inside boxes toward the end of the box.",
        'items-center': "Shrink inside boxes toward the middle of the box.",
        'items-stretch': "Stretch inside boxes along the whole of the box.",
        'items-reset': "Reset items' alignment rules.",
        'self-start': "Shrink this box toward the top of the box containing it.",
        'self-end': "Shrink this box toward the bottom of the box containing it.",
        'self-center': "Shrink this box toward the middle of the box containing it.",
        'self-stretch': "Stretch this box toward along the whole of the box containing it.",
        'self-reset': "Reset self alignment rules.",
        'justify-start': "Move all items toward the beginning of the box.",
        'justify-end': "Move all items toward the end of the box.",
        'justify-center': "Move all items toward the middle of the box.",
        'justify-stretch': "Stretch all items to fill along the whole of the box.",
        'justify-between': "Move all items to be evenly spaced from the beginning to end of the box.",
        'justify-around': "Move all items to have an equal amount of space around them.",
        'justify-evenly': "Move all items to be evenly spaced from the edge of the box and each other.",
        'justify-reset': "Reset justification rules."
      }

      window.appSageEditorIcons = {
        "responsive": {
          "xs": '<svg data-extra-info="For smartwatch screens & larger" fill="currentColor" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 48l256 0c0-26.5-21.5-48-48-48L112 0C85.5 0 64 21.5 64 48zM80 80C35.8 80 0 115.8 0 160L0 352c0 44.2 35.8 80 80 80l224 0c44.2 0 80-35.8 80-80l0-192c0-44.2-35.8-80-80-80L80 80zM192 213.3a42.7 42.7 0 1 1 0 85.3 42.7 42.7 0 1 1 0-85.3zM213.3 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-74.7-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm74.7-160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-74.7-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM64 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm224-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 512l160 0c26.5 0 48-21.5 48-48L64 464c0 26.5 21.5 48 48 48z"/></svg>',
          "sm": '<svg data-extra-info="For mobile phone screens & larger" fill="currentColor" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM144 448c0 8.8 7.2 16 16 16l64 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-64 0c-8.8 0-16 7.2-16 16zM304 64L80 64l0 320 224 0 0-320z"/></svg>',
          "md": '<svg data-extra-info="For tall tablet screens & larger" fill="currentColor" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM160 448c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-96 0c-8.8 0-16 7.2-16 16zM384 64L64 64l0 320 320 0 0-320z"/></svg>',
          "lg": '<svg data-extra-info="For wide tablet screens & larger" fill="currentColor" class="h-full w-full rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM160 448c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-96 0c-8.8 0-16 7.2-16 16zM384 64L64 64l0 320 320 0 0-320z"/></svg>',
          "xl": '<svg data-extra-info="For laptop screens & larger" fill="currentColor" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M128 32C92.7 32 64 60.7 64 96l0 256 64 0 0-256 384 0 0 256 64 0 0-256c0-35.3-28.7-64-64-64L128 32zM19.2 384C8.6 384 0 392.6 0 403.2C0 445.6 34.4 480 76.8 480l486.4 0c42.4 0 76.8-34.4 76.8-76.8c0-10.6-8.6-19.2-19.2-19.2L19.2 384z"/></svg>',
          "2xl": '<svg data-extra-info="For desktop screens & larger" fill="currentColor" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z"/></svg>'
        },
        "html-states": {
          "hover": '<svg data-extra-info="When the mouse is over the element" fill="currentColor" class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M320 112c59.2 0 109.6 37.9 128.3 90.7c5 14.2 7.7 29.4 7.7 45.3c0 0-40 40-136 40s-136-40-136-40c0-15.9 2.7-31.1 7.7-45.3c18.7-52.8 69-90.7 128.3-90.7zm0-48c-90.1 0-165.2 64.8-180.9 150.4C55.1 237.5 0 276.2 0 320c0 70.7 143.3 128 320 128s320-57.3 320-128c0-43.8-55.1-82.5-139.1-105.6C485.2 128.8 410.2 64 320 64zm0 288a24 24 0 1 1 0 48 24 24 0 1 1 0-48zM104 328a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm408-24a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>'
        },
        "heading": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32l48 0 48 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 112 224 0 0-112-16 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l48 0 48 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 144 0 176 16 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-48 0-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-144-224 0 0 144 16 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-48 0-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-176L48 96 32 96C14.3 96 0 81.7 0 64z"/></svg>',
        "media": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M192 64c0-35.3 28.7-64 64-64L576 0c35.3 0 64 28.7 64 64l0 69.6c-12.9-6.1-27.9-7.1-41.7-2.5l-98.9 33-37.8-60.5c-2.9-4.7-8.1-7.5-13.6-7.5s-10.6 2.8-13.6 7.5L388 177.9l-15.3-19.7c-3-3.9-7.7-6.2-12.6-6.2s-9.6 2.3-12.6 6.2l-56 72c-3.8 4.8-4.4 11.4-1.7 16.9s8.3 9 14.4 9l64 0 0 64-112 0c-35.3 0-64-28.7-64-64l0-192zM319.5 404.6c-13.8 10.3-25.2 25.2-29.6 43.4L64 448c-35.3 0-64-28.7-64-64L0 160c0-35.3 28.7-64 64-64l96 0 0 264c0 17.7 14.3 32 32 32l150.2 0c-8.2 3.3-15.8 7.5-22.6 12.6zM320 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM56 168l0 16c0 8.8 7.2 16 16 16l16 0c8.8 0 16-7.2 16-16l0-16c0-8.8-7.2-16-16-16l-16 0c-8.8 0-16 7.2-16 16zm16 80c-8.8 0-16 7.2-16 16l0 16c0 8.8 7.2 16 16 16l16 0c8.8 0 16-7.2 16-16l0-16c0-8.8-7.2-16-16-16l-16 0zM56 360l0 16c0 8.8 7.2 16 16 16l16 0c8.8 0 16-7.2 16-16l0-16c0-8.8-7.2-16-16-16l-16 0c-8.8 0-16 7.2-16 16zM630 164.5c6.3 4.5 10 11.8 10 19.5l0 48 0 160c0 1.2-.1 2.4-.3 3.6c.2 1.5 .3 2.9 .3 4.4c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48c5.5 0 10.9 .5 16 1.5l0-88.2-144 48L448 464c0 26.5-28.7 48-64 48s-64-21.5-64-48s28.7-48 64-48c5.5 0 10.9 .5 16 1.5L400 296l0-48c0-10.3 6.6-19.5 16.4-22.8l192-64c7.3-2.4 15.4-1.2 21.6 3.3z"/></svg>',
        "paragraph": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M192 32l64 0 160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-32 0 0 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-352-32 0 0 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96-32 0c-88.4 0-160-71.6-160-160s71.6-160 160-160z"/></svg>',
        "button": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M448 96c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320zM377 273L265 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L88 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l214.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L377 239c9.4 9.4 9.4 24.6 0 33.9z"/></svg>',
        "form": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M40 48C26.7 48 16 58.7 16 72l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24L40 48zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L192 64zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l288 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-288 0zM16 232l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0c-13.3 0-24 10.7-24 24zM40 368c-13.3 0-24 10.7-24 24l0 48c0 13.3 10.7 24 24 24l48 0c13.3 0 24-10.7 24-24l0-48c0-13.3-10.7-24-24-24l-48 0z"/></svg>',
        "text-center": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M352 64c0-17.7-14.3-32-32-32L128 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32zm96 128c0-17.7-14.3-32-32-32L32 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32zM0 448c0 17.7 14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 416c-17.7 0-32 14.3-32 32zM352 320c0-17.7-14.3-32-32-32l-192 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l192 0c17.7 0 32-14.3 32-32z"/></svg>',
        "text-right": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M448 64c0 17.7-14.3 32-32 32L192 96c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>',
        "text-left": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M288 64c0 17.7-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l224 0c17.7 0 32 14.3 32 32zm0 256c0 17.7-14.3 32-32 32L32 352c-17.7 0-32-14.3-32-32s14.3-32 32-32l224 0c17.7 0 32 14.3 32 32zM0 192c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 224c-17.7 0-32-14.3-32-32zM448 448c0 17.7-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>',
        "text-justify": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M448 64c0-17.7-14.3-32-32-32L32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32zm0 256c0-17.7-14.3-32-32-32L32 288c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32zM0 192c0 17.7 14.3 32 32 32l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L32 160c-17.7 0-32 14.3-32 32zM448 448c0-17.7-14.3-32-32-32L32 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l384 0c17.7 0 32-14.3 32-32z"/></svg>',
        "text-color": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M221.5 51.7C216.6 39.8 204.9 32 192 32s-24.6 7.8-29.5 19.7l-120 288-40 96c-6.8 16.3 .9 35 17.2 41.8s35-.9 41.8-17.2L93.3 384l197.3 0 31.8 76.3c6.8 16.3 25.5 24 41.8 17.2s24-25.5 17.2-41.8l-40-96-120-288zM264 320l-144 0 72-172.8L264 320z"/></svg>',
        "background-color": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6l319.2 0 42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z"/></svg>',
        "bg-contain": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M9.4 9.4C21.9-3.1 42.1-3.1 54.6 9.4L160 114.7 160 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 128c0 17.7-14.3 32-32 32L64 224c-17.7 0-32-14.3-32-32s14.3-32 32-32l50.7 0L9.4 54.6C-3.1 42.1-3.1 21.9 9.4 9.4zm448 0c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L397.3 160l50.7 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-128 0c-17.7 0-32-14.3-32-32l0-128c0-17.7 14.3-32 32-32s32 14.3 32 32l0 50.7L457.4 9.4zM32 320c0-17.7 14.3-32 32-32l128 0c17.7 0 32 14.3 32 32l0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-50.7L54.6 502.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L114.7 352 64 352c-17.7 0-32-14.3-32-32zm256 0c0-17.7 14.3-32 32-32l128 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-50.7 0L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L352 397.3l0 50.7c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128z"/></svg>',
        "bg-cover": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l50.7 0L256 210.7 141.3 96 192 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L64 32C46.3 32 32 46.3 32 64l0 128c0 17.7 14.3 32 32 32s32-14.3 32-32l0-50.7L210.7 256 96 370.7 96 320c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 128c0 17.7 14.3 32 32 32l128 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-50.7 0L256 301.3 370.7 416 320 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32l0-128c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 50.7L301.3 256 416 141.3l0 50.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-128c0-17.7-14.3-32-32-32L320 32z"/></svg>',
        "bg-center": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path fill="currentColor" d="M384,16c26.5,0,48,21.5,48,48v320c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h320ZM64,0C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64H64Z"/><circle fill="currentColor" cx="152" cy="176" r="24"/><path fill="currentColor" d="M317.9,277.2l-66-96c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6s6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4h0Z"/><path fill="currentColor" d="M317.9,277.2l-66-96c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6s6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4h0Z"/><circle fill="currentColor" cx="152" cy="176" r="24"/><path fill="currentColor" d="M251.9,181.2c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6s6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4l-66-96h0Z"/><circle fill="currentColor" cx="152" cy="176" r="24"/><path fill="white" d="M320,128h-192c-13.3,0-24,10.7-24,24v144c0,13.3,10.7,24,24,24h192c13.3,0,24-10.7,24-24v-144c0-13.3-10.7-24-24-24ZM152,152c13.3,0,24,10.7,24,24s-10.7,24-24,24-24-10.7-24-24,10.7-24,24-24ZM318.7,289.6c-2.1,4-6.2,6.4-10.7,6.4h-168c-4.5,0-8.7-2.5-10.7-6.6s-1.6-9,1.1-12.6l21.6-28.8,14.4-19.2c2.2-3,5.8-4.8,9.6-4.8s7.3,1.8,9.6,4.8l7.2,9.6,39.3-57.2c2.2-3.2,5.9-5.2,9.9-5.2s7.7,1.9,9.9,5.2l66,96c2.5,3.7,2.8,8.4.8,12.4Z"/></svg>',
        "bg-top": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path fill="currentColor" d="M384,16c26.5,0,48,21.5,48,48v320c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h320ZM64,0C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64H64Z"/><circle fill="currentColor" cx="137.6" cy="73.6" r="28.8"/><path fill="currentColor" d="M336.7,195l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><path fill="currentColor" d="M336.7,195l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><circle fill="currentColor" cx="137.6" cy="73.6" r="28.8"/><path fill="currentColor" d="M257.5,79.8c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9l-79.2-115.2h0Z"/><circle fill="currentColor" cx="137.6" cy="73.6" r="28.8"/><path fill="white" d="M339.2,16H108.8c-16,0-28.8,12.8-28.8,28.8v172.8c0,16,12.8,28.8,28.8,28.8h230.4c16,0,28.8-12.8,28.8-28.8V44.8c0-16-12.8-28.8-28.8-28.8ZM137.6,44.8c16,0,28.8,12.8,28.8,28.8s-12.8,28.8-28.8,28.8-28.8-12.8-28.8-28.8,12.8-28.8,28.8-28.8ZM337.6,209.9c-2.5,4.8-7.4,7.7-12.8,7.7H123.2c-5.4,0-10.4-3-12.8-7.9s-1.9-10.8,1.3-15.1l25.9-34.6,17.3-23c2.6-3.6,7-5.8,11.5-5.8s8.8,2.2,11.5,5.8l8.6,11.5,47.2-68.6c2.6-3.8,7.1-6.2,11.9-6.2s9.2,2.3,11.9,6.2l79.2,115.2c3,4.4,3.4,10.1,1,14.9Z"/></svg>',
        "bg-right": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path fill="currentColor" d="M384,16c26.5,0,48,21.5,48,48v320c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h320ZM64,0C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64H64Z"/><circle fill="currentColor" cx="201.6" cy="166.4" r="28.8"/><path fill="currentColor" d="M400.7,287.8l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><path fill="currentColor" d="M400.7,287.8l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><circle fill="currentColor" cx="201.6" cy="166.4" r="28.8"/><path fill="currentColor" d="M321.5,172.6c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9l-79.2-115.2h0Z"/><circle fill="currentColor" cx="201.6" cy="166.4" r="28.8"/><path fill="white" d="M403.2,108.8h-230.4c-16,0-28.8,12.8-28.8,28.8v172.8c0,16,12.8,28.8,28.8,28.8h230.4c16,0,28.8-12.8,28.8-28.8v-172.8c0-16-12.8-28.8-28.8-28.8ZM201.6,137.6c16,0,28.8,12.8,28.8,28.8s-12.8,28.8-28.8,28.8-28.8-12.8-28.8-28.8,12.8-28.8,28.8-28.8ZM401.6,302.7c-2.5,4.8-7.4,7.7-12.8,7.7h-201.6c-5.4,0-10.4-3-12.8-7.9s-1.9-10.8,1.3-15.1l25.9-34.6,17.3-23c2.6-3.6,7-5.8,11.5-5.8s8.8,2.2,11.5,5.8l8.6,11.5,47.2-68.6c2.6-3.8,7.1-6.2,11.9-6.2s9.2,2.3,11.9,6.2l79.2,115.2c3,4.4,3.4,10.1,1,14.9h0Z"/></svg>',
        "bg-bottom": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path fill="currentColor" d="M384,16c26.5,0,48,21.5,48,48v320c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h320ZM64,0C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64H64Z"/><circle fill="currentColor" cx="137.6" cy="259.2" r="28.8"/><path fill="currentColor" d="M336.7,380.6l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><path fill="currentColor" d="M336.7,380.6l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><circle fill="currentColor" cx="137.6" cy="259.2" r="28.8"/><path fill="currentColor" d="M257.5,265.4c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9l-79.2-115.2h0Z"/><circle fill="currentColor" cx="137.6" cy="259.2" r="28.8"/><path fill="white" d="M339.2,201.6H108.8c-16,0-28.8,12.8-28.8,28.8v172.8c0,16,12.8,28.8,28.8,28.8h230.4c16,0,28.8-12.8,28.8-28.8v-172.8c0-16-12.8-28.8-28.8-28.8ZM137.6,230.4c16,0,28.8,12.8,28.8,28.8s-12.8,28.8-28.8,28.8-28.8-12.8-28.8-28.8,12.8-28.8,28.8-28.8ZM337.6,395.5c-2.5,4.8-7.4,7.7-12.8,7.7H123.2c-5.4,0-10.4-3-12.8-7.9s-1.9-10.8,1.3-15.1l25.9-34.6,17.3-23c2.6-3.6,7-5.8,11.5-5.8s8.8,2.2,11.5,5.8l8.6,11.5,47.2-68.6c2.6-3.8,7.1-6.2,11.9-6.2s9.2,2.3,11.9,6.2l79.2,115.2c3,4.4,3.4,10.1,1,14.9h0Z"/></svg>',
        "bg-left": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path fill="currentColor" d="M384,16c26.5,0,48,21.5,48,48v320c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h320ZM64,0C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64H64Z"/><circle fill="currentColor" cx="73.6" cy="166.4" r="28.8"/><path fill="currentColor" d="M272.7,287.8l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><path fill="currentColor" d="M272.7,287.8l-79.2-115.2c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9h0Z"/><circle fill="currentColor" cx="73.6" cy="166.4" r="28.8"/><path fill="currentColor" d="M193.5,172.6c-2.6-3.8-7.1-6.2-11.9-6.2s-9.2,2.3-11.9,6.2l-47.2,68.6-8.6-11.5c-2.6-3.6-7-5.8-11.5-5.8s-8.8,2.2-11.5,5.8l-43.2,57.6c-3.2,4.3-3.8,10.2-1.3,15.1s7.4,7.9,12.8,7.9h201.6c5.3,0,10.3-3,12.8-7.7,2.5-4.8,2.2-10.4-1-14.9l-79.2-115.2h0Z"/><circle fill="currentColor" cx="73.6" cy="166.4" r="28.8"/><path fill="white" d="M275.2,108.8H44.8c-16,0-28.8,12.8-28.8,28.8v172.8c0,16,12.8,28.8,28.8,28.8h230.4c16,0,28.8-12.8,28.8-28.8v-172.8c0-16-12.8-28.8-28.8-28.8ZM73.6,137.6c16,0,28.8,12.8,28.8,28.8s-12.8,28.8-28.8,28.8-28.8-12.8-28.8-28.8,12.8-28.8,28.8-28.8ZM273.6,302.7c-2.5,4.8-7.4,7.7-12.8,7.7H59.2c-5.4,0-10.4-3-12.8-7.9s-1.9-10.8,1.3-15.1l25.9-34.6,17.3-23c2.6-3.6,7-5.8,11.5-5.8s8.8,2.2,11.5,5.8l8.6,11.5,47.2-68.6c2.6-3.8,7.1-6.2,11.9-6.2s9.2,2.3,11.9,6.2l79.2,115.2c3,4.4,3.4,10.1,1,14.9h0Z"/></svg>',
        "bg-repeat": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><path fill="white" d="M447.8,128v-64c0-10.6-2.6-20.5-7.1-29.3h.1c-7.4-14.2-20-25.4-35.2-30.9h0c-3.4-1.2-6.8-2.1-10.4-2.8-3.6-.7-7.3-1-11.1-1H64c-13.7,0-26.3,4.3-36.7,11.6C10.8,23.2,0,42.3,0,64v320c0,35.1,28.3,63.6,63.3,64h322.6c8.8-.2,17.2-2.3,24.8-5.8,7.6-3.5,14.4-8.5,20-14.5,10.7-11.4,17.2-26.8,17.2-43.7V128h-.1Z"/><circle fill="black" cx="392" cy="176" r="24"/><circle fill="black" cx="152" cy="176" r="24"/><path fill="black" d="M251.9,181.2c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4l-66-96Z"/><circle fill="black" cx="392" cy="368" r="24"/><circle fill="black" cx="152" cy="368" r="24"/><path fill="black" d="M440.9,34.7c-7.4-14.2-20-25.4-35.2-30.9h0c-3.4-1.2-6.8-2.2-10.4-2.8-.9-.2-1.8-.3-2.7-.5-2.7-.4-5.5-.5-8.4-.5H64c-13.7,0-26.3,4.3-36.7,11.6C10.8,23.2,0,42.3,0,64v320c0,35.1,28.3,63.6,63.3,64h.1c0,.1,0,0,0,0h322.7c8.8-.2,17.2-2.3,24.8-5.8,7.6-3.5,14.3-8.5,20-14.5,10.7-11.4,17.2-26.8,17.2-43.7V64c0-10.6-2.6-20.5-7.1-29.3ZM419.3,416.5s0,0,0,0c0,0,0,0,0,0-1-.3.5-.5-3.3-.5s-7.3,1.8-9.6,4.8l-6.4,8.5-.2.2c-4.9,1.7-10.1,2.7-15.6,2.7h-91.7c0,0-40.5-59-40.5-59-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-8.5,11.3h0c0,0-93.8,0-93.8,0-4.5,0-8.8-.6-12.8-1.8h0l-35.1-51.1v-83.3h51.9c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4l-61.8-89.9v-83.3h51.9c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4L36.3,24.8s0,0,0,0c7.8-5.5,17.4-8.8,27.7-8.8h149.6l-20.9,30.4-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4h0c2.1-4,1.8-8.7-.8-12.4l-47.6-69.2h113.7c14.6,0,27.8,6.6,36.6,16.9,0,0,0,0,0,0,0,0-.1,0-.2,0-1.4-.6-.8-.9-4.6-.9s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h52v133.3l-6.4-8.5c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h52v88c0,12.5-4.8,23.9-12.7,32.5Z"/></svg>',
        "bg-no-repeat": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><rect fill="white" x="104" y="128" width="240" height="192"/><path fill="black" d="M384,0H64C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64ZM432,384c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h320c26.5,0,48,21.5,48,48v320Z"/><circle fill="black" cx="152" cy="176" r="24"/><path fill="black" d="M251.9,181.2c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4l-66-96Z"/></svg>',
        "bg-repeat-x": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><polygon fill="white" points="344 128 104 128 0 128 0 320 104 320 344 320 448 320 448 128 344 128"/><circle fill="black" cx="392" cy="176" r="24"/><path fill="black" d="M384,0H64C28.7,0,0,28.7,0,64v112h0v119.8h0v88.2c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64ZM432,384c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48v-88.1h53.8c3.7-.5,6.9-2.7,8.7-5.9,0,0,0-.1,0-.1.1-.1.1-.2.1-.2v-.2l-.3-.4c.2-.5.5-1,.6-1.5,1.3-3.6.8-7.7-1.5-10.9l-61.6-89.6v-123.1c0-26.5,21.5-48,48-48h320c26.5,0,48,21.5,48,48v173.2l-6.3-8.4c-1.4-2-3.5-3.4-5.8-4.2-.3-.1-.7-.3-1-.3-.9-.2-1.8-.3-2.8-.3s-1.9.1-2.8.3c-.3.1-.7.2-1,.3-2.3.8-4.3,2.2-5.8,4.2l-14.4,19.2-21.6,28.8c-.6.8-1.1,1.6-1.5,2.5-.2.3-.3.7-.4,1.1-.9,2.9-.7,6.2.8,9,1.3,2.6,3.5,4.6,6.1,5.7.1,0,.3.2.5.2,1.2.5,2.6.7,4,.7h52v88Z"/><circle fill="black" cx="152" cy="176" r="24"/><path fill="black" d="M251.9,181.2c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4l-66-96Z"/></svg>',
        "bg-repeat-y": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 448"><polygon fill="white" points="104 0 104 128 104 320 104 448 344 448 344 320 344 128 344 0 104 0"/><circle fill="black" cx="152" cy="368" r="24"/><path fill="black" d="M384,0H64C28.7,0,0,28.7,0,64v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V64c0-35.3-28.7-64-64-64ZM432,384c0,26.5-21.5,48-48,48h-91.7l-40.4-58.8c-.1-.2-.2-.4-.4-.6-.2-.2-.3-.4-.4-.5-1.8-2.1-4.3-3.5-7-4h-4.2c-2.7.5-5.2,1.9-7,4-.2.2-.3.3-.4.5,0,.2-.3.4-.4.6l-39.3,57.2-7.2-9.6c-1.4-2-3.5-3.4-5.8-4.2-.3,0-.7-.3-1-.3-.9-.2-1.8-.3-2.8-.3s-1.9,0-2.8.3c-.3.1-.7.2-1,.3-2.3.8-4.3,2.2-5.8,4.2l-8.4,11.2h-94c-26.5,0-48-21.5-48-48V64c0-26.5,21.5-48,48-48h149.6l-20.8,30.3-7.2-9.6c-1.4-2-3.5-3.4-5.8-4.2-.3,0-.7-.3-1-.3-.9-.3-1.8-.3-2.8-.3s-1.9,0-2.8.3c-.3,0-.7.3-1,.3-2.3.8-4.3,2.2-5.8,4.2l-14.4,19.2-21.6,28.8c-.6.8-1.1,1.6-1.5,2.5-.2.3-.3.7-.4,1.1-.9,2.9-.7,6.2.8,9,1.3,2.6,3.5,4.6,6.1,5.7,0,.2.3.2.5.2,1.2.5,2.6.7,4,.7h169.7c3.6-.6,6.8-2.7,8.7-5.7.2-.2.3-.4.4-.6h0c2.1-4,1.8-8.7-.8-12.4l-47.6-69.2h113.6c26.5,0,48,21.5,48,48v320Z"/><circle fill="black" cx="152" cy="176" r="24"/><path fill="black" d="M251.9,181.2c-2.2-3.2-5.9-5.2-9.9-5.2s-7.7,1.9-9.9,5.2l-39.3,57.2-7.2-9.6c-2.2-3-5.8-4.8-9.6-4.8s-7.3,1.8-9.6,4.8l-36,48c-2.7,3.6-3.2,8.5-1.1,12.6,2.1,4.1,6.2,6.6,10.7,6.6h168c4.4,0,8.6-2.5,10.7-6.4,2.1-4,1.8-8.7-.8-12.4l-66-96Z"/></svg>',
        "font-size": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 128l0-32 96 0 0 320-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l128 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-320 96 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-48c0-26.5-21.5-48-48-48L192 32 48 32C21.5 32 0 53.5 0 80l0 48c0 17.7 14.3 32 32 32s32-14.3 32-32zM384 304l0-16 64 0 0 128-16 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-16 0 0-128 64 0 0 16c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32c0-26.5-21.5-48-48-48l-224 0c-26.5 0-48 21.5-48 48l0 32c0 17.7 14.3 32 32 32s32-14.3 32-32z"/></svg>',
        "font-weight": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 46.3 14.3 32 32 32l48 0 16 0 128 0c70.7 0 128 57.3 128 128c0 31.3-11.3 60.1-30 82.3c37.1 22.4 62 63.1 62 109.7c0 70.7-57.3 128-128 128L96 480l-16 0-48 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l16 0 0-160L48 96 32 96C14.3 96 0 81.7 0 64zM224 224c35.3 0 64-28.7 64-64s-28.7-64-64-64L112 96l0 128 112 0zM112 288l0 128 144 0c35.3 0 64-28.7 64-64s-28.7-64-64-64l-32 0-112 0z"/></svg>',
        "italic": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M128 64c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-58.7 0L160 416l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l58.7 0L224 96l-64 0c-17.7 0-32-14.3-32-32z"/></svg>',
        "underline": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M16 64c0-17.7 14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 128c0 53 43 96 96 96s96-43 96-96l0-128-16 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-16 0 0 128c0 88.4-71.6 160-160 160s-160-71.6-160-160L64 96 48 96C30.3 96 16 81.7 16 64zM0 448c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 480c-17.7 0-32-14.3-32-32z"/></svg>',
        "margin-t": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M32 32a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm96 0a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm64 32a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zM320 32a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm64 32a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zm-9.4 233.4l-128-128c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 269.3l0 66.7 0 112c0 17.7 14.3 32 32 32s32-14.3 32-32l0-112 0-66.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z"/></svg>',
        "margin-r": '<svg class="h-full w-full rotate-90" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M32 32a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm96 0a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm64 32a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zM320 32a32 32 0 1 0 0 64 32 32 0 1 0 0-64zm64 32a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zm-9.4 233.4l-128-128c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 269.3l0 66.7 0 112c0 17.7 14.3 32 32 32s32-14.3 32-32l0-112 0-66.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z"/></svg>',
        "margin-b": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M374.6 214.6l-128 128c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 242.7l0-66.7 0-112c0-17.7 14.3-32 32-32s32 14.3 32 32l0 112 0 66.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3zM32 480a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm96 0a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm96-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm128-32a32 32 0 1 1 -64 0 32 32 0 1 1 64 0z"/></svg>',
        "margin-l": '<svg class="h-full w-full rotate-90" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M374.6 214.6l-128 128c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 242.7l0-66.7 0-112c0-17.7 14.3-32 32-32s32 14.3 32 32l0 112 0 66.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3zM32 480a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm96 0a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm96-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm96 64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm128-32a32 32 0 1 1 -64 0 32 32 0 1 1 64 0z"/></svg>',
        "margin-all": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><circle fill="black" cx="256" cy="488" r="24"/><circle fill="black" cx="140" cy="488" r="24"/><circle fill="black" cx="24" cy="488" r="24"/><circle fill="black" cx="488" cy="488" r="24"/><circle fill="black" cx="372" cy="488" r="24"/><circle fill="black" cx="256" cy="24" r="24"/><circle fill="black" cx="140" cy="24" r="24"/><circle fill="black" cx="24" cy="24" r="24"/><circle fill="black" cx="488" cy="24" r="24"/><circle fill="black" cx="372" cy="24" r="24"/><path fill="black" d="M411.5,245.4l-45-45c-2.9-2.9-6.7-4.3-10.6-4.3s-7.7,1.4-10.6,4.3-4.3,6.7-4.3,10.6,1.4,7.7,4.3,10.6l19.3,19.3h-93.6v-93.8l19.3,19.3c2.9,2.9,6.7,4.3,10.6,4.3s7.7-1.4,10.6-4.3,4.3-6.7,4.3-10.6-1.4-7.7-4.3-10.7h0l-45-44.9c-5.8-5.8-15.3-5.8-21.2,0l-45,45c-2.9,2.9-4.3,6.7-4.3,10.6s1.4,7.7,4.3,10.6,6.7,4.3,10.6,4.3,7.7-1.4,10.6-4.3l19.3-19.3v93.7h-93.8l19.3-19.3c2.9-2.9,4.3-6.7,4.3-10.6s-1.4-7.7-4.3-10.6-6.7-4.3-10.6-4.3-7.7,1.4-10.7,4.3h0l-45,45.1c-5.8,5.8-5.8,15.3,0,21.2l45,45c2.9,2.9,6.7,4.3,10.6,4.3s7.7-1.4,10.6-4.3,4.3-6.7,4.3-10.6-1.4-7.7-4.3-10.6l-19.3-19.3h93.7v40h0v53.7l-19.3-19.3c-2.9-2.9-6.7-4.3-10.6-4.3s-7.7,1.4-10.6,4.3-4.3,6.8-4.3,10.6,1.5,7.7,4.3,10.6l45,45c5.8,5.8,15.3,5.8,21.2,0l45-45c2.9-2.9,4.3-6.7,4.3-10.6s-1.4-7.7-4.3-10.6-6.7-4.3-10.6-4.3-7.7,1.4-10.6,4.3l-19.3,19.3v-37.3h0v-56.2h93.7l-19.3,19.3c-2.9,2.9-4.3,6.7-4.3,10.6s1.4,7.7,4.3,10.6,6.8,4.3,10.6,4.3,7.7-1.5,10.6-4.3l45-45c5.8-5.8,5.8-15.3,0-21.2h0v-.2Z"/><circle fill="black" cx="24" cy="256" r="24"/><circle fill="black" cx="24" cy="140" r="24"/><circle fill="black" cx="24" cy="372" r="24"/><circle fill="black" cx="488" cy="256" r="24"/><circle fill="black" cx="488" cy="140" r="24"/><circle fill="black" cx="488" cy="372" r="24"/></svg>',
        "padding-t": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M374.6 297.4l-128-128c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 269.3 192 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-210.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3zM64 160l0-64c0-17.7 14.3-32 32-32l256 0c17.7 0 32 14.3 32 32l0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64c0-53-43-96-96-96L96 0C43 0 0 43 0 96l0 64c0 17.7 14.3 32 32 32s32-14.3 32-32z"/></svg>',
        "padding-r": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M352 96l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm-9.4 182.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L242.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/></svg>',
        "padding-b": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M374.6 214.6l-128 128c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 242.7 192 32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 210.7 73.4-73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3zM64 352l0 64c0 17.7 14.3 32 32 32l256 0c17.7 0 32-14.3 32-32l0-64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 64c0 53-43 96-96 96L96 512c-53 0-96-43-96-96l0-64c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg>',
        "padding-l": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32zm9.4 182.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L269.3 224 480 224c17.7 0 32 14.3 32 32s-14.3 32-32 32l-210.7 0 73.4 73.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-128-128z"/></svg>',
        "padding-all": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="black" d="M402.3,0H109.7C49.1,0,0,49.1,0,109.7v292.6c0,60.6,49.1,109.7,109.7,109.7h292.6c60.6,0,109.7-49.1,109.7-109.7V109.7c0-60.6-49.1-109.7-109.7-109.7ZM464,422.4c0,23-18.6,41.6-41.6,41.6H89.6c-23,0-41.6-18.6-41.6-41.6V89.6c0-23,18.6-41.6,41.6-41.6h332.8c23,0,41.6,18.6,41.6,41.6v332.8Z"/><path fill="black" d="M411.5,245.4l-45-45c-2.9-2.9-6.7-4.3-10.6-4.3s-7.7,1.4-10.6,4.3-4.3,6.7-4.3,10.6,1.4,7.7,4.3,10.6l19.3,19.3h-93.6v-93.8l19.3,19.3c2.9,2.9,6.7,4.3,10.6,4.3s7.7-1.4,10.6-4.3,4.3-6.7,4.3-10.6-1.4-7.7-4.3-10.7h0l-45-44.9c-5.8-5.8-15.3-5.8-21.2,0l-45,45c-2.9,2.9-4.3,6.7-4.3,10.6s1.4,7.7,4.3,10.6,6.7,4.3,10.6,4.3,7.7-1.4,10.6-4.3l19.3-19.3v93.7h-93.8l19.3-19.3c2.9-2.9,4.3-6.7,4.3-10.6s-1.4-7.7-4.3-10.6-6.7-4.3-10.6-4.3-7.7,1.4-10.7,4.3h0l-45,45.1c-5.8,5.8-5.8,15.3,0,21.2l45,45c2.9,2.9,6.7,4.3,10.6,4.3s7.7-1.4,10.6-4.3,4.3-6.7,4.3-10.6-1.4-7.7-4.3-10.6l-19.3-19.3h93.7v40h0v53.7l-19.3-19.3c-2.9-2.9-6.7-4.3-10.6-4.3s-7.7,1.4-10.6,4.3-4.3,6.8-4.3,10.6,1.5,7.7,4.3,10.6l45,45c5.8,5.8,15.3,5.8,21.2,0l45-45c2.9-2.9,4.3-6.7,4.3-10.6s-1.4-7.7-4.3-10.6-6.7-4.3-10.6-4.3-7.7,1.4-10.6,4.3l-19.3,19.3v-37.3h0v-56.2h93.7l-19.3,19.3c-2.9,2.9-4.3,6.7-4.3,10.6s1.4,7.7,4.3,10.6,6.8,4.3,10.6,4.3,7.7-1.5,10.6-4.3l45-45c5.8-5.8,5.8-15.3,0-21.2h0v-.2Z"/></svg>',
        "border-color": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M41.4 9.4C53.9-3.1 74.1-3.1 86.6 9.4L168 90.7l53.1-53.1c28.1-28.1 73.7-28.1 101.8 0L474.3 189.1c28.1 28.1 28.1 73.7 0 101.8L283.9 481.4c-37.5 37.5-98.3 37.5-135.8 0L30.6 363.9c-37.5-37.5-37.5-98.3 0-135.8L122.7 136 41.4 54.6c-12.5-12.5-12.5-32.8 0-45.3zm176 221.3L168 181.3 75.9 273.4c-4.2 4.2-7 9.3-8.4 14.6l319.2 0 42.3-42.3c3.1-3.1 3.1-8.2 0-11.3L277.7 82.9c-3.1-3.1-8.2-3.1-11.3 0L213.3 136l49.4 49.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0zM512 512c-35.3 0-64-28.7-64-64c0-25.2 32.6-79.6 51.2-108.7c6-9.4 19.5-9.4 25.5 0C543.4 368.4 576 422.8 576 448c0 35.3-28.7 64-64 64z"/></svg>',
        "border-dashed": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M96 32l32 0 0 64L96 96c-17.7 0-32 14.3-32 32l0 32L0 160l0-32C0 75 43 32 96 32zM0 192l64 0 0 128L0 320 0 192zm384 0l64 0 0 128-64 0 0-128zm64-32l-64 0 0-32c0-17.7-14.3-32-32-32l-32 0 0-64 32 0c53 0 96 43 96 96l0 32zm0 192l0 32c0 53-43 96-96 96l-32 0 0-64 32 0c17.7 0 32-14.3 32-32l0-32 64 0zM64 352l0 32c0 17.7 14.3 32 32 32l32 0 0 64-32 0c-53 0-96-43-96-96l0-32 64 0zm96 128l0-64 128 0 0 64-128 0zm0-384l0-64 128 0 0 64L160 96z"/></svg>',
        "border-dotted": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><circle cx="32" cy="448" r="32"/><circle cx="128" cy="448" r="32"/><circle cx="128" cy="64" r="32"/><circle cx="320" cy="448" r="32"/><circle cx="320" cy="64" r="32"/><circle cx="224" cy="448" r="32"/><circle cx="224" cy="64" r="32"/><circle cx="416" cy="448" r="32"/><circle cx="416" cy="64" r="32"/><circle cx="32" cy="64" r="32"/><circle cx="416" cy="256" r="32"/><circle cx="32" cy="256" r="32"/><circle cx="416" cy="352" r="32"/><circle cx="32" cy="352" r="32"/><circle cx="416" cy="160" r="32"/><circle cx="32" cy="160" r="32"/></svg>',
        "border-double": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M384,48c26.5,0,48,21.5,48,48v320c0,26.5-21.5,48-48,48H64c-26.5,0-48-21.5-48-48V96c0-26.5,21.5-48,48-48h320ZM64,32C28.7,32,0,60.7,0,96v320c0,35.3,28.7,64,64,64h320c35.3,0,64-28.7,64-64V96c0-35.3-28.7-64-64-64H64Z"/><path d="M366.9,70.3c23.7,0,42.9,19.2,42.9,42.9v285.7c0,23.7-19.2,42.9-42.9,42.9H81.1c-23.7,0-42.9-19.2-42.9-42.9V113.1c0-23.7,19.2-42.9,42.9-42.9h285.7ZM81.1,56c-31.5,0-57.1,25.6-57.1,57.1v285.7c0,31.5,25.6,57.1,57.1,57.1h285.7c31.5,0,57.1-25.6,57.1-57.1V113.1c0-31.5-25.6-57.1-57.1-57.1H81.1Z"/></svg>',
        "border-solid": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M384 80c8.8 0 16 7.2 16 16l0 320c0 8.8-7.2 16-16 16L64 432c-8.8 0-16-7.2-16-16L48 96c0-8.8 7.2-16 16-16l320 0zM64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32z"/></svg>',
        "border-radius": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M96,32h32v64h-32c-17.7,0-32,14.3-32,32v32H0v-32C0,75,43,32,96,32Z"/><path d="M448,160h-64v-32c0-17.7-14.3-32-32-32h-32V32h32c53,0,96,43,96,96v32Z"/><path d="M448,352v32c0,53-43,96-96,96h-32v-64h32c17.7,0,32-14.3,32-32v-32h64Z"/><path d="M64,352v32c0,17.7,14.3,32,32,32h32v64h-32c-53,0-96-43-96-96v-32h64Z"/></svg>',
        "border-width": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M0,370c0-17.7,14.3-32,32-32h576c17.7,0,32,14.3,32,32s-14.3,32-32,32H32c-17.7,0-32-14.3-32-32Z"/><rect y="110" width="640" height="32" rx="16" ry="16"/><rect y="216" width="640" height="48" rx="24" ry="24"/></svg>',
        "border-none": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M486.8,479.6h0c0,0,0,0,0,0,0,0,0,0-.1,0h0Z"/><path d="M426.4,432H160c-8.8,0-16-7.2-16-16v-206.6l-.6-.5-47.4-37.4v244.4c0,35.3,28.7,64,64,64h320c1.8,0,3.5,0,5.3-.2.5,0,1-.1,1.5-.2l-60.3-47.5h0Z"/><path d="M630.8,469.1l-86.8-68V96c0-35.3-28.7-64-64-64H160c-.8,0-1.6,0-2.4,0-.4,0-.8,0-1.2,0-.4,0-.8,0-1.1,0-.5,0-1,0-1.5.1-.3,0-.6,0-.9.1-.3,0-.7,0-1,.1-.6,0-1.2.1-1.8.2-.6,0-1.2.2-1.8.3,0,0-.2,0-.3,0-.5,0-1,.2-1.5.3-.5,0-.9.2-1.4.3-.4,0-.7.2-1.1.3-.5.1-1,.3-1.5.4-.8.2-1.5.4-2.2.7h0c-.7.2-1.5.5-2.2.8-1.5.5-2.9,1.1-4.3,1.8-.5.2-.9.4-1.4.7-.5.2-.9.5-1.4.7-.5.3-1.1.6-1.6.9-.3.2-.6.3-.9.5-.9.5-1.8,1-2.7,1.6-.3.2-.6.4-.9.6-2.3,1.5-4.4,3.1-6.5,4.9-.4.4-.8.7-1.2,1.1,0,0,0,0-.1,0-.2.2-.4.4-.6.6,0,0-.2.1-.2.2-.3.3-.7.6-1,1-1.6,1.5-3,3.1-4.4,4.8-1,1.3-2.1,2.6-3,3.9L38.8,5.1C28.4-3.1,13.3-1.2,5.1,9.2-3.1,19.6-1.2,34.7,9.2,42.9l86.8,68,47.4,37.1.6.5,2,1.6v.4l349.9,274.2c0-.1,0-.2.1-.3l36.3,28.4,68.9,54c10.4,8.2,25.5,6.3,33.7-4.1,8.2-10.4,6.3-25.5-4.1-33.7ZM160,80h320c8.8,0,16,7.2,16,16v268.4l-.6-.5v-.4L145.5,89.3c2.5-5.5,8.1-9.3,14.5-9.3Z"/></svg>',
        "justify-center": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h0Z"/><rect x="318.5" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="204" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="89.5" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
        "justify-start": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M488.2,130.9H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h464.5c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8h0Z"/><rect y="204" width="104" height="104" rx="20.8" ry="20.8"/><rect x="114.5" y="204" width="104" height="104" rx="20.8" ry="20.8"/><rect x="229" y="204" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
        "justify-end": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><rect x="408" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="293.5" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="179" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
        "justify-stretch": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><rect x="178" y="204" width="156" height="104" rx="20.8" ry="20.8"/><rect y="204" width="156" height="104" rx="20.8" ry="20.8"/><rect x="356" y="204" width="156" height="104" rx="20.8" ry="20.8"/></svg>',
        "justify-around": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><rect x="392" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="204" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="16" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
        "justify-between": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h0Z"/><rect x="408" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="204" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect y="204.1" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
        "justify-evenly": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="opacity-25" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><rect x="358" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="204" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/><rect x="50" y="204.1" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
        "justify-items-center": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect class="opacity-25" x="32.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 741) rotate(180)"/><rect  x="89" y="318.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(282 741) rotate(180)"/><rect class="opacity-25" x="262.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 741) rotate(180)"/><rect  x="319" y="318.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(742 741) rotate(180)"/><rect class="opacity-25" x="262.2" y="203.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 511) rotate(180)"/><rect  x="319" y="203.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(742 511) rotate(180)"/><rect class="opacity-25" x="32.2" y="203.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 511) rotate(180)"/><rect  x="89" y="203.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(282 511) rotate(180)"/><rect class="opacity-25" x="262.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 283) rotate(180)"/><rect  x="319" y="89.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(742 283) rotate(180)"/><rect class="opacity-25" x="32.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 283) rotate(180)"/><rect  x="89" y="89.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(282 283) rotate(180)"/></svg>',
        "justify-items-start": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect class="opacity-25" x="262.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect  x="262.2" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect  x="32.2" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32.2" y="204.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect  x="32.2" y="204.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="opacity-25" x="262.2" y="204.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect  x="262.2" y="204.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect  x="32.2" y="318.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="opacity-25" x="262.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect  x="262.2" y="318.5" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
        "justify-items-end": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect class="opacity-25" x="32.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 741) rotate(180)"/><rect  x="145.8" y="318.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(395.5 741) rotate(180)"/><rect class="opacity-25" x="262.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 741) rotate(180)"/><rect  x="375.8" y="318.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(855.5 741) rotate(180)"/><rect class="opacity-25" x="262.2" y="203.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 511) rotate(180)"/><rect  x="375.8" y="203.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(855.5 511) rotate(180)"/><rect class="opacity-25" x="32.2" y="203.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 511) rotate(180)"/><rect  x="145.8" y="203.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(395.5 511) rotate(180)"/><rect class="opacity-25" x="262.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 283) rotate(180)"/><rect  x="375.8" y="89.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(855.5 283) rotate(180)"/><rect class="opacity-25" x="32.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 283) rotate(180)"/><rect  x="145.8" y="89.5" width="104" height="104" rx="20.8" ry="20.8" transform="translate(395.5 283) rotate(180)"/></svg>',
        "justify-items-stretch": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect  x="32.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 741) rotate(180)"/><rect  x="262.2" y="318.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 741) rotate(180)"/><rect  x="262.2" y="203.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 511) rotate(180)"/><rect  x="32.2" y="203.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 511) rotate(180)"/><rect  x="262.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(742 283) rotate(180)"/><rect  x="32.2" y="89.5" width="217.5" height="104" rx="20.8" ry="20.8" transform="translate(282 283) rotate(180)"/></svg>',
        "content-start": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="262.2" y="32" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="32" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="147" width="217.5" height="104" rx="20.8" ry="20.8"/></svg>',
        "content-end": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32.2" y="376" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="261" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="262.2" y="261" width="217.5" height="104" rx="20.8" ry="20.8"/></svg>',
        "content-center": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32.2" y="261.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="146.5" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="262.2" y="146.5" width="217.5" height="104" rx="20.8" ry="20.8"/></svg>',
        "content-between": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="262.2" y="32" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="32" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="376" width="217.5" height="104" rx="20.8" ry="20.8"/></svg>',
        "content-around": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="262.2" y="89" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="89" width="217.5" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="319" width="217.5" height="104" rx="20.8" ry="20.8"/></svg>',
        "content-stretch": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32.2" y="86.1" width="217.5" height="163.9" rx="20.8" ry="20.8"/><rect x="262.2" y="86.1" width="217.5" height="163.9" rx="20.8" ry="20.8"/><rect x="32.2" y="262" width="217.5" height="164" rx="20.8" ry="20.8"/></svg>',
        "content-evenly": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g>  <rect x="262.2" y="101.6" width="217.5" height="104" rx="20.8" ry="20.8"/>  <rect x="32.2" y="101.6" width="217.5" height="104" rx="20.8" ry="20.8"/></g><rect x="32.2" y="306.4" width="217.5" height="104" rx="20.8" ry="20.8"/></svg>',
        "place-content-start": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32.2" y="32" width="104" height="104" rx="20.8" ry="20.8"/><rect x="146.7" y="147" width="104" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="147" width="104" height="104" rx="20.8" ry="20.8"/><rect x="146.7" y="32" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
        "place-content-end": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="261.2" y="376" width="104" height="104" rx="20.8" ry="20.8"/><rect x="375.7" y="376" width="104" height="104" rx="20.8" ry="20.8"/><rect x="375.7" y="261" width="104" height="104" rx="20.8" ry="20.8"/><rect x="261.2" y="261" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
        "place-content-center": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="261.2" y="261" width="104" height="104" rx="20.8" ry="20.8"/><rect x="146.7" y="261" width="104" height="104" rx="20.8" ry="20.8"/><rect x="261.2" y="147" width="104" height="104" rx="20.8" ry="20.8"/><rect x="146.7" y="147" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
        "place-content-between": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="32.2" y="376" width="104" height="104" rx="20.8" ry="20.8"/><rect x="375.7" y="376" width="104" height="104" rx="20.8" ry="20.8"/><rect x="32.2" y="32" width="104" height="104" rx="20.8" ry="20.8"/><rect x="375.7" y="32" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
        "place-content-around": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="318.5" y="318.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="cls-3" x="89.4" y="318.5" width="104" height="104" rx="20.8" ry="20.8"/><rect x="318.5" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/><rect x="89.4" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
        "place-content-stretch": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="261.2" y="261" width="219" height="219" rx="43.8" ry="43.8"/><rect x="31.7" y="261" width="219" height="219" rx="43.8" ry="43.8"/><rect x="261.2" y="32" width="219" height="219" rx="43.8" ry="43.8"/><rect x="31.7" y="32" width="219" height="219" rx="43.8" ry="43.8"/></svg>',
        "place-content-evenly": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="318.5" y="306.4" width="104" height="104" rx="20.8" ry="20.8"/><rect class="cls-3" x="89.4" y="306.4" width="104" height="104" rx="20.8" ry="20.8"/><rect x="318.5" y="101.6" width="104" height="104" rx="20.8" ry="20.8"/><rect x="89.4" y="101.6" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
        "place-items-start": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect class="opacity-25" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect x="32.2" y="32" width="104" height="104" rx="20.8" ry="20.8"/><rect x="32" y="261" width="104" height="104" rx="20.8" ry="20.8"/><rect x="261" y="261" width="104" height="104" rx="20.8" ry="20.8"/><rect x="261" y="32" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
        "place-items-end": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect class="opacity-25" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect x="146.7" y="376" width="104" height="104" rx="20.8" ry="20.8"/><rect x="375.7" y="376" width="104" height="104" rx="20.8" ry="20.8"/><rect x="146.7" y="147" width="104" height="104" rx="20.8" ry="20.8"/><rect x="375.7" y="147" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
        "place-items-center": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="318.5" y="318.5" width="104" height="104" rx="20.8" ry="20.8"/><rect x="89.5" y="318.5" width="104" height="104" rx="20.8" ry="20.8"/><rect x="318.5" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/><rect x="89.5" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/><rect class="opacity-25" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect class="opacity-25" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/></svg>',
        "place-items-stretch": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/></svg>',
        "place-self-center": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="rgba(0,0,0,0.2)" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="black" x="318.5" y="89.5" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
        "place-self-start": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="rgba(0,0,0,0.2)" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="black" x="261.2" y="32" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
        "place-self-end": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="rgba(0,0,0,0.2)" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="black" x="375.7" y="147" width="104" height="104" rx="20.8" ry="20.8"/></svg>',
        "place-self-stretch": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect fill="black" x="261" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="261" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="32" y="32" width="219" height="219" rx="20.8" ry="20.8"/><rect fill="rgba(0,0,0,0.2)" x="261" y="261" width="219" height="219" rx="20.8" ry="20.8"/></svg>',
        "items-baseline": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(0,0,0,0.25)" d="M23.8,130.9C10.6,130.9,0,141.6,0,154.7v202.7c0,13.2,10.7,23.8,23.8,23.8h464.5c13.2,0,23.8-10.7,23.8-23.8v-202.7c0-13.2-10.7-23.8-23.8-23.8H23.9s-.1,0-.1,0Z"/><path fill="black" d="M178,336.1v-135c0-24.9,9.3-45,20.8-45h114.4c11.5,0,20.8,20.1,20.8,45v135c0,24.9-9.3,45-20.8,45h-114.4c-11.5,0-20.8-20.1-20.8-45Z"/><rect fill="white" x="238" y="244" width="36" height="24" rx="4.8" ry="4.8"/><rect fill="black" x="0" y="224" width="156" height="104" rx="20.8" ry="20.8"/><rect fill="white" x="60" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M356,270.9v-105c0-19.3,9.3-35,20.8-35h114.4c11.5,0,20.8,15.7,20.8,35v105c0,19.3-9.3,35-20.8,35h-114.4c-11.5,0-20.8-15.7-20.8-35Z"/><rect fill="white" x="416" y="244" width="36" height="24" rx="4.8" ry="4.8"/></svg>',
        "items-start": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(0,0,0,0.25)" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><path fill="black" d="M198.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50h0Z"/><rect fill="white" x="238" y="244" width="36" height="24" rx="4.8" ry="4.8"/><rect fill="black" y="130.9" width="156" height="104" rx="20.8" ry="20.8"/><rect fill="white" x="60" y="170.9" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M376.8,130.9h114.4c11.5,0,20.8,15.7,20.8,35v105c0,19.3-9.3,35-20.8,35h-114.4c-11.5,0-20.8-15.7-20.8-35v-105c0-19.3,9.3-35,20.8-35Z"/><rect fill="white" x="416" y="206.4" width="36" height="24" rx="4.8" ry="4.8"/></svg>',
        "items-center": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(0,0,0,0.25)" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><path fill="black" d="M198.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50h0Z"/><rect fill="white" x="238" y="244" width="36" height="24" rx="4.8" ry="4.8"/><rect fill="black" y="204" width="156" height="104" rx="20.8" ry="20.8"/><rect fill="white" x="60" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M376.8,168.5h114.4c11.5,0,20.8,15.7,20.8,35v105c0,19.3-9.3,35-20.8,35h-114.4c-11.5,0-20.8-15.7-20.8-35v-105c0-19.3,9.3-35,20.8-35Z"/><rect fill="white" x="416" y="244" width="36" height="24" rx="4.8" ry="4.8"/></svg>',
        "items-stretch": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(0,0,0,0.25)" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><path fill="black" d="M198.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="238" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M20.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50H20.8c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="60" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M376.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="416" y="244" width="36" height="24" rx="4.8" ry="4.8"/></svg>',
        "items-end": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(0,0,0,0.25)" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><path fill="black" d="M198.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="238" y="244" width="36" height="24" rx="4.8" ry="4.8"/><rect fill="black" y="277.2" width="156" height="104" rx="20.8" ry="20.8"/><rect fill="white" x="60" y="317.2" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M376.8,206.2h114.4c11.5,0,20.8,15.7,20.8,35v105c0,19.3-9.3,35-20.8,35h-114.4c-11.5,0-20.8-15.7-20.8-35v-105c0-19.3,9.3-35,20.8-35Z"/><rect fill="white" x="416" y="281.7" width="36" height="24" rx="4.8" ry="4.8"/></svg>',
        "self-center": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(0,0,0,0.25)" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><rect fill="black" x="178" y="204" width="156" height="104" rx="20.8" ry="20.8"/><rect fill="white" x="238" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M20.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50H20.8c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="60" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M376.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="416" y="244" width="36" height="24" rx="4.8" ry="4.8"/></svg>',
        "self-end": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(0,0,0,0.25)" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><rect fill="black" x="178" y="277.2" width="156" height="104" rx="20.8" ry="20.8"/><rect fill="white" x="238" y="317.2" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M20.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50H20.8c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="60" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M376.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="416" y="244" width="36" height="24" rx="4.8" ry="4.8"/></svg>',
        "self-start": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(0,0,0,0.25)" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><rect fill="black" x="178" y="130.9" width="156" height="104" rx="20.8" ry="20.8"/><rect fill="white" x="238" y="170.9" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M20.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50H20.8c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="60" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M376.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="416" y="244" width="36" height="24" rx="4.8" ry="4.8"/></svg>',
        "self-stretch": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgba(0,0,0,0.25)" d="M23.9,381.2h464.4c13.1,0,23.8-10.6,23.8-23.8v-202.7c0-13.1-10.6-23.8-23.8-23.8H23.8c-13.1,0-23.8,10.6-23.8,23.8v202.7c0,13.1,10.6,23.8,23.8,23.8h.1Z"/><path fill="black" d="M198.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="238" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M20.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50H20.8c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="60" y="244" width="36" height="24" rx="4.8" ry="4.8"/><path fill="black" d="M376.8,131h114.4c11.5,0,20.8,22.4,20.8,50v150c0,27.6-9.3,50-20.8,50h-114.4c-11.5,0-20.8-22.4-20.8-50v-150c0-27.6,9.3-50,20.8-50Z"/><rect fill="white" x="416" y="244" width="36" height="24" rx="4.8" ry="4.8"/></svg>',
        "reset": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M125.7 160l50.3 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L48 224c-17.7 0-32-14.3-32-32L16 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 51.2L97.6 97.6c87.5-87.5 229.3-87.5 316.8 0s87.5 229.3 0 316.8s-229.3 87.5-316.8 0c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0c62.5 62.5 163.8 62.5 226.3 0s62.5-163.8 0-226.3s-163.8-62.5-226.3 0L125.7 160z"/></svg>',
        "minimum-height": '<svg class="h-full w-full rotate-90" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="black" d="M406.6,374.6l96-96c12.5-12.5,12.5-32.8,0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3,0s-12.5,32.8,0,45.3l41.4,41.4H109.2l41.4-41.4c12.5-12.5,12.5-32.8,0-45.3s-32.8-12.5-45.3,0L9.3,233.3c-12.5,12.5-12.5,32.8,0,45.3l96,96c12.5,12.5,32.8,12.5,45.3,0s12.5-32.8,0-45.3l-41.3-41.3h293.5l-41.4,41.4c-12.5,12.5-12.5,32.8,0,45.3s32.8,12.5,45.3,0h0Z"/><path fill="black" d="M288,96v320c0,17.7-14.3,32-32,32s-32-14.3-32-32V96c0-17.7,14.3-32,32-32s32,14.3,32,32Z"/></svg>',
        "height": '<svg class="h-full w-full rotate-90" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>',
        "maximum-height": '<svg class="h-full w-full rotate-90" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M32 64c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 96C0 78.3 14.3 64 32 64zm214.6 73.4c12.5 12.5 12.5 32.8 0 45.3L205.3 224l229.5 0-41.4-41.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3l-96 96c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 288l-229.5 0 41.4 41.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0zM640 96l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-320c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg>',
        "minimum-width": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="black" d="M406.6,374.6l96-96c12.5-12.5,12.5-32.8,0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3,0s-12.5,32.8,0,45.3l41.4,41.4H109.2l41.4-41.4c12.5-12.5,12.5-32.8,0-45.3s-32.8-12.5-45.3,0L9.3,233.3c-12.5,12.5-12.5,32.8,0,45.3l96,96c12.5,12.5,32.8,12.5,45.3,0s12.5-32.8,0-45.3l-41.3-41.3h293.5l-41.4,41.4c-12.5,12.5-12.5,32.8,0,45.3s32.8,12.5,45.3,0h0Z"/><path fill="black" d="M288,96v320c0,17.7-14.3,32-32,32s-32-14.3-32-32V96c0-17.7,14.3-32,32-32s32,14.3,32,32Z"/></svg>',
        "width": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>',
        "maximum-width": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M32 64c17.7 0 32 14.3 32 32l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32L0 96C0 78.3 14.3 64 32 64zm214.6 73.4c12.5 12.5 12.5 32.8 0 45.3L205.3 224l229.5 0-41.4-41.4c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l96 96c12.5 12.5 12.5 32.8 0 45.3l-96 96c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 288l-229.5 0 41.4 41.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0l-96-96c-12.5-12.5-12.5-32.8 0-45.3l96-96c12.5-12.5 32.8-12.5 45.3 0zM640 96l0 320c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-320c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg>',
        "gap-x": '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>',
        "gap-y": '<svg class="h-full w-full rotate-90" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>',
        "gap-all": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path class="cls-1" d="M505,239.1l-72-72c-4.7-4.7-10.8-7-16.9-7-6.2,0-12.3,2.3-17,7s-7,10.8-7,17c0,6.2,2.3,12.3,7,17l31,31h-59.8s-90.1,0-90.1,0V81.9l31,31c4.7,4.7,10.8,7,16.9,7,6.2,0,12.3-2.3,17-7s7-10.8,7-16.9c0-6.2-2.3-12.4-7-17.1h0c0,0-72-71.9-72-71.9-9.4-9.4-24.6-9.4-34,0l-72,72c-4.7,4.7-7,10.8-7,16.9,0,6.2,2.3,12.3,7,17,4.7,4.7,10.8,7,17,7,6.2,0,12.3-2.3,17-7l31-31v150H81.9l31-31c4.7-4.7,7-10.8,7-16.9,0-6.2-2.3-12.3-7-17s-10.8-7-16.9-7c-6.2,0-12.4,2.3-17.1,7h0c0,0-72,72.1-72,72.1-9.4,9.4-9.4,24.6,0,34l72,72c4.7,4.7,10.8,7,16.9,7,6.2,0,12.3-2.3,17-7,4.7-4.7,7-10.8,7-17,0-6.2-2.3-12.3-7-17l-31-31h150.1v64h0v86.1l-31-31c-4.7-4.7-10.8-7-16.9-7-6.2,0-12.3,2.3-17,7-4.7,4.7-7,10.9-7,17,0,6.1,2.4,12.3,7,16.9l72,72c9.4,9.4,24.6,9.4,34,0l72-72c4.7-4.7,7-10.8,7-16.9,0-6.2-2.3-12.3-7-17s-10.8-7-17-7c-6.2,0-12.3,2.3-17,7l-31,31v-59.8h0v-90.1h64s86.1,0,86.1,0l-31,31c-4.7,4.7-7,10.8-7,16.9,0,6.2,2.3,12.3,7,17,4.7,4.7,10.9,7,17,7,6.1,0,12.3-2.4,16.9-7l72-72c9.4-9.4,9.4-24.6,0-34Z"/></svg>',
        "opacity": '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M448 256c0-106-86-192-192-192l0 384c106 0 192-86 192-192zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>'
      }

      // Call restoreSettings when the page loads
      window.addEventListener('load', restoreSettings);
      window.addEventListener('load', mergeFontsIntoTailwindConfig);

      window.globalsLoaded = true;
      resolve();
    } catch (error) {
      reject(error); // Reject the promise if there's an error
    }
  });
}

function combineComponentsLists() {
  // Templates are loaded in the JS file dedicated to the component.
  const appSagePremiumComponents = {
    "internationalClocks": { name: 'International Clocks', license: 'premium', file: 'international_clocks.js', description: 'Display a clock on your page in any timezone you like.', html_template: '', form_template: '', icon: '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path class="fa-secondary" opacity=".4" d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120c.1-13.4 10.8-24 24-24c6.6 0 12.6 2.7 17 7c2.2 2.2 3.9 4.8 5.1 7.6c.6 1.4 1.1 2.9 1.4 4.5c.2 .8 .3 1.6 .4 2.4s.1 1.6 .1 2.5c0 41 0 82.1 0 123.2L365.3 300c6.9 4.6 10.7 12.2 10.7 20c0 4.6-1.3 9.2-4 13.3c-4.6 6.9-12.2 10.7-20 10.7c-4.6 0-9.2-1.3-13.3-4c-32-21.3-64-42.7-96-64C236 271.5 232 264 232 256c0-45.3 0-90.7 0-136z"/><path class="fa-primary" d="M256 96c-13.3 0-24 10.7-24 24l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24z"/></svg>' }
  }

  const appSageFreeComponents = {
    "rotatingQuotes": { name: 'Rotating Quotes', license: 'free', file: 'rotating_quotes.js', description: 'A box with a quote that displays a new quote on each page load!', html_template: '', form_template: '', icon: '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 28.7 28.7 0 64 0L448 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-138.7 0L185.6 508.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3l0-80-96 0c-35.3 0-64-28.7-64-64L0 64zm160 48c-17.7 0-32 14.3-32 32l0 48c0 17.7 14.3 32 32 32l32 0 0 7.3c0 11.7-8.5 21.7-20.1 23.7l-7.9 1.3c-13.1 2.2-21.9 14.5-19.7 27.6s14.5 21.9 27.6 19.7l7.9-1.3c34.7-5.8 60.2-35.8 60.2-71l0-39.3 0-24 0-24c0-17.7-14.3-32-32-32l-48 0zm224 80l0-24 0-24c0-17.7-14.3-32-32-32l-48 0c-17.7 0-32 14.3-32 32l0 48c0 17.7 14.3 32 32 32l32 0 0 7.3c0 11.7-8.5 21.7-20.1 23.7l-7.9 1.3c-13.1 2.2-21.9 14.5-19.7 27.6s14.5 21.9 27.6 19.7l7.9-1.3c34.7-5.8 60.2-35.8 60.2-71l0-39.3z"/></svg>' },
    "calculator": { name: 'Simple Calculator', license: 'free', file: 'calculator.js', description: 'A basic calculator with simple arithmetic functionality', icon: '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-384c0-35.3-28.7-64-64-64L64 0zM96 64l192 0c17.7 0 32 14.3 32 32l0 32c0 17.7-14.3 32-32 32L96 160c-17.7 0-32-14.3-32-32l0-32c0-17.7 14.3-32 32-32zm32 160a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM96 352a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM64 416c0-17.7 14.3-32 32-32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32zM192 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zm64-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm32 64a32 32 0 1 1 -64 0 32 32 0 1 1 64 0zM288 448a32 32 0 1 1 0-64 32 32 0 1 1 0 64z"/></svg>', html_template: '', form_template: '' },
    "dialogToast": { name: 'Dialog/Toast Notification', license: 'free', file: 'dialog_toast.js', description: 'A sliding dialog/toast notification with optional auto-dismiss and manual close options.', icon: '<svg class="h-full w-full" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 64C0 28.7 28.7 0 64 0L448 0c35.3 0 64 28.7 64 64l0 288c0 35.3-28.7 64-64 64l-138.7 0L185.6 508.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3l0-80-96 0c-35.3 0-64-28.7-64-64L0 64zm175 63c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>', html_template: '', form_template: '' },
    "animatedBackground": { name: 'Animated Background', license: 'free', file: 'animated_background.js', description: 'A customizable animated background using particles.js with options for fixed fullscreen or custom placement.', icon: '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.043 8 8 119.043 8 256s111.043 248 248 248 248-111.043 248-248S392.957 8 256 8zM132 372c-13.255 0-24-10.745-24-24 0-13.255 10.745-24 24-24 13.255 0 24 10.745 24 24 0 13.255-10.745 24-24 24zm0-128c-13.255 0-24-10.745-24-24 0-13.255 10.745-24 24-24 13.255 0 24 10.745 24 24 0 13.255-10.745 24-24 24zm124 128c-13.255 0-24-10.745-24-24 0-13.255 10.745-24 24-24 13.255 0 24 10.745 24 24 0 13.255-10.745 24-24 24zm124-128c-13.255 0-24-10.745-24-24 0-13.255 10.745-24 24-24 13.255 0 24 10.745 24 24 0 13.255-10.745 24-24 24zm0 128c-13.255 0-24-10.745-24-24 0-13.255 10.745-24 24-24 13.255 0 24 10.745 24 24 0 13.255-10.745 24-24 24z"/></svg>', html_template: '', form_template: '' }    
  }

  const combinedComponents = { ...appSagePremiumComponents, ...appSageFreeComponents };
  return combinedComponents;
}
window.combineComponentsLists = combineComponentsLists;

// This function is for supporting any editor capabilities that involve color.
// It gives the designer access to the color palette they labored over and
// keeps them focused on only those colors.
// DATA IN: JSON Object
function extractColorNames(colorObject) {
  let colorArray = [];
  for (const colorFamily in colorObject) {
    if (typeof colorObject[colorFamily] == 'string') {
      colorArray.push(colorFamily);
    } else {
      for (const shade in colorObject[colorFamily]) {
        colorArray.push(`${colorFamily}-${shade}`);
      }
    }
  }
  return colorArray;
} // DATA OUT: Array
window.extractColorNames = extractColorNames;

function mergeFontsIntoTailwindConfig() {
  // Retrieve the fonts from localStorage
  let appSageSettings = JSON.parse(localStorage.getItem('appSageSettings'));
  let storedFonts = appSageSettings?.fonts || {}; // Fallback to an empty object if fonts do not exist

  // Ensure tailwind.config exists and has the theme and fontFamily objects
  if (!tailwind.config) {
    tailwind.config = {};
  }

  if (!tailwind.config.theme) {
    tailwind.config.theme = {};
  }

  if (!tailwind.config.theme.fontFamily) {
    tailwind.config.theme.fontFamily = {};
  }

  // Merge each stored font into tailwind.config.theme.fontFamily
  Object.keys(storedFonts).forEach(fontKey => {
    tailwind.config.theme.fontFamily[fontKey] = [storedFonts[fontKey].replace(/\+/g, ' ')];
  });

  // The tailwind.config.theme.fontFamily now contains the merged fonts
}
window.mergeFontsIntoTailwindConfig = mergeFontsIntoTailwindConfig;

function mergeTailwindColors(theme) {
  if (theme) {
    // Check if `theme.extend.colors` exists
    if (theme.extend && theme.extend.colors) {
      // Merge `theme.colors` and `theme.extend.colors`, maintaining structure
      return {
        ...theme.extend.colors,
        ...theme.colors
      };
    }

    // Return `theme.colors` if no `theme.extend.colors` exists
    return theme.colors;
  }
}
window.mergeTailwindColors = mergeTailwindColors;

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

      Object.keys(settings.colors).forEach(function (customColor) {
        tailwind.config.theme.extend.colors[customColor] = settings.colors[customColor];
      });
    }
  }
}
window.updateTailwindConfig = updateTailwindConfig;

// Restore settings from localStorage
function restoreSettings() {
  let storedData = localStorage.getItem(appSageSettingsString);
  if (storedData) {
    let settings = JSON.parse(storedData);

    // Restore fonts: dynamically add any manually entered fonts to the <select> options
    let fonts = document.getElementById('fonts');
    if (fonts && settings.fonts) {
      // Loop through the keys of the fonts object
      Object.keys(settings.fonts).forEach(fontKey => {
        let font = settings.fonts[fontKey]; // Get the font value from the object

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
    }

    // Restore colors
    let colorsContainer = document.getElementById('colorsContainer');
    if (colorsContainer && settings.colors) {
      colorsContainer.innerHTML = ''; // Clear existing entries

      Object.keys(settings.colors).forEach(colorName => {
        let shades = settings.colors[colorName];

        // Create color group container
        let colorGroup = document.createElement('div');
        colorGroup.classList.add('color-group', 'space-y-4');

        // Color name input
        colorGroup.innerHTML = `
            <div class="color-name-section">
              <label for="customColorName" class="block text-slate-600 font-medium">Color Name:</label>
              <input type="text" class="customColorName shadow border rounded py-2 px-3 text-slate-700 leading-tight w-full focus:outline-none focus:shadow-outline" name="customColorName[]" value="${colorName}" placeholder="Enter color name (e.g., 'primary')">
            </div>
            <div class="shades-container space-y-2"></div>
            <button type="button" class="addShade mt-2 py-2 px-4 border border-sky-500 font-semibold text-sky-600 rounded shadow">Add Shade</button>
            <button type="button" class="deleteColor mt-2 text-rose-600 underline-offset-4 hover:underline ml-2">Delete Shade</button>
          `;

        let shadesContainer = colorGroup.querySelector('.shades-container');

        // Add each shade to the color group
        Object.keys(shades).forEach(shade => {
          let shadeEntry = document.createElement('div');
          shadeEntry.classList.add('shade-entry', 'flex', 'space-x-4');

          shadeEntry.innerHTML = `
              <div>
                <label for="colorShade" class="block text-slate-600 font-medium">Shade:</label>
                <select name="colorShade[]" class="colorShade shadow border rounded py-2 px-3 text-slate-700 w-full">
                  <option value="50" ${shade === '50' ? 'selected' : ''}>50</option>
                  <option value="100" ${shade === '100' ? 'selected' : ''}>100</option>
                  <option value="200" ${shade === '200' ? 'selected' : ''}>200</option>
                  <option value="300" ${shade === '300' ? 'selected' : ''}>300</option>
                  <option value="400" ${shade === '400' ? 'selected' : ''}>400</option>
                  <option value="500" ${shade === '500' ? 'selected' : ''}>500</option>
                  <option value="600" ${shade === '600' ? 'selected' : ''}>600</option>
                  <option value="700" ${shade === '700' ? 'selected' : ''}>700</option>
                  <option value="800" ${shade === '800' ? 'selected' : ''}>800</option>
                  <option value="900" ${shade === '900' ? 'selected' : ''}>900</option>
                  <option value="950" ${shade === '950' ? 'selected' : ''}>950</option>
                </select>
              </div>
              <div>
                <label for="customColorValue" class="block text-slate-600 font-medium">Color Value:</label>
                <input type="color" class="customColorValue shadow border rounded w-full h-10 focus:outline-none focus:shadow-outline" name="customColorValue[]" value="${shades[shade]}">
              </div>
            `;

          shadesContainer.appendChild(shadeEntry);
        });

        // Append the color group to the container
        colorsContainer.appendChild(colorGroup);

        // Add event listener to add shades dynamically to each color group
        colorGroup.querySelector('.addShade').addEventListener('click', function () {
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

          shadesContainer.appendChild(newShadeEntry);
        });
      });
    }

    // Restore advanced mode
    if (fonts && colorsContainer) {
      document.getElementById('advancedMode').checked = settings.advancedMode || false;
    }
  }
}
window.restoreSettings = restoreSettings;

function appSageLocalNuke() {
  localStorage.removeItem(appSageStorageString);
  localStorage.removeItem(appSageSettingsString);
  localStorage.removeItem(appSageTitleIdMapString);
}
window.appSageLocalNuke = appSageLocalNuke;

function waitForGlobalsLoaded() {
  return new Promise((resolve) => {
    const checkInterval = setInterval(() => {
      if (window.globalsLoaded === true) {
        clearInterval(checkInterval);
        resolve(); // Resolve the promise once globals are loaded
      }
    }, 100);
  });
}
window.waitForGlobalsLoaded = waitForGlobalsLoaded;

// This function is for confirmation of deleting pages and elements.
// DATA IN: ['String', 'function()']
function showConfirmationModal(message, onConfirm) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 z-[60] bg-slate-800 bg-opacity-50 flex justify-center items-center';
  modal.innerHTML = `
      <div class="bg-slate-100 p-4 rounded-lg max-w-sm mx-auto">
          <p class="text-slate-900">${message}</p>
          <div class="flex justify-between mt-4">
              <button id="confirmDelete" class="bg-rose-500 hover:bg-rose-700 text-slate-50 font-bold p-2 rounded">Delete</button>
              <button id="cancelDelete" class="bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded">Cancel</button>
          </div>
      </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('confirmDelete').addEventListener('click', function () {
    onConfirm();
    document.body.removeChild(modal);
  });

  document.getElementById('cancelDelete').addEventListener('click', function () {
    document.body.removeChild(modal);
  });
} // DATA OUT: null
window.showConfirmationModal = showConfirmationModal;

// This function is for permanently deleting a page from localStorage.
// DATA IN: ['String', 'HTML Element, <div>']
function deletePage(page_id, element) {
  const message = "Are you sure you want to delete this page? This action cannot be undone.";

  showConfirmationModal(message, function () {
    if (!electronMode) {
      const appSageStorage = JSON.parse(localStorage.getItem(appSageStorageString) || '{}');
      const titleIdMap = JSON.parse(localStorage.getItem(appSageTitleIdMapString) || '{}');

      if (appSageStorage.pages && appSageStorage.pages[page_id]) {
        delete appSageStorage.pages[page_id];
      }

      for (let title in titleIdMap) {
        if (titleIdMap[title] === page_id) {
          delete titleIdMap[title];
          break;
        }
      }

      localStorage.setItem(appSageStorageString, JSON.stringify(appSageStorage));
      localStorage.setItem(appSageTitleIdMapString, JSON.stringify(titleIdMap));
    } else if (electronMode) {
      window.api.readStoreData().then(storeData => {

        // Delete the page from the pages object
        delete storeData.pages[page_id];

        // Remove the page title reference if it exists in the titles object
        for (const title in storeData.titles) {
          if (storeData.titles[title] === page_id) {
            delete storeData.titles[title];
            break;
          }
        }

        // Update the store with the modified data
        window.api.updateStoreData(storeData).then(updatedStore => {
          appSageStore = updatedStore;
        })
      })
    }
    element.remove();

    console.log(`Page with ID ${page_id} has been deleted successfully.`);
  });
} // DATA OUT: null
window.deletePage = deletePage;
