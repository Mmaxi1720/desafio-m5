customElements.define(
  "boton-el",
  class extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.render();
    }
    render() {
      const shadow = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      const buttonEl = document.createElement("button");

      buttonEl.textContent = this.textContent;
      buttonEl.className = "boton";

      style.innerHTML = `
          .boton{
            width: 300px;
            height: 75px;
            background-color: #006CFC;
            color: #ffff;
            font-size: 40px;
            border: 10px solid #001997;
            border-radius: 10px;
            display: block;
            margin: 35px auto;
        }
        @media(min-width: 376px){
        .boton {
          }
        }
        .btn:hover {
          cursor: pointer;
        }
      `;

      shadow.appendChild(style);
      shadow.appendChild(buttonEl);
    }
  }
);