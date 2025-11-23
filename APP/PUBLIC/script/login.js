document.addEventListener("DOMContentLoaded", () => {
  // olho: mostra/oculta senha
  const eye = document.querySelector(".eye-icon");
  const pwd = document.querySelector("#password");
  if (eye && pwd) {
    // estado inicial do ícone
    const isHiddenInit = pwd.type === "password";
    eye.classList.toggle("hidden", isHiddenInit);
    eye.setAttribute("aria-pressed", String(!isHiddenInit));
    eye.textContent = isHiddenInit ? "👁️" : "🙈";

    function toggleEye() {
      const wasHidden = pwd.type === "password";
      pwd.type = wasHidden ? "text" : "password";
      // atualiza classe/aria/text
      const isNowHidden = pwd.type === "password";
      eye.classList.toggle("hidden", isNowHidden);
      eye.setAttribute("aria-pressed", String(!isNowHidden));
      eye.textContent = isNowHidden ? "👁️" : "🙈";
      // feedback visual rápido
      eye.classList.add("pulse");
      setTimeout(() => eye.classList.remove("pulse"), 180);
    }

    eye.addEventListener("click", toggleEye);
    // teclado: Enter / Espaço
    eye.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleEye();
      }
    });
  }

  // pequeno pulso no botão na entrada
  const btn = document.querySelector(".btn-login");
  if (btn)
    btn.animate(
      [
        { transform: "scale(.98)" },
        { transform: "scale(1.02)" },
        { transform: "scale(1)" },
      ],
      { duration: 640, easing: "ease-out" }
    );
});
