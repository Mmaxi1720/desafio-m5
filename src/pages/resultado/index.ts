import { state } from "../../state";

const resultImages = {
  tie: require("url:../../../images/empate.svg"),
  win: require("url:../../../images/ganaste.svg"),
  loss: require("url:../../../images/perdiste.svg"),
};

export function initResults(param): HTMLElement {
  const div = document.createElement("div");
  div.className = "container__results";

  const currentState = state.getState();
  const currentGame = currentState.currentGame;
  const myPlay = currentGame.myPlay;
  const computerPlay = currentGame.computerPlay;
  const whoWins = state.whoWins(myPlay, computerPlay);

  let background;
  let imagen;
  if (whoWins === "ganaste") {
    imagen = resultImages.win;
    background = "rgba(136, 137, 73, 0.6)";
  } else if (whoWins === "perdiste") {
    imagen = resultImages.loss;
    background = "rgba(137, 73, 73, 0.6)";
  } else {
    imagen = resultImages.tie;
    background = "rgba(106, 112, 101, 0.6)";
  }

  const style = document.createElement("style");
  div.innerHTML = `
    <div>
      <img class="img__result" src="${imagen}">
      </div>
    <div class="board">
      <div>
        <h3>Score</h3>
      </div>
        <texto class="texto">Vos: ${currentState.history.myScore}</texto>
        <texto class="texto">Máquina: ${currentState.history.computerScore}</texto>
    </div>
    <btn-comp class="button again">Volver a Jugar</btn-comp>
    <btn-comp class="button back">Volver al Inicio</btn-comp>
  `;

  
  div.querySelector(".again").addEventListener("click", () => {
    param.goTo("./juego");
  });

  div.querySelector(".back").addEventListener("click", () => {
    param.goTo("/welcome");
  });
  style.innerHTML = `
      .container__results {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 667px;
        color: black;
        background-color: ${background};
      }
    .img__result {
      height: 230px;
      margin: 10px;
    }
    .board {
      height: 200px;
      width: 250px;
      display: flex;
      flex-direction: column;
      border: 10px solid;
      border-radius: 10px;
      margin: 0 auto;
      background-color: #fff;
    }
    .board  h3 {
      text-align: center;
      font-size: 30px;
      margin: 20px;
    }
    .board > text-comp {
      align-self: flex-end;
    }
    .texto{
      font-size: 30px;
      margin: 10px auto;
  }
    .again{
      font-size: 20px;
      margin: 10px;
      color:white;
    }
    .back {
      font-size: 20px;
      margin: 10px;
      color:white;
    }
    @media(min-width: 376px){
      .again{
        font-size: 30px;
        margin: 20px;

      }
      .back {
        font-size: 30px;
        margin: 20px;
        
      }
    }
  `;

  div.appendChild(style);
  return div;
}