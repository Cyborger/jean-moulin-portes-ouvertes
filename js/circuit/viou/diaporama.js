// Partie images

const diapo = document.querySelector(".b-diaporama").children;

function changePicture(index) {
  for (const image of diapo) {
    image.style.display = "none";
  }
  diapo[index].style.display = "flex";
}

changePicture(0);

let actualIndex = 0;

const pushers = document.querySelectorAll(".zmdi-diaporama");
pushers[0].addEventListener("click", (e) => {
  actualIndex -= 1;
  if (actualIndex < 0) {
    actualIndex = diapo.length - 1;
  }
  changePicture(actualIndex);
});

pushers[1].addEventListener("click", (e) => {
  actualIndex += 1;
  if (actualIndex > diapo.length - 1) {
    actualIndex = 0;
  }
  changePicture(actualIndex);
});