// Function to read a CSV file and convert it into a table with UTF-8 encoding
function handleCSVFile(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const contents = e.target.result;
        const tableContainer = document.getElementById("tableContainer");

        // Convert the CSV data to UTF-8 encoding using TextDecoder
        const utf8Decoder = new TextDecoder("utf-8");
        const utf8Text = utf8Decoder.decode(new Uint8Array(contents));

        const lines = utf8Text.split("\n");

        // Create a table element
        const table = document.createElement("table");

        // Loop through CSV lines
        lines.forEach((line, index) => {
            const row = document.createElement(index === 0 ? "th" : "tr");
            const cells = line.split(";"); // Use semicolon as the separator

            cells.forEach((cell, cellIndex) => {
                const cellElement = index === 0 ? document.createElement("th") : document.createElement("td");
                cellElement.textContent = cell.trim();

                // If it's the first row, set the cell as a table header (th)
                if (index === 0) {
                    cellElement.scope = "col";
                }

                row.appendChild(cellElement);
            });

            table.appendChild(row);
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
