let isOpen = false;
let messages = [];
let chatId = null;
let controlActive = true;
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatInput = document.getElementById('chatInput');
const userForm = document.getElementById('userForm');
const chatbot = document.getElementById('chatbot');
const chatbotToggle = document.getElementById('chatbotToggle');

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("userName") && localStorage.getItem("userNumber")) {
        userForm.style.display = "none";
        chatbotInput.style.display = "flex";
    }

    chatId = localStorage.getItem("chatId");
    if (chatId) {
        fetchChatHistory(chatId);
    } else {
        generateChatId();
    }

    setInterval(() => {
        if (chatId) {
            fetchChatHistory(chatId);
        }
    }, 1000);
});

function toggleChatbot() {
    isOpen = !isOpen;
    chatbot.style.display = isOpen ? "flex" : "none";
    chatbotToggle.classList.toggle('open', isOpen);
    chatbotToggle.classList.toggle('closed', !isOpen);
    chatbotToggle.textContent = isOpen ? "−" : "+";
}

function generateChatId() {
    chatId = Math.random().toString(36).substr(2, 9);
    localStorage.setItem("chatId", chatId);
}

async function fetchChatHistory(chatId) {
    try {
        const response = await fetch(`http://localhost:3002/chatHistory/${chatId}`);
        const data = await response.json();
        if (data && data.chatHistory) {
            messages = data.chatHistory;
            displayMessages();
        }
    } catch (error) {
        console.error("Error fetching chat history:", error);
    }
}

function displayMessages() {
    chatbotMessages.innerHTML = '';
    messages.forEach(message => {
        const messageElement = document.createElement("div");
        messageElement.className = `chatbot-message ${message.role}`;
        messageElement.textContent = message.content;
        chatbotMessages.appendChild(messageElement);
    });
    scrollToBottom();
}

function handleSend() {
    const input = chatInput.value;
    if (input.trim()) {
        sendMessage(controlActive ? "sendMessage" : "sendMessageuser", input);
        chatInput.value = '';
    }
}

async function sendMessage(endpoint, input) {
    try {
        const response = await fetch(`http://localhost:3002/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                chatId: chatId,
                message: input,
            })
        });
        const data = await response.json();
        if (data && data.chatHistory) {
            messages = data.chatHistory;
            displayMessages();
        }
    } catch (error) {
        console.error("Error sending message:", error);
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("userName").value;
    const number = document.getElementById("userNumber").value;

    if (name && number) {
        localStorage.setItem("userName", name);
        localStorage.setItem("userNumber", number);

        fetch("http://localhost:3002/submitUserData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ chatId, name, number })
        })
            .then(() => {
                userForm.style.display = "none";
                chatbotInput.style.display = "flex";
            })
            .catch((error) => console.error("Error submitting user data:", error));
    }
}

function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}
