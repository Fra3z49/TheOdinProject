




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
    let user_choice = prompt('Rock, Paper, or Scissors').toLowerCase();
    return user_choice;
}

//Compares the player selection and the computer selection and outputs whether 1=win, 0=lose, 2=tie.
function roundScore() {
    let user = user_input();
    let computer = getComputerSelection();

    console.log("User: " + user + ", Computer: " + computer);

    if (
        (user === 'rock' && computer === 'scissors') ||
        (user === 'paper' && computer === 'rock') ||
        (user === 'scissors' && computer === 'paper')
    ) {
        return 1; // Player wins
    } else if (user === computer) {
        return 2; // It's a tie
    } else {
        return 0; // Computer wins
    }
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

//Loops the game 5 times and adds to wins/losses based upon 1=wins 0=losses, 2=ties.
function playGame() {
    let wins = 0;
    let losses = 0;
    let ties = 0;

    for (let i = 0; i ; i++) {
        let result = roundScore();
        if (result === 1) {
            wins++;
            console.log("Win");
        } else if (result === 0) {
            losses++;
            console.log("Lose");
        } else {
            ties++;
            console.log("Tie");
        }
    }

    console.log("Wins: " + wins + ", Losses: " + losses + ", Ties: " + ties);

    if (wins > losses) {
        redirectToPage("win.html");
        console.log("Player wins the championship!");

    } else if (wins < losses) {
        redirectToPage("lose.html");
        console.log("Hit the lockers and come out when you want to actually play!");
        
    } else {
        console.log("It's a tie!");
    }
}

// Redirects to another HTML page based upon if they wiin or lose.
function redirectToPage(pageName) {
    window.location.href = pageName;
}



// Start the game
playGame();