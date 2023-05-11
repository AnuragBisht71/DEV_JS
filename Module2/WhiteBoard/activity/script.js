let canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

window.addEventListener("resize" , function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;
})

let ctx = canvas.getContext("2d");

ctx.fillStyle = "yellow";
ctx.fillRect(10, 10, 150, 100);





