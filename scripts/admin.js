import * as firebase from "./firebase.js";

const loginContainer = document.getElementById("login-container");
const chatPanel = document.getElementById("chat-panel");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const loginError = document.getElementById("login-error");

const chatBox = document.getElementById("chat-box");
const chatInput = document.getElementById("chat-input");
const sendBtn = document.getElementById("send-btn");

const chatRef = firebase.ref(firebase.db, "messages");

// 🔐 Login
loginBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  firebase.signInWithEmailAndPassword(firebase.auth, email, password)
    .then(() => {
      loginContainer.classList.add("hidden");
      chatPanel.classList.remove("hidden");
    })
    .catch((error) => {
      loginError.textContent = "Credenciales inválidas";
      console.warn("Login error:", error);
    });
});

// 💬 Mostrar mensajes
firebase.onChildAdded(chatRef, (snapshot) => {
  const msg = snapshot.val();
  const msgDiv = document.createElement("div");
  msgDiv.className = "message " + (msg.user === "Admin" ? "admin" : "user");

  const time = new Date(msg.timestamp).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  msgDiv.textContent = `[${time}] ${msg.user || "Usuario"}: ${msg.text}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
});

// 📤 Enviar respuesta
sendBtn.addEventListener("click", () => {
  const text = chatInput.value.trim();
  if (text) {
    firebase.push(chatRef, {
      user: "Admin",
      text,
      timestamp: Date.now()
    });
    chatInput.value = "";
  }
