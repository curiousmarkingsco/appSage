/* rotating_quotes.js */

const myHtmlTemplate = `
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
appSageComponents['rotatingQuotes'].html_template = myHtmlTemplate;

const myFormTemplate = `<form class="rotatingQuotes-form space-y-2" data-initialized="false" data-component-name="rotatingQuotes" data-component-id="{{rotatingQuotes.id}}">
  <div>
    <label class="block font-medium text-gray-700">Quote:</label>
    <input type="text" name="quote" class="shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline">
  </div>
  <div>
    <label class="block font-medium text-gray-700">Source:</label>
    <input type="text" name="source" class="shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline">
  </div>
  <button type="submit" class="bg-sky-500 text-white px-4 py-2 rounded">Save Quote</button>
</form>`;
appSageComponents['rotatingQuotes'].form_template = myFormTemplate;

function initializeQuoteDataFromForm(container) {
  const sidebar = document.getElementById('sidebar');
  const form = sidebar.querySelector('.rotatingQuotes-form');
  const quoteBox = document.querySelector('.rotatingQuotes-quotebox');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const newQuote = form.querySelector('input[name="quote"]').value;
    const newSource = form.querySelector('input[name="source"]').value;

    // Update the quote box with the new quote and source
    quoteBox.querySelector('.rotatingQuotes-quote').innerText = newQuote;
    quoteBox.querySelector('.rotatingQuotes-source').innerText = newSource;

    // Save the new quote to the page data
    const quoteId = `user-created-quote-${Date.now()}`;
    const newQuoteData = {
      [quoteId]: { quote: newQuote, source: newSource }
    };

    saveComponentObjectToPage('rotatingQuotes', JSON.stringify(newQuoteData));
  });
}

function initializeRotatingQuotes(container) {
  let quotes = [];
  let quotesObject = getCurrentPage().rotatingQuotes;
  if (quotesObject) {
    quotesObject = JSON.parse(quotesObject);
    quotes = Object.keys(quotesObject).map(key => quotesObject[key]);
  }

  if (quotes.length === 0) {
    quotesObject = rotatingQuotes();
    quotes = Object.keys(quotesObject).map(key => quotesObject[key]);
  }

  // Randomly select a quote
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  container.querySelector('.rotatingQuotes-quote').innerText = randomQuote.quote;
  container.querySelector('.rotatingQuotes-source').innerText = randomQuote.source;
}

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