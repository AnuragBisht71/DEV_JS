let pen = document.querySelector("#pen");
let eraser = document.querySelector("#eraser");
let penOptions = pen.querySelector(".tool-options");
let eraserOptions = eraser.querySelector(".tool-options");

let penSize = penOptions.querySelector("#penSize");
let penColors = penOptions.querySelectorAll(".pen-colors");
let eraserSize = eraser.querySelector("#eraserSize");


let currentPenSize = "1";
let currentPenColor = "black";
let currentEraserSize = "1";



penSize.addEventListener("change", function () {
    let penSizeValue = penSize.value;
    // console.log(penSizeValue);
    currentPenSize = penSizeValue;
    ctx.lineWidth = currentPenSize;
});


eraserSize.addEventListener("click", function () {
    let eraserSizeValue = eraser.value;
    currentEraserSize = eraserSizeValue;
    ctx.lineWidth = currentEraserSize;
});


for (let i = 0; i < penColors.length; i++) {
    penColors[i].addEventListener("click", function (e) {
        let penColor = e.target.className;
        currentPenColor = penColor;
        ctx.strokeStyle = currentPenColor;
    });
}


pen.addEventListener("click", function () {
    if (pen.classList.contains("active-tool")) {
        // Pen is active
        if (penOptions.classList.contains("hide")) {
            penOptions.classList.remove("hide");
        }
        else {
            penOptions.classList.add("hide");
        }
    }
    else {
        // Pen is clicked for the first time
        eraser.classList.remove("active-tool");
        eraser.classList.add("fade");
        eraserOptions.classList.add("hide");

        pen.classList.remove("fade");
        pen.classList.add("active-tool");

        ctx.lineWidth = currentPenSize;
        ctx.strokeStyle = currentPenColor;
    }
});

eraser.addEventListener("click", function () {
    if (eraser.classList.contains("active-tool")) {
        // Eraser is active
        if (eraserOptions.classList.contains("hide")) {
            eraserOptions.classList.remove("hide");
        }
        else {
            eraserOptions.classList.add("hide");
        }
    }
    else {
        // Eraser is clicked for the first time
        pen.classList.remove("active-tool");
        pen.classList.add("fade");
        penOptions.classList.add("hide");

        eraser.classList.add("active-tool");
        eraser.classList.remove("fade");

        ctx.strokeStyle = "white";
        ctx.lineWidth = currentEraserSize;
    }
});




