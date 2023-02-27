`use strict`
// -------------------------- menu elements ----------------------//

let menu = document.querySelector(".menu");
let choose_buttons = document.getElementsByClassName("choose_container");
let x = document.getElementById("x");
let o = document.getElementById("o");
let cpu = document.getElementById("CPU");
let vs_player = document.getElementById("PLAYER");

// ---------------------- game elements ---------------------- //

let game = document.querySelector(".game");
let restart = document.querySelector(".restart");
let boxes = document.querySelectorAll(".box");
let turn = document.getElementById("turn");
let player_x = document.querySelector(".player_x");
let player_x_points = document.querySelector(".player_x_points");
let player_o = document.querySelector(".player_o");
let player_o_points = document.querySelector(".player_o_points");

// --------------------- win elements -------------------- //

let win_background = document.querySelector(".win_background");
let win_icon = document.querySelector(".winner_icon");
let winner_text = document.querySelector(".winner_text");
let winner_container = document.querySelector(".winner");
let player = document.querySelector(".player");
let quit = document.querySelector(".quit");
let next_round = document.querySelector(".next");

// ---------- menu functions, variables and eventlisteners ------------ //

game.style.display = "none";
win_background.style.display = "none";

let first_player;

// adding and removing hover classes to game grid elements

Array.from(choose_buttons).forEach(element => {
    element.addEventListener("click", () => {
        if (element.id == "x") {
            x.classList.add("active");
            o.classList.remove("active");
            first_player = "x"
        } else {
            o.classList.add("active");
            x.classList.remove("active");
            first_player = "o"
        }
    })
});


// player vs player mode 
vs_player.addEventListener("click", () => {
    if (first_player != undefined) {
        menu.style.display = "none";
        game.style.display = "flex"
        if (first_player == "x") {
            player_x.textContent = "X (P1)";
            player_o.textContent = "O (P2)";
        } else {
            player_x.textContent = "X (P2)";
            player_o.textContent = "O (P1)";
        }
    }
});

quit.addEventListener("click", () => {
    win_background.style.display = "none";
    reset();
});

next_round.addEventListener("click", () => {
    win_background.style.display = "none";
    reset();
});


// --------------------- game functions, variables and eventlisteners --------------------- //



let player_turn = "x";

let clickedButtons = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

reset();

restart.addEventListener("click", () => {
    win_background.style.display = "flex";
    player.textContent = "RESTART GAME?";
    winner_container.style.display = "none";
    quit.classList.add("restart_cancel_button");
    quit.classList.add("restart_button");
    quit.textContent = "NO, CANCEL";
    next_round.textContent = "YES, RESTART";
});

quit.addEventListener("click", () => {
    win_background.style.display = "none";
    game.style.display = "none";
    menu.style.display = "flex";
    player_turn = "x";
    reset();
});



// -------------------------- functions --------------------------- //

function reset() {
    Array.from(boxes).forEach((element, index) => {
        element.dataset.row = Math.floor(index / 3);
        element.dataset.col = index % 3;
        element.dataset.playerTurn = "x"; // set default player turn
        element.style.backgroundImage = "none";
        element.classList.add("x_hover");
        element.classList.remove("o_hover");
        element.addEventListener("click", handleClick);
    });

    quit.classList.remove("restart_cancel_button");
    quit.classList.remove("restart_button");
    quit.textContent = "QUIT";
    next_round.textContent = "NEXT ROUND";

    clickedButtons = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    player_turn = "x";
}

