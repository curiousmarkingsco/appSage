const crypto = require('crypto');

function deriveKey(password) {
    const salt = crypto.randomBytes(16).toString('hex'); // Generate a random salt
    const iterations = 100000;
    const keyLength = 32; // 256 bits
    return crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha512');
}

const Store = require('electron-store');

function createStore(password) {
    const encryptionKey = deriveKey(password); // Derive the key from the password
    const store = new Store({ encryptionKey });

    return store;
}

const store = createStore(userPassword); // userPassword should come from the user input

// Function to generate and store form data
function generateFormData(formStructure) {
  const formData = []; // Initialize an array to hold the form data

  // Iterate through each row in the form structure
  formStructure.forEach(row => {
      const rowData = {}; // Object to hold data for the current row

      // Iterate through each field in the row
      row.fields.forEach(field => {
          // Depending on the field type, you can customize the data retrieval
          switch (field.type) {
              case 'text':
                  rowData[field.name] = field.value || ''; // Default to empty string
                  break;
              case 'number':
                  rowData[field.name] = field.value || 0; // Default to 0
                  break;
              case 'email':
                  rowData[field.name] = field.value || '';
                  break;
              case 'select':
                  rowData[field.name] = field.value || null; // Default to null if not selected
                  break;
              case 'checkbox':
                  rowData[field.name] = field.checked || false; // Boolean value
                  break;
              // Add more case statements for other field types as needed
              default:
                  console.warn(`Unsupported field type: ${field.type}`);
          }
      });

      // Push the row data into the formData array
      formData.push(rowData);
  });

  // Store the generated form data
  store.set(`formData.${generateFormId()}`, formData);
}

function generateFormId() {
  const length = 8; // Desired length of the ID
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let newId;

  // Function to get existing IDs from the store
  const existingIds = getFormDataIds();

  do {
      newId = '';
      for (let i = 0; i < length; i++) {
          newId += characters.charAt(Math.floor(Math.random() * characters.length));
      }
  } while (existingIds.includes(newId)); // Check if the generated ID already exists

  return newId; // Return the unique ID
}

function getFormDataIds() {
  return Object.keys(store.get('formData') || {}).map(key => key.split('.')[1]);
}

// // Example: Call the function with the user-defined form structure
// const userDefinedForm = [
//   {
//       fields: [
//           { name: 'name', type: 'text', value: 'Jane Doe' },
//           { name: 'age', type: 'number', value: 30 },
//           { name: 'email', type: 'email', value: 'jane@example.com' },
//           { name: 'newsletter', type: 'checkbox', checked: true }
//       ]
//   },
//   {
//       fields: [
//           { name: 'name', type: 'text', value: 'John Doe' },
//           { name: 'age', type: 'number', value: 28 },
//           { name: 'email', type: 'email', value: 'john@example.com' },
//           { name: 'newsletter', type: 'checkbox', checked: false }
//       ]
//   }
// ];
// generateFormData(userDefinedForm);
