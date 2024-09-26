/*

  remote_save.js

  This file is not currently being used. It is an aspirational boilerplate for
  sending payloads to remote servers that will receive them and decide how they
  want to process the JSON object they receive.

  TODO: Add field on settings page for remote storage URL
  TODO: Add a button somewhere for these functions to actually be accessible

*/

// This function is the meat and bones of the fetch request to POST the data
// to the user's selected remote server. It may or may not be operational.
// DATA IN: ['String', 'String', 'String:Optional']
function saveDataToServer(url, page_id, css_content = null) {
  const html_content = JSON.parse(localStorage.getItem(appSageStorageString)).pages[page_id];
  const fullPath = url + (page_id ? ('/' + page_id) : '');
  fetch(fullPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ page_id: page_id, css: css_content, html_content: html_content })
  })
    .then(response => response.json())
    // TODO: Have these messages show up in a modal or something
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
} // DATA OUT: null

// This function is to support the copyPageHTML function.
// DATA IN: ['String', 'HTML Element, <div>']
function flattenJSONToHTML(jsonString, parentInfo) {
  try {
    const jsonArray = JSON.parse(jsonString);
    let parentClassName = JSON.parse(parentInfo).className || '';
    parentClassName = parentClassName.replace('w-[calc(100%-18rem)]', 'w-full');
    parentClassName = parentClassName.replace('ml-72', 'min-h-screen');
    parentClassName = parentClassName.replace('mb-24', '');

    const content = jsonArray.map(obj => {
      if (obj.tagName === "DIV" && obj.className && obj.content) {
        return `<div class="${obj.className}">${obj.content}</div>`;
      }
      return '';
    }).join('');

    return `<div class="${parentClassName}">${content}</div>`;
  } catch (error) {
    console.error("Invalid JSON string provided:", error);
    return '';
  }
} // DATA OUT: String (of an HTML element)

// Since the original developer doesn't yet want to load this repo up with NPM
// packages, we forgo something like PostCSS and just grab the compiled CSS
// generated by the Tailwind Play CDN (or its local cached equivalent). This
// may need to be fixed later. Dunno!
// DATA IN: null
function getCompiledCSS() {
  const styles = document.querySelectorAll('style');
    let tailwindStyles = '';

    for (let style of styles) {
      if (style.innerHTML.includes("/* ! tailwindcss v")) {
        tailwindStyles = style.innerHTML;
        break;
      }
    }

    if (tailwindStyles) {
      return tailwindStyles;
    } else {
      console.log('No TailwindCSS styles found.');
    }
} // DATA IN: String
