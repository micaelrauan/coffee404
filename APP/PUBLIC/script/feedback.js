const form = document.getElementById("feedbackForm");
const statusMsg = document.getElementById("statusMsg");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  statusMsg.style.opacity = 1;
  statusMsg.textContent = "Enviando...";
  statusMsg.style.color = "#555";

  setTimeout(() => {
    statusMsg.textContent = "Feedback enviado com sucesso! Obrigado ❤️";
    statusMsg.style.color = "green";

    form.reset();
  }, 1200);
});
