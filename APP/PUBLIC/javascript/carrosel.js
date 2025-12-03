let slides = document.querySelectorAll(".slide");
let index = 0;

function nextSlide() {
  if (!slides || slides.length === 0) return;
  slides[index].classList.remove("active");

  index = (index + 1) % slides.length;

  slides[index].classList.add("active");
}

function initCarousel() {
  // (re)coleto os slides caso o script tenha sido executado antes do DOM estar pronto
  slides = document.querySelectorAll(".slide");
  if (!slides || slides.length === 0) return;

  // Mostrar o primeiro slide imediatamente ao abrir a página
  index = 0;
  slides[index].classList.add("active");

  // Iniciar autoplay
  setInterval(nextSlide, 5000); // troca a cada 5 segundos
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCarousel);
} else {
  initCarousel();
}
