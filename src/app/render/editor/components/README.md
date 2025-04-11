# Components

## How to create a component

### Understanding basic concepts

Components should be able to:
* Stand alone and not rely on other components
* All elements should be editable by the built-in appSage editing capabilities
* HTML for the components should use TailwindCSS
* Styling for the components should, whenever possible, use TailwindCSS:
  ```js
    // Please, do this.
    exampleElement.classList.add('block');
    exampleElement.classList.remove('hidden');
    // Please, don't do this.
    exampleElement.style.display = 'block';
  ```
* Forms should match existing sidebar styles
  ```html
    <!-- example styling -->
    <input class="shadow border bg-[#ffffff] rounded py-2 px-3 text-fuscous-gray-700 leading-tight focus:outline-none focus:shadow-outline">
  ```
* Ensure your component doesn't already exist. If it is similar to another, consider enhancing the existing component instead.

### 1. Create your component file

Create a blank JS file in `src/app/render/editor/components/free`:

```sh
touch src/app/render/editor/components/free/rotating_quotes.js
```

### 2. Add your component object

#### 2.1 Free Components (Open Source Contributors)

Add your component object to `appSageFreeComponents` in `app/renderer.js`

```js
// Templates are loaded in the JS file dedicated to the component.
var appSageFreeComponents = {
  // Unqiue, camelCased key
  "rotatingQuotes": {
    // Plain English name
    name: 'Quotes - Example Component',
    license: 'free',
    // Lowercased alphabet with underscores only, please
    file: 'rotating_quotes.js',
    // Used in the :hover tooltip text, maximum 72 characters
    description: 'Rotating Quotes Component that demonstrates how to implement components',
    icon: '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- some FontAwesome icon or custom SVG --></svg>',
    // These will be declared later
    html_template: '',
    form_template: '' }
}
```

#### 2.2 Premium Components (Curious Markings, Co. Employees)

Add your component object to `appSagePremiumComponents` in `app/render/editor/_globals.js`

```js
// Templates are loaded in the JS file dedicated to the component.
var appSagePremiumComponents = {
  // Unqiue, camelCased key
  "rotatingQuotes": {
    // Plain English name
    name: 'Quotes - Example Component',
    // Lowercased alphabet with underscores only, please
    file: 'rotating_quotes.js',
    // Used in the :hover tooltip text, maximum 72 characters
    description: 'Rotating Quotes Component that demonstrates how to implement components',
    icon: '<svg class="h-full w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- some FontAwesome icon or custom SVG --></svg>',
    // These will be declared later
    html_template: '',
    form_template: '' }
}
```

### 3. Declare your HTML to be added to the page

Seen in both the editor and the live view: write your HTML, declare it as a string, then add it to your JS file:

```js
waitForGlobalsLoaded().then(() => {
  const myHtmlTemplate = `
    <div class="rotatingQuotes-container w-full" data-component-name="rotatingQuotes" data-component-id="{{rotatingQuotes.id}}">
      <div class="rotatingQuotes-quotebox w-full" data-quote-id="">
        <p class="rotatingQuotes-quote text-black" data-quotes=""></p>
        <span class="rotatingQuotes-source text-fuscous-gray-400" data-sources=""></span>
      </div>
    </div>
  `;

  // Free and premium components are flattened into the `appSageComponents` object
  appSageComponents['rotatingQuotes'].html_template = myHtmlTemplate;
});
```

### 4. Declare your form to be added to the editor sidebar

Seen in exclusively the editor:

**Recommended**: Add the data-attribute `data-initialized="false"` that is then set to `true` once the form has loaded on the sidebar. This is because the component may be in a state that has diverged from the original state. Your form initializer will need to know whether or not it is doing a fresh setup, or needs to pull existing data from the page.

```js
waitForGlobalsLoaded().then(() => {
  const myFormTemplate = `
    <form class="rotatingQuotes-form space-y-2" data-initialized="false" data-component-name="rotatingQuotes" data-component-id="{{rotatingQuotes.id}}">
      <div>
        <label class="block font-medium text-mine-shaft-700">Quote:</label>
        <input type="text" name="quote" class="shadow border bg-[#ffffff] rounded py-2 px-3 text-fuscous-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <div>
        <label class="block font-medium text-mine-shaft-700">Source:</label>
        <input type="text" name="source" class="shadow border bg-[#ffffff] rounded py-2 px-3 text-fuscous-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Save Quote</button>
    </form>
  `;

  appSageComponents['rotatingQuotes'].form_template = myFormTemplate;
});
```

### 5. Add your initializers

Add your form and HTML initializers to `app/render/editor/components/main.js`

#### 5.1 Form Initializers

Seen in exclusively the editor: Note that your quote form will be inside the `#sidebar` element of the editor.

