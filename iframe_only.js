// Inside the iframe
document.addEventListener('click', function(event) {
  // Get the clicked element
  let element = event.target;
  console.log('framonly');

  // Send a message to the parent document
  window.parent.postMessage({
    type: 'elementClicked',
    id: element.id,
    // Replace once done with development
  }, '*'); //http://localhost:8080
});
