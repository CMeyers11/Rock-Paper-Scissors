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
//don't think I need select or addEventListener because I do not run the function
// when the user chagnes the selection but rather when the user presses the button
// MAYBE add an event listener for AFTER the user chooses initially that disables the ability 
// to choose a new one until hitting the reset button??

//const select = document.querySelector("select");
const resultText = document.querySelector("#result_text");
const startResetButton = document.querySelector("start_reset_button");
const userChoice = document.querySelector("#user_choice");
const ROCK = "R";
const PAPER = "P";
const SCISSORS = "S";
let compChoice;

startResetButton.addEventListener("click", () =>
    const =
)


function getComputerChoice() {
    let randNumb = math.random();
    if (randNumb <= 1/3) {
        compChoice = ROCK;
    } else if (randNumb <= 2/3) {
        compChoice = PAPER;
    } else {
        compChoice = SCISSORS;
    }
}

function playRound(userChoice, compChoice) {
    if (userChoice === compChoice) {
        resultText.value = "Tie!"
    } else if (
        (userChoice === ROCK && compChoice === SCISSORS) ||
        (userChoice === PAPER && compChoice === ROCK) ||
        (userChoice === SCISSORS && compChoice === PAPER)
    )   { 
        resultText.value ="You win!";
    } else {
        resultText.value = "You lose!";
    }
}


