let addsheetBtn = document.querySelector(".add-sheets");
let sheetsList = document.querySelector(".sheets-list");
let defaultSheet = document.querySelector(".sheet");

let sheetId = 0;

addsheetBtn.addEventListener("click", function (e) {
    addSheet();
});

defaultSheet.addEventListener("click", function (e) {
    switchSheets(defaultSheet);
});


function addSheet() {
    document.querySelector(".active-sheet").classList.remove("active-sheet");
    sheetId++;
    let sheetDiv = document.createElement("div");
    sheetDiv.classList.add("sheet");
    sheetDiv.classList.add("active-sheet");
    sheetDiv.setAttribute("sid", sheetId);
    sheetDiv.innerHTML = `Sheet ${sheetId + 1}`;

    sheetsList.append(sheetDiv);

    sheetDiv.addEventListener("click", function (e) {
        switchSheets(sheetDiv);
    });

    initDB();
    initCells();
    attachEventListeners();
    lastSelectedCell = undefined;
}


function switchSheets(currentSheet) {
    if (currentSheet.classList.contains("active-sheet")) {
        return;
    }

    document.querySelector(".active-sheet").classList.remove("active-sheet");
    currentSheet.classList.add("active-sheet");

    // set DB
    let sid = currentSheet.getAttribute("sid");
    db = sheetsDB[sid];

    // set UI
    let lastCellIndex = 0;

    for (let i = 0; i < db.length; i++) {
        let dbRow = db[i];
        for (let j = 0; j < dbRow.length; j++) {
            allCells[lastCellIndex].textContent = dbRow[j].value;
            lastCellIndex++;
        }
    }
}

function attachEventListeners() {
    topLeftCell = cellsContainer.querySelector(".top-left-cell");
    topRow = cellsContainer.querySelector(".top-row");
    leftCol = cellsContainer.querySelector(".left-col");
    allCells = document.querySelectorAll(".cell");
    attachClickAndBlurEventOnCell();
}