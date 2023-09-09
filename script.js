// Function to read a CSV file in "Nordic (ISO 8859-10)" encoding and convert it to UTF-8
function handleCSVFile(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const contents = e.target.result;
        const tableContainer = document.getElementById("tableContainer");

        // Convert the CSV data to UTF-8 encoding
        const iso8859_10Decoder = new TextDecoder("iso-8859-10");
        const utf8Text = iso8859_10Decoder.decode(contents);

        const lines = utf8Text.split("\n");

        // Create a table element
        const table = document.createElement("table");

        // Initialize a flag to identify the header row
        let isFirstRow = true;

        // Initialize an array to store unique values from the third column
        const uniqueValues = [];

        // Loop through CSV lines
        lines.forEach((line, index) => {
            const row = document.createElement("tr");
            const cells = line.split(";"); // Use semicolon as the separator

            cells.forEach((cell, cellIndex) => {
                const cellElement = isFirstRow ? document.createElement("th") : document.createElement("td");
                cellElement.textContent = cell.trim();

                // If it's the header row, set the cell as a table header (th)
                if (isFirstRow) {
                    cellElement.scope = "col";
                }

                row.appendChild(cellElement);
            });

            // Add the "Budjettipuu" column to the header and data rows
            if (isFirstRow) {
                // For the header row, add headers
                const budjettipuuHeader = document.createElement("th");
                budjettipuuHeader.textContent = "Budjettipuu";
                row.insertBefore(budjettipuuHeader, row.firstChild);
            } else {
                // For data rows, calculate and add the "Budjettipuu" value
                const firstColumn = cells[0] ? cells[0].trim() : "";
                const thirdColumn = cells[2] ? cells[2].trim() : "";
                const fifthColumn = cells[4] ? cells[4].trim() : "";
                const budjettipuuCell = document.createElement("td");
                budjettipuuCell.textContent = `${firstColumn}.${thirdColumn}.${fifthColumn}.`;
                row.insertBefore(budjettipuuCell, row.firstChild);

                // Store unique values from the third column
                if (cells[2]) {
                    const uniqueValue = cells[2].trim();
                    if (!uniqueValues.includes(uniqueValue)) {
                        uniqueValues.push(uniqueValue);
                    }
                }
            }

            table.appendChild(row);

            // After processing the first row, set the flag to false
            if (isFirstRow) {
                isFirstRow = false;
            }
        });

        // Create new rows based on unique values in the third column
        uniqueValues.forEach((uniqueValue) => {
            const newRow = createNewRow(lines, uniqueValue);
            table.appendChild(newRow);
        });

        // Clear previous table and append the new one
        tableContainer.innerHTML = "";
        tableContainer.appendChild(table);
    };

    reader.readAsArrayBuffer(file);
}

// Function to create a new row based on a unique value in the third column
function createNewRow(lines, uniqueValue) {
    const newRow = document.createElement("tr");

    // Initialize an array to store values for the new row
    const newRowValues = [];

    // Initialize a variable to store the total sum of the eighth cell
    let eighthCellTotal = 0;

    // Find rows with matching values in the first and third columns
    lines.forEach((line) => {
        const cells = line.split(";");
        if (cells[0] && cells[0].trim() === newRowValues[0]?.[0] && cells[2] && cells[2].trim() === uniqueValue) {
            newRowValues.push(cells.map((cell) => cell.trim()));

            // Sum the values from the eighth cell
            if (cells[7]) {
                eighthCellTotal += parseFloat(cells[7].trim());
            }
        }
    });

    // Fill in values for the new row based on the row beneath it
    if (newRowValues.length > 0) {
        newRowValues[0].forEach((value, cellIndex) => {
            const cellElement = document.createElement("td");

            // Leave the fifth and sixth cells empty
            if (cellIndex === 4 || cellIndex === 5) {
                cellElement.textContent = "";
            } else {
                cellElement.textContent = value;
            }

            newRow.appendChild(cellElement);
        });
    }

    // Add the total sum of the eighth cell to the eighth cell of the new row
    const eighthCellTotalElement = document.createElement("td");
    eighthCellTotalElement.textContent = eighthCellTotal;
    newRow.appendChild(eighthCellTotalElement);

    // Add the "Budjettipuu" column to the new row
    const budjettipuuCell = document.createElement("td");
    budjettipuuCell.textContent = `${newRowValues[0]?.[0] || ""}.${newRowValues[0]?.[2] || ""}.${newRowValues[0]?.[4] || ""}.`;
    newRow.insertBefore(budjettipuuCell, newRow.firstChild);

    return newRow;
}


// Add an event listener to the file input element
const fileInput = document.getElementById("csvFileInput");
fileInput.addEventListener("change", (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        handleCSVFile(selectedFile);
    }
});
