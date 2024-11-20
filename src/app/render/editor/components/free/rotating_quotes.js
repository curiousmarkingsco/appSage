/* rotating_quotes.js */
waitForGlobalsLoaded().then(() => {
  appSageComponents['rotatingQuotes'].html_template = `
    <div class="rotatingQuotes-container w-full" data-component-name="rotatingQuotes" data-component-id="{{rotatingQuotes.id}}">
      <div class="rotatingQuotes-quotebox relative w-full pl-16" data-quote-id="">
        <div class="absolute left-0 top-0 w-12 h-12 opacity-30 text-black">
          ${appSageComponents['rotatingQuotes'].icon}
        </div>
        <p class="rotatingQuotes-quote text-black" data-quotes=""></p>
        <span class="rotatingQuotes-source text-slate-400" data-sources=""></span>
      </div>
    </div>
  `;

  appSageComponents['rotatingQuotes'].form_template = `
    <form class="rotatingQuotes-form space-y-2" data-initialized="false" data-component-name="rotatingQuotes" data-component-id="{{rotatingQuotes.id}}">
      <div class="quotes-container max-h-96 overflow-y-scroll space-y-4">
        <!-- Existing quotes will be populated here -->
      </div>
      <button type="button" class="add-quote-btn bg-sky-500 text-white px-4 py-2 rounded">Add Quote</button>
    </form>
  `;
});

function initializeQuoteDataFromForm(container) {
  const sidebar = document.getElementById('sidebar');
  const form = sidebar.querySelector('.rotatingQuotes-form');
  const quotesContainer = form.querySelector('.quotes-container');

  // Load existing quotes
  let quotesData = getCurrentPage().rotatingQuotes;
  let quotes = [];

  if (quotesData) {
    quotesData = JSON.parse(quotesData);
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
        <label class="block font-medium text-gray-700">Quote:</label>
        <input type="text" name="quote" value="${quote.quote || ''}" class="quote-input shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline w-full">
      </div>
      <div>
        <label class="block font-medium text-gray-700">Source:</label>
        <input type="text" name="source" value="${quote.source || ''}" class="source-input shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline w-full">
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

  // Function to save all quotes to the page data
  function saveQuotesToPage() {
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

    saveComponentObjectToPage('rotatingQuotes', JSON.stringify(quotesToSave));
  }

  form.setAttribute('data-initialized', 'true');
}
window.initializeQuoteDataFromForm = initializeQuoteDataFromForm;


function initializeRotatingQuotes(container) {
  let quotes = [];
  let quotesData = getCurrentPage().rotatingQuotes || rotatingQuotes();

  if (quotesData) {
    quotesData = JSON.parse(quotesData);
    quotes = Object.keys(quotesData).map(key => quotesData[key]);
  }

  if (quotes.length === 0) {
    // Use built-in quotes if no user-generated quotes exist
    quotesData = rotatingQuotes();
    quotes = Object.keys(quotesData).map(key => quotesData[key]);
  }

  // Rotate quotes every few seconds (e.g., 5 seconds)
  let currentIndex = Math.floor(Math.random() * quotes.length);
  function displayNextQuote() {
    const quote = quotes[currentIndex];
    container.querySelector('.rotatingQuotes-quote').innerText = quote.quote;
    container.querySelector('.rotatingQuotes-source').innerText = quote.source;

    currentIndex = (currentIndex + 1) % quotes.length;
  }

  // Display the first quote immediately
  displayNextQuote();

  // Set interval for rotating quotes
  setInterval(displayNextQuote, 5000);
}
window.initializeRotatingQuotes = initializeRotatingQuotes;


function rotatingQuotes() {
  return {
    "built-in-quote-1": {
      "quote": "Don't worry about me. I've been fired so many times before. The only backlash I've ever received is an enormous RUSH of relief.",
      "source": "Maria Bamford"
    },
    "built-in-quote-2": {
      "quote": "A human being should be able to change a diaper, plan an invasion, butcher a hog, conn a ship, design a building, write a sonnet, balance accounts, build a wall, set a bone, comfort the dying, take orders, give orders, cooperate, act alone, solve equations, analyse a new problem, pitch manure, program a computer, cook a tasty meal, fight efficiently, die gallantly. Specialization is for insects.",
      "source": "Robert A. Heinlein"
    },
    "built-in-quote-3": {
      "quote": "Perception precedes comprehension.",
      "source": "Minh Tran"
    },
    "built-in-quote-4": {
      "quote": "An untamed, brilliant mind often possesses no discernment between nonsense, common sense, and brilliance.",
      "source": "Ian R. McKenzie, quoting himself as he rips another fart and huffs it in deeply with his nose"
    }
  }
}
window.rotatingQuotes = rotatingQuotes;
