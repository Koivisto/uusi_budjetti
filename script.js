// Function to read a CSV file with ";" as separator and convert it into a table
function handleCSVFile(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const contents = e.target.result;
        const lines = contents.split("\n");
        const tableContainer = document.getElementById("tableContainer");

        // Create a table element
        const table = document.createElement("table");

        // Loop through CSV lines
        lines.forEach((line, index) => {
            const row = document.createElement("tr");
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

    reader.readAsText(file);
}

// Add an event listener to the file input element
const fileInput = document.getElementById("csvFileInput");
fileInput.addEventListener("change", (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
        handleCSVFile(selectedFile);
    }
});
