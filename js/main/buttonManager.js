// Animations
const starter = document.querySelector(".start");
const container = document.querySelector(".choice");

starter.addEventListener("click", (e) => {
  container.style.display = "flex";
  e.target.style.display = "none";
  setTimeout(() => {
    container.style.opacity = 1;
  }, 1000);
});

// Redirections
document.querySelectorAll(".choice div button")[0].addEventListener("click", () => { window.location.redirect("/circuit.html?parcours=lycee"); });
document.querySelectorAll(".choice div button")[1].addEventListener("click", () => { window.location.redirect("/circuit.html?parcours=college"); });