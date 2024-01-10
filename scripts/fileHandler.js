// scripts/fileHandler.js
function handleFileUpload() {
    const fileInput = document.getElementById('fileInput');
  
    if (fileInput) {
      const selectedFile = fileInput.files[0];
  
      if (selectedFile) {
        const fileTypeSelect = document.getElementById('fileType');
        const fileType = fileTypeSelect ? fileTypeSelect.value : null;
  
        if (fileType === 'json') {
          readJSONFile(selectedFile);
        } else if (fileType === 'csv') {
          // Handle CSV file
        } else {
          showAlert('Unsupported file type');
        }
      } else {
        showAlert('Please select a file');
      }
    } else {
      showAlert('File input element not found');
    }
  }
  
  function readJSONFile(file) {
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const jsonData = JSON.parse(event.target.result);
      processData(jsonData);
  
      // Call updateUI after processing the data
      setTimeout(updateUI, 0);
    };
  
    reader.readAsText(file, 'UTF-8');
  }
  
  function getFileType(fileName) {
    // Get the file extension from the fileName
    const fileExtension = fileName.split('.').pop().toLowerCase();
  
    if (fileExtension === 'json') {
      return 'json';
    } else if (fileExtension === 'csv') {
      return 'csv';
    } else {
      return 'unsupported';
    }
  }
  
  function readJSONFile(file) {
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const jsonData = JSON.parse(event.target.result);
      processData(jsonData);
    };
  
    reader.readAsText(file, 'UTF-8');
  }
  
  function readCSVFile(file) {
    const reader = new FileReader();
  
    reader.onload = function (event) {
      const csvData = event.target.result;
      processData(parseCSV(csvData));
    };
  
    reader.readAsText(file, 'UTF-8');
  }
  
  function parseCSV(csvData) {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    const data = [];
  
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const rowData = {};
  
      for (let j = 0; j < headers.length; j++) {
        rowData[headers[j]] = values[j];
      }
  
      data.push(rowData);
    }
  
    return data;
  }
  
  function processData(data) {
    console.log('Processed Data:', data);
    updateUI();
  }
  
  function showAlert(message) {
    alert(message);
  }
  