import React, { useState } from "react";
import * as XLSX from "xlsx";

function SpreadsheetReader() {
  const [data, setData] = useState([]);

  // Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Create a FileReader to read the file
      const reader = new FileReader();

      reader.onload = (e) => {
        // Parse the Excel file
        const binaryString = e.target.result;
        const workbook = XLSX.read(binaryString, { type: "binary" });

        // Assuming the data is in the first sheet
        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        // Convert the sheet data into a JSON array
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Set the data to state
        setData(jsonData);
      };

      // Read the file as binary string
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <div>
        <h3>Extracted Data:</h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

export default SpreadsheetReader;
