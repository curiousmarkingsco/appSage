/* sidebar.js */

function showConfirmationModal(message, onConfirm) {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center';
  modal.innerHTML = `
      <div class="bg-white p-4 rounded-lg max-w-sm mx-auto">
          <p class="text-black">${message}</p>
          <div class="flex justify-between mt-4">
              <button id="confirmDelete" class="bg-red-500 hover:bg-red-700 text-white font-bold p-2 rounded">Delete</button>
              <button id="cancelDelete" class="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded">Cancel</button>
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
