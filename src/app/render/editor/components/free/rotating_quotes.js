/* rotating_quotes.js */
waitForGlobalsLoaded().then(() => {
  AppstartComponents['rotatingQuotes'].html_template = `
    <div class="rotatingQuotes-container w-full" data-component-name="rotatingQuotes" data-component-id="{{rotatingQuotes.id}}">
      <div class="rotatingQuotes-quotebox relative w-full pl-16" data-quote-id="">
        <div class="absolute left-0 top-0 w-12 h-12 opacity-30 text-black">
          ${AppstartComponents['rotatingQuotes'].icon}
        </div>
        <p class="rotatingQuotes-quote text-black" data-quotes=""></p>
        <span class="rotatingQuotes-source text-fuscous-gray-400" data-sources=""></span>
      </div>
    </div>
  `;

  AppstartComponents['rotatingQuotes'].form_template = `
    <form class="rotatingQuotes-form space-y-2" data-initialized="false" data-component-name="rotatingQuotes" data-component-id="{{rotatingQuotes.id}}">
      <div class="quotes-container max-h-96 overflow-y-scroll space-y-4">
        <!-- Existing quotes will be populated here -->
      </div>
      <button type="button" class="add-quote-btn bg-fruit-salad-500 text-white px-4 py-2 rounded">Add Quote</button>
    </form>
  `;
});

async function initializeQuoteDataFromForm(container) {
  const sidebar = document.getElementById('sidebar');
  const form = sidebar.querySelector('.rotatingQuotes-form');
  const quotesContainer = form.querySelector('.quotes-container');

  // Load existing quotes directly from IndexedDB

  // Find the actual rotatingQuotes container that has the data attributes
  const rotatingQuotesContainer = container.querySelector ?
    container.querySelector('.rotatingQuotes-container') || container :
    container;


  const componentId = rotatingQuotesContainer.getAttribute('data-component-id');
  const componentName = rotatingQuotesContainer.getAttribute('data-component-name') || 'rotatingQuotes';


  let quotesData = null;

  if (componentId) {
    // Try the new component-specific data first
    quotesData = await getComponentDataById(componentName, componentId);
  }

  if (!quotesData) {
    // Fall back to the component-level data
    quotesData = await getComponentData(componentName);
  }

  // Parse if it's a JSON string
  if (quotesData && typeof quotesData === 'string') {
    try {
      quotesData = JSON.parse(quotesData);
    } catch (e) {
      console.error('Failed to parse quotes data:', e);
      quotesData = null;
    }
  }

  let quotes = [];
  if (quotesData) {
    quotes = Object.keys(quotesData).map(key => ({ id: key, ...quotesData[key] }));
  }

  // Populate form with existing quotes
  quotes.forEach(quote => {
    addQuoteToForm(quotesContainer, quote);
  });

  // Event listener for 'Add Quote' button
  const addQuoteBtn = form.querySelector('.add-quote-btn');
  addQuoteBtn.addEventListener('click', () => {
    addQuoteToForm(quotesContainer);
  });

  // Function to add a quote to the form
  function addQuoteToForm(container, quote = {}) {
    const quoteId = quote.id || `quote-${Date.now()}`;

    const quoteDiv = document.createElement('div');
    quoteDiv.classList.add('quote-item', 'border', 'p-2', 'rounded', 'relative');
    quoteDiv.setAttribute('data-quote-id', quoteId);

    quoteDiv.innerHTML = `
      <button type="button" class="delete-quote-btn absolute top-0 right-0 mt-1 mr-1 text-red-500">Delete</button>
      <div>
        <label class="block font-medium text-mine-shaft-700">Quote:</label>
        <input type="text" name="quote" value="${quote.quote || ''}" class="quote-input shadow border bg-[#ffffff] rounded py-2 px-3 text-fuscous-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full">
      </div>
      <div>
        <label class="block font-medium text-mine-shaft-700">Source:</label>
        <input type="text" name="source" value="${quote.source || ''}" class="source-input shadow border bg-[#ffffff] rounded py-2 px-3 text-fuscous-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full">
      </div>
    `;

    // Event listener for 'Delete' button
    const deleteBtn = quoteDiv.querySelector('.delete-quote-btn');
    deleteBtn.addEventListener('click', () => {
      container.removeChild(quoteDiv);
      saveQuotesToPage();
    });

    // Event listeners for input changes
    const inputs = quoteDiv.querySelectorAll('input');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        saveQuotesToPage();
      });
    });

    container.appendChild(quoteDiv);

    // Save quotes after adding a new one
    saveQuotesToPage();
  }

  // Function to save all quotes to IndexedDB
  async function saveQuotesToPage() {
    const quoteItems = form.querySelectorAll('.quote-item');
    const quotesToSave = {};

    quoteItems.forEach(item => {
      const id = item.getAttribute('data-quote-id');
      const quoteText = item.querySelector('.quote-input').value;
      const sourceText = item.querySelector('.source-input').value;

      if (quoteText.trim()) {
        quotesToSave[id] = { quote: quoteText, source: sourceText };
      }
    });

    // Save to IndexedDB directly
    const pageId = getPageId();
    if (componentId) {
      // Save with component ID for better organization
      await saveBlobToIndexedDB(`${pageId}:${componentName}:${componentId}`, JSON.stringify(quotesToSave));
    } else {
      // Fallback to component-level saving
      await saveComponentObjectToPage(componentName, JSON.stringify(quotesToSave));
    }
  }

  form.setAttribute('data-initialized', 'true');
}
window.initializeQuoteDataFromForm = initializeQuoteDataFromForm;


