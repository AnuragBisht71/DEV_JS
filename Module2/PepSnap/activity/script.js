let videoElement = document.querySelector("video");
let recordButton = document.querySelector("#record");
recordingState = false;
let mediaRecorder;

(async function () {
    let constraints = { video: true };
    let mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    videoElement.srcObject = mediaStream;
    mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.onstart = function () {
        console.log("Inside on start");
    }

    mediaRecorder.ondataavailable = function (e) {
        console.log("Inside on data available");
        console.log(e.data);
        let videoObj = new Blob([e.data], { type: "video/mp4" });
        console.log(videoObj);
    }

    mediaRecorder.onstop = function () {
        console.log("Inside on stop");
    }

    recordButton.addEventListener("click", function () {
        if (recordingState) {
            // already recording started
            mediaRecorder.stop();
            recordButton.innerHTML = "Record video";
            recordingState = false;
        }
        else {
            // start the recording
            mediaRecorder.start();
            recordButton.innerHTML = "Recording..";
            recordingState = true;
        }
    });
})();