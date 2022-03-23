import { initWelcome } from "./pages/welcome";
import { initInstructions } from "./pages/instrucciones";
import { initMove } from "./pages/partida";
import { initResults } from "./pages/resultado";

const BASE_PATH = "/desafio-m5";

const routes = [
  {
    path: /\/welcome/,
    component: initWelcome,
  },
  {
    path: /\/instrucciones/,
    component: initInstructions,
  },
  {
    path: /\/juego/,
    component: initMove,
  },
  {
    path: /\/resultado/,
    component: initResults,
  },
];

function isGithubPages() {
  return location.host.includes("github.io");
}

export function initRouter(container: Element) {
  function goTo(path) {
    const completePath = isGithubPages() ? BASE_PATH + path : path;
    history.pushState({}, "", completePath);
    handleRoute(completePath);
  }

  function handleRoute(route) {
    const newRoute = isGithubPages() ? route.replace(BASE_PATH, "") : route;
    for (const r of routes) {
      if (r.path.test(newRoute)) {
        const el = r.component({ goTo: goTo });

        if (container.firstChild) {
          container.firstChild.remove();
        }
        container.appendChild(el);
      }
    }
  }

  if (location.pathname == "/" || location.pathname == "/desafio-m5/") {
    goTo("/welcome");
  } else {
    handleRoute(location.pathname);
  }
  window.onpopstate = () => {
    handleRoute(location.pathname);
  };
}