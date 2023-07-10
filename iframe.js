// Get a reference to the iframe and the #page element
let iframe = document.querySelector('#previewFrame');
let page = document.querySelector('#page');

// Function to update the iframe
function updateIframe() {
  let prependHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="./main.css">
      </head>
      <body class="flex">
        <div id="page" class="min-h-screen w-full" ondragover="event.preventDefault()" ondrop="drop(event)">
  `;

  let appendHTML = `
        </div>
        <script src="./main.js"></script>
        <script src="./drop.js"></script>
        <script src="./iframe_only.js"></script>
      </body>
    </html>
  `;

  // Update the iframe's srcdoc attribute
  iframe.srcdoc = prependHTML + page.innerHTML + appendHTML;
}

// Listen for changes to the #page element
let observer = new MutationObserver(updateIframe);
observer.observe(page, { childList: true, subtree: true });
