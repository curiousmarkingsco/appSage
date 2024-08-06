/* preview.js */

function loadPreview(pageId) {
  const json = loadPage(pageId);
  if (json) {
      const pageContainer = document.getElementById('page');
      pageContainer.innerHTML = ''; // Clear existing content

      document.querySelector('title').textContent = pageId;

      const data = JSON.parse(json);
      data.forEach(item => {
          const element = document.createElement(item.tagName);
          element.className = item.className;
          element.innerHTML = item.content;
          pageContainer.appendChild(element);
      });

      hideEditingTools();
      loadPageSettings(pageId, true);
      loadPageBlobs(pageId);
      loadPageMetadata(pageId);
  } else {
      console.error('No saved data found for pageId:', pageId);
  }
}

function hideEditingTools() {
  const editingTools = document.querySelectorAll('.addContent, .editContent, .removeColumn, .addColumn');
  editingTools.forEach(tool => {
      tool.style.display = 'none';
  });
}
