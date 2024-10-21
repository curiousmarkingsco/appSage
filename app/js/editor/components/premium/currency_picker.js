const currencyPickerHtmlTemplate = `
<div class="currency-picker-container w-full" data-component-name="currencyPicker" data-component-id="{{currencyPicker.id}}">
  <label for="currency-select" class="block text-gray-700">Choose your currency:</label>
  <select id="currency-select" class="block w-full mt-1 border bg-white rounded shadow py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    <option value="USD" selected>USD - US Dollar</option>
    <option value="EUR">EUR - Euro</option>
    <option value="GBP">GBP - British Pound</option>
    <!-- Add more currency options as needed -->
  </select>
  <span class="selected-currency text-gray-500 mt-2 block">Current: <span id="current-currency">USD</span></span>
</div>
`;

appSageComponents['currencyPicker'].html_template = currencyPickerHtmlTemplate;

const currencyPickerFormTemplate = `
<form class="currency-picker-form space-y-2" data-initialized="false" data-component-name="currencyPicker" data-component-id="{{currencyPicker.id}}">
  <div>
    <label class="block font-medium text-gray-700">Available Currencies:</label>
    <textarea name="currency-list" class="shadow border bg-white rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="3">USD - US Dollar\nEUR - Euro\nGBP - British Pound</textarea>
    <small class="text-gray-500">Enter one currency per line (Code - Name format)</small>
  </div>
  <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save Currencies</button>
</form>
`;

appSageComponents['currencyPicker'].form_template = currencyPickerFormTemplate;

function initializeCurrencyPickerForm(container, componentName, form) {
  if (componentName === 'currencyPicker') {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const currencyTextarea = form.querySelector('textarea[name="currency-list"]').value.trim();
      const currencyArray = currencyTextarea.split('\n').map(line => line.trim());
      updateCurrencyOptions(currencyArray);
      form.setAttribute('data-initialized', true);
    });
  }
}

function initializeCurrencyPicker(container) {
  const selectElement = container.querySelector('#currency-select');
  const displayElement = container.querySelector('#current-currency');

  selectElement.addEventListener('change', function () {
    const selectedCurrency = selectElement.value;
    displayElement.innerText = selectedCurrency;

    // Simulated price update (requires integration with price display logic)
    updatePricesWithSelectedCurrency(selectedCurrency);
  });
}

function updateCurrencyOptions(currencyArray) {
  const selectElement = document.querySelector('#currency-select');
  selectElement.innerHTML = ''; // Clear existing options

  currencyArray.forEach(currency => {
    const [code, name] = currency.split(' - ');
    const optionElement = document.createElement('option');
    optionElement.value = code;
    optionElement.textContent = `${code} - ${name}`;
    selectElement.appendChild(optionElement);
  });
}

function updatePricesWithSelectedCurrency(currency) {
  // Placeholder logic to update prices across the page based on selected currency
  // This could be replaced with actual currency conversion logic
  console.log(`Updating prices to display in ${currency}`);
}
