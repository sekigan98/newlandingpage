import * as firebase from "./firebase.js";

function initChat() {
  const chatBox = document.getElementById("chat-box");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");
  const toggleBtn = document.getElementById("chat-toggle");
  const chatContainer = document.getElementById("chat-container");

  if (toggleBtn && chatContainer) {
    toggleBtn.addEventListener("click", () => {
      chatContainer.classList.toggle("hidden");
      toggleBtn.textContent = chatContainer.classList.contains("hidden") ? "💬" : "❌";
    });
  }

  if (!chatBox || !chatInput || !sendBtn) {
    console.warn("Chat elements not found in DOM");
    return;
  }

  const chatRef = firebase.ref(firebase.db, "messages");

  sendBtn.addEventListener("click", () => {
    const text = chatInput.value.trim();
    if (text) {
      firebase.push(chatRef, {
        text,
        timestamp: Date.now()
      });
      chatInput.value = "";
    }
  });

  firebase.onChildAdded(chatRef, (snapshot) => {
    const msg = snapshot.val();
    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-message";

    const time = new Date(msg.timestamp).toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit"
    });

    msgDiv.textContent = `[${time}] ${msg.text}`;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

document.addEventListener("DOMContentLoaded", initChat);
