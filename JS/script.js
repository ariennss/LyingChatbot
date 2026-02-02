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
const headerOpenCloseButton = document.getElementById("header_close_button");
const hamburgerMenuButton = document.getElementById("hamburger_menu_button");
const sidebar = document.getElementById("sidebar");

// LOGIC
const chats = [
  {
    chatid: crypto.randomUUID(),
    chatContent: messageQueue,
  },
];
console.log(chats);
let currentChatId = chats[0].chatid;
console.log(currentChatId);

form.addEventListener("submit", (event) => onSubmitMessage(event));
headerOpenCloseButton.addEventListener("click", changeSidebarVisibility);
newChatButton.addEventListener("click", newChat);
hamburgerMenuButton.addEventListener("click", changeSidebarVisibility);

async function onSubmitMessage(event) {
  event.preventDefault();
  const submitTarget = event.target;
  const formData = new FormData(submitTarget);
  const questionFromUser = formData.get("userinput");
  console.log("User input: " + questionFromUser);
  chatPlaceholder.style.display = "none";
  await handleConversation(questionFromUser);

  chats.find((x) => x.chatid === currentChatId).chatContent = [...messageQueue];
  if (
    chats.find((x) => x.chatid === currentChatId).chatContent.length == 2 &&
    !document.getElementById(currentChatId)
  ) {
    addNewChatToSidebar(currentChatId);
  }
}

function changeSidebarVisibility() {
  if (sidebar.classList.contains("closed")) {
    sidebar.classList.remove("closed");
    sidebar.classList.add("open");
  } else {
    sidebar.classList.remove("open");
    sidebar.classList.add("closed");
  }
}

function newChat() {
  // old chat
  chats.find((x) => x.chatid === currentChatId).chatContent = [...messageQueue];
  messageQueue = [];
  // addNewChatToSidebar(currentChatId);

  // new chat
  let guid = crypto.randomUUID();
  currentChatId = guid;
  chats.push({
    chatid: guid,
    chatContent: messageQueue,
  });

  clearChatBody();
}

function addNewChatToSidebar(guid) {
  let liElement = document.createElement("li");
  liElement.id = guid;
  liElement.classList.add("chatListElement");
  const firstMessage = chats.find((x) => x.chatid == guid).chatContent[0]
    .message;
  liElement.innerText = firstMessage;
  liElement.addEventListener("click", (e) => switchToChat(e));
  sidebarList.appendChild(liElement);
}

function clearChatBody() {
  while (chatBody.firstChild) {
    chatBody.removeChild(chatBody.firstChild);
  }
}

function switchToChat(event) {
  console.log(event);
  const id = event.target.id;
  currentChatId = id;
  console.log(id);

  const chatToSwitchTo = chats.find((chat) => chat.chatid == id);
  console.log(chatToSwitchTo);
  const chatToSwitchToMessages = chatToSwitchTo.chatContent;
  console.log(chatToSwitchToMessages);
  messageQueue = chatToSwitchToMessages;
  console.log(messageQueue);
  clearChatBody();
  messageQueue.forEach((x) => showMessages(x));
}
