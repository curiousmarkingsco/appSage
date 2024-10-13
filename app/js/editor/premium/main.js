/*

  editor/premium/main.js

*/

function loadScript(url) {
  let script = document.createElement('script');
  script.src = url;
  script.async = true; // Optional: Makes the script load asynchronously
  document.head.appendChild(script); // Append the script to the document
}

if (appSagePremium === true) {
  loadScript('./js/editor/premium/components/international_clocks.js');
  console.log('international_clocks loaded.');
}
