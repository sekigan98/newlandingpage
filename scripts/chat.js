import * as firebase from "./firebase.js";

function initChat() {
  // 🔐 Generar ID único por navegador
  let sessionId = localStorage.getItem("chatSessionId");
  if (!sessionId) {
    sessionId = "session_" + Date.now() + "_" + Math.floor(Math.random() * 100000);
    localStorage.setItem("chatSessionId", sessionId);
  }

  const chatBox = document.getElementById("chat-box");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");
  const toggleBtn = document.getElementById("chat-toggle");
  const chatContainer = document.getElementById("chat-container");

  // 💬 Mostrar/ocultar chat con animación
  if (toggleBtn && chatContainer) {
    toggleBtn.addEventListener("click", () => {
      const isHidden = chatContainer.classList.toggle("chat-container-hidden");
      toggleBtn.textContent = isHidden ? "💬" : "❌";
    });
  }

  // ⚠️ Verificación de elementos
  if (!chatBox || !chatInput || !sendBtn) {
    console.warn("Chat elements not found in DOM");
    return;
  }

  const chatRef = firebase.ref(firebase.db, `sessions/${sessionId}`);

  // 💬 Mensaje de bienvenida automático
  const welcomeMsg = document.createElement("div");
  welcomeMsg.className = "chat-message admin";
  welcomeMsg.textContent = "[Ahora] ¡Hola! ¿En qué puedo ayudarte?";
  chatBox.appendChild(welcomeMsg);

  // 📤 Enviar mensaje como usuario
  sendBtn.addEventListener("click", () => {
    const text = chatInput.value.trim();
    if (text) {
      firebase.push(chatRef, {
        user: "Usuario",
        text,
        timestamp: Date.now()
      });
      chatInput.value = "";
    }
  });

  // 💬 Mostrar mensajes en burbujas
  firebase.onChildAdded(chatRef, (snapshot) => {
    const msg = snapshot.val();
    const msgDiv = document.createElement("div");

    const sender = msg.user === "Admin" ? "admin" : "user";
    msgDiv.className = `chat-message ${sender}`;

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
