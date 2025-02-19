waitForGlobalsLoaded().then(() => {
    appSageComponents['socialIcons'].html_template = `
      <div class="social-icons-container flex space-x-4" data-component-name="socialIcons" data-component-id="{{socialIcons.id}}">
        <!-- Dynamically generated icons -->
      </div>
    `;
});
waitForGlobalsLoaded().then(() => {
    appSageComponents['socialIcons'].form_template = `
      <form class="social-icons-form space-y-4" data-initialized="false" data-component-name="socialIcons" data-component-id="{{socialIcons.id}}">
        <div class="icons-container max-h-96 overflow-y-scroll">
          <!-- Existing icons populated here -->
        </div>
        <button type="button" class="add-icon-btn bg-blue-500 text-white px-4 py-2 rounded">Add Icon</button>
        <div class="layout-options space-y-2">
          <label>
            <input type="radio" name="layout" value="horizontal" checked>
            Horizontal Layout
          </label>
          <label>
            <input type="radio" name="layout" value="vertical">
            Vertical Layout
          </label>
        </div>
      </form>
    `;
});
function initializeSocialIconsForm(container) {
    const sidebar = document.getElementById('sidebar');
    const form = sidebar.querySelector('.social-icons-form');
    const iconsContainer = form.querySelector('.icons-container');
  
    // Populate existing icons
    const iconsData = getCurrentPage().socialIcons || [];
    iconsData.forEach(icon => addIconToForm(iconsContainer, icon));
  
    // Add new icon functionality
    form.querySelector('.add-icon-btn').addEventListener('click', () => addIconToForm(iconsContainer));
  
    function addIconToForm(container, icon = {}) {
      const iconDiv = document.createElement('div');
      iconDiv.className = "icon-item flex items-center space-x-2";
      iconDiv.innerHTML = `
        <input type="text" class="icon-url-input" placeholder="Icon URL" value="${icon.url || ''}">
        <select class="icon-select">
          <option value="youtube" ${icon.type === 'youtube' ? 'selected' : ''}>YouTube</option>
          <option value="instagram" ${icon.type === 'instagram' ? 'selected' : ''}>Instagram</option>
          <option value="facebook" ${icon.type === 'facebook' ? 'selected' : ''}>Facebook</option>
        </select>
        <button type="button" class="delete-icon-btn text-red-500">Delete</button>
      `;
  
      container.appendChild(iconDiv);
  
      // Delete functionality
      iconDiv.querySelector('.delete-icon-btn').addEventListener('click', () => {
        container.removeChild(iconDiv);
      });
    }
  
    form.setAttribute('data-initialized', 'true');
}
function initializeSocialIcons(container) {
    const iconsData = getCurrentPage().socialIcons || [];
    const layout = getCurrentPage().socialIconsLayout || 'horizontal';
  
    container.classList.add(layout === 'horizontal' ? 'flex-row' : 'flex-col');
  
    iconsData.forEach(icon => {
      const iconElement = document.createElement('a');
      iconElement.href = icon.url;
      iconElement.target = '_blank';
      iconElement.innerHTML = `<svg class="h-6 w-6">${getIconSVG(icon.type)}</svg>`;
      container.appendChild(iconElement);
    });
}
  