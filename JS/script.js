// API 
const serverUrl = "http://localhost:3000";
const endpoint = "sendMessageToHuggingFace";

// DOM
const form = document.getElementById("form");
const chatBody = document.getElementById("chat_body");
const chatPlaceholder = document.getElementById("chatPlaceholder");

// LOGIC
let messageQueue = [];

form.addEventListener("submit", (event) =>{
    event.preventDefault();
    const submitTarget = event.target;
    const formData = new FormData(submitTarget);
    const questionFromUser = formData.get("userinput");
    console.log("User input: " + questionFromUser);
    chatPlaceholder.style.display = "none";
    handleMessage(questionFromUser);
});

// main function
async function handleMessage(userInput) {
    console.log(userInput);
    addMessageToQueue(userInput, true);
    showMessages(userInput);
    let response = await getResponseFromHuggingFace(userInput);
    addMessageToQueue(response, false);
    showMessages(response);
    console.log("Response: " + response);
}

// call backend
async function getResponseFromHuggingFace(userQuestion){
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "message": userQuestion
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    console.log("POST body:" + JSON.stringify(requestOptions));

    const answer = await fetch("http://localhost:3000/sendMessageToHuggingFace", requestOptions);
    const json = await answer.json();
    
        console.log(json.answer);
    return json.answer;
}

// push messages in the queue
function addMessageToQueue(message, isFromUser){
    messageQueue.push({
        "message": message,
        "isFromUser": isFromUser ? "user" : "chatbot"
    });
}

// show messages at frontend
function showMessages(message){
   
        const p = document.createElement("p");
        chatBody.appendChild(p);
        p.innerText = message;
    ;
}

