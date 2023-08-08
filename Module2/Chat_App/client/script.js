let chatInputBox = document.querySelector(".chat-input");
let chatList = document.querySelector(".chat-list");

chatInputBox.addEventListener("keypress" , function(e) {
    if(e.key == "Enter" && chatInputBox.value) {
        let chatRight = document.createElement("div");
        chatRight.classList.add("chat");
        chatRight.classList.add("right");
        chatRight.innerHTML = chatInputBox.value;
        chatList.append(chatRight);
        chatInputBox.value = "";
    }
});