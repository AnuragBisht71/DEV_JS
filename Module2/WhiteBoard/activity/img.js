let photoDiv = document.querySelector('#photo');
let photoUploadInput = document.querySelector('#photo-upload');
let downloadDiv = document.querySelector('#download');

photoDiv.addEventListener('click', function () {
    photoUploadInput.click();
});

photoUploadInput.addEventListener("change", function (e) {
    // console.log(e);
    let fileObj = e.target.files[0];
    // console.log(fileObj);
    let filePath = URL.createObjectURL(fileObj, { type: "image/jpeg" });
    // console.log(filePath);
    let img = document.createElement("img");
    img.classList.add("sticky-image");
    img.setAttribute("src", filePath);
    addSticky(img);
});

downloadDiv.addEventListener("click", function () {
    let imagePath = canvas.toDataURL("image/jpg");
    // console.log(imagePath);
    let aTag = document.createElement("a");
    aTag.download = "canvas.jpg";
    aTag.href = imagePath;
    aTag.click();
})




