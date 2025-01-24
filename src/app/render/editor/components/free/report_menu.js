waitForGlobalsLoaded().then(() => {
    appSageComponents['reportMenu'].html_template = `
      <div class="report-menu relative" data-component-name="reportMenu" data-component-id="{{reportMenu.id}}">
        <button class="report-btn flex items-center px-3 py-2 border rounded focus:outline-none" aria-expanded="false">
          <svg class="flag-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Outline flag icon SVG --></svg>
          <span class="ml-2">Report</span>
        </button>
        <div class="report-dropdown hidden absolute bg-white border rounded shadow">
          <button class="dropdown-item w-full px-4 py-2 text-left" data-report-option="spam" data-item-to-report="{{reportMenu.itemId}}">Report Spam</button>
          <button class="dropdown-item w-full px-4 py-2 text-left" data-report-option="abuse" data-item-to-report="{{reportMenu.itemId}}">Report Abuse</button>
          <button class="dropdown-item w-full px-4 py-2 text-left" data-report-option="other" data-item-to-report="{{reportMenu.itemId}}">Report Other</button>
        </div>
      </div>
    `;
});
waitForGlobalsLoaded().then(() => {
appSageComponents['reportMenu'].form_template = `
    <form class="report-menu-form space-y-2" data-initialized="false" data-component-name="reportMenu" data-component-id="{{reportMenu.id}}">
    <label for="dropdown-items">Dropdown Items</label>
    <textarea id="dropdown-items" class="shadow border rounded w-full p-2" placeholder="Enter dropdown items as JSON"></textarea>
    </form>
`;
});
function initializeReportMenuForm(container) {
    const sidebar = document.getElementById('sidebar');
    const form = sidebar.querySelector('.report-menu-form');
    const dropdownConfig = form.querySelector('#dropdown-items');

    // Load existing items or set default
    dropdownConfig.value = getCurrentPage().reportMenuItems || '[{"label": "Report Spam", "value": "spam"}, {"label": "Report Abuse", "value": "abuse"}]';

    dropdownConfig.addEventListener('input', () => {
        saveComponentObjectToPage('reportMenuItems', dropdownConfig.value);
    });

    form.setAttribute('data-initialized', 'true');
}
window.initializeReportMenuForm = initializeReportMenuForm;
function initializeReportMenu(container) {
    const button = container.querySelector('.report-btn');
    const dropdown = container.querySelector('.report-dropdown');
    const items = dropdown.querySelectorAll('.dropdown-item');
  
    // Toggle dropdown visibility
    button.addEventListener('click', () => {
      dropdown.classList.toggle('hidden');
    });
  
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) dropdown.classList.add('hidden');
    });
  
    // Handle dropdown item selection
    items.forEach(item => {
      item.addEventListener('click', () => {
        const reportOption = item.dataset.reportOption;
        const itemId = item.dataset.itemToReport;
  
        // Open report modal
        openReportModal(reportOption, itemId);
        dropdown.classList.add('hidden');
      });
    });
}
window.initializeReportMenu = initializeReportMenu;