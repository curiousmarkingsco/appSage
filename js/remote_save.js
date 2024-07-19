/* remote_save.js */

// TODO: Add field on settings page for remote storage URL
function saveDataToServer(url, page_id, css_content = null) {
  const pageData = localStorage.getItem('pageData'); // Assuming your data is stored under 'pageData' key
  const fullPath = url + (page_id ? ('/' + page_id) : '');
  fetch(fullPath, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ page_id: page_id, css: css_content, html_content: pageData })
  })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));
}
