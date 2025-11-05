console.log("hello, world!")

/* 
Get choice from computer
    Generate a random choice of R P or S
        Use random number generator to generate a value for rand_numb
        If rand_numb is less than or equal to 1/3 comp_choice = R, else if LTET 2/3 comp_choice = P, else comp_choice = S
Get choice from user
    Prompt user to enter R P or S
    Store users entry as user_choice
Compare choice from user vs. computer
    If user_choice === comp_choice print "tie"
    else if 
        user_choice === r && comp_choice = s 
        || 
        user_choice = p && comp_choice = r
        || user_choice = s && comp_choice = p
    return "You win!"
    else
        return "You lose!"
*/

const select = document.querySelector("#user_choice");
const startResetButton = document.querySelector("#start_reset_button");
const resultText = document.querySelector("#result_text");

let gameActive = false;

init();

startResetButton.addEventListener("click", () => {
    if (!gameActive) {
        const userChoice = select.value;
        const compChoice = getComputerChoice();
        const outcome = playRound(userChoice, compChoice);

        resultText.textContent =
            `Computer chose ${expand(compChoice)}. ${outcome}`;

        gameActive = true;
        startResetButton.textContent = "Reset Game";
    }  else {
        init();
    }
});

function init() {
    gameActive = false;
    resultText.textContent = "";
    startResetButton.textContent = "Start Game";
}

function getComputerChoice() {
    let randNumb = Math.random();
    if (randNumb <= 1/3) {
        return "R";
    } else if (randNumb <= 2/3) {
        return "P";
    } else {
        return "S";
    }
}

function playRound(user, comp) {
    if (user === comp) {
        resultText.value = "Tie!"
    } else if (
        (user === "R" && comp === "S") ||
        (user === "P" && comp === "R") ||
        (user === "S" && comp === "P")
    )   { 
        resultText.value ="You win!";
    } else {
        resultText.value = "You lose!";
    }
}
