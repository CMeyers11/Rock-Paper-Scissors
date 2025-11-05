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
            `You chose ${userChoice}. Computer chose ${compChoice}. ${outcome}`;

        gameActive = true;
        startResetButton.textContent = "Reset Game";
            select.disabled = true;
    }  else {
        init();
            select.disabled = false;
            select.selectedIndex = 0;
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
        return "Rock";
    } else if (randNumb <= 2/3) {
        return "Paper";
    } else {
        return "Scissors";
    }
}

function playRound(user, comp) {
    if (user === comp) {
        return "Tie!";
    } else if (
        (user === "Rock" && comp === "Scissors") ||
        (user === "Paper" && comp === "Rock") ||
        (user === "Scissors" && comp === "Paper")
    )   { 
        return "You win!";
    } else {
        return "You lose!";
    }
}
