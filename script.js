let isActivated = false;

function activateChat() {
  if (isActivated) return;
  document.getElementById("chat").classList.add("active");
  isActivated = true;
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim();
  if (!text) return;

  appendMessage("user", text);
  input.value = "";

  fetch("/api/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  })
    .then(res => res.json())
    .then(data => {
      appendMessage("ai", data.reply || "추천에 실패했어요.");
    })
    .catch(() => appendMessage("ai", "오류가 발생했어요."));
}

function appendMessage(sender, text) {
  const box = document.createElement("div");
  box.className = "message " + sender;
  box.innerText = text;
  document.getElementById("messages").appendChild(box);
}
