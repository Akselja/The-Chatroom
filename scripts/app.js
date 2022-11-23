const chatList = document.querySelector(".chat-list");
const newChat = document.querySelector(".new-chat");
const newName = document.querySelector(".new-name");
const updateMssg = document.querySelector(".update-mssg");
const rooms = document.querySelector(".chat-rooms");

//send message
newChat.addEventListener("submit", e =>{
    e.preventDefault();
    const message = newChat.message.value.trim();
    window.scrollTo(0, document.body.scrollHeight); 
    newChat.reset();
    chatroom.addChat(message)
        .then(() => console.log("message sent"))
        .catch(err => console.log(err));
});

//update username
newName.addEventListener("submit", e => {
    e.preventDefault();
    const name = newName.name.value.trim();
    chatroom.updateName(name);
    newName.reset();
    updateMssg.textContent = `Your name was updated to ${name}`;
    setTimeout(() => updateMssg.textContent = "", 3000);
})

//change chatroom
rooms.addEventListener("click", e => {
    console.log(e);
    if(e.target.tagName === "BUTTON") {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute("id"))
        chatroom.getChats(chat => chatUI.render(chat));
    }
})

//check local storage for username
const username = localStorage.username ? localStorage.username : "anon";

//get chat history and make user profile
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom("general", username);


//get chats from the correct category
chatroom.getChats((data) => {
    chatUI.render(data);
});