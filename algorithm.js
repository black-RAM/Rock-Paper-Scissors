// Play a round of rock paper scissors
function playRound () {
  // computer choice
  const options = ["rock", "paper", "scissors"];
  const cChoice = options[Math.floor(Math.random() * 3)];
  // get player choice and validate it
  let pChoice = prompt('Type "rock", "paper", or "scissors" to play, or "q" to quit.');
  pChoice = pChoice.toLocaleLowerCase();

  function validate (input) {
    const optionsRegex = /rock|paper|scissors|q/i;
    const valid = optionsRegex.test(input);
    if(valid) {
      return input.match(optionsRegex).join(""); 
      // only return the part of input string that matches. Useful if user gave a sentence.
    } else {
      let newInput = prompt("Please enter a valid choice.").toLocaleLowerCase();
      return validate(newInput); // recursion to make sure that new input is indeed valid
    }
  }

  pChoice = validate(pChoice);
  // early return if player quit
  if(pChoice === "q") {return "Thanks for playing!"} else {
    // determine if player won or lost
    // logic: rock > scissors, scissors > paper, paper > rock
    if(
      (pChoice === "rock" && cChoice === "scissors") ||
      (pChoice === "scissors" && cChoice === "paper") ||
      (pChoice === "paper" && cChoice === "rock")
    ) {
      return `You win! ${pChoice} beats ${cChoice}`;
    } else if (
      (pChoice === "scissors" && cChoice === "rock") ||
      (pChoice === "paper" && cChoice === "scissors") ||
      (pChoice === "rock" && cChoice === "paper")
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
  // while neither player wins or computer wins are over five
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
        ++pWins;
        /* prefixed the increment operator to increment and return player wins, 
          which will be alerted at the end of each iteration of the loop.
          I made this change when I realised the wins would update late. */
      } 
      // or else, if it starts with the string "you lose" increment computer wins
      else if (result.startsWith("You lost")) {
        ++cWins;
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
    alert("Well, it's a tie. Reload the page for the tie-breaker!")
  }
}
 
alert("Lets play a game of rock paper scissors. First to five!");
game();