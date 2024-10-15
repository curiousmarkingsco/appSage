/*

  editor/components/main.js

*/

/* Begin component loading */
async function loadComponentFiles() {
  return new Promise((resolve, reject) => {
    const components = Object.keys(appSageComponents).map(key => appSageComponents[key]);

    const loadPromises = components.map(component => {
      if (component.license === 'premium' && appSagePremium === false) {
        return Promise.resolve(); // Skip loading for non-premium users
      }

      const path = component.license === 'premium'
        ? `./js/editor/components/premium/${component.file}`
        : `./js/editor/components/free/${component.file}`;

      return loadScript(path);
    });

    // Wait for all scripts to load before resolving
    Promise.all(loadPromises)
      .then(() => resolve())
      .catch(err => reject(err));
  });
} /* End component loading */

async function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    // Resolve when the script loads, reject if there is an error
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));

    document.head.appendChild(script);
  });
}

function initializeComponentForm(container, componentName, form) {
  if (componentName === 'internationalClocks') {
    initializeClockDataFromForm(container);
    form.setAttribute('data-initialized', true);
  }
  if (componentName === 'rotatingQuotes') {
    initializeQuoteDataFromForm(container);
    form.setAttribute('data-initialized', true);
  }
  if (componentName === 'calculator') {
    initializeCalculatorForm(container);
    form.setAttribute('data-initialized', true);
  }
}

function initializeExistingComponents(container, componentName) {
  if (componentName === 'internationalClocks') {
    initializeInternationalClocks(container);
  }
  if (componentName === 'rotatingQuotes') {
    initializeRotatingQuotes(container);
  }
  if (componentName === 'calculator') {
    initializeCalculator(container);
  }
}
