// puedes agregar animaciones de entrada aquí si deseas
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card, i) => {
    card.style.opacity = 0;
    setTimeout(() => {
      card.style.transition = "opacity 0.5s ease";
      card.style.opacity = 1;
    }, i * 100);
  });
});
window.scrollTo(0, 0);
