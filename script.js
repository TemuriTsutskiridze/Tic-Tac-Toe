`use strict`;

const choiceButtons = document.querySelectorAll(".choose_container");
const game_vs_palyer = document.getElementById("PLAYER");
const board_boxes = document.querySelectorAll(".box");
const menu = document.querySelector(".menu");
const game = document.querySelector(".game");
const end_game = document.querySelector(".end-game");
const turnEl = document.getElementById("turnIcon");
const winnerIconEl = document.querySelector(".winner_icon");
const tiedEL = document.querySelector(".tied");
const player_winsEl = document.querySelector(".player");
const winner_text = document.getElementById("winner_text");
const scoreXEl = document.querySelector(".player_x_points");
const scoreOEl = document.querySelector(".player_o_points");
const scoreTieEl = document.querySelector(".tie_points");
const nextRoundButton = document.querySelector(".next");
const quitButton = document.querySelector(".quit");
const restartButton = document.querySelector(".restart");

let xArray = [];
let oArray = [];
let freeButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let first_player = null;
const choice = (icon) => {
  if (icon === "x") {
    choiceButtons[0].classList.add("active");
    choiceButtons[1].classList.remove("active");
    first_player = "x";
  } else {
    choiceButtons[0].classList.remove("active");
    choiceButtons[1].classList.add("active");
    first_player = "o";
  }
};

const hoverEffects = () => {
  for (let i = 0; i < freeButtons.length; i++) {
    let freeButtonIndex = freeButtons[i];
    if (turn === "x") {
      board_boxes[freeButtonIndex].classList.add("x_hover");
      board_boxes[freeButtonIndex].classList.remove("o_hover");
    } else {
      board_boxes[freeButtonIndex].classList.add("o_hover");
      board_boxes[freeButtonIndex].classList.remove("x_hover");
    }
  }
};

const clickFunction = () => {
  for (let i = 0; i < board_boxes.length; i++) {
    board_boxes[i].onclick = (event) => {
      let spliceIndex = freeButtons.indexOf(i);
      freeButtons.splice(spliceIndex, 1);

      event.target.classList.remove("x_hover");
      event.target.classList.remove("o_hover");
      const icon = document.createElement("img");

      icon.classList.add("game-icon");
      if (turn === "x") {
        icon.src = "/assets/icon-x.svg";
        turn = "o";
        turnEl.innerHTML =
          '<path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="var(--gray-dark)"/>';
        xArray.push(i);
        console.log("x   " + xArray);
      } else {
        icon.src = "/assets/icon-o.svg";
        turn = "x";
        turnEl.innerHTML =
          '<path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="var(--gray-dark)" fill-rule="evenodd"/>';
        oArray.push(i);
        console.log("o   " + oArray);
      }
      event.target.append(icon);
      event.target.onclick = null;
      hoverEffects();
      checkForWin();
    };
  }
};

let mode = null;
let turn = null;
const startGame = (modeParameter) => {
  if (first_player) {
    menu.style.display = "none";
    game.style.display = "flex";
    mode = modeParameter;
    turn = "x";
    hoverEffects();
    clickFunction();
  }
};

let scoreX = localStorage.getItem("scoreX") || 0;
scoreXEl.textContent = scoreX;
let scoreO = localStorage.getItem("scoreO") || 0;
scoreOEl.textContent = scoreO;
let scoreTie = localStorage.getItem("scoreTie") || 0;
scoreTieEl.textContent = scoreTie;
let countForTie = 0;
const checkForWin = () => {
  for (let winCombo of winCombos) {
    if (winCombo.every((element) => xArray.includes(element))) {
      colorWinCombo(
        "var(--blue-light)",
        "hue-rotate(24deg) saturate(35%) brightness(19%)",
        winCombo
      );

      winnerIconEl.src = "assets/icon-x.svg";
      tiedEL.style.display = "none";
      deleteClickOnBoxes();
      scoreX++;
      localStorage.setItem("scoreX", scoreX);
      scoreXEl.textContent = scoreX;
      winnerIconEl.style.display = "flex";
      player_winsEl.style.display = "flex";
      winner_text.style.display = "flex";
      setTimeout(() => {
        end_game.style.display = "flex";
      }, 1000);
      countForTie = 0;
      return;
    } else if (winCombo.every((element) => oArray.includes(element))) {
      colorWinCombo(
        "var(--yellow-light)",
        "hue-rotate(160deg) saturate(35%) brightness(19%)",
        winCombo
      );

      winnerIconEl.src = "assets/icon-o.svg";
      tiedEL.style.display = "none";
      scoreO++;
      localStorage.setItem("scoreO", scoreO);
      scoreOEl.textContent = scoreO;
      winnerIconEl.style.display = "flex";
      player_winsEl.style.display = "flex";
      winner_text.style.display = "flex";
      deleteClickOnBoxes();
      setTimeout(() => {
        end_game.style.display = "flex";
      }, 1000);
      countForTie = 0;
      return;
    }
  }
  countForTie++;
  if (countForTie == 9) {
    console.log("tied");
    winnerIconEl.style.display = "none";
    tiedEL.style.display = "flex";
    player_winsEl.style.display = "none";
    winner_text.style.display = "none";
    scoreTie++;
    localStorage.setItem("scoreTie", scoreTie);
    scoreTieEl.textContent = scoreTie;
    setTimeout(() => {
      end_game.style.display = "flex";
    }, 1000);
    countForTie = 0;
  }
};

const reset = () => {
  xArray = [];
  oArray = [];
  freeButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  end_game.style.display = "none";
  board_boxes.forEach((box) => {
    box.innerHTML = null;
    box.style.backgroundColor = "var(--navy-light)";
    box.style.backgroundRepeat = "no-repeat";
    box.style.backgroundPosition = "center";
  });
  clickFunction();
  hoverEffects();
  countForTie = 0;
};

nextRoundButton.addEventListener("click", reset);

quitButton.addEventListener("click", () => {
  reset();
  game.style.display = "none";
  menu.style.display = "flex";
});

const deleteClickOnBoxes = () => {
  for (let i = 0; i < board_boxes.length; i++) {
    board_boxes[i].onclick = null;
  }
};

restartButton.addEventListener("click", reset);

const colorWinCombo = (backgroundColor, iconColor, winCombo) => {
  for (let i = 0; i < winCombo.length; i++) {
    let boxIndex = winCombo[i];
    board_boxes[boxIndex].style.background = backgroundColor;
    board_boxes[boxIndex].firstElementChild.style.filter = iconColor;
  }
};
