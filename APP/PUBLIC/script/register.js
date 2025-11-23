document.addEventListener("DOMContentLoaded", () => {
  // olho: mostra/oculta senha
  const eye = document.querySelector(".eye-icon");
  const pwd = document.querySelector("#password");

  if (eye && pwd) {
    const isHiddenInit = pwd.type === "password";
    eye.classList.toggle("hidden", isHiddenInit);
    eye.setAttribute("aria-pressed", String(!isHiddenInit));
    eye.textContent = isHiddenInit ? "👁️" : "🙈";

    function toggleEye() {
      const wasHidden = pwd.type === "password";
      pwd.type = wasHidden ? "text" : "password";

      const isNowHidden = pwd.type === "password";
      eye.classList.toggle("hidden", isNowHidden);
      eye.setAttribute("aria-pressed", String(!isNowHidden));
      eye.textContent = isNowHidden ? "👁️" : "🙈";

      eye.classList.add("pulse");
      setTimeout(() => eye.classList.remove("pulse"), 180);
    }

    eye.addEventListener("click", toggleEye);

    eye.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleEye();
      }
    });
  }

  // pequeno pulso no botão ao aparecer
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
