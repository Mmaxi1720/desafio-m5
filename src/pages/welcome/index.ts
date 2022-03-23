export function initWelcome(param): HTMLElement {
    const div = document.createElement("div");
    div.className = "container";
  
    div.innerHTML = `
    <text-comp variant="title">Piedra Papel o Tijeras</text-comp>
    <boton-el class="button">Empezar</boton-el>
    <div class="container__hand">
    
      <hands-comp hand="piedra"></hands-comp>
      <hands-comp hand="papel"></hands-comp>
      <hands-comp hand="tijeras"></hands-comp>
    </div>
    `;
    div.querySelector(".button").addEventListener("click", () => param.goTo("/instrucciones"));
    return div;
}