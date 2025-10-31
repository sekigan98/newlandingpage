function initChat() {
  const chatBox = document.getElementById("chat-box");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");
  const toggleBtn = document.getElementById("chat-toggle");
  const chatContainer = document.getElementById("chat-container");

  if (!chatBox || !chatInput || !sendBtn || !toggleBtn || !chatContainer) {
    console.warn("Chat elements not found in DOM");
    return; // ✅ ahora está dentro de una función
  }

  // Toggle de visibilidad
  toggleBtn.addEventListener("click", () => {
    chatContainer.classList.toggle("hidden");
  });

  // Firebase: referencia al chat
  const chatRef = ref(db, "messages");

  // Enviar mensaje
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

  // Mostrar mensajes en tiempo real
  onChildAdded(chatRef, (snapshot) => {
    const msg = snapshot.val();
    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-message";
    msgDiv.textContent = msg.text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

// ✅ Ejecutar la función
initChat();
