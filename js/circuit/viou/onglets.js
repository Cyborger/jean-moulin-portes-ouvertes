const buttons = document.querySelectorAll(".choose");
const elements = document.querySelectorAll(".receptacle");

for (const button of buttons) {
  button.style.color = "grey";
  button.addEventListener("click", (e) => {
    for (const rebutton of buttons) {
      rebutton.style.color = "grey";
    }
    e.target.style.color = "white";
    for (const element of elements) {
      element.style.display = "none";
    }
    document.getElementById(`${button.className.split(" ")[1]}`).style.display = "flex";
  });
}
buttons[0].style.color = "white";

const closer = document.querySelector(".close");
closer.addEventListener("click", (e) => {
  document.getElementById("yo").remove();
});