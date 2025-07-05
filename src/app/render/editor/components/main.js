/*

  editor/components/main.js

*/

function initializeComponentForm(container, componentName, form) {
  if (componentName === 'internationalClocks') {
    initializeClockDataFromForm(container);
    form.setAttribute('data-initialized', true);
  }
  if (componentName === 'quickNotes') {
    initializeNoteDataFromForm(container);
    form.setAttribute('data-initialized', true);
  }
  if (componentName === 'rotatingQuotes') {
    initializeQuoteDataFromForm(container);
    form.setAttribute('data-initialized', true);
  }
}
window.initializeComponentForm = initializeComponentForm;

function initializeExistingComponents(container, componentName) {
  if (componentName === 'internationalClocks') {
    initializeInternationalClocks(container.querySelector('.internationalClocks-container'));
  }
  if (componentName === 'quickNotes') {
    initializeQuickNotes(container.querySelector('.quickNotes-container'));
  }
  if (componentName === 'rotatingQuotes') {
    initializeRotatingQuotes(container.querySelector('.rotatingQuotes-container'));
  }
}
window.initializeExistingComponents = initializeExistingComponents;
