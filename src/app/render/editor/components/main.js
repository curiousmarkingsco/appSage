/*

  editor/components/main.js

*/

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
window.loadScript = loadScript;

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
  if (componentName === 'dialogToast') {
    initializeDialogToastForm(container);
    form.setAttribute('data-initialized', true);
  }
}
window.initializeComponentForm = initializeComponentForm;

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
  if (componentName === 'dialogToast') {
    initializeDialogToast(container);
  }
}
window.initializeExistingComponents = initializeExistingComponents;
