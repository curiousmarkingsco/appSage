/*

  editor/components/main.js

*/

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
