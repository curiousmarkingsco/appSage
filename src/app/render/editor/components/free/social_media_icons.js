waitForGlobalsLoaded().then(() => {
  appSageComponents['socialMediaIcons'].html_template = `
    <div class="socialMediaIcons-container flex gap-4 justify-center p-4" data-component-name="socialMediaIcons" data-component-id="{{socialMediaIcons.id}}">
      <a href="#" target="_blank" class="icon-link" data-platform="youtube">
        <img src="assets/social_icons/youtube.png" alt="YouTube" class="h-8 w-8">
      </a>
      <a href="#" target="_blank" class="icon-link" data-platform="instagram">
        <img src="assets/social_icons/instagram.png" alt="Instagram" class="h-8 w-8">
      </a>
      <a href="#" target="_blank" class="icon-link" data-platform="linkedin">
        <img src="assets/social_icons/linkedin.png" alt="LinkedIn" class="h-8 w-8">
      </a>
      <a href="#" target="_blank" class="icon-link" data-platform="x">
        <img src="assets/social_icons/twitter.png" alt="X" class="h-8 w-8">
      </a>
      <a href="#" target="_blank" class="icon-link" data-platform="facebook">
        <img src="assets/social_icons/facebook.png" alt="Facebook" class="h-8 w-8">
      </a>
    </div>
  `;
});
waitForGlobalsLoaded().then(() => {
  appSageComponents['socialMediaIcons'].form_template = `
    <form class="socialMediaIcons-form space-y-4" data-initialized="false" data-component-name="socialMediaIcons" data-component-id="{{socialMediaIcons.id}}">
      <div class="form-group">
        <label class="block font-medium text-gray-700">YouTube Link:</label>
        <input type="url" name="youtube" class="input-field shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline w-full" placeholder="https://youtube.com/your-profile">
      </div>
      <div class="form-group">
        <label class="block font-medium text-gray-700">Instagram Link:</label>
        <input type="url" name="instagram" class="input-field shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline w-full" placeholder="https://instagram.com/your-profile">
      </div>
      <div class="form-group">
        <label class="block font-medium text-gray-700">LinkedIn Link:</label>
        <input type="url" name="linkedin" class="input-field shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline w-full" placeholder="https://linkedin.com/in/your-profile">
      </div>
      <div class="form-group">
        <label class="block font-medium text-gray-700">X Link:</label>
        <input type="url" name="x" class="input-field shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline w-full" placeholder="https://x.com/your-profile">
      </div>
      <div class="form-group">
        <label class="block font-medium text-gray-700">Facebook Link:</label>
        <input type="url" name="facebook" class="input-field shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline w-full" placeholder="https://facebook.com/your-profile">
      </div>
    </form>
  `;
});
function initializeSocialMediaIconsForm(container) {
  const sidebar = document.getElementById('sidebar');
  const form = sidebar.querySelector('.socialMediaIcons-form');
  const componentId = form.getAttribute('data-component-id');

  // Load existing links from the page data
  let currentData = JSON.parse(getCurrentPage()?.socialMediaIcons || '{}');

  // Pre-fill inputs if data exists
  Object.keys(currentData).forEach(platform => {
    const input = form.querySelector(`input[name="${platform}"]`);
    if (input) input.value = currentData[platform];
  });

  // Listen for changes in input fields
  form.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('input', () => {
      const platform = input.name;
      const url = input.value;

      // Update the `currentData` object
      currentData[platform] = url;

      // Save updated data to the application’s page object
      saveComponentObjectToPage('socialMediaIcons', JSON.stringify(currentData));

      // Debugging: Log the current data
      console.log('Updated currentData:', currentData);

      // Update the corresponding icon's href dynamically
      const iconElement = document.querySelector(
        `.socialMediaIcons-container[data-component-id="${componentId}"] .icon-link[data-platform="${platform}"]`
      );
      if (iconElement) {
        iconElement.href = url;
      }
    });
  });

  form.setAttribute('data-initialized', 'true');
}
window.initializeSocialMediaIconsForm = initializeSocialMediaIconsForm;
function initializeSocialMediaIcons(container) {
  const currentData = JSON.parse(getCurrentPage()?.socialMediaIcons || '{}');

  // Apply saved links to icons
  container.querySelectorAll('.icon-link').forEach(link => {
    const platform = link.getAttribute('data-platform');
    link.href = currentData[platform] || "#"; // Use saved URL or default to "#"
  });

  // Debugging: Log currentData to ensure it is retrieved correctly
  console.log('Loaded currentData for socialMediaIcons:', currentData);
}
window.initializeSocialMediaIcons = initializeSocialMediaIcons;