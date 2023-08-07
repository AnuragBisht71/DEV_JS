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
        let cellObject = getCellObjectFromElement(lastSelectedCell);

        if (cellObject != formula) {
            deleteFormula(cellObject);
        }

        let calculatedValue = solveFormula(formula, cellObject);
        // UI Update
        lastSelectedCell.textContent = calculatedValue;

        // DB Update
        cellObject.value = calculatedValue;
        cellObject.formula = formula;

        // Childrens Update
        updateChildrens(cellObject.childrens);
    }
});

function attachClickAndBlurEventOnCell() {
    for (let i = 0; i < allCells.length; i++) {
        allCells[i].addEventListener("click", function (e) {
            let cellObject = getCellObjectFromElement(e.target);
            address.value = cellObject.name;
            formulaInput.value = cellObject.formula;

            let allActiveMenus = document.querySelectorAll(".active-menu");
            if (allActiveMenus) {
                for (let i = 0; i < allActiveMenus.length; i++) {
                    allActiveMenus[i].classList.remove("active-menu");
                }
            }

            let { bold, underline, italic } = cellObject.fontStyles;
            bold && document.querySelector(".bold").classList.add("active-menu");
            underline && document.querySelector(".underline").classList.add("active-menu");
            italic && document.querySelector(".italic").classList.add("active-menu");
        });

        allCells[i].addEventListener("blur", function (e) {
            lastSelectedCell = e.target;

            let cellValueFromUI = e.target.textContent;

            if (cellValueFromUI) {
                let cellObject = getCellObjectFromElement(e.target);

                if (cellObject.formula && cellValueFromUI != cellObject.value) {
                    deleteFormula(cellObject);
                    formulaInput.value = "";
                }

                // Cell object ki value update
                cellObject.value = cellValueFromUI;

                // update childrens of the current updated cell
                updateChildrens(cellObject.childrens);

                // handle visited cells
                let rowId = lastSelectedCell.getAttribute("rowid");
                let colId = lastSelectedCell.getAttribute("colid");
                if (!cellObject.visited) {
                    visitedCells.push({ rowId, colId });
                    cellObject.visited = true;
                }
            };
        });
    }
}

attachClickAndBlurEventOnCell();

function deleteFormula(cellObject) {
    cellObject.formula = "";
    for (let i = 0; i < cellObject.parents.length; i++) {
        let parentName = cellObject.parents[i];

        let parentCellObject = getCellObjectFromName(parentName);
        let updatedChildrens = parentCellObject.childrens.filter(function (childName) {
            if (childName == cellObject.name) {
                return false;
            }
            return true;
        });
        parentCellObject.childrens = updatedChildrens;
    }
    cellObject.parents = [];
}

function solveFormula(formula, selfCellObject) {
    // ( A1 + A2 )

    let formulaComps = formula.split(" ");

    // {"(" , "A1" , "A2" , ")"}
    for (let i = 0; i < formulaComps.length; i++) {
        let fComps = formulaComps[i];

        if (fComps[0] >= "A" && fComps[0] <= "Z" || fComps[0] >= "a" && fComps[0] <= "z") {
            let parentCellObject = getCellObjectFromName(fComps);
            let value = parentCellObject.value;
            if (selfCellObject) {
                // add yourself as a child of parentCellObject
                parentCellObject.childrens.push(selfCellObject.name);
                selfCellObject.parents.push(parentCellObject.name);
            }
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

function updateChildrens(childrens) {
    for (let i = 0; i < childrens.length; i++) {
        let child = childrens[i];

        let childCellObject = getCellObjectFromName(child);
        let updatedValueOfChild = solveFormula(childCellObject.formula);

        // DB Update
        childCellObject.value = updatedValueOfChild;

        // UI Update
        let colId = child.charCodeAt(0) - 65;
        let rowId = Number(child.substring(1)) - 1;
        document.querySelector(`div[rowid="${rowId}"][colid="${colId}"]`).textContent = updatedValueOfChild;

        updateChildrens(childCellObject.childrens);
    }
}


