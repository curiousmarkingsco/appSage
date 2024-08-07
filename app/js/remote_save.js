/*

  remote_save.js

*/


// TODO: Add field on settings page for remote storage URL
function saveDataToServer(url, page_id, css_content = null) {
  const html_content = JSON.parse(localStorage.getItem('pageSageStorage')).pages[page_id];
  const fullPath = url + (page_id ? ('/' + page_id) : '');
  fetch(fullPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ page_id: page_id, css: css_content, html_content: html_content })
  })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}

function copyPageHTML(element) {
  const params = new URLSearchParams(window.location.search);
  const page_id = params.get('config');
  const html_content = JSON.parse(localStorage.getItem('pageSageStorage')).pages[page_id].page_data;
  const container_settings = JSON.parse(localStorage.getItem('pageSageStorage')).pages[page_id].settings;
  const textToCopy = `<style>${getCompiledCSS()}</style>
                      ${flattenJSONToHTML(html_content, container_settings)}`;
  copyText(textToCopy, element);
}

function copyMetadata(element) {
  const params = new URLSearchParams(window.location.search);
  const config = params.get('config');
  const storedData = JSON.parse(localStorage.getItem('pageSageStorage'));
  const settings = JSON.parse(storedData.pages[config].settings);
  const metaTags = settings.metaTags;
  let metaTagsString = '';

  metaTags.forEach(tag => {
    metaTagsString += `<meta ${tag.type}="${tag.name}" content="${tag.content}">`;
  });

  copyText(metaTagsString, element);
}

function flattenJSONToHTML(jsonString, parentInfo) {
  try {
    const jsonArray = JSON.parse(jsonString);
    let parentClassName = JSON.parse(parentInfo).className || '';
    parentClassName = parentClassName.replace('w-[calc(100%-18rem)]', 'w-full');
    parentClassName = parentClassName.replace('ml-72', 'min-h-screen');

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
}

function copyText(textToCopy, element) {
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      element.innerHTML = '<svg id="poppyCopy" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" class="h-5 w-5 mx-auto"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M32 32a32 32 0 1 1 64 0A32 32 0 1 1 32 32zM448 160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32 256a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM167 153c-9.4-9.4-9.4-24.6 0-33.9l8.3-8.3c16.7-16.7 27.2-38.6 29.8-62.1l3-27.4C209.6 8.2 221.5-1.3 234.7 .1s22.7 13.3 21.2 26.5l-3 27.4c-3.8 34.3-19.2 66.3-43.6 90.7L201 153c-9.4 9.4-24.6 9.4-33.9 0zM359 311l8.2-8.3c24.4-24.4 56.4-39.8 90.7-43.6l27.4-3c13.2-1.5 25 8 26.5 21.2s-8 25-21.2 26.5l-27.4 3c-23.5 2.6-45.4 13.1-62.1 29.8L393 345c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9zM506.3 8.5c8.6 10.1 7.3 25.3-2.8 33.8l-10 8.5c-14.8 12.5-33.7 19.1-53 18.6c-16.6-.4-30.6 12.4-31.6 29l-1.8 30c-2.5 42.5-38.3 75.3-80.8 74.2c-7.6-.2-15 2.4-20.7 7.3l-10 8.5c-10.1 8.6-25.3 7.3-33.8-2.8s-7.3-25.3 2.8-33.8l10-8.5c14.8-12.5 33.7-19.1 53-18.6c16.6 .4 30.6-12.4 31.6-29l1.8-30c2.5-42.5 38.3-75.3 80.8-74.2c7.6 .2 15-2.4 20.7-7.3l10-8.5c10.1-8.6 25.3-7.3 33.8 2.8zM150.6 201.4l160 160c7.7 7.7 10.9 18.8 8.6 29.4s-9.9 19.4-20 23.2l-39.7 14.9L83.1 252.5 98 212.8c3.8-10.2 12.6-17.7 23.2-20s21.7 1 29.4 8.6zM48.2 345.6l22.6-60.2L226.6 441.2l-60.2 22.6L48.2 345.6zM35.9 378.5l97.6 97.6L43.2 510c-11.7 4.4-25 1.5-33.9-7.3S-2.4 480.5 2 468.8l33.8-90.3z"/></svg>';
      resetCopyPageButton(element);
    })
    .catch(err => {
      return String(console.error("Failed to copy text: ", err));
    });
}

function resetCopyPageButton(element){
  setTimeout(function(){
    element.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="white" class="h-5 w-5 mx-auto" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M208 0L332.1 0c12.7 0 24.9 5.1 33.9 14.1l67.9 67.9c9 9 14.1 21.2 14.1 33.9L448 336c0 26.5-21.5 48-48 48l-192 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48zM48 128l80 0 0 64-64 0 0 256 192 0 0-32 64 0 0 48c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 176c0-26.5 21.5-48 48-48z"/></svg>';
  }, 750)
}

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
      // Assuming you have the URL and page_id available
      // saveDataToServer('https://vi3gv9u3.ghiu3498g/api/savecss', 'your_page_id', tailwindStyles);
      return tailwindStyles;
    } else {
      console.log('No TailwindCSS styles found.');
    }
}