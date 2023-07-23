let photoDiv = document.querySelector('#photo');
let photoUploadInput = document.querySelector('#photo-upload');

photoDiv.addEventListener('click', function() {
    photoUploadInput.click();
});

photoUploadInput.addEventListener("change" , function(e) {
    // console.log(e);
    let fileObj = e.target.files[0];
    // console.log(fileObj);
    let filePath = URL.createObjectURL(fileObj , {type : "image/jpeg"});
    // console.log(filePath);
    let img = document.createElement("img");
    img.classList.add("sticky-image");
    img.setAttribute("src", filePath);
    addSticky(img);
});






