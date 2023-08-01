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

    mediaDiv.querySelector(".download-media").addEventListener("click", function (e) {
        downloadMedia(mediaObj);
    });
    mediaDiv.querySelector(".delete-media").addEventListener("click", function (e) {
        deleteMedia(mediaObj, mediaDiv);
    });

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

    mediaDiv.querySelector(".download-media").addEventListener("click", function (e) {
        downloadMedia(mediaObj);
    });
    mediaDiv.querySelector(".delete-media").addEventListener("click", function (e) {
        deleteMedia(mediaObj, mediaDiv);
    });

    document.querySelector(".gallery").append(mediaDiv);
}


function downloadMedia(mediaObject) {
    let aTag = document.createElement("a");
    if (mediaObject.type == "image") {
        aTag.download = `${mediaObject.mid}.jpg`;
        aTag.href = mediaObject.url;
    }
    else {
        aTag.download = `${mediaObject.mid}.mp4`;
        aTag.href = URL.createObjectURL(mediaObject.url);
    }
    aTag.click();
}

function deleteMedia(mediaObject, mediaDiv) {
    let mid = mediaObject.mid;
    let txnObject = db.transaction("Media", "readwrite");
    let mediaTable = txnObject.objectStore("Media");
    mediaTable.delete(mid);
    mediaDiv.remove();
}

