// Play a round of rock paper scissors
function playRound () {
  // computer choice
  const options = ["rock", "paper", "scissors"];
  const cChoice = options[Math.floor(Math.random() * 3)];
  // get player choice and validate
  let pChoice = prompt('Type "rock", "paper", or "scissors" to play, or "q" to quit.');
  pChoice = pChoice.toLocaleLowerCase();
  if([...options, "q"].includes(pChoice) === false) {
    alert("Please enter a valid choice.")
  }
  // early return if player quit
  if(pChoice === "q") {return "Thanks for playing!"} else {
    // determine if player won or lost
    // logic: rock > scissors, scissors > paper, paper > rock
    if(
      (pChoice.includes("rock") && cChoice === "scissors") ||
      (pChoice.includes("scissors") && cChoice === "paper") ||
      (pChoice.includes("paper") && cChoice === "rock")
    ) {
      return `You win! ${pChoice} beats ${cChoice}`;
    } else if (
      (pChoice.includes("scissors") && cChoice === "rock") ||
      (pChoice.includes("paper") && cChoice === "scissors") ||
      (pChoice.includes("rock") && cChoice === "paper")
    ) {
      return `You lost. ${cChoice} beats ${pChoice}. Sorry.`;
    }
    else {
      return `It's a tie! You both got ${cChoice}`;
    }
  }
}

function game() {
  // initialise player wins and computre wins to 0
  let pWins = 0;
  let cWins = 0;
  // round number (to debug the loop)
  let roundNum = 0;
  while(!(pWins >= 5 || cWins >= 5)) {
    // call playRound and store its return value in result
    let result = playRound();
    // if result indicates the player quit,
    if(result == "Thanks for playing!") {
      // display result and return (terminate function)
      alert(result);
      return;
    } else {
      // otherwise if result begins with string "you win", increment player wins
      if(result.startsWith("You win")) {
        pWins++;
      } 
      // or else, if it starts with the string "you lose" increment computer wins
      else if (result.startsWith("You lost")) {
        cWins++;
      }
    }
    // finally, display the result
    alert(`${result}\n(Your wins: ${pWins}; computer wins: ${cWins})`);
  }
  // game conclusion
  if(pWins > cWins) {
    alert(`Hurrah, you win! You won ${pWins} rounds while the computer won ${cWins} rounds.`)
  } else if (pWins < cWins) {
    alert(`Oops, You lose! The computer won ${cWins} rounds while you won ${pWins} rounds.`)
  } else {
    alert("Well, it's a tie.")
  }
}
 
alert("Lets play a game of rock paper scissors. First to five!");
game();