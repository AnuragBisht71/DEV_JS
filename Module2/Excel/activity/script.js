let topLeftCell = cellsContainer.querySelector(".top-left-cell");
let topRow = cellsContainer.querySelector(".top-row");
let leftCol = cellsContainer.querySelector(".left-col");

cellsContainer.addEventListener("scroll", function (e) {
    let topOffset = e.target.scrollTop;
    let leftOffset = e.target.scrollLeft;

    topLeftCell.style.top = topOffset + "px";
    topLeftCell.style.left = leftOffset + "px";
    topRow.style.top = topOffset + "px";
    leftCol.style.left = leftOffset + "px";
});

let allCells = document.querySelectorAll(".cell");

for (let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener("blur", function (e) {
        let cellValueFromUI = e.target.textContent;
        let rowId = e.target.getAttribute("rowid");
        let colId = e.target.getAttribute("colid");

        if (cellValueFromUI) {
            let cellObject = db[rowId][colId];
            cellObject.value = cellValueFromUI;
        };
    });
}





