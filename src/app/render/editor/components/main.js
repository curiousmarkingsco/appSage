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
    initializeInternationalClocks(container.querySelector('.internationalClocks-container'));
  }
  if (componentName === 'rotatingQuotes') {
    initializeRotatingQuotes(container.querySelector('.rotatingQuotes-container'));
  }
  if (componentName === 'calculator') {
    initializeCalculator(container.querySelector('.calculator-container'));
  }
  if (componentName === 'dialogToast') {
    initializeDialogToast(container.querySelector('.dialogToast-container'));
  }
}
window.initializeExistingComponents = initializeExistingComponents;
