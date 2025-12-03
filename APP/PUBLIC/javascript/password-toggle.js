// password-toggle.js
document.addEventListener("DOMContentLoaded", function () {
  // Função para alternar a visibilidade da senha
  function togglePassword(button) {
    // Encontra o input de senha dentro do mesmo grupo
    const inputGroup = button.closest(".input-group");
    const input = inputGroup ? inputGroup.querySelector("input") : null;

    if (!input) return; // Sai se não encontrar o input

    // Alterna entre os tipos de input
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";

    // Atualiza o ícone
    const icon = button.querySelector("i");
    if (icon) {
      icon.className = isPassword ? "far fa-eye-slash" : "far fa-eye";
    }

    // Atualiza atributos de acessibilidade
    button.setAttribute("aria-pressed", isPassword ? "true" : "false");
    button.setAttribute(
      "aria-label",
      isPassword ? "Ocultar senha" : "Mostrar senha"
    );
  }

  // Adiciona os event listeners para todos os botões de olho
  document.querySelectorAll(".eye-icon").forEach((button) => {
    // Garante que o botão tenha um ícone
    if (!button.querySelector("i")) {
      const icon = document.createElement("i");
      icon.className = "far fa-eye";
      button.prepend(icon);
    }

    // Clique do mouse
    button.addEventListener("click", function (e) {
      e.preventDefault();
      togglePassword(this);
    });

    // Suporte a teclado (acessibilidade)
    button.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        togglePassword(this);
      }
    });
  });
});
