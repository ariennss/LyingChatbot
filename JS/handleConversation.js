// this is a list of message objects.
// message objects include the message text and its origin (sender/bot)
let messageQueue = [];


// main function
async function handleConversation(userInput) {
    inputBar.value = "";
    handleMessage(userInput, true);
    let response = await getResponseFromHuggingFace(userInput);
    handleMessage(response, false);
}

function handleMessage(messageFromUser, isFromUser){
    let messageObject = buildMessageObject(messageFromUser, isFromUser);
    addMessageToQueue(messageObject);
    showMessages(messageObject);
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

function buildMessageObject(message, isFromUser){
    return {
        "message": message,
        "isFromUser": isFromUser ? true : false
    }
}

// push messages in the queue
function addMessageToQueue(messageObject){
    messageQueue.push(messageObject);
}

// show messages at frontend
function showMessages(messageObject){
   
        const p = document.createElement("p");
        addStyle(messageObject, p);
        chatBody.appendChild(p);
        p.innerText = messageObject.message;
        chatBody.scrollTop = chatBody.scrollHeight;
    ;
}

function addStyle(messageObject, messageParagraph){
    let pClass = messageObject.isFromUser ? "user_messages" : "bot_messages";
    messageParagraph.classList.add(pClass);
    messageParagraph.classList.add("message");
}

