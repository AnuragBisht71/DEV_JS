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
}


function switchSheets(currentSheet) {
    if (currentSheet.classList.contains("active-sheet")) {
        return;
    }

    document.querySelector(".active-sheet").classList.remove("active-sheet");
    currentSheet.classList.add("active-sheet");
}