```js
function initializeComponentForm(container, componentName, form) {
  // ... (Calls from existing components)

  // Your added code (begin)
  if (componentName === 'rotatingQuotes') {
    // This function name is defined by you and takes a div container which wraps the element(s) created from Step 4.
    // This form should have eventListener(s) related to your form from Step 5 that add the users' changes in real
    // time to the element on the page.
    initializeQuoteDataFromForm(container);
    // This `form` object is created by the app based on your form template from Step 5.
    form.setAttribute('data-initialized', true);
  } // Your added code (end)
}

// Example implementation to interact with your form inside the sidebar
function initializeQuoteDataFromForm(container) {
  const sidebar = document.getElementById('sidebar');
  const form = sidebar.querySelector('.rotatingQuotes-form');
}
```

#### 5.2 HTML Initializers

Seen in both the editor and more importantly standing alone in the live view: Utilize the built-in initializer that is called both on the editor and the live page where the form does not and will not exist.

```js
function initializeExistingComponents(container, componentName) {
  // ... (Calls from existing components)
  if (componentName === 'rotatingQuotes') {
    initializeRotatingQuotes(container);
  }
};
```

#### 5.3 Globalizing your component for the end-user view

Ideally, you declare the bulk of your logic within the `initializeRotatingQuotes` function (aka `initializeWhateverTheComponentName`), but if you run into issues necessitating breaking form, do this:

**Warning: Please ensure function names are *extremely* specifically named to be unique and referential to your component!**
After your declaration of essential functions, globalize them at the end of your file or after each function:
```js
window.initializeClockDataFromForm = initializeClockDataFromForm;
window.initializeRotatingQuotes = initializeRotatingQuotes
// etc
```

### 6. Storing Data

In most cases, your component should store data on a page-by-page basis. This may occur in the editor mode, or be a critical piece of user interactions in the live view. You can access the object like so:

```js
// Create a new object for your component's settings or store-able data
myObject = {
  "built-in-quote-1": {
    "quote": "Don't worry about me. I've been fired so many times before. The only backlash I've ever received is an enormous RUSH of relief.",
    "source": "Maria Bamford"
  },
  "built-in-quote-2": {
    "quote": "A human being should be able to change a diaper, plan an invasion, butcher a hog, conn a ship, design a building, write a sonnet, balance accounts, build a wall, set a bone, comfort the dying, take orders, give orders, cooperate, act alone, solve equations, analyse a new problem, pitch manure, program a computer, cook a tasty meal, fight efficiently, die gallantly. Specialization is for insects.",
    "source": "Robert A. Heinlein"
  },
  "user-created-quote-1": {
    "quote": "Perception precedes comprehension.",
    "source": "Minh Tran"
  },
  "user-created-quote-2": {
    "quote": "An untamed, brilliant mind often possesses no discernment between nonsense, common sense, and brilliance.",
    "source": "Ian R. McKenzie, Quoting Himself"
  }
}

// Finally, save your data
const json = JSON.stringify(myObject);
saveComponentObjectToPage('rotatingQuotes', json);

// To retrieve the data:
const currentPage = getCurrentPage();
const retrievedData = currentPage.rotatingQuotes; // string=> '{ "built-in-quote-1": { ... } }'
JSON.parse(retrievedData); // object=> { "built-in-quote-1": { ... } }
```

### 7. Full, Completed Example
```js
const myHtmlTemplate = `
  <div class="rotatingQuotes-container w-full" data-component-name="rotatingQuotes" data-component-id="{{rotatingQuotes.id}}">
    <div class="rotatingQuotes-quotebox relative w-full pl-16" data-quote-id="">
      <div class="absolute left-0 top-0 w-12 h-12 opacity-30 text-black">
        ${appSageComponents['rotatingQuotes'].icon}
      </div>
      <p class="rotatingQuotes-quote text-black" data-quotes=""></p>
      <span class="rotatingQuotes-source text-fuscous-gray-400" data-sources=""></span>
    </div>
  </div>
`;
appSageComponents['rotatingQuotes'].html_template = myHtmlTemplate;

const myFormTemplate = `<form class="rotatingQuotes-form space-y-2" data-initialized="false" data-component-name="rotatingQuotes" data-component-id="{{rotatingQuotes.id}}">
  <div>
    <label class="block font-medium text-mine-shaft-700">Quote:</label>
    <input type="text" name="quote" class="shadow border bg-[#ffffff] rounded py-2 px-3 text-fuscous-gray-700 leading-tight focus:outline-none focus:shadow-outline">
  </div>
  <div>
    <label class="block font-medium text-mine-shaft-700">Source:</label>
    <input type="text" name="source" class="shadow border bg-[#ffffff] rounded py-2 px-3 text-fuscous-gray-700 leading-tight focus:outline-none focus:shadow-outline">
  </div>
  <button type="submit" class="bg-fruit-salad-500 text-white px-4 py-2 rounded">Save Quote</button>
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
```
