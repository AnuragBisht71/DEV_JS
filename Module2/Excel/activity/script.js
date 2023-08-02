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