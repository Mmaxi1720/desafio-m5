export function initInstructions(param): HTMLElement {
    const div = document.createElement("div");
    div.className = "container";
    div.innerHTML = `
    
      <text-comp variant="large">Presioná jugar y elegí: piedra, papel o tijera antes de que pasen los 5 segundos.</text-comp>
      <boton-el class="button">Jugar</boton-el>
      <div class="container__hand">
      <hands-comp hand="piedra"></hands-comp>
      <hands-comp hand="papel"></hands-comp>
      <hands-comp hand="tijeras"></hands-comp>
    </div>
      
    `;
;
    div
      .querySelector(".button")
      .addEventListener("click", () => param.goTo("/juego"));
  
    return div;
  }