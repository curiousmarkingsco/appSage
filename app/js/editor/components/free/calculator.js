// calculator.js

const calculatorHtmlTemplate = `
  <div class="calculator-container bg-slate-700 w-44 p-4 border border-gray-300 rounded-lg" data-component-name="calculator" data-component-id="{{calculator.id}}">
    <div class="calculator-display bg-gray-100 text-right text-xl p-2 mb-2 rounded" id="calc-display">0</div>
    <div class="grid grid-cols-4 gap-2">
      <button class="calculator-button bg-sky-500 text-white p-2 rounded">7</button>
      <button class="calculator-button bg-sky-500 text-white p-2 rounded">8</button>
      <button class="calculator-button bg-sky-500 text-white p-2 rounded">9</button>
      <button class="calculator-button bg-rose-500 text-white p-2 rounded">/</button>

      <button class="calculator-button bg-sky-500 text-white p-2 rounded">4</button>
      <button class="calculator-button bg-sky-500 text-white p-2 rounded">5</button>
      <button class="calculator-button bg-sky-500 text-white p-2 rounded">6</button>
      <button class="calculator-button bg-rose-500 text-white p-2 rounded">*</button>

      <button class="calculator-button bg-sky-500 text-white p-2 rounded">1</button>
      <button class="calculator-button bg-sky-500 text-white p-2 rounded">2</button>
      <button class="calculator-button bg-sky-500 text-white p-2 rounded">3</button>
      <button class="calculator-button bg-rose-500 text-white p-2 rounded">-</button>

      <button class="calculator-button bg-sky-500 text-white p-2 rounded">0</button>
      <button class="calculator-button bg-sky-500 text-white p-2 rounded">.</button>
      <button class="calculator-button bg-emerald-500 text-white p-2 rounded">=</button>
      <button class="calculator-button bg-rose-500 text-white p-2 rounded">+</button>
    </div>
  </div>
`;

appSageComponents['calculator'].html_template = calculatorHtmlTemplate;

const calculatorFormTemplate = `
  <form class="calculator-form space-y-2" data-initialized="false" data-component-name="calculator" data-component-id="{{calculator.id}}">
    <div>
      <label class="block font-medium text-gray-700">Button Labels:</label>
      <input type="text" name="button_labels" class="shadow border bg-[#ffffff] rounded py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline" value="7,8,9,/,...">
    </div>
    <button type="submit" class="bg-sky-500 text-white px-4 py-2 rounded">Save Calculator Settings</button>
  </form>
`;

appSageComponents['calculator'].form_template = calculatorFormTemplate;

function initializeCalculatorForm(container) {
  const sidebar = document.getElementById('sidebar');
  const form = sidebar.querySelector('.calculator-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const buttonLabels = form.querySelector('input[name="button_labels"]').value.split(',');
    const buttons = container.querySelectorAll('.calculator-button');

    buttonLabels.forEach((label, index) => {
      if (buttons[index]) buttons[index].innerText = label.trim();
    });

    // Save the modified calculator settings if needed
    const newCalculatorData = { buttonLabels: buttonLabels };
    saveComponentObjectToPage('calculator', JSON.stringify(newCalculatorData));
  });
}

function initializeCalculator(container) {
  const display = container.querySelector('#calc-display');
  const buttons = container.querySelectorAll('.calculator-button');

  let currentValue = '0';
  let pendingValue = null;
  let currentOperator = null;

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const buttonValue = button.innerText;

      if (['+', '-', '*', '/'].includes(buttonValue)) {
        pendingValue = parseFloat(currentValue);
        currentOperator = buttonValue;
        currentValue = '0';
      } else if (buttonValue === '=') {
        if (pendingValue !== null && currentOperator !== null) {
          currentValue = evaluateExpression(pendingValue, parseFloat(currentValue), currentOperator).toString();
          pendingValue = null;
          currentOperator = null;
        }
      } else {
        if (currentValue === '0') {
          currentValue = buttonValue;
        } else {
          currentValue += buttonValue;
        }
      }

      display.innerText = currentValue;
    });
  });
}

function evaluateExpression(val1, val2, operator) {
  switch (operator) {
    case '+': return val1 + val2;
    case '-': return val1 - val2;
    case '*': return val1 * val2;
    case '/': return val1 / val2;
    default: return val2;
  }
}

const calculatorData = {
  buttonLabels: ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+']
};

// saveComponentObjectToPage('calculator', JSON.stringify(calculatorData));
