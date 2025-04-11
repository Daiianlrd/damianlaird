import { OPENAI_API_KEY, ASSISTANT_ID } from "./config.js";

// Global toggleChat definition (for HTML onclick)
function toggleChat() {
  const chatWindow = document.getElementById("chat-window");
  if (!chatWindow) {
    console.error("Chat window element not found!");
    return;
  }
  chatWindow.style.display = chatWindow.style.display === "none" ? "flex" : "none";
}
window.toggleChat = toggleChat;

document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("user-input");
  const sendButton = document.querySelector("#chat-input button");

  function addMessage(role, text) {
    const msg = document.createElement("div");
    msg.className = "message " + role;
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    addMessage("user", message);
    chatInput.value = "";

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + OPENAI_API_KEY,
    };

    let threadId = sessionStorage.getItem("thread_id");
    if (!threadId) {
      const res = await fetch("https://api.openai.com/v1/threads", {
        method: "POST",
        headers,
      });
      const data = await res.json();
      threadId = data.id;
      sessionStorage.setItem("thread_id", threadId);
    }

    await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        role: "user",
        content: message,
      }),
    });

    const runRes = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
      method: "POST",
      headers,
      body: JSON.stringify({ assistant_id: ASSISTANT_ID }),
    });

    const runData = await runRes.json();
    let status = runData.status;
    while (status === "queued" || status === "in_progress") {
      await new Promise((r) => setTimeout(r, 1000));
      const statusRes = await fetch(
        `https://api.openai.com/v1/threads/${threadId}/runs/${runData.id}`,
        {
          method: "GET",
          headers,
        }
      );
      const statusData = await statusRes.json();
      status = statusData.status;
    }

    const messagesRes = await fetch(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      {
        method: "GET",
        headers,
      }
    );

    const messagesData = await messagesRes.json();
    const latest = messagesData.data.find((m) => m.role === "assistant");

    if (latest) {
      addMessage("bot", latest.content[0].text.value);
    }
  }

  sendButton.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});
