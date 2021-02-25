// Fonction pour créer et charger le canvas
function createCanvas(){
    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    document.getElementById("circuit").appendChild(app.view);
      
    const img = new PIXI.Sprite.from("img/map.png");
    img.alpha = 0.7;
    console.log()
    img.anchor.set((window.innerWidth / window.innerHeight) / 20)
    img.scale.set((window.innerWidth / window.innerHeight) * .6)
    app.stage.addChild(img);
      
    document.addEventListener("mousemove", (e) => {
        img.position.x = (window.innerWidth / 2 - e.clientX) / 500;
        img.position.y = (window.innerHeight / 2 - e.clientY) / 500;
    });
    return app;
}

// Va afficher les boutons
function loadButtons(app, plan, parcours){
    const button = new PIXI.Sprite.from("img/button.png");
    button.buttonMode = true;
}

// Charge le circuit
async function load(){
    const currentURL = new URLSearchParams(window.location.search); // Récupère l'url actuelle
    const parcours = currentURL.get("parcours"); // Récupère le parcour actuel
    const parcoursDisponibles = ["college", "lycee"]; // Les parcours disponibles

    if(!parcoursDisponibles.includes(parcours)) return window.location.redirect("/"); // Regarde si on peut récuperer le parcours, sinon redirige
    document.title = `Jean Moulin | Visite ${parcours}`; // Change le titre du document

    const app = createCanvas(); // Créer le canvas
    const planRequest = await fetch("js/circuit/plan.json"); // Récupère le plan
    const plan = await planRequest.json();
    loadButtons(app, plan, parcours);
}
load();