import { Box } from "./viou.js";

// Classes
class ClickedButtons {
  // Permet de désengorger la classe Sidebar
  constructor() {
    this.clicked = JSON.parse(localStorage.getItem("ClickedButtons"));

    if (this.clicked === null) {
      // Préviens des cas où ClickedButtons n'est pas encore défini dans le localStorage
      this.clicked = [];
    }
  }

  addClicked(button) {
    // Permet d'ajouter un bouton à la liste des boutons cliqués au localStorage
    if (this.getClicked(button) === undefined) {
      this.clicked.push(
        `${button.parcours.slice(0, 1)}${button.priority}${button.batiment}${button.name.slice(0, 3)}${button.name.slice(-3)}`
      ); // Le premier argument permet de donner un identifiant unique au bouton
      localStorage.setItem("ClickedButtons", JSON.stringify(this.clicked));
    }
  }

  getClicked(button) {
    // Permet de trouver si le bouton a déjà été cliqué (retourne undefined le cas échéant)
    return this.clicked.find(
      (element) =>
        element ===
        `${button.parcours.slice(0, 1)}${button.priority}${button.batiment}${button.name.slice(0, 3)}${button.name.slice(-3)}`
    );
  }
}

class Sidebar {
  constructor(parent) {
    this.parent = parent;
    this.opened = false;

    this.buttons = [
      { name: "Points d'Intérêt", buttons: [] },
      { name: "Matières Communes", buttons: [] },
      { name: "Spécialités", buttons: [] },
      { name: "Options", buttons: [] },
    ];
  }

  commit() {
    this.parent.innerHTML = ""; // Permet de mettre à jour le contenu en supprimant celui existant
    this.opened = true; // Change le status de la sidebar

    this.parent.appendChild(this.titleHTML);
    this.parent.appendChild(this.descriptionHTML);

    const clickedButtons = new ClickedButtons();

    for (const element of this.buttons) {
      if (element.buttons.length !== 0) {
        // Pour éviter la création d'un sous-titre inutile
        const subtitleHTML = document.createElement("span");
        subtitleHTML.className = "subtitle";
        subtitleHTML.innerHTML = element.name;

        this.parent.appendChild(subtitleHTML);

        const subjectsHTML = document.createElement("div");
        subjectsHTML.className = "subjects";

        for (const button of element.buttons) {
          const buttonHTML = document.createElement("button");
          buttonHTML.type = "button";
          buttonHTML.innerText = button.name;

          if (clickedButtons.getClicked(button) !== undefined) {
            buttonHTML.title = "Vu";
            buttonHTML.classList.add("viewed");
          }

          buttonHTML.addEventListener("click", () => {
            clickedButtons.addClicked(button);
            const parcours = button[button.parcours];

            //Ouvre la box adéquat
            /* const documentsActu = {
                texte:button.
              videos: parcours?.videos,
              animation: parcours?.powtoon ?? parcours?.genially,
            };*/
            console.log(parcours);
            const currentBox = new Box("details", {
              texte: { content: parcours.texte, type: "p" },
              videos: {
                content: parcours.videos,
                type: "iframe",
              },
              animation: { content: [parcours.powtoon ?? parcours.genially], type: "iframe" },
            });

            currentBox.mount();
            if (document.getElementById("diaporama")) diapoImg();
            if (document.getElementById("videos")) {
              videoIntegre();
            }
            enhaut();

            buttonHTML.title = "Vu";
            buttonHTML.classList.add("viewed");
          });

          subjectsHTML.appendChild(buttonHTML);
        }

        this.parent.appendChild(subjectsHTML);
        element.buttons = []; // Réinitialise la liste de boutons afin d'éviter l'empilement
      }
    }

    this.parent.style.transform = "translate(-100%)"; // Afin d'afficher la sidebar
  }

  close() {
    this.parent.style.transform = "translate(0)"; /* Afin de cacher la sidebar */
  }

  addButton(button) {
    this.buttons[button.priority].buttons.push(button);
  }

  set title(value) {
    this.titleHTML = document.createElement("span");
    this.titleHTML.className = "title";
    this.titleHTML.innerHTML = value;
  }

  set description(value) {
    this.descriptionHTML = document.createElement("span");
    this.descriptionHTML.className = "description";
    this.descriptionHTML.innerHTML = value;
  }
}

// Fonctions
function offset(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

// Charge le circuit
async function load() {
  const currentURL = new URLSearchParams(window.location.search); // Récupère l'url actuelle
  const parcours = currentURL.get("parcours"); // Récupère le parcours actuel
  const parcoursDisponibles = ["college", "lycee"]; // Les parcours disponibles

  if (!parcoursDisponibles.includes(parcours)) return window.location.redirect("/"); // Regarde si on peut récupérer le parcours, sinon redirige
  document.title = `Jean Moulin | Visite ${parcours}`; // Change le titre du document

  const planRequest = await fetch("js/circuit/plan.json"); // Récupère le plan
  const plan = await planRequest.json();

  const svgPaths = document.querySelectorAll("path");
  const side = new Sidebar(document.querySelector(".side"));
  const backButton = document.querySelector("#retour");

  for (const svgPath of svgPaths) {
    svgPath.addEventListener("click", () => {
      // Ouvre la sidebar avec les éléments adaptés
      if (side.opened) return; // La sidebar est déjà ouverte donc pas de changement de batiments
      const batiment = plan.filter((element) => element.id === svgPath.id)[0]; // Permet de récupérer les variables du plan pour le bâtiment cliqué

      side.title = ["Self", "EPS"].includes(svgPath.id) ? svgPath.id : `Bâtiment ${svgPath.id}`;
      side.description = batiment.description;

      svgPath.classList.add("selected");
      const notSelectedPaths = document.querySelectorAll("path:not(.selected)");
      for (const path of notSelectedPaths) {
        path.classList.add("hiddenPath");
      } // Cache les autres bâtiments

      backButton.style.display = "block"; // Montre le bouton retour

      // Ajout des boutons à la sidebar
      for (const subject of batiment.matieres) {
        if (subject[parcours] || subject.commun) {
          subject.parcours = parcours;
          subject.batiment = svgPath.id;
          side.addButton(subject);
        }
      }
      side.commit();
    });
  }

  backButton.addEventListener("click", () => {
    if (!side.opened) return; // Si la sidebar n'est pas ouverte, le bouton ne devrait pas être activé
    backButton.style.display = "none";

    const notSelectedPaths = document.querySelectorAll("path");
    for (const path of notSelectedPaths) {
      if (path.classList.contains("selected")) {
        path.classList.remove("selected");
      } // Si le bâtiment itéré était sélectionné, on supprime la classe selected
      else {
        path.classList.remove("hiddenPath");
      } // Sinon on supprime la classe hiddenPath
    } // Remontre tous les bâtiments

    side.opened = false; // Change le booléen
    side.close(); // Ferme la sidebar
  });
}

document.querySelector("#retourmenu").addEventListener("click", () => {
  window.location.redirect("/");
});
load();
