waitForGlobalsLoaded().then(() => {
    appSageComponents['barDropNavigationMenu'].html_template = `
      <nav 
        class="barDropNavigationMenu-container flex items-center bg-black text-black px-4 py-2" 
        data-component-name="barDropNavigationMenu" 
        data-component-id="{{barDropNavigationMenu.id}}">
        <div class="nav-items flex space-x-4">
          <div class="nav-item relative group">
            <button 
              class="nav-item-label px-4 py-2 hover:bg-gray-700 focus:outline-none">
              Menu 1
            </button>
          </div>
          <div class="nav-item relative group">
            <button 
              class="nav-item-label px-4 py-2 hover:bg-gray-700 focus:outline-none">
              Menu 2
            </button>
            <ul 
              class="dropdown-menu hidden absolute bg-white text-black shadow-lg mt-2 rounded opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-300">
              <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer">Option 1</li>
              <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer">Option 2</li>
            </ul>
          </div>
        </div>
      </nav>
    `;
});

// 2. Updated Form Template
waitForGlobalsLoaded().then(() => {
    appSageComponents['barDropNavigationMenu'].form_template = `
      <form 
        class="barDropNavigationMenu-form space-y-4" 
        data-initialized="false" 
        data-component-name="barDropNavigationMenu" 
        data-component-id="{{barDropNavigationMenu.id}}">
        <div class="nav-items-container max-h-96 overflow-y-scroll space-y-4">
          <!-- Navigation items dynamically added here -->
        </div>
        <button 
          type="button" 
          class="add-nav-item-btn bg-blue-500 text-black px-4 py-2 rounded">
          Add Navigation Item
        </button>
      </form>
    `;
});

// 3. Fixed initializeBarDropNavigationMenuForm Function
function initializeBarDropNavigationMenuForm(container) {
    const sidebar = document.getElementById('sidebar');
    const form = sidebar.querySelector('.barDropNavigationMenu-form');
    const navItemsContainer = form.querySelector('.nav-items-container');
    const addNavItemButton = form.querySelector('.add-nav-item-btn');

    // Load default or existing data
    let navData;
    try {
        navData = JSON.parse(getCurrentPage().barDropNavigationMenu || '[]');
    } catch (error) {
        console.error("Invalid JSON in barDropNavigationMenu:", error);
        navData = [];
    }

    if (navData.length === 0) {
        navData = [
            { label: 'Menu 1', dropdown: [] },
            { label: 'Menu 2', dropdown: [] }
        ];
    }

    navData.forEach(item => addNavItem(navItemsContainer, item));

    addNavItemButton.addEventListener('click', () => {
        addNavItem(navItemsContainer);
    });

    function addNavItem(container, item = { label: '', dropdown: [] }) {
        const div = document.createElement('div');
        div.classList.add('nav-item', 'border', 'p-2', 'rounded', 'space-y-2');

        div.innerHTML = `
          <div class="flex items-center space-x-2">
            <input 
              type="text" 
              class="nav-item-label flex-grow border rounded" 
              placeholder="Menu Label" 
              value="${item.label}">
            <button 
              type="button" 
              class="delete-nav-item-btn text-red-500">
              Delete
            </button>
          </div>
          <div class="dropdown-container space-y-2">
            ${item.dropdown.map(drop => `
              <div class="dropdown-item flex items-center space-x-2">
                <input 
                  type="text" 
                  class="dropdown-item-label flex-grow border rounded" 
                  placeholder="Dropdown Option" 
                  value="${drop.label}"
                  aria-label="Dropdown Option">
                <button 
                  type="button" 
                  class="delete-dropdown-item-btn text-red-500">
                  Delete
                </button>
              </div>
            `).join('')}
          </div>
          <button 
            type="button" 
            class="add-dropdown-item-btn bg-green-500 text-black px-2 py-1 rounded">
            Add Dropdown Option
          </button>
        `;

        container.appendChild(div);

        // Add dropdown option logic
        div.querySelector('.add-dropdown-item-btn').addEventListener('click', () => {
            addDropdownItem(div.querySelector('.dropdown-container'));
        });

        // Delete nav item logic
        div.querySelector('.delete-nav-item-btn').addEventListener('click', () => {
            container.removeChild(div);
            saveNavData();
        });

        div.querySelector('.nav-item-label').addEventListener('input', saveNavData);

        div.querySelectorAll('.dropdown-item-label').forEach(input => {
            input.addEventListener('input', saveNavData);
        });

        div.querySelectorAll('.delete-dropdown-item-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.dropdown-item').remove();
                saveNavData();
            });
        });

        function addDropdownItem(container) {
            const dropdownDiv = document.createElement('div');
            dropdownDiv.classList.add('dropdown-item', 'flex', 'items-center', 'space-x-2');

            dropdownDiv.innerHTML = `
              <input 
                type="text" 
                class="dropdown-item-label flex-grow border rounded" 
                placeholder="Dropdown Option">
              <button 
                type="button" 
                class="delete-dropdown-item-btn text-red-500">
                Delete
              </button>
            `;

            container.appendChild(dropdownDiv);

            dropdownDiv.querySelector('.dropdown-item-label').addEventListener('input', saveNavData);
            dropdownDiv.querySelector('.delete-dropdown-item-btn').addEventListener('click', () => {
                dropdownDiv.remove();
                saveNavData();
            });
        }
    }

    function saveNavData() {
        const navItems = Array.from(navItemsContainer.querySelectorAll('.nav-item')).map(item => ({
            label: item.querySelector('.nav-item-label').value,
            dropdown: Array.from(item.querySelectorAll('.dropdown-item')).map(drop => ({
                label: drop.querySelector('.dropdown-item-label').value
            }))
        }));
        saveComponentObjectToPage('barDropNavigationMenu', JSON.stringify(navItems));
    }

    form.setAttribute('data-initialized', 'true');
}
window.initializeBarDropNavigationMenuForm = initializeBarDropNavigationMenuForm;

// 4. Fixed initializeBarDropNavigationMenu Function
function initializeBarDropNavigationMenu(container) {
    let navData;
    try {
        navData = JSON.parse(getCurrentPage().barDropNavigationMenu || '[]');
    } catch (error) {
        console.error("Invalid JSON in barDropNavigationMenu:", error);
        navData = [];
    }

    container.innerHTML = navData.map(item => `
      <div class="nav-item relative group">
        <button 
          class="nav-item-label px-4 py-2 hover:bg-gray-700 focus:outline-none">
          ${item.label}
        </button>
        ${item.dropdown.length ? `
          <ul 
            class="dropdown-menu hidden absolute bg-white text-black shadow-lg mt-2 rounded opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-300">
            ${item.dropdown.map(drop => `
              <li class="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                ${drop.label}
              </li>
            `).join('')}
          </ul>
        ` : ''}
      </div>
    `).join('');
}
