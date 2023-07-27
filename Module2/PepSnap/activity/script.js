let videoElement = document.querySelector("video");
let recordButton = document.querySelector(".inner-record");
let capturePhoto = document.querySelector(".inner-capture");
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
        // console.log(videoObj);
        let videoURL = URL.createObjectURL(videoObj);
        let aTag = document.createElement("a");
        aTag.download = `video${Date.now()}.mp4`;
        aTag.href = videoURL;
        aTag.click();
    }

    mediaRecorder.onstop = function () {
        console.log("Inside on stop");
    }

    recordButton.addEventListener("click", function () {
        if (recordingState) {
            // already recording started
            mediaRecorder.stop();
            recordingState = false;
            recordButton.classList.remove("animate-record");
        }
        else {
            // start the recording
            mediaRecorder.start();
            recordingState = true;
            recordButton.classList.add("animate-record");
        }
    });

    capturePhoto.addEventListener("click", function () {
        capturePhoto.classList.add("animate-capture");

        setTimeout(function () {
            capturePhoto.classList.remove("animate-capture");
        }, 1000);

        let canvas = document.createElement("canvas");
        canvas.width = 640;
        canvas.height = 480;

        let ctx = canvas.getContext("2d");
        ctx.drawImage(videoElement, 0, 0);

        let aTag = document.createElement("a");
        aTag.download = `image${Date.now()}.jpg`;
        aTag.href = canvas.toDataURL("image/jpg");
        aTag.click();
    });
})();