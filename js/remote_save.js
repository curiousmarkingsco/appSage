/* remote_save.js */

// TODO: Add field on settings page for remote storage URL
function saveDataToServer(url, page_id, css_content = null) {
  const html_content = JSON.parse(localStorage.getItem('tailwindvpb')).pages[page_id];
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

function flattenJSONToHTML(jsonString, parentInfo) {
  try {
    const jsonArray = JSON.parse(jsonString);
    let parentClassName = JSON.parse(parentInfo).className || '';
    parentClassName = parentClassName.replace('w-3/4', 'w-full');
    parentClassName = parentClassName.replace ('ml-[25%]', 'min-h-screen');
    console.log(parentClassName);

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