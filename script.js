// Play a round of rock paper scissors
async function playRound () {
  // Set up a Promise that resolves when the player makes a choice
  const choicePromise = new Promise(resolve => {
    const elements = [document.getElementById("rock"), document.getElementById("paper"), document.getElementById("scissors")];
    elements.forEach(element => {
      element.addEventListener("click", () => {
        resolve(element.id);
      });
    });
  });

  // Wait for the player to make a choice
  const pChoice = await choicePromise;

  // give computer choice a random element of options array
  const options = ["rock", "paper", "scissors"];
  const cChoice = options[Math.floor(Math.random() * options.length)];

  //display computer choice image in the DOM
  let img = document.createElement("img");
  img.setAttribute('src', `assets/${cChoice}.png`)
  img.setAttribute("id", "choice");
  const imgParent = document.querySelector("#computers > div");
  imgParent.appendChild(img);
  
  // determine the winner. logic: rock > scissors, scissors > paper, paper > rock
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

async function game() {
  // initialise player wins and computre wins to 0
  let pWins = 0;
  let cWins = 0;

  // DOM references setup
  const body = document.body;
  const main = document.getElementsByTagName("main")[0];
  let aside = document.createElement("aside");
  let para = document.createElement("p");
  para.setAttribute("id", "result");
  let pElem = document.getElementById("player-score");
  let cElem = document.getElementById("computer-score")

  // while neither player wins or computer wins are over five
  while(!(pWins >= 5 || cWins >= 5)) {
    // call playRound and store its return value in result
    let result = await playRound(); 

    para.setAttribute("class", ""); // make classes empty
    // Win? increment player wins
    if(result.startsWith("You win")) {
      ++pWins;
      pElem.textContent = pWins;
      para.classList.add("win");
    } 
    // Loss? increment computer wins
    else if (result.startsWith("You lost")) {
      ++cWins;
      cElem.textContent = cWins;
      para.classList.add("loss");
    }

    // finally, display the results
    para.textContent = result;
    aside.appendChild(para);
    body.insertBefore(aside, main);

    // hide result paragraph popup
    var hideAside = setTimeout(() => {
      aside.remove();
    }, 2000)

    // if multiple computer choice images exist, remove them
    let cChoiceImgs = document.querySelectorAll("#computers > div > img");
    if(cChoiceImgs.length > 1) {
      // loop through nodelist, removing all but last
      let i = 0
      do {
        cChoiceImgs[i].remove()
        i++;
      } while (i < (cChoiceImgs.length - 1));
    }
  }
  // game conclusion
  clearTimeout(hideAside);
  if(pWins > cWins) {
    para.innerText = `Hurrah! You win! You won ${pWins} rounds while the computer won ${cWins} rounds.`;
    para.setAttribute("class", "win end");
    aside.appendChild(para);
    body.insertBefore(aside, main);
  } else if (pWins < cWins) {
    para.innerText = `Oops, You lose! The computer won ${cWins} rounds while you won ${pWins} rounds.`;
    para.setAttribute("class", "loss end");
    aside.appendChild(para);
    body.insertBefore(aside, main);
  } else {
    para.innerText = "Well, it's a tie. Reload the page for the tie-breaker!";
    aside.appendChild(para);
    body.insertBefore(aside, main);
  }
}
game();