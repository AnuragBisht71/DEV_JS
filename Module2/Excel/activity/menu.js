let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");

let left = document.querySelector(".left");
let center = document.querySelector(".center");
let right = document.querySelector(".right");


bold.addEventListener("click", function () {
    handleMenuOptionsOne("bold");
});

italic.addEventListener("click", function () {
    handleMenuOptionsOne("italic");
});

underline.addEventListener("click", function () {
    handleMenuOptionsOne("underline");
});

function handleMenuOptionsOne(buttonClicked) {
    let cellObject = getCellObjectFromElement(lastSelectedCell);

    if (buttonClicked == "bold") {
        if (bold.classList.contains("active-menu")) {
            // already bold is active
            bold.classList.remove("active-menu");
            lastSelectedCell.style.fontWeight = "normal";
        }
        else {
            // bold is not active
            bold.classList.add("active-menu");
            lastSelectedCell.style.fontWeight = "bold";
        }
        cellObject.fontStyles.bold = !cellObject.fontStyles.bold;
    }
    else if (buttonClicked == "italic") {
        if (italic.classList.contains("active-menu")) {
            // already italic is active
            italic.classList.remove("active-menu");
            lastSelectedCell.style.fontStyle = "normal";
        }
        else {
            // italic is not active
            italic.classList.add("active-menu");
            lastSelectedCell.style.fontStyle = "italic";
        }
        cellObject.fontStyles.italic = !cellObject.fontStyles.italic;
    }
    else if (buttonClicked == "underline") {
        if (underline.classList.contains("active-menu")) {
            // already underline is active
            underline.classList.remove("active-menu");
            lastSelectedCell.style.textDecoration = "none";
        }
        else {
            // underline is not active
            underline.classList.add("active-menu");
            lastSelectedCell.style.textDecoration = "underline";
        }
        cellObject.fontStyles.underline = !cellObject.fontStyles.underline;
    }
}


left.addEventListener("click", function () {
    handleTextAlign("left");
});

center.addEventListener("click", function () {
    handleTextAlign("center");
});

right.addEventListener("click", function () {
    handleTextAlign("right");
});

function handleTextAlign(alignment) {
    let cellObject = getCellObjectFromElement(lastSelectedCell);
    if (alignment == cellObject.textAlign) {
        return;
    }

    // remove previous active menu from text align
    document.querySelector(".menu-options-2 .active-menu").classList.remove("active-menu");

    document.querySelector("." + alignment).classList.add("active-menu");

    // UI
    lastSelectedCell.style.textAlign = alignment;

    // DB
    cellObject.textAlign = alignment;
}






