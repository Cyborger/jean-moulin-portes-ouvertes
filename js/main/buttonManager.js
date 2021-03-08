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
    window.modal({
      title: "Avant de commencer",
      description: "Avant de commencer la visite, voici une vidéo de la part de la direction afin de vous renseigner à propos du lycée dans la cité scolaire Jean Moulin",
      youtube: "KvxhWoSN-vg",
      button: "Continuer vers la visite"
    }, () => {
      window.location.redirect("/circuit.html?parcours=lycee");
    });
  });
  
document
  .querySelectorAll(".choice div button")[1]
  .addEventListener("click", () => {
    window.modal({
      title: "Avant de commencer",
      description: "Avant de commencer la visite, voici une vidéo de la part de la direction afin de vous renseigner à propos du collège dans la cité scolaire Jean Moulin (Pas de vidéos disponible pour l'instant)",
      button: "Continuer vers la visite"
    }, () => {
      window.location.redirect("/circuit.html?parcours=college");
    });
  });
