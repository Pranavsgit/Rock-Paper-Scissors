const rulesBtn = document.querySelector(".rules-btn");
const rulesContainer = document.querySelector(".rules-container");
const closeButton = document.querySelector(".close-button");
const mainContainer = document.querySelector(".container")

rulesBtn.addEventListener("focus", function () {
    rulesContainer.style.display = "block";
    closeButton.style.display = "block";
});

closeButton.addEventListener("click", function () {
    rulesContainer.style.display = "none";
    closeButton.style.display = "none";
});

const CHOICES = [
    {
        name: "paper",
        beats: "rock",
    },
    {
        name: "scissors",
        beats: "paper",
    },
    {
        name: "rock",
        beats: "scissors",
    },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");
const goBack = document.querySelector(".go-back")

const playAgainBtn = document.querySelector(".play-again");
const nextBtn = document.querySelector(".next-btn")
const nextPage = document.querySelector('.next-page')

// const scoreNumber = document.querySelector(".score-number");
const pcScore = document.querySelector('.cpu .score-number');
console.log(pcScore);
const yourScore = document.querySelector('.you .score-number');
let scoreYou = parseInt(localStorage.getItem('scoreYou')) || 0;
let scorePc = parseInt(localStorage.getItem('scorePc')) || 0;
pcScore.innerText = scorePc;
yourScore.innerText = scoreYou;

// Game Logic   
choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find((choice) => choice.name === choiceName);
        choose(choice);
    });
});

function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
}

function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
}

function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
        </div>
      `;
        }, idx * 1000);
    });

    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
}

function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results);
        const aiWins = isWinner(results.reverse());

        if (userWins) {
            resultText.innerText = "you win";
            resultDivs[0].classList.toggle("winner");
            nextBtn.style.display = 'block';
            keepScore1(1);
        } else if (aiWins) {
            resultText.innerText = "you lose";
            resultDivs[1].classList.toggle("winner");
            nextBtn.style.display = 'none';
            keepScore2(1);
        } else {
            resultText.innerText = "draw";
            nextBtn.style.display = 'none';
        }
        resultWinner.classList.toggle("hidden");
        resultsDiv.classList.toggle("show-winner");
    }, 1000);
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

function keepScore1(point) {
    scoreYou += point;
    localStorage.setItem('scoreYou', scoreYou);
    yourScore.innerText = scoreYou;
}
function keepScore2(point) {
    scorePc += point;
    localStorage.setItem('scorePc', scorePc);
    pcScore.innerText = scorePc;
}
// Play Again
playAgainBtn.addEventListener("click", () => {
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
    nextBtn.style.display = 'none';

    resultDivs.forEach((resultDiv) => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove("winner");
    });

    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
});
//hurray page

nextBtn.addEventListener('click', () => {
    mainContainer.classList.toggle('hidden');
    nextPage.classList.toggle('hidden');
    resultsDiv.classList.toggle('hidden');
})
goBack.addEventListener('click', () => {
    mainContainer.classList.toggle('hidden');
    nextPage.classList.toggle('hidden');
    resultsDiv.classList.toggle('hidden');
})
