type Play = "piedra" | "papel" | "tijeras";

const state = {
  data: {
    currentGame: {
      computerPlay: "",
      myPlay: "",
    },
    history: {
      myScore: 0,
      computerScore: 0,
    },
  },
  listeners: [],

  getStorage() {
    const local = JSON.parse(localStorage.getItem("data"));
    if (localStorage.getItem("data")) {
      return (this.data.history = local);
    }
  },

  getState() {
    return this.data;
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    console.log("Soy el state y cambie", this.data);
    this.savedData();
  },

  suscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
  setScore() {
    const currentState = this.getState();

    const myPlay = this.getState().currentGame.myPlay;
    const computerPlay = this.getState().currentGame.computerPlay;
    const currentWhoWins = this.whoWins(myPlay, computerPlay);

    const myScore = currentState.history.myScore;
    const computerScore = currentState.history.computerScore;

    if (currentWhoWins === "ganaste") {
      return this.setState({
        ...currentState,
        history: {
          myScore: myScore + 1,
          computerScore: computerScore,
        },
      });
    } else if (currentWhoWins === "perdiste") {
      return this.setState({
        ...currentState,
        history: {
          myScore: myScore,
          computerScore: computerScore + 1,
        },
      });
    }
  },

  whoWins(myPlay: Play, computerPlay: Play) {
    const empateT: boolean = myPlay == "tijeras" && computerPlay == "tijeras";
    const empateP: boolean = myPlay == "piedra" && computerPlay == "piedra";
    const empatePapel: boolean = myPlay == "papel" && computerPlay == "papel";
    const empate = [empatePapel, empateP, empateT].includes(true);

    if (empate) {
      return "empate";
    }

    const ganeTij: boolean = myPlay == "tijeras" && computerPlay == "papel";
    const ganePiedra: boolean = myPlay == "piedra" && computerPlay == "tijeras";
    const ganePapel: boolean = myPlay == "papel" && computerPlay == "piedra";
    const ganaste = [ganePapel, ganePiedra, ganeTij].includes(true);

    if (ganaste) {
      return "ganaste";
    } else {
      return "perdiste";
    }
  },
  setMove(move: Play) {
    const currentState = this.getState();
    currentState.currentGame.myPlay = move;
    const machineMove = () => {
      const hands = ["tijeras", "piedra", "papel"];
      return hands[Math.floor(Math.random() * 3)];
    };
    currentState.currentGame.computerPlay = machineMove();
    this.setScore();
  },

  savedData() {
    const currentHistory = this.getState().history;
    localStorage.setItem("data", JSON.stringify(currentHistory));
  },
};

export { state };