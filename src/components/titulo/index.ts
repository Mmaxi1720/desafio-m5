customElements.define(
    "text-comp",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const variant = this.getAttribute("variant") || "body";
        const shadow = this.attachShadow({ mode: "open" });
        const divEl = document.createElement("div");
        const style = document.createElement("style");
        divEl.className = "text";
  
        style.innerHTML = `
        .text {
          text-align: center;
          padding: 20px 20px 0;
          font-size: 40px;
          height: auto;
          width: 300px;
          margin: 0 auto;
          }
          .title {
          font-size: 65px;
          line-height: 85px;
          font-family: 'Fredoka One', cursive;
          }
        `;
        divEl.innerHTML = this.textContent;
  
        divEl.className = variant + " text";
        shadow.appendChild(style);
        shadow.appendChild(divEl);
      }
    }
  );