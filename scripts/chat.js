import { db, ref, push, onChildAdded } from "./firebase.js";
if (!chatBox || !chatInput || !sendBtn) {
  console.warn("Chat elements not found in DOM");
  return;
}
const chatRef = ref(db, "messages");
const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", () => {
  const text = chatInput.value.trim();
  if (text) {
    push(chatRef, {
      text,
      timestamp: Date.now()
    });
    chatInput.value = "";
  }
});

onChildAdded(chatRef, (snapshot) => {
  const msg = snapshot.val();
  const msgDiv = document.createElement("div");
  msgDiv.className = "chat-message";
  msgDiv.textContent = msg.text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
});
