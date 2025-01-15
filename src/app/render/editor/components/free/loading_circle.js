waitForGlobalsLoaded().then(() => {
    appSageComponents['loadingCircle'].html_template = `
      <div class="loadingCircle-container flex justify-center items-center h-20 w-20" data-component-name="loadingCircle" data-component-id="{{loadingCircle.id}}">
        <div class="loadingCircle-spinner animate-spin border-4 border-t-transparent border-primary-500 rounded-full h-full w-full"></div>
      </div>
    `;
});
waitForGlobalsLoaded().then(() => {
    appSageComponents['loadingCircle'].form_template = `
      <form class="loadingCircle-form space-y-4" data-initialized="false" data-component-name="loadingCircle" data-component-id="{{loadingCircle.id}}">
        <div>
          <label class="block text-sm font-medium text-gray-700">Size (px):</label>
          <input type="number" name="size" class="shadow border bg-white rounded py-2 px-3 text-slate-700 focus:outline-none focus:shadow-outline w-full" value="80">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Color:</label>
          <input type="color" name="color" class="shadow border bg-white rounded py-2 px-3 text-slate-700 focus:outline-none focus:shadow-outline w-full" value="#1D4ED8">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Animation Speed (ms):</label>
          <input type="number" name="speed" class="shadow border bg-white rounded py-2 px-3 text-slate-700 focus:outline-none focus:shadow-outline w-full" value="500">
        </div>
      </form>
    `;
});
function initializeLoadingCircleForm(container) {
    const sidebar = document.getElementById('sidebar');
    const form = sidebar.querySelector('.loadingCircle-form');
  
    // Event listeners to update preview and save data
    form.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        const size = form.querySelector('input[name="size"]').value;
        const color = form.querySelector('input[name="color"]').value;
        const speed = form.querySelector('input[name="speed"]').value;
  
        const preview = container.querySelector('.loadingCircle-spinner');
        preview.style.width = `${size}px`;
        preview.style.height = `${size}px`;
        preview.style.borderColor = `${color} transparent`;
        preview.style.animationDuration = `${speed}ms`;
  
        saveComponentObjectToPage('loadingCircle', { size, color, speed });
      });
    });
}
window.initializeLoadingCircleForm = initializeLoadingCircleForm;
function initializeLoadingCircle(container) {
    const config = JSON.parse(getCurrentPage().loadingCircle || '{}');
    const { size = 80, color = '#1D4ED8', speed = 500 } = config;
  
    const spinner = container.querySelector('.loadingCircle-spinner');
    spinner.style.width = `${size}px`;
    spinner.style.height = `${size}px`;
    spinner.style.borderColor = `${color} transparent`;
    spinner.style.animationDuration = `${speed}ms`;
}
window.initializeLoadingCircle = initializeLoadingCircle;  