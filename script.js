// Function to create a new row based on a unique value in the first column
function createMomenttitaso1(lines, uniqueValue) {
    const newRow = document.createElement("tr");

    // Initialize an array to store values for the new row
    const newRowValues = [];

    // Find rows with matching values in the first column
    lines.forEach((line) => {
        const cells = line.split(";");
        if (cells[0] && cells[0].trim() === uniqueValue) {
            newRowValues.push(cells.map((cell) => cell.trim()));
        }
    });

    // Calculate the sums of each cell with matching first cell values
    const sums = calculateSumsOfMatchingCells(lines, newRowValues[0][0], "");

    // Fill in values for the new row based on the row beneath it
    if (newRowValues.length > 0) {
        newRowValues[0].forEach((value, cellIndex) => {
            const cellElement = document.createElement("td");
            if (cellIndex >= 7 && cellIndex <= 19) {
                // Set the sum of the corresponding cell with matching first cell values
                cellElement.textContent = sums[cellIndex - 7]; // Adjust the index
            } else if (cellIndex === 3 || cellIndex === 4 || cellIndex === 5) {
                // Ensure the fourth, fifth, and sixth cells are empty
                cellElement.textContent = "";
            } else {
                cellElement.textContent = value;
            }
            newRow.appendChild(cellElement);
        });
    }

    // Add the "Budjettipuu" column to the new row
    const budjettipuuCell = document.createElement("td");
    budjettipuuCell.textContent = `${newRowValues[0][0]}.`;
    newRow.insertBefore(budjettipuuCell, newRow.firstChild);

    return newRow;
}

// Function to create a new row based on a unique value in the third column
function createMomenttitaso2(lines, uniqueValue) {
    const newRow = document.createElement("tr");

    // Initialize an array to store values for the new row
    const newRowValues = [];

    // Find rows with matching values in the third column
    lines.forEach((line) => {
        const cells = line.split(";");
        if (cells[2] && cells[2].trim() === uniqueValue) {
            newRowValues.push(cells.map((cell) => cell.trim()));
        }
    });

    // Calculate the sums of each cell with matching first and third cell values
    const sums = calculateSumsOfMatchingCells(lines, newRowValues[0][0], newRowValues[0][2]);

    // Fill in values for the new row based on the row beneath it
    if (newRowValues.length > 0) {
        newRowValues[0].forEach((value, cellIndex) => {
            const cellElement = document.createElement("td");
            if (cellIndex >= 7 && cellIndex <= 19) {
                // Set the sum of the corresponding cell with matching first and third cell values
                cellElement.textContent = sums[cellIndex - 7]; // Adjust the index
            } else if (cellIndex === 3 || cellIndex === 4 || cellIndex === 5) {
                // Ensure the fourth, fifth, and sixth cells are empty
                cellElement.textContent = "";
            } else {
                cellElement.textContent = value;
            }
            newRow.appendChild(cellElement);
        });
    }

    // Add the "Budjettipuu" column to the new row
    const budjettipuuCell = document.createElement("td");
    budjettipuuCell.textContent = `${newRowValues[0][0]}.${newRowValues[0][2]}.${newRowValues[0][4]}.`;
    newRow.insertBefore(budjettipuuCell, newRow.firstChild);

    return newRow;
}

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

        // Initialize an array to store unique values from the first column
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

                // Store unique values from the first column
                if (cells[0]) {
                    const uniqueValue = cells[0].trim();
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

        // Create new rows based on unique values in the first column
        uniqueValues.forEach((uniqueValue) => {
            const newRow = createMomenttitaso1(lines, uniqueValue);
            table.appendChild(newRow);
        });

        // Create new rows based on unique values in the third column
        uniqueValues.forEach((uniqueValue) => {
            const newRow = createMomenttitaso2(lines, uniqueValue);
            table.appendChild(newRow);
        });

        // Clear previous table and append the new one
        tableContainer.innerHTML = "";
        tableContainer.appendChild(table);
    };

    reader.readAsArrayBuffer(file);
}


// Function to calculate the sums of specified cells (8th to 20th) with matching first and third cell values
function calculateSumsOfMatchingCells(lines, firstCellValue, thirdCellValue) {
    const sums = Array(13).fill(0); // Initialize an array for cells 8 to 20

    lines.forEach((line) => {
        const cells = line.split(";");
        if (cells[0] && cells[0].trim() === firstCellValue && cells[2] && cells[2].trim() === thirdCellValue) {
            for (let cellIndex = 7; cellIndex <= 19; cellIndex++) {
                if (cells[cellIndex]) {
                    sums[cellIndex - 7] += parseFloat(cells[cellIndex]);
                }
            }
        }
    });

    return sums;
}

// Add an event listener to the file input element
const fileInput = document.getElementById("csvFileInput");
fileInput.addEventListener("change", (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        handleCSVFile(selectedFile);
    }
});

