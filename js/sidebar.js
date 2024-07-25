/* sidebar.js */

function showConfirmationModal(message, onConfirm) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center';
  modal.innerHTML = `
      <div class="bg-slate-100 p-4 rounded-lg max-w-sm mx-auto">
          <p class="text-slate-900">${message}</p>
          <div class="flex justify-between mt-4">
              <button id="confirmDelete" class="bg-rose-500 hover:bg-rose-700 text-slate-50 font-bold p-2 rounded">Delete</button>
              <button id="cancelDelete" class="bg-sky-500 hover:bg-sky-700 text-slate-50 font-bold p-2 rounded">Cancel</button>
          </div>
      </div>
  `;

  document.body.appendChild(modal);

  document.getElementById('confirmDelete').addEventListener('click', function () {
    onConfirm();
    document.body.removeChild(modal);
  });

  document.getElementById('cancelDelete').addEventListener('click', function () {
    document.body.removeChild(modal);
  });
}

function generateMobileTabs() {
  const icons = {
      'xs': ['Smartwatch & larger', '<svg fill="currentColor" class="h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M64 48l256 0c0-26.5-21.5-48-48-48L112 0C85.5 0 64 21.5 64 48zM80 80C35.8 80 0 115.8 0 160L0 352c0 44.2 35.8 80 80 80l224 0c44.2 0 80-35.8 80-80l0-192c0-44.2-35.8-80-80-80L80 80zM192 213.3a42.7 42.7 0 1 1 0 85.3 42.7 42.7 0 1 1 0-85.3zM213.3 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-74.7-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm74.7-160a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm-74.7-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM64 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm224-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM112 512l160 0c26.5 0 48-21.5 48-48L64 464c0 26.5 21.5 48 48 48z"/></svg>'],
      'sm': ['Mobile & larger', '<svg fill="currentColor" class="h-4 w-4 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM144 448c0 8.8 7.2 16 16 16l64 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-64 0c-8.8 0-16 7.2-16 16zM304 64L80 64l0 320 224 0 0-320z"/></svg>'],
      'md': ['Tall tablet & larger', '<svg fill="currentColor" class="h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM160 448c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-96 0c-8.8 0-16 7.2-16 16zM384 64L64 64l0 320 320 0 0-320z"/></svg>'],
      'lg': ['Wide tablet & larger', '<svg fill="currentColor" class="h-5 w-5 mx-auto rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 28.7 28.7 0 64 0L384 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zM160 448c0 8.8 7.2 16 16 16l96 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-96 0c-8.8 0-16 7.2-16 16zM384 64L64 64l0 320 320 0 0-320z"/></svg>'],
      'xl': ['Laptop & larger', '<svg fill="currentColor" class="h-8 w-8 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M128 32C92.7 32 64 60.7 64 96l0 256 64 0 0-256 384 0 0 256 64 0 0-256c0-35.3-28.7-64-64-64L128 32zM19.2 384C8.6 384 0 392.6 0 403.2C0 445.6 34.4 480 76.8 480l486.4 0c42.4 0 76.8-34.4 76.8-76.8c0-10.6-8.6-19.2-19.2-19.2L19.2 384z"/></svg>'],
      '2xl': ['Desktop & larger', '<svg fill="currentColor" class="h-8 w-8 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M64 0C28.7 0 0 28.7 0 64L0 352c0 35.3 28.7 64 64 64l176 0-10.7 32L160 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-69.3 0L336 416l176 0c35.3 0 64-28.7 64-64l0-288c0-35.3-28.7-64-64-64L64 0zM512 64l0 224L64 288 64 64l448 0z"/></svg>']
  };

  return `
  <div id="mobileTabContainer" class="flex fixed w-72 z-50 h-16 left-0 align-items-stretch justify-stretch bottom-0 bg-slate-300">
    ${Object.entries(icons).map(([size, icon]) => `
      <div title="${size.toUpperCase()} Screens" data-extra-info="${icon[0]}" class="tab-${size} ${size !== 'xs' ? 'border-slate-200' : 'bg-slate-50 border-slate-50'} w-12 text-slate-900 h-full inline-block responsive-tab cursor-pointer flex items-center p-2 hover:bg-slate-200 border-t-4">
        ${icon[1]}
      </div>
    `).join('')}
  </div>
  <div id="mobileTabContent">
    ${Object.entries(icons).map(([size]) => `
      <div class="${size !== 'xs' ? 'hidden ' : ''}tab-content tab-content-${size} grid grid-cols-5 gap-y-2">
        <h3 class="text-lg font-bold text-slate-900 my-2 col-span-5">Styles for ${size.toUpperCase()} Screens</h3>
      </div>
    `).join('')}
  </div>
  `;
}

function activateTabs() {
  // Add event listeners to toggle visibility
  document.querySelectorAll('#mobileTabContainer div').forEach(tab => {
    tab.addEventListener('click', function () {
      // Toggle display of associated content or styles when a tab is clicked
      const allTabs = document.querySelectorAll('.responsive-tab');
      allTabs.forEach(t => {
        t.classList.remove('bg-slate-50');
        t.classList.remove('border-slate-50');
        t.classList.add('border-slate-200');
      });  // Remove highlight from all tabs
      this.classList.remove('border-slate-200');
      this.classList.add('bg-slate-50');  // Highlight the clicked tab
      this.classList.add('border-slate-50');

      // Get the breakpoint from the class, assumes class is first in the list!
      const bp = this.classList[0].replace('tab-', '');

      // Assuming you have sections with IDs corresponding to breakpoints
      document.querySelectorAll('.tab-content').forEach(section => {
        if (section.classList.contains(`tab-content-${bp}`)) {
          section.classList.remove('hidden');
        } else {
          section.classList.add('hidden');
        }
      });
    });
  });
}