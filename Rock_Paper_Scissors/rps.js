//The computer must randomly choose a number between 1-3 and print either "Rock, Paper, or Scissors" based upon the number.
function getComputerSelection() {
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    if (randomNumber === 1) {
        return "rock";
    } else if (randomNumber === 2) {
        return "paper";
    } else if (randomNumber === 3) {
        return "scissors";
    }
}

//Gets the user's input for rock, paper, or scissors
function user_input() {
    return new Promise((resolve, reject) => {
        const rock_btn = document.querySelector('#rock');
        const paper_btn = document.querySelector('#paper');
        const scissors_btn = document.querySelector('#scissors');
        
        rock_btn.addEventListener("click", () => resolve('rock'));
        paper_btn.addEventListener('click', () => resolve('paper'));
        scissors_btn.addEventListener('click', () => resolve('scissors'));
    });
}

//Compares the player selection and the computer selection and outputs whether 1=win, 0=lose, 2=tie.
function roundScore() {
    return new Promise(async (resolve, reject) => {
        let user = await user_input();
        let computer = getComputerSelection();

        console.log("User: " + user + ", Computer: " + computer);

        if (
            (user === 'rock' && computer === 'scissors') ||
            (user === 'paper' && computer === 'rock') ||
            (user === 'scissors' && computer === 'paper')
        ) {
            resolve(1); // Player wins
        } else if (user === computer) {
            resolve(2); // It's a tie
        } else {
            resolve(0); // Computer wins
        }
    });
}

//Produces a wins/losses statement for the user into the console. Requires the win code, the computer's selection, and the player's selection.
function stmt(win_or_lose, computer_choice, user_choice) {
    if (win_or_lose === 0) {
        return "You lose. " + computer_choice + " beats " + user_choice;
    } else if (win_or_lose === 1) {
        return "You win. " + user_choice + " beats " + computer_choice;
    } else {
        return "It's a tie. Both chose " + user_choice;
    }
}

//Loops the game 5 times and adds to wins/losses based upon 1=wins 0=losses, and tie if not 1 or 0.
async function playGame() {
    let wins = 0;
    let losses = 0;
    let ties = 0;
    let rounds = 10;

    //sets the max amount of rounds per game.
    let max_rounds = 10;

    //Shows the current round.
    const round_console = document.querySelector('#round');
    const round_element = document.createElement('p');

    //Shows is the user won, lost, or ties in the round
    const console = document.querySelector('#console');
    const add_element = document.createElement('p');

    //Shows the user the amount of points they have in wins, loses, and ties with the computer.
    const points_console = document.querySelector('#score');
    const score_element = document.createElement('p');




    

    for (let i = 1; i <= max_rounds; i++) {
        let result = await roundScore();
        if (result === 1) {
            wins++;
            //console.log("Win");
            add_element.textContent = "Win";
            score_element.textContent = "Wins: " + wins + " | " + "Loses: " + losses + " | " + "Ties: " + ties
            round_element.textContent = 'Round: ' + i + "of " + rounds

        } else if (result === 0) {
            losses++;
            //console.log("Lose");
            add_element.textContent = "Lose";
            score_element.textContent = "Wins: " + wins + " | " + "Loses: " + losses + " | " + "Ties: " + ties
            round_element.textContent = 'Round: ' + i + "of " + rounds

        } else {
            ties++;
            //console.log("Tie");
            add_element.textContent = "Tie";
            score_element.textContent = "Wins: " + wins + " | " + "Loses: " + losses + " | " + "Ties: " + ties
            round_element.textContent = 'Round: ' + i + "of " + rounds
        }
        console.appendChild(add_element);
        points_console.appendChild(score_element)
        round_console.appendChild(round_element)
    }

    

    if (wins > losses) {
        redirectToPage("win.html");
        

    } else if (wins < losses) {
        redirectToPage("lose.html");
        
        
    } else {
        console.log("It's a tie!");
    }
}

// Redirects to another HTML page based upon if they win or lose.
function redirectToPage(pageName) {
    window.location.href = pageName;
}
playGame();
