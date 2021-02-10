const starter = document.querySelector(".start");
const container = document.querySelector(".choice");

starter.addEventListener("click", (e) => {
  container.style.display = "flex";
  e.target.style.display = "none";
  setTimeout(() => {
    container.style.opacity = 1;
  }, 1000);
});
