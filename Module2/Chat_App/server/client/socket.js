let leftSideView = document.querySelector(".left-view");
let profileDiv;

socket.emit("user-connected", name);

socket.on("user-joined", function (name) {
    // create a join div
    let chatJoin = document.createElement("div");
    chatJoin.classList.add("chat");
    chatJoin.classList.add("join");
    chatJoin.innerHTML = name + " joined chat";
    chatList.append(chatJoin);

    profileDiv = document.createElement("div");
    profileDiv.classList.add("profile");
    profileDiv.innerHTML = `<img src="./icons8-test-account-48.png" alt="" class="profile-img">
    <div class="profile-name">${name}</div>`;
    leftSideView.append(profileDiv);
});

socket.on("user-leave", function (name) {
    // create a leave div
    let chatLeave = document.createElement("div");
    chatLeave.classList.add("chat");
    chatLeave.classList.add("leave");
    chatLeave.innerHTML = name + " left chat";
    chatList.append(chatLeave);
    document.querySelector(".left-view").removeChild(profileDiv);
});

socket.on("append-chat", function ({ name, chat }) {
    let chatLeft = document.createElement("div");
    chatLeft.classList.add("chat");
    chatLeft.classList.add("left");
    chatLeft.innerHTML = name + " : " + chat;
    chatList.append(chatLeft);
});