# JavaScript
This folder houses all JS needed to make the page editor work (outside of a couple of inline scripts in the HTML docs themselves). The root of the JS folder is for this README, JS files that are shared amongst multiple HTML pages, and of course folders dedicated to each page. The bulk of the JS is found in editor/*.

## Global Variables (Headache Warning!)
Any global variables that exist will be in `renderer.js` in the `initializeGlobals()` function.

If you are writing code, please keep these items to an absolute minimum. If you are trying to do something with a variable and getting bizarre results related to data types, check this file for duplicate names as a sanity check.

## DATA IN / OUT
This means data types going into a function and data types going out. Here is an explanation of common examples:

### Example 1
```js
// DATA IN: String
function someFunction(string){
  // ...
} // DATA OUT: null
```
In this case, the function only accepts a string and does not output anything. This is usually because it is manipulating the DOM directly rather than passing its processed information along to another function.

### Example 2
```js
// DATA IN: ['String', 'HTML Element, <div>']
function someFunction(string, element){
  // ...
} // DATA OUT: HTML Element, <div> || null
```
In this example, we are inputting multiple pieces of data; a plain 'ol string and an HTML DOM element like you'd get from something like `document.getElementById('some-id')`. Coming as data out, we get either another HTML DOM element, or we get `null` depending on how the data was processed by the function.
