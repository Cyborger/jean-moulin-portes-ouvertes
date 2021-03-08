export class Box {
  constructor(
    id,
    elements = { texte: false, images: false, videos: false, animation: false }
  ) {
    this.id = id;
    this.elements = elements;
    this.compo = `
    <div class="centered">
    <div class="onglets">

    </div>
    <div class="close">

    </div>
    <div class="global">
    
    </div>
    <div>
  `;
    this.style = `
    .parent{
      width:100vw;
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      background-color:rgba(0,0,0,0.33);
    }

    .centered{
      background-color:red;
      height:70vh;
      width:70vw;
    }
  
    `;
  }
  mount() {
    const container = document.createElement("div");
    container.classList.add("parent");
    container.innerHTML = this.compo;

    const stylisation = document.createElement("style");
    stylisation.innerHTML = this.style;
    
    container.appendChild(stylisation);
    document.getElementById(this.id).appendChild(container);
  }
}
