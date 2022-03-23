import { state } from "../../state";

export function initMove(param): HTMLElement {
  let counter = 100;
  const countdown = setInterval(() => {
    counter--;
    const counterEl = div.querySelector(".master-circle");
    counterEl.textContent = String(counter);

    if (counter < 0) {
      clearInterval(countdown);
      param.goTo("/instrucciones");
    }
  }, 1000);
  const div = document.createElement("div");
  div.className = "container";
  div.innerHTML = `
  <div class="container__hand">
  <hands-comp hand="piedra" class="rock__bottom disabled"></hands-comp>
  <hands-comp hand="papel" class="paper__bottom disabled"></hands-comp>
  <hands-comp hand="tijeras" class="scissors__bottom disabled"></hands-comp>
</div>

    <div class="hands__top">
      <hands-comp hand="piedra" class="rock__top hand-display-none"></hands-comp>
      <hands-comp hand="papel" class="paper__top hand-display-none"></hands-comp>
      <hands-comp hand="tijeras" class="scissors__top hand-display-none"></hands-comp>
    </div>

    <div class="master-circle">${counter}</div>
  
  `;

  const style = document.createElement("style");
  style.innerHTML = `
  .container__hand {
    margin: 0 30px;
    position: relative;
    top: 420px;
};
    .hands__top {
      transform: rotate(180deg);
      display: flex;
      align-items: center;
      position: absolute;
      top: 0;
    }
    .actived {
      display: inherit;
      transform: translateY(-30px);
      transition: all 0.5s;
    }
    .disabled {
      opacity: 60%;
    }
    .hand-display-none {
      display: none;
    }
    .active-hands{
      width
    }
    .actived-hands-top {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .actived-hand-top {
      display: flex;
      transform: translateY(-30px);
      transition: all 0.5s;
    }
    hands-comp:hover {
      cursor:pointer
    }
    .master-circle {
      width: 150px;
      height: 150px;
      box-shadow: 0 0 0 1.875vmin, inset 3.75vmin 3.75vmin 7.5vmin rgba(0, 0, 0, 0.125), 3.75vmin 3.75vmin 7.5vmin rgba(0, 0, 0, 0.125);
      font-size: 100px;
      position: absolute;
      top: 33%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      color: #000;
      border-radius: 50%;
      border: 30px;
      font-weight: 700;
    }
    @media (min-width: 420px) {
      .master-circle {
        width: 250px;
        height: 250px;
        box-shadow: 0 0 0 1.25vmin, inset 2.5vmin 2.5vmin 5vmin rgba(0, 0, 0, 0.125), 2.5vmin 2.5vmin 5vmin rgba(0, 0, 0, 0.125);
        font-size: 25vmin;
        text-shadow: 2.5vmin 2.5vmin 5vmin rgba(0, 0, 0, 0.125);
      }
    }
    .master-circle:before {
      content: "";
      -webkit-animation: 5s 1s forwards timer_countdown, 1s 0.875s 15 timer_beat;
              animation: 5s 1s forwards timer_countdown, 1s 0.875s 15 timer_beat;
      color: #000;
    }
    @-webkit-keyframes timer_beat {
      40%, 80% {
        transform: none;
      }
      50% {
        transform: scale(1.125);
      }
    }
    @keyframes timer_beat {
      40%, 80% {
        transform: none;
      }
      50% {
        transform: scale(1.125);
      }
    }
    .master-circle:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      z-index: -100;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.125);
      -webkit-animation: 5s 1s linear forwards timer_indicator;
              animation: 5s 1s linear forwards timer_indicator;
    }
    @-webkit-keyframes timer_indicator {
      100% {
        transform: translateY(100%);
      }
    }
    @keyframes timer_indicator {
      100% {
        transform: translateY(100%);
      }
    }
    `;

  const countdownEl = div.querySelector(".master-circle");
  const handsDiv = div.querySelector(".container__hand");

  const handsTop = div.querySelector(".hands__top");
  const handRockTop = div.querySelector(".rock__top");
  const handPaperTop = div.querySelector(".paper__top");
  const handScissorsTop = div.querySelector(".scissors__top");

  const handsBottom = div.querySelector(".container__hand").children;
  const handRockBottom = div.querySelector(".rock__bottom");
  const handScissorsBottom = div.querySelector(".scissors__bottom");
  const handPaperBottom = div.querySelector(".paper__bottom");

  for (const hand of handsBottom) {
    hand.addEventListener("click", () => {
      const type = hand.getAttribute("hand");
      clearInterval(countdown);

      if (type === "tijeras") {
        state.setMove("tijeras");
        activeHands("tijeras");
      } else if (type === "piedra") {
        state.setMove("piedra");
        activeHands("piedra");
      } else if (type === "papel") {
        state.setMove("papel");
        activeHands("papel");
      }
    });
  }

  function activeHands(hand) {
    if (hand === "tijeras") {
      handScissorsBottom.classList.remove("disabled");
      handScissorsBottom.classList.add("actived");
      setTimeout(() => {
        handRockBottom.classList.add("hand-display-none");
        handPaperBottom.classList.add("hand-display-none");
      }, 1500);
    } else if (hand === "piedra") {
      handRockBottom.classList.remove("disabled");
      handRockBottom.classList.add("actived");
      setTimeout(() => {
        handScissorsBottom.classList.add("hand-display-none");
        handPaperBottom.classList.add("hand-display-none");
      }, 1500);
    } else if (hand === "papel") {
      handPaperBottom.classList.remove("disabled");
      handPaperBottom.classList.add("actived");
      setTimeout(() => {
        handScissorsBottom.classList.add("hand-display-none");
        handRockBottom.classList.add("hand-display-none");
      }, 1500);
    }

    setTimeout(() => {
      const machineMove = state.getState().currentGame.computerPlay;
      countdownEl.remove();

      handsDiv.classList.add("active-hands");
      handsTop.classList.add("actived-hands-top");

      if (machineMove == "tijeras") {
        handScissorsTop.classList.add("actived-hand-top");
      }
      if (machineMove == "piedra") {
        handRockTop.classList.add("actived-hand-top");
      }
      if (machineMove == "papel") {
        handPaperTop.classList.add("actived-hand-top");
      }

      setTimeout(() => {
        param.goTo("/resultado");
      }, 1500);
    }, 1500);
  }

  div.appendChild(style);
  return div;
}