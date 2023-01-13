
const playBtn = document.querySelector(".play");
const divChoices = document.querySelector(".choices");
const navBar = document.querySelector("nav");
const imgChoices = document.querySelectorAll(".img-choice");
const playerScoreDiv = document.querySelector("#player-score");
const computerScoreDiv = document.querySelector("#computer-score");
const roundCountDiv = document.querySelector("#round-count")

const playerDivChoice = document.querySelector("#player-choice");
const computerDivChoice = document.querySelector("#computer-choice");

const resultMsg = document.querySelector(".result");
const makeChoiceMsg = document.querySelector(".make-choice");

const playAgainBtn = document.querySelector(".play-again");
const finalMsg = document.querySelector("#final-msg");

const popup = document.querySelector(".popup");

let playerImgChoice ;
let computerImgChoice ;


let playerScore = 0;
let computerScore = 0;


let roundCount = 1;


playBtn.addEventListener("click", () => {

    playBtn.classList.add("no-opacity");
    setTimeout(() => {
        playBtn.classList.add("hide");
        divChoices.classList.remove("hide");
        navBar.classList.remove("hide");
        alert("First to 5 wins , good luck");


    }, 500);

})

const getComputerChoice = () => {
    const choices = ["rock","paper","scissors"];
    const random = Math.floor(Math.random() * 3);
    return choices[random];
}


const playRound = (playerSelection, computerSelection) => {

    console.log(playerSelection,computerSelection)
    if (playerSelection == computerSelection)
        return 0;
    if ((playerSelection == "rock" && computerSelection == "scissors")
        || (playerSelection == "paper" && computerSelection == "rock")
        || (playerSelection == "scissors" && computerSelection == "paper"))
        return 1;
    return -1;
}

const updateRound = (result,playerSelection,computerSelection) =>{

    if (roundCount == 1)
    {
        playerImgChoice = document.createElement("img");
        computerImgChoice = document.createElement("img");

        playerDivChoice.appendChild(playerImgChoice);
        computerDivChoice.appendChild(computerImgChoice);

        makeChoiceMsg.classList.add("hide");
    }
    playerImgChoice.src = `assets/${playerSelection}.png`;
    computerImgChoice.src = `assets/${computerSelection}.png`;
    roundCountDiv.textContent = `Round ${++roundCount}`

    if (result > 0)
    {
        playerScoreDiv.textContent = `You : ${++playerScore}`;
        resultMsg.textContent = "You won this round";

    }
    else if (result < 0)
    {
        computerScoreDiv.textContent = `${++computerScore} : Computer`;
        resultMsg.textContent = "You lost this round";
    }
    else{
        resultMsg.textContent = "This is a tie";

    }

}

const checkWinner = () =>
{
    let winner = 0;
    if (playerScore == 5)
    {
        finalMsg.textContent = "Congrats, you won !";
        winner = 1;
    }
    else if (computerScore == 5)
    {
        finalMsg.textContent = "You lost !"
        winner = 1;
    }
    if (winner == 1)
    {
        popup.classList.remove("hide");
        return 1;
    }
    return 0;
}

playAgainBtn.addEventListener("click",()=>{

    popup.classList.add("no-opacity");
    setTimeout(() => {
        popup.classList.add("hide");
        makeChoiceMsg.classList.remove("hide");
        resetGame();
        popup.classList.remove("no-opacity");

    }, 500);


})

const resetGame = () => {

    playerScore = 0;
    computerScore = 0;
    roundCount = 1;

    playerDivChoice.innerHTML = "";
    computerDivChoice.innerHTML = "";
    playerScoreDiv.textContent = `You : ${playerScore}`;
    computerScoreDiv.textContent = `${computerScore} : Computer`;
    roundCountDiv.textContent = `Round ${roundCount}`
    resultMsg.textContent = "";


}

imgChoices.forEach(choice => {
    choice.addEventListener("click", (e)=>{
        const arr = e.target.src.split("/");
        const playerSelection = arr[arr.length - 1].split(".")[0];
        const computerSelection = getComputerChoice();
        const result = playRound(playerSelection , computerSelection);
        updateRound(result,playerSelection,computerSelection);
        checkWinner();
    });
})
