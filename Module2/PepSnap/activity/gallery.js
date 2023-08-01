let db;
let dbOpenRequest = indexedDB.open("Gallery", 1);

dbOpenRequest.onupgradeneeded = function (e) {
    db = e.target.result;
    db.createObjectStore("Media", { keyPath: "mid" });
};

dbOpenRequest.onsuccess = function (e) {
    db = e.target.result;
    fetchMedia();
};

dbOpenRequest.onerror = function (e) {
    alert("Inside on error!!!");
};


function fetchMedia() {
    let txnObject = db.transaction("Media", "readonly");
    let mediaTable = txnObject.objectStore("Media");
    let cursorObject = mediaTable.openCursor();

    cursorObject.onsuccess = function (e) {
        let cursor = cursorObject.result;
        if (cursor) {
            let mediaObj = cursor.value;
            if (mediaObj.type == "image") {
                appendPhoto(mediaObj);
            }
            else {
                appendVideo(mediaObj);
            }
            cursor.continue();
        }
    }
}

function appendPhoto(mediaObj) {
    let mediaDiv = document.createElement('div');
    mediaDiv.classList.add("media-div");
    mediaDiv.innerHTML = `<img src=${mediaObj.url} alt="" class="media-img">
    <div class="media-buttons">
        <div class="download-media">
            Download
        </div>
        <div class="delete-media">
            Delete
        </div>
    </div>`;

    document.querySelector(".gallery").append(mediaDiv);
}

function appendVideo(mediaObj) {
    let mediaDiv = document.createElement('div');
    mediaDiv.classList.add("media-div");
    mediaDiv.innerHTML = `<video controls class = "media-video"></video>
    <div class="media-buttons">
        <div class="download-media">
            Download
        </div>
        <div class="delete-media">
            Delete
        </div>
    </div>`;

    mediaDiv.querySelector(".media-video").src = URL.createObjectURL(mediaObj.url);

    document.querySelector(".gallery").append(mediaDiv);
}






