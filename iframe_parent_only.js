// In the parent document
window.addEventListener('message', function(event) {
  console.log('yes1');
  // Check the origin of the message
  if (event.origin !== '*') { // Replace with the actual origin of the iframe // http://localhost:8080
    // Ignore messages from unknown sources
    return;
  }
  console.log('yes2');
  // Check if this is an 'elementClicked' message
  if (event.data.type === 'elementClicked') {
    // Get the id of the clicked element
    let id = event.data.id;

    // Find the corresponding element in the main document
    let element = document.getElementById(id);
    console.log(id)
    addClickHandler(element);

    // Update the #sidebar
    // let sidebar = document.querySelector('#sidebar');
    // ... update the sidebar based on the clicked element ...
  }
});
