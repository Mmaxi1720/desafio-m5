const hands = {
    piedra: require("../../../images/piedra.png"),
    tijeras: require("url:../../../images/tijera.png"),
    papel: require("url:../../../images/papel.png"),
  };
  
  customElements.define(
    "hands-comp",
    class extends HTMLElement {
      shadow: ShadowRoot;
      constructor() {
        super();
      }
      connectedCallback() {
        this.render();
      }
      addListeners() {
        this.addEventListener("click", () => {
          const handClick = new CustomEvent("handClick", {
            detail: {
              handMove: this.getAttribute("hand"),
            },
          });
          this.dispatchEvent(handClick);
        });
      }
      render() {
        const shadow = this.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        const div = document.createElement("div");
        const hand = this.getAttribute("hand");
        


        div.innerHTML = `
          <img class="hand" src="${hands[hand]}" />
        `;
  
        style.innerHTML = `
        .hand{
        position: relative;
        top: 6px;
        }
      @media(min-width:376px){
        .hand{
        height: 200px;
        }
      }
        `;
  
        shadow.appendChild(style);
        shadow.appendChild(div);
      }
    }
  );