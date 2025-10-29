const faqData = {
  "how to request clearance":
    "Go to 'Document Requests' → Choose 'Barangay Clearance' → Fill out the form → Submit.",
  "how to view my profile":
    "Click your profile icon in the top-right → View Profile.",
  "how to see pending requests":
    "Go to Dashboard → Check the 'Pending Applications' card.",
  "how to logout": "Click your profile icon → Logout.",
};

const chatBody = document.getElementById("chat-body");
const chatInput = document.getElementById("chat-input");

// Add messages
function addMessage(text, sender) {
  chatBody.innerHTML += `<div class="${sender}"><span>${text}</span></div>`;
  chatBody.scrollTop = chatBody.scrollHeight;
}

function handleMessage(inputText) {
  let message = inputText.toLowerCase();
  addMessage(inputText, "user");

  let response = "Sorry, I don’t have info about that yet.";

  for (let key in faqData) {
    if (message.includes(key)) {
      response = faqData[key];
      break;
    }
  }

  setTimeout(() => addMessage(response, "bot"), 400);
}

// Enter key submit
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && chatInput.value.trim() !== "") {
    handleMessage(chatInput.value);
    chatInput.value = "";
  }
});

// Send button submit
document.getElementById("send-btn").addEventListener("click", () => {
  if (chatInput.value.trim() !== "") {
    handleMessage(chatInput.value);
    chatInput.value = "";
  }
});

// Quick buttons
document.querySelectorAll(".quick-btn").forEach((btn) => {
  btn.addEventListener("click", () => handleMessage(btn.textContent));
});

// Toggle chatbot
document.getElementById("chat-toggle").onclick = () => {
  const chat = document.getElementById("chatbot");
  chat.style.display = chat.style.display === "flex" ? "none" : "flex";
};
