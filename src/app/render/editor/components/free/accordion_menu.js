waitForGlobalsLoaded().then(() => {
    appSageComponents['accordionMenu'].html_template = `
      <div class="accordion-menu-container w-full p-4 space-y-2" data-component-name="accordionMenu" data-component-id="{{accordionMenu.id}}">
        <!-- Accordion Sections -->
        <div class="accordion-item border rounded">
          <button class="accordion-header w-full text-left px-4 py-2 bg-gray-200 font-medium text-gray-700">
            Section Title
          </button>
          <div class="accordion-content hidden px-4 py-2 text-gray-600">
            Section Content
          </div>
        </div>
      </div>
    `;
});
waitForGlobalsLoaded().then(() => {
    appSageComponents['accordionMenu'].form_template = `
      <form class="accordion-menu-form space-y-4" data-initialized="false" data-component-name="accordionMenu" data-component-id="{{accordionMenu.id}}">
        <div class="accordion-sections-container max-h-96 overflow-y-scroll space-y-2">
          <!-- Accordion sections will be populated here -->
        </div>
        <button type="button" class="add-section-btn bg-sky-500 text-white px-4 py-2 rounded">Add Section</button>
      </form>
    `;
});

function initializeAccordionMenuForm(container) {
    const sidebar = document.getElementById('sidebar');
    const form = sidebar.querySelector('.accordionMenu-form');
    const sectionsContainer = form.querySelector('.sections-container');
    const addSectionButton = form.querySelector('.add-section-btn');
  
    // Load existing data or use defaults
    let accordionData = JSON.parse(getCurrentPage().accordionMenu || '[]');
    if (accordionData.length === 0) {
      accordionData = [{ title: 'Section 1', options: ['Option 1', 'Option 2'] }];
    }
  
    accordionData.forEach(section => addSection(sectionsContainer, section));
  
    addSectionButton.addEventListener('click', () => {
      addSection(sectionsContainer);
    });
  
    function addSection(container, section = { title: '', options: [] }) {
      const div = document.createElement('div');
      div.classList.add('accordion-section-form', 'border', 'p-2', 'rounded', 'space-y-2');
  
      div.innerHTML = `
        <div class="flex items-center space-x-2">
          <input 
            type="text" 
            class="section-title flex-grow border rounded" 
            placeholder="Section Title" 
            value="${section.title}">
          <button 
            type="button" 
            class="delete-section-btn text-red-500">
            Delete
          </button>
        </div>
        <div class="options-container space-y-2">
          ${section.options.map(option => `
            <div class="option-item flex items-center space-x-2">
              <input 
                type="text" 
                class="option-label flex-grow border rounded" 
                placeholder="Option" 
                value="${option}">
              <button 
                type="button" 
                class="delete-option-btn text-red-500">
                Delete
              </button>
            </div>
          `).join('')}
        </div>
        <button 
          type="button" 
          class="add-option-btn bg-green-500 text-white px-2 py-1 rounded">
          Add Option
        </button>
      `;
  
      container.appendChild(div);
  
      // Add option functionality
      div.querySelector('.add-option-btn').addEventListener('click', () => {
        addOption(div.querySelector('.options-container'));
      });
  
      // Delete section functionality
      div.querySelector('.delete-section-btn').addEventListener('click', () => {
        container.removeChild(div);
        saveAccordionData();
      });
  
      // Save on input changes
      div.querySelector('.section-title').addEventListener('input', saveAccordionData);
  
      div.querySelectorAll('.option-label').forEach(input => {
        input.addEventListener('input', saveAccordionData);
      });
  
      div.querySelectorAll('.delete-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          btn.closest('.option-item').remove();
          saveAccordionData();
        });
      });
  
      function addOption(container) {
        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option-item', 'flex', 'items-center', 'space-x-2');
  
        optionDiv.innerHTML = `
          <input 
            type="text" 
            class="option-label flex-grow border rounded" 
            placeholder="Option">
          <button 
            type="button" 
            class="delete-option-btn text-red-500">
            Delete
          </button>
        `;
  
        container.appendChild(optionDiv);
  
        optionDiv.querySelector('.option-label').addEventListener('input', saveAccordionData);
        optionDiv.querySelector('.delete-option-btn').addEventListener('click', () => {
          optionDiv.remove();
          saveAccordionData();
        });
      }
    }
  
    function saveAccordionData() {
      const sections = Array.from(sectionsContainer.querySelectorAll('.accordion-section-form')).map(section => ({
        title: section.querySelector('.section-title').value,
        options: Array.from(section.querySelectorAll('.option-item')).map(option => (
          option.querySelector('.option-label').value
        ))
      }));
      saveComponentObjectToPage('accordionMenu', JSON.stringify(sections));
    }
  
    form.setAttribute('data-initialized', 'true');
}
window.initializeAccordionMenuForm = initializeAccordionMenuForm;
    
function initializeAccordionMenu(container) {
    const accordionData = JSON.parse(getCurrentPage().accordionMenu || '[]');
  
    container.innerHTML = accordionData.map(section => `
      <div class="accordion-section border rounded">
        <button 
          class="accordion-header w-full text-left px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none">
          ${section.title}
        </button>
        <div class="accordion-content hidden px-4 py-2 bg-white">
          ${section.options.map(option => `<p>${option}</p>`).join('')}
        </div>
      </div>
    `).join('');
  
    // Add toggle functionality
    container.querySelectorAll('.accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        content.classList.toggle('hidden');
      });
    });
  }
  window.initializeAccordionMenu = initializeAccordionMenu;
  