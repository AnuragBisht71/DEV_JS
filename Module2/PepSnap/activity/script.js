let videoElement = document.querySelector("video");
let constraints = { video: true };
navigator.mediaDevices.getUserMedia(constraints).then(function (MediaStream) {
    videoElement.srcObject = MediaStream;
})
    .catch(function (err) {
        console.log(err);
    });