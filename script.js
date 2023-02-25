`use strict`

let x = document.getElementById("x");
let o = document.getElementById("o");
let choose_buttons = document.getElementsByClassName("choose_container")
let cpu = document.getElementById("CPU");
let vs_player = document.getElementById("PLAYER");

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

vs_player.addEventListener("click", () => {
    
});