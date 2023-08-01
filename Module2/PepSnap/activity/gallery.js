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
            if (mediaObj.type == "photo") {
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

}

function appendVideo(mediaObj) {

}