async function initializeRotatingQuotes(container) {
  let quotes = [];
  let quotesData = null;

  // Get component info
  const componentId = container.getAttribute('data-component-id');
  const componentName = container.getAttribute('data-component-name') || 'rotatingQuotes';

  // Load quotes data from IndexedDB
  if (componentId) {
    quotesData = await getComponentDataById(componentName, componentId);
  }

  if (!quotesData) {
    quotesData = await getComponentData(componentName);
  }

  // Parse the data if it's a JSON string
  if (quotesData && typeof quotesData === 'string') {
    try {
      quotesData = JSON.parse(quotesData);
    } catch (e) {
      console.error('Failed to parse quotes data:', e);
      quotesData = null;
    }
  }

  // Fall back to built-in quotes if no data found
  if (!quotesData) {
    quotesData = rotatingQuotes();
  }

  if (quotesData) {
    quotes = Object.keys(quotesData).map(key => quotesData[key]);
  }

  if (quotes.length === 0) {
    // Use built-in quotes if no user-generated quotes exist
    quotesData = rotatingQuotes();
    quotes = Object.keys(quotesData).map(key => quotesData[key]);
  }

  // Rotate quotes every few seconds (e.g., 5 seconds)
  let currentIndex = Math.floor(Math.random() * quotes.length);
  function displayNextQuote(container) {
    const quote = quotes[currentIndex];
    const quoteContainer = document.querySelector('.rotatingQuotes-container');
    if (quoteContainer) {
      quoteContainer.querySelector('.rotatingQuotes-quote').innerText = quote.quote;
      quoteContainer.querySelector('.rotatingQuotes-source').innerText = quote.source;
      currentIndex = (currentIndex + 1) % quotes.length;
    }
  }

  // Display the first quote immediately
  displayNextQuote(container);

  // Set interval for rotating quotes
  setInterval(function(){
    displayNextQuote(container);
  }, 5000);

  function rotatingQuotes() {
    return {
      "built-in-quote-1": {
        "quote": "Don't worry about me. I've been fired so many times before. The only backlash I've ever received is an enormous RUSH of relief.",
        "source": "Maria Bamford"
      }
    }
  }
}
window.initializeRotatingQuotes = initializeRotatingQuotes;