// functionality after click on game grid element
function handleClick(event) {
    let element = event.target;
    let row = element.dataset.row;
    let col = element.dataset.col;

    if (player_turn == "x") {
        element.style.backgroundImage = "url(./assets/icon-x.svg)";
        clickedButtons[row][col] = "x";
        player_turn = "o";
        turn.firstElementChild.innerHTML = '<path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="var(--gray-dark)"/>';
        // removing and adding hover classes to boxes that have not been clicked
        Array.from(boxes).forEach(box => {
            for (let row = 0; row <= 2; row++) {
                for (let col = 0; col <= 2; col++) {
                    if (typeof clickedButtons[row][col] === 'number') {
                        if (box.value == clickedButtons[row][col]) {
                            box.classList.remove("x_hover");
                            box.classList.add("o_hover");
                        }
                    }
                }
            }
        });
        element.classList.remove("x_hover");
        element.classList.remove("o_hover");
        checkForWin();
    } else if (player_turn == "o") {
        element.style.backgroundImage = "url(./assets/icon-o.svg)";
        clickedButtons[row][col] = "o";
        player_turn = "x";
        turn.firstElementChild.innerHTML = '<path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="var(--gray-dark)" fill-rule="evenodd"/>';
        // removing and adding hover classes to boxes that have not been clicked
        Array.from(boxes).forEach(box => {
            for (let row = 0; row <= 2; row++) {
                for (let col = 0; col <= 2; col++) {
                    if (typeof clickedButtons[row][col] === 'number') {
                        if (box.value == clickedButtons[row][col]) {
                            box.classList.remove("o_hover");
                            box.classList.add("x_hover");
                        }
                    }
                }
            }
        });;
        element.classList.remove("x_hover");
        element.classList.remove("o_hover");
        checkForWin();
    }

    // Remove the event listener from the clicked button
    element.removeEventListener("click", handleClick);
    console.log(clickedButtons);

    function checkForTie(array) {
        for (let i = 0; i <= 2; i++) {
          for (let j = 0; j <= 2; j++) {
            if (!isNaN(array[i][j])) {
              return false;
            }
          }
        }
        return true;
    }

    if (checkForTie(clickedButtons) == true && !win) {
        win_background.style.display = "flex";
        player.textContent = "ROUND TIED"
        winner_container.style.display = "none";
        player.classList.add("tied");
    }
}
let win;
// check for win positions
let checkForWin = function() {
    if ((clickedButtons[0][0] === clickedButtons[0][1] && clickedButtons[0][1] === clickedButtons[0][2]) ||
        (clickedButtons[1][0] === clickedButtons[1][1] && clickedButtons[1][1] === clickedButtons[1][2]) ||
        (clickedButtons[2][0] === clickedButtons[2][1] && clickedButtons[2][1] === clickedButtons[2][2]) ||
        (clickedButtons[0][0] === clickedButtons[1][0] && clickedButtons[1][0] === clickedButtons[2][0]) ||
        (clickedButtons[0][1] === clickedButtons[1][1] && clickedButtons[1][1] === clickedButtons[2][1]) ||
        (clickedButtons[0][2] === clickedButtons[1][2] && clickedButtons[1][2] === clickedButtons[2][2]) ||
        (clickedButtons[0][0] === clickedButtons[1][1] && clickedButtons[1][1] === clickedButtons[2][2]) ||
        (clickedButtons[0][2] === clickedButtons[1][1] && clickedButtons[1][1] === clickedButtons[2][0])) {
            if (player_turn == "x") {
                win = true;
                win_background.style.display = "flex";
                player.classList.remove("tied");
                winner_container.style.display = "flex";
                win_icon.src = "assets/icon-o.svg";
                winner_text.style.color = "var(--yellow-light)";
                if (first_player == "x") {
                    player.textContent = "PLAYER 1 WINS";
                } else if (first_player = "o"){
                    player.textContent = "PLAYER 2 WINS";
                }
                console.log("o");
            } else {
                win = true;
                win_background.style.display = "flex";
                player.classList.remove("tied");
                winner_container.style.display = "flex";
                win_icon.src = "assets/icon-x.svg";
                winner_text.style.color = "var(--blue-light)";
                if (first_player == "x") {
                    player.textContent = "PLAYER 1 WINS";
                } else if (first_player = "o"){
                    player.textContent = "PLAYER 2 WINS";
                }
                console.log("x");
            }
    }
}





