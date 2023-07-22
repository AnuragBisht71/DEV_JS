let canvas = document.querySelector('#canvas');
canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 100;

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;
});