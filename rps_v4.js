const choicesDiv = document.querySelector("#user_choice");
const outputBlock = document.querySelector('#output');
const resultText = document.querySelector("#result_text");

let gameNumber = 0;
let gameLog = null;
let scoreCard = null;
let compScoreDiv = null;
let userScoreDiv = null;
let compScoreNumber = 0;
let userScoreNumber = 0;

choicesDiv.addEventListener('click', (event) => {
    if (event.target.matches("button.choice")) {

        // Get user's choice
        const userChoice = event.target.textContent;

        // Run game and capture the results
        const { compChoice, result } = runRPS(userChoice);

        // Display result text
        resultText.textContent =
            `You chose ${userChoice}. Computer chose ${compChoice}. ${result}`;

        // Create the ordered list only once
        if (gameNumber === 0) {
            gameLog = document.createElement('ol');
            outputBlock.appendChild(gameLog);
            scoreCard = document.createElement('div');
            scoreCard.setAttribute("style", "color: white; background: black; display: flex; flex-direction: column")
            outputBlock.appendChild(scoreCard);
            compScoreDiv = document.createElement('div');
            userScoreDiv = document.createElement('div');
            scoreCard.appendChild(compScoreDiv);
            scoreCard.appendChild(userScoreDiv);
        }

        // Add one game entry
        const li = document.createElement("li");
        li.textContent = `Game ${gameNumber + 1}: You chose ${userChoice}, computer chose ${compChoice}. ${result}`;
        gameLog.appendChild(li);

        //increment score tally
        if (result === "You win!") {
            userScoreNumber += 1;
        } else if (result === "You Lose!") {
            compScoreNumber += 1;
        }

        compScoreDiv.textContent = `Computer: ${compScoreNumber}`;
        userScoreDiv.textContent = `User: ${userScoreNumber}`;
        gameNumber++;
    }
});


// Returns an object with compChoice and result
function runRPS(userChoice) {
    let compChoice;
    const rand_numb = Math.random();

    // Random computer choice
    if (rand_numb <= 1 / 3) {
        compChoice = "Rock";
    } else if (rand_numb <= 2 / 3) {
        compChoice = "Paper";
    } else {
        compChoice = "Scissors";
    }

    // Decide winner
    let result;
    if (userChoice === compChoice) {
        result = "Tie!";
    } else if (
        (userChoice === "Rock" && compChoice === "Scissors") ||
        (userChoice === "Paper" && compChoice === "Rock") ||
        (userChoice === "Scissors" && compChoice === "Paper")
    ) {
        result = "You Win!";
    } else {
        result = "You Lose!";
    }

    // Return BOTH values
    return { compChoice, result };
}