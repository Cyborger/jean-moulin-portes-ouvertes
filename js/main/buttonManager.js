// Animations
const starter = document.querySelector(".start button");
const container = document.querySelector(".choice");
const backButton = document.querySelector("#retour");

// Démarre la selection de choix
starter.addEventListener("click", e => {
  container.style.display = "flex";
  backButton.style.display = "block";
  e.target.parentNode.style.display = "none";
});

backButton.addEventListener("click", e => {
  container.style.display = "none";
  backButton.style.display = "none";
  document.querySelector(".start").style.display = "flex";
});

// Redirections
document
  .querySelectorAll(".choice div button")[0]
  .addEventListener("click", () => {
    window.location.redirect("/circuit.html?parcours=lycee");
  });
document
  .querySelectorAll(".choice div button")[1]
  .addEventListener("click", () => {
    window.location.redirect("/circuit.html?parcours=college");
  });