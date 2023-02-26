`use strict`
// menu elements

let menu = document.querySelector(".menu");
let choose_buttons = document.getElementsByClassName("choose_container");
let x = document.getElementById("x");
let o = document.getElementById("o");
let cpu = document.getElementById("CPU");
let vs_player = document.getElementById("PLAYER");

// game elements

let game = document.querySelector(".game");
let restart = document.querySelector(".restart");
// let boxes = document.getElementsByClassName("box");
let turn = document.getElementById("turn");

// menu functions, variables and eventlisteners

let first_player;

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

game.style.display = "none";

vs_player.addEventListener("click", () => {
    menu.style.display = "none";
    game.style.display = "flex"
});



// game functions, variables and eventlisteners

restart.addEventListener("click", () => {
    game.style.display = "none"
    menu.style.display = "flex";
});

player_turn = "x";

let boxes = document.querySelectorAll(".box");

let clickedButtons = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];


Array.from(boxes).forEach(element => {
    element.dataset.row = Math.floor(element.value / 3);
    element.dataset.col = element.value % 3;
    element.addEventListener("click", handleClick);
});


function handleClick(event) {
    let element = event.target;
    let row = element.dataset.row;
    let col = element.dataset.col;

    
    if (player_turn == "x") {
        element.style.backgroundImage = "url(./assets/icon-x.svg)";
        clickedButtons[row][col] = "x";
        player_turn = "o";
        turn.firstElementChild.innerHTML = '<path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/>';
        
    } else {
        element.style.backgroundImage = "url(./assets/icon-o.svg)";
        clickedButtons[row][col] = "o";
        player_turn = "x";
        turn.firstElementChild.innerHTML = '<path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="var(--gray-dark)" fill-rule="evenodd"/>';
    }
    // Remove the event listener from the clicked button
    element.removeEventListener("click", handleClick);
    console.log(clickedButtons);
    
}

// let clickedButtons = [
//     [0, 0, 0],
//     [0, 0, 0],
//     [0, 0, 0]
// ];

// Array.from(boxes).forEach(element => {
//     element.addEventListener("click", () => {
//         let row = Math.floor((element.value - 1) / 3);
//         let col = (element.value - 1) % 3;

//         if (player_turn == "x") {
//             element.style.backgroundImage = "url(./assets/icon-x.svg)";
//             player_turn = "o";
//             turn.firstElementChild.innerHTML = '<path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/>';
//             clickedButtons[row][col] = "x";
//             console.log(clickedButtons);    
//         } else {
//             element.style.backgroundImage = "url(./assets/icon-o.svg)";
//             player_turn = "x";
//             turn.firstElementChild.innerHTML = '<path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="var(--gray-dark)" fill-rule="evenodd"/>';            
//             clickedButtons[row][col] = "o";
//             console.log(clickedButtons);    
//         }
//     });
    
// });


// for (let clickedButton of clickedButtons) {
//     if (clickedButton != 0) {
//         clickedButton
//     }
// }






