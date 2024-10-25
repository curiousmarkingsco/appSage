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

function generateFormId(form, field = false) {
  const length = 8; // Desired length of the ID
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let newId;

  // Retrieve existing IDs for the specified form
  const existingIds = field ? generateFormFieldDataIds(form) : getFormDataIds();

  do {
      newId = '';
      for (let i = 0; i < length; i++) {
          newId += characters.charAt(Math.floor(Math.random() * characters.length));
      }
  } while (existingIds.includes(newId)); // Check if the generated ID already exists

  return newId; // Return the unique ID
}

function getFormDataIds() {
  // Get all top-level form IDs
  return Object.keys(store.get('formData') || {}).map(key => key.split('.')[1]);
}

function generateFormFieldDataIds(form) {
  // Get field IDs for a specific form
  const formData = store.get(`formData.${form}`) || [];
  return formData.map(field => field.id); // Assuming each field has an 'id' property
}

// Example usage
// const uniqueFormId = generateFormId(); // For form IDs
// const uniqueFieldId = generateFormId('form1', true); // For field IDs in form1

// console.log(`Generated unique form ID: ${uniqueFormId}`);
// console.log(`Generated unique field ID for form1: ${uniqueFieldId}`);

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

function processFormData(form_id, method, field_id = null, payload = null) {
    // Retrieve existing form data
    const formData = store.get(`formData.${form_id}`) || [];

    switch (method) {
        case 'create':
            if (!payload) {
                throw new Error('Payload is required for create method.');
            }
            // Add the new data to the form data
            formData.push(payload);
            store.set(`formData.${form_id}`, formData);
            return payload; // Return the created data

        case 'read':
            if (field_id) {
                // Find specific field data by field_id
                const fieldData = formData.find(item => item.id === field_id);
                return fieldData || null; // Return the found field data or null
            }
            return formData; // Return the entire form data

        case 'update':
            if (!field_id || !payload) {
                throw new Error('Both field_id and payload are required for update method.');
            }
            // Find the index of the field data to update
            const index = formData.findIndex(item => item.id === field_id);
            if (index === -1) {
                throw new Error('Field ID not found.');
            }
            // Update the field data with the payload
            formData[index] = { ...formData[index], ...payload };
            store.set(`formData.${form_id}`, formData);
            return formData[index]; // Return the updated field data

        case 'delete':
            if (!field_id) {
                throw new Error('Field ID is required for delete method.');
            }
            // Remove the field data by field_id
            const updatedData = formData.filter(item => item.id !== field_id);
            store.set(`formData.${form_id}`, updatedData);
            return updatedData; // Return the remaining data after deletion

        default:
            throw new Error('Invalid method. Supported methods: create, read, update, delete.');
    }
}

// // Example usage
// // Create new form data
// const newField = { id: 'field1', name: 'Field One', value: 'Example' };
// processFormData('form1', 'create', null, newField);

// // Read entire form data
// const formData = processFormData('form1', 'read');

// // Update a specific field
// processFormData('form1', 'update', 'field1', { value: 'Updated Example' });

// // Delete a specific field
// processFormData('form1', 'delete', 'field1');
