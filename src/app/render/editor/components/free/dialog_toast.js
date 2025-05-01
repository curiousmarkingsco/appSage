
waitForGlobalsLoaded().then(() => {
  appSageComponents['dialogToast'].html_template = `
    <div class="dialogToast-container fixed z-20 top-4 right-4 max-w-xs bg-white border border-white-500 shadow-lg rounded-lg p-4 transition-transform transform translate-y-full"
        data-component-name="dialogToast" data-component-id="{{dialogToast.id}}" data-auto-dismiss="false" data-shown="false" data-editor-state="${window.editorInitialized}">
      <div class="flex justify-between items-center">
        <p class="dialogToast-message text-sm pr-4">This sample text.</p>
        <button class="dialogToast-close-button hover:opacity-50" aria-label="Close">
          &times;
        </button>
      </div>
    </div>
  `;

  appSageComponents['dialogToast'].form_template = `
    <form class="dialogToast-form space-y-2" data-initialized="false" data-component-name="dialogToast" data-component-id="{{dialogToast.id}}">
      <div>
        <label class="block font-medium text-fuscous-gray-700">Message:</label>
        <input type="text" name="message" class="shadow border bg-[#ffffff] rounded py-2 px-3 text-fuscous-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>

      <div>
        <label class="block font-medium text-fuscous-gray-700">Notification Type:</label>
        <select name="type" class="shadow border bg-[#ffffff] rounded py-2 px-3 text-fuscous-gray-700 leading-tight focus:outline-none focus:shadow-outline">
          <option value="success">Success</option>
          <option value="error">Error</option>
          <option value="warning">Warning</option>
          <option value="info">Info</option>
        </select>
      </div>

      <div>
        <label class="block font-medium text-fuscous-gray-700">Timeout (seconds):</label>
        <input type="number" name="timeout" class="shadow border bg-[#ffffff] rounded py-2 px-3 text-fuscous-gray-700 leading-tight focus:outline-none focus:shadow-outline" value="3">
      </div>

      <div class="flex items-center">
        <input type="checkbox" name="autoDismiss" class="mr-2 leading-tight">
        <label class="text-sm">Auto-dismiss</label>
      </div>

      <div class="flex items-center" id="useProgrammaticallyWrapper" style="display: none;">
        <input type="checkbox" name="useProgrammatically" class="mr-2 leading-tight">
        <label class="text-sm">Use programmatically</label>
      </div>

      <div id="codeSampleWrapper" style="display: none;">
        <label class="block font-medium text-fuscous-gray-700">Code sample:</label>
  <pre class="bg-mine-shaft-100 p-4 rounded text-sm">
  revealDialogToast({
    message: 'Your changes have been saved successfully!',
    type: 'success',
    autoDismiss: true,
    timeout: 2 // 2 seconds
  }, () => {
    console.log('Toast notification revealed successfully!');
  });
  </pre>
      </div>

      <button type="submit" class="bg-fruit-salad-500 text-white px-4 py-2 rounded">Save Notification</button>
    </form>
  `;
});

