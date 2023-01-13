
const playBtn = document.querySelector(".play");
const divChoices = document.querySelector(".choices");
const imgChoices = document.querySelectorAll(".img-choice");
const playerScoreDiv = document.querySelector("#player-score");
const computerScoreDiv = document.querySelector("#computer-score");
const roundCountDiv = document.querySelector("#round-count")

const playerDivChoice = document.querySelector("#player-choice");
const computerDivChoice = document.querySelector("#computer-choice");

const resultMsg = document.querySelector(".result");
const makeChoiceMsg = document.querySelector(".make-choice");

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

const updateRound = (result) =>{
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

imgChoices.forEach(choice => {
    choice.addEventListener("click", (e)=>{
        const arr = e.target.src.split("/");
        const playerSelection = arr[arr.length - 1].split(".")[0];
        const computerSelection = getComputerChoice();
        const result = playRound(playerSelection , computerSelection);

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
        updateRound(result);


    });
})
