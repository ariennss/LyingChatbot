// API 
const serverUrl = "http://localhost:3000";
const endpoint = "sendMessageToHuggingFace";

// DOM
const form = document.getElementById("form");
const chatBody = document.getElementById("chat_body");
const chatPlaceholder = document.getElementById("chatPlaceholder");
const inputBar = document.getElementById("user_input");

// LOGIC

form.addEventListener("submit", (event) =>{
    event.preventDefault();
    const submitTarget = event.target;
    const formData = new FormData(submitTarget);
    const questionFromUser = formData.get("userinput");
    console.log("User input: " + questionFromUser);
    chatPlaceholder.style.display = "none";
    handleConversation(questionFromUser);
});

