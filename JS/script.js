// API 
const serverUrl = "http://localhost:3000";
const endpoint = "sendMessageToHuggingFace";

// DOM
const form = document.getElementById("form");
const chatBody = document.getElementById("chat_body");
const chatPlaceholder = document.getElementById("chatPlaceholder");
const inputBar = document.getElementById("user_input");
const sidebarList = document.getElementById("sidebar_list");
const newChatButton = document.getElementById("newChatBtn");

// LOGIC
const chats = [
    {
        chatid: crypto.randomUUID(),
        chatContent: messageQueue
    }
];
console.log(chats);
let currentChatId = chats[0].chatid;
console.log(currentChatId);

form.addEventListener("submit", (event) =>{
    event.preventDefault();
    const submitTarget = event.target;
    const formData = new FormData(submitTarget);
    const questionFromUser = formData.get("userinput");
    console.log("User input: " + questionFromUser);
    chatPlaceholder.style.display = "none";
    handleConversation(questionFromUser);
});

newChatButton.addEventListener("click", newChat);

function newChat(){
    let guid = crypto.randomUUID();
    chats.find(x => x.chatid === currentChatId).chatContent = [...messageQueue];
    messageQueue = [];
    currentChatId = guid;
    chats.push({
        chatid: guid,
        chatContent: messageQueue
    });
    addNewChatToSidebar(guid);
}

function addNewChatToSidebar(guid){
    let liElement = document.createElement("li");
    liElement.id = guid;
    liElement.innerText = "Chat id: " + guid;
    sidebarList.appendChild(liElement);
}