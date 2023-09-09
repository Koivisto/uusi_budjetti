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

            // Add the "Budjettipuu" and new "Fourth Column" columns to the header and data rows
            if (isFirstRow) {
                // For the header row, add headers
                const budjettipuuHeader = document.createElement("th");
                budjettipuuHeader.textContent = "Budjettipuu";
                const fourthColumnHeader = document.createElement("th");
                fourthColumnHeader.textContent = "Fourth Column";
                row.insertBefore(budjettipuuHeader, row.firstChild);
                row.appendChild(fourthColumnHeader);
            } else {
                // For data rows, calculate and add the "Budjettipuu" value and new "Fourth Column" value
                const firstColumn = cells[0] ? cells[0].trim() : "";
                const thirdColumn = cells[2] ? cells[2].trim() : "";
                const fifthColumn = cells[4] ? cells[4].trim() : "";
                const budjettipuuCell = document.createElement("td");
                budjettipuuCell.textContent = `${firstColumn}.${thirdColumn}.${fifthColumn}.`;
                row.insertBefore(budjettipuuCell, row.firstChild);

                // Add a new "Fourth Column" cell with a line break before the value
                const fourthColumnValue = cells[3] ? cells[3].trim() : "";
                const fourthColumnCell = document.createElement("td");
                fourthColumnCell.innerHTML = `<div>${fourthColumnValue}</div>`;
                row.appendChild(fourthColumnCell);
            }

            table.appendChild(row);

            // After processing the first row, set the flag to false
            if (isFirstRow) {
                isFirstRow = false;
            }
        });

        // Clear previous table and append the new one
        tableContainer.innerHTML = "";
        tableContainer.appendChild(table);
    };

    reader.readAsArrayBuffer(file);
}

// Add an event listener to the file input element
const fileInput = document.getElementById("csvFileInput");
fileInput.addEventListener("change", (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        handleCSVFile(selectedFile);
    }
});