function initializeDialogToastForm(container) {
  const sidebar = document.getElementById('sidebar');
  const form = sidebar.querySelector('.dialogToast-form');
  const toastContainer = document.querySelector('.dialogToast-container');
  
  // Check if the form has been initialized
  const isFormInitialized = form.getAttribute('data-initialized') === 'true';
  
  // If the form has not been initialized, populate with existing data
  if (!isFormInitialized) {
    const existingData = getDialogToastData();

    if (existingData) {
      // Assuming we get data from the saved component state and it's an object
      const firstToastKey = Object.keys(existingData)[0];
      const toastData = existingData[firstToastKey];

      // Populate form fields with the saved data
      form.querySelector('input[name="message"]').value = toastData.message || '';
      form.querySelector('select[name="type"]').value = toastData.type || 'info';
      form.querySelector('input[name="timeout"]').value = (toastData.timeout / 1000) || 3; // Convert timeout to seconds
      form.querySelector('input[name="autoDismiss"]').checked = toastData.autoDismiss || false;

      if (toastData.useProgrammatically) {
        form.querySelector('input[name="useProgrammatically"]').checked = true;
        form.querySelectorAll('div:not(#useProgrammaticallyWrapper):not(#codeSampleWrapper)').forEach(div => {
          div.style.display = 'none';
        });
        form.querySelector('#codeSampleWrapper').style.display = 'block';
      } else {
        form.querySelectorAll('div:not(#useProgrammaticallyWrapper):not(#codeSampleWrapper)').forEach(div => {
          div.style.display = 'block';
        });
        form.querySelector('#codeSampleWrapper').style.display = 'none';
      }
    }

    // Mark the form as initialized to avoid re-initialization
    form.setAttribute('data-initialized', 'true');
  }

  // Check if advancedMode is enabled and show "Use programmatically" option
  if (typeof advancedMode !== 'undefined' && advancedMode === true) {
    const useProgrammaticallyWrapper = form.querySelector('#useProgrammaticallyWrapper');
    useProgrammaticallyWrapper.style.display = 'flex';
  }

  // Handle "Use programmatically" checkbox behavior
  const useProgrammaticallyCheckbox = form.querySelector('input[name="useProgrammatically"]');
  const codeSampleWrapper = form.querySelector('#codeSampleWrapper');
  
  useProgrammaticallyCheckbox.addEventListener('change', function () {
    if (this.checked) {
      // Hide the rest of the form and show the code sample
      form.querySelectorAll('div:not(#useProgrammaticallyWrapper):not(#codeSampleWrapper)').forEach(div => {
        div.style.display = 'none';
      });
      codeSampleWrapper.style.display = 'block';
    } else {
      // Show the rest of the form and hide the code sample
      form.querySelectorAll('div:not(#useProgrammaticallyWrapper):not(#codeSampleWrapper)').forEach(div => {
        div.style.display = 'block';
      });
      codeSampleWrapper.style.display = 'none';
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Handle form data
    const message = form.querySelector('input[name="message"]').value;
    const type = form.querySelector('select[name="type"]').value;
    const timeout = form.querySelector('input[name="timeout"]').value * 1000;
    const autoDismiss = form.querySelector('input[name="autoDismiss"]').checked;

    // Update the toast with the form values
    toastContainer.querySelector('.dialogToast-message').innerText = message;
    toastContainer.setAttribute('data-auto-dismiss', autoDismiss);
    
    toastContainer.classList.remove('border-gray-asparagus-500', 'border-russett-500', 'border-romantic-600', 'border-fruit-salad-500');
    toastContainer.classList.remove('text-gray-asparagus-500', 'text-russett-500', 'text-romantic-600', 'text-fruit-salad-500');
    switch (type) {
      case 'success': toastContainer.classList.add('border-gray-asparagus-500', 'text-gray-asparagus-500'); break;
      case 'error': toastContainer.classList.add('border-russett-500', 'text-russett-500'); break;
      case 'warning': toastContainer.classList.add('border-romantic-600', 'text-romantic-600'); break;
      case 'info': toastContainer.classList.add('border-fruit-salad-500', 'text-fruit-salad-500'); break;
    }

    saveDialogToastData(message, type, timeout, autoDismiss);
  });
}
window.initializeDialogToastForm = initializeDialogToastForm;

function initializeDialogToast(container) {
  if (!container) return;
  const closeButton = container.querySelector('.dialogToast-close-button');
  
  // Check if editorMode is true and show the toast if so
  if (typeof editorMode !== 'undefined' && editorMode === true) {
    container.classList.remove('translate-y-full', 'hidden');
    container.setAttribute('data-shown', 'true');
  } else {
    // Check if the toast is already shown or hidden
    const isShown = container.getAttribute('data-shown') === 'true';

    if (isShown) {
      // If the toast is shown, ensure it's visible (remove translate-y-full and hidden)
      container.classList.remove('translate-y-full', 'hidden');
    } else {
      // If not shown, make it hidden (add translate-y-full and hidden)
      container.classList.add('translate-y-full', 'hidden');
    }
  }

  // Close the toast when the close button is clicked
  closeButton.addEventListener('click', () => {
    // Animate slide out
    container.classList.add('translate-y-full');
    
    // Delay adding hidden until after the sliding animation finishes
    setTimeout(() => {
      container.classList.add('hidden');
      container.setAttribute('data-shown', 'false');
    }, 100); // Match this delay to your sliding animation duration (300ms by default)
  });

  // Handle auto-dismiss if set
  const autoDismiss = container.getAttribute('data-auto-dismiss') === 'true';
  if (autoDismiss) {
    const timeout = parseInt(container.getAttribute('data-timeout'), 10) || 3000; // Default timeout of 3 seconds
    setTimeout(() => {
      // Animate slide out
      container.classList.add('translate-y-full');
      
      // Delay hiding until the slide-out is finished
      setTimeout(() => {
        container.classList.add('hidden');
        container.setAttribute('data-shown', 'false');
      }, 100); // Match this delay to your sliding animation duration
    }, timeout);
  }
}
window.initializeDialogToast = initializeDialogToast;

function saveDialogToastData(message, type, timeout, autoDismiss) {
  const toastId = `user-created-toast-${Date.now()}`;
  const toastData = {
    [toastId]: { message, type, timeout, autoDismiss }
  };

  saveComponentObjectToPage('dialogToast', JSON.stringify(toastData));
}
window.saveDialogToastData = saveDialogToastData;

function getDialogToastData() {
  const currentPage = getCurrentPage();
  return currentPage.dialogToast ? JSON.parse(currentPage.dialogToast) : null;
}
window.getDialogToastData = getDialogToastData;

function revealDialogToast({ message, type, autoDismiss, timeout }, callback) {
  const toastContainer = document.querySelector('.dialogToast-container');
  
  if (!toastContainer) {
    console.error('Dialog toast container not found.');
    return;
  }

  // Update message
  toastContainer.querySelector('.dialogToast-message').innerText = message;

  // Update notification type styles
  toastContainer.classList.remove('border-gray-asparagus-500', 'border-russett-500', 'border-romantic-600', 'border-fruit-salad-500');
  toastContainer.classList.remove('text-gray-asparagus-500', 'text-russett-500', 'text-romantic-600', 'text-fruit-salad-500');
  
  switch (type) {
    case 'success': 
      toastContainer.classList.add('border-gray-asparagus-500', 'text-gray-asparagus-500'); 
      break;
    case 'error': 
      toastContainer.classList.add('border-russett-500', 'text-russett-500'); 
      break;
    case 'warning': 
      toastContainer.classList.add('border-romantic-600', 'text-romantic-600'); 
      break;
    case 'info': 
      toastContainer.classList.add('border-fruit-salad-500', 'text-fruit-salad-500'); 
      break;
    default:
      console.warn(`Unknown notification type: ${type}`);
  }

  // Set auto-dismiss and timeout
  toastContainer.setAttribute('data-auto-dismiss', autoDismiss ? 'true' : 'false');
  toastContainer.setAttribute('data-timeout', timeout ? timeout * 1000 : 3000); // Default to 3 seconds if no timeout is specified

  // Show the toast by removing the 'translate-y-full' and 'hidden' classes
  toastContainer.classList.remove('translate-y-full', 'hidden');
  toastContainer.setAttribute('data-shown', 'true');

  // Handle auto-dismiss if enabled
  if (autoDismiss) {
    setTimeout(() => {
      toastContainer.classList.add('translate-y-full');
      setTimeout(() => {
        toastContainer.classList.add('hidden');
        toastContainer.setAttribute('data-shown', 'false');
      }, 100); // Animation duration
    }, timeout * 1000 || 3000); // Default to 3 seconds if no timeout specified
  }

  // Execute the callback, if provided
  if (typeof callback === 'function') {
    callback();
  }
}
window.revealDialogToast = revealDialogToast;
