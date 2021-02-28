// Charge le circuit
async function load(){
    const currentURL = new URLSearchParams(window.location.search); // Récupère l'url actuelle
    const parcours = currentURL.get("parcours"); // Récupère le parcour actuel
    const parcoursDisponibles = ["college", "lycee"]; // Les parcours disponibles

    if(!parcoursDisponibles.includes(parcours)) return window.location.redirect("/"); // Regarde si on peut récuperer le parcours, sinon redirige
    document.title = `Jean Moulin | Visite ${parcours}`; // Change le titre du document

    const planRequest = await fetch("js/circuit/plan.json"); // Récupère le plan
    const plan = await planRequest.json();
}
load();