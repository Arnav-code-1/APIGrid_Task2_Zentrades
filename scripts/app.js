// scripts/app.js

document.addEventListener('DOMContentLoaded', () => {
    renderPage1();
  });
  
  function renderPage1() {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
      <div id="page1">
        <h2>Upload File</h2>
        <input type="file" id="fileInput" accept=".json, .csv">
        <button class="button" onclick="handleFileUpload()">Next</button>
      </div>
    `;
  }
  
  function renderPage2() {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
      <div id="page2">
        <h2>File Information</h2>
        <label for="fileType">File Type:</label>
        <select id="fileType">
          <option value="json">JSON</option>
          <option value="csv">CSV</option>
        </select><br>
  
        <label for="encoding">Character Encoding:</label>
        <select id="encoding">
          <option value="utf-8">UTF-8</option>
          <!-- Add more options if needed -->
        </select><br>
  
        <label for="delimiter">Delimiter:</label>
        <input type="text" id="delimiter" placeholder="e.g., comma"><br>
  
        <div class="checkbox-container">
          <input type="checkbox" id="hasHeader">
          <label for="hasHeader">Has Header</label>
        </div>
  
        <button class="button" onclick="renderPage1()">Back</button>
        <button class="button" onclick="renderPage3()">Next</button>
      </div>
    `;
  }
  
  function renderPage3() {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
      <div id="page3">
        <h2>Display Fields</h2>
        <div>
          <h3>Available Fields</h3>
          <select id="availableFields" multiple>
            <option value="subcategory">Subcategory</option>
            <option value="title">Title</option>
            <option value="price">Price</option>
            <option value="popularity">Popularity</option>
            <!-- Add more options dynamically from the data file -->
          </select>
        </div>
  
        <div>
          <button class="button" onclick="moveToDisplayedFields('availableFields', 'displayedFields')">>></button>
          <button class="button" onclick="moveToAvailableFields('displayedFields', 'availableFields')">&lt;&lt;</button>
        </div>
  
        <div>
          <h3>Fields to be Displayed</h3>
          <select id="displayedFields" multiple>
            <!-- Initially empty, will be populated dynamically -->
          </select>
        </div>
  
        <button class="button" onclick="renderPage2()">Back</button>
        <button class="button" onclick="renderPage4()">Submit</button>
      </div>
    `;
  }
  
  function renderPage4() {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
      <div id="page4">
        <h2>Data Table</h2>
        <table id="dataTable">
          <!-- Table headers and rows will be added dynamically -->
        </table>
  
        <button class="button" onclick="renderPage3()">Back</button>
      </div>
    `;
  }
  
  function moveToDisplayedFields(fromId, toId) {
    const availableFields = document.getElementById(fromId);
    const displayedFields = document.getElementById(toId);
  
    // Move selected fields to be displayed
    for (let i = 0; i < availableFields.options.length; i++) {
      if (availableFields.options[i].selected) {
        displayedFields.appendChild(availableFields.options[i]);
        i--; // Adjust index after removing an option
      }
    }
  }
  
  function moveToAvailableFields(fromId, toId) {
    const availableFields = document.getElementById(toId);
    const displayedFields = document.getElementById(fromId);
  
    // Move selected fields back to available fields
    for (let i = 0; i < displayedFields.options.length; i++) {
      if (displayedFields.options[i].selected) {
        availableFields.appendChild(displayedFields.options[i]);
        i--; // Adjust index after removing an option
      }
    }
  }
  
  function updateUI() {
    const displayedFields = document.getElementById('displayedFields');
  
    // Check if displayedFields is not null and has options before accessing its options
    if (displayedFields && displayedFields.options) {
      const selectedFields = Array.from(displayedFields.options).map(option => option.value);
  
      // Additional UI update logic based on selected fields
      // Example: You can use selectedFields to customize the display or update other UI elements
      if (selectedFields.length > 0) {
        // For example, update a status message
        const statusMessage = document.getElementById('statusMessage');
        if (statusMessage) {
          statusMessage.textContent = `Displaying data for fields: ${selectedFields.join(', ')}`;
        }
        
        // Example: Clear previous data table
        clearDataTable();
  
        // Example: Display a loading indicator
        showLoadingIndicator();
  
        // Simulate an asynchronous data retrieval
        setTimeout(() => {
          // Example: Fetch data based on selected fields
          const data = fetchData(selectedFields);
  
          // Example: Render the data in the data table
          renderDataTable(data);
  
          // Example: Hide the loading indicator
          hideLoadingIndicator();
        }, 1000);
      } else {
        // Handle the case when no fields are selected
        console.warn('No fields selected for display.');
      }
    } else {
      console.error("Element with id 'displayedFields' not found or has no options.");
    }
  }
  
  function clearDataTable() {
    const dataTable = document.getElementById('dataTable');
    if (dataTable) {
      dataTable.innerHTML = ''; // Clear the table content
    }
  }
  
  function showLoadingIndicator() {
    const appContainer = document.getElementById('app');
    if (appContainer) {
      const loadingIndicator = document.createElement('div');
      loadingIndicator.id = 'loadingIndicator';
      loadingIndicator.textContent = 'Loading data...';
      appContainer.appendChild(loadingIndicator);
    }
  }
  
  function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (loadingIndicator) {
      loadingIndicator.remove();
    }
  }
  
  function fetchData(selectedFields) {
    // Implement logic to fetch data based on the selected fields
    // This is a placeholder, replace it with your actual data fetching logic
    const data = [
      { subcategory: 'Category A', title: 'Product 1', price: 19.99, popularity: 85 },
      { subcategory: 'Category B', title: 'Product 2', price: 29.99, popularity: 92 },
      // Add more data as needed
    ];
  
    // Filter data based on selected fields
    const filteredData = data.map(item => {
      const filteredItem = {};
      selectedFields.forEach(field => {
        filteredItem[field] = item[field];
      });
      return filteredItem;
    });
  
    return filteredData;
  }
  
  function renderDataTable(data) {
    const dataTable = document.getElementById('dataTable');
  
    // Example: Create table headers
    const headersRow = document.createElement('tr');
    Object.keys(data[0]).forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headersRow.appendChild(th);
    });
    dataTable.appendChild(headersRow);
  
    // Example: Create table rows
    data.forEach(item => {
      const row = document.createElement('tr');
      Object.values(item).forEach(value => {
        const td = document.createElement('td');
        td.textContent = value;
        row.appendChild(td);
      });
      dataTable.appendChild(row);
    });
  }
  
  // Additional functions for handling navigation and UI
  // ... (previous code)
  
