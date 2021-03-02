// Fonctions
function offset(el) {
    const rect = el.getBoundingClientRect(),
          scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
          scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

// Charge le circuit
async function load(){
    const currentURL = new URLSearchParams(window.location.search); // Récupère l'url actuelle
    const parcours = currentURL.get("parcours"); // Récupère le parcour actuel
    const parcoursDisponibles = ["college", "lycee"]; // Les parcours disponibles

    if(!parcoursDisponibles.includes(parcours)) return window.location.redirect("/"); // Regarde si on peut récuperer le parcours, sinon redirige
    document.title = `Jean Moulin | Visite ${parcours}`; // Change le titre du document

    const planRequest = await fetch("js/circuit/plan.json"); // Récupère le plan
    const plan = await planRequest.json();

    const svgPaths = document.querySelectorAll("path");
    const svgMain = document.querySelector("#svgContainer");

    for (const svgPath of svgPaths){
        svgPath.addEventListener("click", e => {

            const _offset = offset(svgPath);
            svgMain.style.transform = `translate(-${Math.floor(_offset.left)}px, ${Math.floor(_offset.top)}px) scale(2)`;
        });
    }
}
load();