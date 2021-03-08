let buttons;
let elements;
let closer;

function enhaut() {
  buttons = document.querySelectorAll(".choose");
  elements = document.querySelectorAll(".receptacle");

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

  closer = document.querySelector(".close");
  closer.addEventListener("click", (e) => {
    document.querySelector(".parent").remove();
  });
}
