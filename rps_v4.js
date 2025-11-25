const select = document.querySelector("#user_choice");
const startResetButton = document.querySelector("#start_reset_button");
const resultText = document.querySelector("#result_text");

// listen for click to start game
startResetButton.addEventListener("click", () => {
    // Change button to read "reset game"
    if (startResetButton.textContent === "Start Game") {
        startResetButton.textContent = "Reset Game";
        // Disable choice selector
        select.disabled = true;
        // Run the game
            //Get comp choice
                // Generate random number
                let rand_numb = Math.random();
                let compChoice;
                // Assign number to text output and make result
                if (rand_numb <= 1/3) {
                    compChoice = "Rock"
                } else if (rand_numb <= 2/3) {
                    compChoice = "Paper"
                } else {
                    compChoice = "Scissors"
                }
                // Compare comp choice to user choice
                let result;
                let userChoice = select.textContent;
                // If same, tie
                if (userChoice === compChoice) {
                    result = "Tie!"
                // else if user wins, "you win"
                } else if (
                    (userChoice === "Rock" && compChoice === "Scissors") ||
                    (userChoice === "Paper" && compChoice === "Rock") ||
                    (userChoice === "Scissors" && compChoice === "Paper")
                    ) {
                    result = "You Win!"
                // else, you lose
                } else {
                    result = "You Lose!"
                }
            resultText.textContent = 
                `You chose ${userChoice}. Computer chose ${compChoice}. ${result}`;
    } else {
        startResetButton.textContent = "Start Game";
        select.disabled = false;
        resultText.textContent = ""
    }
})