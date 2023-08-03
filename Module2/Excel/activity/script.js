let topLeftCell = cellsContainer.querySelector(".top-left-cell");
let topRow = cellsContainer.querySelector(".top-row");
let leftCol = cellsContainer.querySelector(".left-col");
let allCells = document.querySelectorAll(".cell");
let formulaInput = document.querySelector("#formula");
let address = document.querySelector("#address");
let lastSelectedCell;


cellsContainer.addEventListener("scroll", function (e) {
    let topOffset = e.target.scrollTop;
    let leftOffset = e.target.scrollLeft;

    topLeftCell.style.top = topOffset + "px";
    topLeftCell.style.left = leftOffset + "px";
    topRow.style.top = topOffset + "px";
    leftCol.style.left = leftOffset + "px";
});

formulaInput.addEventListener("blur", function (e) {
    let formula = e.target.value;
    if (formula) {
        let calculatedValue = solveFormula(formula);
        // UI Update
        lastSelectedCell.textContent = calculatedValue;

        // DB Update
        let cellObject = getCellObjectFromElement(lastSelectedCell);
        cellObject.value = calculatedValue;
        cellObject.formula = formula;
    }
});

for (let i = 0; i < allCells.length; i++) {
    allCells[i].addEventListener("click", function (e) {
        let cellObject = getCellObjectFromElement(e.target);
        address.value = cellObject.name;
        formulaInput.value = cellObject.formula;
    });

    allCells[i].addEventListener("blur", function (e) {
        lastSelectedCell = e.target;

        let cellValueFromUI = e.target.textContent;

        if (cellValueFromUI) {
            let cellObject = getCellObjectFromElement(e.target);
            cellObject.value = cellValueFromUI;
        };
    });
}

function solveFormula(formula) {
    // ( A1 + A2 )

    let formulaComps = formula.split(" ");

    // {"(" , "A1" , "A2" , ")"}
    for (let i = 0; i < formulaComps.length; i++) {
        let fComps = formulaComps[i];

        if (fComps[0] >= "A" && fComps[0] <= "Z" || fComps[0] >= "a" && fComps[0] <= "z") {
            let cellObject = getCellObjectFromName(fComps);
            let value = cellObject.value;
            formula = formula.replace(fComps, value);
        }
    }

    let calculatedValue = eval(formula);
    return calculatedValue;
}

function getCellObjectFromElement(element) {
    let rowId = element.getAttribute("rowid");
    let colId = element.getAttribute("colid");
    return db[rowId][colId];
}

function getCellObjectFromName(name) {
    // A1
    let colId = name.charCodeAt(0) - 65;
    let rowId = Number(name.substring(1)) - 1;
    return db[rowId][colId];
}




