import "./components/boton"
import "./components/titulo"
import "./components/manos"
import { initRouter } from "./router";
import { state } from "./state";


(function () {
    state.getStorage();
    const rootEl = document.querySelector(".root");
    initRouter(rootEl);
    
})();