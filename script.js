// Function to read a CSV file and convert it into a table
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
            const row = document.createElement(index === 0 ? "th" : "tr");
            const cells = line.split(",");

            cells.forEach((cell) => {
                const cellElement = index === 0 ? document.createElement("th") : document.createElement("td");
                cellElement.textContent = cell.trim();
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
