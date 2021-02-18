// Fonction pour créer et charger le canvas
function createCanvas(){
    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    document.getElementById("circuit").appendChild(app.view);
      
    const img = new PIXI.Sprite.from("img/map.png");
    img.alpha = 0.7;
    img.anchor.set(0.1, 0.2);
    app.stage.addChild(img);
      
    document.addEventListener("mousemove", (e) => {
        img.position.x = (window.innerWidth / 2 - e.clientX) / 500;
        img.position.y = (window.innerHeight / 2 - e.clientY) / 500;
    });
    return app;
}

// Va afficher les 
function loadButtons(app, plan){
    const button = new PIXI.Sprite.from("img/button.png");
    button.buttonMode = true;
}

// Charge le circuit
async function load(){
    const app = createCanvas(); // Créer le canvas
    const planRequest = await fetch("js/circuit/plan.json"); // Récupère le plan
    const plan = await planRequest.json();
    loadButtons(app, plan);
}
load();