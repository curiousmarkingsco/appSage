/*

  editor/components/main.js

*/

function initializeComponentForm(component, componentName, form) {

  if (componentName === 'internationalClocks') {
    initializeClockDataFromForm(component);
    form.setAttribute('data-initialized', true);
  }
  if (componentName === 'quickNotes') {
    initializeNoteDataFromForm(component);
    form.setAttribute('data-initialized', true);
  }
  if (componentName === 'rotatingQuotes') {
    initializeQuoteDataFromForm(component);
    form.setAttribute('data-initialized', true);
  }
}
window.initializeComponentForm = initializeComponentForm;

function initializeExistingComponents(component, componentName) {
  if (componentName === 'internationalClocks') {
    initializeInternationalClocks(component);
  }
  if (componentName === 'quickNotes') {
    initializeQuickNotes(component);
  }
  if (componentName === 'rotatingQuotes') {
    initializeRotatingQuotes(component);
  }
}
window.initializeExistingComponents = initializeExistingComponents;
