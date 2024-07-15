/* preview.js */

function loadPreview(pageId) {
  const json = localStorage.getItem(pageId);
  if (json) {
      const pageContainer = document.getElementById('page');
      pageContainer.innerHTML = ''; // Clear existing content

      const data = JSON.parse(json);
      data.forEach(item => {
          const element = document.createElement(item.tagName);
          element.className = item.className;
          element.innerHTML = item.content;
          pageContainer.appendChild(element);
      });

      hideEditingTools();
  } else {
      console.error('No saved data found for pageId:', pageId);
  }
}

function hideEditingTools() {
  const editingTools = document.querySelectorAll('.editContent, .removeColumn, .addColumn');
  editingTools.forEach(tool => {
      tool.style.display = 'none';
  });
}