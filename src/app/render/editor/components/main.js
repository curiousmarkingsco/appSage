/*

  editor/components/main.js

*/

function initializeComponentForm(container, componentName, form) {
  // Dynamically construct the function name
  const functionName = `initialize${componentName.charAt(0).toUpperCase()}${componentName.slice(1)}Form`;
  // Check if the function exists and is callable
  if (typeof window[functionName] === 'function') {
    // Call the function, passing the correct container element
    window[functionName](container);
  } else {
    console.error(`Function ${functionName} does not exist.`);
  }
  form.setAttribute('data-initialized', true);
}
window.initializeComponentForm = initializeComponentForm;

function initializeExistingComponents(container, componentName) {
  // Dynamically construct the function name
  const functionName = `initialize${componentName.charAt(0).toUpperCase()}${componentName.slice(1)}`;
  
  // Check if the function exists and is callable
  if (typeof window[functionName] === 'function') {
    // Call the function, passing the correct container element
    window[functionName](container);
  } else {
    console.error(`Function ${functionName} does not exist.`);
  }
}
window.initializeExistingComponents = initializeExistingComponents;
