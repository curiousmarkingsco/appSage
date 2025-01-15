waitForGlobalsLoaded().then(() => {
    appSageComponents['dropdownMenu'].html_template = `
      <div class="dropdownMenu-container relative" data-component-name="dropdownMenu" data-component-id="{{dropdownMenu.id}}">
        <button 
          class="dropdown-trigger px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 focus:outline-none"
          aria-haspopup="true" aria-expanded="false">
          Options
        </button>
        <ul 
          class="dropdown-menu hidden absolute left-0 mt-2 bg-white shadow-lg rounded opacity-0 transition-opacity duration-300"
          role="menu">
          <!-- Options will be dynamically added here -->
        </ul>
      </div>
    `;
});  

waitForGlobalsLoaded().then(() => {
    appSageComponents['dropdownMenu'].form_template = `
      <form class="dropdownMenu-form space-y-2" data-initialized="false" data-component-name="dropdownMenu" data-component-id="{{dropdownMenu.id}}">
        <div class="menu-items-container max-h-96 overflow-y-scroll space-y-2">
          <!-- Dynamically managed options -->
        </div>
        <button type="button" class="add-item-btn bg-green-500 text-white px-4 py-2 rounded">Add Option</button>
      </form>
    `;
});
  
function initializeDropdownMenuForm(container) {
    const sidebar = document.getElementById('sidebar');
    const form = sidebar.querySelector('.dropdownMenu-form');
    const itemsContainer = form.querySelector('.menu-items-container');
    const addItemButton = form.querySelector('.add-item-btn');
  
    // Load saved options
    let dropdownData = JSON.parse(getCurrentPage().dropdownMenu || '[]');
  
    dropdownData.forEach(option => {
      addMenuItemToForm(itemsContainer, option);
    });
  
    // Add new option
    addItemButton.addEventListener('click', () => {
      addMenuItemToForm(itemsContainer);
    });
  
    function addMenuItemToForm(container, option = { label: '', value: '' }) {
      const div = document.createElement('div');
      div.classList.add('menu-item', 'flex', 'items-center', 'space-x-2', 'border', 'p-2', 'rounded');
  
      div.innerHTML = `
        <input 
          type="text" 
          class="item-label flex-grow border rounded" 
          placeholder="Option Label" 
          value="${option.label}">
        <input 
          type="text" 
          class="item-value flex-grow border rounded" 
          placeholder="Option Value" 
          value="${option.value}">
        <button type="button" class="delete-item-btn text-red-500">Delete</button>
      `;
  
      container.appendChild(div);
  
      // Handle deletion
      div.querySelector('.delete-item-btn').addEventListener('click', () => {
        container.removeChild(div);
        saveDropdownData();
      });
  
      // Handle changes
      div.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', saveDropdownData);
      });
    }
  
    // Save data
    function saveDropdownData() {
      const items = Array.from(itemsContainer.querySelectorAll('.menu-item')).map(item => ({
        label: item.querySelector('.item-label').value,
        value: item.querySelector('.item-value').value,
      }));
  
      saveComponentObjectToPage('dropdownMenu', JSON.stringify(items));
    }
  
    form.setAttribute('data-initialized', 'true');
}
window.initializeDropdownMenuForm = initializeDropdownMenuForm;
  

function initializeDropdownMenu(container) {
    const dropdownData = JSON.parse(getCurrentPage().dropdownMenu || '[]');
    const menu = container.querySelector('.dropdown-menu');
    const trigger = container.querySelector('.dropdown-trigger');
  
    // Populate dropdown options
    menu.innerHTML = dropdownData.map(option => `
      <li 
        class="dropdown-item px-4 py-2 hover:bg-gray-200 cursor-pointer" 
        data-dropdown-value="${option.value}">
        ${option.label}
      </li>
    `).join('');
  
    // Toggle dropdown visibility
    trigger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('hidden');
      trigger.setAttribute('aria-expanded', !isOpen);
    });
  
    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!container.contains(e.target)) {
        menu.classList.add('hidden');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
  
    // Handle item selection
    menu.addEventListener('click', (e) => {
      if (e.target.classList.contains('dropdown-item')) {
        const selectedValue = e.target.dataset.dropdownValue;
        console.log(`Selected Value: ${selectedValue}`);
        menu.classList.add('hidden');
        trigger.setAttribute('aria-expanded', 'false');
      }
    });
}
window.initializeDropdownMenu = initializeDropdownMenu;
     