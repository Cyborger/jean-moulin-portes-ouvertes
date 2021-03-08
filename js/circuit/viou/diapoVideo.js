// Partie video

const diapoVideo = document.querySelector(".b-videos").children;
console.log(diapoVideo);
function changeVideo(index) {
  for (const video of diapoVideo) {
    video.style.display = "none";
  }
  diapoVideo[index].style.display = "flex";
}

changeVideo(0);

let acc = 0;

const pushed = document.getElementsByClassName("zmdi-videos");
pushed[0].addEventListener("click", (e) => {
  acc -= 1;
  if (acc < 0) {
    acc = diapo.length - 1;
  }
  changeVideo(acc);
});

pushed[1].addEventListener("click", (e) => {
  acc += 1;
  if (acc > diapo.length - 1) {
    acc = 0;
  }
  changeVideo(acc);
});